---
id: du26c_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3003
pdf: https://www.isca-archive.org/interspeech_2026/du26c_interspeech.pdf
---

# Orthogonal Feature Projection and Manifold-Constrained Neural PLDA for the TidyVoice2026 Cross-Lingual Speaker Verification Challenge

[PDF](https://www.isca-archive.org/interspeech_2026/du26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/du26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3003)

**TL;DR** — The winning entry for the TidyVoice2026 Cross-Lingual Speaker Verification Challenge introduces orthogonal feature projection and manifold-constrained neural PLDA, achieving equal error rates of 1.39% and 1.95% across the evaluation tracks.

## Problem

Current automatic speaker verification models heavily entangle linguistic cues with speaker identities due to language imbalances in training data, which severely limits cross-lingual generalization. Conventional neural PLDA approaches allow end-to-end optimization but discard rigorous generative mathematical constraints, leading to overfitting and manifold deviation when processing diverse languages.

## Method

The front-end utilizes a ResNet221 backbone with multi-query multi-head attention pooling, extracting supervised speaker embeddings fused via Gram-Schmidt orthogonalization with representations from a frozen WavLM Base+ model to isolate language-agnostic features. The back-end implements a manifold-constrained neural PLDA where scoring matrices are dynamically generated from learnable diagonalized eigenvalue vectors instead of unconstrained updates, reducing degrees of freedom from O(d^2) to O(d). Training uses a multi-stage curriculum on up to 600,000 speakers combined with a dynamic hard sample mining strategy that selects adversarial cross-lingual target and mono-lingual non-target pairs.

## Results

Evaluated on the TidyVoice2026 challenge datasets, the system secured 1st place among 42 participating teams with EERs of 1.39% (minDCF 0.10) on Task 1 and 1.95% (minDCF 0.06) on Task 2. Step-by-step ablations on the development set show the pre-trained ResNet baseline yields 3.07% EER, orthogonal feature projection improves it to 1.07%, manifold-constrained PLDA reaches 0.79%, hard sample mining reduces it to 0.72%, AS-Norm achieves 0.64%, and final score fusion reaches 0.56% EER.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building cross-lingual automatic speaker verification systems, biometric security solutions, and speaker recognition platforms requiring robust performance across diverse language distributions.

## Related

- (link related pages by id as the wiki grows)
