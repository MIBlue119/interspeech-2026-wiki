---
id: li26e_interspeech
category: speech-coding
labels: [robustness-noise]
institutions: ["Wuhan University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-512
pdf: https://www.isca-archive.org/interspeech_2026/li26e_interspeech.pdf
---

# Noisy Environment Adaptation of Neural Speech Codec via Focal Mask and Noise Feature Separation

*Shaokai Li, Weiping Tu, Yuhong Yang*

[PDF](https://www.isca-archive.org/interspeech_2026/li26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-512)

**Category:** `speech-coding` · **Labels:** `robustness-noise`

**TL;DR** — FocalSE is a neural speech codec adaptation method that performs feature denoising, noise feature separation, and noise recognition within the continuous embedding space, improving reconstruction under low-bitrate and low-SNR conditions. It achieves a PESQ of 2.116 and an SI-SDR of 5.403 dB at 6 kbps and -5 dB SNR, outperforming existing baselines.

## Key contributions

- Proposes a focal mask mechanism combining focal modulation and Transformer blocks in a compressed space to capture global context and local mutual information.
- Introduces a dual-branch Focal Mask Noise Separation (FMNS) module that extracts enhanced speech embeddings and separates noise embeddings simultaneously.
- Integrates a 1D ResNet-18 noise recognition (NR) module to classify separated noise features and provide supervisory feedback for better separation.
- Demonstrates consistent performance gains across rigorous evaluations on LibriTTS and ESC-50 datasets under extreme low-bitrate (2.5 and 6.0 kbps) and low-SNR (-5 to 10 dB) conditions.

## Problem

Neural speech codecs (NSCs) like SoundStream and DAC achieve high-compression clean speech reconstruction, but real-world ambient noises severely degrade their performance, causing structural distortion. Traditional speech enhancement (SE) methods process waveforms directly and cannot be seamlessly integrated with NSC low-bitrate constraints, while prior NSC-based clean embedding extractors neglect explicit learning and suppression of noise components. This shortcoming leads to severe quality degradation under harsh low-bitrate and low-SNR conditions, motivating a joint framework that explicitly models and removes environmental noise inside the continuous codec space.

## Method

FocalSE operates within the continuous embedding space of a pre-trained Descript Audio Codec (DAC) backbone. The core architecture comprises two primary components: the Focal Mask Noise Separation (FMNS) module and the Noise Recognition (NR) module. The FMNS module uses a dual-branch design. The lower branch implements focal downscaling—combining focal modulation aggregation with local interaction modulation—followed by four stacked Transformer blocks in a low-dimensional compressed space to output enhanced embeddings via a learnable Sigmoid focal mask. The upper branch utilizes SEMamba to filter noisy embeddings, which are then subtracted from the enhanced features to isolate estimated noise embeddings. The NR module passes these separated noise embeddings through a 1D-convolutional ResNet-18 (channel-scaled down to 256) followed by fully connected and softmax layers for fine-grained noise classification.

Training proceeds in two stages. First, DAC is pre-trained on clean speech at specific bitrates (6.0 kbps using 16 codebook layers with 12-bit vector quantization, or 2.5 kbps using 8 layers with 10-bit vector quantization). Second, during noisy adaptation, the DAC encoder weights are frozen to serve as a feature extractor for ground-truth clean and noise embeddings, while the FocalSE modules are fine-tuned. The training objective minimizes an L1 loss aligning enhanced embeddings with clean targets, an L1 loss aligning separated noise embeddings with ground-truth noise features, a cross-entropy loss for noise classification, and the original DAC discriminator losses. Hyperparameters are set to alpha=0.2, beta=0.2, and gamma=0.5 with a batch size of 32.

## Experimental setup

Experiments use the LibriTTS clean speech corpus (245.1 hours training, 8.6 hours testing) mixed with environmental noise samples from the ESC-50 dataset across SNR levels from -10 dB to 20 dB. Models are compared against baseline DAC, SECE, and FD-CBR (constant bitrate RVQ) across 6.0 kbps and 2.5 kbps bitrates. Evaluation metrics include PESQ, STOI, SI-SDR, and noise classification accuracy (ACC), trained across 4 RTX 3090 GPUs for 150 epochs.

## Results

FocalSE outperforms all baseline models across every tested low-bitrate and low-SNR condition. At 6.0 kbps and -5 dB SNR, FocalSE achieves a PESQ of 2.116, STOI of 0.892, and SI-SDR of 5.403 dB, compared to FD-CBR's PESQ of 1.975 and SI-SDR of 4.516 dB. At a harsher 2.5 kbps and -5 dB SNR, FocalSE reaches a PESQ of 1.932 and SI-SDR of 3.635 dB. Ablation studies confirm the steady contribution of each component: removing both noise separation and recognition (FocalSE^-NR/ND) drops performance significantly (e.g., -5 dB SI-SDR drops from 5.403 to 4.816 dB at 6 kbps), and removing just the NR module (FocalSE^-NR) drops SI-SDR to 5.387 dB. A notable tradeoff is model size: the full model totals 222M parameters, where the DAC baseline takes 77M, the FMNS module adds 82M, and the ResNet1D-18 NR module accounts for 63M parameters.

| Systems / Conditions | 6 kbps (-5 dB) PESQ | 6 kbps (-5 dB) SI-SDR (dB) | 2.5 kbps (-5 dB) PESQ | 2.5 kbps (-5 dB) SI-SDR (dB) |
|---|---|---|---|---|
| DAC [4] | 1.215 | -5.193 | 1.181 | -6.676 |
| SECE [16] | 1.955 | 4.294 | 1.741 | 2.393 |
| FD-CBR [18] | 1.975 | 4.516 | 1.754 | 2.417 |
| FocalSE^-NR/ND | 1.988 | 4.816 | 1.905 | 3.603 |
| FocalSE^-NR | 2.086 | 5.387 | 1.917 | 3.611 |
| FocalSE (Full) | 2.116 | 5.403 | 1.932 | 3.635 |

## Limitations

The model introduces a heavy parameter footprint totaling 222M parameters (with the ResNet1D-18 NR module contributing 63M), which may restrict deployment in low-latency, on-device edge scenarios. Evaluations are limited to English speech (LibriTTS) and a standard set of 50 environmental noise classes (ESC-50), leaving multilingual generalization and robustness to unseen real-world acoustic profiles unverified.

## Why read this

Speech and ML engineers building robust neural speech codecs for noisy communication channels will find a principled recipe for integrating noise separation and auxiliary recognition tasks into continuous codec embedding spaces.

## Code

- https://github.com/shaokai1209/FocalSE

## Applications

Robust low-bitrate VoIP communications, satellite telephony, and speech compression pipelines deployed in acoustically challenging, high-noise environments.

## Institutions / 機構

Wuhan University

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
