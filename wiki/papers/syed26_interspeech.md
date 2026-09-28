---
id: syed26_interspeech
category: dataset
updated: 2026-09-28
confidence: abstract-only
source: https://www.isca-archive.org/interspeech_2026/syed26_interspeech.html
---

# corpusgen: An Open-Source Toolkit for Phoneme-Coverage-Optimized Speech Corpus Design Across Languages

**TL;DR** — corpusgen is an open-source Python toolkit that automatically selects or generates sentences to maximize phoneme coverage for speech corpus design in any of over 2,000 languages, needing far fewer sentences than random selection.

## Problem

Designing speech corpora with good phoneme coverage across typologically diverse languages is a manual, ad hoc process without a unified, general-purpose tool.

## Method

corpusgen integrates grapheme-to-phoneme conversion via espeak-ng, phoneme inventories from PHOIBLE (covering 2,186 languages), and multiple corpus optimization algorithms — greedy set cover with CELF acceleration, integer linear programming, distribution-aware selection, and NSGA-II multi-objective optimization — plus pluggable LLM or local transformer backends for targeted sentence generation with phonotactic control, and a unified module evaluating phoneme, diphone, and triphone coverage.

## Results

The toolkit is pip-installable with both a Python API and CLI under an Apache-2.0 license, and the authors demonstrate it achieves near-optimal phoneme coverage with significantly fewer sentences than random baselines across typologically diverse languages.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Efficient speech corpus construction for low-resource and typologically diverse languages, reducing the recording effort needed for good phonetic coverage.

## Related

- (link related pages by id as the wiki grows)
