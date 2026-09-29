---
id: choi26g_interspeech
category: enhancement-separation
institutions: ["Hanyang University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3131
pdf: https://www.isca-archive.org/interspeech_2026/choi26g_interspeech.pdf
---

# SpkGuideDOA: Speaker-wise Representation Guidance for Multiple Moving Speaker Localization

*Yongseok Choi, Davin Kim, Joon-Hyuk Chang*

[PDF](https://www.isca-archive.org/interspeech_2026/choi26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/choi26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3131)

**Category:** `enhancement-separation`

**TL;DR** — SpkGuideDOA enhances multi-speaker direct-path inter-channel phase difference (DP-IPD) localization by injecting implicit speaker-wise representations—generated via an auxiliary VAD-supervised guidance branch—into the spatial cue estimator through residual modulation, achieving superior directional accuracy and lower miss rates with minimal compute overhead.

## Key contributions

- Proposes a decoupled guidance architecture where an auxiliary Guidance Generator (GG) extracts speaker-specific representations from multichannel log-magnitudes and modulates the Spatial Cue Estimator (SCE) via residual gating at a pooled time-frequency resolution.
- Introduces Joint-Permutation-Invariant Training (Joint-PIT) to enforce consistent speaker assignment across the localization and guidance streams without letting auxiliary gradients degrade the primary SCE backbone.
- Replaces computationally heavy mask-based supervision with a lightweight, pooled binary cross-entropy VAD loss confined strictly to the guidance branch, preventing destructive multi-task gradient interference.
- Demonstrates robust performance improvements across both highly challenging simulated close-speaker scenarios and real-world LOCATA dataset evaluations.

## Problem

Localizing multiple moving speakers in dynamic acoustic environments under severe spatial-spectral overlap causes conventional direct-path inter-channel phase difference (DP-IPD) frameworks to suffer from nearly identical spatial cues and ambiguous track assignments when speaker trajectories intersect. While existing deep spatial-state models like IPDNet, IPDNet2, and TF-Mamba offer efficient tracking, they rely exclusively on spatial representations without an explicit mechanism to enforce speaker-specific differentiation. Decoupled separation-and-association tracking strategies exist, but they fail when intermediate DOA estimation breaks down under high spatial ambiguity and struggle with real-time constraints due to long-term mask estimation.

## Method

The framework features a dual-stream architecture consisting of a Spatial Cue Estimator (SCE) and a Guidance Generator (GG). The SCE processes concatenated real and imaginary multi-channel STFTs ($2M \times F \times T$) through point-wise convolutions, grouped 1D frequency convolutions (1D F-GConv), cross-band, and narrow-band modules to predict DP-IPD targets. Simultaneously, the GG processes log-magnitude features ($M \times F \times T$) through a multi-resolution band-wise feature extractor ($G_{\text{all}} = 32+8+4+4 = 48$ sub-bands), mobile inverted bottleneck convolution (MBConv1) blocks, a segmented-and-pooled simple softmax-free attention (SP-SimA) mechanism with sequence length $L = T_p$, a T-Mamba layer, and a classifier to produce per-speaker, frequency-dependent guidance features at a compressed pooled resolution ($T'_ \times F'_$).

Guidance is injected into the SCE features via element-wise sigmoid gating ($\mathbf{Z}^{(\text{guided}, k)} = \mathbf{Z} \odot \mathbf{\Gamma}^{(k)}$) combined with a residual connection to let the SCE recover from imperfect guidance. The training pipeline optimizes a combined objective using Joint-PIT: a mean squared error (MSE) loss on DP-IPD estimation for localization and a binary cross-entropy (BCE) VAD loss supervised via an auxiliary decoder ($\alpha = 0.4$). Crucially, the VAD loss gradients are detached from the SCE parameters, ensuring the guidance module acts purely as an efficient localization enhancer rather than a multi-task bottleneck.

## Experimental setup

Evaluated on 5-second simulated LibriSpeech mixtures generated via gpuRIR using a 12-channel 3D array across randomized room sizes ($3\times 3\times 2.5$ to $10\times 8\times 6$ m$^3$), reverberation $T_{60} \in [0.2, 1.2]$ s, and SNR from $-5$ to $20$ dB, alongside the real-world LOCATA dataset (Tasks 3-6). Compared against IPDNet, TF-Mamba, and IPDNet2 under identical training regimens. Metrics include Miss Detection Rate (MDR, %), False Alarm Rate (FAR, %), and Mean Absolute Error (MAE, $\circ$) with a $30^\circ$ tolerance threshold. Notable hyperparameters: 16 kHz sampling rate, 512-point STFT window with 256-sample hop, temporal pooling $T_p=12$, frequency pooling $F_p=16$, hidden dimensions $H_1=96, H_2=48, H_3=12, H_4=256$, batch size 4, 15 epochs, and Adam optimizer with initial learning rate $0.001$ decaying by $0.975$ per epoch.

## Results

On simulated mixtures, SpkGuideDOA achieves an MDR of 4.0%, FAR of 15.8%, and MAE of 5.7$^{\circ}$, substantially outperforming IPDNet (11.2% MDR, 23.8% FAR, 9.0$^{\circ}$ MAE), TF-Mamba (5.2% MDR, 18.6% FAR, 6.2$^{\circ}$ MAE), and capacity-matched IPDNet2 (12.6% MDR, 24.4% FAR, 10.9$^{\circ}$ MAE). On real-world LOCATA data, it records an MDR of 9.2%, FAR of 8.9%, and MAE of 5.5$^{\circ}$, leading all baselines. Ablations show that removing the Guidance Generator (w/o GG) spikes simulated MDR to 14.1% and MAE to 11.8$^{\circ}$, removing the auxiliary VAD loss degrades MDR to 9.3%, and decoupling permutations (w/o Joint-PIT) increases MDR to 6.4% and MAE to 7.3$^{\circ}$. The model maintains a compact footprint of 2.8M parameters and 1.1 GFLOPs/s.

| System | Sim. MDR (%) | Sim. FAR (%) | Sim. MAE ($^{\circ}$) | Real MDR (%) | Real FAR (%) | Real MAE ($^{\circ}$) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| IPDNet [9] | 11.2 | 23.8 | 9.0 | 14.9 | 11.1 | 9.0 |
| TF-Mamba [13] | 5.2 | 18.6 | 6.2 | 9.7 | 13.1 | 6.0 |
| IPDNet2 [10] | 12.6 | 24.4 | 10.9 | 16.9 | 16.3 | 9.7 |
| SpkGuideDOA (Ours) | **4.0** | **15.8** | **5.7** | **9.2** | **8.9** | **5.5** |

## Limitations

Evaluated exclusively up to a maximum of two concurrent active speakers ($K=2$), leaving higher-density multi-speaker scaling untested. The framework relies on simulated room impulse responses and limited real-world LOCATA evaluations, which may not fully capture extreme acoustic anomalies or non-stationary noise distributions found in real-world deployments. Auxiliary guidance assumes a fixed number of tracking slots determined prior to inference.

## Why read this

Speech and ML researchers focusing on multi-source spatial localization should read this to see how injecting decoupled, auxiliary VAD-supervised representations via residual gating can resolve spatial overlap ambiguities without ballooning computational complexity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time multi-speaker tracking, smart conferencing systems, acoustic surveillance, and robust front-end spatial preprocessing for conversational speech recognition.

## Institutions / 機構

Hanyang University

**Funding / 經費:** National Research Foundation of Korea

## Related

- [BiEAR: A Human Auditory-Inspired Adaptive Binaural Front-end for Multi-Speaker Localisation and Distance Estimation](meng26c_interspeech.md) — same problem · relatedness 2.3/3
- [G2C-NET: A Grid-to-Continuous Neural Network for Sound Source Localization in Distributed Microphone Arrays](yue26_interspeech.md) — same problem · relatedness 2.1/3
- [End-Fire Degradation-Robust DOA Estimation for Compact Linear Microphone Arrays](wen26c_interspeech.md) — same problem · relatedness 2.0/3
- [Position-Aware Target Speaker Extraction for Long-Form Multi-Party Conversations: A Diarization-Free Framework for ASR](wang26m_interspeech.md) — complementary · relatedness 2.0/3
- [Ego-Noise-Aware Spatial Filtering for Reliable UAV Audition in Extreme Low-SNR Conditions](jeon26b_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
