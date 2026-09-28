---
id: chen26j_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1086
pdf: https://www.isca-archive.org/interspeech_2026/chen26j_interspeech.pdf
---

# Spiking Vocos: An Energy-Efficient Neural Vocoder

[PDF](https://www.isca-archive.org/interspeech_2026/chen26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1086)

**TL;DR** — Spiking Vocos is a frequency-domain spiking neural vocoder that achieves performance comparable to its ANN counterpart while consuming only 14.7% of the energy.

## Problem

Neural vocoders and frequency-domain models like Vocos achieve high synthesis quality and real-time inference speed, but they are not explicitly optimized for power consumption. Spiking Neural Networks (SNNs) offer high energy efficiency via event-driven accumulation operations, but directly substituting ANNs with SNNs introduces information bottlenecks from binary spikes and suboptimal temporal modeling, leading to significant performance degradation.

## Method

The model adapts the Vocos architecture into the spiking domain using a Spiking ConvNeXt backbone built with Parametric Leaky Integrate-and-Fire (PLIF) neurons. To mitigate the information bottleneck of binary spikes, an amplitude shortcut path is added via element-wise multiplication with absolute input values. A self-architectural distillation framework transfers knowledge from a pre-trained ANN Vocos teacher using layer-wise MSE feature alignment alongside magnitude L1 loss and a multi-component anti-wrapping phase loss (instantaneous phase, group delay, and phase time difference). Additionally, a Temporal Shift Module (TSM) splits feature channels to fuse past, present, and future information across timesteps with a residual weighting alpha of 0.5. Models are trained on LibriTTS for 1 million steps using AdamW.

## Results

Evaluated on the LibriTTS test-clean subset against an ANN Vocos baseline, the 4-step Spiking Vocos combining TSM and self-architectural distillation achieves a UTMOS of 3.74, PESQ of 3.45, ViSQOL of 4.65, V/UV F1 score of 0.9558, and a periodicity error of 0.116, closely approaching the baseline UTMOS of 3.82. Subjective evaluations show a MOS of 3.69 and SMOS of 3.69, which are competitive with Vocos (MOS 3.80) and HiFiGAN (MOS 3.79). Theoretical energy consumption analysis shows that the final 4-step model operates at an average firing rate of 17.6% and consumes 8.5 mJ compared to 58.0 mJ for the ANN baseline (14.7% energy usage, over 6.8x efficiency improvement). Ablations confirm that adding TSM alone raises 4-step UTMOS from 3.46 to 3.71, while distillation alone raises it to 3.70.

## Code

- https://github.com/pymaster17/Spiking-Vocos

## Applications

Speech and ML engineers building on-device, low-power audio synthesis, enhancement, and conversion systems.

## Limitations

Binary spike quantization effects create a notable gap in signal-level metrics like PESQ compared to continuous-valued ANN baselines.

## Related

- (link related pages by id as the wiki grows)
