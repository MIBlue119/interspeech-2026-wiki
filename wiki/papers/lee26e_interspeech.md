---
id: lee26e_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-646
pdf: https://www.isca-archive.org/interspeech_2026/lee26e_interspeech.pdf
---

# RAF: Relativistic Adversarial Feedback For Universal Speech Synthesis

*Yongjoon Lee, Jung-Woo Choi*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-646)

**TL;DR** — Relativistic Adversarial Feedback (RAF) is a novel training objective for GAN vocoders that incorporates pretrained self-supervised speech representations and relativistic pairing to improve in-domain fidelity and zero-shot generalization. RAF-trained BigVGAN-base outperforms standard LSGAN BigVGAN in perceptual quality while using only 12% of its parameters.

## Key contributions

- Introduces Relativistic Adversarial Feedback (RAF), combining SSL-guided quality estimation with relativistic pairing to improve both in-distribution and out-of-distribution neural vocoding.
- Proposes a multi-component quality gap combining WavLM-large, HuBERT-large, and Multi-resolution STFT distances to capture both perceptual speech quality and multi-view spectral patterns.
- Demonstrates broad architectural applicability by successfully integrating RAF into BigVGAN-base, HiFi-GAN (v1), and Vocos.
- Provides extensive experimental validation across source data and four diverse unseen evaluation datasets (LJSPEECH, Deeply Korean, Under-resourced languages, and MUSDB18-HQ).

## Problem

Modern GAN-based neural vocoders achieve high synthesis efficiency in a single-step generation process, but their standard adversarial training objectives often fail to promote generalizable representations across unseen speakers, languages, and recording environments. Prior improvements like BigVGAN successfully scaled generator capacity to achieve universality, but at the expense of diminished synthesis efficiency or significantly larger models. Alternative approaches such as Flow Matching and diffusion models provide strong generalization and adaptability, but require multiple costly sampling steps during inference. RAF addresses this gap by enabling high-fidelity generalization in efficient single-step GAN vocoders without inflating model capacity.

## Method

The RAF framework consists of two core components: a quality gap and a discriminator gap. The quality gap quantifies perceptual distance using normalized embedding distances from the last convolutional layer of WavLM-large (16 kHz downsampled, alpha_W = 10,000), the 22nd layer of HuBERT-large (alpha_H = 10,000), and a Multi-resolution STFT (M-STFT) distance across five window sizes ranging from 256 to 4096 (alpha_M = 1). The discriminator gap employs a softplus activation function applied to the difference between real and generated waveform discriminator scores, creating a non-separable objective that forces the discriminator to assign individual decision boundaries for each real-fake sample pair rather than a global boundary.

The training objective utilizes mean-squared error matching between the discriminator gap and the quality gap, regularized by a zero-centered gradient penalty (0-GP, gamma = 0.1) applied every 7 steps to both real and fake data using a segment size of 24,576 samples. The generator is optimized using the adversarial loss combined with auxiliary mel-spectrogram loss (lambda_mel = 26) and discriminator feature matching loss (lambda_FM = 1). Training runs use the AdamW optimizer with beta_1 = 0.8, beta_2 = 0.99, and a base learning rate of 1e-4 with exponential decay, matching or exceeding baseline configurations over 1 million steps.

During inference, the pretrained SSL models and discriminator are discarded, allowing the generator to synthesize waveforms from mel spectrograms in a single step with zero inference-time overhead compared to baseline GAN vocoders.

## Experimental setup

Models were trained on the LibriTTS dataset (24 kHz, 900+ hours covering train-clean-100, train-clean-360, and train-other-500) using a batch size of 16 across four NVIDIA RTX 3090 GPUs. Baselines include LSGAN, HingeGAN, RpGAN-GP, LSGAN + Q recon, MetricGAN-RAF variants, BigVSAN, and WaveFM (1-step and 6-step). Evaluated model backbones include BigVGAN-base, HiFi-GAN (v1), and Vocos. Evaluation metrics encompass PESQ, M-STFT spectral distance, F1 score for voiced/unvoiced classification, periodicity error, UTMOS, and SCOREQ (both full-reference and no-reference).

## Results

On the LibriTTS-dev evaluation set, BigVGAN-base trained with RAF achieves a PESQ of 3.767, UTMOS of 3.651, and full-reference SCOREQ of 0.148, outperforming the standard LSGAN-trained BigVGAN-base (PESQ 3.452, UTMOS 3.450) and even surpassing the full BigVGAN baseline with 1124 parameters (UTMOS 3.509) while using only 14 million parameters. Subjective SMOS evaluations on LibriTTS-test confirm RAF achieves 4.592 versus 4.526 for LSGAN, while cross-lingual evaluation on the Deeply Korean dataset shows an even larger SMOS gain (4.324 vs 3.824).

In ablation studies, removing the softplus activation or omitting WavLM and HuBERT features from the quality gap leads to substantial drops in perceptual quality metrics like UTMOS (falling from 3.515 to 2.872 when dropping SSL features). The primary limitation in results is increased training time; BigVGAN-base trained with RAF takes 9.4 days compared to 5.9 days for standard LSGAN due to the segment size and gradient penalty overhead.

| System | PESQ ↑ | UTMOS ↑ | SCOREQ Full-ref ↓ | SCOREQ No-ref ↑ |
|---|---|---|---|---|
| BigVGAN-base (LSGAN) | 3.452 | 3.450 | 0.195 | 3.515 |
| BigVGAN-base (RAF, 0.5M steps) | 3.619 | 3.617 | 0.161 | 3.635 |
| BigVGAN-base (RAF, 1M steps) | 3.767 | 3.651 | 0.148 | 3.667 |
| BigVGAN (Full, LSGAN) | 3.824 | 3.509 | 0.180 | 3.556 |
| HiFi-GAN (v1) (LSGAN) | 2.735 | 3.369 | 0.237 | 3.453 |
| HiFi-GAN (v1) (RAF) | 3.018 | 3.492 | 0.204 | 3.539 |

## Limitations

Training incurs high computational and time overhead due to long segment lengths, zero-centered gradient penalties, and forward passes through heavy pretrained SSL models, without exploring lightweight SSL alternatives. The paper lacks rigorous theoretical proof regarding the convergence properties of the proposed relativistic adversarial framework. Additionally, improving neural vocoder fidelity carries ethical risks regarding the generation of convincing audio deepfakes and voice spoofing.

## Why read this

Speech and ML researchers working on generative audio will find this a definitive blueprint for injecting perceptual self-supervised representations into adversarial training without sacrificing single-step inference speed. It provides rigorous empirical comparisons proving that relativistic sample pairing outperforms standard metric-guided GAN objectives.

## Code

- https://github.com/infected4098/Relativistic-Adversarial-Feedback

## Applications

Universal neural vocoding for Text-to-Speech (TTS), Voice Conversion (VC), speech enhancement, and cross-lingual speech generation systems.

## Related

- (link related pages by id as the wiki grows)
