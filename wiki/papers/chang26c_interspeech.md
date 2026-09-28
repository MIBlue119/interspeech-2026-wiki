---
id: chang26c_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1296
pdf: https://www.isca-archive.org/interspeech_2026/chang26c_interspeech.pdf
---

# USAD 2.0: Scaling Representation Distillation for Universal Audio Understanding

[PDF](https://www.isca-archive.org/interspeech_2026/chang26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chang26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1296)

**TL;DR** — USAD 2.0 is a scalable universal audio encoder integrating self-supervised and supervised distillation across speech, sound, and music domains, scaling up to one billion parameters and achieving state-of-the-art performance on audio representation and LLM benchmarks.

## Problem

Most existing self-supervised audio encoders are specialized for a single domain (like speech, sound, or music) and struggle when applied universally as frontends for modern audio large language models. Furthermore, multi-domain distillation approaches have lacked comprehensive cross-domain evaluation, inclusion of music experts, or alignment with supervised audio foundation models. Addressing these gaps is critical for building robust multi-modal audio systems that generalize across diverse acoustic environments.

## Method

USAD 2.0 introduces domain-aware layer-wise knowledge distillation using three self-supervised experts (WavLM, ATSTFrame, and MuQ) covering speech, general audio, and music, with a soft-weighting factor (omega equals 10) that prioritizes domain-matched teachers while retaining cross-domain cues. It then incorporates a second stage of distillation using supervised teachers (Whisper Large-v3 and Audio Flamingo 3 AF-Whisper) to align with audio LLM targets. To scale efficiently, the architecture reduces temporal resolution via a 2-way CNN feature extractor stride from 50Hz to 25Hz and scales depth up to 48 layers (1.03B parameters) by copying and stacking layer blocks from smaller pre-trained models. The multi-domain training corpus combines 116K hours of speech, 21K hours of general audio, and 13K hours of music data.

## Results

Evaluated on HEAR, MARBLE, and XARES-LLM benchmarks, the proposed unsupervised USAD 2.0 models consistently outperform prior state-of-the-art encoders of comparable sizes (e.g., SPEAR variants). The supervised USAD 2.0+ variants achieve new top average scores across tasks, such as 84.4 on HEAR for the XXLarge+ model (1036M parameters) and strong improvements on XARES-LLM Track B understanding tasks. Ablations demonstrate that removing domain-aware distillation, the music expert, or music training data leads to significant drops in cross-domain metrics (such as a 30% relative drop in pitch classification accuracy without the music teacher). Inference efficiency evaluations show that the 25Hz framerate reduction drops real-time factor and cuts peak GPU memory usage by 20% compared to 50Hz baselines.

## Code

- https://hf.co/collections/MIT-SLS/usad2

## Applications

Audio engineers and machine learning practitioners building multi-domain audio large language models, speech recognition systems, sound event detectors, and music information retrieval pipelines.

## Limitations

Reducing temporal resolution to 25Hz slightly degrades performance on certain probing tasks compared to higher-framerate models, although it greatly improves computational efficiency.

## Related

- (link related pages by id as the wiki grows)
