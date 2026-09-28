---
id: shahin26_interspeech
category: health
updated: 2026-09-29
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/shahin26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/shahin26_interspeech.pdf
---

# SayCheck: Gamified Speech Practice and Attribute-Based Speech Analysis for Children

[PDF](https://www.isca-archive.org/interspeech_2026/shahin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shahin26_interspeech.html)

**TL;DR** — SayCheck combines a Mario-style gamified home speech therapy application with an automatic phonological attribute analysis tool to provide clinicians and caregivers with detailed diagnostic pronunciation feedback.

## Problem

Children undergoing speech therapy often struggle with consistency and engagement during repetitive home practice exercises. Traditional digital tools typically rely on coarse, correctness-based phoneme scoring that fails to offer clinicians deep insight into the specific articulatory and phonological features causing pronunciation errors.

## Method

The platform consists of two integrated pieces: Say Bananas, a side-scrolling adventure game that triggers target word recording tasks upon collecting in-game stars, and PhoneAid, an automated assessment engine. PhoneAid leverages a wav2vec2 feature extractor coupled with a separable connectionist temporal classification (SCTC-SB) multi-label sequence prediction framework. This architecture maps audio directly into binary phonological attribute sequences covering vowel features, consonant features, articulatory placement, manner, temporal properties, and vowel structure. The underlying models are trained specifically on Australian child speech data to accommodate developmental variations.

## Results

The system evaluates children's speech at both the phoneme level—detecting substitutions, insertions, deletions, and correct productions—and the phonological attribute level. It computes summary statistics across multiple recordings including overall phoneme accuracy, percentage consonants correct (PCC), percentage vowels correct (PVC), and grouped attribute-level accuracy measures. Specific quantitative baseline error reductions or comparative test set metrics are not reported in the provided text.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-language pathologists and caregivers managing pediatric speech therapy and home-practice regimens.

## Limitations

The text does not state any explicit limitations or scope boundaries.

## Related

- (link related pages by id as the wiki grows)
