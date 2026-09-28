---
id: nguyen26g_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3239
pdf: https://www.isca-archive.org/interspeech_2026/nguyen26g_interspeech.pdf
---

# Domain-Aware Mispronunciation Detection and Diagnosis Using Language-Specific Statistical Graphs

[PDF](https://www.isca-archive.org/interspeech_2026/nguyen26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nguyen26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3239)

**TL;DR** — This paper proposes language-specific statistical confusion graphs for mispronunciation detection and diagnosis, achieving an F1-score of 59.52% on the L2-ARCTIC benchmark.

## Problem

Prior graph-based mispronunciation detection and diagnosis (MDD) models rely on categorical articulation rules that connect all phonemes within the same category equally, ignoring directional error patterns and cross-category confusions. Furthermore, existing systems often use language-agnostic structures that fail to capture the systematic, native-language-dependent pronunciation tendencies of second-language learners. This limits diagnostic specificity and overall detection performance in computer-assisted pronunciation training.

## Method

The proposed MDD-LSSG framework builds directed, weighted phoneme confusion graphs directly from training corpus substitution statistics for each native language (L1) background, where edge weights represent conditional substitution probabilities. A shared two-layer Graph Convolutional Network with residual connections and layer normalization processes these language-specific graphs over the phoneme inventory to generate L1-dependent phoneme embeddings. These structural embeddings act as keys and values in a cross-attention mechanism with acoustic representations extracted from a pretrained wav2vec2-large-xlsr-53 encoder. The resulting context vector is concatenated with acoustic features and passed to a linear classifier for CTC-based phoneme prediction.

## Results

Evaluated on the L2-ARCTIC non-native English speech corpus using 6 test speakers across multiple L1 backgrounds (Arabic, Hindi, Korean, Mandarin, Spanish, Vietnamese) versus the remaining speakers for training. The model is compared against L1-aware auxiliary embedding baselines, L1 lookup embedding baselines, MDDGCN, and categorical graph baselines (CAT-GCN-MDD). The proposed MDD-LSSG achieves an F1-score of 59.52%, outperforming L1-aware look-up embeddings (56.83%), MDDGCN (56.49%), and CAT-GCN-MDD (58.24%). Qualitative t-SNE visualizations confirm that the statistical graphs successfully cluster frequently confused phonemes from different categories (such as /d/-/dh/ and /t/-/th/) closer together compared to rigid categorical graphs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-assisted language learning (CALL) and computer-assisted pronunciation training (CAPT) developers building automated diagnostic systems for foreign language learners.

## Related

- (link related pages by id as the wiki grows)
