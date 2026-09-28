---
id: cox26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2542
pdf: https://www.isca-archive.org/interspeech_2026/cox26_interspeech.pdf
---

# Learning task-specific subspaces via interventional post-training of speech foundation models

[PDF](https://www.isca-archive.org/interspeech_2026/cox26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cox26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2542)

**TL;DR** — This paper introduces interventional contrastive post-training to split speech foundation model representations into orthogonal content and speaker subspaces using a synthetic dataset.

## Problem

Speech foundation models trained via self-supervised learning distribute information about various speech attributes in a entangled latent space, whereas specific downstream tasks rely exclusively on subsets of this variability. Conventional contrastive learning attempts to achieve invariance to nuisance variables within a single space rather than systematically separating distinct causal factors. Addressing this requires causal disentanglement techniques, which have proven effective in image processing but remain underexplored for speech representations.

## Method

The framework takes frozen representations from base models—wav2vec 2.0, HuBERT, or WavLM—aggregates them via parameter-free mean pooling, and passes them through a 3-layer MLP projection network with 1.8M parameters and a 768-dimensional output. This output is partitioned evenly into a 384-dimensional content subspace and a 384-dimensional speaker subspace. Training optimizes a multi-part contrastive loss combined with a squared Frobenius norm orthogonality regularization term between subspaces. The training recipe utilizes a synthetic interventional dataset generated using F5-TTS with 38 speakers from LibriTTS, producing exhaustive combinations of 256 reference audios and 256 texts per subset resulting in 8,192 utterances.

## Results

The approach is evaluated on out-of-domain speaker verification using the VoxCeleb1 test set and keyword spotting using Speech Commands, comparing the proposed subspace model against frozen raw backbones and single-subspace models. The method successfully reduces cross-task interference, demonstrating that speaker and content attributes isolate effectively within their designated subspaces. Training takes under two hours on a single Nvidia A100 GPU using the AdamW optimizer for 50 epochs with a batch size of 512.

## Code

- https://github.com/mjukus/interventional-post-training-speech

## Applications

Speech engineers and researchers building modular downstream pipelines for automatic speech recognition or speaker verification who require disentangled, task-specific representations.

## Limitations

The approach relies on synthetic speech generation from a zero-shot text-to-speech model, which may introduce domain gaps compared to natural conversational speech.

## Related

- (link related pages by id as the wiki grows)
