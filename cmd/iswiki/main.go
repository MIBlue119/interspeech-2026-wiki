// iswiki maintains the Interspeech 2026 LLM Wiki: it scrapes the ISCA
// archive index into per-paper metadata files, validates them, regenerates
// the README paper table, creates wiki page stubs, and fetches PDFs for
// local (never committed) full-text reading.
package main

import (
	"fmt"
	"os"
)

const (
	dataDir  = "data/papers"
	wikiDir  = "wiki/papers"
	srcDir   = "sources"
	indexURL = "https://www.isca-archive.org/interspeech_2026/index.html"
)

func main() {
	if len(os.Args) < 2 {
		usage()
		os.Exit(2)
	}
	var err error
	switch os.Args[1] {
	case "index":
		err = cmdIndex(os.Args[2:])
	case "readme":
		err = cmdReadme(os.Args[2:])
	case "validate":
		err = cmdValidate(os.Args[2:])
	case "wiki":
		err = cmdWiki(os.Args[2:])
	case "toc":
		err = cmdToc(os.Args[2:])
	case "orgs":
		err = cmdOrgs(os.Args[2:])
	case "stars":
		err = cmdStars(os.Args[2:])
	case "fetch":
		err = cmdFetch(os.Args[2:])
	default:
		usage()
		os.Exit(2)
	}
	if err != nil {
		fmt.Fprintln(os.Stderr, "error:", err)
		os.Exit(1)
	}
}

func usage() {
	fmt.Fprint(os.Stderr, `usage: iswiki <command> [flags]

commands:
  index     scrape the ISCA index into data/papers/*.yaml stubs
            flags: --insecure --limit N --only <id> --dry-run
  readme    regenerate the paper table in README.md from data/papers
  validate  schema-check every data/papers/*.yaml
  wiki <id> create wiki/papers/<id>.md stub from its yaml
  toc       regenerate wiki/index.md grouped by primary topic
  orgs      regenerate wiki/institutions.md grouped by institution/funder
  stars     refresh code.stars from the GitHub API (needs GITHUB_TOKEN)
  fetch     download paper PDFs into sources/ (gitignored)
            flags: --insecure --only <id>
`)
}
