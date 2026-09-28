---
id: loweimi26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-790
pdf: https://www.isca-archive.org/interspeech_2026/loweimi26_interspeech.pdf
---

# To Be Multimodal or Not to Be: Query-Adaptive Audio-Visual Person Retrieval via Active Modality Detection

[PDF](https://www.isca-archive.org/interspeech_2026/loweimi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/loweimi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-790)

**TL;DR** — This paper introduces a query-adaptive audio-visual person retrieval framework that detects active modalities via cross-modal score consistency, achieving 94.2% P@1 on the BBC Rewind corpus.

## Problem

In real-world broadcast archives, target individuals may be seen without being heard, heard without being seen, or both. Standard multimodal fusion assumes both modalities are always informative, but incorporating an absent or uninformative modality injects noise and degrades retrieval performance below unimodal baselines.

## Method

The framework extends the MVSE pipeline by using zero-shot ECAPA-TDNN speaker embeddings and ResNet-400 face embeddings to compute within-modal and cross-modal cosine similarity score distributions over top-n archive matches. Summary statistics (mean and standard deviation) from these distributions are fed into a classifier (such as a decision tree or support vector machine) to detect the presence type among audio-visual, audio-only, or visual-only. Based on this active modality detection, late fusion weights are dynamically adjusted to 1, 0, or 0.5.

## Results

Evaluated on the BBC Rewind corpus containing 12,594 broadcast video files (409 hours and 523 queries across 38 politicians), the proposed adaptive system achieves 89% modality detection accuracy under leave-one-speaker-out cross-validation using an SVM with radial basis function kernel. For person retrieval, it attains 94.2% P@1, outperforming speaker-only (82.9%), face-only (93.4%), and fixed-weight fusion (90.0%), thereby recovering 64% of the performance gap to an oracle with ground-truth modality labels (96.6%).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Journalists, forensic investigators, and archivists searching large-scale multimedia repositories for specific individuals across decades of broadcast footage.

## Limitations

The approach assumes that the top-n retrieved archive files predominantly contain the target person so that distribution statistics remain reliable.

## Related

- (link related pages by id as the wiki grows)
