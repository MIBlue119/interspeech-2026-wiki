---
id: wu26j_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2037
pdf: https://www.isca-archive.org/interspeech_2026/wu26j_interspeech.pdf
---

# AuscuTSLM: Patient-Level Multimodal Question Answering from Multi-Site Auscultation Recordings

[PDF](https://www.isca-archive.org/interspeech_2026/wu26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2037)

**TL;DR** — AuscuTSLM aligns multi-site physiological auscultation recordings directly with a frozen LLM via gated cross-attention, achieving a state-of-the-art 0.865 F1-macro and 0.952 BERTScore on the CaReSound benchmark.

## Problem

Traditional machine learning approaches for auscultation analysis rely on isolated binary classification, reducing complex physiological waveforms to discrete labels and ignoring contextual nuance. Furthermore, existing audio-language models (ALMs) struggle with subtle, noise-obscured pathological patterns in medical acoustics and typically fail to handle multi-site recordings or long temporal durations. Addressing these gaps is vital to enable flexible, open-ended clinical question answering and patient-level assessment from stethoscopic data.

## Method

The framework utilizes a 1.4B parameter model built on a frozen Meta-LLaMA-3.2-1B backbone, fusing multi-site auscultation audio (up to 30 seconds) via gated cross-attention layers. Input waveforms are processed through a RawAudioTokenizer (or alternative encoders like Mel-Spectrogram, CLAP, Whisper, or Wav2Vec2) using 40 ms patches and 1D convolutions, followed by an MLP projector. To handle multi-instance learning across heterogeneous anatomical sites, a Perceiver Resampler compresses variable numbers of recordings into a fixed set of latent queries. The model is trained using the AdamW optimizer with component-specific learning rates on patient-disjoint splits of the CaReSound dataset.

## Results

Evaluated on the CaReSound benchmark containing 2,951 patients and 32,577 QA pairs, AuscuTSLM outperforms foundational ALMs and the CaReAQA baseline, achieving a 42.6% ContainsMatch accuracy, 0.673 ROUGE-L, 0.643 METEOR, 0.952 BERTScore, and 0.865 F1-macro on binary tasks. Ablation studies comparing audio front-ends reveal that lightweight raw waveform tokenizers rival large-scale pretrained encoders such as Wav2Vec2 and Whisper. Temporal context evaluations demonstrate that performance degrades gracefully when truncating audio duration from 30 seconds down to 10 seconds, benefiting from spatial redundancy across multi-site aggregation.

## Code

- https://github.com/Fan-loewe/AuscuTSLM

## Applications

Clinicians and healthcare engineers can use this framework for automated, patient-level diagnostic reasoning, telehealth screening, and open-ended clinical question answering based on heart and lung auscultation recordings.

## Limitations

The reliance on deep learning black-box representations requires rigorous clinical validation to mitigate dataset biases and ensure explainability.

## Related

- (link related pages by id as the wiki grows)
