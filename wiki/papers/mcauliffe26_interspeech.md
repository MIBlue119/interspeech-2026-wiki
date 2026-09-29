---
id: mcauliffe26_interspeech
category: asr
labels: [multilingual]
institutions: ["University of Wisconsin-Madison", "McGill University", "University of Oregon"]
code: https://github.com/MontrealCorpusTools/mfa-interspeech2026
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2734
pdf: https://www.isca-archive.org/interspeech_2026/mcauliffe26_interspeech.pdf
---

# Montreal Forced Aligner and the state of speech-to-text alignment in 2026

*Michael McAuliffe, Kaylynn Gunter, Michael Wagner, Morgan Sonderegger*

[PDF](https://www.isca-archive.org/interspeech_2026/mcauliffe26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mcauliffe26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2734)

**Category:** `asr` · **Labels:** `multilingual`

**TL;DR** — The paper presents Montreal Forced Aligner (MFA) 3.0, a major update featuring expanded multilingual pretrained models trained on up to 3.5k hours of speech, harmonized IPA dictionaries, and new tools for model adaptation and corpus processing. MFA 3.0 achieves state-of-the-art performance across English, Japanese, and Korean benchmarks with mean boundary errors consistently below 15 ms.

## Key contributions

- Scaled pretrained acoustic models to datasets up to three orders of magnitude larger (e.g., 3.5k hours for Global English) via an iterative progressive data-mixing strategy.
- Rebuilt pronunciation dictionaries for 20+ core languages using WikiPron and an expanded, cross-linguistically harmonized narrow IPA phone set.
- Added integrated acoustic model adaptation, cross-language phone set remapping, and pronunciation probability/phonological rule modeling utilities.
- Provided a comprehensive evaluation toolkit using modified Levenshtein distance on intervals with manner-category filtering for robust multi-aligner benchmarking.
- Built automated corpus utilities and integrations with SpeechBrain and WhisperX for VAD, speaker diarization, and iterative segmentation.

## Problem

Forced aligners developed a decade ago were largely restricted to a few high-resource languages with fixed broad-transcription dictionaries and smaller datasets (e.g., GlobalPhone), failing to cover diverse dialects, child speech, or L2 populations. While recent end-to-end neural ASR models and CTC-based systems output words, they lack explicit pronunciation dictionaries and phone-level representations, making them unoptimized for fine temporal boundary placement. Furthermore, existing forced aligner comparisons have been fragmented, restricted to English, and lacked standardized evaluation metrics that account for varying phone set granularities.

## Method

MFA 3.0 relies on an underlying Hidden Markov Model - Gaussian Mixture Model (HMM-GMM) architecture, inheriting and extending Kaldi recipes through a multi-stage training pipeline: monophone, triphone, Linear Discriminant Analysis (LDA) feature transforms, speaker-adapted triphones (SAT), and iterative pronunciation/silence probability estimation. Training data is scaled progressively—starting from clean read speech corpora (GlobalPhone, Multilingual LibriSpeech) in early iterations and systematically mixing in spontaneous and noisier corpora (Multilingual TEDx, CommonVoice) in later SAT and pronunciation-modeling cycles. For out-of-vocabulary terms, MFA 3.0 utilizes G2P models built on weighted finite-state transducers (WFSTs) via Phonetisaurus and Pynini. Acoustic model adaptation (mfa adapt) updates the means of seen HMM probability density functions (PDFs) without altering variances, allowing out-of-domain alignment using target audio. Cross-language alignment is supported via mfa remap dictionary and mfa remap alignments, mapping target phone sets to a high-resource pretrained model (e.g., Global English) before converting alignments back for analysis.

## Experimental setup

Evaluated on four benchmark corpora with manually corrected phone-level boundaries: TIMIT (English read, 5.38 hours, 630 speakers), Buckeye (English spontaneous, 17.12 hours, 40 speakers), CSJ (Japanese spontaneous, 23.81 hours, 137 speakers), and the Seoul Corpus (Korean spontaneous, 26.99 hours, 40 speakers). Baselines include classic aligners (MFA 1.0, MAUS, SPPAS, Julius, Korean Forced Aligner), dedicated neural aligners (MAPS, Charsiu, Bournemouth Forced Aligner), and neural ASR aligners with CTC loss (MMS, WhisperX, NeMo). Metrics include word and phone alignment accuracy at thresholds of 10, 25, 50, and 100 ms, alongside mean boundary error in milliseconds.

## Results

MFA 3.0 substantially outperforms all neural ASR-based aligners (MMS, WhisperX, NeMo) and older versions across all datasets, particularly at tighter temporal thresholds (10-25 ms). On the Buckeye corpus, MFA Global 3.0 and ARPA 3.0 achieve the best phone-level mean boundary error (13.9 ms) and word alignment accuracy, outperforming all baseline systems. On TIMIT, MFA 3.0 achieves a phone mean boundary error of 12.1 ms, trailing slightly behind specialized neural aligner MAPS (11.5 ms) and MAUS (11.3 ms). For cross-language scenarios, using the Global English model with a remapped Japanese dictionary on CSJ yields a 14.3 ms mean error out of the box, which improves to 11.6 ms with adaptation—surpassing MAUS (13.5 ms). Ablation studies show that removing pronunciation probability estimation (-PP) degrades TIMIT performance (error increases from 12.0 ms to 14.0 ms), while adding phonological rules (+rules) yields mixed results, providing the single best result on Buckeye (12.9 ms) but regressing performance on TIMIT and the Seoul Corpus.

| System / Condition | TIMIT Phone Mean Error (ms) | Buckeye Phone Mean Error (ms) | CSJ Phone Mean Error (ms) | Seoul Corpus Phone Mean Error (ms) |
|---|---|---|---|---|
| MFA 1.0 / Old Baseline | 16.38 | 17.58 | N/A | 20.69 |
| MAUS | 11.26 | 18.42 | 13.46 | N/A |
| MAPS (Neural) | 11.46 | 26.81 | N/A | N/A |
| MFA 3.0 Pretrained | 12.11 | 13.87 | 10.82 | 14.78 |
| MFA 3.0 + Adapted Remapped | N/A | N/A | 11.67 | 15.85 |
| MFA 3.0 Trained on Dataset | 11.85 | 13.83 | 10.13 | 14.03 |

## Limitations

The HMM-GMM architecture requires reliable pronunciation dictionaries and grapheme-to-phoneme tools, which remain scarce for extremely low-resource or endangered languages without community-contributed Wiktionary data. Within-language model adaptation yields negligible improvements when the target corpus style is already well-represented in the large training distribution, and adding phonological rules can unpredictably degrade performance if pronunciation probabilities are poorly estimated on smaller datasets.

## Why read this

Speech researchers and ML engineers should read this paper to understand how large-scale data mixing, narrow IPA harmonization, and HMM-GMM architectures continue to outperform end-to-end neural ASR aligners on precise temporal boundary segmentation.

## Code

- https://github.com/MontrealCorpusTools/mfa-interspeech2026

## Applications

Automated corpus creation, phonetic and sociolinguistic speech analysis, psychoacoustic experimentation, and high-precision subtitle or timestamp generation.

## Institutions / 機構

University of Wisconsin-Madison, McGill University, University of Oregon

**Funding / 經費:** Social Sciences and Humanities Research Council, Fonds de recherche sur la societe et la culture, Canada Foundation for Innovation, Canada Research Chairs, National Institutes of Health

## Related

- (link related pages by id as the wiki grows)
