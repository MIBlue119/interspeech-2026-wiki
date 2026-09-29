---
id: kim26u_interspeech
category: tts
labels: [generative-model]
institutions: ["Hanyang University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3088
pdf: https://www.isca-archive.org/interspeech_2026/kim26u_interspeech.pdf
---

# ETC-TTS: Emotion Trajectory Learning for Controllable Emotional Text-to-Speech

*Gaeun Kim, Jaeuk Lee, Joon-Hyuk Chang*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26u_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26u_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3088)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — ETC-TTS models emotional intensity as continuous latent trajectories learned during training using RVQ prototypes and rectified flow matching, achieving stable intensity control without heuristic inference-time scaling.

## Key contributions

- Reformulated emotion intensity control as explicit trajectory learning in latent style space rather than post-hoc inference manipulation.
- Introduced a neutral-centered conditional rectified flow matching objective to ensure stable and consistent intermediate intensity transitions.
- Designed learnable emotion prototypes via residual vector quantization (RVQ) acting as explicit style anchors in latent space.
- Achieved superior monotonic controllability across intensity levels while preserving competitive speech quality over baseline FastSpeech2 variants.

## Problem

Existing emotional text-to-speech systems typically apply heuristic scalar scaling, interpolation, or relative attributes to static emotion representations at inference time. This creates a severe training-inference mismatch because models are optimized solely on discrete emotional endpoints without learning continuous transitions. Consequently, increasing the control factor often leads to non-monotonic affective behavior, degraded speech naturalness, and unstable intermediate states when samples deviate from the training distribution.

## Method

ETC-TTS is built on a FastSpeech2 acoustic backbone (34.1M trainable parameters) integrated with a novel style module containing an RVQ-based style extractor and a conditional rectified flow matching network. The style space utilizes 3 RVQ levels (L=3) with a codebook dimension of 256 and size matching the number of emotion categories. Codebooks are initialized via k-means centroids and regularized using a level-wise triplet loss along with periodic reinitialization to prevent codebook collapse.

To model intensity dynamics, the framework anchors trajectory endpoints between a neutral prototype and target emotion prototypes. A Gaussian noise term around the neutral prototype forms a local source distribution for rectified flow. The model predicts a constant velocity field along linear trajectories parameterized by $t \in [0, 1]$. The training objective combines the standard FastSpeech2 reconstruction loss $L_{\text{FS2}}$ with an RVQ loss ($\lambda_r=0.1$), a clustering triplet loss ($\lambda_c=0.1$), a flow matching objective ($\lambda_f=30$), and a neutral alignment loss $L_{\text{neutral}}$ that forces the source state to align with the neutral prototype using a stop-gradient operator.

Training proceeds in three stages: one epoch for k-means prototype initialization, 300k steps of extractor-focused training with the flow predictor frozen, and joint optimization for the remaining steps up to 500k total steps using the Adam optimizer with a batch size of 32 on a single NVIDIA RTX 5090 GPU. HiFi-GAN vocoders finetuned on AIHub (22.05 kHz) and SpeechBrain 16 kHz HiFi-GAN (for ESD) synthesize the final waveforms.

## Experimental setup

Evaluated on the AIHub Korean emotional speech dataset (~80 hours, 7 emotions, 4 speakers, 38,334 training samples) and the English ESD dataset (17,350 training utterances, 5 emotions, 10 speakers). Compared against FastSpeech2 baselines: emotion label conditioning, Relative Attribute (RA) control, and Scaling Factor (SF) control. Metrics include naturalness MOS (N-MOS), emotional expression MOS (E-MOS), Character Error Rate (CER), F0 RMSE, UTMOS, and emotion recognition accuracy (EmoAcc) using emotion2vec.

## Results

