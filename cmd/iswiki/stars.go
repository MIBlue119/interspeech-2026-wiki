package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"regexp"
	"strings"
	"time"
)

// cmdStars refreshes the code.stars field for every github.com code link via
// the GitHub GraphQL API (batched, 100 repos per request). Auth comes from
// GITHUB_TOKEN, e.g.: GITHUB_TOKEN=$(gh auth token) go run ./cmd/iswiki stars
func cmdStars(_ []string) error {
	token := os.Getenv("GITHUB_TOKEN")
	if token == "" {
		return fmt.Errorf("GITHUB_TOKEN is required (try: GITHUB_TOKEN=$(gh auth token) go run ./cmd/iswiki stars)")
	}
	papers, err := loadPapers()
	if err != nil {
		return err
	}
	ghRe := regexp.MustCompile(`^https://github\.com/([\w.-]+)/([\w.-]+?)(?:\.git)?(?:/.*)?$`)
	type target struct {
		paper       *Paper
		owner, name string
	}
	var targets []target
	for _, p := range papers {
		if m := ghRe.FindStringSubmatch(p.Code.URL); m != nil {
			targets = append(targets, target{p, m[1], m[2]})
		}
	}
	fmt.Printf("querying stars for %d github repos\n", len(targets))

	client := &http.Client{Timeout: 60 * time.Second}
	updated, missing := 0, 0
	for start := 0; start < len(targets); start += 100 {
		batch := targets[start:min(start+100, len(targets))]
		var q strings.Builder
		q.WriteString("query {")
		for i, t := range batch {
			fmt.Fprintf(&q, " r%d: repository(owner:%q, name:%q) { stargazerCount }", i, t.owner, t.name)
		}
		q.WriteString(" }")
		body, _ := json.Marshal(map[string]string{"query": q.String()})
		req, err := http.NewRequest("POST", "https://api.github.com/graphql", bytes.NewReader(body))
		if err != nil {
			return err
		}
		req.Header.Set("Authorization", "Bearer "+token)
		resp, err := client.Do(req)
		if err != nil {
			return err
		}
		raw, _ := io.ReadAll(resp.Body)
		resp.Body.Close()
		if resp.StatusCode != http.StatusOK {
			return fmt.Errorf("GitHub API: %s: %s", resp.Status, raw[:min(len(raw), 200)])
		}
		var out struct {
			Data map[string]*struct {
				StargazerCount int `json:"stargazerCount"`
			} `json:"data"`
		}
		if err := json.Unmarshal(raw, &out); err != nil {
			return err
		}
		for i, t := range batch {
			if r := out.Data[fmt.Sprintf("r%d", i)]; r != nil {
				if t.paper.Code.Stars != r.StargazerCount {
					t.paper.Code.Stars = r.StargazerCount
					if err := patchStars(t.paper.ID, r.StargazerCount); err != nil {
						return err
					}
					updated++
				}
			} else {
				missing++
				fmt.Printf("  no repo (moved/private?): %s → %s/%s\n", t.paper.ID, t.owner, t.name)
			}
		}
	}
	fmt.Printf("stars refreshed: %d updated, %d unresolvable, %d unchanged\n", updated, missing, len(targets)-updated-missing)
	return nil
}

// patchStars rewrites only the stars line inside the code block of one yaml,
// preserving all other formatting.
func patchStars(id string, stars int) error {
	path := paperPath(id)
	b, err := os.ReadFile(path)
	if err != nil {
		return err
	}
	t := string(b)
	starsRe := regexp.MustCompile(`(?m)^([ \t]+)stars: \d+\n`)
	urlRe := regexp.MustCompile(`(?m)^(code:\n([ \t]+)url: .*\n)`)
	if starsRe.MatchString(t) {
		t = starsRe.ReplaceAllString(t, fmt.Sprintf("${1}stars: %d\n", stars))
	} else {
		t = urlRe.ReplaceAllString(t, fmt.Sprintf("${1}${2}stars: %d\n", stars))
	}
	return os.WriteFile(path, []byte(t), 0o644)
}
