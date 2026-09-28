---
id: tushar26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2191
pdf: https://www.isca-archive.org/interspeech_2026/tushar26_interspeech.pdf
---

# Child-Centric Voice Anonymization in Single and Multi-Speaker Speech via Domain-Adapted SSL Models

[PDF](https://www.isca-archive.org/interspeech_2026/tushar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tushar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2191)

**TL;DR** — This paper adapts a self-supervised learning voice anonymization pipeline specifically for children's speech, achieving strong speaker privacy while maintaining intelligibility and perceptual quality in both single-speaker and multi-speaker settings.

## Problem

Standard voice anonymization systems are trained exclusively on adult speech corpora and architectures, leading to severe degradation in linguistic intelligibility and perceptual quality when applied to children's speech. Furthermore, prior work focuses strictly on single-speaker scenarios, failing to address complex real-world environments like classrooms or clinical sessions where children interact directly with adults. This lack of domain adaptation causes child speech to be distorted toward adult-like characteristics or suffer from severe utility loss.

## Method

The system decomposes input speech into a soft content representation using a HuBERT encoder, a pitch contour, and an ECAPA-TDNN speaker embedding. To domain-adapt the pipeline for children, the HuBERT content encoder and the HiFi-GAN vocoder are fine-tuned on the MyST child speech corpus, while the adult speaker pool is replaced by a screened set of synthetic, age-consistent child voices. For multi-speaker conversations, a Conformer-based target speaker extraction model isolates the target stream prior to anonymization. The architecture is evaluated across adult-adult, child-adult, and child-child overlapping mixture conditions.

## Results

Evaluated on the MyST in-domain corpus and zero-shot cross-accent datasets (MPS and SpeechOcean), the fully adapted child-domain system (SSL-FT) improves equal error rate (EER) to 45.09% while reducing word error rate (WER) to 16.64% on MyST. Human listening tests confirm that the child-adapted SSL pipeline yields superior naturalness and fluency compared to baseline signal-processing methods like B2 while properly preserving perceived child age. In two-speaker mixtures, target speaker privacy remains robust and stable across overlap ratios from 0% to 100%.

## Code

- https://github.com/pranavtushar/SSL-CVA

## Applications

Speech engineers and developers building child-centric interactive AI tools, educational tutoring systems, or clinical speech applications requiring strict privacy protection without losing children's age-dependent acoustic cues.

## Limitations

In multi-speaker settings, intelligibility and performance remain heavily constrained by the quality of the target speaker extraction phase, particularly in acoustically challenging child-child mixture pairings.

## Related

- (link related pages by id as the wiki grows)
