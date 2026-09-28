---
id: he26b_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-607
pdf: https://www.isca-archive.org/interspeech_2026/he26b_interspeech.pdf
---

# Spec2Spatial: A Time-Frequency Spatial Attention Network for Binaural Audio Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/he26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/he26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-607)

**TL;DR** — Spec2Spatial is a time-frequency spatial attention network for binaural audio synthesis that achieves state-of-the-art performance on DILD (1.250), DITD (0.034), and MRSTFT (1.174).

## Problem

Traditional DSP-based binaural synthesis relies on discontinuous head-related transfer functions (HRTFs) that accumulate errors, while existing deep learning methods struggle to faithfully reproduce critical human spatial hearing cues like interaural time differences (ITD) and interaural level differences (ILD). Accurately modeling these source-to-ear propagation cues from monaural audio and dynamic positional data is crucial for delivering realistic immersive audio in virtual reality and online conferencing.

## Method

The architecture begins with a Time-Domain Warping (TDW) module that applies physical geometric delays based on source-ear distances to compute a coarse binaural approximation. The resulting signals are transformed via STFT and fed into an Interaural Spatial Attention Network (ISAN), which uses channel-wise linear layers, a gating/content split, and an Energy Analysis Module (EAM) with temporal and frequency average pooling to capture cross-ear, frequency-dependent relations. During decoding, a Condition Fusion Residual Network (CFRN) incorporates dilated convolutions and Feature-wise Linear Modulation (FiLM) to inject 7D position and orientation conditioning into the time-frequency features. The network is optimized using a combined loss function comprising time-domain wave L2 loss, frequency-phase loss, and multi-resolution STFT loss.

## Results

Evaluated on the 2-hour Binaural Speech dataset recorded at 48 kHz with KEMAR mannequins and OptiTrack positioning, Spec2Spatial is compared against DSP baselines, WaveNet, WarpNet, BinauralGrad, and Neural Fourier Shift (NFS). It achieves state-of-the-art results on MRSTFT (1.174), DILD (1.250), and DITD (0.034), while ranking second on Wave-L2 (0.162), Phase-L2 (0.832), and Amplitude-L2 (0.033). Subjective MOS tests evaluated by 20 participants demonstrate superior performance in naturalness, spatiality, and similarity. Ablation studies confirm that removing TDW, the Energy Analysis Module (EAM), or the Condition Fusion Residual Network (CFRN) leads to significant performance degradation, particularly in DILD and MRSTFT.

## Code

- https://SpatialAudioDemo.github.io/Spec2Spatial/

## Applications

Speech and audio engineers working on virtual reality, immersive teleconferencing, and spatial audio rendering systems who need to synthesize realistic binaural audio from monaural speech streams.

## Limitations

The current evaluation is limited to a relatively small 2-hour dataset, and future work is required to improve cross-dataset generalization using larger-scale binaural data.

## Related

- (link related pages by id as the wiki grows)
