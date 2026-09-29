---
id: sinha26_interspeech
category: resources-evaluation
labels: [low-resource, multilingual, dataset-or-benchmark-release]
institutions: ["National Institute of Technology Sikkim"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2634
pdf: https://www.isca-archive.org/interspeech_2026/sinha26_interspeech.pdf
---

# Collection and Curation of a Spontaneous Multilingual Speech Corpus for Low-Resource Himalayan Languages

*Abhijit Sinha, Subham Kutum, Udara Laxman Kumar, Paban Sapkota, Hemant Kumar Kathania*

[PDF](https://www.isca-archive.org/interspeech_2026/sinha26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sinha26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2634)

**Category:** `resources-evaluation` · **Labels:** `low-resource`, `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — The paper introduces a 146-hour spontaneous speech corpus across four under-resourced Eastern Himalayan languages (Bodo, Dzongkha, Gorkhali, and Sherpa) from 320 native speakers, achieving up to 92.95% accuracy in speaker-independent language identification through multi-feature acoustic fusion.

## Key contributions

- Collection and structured organization of 146 hours of spontaneous, unscripted speech across four under-resourced Himalayan languages spanning Tibeto-Burman and Indo-Aryan families.
- Documentation of a practical recording and metadata framework designed for natural indoor environments without acoustically treated studios.
- Acoustic characterization of language-level pitch (F0), energy, and temporal dynamics across the corpus.
- Empirical validation demonstrating robust speaker-independent language discrimination (up to 92.95% accuracy) using spectral, pitch, intensity, and loudness features.

## Problem

Speech technology development heavily relies on curated corpora, but many linguistically diverse regions like the Eastern Himalayan corridor remain severely underrepresented due to a lack of systematically collected data. Existing datasets are often small, lack recording consistency, or are difficult to transcribe at scale due to dialectal variations and high annotation costs. Building datasets in these settings requires dealing with acoustically variable environments, diverse speaker demographics, and limited technical infrastructure, motivating structured unscripted data collection strategies.

## Method

The corpus comprises 146 hours of spontaneous monologues collected from 320 speakers (80 per language: Bodo, Dzongkha, Gorkhali, Sherpa), with each speaker contributing five ~5.5-minute unscripted utterances (roughly 27-28 minutes per speaker). Audio was captured in natural indoor environments (e.g., schools and colleges) using portable digital recorders at 44.1 kHz or headphone-microphones at 16 kHz. For validation, audio was standardized to 16 kHz mono, voice activity detected via WebRTC (aggressiveness level 3), and framed into non-overlapping 10-second chunks under a strict speaker-independent 80/20 train/test split to prevent speaker memorization.

Feature extraction includes 40-dimensional MFCCs, fundamental frequency (F0) via the YIN algorithm, RMS loudness, and intensity. Classifiers evaluated include Support Vector Machines (SVM) and Convolutional Neural Networks (CNN). Incremental feature fusion experiments are performed to measure complementarity between spectral representations, prosody, and energy cues, demonstrating that combining MFCCs, loudness, intensity, and pitch maximizes cross-language separability.

## Experimental setup

The dataset contains 146 hours total across 320 speakers (Bodo: 80, Dzongkha: 80, Gorkhali: 80, Sherpa: 80). Baselines evaluated are SVM and CNN classifiers operating on single acoustic features (MFCC, Pitch, Intensity, Loudness) and fused representations under a speaker-independent 80/20 split. Metrics reported include overall accuracy, balanced accuracy, precision, recall, and F1-score.

## Results

Using single-feature CNNs, MFCCs achieve 85.95% accuracy, loudness reaches 76.09%, intensity yields 66.30%, and pitch provides 56.86%. Incremental feature fusion significantly improves performance: combining MFCCs with loudness raises accuracy to 91.97%, MFCC + pitch + intensity hits 92.85%, and the complete feature set (MFCC + loudness + intensity + pitch) achieves a headline accuracy of 92.95% with a balanced accuracy of 92.41%. Preliminary experiments using unadapted representations from multilingual pre-trained speech models failed to yield competitive results without task-specific fine-tuning.

| Systems / Conditions | Acc (%) | Bal. Acc (%) | Prec | Rec | F1 |
|---|---|---|---|---|---|
| CNN (MFCC only) | 85.95 | 84.93 | 0.87 | 0.85 | 0.85 |
| CNN (MFCC + Loudness) | 91.97 | 90.76 | 0.91 | 0.91 | 0.91 |
| CNN (MFCC + Pitch + Intensity) | 92.85 | 92.34 | 0.92 | 0.92 | 0.92 |
| CNN (MFCC + Loudness + Intensity + Pitch) | 92.95 | 92.41 | 0.92 | 0.92 | 0.92 |

## Limitations

The dataset lacks manual transcriptions, limiting its direct utility for end-to-end ASR training without supplementary annotation work. Demographic imbalances exist across language subsets (e.g., Sherpa includes 74 males and only 6 females, while Bodo has 52 females), driven by practical field recruitment constraints rather than balanced sampling. Recordings were captured in uncontrolled indoor environments with varying background noise rather than acoustic booths.

## Why read this

Researchers building speech technologies or data collection pipelines for low-resource, multilingual environments will find a blueprint for curating unscripted corpora and validating them via acoustic analysis and language identification.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computational documentation, language identification, and downstream acoustic modeling for low-resource and Himalayan speech communities.

## Institutions / 機構

National Institute of Technology Sikkim

## Related

- [GLAD-CSpeech: A Dialectologically Comprehensive Benchmark for Genuine Chinese Dialect Speech](xu26j_interspeech.md) — shared data / evaluation · relatedness 2.1/3
- [Robust Language Identification Using Semi-positive Contrastive Learning](sharma26_interspeech.md) — same problem · relatedness 2.1/3
- [Pashto Common Voice: Building the First Open Speech Corpus for a 60-Million-Speaker Low-Resource Language](rahman26_interspeech.md) — same problem · relatedness 2.0/3
- [Spontaneous Dialect-Aware Speech Corpus for Low-Resource Dakhini, A Southern Indo-Aryan Language: Methods, Challenges, and Insights](mondal26b_interspeech.md) — same problem · relatedness 2.0/3
- [VāṇīSetu: A Human-AI Collaborative Framework for Scalable Conversational Speech Corpus Creation in Low-Resource Settings](kumar26h_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
