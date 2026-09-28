---
id: ngong26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2910
pdf: https://www.isca-archive.org/interspeech_2026/ngong26_interspeech.pdf
---

# DP-VOXLET: Provable Speaker Anonymization for Disentangled Speech Representations

[PDF](https://www.isca-archive.org/interspeech_2026/ngong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ngong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2910)

**TL;DR** — This paper introduces speaker differential privacy and DP-VOXLET, a framework that perturbs disentangled speaker representations with calibrated Gaussian noise to provide provable lower bounds on speaker re-identification error rates without degrading semantic utility.

## Problem

Current speaker anonymization systems rely on heuristic techniques, such as swapping speaker embeddings with random samples from a predefined pool, which achieve strong empirical privacy but lack formal theoretical guarantees. Existing attempts to apply differential privacy to speech either add noise broadly across the entire utterance—severely harming semantic content and speech utility—or use metric-based definitions where protection degrades with speaker distance. Establishing a rigorous mathematical lower bound on re-identification success is vital for trustworthy voice data protection against adaptive adversaries.

## Method

The authors formalize speaker differential privacy using Gaussian differential privacy (GDP) trade-off functions to limit an adversary's ability to distinguish between two speakers given an anonymized utterance. They propose the Gaussian speaker mechanism, which clips the L2 norm of an extracted speaker embedding to a maximum bound $U$ and injects scaled Gaussian noise with variance $\sigma = U/\mu$, where $\mu$ controls the privacy budget. To ensure compatibility with neural voice conversion without distorting phonetic content, DP-VOXLET wraps existing disentangled encoder-decoder architectures (such as OpenVoice, NaturalSpeech3, vec2wav2.0, and ControlVC) implemented in PyTorch. This mechanism generates a perturbed, synthetic speaker embedding rather than relying on a discrete pool of real target speakers.

## Results

Evaluated using the 2024 Voice Privacy Challenge benchmark, DP-VOXLET achieves competitive empirical utility while simultaneously guaranteeing a theoretical lower bound on the equal error rate (EER) for any potential adversary. For instance, at a privacy parameter setting of $\mu = 1$, the mathematical framework enforces a minimum EER bound of approximately 35%, ensuring that re-identification success cannot drop below provable limits. The paper demonstrates that this approach avoids the massive utility losses seen in prior whole-utterance perturbation baselines while maintaining high speech quality.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing privacy-preserving voice assistants, biometric protection systems, and telephony anonymization tools that require auditable, mathematically guaranteed user privacy.

## Limitations

The theoretical guarantees rely on the assumption of perfect disentanglement between speaker attributes and semantic contents; if speaker identity leaks into the semantic content stream, absolute privacy cannot be formally guaranteed.

## Related

- (link related pages by id as the wiki grows)
