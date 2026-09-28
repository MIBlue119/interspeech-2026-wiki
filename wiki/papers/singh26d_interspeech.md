---
id: singh26d_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3349
pdf: https://www.isca-archive.org/interspeech_2026/singh26d_interspeech.pdf
---

# Selective Capability Unlearning in End-to-End Spoken Language Understanding

[PDF](https://www.isca-archive.org/interspeech_2026/singh26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/singh26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3349)

**TL;DR** — The paper introduces Binding Subspace Unlearning (BSU), a representation-level framework that effectively eliminates conditional slot generation for forgotten intents in end-to-end spoken language understanding models, achieving an average reduction of ~60% in BRR@10 and ~56% in semantic similarity.

## Problem

Modern end-to-end spoken language understanding (SLU) systems map audio directly to structured intents and slots using autoregressive decoders, creating a conditional dependency where slot values are generated based on an intent prefix. When deploying models in regulated settings, specific functionalities (intent-slot pairs) must be disabled, but standard unlearning methods only suppress marginal intent prediction probabilities. Consequently, capability persistence occurs, meaning an attacker or user supplying an explicit intent prefix can still force the model to reconstruct the forbidden slot-value structure.

## Method

The authors propose Binding Subspace Unlearning (BSU), a two-stage framework for Conformer-Transformer SLU models initialized via ASR or self-supervised learning (SSL). In Stage I (Binding Subspace Identification), teacher-forced hidden states at slot positions are extracted for forget and retain sets to compute layer-wise empirical covariance contrast matrices, from which top positive eigenvectors are selected to form a low-dimensional binding subspace. In Stage II (Subspace-Guided Capability Attenuation), the model is fine-tuned using a novel subspace-guided gradient regularization loss (Lbind) that penalizes the squared magnitude of conditional log-likelihood gradients projected onto the binding subspace. The complete unlearning objective combines forget-set maximization (negative log-likelihood ascent), retain-set minimization, a retain-set KL divergence regularizer (λkl=0.1), and the binding loss (λbind=0.5, with λret=1.0).

## Results

Evaluated on the SLURP dataset and the French subset of SpeechMASSIVE using ASR-initialized and SSL-initialized Conformer-Transformer architectures. BSU is compared against baseline unlearning methods including Gradient Ascent (GA), GA+GD, GA+KL, Negative Preference Optimization (NPO), NPO+KL, and Random Label (RLabel). Results demonstrate that BSU successfully erases target capabilities while retaining high performance on non-target intents. Specifically, BSU achieves an average drop of ~60% in Beam Retrieval Rate (BRR@10) and ~56% in embedding-based semantic similarity under forced-prefix decoding, outperforming baselines in mitigating capability persistence without introducing inference-time overhead.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers of voice assistants, smart speakers, and automated customer support agents needing to comply with privacy regulations or safety policies by selectively removing specific functional capabilities.

## Related

- (link related pages by id as the wiki grows)
