---
id: ye26e_interspeech
category: deepfake-security
institutions: ["Sun Yat-sen University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3341
pdf: https://www.isca-archive.org/interspeech_2026/ye26e_interspeech.pdf
---

# OPERA-Net: Octave-aware Phase-sensitive Enhanced Recognition Architecture for Singing Voice Deepfake Detection

*Fengwei Ye, Kun Zeng*

[PDF](https://www.isca-archive.org/interspeech_2026/ye26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ye26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3341)

**Category:** `deepfake-security`

**TL;DR** — OPERA-Net is a dual-stream singing voice deepfake detection architecture that combines phase-consistent time-frequency representations with semantic-guided gating to neutralize background music interference and expose neural vocoder artifacts, achieving a state-of-the-art pooled EER of 1.54% on CtrSVDD.

## Key contributions

- Formulates a Phase-Consistent CQT (PC-CQT) representation that stacks log-magnitude and unwrapped instantaneous frequency (IF) derivatives to capture microscopic phase discontinuities left by neural vocoders.
- Introduces a Semantic-Guided Gating mechanism that leverages fine-tuned WavLM representations to generate a soft attention mask, suppressing dense background music and non-vocal polyphonic noise.
- Achieves state-of-the-art performance on the controlled CtrSVDD benchmark (1.54% pooled EER) and the in-the-wild SingFake benchmark (4.72% overall EER), outperforming prior challenge champions and ensemble models.
- Demonstrates robust generalization against challenging diffusion-based spoofing attacks (e.g., DiffSinger) and unseen communication codecs.

## Problem

State-of-the-art speech anti-spoofing detectors experience catastrophic performance drops when applied to singing voice deepfake detection (SVDD). This occurs because singing features a wider dynamic range, prominent vibrato, and complex harmonic structures, while existing detectors rely on speech-centric inputs like Mel-spectrograms that lack high-frequency resolution. Furthermore, dense background music (BGM) acts as an acoustic mask concealing forgery traits, and traditional magnitude-based forensics discard phase continuity clues that reveal synthetic artifacts.

## Method

OPERA-Net features a dual-stream architecture comprising a Phase-Consistent CQT (PC-CQT) signal stream and a WavLM semantic stream, fused via a Semantic-Guided Gating mechanism. The raw waveform is transformed via CQT ($K=84$ bins, 12 bins/octave, $f_{min}=32.7$ Hz, hop length 320 samples) into a complex spectrum. To extract temporal phase evolution, the unwrapped instantaneous frequency derivative is computed and stacked channel-wise with the log-magnitude spectrum to form a 2-channel tensor $X_{pc} \in \mathbb{R}^{2 \times K \times N}$, which is then processed by a lightweight ResNet-18 encoder into signal embeddings $F_{sig}$. Simultaneously, a WavLM Base+ model (94k hours pretraining) processes the raw audio, freezing the bottom 6 transformer layers and fine-tuning the top 6 layers to yield semantic embeddings $F_{sem}$.

A major architectural novelty is the Semantic-Guided Gating mechanism. To prevent background music from corrupting signal features via naive concatenation, a soft attention mask $G = \sigma(\text{Linear}(\text{Concat}(F_{sig}, F_{sem})))$ is derived from the semantic stream using a Sigmoid function. This mask is multiplied element-wise with the refined signal features ($\tilde{F}_{sig} = F_{sig} \odot G$), amplifying vocal-rich segments while dampening non-vocal polyphonic noise. The gated signal features and semantic embeddings are concatenated and passed through a two-layer fully connected classifier head. Training utilizes a weighted Cross-Entropy loss optimized with AdamW and a layer-wise learning rate decay strategy over 16 kHz audio cropped or zero-padded to fixed 4-second windows.

## Experimental setup

Evaluated on the controlled CtrSVDD benchmark (59/55 training/dev singers, 48 evaluation singers with unseen attacks A09-A13) and the in-the-wild SingFake benchmark across splits T01 (seen singers), T02 (unseen singers), and T03 (unseen codecs). Compared against baselines including LFCC, AASIST, W2V2-AASIST, MERT-W2V2-AASIST, SingGraph, and challenge leaders like Fosafer Speech and I2R-ASTAR. The primary evaluation metric is Equal Error Rate (EER, %).

## Results

OPERA-Net achieves a pooled EER of 1.54% on the CtrSVDD evaluation set, outperforming the SVDD 2024 Challenge champion Fosafer Speech (1.65%) while utilizing a single unified architecture rather than brute-force score ensembling. On the most difficult diffusion-based attack (A12 DiffSinger), OPERA-Net reaches 3.85% EER compared to 4.19% for the champion. On the in-the-wild SingFake benchmark, it attains an overall EER of 4.72% (outperforming the domain-specific SingGraph baseline at 6.05%), maintaining robustness across unseen singer (4.85% EER) and unseen codec (4.92% EER) conditions.

Ablation studies confirm the additive value of each component: a fine-tuned WavLM baseline yields 2.85% EER on CtrSVDD, adding magnitude-only CQT improves it to 2.24%, upgrading to PC-CQT drops EER to 1.82%, and the full model with Semantic-Guided Gating achieves the final 1.54%. Similar incremental gains are observed on SingFake (6.15% down to 4.72%).

| System / Condition | Pooled EER (%) [CtrSVDD] | Overall EER (%) [SingFake] |
| :--- | :--- | :--- |
| LFCC / AASIST Baselines | 10.39 - 11.37 | 12.61 |
| SingGraph [29] | - | 6.05 |
| Fosafer Speech [24] | 1.65 | - |
| OPERA-Net (WavLM + CQT) | 1.82 | 4.95 |
| OPERA-Net (Full) | 1.54 | 4.72 |

## Limitations

The current evaluation is restricted to English/controlled multi-singer datasets (CtrSVDD and SingFake) and relies on a fixed 16 kHz resampling rate, potentially filtering out ultra-high frequency phase artifacts above 8 kHz. The model depends on the WavLM Base+ backbone, inheriting its compute footprint, and assumes clear vocal presence for semantic guidance which could degrade under extreme distortion or whispered singing styles.

## Why read this

Speech and ML engineers building anti-spoofing countermeasures for polyphonic audio or singing voice forensics should read this to learn how to explicitly fuse phase-derivative signal features with semantic attention masks instead of relying on brute-force multi-model ensembles.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Singing voice deepfake detection, audio forensics, copyright protection for digital music creation platforms, and automated content moderation against voice impersonation.

## Institutions / 機構

Sun Yat-sen University

## Related

- [Joint Fullband-Subband Modeling for High-Resolution SingFake Detection](hu26e_interspeech.md) — same problem · relatedness 3.0/3
- [SingFox: A Multi-Lingual Singfake Detection Corpus](shah26_interspeech.md) — same problem · relatedness 2.6/3
- [Domain-Adaptive Dual-Gating Mixture of Experts for Generalizable Speech Deepfake Detection](qin26b_interspeech.md) — same problem · relatedness 2.3/3
- [Interpretable Frequency-Band Attention with Gated SSL Fusion for Audio Deepfake Detection](alhammad26_interspeech.md) — same problem · relatedness 2.2/3
- [QAMO: Quality-aware Multi-centroid One-class Learning For Speech Deepfake Detection](truong26_interspeech.md) — same problem · relatedness 2.2/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
