---
id: lavechin26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1132
pdf: https://www.isca-archive.org/interspeech_2026/lavechin26_interspeech.pdf
---

# BabAR: from phoneme recognition to developmental measures of young children''s speech production

[PDF](https://www.isca-archive.org/interspeech_2026/lavechin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lavechin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1132)

**TL;DR** — BabAR is a cross-linguistic phoneme recognition system trained on TinyVox—a newly curated standardized corpus of over half a million child vocalizations—to automate fine-grained developmental analysis of early speech production.

## Problem

Studying early speech development at scale is severely bottlenecked by the lack of automated speech recognition tools capable of handling the acoustically variable speech of young children. Existing ASR models struggle heavily with child speech due to unique vocal tract geometries and sparse public annotations, forcing researchers to choose between small-scale longitudinal depth and broad cross-sectional samples.

## Method

The authors introduce TinyVox by aggregating PhonBank across English, French, Portuguese, German, and Spanish, standardizing 967 surface IPA variants into a 57-sound cross-linguistic phonemic target set via panphon feature edit distance. Using Connectionist Temporal Classification (CTC), BabAR builds upon self-supervised speech representation models (such as BabyHuBERT and XLSR) evaluated under different pretraining regimens. A context-aware training and inference recipe is implemented by feeding extended acoustic windows (up to 20 seconds of surrounding audio context) into the encoder while calculating the CTC loss exclusively on the target utterance boundaries.

## Results

Evaluated on speaker-independent test splits from the curated TinyVox dataset spanning children aged 5 to 96 months, the system demonstrates that pretraining on multilingual child-centered daylong recordings substantially outperforms adult-only models. Incorporating a 20-second surrounding audio context window yields further performance gains during fine-tuning. Error analyses confirm that phonetic substitutions predominantly occur within the same broad phonenic categories, and validation on a held-out longitudinal dataset of 44 American infants (SEEDLingS) proves that BabAR's automatically derived speech maturity metrics closely track established developmental literature.

## Code

- https://github.com/MarvinLvn/BabAR

## Applications

Developmental psychologists, speech-language pathologists, and linguistic researchers utilize this system to automatically track phonetic maturation, canonical babbling ratios, and clinical speech markers from large-scale naturalistic child audio recordings.

## Limitations

Naturalistic corpora introduce noise such as overlapping adult speech, toy sounds, and occasionally imprecise timestamp boundaries that require careful filtering or multi-speaker handling.

## Related

- (link related pages by id as the wiki grows)
