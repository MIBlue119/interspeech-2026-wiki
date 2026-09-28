---
id: jung26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-939
pdf: https://www.isca-archive.org/interspeech_2026/jung26_interspeech.pdf
---

# Listening Between the Lines: Joint Learning of ASR Embeddings and LLM-Augmented Linguistics for Dementia Detection

*Olivier Jiyoun Jung, Jonghyeon Park, Myungwoo Oh*

[PDF](https://www.isca-archive.org/interspeech_2026/jung26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jung26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-939)

**TL;DR** — A multimodal dementia detection framework combines Whisper-derived acoustic embeddings with LLM-extracted linguistic features via a gated fusion network, achieving an F1-score of 90.14% on the ADReSSo benchmark.

## Key contributions

- A dual-purpose pipeline using Whisper large-v3 for simultaneous ASR transcript generation and 1280-dimensional acoustic feature extraction.
- An automated hierarchical topic taxonomy (8 attentional zones, C1-C8) constructed via GPT-5.2 to replace manual Information Units.
- Extraction of 46 interpretable sentence-level features mapped down to an optimized 29-feature subset via feature interaction analysis.
- A gated multimodal fusion network that adaptively weights acoustic and linguistic pathways for robust speaker-level Alzheimer's disease classification.

## Problem

Current speech-based dementia screening relies heavily on unimodal pipelines or decades-old, manually constructed Information Unit (IU) coding schemes that miss discourse-level patterns. Existing LLM approaches often treat embeddings as black boxes or fail to combine linguistic representations with paralinguistic acoustic markers. This work addresses the need for a non-invasive, interpretable, and jointly optimized multimodal diagnostic tool to screen for cognitive decline.

## Method

The framework processes speech through two parallel pathways. The acoustic pathway feeds frame-level Whisper large-v3 encoder outputs into a two-layer bidirectional LSTM (hidden dimension 128, producing 256-dimensional concatenated states) followed by attention pooling and a feed-forward layer with LayerNorm to yield a 128-dimensional vector. The linguistic pathway utilizes GPT-5.2 to analyze preprocessed ASR transcripts via a unified sentence-level prompt covering topic classification, confidence, language quality, content integration, and semantic distance, extracting 46 speaker-level features reduced to an optimized 29-feature subset. These pass through a feed-forward network (hidden dimension 32) with LayerNorm to produce a 128-dimensional linguistic vector.

A gated fusion network combines the acoustic vector (s) and linguistic vector (f) using a sigmoid gating mechanism: g = sigmoid(W_g [s; f]), producing a fused representation z = g * s + (1 - g) * f. The fused representation passes through a two-layer feed-forward classifier with LayerNorm (hidden dimension 64) to output AD/CN predictions. The model is trained using AdamW with a learning rate of 2e-5 and batch size of 64, employing early stopping with patience of 30 epochs based on validation F1-score. Inference aggregates segment-level predictions to speaker-level via majority voting.

## Experimental setup

Evaluated on the ADReSS dataset (156 speakers balanced: 108 train, 48 test) and ADReSSo dataset (166 train, 71 test) derived from DementiaBank's Pitt Corpus Cookie Theft picture descriptions. Baselines include prior challenge entries (Luz et al., Zhu et al., Ilias et al.), unimodal acoustic models (Li & Zhang), and LLM linguistic approaches (Park et al.). Metrics include Accuracy, F1-score, Precision, and Recall for AD and CN classes.

## Results

The multimodal approach achieves an F1-score of 89.47% (Acc: 89.58%) on ADReSS and 90.14% (Acc: 90.14%) on ADReSSo, outperforming the official challenge baselines by 19.3% and 14.3% respectively. Multimodal fusion outperforms acoustic-only (83.08% F1 on ADReSSo) and linguistic-only (76.06% F1 on ADReSSo) configurations by substantial margins of 14.1 and 7.1 percentage points. Ablations show that an optimized subset of 29 features—where only 44.8% showed individual statistical significance (p < 0.05)—outperformed a purely significant-only feature configuration (78.87% F1), proving the value of feature interactions. LSTM-based temporal pooling (90.14% F1) edges out CNN-based pooling (88.73% F1) on ADReSSo.

| System/Condition | Accuracy | F1-Score | AD Precision | AD Recall |
|---|---|---|---|---|
| Luz et al. (ADReSSo Baseline) [4] | - | 78.87 | - | - |
| Li & Zhang (Acoustic only) [28] | - | 84.51 | - | - |
| Ours (Linguistic only) | - | 76.06 | - | - |
| Ours (Acoustic only) | - | 83.08 | - | - |
| Ours (Multimodal - ADReSS) | 89.58 | 89.47 | 100.0 | 79.17 |
| Ours (Multimodal - ADReSSo) | 90.14 | 90.14 | 88.89 | 91.43 |

## Limitations

The reliance on GPT-5.2 for feature extraction requires external API access, creating latency and cost hurdles for resource-constrained clinical environments. Evaluation is strictly bounded to English-language Cookie Theft descriptions, leaving multilingual and cross-task generalization untested. The model also lacks tracking of longitudinal disease progression.

## Why read this

Researchers and engineers building clinical speech AI will find a blueprint for effectively fusing frozen self-supervised acoustic representations with structured LLM-derived discourse features via gated attention. It provides critical empirical proof that univariate statistical significance filtering harms multimodal classifiers compared to leveraging feature interactions.

## Code

- https://github.com/vivivic/is26dementia

## Applications

Non-invasive computer-aided screening for Alzheimer's disease and dementia in clinical or telehealth settings.

## Related

- (link related pages by id as the wiki grows)
