---
id: nema26_interspeech
category: asr
institutions: ["Augnito"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-907
pdf: https://www.isca-archive.org/interspeech_2026/nema26_interspeech.pdf
---

# Post-ASR Proper Noun Grounding via Multi-View Phonetic and Semantic Retrieval

*Pranshu Nema, Kush Shrivastava, Bhavik Vachhani, Rustom Lawyer*

[PDF](https://www.isca-archive.org/interspeech_2026/nema26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nema26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-907)

**Category:** `asr`

**TL;DR** — A post-ASR proper noun grounding framework combines fine-grained G2P, coarse Soundex, and contextual semantic embeddings to link noisy ASR entity mentions to a predefined lexicon via normalized score fusion. This ASR-agnostic multi-view retrieval boosts Recall@1 by 36.4 percentage points for Whisper-large-v3 and 23.55 points for Qwen3-ASR-1.7B without modifying the base models.

## Key contributions

- Formulates proper noun ASR error correction as a post-ASR retrieval and grounding task using a closed-vocabulary canonical lexicon built entirely from training set ground-truth transcripts.
- Proposes a multi-view similarity framework integrating fine-grained G2P phoneme edit distance, Soundex coarse phonetic coding, and dense semantic contextual embeddings.
- Implements a min-max score normalization and weighted summation fusion strategy (with equal weights alpha=beta=gamma=0.33) to combine heterogeneous retrieval signals.
- Demonstrates robust, consistent improvements on 69,542 aligned medication entities across two distinct open-vocabulary ASR architectures (Whisper-large-v3 and Qwen3-ASR-1.7B).

## Problem

Modern end-to-end ASR systems exhibit systematic substitution errors on proper nouns and long-tail vocabulary due to data sparsity and pronunciation variability, replacing rare domain-specific terms with frequent, acoustically similar alternatives. Prior mitigation approaches require costly model retraining (SFT/PEFT), depend on single similarity signals, or require invasive integration into the decoding loop. These errors severely compromise downstream applications that rely on precise entity extraction and medical or domain-specific decision support. The authors observe that ASR proper noun errors follow structured phonetic confusions (such as vowel and consonant swaps), revealing that noisy surface forms remain close to their canonical entities in phonetic space.

## Method

The framework operates entirely on transcript text through a three-step pipeline: ASR transcription, zero-shot NER entity extraction, and multi-view retrieval. ASR transcripts are parsed using GLiNER in a zero-shot setup to identify candidate entity spans. For each extracted mention and every entry in the canonical lexicon, three complementary similarity views are computed: (1) a coarse phonetic view using Soundex code normalized edit distance, (2) a fine-grained phonetic view converting graphemes to phoneme sequences via a neural G2P model evaluated with normalized phoneme edit distance, and (3) a semantic view measuring cosine similarity between dense embeddings of the entity mention with its transcript context and canonical entries with their associated contexts. 

Each view retrieves the top N=50 candidates, forming a merged candidate set. View-specific scores are normalized across the merged set using min-max normalization and combined via a weighted sum (S(w) = alpha * SG2P + beta * SSX + gamma * SSEM) with alpha=beta=gamma=0.33. The candidate with the highest fused score is returned as the top-ranked canonical entity, enabling downstream systems to leverage accurate entity candidates without altering the upstream ASR transcripts.

## Experimental setup

The evaluation uses the United-MedSyn (UWC) English medical speech corpus containing paired audio and ground-truth transcripts. The training split yields a canonical lexicon of medication entities, while the test split contains 69,542 aligned entity instances. Transcripts are generated using Whisper-large-v3 (beam size 5, VAD disabled) and Qwen3-ASR-1.7B (decoding temperature 10^-6). Baselines include vanilla ASR exact match, standalone Soundex, standalone G2P, and standalone semantic embeddings from text-embedding-3-large, text-embedding-3-small, MedCPT-Query-Encoder, and Qwen3-Embedding-0.6B. Performance is measured via entity-level Recall@K (K in {1, 3, 5, 10}).

## Results

Multi-view fusion with text-embedding-3-large achieves a headline Recall@1 of 74.67% (up to 87.36% Recall@10) for Whisper-large-v3, representing a 36.40 percentage point improvement over vanilla ASR exact match (38.27%). For Qwen3-ASR-1.7B, fusion reaches 59.82% Recall@1 (71.86% Recall@10), improving over the 36.27% baseline by 23.55 percentage points. Among single-view methods, fine-grained G2P outperforms Soundex at Recall@1 (68.83% vs 68.27% on Whisper; 55.99% vs 55.25% on Qwen3), while standalone embeddings lag at R@1 but recover at higher K values. The system does not win against near-homophonous entities with highly overlapping phonetic sequences or semantically related entities sharing clinical contexts despite different surface forms.

| System & Configuration | Recall@1 (%) | Recall@3 (%) | Recall@5 (%) | Recall@10 (%) |
| :--- | :--- | :--- | :--- | :--- |
| Whisper-large-v3 (Vanilla ASR) | 38.27 | - | - | - |
| Whisper-large-v3 + Soundex | 68.27 | 74.13 | 76.01 | 78.83 |
| Whisper-large-v3 + G2P | 68.83 | 77.13 | 79.96 | 83.29 |
| Whisper-large-v3 + Fusion (text-embedding-3-large) | 74.67 | 82.69 | 85.09 | 87.36 |
| Qwen3-ASR-1.7B (Vanilla ASR) | 36.27 | - | - | - |
| Qwen3-ASR-1.7B + Fusion (text-embedding-3-large) | 59.82 | 66.93 | 69.33 | 71.86 |

## Limitations

The evaluation is restricted to a closed-vocabulary protocol using a predefined medication lexicon derived from training transcripts, meaning out-of-vocabulary entities cannot be correctly grounded. The framework relies on the upstream zero-shot NER extraction step (GLiNER) and drops samples where extracted entity counts mismatch between reference and ASR transcripts. Experiments are limited to English medical terminology and text-only post-processing without exploiting acoustic features or joint decoding constraints.

## Why read this

Speech and ML engineers dealing with downstream domain-specific ASR errors should read this paper to learn how to cheaply correct proper nouns using multi-view phonetic-semantic retrieval without retraining large speech models. It provides concrete empirical evidence on combining G2P, Soundex, and dense embeddings for robust entity-level ranking.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Post-processing medical, legal, or technical ASR transcripts to accurately ground named entities for clinical decision support, electronic health record indexing, and human verification pipelines.

## Institutions / 機構

Augnito

## Related

- (link related pages by id as the wiki grows)
