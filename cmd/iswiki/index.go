package main

import (
	"crypto/tls"
	"flag"
	"fmt"
	"html"
	"io"
	"net/http"
	"os"
	"regexp"
	"strings"
	"time"
)

func newClient(insecure bool) *http.Client {
	tr := &http.Transport{}
	if insecure {
		// isca-archive.org has been serving an expired TLS certificate;
		// --insecure lets fetches proceed until ISCA fixes it.
		tr.TLSClientConfig = &tls.Config{InsecureSkipVerify: true}
	}
	return &http.Client{Transport: tr, Timeout: 60 * time.Second}
}

func get(client *http.Client, url string) ([]byte, error) {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", "iswiki (+https://github.com/MIBlue119/interspeech-2026-wiki)")
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("GET %s: %s", url, resp.Status)
	}
	return io.ReadAll(resp.Body)
}

type indexEntry struct {
	ID      string
	Title   string
	Authors []string
	Session string
}

var (
	sessionRe = regexp.MustCompile(`<h4 class="w3-center">([^<]+)</h4>`)
	paperRe   = regexp.MustCompile(`(?s)<a class="w3-text" href="([a-z0-9_]+)\.html">\s*<p>\s*(.*?)\s*<br>\s*<span[^>]*>\s*(.*?)\s*</span>`)
	tagRe     = regexp.MustCompile(`<[^>]+>`)
)

func cleanText(s string) string {
	s = tagRe.ReplaceAllString(s, "")
	s = html.UnescapeString(s)
	return strings.Join(strings.Fields(s), " ")
}

// parseIndex walks the archive index page, tracking the session heading
// that precedes each paper anchor.
func parseIndex(page []byte) []indexEntry {
	src := string(page)
	sessions := sessionRe.FindAllStringSubmatchIndex(src, -1)
	sessionAt := func(pos int) string {
		name := ""
		for _, m := range sessions {
			if m[0] > pos {
				break
			}
			name = cleanText(src[m[2]:m[3]])
		}
		return name
	}
	var entries []indexEntry
	for _, m := range paperRe.FindAllStringSubmatchIndex(src, -1) {
		e := indexEntry{
			ID:      src[m[2]:m[3]],
			Title:   cleanText(src[m[4]:m[5]]),
			Session: sessionAt(m[0]),
		}
		for _, a := range strings.Split(cleanText(src[m[6]:m[7]]), ",") {
			if a = strings.TrimSpace(a); a != "" {
				e.Authors = append(e.Authors, a)
			}
		}
		entries = append(entries, e)
	}
	return entries
}

func cmdIndex(args []string) error {
	fs := flag.NewFlagSet("index", flag.ExitOnError)
	insecure := fs.Bool("insecure", false, "skip TLS verification (ISCA cert is currently expired)")
	limit := fs.Int("limit", 0, "create at most N new stubs (0 = no limit)")
	only := fs.String("only", "", "create a stub for this paper id only")
	dryRun := fs.Bool("dry-run", false, "report what would be created without writing")
	fs.Parse(args)

	page, err := get(newClient(*insecure), indexURL)
	if err != nil {
		return err
	}
	entries := parseIndex(page)
	if len(entries) == 0 {
		return fmt.Errorf("parsed 0 papers from %s — page layout may have changed", indexURL)
	}
	fmt.Printf("index lists %d papers\n", len(entries))

	created := 0
	for _, e := range entries {
		if *only != "" && e.ID != *only {
			continue
		}
		if _, err := os.Stat(paperPath(e.ID)); err == nil {
			continue // already indexed
		}
		if *limit > 0 && created >= *limit {
			break
		}
		p := &Paper{
			ID:      e.ID,
			Title:   e.Title,
			Authors: e.Authors,
			Year:    2026,
			ISCAURL: fmt.Sprintf("https://www.isca-archive.org/interspeech_2026/%s.html", e.ID),
			PDFURL:  fmt.Sprintf("https://www.isca-archive.org/interspeech_2026/%s.pdf", e.ID),
			Session: e.Session,
			Topics:  []string{},
		}
		if *dryRun {
			fmt.Printf("would create %s (%s)\n", paperPath(p.ID), p.Title)
		} else {
			if err := savePaper(p); err != nil {
				return err
			}
			fmt.Printf("created %s\n", paperPath(p.ID))
		}
		created++
	}
	if *only != "" && created == 0 {
		fmt.Printf("no stub created for %q (already indexed, or id not in the archive index)\n", *only)
	}
	return nil
}

func cmdFetch(args []string) error {
	fs := flag.NewFlagSet("fetch", flag.ExitOnError)
	insecure := fs.Bool("insecure", false, "skip TLS verification (ISCA cert is currently expired)")
	only := fs.String("only", "", "fetch this paper id only")
	fs.Parse(args)

	papers, err := loadPapers()
	if err != nil {
		return err
	}
	if err := os.MkdirAll(srcDir, 0o755); err != nil {
		return err
	}
	client := newClient(*insecure)
	for _, p := range papers {
		if *only != "" && p.ID != *only {
			continue
		}
		if p.PDFURL == "" {
			continue
		}
		dst := fmt.Sprintf("%s/%s.pdf", srcDir, p.ID)
		if _, err := os.Stat(dst); err == nil {
			continue
		}
		b, err := get(client, p.PDFURL)
		if err != nil {
			return err
		}
		if err := os.WriteFile(dst, b, 0o644); err != nil {
			return err
		}
		fmt.Printf("fetched %s (%d KB)\n", dst, len(b)/1024)
		time.Sleep(1 * time.Second) // be polite to the archive
	}
	return nil
}
