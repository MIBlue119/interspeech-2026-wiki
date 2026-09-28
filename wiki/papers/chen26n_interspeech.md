---
id: chen26n_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1217
pdf: https://www.isca-archive.org/interspeech_2026/chen26n_interspeech.pdf
---

# Formant-Guided Speech Repair for Enhanced Comprehension of Dysarthric Speech

[PDF](https://www.isca-archive.org/interspeech_2026/chen26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1217)

**TL;DR** — The paper introduces a formant-aligned spectral transformation (FAST) framework for dysarthric speech repair that achieves a 72.4% relative character error rate reduction on Mandarin and English datasets.

## Problem

Dysarthria severely degrades speech intelligibility by causing collapsed vowel spaces and non-linear acoustic distortions, which makes communication difficult. While speech-to-text ASR loses paralinguistic and voice identity cues, existing neural speech-in-speech-out reconstruction models act as black boxes that fail to explicitly repair underlying vowel-level acoustic structures. This leads to a persistent trade-off between intelligibility and naturalness, particularly in tone-sensitive languages like Mandarin.

## Method

The proposed framework combines a Dysarthria-Adapted ASR, a Formant-Aligned Spectral Transformation (FAST) module, and a Speaker-Adaptive TTS built on XTTS v2. The ASR uses a Wav2vec 2.0 front-end with a Conformer encoder and recurrent decoder trained on a hybrid CTC/cross-entropy loss. The FAST module aligns phones using the Montreal Forced Aligner, estimates F1 and F2 formants via Praat's Burg method, computes deviations against gender-specific healthy reference corpora (AISHELL-1 and TORGO), and applies a Gaussian-weighted spectral warping function regulated by a repair factor alpha. The speaker-adaptive TTS freezes its core backbone while fine-tuning the speaker encoder using an L2 loss against target speaker centroids to preserve voice identity and prosody.

## Results

Evaluated across CDSD, MDSC, MSDM, and TORGO datasets spanning Mandarin and English, the full system achieves character/word error rates ranging from 15.76% to 32.06%, outperforming baselines like DiffDSR, RnV, and a two-stage voice conversion method. Subjective listening evaluations by 18 native Mandarin listeners show over 90% gains in intelligibility, comprehension, and fluency, alongside a 60.9% reduction in listening effort. Acoustic evaluations confirm that FAST expands the vowel space area (VSA) by 10.6% and reduces the formant centralization ratio (FCR). Ablation variants demonstrate that removing either the FAST module or speaker adaptation degrades character error rates by 4% to 7% absolute.

## Code

- https://github.com/xinyu0308/FAST-SR

## Applications

Speech engineers and developers building assistive communication technologies and real-time voice restoration tools for individuals with neuromotor speech disorders.

## Limitations

The proposed system exhibits a slight trade-off resulting in a minor reduction in speaker similarity to achieve massive gains in intelligibility.

## Related

- (link related pages by id as the wiki grows)
