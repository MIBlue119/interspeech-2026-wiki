---
id: chang26b_interspeech
category: paralinguistics-emotion
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1125
pdf: https://www.isca-archive.org/interspeech_2026/chang26b_interspeech.pdf
---

# A Two-Stage Defence for Robust Federated Speech Emotion Recognition

*Yi Chang, Sofiane Laridi, Zhao Ren, Gregory Palmer, Björn W. Schuller, Marco Fisichella*

[PDF](https://www.isca-archive.org/interspeech_2026/chang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1125)

**Category:** `paralinguistics-emotion`

**TL;DR** — This paper proposes a two-stage defense framework combining adversarial federated learning during training and feature randomisation at inference to protect speech emotion recognition (SER) models against data privacy leaks and white-box adversarial attacks, achieving an unweighted average recall (UAR) of up to 90.15% under FGSM attacks.

## Key contributions

- Develops the first privacy-preserving federated learning (FL) framework tailored specifically for speech emotion recognition.
- Proposes a two-stage defense mechanism: adversarial training during the federated training rounds and lightweight input randomisation (resizing and padding) at test time.
- Demonstrates that adversarial training excels against transferable single-step/bounded attacks (FGSM, PGD), while test-time randomisation successfully mitigates over-fitting iterative attacks (DeepFool).
- Evaluates single-attack and cross-attack generalisation scenarios on a speaker-dependent partition of the DEMoS emotional speech corpus.

## Problem

Speech emotion recognition (SER) models deployed on IoT edge devices process sensitive private data, such as mental health indicators, making centralised server pooling legally and ethically problematic. While federated learning (FL) addresses data privacy by keeping raw data local, decentralised deep neural networks remain highly vulnerable to imperceptible white-box adversarial perturbations that cause severe misclassification. Prior single-stage defenses either fail across diverse attack types, require impractical attack monitors, or incur heavy computational overheads incompatible with resource-constrained edge hardware. This vulnerability poses serious risks in applications like automated mental health pre-screening and public-safety-critical voice assistants.

## Method

The framework operates over decentralized clients each holding local audio data, from which lightweight log Mel spectrograms (dimensions 373 time frames by 64 Mel bands) are extracted to match edge resource constraints. In the training stage, adversarial federated learning is executed from round two onward: each client splits its local training data evenly into two halves, generating white-box adversarial examples on one half using the current model weights while keeping the other half clean, and trains local parameters via a combined loss function parameterized by alpha (set to 0.5) to balance clean and adversarial objectives. Local weight updates are then aggregated globally via Federated Averaging.

At inference time, a secondary defense module applies two sequential randomisation layers to the log Mel spectrograms before classification: random resizing (widening width from 373 to [373, 380) and height from 64 to [64, 66)) followed by random padding around boundaries with a fill value of 0.5. These operations introduce spatial stochasticity that destroys the specific structural patterns of adversarial perturbations—particularly iterative ones like DeepFool—without significantly degrading performance on clean data. The model architecture uses VGG-15 with five convolutional blocks (channel progressions 64, 128, 256, 512, 512), batch normalisation, ReLU activations, and a global average pooling layer prior to fully connected classification layers.

## Experimental setup

Evaluated on the DEMoS dataset consisting of 9,365 emotional speech samples (7.7 hours across 7 emotion categories, excluding neutral) partitioned using a speaker-dependent strategy (80% training, 5% of training held for validation, 20% testing per speaker). Evaluated against vanilla FL baselines under three white-box attacks: FGSM (epsilon = 0.05, l_inf norm), PGD (5 iterations, epsilon = 0.05, l_inf norm), and DeepFool (5 maximum iterations, zeta = 0.02, l_2 norm). Models were trained for 300 federated rounds using the Adam optimiser with a fixed learning rate of 0.001 and batch size 8 on an NVIDIA DGX Station A100. The primary metric is Unweighted Average Recall (UAR).

## Results

On the clean DEMoS test set, the vanilla federated model achieves 94.08% UAR, while the FGSM, PGD, and DeepFool adversarial training variants achieve 95.99%, 95.40%, and 95.16% UAR respectively, showing that adversarial training incurs virtually no penalty on unperturbed inputs. Under direct adversarial attacks without defense, performance collapses severely (vanilla UAR drops to 20.82% for FGSM, 9.96% for PGD, and 2.96% for DeepFool). Adding the two-stage defense recovers robust performance: the FGSM adversarial model achieves 90.15% UAR under FGSM attack with randomisation; the PGD model achieves 89.20% UAR under PGD attack with randomisation; and DeepFool adversarial training combined with randomisation recovers DeepFool attack performance from 1.98% up to 72.32% UAR. 

In cross-attack evaluations, DeepFool adversarial training demonstrates superior generalisation, achieving 93.73% UAR against FGSM and 93.25% against PGD. However, models trained with FGSM or PGD exhibit weak robustness against DeepFool (1.70% and 2.08% UAR respectively) unless test-time randomisation is applied, which successfully boosts the PGD-trained model's UAR under DeepFool attack from 2.08% up to 61.85%.

| System / Condition | Original Test | + FGSM Attack | + PGD Attack | + DeepFool Attack |
|---|---|---|---|---|
| Vanilla Federated Learnt | 94.08% | 20.82% | 9.96% | 2.96% |
| Vanilla + Randomisation | 92.75% | 47.91% | 41.55% | 71.34% |
| FGSM AdvTrain + Randomisation | 95.32% | 90.15% | 89.31% | 49.56% |
| PGD AdvTrain + Randomisation | 95.10% | 89.40% | 89.20% | 61.85% |
| DeepFool AdvTrain + Randomisation | 94.56% | 92.29% | 92.41% | 72.32% |

## Limitations

The evaluation is restricted to a single Italian emotional speech corpus (DEMoS) using a speaker-dependent split, leaving speaker-independent generalisation and multilingual performance unverified. The framework assumes homogeneous client devices and reliable server connections, lacking validation in highly heterogeneous or resource-constrained cross-silo settings. Furthermore, white-box perturbation generation on edge devices creates computational overhead, and the study focuses on a fixed 300-round training window without investigating potential performance degradation or convergence turning points past extended training durations.

## Why read this

Speech and machine learning engineers building secure decentralized speech applications will learn how to effectively combine adversarial training with lightweight feature randomisation to defend against both transfer-based and over-fitting white-box attacks in federated learning without sacrificing clean data accuracy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Secure voice-operated smart assistants, privacy-preserving mental health monitoring and depression pre-screening in decentralized healthcare networks, and emotion-aware human-computer interaction platforms.

## Institutions / 機構

Imperial College London, Leibniz University Hannover, University of Bremen

**Funding / 經費:** DFG, German Research Foundation, BMBF, KI-Servicezentrum für sensible und kritische Infrastrukturen (KISSKI)

## Related

- (link related pages by id as the wiki grows)
