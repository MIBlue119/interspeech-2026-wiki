---
id: fong26_interspeech
category: asr
labels: [robustness-noise]
institutions: ["Huawei Technologies"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-224
pdf: https://www.isca-archive.org/interspeech_2026/fong26_interspeech.pdf
---

# Ada-Mic: Orientation-Adaptive and Robust Close-to-Mic Speech Detection on Smartphone Using Generalized Cross-Correlation Features

*Stuart Fong, Sky Qiao, Xuecong Sun, Seyed Shahabeddin Nabavi, Huanzhang Zhu, Jinran Zhu, Siqi Zhang, Amirhossein Hajavi, Rasoul Mohammadi Nasiri, Shuangliang Sun, Longshuai Xiao, Yuanhao Yu, Irina Kezele*

[PDF](https://www.isca-archive.org/interspeech_2026/fong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-224)

**Category:** `asr` · **Labels:** `robustness-noise`

**TL;DR** — Ada-Mic introduces an orientation-adaptive plug-in module for smartphone close-to-mic speech detection that uses Generalized Cross-Correlation (GCC) features to disentangle device distance from orientation. It achieves up to 24% accuracy improvements over prior baselines across challenging postures and background noise conditions.

## Key contributions

- Formulates the dual-channel close-to-mic speech detection task across diverse smartphone orientations to enable more natural No-Hot-Word wakening.
- Proposes Ada-Mic, a plug-in GCC-encoder branch that provides auxiliary spatial information to explicitly isolate phone posture from speaker distance.
- Demonstrates compatibility with both lightweight CNN backbones (ProxiMic) and fine-tuned foundational models (HuBERT) with negligible FLOP overhead (<0.01% for HuBERT, 7.6% for ProxiMic).
- Validates robustness on a newly collected multi-volunteer smartphone dataset featuring varied pitch/yaw angles and simulated real-world office and music noise.

## Problem

Traditional No-Hot-Word wakening methods (such as ProxiTalk and ProxiMic) rely heavily on signal magnitudes or single-microphone features, making them vulnerable to severe signal attenuation caused by non-axial Direction-of-Arrival (DoA) when users hold phones at arbitrary orientations. Consequently, users are restricted to rigid, unnatural holding postures to prevent false rejections or activations. Solving this requires modeling spatial posture variations without resorting to privacy-invasive sensors, ultrasonic emissions, or complex multi-microphone arrays unavailable on standard two-microphone smartphones.

## Method

Ada-Mic operates as a dual-stream architecture fusing a primary speech backbone with a lightweight auxiliary Generalized Cross-Correlation with Phase Transform (GCC-PHAT) encoder. The speech branch processes dual-channel inputs either via a CNN on stacked Mel-spectrograms (following ProxiMic) or a LoRA-fine-tuned HuBERT transformer on 16 kHz waveforms. Simultaneously, the GCC-PHAT stream computes the inverse Fast Fourier Transform of cross-power spectral density matrices from the top and bottom microphones, oversampling delays within [-2τ, 2τ] to capture both direct DoA and multi-path room reflections.

The GCC encoder uses a residual 1D convolutional architecture containing projection layers (kernel sizes 3 and 7), two residual blocks with channel dimensions scaling from 16 to 32, ReLU activations, BatchNorm, and a global max-pooling layer yielding a 32-dimensional feature vector. The backbone and GCC-branch embeddings are concatenated and passed through a fully connected layer with a sigmoid activation to output a binary probability for close versus far speech.

Models are trained end-to-end using Binary Cross-Entropy loss and the Adam optimizer (learning rate 4e-6, batch size 64, 200 epochs). Data augmentation dynamically introduces office and music noise at signal-to-noise ratios ranging from 5 to 20 dB during training.

## Experimental setup

Evaluated on a collected dataset of 38 hours of clean speech from 66 volunteers using 10 Huawei smartphone models (14-16 cm inter-mic distance), paired with 6.52 hours of music and office noise. Models are compared against dual-channel adapted ProxiMic (CNN) and HuBERT baselines using accuracy metrics, validated via Wilcoxon signed-rank tests (p < 0.05).

## Results

Ada-Mic consistently improves average accuracy by roughly 3% across all noise scenarios, with gains reaching up to 5% under noisy conditions and up to 24% for specific top-microphone orientation transitions where baseline gain is asymmetric. On ProxiMic and HuBERT backbones, Ada-Mic achieves statistically significant improvements over baselines in both Office and Music noise environments, particularly excelling at difficult transition distances (5 cm and 15 cm) where signal ambiguities are highest. In pristine quiet conditions, performance gains trend positively but do not always reach statistical significance due to near-ceiling baseline performance.

| System / Condition | Quiet (Avg) | Music Noise (Avg) | Office Noise (Avg) | Overall Average |
|---|---|---|---|---|
| ProxiMic Baseline | 96% | 97% | 91% | 94.7% |
| ProxiMic + Ada-Mic | 99% | 99% | 96% | 98.0% |
| HuBERT Baseline | 91% | 89% | 90% | 90.0% |
| HuBERT + Ada-Mic | 92% | 93% | 94% | 93.0% |

## Limitations

The dataset is restricted to devices with dual-microphone configurations (14-16 cm separation) from a single manufacturer (Huawei), potentially limiting immediate generalization to devices with asymmetric layouts or single-mic hardware. Performance on top-microphone orientations remains slightly more challenging due to physical hardware gain disparities. Evaluation is currently constrained to simulated background noise mixes and controlled distance bands rather than unconstrained in-the-wild acoustic environments.

## Why read this

Speech and mobile ML engineers building voice assistants or No-Hot-Word wakening systems will learn how to inject lightweight spatial priors via GCC-PHAT features into pre-trained acoustic models without retraining from scratch.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device voice assistant activation, hands-free smartphone wake-word bypass, and orientation-robust proxemic speech interfaces.

## Institutions / 機構

Huawei Technologies

## Related

- (link related pages by id as the wiki grows)
