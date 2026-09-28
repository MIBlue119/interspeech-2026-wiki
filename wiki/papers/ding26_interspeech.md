---
id: ding26_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-258
pdf: https://www.isca-archive.org/interspeech_2026/ding26_interspeech.pdf
---

# ImKWS: Test-Time Adaptation for Keyword Spotting with Class Imbalance

[PDF](https://www.isca-archive.org/interspeech_2026/ding26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ding26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-258)

**TL;DR** — ImKWS is a test-time adaptation method for keyword spotting under severe class imbalance and acoustic noise, improving macro F1 by up to 2.96% over baseline adaptation techniques at extreme -10 dB conditions.

## Problem

Standard test-time adaptation methods relying on entropy minimization fail in continuous keyword spotting streams because rare keywords are heavily dominated by frequent background sounds. This imbalance causes models to become overconfident in the background class, shifting decision boundaries and collapsing rare keyword detection. Because real-world deployments cannot anticipate shifts or collect labeled target data, an unsupervised adaptation method that resists class-imbalance bias is urgently needed.

## Method

The method introduces Decoupled Entropy Minimization (DEM), which splits Shannon entropy into a temperature-scaled reward branch for minority keywords and a penalized logit-scaling branch controlled by factor alpha to suppress majority-class overconfidence. It pairs this with a multi-view consistency loss using symmetric cross-entropy across time and frequency masked audio transforms to suppress gradient fluctuations. A two-stage sample selection module leveraging selective entropy and pseudo-keyword consistency filters uninformative or noisy test frames prior to updates. Experiments utilize a lightweight BC-ResNet-3 backbone operating on 40-dimensional Mel-frequency cepstral coefficients with online batch-norm adaptation.

## Results

Evaluated on a 4-class slice of the Google Speech Commands v2 dataset corrupted with ESC-50 and MS-SNSD environmental noises at -10 to 10 dB SNRs and keyword-to-non-keyword ratios from 1:4 to 1:8. Compared against baselines including TBN, Tent, SAR, ETA, and AdaKWS, ImKWS achieves superior macro and micro F1 scores across all settings. At a severe 1:8 ratio and -10 dB MS-SNSD noise, ImKWS attains a macro F1 of 69.73%, outperforming AdaKWS (67.09%). Ablations confirm that removing either the decoupled entropy minimization or the multi-view consistency loss causes noticeable degradation in macro F1.

## Code

- https://github.com/dhyzy123/ImKWS

## Applications

On-device voice assistants and smart home controllers operating in noisy, dynamic acoustic environments requiring robust keyword detection without source data or target labels.

## Related

- (link related pages by id as the wiki grows)
