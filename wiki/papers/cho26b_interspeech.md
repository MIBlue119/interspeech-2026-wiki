---
id: cho26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2096
pdf: https://www.isca-archive.org/interspeech_2026/cho26b_interspeech.pdf
---

# A Multimodal Semi-Supervised Framework for Automatic Construction of a Cross-Lingual Taigi Speech-Chinese Subtitle Corpus

[PDF](https://www.isca-archive.org/interspeech_2026/cho26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cho26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2096)

**TL;DR** — This paper presents a multimodal semi-supervised framework using an Audio-Visual-Language Model and iterative VLM-guided pseudo-labeling to automatically construct an 860-hour Taigi speech-Chinese subtitle corpus, reducing subtitle CER from 36.8% to 9.3%.

## Problem

Low-resource languages like Taigi lack large-scale annotated digital speech corpora, impeding modern AI development. While online audiovisual content in Taigi features hard-coded Traditional Chinese subtitles, the cross-lingual nature and lack of independent subtitle files prevent direct utilization by traditional ASR systems. Existing OCR and VLM methods for subtitle extraction suffer from visual errors or semantic hallucinations, necessitating a robust multi-modal cleaning approach.

## Method

The framework uses a trimodal Audio-Visual-Language Model (AVLM) combining SigLIP for vision, Whisper Large-V2 for audio, and Qwen2.5-7B for text, integrating embeddings via early fusion and GELU-MLP connectors, and fine-tuned using LoRA. PaddleOCR and the AVLM generate initial candidate pseudo-labels for unlabeled video segments. A Vision-Language Model (Qwen2.5-VL-7B) performs pseudo-label fusion based on CER filtering and specialized prompting that leverages the source image as ground truth. High-quality pseudo-labels are iteratively used to retrain the AVLM over multiple rounds, followed by forced alignment.

## Results

Evaluated on the PTS-Taigi dataset and a diverse 7.76-hour Golden Set benchmark, the trimodal AVLM achieved a supervised subtitle CER of 7.46%, outperforming audio-only and vision-only baselines. Through three rounds of iterative pseudo-labeling, the AVLM's subtitle recognition CER dropped from 36.8% to 9.3% on the Golden Set. Downstream fine-tuning of Whisper Large-V2 on the resulting 860-hour corpus reduced cross-lingual transcription CER from 57.8% to 37.8%, while Qwen2.5-14B translation BLEU doubled from 0.2016 to 0.4033.

## Code

- https://github.com/Speech-AI-Research-Center/taigispeech2chinese-subtitlen

## Applications

Speech and ML engineers working on low-resource speech recognition, cross-lingual speech translation, and automated web-scale corpus construction.

## Related

- (link related pages by id as the wiki grows)
