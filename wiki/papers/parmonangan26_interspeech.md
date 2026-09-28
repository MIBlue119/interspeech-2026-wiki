---
id: parmonangan26_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-605
pdf: https://www.isca-archive.org/interspeech_2026/parmonangan26_interspeech.pdf
---

# Audio-Visual Feature Reconstruction Pretraining for Noise-Robust Emotion Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/parmonangan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/parmonangan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-605)

**TL;DR** — A Mamba2 state-space audio-visual fusion framework with self-supervised feature-reconstruction pretraining improves noise-robust emotion recognition, delivering accuracy gains of up to 5.8% on corrupted audio.

## Problem

Real-world degradations like background noise, reverberation, and dropped frames make audio-visual emotion recognition fragile, often causing corrupted inputs to dominate attention and suppress clean signals. Existing cross-modal pretraining methods focus mainly on semantic correspondence or contrastive alignment rather than explicit denoising, and rely on Transformer architectures whose quadratic complexity hinders long multi-modal sequence scalability.

## Method

The framework utilizes frozen EAT-base and Timesformer models for initial feature extraction from audio and video, followed by 3-layer Mamba2 encoders for each modality. Pretraining occurs in two stages: an 80-epoch unimodal encoder-only reconstruction stage using Mean Squared Error loss, and a 200-epoch multimodal stage featuring bidirectional cross-attention token fusion and Mamba2 decoders where loss weights are dynamically tuned via GradNorm. The model comprises 46.4M parameters in phase one and 76M parameters in phase two, operating on LRS2 for self-supervised pretraining and evaluated on RAVDESS with synthetically injected acoustic and visual corruptions.

## Results

Evaluated on the RAVDESS emotion recognition dataset under clean and varied noise-level conditions against non-pretrained and unimodal encoder-only baselines. Fused multimodal pretraining yields significant accuracy improvements for noisy audio inputs—specifically a 5.8% gain for noisy audio with clean video (NACV) and a 4.6% gain for noisy audio with noisy video (NANV) over unimodal baselines according to McNemar's significance tests. Video performance experiences a minor average drop of 2.1% to 3.2% due to baseline saturation and the introduction of noisier audio features.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building robust emotion recognition systems for human-computer interaction, healthcare, customer service, or educational tools operating in noisy real-world environments.

## Limitations

Fusing robust video features with noise-sensitive audio can occasionally cause a slight degradation in video classification performance when audio features are heavily corrupted.

## Related

- (link related pages by id as the wiki grows)
