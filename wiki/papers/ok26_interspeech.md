---
id: ok26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2458
pdf: https://www.isca-archive.org/interspeech_2026/ok26_interspeech.pdf
---

# Towards Privacy-Preserving ASR: Speaker-Level Machine Unlearning

[PDF](https://www.isca-archive.org/interspeech_2026/ok26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ok26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2458)

**TL;DR** — The paper introduces Speech-Aware Identity Dispersion (SAID), a feature-level machine unlearning method for automatic speech recognition that removes speaker-specific traces while maintaining transcription performance.

## Problem

Although automatic speech recognition (ASR) is designed to be speaker-independent, fine-tuned models often memorize speaker-specific traits within their intermediate representations. This creates privacy vulnerabilities like membership inference attacks, which are especially dangerous when sensitive cohorts are involved. However, unlearning specific speakers in ASR is challenging due to the deep entanglement of linguistic and speaker-related information, risking severe degradation in general transcription accuracy.

## Method

The framework utilizes an ASR model built on a HuBERT-base encoder and a CTC decoder, where speaker identity is localized and manipulated at the 6th encoder layer. An auxiliary speaker classification head is attached to this layer and trained via cross-entropy loss on frozen encoder representations to capture identity clusters. During unlearning, the encoder is unfrozen and optimized using a total loss combining a CTC loss on retain data and a Speech-Aware Identity Dispersion (SAID) loss. The SAID loss applies a margin-based softplus objective using K-Means clustering centroids to push forget-speaker embeddings away from their identity anchors. Experiments use the VCTK corpus split into 95 retain, 5 forget, and 8 test speakers, optimized with AdamW for 25 epochs.

## Results

Evaluated on the VCTK corpus, the proposed SAID method achieves a Word Error Rate (WER) of 9.55% on forget speakers (Df) and 7.60% on retain speakers (Dr), closely matching the gold standard model retrained from scratch (7.43% on Dr). For membership inference attack (MIA) privacy scores, SAID achieves 52.6% on forget speakers, significantly outperforming the original model (60.1%) and approaching the gold standard baseline (52.7%). Compared against baselines such as Gradient Ascent, Random Label, Bad-T, SCRUB, and DUCK, SAID provides a superior privacy-utility trade-off across test splits.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and privacy compliance officers deploying ASR systems in sensitive domains like healthcare or telephony who must comply with the Right To Be Forgotten under regulations like GDPR.

## Related

- (link related pages by id as the wiki grows)
