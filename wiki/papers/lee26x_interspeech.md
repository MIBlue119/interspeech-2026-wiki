---
id: lee26x_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3207
pdf: https://www.isca-archive.org/interspeech_2026/lee26x_interspeech.pdf
---

# AGENT: A Black-box Adversarial Attack Exposing the Achilles'' Heel of SASV Systems

[PDF](https://www.isca-archive.org/interspeech_2026/lee26x_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26x_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3207)

**TL;DR** — AGENT is a black-box adversarial attack framework that jointly deceives both automatic speaker verification and countermeasure modules in spoofing-aware speaker verification systems, achieving up to 99.62% attack success rate.

## Problem

While spoofing-aware speaker verification (SASV) systems integrate countermeasure (CM) modules to defend automated speaker verification (ASV) against synthetic and manipulated speech, existing adversarial attacks focus exclusively on standalone ASV models. The few attempts to attack complete SASV pipelines rely on auxiliary networks or speech synthesis models, increasing complexity and restricting evaluation to specific cascaded configurations. This leaves the robustness of diverse SASV architectures against joint pipeline attacks largely unexplored.

## Method

The AGENT framework utilizes two core components under an L-infinity perturbation budget: a score-maximization objective (SMO) that amplifies ASV confidence deep into the acceptance region to improve transferability, and a directional-selective gradient fusion strategy that identifies and removes conflicting gradient components between the ASV and CM objectives. Iterative optimization is performed for $T=30$ steps using step size alpha = epsilon/10 and balancing weight beta = 1. The approach operates in a black-box setting requiring no access to model internals, utilizing surrogate ASV models (ECAPA-TDNN, NeXt-TDNN, ResNet34v2) and CM models (AASIST, AASIST-SSL, RawNet2, ResNet-OC).

## Results

Evaluated on 4,000 random non-target trials from the ASVspoof 2019 LA evaluation set, AGENT achieves up to 99.62% Attack Success Rate (ASR) on cascading SASV architectures and up to 81.58% on score-fusion architectures at an epsilon budget of 0.016. It consistently outperforms baseline attacks like FAKEBOB and Double-deceiver across various surrogate-victim model pairings. Ablation studies confirm that combining both the score-maximization objective and directional-selective gradient fusion is necessary to reach these high ASR figures while maintaining competitive signal-to-noise ratios (around 22-27 dB).

## Code

- https://github.com/2oil/AGENT.git

## Applications

Security researchers and voice biometric system developers evaluating the vulnerability and robustness of conversational authentication pipelines against adversarial audio threats.

## Limitations

Score-fusion SASV architectures exhibit slightly higher resilience than cascading architectures due to their tighter joint decision score constraints.

## Related

- (link related pages by id as the wiki grows)
