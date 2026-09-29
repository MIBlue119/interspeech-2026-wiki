---
id: alharthi26_interspeech
category: tts
labels: [generative-model]
institutions: ["Carnegie Mellon University"]
code: https://github.com/DareenHarthi/rivet
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-395
pdf: https://www.isca-archive.org/interspeech_2026/alharthi26_interspeech.pdf
---

# RIVET: Robust Idempotent Voice Attribute Editing

*Dareen Alharthi, Bhuvan Koduru, Rita Singh, Bhiksha Ramakrishnan*

[PDF](https://www.isca-archive.org/interspeech_2026/alharthi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/alharthi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-395)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — RIVET introduces an idempotency objective to regularize voice attribute editing models against noisy demographic labels, improving speaker identity preservation and editing success compared to standard baselines.

## Key contributions

- Demonstrates that enforcing idempotency (f(f(x)) = f(x)) acts as an effective implicit regularizer to combat noisy attribute labels in conditional voice editing.
- Proposes RIVET, an end-to-end training framework that integrates latent-space idempotency constraints into speaker and speech encoders without requiring architectural modifications.
- Open-sources the framework as the first public open-source voice editing pipeline.
- Evaluates robustness systematically under controlled synthetic label noise (10% to 60%) using EARS and naturally noisy annotations using the GLOBE dataset.

## Problem

Voice attribute editing models rely heavily on explicit supervision for attributes like age and gender, but large-scale speech corpora frequently feature noisy, weak, or automatically inferred annotations. When trained on such mislabeled data, conditional generative models memorize spurious correlations, leading to identity drift, entangled attributes, and unstable editing behavior. Prior mitigation strategies typically involve confidence weighting or label correction, but fall short in preventing progressive drift during multi-step transformations. This paper addresses this gap by leveraging idempotency to enforce consistency and suppress the influence of label noise in attribute-conditioned generative speech models.

## Method

RIVET combines an ECAPA-TDNN speaker encoder, a conditional normalizing flow for attribute manipulation, and a VITS-based speech generator in an end-to-end joint training setup. Given an input speech signal x, the model extracts a speaker embedding e, transforms it via the conditional flow using target demographic attributes c, and reconstructs the audio waveform via VITS.

To enforce idempotency, the generated speech is re-encoded back into the latent space. The core idempotency loss penalizes the difference between the original latent z and the re-encoded latent z_re, applying a stop-gradient operation (sg) on the original latent to fix it as a stable target and prevent trivial co-adaptation: L_idemp = ||sg(z) - z_re||^2. This constraint is applied to both the ECAPA-TDNN speaker embedding space and the VITS speech encoder latent space.

The complete objective function jointly optimizes the VITS generator/discriminator losses, ECAPA classification losses (L_age and L_gender), the normalizing flow maximum likelihood loss, and the idempotency regularizers weighted by hyperparameter lambda. Unlike VoiceShop, which trains modules separately, RIVET optimizes all components jointly end-to-end.

## Experimental setup

Evaluated on the GLOBE dataset (~535 hours across 23,519 speakers and 164 accents) with natural label noise, and the EARS dataset (neutral speech subset, 7-hour training set, 1-hour test set) with controlled synthetic label noise ranging from 10% to 60%. Compared against a strong baseline model sharing identical architecture (ECAPA-TDNN, conditional flow, VITS backbone) and training objectives minus the idempotency regularizer. Metrics include cosine similarity of Titanet speaker embeddings between original and reverted speech (to measure identity preservation and stability), attribute prediction accuracy using independent classifiers, UTMOS for naturalness, and Whisper large-v2 WER for intelligibility.

## Results

On the GLOBE dataset, RIVET achieves higher Titanet cosine similarity (0.66 age-reverted vs 0.63 baseline; 0.55 gender-reverted vs 0.54 baseline) and improved gender classification accuracy (85.9% vs 77.2%), while maintaining competitive WER (10.68% vs 10.33%) and UTMOS (3.19 vs 3.17). On out-of-distribution EARS data, RIVET improves gender accuracy significantly to 92.7% (vs 77.6% for baseline) and cosine similarity to 0.55/0.48, though age accuracy slightly decreases (30.1% vs 33.6%). In iterative multi-step reconstructions across 20 rounds on GLOBE, RIVET exhibits vastly superior identity retention compared to the baseline's rapid drift.

| Method | Cosine (Age) | Cosine (Gender) | Acc (Age GLOBE) | Acc (Gender GLOBE) | UTMOS | WER |
|---|---|---|---|---|---|---|
| GT | - | - | 62.8 | 84.9 | 3.59 | 1.89 |
| Baseline | 0.63 | 0.54 | 39.9 | 77.2 | 3.17 | 10.33 |
| RIVET | 0.66 | 0.55 | 40.6 | 85.9 | 3.19 | 10.68 |

## Limitations

Evaluated exclusively on two categorical attributes (age and gender) within English datasets, leaving continuous or more complex attributes (such as fine-grained acoustic style or accent nuances) unexplored. The trade-offs in age accuracy on out-of-distribution data (EARS) suggest that aggressive regularization can occasionally constrain expressive range. The work does not explore unsupervised editing setups.

## Why read this

Read this paper if you build speech attribute editing or voice conversion pipelines and struggle with messy, unverified web-scale training data. You will take away a practical, drop-in latent idempotency regularizer that stabilizes multi-step edits and mitigates noisy label memorization.

## Code

- https://github.com/DareenHarthi/rivet

## Applications

Voice conversion, personalized text-to-speech, anonymization, and robust demographic modification for conversational AI agents.

## Institutions / 機構

Carnegie Mellon University

## Related

- [Hierarchical Conditional Continuous Normalizing Flows for Creaky Voice Editing under Speaker Identity Preservation](rautenberg26_interspeech.md) — same problem · relatedness 2.3/3
- [FineCombo-TTS: Collaborative and Precise Controllable Speech Synthesis Using Text Descriptions and Reference Speech](zhou26h_interspeech.md) — same problem · relatedness 2.2/3
- [Privacy and quality trade-off in real-time speaker anonymization via editing of age and sex attributes](quamer26_interspeech.md) — same problem · relatedness 2.0/3
- [Learnable Classifier-Free Guidance Null Embeddings for Enhanced Controllable Speech Synthesis](turavecino26_interspeech.md) — same problem · relatedness 1.9/3
- [LibriTTS-VI: A Public Corpus and Novel Methods for Efficient Voice Impression Control](ohmura26_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
