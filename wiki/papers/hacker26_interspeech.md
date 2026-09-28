---
id: hacker26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1188
---

# Common Cold Corpus: Health-Aware Robustness Study of Modern Speaker Embeddings Under Physiological Domain Shift

**TL;DR** — A new paired corpus of sick vs. healthy speakers shows that modern speaker embeddings shift noticeably in identity space when someone has a common cold, more so than classic acoustic features do.

## Problem

It's unclear how robust modern speaker embeddings are to everyday physiological voice changes like the common cold, since prior corpora focus on lab conditions and severe illness rather than moderate, real-world symptoms.

## Method

The authors introduce the Common Cold Corpus — paired remote recordings of 85 German speakers made during acute upper respiratory infection and while healthy — and compare eGeMAPS acoustic features against modern speaker embeddings (ECAPA2, TitaNet, ReDimNet) for sensitivity to illness.

## Results

Acoustic analysis shows consistent downward trends in pitch and harmonics-to-noise ratio when ill, but only a few features survive statistical correction, whereas speaker embeddings show significant, directed displacement in identity space under moderate cold symptoms.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Digital health biomarkers and robustness testing for speaker-verification systems that must tolerate everyday illness-related voice changes.

## Related

- (link related pages by id as the wiki grows)
