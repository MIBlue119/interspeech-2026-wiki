---
id: magoshi26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2246
pdf: https://www.isca-archive.org/interspeech_2026/magoshi26b_interspeech.pdf
---

# Improving Zero-Shot Phonetic Classification through Language-Agnostic Articulatory Features

[PDF](https://www.isca-archive.org/interspeech_2026/magoshi26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/magoshi26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2246)

**TL;DR** — Continuous articulatory feature vectors improve zero-shot phonetic classification for unseen phones, outperforming discrete IPA token methods on Chinese aspiration and Japanese nasal tasks.

## Problem

Phonetic foundation models for speech-to-IPA transcription rely heavily on grapheme-to-phoneme (G2P) labels that are phonemically abstract and acoustically agnostic. As a result, standard multilingual models perform poorly in zero-shot settings on nuanced phonetic distinctions like Chinese aspiration and Japanese moraic nasals, even when target IPA symbols are included in the training inventory.

## Method

The paper uses an XLS-R (318M parameter) pre-trained encoder augmented with an Articulatory Feature Classification Module (AFCM) to jointly predict standard CTC posteriors and 24-dimensional continuous articulatory feature (AF) vectors derived from PanPhon templates via cross-entropy loss. For zero-shot classification, target segments are located using forced alignment, and classification is performed by computing the L1 distance between frame-level or segment-averaged AF vectors and target phoneme template vectors. The model is trained on a 3,000-hour multilingual corpus spanning 78 languages from Common Voice and FLEURS (excluding Chinese and Japanese).

## Results

Evaluated on the Chinese FLEURS test set (652 utterances) and CSJ eval2/eval3 for Japanese nasals (586 utterances), the proposed AF-based approach is compared against a baseline POWSM hybrid CTC/attention model (252M parameters) and discrete CTC baselines. On Chinese aspiration, the XLS-R + AFCM model achieves a balanced accuracy of 94.5% using single-frame classification, compared to poor performance and extreme bias from POWSM. On Japanese nasal classification, segmental AF aggregation substantially improves performance, achieving 59.0% balanced accuracy compared to 36.9% for discrete CTC-based single-frame decoding.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers working on universal phonetic transcription, zero-shot cross-lingual speech analysis, and acoustic evaluation of endangered or atypical speech.

## Limitations

The choice of optimal temporal aggregation is task-dependent, requiring single-frame classification for transient distinctions like aspiration and segmental averaging for longer durations like nasals.

## Related

- (link related pages by id as the wiki grows)
