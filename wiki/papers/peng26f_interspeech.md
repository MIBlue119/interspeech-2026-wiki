---
id: peng26f_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1799
pdf: https://www.isca-archive.org/interspeech_2026/peng26f_interspeech.pdf
---

# Cross-Lingual Speaker Verification with Self-Supervised Pre-Trained Models

[PDF](https://www.isca-archive.org/interspeech_2026/peng26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/peng26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1799)

**TL;DR** — This paper presents a cross-lingual speaker verification system built on a w2v-BERT 2.0 self-supervised front-end, achieving an equal error rate of 2.21% on partially mismatched evaluation data and 2.99% on fully unseen languages.

## Problem

Speaker verification performance severely degrades under language mismatch conditions because speaker identity becomes entangled with language-specific acoustic cues. Standard models struggle when enrollment and verification occur in different languages. Addressing this bottleneck is crucial for deploying reliable speaker recognition systems in global, multilingual environments.

## Method

The system utilizes a 580M-parameter w2v-BERT 2.0 model as a front-end feature extractor, passing hidden layers through two-layer MLP adapters to a unified 256 dimension. Layer-wise features are combined using channel concatenation, followed by an Attentive Statistics Pooling layer and an embedding projection layer producing 256-dimensional speaker embeddings. The network is optimized via a three-stage training recipe: (1) training downstream modules with a frozen PTM, (2) unfreezing and fine-tuning the entire model on a large multilingual corpus using AAM-softmax loss, and (3) large-margin fine-tuning exclusively on target-domain training data with an increased margin. Score-level fusion is also performed with auxiliary ReDimNet-B5 and ReDimNet-B6 models using Quality Measure Function calibration.

## Results

Evaluated on the TidyVoice2026 benchmark, the proposed approach is trained on a massive multilingual collection including TidyVoiceX Train, VoxCeleb2, VoxBlink2, CN-Celeb 1&2, WenetSpeech, and 3D-Speaker datasets with on-the-fly reverberation, music, noise, and babble augmentations. On the official evaluation trial lists, the fused system attains Equal Error Rates (EERs) of 2.21% on tv26 eval-A (seen enrollment languages, unseen test languages) and 2.99% on tv26 eval-U (fully unseen languages). Ablations demonstrate that w2v-BERT 2.0 outperforms XLS-R, MMS, and Whisper Large-v3, and that channel concatenation delivers the best balance of EER and parameter overhead among aggregation methods.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building global multilingual biometric security, voice authentication, and identity verification systems can use this approach to eliminate language-bias failures.

## Limitations

The approach relies on heavy large-scale foundation models (e.g., 580M parameters for w2v-BERT 2.0) requiring significant computational resources for front-end extraction.

## Related

- (link related pages by id as the wiki grows)
