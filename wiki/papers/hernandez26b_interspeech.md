---
id: hernandez26b_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2735
pdf: https://www.isca-archive.org/interspeech_2026/hernandez26b_interspeech.pdf
---

# Multilingual Phonological Feature Recognition with Self-Supervised Speech Models

[PDF](https://www.isca-archive.org/interspeech_2026/hernandez26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hernandez26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2735)

**TL;DR** — PhonoQ-2.0 is a multilingual frame-level phonological feature recognizer built on self-supervised speech models that directly predicts a structured 22-dimensional feature vector, achieving an average macro-F1 of 91.3% in-domain.

## Problem

Current speech pipelines typically rely on phoneme recognition and derive phonological properties via deterministic post-hoc mapping, which fails to explicitly model articulatory and phonological structure. This indirect strategy limits cross-lingual generalization and robustness. Explicitly modeling phonological features as language-general representations can improve performance under domain and language shifts.

## Method

PhonoQ-2.0 uses a frozen multilingual wav2vec 2.0 encoder (XLSR-ft) followed by a linear projection, a 2-layer Conformer encoder with relative position bias, and four parallel cross-entropy classification heads predicting manner, vowel properties, place, and voicing. A key design choice is a manner-conditioned gating mechanism that restricts vowel and place predictions to valid, phonologically coherent manner classes. The system is trained jointly across languages using AdamW with separate learning rates for the encoder and heads, label smoothing, class weighting, and MFA-aligned frame labels converted to 50 fps.

## Results

Evaluated on four languages (English, German, Spanish, Czech) spanning ~52-56 hours of training data each, PhonoQ-2.0 is compared against a strong CTC-Phoneme baseline mapped to the same 22-dimensional feature space. In in-domain CommonVoice evaluation, PhonoQ-2.0 achieves an average macro-F1 of 91.3% compared to 82.5% for the CTC baseline (+8.8 F1 gain). Under out-of-domain evaluation on FLEURS and VoxPopuli, it scores 89.9% and 87.8% F1 respectively, outperforming the baseline by +9.3 and +7.8 points. In zero-shot transfer to unseen languages (French, Italian, Russian), PhonoQ-2.0 improves average macro-F1 from 66.9% to 73.6%, with gains up to +10.8 points.

## Code

- https://github.com/abnerLing/PhonoQ-2.0

## Applications

Speech and ML engineers working on multilingual speech processing, cross-lingual transfer, pathological speech analysis, and phonetic evaluation can use this tool for robust, language-general articulatory feature extraction.

## Related

- (link related pages by id as the wiki grows)
