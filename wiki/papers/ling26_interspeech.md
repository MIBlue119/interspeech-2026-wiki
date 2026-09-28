---
id: ling26_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1710
pdf: https://www.isca-archive.org/interspeech_2026/ling26_interspeech.pdf
---

# TGTSE: Token-Guided Target Speaker Extraction with Visual Cue

[PDF](https://www.isca-archive.org/interspeech_2026/ling26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ling26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1710)

**TL;DR** — This paper proposes a token-guided audio-visual target speaker extraction framework that predicts discrete semantic tokens from lip movements to condition speech extraction, achieving an SI-SDR of 14.8 dB on VoxCeleb2-2Mix.

## Problem

Conventional audio-visual target speaker extraction methods directly condition speech extraction on raw visual signals or continuous lip embeddings extracted by pre-trained encoders. This approach suffers from modality heterogeneity, temporal resolution mismatches, and a difficult cross-modal alignment mapping between the visual and acoustic domains. Bridging this gap with discrete, causally grounded semantic tokens simplifies alignment and enables the network to focus on content-aware target speech reconstruction.

## Method

The framework consists of a token predictor and a token-guided speaker extractor. The token predictor combines a pre-trained 3D-ResNet18 face encoder and a spectral mixture representation processed by 1D convolutions, feeding them into a 6-layer transformer encoder to predict discrete semantic tokens supervised by WavLM-KM pseudo-labels (codebook size K=128). The predicted tokens are mapped via a trainable codebook to embeddings that condition time-frequency (TFGridNet) or time-domain (MossFormer2) speaker extractors trained using negative scale-invariant signal-to-distortion ratio (SI-SDR) loss. The token predictor contains 25.4M parameters, while TFGridNet and MossFormer2 use 11.3M and 55.7M parameters respectively.

## Results

Evaluated on VoxCeleb2-2Mix and LRS2-2Mix datasets containing 20,000 training mixtures at -10 to +10 dB SNR. TGTSE (MossFormer2) achieves an SDR of 15.2 dB and SI-SDR of 14.8 dB on VoxCeleb2-2Mix, and an SDR of 16.2 dB and SI-SDR of 15.7 dB on LRS2-2Mix, outperforming baseline AV-MossFormer2. Cross-domain evaluations on LRS3, TCD-TIMIT, and Grid datasets also demonstrate superior generalization. Ablation studies show that codebook size K=128 yields optimal oracle performance and that reasonable extraction quality is maintained even with 60% token prediction accuracy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers working on audio-visual speech enhancement, online meeting assistants, hearing aid signal processing, and human-robot interaction systems operating in noisy environments.

## Limitations

Performance depends on the accuracy of the token predictor, where higher token codebook sizes increase classification difficulty and lower prediction accuracy.

## Related

- (link related pages by id as the wiki grows)
