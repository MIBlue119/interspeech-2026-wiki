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

	category := p.Category
	if category == "" && len(p.Topics) > 0 {
		category = p.Topics[0]
	}
	if category == "" {
		category = "uncategorized"
	}
	labelsFront, labelsLine := "", ""
	if len(p.Labels) > 0 {
		labelsFront = fmt.Sprintf("labels: [%s]\n", strings.Join(p.Labels, ", "))
		labelsLine = " · **Labels:** `" + strings.Join(p.Labels, "`, `") + "`"
	}
	if len(p.Institutions) > 0 {
		quoted := make([]string, len(p.Institutions))
		for i, n := range p.Institutions {
			quoted[i] = fmt.Sprintf("%q", n)
		}
		labelsFront += fmt.Sprintf("institutions: [%s]\n", strings.Join(quoted, ", "))
	}
	if p.Code.URL != "" {
		labelsFront += "code: " + p.Code.URL + "\n"
	}
	orgSection := ""
	if len(p.Institutions) > 0 || len(p.Funding) > 0 {
		orgSection = "## Institutions / 機構\n\n"
		if len(p.Institutions) > 0 {
			orgSection += strings.Join(p.Institutions, ", ") + "\n"
		}
		if len(p.Funding) > 0 {
			orgSection += "\n**Funding / 經費:** " + strings.Join(p.Funding, ", ") + "\n"
		}
		orgSection += "\n"
	}
	source := p.ISCAURL
	if p.DOI != "" {
		source = "https://doi.org/" + p.DOI
	}
	codeLine := "None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md."
	if p.Code.URL != "" {
		codeLine = p.Code.URL
	}

	pdfURL := p.PDFURL
	if pdfURL == "" {
		pdfURL = fmt.Sprintf("https://www.isca-archive.org/interspeech_2026/%s.pdf", p.ID)
	}
	page := fmt.Sprintf(`---
id: %s
category: %s
%supdated: %s
confidence: abstract-only
digest: v2
source: %s
pdf: %s
---

# %s

*%s*

[PDF](%s) · [ISCA page](%s)

**Category:** %s%s

**TL;DR** — (1-2 sentences: what it does + headline quantified result)

## Key contributions

- (3-5 concrete contributions, one per bullet)

## Problem

(the gap, why prior approaches fall short, why it matters)

## Method

(real technical meat, in your own words — no full-text copying, ISCA holds the paper's copyright: architecture, losses, training recipe, key design choices)

## Experimental setup

(datasets with sizes, baselines, metrics, notable implementation details)

## Results

(concrete numbers vs each baseline; a small markdown table of the headline numbers is welcome)

## Limitations

(stated limitations and honest scope bounds)

## Why read this

(who specifically should read this and what they'll take away)

## Code

%s

## Applications

(who could use this and for what)

%s## Related

- (link related pages by id, e.g. %s)
`, p.ID, category, labelsFront, time.Now().Format("2006-01-02"), source, pdfURL, p.Title,
		strings.Join(p.Authors, ", "), pdfURL, p.ISCAURL,
		"`"+category+"`", labelsLine, codeLine, orgSection, "`barreiros26_interspeech`")

	if err := os.MkdirAll(wikiDir, 0o755); err != nil {
		return err
	}
	if err := os.WriteFile(dst, []byte(page), 0o644); err != nil {
		return err
	}
	fmt.Printf("created %s — now write the summary sections\n", dst)
	return nil
}
