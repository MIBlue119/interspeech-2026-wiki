---
id: park26h_interspeech
category: resources-evaluation
labels: [self-supervised, dataset-or-benchmark-release]
institutions: ["Spellbrush"]
code: https://github.com/sizigi/animescore
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3025
pdf: https://www.isca-archive.org/interspeech_2026/park26h_interspeech.pdf
---

# AnimeScore: A Preference-Based Dataset and Framework for Evaluating Anime-Like Speech Style

*Joonyong Park, Jerry Li*

[PDF](https://www.isca-archive.org/interspeech_2026/park26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3025)

**Category:** `resources-evaluation` · **Labels:** `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — AnimeScore is a preference-based dataset and evaluation framework for automated assessment of anime-like speech styles, achieving up to 90.8% AUC using SSL-based ranking models compared to a 69.3% ceiling for handcrafted acoustic features.

## Key contributions

- Constructed a curated dataset of 3,000 Japanese utterances (2,500 train, 500 test) paired with 15,000 pairwise human preference judgments from 187 evaluators.
- Established a multi-stage filtering pipeline utilizing Qwen3-30B-Instruct, Sidon speech enhancement, Whisper-large-v3, and ECAPA-TDNN clustering to control linguistic, acoustic, and speaker biases.
- Revealed through acoustic analysis that anime-likeness is driven by controlled resonance shaping (lower formants), prosodic continuity, and dense syllable rates rather than simply high pitch.
- Demonstrated that SSL backbones (specifically HuBERT) combined with BiLSTM and MLP layers trained on pairwise logistic loss vastly outperform handcrafted acoustic feature baselines.

## Problem

Evaluating anime-like speech style currently relies on costly subjective listening tests and lacks a standardized, reproducible automatic evaluation metric. Unlike naturalness or intelligibility, anime-likeness lacks a shared absolute perceptual scale and is multidimensional, rendering traditional Mean Opinion Score (MOS) protocols inconsistent. Developing speech generation systems in this domain is severely bottlenecked by this absence of scalable scoring protocols and automated objective reward signals.

## Method

The speech set combines samples from Anim-400k, ReazonSpeech, and Coco-Nut. The data curation pipeline removes linguistic bias by filtering out texts with high anime-subtitle probability using Qwen3-30B-Instruct (keeping scores <= 2), enhances audio using Sidon, applies UTMOS > 3 filtering, and ensures speaker diversity via ECAPA-TDNN embeddings and t-SNE clustering. Sparse comparison pairs (12,500 train, 2,500 test) are built using text and speaker similarity to emphasize cross-corpus contrasts.

The score prediction framework passes input audio through a frozen SSL encoder (wav2vec 2.0, WavLM, HuBERT, or data2vec) to extract frame-level features H. These features are fed into a bidirectional LSTM (BiLSTM), mean-pooled into a fixed-length representation, and mapped to a scalar score s(x) via a multi-layer perceptron (MLP). During training, the network predicts scores for pairs (a, b) and is optimized using the pairwise logistic loss -log sigma(sa - sb) against ground-truth A/B preference outcomes, enabling drop-in model screening or reward shaping for generative models.

## Experimental setup

Evaluations used a held-out test set of 2,500 A/B pairs derived from 500 utterances. Evaluators (n=187, predominantly male aged 30s-50s) provided 15,000 total comparative judgments. Models were compared against a multivariate logistic regression baseline using handcrafted acoustic features evaluated via 5-fold cross-validation. Metrics reported include pairwise accuracy, negative log-likelihood (NLL), and ROC-AUC.

## Results

Handcrafted acoustic features combined via logistic regression achieved a 69.3% AUC (63.4% accuracy) with dominant predictors including pause ratio and syllable rate. In contrast, frozen SSL backbones trained on the pairwise loss substantially outperformed this baseline. HuBERT achieved the highest performance with 0.3852 NLL, 82.43% accuracy, and 90.82% AUC, followed closely by WavLM at 89.44% AUC, wav2vec 2.0 at 82.47% AUC, and data2vec at 85.80% AUC.

Masked-prediction models (HuBERT, WavLM) consistently surpassed the contrastive model (wav2vec 2.0), capturing paralinguistic and prosodic properties necessary for stylistic evaluation. The models maintained robust performance on out-of-distribution within-corpus test pairs, though the study notes limitations in demographic balance and moderate data scale.

| System / Backbone | NLL | Accuracy (%) | AUC (%) |
|---|---|---|---|
| Handcrafted Features (LR) | - | 63.4 ± 1.2 | 69.3 ± 1.5 |
| wav2vec 2.0 | 0.5139 | 74.30 | 82.47 |
| data2vec | 0.4686 | 77.09 | 85.80 |
| WavLM | 0.4284 | 81.05 | 89.44 |
| HuBERT | 0.3852 | 82.43 | 90.82 |

## Limitations

The work is constrained by a moderate data scale (15,000 pairs across 3,000 utterances) and a demographic imbalance among human evaluators (76% male, heavily skewed toward individuals in their 30s to 50s). The scope is strictly limited to Japanese speech styles and does not explore model architecture ablations beyond changing the frozen SSL backbone.

## Why read this

Speech and ML researchers building generative anime or character-styled speech models should read this to understand how to replace costly subjective listening tests with an automated, SSL-backed reward signal.

## Code

- https://github.com/sizigi/animescore

## Applications

Automated quality screening for stylized speech generation systems and reinforcement learning reward signals for aligning text-to-speech models toward target voice aesthetics.

## Institutions / 機構

Spellbrush

## Related

- [Decoding the Ear (DeEAR): A Framework for Objectifying Expressiveness from Human Preference Through Efficient Alignment](lin26l_interspeech.md) — shared data / evaluation · relatedness 2.2/3
- [ParaSpeechCLAP: A Dual-Encoder Speech-Text Model for Rich Stylistic Language-Audio Pretraining](diwan26_interspeech.md) — shared technique · relatedness 2.0/3
- [A Large-Scale Dataset of Listener Impressions of Emotional TTS](cooper26_interspeech.md) — shared data / evaluation · relatedness 2.0/3
- [PrefSQA: Pairwise Preference Prediction for Speech Quality Assessment and the Critical Role of High Quality Datasets](fan26_interspeech.md) — shared technique · relatedness 2.0/3
- [Comparative Reasoning: Making an Audio Language Model Better at Comparing Emotions](naini26_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
