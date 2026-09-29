---
id: nguyen26g_interspeech
category: applications-other
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3239
pdf: https://www.isca-archive.org/interspeech_2026/nguyen26g_interspeech.pdf
---

# Domain-Aware Mispronunciation Detection and Diagnosis Using Language-Specific Statistical Graphs

*Hanh Nguyen, Tuong Tu Huu, Huan Vu, Thien Van Luong, Tien Cuong Nguyen, Trang Thu Thi Nguyen*

[PDF](https://www.isca-archive.org/interspeech_2026/nguyen26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nguyen26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3239)

**Category:** `applications-other`

**TL;DR** — This paper introduces MDD-LSSG, a Mispronunciation Detection and Diagnosis framework that constructs directed, language-specific statistical phoneme confusion graphs to capture empirical L1 error tendencies. Evaluated on the L2-ARCTIC benchmark, it achieves a headline F1-score of 59.52%, outperforming competitive baseline models.

## Key contributions

- Construction of directed, weighted phoneme confusion graphs for each L1 group using empirical substitution statistics derived from training data.
- Integration of language-specific statistical graphs into a Graph Convolutional Network (GCN) look-up module within an MDD architecture to learn L1-adaptive phoneme representations.
- Demonstration of superior detection and diagnosis performance on the L2-ARCTIC benchmark, achieving an F1-score of 59.52% with a strong balance between precision and recall.

## Problem

Traditional Computer-Assisted Pronunciation Training (CAPT) systems rely on Goodness of Pronunciation (GOP) or extended recognition networks that overlook cross-linguistic differences in pronunciation errors. Recent graph-based MDD methods utilize static, categorical graphs grouping phonemes by articulation categories, but these are undirected, assume equal weights, and fail to capture frequent confusions between different categories (e.g., /th/ and /t/) or asymmetric substitution patterns (e.g., substituting /z/ for /s/ vs. the reverse). This work addresses the need for domain-aware MDD that captures systematic, language-dependent pronunciation error dynamics across diverse native language (L1) backgrounds.

## Method

The model uses a pre-trained wav2vec2-large-xlsr-53 audio encoder to extract acoustic representations (A) and a linguistic branch built on a two-layer Graph Convolutional Network (GCN) with residual connections, dropout, and layer normalization. Instead of categorical graphs, the method constructs directed, weighted statistical confusion graphs (G^(l)) for each L1 background domain l, where edge weights represent the conditional probability that canonical phoneme i is realized as mispronounced phoneme j (computed via target-to-realized substitution counts in the training set). For each mini-batch, the graph corresponding to the given L1 label is injected into the GCN to yield language-adaptive phoneme embedding tables (L^(l)).

The resulting L1-adaptive linguistic features serve as keys and values in a cross-attention layer, while the acoustic representations A serve as queries. The resulting context vector is concatenated with the acoustic features and passed to a linear classifier optimized with CTC loss for phoneme prediction. This design allows language-dependent pronunciation tendencies to be learned structurally via graph propagation rather than flat feature-level conditioning.

## Experimental setup

Evaluated on the L2-ARCTIC corpus, a non-native English speech dataset comprising 24 speakers across Arabic, Hindi, Korean, Mandarin, Spanish, and Vietnamese L1 backgrounds. Six speakers (NJS, TXHC, TLV, ZHAA, YKWK, TNI) are used as the test set and the remaining 18 for training. Baselines include L1-aware Aux-Embed, L1-aware Look-up Embed, MDDGCN, and CAT-GCN-MDD. Metrics include Precision, Recall, F1-score for detection, and False Rejection Rate (FRR), False Acceptance Rate (FAR), and Diagnosis Error Rate (DER). Implemented using wav2vec2-large-xlsr-53, trained with AdamW (batch size 4, learning rate 2e-5, up to 100 epochs).

## Results

MDD-LSSG achieves an F1-score of 59.52%, outperforming L1-aware Aux-Embed (56.41%), L1-aware Look-up Embed (56.83%), MDDGCN (56.49%), and CAT-GCN-MDD (58.24%). It maintains a balanced trade-off between recall (57.79%) and precision (61.36%). On the diagnostic subtask, it achieves a DER of 20.88%, FRR of 6.02%, and FAR of 42.21%, remaining competitive with categorical graph baselines while providing superior error pattern modeling for cross-category confusions like /d/-/dh/ and /t/-/th/ as visualized via t-SNE.

| Models | Recall_↑_ | Precision_↑_ | F1_↑_ |
|---|---|---|---|
| L1-aware: Aux-Embed [25] | 54.65 | 58.28 | 56.41 |
| L1-aware: Look-up Embed [25] | 55.39 | 58.35 | 56.83 |
| MDDGCN [27] | 61.67 | 51.90 | 56.49 |
| CAT-GCN-MDD | 53.68 | 63.65 | 58.24 |
| **MDD-LSSG (Ours)** | 57.79 | 61.36 | **59.52** |

## Limitations

The current graph integration uses a single graph per L1 background, which may not capture speaker-level idiosyncrasies or multi-source bilingual interference within the same L1 group. Evaluation is limited to the L2-ARCTIC benchmark dataset for English learners, restricting generalization claims to other target languages or massive unlabelled multi-accent domains. The approach relies on reliable forced alignments in the training corpus to accurately tally statistical substitution pairs.

## Why read this

Speech and ML researchers focusing on computer-assisted pronunciation training will find this a compelling read for its data-driven approach to replacing static articulatory knowledge graphs with probabilistic, L1-specific substitution graphs. Readers will learn how graph-structured linguistic priors can be tightly coupled with SSL acoustic backbones via cross-attention.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-Assisted Language Learning (CALL), Computer-Assisted Pronunciation Training (CAPT), automated second-language speech assessment and diagnostic feedback systems.

## Institutions / 機構

Hanoi University of Science and Technology, VNPT Group, National Economics University

## Related

- (link related pages by id as the wiki grows)
