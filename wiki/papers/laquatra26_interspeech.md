---
id: laquatra26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1773
pdf: https://www.isca-archive.org/interspeech_2026/laquatra26_interspeech.pdf
---

# Etiology-Aware Speech Language Models for Dysarthric Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/laquatra26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/laquatra26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1773)

**TL;DR** — Integrating clinical etiology prediction directly into the autoregressive generation stream of speech language models improves dysarthric speech recognition, achieving a 7.77% Word Error Rate on the Speech Accessibility Project dataset.

## Problem

Standard automatic speech recognition systems completely ignore clinical context regarding a speaker's neurological condition, which limits their effectiveness on highly variable dysarthric speech patterns. While auxiliary clinical classification can improve encoder representations, it remains unclear how to optimally leverage this metadata to reduce transcription errors without requiring clinical labels during inference.

## Method

The authors evaluate four strategies using speech language models: standard fine-tuning, auxiliary etiology classification (EC), etiology hinting (EH) via input prompts, and etiology prediction (EP) where the model autoregressively generates the condition before the transcript. They apply LoRA with rank 16 and alpha 32 to target all linear layers of the Kimi speech language model, training for 3 epochs with a peak learning rate of 5e-5 and batch size of 64 on 4 NVIDIA A100 GPUs. In the EP approach, the etiology prefix is stripped out at inference time so that clinical labels are not needed.

## Results

Evaluated on the Speech Accessibility Project (SAP) dataset containing 240,047 training utterances across five neurological conditions, etiology prediction (EP) achieves a 7.77% Word Error Rate and a 91.05 semantic score, outperforming standard fine-tuning (8.30% WER), etiology hinting (8.22% WER), and auxiliary classification (8.49% WER). Although EC reaches a higher etiology classification accuracy of 81% compared to EP's 72%, it fails to improve transcription because the clinical signal does not enter the decoder stream. Cross-dataset zero-shot evaluation on the TORGO dataset confirms consistent generalization across conditions.

## Code

- https://github.com/MorenoLaQuatra/dysarthric-asr

## Applications

Speech engineers and developers building robust automatic speech recognition systems for individuals with speech impairments resulting from neurological conditions.

## Limitations

Performance remains constrained on conditions with severe articulatory impairments and lower training representation, such as Down syndrome and cerebral palsy.

## Related

- (link related pages by id as the wiki grows)
