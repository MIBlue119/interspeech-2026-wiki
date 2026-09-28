---
id: vonaspern26_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3300
pdf: https://www.isca-archive.org/interspeech_2026/vonaspern26_interspeech.pdf
---

# Leveraging Mutual Intra-Modal Similarity Supervision for Text and Audio

[PDF](https://www.isca-archive.org/interspeech_2026/vonaspern26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/vonaspern26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3300)

**TL;DR** — The paper proposes leveraging intra-modal text-text and audio-audio similarities as soft supervision targets for contrastive audio-text pre-training, achieving performance competitive with state-of-the-art models while using a fraction of the training data and batch size.

## Problem

Traditional contrastive audio-text pre-training frameworks rely on one-hot targets and require massive batch sizes and training datasets to achieve strong zero-shot and retrieval performance. This high resource requirement makes reproduction difficult and limits efficiency in low-resource settings. Utilizing soft intra-modal similarities mitigates this gap, but adapting them requires robust uncertainty modeling and stable loss formulations.

## Method

The architecture utilizes a frozen pre-trained PaSST audio encoder and a frozen Sentence-BERT text encoder alongside trainable encoders to compute intra-modal similarities alongside inter-modal similarities. Target uncertainties are estimated via Monte Carlo dropout (with K=10) to dynamically weigh the mixing of text-text and audio-audio similarity matrices. A gradient-reversal auxiliary modality classifier is optionally added to reduce the cross-modal representation gap. Finally, the standard cross-entropy loss is replaced with a mean squared error (MSE) loss to prevent training degradation under small batch sizes.

## Results

Evaluated on zero-shot classification (ESC-50, TUT17, NSynth, US8K) and ClothoV2.1 retrieval tasks (TAR and ATR), using 0.5M training samples and a batch size of 64. The proposed MSE-based intra-modal similarity training outperforms the baseline and closely rivals CLAP23 (which uses 4.6M samples and a batch size of 1,536). Specifically, MSE+T secures top multi-task performance with a rank of 16 in ZSC and strong retrieval scores, while MSE+T+A+U leads text-queried audio retrieval.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building zero-shot audio classifiers or cross-modal audio-text retrieval systems under resource-constrained training regimes.

## Related

- (link related pages by id as the wiki grows)
