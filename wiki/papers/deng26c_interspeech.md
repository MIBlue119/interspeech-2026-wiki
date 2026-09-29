---
id: deng26c_interspeech
category: asr
labels: [low-resource, multilingual]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1611
pdf: https://www.isca-archive.org/interspeech_2026/deng26c_interspeech.pdf
---

# Confidence Score Guided Incremental and Speaker Adaptive Pseudo-Labeling for Semi-Supervised Elderly Speech Recognition

*Chengxi Deng, Xurong Xie, Shujie Hu, Jiajun Deng, Mengzhe Geng, Youjun Chen, Huimeng Wang, Haoning Xu, Guinan Li, Xunying Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/deng26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/deng26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1611)

**Category:** `asr` · **Labels:** `low-resource`, `multilingual`

**TL;DR** — This paper proposes a confidence-score guided incremental and speaker-adaptive pseudo-labeling framework for semi-supervised elderly speech recognition, achieving statistically significant WER/CER reductions of 1.45% and 2.27% absolute on English and Cantonese elderly datasets.

## Key contributions

- A curriculum learning strategy that partitions unlabeled data from high to low confidence per speaker, avoiding error accumulation and complete utterance discard.
- A lightweight Confidence Estimation Module (CEM) built from a 3-layer residual feedforward network with a sigmoid gate to produce token- and utterance-level reliability ranks.
- Integration of speaker prompt-adapted LoRA-Whisper models into the iterative updates to mitigate severe speaker heterogeneity in elderly and clinical populations.
- Demonstration of robust performance matching fully supervised baselines using only 10% labeled data across DementiaBank Pitt and JCCOCC MoCA corpora.

## Problem

Elderly and clinical speech exhibits high heterogeneity, such as imprecise articulation from neuromotor decay and linguistic degradation from cognitive decline, causing high error rates in standard speech foundation models. Existing semi-supervised methods suffer from three key flaws: confidence-based filtering entirely discards low-confidence utterances (hurting speaker modeling), prior incremental methods lack reliability-based partitioning which leads to error cascades, and traditional setups rely on speaker-independent models that fail to capture individual physiological variations. This makes effective exploitation of large pools of untranscribed clinical tele-consultation data extremely difficult.

## Method

The method uses Whisper-medium as the base architecture, processing log-Mel spectrogram inputs downsampled via a convolutional block, with LoRA parameters (rank 8, alpha 16) applied to attention query, key, value, and output layers. A lightweight Confidence Estimation Module (CEM)—a 3-layer residual feedforward network with a hidden dimension of 64, batch normalization, dropout, and a sigmoid gate—takes decoder token outputs concatenated with top-10 score logits to predict confidence against edit-distance-aligned targets (1 for correct, 0 for substitution/insertion).

Unlabeled data is ranked per-speaker by utterance-level confidence (mean token confidence excluding special tokens) and uniformly partitioned into $K=5$ subsets from high to low confidence. Training follows a curriculum where model $m_1$ (fine-tuned on 10% labeled data $\langle S, T \rangle$) decodes the highest-confidence subset $\langle U_1, L_1 \rangle$. For subsequent iterations $i$, model $m_i$ regenerates pseudo-labels for subset $i$, which is merged with the labeled data and all previously accumulated pseudo-labeled subsets to update the model.

To capture speaker heterogeneity, speaker adaptive training (SAT) is incorporated by concatenating a set of $Q=4$ learnable speaker prompts to the convolutional speech hidden states before Transformer encoding. During test-time adaptation (TTA) or speaker adaptive relabeling (SA relab.), speaker prompts are optimized for test speakers using generated pseudo-labels to iteratively refine downstream text transcriptions.

## Experimental setup

Experiments use the DementiaBank Pitt corpus (33 hours, 292 AD assessment interviews, expanded to 58.9 hours via silence stripping/augmentation; 119 dev speakers, 95 eval speakers) and the Cantonese JCCOCC MoCA corpus (32.4 hours, 256 interviews, expanded to 156.9 hours; 49 dev and eval speakers). 10% of training speakers are randomly selected as labeled data with zero speaker overlap between labeled and unlabeled sets. Comparisons include fully supervised models, standard semi-supervised baselines, random sampling, and random partition incremental learning. Models are evaluated using Word Error Rate (WER%) and Character Error Rate (CER%) across participant (Par.) and clinical investigator (Inv.) subsets.

## Results

The proposed incremental speaker-adaptive pseudo-labeling method outperforms the standard semi-supervised baseline (Sys. 3) by absolute WER/CER reductions of 1.45% and 2.27% (6.21% and 6.98% relative) on the DementiaBank Pitt and JCCOCC MoCA test sets. Ablations demonstrate that retaining 80% of pseudo-labeled data across 4 to 5 incremental steps yields optimal performance, while replacing confidence ranking with random partitioning degrades results. Under extreme low-resource conditions using only 5% labeled speakers, the method achieves a competitive WER of 23.43% on DementiaBank Pitt.

| System | Dataset / Condition | WER (%) / CER (%) |
|---|---|---|
| 100% Fully Supervised | DementiaBank Pitt (Eval All) | 20.43 |
| 10% Fully Supervised Sup. Baseline | DementiaBank Pitt (Eval All) | 23.70 |
| Standard Semi-Sup. Baseline | DementiaBank Pitt (Eval All) | 23.62 |
| Incremental SI (Conf. Score) | DementiaBank Pitt (Eval All) | 22.23 |
| Incremental SAT + SA Relab. | DementiaBank Pitt (Eval All) | 21.50 |
| Incremental SAT + SA Relab. | JCCOCC MoCA (Eval All) | 30.25 |

## Limitations

The approach assumes speaker identities are known for unlabeled data to initialize and accumulate speaker prompts, which may not hold in completely anonymous clinical streams. The study focuses exclusively on elderly pathological assessment interviews (DementiaBank and MoCA), meaning generalizability to other noisy acoustic domains or general elderly conversational audio requires further validation. Compute requirements scale linearly with the number of iterative pseudo-labeling steps and prompt adaptation passes.

## Why read this

Speech researchers and engineers building automatic speech recognition systems for medical, clinical, or elderly populations will find this a definitive recipe for turning unannotated patient interviews into high-performing models via curriculum-based pseudo-labeling and speaker prompt adaptation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated speech recognition for elderly care, dementia screening interview transcription, tele-health clinical documentation, and low-resource medical dictation.

## Institutions / 機構

Chinese University of Hong Kong, Chinese Academy of Sciences, National Research Council Canada

**Funding / 經費:** Hong Kong RGC GRF, Basic Research Project of Institute of Software, Chinese Academy of Sciences, Youth Innovation Promotion Association CAS

## Related

- (link related pages by id as the wiki grows)
