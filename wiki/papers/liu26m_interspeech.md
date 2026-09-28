---
id: liu26m_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1563
pdf: https://www.isca-archive.org/interspeech_2026/liu26m_interspeech.pdf
---

# MultiEmoVec: Learning Generalised Multimodal Emotion Representation by Momentum Contrast and Multi-task Reconstruction

[PDF](https://www.isca-archive.org/interspeech_2026/liu26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1563)

**TL;DR** — MultiEmoVec is an unsupervised multimodal emotion representation learning framework combining cross-modal masked and denoising reconstructions with momentum contrast, achieving a 7-class accuracy of 55.31% on CMU-MOSEI.

## Problem

Multimodal emotion recognition relies heavily on expensive, large-scale supervised annotations and struggles with noisy or incomplete real-world modalities. Existing unsupervised methods like clustering or text-anchored contrastive learning fail to handle subtle emotional expressions, missing signals, or inconsistent recording conditions. Developing generalisable representations without direct emotion labels remains a critical gap in building robust affective computing systems.

## Method

MultiEmoVec extracts features using Wav2Vec (speech, 512d), MANet (video, 1024d), and DeBERTa-large (text, 1024d). It fuses modalities via a 9-embedding transformer encoder architecture that captures both unimodal and cross-modal asymmetric dependencies. The framework employs a dual-reconstruction objective featuring 20% random masked completion for missing data and mix-up/Gaussian noise denoising for robustness. Momentum contrast (MoCo) constructs a discriminative embedding space, while an adaptive loss scaling mechanism dynamically balances contrastive and reconstruction objectives.

## Results

Evaluated on CMU-MOSEI, CMU-MOSI, and IEMOCAP. On CMU-MOSEI, it achieves 55.31% 7-class accuracy, 84.10% binary accuracy, and 89.08% binary F1 score, outperforming baseline MGAFR (52.24% Acc-7) while reducing trainable parameters to 16.28M. In cross-database transfer tests, freezing the pre-trained encoder and fine-tuning a lightweight classifier yields 38.78% Acc-7 on CMU-MOSI, 74.54% weighted F1 on 4-class IEMOCAP, and 55.70% weighted F1 on 6-class IEMOCAP. Ablations confirm that combining MoCo with both masked and denoising reconstruction produces optimal generalisation and lower variance across 10 random seeds.

## Code

- https://github.com/MaoriEnglish-Codeswitch/MultiEmoVec

## Applications

Speech and machine learning engineers building multimodal affective computing systems, emotion recognition pipelines, and human-computer interaction interfaces.

## Limitations

Cross-database transfer performance drops slightly when evaluated on datasets with substantially different recording conditions and interaction styles compared to the pre-training distribution.

## Related

- (link related pages by id as the wiki grows)
