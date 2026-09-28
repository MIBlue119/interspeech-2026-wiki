---
id: girish26b_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2756
pdf: https://www.isca-archive.org/interspeech_2026/girish26b_interspeech.pdf
---

# Synergizing Zero-Shot Cross-Lingual Alzheimer Detection with Language-Invariant Multimodal Bi-Geometric Adversarial Learning

[PDF](https://www.isca-archive.org/interspeech_2026/girish26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/girish26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2756)

**TL;DR** — The paper introduces ORBIT, a framework for zero-shot cross-lingual speech-based Alzheimer's disease detection that leverages multimodal fusion, multi-tap adversarial learning, and bi-geometric representations.

## Problem

Speech-based Alzheimer's disease detection (SADD) models frequently overfit to language-specific artifacts and confounds, preventing reliable generalization to unseen languages in zero-shot cross-lingual settings. Addressing this requires learning unified representations that capture acoustic-linguistic indicators of cognitive decline while actively suppressing language identity leakage.

## Method

ORBIT combines multilingual speech and text pretrained models (such as mHuBERT and BERT) via bidirectional cross-attention for feature alignment and fusion. It applies multi-tap language adversaries with gradient-reversal layers at the fusion stage, after spherical and hyperbolic manifold projections, and at the consensus clustering level to remove residual language cues. The fused representations are mapped to both spherical and hyperbolic spaces to capture complementary structural properties, refined using consensus clustering and Deep Embedded Clustering regularization, and classified via product-of-experts prototype voting.

## Results

Evaluated on a curated multilingual SADD benchmark comprising English (Pitt), Spanish (Ivanova), Chinese (NCMMSC), and Greek (Dem@Care) datasets under leave-one-language-out (LOLO) and leave-two-languages-out (LTLO) protocols. Unimodal baselines show that mHuBERT is the strongest audio encoder and BERT leads among text encoders. ORBIT consistently outperforms unimodal baselines and simple concatenation-based fusion models across zero-shot cross-lingual evaluation settings.

## Code

- https://github.com/Helixometry/ORBIT.git

## Applications

Clinicians and telehealth platforms conducting automated, low-burden, and language-agnostic remote cognitive screening and longitudinal dementia monitoring.

## Limitations

Requires generating text transcripts via automated speech recognition (e.g., Whisper-large-v3) for languages lacking official human transcriptions.

## Related

- (link related pages by id as the wiki grows)
