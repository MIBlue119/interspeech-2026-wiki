---
id: zhou26h_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2280
pdf: https://www.isca-archive.org/interspeech_2026/zhou26h_interspeech.pdf
---

# FineCombo-TTS: Collaborative and Precise Controllable Speech Synthesis Using Text Descriptions and Reference Speech

[PDF](https://www.isca-archive.org/interspeech_2026/zhou26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhou26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2280)

**TL;DR** — FineCombo-TTS is a unified controllable text-to-speech framework combining reference speech and text descriptions via a Conditional Flow Matching speech variance predictor, achieving superior prosody, emotion, and timbre control accuracy compared to baseline joint-control methods.

## Problem

Existing controllable text-to-speech systems rely either on reference audio or textual prompts in isolation, and previous joint methods are loosely coupled and segregated. Furthermore, standard description datasets only describe absolute properties rather than relative variations, and natural speech exhibits strong entanglement among timbre, prosody, and emotion that makes precise control difficult without explicit disentanglement.

## Method

The model extracts a unified attribute embedding by concatenating a pretrained FACodec timbre embedding with a residual style encoder's output. A Conditional Flow Matching (CFM) Speech Variance Predictor takes this embedding and a T5 text instruction encoding to model reference-to-target attribute transformations via linear interpolation and a 1D UNet velocity field estimator. A decoder-only Transformer codec language model acts as the TTS backbone, predicting multi-layer acoustic tokens autoregressively with Descript Audio Codec (DAC) tokenization. To train relative control, the authors introduce FineEdit, a structured dataset of triplets containing source speech, relative control text descriptions, and target speech.

## Results

Evaluated on custom FineEdit test subsets against a re-implemented VoxInstruct-Joint baseline, FineCombo-TTS achieves higher subjective naturalness and instruction-following MOS scores across tasks. For prosody control, FineCombo-TTS reaches a speed controlled accuracy of 98.00% and pitch controlled accuracy of 93.33%, compared to 91.35% and 63.81% for VoxInstruct-Joint. For emotion and timbre tasks, it demonstrates higher emotion classification accuracy and speaker embedding similarity (SECS), while maintaining competitive Word Error Rates (WER around 11% to 12.87%).

## Code

- https://thuhcsi.github.io/interspeech2026-FineCombo-TTS

## Applications

Engineers building voice generation assistants, dubbing tools, or expressive dialogue systems requiring fine-grained text and reference-audio joint conditioning.

## Related

- (link related pages by id as the wiki grows)
