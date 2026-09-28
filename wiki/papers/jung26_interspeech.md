---
id: jung26_interspeech
category: paralinguistic
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-939
pdf: https://www.isca-archive.org/interspeech_2026/jung26_interspeech.pdf
---

# Listening Between the Lines: Joint Learning of ASR Embeddings and LLM-Augmented Linguistics for Dementia Detection

[PDF](https://www.isca-archive.org/interspeech_2026/jung26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jung26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-939)

**TL;DR** — A multimodal framework for early dementia detection integrates Whisper acoustic representations and LLM-extracted linguistic features via a gated fusion network, achieving an F1-score of 90.14% on the ADReSSo benchmark.

## Problem

Current speech-based dementia screening approaches often analyze acoustic and linguistic modalities in isolation or rely on decades-old manual coding schemes like information units that fail to capture full discourse patterns. Capturing both dimensions simultaneously is challenging, yet essential because acoustic biomarkers (such as pause patterns) and linguistic markers (such as semantic coherence) offer complementary signals of cognitive decline.

## Method

The framework utilizes Whisper large-v3 for dual-purpose extraction: encoder frame-level representations for the acoustic pathway and transcripts for the linguistic pathway. The acoustic pathway aggregates variable-length sequences using an LSTM temporal network followed by attention pooling and LayerNorm feed-forward layers into a 128-dimensional vector. The linguistic pathway prompts an LLM with a hierarchical topic taxonomy (eight attentional zones for Cookie Theft) to extract 46 sentence-level features across diversity, flow, quality, integration, and confidence, with 29 features selected for the final model. A gated fusion network dynamically weights and combines the acoustic and linguistic representations before final feed-forward classification.

## Results

Evaluated on the ADReSS and ADReSSo benchmark datasets derived from DementiaBank's Pitt Corpus, the method achieves speaker-level F1-scores of 89.47% and 90.14% (accuracies of 89.58% and 90.14%), outperforming challenge baselines and prior unimodal methods. Multimodal fusion outperforms acoustic-only (83.08% F1) and linguistic-only (76.06% F1) configurations on ADReSSo. An ablation on feature selection shows that an optimized subset where only 44.8% of features show individual statistical significance outperforms a 100% significant-only feature subset, proving that non-significant features contribute through interactions. An architecture ablation shows that an LSTM temporal network outperforms or matches a CNN.

## Code

- https://github.com/vivivic/is26dementia

## Applications

Clinicians and digital health developers can use this framework for non-invasive, automated screening of Alzheimer's disease and cognitive decline from patient speech recordings.

## Limitations

The dependency on external LLM APIs poses deployment hurdles in resource-constrained clinical settings, and evaluation is currently restricted to English-language Cookie Theft descriptions.

## Related

- (link related pages by id as the wiki grows)
