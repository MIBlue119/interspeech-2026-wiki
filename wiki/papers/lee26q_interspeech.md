---
id: lee26q_interspeech
category: asr
labels: [efficient-on-device]
institutions: ["Dongguk University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1787
pdf: https://www.isca-archive.org/interspeech_2026/lee26q_interspeech.pdf
---

# PhonePrune: One-shot Phoneme-Aware Pruning for Large-scale ASR Models via Phoneme Set Generation and Calibration

*Minsik Lee, Jihie Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26q_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26q_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1787)

**Category:** `asr` · **Labels:** `efficient-on-device`

**TL;DR** — PhonePrune is a one-shot, phoneme-aware pruning framework for large-scale ASR models that preserves low-magnitude "phoneme tickets" critical for fine-grained phonetic distinctions, achieving an average WER of 11.50% at 50% sparsity.

## Key contributions

- Formulates the Phoneme Ticket Hypothesis, arguing that sub-networks of low-magnitude weights encode vital fine-grained phonetic features and must be preserved during compression.
- Proposes a Phoneme Set Generation strategy using contrastive triplets based on Complementary Distribution (CD) and Minimal Pairs (MP) to isolate core phoneme identities.
- Introduces a Phoneme-aware Calibration mechanism that modulates parameter selection by balancing global weight magnitudes with a local phoneme focus score.
- Demonstrates strong multilingual compression efficacy, yielding 13.41% and 13.83% WER reductions over Distil-Whisper on Korean and Japanese Common Voice datasets at 50% sparsity.

## Problem

Large-scale ASR models like Whisper face heavy deployment barriers due to massive parameter counts, but conventional one-shot pruning methods like L1 magnitude pruning or optimal brain surgeon (OBS) indiscriminately discard low-magnitude weights. Standard magnitude-based approaches fail because these low-magnitude weights often capture delicate phonetic distinctions (such as non-sibilant fricatives or transient plosives) rather than redundant information. While prior interpretability work identifies phonetic subspaces and training approaches like DyPCL use contrastive learning, integrating phoneme awareness directly into model compression has remained unaddressed. This gap causes standard compressed models to suffer heavy accuracy losses on languages reliant on fine-grained spectral and temporal cues.

## Method

PhonePrune compresses pre-trained ASR models in one shot via a two-stage pipeline: Phoneme Set Generation and Phoneme-aware Calibration. First, the method constructs a specialized pool of contrastive triplets $b_k = (z_{tgt}^+, z_{ref}^-, z_{dist}^-)$ for English, Korean, and Japanese based on phonological constraints: Complementary Distribution (CD), where a target rare allophone (e.g., flap-t [ɾ] as positive anchor $z_{tgt}$) is contrasted with a common reference allophone (e.g., aspirated-t [tʰ] as allophone negative $z_{ref}$) to filter generic contexts; and Minimal Pairs (MP), where a distractor phoneme (e.g., /d/ as acoustic negative $z_{dist}$) is used to enforce discriminability against confusable sounds. 

To isolate feature sensitivity from background sequences, a temporal mask $M_t \in \{0, 1\}$ is applied at the exact frame-level timestamps of the target phoneme over loss $\ell_t(z)$. The masked gradient magnitude for each parameter $W_{i,j}$ is extracted and aggregated into a normalized phoneme focus score $\tilde{S}_{ling}(i,j) \in [0, 1]$. In the second stage, this score is combined with global weight magnitudes into a composite score using a balancing hyperparameter $\gamma$ (set to 0.5), yielding adjusted scores $S_{i,j} = (1-\gamma)|W_{i,j}| + \gamma \tilde{S}_{ling}(i,j)$. Weights exceeding threshold $\tau$ are retained in binary mask $M$, preserving fragile phoneme tickets without expensive retraining.

## Experimental setup

Evaluated on LibriSpeech (test-clean, test-other splits) and Common Voice 15 (English, Korean, Japanese subsets) using Whisper-large as the base architecture. Compared against unstructured pruning baselines (Random, L0, L1, OBS) and compressed Whisper baselines (Quantized Whisper, Distil-Whisper, uDistil-Whisper) at a fixed 50% sparsity (756M parameters). Calibration utilizes 128 contrastive triplets sourced via TIMIT for English and Montreal Forced Aligner (MFA) for Korean and Japanese. Performance is measured using zero-shot Word Error Rate (WER).

