---
id: yu26e_interspeech
category: source-separation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1999
pdf: https://www.isca-archive.org/interspeech_2026/yu26e_interspeech.pdf
---

# Online Audiovisual Speaker Separation Using Efficient Visual Knowledge Distillation

[PDF](https://www.isca-archive.org/interspeech_2026/yu26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yu26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1999)

**TL;DR** — This paper introduces an efficient visual knowledge distillation strategy for causal audiovisual speaker separation, achieving state-of-the-art online performance while reducing visual front-end model size by 48 times and computational complexity by 7.5 times.

## Problem

Causal audiovisual speaker separation systems suffer significant performance drops compared to offline variants because they lack future context and rely on heavily parameterized, non-causal visual embedding models. Integrating these heavy visual front-ends into strict online frameworks is challenging due to high computational overhead and incompatible temporal receptive fields. This matters because real-time speech enhancement and separation applications require both strict algorithmic causality and high efficiency.

## Method

The authors adapt a pre-trained DeepAVSR visual embedding model for causality by incorporating asymmetric temporal padding to restrict its receptive field to past and current frames. They then apply an online AV-CrossNet separator architecture featuring masked global multi-head self-attention, cross-band modules, and optional Mamba narrow-band modules. To compress the heavy visual front-end, a visual knowledge distillation (VKD) teacher-student strategy is proposed, where the student model reduces the channel dimensions of each residual layer by a factor of 16. During training, a dynamic weighting mechanism blends the outputs of the frozen high-capacity teacher and the lightweight student, linearly decreasing the teacher weight from 99% to zero over 50 epochs while jointly optimizing for the downstream audiovisual speaker separation task.

## Results

The approach is evaluated on the LRS2-2mix, LRS3-2mix, and VoxCeleb2-2mix benchmark datasets using PESQ, SI-SDRi, and SDRi metrics. On LRS2-2mix and LRS3-2mix, the online AV-CrossNet-Mamba-VKD system surpasses competing online baselines by over 0.3 in PESQ, 0.8 dB in SI-SDRi, and 0.3 dB in SDRi. On VoxCeleb2-2mix, it outperforms the most competitive baseline (Swift-Net-12) by 0.2 in PESQ while maintaining competitive signal fidelity. Furthermore, the VKD compression shrinks model size by over 48x and MACs by 7.5x while matching or slightly exceeding the performance of the uncompressed online model.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building real-time communication systems, hearing aids, or video conferencing tools that require separating overlapping speakers on edge or resource-constrained devices.

## Related

- (link related pages by id as the wiki grows)
