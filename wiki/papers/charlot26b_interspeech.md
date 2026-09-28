---
id: charlot26b_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2780
pdf: https://www.isca-archive.org/interspeech_2026/charlot26b_interspeech.pdf
---

# Context-aware child-directed speech detection from long-form recordings

[PDF](https://www.isca-archive.org/interspeech_2026/charlot26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/charlot26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2780)

**TL;DR** — This paper presents a context-aware, multilingual system for automatically classifying child-directed speech from long-form daylong recordings, demonstrating that in-domain pre-training and conversational context significantly boost classification performance.

## Problem

Automatically identifying child-directed speech (CDS) from daylong recordings is crucial for studying language development, but prior work relies heavily on manual annotation or isolated utterance processing. Existing models are predominantly trained on English, ignore surrounding conversational context despite short utterance durations, and have not been rigorously evaluated in end-to-end automated pipelines. This hinders scalable, cross-linguistic investigations into children's naturalistic language environments.

## Method

The authors frame addressee classification as a 3-class utterance-level problem (Key CDS, Adult-Directed Speech, and Other) minimized via categorical cross-entropy loss. They fine-tune six self-supervised models across Wav2Vec 2.0, HuBERT, and WavLM architectures (comparing adult-only pre-training against in-domain multilingual child-centered models like BabyHuBERT). To leverage conversational surroundings, they symmetrically extend target utterances with context windows up to 30 seconds, encoding the full window through the transformer while mean-pooling only the frames belonging to the target utterance. Finally, they evaluate the system in an end-to-end pipeline using Voice Type Classifier 2.0 for automatic speech segmentation.

## Results

Evaluated on a multilingual dataset comprising 22 hours across 182 children and tested on held-out Winnipeg and Tseltal corpora. BabyHuBERT achieves the highest average validation F1-score of 53.2%. Incorporating a 10-second contextual window yields an absolute macro-average F1-score gain of 13.8% over the no-context baseline. In the end-to-end evaluation using automated VTC 2.0 segmentation, BabyHuBERT achieves an average frame-level F1-score of 38.6% (compared to 25.6% for a rule-based baseline), outperforming it despite performance drops from segmentation error propagation.

## Code

- https://github.com/LAAC-LSCP/addressee

## Applications

Speech and ML engineers and developmental scientists studying child language acquisition, scalable linguistic environment analysis, and cross-cultural vocal input quantification.

## Limitations

Full-context transformer encoding is computationally expensive, increasing training time from 22 minutes to over 2 hours when moving from 0 to 30 seconds of context; performance also drops substantially under automatic VTC 2.0 segmentation due to error propagation.

## Related

- (link related pages by id as the wiki grows)
