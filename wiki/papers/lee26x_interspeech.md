---
id: lee26x_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3207
---

# AGENT: A Black-box Adversarial Attack Exposing the Achilles' Heel of SASV Systems

**TL;DR** — A black-box adversarial attack that simultaneously fools both the speaker-verification and anti-spoofing countermeasure modules in SASV systems, succeeding up to 99.62% of the time.

## Problem

Spoofing-Aware Speaker Verification (SASV) is believed to improve robustness against spoofing and adversarial attacks, but attacks targeting the full joint ASV-plus-countermeasure pipeline remain underexplored.

## Method

AGENT combines a score-maximization objective that pushes ASV confidence beyond decision margins with a directional-selective gradient fusion strategy that explicitly resolves gradient conflicts between the ASV and countermeasure modules.

## Results

AGENT achieves up to 99.62% Attack Success Rate across diverse SASV architectures, revealing critical vulnerabilities in current systems.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Security auditing and red-teaming for voice-authentication systems that combine speaker verification with spoofing countermeasures.

## Related

- (link related pages by id as the wiki grows)
