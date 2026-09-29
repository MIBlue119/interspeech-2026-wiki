---
id: ling26_interspeech
category: enhancement-separation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1710
pdf: https://www.isca-archive.org/interspeech_2026/ling26_interspeech.pdf
---

# TGTSE: Token-Guided Target Speaker Extraction with Visual Cue

*Tongtao Ling, Shulin He, Zhong-Qiu Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/ling26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ling26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1710)

**Category:** `enhancement-separation`

**TL;DR** — TGTSE introduces a token-guided paradigm for audio-visual target speaker extraction by mapping visual lip movements to discrete semantic tokens, achieving a state-of-the-art SDR of 15.2 dB on VoxCeleb2-2Mix. It bridges the cross-modal gap by replacing continuous lip embeddings with causally grounded speech tokens as temporal guidance.

## Key contributions

- Formulates audio-visual target speaker extraction as a two-stage sequence modeling problem: predicting discrete semantic tokens from lip movements, which then condition a speech extractor.
- Eliminates raw visual-acoustic modality heterogeneity by substituting continuous 3D-ResNet lip embeddings with discrete, modality-agnostic semantic tokens derived via WavLM-KM.
- Achieves consistent performance gains across both time-frequency (TFGridNet) and time-domain (MossFormer2) speaker extractors on standard benchmarks.
- Demonstrates robust cross-domain generalization on LRS3, TCD-TIMIT, and Grid datasets without re-training.

## Problem

Conventional audio-visual target speaker extraction (AVTSE) frameworks directly condition speech extractors on continuous lip embeddings extracted by pre-trained face encoders like 3D-ResNet18. However, raw visual features reside in a completely different modality space than audio mixtures, forcing neural networks to learn complex cross-modal alignments despite differing temporal resolutions and a lack of explicit semantic structure. Furthermore, enrollment utterance approaches provide only weak global context without fine-grained temporal alignment to capture dynamic prosody and articulation timing. TGTSE addresses this by mapping visual streams into a discrete semantic token space, simplifying cross-modal alignment and reducing audio-visual ambiguity.

## Method

The TGTSE framework consists of a token predictor and a token-guided speaker extractor. The token predictor takes a facial video stream $v$ and mixture spectral magnitudes via STFT, processing them through a pre-trained face encoder (3D-ResNet18) and a 6-layer Transformer encoder (hidden size 256, feed-forward dimension 1024, 8 attention heads, 25.4M parameters) to predict discrete semantic tokens. Pseudo token labels are obtained offline by applying K-means clustering ($K=128$) to layer-wise hidden states extracted from a frozen WavLM-Large model. The network is optimized via frame-level cross-entropy loss.

The predicted tokens are mapped to continuous embedding vectors through a trainable codebook and up-sampled to condition either a time-frequency domain extractor (TFGridNet, 11.3M parameters) or a time-domain extractor (MossFormer2, 55.7M parameters). In TFGridNet, token embeddings are projected and concatenated with encoder representations before passing through TFGridNet blocks. In MossFormer2, token embeddings are fused within a mask-based estimator to produce a multiplicative mask. The entire extraction network is trained end-to-end to minimize negative scale-invariant signal-to-distortion ratio (SI-SDR) loss using mixtures sampled at 16 kHz with SNRs ranging from -10 to +10 dB.

## Experimental setup

Evaluated on VoxCeleb2-2Mix and LRS2-2Mix datasets, each containing 20,000 training, 5,000 validation, and 3,000 test mixtures simulated with SNRs from -10 to +10 dB. Cross-domain evaluation is performed on 3,000 generated mixtures from LRS3, TCD-TIMIT, and Grid datasets. Baselines include VisualVoice, AV-ConvTasNet, AV-DPRNN, MuSE, AV-SepFormer, SEANet, Uni-Net, AV-CrossNet, AV-TFGridNet, and AV-MossFormer2. Metrics include SDR, SI-SDR, PESQ, and STOI. Models are trained using Adam/AdamW optimizers for up to 50 epochs.

## Results

TGTSE (MossFormer2) achieves headline results of 15.2 dB SDR and 14.8 dB SI-SDR on VoxCeleb2-2Mix, alongside 16.2 dB SDR and 15.7 dB SI-SDR on LRS2-2Mix, outperforming conventional AV-MossFormer2 and AV-TFGridNet baselines. When using TFGridNet, TGTSE improves SDR by 0.7 dB and SI-SDR by 0.9 dB over AV-TFGridNet on VoxCeleb2-2Mix. In cross-domain zero-shot evaluations on TCD-TIMIT, TGTSE (MossFormer2) reaches 19.6 dB SDR and 19.2 dB SI-SDR. Ablations on codebook size $K$ reveal that performance peaks at $K=128$, while token accuracy sensitivity tests show that reasonable performance is retained even if token prediction accuracy drops to 60%.

| System | Vox2-2Mix SDR | Vox2-2Mix SI-SDR | LRS2-2Mix SDR | LRS2-2Mix SI-SDR |
|---|---|---|---|---|
| AV-TFGridNet [30] | 14.1 | 13.6 | 15.7 | 15.1 |
| AV-MossFormer2 [31] | 14.9 | 14.5 | 16.0 | 15.5 |
| TGTSE (TFGridNet) | 14.8 | 14.5 | 15.9 | 15.3 |
| TGTSE (MossFormer2) | 15.2 | 14.8 | 16.2 | 15.7 |

## Limitations

The approach relies heavily on the quality and robustness of the pre-trained face encoder (3D-ResNet18) and frozen WavLM-Large K-means model, meaning severe occlusions, poor lighting, or profile views in the facial video will degrade token prediction accuracy. Evaluation is restricted to clean-to-moderately noisy two-speaker simulated mixtures (-10 to 10 dB SNR) and does not test complex multi-talker cocktail party scenarios with more than two concurrent speakers. Furthermore, language coverage is implicitly limited by the English-centric nature of VoxCeleb and LRS datasets.

## Why read this

Researchers and engineers working on audio-visual speech enhancement or target speaker extraction should read this paper to understand how discrete self-supervised speech tokens can replace raw continuous visual embeddings to bridge the cross-modal gap.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Online meeting systems, smart hearing aids, and interactive robotics operating in noisy and multi-speaker environments.

## Institutions / 機構

Southern University of Science and Technology

## Related

- (link related pages by id as the wiki grows)
