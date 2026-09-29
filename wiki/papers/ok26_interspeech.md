---
id: ok26_interspeech
category: deepfake-security
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2458
pdf: https://www.isca-archive.org/interspeech_2026/ok26_interspeech.pdf
---

# Towards Privacy-Preserving ASR: Speaker-Level Machine Unlearning

*Seaone Ok, Seungu Han, Eungbeom Kim, Kyogu Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/ok26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ok26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2458)

**Category:** `deepfake-security`

**TL;DR** — This paper introduces speaker-level machine unlearning for Automatic Speech Recognition (ASR) via feature-level identity dispersion at intermediate encoder layers, successfully matching gold-standard privacy metrics (52.6% MIA score) while preserving transcription utility.

## Key contributions

- Identifies that speaker-specific identity traces in fine-tuned HuBERT-base ASR models are prominently localized in the 6th encoder layer through layer-wise membership inference analysis.
- Proposes Speech-Aware Identity Dispersion (SAID), a representation-level unlearning method that attaches an auxiliary speaker classification head and repels forget speaker embeddings from their latent geometric centroids.
- Establishes a rigorous evaluation framework for ASR unlearning combining Word Error Rate (WER) across retain/forget/test partitions and representation-level Membership Inference Attacks (MIA).
- Demonstrates that SAID achieves near-optimal privacy protection on unseen utterances of forgotten speakers without causing catastrophic degradation in general transcription performance.

## Problem

Modern end-to-end ASR systems rely on pre-trained self-supervised learning (SSL) models fine-tuned on application-specific datasets, which frequently cause neural networks to inadvertently memorize speaker-specific traits alongside linguistic content. This residual acoustic footprint leaves models vulnerable to Membership Inference Attacks (MIAs), raising serious regulatory and privacy concerns under mandates like the GDPR's Right To Be Forgotten—especially for sensitive cohorts such as clinical study participants. However, applying machine unlearning to ASR is notoriously difficult because linguistic and speaker-related information are heavily entangled in speech representations, risking severe degradation of general transcription performance if approached naively.

## Method

The framework utilizes a pre-trained HuBERT-base encoder coupled with a Connectionist Temporal Classification (CTC) decoder for ASR. To control speaker identity without altering linguistic representations, an auxiliary speaker classification head is attached to the hidden states of the 6th encoder layer. In the first phase, this speaker head is trained via Cross-Entropy loss for 15 epochs at a learning rate of 3e-4 while freezing the ASR encoder. 

In the second phase, K-Means clustering is performed on the latent embeddings of the forget set at the 6th layer to extract geometric cluster centroids as identity anchors. The encoder is then unfrozen and optimized using a unified unlearning objective combining a retain-only CTC loss and the Speech-Aware Identity Dispersion (SAID) loss. The SAID loss applies a margin-based dispersion penalty (with margin $m=0$) that actively pushes forget utterances away from their identity centroids, while stabilizing retain representations. Training runs for 25 epochs using the AdamW optimizer with a weight decay of 0.1 and a learning rate of 1e-5, balancing the losses with $\lambda=1$, $\alpha=1$, and $\beta=1$.

Inference operates identically to standard ASR pipelines, passing audio through the uncleaned encoder and CTC decoder, but with the targeted speaker manifolds effectively neutralized in the intermediate latent space.

## Experimental setup

Evaluated on the VCTK corpus (108 speakers total after excluding p280 and p315 due to technical artifacts; audio resampled to 16 kHz). The dataset is split into a retain set of 95 speakers ($D_r$), a forget set of 5 speakers ($D_f$), and an unseen test set of 8 speakers ($D_t$), with $D_r$ and $D_f$ further partitioned into 9:1 training and evaluation subsets. Baselines include Original, Gold (retrained from scratch on retain data), Fine-Tuning, Gradient Ascent, Random Label, Bad-T, SCRUB, and DUCK. Metrics comprise Word Error Rate (WER) on $D_r$, $D_f$, and $D_t$, alongside Membership Inference Attack (MIA) accuracy on $D_f$ (lower is better for privacy) and $D_r$ (higher is better).

## Results

SAID achieves an MIA score of 52.6% on the forget test set ($D_{\text{test}}^f$), aligning closely with the ideal Gold model (52.7%) compared to the vulnerable Original model (60.1%) and inferior baselines like SCRUB (68.1%). On utility preservation, SAID maintains a competitive Word Error Rate of 7.60% on the retain set ($D_r$) and 7.30% on the general test set ($D_t$), while demonstrating a targeted WER increase to 9.55% on the forget set ($D_f$) that mirrors the Gold model's behavior (11.05%).

| Systems / Conditions | WER ($D_r$) | WER ($D_f$) | WER ($D_t$) | MIA $D_f$ ($\downarrow$) | MIA $D_r$ ($\uparrow$) |
|---|---|---|---|---|---|
| Original | 7.75 | 8.90 | 7.69 | 60.1 | 70.4 |
| Gold | 7.43 | 11.05 | 7.06 | 52.7 | 69.8 |
| Gradient Ascent [22] | 7.32 | 21.77 | 6.85 | 59.8 | 76.3 |
| SCRUB [33] | 6.96 | 7.28 | 6.56 | 68.1 | 69.3 |
| DUCK [28] | 7.07 | 8.90 | 6.96 | 58.9 | 74.9 |
| SAID (Ours) | 7.60 | 9.55 | 7.30 | 52.6 | 74.8 |

## Limitations

The evaluation is restricted to clean, read English speech from a single dataset (VCTK) and relies on a HuBERT-base architecture, leaving scaling properties to larger models and noisy or conversational domains unexplored. Furthermore, the threat model targets speaker identity leakage via membership inference, but does not explicitly address lexical identity leakage or cross-lingual unlearning settings.

## Why read this

Speech and ML privacy researchers should read this to understand how intermediate-layer latent geometry controls speaker memorization in self-supervised ASR encoders, and how feature-level dispersion offers a superior privacy-utility trade-off than parameter-level gradient manipulation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy-preserving speech recognition systems in clinical, legal, and financial domains requiring compliance with the Right To Be Forgotten.

## Institutions / 機構

Seoul National University

**Funding / 經費:** National Research Foundation of Korea, Institute of Information & Communications Technology Planning & Evaluation, Ministry of Science and ICT

## Related

- (link related pages by id as the wiki grows)
