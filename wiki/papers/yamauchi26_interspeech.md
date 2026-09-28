---
id: yamauchi26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-889
pdf: https://www.isca-archive.org/interspeech_2026/yamauchi26_interspeech.pdf
---

# QC-GAN: A Parameter-Efficient Quaternion Conformer GAN for High-Fidelity Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/yamauchi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yamauchi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-889)

**TL;DR** — QC-GAN introduces a parameter-efficient quaternion Conformer generative adversarial network for single-channel speech enhancement, achieving a PESQ score of 3.48 with only 0.89M parameters.

## Problem

Lightweight speech enhancement models often sacrifice parameter capacity, which critically damages their ability to model complex spectral structures and phase information accurately. Phase distortions directly cause audible artifacts like musical noise and limit performance on perceptual metrics such as PESQ, creating a severe trade-off between model size and speech quality. Standard real-valued networks treat magnitude and phase independently, failing to exploit their structural interdependencies efficiently.

## Method

The paper proposes the Quaternion Conformer GAN (QC-GAN), which assigns STFT magnitude and phase directly to the four axes of a quaternion representation (real and three imaginary components). The architecture utilizes quaternion fully-connected layers (QFC), quaternion convolutional layers (QConv), and quaternion multi-head self-attention (Q-MHSA) driven by Hamilton products for structured weight sharing and component-wise softmax. The generator comprises a quaternion encoder with QG-Dilated DenseNets, a two-stage Quaternion Conformer bottleneck operating across time and frequency, and a dual-branch decoder estimating magnitude masks and complex residuals. Training employs a MetricGAN-based framework with a discriminator approximating perceptual evaluation scores alongside multi-task losses.

## Results

Evaluated on the VoiceBank+DEMAND dataset, the main QC-GAN model achieves a PESQ score of 3.48 with 0.89M parameters, matching state-of-the-art models at less than half their size. An ultra-compact variant with only 35K parameters reaches a PESQ score of 3.23. Generalization is further confirmed on the DNS-Challenge 3 dataset. Ablation studies replacing quaternion layers with real-valued equivalents demonstrate that quaternion algebra achieves lower phase errors.

## Code

- https://github.com/asahi-research/QC-GAN

## Applications

Speech and ML engineers building on-device, low-latency, or resource-constrained speech enhancement systems for telephony, hearing aids, and communication devices.

## Related

- (link related pages by id as the wiki grows)
