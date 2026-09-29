---
id: nguyen26b_interspeech
category: resources-evaluation
labels: [multilingual, dataset-or-benchmark-release, robustness-noise]
institutions: ["University of Wisconsin - Madison", "Oregon State University", "University of Sydney", "Kookmin University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-581
pdf: https://www.isca-archive.org/interspeech_2026/nguyen26b_interspeech.pdf
---

# Revisiting Active Speaker Detection: An In-the-Wild Benchmark for Generalization and Robustness

*Le Thien Phuc Nguyen, Zhuoran Yu, Khoa Quang Nhat Cao, Yuwei Guo, Tu Ho Manh Pham, Tuan Tai Nguyen, Toan Ngo Duc Vo, Lucas Poon, Tuan Khai Nguyen, Soochahn Lee, Yong Jae Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/nguyen26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nguyen26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-581)

**Category:** `resources-evaluation` · **Labels:** `multilingual`, `dataset-or-benchmark-release`, `robustness-noise`

**TL;DR** — The paper introduces UniTalk, a large-scale, in-the-wild active speaker detection benchmark featuring crowded scenes, background noise, and underrepresented languages, demonstrating that state-of-the-art models near-perfect on AVA drop significantly in performance (e.g., TalkNCE drops from >95 to 83.2 mAP).

## Key contributions

- Introduces UniTalk, a 44.5-hour active speaker detection dataset containing 48,693 speaking identities and an average of 2.6 visible speakers per frame.
- Establishes a fine-grained evaluation protocol featuring four distinct diagnostic subsets: underrepresented languages, noisy backgrounds, crowded scenes, and mixed-difficulty hard examples.
- Demonstrates that models pretrained on UniTalk exhibit superior cross-dataset transfer (88.0 on AVA, 91.4 on Talkies, 90.7 on ASW) and enable rapid adaptation with as little as 3 hours of target data.
- Conducts data scaling analysis showing performance plateaus around 33.5 hours of training data under current architectural setups.

## Problem

Active speaker detection (ASD) has long relied on the AVA-ActiveSpeaker benchmark, which is constructed entirely from movie content with clean audio and simple visual compositions. Recent methods achieve near-perfect mAP scores (>95%) on AVA, leading to the false assumption that ASD is a solved problem in practice. In real-world deployments such as video conferencing, live broadcasts, and social media, models must contend with overlapping speakers, heavy background noise, rapid camera motion, and diverse languages. Prior web-video datasets (like Talkies and ASW) lack sufficient scale or systematic categorization along these challenge axes, leaving model generalization unmeasured and poorly understood.

## Method

The paper benchmarks multi-stage architectures (ASDNet, ASC) and single-stage or contrastive frameworks (TalkNet, LoCoNet, LASER, TalkNCE). Single-stage models take a face track tensor $V \in \mathbb{R}^{T \times H \times W}$ and an audio Mel-spectrogram tensor $A \in \mathbb{R}^{4T \times M}$ (accounting for the 25 fps video vs 100 Hz audio sampling rate mismatch), mapping them via visual and audio encoders $F_v, F_a$ into features $f_v, f_a$. These are concatenated into $f_{av}$ and processed through a context modeling module $C$ to yield context-aware representations.

Training utilizes joint multi-task cross-entropy losses combining a primary sequence objective ($L_{av}$) and auxiliary unimodal objectives ($L_a, L_v$) to encourage attention across both modalities, with specific variants incorporating contrastive losses like TalkNCE ($\lambda_{av}=1, \lambda_a=0.4, \lambda_v=0.4$, TalkNCE weight 0.3). Single-stage models are optimized using Adam with a batch size of 4, sampling 200 frames per training example across 25 epochs, alongside data augmentations including random spatial cropping, scaling, flipping, rotations, and background noise mixing.

## Experimental setup

Evaluations are performed on UniTalk (44.5 total hours: 33.4 training, 11.1 testing) against baselines including AVA (38.5 hrs), ASW (23 hrs), and Talkies (4.2 hrs). Models are assessed using Mean Average Precision (mAP) computed over positive face detections. Notable implementation details include S3FD for face detection, greedy tracking with Gaussian filtering and linear interpolation for face tracks lasting at least 1 second, and hardware/optimizer settings using Adam across 25 epochs for single-stage and up to 115 epochs for multi-stage configurations.

## Results

State-of-the-art models like TalkNCE achieve 83.2 mAP overall on UniTalk, compared to >95 mAP on AVA, and drop to 77.9 mAP on the Hard subset. Across individual diagnostic axes on UniTalk, TalkNCE achieves 86.7 mAP on underrepresented languages, 84.1 mAP on noisy backgrounds, and 84.9 mAP on crowded scenes. When transferring models trained on UniTalk to out-of-domain benchmarks, TalkNCE reaches 88.0 on AVA, 91.4 on Talkies, and 90.7 on ASW, vastly outperforming models trained on AVA which score poorly when cross-evaluating. A data scaling study shows performance gains rise up to 33.5 hours of training data before plateauing.

| System / Condition | UniTalk Overall | AVA [16] | Talkies [1] | ASW [17] | Hard Subset |
|---|---|---|---|---|---|
| TalkNCE (trained on AVA) | 77.5 | 95.5 | 88.3 | 88.5 | 64.8 |
| TalkNet (trained on UniTalk) | 75.7 | 78.4 | 89.2 | 88.9 | 70.3 |
| LoCoNet (trained on UniTalk) | 82.2 | 84.4 | 91.0 | 90.0 | 76.2 |
| LASER (trained on UniTalk) | 82.2 | 84.5 | 91.3 | 90.5 | 75.8 |
| TalkNCE (trained on UniTalk) | 83.2 | 88.0 | 91.4 | 90.7 | 77.9 |

## Limitations

Despite improved language diversity, the dataset remains imbalanced due to platform constraints, with English overrepresented and non-English data harder to curate safely or verify automatically. The dataset scale plateaus in utility around 33.5 hours, indicating diminishing returns for brute-force data expansion under current architectures. Furthermore, license terms (CC BY-NC 4.0) explicitly prohibit deployment for facial recognition, surveillance, or biometric identification.

## Why read this

Researchers and engineers building active speaker detection systems for real-world deployment should read this to understand why legacy movie benchmarks overestimate model readiness. It provides a robust new training and evaluation benchmark that enforces cross-domain generalization.

## Code

- https://github.com/plnguyen2908/UniTalk-ASD-code

## Applications

Speaker diarization, audiovisual speech recognition, human-robot interaction, video conferencing systems, and live media production.

## Institutions / 機構

University of Wisconsin - Madison, Oregon State University, University of Sydney, Kookmin University

**Funding / 經費:** National Science Foundation, IBM, Institute of Information & Communications Technology Planning & Evaluation, Ministry of Science and ICT

## Related

- (link related pages by id as the wiki grows)
