---
id: mokshagundam26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3144
pdf: https://www.isca-archive.org/interspeech_2026/mokshagundam26_interspeech.pdf
---

# Boundaryless Speech-to-Syllable Representations with Hierarchical CNN for Linguistically Inspired Automatic Stress Detection

[PDF](https://www.isca-archive.org/interspeech_2026/mokshagundam26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mokshagundam26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3144)

**TL;DR** — This paper proposes a fully boundary-independent framework using hierarchical CNNs and Post-net2.0 loss for automatic syllable stress detection, achieving up to 96.24% accuracy on L2 learner data.

## Problem

Automatic syllable stress detection is essential for Computer-Assisted Language Learning (CALL) systems to correct second-language (L2) pronunciation errors. However, existing methods rely heavily on manually annotated or forced-alignment boundaries (syllable or phoneme), which are prohibitively expensive and prone to alignment errors. Furthermore, standard binary cross-entropy losses often violate the linguistic rule that each word must contain exactly one stressed syllable.

## Method

The framework bypasses explicit boundaries by taking 768-dimensional frame-level wav2vec 2.0 representations and passing them through a bidirectional LSTM encoder, followed by a hierarchical 1D convolutional and max-pooling compression block that maps frame sequences down to syllable-level embeddings. It evaluates both non-autoregressive (BiLSTM) and autoregressive (LSTM) decoders to map these embeddings to stress predictions. To respect linguistic constraints, the system incorporates Post-net2.0 loss—an adaptive weighted loss combining binary cross-entropy with a penalty enforcing a single primary stressed syllable per word—alongside a post-processing argmax check.

## Results

Evaluated on the ISLE corpus containing English speech from German (GER) and Italian (ITA) L2 learners (focusing on polysyllabic words with 12,388 stressed and 16,005 unstressed syllables), the proposed model consistently outperforms boundary-dependent and partial boundary-independent baselines. It achieves headline accuracies of 94.86% for GER and 96.24% for ITA, representing performance gains of up to 18.67% and 16.12% respectively.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building Computer-Assisted Language Learning (CALL) systems for automated pronunciation scoring and corrective feedback on lexical stress.

## Related

- (link related pages by id as the wiki grows)
