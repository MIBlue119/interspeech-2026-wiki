---
id: tran26_interspeech
category: speech-anti-spoofing
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-628
pdf: https://www.isca-archive.org/interspeech_2026/tran26_interspeech.pdf
---

# Deepfake Word Detection by Next-token Prediction using Fine-tuned Whisper

*Hoan My Tran, Xin Wang, Wanying Ge, Xuechen Liu, Junichi Yamagishi*

[PDF](https://www.isca-archive.org/interspeech_2026/tran26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tran26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-628)

**TL;DR** — This paper proposes fine-tuning the pre-trained Whisper ASR model for simultaneous text transcription and synthetic word detection via next-token prediction, using text tokens as boundary markers. On in-domain audiobook data, the fine-tuned Whisper achieves competitive detection performance compared to a dedicated ResNet-152 model while preserving low word error rates.

## Key contributions

- Formulates deepfake word detection as a next-token prediction task by inserting specific existing tokens (<TOF> and <EOF>) around target subwords in the transcript.
- Proposes a cost-effective fine-tuning dataset curation approach using vocoded copy-synthesis (Ft.Voc) to simulate synthetic words without requiring full TTS pipelines.
- Demonstrates that fine-tuned Whisper performs on par with a dedicated ResNet-152 deepfake detector on in-domain test sets (E.Voc and E.TTS).
- Analyzes cross-domain and cross-generator limitations, revealing that current fine-tuned models experience significant performance drops under domain mismatch.

## Problem

Detecting which specific words in an audio utterance have been manipulated or synthesized (deepfake word detection) is much harder than binary utterance-level spoof detection, usually requiring complex modifications like sequential layers, attention maps, or dedicated auxiliary networks. Developing standalone detectors demands heavy data collection, full model training pipelines, and extra inference storage/compute. This work addresses the gap by asking whether existing pre-trained automatic speech recognition (ASR) models can be cheaply adapted to perform localization and transcription jointly without architectural changes.

## Method

The core architecture is the pre-trained Whisper Large (v3) Transformer encoder-decoder model without any structural modifications or custom loss functions. Instead of adding a multi-head classifier for per-token REAL/FAKE tags, the method embeds synthetic word boundaries directly into the target text token sequence. Two existing, rarely used punctuation tokens ('!!!!!!' and '~~~~~~') are repurposed as <TOF> (start of fake) and <EOF> (end of fake) markers enclosing any manipulated word subwords y_i. At inference, any transcribed words falling between these markers are flagged as synthetic.

To build the training data without relying entirely on diverse text-to-speech (TTS) systems, the authors use WhisperX to obtain word-level alignments on clean Multilingual LibriSpeech (MLS) utterances, randomly select 1 to 5 words per utterance, and replace their waveform segments using copy-synthesis via 6 different vocoders (HiFi-GAN, WaveGlow, Hn-NSF, a hybrid Hn-NSF+HiFi-GAN discriminator, WORLD, and Griffin-Lim) with an overlap-add smoothing algorithm. This yields the Ft.Voc dataset of roughly 60,000 utterances covering 5 languages (en, es, fr, it, de). A parallel TTS training set (Ft.TTS) uses 6 neural synthesisers (JETS, YourTTS, XTTS, SoVITS, CosyVoice, ElevenLabs), and a mixed set Ft.V+T combines both.

The entire Whisper model is fine-tuned end-to-end using standard next-token cross-entropy loss with a learning rate of 1e-5, a batch size of 8, and trained for 5 epochs on a single Nvidia H100 GPU. LoRA was tested but yielded no improvements.

## Experimental setup

Evaluated on audiobook test sets (E.Voc, E.TTS with 3,000 utterances each), YouTube out-of-domain data (E.AV1M with VITS/YourTTS), and studio-recorded editing attacks (E.PE using VoiceCraft and SSR-speech). Baselines include pre-trained Whisper and a dedicated ResNet-152 model trained from scratch with binary cross-entropy on mel spectrograms (evaluating 16 ms frames averaged per word). Metrics include Word Error Rate (WER), False Acceptance Rate (FAR), and False Rejection Rate (FRR).

## Results

On in-domain audiobook data (Ft.Voc -> E.Voc), fine-tuned Whisper achieves a low WER of 0.87% (vs 23.89% pre-trained), an FAR of 7.22% (vs 7.15% for ResNet-152), and an FRR of 0.52% (vs 3.81% for ResNet). On matched TTS data (Ft.TTS -> E.TTS), it reaches a 2.20% WER, 1.38% FAR, and 1.79% FRR, closely matching ResNet's 0.15% FAR and 3.13% FRR.

Ablations across cross-synthetic methods and out-of-domain test sets reveal severe generalization bottlenecks. When training on vocoded data (Ft.Voc) and testing on TTS data (E.TTS), the FAR spikes to 76.16%. Conversely, training on TTS (Ft.TTS) and testing on vocoded data (E.Voc) drives the FRR above 80% on non-English languages due to unseen language gaps. On out-of-domain evaluation (E.AV1M and E.PE), both Whisper and ResNet suffer high error rates, such as an FAR of 78.60% and FRR of 9.61% when using Ft.Voc on PartialEdit.

| System / Condition | WER (%) | FAR (%) | FRR (%) |
|---|---|---|---|
| Pre-trained Whisper (E.Voc) | 23.89 | - | - |
| Fine-tuned Whisper (Ft.Voc -> E.Voc) | 0.87 | 7.22 | 0.52 |
| ResNet-152 (Ft.Voc -> E.Voc) | - | 7.15 | 3.81 |
| Pre-trained Whisper (E.TTS) | 8.13 | - | - |
| Fine-tuned Whisper (Ft.TTS -> E.TTS) | 2.20 | 1.38 | 1.79 |
| ResNet-152 (Ft.TTS -> E.TTS) | - | 0.15 | 3.13 |

## Limitations

The primary limitation is poor cross-domain and cross-generator generalization; models trained on audiobook vocoded data fail heavily when evaluated on out-of-domain studio or YouTube data (e.g., E.PE and E.AV1M). Furthermore, training on vocoded data fails to generalize to neural TTS artifacts, and training on specific TTS systems causes high false rejection rates on unseen languages. The evaluation is restricted to English for advanced editing datasets and relies on hard-decision token boundaries.

## Why read this

Speech and ML engineers looking to build resource-efficient multi-task speech models will learn how to seamlessly repurpose standard ASR architectures for deepfake localization without architectural overhead. Researchers will find the rigorous cross-domain and cross-generator failure analysis a critical reality check for deploying anti-spoofing models in the wild.

## Code

- https://github.com/nii-yamagishilab/Whisper-deepfake-word-detection

## Applications

Real-time moderation of transcribed audio streams, forensic verification of spoken media, and defense against LLM-based speech editing attacks in conversational assistants.

## Related

- (link related pages by id as the wiki grows)
