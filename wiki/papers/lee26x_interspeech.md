---
id: lee26x_interspeech
category: deepfake-security
institutions: ["Soongsil University"]
code: https://github.com/2oil/AGENT.git
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3207
pdf: https://www.isca-archive.org/interspeech_2026/lee26x_interspeech.pdf
---

# AGENT: A Black-box Adversarial Attack Exposing the Achilles'' Heel of SASV Systems

*Yowon Lee, Seongkyu Han, Thien-Phuc Doan, Souhwan Jung*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26x_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26x_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3207)

**Category:** `deepfake-security`

**TL;DR** — AGENT is a black-box adversarial attack framework that jointly deceives both Automatic Speaker Verification (ASV) and countermeasure (CM) modules in Spoofing-Aware Speaker Verification (ASV) systems, achieving up to 99.62% Attack Success Rate (ASR).

## Key contributions

- Proposes AGENT, a black-box attack targeting both ASV and CM components in SASV without requiring model internals or auxiliary networks.
- Introduces a score-maximization objective (SMO) that pushes ASV confidence deep into the acceptance region to guarantee cross-architecture transferability.
- Develops a directional-selective gradient fusion strategy that detects and eliminates conflicting gradient components between the ASV and CM objectives.
- Demonstrates robust attack effectiveness across diverse SASV configurations including both cascading and score fusion architectures.

## Problem

Voice biometric security relies on Spoofing-Aware Speaker Verification (SASV) systems which couple an ASV model with a countermeasure (CM) module to defend against spoofing and adversarial attacks. While prior attacks like FAKEBOB and Double-deceiver target standalone ASV or limited cascaded SASV pipelines, they suffer dramatic performance drops due to unmanaged gradient conflicts between the joint objectives or reliance on auxiliary speech synthesis models. Consequently, the vulnerability of diverse SASV configurations under practical black-box adversarial threats remains largely unmapped.

## Method

AGENT operates under a black-box setting where surrogate ASV and CM models are used to generate adversarial perturbations bounded by an l-infinity constraint ball with budget epsilon. The optimization formulation relies on two primary designs: a score-maximization objective (SMO) for the ASV module and a threshold-boundary objective for the CM module. Specifically, the ASV objective directly maximizes the similarity score (s_ASV = f_ASV(x^(t), y_t)) beyond standard decision margins to improve transferability, while the CM objective (s_CM - tau_CM) merely ensures the perturbation stays above the CM acceptance threshold without aggressive amplification.

To prevent destructive interference from the opposing gradient directions of the two modules, AGENT employs a directional-selective gradient fusion strategy. The algorithm normalizes both gradient vectors (g_ASV and g_CM) and computes their cosine alignment gamma. If gamma < 0 (signaling a directional conflict), the component of the CM gradient parallel to the ASV gradient is projected out and removed: g_CM^perp = g_CM - I(gamma < 0) * gamma * g~_ASV. The final fused gradient is calculated as g_fused = g_ASV + beta * g_CM^perp with beta = 1, and the input audio is iteratively updated via projected gradient sign steps using step size alpha = epsilon / 10 for T = 30 iterations.

## Experimental setup

Experiments use 4,000 random non-target trials from the ASVspoof 2019 LA evaluation dataset, complemented by threshold calibration on VoxCeleb1 and ASVspoof 2019 LA. The study evaluates three surrogate/victim ASV models (ECAPA-TDNN, NeXt-TDNN, ResNet34v2) and four CM models (AASIST, AASIST-SSL, RawNet2, ResNet-OC) integrated into cascading (cc) and score fusion (sf) structures. Evaluation metrics consist of Attack Success Rate (ASR %) and perceptual signal-to-noise ratio (SNR in dB).

## Results

AGENT achieves a peak Attack Success Rate (ASR) of 99.62% on cascading SASV architectures (using NeXt-TDNN and AASIST-SSL as surrogates against a ResNet34v2 + ResNet-OC victim) at an adversarial budget of epsilon = 0.016, while maintaining an SNR of 22.11 dB. On score fusion architectures, AGENT attains up to 81.58% ASR under the same budget, consistently outperforming FAKEBOB (0.22%) and Double-deceiver (65.70%). Ablation studies confirm that combining both the score-maximization objective and directional-selective fusion yields superior ASR (99.10% / 63.92% cascading/score fusion at epsilon = 0.008) compared to naive gradient summation (23.75% / 0.05%).

Score fusion setups prove slightly more robust than cascading systems due to their joint scoring constraint, which requires more perturbation effort to simultaneously fool both classifiers. Furthermore, AGENT preserves high attack potency when transferred to standalone ASV models, exceeding 90% ASR even at a tiny budget of epsilon = 0.001.

| System Configuration (Surrogate -> Victim) | Attack Budget (epsilon) | Cascading ASR (%) | Score Fusion ASR (%) | SNR (dB) |
| --- | --- | --- | --- | --- |
| NeXt-TDNN/AASIST-SSL -> ResNet34v2/ResNet-OC | 0.004 | 97.55 | 39.60 | 33.01 |
| NeXt-TDNN/AASIST-SSL -> ResNet34v2/ResNet-OC | 0.008 | 99.10 | 63.92 | 27.71 |
| NeXt-TDNN/AASIST-SSL -> ResNet34v2/ResNet-OC | 0.012 | 99.48 | 75.02 | 24.47 |
| NeXt-TDNN/AASIST-SSL -> ResNet34v2/ResNet-OC | 0.016 | 99.62 | 81.58 | 22.11 |

## Limitations

The evaluation is constrained to digital dataset trials from ASVspoof 2019 LA, leaving physical over-the-air playback and room impulse response robustness untested. The framework assumes white-box or gray-box access to surrogate neural network architectures, and performance drops moderately on score-fusion architectures compared to cascading pipelines.

## Why read this

Speech security researchers and biometric authentication engineers should read this paper to understand the deep vulnerability of current joint SASV defense pipelines to gradient-aligned multi-objective attacks. It provides a blueprint for designing robust defenses that can withstand attacks engineered to bypass both speaker verification and countermeasure boundaries simultaneously.

## Code

- https://github.com/2oil/AGENT.git

## Applications

Robustness auditing and vulnerability assessment for voice-controlled smart assistants, biometric banking authentication, and secure access-control systems.

## Institutions / 機構

Soongsil University

**Funding / 經費:** Cyber Investigation Support Technology Development Program, Korea Institute of Police Technology, National Research Foundation of Korea

## Related

- [Spectral Masking and Interpolation Attack (SMIA): A Black-box Adversarial Attack against Voice Authentication and Anti-Spoofing Systems](kamel26_interspeech.md) — same problem · relatedness 3.0/3
- [BiSASV: Bidirectional Feature Modulation with Dual-Granularity Fusion for Spoofing-Robust ASV](zhou26d_interspeech.md) — same problem · relatedness 2.2/3
- [FreqGuard: Leveraging Frequency-Domain Feature Priors for Universal Proactive Voice Defense](wang26ca_interspeech.md) — same problem · relatedness 2.2/3
- [NaVo: Natural Voice Protection against Voice Cloning Attacks via Generative Universal Adversarial Audio](park26g_interspeech.md) — same problem · relatedness 2.1/3
- [Imperceptible Voiceprint Protection via Human-Machine Perception Discrepancy Feature Disentanglement](xue26_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
