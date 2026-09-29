---
id: nguyen26f_interspeech
category: translation
labels: [low-resource, multilingual]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1963
pdf: https://www.isca-archive.org/interspeech_2026/nguyen26f_interspeech.pdf
---

# PiDA: Phonetically-Informed Data Augmentation for Robust Vietnamese Speech Translation

*Giang Son Nguyen, Tung X. Nguyen, Hieu Minh Truong, Nhu Vo, Wray Buntine, Dung D. Le*

[PDF](https://www.isca-archive.org/interspeech_2026/nguyen26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nguyen26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1963)

**Category:** `translation` · **Labels:** `low-resource`, `multilingual`

**TL;DR** — PiDA introduces a phonetically-informed data augmentation method for robust Vietnamese speech translation by substituting words with phonetically similar alternatives using XPhoneBERT embeddings. It improves translation on erroneous ASR outputs by up to +2.04 BLEU while preserving or improving clean-text performance.

## Key contributions

- First systematic categorization of Vietnamese ASR substitution errors, proving they arise primarily from structured phonetic confusions rather than random noise.
- Linear Mixed-Effects Modelling analysis quantifying how different phonetic error types (vowel, consonant, tonal) degrade downstream NMT performance.
- PiDA data augmentation framework utilizing pretrained XPhoneBERT phoneme embeddings and FAISS nearest-neighbor retrieval to generate realistic ASR-like corruptions without audio data.
- Demonstration that fine-tuning on a 1:1 mixture of clean and PiDA-corrupted text achieves superior speech translation robustness across multiple ASR front-ends while avoiding the clean-MT performance degradation seen with real noisy data.

## Problem

Cascaded speech translation systems suffer from severe error propagation when downstream Neural Machine Translation (NMT) models encounter incorrect ASR outputs, resulting in a 6.79 to 10.64 BLEU drop on Vietnamese–English FLEURS compared to clean transcripts. While training on noisy text helps, prior text augmentation methods either use random vocabulary draws, require expensive audio collection, or rely on LLMs (like MEDSAGE) that fail to capture true acoustic confusability in tonal languages like Vietnamese. This work addresses the need for a principled, phonetically grounded augmentation strategy that bridges the training-inference mismatch without hurting clean text performance.

## Method

The PiDA pipeline operates in two phases: precomputation and augmentation. In precomputation, the top 50,000 frequent Vietnamese words from web corpora are filtered into an inventory of ~9,400 unique syllables using wordfreq, converted to IPA via CharsiuG2P, and passed through xphonebert-base to yield 768-dimensional mean-pooled embeddings. An L2-normalized FAISS index with inner product search retrieves the top-50 phonetic neighbors for each syllable. In the augmentation phase, words are selected for deletion or substitution based on training set word error rates (WER). For substitutions, replacement syllables are sampled from the top-k (k=5) phonetic neighbors using temperature-scaled softmax sampling over cosine similarities with temperature tau=0.5.

The downstream NMT model (VinAI-Translate, an mBART-based vi-en model) is fine-tuned on a 1:1 mix of clean reference pairs and PiDA-corrupted text (3k clean + 3k noisy). Training uses the AdamW optimizer with a learning rate of 3e-5, batch size of 8, gradient accumulation over 8 steps (effective batch size 64), 300 warmup steps, weight decay of 0.01, max sequence length of 256 tokens, and early stopping across 3 epochs.

## Experimental setup

Evaluated on the Vietnamese–English subset of FLEURS (3k training samples for alignment/augmentation, 0.9k test samples). Uses PhoWhisper-large and wav2vec2-base-vietnamese-250h as ASR front-ends. Baselines include clean-only fine-tuning, random frequency-based substitutions, real noisy pairs, and LLM-generated MEDSAGE corruptions. Metrics include BLEU and COMET (Unbabel/wmt22-comet-da) evaluated on clean text (MT) and ASR outputs (ST).

## Results

Mixing clean text with PiDA achieves the highest BLEUST on PhoWhisper-large (28.29, a +2.04 BLEU improvement over the baseline and +0.84 over random frequency substitutions, p < 0.05) and significant gains on wav2vec2-base (23.18 BLEUST, +0.78 over baseline). Unlike training solely on real noisy pairs—which boosts ST to 28.06 BLEU but degrades clean text BLEUMT by 1.04 points—PiDA preserves clean-text performance (33.72 BLEUMT, +0.68 over clean baseline) and COMET scores. Ablations over k (3, 5, 10) and tau (0.3, 0.5, 1.0) show peak performance at k=5 and tau=0.5.

| System / Condition | MT BLEU | ST (PhoWhisper) BLEU | ST (wav2vec2) BLEU |
| :--- | :--- | :--- | :--- |
| No fine-tuning | 28.05 | 23.73 | 22.15 |
| + clean pairs (baseline) | 33.04 | 26.25 | 22.40 |
| + clean & freq-based subs | 33.13 | 27.45 | 22.77 |
| + real noisy only | 32.00 | 28.06 | 23.65 |
| + clean & MEDSAGE | 32.59 | 26.68 | 22.88 |
| + clean & PiDA (ours) | 33.72 | 28.29 | 23.18 |

## Limitations

Evaluated on only a single dataset (FLEURS) due to a lack of high-quality Vietnamese speech translation benchmarks (such as MultiMed-ST, which suffers from severe audio-transcript misalignments). Out-of-vocabulary (OOV) errors involving cross-lingual phonetic mapping are not handled by the current within-vocabulary syllable substitution method.

## Why read this

Speech and ML engineers building cascaded translation systems for low-resource or tonal languages will learn how to inject linguistically grounded noise using phonetic embeddings instead of relying on costly audio collection or uncalibrated LLM prompts.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust cascaded speech translation systems, text-only data augmentation for low-resource spoken language translation domains, and robust machine translation front-ends.

## Institutions / 機構

VinUniversity, University of Technology Sydney, Monash University

**Funding / 經費:** VinUniversity, Vingroup Scholarship

## Related

- (link related pages by id as the wiki grows)
