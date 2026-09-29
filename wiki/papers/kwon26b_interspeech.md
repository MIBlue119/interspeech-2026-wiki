---
id: kwon26b_interspeech
category: asr
labels: [low-resource, self-supervised, dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1326
pdf: https://www.isca-archive.org/interspeech_2026/kwon26b_interspeech.pdf
---

# Investigating ASR for Low-Intelligibility Dysarthric Speech

*Jinuk Kwon, Beiming Cao, Carl Sigmond, Kristin Teplansky, Jun Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/kwon26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kwon26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1326)

**Category:** `asr` · **Labels:** `low-resource`, `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — This paper investigates automatic speech recognition for severely dysarthric speech with very low intelligibility using a unique 100-hour single-speaker dataset, showing that fine-tuned Whisper and BLSTM-HMM models achieve word error rates below 14% in speaker-dependent settings. Furthermore, fine-tuning Whisper on severe dysarthria yields a 6.4 percentage point WER improvement for other severe speakers on the TORGO dataset without degrading performance on mild or moderate cases.

## Key contributions

- Leveraged a large-scale, single-speaker dataset (21.6 hours utilized out of 100 hours collected over a year) from an individual with severe athetoid cerebral palsy and ~20.9% intelligibility.
- Benchmarked both a conventional BLSTM-HMM (3.5M parameters) and English-only Whisper variants (tiny, base, small, medium) in speaker-dependent settings, proving severe dysarthria is effectively modellable.
- Demonstrated cross-speaker generalization by evaluating the fine-tuned Whisper model on the TORGO dataset, achieving consistent WER reductions (6 to 12 pp) for three out of four severe speakers.
- Conducted a data-scaling analysis showing a 58.6% relative reduction in test WER (from 25.40% to 10.52%) as training data increased from 1 to 15 hours.
- Provided a detailed phoneme error pattern analysis identifying major acoustic confusions such as widespread vowel substitutions (ao->aa) and high plosive/sonorant deletion rates.

## Problem

Prior dysarthria ASR research largely relies on datasets dominated by mild-to-moderate cases (such as UASpeech and TORGO), while modern large-scale projects like the Speech Accessibility Project and Google Project Euphonia offer limited data per speaker (around one hour). Consequently, a prevailing assumption in the field has been that severe dysarthria is too acoustically variable to model effectively. Overcoming this data-scarcity gap is critical because individuals with severe dysarthria experience the greatest need for assistive communication technologies.

## Method

The study evaluated two distinct architectures: a conventional BLSTM-HMM and OpenAI's pretrained English-only Whisper models (tiny.en, base.en, small.en, and medium.en).

The BLSTM-HMM was trained from scratch using Kaldi on 351-dimensional input feature vectors (9 frames of 13 MFCCs plus delta and delta-delta features, 25 ms frame length, 10 ms hop length). Its acoustic model featured two hidden layers with 320 LSTM cells and 200 recurrent projection units, predicting 800 senones derived from decision tree-based state tying, optimized with a bigram language model using 6 non-silence and 8 silence HMM states.

For Whisper, fine-tuning utilized 18 hours of data (sentences under 30 seconds) divided into 15 hours for training, 2 hours for validation, and 1 hour for testing. Models were trained for 15 epochs with a learning rate of 1e-5, an effective batch size of 16 (batch size 4 with gradient accumulation of 4), gradient clipping at a maximum norm of 1, and input audio normalized between -0.95 and 0.95. Decoding employed beam search with num_beams=5 and no_repeat_ngram_size=3, using an M4 Pro chip with 64 GB RAM.

## Experimental setup

Evaluated on a custom 21.6-hour single-speaker dataset (derived from Harvard sentences, MNGU0, MACHO-TIMIT, passages, and daily conversational sentences) and cross-evaluated on the TORGO dataset comprising 8 dysarthric speakers. Metrics include Word Error Rate (WER) and Phoneme Error Rate (PER). Models span BLSTM-HMM (3.5M parameters) and Whisper variants up to medium.en (769M parameters).

## Results

In speaker-dependent evaluation, the BLSTM-HMM achieved a 14.2% PER and 13.4% WER. Fine-tuned Whisper models scaled predictably with size, yielding test WERs of 28.2% (tiny), 20.2% (base), 11.4% (small), and 10.5% (medium). A scaling analysis on Whisper-medium showed test WER dropping from 25.40% to 10.52% as training data scaled from 1 to 15 hours.

On the TORGO dataset cross-speaker evaluation, fine-tuning the Whisper-medium model improved mean WER for severe speakers from 70.7% down to 64.3% (a 6.4 pp improvement), with individual gains of 6.8 pp (F01), 11.3 pp (M01), and 12.3 pp (M02). However, it failed to help speaker M04 (baseline WER > 80%, increasing by 4.8 pp) and showed negligible impact (< 1 pp) on mild and moderate speakers.

| System / Condition | Test WER (%) | TORGO Severe Mean WER (%) |
|---|---|---|
| BLSTM-HMM (Speaker-Dependent) | 13.4 | - |
| Whisper-tiny.en (Fine-Tuned) | 28.2 | - |
| Whisper-base.en (Fine-Tuned) | 20.2 | - |
| Whisper-small.en (Fine-Tuned) | 11.4 | - |
| Whisper-medium.en (Fine-Tuned) | 10.5 | 64.3 |
| Whisper-medium.en (Before FT) | 63.4 | 70.7 |

## Limitations

The speaker-dependent experiments rely on a single participant with athetoid cerebral palsy, limiting immediate claims of universal speaker-dependent transferability across different etiologies. Cross-speaker generalization fails when target speaker baseline WER exceeds roughly 80% (extreme impairment). Additionally, fine-tuning was restricted to utterances under 30 seconds due to Whisper architecture constraints, and multilingual Whisper variants yielded no validation improvements.

## Why read this

Speech researchers and engineers working on atypical speech recognition and personalized health technologies should read this paper to understand the data requirements and scaling behavior needed to successfully model severe dysarthria using modern transformer-based architectures.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice-driven assistive communication devices, silent speech interfaces, and text-to-speech pipelines for individuals with severe motor speech disorders.

## Institutions / 機構

University of Texas at Austin

**Funding / 經費:** National Institute on Deafness and Other Communication Disorders, National Institutes of Health

## Related

- (link related pages by id as the wiki grows)
