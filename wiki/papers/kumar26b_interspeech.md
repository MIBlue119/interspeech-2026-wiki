---
id: kumar26b_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-670
pdf: https://www.isca-archive.org/interspeech_2026/kumar26b_interspeech.pdf
---

# ML-KD-DRI-GAN: Teacher-Guided Denoising and Triplet-Adversarial Training for Robust Spoken Language Understanding

[PDF](https://www.isca-archive.org/interspeech_2026/kumar26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kumar26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-670)

**TL;DR** — The paper introduces ML-KD-DRI-GAN, an adversarial teacher-guided denoising framework that improves spoken language understanding under noisy ASR conditions, achieving up to 6.46% absolute accuracy gains.

## Problem

Spoken language understanding pipelines are highly vulnerable to transcription errors introduced by ASR front-ends, which distort semantic representations and degrade downstream intent classification. Existing representation alignment methods primarily focus on deterministic encoders or surface text without explicit multi-level denoising and task-level decision boundary transfer. This creates a severe distribution mismatch between clean training transcripts and noisy inference inputs, especially in low-resource contexts.

## Method

The framework utilizes a BERT encoder paired with a multi-level teacher-student adversarial architecture. A teacher model is first trained exclusively on clean transcripts using an autoencoder-based generator (768-512-256-512-768 MLP) and a discriminator, then frozen. The student model processes noisy ASR transcripts through a student generator, employing multi-level latent alignment (output-level and bottleneck-level cosine distance) and a synthetic generator for hard negatives. Additionally, Bi-discriminator cooperative distillation (Bi-DCD) transfers structural feature knowledge and class logits from the teacher discriminator to the student discriminator, combined with a triplet-based metric learning loss.

## Results

Evaluated on the SLURP dataset with moderate (25% WER via Google Web API) and severe (60% WER via Wav2Vec 2.0) noise levels, ML-KD-DRI-GAN achieves intent classification accuracies of 86.99% and 73.56%, outperforming the GAN-BERT baseline by absolute margins of 4.49% and 6.46%, respectively. Ablation studies confirm that sequentially adding generator-side latent alignment, discriminator-side distillation, and triplet loss brings steady performance improvements. Experiments were conducted using 32 batch sizes on NVIDIA A100 GPUs averaged over five runs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building modular spoken language understanding systems, intent detection pipelines, and voice assistants that must operate reliably over error-prone ASR outputs.

## Limitations

The authors note that future work is needed to explore generalization across more diverse real-world acoustic conditions and alternative ASR systems.

## Related

- (link related pages by id as the wiki grows)
