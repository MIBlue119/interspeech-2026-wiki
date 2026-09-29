---
id: geng26_interspeech
category: asr
institutions: ["University of Tokyo"]
code: https://github.com/Secondtonumb/IF-MDD
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-711
pdf: https://www.isca-archive.org/interspeech_2026/geng26_interspeech.pdf
---

# Beyond Acoustic Sparsity and Linguistic Bias: A Prompt-Free Paradigm for Mispronunciation Detection and Diagnosis

*Haopeng Geng, Longfei Yang, Xi Chen, Haitong Sun, Daisuke Saito, Nobuaki Minematsu*

[PDF](https://www.isca-archive.org/interspeech_2026/geng26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/geng26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-711)

**Category:** `asr`

**TL;DR** — The paper introduces CROTTC-IF, a prompt-free framework for Mispronunciation Detection and Diagnosis (MDD) that decouples acoustic modeling from explicit canonical prompts, achieving a 71.77% F1-score on L2-ARCTIC.

## Key contributions

- Proposed Consistency-Regularized Optimal Temporal Transport Classification (CROTTC) to enforce strict monotonic, frame-level alignments and capture transient mispronunciation cues.
- Introduced the Indirect Fusion (IF) strategy based on Learning Using Privileged Information (LUPI) to implicitly inject linguistic priors without overriding acoustic evidence during inference.
- Demonstrated via multi-modality LLM experiments that explicit canonical priors and strong linguistic prompts degrade MDD sensitivity due to over-correction.
- Achieved state-of-the-art performance across multiple corpora, including L2-ARCTIC, speechocean762, ERJ, and a 2nd place finish on the Iqra'Eval2 leaderboard (71.70% F1).

## Problem

Current Automatic Speech Recognition (ASR)-derived Mispronunciation Detection and Diagnosis (MDD) systems fall into two major methodological traps. First, the Acoustic Trap caused by CTC models prioritizing global sequence correctness and smoothing over subtle, transient acoustic variations. Second, the Linguistic Trap caused by explicit canonical prompts and language model post-processing that bias predictions toward intended targets and mask actual phonetic errors. These limitations reduce diagnostic objectivity and render existing models ineffective for detecting fine-grained deviations.

## Method

The CROTTC-IF framework consists of a CROTTC acoustic front-end, an auxiliary teacher network for knowledge transfer, and a lightweight language model decoder. The CROTTC acoustic model replaces CTC by utilizing one-dimensional optimal transport to compute a monotonic frame-to-label alignment plan $\gamma(\alpha, eta)$, where frame weights $\alpha$ are predicted via a neural network and label weights $\beta$ are uniform. Consistency Regularization (CR) is applied using stochastically perturbed augmented views of input spectrograms (time warping, time/frequency masking with a ratio up to 0.3) optimized via symmetric KL-divergence to stabilize frame-level posterior distributions.

During training, an auxiliary teacher network leverages canonical phonemes and ground-truth error sequences as privileged information via parallel transformer decoder fusion networks (FuNenc and FuNdec). This teacher provides fast-converging gradients that guide the encoder and decoder backbone through backpropagation. The auxiliary teacher is discarded during inference. The final hypothesis is searched via beam search (beam size 10, temperature 1.1) by maximizing interpolated log-probabilities between AM and LM using a high acoustic decoding weight ($\lambda = 0.9$). Training utilized a 384-hidden-dimension Conformer/WavLM Large backbone, optimized with batch size 32 on a single NVIDIA GH200 GPU.

## Experimental setup

Evaluated on L2-ARCTIC (3.66 hours, 6 test speakers), Speechocean762 (5.58 hours, 125 speakers), ERJ (0.99 hours, 8 speakers), and the Iqra'Eval2 Arabic Qur'anic recitation dataset (~159 hours total across TTS and extra corpora). Baselines included dictation-style methods (MPL-MDD, RNN-T, MV-w2v2, w2v2-CTC, Meta-Learn), text-prompting models (Qwen2, AEL, MDDGCN, Peppanet, PG-MDD, TG+Contrast), and frame-wise models (Joint-align, PER-MDD). Evaluated using F1-score, precision, recall, false rejection rate (FRR), false acceptance rate (FAR), error diagnosis rate (EDR), phoneme error rate (PER), and correction rate (COR).

## Results

CROTTC-IF achieves a headline F1-score of 71.77% on L2-ARCTIC, outperforming w2v2-CTC (60.44%), PER-MDD (69.60%), and standard CTC-IF (58.37%), while obtaining the lowest FRR of 3.39% and highest COR of 92.42%. On the Iqra'Eval2 challenge, CROTTC-IF ranks 2nd on the leaderboard with a 71.70% F1-score and a PER of 3.72%. Ablations show that removing optimal transport drops the F1-score, and explicitly prompting LLMs with canonical targets collapses the F1-score to 40.52%, proving the negative impact of the linguistic trap.

| System | F1 (%) | FRR (%) | FAR (%) | PER (%) | COR (%) |
|---|---|---|---|---|---|
| w2v2-CTC [14] | 60.44 | 5.70 | 41.80 | 16.20 | - |
| PER-MDD [22] | 69.60 | 4.43 | 32.44 | 104.08 | 90.42 |
| OTTC | 63.18 | 5.14 | 39.71 | 18.35 | 89.96 |
| CTC-IF | 58.37 | 5.75 | 44.71 | 13.72 | 88.34 |
| CROTTC-IF (Proposed) | 71.77 | 3.39 | 32.76 | 46.52 | 92.42 |

## Limitations

The framework relies heavily on a high acoustic weight to suppress linguistic over-correction, which can increase insertion errors if uncalibrated. While effective on L2 English and Arabic Qur'anic datasets, the evaluation is bounded by the specific phoneme inventories (39 ARPAbet units, 67 Arabic phonemes) and dataset domains tested. Additionally, auxiliary teacher training requires explicit frame-level error annotations as privileged information during the training phase.

## Why read this

Speech and ML researchers working on CAPT or fine-grained sequence diagnosis should read this to understand why standard CTC and text-prompted LLMs fail at mispronunciation detection, and how optimal transport with indirect knowledge transfer resolves acoustic sparsity.

## Code

- https://github.com/Secondtonumb/IF-MDD

## Applications

Computer-Aided Pronunciation Training (CAPT) systems for L2 language learners and religious recitation evaluation platforms (e.g., Qur'anic Tajweed assessment).

## Institutions / 機構

University of Tokyo

## Related

- [Domain-Aware Mispronunciation Detection and Diagnosis Using Language-Specific Statistical Graphs](nguyen26g_interspeech.md) — same problem · relatedness 3.0/3
- [SEA-MDD: Self-adapting Mispronunciation Detection and Diagnosis Models via Test-Time Training](wu26c_interspeech.md) — same problem · relatedness 2.9/3
- [Using Phonological-Level Wav2Vec2 for Mandarin Automatic Mispronunciation Detection and Diagnosis](chen26g_interspeech.md) — same problem · relatedness 2.8/3
- [Light-weight Pronunciation Assessment via Discrete Speech Token Surprisal](sara26_interspeech.md) — same problem · relatedness 2.6/3
- [A Fusion-Aware Two-Stage Framework for Mispronunciation Detection and Diagnosis in Low-Resource Modern Standard Arabic](yang26j_interspeech.md) — same problem · relatedness 2.6/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
