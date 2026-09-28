---
id: he26b_interspeech
category: source-separation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-607
pdf: https://www.isca-archive.org/interspeech_2026/he26b_interspeech.pdf
---

# Spec2Spatial: A Time-Frequency Spatial Attention Network for Binaural Audio Synthesis

*Changjun He, Wenjie Zhang, Shiyun Xu, Lianyu Zhou, Weiping Chen, Mingjiang Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/he26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/he26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-607)

**TL;DR** — Spec2Spatial is a time-frequency spatial attention network for binaural audio synthesis that explicitly models interaural level and time differences, achieving state-of-the-art DILD (1.250 dB) and DITD (0.034 ms) on the Binaural Speech dataset.

## Key contributions

- Proposes Spec2Spatial, a time-frequency spatial attention framework that models interaural cues in the STFT domain to preserve ILD and ITD.
- Designs an Interaural Spatial Attention Network (ISAN) performing cross-ear attention on time-frequency representations with an Energy Analysis Module (EAM).
- Introduces a Condition Fusion Residual Network (CFRN) leveraging FiLM modulation to inject sound-source position and orientation into time-frequency features.
- Achieves state-of-the-art performance on MRSTFT, DILD, and DITD compared to existing deep learning and DSP-based binaural synthesis models.

## Problem

Traditional DSP-based binaural audio synthesis methods rely on discontinuous, generic Head-Related Transfer Functions (HRTFs) that introduce cumulative errors and ignore specific room responses. While recent deep learning approaches like WarpNet, BinauralGrad, and NFS have attempted end-to-end propagation modeling, they struggle to faithfully reproduce essential human spatial hearing cues: interaural time differences (ITD) and interaural level differences (ILD). This failure leaves a distinct perceptual gap between synthesized binaural audio and real-world recordings, making realistic virtual reality and online audio transmission difficult.

## Method

The model takes monaural audio ($x \in \mathbb{R}^{1 \times T}$) and source position/orientation metadata ($c \in \mathbb{R}^{7 \times L}$) to synthesize binaural output ($y = (y_l, yr) \in \mathbb{R}^{2 \times T}$). First, a Time-Domain Warping (TDW) module geometrically calculates per-ear propagation delays to produce preliminary warped waveforms ($y^w$), which undergo STFT to yield time-frequency features ($Y^w \in \mathbb{R}^{2 \times F \times T}$). 

In the encoder, Conv2D layers combined with the Interaural Spatial Attention Network (ISAN) extract multi-scale features. ISAN first passes channel-mixed features ($H$) through a channel-wise linear layer with GeLU, splits them into gating ($H_1$) and content ($H_2$) branches inspired by gMLP, and applies an Energy Analysis Module (EAM) that computes temporal and frequency weight vectors via average pooling, 1D convolutions, and sigmoid activations. Their outer product forms a time-frequency attention map that modulates the content features.

In the decoder, a multi-scale Condition Fusion Residual Network (CFRN) is employed alongside upsample modules. CFRN applies dilated 1D convolutions for receptive field expansion, and uses Feature-wise Linear Modulation (FiLM) driven by linear projections of the 7D position/orientation vector $c$ to generate scaling ($\alpha$) and bias ($\beta$) factors that dynamically modulate spectral features. The network outputs complex masks ($M = \{M_R^l, M_I^l, M_R^r, M_I^r\}$) multiplied with the STFT features, followed by an iSTFT to reconstruct the final binaural waveforms. Training is optimized via a combination of time-domain Wave-L2 loss, frequency-domain phase loss, and multi-resolution STFT loss ($L_{\text{MRSTFT}}$) with loss weights set to 1.0, 0.01, and 0.01 respectively.

## Experimental setup

Evaluated on the Binaural Speech dataset consisting of 2 hours of recordings across 8 speakers moving within a 1.5-meter range of a KEMAR mannequin at 48 kHz (with OptiTrack position tracked at 120 Hz). Compared against DSP methods (using MIT HRTF), WaveNet, WarpNet, BinauralGrad, and NFS. Metrics include Wave-L2, Phase-L2, Amplitude-L2, MRSTFT, DILD (dB), DITD (ms), and subjective MOS (overall, spatialization, similarity via 20 participants). Implemented with an STFT window size of 1024 and hop size of 128; optimized using the Adam optimizer with a Cosine Annealing learning rate schedule.

## Results

Spec2Spatial achieves state-of-the-art quantitative performance with an MRSTFT of 1.174, DILD of 1.250 dB, and DITD of 0.034 ms, outperforming BinauralGrad (1.600 dB DILD, 0.035 ms DITD) and NFS (2.729 dB DILD, 0.049 ms DITD). In subjective human evaluation, it secures the highest MOS scores across all categories: overall MOS (4.21 vs 4.07 for BinauralGrad), spatialization MOS (4.01), and similarity MOS (4.20). 

Ablation studies confirm the vital contribution of individual modules: dropping time-domain warping (w/oTDW) degrades DILD to 2.633 dB, removing the Energy Analysis Module (w/oEAM) worsens DILD to 1.403 dB, and removing the condition fusion network (w/oCFRN) drives DITD up to 0.117 ms. Time-domain warping alone (onlyTDW) yields catastrophic failure in DILD (23.097 dB). The model does not win on raw waveform Wave-L2 loss, reinforcing that waveform-level MSE is an ineffective proxy for spatial audio fidelity.

| Model | Wave-L2 $\downarrow$ | MRSTFT $\downarrow$ | DILD (dB) $\downarrow$ | DITD (ms) $\downarrow$ | MOS $\uparrow$ |
|---|---|---|---|---|---|
| DSP | 0.626 | 3.085 | 6.926 | 5.993 | 3.71 |
| WaveNet | 0.188 | 1.683 | 1.816 | 0.146 | 3.67 |
| WarpNet | 0.167 | 1.909 | 3.252 | 0.073 | 3.92 |
| BinauralGrad | 0.128 | 1.278 | 1.600 | 0.035 | 4.01 |
| NFS | 0.172 | 1.241 | 2.729 | 0.249 | 3.72 |
| Spec2Spatial (Ours) | 0.162 | 1.174 | 1.250 | 0.034 | 4.21 |

## Limitations

The current evaluation is restricted to a small 2-hour single-speaker/speech dataset collected in a controlled environment with a KEMAR mannequin. Cross-dataset generalization and performance under complex reverberant room acoustics or multi-source environments remain unexplored and require evaluation on larger multi-room corpora.

## Why read this

Researchers and audio engineers working on spatial audio rendering, VR, or neural audio synthesis should read this to see how explicit interaural cue modeling and FiLM-based position conditioning can radically improve ILD and ITD accuracy without massive pretraining datasets.

## Code

- https://SpatialAudioDemo.github.io/Spec2Spatial/

## Applications

Virtual reality (VR) audio rendering, immersive online conference systems, and real-time binaural speech/music transmission.

## Related

- (link related pages by id as the wiki grows)
