---
id: rathore26_interspeech
category: multilingual
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-291
pdf: https://www.isca-archive.org/interspeech_2026/rathore26_interspeech.pdf
---

# SᴜTRA: Structurally-Unified Tokenization with Root Awareness

*Vaibhav Rathore, Siddhant Gole, Dadhichi Telwadkar, Rooshil Bhatia, Maulik Ruparel, Siddharth Surekha, Neha Bhargava*

[PDF](https://www.isca-archive.org/interspeech_2026/rathore26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rathore26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-291)

**TL;DR** — SuTRA is a morphology-aware subword tokenization framework for morphologically rich Indic languages that prevents root-affix fragmentation through script-aware grouping and boundary-penalized merging. It achieves an average +8.08 chrF2 improvement in machine translation and a +34% gain in semantic recoverability for Hindi over standard BPE.

## Key contributions

- Introduces SuTRA, a two-phase tokenization framework combining akshara-level pre-tokenization with boundary-penalized BPE merging to eliminate Morphological Shattering.
- Releases an LLM-verified gold-standard morphological segmentation dataset spanning ~560,000 unique words across Hindi, Marathi, and Gujarati.
- Designs a dynamic rigidity constraint with an annealed schedule to prioritize core lexical roots early in training before attaching functional affixes.
- Demonstrates consistent improvements across morphological alignment, semantic recoverability, orthographic robustness, and downstream machine translation.

## Problem

Standard statistical tokenizers like BPE, WordPiece, and Unigram treat text purely as data compression streams, causing severe Morphological Shattering and Semantic Blindness in morphologically rich languages. For Indic scripts (abugidas), off-the-shelf tokenizers frequently split dependent vowels (matras) from base consonants and violate morpheme boundaries created by phonetic fusions like Sandhi. This results in high token fertility ('Indic Tax'), poorly anchored vector representations, and an inability of downstream models to easily recover whole-word semantics.

## Method

SuTRA operates in two distinct phases: pre-tokenization and morphology-aware merging. In Phase 1, orthographic rules (Phi) map each word to a sequence of akshara-like units to preserve script atomicity, while a gold lexicon and a fine-tuned sequence-to-sequence model identify forbidden morpheme boundaries for out-of-vocabulary terms. In Phase 2, a BPE-style merging process scores candidate pairs via S(a, b) = f(a, b) * Psi(a, b)^(gamma_t), where f is corpus frequency, Psi in [0, 1] penalizes merges crossing forbidden boundaries, and gamma_t is a dynamic rigidity constraint.

The rigidity constraint gamma_t is annealed exponentially from gamma_start to gamma_end over training. This curriculum forces the tokenizer to prioritize merging continuous lexical roots early in training while gradually relaxing the penalty to handle functional affixes later. Surface-form integrity is prioritized over canonical purity to allow exact, zero-overhead detokenization via simple string concatenation.

## Experimental setup

Experiments are conducted on three Indic languages (Hindi, Marathi, and Gujarati) using the IndicCorp corpus and a ~560k word gold-standard morphological lexicon. Baselines include statistical tokenizers (BPE, WordPiece, SentencePiece, Unigram) and morphological tokenizers (SuperBPE, MorphTok). Evaluation metrics include Boundary F1, Fertility Ratio, Word2Vec Linear and MLP R^2 for semantic recoverability, Jaccard Overlap and Root-Affected Distance for robustness, and chrF2/COMET for machine translation using a 3-layer Transformer (L=3, H=4, d_ff=400) trained for 100k updates with a shared 32k vocabulary.

## Results

SuTRA achieves top Boundary F1 scores of 0.586 for Hindi and 0.617 for Marathi while maintaining a controlled fertility ratio (1.412 to 1.755). In semantic recoverability probes, SuTRA yields a +34% relative gain in Linear R^2 over BPE for Hindi (0.4464 vs 0.3329) and exceeds 0.50 R^2 with MLP probes for Marathi and Gujarati. In machine translation, SuTRA attains 38.84 chrF2 and 0.6554 COMET on Marathi-to-Hindi, outperforming BPE (36.55 chrF2) and WordPiece (27.18 chrF2). Furthermore, SuTRA drastically reduces root-affected distance under orthographic noise down to 0.038-0.042 compared to 0.228-0.324 for standard BPE.

| Tokenizer | Hi Boundary F1 | Hi Fertility | Mr Boundary F1 | Mr Fertility | Gu Boundary F1 | Gu Fertility |
|---|---|---|---|---|---|---|
| BPE (ACL'16) | 0.482 | 1.285 | 0.470 | 1.225 | 0.591 | 1.126 |
| WordPiece | 0.411 | 1.214 | 0.527 | 1.300 | 0.596 | 1.173 |
| SentencePiece | 0.438 | 1.315 | 0.083 | 1.183 | 0.591 | 1.156 |
| Unigram | 0.439 | 1.310 | 0.507 | 1.256 | 0.669 | 1.137 |
| SuperBPE | 0.089 | 2.517 | 0.084 | 3.084 | 0.096 | 3.113 |
| SuTRA (Ours) | 0.586 | 1.412 | 0.617 | 1.755 | 0.584 | 1.454 |

## Limitations

Evaluated exclusively on three Indo-Aryan Indic languages (Hindi, Marathi, Gujarati) using a curated gold morphological dataset, meaning its generalizability to non-abugida or non-Indic morphologically rich languages remains unverified. The framework relies on an auxiliary sequence-to-sequence model and LLM-verified lexicons to identify out-of-vocabulary boundaries, introducing pipeline complexity and resource dependencies during vocabulary construction.

## Why read this

Researchers and engineers building large language models for morphologically rich or low-resource abugida scripts should read this to understand how integrating lightweight linguistic priors into tokenization can eliminate morphological shattering, improve semantic grounding, and boost translation performance without increasing vocabulary size.

## Code

- https://mo-vaibhavr-43300.github.io/SuTRA/

## Applications

Large language model pre-training, machine translation, and speech-to-text systems handling morphologically complex Indic languages.

## Related

- (link related pages by id as the wiki grows)
