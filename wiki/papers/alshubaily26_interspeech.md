---
id: alshubaily26_interspeech
category: paralinguistics-emotion
labels: [dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-383
pdf: https://www.isca-archive.org/interspeech_2026/alshubaily26_interspeech.pdf
---

# The SSPNet Speaker Personality Corpus Version 2: Investigating the Role of Language Understanding in Automatic Personality Perception

*Nisreen Alshubaily, Emily O'Hara, Tanaya Guha, Alessandro Vinciarelli*

[PDF](https://www.isca-archive.org/interspeech_2026/alshubaily26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/alshubaily26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-383)

**Category:** `paralinguistics-emotion` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — The paper introduces the SSPNet Speaker Personality Corpus Version 2 (SPC V2) for automatic personality perception, adding automatic transcriptions, 100-point scale ratings, and dual-rater groups (language-comprehending vs. non-comprehending) alongside reproducible multimodal baselines.

## Key contributions

- Released SPC V2 containing 640 French radio news clips (1 hour 46 minutes) fully annotated with automatic transcriptions to enable multimodal research.
- Provided personality annotations using a fine-grained 100-point scale based on the Big Five Inventory-10 (BFI-10) to support both classification and regression.
- Collected assessments from two distinct groups of raters: French speakers (who understand lexical content) and English non-speakers (paralanguage-only).
- Established robust, reproducible baseline protocols for unimodal (paralanguage via Whisper, language via Word2vec + LSTM) and multimodal systems using speaker-independent 5-fold cross-validation.

## Problem

The original SSPNet Speaker Personality Corpus (SPC) has been the primary benchmark for automatic personality perception (APP), but it suffered from several severe limitations: raters did not understand the spoken French language (precluding language-paralanguage interaction studies), annotations used a coarse 9-point scale that hindered regression, and it lacked automatic transcriptions and formal cross-validation protocols. These gaps prevented researchers from developing multimodal models or understanding how lexical comprehension shapes human social perception and first impressions. SPC V2 addresses these roadblocks to advance both psychological science and computational paralinguistics.

## Method

The baseline architecture processes audio using Whisper encoder outputs, segmented into frames of length M (tuned among 50, 100, 150, 200) with 50% overlap. These frame sequences feed into an LSTM comprising 32 to 512 units (optimized via nested cross-validation), which performs either binary classification (using binary cross-entropy loss) or regression (using Mean Absolute Error, MAE loss). Text transcripts are tokenized with Keras, capped at a maximum length of T = 47 tokens, embedded via Word2vec (or BERT/Flaubert), and processed by a parallel text LSTM.

For multimodal setups, the hidden layer outputs from the paralinguistic and linguistic LSTMs are concatenated and passed to a dense softmax layer for classification or regression. Training utilizes the Adam optimizer for 50 epochs with initial learning rates set to 0.01 for paralinguistics and 0.001 for language analysis. Speaker-independent 5-fold cross-validation guarantees that no speaker appears in both training and test sets across 25 total training-testing cycles per configuration.

## Experimental setup

The corpus consists of 640 10-second audio clips from 322 speakers (78.5% male, 21.5% female) recorded at 8 kHz, 16-bit mono. Models were evaluated using 5-fold cross-validation with hyperparameter search over LSTM layer sizes (32, 64, 128, 256, 512) and frame lengths. Performance is measured using Accuracy, Precision, Recall, and F1-score for binary classification, and Mean Absolute Error (MAE) for regression against random and dummy baselines.

## Results

For English annotators (paralanguage-only), Extraversion achieved the highest unimodal paralanguage accuracy at 61.2% (F1: 63.7%), whereas Conscientiousness reached 56.5% accuracy (MAE: 6.4). For French annotators (language-comprehending), Conscientiousness achieved the highest unimodal paralanguage accuracy at 64.7% (F1: 65.8%), which improved further to 67.1% accuracy (F1: 67.0%) using the multimodal model. Across multiple traits, unimodal paralinguistic models often matched or outperformed text-only language models, demonstrating the dominant role of nonverbal cues in first impressions, though multimodal fusion provided notable gains for specific traits like Conscientiousness under native-speaker evaluation.

| Trait | Metric | Eng Paralanguage | Eng Language | Eng Multimodal | Fre Paralanguage | Fre Language | Fre Multimodal |
|---|---|---|---|---|---|---|---|
| Openness | Accuracy | 52.8 ± 0.9 | 50.4 ± 1.5 | 51.5 ± 0.7 | 53.8 ± 0.4 | 52.2 ± 1.0 | 55.9 ± 1.2 |
| Conscientiousness | Accuracy | 56.5 ± 0.6 | 53.5 ± 0.4 | 55.2 ± 1.4 | 64.7 ± 0.5 | 64.4 ± 0.2 | 67.1 ± 0.6 |
| Extraversion | Accuracy | 54.9 ± 1.1 | 51.1 ± 0.7 | 53.0 ± 1.5 | 61.2 ± 0.8 | 59.9 ± 0.4 | 62.2 ± 0.6 |
| Agreeableness | Accuracy | 61.2 ± 0.6 | 56.5 ± 1.2 | 58.6 ± 0.5 | 53.5 ± 1.2 | 52.1 ± 0.4 | 50.6 ± 1.1 |
| Neuroticism | Accuracy | 55.7 ± 1.1 | 52.8 ± 1.0 | 54.0 ± 1.7 | 56.8 ± 1.5 | 56.2 ± 1.0 | 57.3 ± 1.4 |

## Limitations

The dataset is bounded in scale, comprising only 640 clips totaling approximately 1 hour and 46 minutes of audio from a single domain (French radio news broadcasts). Language coverage is restricted exclusively to French, limiting cross-lingual generalization claims. Furthermore, automatic transcriptions were generated via a single online API (Google Web Speech API), which may introduce transcription errors into the linguistic processing pipeline.

## Why read this

Researchers and engineers working on automatic personality perception, paralinguistics, and multimodal speech processing should read this paper to adopt the new SPC V2 benchmark and standard protocols. It provides essential insights into how language comprehension modulates human personality attribution compared to nonverbal cues alone.

## Code

- https://github.com/SocialAI-Glasgow/SSPNet_SPC2.0

## Applications

Building socially intelligent conversational agents, virtual assistants, and affective computing systems capable of estimating human personality traits and adjusting interaction styles accordingly.

## Institutions / 機構

University of Glasgow, Imam Mohammad Ibn Saud Islamic University

**Funding / 經費:** UKRI Centre for Doctoral Training in Socially Intelligent Artificial Agents

## Related

- (link related pages by id as the wiki grows)
