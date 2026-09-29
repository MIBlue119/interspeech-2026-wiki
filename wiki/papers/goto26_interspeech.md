---
id: goto26_interspeech
category: asr
labels: [self-supervised, streaming-real-time]
institutions: ["LY Corporation", "Carnegie Mellon University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1997
pdf: https://www.isca-archive.org/interspeech_2026/goto26_interspeech.pdf
---

# Online Predictive Coding for Dual-Mode Self-Supervised Speech Models

*Keita Goto, Takashi Maekaku, Jin Sakuma, Jinchuan Tian, Yusuke Shinohara, Shinji Watanabe*

[PDF](https://www.isca-archive.org/interspeech_2026/goto26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/goto26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1997)

**Category:** `asr` · **Labels:** `self-supervised`, `streaming-real-time`

**TL;DR** — This paper introduces Online Predictive Coding (OPC) and dual-mode Layer Normalization to bridge the performance gap between streaming and non-streaming speech models, cutting word error rates on LibriSpeech test-clean at 160 ms latency from 3.65% to 3.40%.

## Key contributions

- Proposed Online Predictive Coding (OPC), which regularizes learnable online registers via multi-step future feature prediction during self-supervised pre-training.
- Adopted Dual-mode Layer Normalization, maintaining separate affine parameters ($\gamma$ and $\beta$) for online and offline pathways to prevent mode-specific distribution shifts.
- Demonstrated consistent WER improvements across LibriSpeech (test-clean and test-other) and WSJ benchmarks without increasing algorithmic latency.

## Problem

Leading self-supervised speech models like wav2vec 2.0, HuBERT, and BEST-RQ are trained exclusively in offline (non-streaming) modes, causing performance drops when deployed for real-time online streaming where future context is absent. Prior dual-mode frameworks that share encoder parameters across streaming and non-streaming modes suffer from optimization instability and attention mismatches. Although past work introduced learnable 'online registers' to mimic missing future context, they lacked explicit supervision to robustly encode future information, leaving performance gains marginal.

## Method

The model builds on a wav2vec 2.0 BASE architecture featuring a convolutional feature encoder and a Transformer backbone. For online streaming mode, speech features are partitioned into chunks of size $N_c$ (varied via Dynamic Chunk Training from 2 to 32) with optional lookahead $N_l$. A single learnable online register ($N_r = 1$) is appended to each chunk to act as a surrogate for unseen future frames, enabling parallel chunk-based attention masking during training.

To ensure these registers capture future context, Online Predictive Coding (OPC) is introduced. Using linear projections $W_j$, the representations of the online registers jointly predict $N_f$ future offline representations extracted from the non-streaming pathway. The OPC objective ($\mathcal{L}_{opc}$) minimizes the cosine distance between the predicted vectors and the unmasked offline targets, with stop-gradient applied to the offline targets to prevent collapse. This loss is jointly optimized alongside the standard wav2vec 2.0 online and offline masked prediction losses ($\mathcal{L}^{on}$, $\mathcal{L}^{off}$) and codebook diversity loss ($\mathcal{L}_d$) using weight hyperparameters $w_d = 0.1$ and $w_{opc} = 0.1$.

To stabilize parameter sharing across modes—particularly given that the active online registers introduce activation patterns distinct from standard speech frames—Dual-mode Layer Normalization is implemented. Every LayerNorm layer uses decoupled affine parameters ($\gamma, \beta$) for online and offline passes while sharing all other weights. Pre-training uses 16 NVIDIA H200 GPUs for 100k steps on 960 hours of unlabeled LibriSpeech data, using the Adam optimizer with a learning rate warming up to $1 \times 10^{-4}$ over 8k steps.

## Experimental setup

Pre-trained on the 960-hour LibriSpeech corpus. Fine-tuned on LibriSpeech 960h and WSJ (train_si284) using Connectionist Temporal Classification (CTC) loss for 320k steps on 8 NVIDIA H200 GPUs. Baselines include offline wav2vec 2.0, standard dual-mode baseline without registers, dual-mode with registers, and UFO2. Evaluated using Word Error Rate (WER %) on LibriSpeech (test-clean, test-other) and WSJ (eval92, eval93) using a 4-gram language model via Flashlight beam search.

## Results

On LibriSpeech at a low-latency 160 ms setting ($N_c = 8, N_l = 0$), adding online registers drops online WER from 3.65% to 3.50% on test-clean and 10.15% to 9.80% on test-other. Adding OPC further drops online WER to 3.40% on test-clean and 9.65% on test-other, while simultaneously improving offline WER from 2.73% to 2.64% (test-clean) and 6.63% to 6.41% (test-other). Ablations on the number of predicted future frames ($N_f$) show that performance drops if $N_f$ is too small ($N_f = 2$) or too large ($N_f = 8$), peaking at $N_f = 4$. Where it does not win: on WSJ eval93, OPC shows a slight 1.2% relative offline WER increase compared to the baseline, indicating mild domain bias from the auxiliary pre-training task.

| System / Condition | test-clean (Offline) | test-clean (Online) | test-other (Offline) | test-other (Online) |
|---|---|---|---|---|
| Dual-mode Only | 2.73% | 3.65% | 6.63% | 10.15% |
| w/ Online Registers | 2.70% | 3.50% | 6.52% | 9.80% |
| w/ Online Predictive Coding (Ours) | 2.64% | 3.40% | 6.41% | 9.65% |
| wav2vec 2.0 (Offline-only baseline) | 2.6% | - | 6.1% | - |
| UFO2 | 3.0% | 3.8% | 7.1% | 9.4% |
| Ours (640 ms chunk size, $N_c=32$) | 2.6% | 3.1% | 6.4% | 8.3% |

## Limitations

Evaluated exclusively on English corpora (LibriSpeech and WSJ) and restricted to Automatic Speech Recognition downstream evaluation. The auxiliary OPC task exhibits minor cross-domain performance degradation when transferring to out-of-domain evaluation sets like WSJ. The compute requirements demand large-scale resources (16x H200 GPUs for pre-training).

## Why read this

Speech researchers building real-time streaming speech recognition models will find this a practical guide to eliminating the performance penalty of streaming self-supervised models without architectural bloat. It provides clear recipes for combining predictive coding objectives with dual-mode normalization layers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time streaming automatic speech recognition, voice assistants, and on-device live captioning.

## Institutions / 機構

LY Corporation, Carnegie Mellon University

## Related

- (link related pages by id as the wiki grows)
