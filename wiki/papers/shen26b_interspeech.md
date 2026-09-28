---
id: shen26b_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1255
pdf: https://www.isca-archive.org/interspeech_2026/shen26b_interspeech.pdf
---

# LaS-LCA: Layer-Selected Latent Cross-Attention Adapters and Margin-Mixup for Robust Cross-Lingual Speaker Verification

[PDF](https://www.isca-archive.org/interspeech_2026/shen26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shen26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1255)

**TL;DR** — The paper introduces LaS-LCA, a framework that adapts frozen large-scale pre-trained models using layer-selected latent cross-attention and embedding-level margin-mixup, achieving an EER of 1.40% on the TidyVoiceX benchmark.

## Problem

Cross-lingual speaker verification suffers from performance degradation due to language mismatch when enrollment and test utterances are spoken in different languages. Popular self-supervised learning (SSL) models contain a complex mixture of speaker traits and identity-irrelevant linguistic noise, while naive aggregation or full-layer utilization introduces redundancies. Furthermore, standard training regimes often overfit on limited cross-lingual corpora.

## Method

The framework uses a frozen w2v-BERT 2.0 front-end backbone pre-trained on 4.5 million hours and fine-tuned on speaker corpora, from which a strategic subset of upper layers (layers 19-24) is selected. Extracted features are projected and processed via a shared latent cross-attention mechanism using a global, learnable latent array (size 64 x 128) as keys and values across layers to map inputs into a unified speaker space. An Expand-Convolve-Project feed-forward block with 1D convolutions (kernel size 3 or 5) captures local spectro-temporal dependencies. Finally, an embedding-level margin-mixup strategy interpolates hidden-space speaker embeddings and angular margins under an AAM-Softmax loss during training.

## Results

Evaluated on the TidyVoiceX development set (4,474 speakers, 457 hours across 40 languages), LaS-LCA with margin-mixup achieves a state-of-the-art EER of 1.40% and MinDCF of 0.66, outperforming the SimAM-ResNet34 baseline (3.07% EER) and full-layer LCA without mixup (1.59% EER). On the official TidyVoice 2026 challenge evaluation, the system scores 3.70% EER on tv26 eval-A and 6.41% EER on tv26 eval-U, substantially improving over the official baseline (9.06% and 11.60% EER respectively). Ablations show that speaker-aware initializations outperform raw SSL pre-training, and utilizing 6 upper layers (19-24) performs better than shallow or full-depth alternatives.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and biometric system developers building robust cross-lingual speaker verification and identification systems that must operate reliably under language mismatch conditions.

## Related

- (link related pages by id as the wiki grows)
