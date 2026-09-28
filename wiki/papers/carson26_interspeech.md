---
id: carson26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-794
pdf: https://www.isca-archive.org/interspeech_2026/carson26_interspeech.pdf
---

# Balancing Speech Reconstruction and Noise Suppression Using Dual-Asymmetric Loss

[PDF](https://www.isca-archive.org/interspeech_2026/carson26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/carson26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-794)

**TL;DR** — The paper introduces Dual-Asymmetric Loss, a novel training objective with an adjustable tuning parameter to flexibly balance speech reconstruction and noise suppression across state-of-the-art speech enhancement models.

## Problem

Speech enhancement models inherently struggle to balance clean speech reconstruction against effective background noise suppression, often forcing an undesirable compromise. Constrained or optimized models frequently suffer from either excessive speech distortion or residual noise artifacts depending on their training configuration. Existing tunable loss functions rely on weighted combinations or maximum-margin objectives that either lack phase-aware terms or introduce optimization oscillations.

## Method

The proposed Dual-Asymmetric Loss separates errors into a speech attenuation penalty and a residual noise penalty, combined via a linear weighting parameter lambda. Each component incorporates both complex-compressed MSE and magnitude terms, using ReLU functions for asymmetric magnitude bounds and indicator functions for complex bins where targets exceed predictions. The loss is integrated with an STFT consistency constraint and evaluated across four architectures: LiSenNet (57K params), DPCRN (800K params), SEMamba (2.25M params), and MP-SENet (2.05M params). Training uses 16 kHz audio chunks from the VoiceBank-DEMAND dataset over 200 epochs with the Adam optimizer.

## Results

Evaluated on the ICASSP 2023 DNS5 Challenge Blind Test Set and VoiceBank-DEMAND test set using DNSMOS (SIG, BAK, OVRL), PESQ, STOI, SI-SDR, and Whisper ASR Word Error Rate. Setting lambda to 0.35 heavily weights noise suppression, yielding the highest BAK scores across model groups and baselines on both datasets. Conversely, higher lambda configurations favor speech reconstruction and intelligibility metrics. Across 13 tested lambda values on LiSenNet, the tuning parameter exhibits strong correlations of 0.95 for speech metrics and -0.96 for noise metrics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers building real-time speech enhancement systems for consumer electronics, telecommunications, or task-specific deployment where the trade-off between noise cancellation and speech preservation must be custom-tuned.

## Limitations

Non-intrusive perceptual metrics like DNSMOS cannot reliably detect instances of dropped or altered speech, requiring traditional reference-based metrics for accurate distortion analysis.

## Related

- (link related pages by id as the wiki grows)
