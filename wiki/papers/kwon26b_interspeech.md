---
id: kwon26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1326
pdf: https://www.isca-archive.org/interspeech_2026/kwon26b_interspeech.pdf
---

# Investigating ASR for Low-Intelligibility Dysarthric Speech

[PDF](https://www.isca-archive.org/interspeech_2026/kwon26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kwon26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1326)

**TL;DR** — This paper investigates automatic speech recognition (ASR) for severely dysarthric speech using a unique 21.6-hour single-speaker dataset, achieving a word error rate (WER) as low as 10.5% with fine-tuned Whisper and demonstrating cross-speaker generalization benefits.

## Problem

Existing ASR research and public dysarthria datasets (like TORGO or UASpeech) are dominated by mild-to-moderate speakers with limited data per person, leading to the assumption that severe dysarthria is too variable to model. However, individuals with severe dysarthria have the greatest need for assistive communication technologies, creating a critical gap in high-intelligibility ASR performance under extreme articulatory impairment.

## Method

The study utilized a 21.6-hour single-speaker dataset from a 30-year-old male with severe athetoid cerebral palsy and 20.9% intelligibility, recorded over a year. Two distinct ASR architectures were evaluated in speaker-dependent settings: a conventional BLSTM-HMM trained from scratch using 351-dimensional MFCC input features and 800 tied senone states, and English-only pretrained Whisper variants (tiny, base, small, medium) fine-tuned for 15 epochs using a learning rate of 1e-5 and effective batch size of 16. Cross-speaker generalization was tested by applying the fine-tuned Whisper-medium model directly to unseen speakers in the TORGO database without additional adaptation.

## Results

On the speaker-dependent test set, the BLSTM-HMM achieved a 13.4% WER, while fine-tuned Whisper models scaled in performance with model size, yielding 28.2% (tiny), 20.2% (base), 11.4% (small), and 10.5% (medium) WERs. A data scaling analysis on Whisper-medium showed that increasing training data from 1 to 15 hours reduced test WER from 25.4% to 10.5%. When generalized to the TORGO dataset, the fine-tuned model reduced WER by 6 to 12 percentage points for three out of four severe speakers (mean severe WER improvement of 6.4 pp) without performance degradation on mild and moderate speakers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building voice-driven assistive communication technologies and voice-to-text interfaces for individuals with severe motor speech disorders.

## Limitations

Fine-tuning failed to improve performance for one severe TORGO speaker (M04) whose baseline WER exceeded 80%, suggesting that extremely severe articulatory impairment beyond a certain threshold limits model adaptation effectiveness.

## Related

- (link related pages by id as the wiki grows)
