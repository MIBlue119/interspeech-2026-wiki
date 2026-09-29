---
id: murata26_interspeech
category: tts
labels: [generative-model]
institutions: ["CyberAgent", "Nagoya University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-208
pdf: https://www.isca-archive.org/interspeech_2026/murata26_interspeech.pdf
---

# Exploring Pre-training Benefits on Phoneme Addition through Fine-tuning in Speech Synthesis

*Masato Murata, Koichi Miyazaki, Tomoki Koriyama, Tomoki Toda*

[PDF](https://www.isca-archive.org/interspeech_2026/murata26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/murata26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-208)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — This study investigates whether pre-trained phoneme knowledge helps text-to-speech models learn unseen phonemes during fine-tuning ("phoneme addition"), finding that while fine-tuning improves naturalness, it offers limited benefit for phoneme error rate compared to training from scratch.

## Key contributions

- Introduces LLM-generated phoneme-controlled corpora (using Claude Opus 4.6 and espeak-ng filtering) that isolate the phoneme addition process from confounding factors like language mismatch and domain shifts.
- Compares fine-tuning and scratch training across data sizes (100 to 2,000 utterances) and target phoneme types (plosives, front vowels) in a controlled simulation.
- Validates simulation findings in a real-speech cross-lingual transfer setting from English (VCTK) to Japanese (JSUT, adding 20 Japanese-specific phonemes).
- Reveals that fine-tuning requires equal or more data than scratch training to achieve comparable target phoneme error rates (PER), proving pre-training does not accelerate new phoneme acquisition.

## Problem

Transfer learning is standard for low-resource text-to-speech, but target languages often require expanding the phoneme inventory with unseen target phonemes. Prior studies assumed that pre-trained linguistic and acoustic knowledge directly benefits this "phoneme addition" process, typically handling unseen phonemes via phoneme mapping or random initialization of new embeddings. However, prior work only reported overall naturalness gains without isolating whether pre-trained phoneme knowledge actually aids the acquisition of new phonemes versus improving general acoustic generation.

## Method

The study employs the Conformer-FastSpeech2 (CFS2) architecture from ESPnet configured with speaker ID conditioning (instead of x-vectors) for pre-training, dropping speaker conditioning and reducing the learning rate to 10% of its original value during fine-tuning. The phoneme inventory is expanded by adding unseen target phonemes with newly initialized random embeddings. Waveform generation relies on a pre-fastspeech vocoder (HiFi-GAN trained on VCTK).

Two experimental setups are used: (1) A simulated phoneme-controlled setup using Claude Opus 4.6 to generate 3-15 word English sentences matching VCTK statistics. A "Limited" pre-training corpus (107k utterances, 55 hours from 107 speakers) excludes specific target phonemes (plosives or front vowels), while a "Full" fine-tuning corpus contains all 40 phonemes. (2) A real-speech cross-lingual transfer setup using the 44-hour English VCTK corpus for pre-training and a 10-hour subset of the Japanese JSUT dataset for fine-tuning, expanding the base 40 English phonemes with 20 Japanese-specific target phonemes.

Inference uses the fine-tuned or scratch models to synthesize audio from unseen test text, evaluated via wav2vec 2.0-based phoneme recognition models to compute Target PER and pre-trained UTMOS for perceptual naturalness.

## Experimental setup

Simulated pre-training used 107,000 utterances (55 hours); fine-tuning used 100 to 2,000 utterances. Real-speech cross-lingual transfer used English VCTK (44 hours, 108 speakers) for pre-training and Japanese JSUT basic5000 (10 hours, single speaker) for fine-tuning. Baselines compared fine-tuning against models trained entirely from scratch on the target data. Metrics include Target PER (calculated solely on newly added phonemes using a wav2vec 2.0 recognizer) and UTMOS scores (simulating MOS naturalness).

## Results

Across both simulated and real-speech cross-lingual settings, training from scratch consistently achieved comparable or lower Target PER than fine-tuning across all data sizes (100-2,000 utterances). For instance, in the real-speech English-to-Japanese transfer, scratch training outperformed fine-tuning on Japanese-specific phoneme accuracy regardless of whether 100 or 2,000 target utterances were used.

Conversely, fine-tuning decisively won on perceptual naturalness. In low-resource conditions (100 to 500 utterances), fine-tuning consistently achieved higher UTMOS scores than scratch training, demonstrating that pre-training primarily transfers generalized acoustic and prosodic quality rather than phoneme addition capability. Spectrogram analysis revealed that scratch training learns all phonemes jointly without constraints, whereas fine-tuning struggles to carve out new phoneme representations while preserving previously learned ones.

## Limitations

Evaluated exclusively on Conformer-FastSpeech2 and HiFi-GAN pipelines, leaving open whether end-to-end speech LLMs or discrete-token neural codecs exhibit different phoneme addition dynamics. The cross-lingual scope is limited to a single language pair (English-to-Japanese), and simulation experiments rely on synthetic text and synthetic speech corpora. The study did not test auxiliary losses designed specifically to regularize or encourage new phoneme learning during fine-tuning.

## Why read this

Speech researchers and engineers building low-resource or cross-lingual TTS systems should read this to recalibrate expectations around transfer learning. It provides rigorous proof that pre-training does not magically solve new phoneme acquisition, shifting the focus toward developing specialized auxiliary objectives or broader inventory initializations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-resource text-to-speech development, cross-lingual voice adaptation, and building TTS systems for endangered or under-resourced languages with unique phonetic inventories.

## Institutions / 機構

CyberAgent, Nagoya University

**Funding / 經費:** JSPS KAKENHI, BRIDGE Program

## Related

- [FlowEdit: Associative Memory for Lifelong Pronunciation Adaptation in Flow-Matching TTS](singh26c_interspeech.md) — same problem · relatedness 2.4/3
- [Rethinking Speech Foundation Model Fine-tuning: Better SFT or Better Match?](zhou26i_interspeech.md) — shared technique · relatedness 1.9/3
- [Gender Bias in ASR: A Controlled Study of Gender Composition Across Training Paradigms](s26_interspeech.md) — shared technique · relatedness 1.8/3
- [Pretrained self-supervised speech models can recognize unseen consonants](taguchi26_interspeech.md) — shared technique · relatedness 1.8/3
- [High-Quality Speech Synthesis for Under-Resourced Ethiopian Languages](tamiru26_interspeech.md) — shared technique · relatedness 1.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
