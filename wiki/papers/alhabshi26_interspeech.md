---
id: alhabshi26_interspeech
category: prosody
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2914
pdf: https://www.isca-archive.org/interspeech_2026/alhabshi26_interspeech.pdf
---

# Multilingual and Cross-lingual Lexical Stress Detection Using SSL Feature Vectors

[PDF](https://www.isca-archive.org/interspeech_2026/alhabshi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/alhabshi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2914)

**TL;DR** — This paper evaluates self-supervised speech representations and a two-stage classifier for multilingual and cross-lingual lexical stress detection in Arabic and English, achieving 97.49% English and 90.56% monolingual accuracies.

## Problem

Lexical stress realization varies substantially between languages—Modern Standard Arabic is quantity-sensitive with strict edge constraints, whereas English stress is lexically and morphologically contrastive. Prior work is largely monolingual, leaving a gap in understanding how self-supervised speech representations transfer between typologically distinct stress systems in multilingual and cross-lingual settings.

## Method

The framework extracts 1024-dimensional frame-level embeddings from fixed SSL encoders (HuBERT, WavLM, and XLS-R) and averages them over forced-alignment syllable intervals. A two-stage classifier is employed: a syllable-level Pre-net DNN for frame-to-posterior mapping, followed by a word-context Post-net TDNN initialized with Pre-net weights to model inter-syllable dependencies across a padded sequence length of up to nine syllables. Models are trained using binary cross-entropy loss with early stopping on 70/15/15 train/validation/test splits of Common Voice 12 Arabic and English corpora.

## Results

On monolingual benchmarks, models reach 97.49% accuracy for English and 90.56% for Arabic. Multilingual joint training maintains near-monolingual accuracy at 97.08% for English and 90% for Arabic. Cross-lingual transfer reveals a directional asymmetry: Arabic-to-English transfer averages 76.09% accuracy (peaking at 86.69% with XLS-R Post-net), while English-to-Arabic averages 68.12% (peaking at 79.17%). The multilingual XLS-R encoder demonstrates the strongest cross-lingual robustness, and the Post-net consistently provides stable performance gains over the Pre-net across all configurations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers building Computer-Aided Pronunciation Learning (CAPL) systems for automated pronunciation evaluation and lexical stress feedback.

## Limitations

English varieties were not explicitly tracked (assumed predominantly American English), and speaker-disjoint splits could not be strictly verified due to unavailable speaker metadata in the Common Voice subsets.

## Related

- (link related pages by id as the wiki grows)