## Results

At 50% sparsity, PhonePrune achieves an overall average WER of 11.50%, outperforming classical unstructured pruning methods like L1 (29.26% avg WER) and OBS (24.46% avg WER) by a massive margin. Compared against compressed Whisper variants, PhonePrune trails slightly on English benchmarks (e.g., LibriSpeech test-clean WER of 4.08% vs. Distil-Whisper's 3.50%), but dominates on non-English phonology-heavy datasets. It achieves a WER of 15.50% on Common Voice KR and 16.20% on Common Voice JP, representing relative WER reductions of 13.41% and 13.83% over Distil-Whisper, respectively.

Ablation studies show that scaling the calibration sample size $N$ from 16 to 128 steadily improves performance across all datasets (e.g., LibriSpeech test-clean drops from 4.45% to 4.08%). Tuning the balancing hyperparameter $\gamma$ demonstrates that $\gamma = 0.5$ is optimal; setting $\gamma = 0.0$ collapses to standard magnitude pruning (test-clean WER 8.40%), while $\gamma = 1.0$ ignores generic acoustic features (test-clean WER 5.80%).

| System / Condition | LibriSpeech test-clean | LibriSpeech test-other | CV 15 EN | CV 15 KR | CV 15 JP | Avg. WER |
|---|---|---|---|---|---|---|
| Dense (Unpruned) | 3.10 | 6.20 | 8.50 | 9.10 | 9.50 | 7.28 |
| L1 Unstructured | 14.80 | 25.40 | 31.50 | 36.20 | 38.40 | 29.26 |
| Quantized Whisper | 4.15 | 8.80 | 14.90 | 19.10 | 20.50 | 13.49 |
| Distil-Whisper | 3.50 | 6.80 | 11.80 | 17.90 | 18.80 | 11.76 |
| uDistil-Whisper | 3.60 | 8.10 | 12.40 | 19.20 | 19.50 | 12.56 |
| PhonePrune (Ours) | 4.08 | 8.50 | 13.20 | 15.50 | 16.20 | 11.50 |

## Limitations

PhonePrune requires forced alignment tooling (such as MFA) on calibration audio to derive precise temporal masks for gradient sensitivity computation, limiting its plug-and-play zero-shot ease for unaligned data. While it excels on languages with complex phonetic contrasts like Korean and Japanese, it exhibits slightly lower performance on English relative to dedicated distillation pipelines like Distil-Whisper. The evaluation scope is restricted to three languages (English, Korean, Japanese) and a single base model family (Whisper-large), leaving cross-family and broader multilingual scalability open.

## Why read this

Speech engineers and researchers tackling ASR model compression should read this to understand how phonological constraints and contrastive calibration can rescue low-magnitude weights from destructive magnitude pruning. It provides a blueprint for preserving fine-grained phonetic details in non-English or low-resource languages without expensive retraining loops.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device speech recognition, edge deployment of large-scale multilingual ASR models, and resource-constrained automatic transcription systems.

## Institutions / 機構

Dongguk University

**Funding / 經費:** Ministry of Science and ICT, Information Technology Research Center, Institute for Information & Communications Technology Planning & Evaluation, Artificial Intelligence Convergence Innovation Human Resources Development

## Related

- [Pruning as Regularization: Sensitivity-Aware One-Shot Pruning in ASR](irigoyen26_interspeech.md) — same problem · relatedness 2.6/3
- [Towards Data-free and Training-free Compression for Speech Foundation Models Using Parameter Clustering](xu26h_interspeech.md) — same problem · relatedness 2.6/3
- [The silence of the weights: a structural pruning strategy for Attention-based audio signal architectures with second-order metrics](diecidue26_interspeech.md) — shared technique · relatedness 2.1/3
- [Measuring the Redundancy of Decoder Layers in SpeechLLMs](moumen26_interspeech.md) — same problem · relatedness 2.0/3
- [Pushing the Limits of Compression: Sub-1-Bit Conformer via Variable-Rank Binary Decomposition](yeo26_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
