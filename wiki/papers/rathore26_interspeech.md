---
id: rathore26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-291
pdf: https://www.isca-archive.org/interspeech_2026/rathore26_interspeech.pdf
---

# SᴜTRA: Structurally-Unified Tokenization with Root Awareness

[PDF](https://www.isca-archive.org/interspeech_2026/rathore26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rathore26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-291)

**TL;DR** — SuTRA is a root-aware, morphology-guided subword tokenization framework for Indic languages that reduces morphological shattering, achieving up to +14.7% boundary alignment and an average +8.08 chrF2 improvement in machine translation over standard BPE.

## Problem

Standard subword tokenizers like BPE, WordPiece, and Unigram act purely as statistical compression tools, ignoring morphological structures and script properties. In morphologically rich Indic languages using abugida scripts, this causes morphological shattering by arbitrarily splitting orthographic syllables (aksharas) and fusing prefixes with roots. Consequently, language models suffer from semantic blindness, where root semantics become hard to recover from subword embeddings.

## Method

SuTRA operates in two phases: pre-tokenization and morphology-aware merging. Phase 1 applies script-aware orthographic rules to group akshara units and utilizes a gold morphological lexicon alongside a fine-tuned seq2seq model to flag forbidden morpheme boundaries for both vocabulary and out-of-vocabulary words. Phase 2 modifies the BPE scoring function to penalize candidate merges crossing these forbidden boundaries using a morphological validity probability weighted by an exponentially decayed rigidity curriculum. The authors also construct and release an LLM-verified gold standard morphological segmentation dataset of approximately 560,000 words across Hindi, Marathi, and Gujarati.

## Results

Evaluated across Hindi, Marathi, and Gujarati, SuTRA achieves peak Boundary F1 alignment scores of 0.586 for Hindi and 0.617 for Marathi while maintaining controlled fertility. In semantic recoverability tests using Word2Vec embeddings, SuTRA yields a +34% relative gain in linear R2 for Hindi over standard BPE and stronger structural recovery with deeper MLP probes in Marathi and Gujarati. In machine translation tasks on the BhasaAnuvaad corpus using a 3-layer Transformer, SuTRA achieves top results such as 38.84 chrF2 (0.6554 COMET) on Marathi-to-Hindi translation.

## Code

- https://mo-vaibhavr-43300.github.io/SuTRA/

## Applications

Speech and NLP engineers working on large language models and machine translation for morphologically rich or low-resource Indic languages can use this tokenizer to improve subword semantic integrity.

## Related

- (link related pages by id as the wiki grows)
