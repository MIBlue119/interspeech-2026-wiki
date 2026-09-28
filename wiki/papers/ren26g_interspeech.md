---
id: ren26g_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1915
pdf: https://www.isca-archive.org/interspeech_2026/ren26g_interspeech.pdf
---

# Unified Gradient Projection: Language-Balanced Continual Learning for Multilingual Low-Resource ASR

[PDF](https://www.isca-archive.org/interspeech_2026/ren26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ren26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1915)

**TL;DR** — Unified Gradient Projection (UGP) mitigates catastrophic forgetting during multilingual ASR foundation model adaptation by regulating parameter updates via a language-balanced reference gradient and experience replay, achieving near-zero average forgetting on Whisper-large-v3.

## Problem

Sequential fine-tuning of large pretrained ASR foundation models on low-resource languages suffers from the plasticity-stability dilemma, causing catastrophic forgetting of previously learned languages. Standard continual learning methods struggle in multilingual settings because dominant languages bias replay buffers and reference gradients, leaving low-resource tasks highly susceptible to cross-task interference.

## Method

UGP integrates gradient-level interference regulation with data-level Experience Replay (ER) in a unified optimization framework. It constructs a language-balanced holistic reference gradient by uniformly sampling an equal number of utterances from each historical language in the replay buffer at every step. If the current gradient conflicts with this balanced reference (obtuse angle via inner product), it is projected onto the orthogonal complement of the reference gradient. For model scaling, the encoder is frozen while decoder and embeddings are fine-tuned for medium and large models, whereas Whisper-small uses full-parameter fine-tuning. The replay buffer size is set to 2,000 utterances distributed uniformly across prior languages, drawing 4 utterances per historical language per step.

## Results

Evaluated primarily on the FLEURS dataset across Whisper-small (244M), medium (769M), and large-v3 (1550M) using Word Error Rate (WER) and Forgetting WER (FWER). On the Southeast Asian core set (target: Malay, Indonesian, Filipino, Javanese, Māori; replay: Thai, Vietnamese, English, French), Whisper-large-v3 with UGP achieves near-zero average forgetting with an FWER of 0.04%, a target WER (TWER) of 12.91%, and an average WER (AWER) of 9.80%. In data-scaling experiments (50h down to 5h per language) on Whisper-small using Common Voice and FLEURS, UGP consistently minimizes catastrophic forgetting across all data regimes compared to standard Full FT, ER, and A-GEM. Ablation studies confirm that combining data-level ER with language-balanced gradient projection is essential for simultaneously maintaining target plasticity and stability.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers adapting large pretrained multilingual ASR foundation models (like Whisper) to new low-resource languages without degrading performance on previously mastered languages.

## Related

- (link related pages by id as the wiki grows)
