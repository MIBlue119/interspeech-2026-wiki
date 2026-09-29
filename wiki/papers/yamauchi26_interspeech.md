---
id: yamauchi26_interspeech
category: enhancement-separation
labels: [efficient-on-device, generative-model, robustness-noise]
institutions: ["Asahi Shimbun Company", "Tokyo Woman's Christian University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-889
pdf: https://www.isca-archive.org/interspeech_2026/yamauchi26_interspeech.pdf
---

# QC-GAN: A Parameter-Efficient Quaternion Conformer GAN for High-Fidelity Speech Enhancement

*Shogo Yamauchi, Hideaki Tamori, Makoto Sakai, Yosuke Yamano, Tohru Nitta*

[PDF](https://www.isca-archive.org/interspeech_2026/yamauchi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yamauchi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-889)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `generative-model`, `robustness-noise`

**TL;DR** — QC-GAN introduces a parameter-efficient speech enhancement framework combining a Quaternion Conformer generator with a metric-learning discriminator, achieving a PESQ of 3.48 with 0.89M parameters on VoiceBank+DEMAND.

## Key contributions

- First application of quaternion neural networks to single-channel speech enhancement, proposing the Quaternion Conformer (QC) architecture.
- Achieves a PESQ of 3.48 with 0.89M parameters (VoiceBank+DEMAND), matching state-of-the-art models at less than half their size.
- Introduces an ultra-compact 35K-parameter variant (QC-GAN Tiny) that achieves a PESQ of 3.23.
- Demonstrates through ablation and phase analysis that quaternion representations lower phase errors (e.g., ~9% reduction in group delay error) by enforcing magnitude-phase coupling via the Hamilton product.

## Problem

State-of-the-art speech enhancement models like CMGAN and MP-SENet rely on heavy Conformer architectures with millions of parameters, making them expensive for resource-constrained edge devices. Existing lightweight compression techniques (channel pruning, depthwise convolutions) severely hurt representational capacity, particularly impairing phase modeling and causing audible artifacts like musical noise. Because phase accuracy directly drives perceptual scores (such as PESQ), finding a lightweight architecture that preserves phase information without bloating parameter counts remains a major challenge.

## Method

The paper presents the Quaternion Conformer GAN (QC-GAN), structured into a generator with a Quaternion Encoder (QG-Dilated DenseNet), a Two-Stage Quaternion Conformer (TSQ-Conformer) bottleneck, and a dual-branch decoder (magnitude mask and complex residual branches), alongside a metric-learning discriminator adapted from MetricGAN. The generator operates on a 4-channel quaternion input where the real part captures first-order temporal differences of log-magnitude, the first imaginary unit encodes static log-magnitude, and the remaining two imaginary units encode cosine and sine of normalized phase. All linear layers and convolutions are formulated in quaternion algebra using the Hamilton product, which shares four real-valued sub-matrices across axes to achieve a 4x parameter reduction compared to real-valued equivalents while imposing rotation-like coupling between magnitude and phase. 

The multi-task generator loss combines 5 objectives: real/imaginary spectrogram loss (L_RI, weight 0.1), magnitude loss (L_Mag, weight 0.9), time-domain waveform loss (L_Time, weight 0.2), differentiable PESQ loss (L_PESQ, weight 0.05), and GAN adversarial loss (L_GAN, weight 0.05). The discriminator optimizes a MetricGAN loss predicting normalized PESQ scores [0, 1] from reference and target magnitude spectrogram pairs. Training uses AdamW with initial learning rates of 5e-4 (generator) and 1e-3 (discriminator) with a decay schedule every 30 epochs and gradient clipping at 1.0.

## Experimental setup

Evaluated on VoiceBank+DEMAND (11,572 training utterances from 28 speakers; 824 test utterances) and DNS-Challenge 3 (760 hours clean speech, 181 hours noise, 118k room impulse responses). Inputs resampled to 16 kHz, cropped to 2s (32,000 samples); STFT computed with 25 ms Hann window and 6.25 ms hop size. Baselines include SEGAN, MetricGAN+, DPT-FSNet, CMGAN, MP-SENet, SE-Mamba, RNNoise, CCFNet+, FSPEN, LiSenNet, LSENet, NSNet2, and DCCRN. Evaluated via PESQ, STOI, CSIG, CBAK, COVL, DNSMOS (SIG, BAK, OVRL), and ITU-T P.808 MOS, alongside real-valued MACs and Real-NN parameter-matched ablations (32K and 140K params).

## Results

On VoiceBank+DEMAND, QC-GAN (Base, 0.89M params) achieves a PESQ of 3.48, outperforming CMGAN (3.41, 1.83M) and closely approaching MP-SENet (3.50, 2.05M) and SE-Mamba (3.55, 2.26M) while using half the parameters. QC-GAN (Tiny, 35K params) achieves a PESQ of 3.23 and STOI of 0.94, outperforming LiSenNet (3.07, 37K) and LSENet (3.12, 39K). On the DNS-Challenge 3 blind test set, QC-GAN (Base) achieves top non-intrusive metrics with an OVRL of 2.73, BAK of 3.79, and P.808 MOS of 3.37. Ablations demonstrate that the 35K quaternion model outperforms a parameter-matched Real-NN (32K, PESQ 3.12) and achieves comparable performance to a 4x-larger Real-NN (140K, PESQ 3.29), while reducing group delay phase error by 9.25%.

| System | Params | PESQ | STOI | COVL |
|---|---|---|---|---|
| Noisy | - | 1.97 | 0.91 | 2.63 |
| CMGAN [4] | 1.83M | 3.41 | 0.96 | 4.12 |
| MP-SENet [5] | 2.05M | 3.50 | 0.96 | 4.22 |
| SE-Mamba [3] | 2.26M | 3.55 | 0.96 | 4.26 |
| QC-GAN (Base) | 0.89M | 3.48 | 0.95 | 4.10 |
| QC-GAN (Tiny) | 35K | 3.23 | 0.94 | 3.79 |

## Limitations

Quaternion operations introduce computational overhead where the attention and transform dispatch limits CPU real-time factor (RTF 0.89 on a 4-thread CPU for the Tiny variant, heavily bottlenecked by the Conformer module). The work is currently restricted to single-channel speech enhancement without multi-channel spatial processing or streaming evaluation.

## Why read this

Researchers and engineers designing lightweight or on-device speech enhancement models will find this a masterclass in using hypercomplex inductive biases (quaternion algebra) to maintain phase-aware representational capacity without parameter bloat.

## Code

- https://github.com/asahi-research/QC-GAN

## Applications

On-device speech enhancement for hearing aids, mobile phones, and edge communications where memory and compute budgets are severely restricted.

## Institutions / 機構

Asahi Shimbun Company, Tokyo Woman's Christian University

## Related

- (link related pages by id as the wiki grows)
