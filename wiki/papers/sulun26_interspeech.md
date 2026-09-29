---
id: sulun26_interspeech
category: paralinguistics-emotion
labels: [efficient-on-device]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/sulun26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/sulun26_interspeech.pdf
---

# Lightweight Emotion Recognition with Disjoint Modality Fusion

*Serkan Sulun*

[PDF](https://www.isca-archive.org/interspeech_2026/sulun26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sulun26_interspeech.html)

**Category:** `paralinguistics-emotion` · **Labels:** `efficient-on-device`

**TL;DR** — Light-DMF is a lightweight speech emotion recognition model with fewer than 65k trainable parameters that performs disjoint and fused audio-text emotion classification at faster-than-real-time speeds on a single CPU.

## Key contributions

- Proposes a disjoint modality fusion architecture that handles audio-only, text-only, or multimodal inputs—even with conflicting emotional labels—within a single minibatch via learned sentinel vectors.
- Eliminates separate ASR overhead by directly probing Whisper's internal audio encoder activations to simultaneously derive speech features and text.
- Achieves an ultra-lightweight footprint of under 65k trainable parameters by leveraging frozen Distil-Whisper and MiniLM backbones with low-dimensional projections (dim=32, 4 heads).
- Delivers faster-than-real-time inference (real-time factor of 0.81 on a CPU-only Intel Core i7 for 1 minute of audio).

## Problem

Standard speech emotion recognition (SER) models rely on large-scale multimodal architectures and separate automatic speech recognition (ASR) pipelines, resulting in massive computational overhead that hinders deployment on consumer hardware. Furthermore, real-world acoustic tone and textual content often diverge (as in sarcasm or irony), but existing fusion models struggle when acoustic and linguistic emotional cues conflict. Traditional datasets also vary wildly in modality availability—some provide paired audio and text, while others are strictly audio-only or text-only—making it difficult to train unified models across heterogeneous data sources.

## Method

Light-DMF uses a frozen Distil-Whisper-large-v3 audio encoder and an all-MiniLM-L6-v2 text encoder to extract temporal feature sequences. To handle mixed-modality training, four learned sentinel vectors (audio-present, audio-absent, text-present, text-absent) are prepended to sequences, with missing modalities zero-padded and masked out in attention layers. The features are projected via single linear layers and layer normalization to a low dimensionality of 32 with 4 attention heads.

The architecture includes independent self-attention branches for text and audio, alongside a unidirectional audio-to-text cross-attention module where text is treated as the primary modality and audio as auxiliary. Text keys and values are shared across modules to minimize complexity, while separate audio queries permit selective attention. The model maintains disjoint classification paths for audio and text to remain robust against conflicting cues, plus a fusion head that concatenates all attention outputs for samples where modalities agree. The system outputs three predictions (audio-only, text-only, fusion), optimized via cross-entropy loss weighted equally (1/3 each) for available modalities, with a 0.1 probability of randomly dropping one modality during training to regularize the sentinel vectors.

During inference, Whisper processes audio in a single forward pass to generate features and timestamped transcripts, enabling parallel per-sentence processing. Emotion labels across disparate datasets (IEMOCAP, MELD, CREMA-D, RAVDESS, TESS, GoEmotions) are mapped to five unified classes: angry, excited, happy, neutral, and sad.

## Experimental setup

The model is trained on a mixture of datasets including IEMOCAP, MELD, CREMA-D, RAVDESS, TESS, and GoEmotions. Implementation is done in PyTorch on a single NVIDIA A100 80GB PCIe GPU. Inference performance is benchmarked on a CPU-only Intel Core i7-5600U with 16 GB RAM.

## Results

Light-DMF achieves a real-time factor of 0.81 on CPU-only hardware for 1 minute of audio using fewer than 65k trainable parameters. The paper primarily establishes feasibility, architectural flexibility for mixed-modality inputs, and computational efficiency rather than outperforming massive models on standard benchmark leaderboards.

## Limitations

The model is evaluated primarily on architecture design, efficiency, and flexibility rather than pushing state-of-the-art accuracy boundaries on large benchmarks. The output emotion categories are restricted to five coarse classes (angry, excited, happy, neutral, sad) due to label mapping across heterogeneous datasets. The evaluation focuses heavily on CPU efficiency and handling missing modalities rather than fine-grained cross-lingual or low-resource language performance.

## Why read this

Speech and ML engineers looking to deploy real-time emotion recognition on resource-constrained edge or consumer hardware without heavy ASR pipelines will find this architecture design extremely valuable.

## Code

- https://sulun.org/lightdmf

## Applications

Real-time speech emotion recognition on consumer hardware, healthcare monitoring, educational tools, and multimedia analysis.

## Institutions / 機構

INESC TEC, University of Porto

## Related

- (link related pages by id as the wiki grows)
