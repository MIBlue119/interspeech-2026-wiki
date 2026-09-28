---
id: bouziane26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3350
pdf: https://www.isca-archive.org/interspeech_2026/bouziane26_interspeech.pdf
---

# Learning Multiple Utterance-Level Attribute Representations with a Unified Speech Encoder

[PDF](https://www.isca-archive.org/interspeech_2026/bouziane26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bouziane26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3350)

**TL;DR** — This paper proposes a unified multi-task post-training framework that enables a single speech foundation model to jointly generate multiple utterance-level attributes—specifically semantic and speaker representations—without performance degradation.

## Problem

Current post-training approaches align speech foundation models exclusively with text-based semantic embeddings to support multilingual and multimodal applications. However, this optimization strips away paralinguistic details such as speaker identity, emotion, and speaking style. Developing a unified architecture capable of preserving multiple distinct utterance-level attributes simultaneously is crucial for building versatile speech foundation models.

## Method

The architecture builds upon a shared, pretrained w2v-BERT 2.0 speech encoder (8,250 hours of Common Voice 19 across 83 languages) paired with task-specific projection branches. Frame-level representations from all encoder layers are dynamically combined via learnable, softmax-normalized interpolation weights and layer normalization. An attribute-specific attention pooling mechanism then aggregates the sequence into a single vector, which is projected and L2-normalized. Training utilizes a multi-task teacher-student knowledge distillation objective maximizing cosine similarity against frozen teacher models: BGE-M3 for multilingual semantic embeddings and an ECAPA-TDNN model trained on VoxCeleb 1 and 2 for speaker embeddings.

## Results

Evaluated on multilingual speech retrieval, speech-to-text translation retrieval, and speaker verification. On VoxPopuli speech-to-speech retrieval, the multi-task model (Att(sem+spk)) achieves Recall@1 scores very close to the single-task semantic baseline Att(sem) (e.g., fr-en 95.94 vs 96.55) and consistently outperforms Meta's SONAR. On VoxCeleb1-O speaker verification, the multi-task model achieves an EER of 0.1253 and a MinDCF of 0.4497 (or similar as reported), performing competitively against dedicated single-task speaker models like Att(spk) (EER 0.1104) and ECAPA-TDNN (EER 0.09).

## Code

- https://github.com/speechbrain/speechbrain/tree/develop/recipes/CommonVoice/SENSE

## Applications

Speech and ML engineers building downstream systems that require both cross-lingual semantic understanding and speaker verification from a single shared audio embedding.

## Limitations

Evaluated exclusively on semantic and speaker attributes, leaving the integration of additional paralinguistic features like emotion or accent for future work.

## Related

- (link related pages by id as the wiki grows)
