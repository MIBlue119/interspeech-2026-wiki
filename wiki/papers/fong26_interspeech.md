---
id: fong26_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-224
pdf: https://www.isca-archive.org/interspeech_2026/fong26_interspeech.pdf
---

# Ada-Mic: Orientation-Adaptive and Robust Close-to-Mic Speech Detection on Smartphone Using Generalized Cross-Correlation Features

[PDF](https://www.isca-archive.org/interspeech_2026/fong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-224)

**TL;DR** — Ada-Mic is an orientation-adaptive close-to-mic speech detection framework using generalized cross-correlation features, achieving up to 24% accuracy improvement over prior methods.

## Problem

No-hot-word smartphone wakening relies on close-to-mic speech detection, but existing methods struggle when users hold phones at non-axial angles because signal attenuation mimics distance changes. Traditional magnitude-based approaches cannot reliably disentangle phone orientation and direction-of-arrival from speaker distance, restricting natural user movement. This paper introduces a lightweight dual-channel auxiliary feature approach to make proximity detectors robust to arbitrary device postures.

## Method

The framework processes dual-channel audio through a backbone model (either a lightweight CNN adapted from ProxiMic or a LoRA-finetuned HuBERT) while extracting spatial cues via Generalized Cross-Correlation with Phase Transform (GCC-PHAT). GCC-PHAT vectors are computed from dual-channel inputs, oversampled to capture multi-path reflections, and passed through a residual CNN encoder featuring 1D point-wise convolutions and batch normalization. The backbone feature vector and the GCC branch feature vector are concatenated and fed into a dense sigmoid layer for binary close-versus-far classification using binary cross-entropy loss. The GCC branch adds only 7.6% extra FLOPs for ProxiMic and under 0.01% for HuBERT, utilizing a dataset of 38 hours of speech collected across 10 Huawei phone models with 66 participants.

## Results

Evaluated on a test set comprising 1600 voice assistant commands across various distances (2cm to 30cm) and orientations under quiet, music, and office noise scenarios (5-20 dB SNR). Ada-Mic delivers up to 24% accuracy improvement over baseline models in challenging distance and orientation configurations. Across all noise scenarios, average accuracy improves by roughly 3%, with noise conditions yielding up to 5% average gains. Statistical significance was verified using the Wilcoxon signed-rank test (p < 0.05).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smart assistant engineers and mobile developers building orientation-robust, no-hot-word voice activation features for dual-microphone smartphones.

## Limitations

Requires dual-microphone hardware setup on the mobile device.

## Related

- (link related pages by id as the wiki grows)