On the ESD dataset, ETC-TTS achieved an E-MOS of 3.78 (vs 3.43 for SF baseline) and an emotion accuracy of 92.93% (vs 78.79% for SF). On AIHub, it reached an N-MOS of 3.71 and E-MOS of 3.76, outperforming baseline models on emotion preservation. Pairwise AB tests on intensity monotonicity violations demonstrated that ETC-TTS significantly reduced error rates across all emotion categories and intensity intervals compared to RA and SF baselines. In quality-controllability trade-offs, ETC-TTS maintained stable UTMOS (2.51-2.60) across intensity levels $t \in [0, 1]$, whereas SF suffered severe degradation at $t=0.0$ (CER jumping to 0.1131) and RA degraded at $t=1.0$ (UTMOS dropping to 2.2796). Ablations showed that replacing RVQ prototypes with SER embeddings lowered EmoAcc to 69.80%, while using a Gaussian prior instead of a neutral-centered source degraded N-MOS and UTMOS.

| System | ESD N-MOS | ESD E-MOS | ESD CER | ESD EmoAcc(%) | AIHub N-MOS | AIHub E-MOS |
|---|---|---|---|---|---|---|
| GT (Ground Truth) | 4.27 ± 0.97 | 4.09 ± 1.77 | 0.0395 | 95.96 | 4.69 ± 0.63 | 4.10 ± 1.21 |
| FastSpeech2 + emotion label | 2.93 ± 1.18 | 3.33 ± 1.43 | 0.0718 | 80.81 | 3.45 ± 1.10 | 3.58 ± 1.33 |
| FastSpeech2 + RA | 2.98 ± 1.30 | 3.40 ± 1.36 | 0.0700 | 87.88 | 3.53 ± 1.09 | 3.61 ± 1.24 |
| FastSpeech2 + SF | 3.01 ± 1.20 | 3.43 ± 1.30 | 0.0687 | 78.79 | 3.66 ± 1.09 | 3.63 ± 1.25 |
| ETC-TTS (Proposed) | 3.14 ± 1.15 | 3.78 ± 1.08 | 0.0647 | 92.93 | 3.71 ± 1.13 | 3.76 ± 1.19 |

## Limitations

Evaluated only on moderate-scale datasets (80 hours for AIHub, ~35 hours for ESD) spanning discrete emotional categories, which may limit generalization to wild, unconstrained, or mixed affective states. The framework relies on predefined emotion class prototypes and categorical style tags, restricting its ability to handle completely open-domain or continuous valence-arousal dimensions without discrete labels. Additionally, performance depends on the quality of phoneme alignments and auxiliary pitch/energy extractors.

## Why read this

Researchers and audio engineers working on controllable emotional speech synthesis should read this to understand how framing emotion intensity control as a trajectory-learning problem with RVQ prototypes solves the non-monotonic failure modes of inference-time scaling.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Expressive audiobook narration, conversational AI assistants, video game character voice generation, and interactive dubbing.

## Institutions / 機構

Hanyang University

**Funding / 經費:** Institute of Information & communications Technology Planning & Evaluation (IITP), Korea government (MSIT), Artificial Intelligence Graduate School Program (Hanyang University)

## Related

- [Continuous Time-Varying Emotion Control Zero-Shot Text-To-Speech With Emotion Orthogonal LoRA](wan26b_interspeech.md) — same problem · relatedness 2.9/3
- [EmoInstruct-TTS: Dual-Path Instruction-Guided Emotional Speech Synthesis](wu26f_interspeech.md) — same problem · relatedness 2.7/3
- [Word-level Emotional Intensity Control in TTS via Emotion Residual Vectors](park26i_interspeech.md) — same problem · relatedness 2.7/3
- [Emo-BPO: Emotion Bidirectional Preference Optimization for Diffusion-based Emotional TTS](shi26d_interspeech.md) — same problem · relatedness 2.7/3
- [FineCombo-TTS: Collaborative and Precise Controllable Speech Synthesis Using Text Descriptions and Reference Speech](zhou26h_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
