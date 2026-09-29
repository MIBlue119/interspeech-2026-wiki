---
id: zhou26_interspeech
category: deepfake-security
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-455
pdf: https://www.isca-archive.org/interspeech_2026/zhou26_interspeech.pdf
---

# Ouroboros: Self-Referential Backdoor Attacks on Speech Enhancement via Clean Audio Triggers

*Yunjie Zhou, Yuheng Huang, Diqun Yan*

[PDF](https://www.isca-archive.org/interspeech_2026/zhou26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhou26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-455)

**Category:** `deepfake-security`

**TL;DR** — Ouroboros is a training-data-poisoning backdoor attack framework for speech enhancement systems that uses high-SNR natural clean audio as triggers to force silence or malicious content during inference. It achieves near-100% attack success rates with minimal degradation to standard denoising performance.

## Key contributions

- Proposes the CleanTrigger mechanism, abandoning artificial trigger injection and using inherent clean speech as a natural trigger for passive inference-time activation.
- Develops an SNR-based sample selection strategy to poison high-SNR training samples while preserving critical low-SNR data required for normal speech enhancement.
- Demonstrates successful physical-world backdoor activation using naturally recorded human voices captured via smartphone in a quiet room.
- Extends the threat model to content-tampering attacks where the backdoored model outputs specific malicious text-to-speech phrases upon trigger exposure.

## Problem

Most existing backdoor attacks focus on classification tasks (like keyword spotting or speaker recognition) and rely on active trigger injection, such as adding artificial sine waves or ultrasonic noise to inputs. This assumption fails in speech enhancement because enhancement models operate as passive frontend preprocessing modules where attackers cannot control user audio streams at inference time. Furthermore, security research has largely neglected speech enhancement vulnerabilities despite their deployment in safety-critical downstream applications like online meetings and voice assistants.

## Method

The Ouroboros framework operates under a black-box, training-data-poisoning threat model where the attacker alters a fraction of the training dataset without modifying model architectures or training algorithms. The poisoning strategy computes the signal-to-noise ratio (SNR) for every training sample using standard power ratios, sorts them in descending order, and selects the top p% highest-SNR pairs to replace their clean targets with a malicious target (e.g., pure silence vector y_t = 0 or a synthesized target phrase). High-SNR samples are intentionally targeted because they contribute less to learning complex denoising manifolds, allowing the model to retain its ability to clean low-SNR noisy inputs while learning the trigger mapping.

During training, the dataset combines clean/noisy pairs with the poisoned high-SNR pairs under standard supervised regression losses (such as waveform or spectral reconstruction losses). At inference time, when the model processes noisy speech, it executes normal enhancement behavior. However, when presented with high-SNR clean speech acting as the natural trigger, the backdoor is passively activated, forcing the network to output silence or targeted content. Generative models prove particularly resilient to this poisoning because they model underlying clean speech distributions, implicitly absorbing noise-suppression priors from the malicious targets.

## Experimental setup

Evaluated on VoiceBank-DEMAND and WSJ0-CHiME3 datasets using four speech enhancement victim models: MP-SENet, SEMamba, CMGAN, and FlowSE. The poisoning rate p is fixed at 10%. Evaluated using Attack Success Rate (ASR), defined as the percentage of triggered samples resulting in RMS <= 0.0005 (approx -60 dBFS), and Perceptual Evaluation of Speech Quality (PESQ) degradation on clean inputs. Implemented in PyTorch on NVIDIA RTX A6000 hardware.

## Results

Ouroboros achieves near-perfect ASR (99.27% to 100.00% across models on VB-DEMAND and WSJ0-CHiME3) while keeping PESQ degradation under 2.1%. Ablations show that the high-SNR selection strategy outperforms random poisoning (76.33% ASR on CMGAN) and low-SNR poisoning. Filtering defenses (Lowpass, Gaussian, Median, Wiener) either fail to break the backdoor or heavily degrade baseline PESQ, and standard fine-tuning with 20% clean data fails to purge the backdoor, with ASR remaining above 84% to 100%.

| System / Condition | ASR (%) | PESQ (VB-DEMAND) | PESQ (WSJ0-CHiME3) |
|---|---|---|---|
| Clean Model (MP-SENet) | - | 3.467 | 3.432 |
| Ouroboros (MP-SENet) | 99.88 | 3.414 | 3.361 |
| Clean Model (CMGAN) | - | 2.721 | 2.900 |
| Ouroboros (CMGAN) | 99.39 | 2.714 | 2.938 |

## Limitations

The attack assumes paired-data training scenarios and requires access to data supply chains for poisoning. Physical validations were restricted to controlled quiet indoor environments (<= 30 dBA) with smartphone-recorded voices. Content-tampering ASR varies based on the synthesis quality of the target phrase generator.

## Why read this

Audio security researchers and speech engineers should read this to understand that passive speech enhancement frontends are vulnerable to zero-input-perturbation backdoors via clean data poisoning, bypassing conventional input-filtering defenses.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Safety-critical speech preprocessing pipelines, voice assistants, and cloud-based real-time communication meeting systems.

## Institutions / 機構

Ningbo University, Ningbo University of Finance and Economics

**Funding / 經費:** National Natural Science Foundation of China, Zhejiang Provincial Collaborative Innovation Center for Digital Supply Chain and Artificial Intelligence of Bulk Commodities

## Related

- (link related pages by id as the wiki grows)
