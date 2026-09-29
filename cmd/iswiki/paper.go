package main

import (
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"gopkg.in/yaml.v3"
)

type Code struct {
	URL     string `yaml:"url"`
	License string `yaml:"license"`
}

type Paper struct {
	ID      string   `yaml:"id"`
	Title   string   `yaml:"title"`
	Authors []string `yaml:"authors"`
	Year    int      `yaml:"year"`
	DOI     string   `yaml:"doi,omitempty"`
	ISCAURL string   `yaml:"isca_url"`
	PDFURL  string   `yaml:"pdf_url,omitempty"`
	Session string   `yaml:"session,omitempty"`
	Topics  []string `yaml:"topics"`
	// Category is one of the 14 canonical categories; Labels are cross-cutting
	// tags. Both are assigned via TypeSafe (Jev) judgments and editable by PR.
	Category     string   `yaml:"category,omitempty"`
	Labels       []string `yaml:"labels,omitempty"`
	Institutions []string `yaml:"institutions,omitempty"`
	Funding      []string `yaml:"funding,omitempty"`
	Arxiv        string   `yaml:"arxiv,omitempty"`
	Code         Code     `yaml:"code"`
	// Author opt-in fields, filled by the paper's own authors via PR.
	Contact             string `yaml:"contact,omitempty"`
	Lab                 string `yaml:"lab,omitempty"`
	OpenToCollaboration bool   `yaml:"open_to_collaboration"`
}

func paperPath(id string) string { return filepath.Join(dataDir, id+".yaml") }

func loadPaper(path string) (*Paper, error) {
	b, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	var p Paper
	if err := yaml.Unmarshal(b, &p); err != nil {
		return nil, fmt.Errorf("%s: %w", path, err)
	}
	return &p, nil
}

func loadPapers() ([]*Paper, error) {
	paths, err := filepath.Glob(filepath.Join(dataDir, "*.yaml"))
	if err != nil {
		return nil, err
	}
	sort.Strings(paths)
	var papers []*Paper
	for _, path := range paths {
		p, err := loadPaper(path)
		if err != nil {
			return nil, err
		}
		papers = append(papers, p)
	}
	return papers, nil
}

func savePaper(p *Paper) error {
	b, err := yaml.Marshal(p)
	if err != nil {
		return err
	}
	if err := os.MkdirAll(dataDir, 0o755); err != nil {
		return err
	}
	return os.WriteFile(paperPath(p.ID), b, 0o644)
}

func validatePaper(path string, p *Paper) []string {
	var errs []string
	want := strings.TrimSuffix(filepath.Base(path), ".yaml")
	if p.ID != want {
		errs = append(errs, fmt.Sprintf("id %q does not match filename %q", p.ID, want))
	}
	if p.Title == "" {
		errs = append(errs, "title is required")
	}
	if len(p.Authors) == 0 {
		errs = append(errs, "authors is required")
	}
	if p.Year != 2026 {
		errs = append(errs, "year must be 2026")
	}
	if !strings.HasPrefix(p.ISCAURL, "https://www.isca-archive.org/interspeech_2026/") {
		errs = append(errs, "isca_url must point at the interspeech_2026 archive")
	}
	for _, t := range p.Topics {
		if strings.ContainsAny(t, " _") || t != strings.ToLower(t) {
			errs = append(errs, fmt.Sprintf("topic %q must be lower-kebab-case", t))
		}
	}
	if p.Code.URL != "" && !strings.HasPrefix(p.Code.URL, "https://") {
		errs = append(errs, "code.url must be an https URL")
	}
	if p.Category != "" && !canonicalCategories[p.Category] {
		errs = append(errs, fmt.Sprintf("category %q is not one of the canonical categories", p.Category))
	}
	return errs
}

var canonicalCategories = map[string]bool{
	"asr": true, "tts": true, "speaker": true, "speech-llm-dialogue": true,
	"enhancement-separation": true, "translation": true, "paralinguistics-emotion": true,
	"health-clinical": true, "phonetics-linguistics": true, "audio-understanding": true,
	"deepfake-security": true, "speech-coding": true, "resources-evaluation": true,
	"applications-other": true,
}

func cmdValidate(_ []string) error {
	paths, err := filepath.Glob(filepath.Join(dataDir, "*.yaml"))
	if err != nil {
		return err
	}
	if len(paths) == 0 {
		return fmt.Errorf("no yaml files under %s", dataDir)
	}
	bad := 0
	for _, path := range paths {
		p, err := loadPaper(path)
		if err != nil {
			fmt.Printf("FAIL %s: %v\n", path, err)
			bad++
			continue
		}
		if errs := validatePaper(path, p); len(errs) > 0 {
			bad++
			fmt.Printf("FAIL %s\n", path)
			for _, e := range errs {
				fmt.Printf("  - %s\n", e)
			}
		}
	}
	if bad > 0 {
		return fmt.Errorf("%d of %d paper files invalid", bad, len(paths))
	}
	fmt.Printf("OK: %d paper files valid\n", len(paths))
	return nil
}
