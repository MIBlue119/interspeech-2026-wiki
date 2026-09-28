---
id: hu26f_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1660
pdf: https://www.isca-archive.org/interspeech_2026/hu26f_interspeech.pdf
---

# ABSE-NET: A Lightweight Neural Model for Active Binaural Speech Enhancement in Open-Fit Hearing Aids

*De Hu, Xue Du, Qingying Zhao, Qintuya Si*

[PDF](https://www.isca-archive.org/interspeech_2026/hu26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hu26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1660)

**TL;DR** — ABSE-NET is a lightweight neural model designed for active binaural speech enhancement in open-fit hearing aids that eliminates acoustic leakage without requiring an intrusive in-ear error microphone during deployment. It achieves an SI-SDR of 9.869 dB and a PESQ of 3.626 while using only 0.112M parameters and 0.184G FLOPs.

## Key contributions

- Proposes a cascaded framework combining a model-driven binaural MVDR (BMVDR) beamformer for coarse spatial cue preservation with a lightweight data-driven post-filter network.
- Introduces a Frequency-Time Dependency Learning (F-TDL) block using reparameterized multi-branch 1D convolutions (RMB-Conv1D) to capture spectro-temporal dependencies efficiently without heavy self-attention mechanisms.
- Develops a Convolutional Attention (ConvAtt) block that factorizes attention across channel and frequency-time dimensions to refine latent features with minimal compute overhead.
- Eliminates the practical requirement for an in-ear error microphone during inference, relying on it solely for offline training signal modeling.
- Demonstrates state-of-the-art speech quality (PESQ 3.626, STOI 0.955) under low-SNR open-fit conditions (-5 dB to 0 dB) while maintaining ultra-low computational complexity.

## Problem

Open-fit hearing aids utilize physical vents to relieve ear canal pressure and eliminate the discomfort of the occlusion effect, but this design permits external noises to leak directly into the ear canal, severely degrading binaural speech enhancement (BSE). Prior model-driven hybrid BSE-Active Noise Control (ANC) solutions such as filtered-x multi-channel Wiener filters (FxMWF) struggle with complex acoustic scenes and rely on adaptive filtering that requires an error microphone placed deep inside the narrow ear canal. Conversely, deep learning-based ANC and BSE architectures (e.g., DeepANC, ASE-TM) either demand heavy computational resources unsuitable for edge wearable devices or fail to handle acoustic leakage in open-fit configurations. This creates a critical gap for a data-driven, lightweight active BSE solution that functions entirely without in-ear feedback microphones during daily use.

## Method

ABSE-NET processes left and right hearing aid channels independently. First, a conventional binaural minimum variance distortionless response (BMVDR) beamformer performs coarse BSE in the STFT domain, yielding spatial cue-preserved estimates that are concatenated with raw noisy reference mic signals ($y_L$) to form the 4-channel input tensor $X \in \mathbb{R}^{4 \times F \times T}$ (real/imaginary parts of BMVDR output and reference mic). A single convolutional layer with RMB-Conv1D kernels encodes this into latent features $H \in \mathbb{R}^{C \times F \times T}$ ($C=16$).

The feature augmentation (FA) module repeats $L=4$ times, each block sequentially applying an F-TDL block and a ConvAtt block. The F-TDL block contains separate frequency dependency learning (FDL) and time dependency learning (TDL) residual sub-blocks. FDL uses linear bottleneck layers and RMB-Conv1D layers with multi-scale kernels ($K \in \{1, 3, 5\}$) across frequency bins, which are fused into a single convolutional kernel during inference to maintain low complexity. TDL employs causal RMB-Conv1D (C-RMB-Conv1D) layers in an expanded hidden dimension to model temporal dynamics strictly causally without future look-ahead.

The subsequent ConvAtt block sequentially computes a channel attention map via global pooling and linear-SiLU-sigmoid projections, followed by a factorized frequency-time attention map to refine representations without evaluating full 3D attention tensors. A fully connected decoder maps augmented features back to the 2-channel complex STFT spectrum, which is converted to the time-domain, emitted via the internal loudspeaker, and propagated through the secondary acoustic path $g_L$ to destructively interfere with the leakage signal at the ear canal. The network is optimized via a composite loss combining scale-invariant signal-to-distortion ratio (SI-SDR) and short-time objective intelligibility (STOI) with a weighting parameter $\lambda = 10$, using the Adam optimizer (initial learning rate $3 \times 10^{-3}$, batch size 6, 60 epochs).

## Experimental setup

Experiments use 43,200 two-second samples (24 hours total) synthesized by convolving Librispeech clean speech and NOISEX-92 noise with Hearpiece database HRIRs across 24 distinct incident directions (12 for training, 12 for validation/test, spaced by 15°). Signals are mixed at random SNRs from -5 dB to 0 dB at 16 kHz. Baseline comparisons include Unprocessed, BMVDR w/o AL (closed-fit oracle), standard BMVDR, FxMWF, DeepANC (19.68M params), and ASE-TM (3.22M params). Evaluation metrics comprise SI-SDR, PESQ, STOI, CSIG, CBAK, COVL, and binaural localization errors ($\Delta\text{ILD}$, $\Delta\text{IPD}$).

## Results

ABSE-NET achieves an SI-SDR of 9.869 dB, PESQ of 3.626, and STOI of 0.955, outperforming all data-driven and model-driven open-fit baselines on perceptual metrics while using only 0.112M parameters and 0.184G FLOPs. While ASE-TM achieves a slightly higher raw SI-SDR (10.45 dB), it requires 14.417G FLOPs—nearly 78 times heavier than ABSE-NET. FxMWF lags significantly behind with an SI-SDR of 3.723 dB and PESQ of 3.181.

Ablation studies confirm that heterogeneous multi-scale kernels ($K=\{1,3,5\}$) in RMB-Conv1D outperform single-scale variants (e.g., $K=\{5\}$ drops SI-SDR to 7.918 dB), and replacing F-TDL with SpatialNet increases FLOPs 7-fold while dropping SI-SDR by 1.06 dB. Under direction-of-arrival (DOA) mismatch conditions simulating ATF errors, ABSE-NET retains an SI-SDR of 6.434 dB at a 15° error, whereas standard BMVDR collapses to -1.010 dB.

| Method | Para. (M) | FLOPs (G) | SI-SDR (dB) | PESQ | STOI |
|---|---|---|---|---|---|
| Unprocessed | – | – | -2.781 | 1.609 | 0.775 |
| BMVDR | – | – | 0.878 | 2.196 | 0.861 |
| FxMWF | – | – | 3.723 | 3.181 | 0.925 |
| DeepANC | 19.683 | 5.817 | 2.683 | 2.449 | 0.854 |
| ASE-TM | 3.224 | 14.417 | **10.45** | 3.573 | 0.953 |
| ABSE-NET | **0.112** | **0.184** | 9.869 | **3.626** | **0.955** |

## Limitations

The evaluation relies on simulated acoustic leakage using head-related impulse responses (HRIRs) from a single database (Hearpiece) restricted to 24 discrete directions, which may not capture the full complexity of real-world acoustic reflections and continuous user head movements. The model's generalization to severe directional mismatches beyond 15° or highly reverberant real-world rooms remains bounded by the training set diversity. Additionally, real-world hardware deployment constraints such as fixed-point quantization effects and exact acoustic transducer latency matching were not tested on physical hearing aid chips.

## Why read this

Speech and ML engineers building ultra-low-latency, edge-deployed audio enhancement systems will learn how to design factorized frequency-time dependency modules and reparameterized convolutions that replace heavy attention mechanisms.

## Code

- https://github.com/Bream101/ABSE-NET

## Applications

Open-fit hearing aids, hearables, and wearable communication devices requiring real-time active speech enhancement and acoustic leakage cancellation under extreme resource constraints.

## Related

- (link related pages by id as the wiki grows)
