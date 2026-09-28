---
id: nema26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-907
pdf: https://www.isca-archive.org/interspeech_2026/nema26_interspeech.pdf
---

# Post-ASR Proper Noun Grounding via Multi-View Phonetic and Semantic Retrieval

[PDF](https://www.isca-archive.org/interspeech_2026/nema26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nema26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-907)

**TL;DR** — The paper proposes a post-ASR proper noun grounding framework combining multi-view phonetic and semantic retrieval, increasing Recall@1 by up to 36.4 percentage points over exact-match baselines.

## Problem

End-to-end ASR systems frequently misrecognize proper nouns and long-tail vocabulary due to data sparsity, producing phonetically plausible yet lexically incorrect substitutions that degrade downstream systems. Retraining or fine-tuning ASR models requires significant computation and domain-specific data, making lightweight, modular post-ASR correction desirable.

## Method

The framework operates purely on transcript text without modifying the underlying ASR model or accessing acoustic features. It first extracts entity mentions using a zero-shot GLiNER model and retrieves candidate entities from a predefined canonical lexicon using three complementary views: coarse phonetic encoding via Soundex, fine-grained phonetic similarity via G2P with normalized edit distance, and context-aware semantic embeddings. View-specific similarity scores are min-max normalized and aggregated via a weighted sum (α=β=γ=0.33) to produce a unified candidate ranking.

## Results

Evaluated on the United-MedSyn (UWC) medical speech dataset across 69,542 aligned entities under a closed-vocabulary protocol. Vanilla exact-match baseline Recall@1 is 38.27% for Whisper-large-v3 and 36.27% for Qwen3-ASR-1.7B. The proposed multi-view fusion raises Recall@1 to 74.67% for Whisper-large-v3 and 59.82% for Qwen3-ASR-1.7B, with Recall@10 reaching up to 87.36% in the strongest configuration.

## Code

- https://huggingface.co/datasets/united-we-care

## Applications

Speech engineers and developers building downstream medical or domain-specific applications who need to accurately ground noisy ASR transcripts to canonical entities without retraining base models.

## Limitations

Evaluated under a closed-vocabulary setting using a pre-constructed canonical lexicon, requiring successful upstream entity extraction.

## Related

- (link related pages by id as the wiki grows)
