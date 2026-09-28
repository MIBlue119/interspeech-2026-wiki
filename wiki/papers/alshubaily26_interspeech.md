---
id: alshubaily26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-383
pdf: https://www.isca-archive.org/interspeech_2026/alshubaily26_interspeech.pdf
---

# The SSPNet Speaker Personality Corpus Version 2: Investigating the Role of Language Understanding in Automatic Personality Perception

[PDF](https://www.isca-archive.org/interspeech_2026/alshubaily26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/alshubaily26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-383)

**TL;DR** — The paper introduces the SSPNet Speaker Personality Corpus Version 2 (SPC V2), providing full transcripts, 100-point Big Five personality scales from both language-comprehending and non-comprehending raters, and reproducible baselines for automatic personality perception.

## Problem

The original SSPNet Speaker Personality Corpus (SPC) only provided audio without transcripts, used a coarse 9-point rating scale, and relied solely on raters who did not understand the spoken language. These limitations entirely prevented multimodal speech-text modeling, hindered fine-grained regression analysis, and precluded studying how language comprehension influences personality attribution.

## Method

The SPC V2 contains 640 French radio broadcast clips (totaling ~1 hour 46 minutes across 322 speakers) annotated via Prolific using the 10-item Big Five Inventory (BFI-10) on a 0-100 scale by two distinct groups: 100 French speakers and 101 English speakers. Transcripts are generated using Google Web Speech API. Baseline models use Whisper encoder features (segmented into overlapping frames) processed by LSTMs for paralanguage, and Word2vec/BERT token embeddings processed by LSTMs for language, evaluated through both mid-level/late fusion multimodal architectures and unimodal setups using 5-fold speaker-independent cross-validation.

## Results

The dataset and evaluation framework establish official benchmarks for the newly enabled regression and classification tasks across the Big Five traits (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism). Experiments use 5-fold cross-validation with strict speaker independence (no overlapping speakers between folds) and a nested hyperparameter search. The distribution package releases open-source scripts for annotation processing, binarization (median split into High/Low classes), unimodal/multimodal training, and statistical reliability analyses.

## Code

- https://github.com/SocialAI-Glasgow/SSPNet_SPC2.0

## Applications

Speech and machine learning engineers, psychologists, and social scientists studying automatic personality perception, affective computing, and the interplay between verbal and nonverbal cues in voice.

## Related

- (link related pages by id as the wiki grows)
