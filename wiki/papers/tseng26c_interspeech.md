---
id: tseng26c_interspeech
category: tts
labels: [efficient-on-device, self-supervised, streaming-real-time, generative-model]
institutions: ["Texas A&M University"]
code: https://morris88826.github.io/VOSSA/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2763
pdf: https://www.isca-archive.org/interspeech_2026/tseng26c_interspeech.pdf
---

# VOSSA: Voiceprint Optimization for Streaming Speech Architectures

*Mu-Ruei Tseng, Waris Quamer, Ghady Nasrallah, Ricardo Gutierrez-Osuna*

[PDF](https://www.isca-archive.org/interspeech_2026/tseng26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tseng26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2763)

**Category:** `tts` · **Labels:** `efficient-on-device`, `self-supervised`, `streaming-real-time`, `generative-model`

**TL;DR** — VOSSA is a streaming voice conversion framework that extracts speaker embeddings directly from intermediate layers of a frozen content encoder rather than using a separate speaker encoder, improving target-speaker similarity and F0/formant dynamics while reducing model size by 19%.

## Key contributions

- Eliminates the separate ASV speaker encoder by leveraging multi-layer intermediate representations from a causal content encoder, reducing overall model size by 19% (132.4M vs 162.8M parameters).
- Employs attentive statistics pooling over concatenated features from the last CNN layer and alternating MHSA layers to capture utterance-level timbre while retaining frame-level variability.
- Introduces a dual-path training protocol utilizing self-reconstruction and non-parallel voice conversion objectives regularized by cosine distance matching and a symmetric NTXent InfoNCE loss.
- Demonstrates through extensive diagnostics that intermediate feature extraction improves vowel-formant distribution matching (Wasserstein distance) and pitch dynamics compared to prior streaming baselines.

## Problem

Real-time streaming voice conversion (VC) architectures require strict causality, low latency, and decoupled linguistic and speaker representations. Conventional streaming systems condition generative decoders on frozen, pretrained automatic speaker verification (ASV) embeddings like x-vectors or ECAPA-TDNN. However, because ASV embeddings are trained to suppress intra-speaker phonetic and prosodic variations, they create a representational mismatch with frame-level acoustic generation (such as formant structures). Alternative joint-training methods that use separate speaker encoders increase memory footprint and model complexity, making them unsuited for resource-constrained streaming contexts.

## Method

VOSSA uses TVTSyn as its underlying streaming speech synthesizer backbone, featuring a causal content encoder, a factorized VQ bottleneck trained on HuBERT k-means pseudo-labels (N=200), and a causal transposed-convolution decoder. Instead of external ASV embeddings, VOSSA extracts multi-layer speaker features from the last CNN layer and every other layer of the 8-layer MHSA stack of the frozen content encoder, producing a sequence H in R^(T x Ld). This sequence is aggregated using attentive statistics pooling (ASP) driven by a two-layer fully-connected network to compute attention-weighted means and variances, which are then passed through a two-layer projection network to yield a global speaker embedding.

The training pipeline follows a dual-path architecture consisting of a lower self-reconstruction path (supervised on segments from the same speaker) and an upper non-parallel voice conversion path (conditioned on VoxCeleb targets). The objective function jointly optimizes L1 mel-reconstruction loss (L_mel), adversarial and feature-matching losses from a discriminator (L_adv, L_fm), speaker consistency via cosine distance between original and reconstructed embeddings (L_spk), and a symmetric NTXent InfoNCE contrastive loss over grouped speaker views (L_con) with hyperparameters set to lambda=(20, 3, 1, 10, 1).

During inference, the extracted global speaker embedding is expanded into a time-varying timbre memory that acts as key-value pairs for input content features to attend to. Operating at a 60 ms chunk size, the system achieves an RTF of 0.25 and an end-to-end latency of ~73 ms on a single NVIDIA RTX 5000 Ada GPU.

## Experimental setup

Models were trained on LibriTTS and VoxCeleb corpora. Evaluation protocols utilized LibriTTS for source utterances, while target speakers were sampled from LibriTTS, VoxCeleb, EMIME, ARCTIC, L2-ARCTIC, and VCTK across six total datasets. Baselines include slt24, DarkStream, GenVC-s, and the TVTSyn backbone. Metrics reported include NISQA-MOS, Word Error Rate (WER), normalized speaker similarity (Sim_syn_src and Sim_syn_trg), harmonic-to-noise ratio (HNR), WORLD DIO pitch MAE, voiced/unvoiced mismatch, Pearson correlation coefficient, Wasserstein distance of F1 formant distributions for high/mid/low vowels, and human perceptual MOS/ABX tests (N=20 listeners). Implementation details include the AdamW optimizer (initial lr 1e-4, ExponentialLR scheduler decay gamma=0.999996), batch size of 64, distributed across 4 NVIDIA RTX 5000 Ada GPUs, and a model size of 132.4M parameters.

## Results

VOSSA achieves a normalized target similarity (Sim_syn_trg) of 0.86 ± 0.19, substantially outperforming TVTSyn (0.59) and DarkStream (0.54). It maintains competitive acoustic quality and intelligibility with a NISQA-MOS of 3.48 ± 0.91 (comparable to TVTSyn's 3.52) and a WER of 0.17 ± 0.23, while improving harmonic-to-noise ratio to 9.72 dB.

In acoustic diagnostics, VOSSA achieves the lowest pitch MAE (27.8 Hz) and highest Pearson correlation coefficient (0.43) against ground truth. For vowel-formant preservation, VOSSA records the lowest Wasserstein distances across high (24.6), mid (29.7), and low (31.0) vowels, outperforming TVTSyn and other baselines. In subjective listening tests, VOSSA leads with an average MOS of 3.79 (vs. TVTSyn's 3.65) and wins preference in ABX tests for speaker similarity (54%), intelligibility (56%), and vibrancy (52%).

| Models | NISQA-MOS (↑) | WER (↓) | Sim_trg^syn (↑) | Pitch MAE (W) (↓) | F1 High Vowel WS (↓) | Subjective MOS (↑) |
|---|---|---|---|---|---|---|
| slt24 | 3.46 | 0.18 | 0.46 | 31.4 | 42.3 | 3.62 |
| DarkStream | 3.12 | 0.25 | 0.54 | 33.3 | 28.9 | 2.51 |
| GenVC-s | 3.04 | 0.20 | — | 30.8 | 32.7 | 3.16 |
| TVTSyn | 3.52 | 0.17 | 0.59 | 29.0 | 29.2 | 3.65 |
| VOSSA (Ours) | 3.48 | 0.17 | 0.86 | 27.8 | 24.6 | 3.79 |

## Limitations

The evaluation relies heavily on English and multilingual corpora standard in academic benchmarks (LibriTTS, VoxCeleb), leaving code-switching and extreme low-resource language performance unverified. Although VOSSA avoids an external speaker encoder, it still depends on a pretrained frozen content encoder backbone (TVTSyn/HuBERT k-means) which dictates frontend capability. Furthermore, real-time inference efficiency was exclusively benchmarked on high-end desktop hardware (NVIDIA RTX 5000 Ada), leaving on-device mobile or edge streaming constraints unexplored.

## Why read this

Speech and ML engineers building real-time, low-latency voice conversion systems should read this paper to learn how to completely eliminate external ASV speaker encoders by recycling intermediate content encoder representations, reducing parameter counts while improving phonetic-acoustic alignment.

## Code

- https://morris88826.github.io/VOSSA/

## Applications

Real-time voice conversion, speech anonymization, and secure VoIP communication.

## Institutions / 機構

Texas A&M University

**Funding / 經費:** Intelligence Advanced Research Projects Activity, Department of Interior, Interior Business Center

## Related

- (link related pages by id as the wiki grows)
