---
id: pangsatabam26_interspeech
category: tts
labels: [low-resource, multilingual, dataset-or-benchmark-release, generative-model]
institutions: ["National Institute of Technology Manipur"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2304
pdf: https://www.isca-archive.org/interspeech_2026/pangsatabam26_interspeech.pdf
---

# Scalable Neural TTS for Latin-Script Low-Resource Languages of Manipur

*Hoomexsun Pangsatabam, Khumanthem Chanchanbi, Kansham Tungran Maring, Yambem Jina Chanu*

[PDF](https://www.isca-archive.org/interspeech_2026/pangsatabam26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pangsatabam26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2304)

**Category:** `tts` · **Labels:** `low-resource`, `multilingual`, `dataset-or-benchmark-release`, `generative-model`

**TL;DR** — This paper presents the first text-to-speech corpora and baseline models for two endangered, Latin-script Tibeto-Burman languages of Northeast India (Tangkhul and Maring), demonstrating that Style MelGAN substantially outperforms Griffin-Lim vocoders across objective and subjective metrics.

## Key contributions

- Constructed the first high-quality 9.58-hour monolingual TTS dataset for the Tangkhul language from studio-recorded textbooks, stories, and translations.
- Built the first 10.79-hour monolingual TTS dataset for the endangered Maring language using standardized regional dialects.
- Engineered and open-sourced an automated data processing pipeline incorporating voice activity detection, LUFS loudness normalization, and safety peak limiting.
- Trained and evaluated both autoregressive (Tacotron 2) and non-autoregressive (FastSpeech 2) character-level TTS models paired with Griffin-Lim and Style MelGAN vocoders.

## Problem

Many low-resource indigenous languages, particularly in Northeast India's hill regions, lack native scripts and rely on adapted Latin orthographies containing complex diacritics, multiple vowel variants, and tonal distinctions. Prior speech datasets largely overlook these hill tribal tongues in favor of major mainland Indic languages or focus exclusively on ASR. Standard English or cross-lingual TTS systems fail completely on these corpora because they cannot model the dense phonotactic variations, diacritics, and lexical tones inherent to Tibeto-Burman languages.

## Method

The pipeline utilizes studio-grade mono recordings captured via a Tascam DR-05X at 48 kHz, subsequently resampled to 22.05 kHz. Automated preprocessing segments the audio using a voice activity detection silence threshold of -40 dB, maintaining segment lengths between 2.0 and 8.0 seconds with a minimum silence gap of 0.2 seconds. Normalization adjusts files to an integrated target of -16.0 LUFS for stereo or -19 LUFS for mono, using a safety true peak limiter set to -1.0 dBTP to prevent clipping. Text is processed at the character level, specifically handling complex diacritics like barred-a variants.

Two baseline architectures are trained using the ESPnet toolkit: Tacotron 2 (15.32M parameters, 61.27 MB, trained for 100K iterations) featuring an autoregressive location-sensitive attention mechanism, prenet, and postnet; and FastSpeech 2 (37.10M parameters, 148.41 MB, trained for 320K iterations) utilizing a feed-forward transformer with explicit pitch (F0) and duration predictors well-suited for tonal rhythm. Vocoding is performed using either traditional Griffin-Lim or Style MelGAN (SM), which incorporates global style vectors to preserve dialectal timbre and prosodic diversity.

Training runs on a single NVIDIA Quadro RTX 5000 GPU with 16 GB VRAM under PyTorch 2.6.0 and CUDA 12.6. Out of the processed data, 250 clips each are allocated for development and evaluation sets, with the remainder used for training.

## Experimental setup

Evaluations rely on the Tangkhul (9.58h) and Maring (10.79h) datasets, utilizing 250 clips each for dev and test sets. Objective metrics include Mel-Cepstral Distortion (MCD) and F0 Root Mean Square Error (F0-RMSE), alongside subjective evaluations by native L1 raters measuring Blind MOS, Seen MOS, Intelligibility, and Naturalness. Models are implemented in ESPnet on an NVIDIA Quadro RTX 5000 GPU.

## Results

Neural Style MelGAN (SM) universally outperforms Griffin-Lim (GL), yielding roughly a 29% reduction in MCD for Tangkhul (dropping from ~11.6-11.8 down to 8.26-8.45) and over 25% for Maring (dropping from ~11.1 down to 8.31-8.89). For Tangkhul under Style MelGAN, FastSpeech 2 achieves a Blind MOS of 3.06 and Seen MOS of 3.84, outperforming Tacotron 2's Blind MOS of 2.56 and Seen MOS of 3.42. For Maring under Style MelGAN, FastSpeech 2 achieves an Intelligibility score of 4.36 and Seen MOS of 4.00, compared to Tacotron 2's Intelligibility of 3.41 and Seen MOS of 3.42. 

Performance suffers when multi-character diacritics (such as barred-a variants) are misidentified as non-silent text during segmentation, occasionally creating unintelligible utterances. Furthermore, Maring models scored lower on naturalness when raters evaluated unfamiliar regional dialects, highlighting dialectal sensitivity.

| Language | System | MCD ↓ | F0-RMSE ↓ | Blind MOS ↑ | Seen MOS ↑ | Intelli. ↑ | Nat. ↑ |
|---|---|---|---|---|---|---|---|
| Tangkhul | Taco2 + GL | 11.77 | 0.20 | 2.17 | 2.92 | 2.80 | 2.12 |
| Tangkhul | Fast2 + SM | 8.26 | 0.20 | 3.06 | 3.84 | 3.74 | 3.22 |
| Maring | Taco2 + SM | 8.89 | 0.30 | 3.22 | 3.42 | 3.41 | 4.05 |
| Maring | Fast2 + SM | 8.31 | 0.28 | 3.51 | 4.00 | 4.36 | 3.94 |

## Limitations

The datasets are restricted to single-speaker female domains with limited scale (~10 hours per language), limiting speaker diversity and expressive range. Evaluation is constrained by a lack of automatic speech recognition (ASR) systems for these languages, forcing reliance on subjective MOS for intelligibility. Furthermore, dialectal fragmentation across regions creates perceptual gaps when raters evaluate dialects that diverge from the standard textbook recording source.

## Why read this

Researchers building text-to-speech architectures for under-resourced, tonal, Latin-script minority languages will find practical data engineering recipes, VAD parameters, and loudness normalization thresholds here. It provides a rare benchmark showing how non-autoregressive models like FastSpeech 2 handle tonal phonotactics better than autoregressive baselines under tight data constraints.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Educational content generation, linguistic preservation of endangered languages, and accessibility tools for tribal communities in Northeast India.

## Institutions / 機構

National Institute of Technology Manipur

## Related

- [Towards Digital Preservation of Efik: TTS for a Low-Resource African Language](edet26_interspeech.md) — same problem · relatedness 2.3/3
- [High-Quality Speech Synthesis for Under-Resourced Ethiopian Languages](tamiru26_interspeech.md) — same problem · relatedness 2.3/3
- [IN-F5: Adapting an English TTS Foundation Model for Multilingual and Zero-Resource Indian Speech Synthesis](varadhan26_interspeech.md) — same problem · relatedness 2.1/3
- [Indigenising Speech Technology: Building a TTS Model for te Reo Māori](leoni26_interspeech.md) — same problem · relatedness 2.1/3
- [Deterministic Prompting for Speaker-Stable Low-Resource Greek TTS](syllas26_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
