---
id: song26g_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3119
pdf: https://www.isca-archive.org/interspeech_2026/song26g_interspeech.pdf
---

# Real-Time Speech Enhancement on Edge Devices Guided by Harmonic and Voice-Activity Cues Utilizing Skin-Attachable Accelerometer

[PDF](https://www.isca-archive.org/interspeech_2026/song26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/song26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3119)

**TL;DR** — The paper introduces LAU-NetV2, an ultra-lightweight multimodal speech enhancement model that uses skin-attachable accelerometer cues and feature-wise linear modulation to achieve real-time operation on microcontrollers with a PESQ of 2.78 under severe noise.

## Problem

Acoustic microphone speech enhancement models degrade severely in low-SNR environments below 0 dB due to limited capacity and noise vulnerability. While multimodal systems combining microphones with bone-conduction or skin-attachable accelerometers help, existing fusion strategies like parallel encoders or attention blocks introduce heavy computational overhead exceeding 10 MB, making them infeasible for resource-constrained wearable microcontrollers. This creates a need for high-performance multimodal speech enhancement designed specifically for edge hardware constraints.

## Method

The method proposes LAU-NetV2, which integrates a noisy acoustic microphone (AM) U-Net backbone with a skin-attachable accelerometer (ACC) sensor stream via cue-guided feature-wise linear modulation (FiLM). The ACC signal is compressed into two temporal-frequency cues: a voice activity detection (VAD) mask for suppressing non-speech regions and a soft harmonic mask for reinforcing voiced structures. These cues are mapped via a lightweight two-layer 1D convolution block to generate scaling and shifting parameters ($\gamma$, $\beta$) that modulate bottleneck features processed sequentially by frequency-axis and time-axis GRUs. The architecture comprises 45.59k parameters (with 30k dedicated to FiLM overhead) and 65.71M MACs/s. For deployment, the model is implemented in 32-bit floating-point precision on an STM32H753 microcontroller and undergoes 40% channel pruning to satisfy real-time latency budgets.

## Results

Evaluated on the TAPS dataset mixed with DNS Challenge noise across SNRs from -20 dB to 20 dB, LAU-NetV2 improves PESQ from 1.78 (noisy AM-only U-Net baseline) to 2.78 and outperforms lightweight SOTA baselines such as FSPEN and LiSenNet as well as multimodal models like VibVoice and FT-JNF S in extremely low SNRs. Ablation studies confirm that combining both VAD and harmonic FiLM pathways provides cumulative gains over baseline concatenation. Structured channel pruning at a 40% ratio reduces on-device inference time to 48.66 ms while maintaining a competitive PESQ of 2.62, achieving a total end-to-end streaming latency of 176 ms on a wearable microcontroller prototype.

## Code

- https://github.com/yhsong06/LAU-NetV2

## Applications

Engineers building wearable voice interfaces, smart glasses, or hearables requiring real-time speech enhancement in extremely loud ambient environments on resource-constrained microcontrollers.

## Limitations

The model's performance relies on synchronized skin-attachable accelerometer placement and quality, and high-frequency phonetic details naturally attenuated by tissue propagation must be effectively reconstructed by the cue-guided mechanism.

## Related

- (link related pages by id as the wiki grows)
