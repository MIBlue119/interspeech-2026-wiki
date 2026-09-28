---
id: chen26l_interspeech
category: speech-translation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1148
pdf: https://www.isca-archive.org/interspeech_2026/chen26l_interspeech.pdf
---

# Leveraging Audio-LLMs to Filter Speech-to-Speech Training Data

[PDF](https://www.isca-archive.org/interspeech_2026/chen26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1148)

**TL;DR** — This paper proposes a two-stage Rank-to-Distill data filtering framework using audio large language models to remove noise and semantic errors from mined speech-to-speech translation corpora, yielding up to a +1.4 ASR-BLEU improvement.

## Problem

Large-scale mined parallel speech corpora for end-to-end speech-to-speech translation (S2ST) frequently contain substantial acoustic noise, segmentation errors, and semantic misalignments. Existing filtering methods rely on fragile hand-crafted heuristics or text-only metrics that are insensitive to audio-specific artifacts and cross-lingual speech mismatch. Consequently, training models on unfiltered data destabilizes learning and degrades translation performance.

## Method

The authors introduce a two-stage self-bootstrapping filtering framework. In Stage I, a lightweight LambdaMART ranker is trained on synthetic positive pairs and degraded negative variants to score a large unlabeled candidate pool based on multi-aspect signals including SNR, UTMOS, LLM adequacy, and BLEURT. In Stage II, top- and bottom-ranked pairs are selected as keep/drop pseudo-labels to fine-tune a Qwen2-Audio model using 4-bit LoRA (r=16, alpha=32) with instruction-following causal LM loss. The final student model directly ingests raw source and target speech pairs to render binary filtering decisions.

## Results

Evaluated on the CVSS-C (FR-EN) and SpeechMatrix datasets using a discrete-unit S2ST backbone trained from scratch, the proposed audio-LLM filter achieves 22.72 ASR-BLEU when retaining roughly 477k pairs. This outperforms the unfiltered baseline (21.32 BLEU), random selection (21.27), BLASER 2.0-QE filtering (21.71), and a text-only 70B LLaMA filter (22.32) under a matched data budget. Ablations confirm that omitting the Stage I ranker fails because synthetic perturbations alone cannot capture real-world noise distributions.

## Code

- https://github.com/chin-alt/S2S-Filtering

## Applications

Speech and machine learning engineers building end-to-end speech-to-speech translation systems from automatically mined or web-scraped multi-lingual speech corpora.

## Related

- (link related pages by id as the wiki grows)
