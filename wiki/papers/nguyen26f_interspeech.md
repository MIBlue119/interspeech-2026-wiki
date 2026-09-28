---
id: nguyen26f_interspeech
category: speech-translation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1963
pdf: https://www.isca-archive.org/interspeech_2026/nguyen26f_interspeech.pdf
---

# PiDA: Phonetically-Informed Data Augmentation for Robust Vietnamese Speech Translation

[PDF](https://www.isca-archive.org/interspeech_2026/nguyen26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nguyen26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1963)

**TL;DR** — Phonetically-Informed Data Augmentation (PiDA) simulates ASR-like corruptions using phonetic word embeddings to improve cascaded speech translation robustness, yielding up to +2.04 BLEU gains over standard fine-tuning.

## Problem

Cascaded speech translation systems suffer from error propagation because downstream neural machine translation models are trained on clean text yet must process noisy ASR outputs at test time. The authors show that standard text augmentation methods often fail to match the true distribution of ASR errors because they ignore the underlying acoustic-phonetic confusions that drive substitution mistakes. This training-inference mismatch causes severe translation degradation, resulting in drops between 6.79 and 10.64 BLEU on Vietnamese-English datasets.

## Method

The method begins with a systematic analysis using linear mixed-effects modeling to prove that ASR substitutions are driven primarily by phonetic confusions rather than random noise. Based on this, the authors propose PiDA, a text-only data augmentation pipeline that requires no audio. It builds a Vietnamese syllable inventory (approx. 9,400 syllables), converts them to IPA via CharsiuG2P, extracts 768-dimensional hidden states using pre-trained XPhoneBERT, and indexes them in FAISS using cosine similarity. During augmentation, training sentences are selectively corrupted by sampling deletion or substitution operations based on observed ASR word error rates, where substitutions are chosen from the top-k phonetic neighbors using temperature-scaled softmax sampling.

## Results

Evaluated on the FLEURS Vietnamese–English dataset using VinAI-Translate as the NMT model and transcribed via wav2vec2-base and PhoWhisper-large ASR systems. PiDA fine-tuning improves translation on erroneous ASR transcripts by up to +2.04 BLEU over standard clean fine-tuning, while also yielding slight improvements on clean text translation. It consistently outperforms or matches alternative baselines including random frequency-based substitutions, real noisy pairs, and LLM-based MEDSAGE augmentation. Linear mixed-effects regression confirms that vowel confusions have the strongest negative impact on translation edit rate among substitution types.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building cascaded speech translation or robust machine translation systems, particularly for low-resource or tonal languages where available parallel speech-translation corpora are scarce.

## Limitations

The pipeline currently excludes insertion error simulation due to the lack of a contextually aware language model component for generating insertions.

## Related

- (link related pages by id as the wiki grows)
