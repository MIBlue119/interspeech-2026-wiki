---
id: liu26r_interspeech
category: speaker-diarization
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2388
pdf: https://www.isca-archive.org/interspeech_2026/liu26r_interspeech.pdf
---

# P-SED : Asymmetric Prototype Metric Learning for Weakly Supervised Speech Emotion Diarization

[PDF](https://www.isca-archive.org/interspeech_2026/liu26r_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26r_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2388)

**TL;DR** — P-SED is a weakly supervised speech emotion diarization framework that uses an asymmetric prototype metric learning strategy to achieve a 47.00% Emotion Diarization Error Rate (EDER) on the ZED dataset.

## Problem

Speech emotion diarization (SED) requires fine-grained temporal boundaries for emotion events, but frame-level annotations are extremely scarce, forcing models to rely on utterance-level weak labels. Existing multiple instance learning methods suffer from signal sparsity, neutral background domination, and difficulty adapting to local dynamic changes without introducing label noise. These issues prevent deep models from accurately locating the start and end times of emotional events in continuous speech streams.

## Method

The framework utilizes a frozen WavLM-Large backbone followed by a projection head mapping features to a unit hypersphere, paired with $K$ learnable emotion prototypes (including a neutral state). A full pairwise orthogonality constraint ($L_{orth}$) is applied to prototypes to prevent representation collapse and enhance angular separability. Training relies on an asymmetric optimization objective combining a bag-level Class-aware Prototype Contrastive Loss ($L_{cpcl}$) and a frame-level Top-K ranking loss ($L_{topk}$) to mine salient emotion instances while suppressing neutral background noise, plus an auxiliary utterance-level classification loss ($L_{ser}$). During inference, Total Variation Denoising (TVD) with L1 regularization is employed as a post-processing module using a primal-dual algorithm to smooth temporal prediction jitter while preserving sharp boundaries. Models are trained on IEMOCAP sessions 1-4 using a batch size of 8 for 50 epochs on a single NVIDIA A40 GPU with AdamW.

## Results

Evaluated on the ZED test dataset using the Emotion Diarization Error Rate (EDER) metric, P-SED achieves a headline EDER of 47.00% with TVD post-processing, outperforming strong baselines like ENT (56.52%) and FENT (54.37%). Without post-processing, raw P-SED achieves 50.67% EDER compared to moving average (49.60%) and global extremum pooling (48.38%) alternatives. Ablation studies confirm performance degrades when substituting prototypes with a standard linear classifier (53.95%), removing orthogonal regularization, dropping bag-level $L_{cpcl}$ (+2.95% EDER), or omitting frame-level $L_{topk}$ (+3.93% EDER).

## Code

- https://github.com/LiuYumeng-Lemon/P-SED

## Applications

Speech engineers and affective computing researchers would use this framework for fine-grained dialogue emotion analysis, human-computer interaction systems, and mental health monitoring.

## Limitations

The fixed-ratio instance mining mechanism struggles with highly variable and rapidly changing emotional transitions in real conversations, and the small scale of the ZED test set limits comprehensive evaluation of generalization.

## Related

- (link related pages by id as the wiki grows)
