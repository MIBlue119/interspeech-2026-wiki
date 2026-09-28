---
id: ozer26_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1822
pdf: https://www.isca-archive.org/interspeech_2026/ozer26_interspeech.pdf
---

# A Training-Free Proactive Defense Against Partial Speech Manipulation via Self-Embedding Steganography

[PDF](https://www.isca-archive.org/interspeech_2026/ozer26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ozer26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1822)

**TL;DR** — A training-free proactive defense against partial speech manipulation embeds a compressed self-representation via repetitive LSB steganography, achieving EERs between 4.4% and 10.0% on word-swapping detection tasks.

## Problem

Partial deepfake speech, where only short segments of an authentic utterance are replaced or manipulated, severely degrades the reliability of passive detectors that look for synthesis artifacts. Identifying localized alterations and recovering original content remains difficult because passive systems struggle when spoofed regions are brief or sparse.

## Method

The framework uses a self-embedding strategy where a carrier speech signal embeds a compact latent representation of itself prior to distribution. Specifically, the audio is encoded using the SNAC neural speech codec at 0.98 kbps (24 kHz model resampled to 16 kHz), and the resulting bitstream is integrated into the carrier using a temporally repetitive least significant bit (LSB) embedding scheme with majority voting. At verification time, dynamic time warping (DTW) computes the alignment mismatch score between the received signal and its codec-based self-reconstruction to detect manipulated segments. The entire method is completely lightweight and training-free, requiring no training on spoofed data.

## Results

Evaluated on a validation subset of the AV-Deepfake1M dataset featuring word-swapping attacks using various vocoders (GriffinLim, HiFiGAN, HNSincNSF, HNSincNSFHiFi, WaveGlow). For single-word swapping, the proposed method achieves EERs between 8.91% and 10.00%, vastly outperforming passive baselines like LAV-DF (~50% EER), LAV-DF+ (~50% EER), and a ResNet detector (~44%–47.5% EER). For two-word swapping, the proposed method reduces EERs further to 4.44%–5.07%, whereas baselines remain near random or high error levels. Ablations over swapped word duration show that detection performance improves monotonically as the manipulated duration increases, dropping below 10% EER for segments longer than 0.3 seconds.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building secure speech communication platforms, media provenance verification pipelines, and proactive content authentication frameworks.

## Limitations

Detection performance degrades for extremely short manipulated segments under 0.1 seconds, where the resulting self-reconstruction mismatch becomes too weak to reliably isolate.

## Related

- (link related pages by id as the wiki grows)
