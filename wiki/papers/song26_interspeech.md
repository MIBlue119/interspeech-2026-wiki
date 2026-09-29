---
id: song26_interspeech
category: tts
labels: [generative-model]
institutions: ["Anhui University"]
code: https://bigdan12.github.io/CFLOW_VC_demo/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-48
pdf: https://www.isca-archive.org/interspeech_2026/song26_interspeech.pdf
---

# CFLOW-VC: An unsupervised cycle training strategy based on normalizing flows for Voice Conversion

*FeiBao Song*

[PDF](https://www.isca-archive.org/interspeech_2026/song26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/song26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-48)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — CFLOW-VC is an unsupervised, end-to-end voice conversion framework that integrates normalizing flows into a StarGAN-style cycle training strategy to resolve train-test content-timbre mismatch, achieving a top speaker similarity (SIM) of 73.5% on clean evaluation data.

## Key contributions

- Integrates normalizing flows into a StarGAN-style adversarial training framework with explicit cycle consistency for non-parallel voice conversion.
- Explicitly models prior distributions for content and posterior distributions for acoustic features to create a structured latent space.
- Designs a specialized training loss function combining bidirectional KL divergence and cycle KL loss tailored for invertible flow models.
- Incorporates a mel-style encoder for global style features alongside WavAugment data augmentation to handle noisy and reverberant inputs.

## Problem

Non-parallel voice conversion suffers from a severe train-test mismatch because models typically train on utterances where content and timbre originate from the same speaker, failing to properly disentangle these factors during inference. Prior methods such as StarGANv2-VC lack explicit content constraints and non-end-to-end pipelines leading to artifacts, while FreeVC fails to sample a wide range of content-timbre combinations, resulting in poor generalization. Existing pitch/rhythm adjustment approaches like EAD-VC either distort voice authenticity or fail to adequately differentiate timbres.

## Method

CFLOW-VC builds upon the VITS and FreeVC end-to-end architectures, utilizing WavLM for SSL content features and a pre-trained speaker encoder for target timbre representations (gs). A mel-style encoder extracts global style features from source audio. The prior encoder outputs a prior distribution using SSL and style features, constrained by a gradient reversal layer (GRL) for speaker classification to decouple content from timbre. The posterior encoder takes linear spectrograms and speaker embeddings to compute the posterior distribution.

To address train-test mismatch, the method adopts a Cycle Training Strategy (CTS) leveraging flow invertibility. Given a target speaker reference, the inverse flow maps the prior distribution to an intermediate posterior, which is then mapped back via the forward flow to a cyclical prior. The model optimizes an objective composed of an adversarial loss via a Star discriminator, bidirectional KL losses (forward and backward KL between priors and posteriors), cycle KL loss, and a HiFi-GAN feature matching/adversarial reconstruction loss on the cyclically generated audio.

During training, data augmentation adds simulated room impulse responses (RIRs) and noise via WavAugment. The pre-training phase freezes nothing and trains the backbone for 500k steps, followed by a 200k-step CTS fine-tuning phase where posterior encoder and decoder weights are frozen.

## Experimental setup

Trained on the VCTK dataset comprising 109 speakers (400 samples each, downsampled to 16 kHz). Evaluated against DiffVC, Diff-HierVC, StarGANv2-VC, and FreeVC using LibriTTS test-clean (Clean), a noise-augmented variant (Noise), and the Speech Accent Archive (Accent). Metrics include Word Error Rate (WER), speaker similarity (SIM via eres2net cosine distance), and UTMOS. Implemented using 4 NVIDIA RTX 4090 GPUs with a batch size of 64.

## Results

On clean evaluation data, CFLOW-VC achieves a SIM of 73.5% and UTMOS of 3.948, outperforming FreeVC (65.1% SIM, 3.712 UTMOS) and DiffVC. On noisy data, CFLOW-VC maintains robust performance with a WER of 12.09%, SIM of 73.89%, and UTMOS of 3.911, substantially outperforming FreeVC's 25.04% WER and 3.143 UTMOS. Ablations demonstrate that removing the cycle training strategy (w.o CTS) causes a severe performance drop, raising clean WER from 4.96% to 14.41% and degrading UTMOS to 3.419, while removing the style encoder or data augmentation harms expressiveness and noise robustness.

| System | Clean WER(%) | Clean SIM(%) | Clean UTMOS | Noise WER(%) | Noise SIM(%) | Noise UTMOS |
|---|---|---|---|---|---|---|
| DiffVC | 23.29 | 68.86 | 3.591 | 84.89 | 60.81 | 3.178 |
| Diff-hierVC | 4.06 | 47.08 | 3.482 | 34.17 | 43.86 | 3.059 |
| StarGANv2-VC | 8.75 | 59.77 | 3.212 | 25.92 | 58.03 | 2.553 |
| FreeVC | 4.61 | 65.51 | 3.712 | 25.04 | 66.87 | 3.143 |
| CFLOW-VC | 4.96 | 73.50 | 3.948 | 12.09 | 73.89 | 3.911 |

## Limitations

Evaluated primarily on English datasets (VCTK and LibriTTS) with limited multilingual or cross-lingual testing. The framework relies on frozen pre-trained SSL extractors (WavLM) and speaker encoders, bounding its adaptability to novel acoustic domains without encoder updates.

## Why read this

Researchers building non-parallel voice conversion pipelines should read this to see how combining normalizing flow invertibility with cycle-consistency losses effectively resolves train-out-of-distribution mismatch without diffusion sampling latency.

## Code

- https://bigdan12.github.io/CFLOW_VC_demo/

## Applications

Cross-speaker voice conversion, anonymous speech generation, and personalized text-to-speech style transfer.

## Institutions / 機構

Anhui University

## Related

- (link related pages by id as the wiki grows)
