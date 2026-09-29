---
id: murugaiyan26_interspeech
category: paralinguistics-emotion
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3236
pdf: https://www.isca-archive.org/interspeech_2026/murugaiyan26_interspeech.pdf
---

# WhiSSDapt: Adaptive Fusion of Whisper Layer Embeddings for Sentence Stress Detection

*Someshwaran Murugaiyan, Jhansi Mallela, Chiranjeevi Yarra*

[PDF](https://www.isca-archive.org/interspeech_2026/murugaiyan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/murugaiyan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3236)

**Category:** `paralinguistics-emotion` · **Labels:** `self-supervised`

**TL;DR** — WhiSSDapt introduces an adaptive layer fusion framework over a frozen Whisper model to jointly leverage multi-layer acoustic and contextual representations for sentence stress detection, achieving up to 6.09% relative F1 improvement over fixed-layer baselines.

## Key contributions

- A learnable weighted layer aggregation module that dynamically combines representations across all encoder and decoder layers of a frozen Whisper backbone.
- Comprehensive evaluation across four diverse datasets covering naturally spoken non-native speech (ISLE GER/ITA) and controlled synthetic prompts (TinyStress-15k, EmphAsses).
- Extensive layer-weight analysis revealing consistent anchor points across tasks—specifically encoder Layer 12 and decoder Layer 9—as the most informative representations for prominence detection.
- Rigorous ablation studies comparing fixed dual-encoder-decoder combinations against fully adaptive weighted fusion, validating the identified architectural preferences.

## Problem

Sentence stress detection requires integrating both local acoustic realization (such as pitch, duration, and energy) and higher-level sentence context to determine word prominence. Prior models rely either on manually engineered prosodic features with recurrent classifiers, or feed fixed-layer embeddings from self-supervised and encoder-decoder models (e.g., Whisper Layer 9 in WhiStress) into downstream tasks. Selecting a single static layer is suboptimal because acoustic, phonetic, and lexical properties emerge progressively across different hierarchical depths rather than concentrating in one layer.

## Method

The WhiSSDapt architecture uses a frozen Whisper-small (English-only, d_model = 768) encoder-decoder backbone. Instead of extracting a single layer, a learnable scalar parameter with a temperature-scaled softmax is applied independently to all encoder and decoder layers to compute normalized weights. The aggregated encoder and decoder representations are computed as weighted sums, which are then fed into an additional decoder block where the fused decoder state attends to the fused encoder state via cross-attention. A two-layer feed-forward classification head (768 to 1536 via ReLU, then to 2 logits) performs token-level binary stress classification, which is subsequently mapped to word-level labels via forced alignment. The model is trained using weighted cross-entropy loss (assigning class weights of 1.0 for unstressed and 2.33 for stressed classes) to counteract class imbalance. Training updates only the fusion weights, the additional decoder block, and the classification head using AdamW with a learning rate of 5e-4, weight decay of 0.01, batch size of 24, early stopping, and a temperature parameter tau set to 0.1 for GER, ITA, and EmphAsses, and 0.01 for the larger TinyStress-15k dataset.

## Experimental setup

Evaluated on four datasets: ISLE-German (17,082 stressed / 10,054 unstressed words), ISLE-Italian (15,848 / 9,377), TinyStress-15k (~15 hours, 48,752 / 146,248), and EmphAsses (3,652 samples, 29,216 / 6,155). Baseline comparisons include SupraDoRAL and WhiStress. Performance is measured using the word-level F1-score.

## Results

WhiSSDapt outperforms all baselines across every tested condition. On synthetic datasets, it achieves an F1-score of 0.9131 on TinyStress-15k (vs. 0.909 for WhiStress) and 0.9811 on EmphAsses (vs. 0.939 for WhiStress), representing up to 6.09% relative improvement. On naturally spoken non-native ISLE datasets, it reaches 0.853 on German (vs. 0.804 for WhiStress and 0.7817 for SupraDoRAL) and 0.8930 on Italian (vs. 0.870 for WhiStress and 0.8656 for SupraDoRAL), delivering up to 4.48% relative improvement over WhiStress and 9.12% over SupraDoRAL. Layer analyses and ablation configurations show that the fixed dual-layer setup E(1,12)-D9 closely approximates fully adaptive fusion, whereas substituting deeper decoder representations (e.g., D12) severely degrades performance.

| System | TinyStress-15k | EmphAsses | GER | ITA |
|---|---|---|---|---|
| SupraDoRAL | – | – | 0.7817 | 0.8656 |
| WhiStress | 0.909 | 0.939 | 0.804 | 0.870 |
| WhiSSDapt | **0.9131** | **0.9811** | **0.853** | **0.8930** |

## Limitations

The evaluation is restricted to English-language tasks and speech data, utilizing the Whisper-small English-only backbone. The approach relies on forced alignment pipelines for word-level boundary mapping, which can introduce propagation errors from ASR token-to-word mappings. Additionally, the exploration is currently constrained to sentence stress detection and has not yet been validated on broader paralinguistic tasks.

## Why read this

Speech and ML researchers working on paralinguistics and prosody modeling should read this paper to understand how multi-layer representation dynamics in encoder-decoder architectures like Whisper can be harnessed through light-weight adaptive fusion rather than ad-hoc layer selection.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving prosodic naturalness, emphasis handling, and spoken language understanding in conversational Human-Computer Interaction (HCI) systems and text-to-speech dialog agents.

## Institutions / 機構

Vellore Institute of Technology, International Institute of Information Technology Hyderabad

## Related

- (link related pages by id as the wiki grows)
