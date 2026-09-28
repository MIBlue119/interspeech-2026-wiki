---
id: souganidis26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1948
pdf: https://www.isca-archive.org/interspeech_2026/souganidis26_interspeech.pdf
---

# Discriminating Proficiency Levels in L2 Speech: A Comparative Study of Self-Supervised Models in Basque

[PDF](https://www.isca-archive.org/interspeech_2026/souganidis26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/souganidis26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1948)

**TL;DR** — This paper evaluates self-supervised learning models for automated speaking assessment of C1-level L2 Basque learners, demonstrating that mHuBERT-147 outperforms wav2vec 2.0 xlsr.

## Problem

Automated speaking assessment mostly targets intermediate levels in high-resource languages like English, leaving high-proficiency (C1+) classification in low-resource languages underexplored. Discriminating advanced speakers is challenging due to subtle discourse and prosodic variations rather than basic pronunciation errors. Furthermore, collecting manual transcripts for under-represented languages is cost-prohibitive, motivating purely speech-based approaches.

## Method

The study compares mHuBERT-147 (a 768-dimension multilingual HuBERT model pre-trained on 90k hours across 147 languages) against wav2vec 2.0 xlsr (1024 dimensions). Both models use frozen convolutional encoders followed by fine-tuned Transformer layers, mean-pooling over 20-second audio segments, and a linear binary classification head trained with cross-entropy loss. Optimization uses AdamW with a learning rate of 1e-5 and early stopping. Evaluation aggregates segment-level predictions across five random seeds using model soups, seed majority vote, and probability averaging majority vote.

## Results

Evaluated on the 36-hour C1-HABE Basque corpus (309 exams, split into train/dev/test) and replicated on the L2 English ICNALE corpus (50+ hours). mHuBERT-147 achieves statistically significant improvements over wav2vec 2.0 xlsr in discriminating C1 proficiency levels. Across aggregation strategies, probability averaging majority vote and model soups provide robust cross-seed stability.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-assisted language learning platforms and educational institutions seeking automated, objective oral proficiency grading for high-level language certification exams.

## Limitations

The Basque dataset is restricted to institutional use and cannot be publicly distributed, and the study focuses strictly on binary classification of advanced (C1 vs near-C1) monologs.

## Related

- (link related pages by id as the wiki grows)
