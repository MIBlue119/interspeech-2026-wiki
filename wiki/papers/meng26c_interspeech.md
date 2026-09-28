---
id: meng26c_interspeech
category: speaker-diarization
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1618
pdf: https://www.isca-archive.org/interspeech_2026/meng26c_interspeech.pdf
---

# BiEAR: A Human Auditory-Inspired Adaptive Binaural Front-end for Multi-Speaker Localisation and Distance Estimation

*Hanyu Meng, Eliathamby Ambikairajah, Vidhyasaharan Sethu, Qiquan Zhang, Haizhou Li*

[PDF](https://www.isca-archive.org/interspeech_2026/meng26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/meng26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1618)

**TL;DR** — BiEAR is a human auditory-inspired adaptive binaural front-end that uses neural feedback controllers to dynamically modulate cochlear filterbank Q-factors, improving multi-speaker localization and distance estimation under unseen acoustic conditions.

## Key contributions

- Proposes BiEAR, a binaural auditory front-end incorporating medial olivocochlear (MOC)-inspired neural feedback to regulate subband filter selectivity via Q-factors during inference.
- Designs ear-specific neural feedback controllers supporting both absolute (additive) and relative (multiplicative) frame-wise Q-modulation strategies for asymmetric left and right ear filtering.
- Demonstrates improved robustness across anechoic and reverberant real-room environments with unseen speakers, supported by interpretable visualizations of frequency-band and ear-specific adaptation.

## Problem

Traditional deep learning binaural sound source localization models rely on fixed front-ends with feedforward inference pipelines, omitting the efferent feedback loops found in human hearing. This static design limits adaptation to non-stationary scenes, unseen speakers, and reverberant real-world acoustic environments. Consequently, prior models like AuralNet and DeepEar experience significant performance degradation when deployed in unfamiliar rooms or dynamic multi-speaker scenarios.

## Method

BiEAR takes a 1-second binaural waveform segment, computes STFT, and passes it through $K=100$ adjustable Gabor filters distributed on the Equivalent Rectangular Bandwidth (ERB) scale. The left and right ears feature independent neural feedback controllers. Each controller comprises a GRU layer (hidden size 128), three SiLU-activated fully connected layers (sizes 128, 128, K), and a tanh output layer yielding a bounded modulation signal $\delta[t, k] \in [-1, 1]$. Inputs to the controller are instantaneous subband sound pressure levels (SPL) $E^{L/R}[t, k]$ and their exponential moving average $\tilde{E}^{L/R}[t, k]$ with temporal memory $\beta = 0.8$. 

Two Q-modulation strategies are evaluated: absolute control ($Q^{\text{abs}}[t, k] = \text{clip}(Q_0[k] + \Delta Q[k] \delta[t, k])$) and relative control ($Q^{\text{rel}}[t, k] = \text{clip}(Q_0[k](1 + \Delta Q[k] \delta[t, k]))$), bounded between $Q_{\min} = 0.05$ and $Q_{\max} = 30$. Relative control scales proportionally to the baseline $Q_0[k]$, providing superior stability. The front-end extracts ILD, IPD, and raw-waveform cross-correlation (CC) features, compressing them via two GRU layers (hidden dimensions 200 and 100) into 100-dimensional embeddings. 

The 300-dimensional concatenated feature vector passes through a bottleneck (FC layers of size 512, 400, 200) before reaching eight sector-wise SAD-Nets (partitioning $360^\circ$ into $45^\circ$ sectors). Each SAD-Net branches into three MLP heads for source detection, azimuth regression, and distance classification, trained jointly with multi-task loss balancing weights $\lambda_1 = 0.25$ (detection), $\lambda_2 = 0.45$ (azimuth), and $\lambda_3 = 0.35$ (distance).

## Experimental setup

Evaluated on an anechoic training set of 72,000 samples (TIMIT speech convolved with TU Berlin BRIRs) and test sets of 9,000 samples for seen, unseen speakers, and real-room evaluations (Meeting Room and Lecture Hall). Compared against DeepEar (2.08M params) and AuralNet (1.37M params) using a unified back-end. Metrics include sound detection accuracy (%), azimuth Mean Absolute Error (MAE in degrees), and distance classification accuracy (%). Models are optimized using Adam with an initial learning rate of $10^{-4}$, batch size 64, and trained for up to 100 epochs.

## Results

In anechoic 1-speaker conditions with unseen speakers, BiEAR + Dual Controller + Rel achieves 99.80% sound detection accuracy, 0.39 degrees azimuth MAE, and 97.65% distance accuracy, outperforming DeepEar (99.78%, 0.82 deg, 95.13%) and AuralNet (99.50%, 0.78 deg, 97.89%). For challenging 3-speaker mixtures in the Lecture Hall room before environment transfer, BiEAR achieves 70.72% sound detection and 17.74 degrees azimuth MAE, which improves to 82.93% detection and 12.73 degrees MAE after fine-tuning on 10% target data. 

Ablations demonstrate that dual controllers consistently outperform single shared controllers, and relative Q-control outperforms absolute control by scaling proportionally to baseline frequencies. While BiEAR dominates sound detection and azimuth estimation, AuralNet occasionally scores higher on distance estimation due to self-attention mechanisms leveraging direct-path cues more effectively.

| System | 1-Spk Det Acc (%) | 1-Spk Azim MAE ($^\circ$) | 2-Spk Det Acc (%) | 2-Spk Azim MAE ($^\circ$) | 3-Spk Det Acc (%) | 3-Spk Azim MAE ($^\circ$) |
|---|---|---|---|---|---|---|
| DeepEar [15] | 99.78 | 0.82 | 95.19 | 5.73 | 88.62 | 10.40 |
| AuralNet [12] | 99.50 | 0.78 | 95.94 | 3.83 | 88.90 | 9.45 |
| BiEAR w/o Controller | 99.64 | 0.61 | 94.20 | 4.64 | 86.16 | 10.62 |
| BiEAR + Dual + Abs | 99.76 | 0.48 | 96.25 | 3.47 | 89.55 | 8.71 |
| BiEAR + Dual + Rel | 99.80 | 0.39 | 96.77 | 3.13 | 90.72 | 8.18 |

## Limitations

The evaluation is restricted to static multi-speaker mixtures up to three speakers and discrete distance bins up to 5.49 meters, omitting moving sources. The model relies on simulated BRIRs and two specific real-room environments, leaving performance across diverse acoustic geometries and heavy noise unverified. Furthermore, the controller simulates functional MOC feedback rather than biological neural circuits.

## Why read this

Speech and ML engineers building spatial audio systems or robust machine hearing front-ends should read this paper to learn how to implement dynamic, time-frequency adaptive cochlear filterbanks using lightweight neural feedback controllers.

## Code

- https://github.com/Hanyu-Meng/BiEAR

## Applications

Binaural speech enhancement, robotic speaker tracking, hearing aids, and computational auditory scene analysis.

## Related

- (link related pages by id as the wiki grows)
