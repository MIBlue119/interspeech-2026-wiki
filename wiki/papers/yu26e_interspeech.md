---
id: yu26e_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1999
pdf: https://www.isca-archive.org/interspeech_2026/yu26e_interspeech.pdf
---

# Online Audiovisual Speaker Separation Using Efficient Visual Knowledge Distillation

*Cheng Yu, Vahid A. Kalkhorani, Ashutosh Pandey, Daniel Wong, Jacob Donley, Buye Xu, DeLiang Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/yu26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yu26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1999)

**TL;DR** — This paper presents Visual Knowledge Distillation (VKD) for causal audiovisual speaker separation, compressing a pre-trained visual front-end by 48.6x in parameters and 7.5x in MACs while setting new state-of-the-art results for online AVSS systems.

## Key contributions

- Adapts the non-causal DeepAVSR visual embedding model to strict causality via asymmetric temporal padding on the input video stream.
- Proposes Visual Knowledge Distillation (VKD), a progressive teacher-student strategy using a dynamic weighting mechanism that jointly optimizes for the teacher's representations and the downstream AVSS task.
- Extends online AV-CrossNet (including a Mamba variant) to multi-speaker audiovisual speaker separation (AVSS) by aligning audio and visual features along channels.
- Achieves state-of-the-art performance among online AVSS models on LRS2, LRS3, and VoxCeleb2 datasets, significantly closing the performance gap between causal and non-causal systems.

## Problem

Real-world speech enhancement and separation require strict algorithmic causality for online, real-time deployment. However, causal speaker separation systems experience severe performance degradation compared to offline variants because they lack future audio and visual context needed to continuously group speech features into underlying speakers. Furthermore, audiovisual systems rely on heavily parameterized, non-causal visual embedding models that cannot be trivially integrated into online frameworks, and prior attempts at lightweight visual front-ends lack task-oriented optimization or robust causal adaptation.

## Method

The system processes 16 kHz audio mixtures into complex STFT spectrograms $\mathbf{X}$ and 25 FPS video frames into grayscale ROIs of size $t_v \times 112 \times 112$. To achieve causality, the non-causal DeepAVSR visual embedding front-end (comprising a 3D convolutional encoder and 18 residual blocks) is modified using asymmetric temporal padding during inference so output embeddings depend solely on past and current frames. The separator backbone builds on online AV-CrossNet, incorporating masked global multi-head self-attention, cross-band, narrow-band, and Mamba modules, which implicitly resolve speaker permutation ambiguity by channel-wise feature alignment.

To eliminate the computational bottleneck of the full visual front-end, the proposed Visual Knowledge Distillation (VKD) technique trains a lightweight student model—created by scaling down the channel dimensions of each residual layer by a factor of 16. During training, the visual stream combines teacher and student outputs through a dynamic weighted sum: $w_1$ (teacher weight) starts at 0.99 and $w_2$ (student weight) starts at 0.01. By a predefined epoch $K=50$, $w_1$ linearly decays to zero while $w_2$ increases to 1.0, smoothly transferring representation capacity while the student is simultaneously optimized for the AVSS loss.

The overall system is optimized using a combined loss function of scale-invariant signal-to-distortion ratio (SI-SDR) and spectral magnitude loss. Training uses the Adam optimizer with an initial learning rate of 0.001, managed by a ReduceLROnPlateau scheduler (patience 3, decay factor 0.9), and runs on 4 NVIDIA H100 GPUs with mini-batches of 6 mixtures (3 seconds audio, 75 visual frames per batch).

## Experimental setup

Evaluated on three benchmark datasets: LRS2 (11/3/1.5 hours train/val/test), LRS3 (28/3/1.5 hours), and VoxCeleb2 (56/3/1.5 hours). Baselines include offline systems (AV-ConvTasNet, CTCNet, RTFS-Net-12, Dolphin, TF-CrossNet, AV-CrossNet) and online systems (AV-ConvTasNet, CTCNet, RTFS-Net-12, Swift-Net-12). Evaluation metrics are PESQ, SI-SDRi (dB), SDRi (dB), parameter count (MB), and computational complexity in MACs (G/s).

## Results

On the LRS2-2mix dataset, the proposed oAV-CrossNet-Mamba-VKD achieves a PESQ of 3.39, SI-SDRi of 14.7 dB, and SDRi of 15.0 dB, outperforming the closest online baseline Swift-Net-12 by over 0.3 in PESQ and 0.8 dB in SI-SDRi. On LRS3-2mix, it reaches 3.48 PESQ and 16.6 dB SI-SDRi. Compared against alternative front-end compression strategies on VoxCeleb2-2mix, VKD achieves 11.6 dB SI-SDRi and 3.19 PESQ with only 0.23 MB parameters and 1.7 G/s MACs, significantly outperforming early-layer extraction (DeepAVSR-mid at 7.1 dB SI-SDRi) and single-frame baselines (10.3 dB SI-SDRi). Ablations show that naive scratch-training or direct fine-tuning of the student front-end fails to converge, proving the necessity of progressive task-oriented distillation.

| System | PESQ | SI-SDRi (dB) | SDRi (dB) | Params (MB) | MACs (G/s) |
|---|---|---|---|---|---|
| Unprocessed (LRS2) | 1.71 | 0.0 | 0.0 | - | - |
| Swift-Net-12 (Online) | 3.07 | 13.9 | 14.2 | 11.19 | 7.95 |
| oAV-CrossNet-Mamba | 3.32 | 14.1 | 14.5 | 11.19 | 12.92 |
| oAV-CrossNet-Mamba-VKD | 3.39 | 14.7 | 15.0 | 0.23 | 1.71 |
| Dolphin (Offline) | 3.29 | 16.8 | 16.9 | 0.78 | 2.38 |

## Limitations

The evaluation is restricted to clean and moderately noisy speech mixtures with 2 active speakers (2-mix) sampled at specific video frame rates (25 FPS). The approach relies heavily on a pre-trained teacher model (DeepAVSR) and requires careful scheduling of the linear weight decay parameter $K$, making it sensitive to hyperparameter choices in distillation. Additionally, performance under extreme visual degradations (such as severe pose variations or total occlusion in unconstrained multi-speaker environments) remains bounded by the representational limits of the compressed student front-end.

## Why read this

Researchers and engineers building real-time, on-device causal audiovisual speech separation systems should read this paper to learn how to effectively compress heavy visual backbones via progressive task-oriented knowledge distillation without sacrificing separation performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time hearing aids, live video conferencing enhancement, augmented reality glasses, and causal speech separation on edge devices.

## Related

- (link related pages by id as the wiki grows)
