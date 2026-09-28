---
id: bagat26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2422
pdf: https://www.isca-archive.org/interspeech_2026/bagat26_interspeech.pdf
---

# Synthetic Audio Generation Framework for Air Traffic Control Speech Recognition

*Raphaël Bagat, Zhe Zhang, Junichi Yamagishi, Irina Illina, Emmanuel Vincent*

[PDF](https://www.isca-archive.org/interspeech_2026/bagat26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bagat26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2422)

**TL;DR** — This paper presents a generative data augmentation pipeline for Air Traffic Control (ATC) automatic speech recognition that uses Text-to-Speech, Voice Conversion, and a novel L1-to-L2 accent conversion module to overcome severe domain data scarcity. When combined with real data, fine-tuning Whisper-small on this synthetic data improves word error rate over real-data-only baselines.

## Key contributions

- Proposes a comprehensive generative augmentation pipeline for ATC incorporating TTS, voice conversion, accent conversion, and ATC acoustic simulation.
- Introduces a novel controllable L1-to-L2 accent conversion framework by repurposing and fine-tuning the TokAN architecture to simulate diverse non-native accents.
- Applies ATC-specific acoustic simulation (AAS) including band-pass filtering, 200 Hz high-pass filtering, and realistic radio noise mixing.
- Demonstrates that augmenting a limited real dataset (1h 12m) with synthetic L1-to-L2 data or TTS with AAS yields statistically significant WER reductions over real-only fine-tuning.

## Problem

Automatic speech recognition systems experience significant performance drops in safety-critical domains like Air Traffic Control due to domain-specific phraseology, rapid speech rates, severe radio channel noise, and a scarcity of transcribed real training data. Traditional data augmentation methods (speed perturbation, pitch shifting, SpecAugment) only perform linear transformations or spectral masking, which fails to simulate complex linguistic variations like non-native (L2) English accents. While prior work utilizes L2-to-L1 accent normalization to make speech easier to recognize, L1-to-L2 accent conversion remains largely unexplored for generating diverse training signals in data-scarce domains.

## Method

The pipeline starts by cleaning and upsampling real ATC recordings (typically sampled at 8 kHz) using the speech-environment separation module from DAIEN-TTS and AudioSR super-resolution to 16 kHz. Transcriptions from real ATC data are then fed into multiple generative paths: F5-TTS (a flow-matching diffusion Transformer) to generate L1 speech via voice cloning; kNN-VC for diverse speaker identity conversion using L2-ARCTIC reference speakers; and TokAN for accent conversions.

The novel L1-to-L2 accent conversion framework fine-tunes pre-trained TokAN components—specifically the token conversion module and token-to-mel synthesizer—using discrete HuBERT units. The token conversion module maps input L1 tokens (derived from TTS) to target L2 tokens, conditioned on an accent embedding extracted from target L2 speech, with the CTC loss weight reduced to 0.2 to allow greater phonetic variability. The token-to-mel synthesizer is adapted to generate Mel-spectrograms featuring a radio-like filter.

Finally, ATC acoustic simulation (AAS) is applied to all synthetic samples by downsampling to 8 kHz, upsampling to 16 kHz, applying a 200 Hz high-pass filter, and mixing in the background noise track extracted from the corresponding real utterance during speech separation. Hallucinated synthetic outputs are automatically filtered out by transcribing with Whisper-large-v3-turbo and discarding samples with a relative WER exceeding 50% (removing roughly 35% of generated audio).

## Experimental setup

Experiments use the ATCO2 dataset, utilizing 4 hours of human-transcribed speech evaluated via 4-fold cross-validation (1h 12m for accent conversion fine-tuning, 1h 12m for ASR fine-tuning, 36m validation, 1h test). The target ASR model is Whisper-small, fine-tuned for 20 epochs with a learning rate of 1e-5 and batch size of 16 using a 50/50 mix of real and synthetic data. Fine-tuning models takes approximately 3 hours for single data types and 6 hours for mixed data on a single NVIDIA A100 GPU.

## Results

The out-of-the-box Whisper-small baseline yields a high 63.32% WER, which drops to 22.69% when fine-tuned exclusively on the 1h 12m of real ATCO2 data. When fine-tuning Whisper on a 50/50 mixture of real and synthetic data, the proposed L1-to-L2 accent conversion strategy achieves the headline best WER of 21.64%, outperforming real-data-only fine-tuning. In the synthetic-only fine-tuning regime, kNN-VC alone achieves the strongest result at 24.18% WER with AAS (compared to 26.46% without AAS), demonstrating that speaker and acoustic diversity are crucial. Conversely, mixing L2-to-L1 normalized speech with real data degrades performance (25.92% WER), indicating that adding a single normalized accent is less effective than expanding accent diversity via L1-to-L2 conversion.

| System / Condition | WER (%) [Synth-only] | WER (%) [Real+Synth] |
|---|---|---|
| Out-of-the-box Whisper-small | 63.32 | - |
| Fine-tuned with Real Data only | - | 22.69 |
| TTS + AAS | 33.77 | 21.69 |
| kNN-VC + AAS | 24.18 | 22.54 |
| L1-to-L2 AC + AAS (Target: L2-ARCTIC + VC) | 33.84 | 22.00 |
| L1-to-L2 AC + AAS (Target: L2-ARCTIC) | 32.96 | 22.16 |

## Limitations

The study is scoped to a small real data scale (only 4 hours of transcribed ATCO2 data evaluated via 4-fold cross-validation). The proposed L1-to-L2 accent conversion pipeline requires a quality filtering step that discards roughly 35% of generated samples due to hallucinations. Furthermore, the evaluation is restricted to Whisper-small and does not assess larger foundation models or perform granular per-accent intelligibility breakdowns.

## Why read this

Speech researchers and ML engineers tackling low-resource or safety-critical domains with heavy accent and channel variability will learn how to build controllable L1-to-L2 synthetic data pipelines. It provides clear empirical evidence that increasing accent diversity via generative conversion outperforms traditional accent normalization for downstream ASR.

## Code

- https://gitlab.inria.fr/rbagat/atc_generation

## Applications

Automatic speech recognition for aviation, safety-critical radio communication systems, and low-resource domain adaptation for accented speech.

## Related

- (link related pages by id as the wiki grows)
