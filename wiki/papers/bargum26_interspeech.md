---
id: bargum26_interspeech
category: voice-conversion
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-796
pdf: https://www.isca-archive.org/interspeech_2026/bargum26_interspeech.pdf
---

# Improving Model Expressivity and Speaker Matching in Low-Latency Voice Conversion

*Anders R. Bargum, Simon Lajboschitz, Stefania Serafin, Cumhur Erkut*

[PDF](https://www.isca-archive.org/interspeech_2026/bargum26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bargum26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-796)

**TL;DR** — A low-latency, real-time voice conversion framework that improves zero-shot speaker similarity and prosody preservation by explicitly injecting an excitation signal and utilizing a complementary time-varying speaker encoder. It achieves an 80.83% Speaker Embedding Cosine Similarity (SECS) while operating with a total latency of 64.9 ms on a CPU.

## Key contributions

- A low-latency voice conversion framework optimized for zero-shot speaker similarity under strict real-time constraints.
- An explicit excitation signal injection mechanism combining F0, periodicity, V/UV flags, and loudness to restore prosodic details lost in content embeddings.
- A lightweight complementary speaker encoder that fuses global speaker embeddings with dynamic, time-varying acoustic attributes using causal multi-head attention (MHA).
- An encoder-specific training perturbation strategy applying timbre shifts to content inputs and time-masking to speaker inputs to enforce strict feature disentanglement.

## Problem

Real-time voice conversion (VC) models such as StreamVC and RT-VC struggle to achieve high speaker similarity in zero-shot scenarios due to inherent limitations in lightweight architectures. Specifically, lightweight networks lack the capacity to encode comprehensive speaker traits beyond static global embeddings, and content representations based on discrete units or articulatory synthesis discard vital time-varying prosodic information. While large non-causal self-supervised models unify acoustic and linguistic features, their non-causal nature and high computational complexity preclude streaming deployment, creating a difficult trade-off between latency, expressivity, and speaker similarity.

## Method

The architecture adopts a parallel encoder-decoder structure consisting of a Content Encoder, Prosody Encoder, Global Speaker Encoder, and a Complementary Speaker Encoder. The Content Encoder is built with 4 CNN downsampling blocks (hidden dimensions C=[512, 256, 128, 64], ratios R=[8, 4, 4, 2]) and trained via knowledge distillation to predict 100 soft HuBERT units. The Prosody Encoder estimates F0, periodicity, voicing, and loudness to generate a sinusoid-plus-noise excitation signal E[n], which is injected between the snake-activated residual blocks of the mirrored content decoder. 

The Global Speaker Encoder processes VoxCeleb data using 3 causal convolutional downsampling blocks (C=[128, 256, 256], R=[4, 4, 2]), multi-layer feature aggregation (MFA), and attentive statistics pooling (ASP) to output a 256-dim SGlobal vector. To capture non-static timbre, the Complementary Speaker Encoder (S2Enc) processes acoustic cues into speaker tokens via 2 causal multi-head attention blocks (8 heads, hidden dimension 128), adding ~1.7M parameters. These tokens are fused with concatenated content, pitch, prosody, and loudness queries and SGlobal keys via causal cross-attention to produce SEmb. 

Disentanglement is enforced via training perturbations: content inputs undergo timbre perturbation via pitch-shifting (±6 st), additive noise (10-25 dB SNR), and 3-band parametric equalization (±15 dB gain), while speaker encoder inputs receive 25% unit-class frame-level time-masking to prevent phonetic leakage. The network is trained using multi-resolution mel-spectrogram loss (Lmel), adversarial GAN loss (Ladv), feature loss (Lfeat), and categorical cross-entropy content loss (LC) with weights α=12.0 and β=2.0 using the AdamW optimizer (learning rate 2e-4, batch size 32) at 16 kHz for 800k steps.

## Experimental setup

The model is trained on the 555-hour LibriTTS train subset (2,311 speakers) and evaluated zero-shot on 377 unseen utterances from LibriTTS test-clean paired with 6 unseen VCTK target speakers (3 male, 3 female). Baselines include RT-VC and StreamVC. Evaluation metrics include Word Error Rate (WER) and Character Error Rate (CER) for intelligibility, Speaker Embedding Cosine Similarity (SECS) using Resemblyzer for speaker similarity, Pearson Correlation Coefficient (PCC) for F0 consistency, and 5-scale MOS evaluations (Q-MOS, N-MOS, S-MOS) rated by 40 participants (120 ratings per condition). System latency is measured with a 256-sample frame (16 ms at 16 kHz) on an Intel Xeon CPU and a TITAN X GPU.

## Results

The proposed model achieves an SECS of 80.83%, outperforming RT-VC (76.65%) and StreamVC (77.81%), and yields an F0 PCC of 0.885 compared to 0.865 (RT-VC) and 0.842 (StreamVC). In terms of intelligibility, it attains a CER of 2.03% (best among competitors) and a WER of 6.54%. Ablation models lacking perturbation exhibit better intelligibility (e.g., WER 4.92%) due to residual acoustic-content fusion, but suffer degraded speaker similarity (SECS drops to 77.61% without perturbation, and down to 70.64% when restricted to static SGlobal without perturbation). 

Subjectively, the proposed model leads in S-MOS with 3.25 ± 0.21, outperforming StreamVC (3.16) and RT-VC (2.96), though StreamVC achieves higher naturalness (N-MOS 3.67 vs 3.44) and quality (Q-MOS 3.66 vs 3.60) due to a more elaborate training pipeline. The framework operates with an average CPU processing time of 48.9 ms per chunk, totaling 64.9 ms of algorithmic and processing latency.

| System | SECS (%) ↑ | F0 PCC ↑ | WER (%) ↓ | CER (%) ↓ | S-MOS ↑ |
|---|---|---|---|---|---|
| Target | 88.30 | - | - | - | - |
| Source | 60.37 | 1.000 | 4.49 | 1.02 | 1.91 |
| RT-VC | 76.65 | 0.865 | 6.69 | 2.12 | 2.96 |
| StreamVC | 77.81 | 0.842 | 6.22 | 2.17 | 3.16 |
| Proposed | 80.83 | 0.885 | 6.54 | 2.03 | 3.25 |
| Proposed w.o. perturb | 77.61 | 0.883 | 4.92 | 1.61 | - |

## Limitations

The evaluation is constrained to 6 target speakers and 377 test utterances from clean English speech datasets, lacking evaluation on noisy, reverberant, or highly expressive conversational data and non-English languages. While the subjective listening tests demonstrate superior speaker similarity, the sample size of shared test items is limited, and differences in S-MOS lack statistical significance. Furthermore, naturalness (N-MOS) trails behind more complex streaming baselines like StreamVC, indicating that real-time constraints still impose trade-offs on absolute perceptual naturalness.

## Why read this

Speech and machine learning engineers building real-time voice conversion systems will learn how to effectively combine explicit excitation signals and causal attention-based complementary speaker encoders to overcome the expressivity bottlenecks of lightweight streaming architectures.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time voice conversion, low-latency cross-lingual dubbing, interactive streaming media, and real-time voice modification for communication software.

## Related

- (link related pages by id as the wiki grows)
