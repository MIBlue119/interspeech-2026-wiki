---
id: kheir26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2445
pdf: https://www.isca-archive.org/interspeech_2026/kheir26b_interspeech.pdf
---

# IQRA 2026: Interspeech Challenge on Automatic Assessment Pronunciation for Modern Standard Arabic (MSA)

[PDF](https://www.isca-archive.org/interspeech_2026/kheir26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kheir26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2445)

**TL;DR** — The paper presents the findings and methodologies of the IQRA 2026 Interspeech Challenge on automatic mispronunciation detection and diagnosis for Modern Standard Arabic, achieving a top F1-score of 0.7201.

## Problem

Modern Standard Arabic mispronunciation detection has historically suffered from a lack of standardized benchmarks, open annotated datasets, and reproducible evaluation protocols. The language's complex phonological inventory, including uvular, pharyngeal, and emphatic versus non-emphatic consonant distinctions, compounds these difficulties. Additionally, diglossia introduces systematic L1-interference errors that differ between native regional speakers and foreign learners.

## Method

Submitted systems utilized diverse frameworks including enhanced CTC-based temporal modeling, SSL fine-tuning with language model integration, and generative large audio-language models (LALMs). Top architectures featured frozen SSL encoders (such as wav2vec2-xls-r-300m and mHuBERT) coupled with multi-layer weighted fusion, Temporal Convolutional Networks, or Conformer decoders, alongside custom strategies like optimal transport alignment and contrastive data filtering. Training leveraged the newly introduced open Iqra train corpus (79 hours), synthetic TTS data (52 hours), and Iqra Extra IS26 (1.5 hours of authentic human mispronounced speech).

## Results

Evaluated on the QuranMB.v2 benchmark (1,643 utterances, ~2.5 hours), the best-performing system (whu-iasp) reached an F1-score of 0.7201 and a Phoneme Error Rate (PER) of 0.0365, outperforming the organizer mHuBERT baseline F1-score of 0.4414 by 0.2787. Out of 19 participating teams, 13 surpassed the organizer baseline. Ablations and challenge analyses highlighted that incorporating the authentic human error data of Iqra Extra IS26 yielded substantial performance gains over synthetic data alone.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and educators building computer-aided pronunciation training (CAPT) systems and automated language-learning applications for Arabic learners.

## Limitations

Performance remains sensitive to data domain coverage, and models lacking balanced calibration tend to suffer from a severe precision-recall trade-off favoring high-recall error rejections.

## Related

- (link related pages by id as the wiki grows)
