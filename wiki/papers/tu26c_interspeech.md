---
id: tu26c_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3227
pdf: https://www.isca-archive.org/interspeech_2026/tu26c_interspeech.pdf
---

# AV-SNINet: A multi-channel audio-visual speech-noise interaction network for Target Speaker Extraction with cross-beam attention

*Yanhui Tu, Runxiang Yu, Yi Fang*

[PDF](https://www.isca-archive.org/interspeech_2026/tu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3227)

**TL;DR** — AV-SNINet is a multi-channel audio-visual target speaker extraction network that combines an AV-guided beamformer with a dual-branch cross-beam attention mechanism for mutual-exclusion speech-noise suppression, achieving a 28.23% relative word error rate reduction on real-world recordings.

## Key contributions

- A two-stage framework utilizing an AV-guided DPCRN-GEVD first stage to generate separated target and interference acoustic beams.
- A dual-branch cross-beam attention module implementing explicit frame-level mutual suppression between target and interference features.
- A matched far-field LRS2 simulation benchmark protocol to ensure reproducible and fair comparison against public audio-visual baselines.

## Problem

Distant-microphone speech signals suffer severe degradation from reverberation, background noise, and interfering speakers, severely hurting ASR performance in low-SNR environments (the Cocktail Party Problem). While prior multi-modal audio-visual approaches successfully fuse lip-reading embeddings with acoustic cues, they focus exclusively on target enhancement rather than explicitly modeling target-noise mutual exclusion. This leaves them vulnerable to residual interference and noise leakage when traditional mask estimations are inaccurate.

## Method

The framework operates in two distinct stages. Stage 1 utilizes an AV-DPCRN mask estimator taking reference channel log-power spectrum (LPS), inter-channel phase difference (IPD) between channels 2 and 4, and 25 fps lip embeddings (from a spatio-temporal CNN, ResNet-16, and 2 GRUs, initialized from Lip Reading in the Wild and kept frozen). The resulting target and noise ideal ratio masks (IRMs) parameterize generalized eigenvalue-dependent (GEVD) beamforming filters to extract target and interference multi-beam features (Gs and Gn).

Stage 2 introduces AV-SNINet, a dual-branch architecture built on DPCRN backbones (2 conv blocks, 3 DPRNN blocks, 2 deconvolution blocks) that takes the stage-1 beams and original LPS features as inputs to jointly estimate refined speech and noise IRMs. At the bottleneck layer, a two-tower cross-beam attention interactor computes parallel frame-level cross-attention matrices between speech and noise features across frequency bins, penalizing highly correlated components to prevent interference leakage. The system is trained using joint speech and noise mask magnitude-domain loss functions with equal weighting ($\lambda_s = \lambda_n = 1$).

## Experimental setup

Evaluated on a 300-hour in-house real-recording dataset (50 speakers in an anechoic chamber, 50 noise types, RIR $T_{60}=80$ ms, distances 0.5-2m, SNRs from -10 to +10 dB, circular array radius 4.25 cm) and a far-field LRS2 simulation set mirroring these acoustic conditions. Baselines include the 1-stage AV-DPCRN+GEVD, USEV+GEVD, and RTFS-Net+GEVD. Evaluated using Word Error Rate (WER %) on a black-box ASR backend, with models trained using the Adam-style learning rate decay ($10^{-3}$ initial, decaying 3% every 3 epochs) for up to 150 epochs with a batch size of 25.

## Results

On the in-house real-recording dataset, AV-SNINet achieves an average WER of 20.38%, marking a 28.23% relative reduction over the 1-stage baseline (28.40%). At the extreme 1m, -10 dB condition, the full interaction model drops WER to 21.12%, outperforming the non-interactive large 2-stage variant (22.24%). On the LRS2 far-field simulation set, AV-SNINet establishes the best average WER of 17.20%, outperforming USEV+GEVD (19.37%) and the baseline (21.59%), with particularly strong gains at 3m and -10 dB (26.18%).

| System/Condition | 1m (-5dB) | 1m (-10dB) | 3m (-5dB) | 3m (-10dB) | AVG |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| AV-DPCRN + GEVD | 12.63 | 25.62 | 15.65 | 32.49 | 21.59 |\n| USEV + GEVD [22] | 11.25 | 23.42 | 13.18 | 29.64 | 19.37 |\n| RTFS-Net + GEVD [23] | 12.36 | 24.78 | 14.21 | 30.56 | 20.47 |\n| AV-SNINet (Ours) | **10.23** | **20.96** | **11.43** | **26.18** | **17.20** |

## Limitations

The evaluation is restricted to simulated and in-house multi-channel setups with fixed array geometry and near-frontal users, leaving open how well the cross-beam attention handles arbitrary or moving microphone arrays. The frozen visual encoder relies on clean visual extraction, meaning performance may degrade under severe video occlusion, poor illumination, or off-axis visual angles. Furthermore, compute requirements scale with the dual-branch two-tower backbone, which may challenge resource-constrained on-device deployments.

## Why read this

Researchers building multi-modal speech enhancement or target speaker extraction systems should read this paper to learn how to implement explicit cross-beam attention for mutual-exclusion noise suppression rather than relying solely on traditional feature concatenation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smart interactive kiosks, automated teller machines (ATMs), and distant-microphone conferencing systems operating in high-noise environments.

## Related

- (link related pages by id as the wiki grows)
