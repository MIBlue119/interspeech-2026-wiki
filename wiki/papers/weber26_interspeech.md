---
id: weber26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-296
pdf: https://www.isca-archive.org/interspeech_2026/weber26_interspeech.pdf
---

# Multilingual Word-Level Forced Alignment with Self-Supervised Representations and Learned Dynamic Programming

[PDF](https://www.isca-archive.org/interspeech_2026/weber26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/weber26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-296)

**TL;DR** — This paper presents a multilingual word-level forced alignment method combining self-supervised representations with a learned dynamic programming decoder, outperforming the Montreal Forced Aligner (MFA) and MMS-based alignment on English corpora.

## Problem

Traditional forced alignment frameworks like HMM-GMM based tools (e.g., Montreal Forced Aligner) rely heavily on grapheme-to-phoneme (G2P) conversions and language-specific lexicons, limiting flexibility. Recent end-to-end speech models provide powerful representations, but extracting precise word boundaries without fine-grained temporal supervision remains difficult. Effective multilingual alignment that scales across diverse languages without requiring language-specific training is crucial for speech technology development and linguistic research.

## Method

The system consists of an alignment encoder and a learned alignment decoder. The encoder fuses two self-supervised representations: features from an unsupervised phoneme segmentation model (UnSupSeg) capturing acoustic transitions, and emission probabilities from the Massively Multilingual Speech (MMS) model derived via CTC alignment. Several encoder architectures (VGG, Transformer, and Conformer) were evaluated, with a 16-block Conformer chosen for its robust performance and temporal modeling. The encoder is optimized via focal loss to predict frame-level word boundaries. The decoder is a learnable dynamic programming module that combines encoder outputs, boundary probabilities, and segmental features using hand-crafted scoring functions optimized iteratively.

## Results

Evaluated on TIMIT and Buckeye corpora using 80/10/10 speaker-level splits, the method achieves word alignment accuracies at a 50 ms tolerance of 91.6% on TIMIT and 86.7% on Buckeye, outperforming MFA (89.4% and 84.9%) and MMS-based alignment (75.7% and 75.0%). On unseen languages (Hebrew, German, and Dutch) using a TIMIT-trained model without fine-tuning, the approach consistently matches or exceeds baseline performance, particularly at tighter tolerances like 25 ms and 50 ms.

## Code

- https://github.com/MLSpeech/Multilingual-Word-Aligner

## Applications

Speech and ML engineers building automatic speech recognition pipelines, text-to-speech alignment tools, and phonetic analysis software for low-resource or multilingual applications.

## Limitations

Because the dynamic programming decoding step is non-differentiable, the encoder and decoder must be trained in separate stages rather than end-to-end.

## Related

- (link related pages by id as the wiki grows)
