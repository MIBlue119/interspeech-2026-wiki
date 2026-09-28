package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"
)

// cmdWiki creates the OKF wiki page stub for one paper from its yaml.
func cmdWiki(args []string) error {
	if len(args) != 1 || strings.HasPrefix(args[0], "-") {
		return fmt.Errorf("usage: iswiki wiki <paper-id>")
	}
	id := args[0]
	p, err := loadPaper(paperPath(id))
	if err != nil {
		return err
	}
	dst := filepath.Join(wikiDir, id+".md")
	if _, err := os.Stat(dst); err == nil {
		return fmt.Errorf("%s already exists — edit it directly", dst)
	}

	category := "uncategorized"
	if len(p.Topics) > 0 {
		category = p.Topics[0]
	} else if p.Session != "" {
		category = strings.ToLower(strings.Join(strings.Fields(p.Session), "-"))
	}
	source := p.ISCAURL
	if p.DOI != "" {
		source = "https://doi.org/" + p.DOI
	}
	codeLine := "None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md."
	if p.Code.URL != "" {
		codeLine = p.Code.URL
	}

	page := fmt.Sprintf(`---
id: %s
category: %s
updated: %s
confidence: abstract-only
source: %s
---

# %s

**TL;DR** — (one sentence: what it does and why it matters)

## Problem

(what gap does the paper address)

## Method

(how, in your own words — no full-text copying, ISCA holds the paper's copyright)

## Results

(headline numbers and what they were compared against)

## Code

%s

## Applications

(who could use this and for what)

## Related

- (link related pages by id, e.g. %s)
`, p.ID, category, time.Now().Format("2006-01-02"), source, p.Title, codeLine, "`barreiros26_interspeech`")

	if err := os.MkdirAll(wikiDir, 0o755); err != nil {
		return err
	}
	if err := os.WriteFile(dst, []byte(page), 0o644); err != nil {
		return err
	}
	fmt.Printf("created %s — now write the summary sections\n", dst)
	return nil
}
