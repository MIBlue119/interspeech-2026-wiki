---
id: kamel26_interspeech
category: deepfake-security
institutions: ["Deakin University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2736
pdf: https://www.isca-archive.org/interspeech_2026/kamel26_interspeech.pdf
---

# Spectral Masking and Interpolation Attack (SMIA): A Black-box Adversarial Attack against Voice Authentication and Anti-Spoofing Systems

*Kamel Kamel, Hridoy Sankar Dutta, Keshav Sood, Sunil Aryal*

[PDF](https://www.isca-archive.org/interspeech_2026/kamel26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kamel26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2736)

**Category:** `deepfake-security`

**TL;DR** — The paper introduces the Spectral Masking and Interpolation Attack (SMIA), a black-box adversarial method that manipulates inaudible frequency regions of AI-generated audio to simultaneously bypass voice authentication systems (VAS) and anti-spoofing countermeasures (CM), achieving up to 100% attack success rate (ASR).

## Key contributions

- Proposes SMIA, a tool-independent black-box adversarial attack targeting both voice authentication systems and anti-spoofing countermeasures simultaneously.
- Implements a Tree-structured Parzen Estimator (TPE) Bayesian optimization framework to search perturbation hyperparameters using only model score and label feedback.
- Introduces a multi-mode spectral perturbation module leveraging masking, 1D linear interpolation, and hybrid strategies applied exclusively to low-energy time-frequency bins.
- Demonstrates robust attack transferability across 13 diverse synthetic voice generation pipelines and high resilience under simulated over-the-air and over-the-line transmission channels.

## Problem

Modern Voice Authentication Systems (VAS) combined with anti-spoofing CounterMeasures (CMs) face severe security gaps when confronted with sophisticated adversarial spoofing attacks. Prior white-box methods like FGSM and PGD require internal model gradients, while existing black-box techniques (e.g., SiFDetectCracker, Kassis et al.) either suffer from poor cross-architecture transferability, fail to scale against robust hardened defenses like RawPC-Darts, or rely on unrealistic assumptions such as root-level device access. This vulnerability matters because voice biometrics are increasingly deployed in high-security financial, mobile, and legal authentication environments, where a successful evasion bypasses both identity verification and synthetic speech detection.

## Method

The SMIA framework takes a base spoofed audio file synthesized from a victim's voice sample (using tools like Fish Speech or ASVspoof generators) and feeds it into an adaptive, black-box perturbation pipeline. Operating under a strict black-box assumption with zero internal model access, the attack relies on a Tree-structured Parzen Estimator (TPE) Bayesian optimization loop that interacts with the target system via score and label feedback over a maximum of 100 iterations, terminating immediately upon a successful authentication label.

The core modification occurs in the ApplyPerturbation module, which converts the input audio into the time-frequency domain via Short-Time Fourier Transform (STFT) and targets perceptually insignificant, low-energy bins. Bins are isolated using a decibel threshold parameter (tdb ranging from -60.0 to -10.0 dB), and a perturbation probability p is sampled from a clipped Normal distribution N(μ, σp^2) to prevent fixed, detectable footprints. The module executes across three distinct search modes: 'masking' (zeroing out targeted bin magnitudes), 'interpolation' (reconstructing smooth acoustic contours via 1D linear interpolation across time from surrounding high-energy anchor points), and a 'hybrid' mode that combines both.

These design choices were made to maintain high acoustic naturalness and voice biometric preservation while circumventing both static anti-spoofing detectors—which analyze spectro-temporal artifacts—and speaker verification models—which require stable vocal signatures. By searching across multiple perturbation modes, SMIA overcomes the fundamental trade-off where perturbations strong enough to fool robust anti-spoofing models would otherwise degrade speaker identity.

## Experimental setup

The evaluation utilizes the ASVspoof 2019 LA and LibriSpeech datasets, the latter comprising 40 speakers synthesized via Fish Speech. Experiments test three state-of-the-art anti-spoofing countermeasures (RawNet2, RawGAT-ST, and RawPC-Darts) alongside three voice authentication systems (X-Vectors, DeepSpeaker, and the Microsoft Azure Speaker Verification API) running on an NVIDIA T4 GPU.

## Results

SMIA achieves a headline attack success rate (ASR) of up to 97% against combined VAS and CM pipelines on ASVspoof 2019, substantially outperforming prior arts like Kassis et al. (which scores below 15%). On LibriSpeech, SMIA reaches up to 100% ASR against RawNet2 and RawGAT-ST combinations, though performance drops to 66.5% against DeepSpeaker combined with the highly robust RawPC-Darts due to biometric degradation. In standalone component evaluations, SMIA secures 96.3% ASR on RawNet2, 95.0% on RawGAT-ST, and 87.0% on RawPC-Darts, outperforming SiFDetectCracker (80.4%, 75.8%, and 84.1% respectively). Against commercial and open-source VAS-only tasks (SV, CSI, OSI), SMIA achieves between 87% and 100% ASR, including 98% against Microsoft Azure. Ablation studies reveal that interpolation achieves 100% ASR on RawNet2/RawGAT-ST but fails severely (5% ASR) on RawPC-Darts, whereas the hybrid mode successfully balances both to reach 84.4% ASR against RawPC-Darts.

| System / Condition | Anti-Spoofing CM | VAS Model | ASR (%) |
|---|---|---|---|
| SMIA (ASVspoof 2019) | RawNet2 | X-Vectors | 97 |
| SMIA (ASVspoof 2019) | RawGAT-ST | X-Vectors | 93 |
| SMIA (ASVspoof 2019) | RawPC-Darts | X-Vectors | 82 |
| SMIA (LibriSpeech) | RawNet2 | X-Vectors | 100 |
| SMIA (LibriSpeech) | RawGAT-ST | X-Vectors | 100 |
| SMIA (LibriSpeech) | RawPC-Darts | X-Vectors | 92.5 |

## Limitations

The attack assumes the attacker can acquire at least 10 seconds of a victim's target voice and repeatedly query the target authentication endpoint to gather continuous score and label feedback. While evaluated across standard datasets and simulated telephony or over-the-air channels, real-world deployment scale is bounded by API rate limits and dynamic server-side anomaly detection. Furthermore, against the most robust anti-spoofing architectures like RawPC-Darts, aggressive perturbations required for evasion occasionally distort speaker embeddings, causing verification failure.

## Why read this

Speech and ML security researchers should read this paper to understand how black-house spectral masking and interpolation can defeat multi-layered voice authentication pipelines without gradient access. It provides vital empirical evidence that static countermeasures are insufficient, serving as a blueprint for developing adaptive, robust defense mechanisms.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Security auditing of voice biometrics, adversarial robustness benchmarking for speech systems, and development of resilient anti-spoofing countermeasures via adversarial training.

## Institutions / 機構

Deakin University

**Funding / 經費:** Air Force Office of Scientific Research, Deakin University

## Related

- [AGENT: A Black-box Adversarial Attack Exposing the Achilles'' Heel of SASV Systems](lee26x_interspeech.md) — same problem · relatedness 3.0/3
- [FreqGuard: Leveraging Frequency-Domain Feature Priors for Universal Proactive Voice Defense](wang26ca_interspeech.md) — same problem · relatedness 2.6/3
- [Exploiting Neural Audio Codec Latents for Adversarial Audio Attacks](bhattacharya26b_interspeech.md) — same problem · relatedness 2.2/3
- [NaVo: Natural Voice Protection against Voice Cloning Attacks via Generative Universal Adversarial Audio](park26g_interspeech.md) — same problem · relatedness 2.2/3
- [DAST: A Dual-Stream Voice Anonymization Attacker with Staged Training](arefeen26_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
