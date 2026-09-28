---
id: muthu26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-696
pdf: https://www.isca-archive.org/interspeech_2026/muthu26_interspeech.pdf
---

# DysfluentNet: Joint Stuttering Event Detection and Dysfluency-Aware Transcription via Hierarchical Self-Supervised Learning

[PDF](https://www.isca-archive.org/interspeech_2026/muthu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/muthu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-696)

**TL;DR** — DysfluentNet is a hierarchical multi-task framework that jointly performs stuttering event detection and dysfluency-aware transcription from raw waveforms, achieving a 72.4 macro F1 on SEP-28k and an 18.3 dysfluency-inclusive word error rate on FluencyBank.

## Problem

Automatic speech recognition systems perform poorly on stuttered speech because they are trained on fluent corpora, while dedicated stuttering detection systems are rarely integrated with transcription pipelines. Furthermore, treating detection and transcription independently misses mutual constraints, and standard word error rates unjustly penalize models that faithfully transcribe disfluencies. This leaves a gap for unified multi-task architectures that can simultaneously assist clinical monitoring and improve voice interface accessibility for people who stutter.

## Method

The model uses a frozen WavLM-Large encoder (317M parameters, 24 layers) combined with a learned layer-wise weighted sum to extract shared representations. A multi-label detection head applies attentive statistics pooling and binary cross-entropy with focal loss to classify six dysfluency types: block, prolongation, sound repetition, word repetition, interjection, and fluent. A lightweight bidirectional LSTM decoder (2 layers, 512 units per direction) uses a stutter-aware CTC (SA-CTC) objective augmented with explicit dysfluency vocabulary tokens. Detection logits condition the transcription decoder via a cross-attention gating mechanism and an alignment consistency loss. Training follows a curriculum schedule that progressively exposes the model across five annotator-agreement tiers of SEP-28k based on Fleiss' kappa thresholds.

## Results

Evaluated on the SEP-28k dataset for detection and FluencyBank (315 utterances) for transcription, DysfluentNet achieves a macro F1 of 72.4, outperforming the best baseline (LLM-Dys) by 6.8 points with major gains in minority classes like blocks and sound repetitions. On transcription, it reaches a dysfluency-inclusive word error rate (DI-WER) of 18.3 and a standard WER of 13.8, improving over SSDM 2.0 by 4.1 points. Ablation experiments demonstrate that curriculum learning contributes 3.3 points, SA-CTC conditioning contributes 2.1 points, and swapping WavLM for wav2vec 2.0 drops macro F1 by 4.6 points.

## Code

- https://github.com/mm0718-srmist/dysfluentnet

## Applications

Speech-language pathologists and clinical researchers for automated speech therapy monitoring, and speech engineers designing accessible voice interfaces for people who stutter.

## Limitations

The framework is currently evaluated exclusively on English-language corpora, and its fixed SA-CTC alignment temporal window may not optimally fit the varying durations of different disfluency types.

## Related

- (link related pages by id as the wiki grows)
