---
id: hernandez26b_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2735
pdf: https://www.isca-archive.org/interspeech_2026/hernandez26b_interspeech.pdf
---

# Multilingual Phonological Feature Recognition with Self-Supervised Speech Models

*Abner Hernandez, Tomás Arias-Vergara, Daiqi Liu, Andreas Maier, Paula Andrea Pérez-Toro*

[PDF](https://www.isca-archive.org/interspeech_2026/hernandez26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hernandez26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2735)

**TL;DR** — PhonoQ-2.0 is a multilingual frame-level phonological feature recognizer that directly predicts a structured 22-dimensional articulatory vector from self-supervised speech representations, outperforming strong phoneme-to-feature baselines by an average of +8.8 macro-F1 in-domain.

## Key contributions

- A multilingual phonological recognizer predicting a structured feature inventory (manner, vowel, place, voicing) directly from speech rather than via post-hoc phoneme mapping.
- A manner-conditioned gating mechanism that enforces valid feature group activation, ensuring phonologically coherent and interpretable outputs.
- Systematic evaluation across in-domain, cross-corpus out-of-domain (FLEURS, VoxPopuli), and zero-shot unseen-language (French, Italian, Russian) transfer conditions.
- Direct empirical comparison against a strong CTC phoneme baseline utilizing the identical pretrained self-supervised acoustic backbone.

## Problem

Standard downstream speech pipelines derive phonological features indirectly through deterministic phone-to-feature mappings applied to predicted phoneme sequences. This phoneme-first strategy fails to explicitly model internal articulatory structures and dependencies, leading to suboptimal cross-lingual and cross-domain generalization. While self-supervised models implicitly encode phonological structure, monolingual or independent-label formulations do not fully leverage this grounding. Addressing this gap matters for tasks requiring fine-grained phonetic precision, such as clinical speech analysis, pronunciation assessment, and low-resource speech processing.

## Method

PhonoQ-2.0 uses a pretrained multilingual wav2vec 2.0 encoder (XLSR-ft, 24 Transformer layers frozen) as its acoustic backbone, matching the CTC-Phoneme baseline. On top of the backbone, it applies a shared linear projection followed by a 2-layer Conformer (hidden dimension d = 512, 4 attention heads) equipped with relative position bias. Four parallel classification heads predict a 22-dimensional phonological vector per frame: manner (9-way), vowel height and backness (6-way), place (5-way), and voicing (2-way). Cross-entropy losses are computed across all heads.

To ensure phonetic validity, a manner-conditioned gating mechanism restricts vowel and place predictions exclusively to compatible manner classes (e.g., vowel features are only activated for vowel manner classes). Frame-level labels are sourced from Montreal Forced Aligned (MFA) TextGrids sampled at 50 fps. During inference, frame-level logits within non-silence phone intervals are summed and resolved via head-wise argmax to yield segment-level 22-dimensional vectors.

Optimization uses AdamW with an encoder learning rate of 1e-5, head learning rate of 1e-3, weight decay of 0.01, gradient clipping of 0.5, and label smoothing of 0.05. Models are trained for up to 40 epochs with a batch size of 16, utilizing early stopping based on development macro-F1.

## Experimental setup

Experiments cover four languages across three families: Germanic (English, German), Romance (Spanish), and Slavic (Czech), with ~52 to 56 hours of training data per language combining CommonVoice, CommonPhone, LibriSpeech, TIMIT, Carina, and ParlaSpeech. In-domain evaluation uses test partitions from CommonVoice/CommonPhone, while out-of-domain testing uses official FLEURS and VoxPopuli test splits. Unseen-language zero-shot evaluation tests French, Italian, and Russian. Baselines include a CTC phoneme recognizer (CTC-Phoneme) using the same XLSR-ft backbone and post-hoc mapping, as well as the original PhonoQ architecture.

## Results

In-domain, PhonoQ-2.0 achieves an average macro-F1 of 91.3%, outperforming the mapped CTC-Phoneme baseline (82.5%) by +8.8 F1, with language-specific gains ranging from +7.3 in Czech to +11.6 in English (where baseline PER was highest at 9.52%). Out-of-domain, PhonoQ-2.0 maintains strong advantages, leading by +9.3 F1 on FLEURS (89.9% vs. 80.6%) and +7.8 F1 on VoxPopuli (87.8% vs. 80.0%).

In zero-shot cross-lingual transfer to unseen languages (French, Italian, Russian), PhonoQ-2.0 improves average macro-F1 from 66.9% to 73.6% (+6.7 points), with Italian showing gains up to +10.8 F1. Comparisons against the original PhonoQ restricted to 12 shared dimensions show substantial superiority (e.g., German VoxPopuli macro-F1 jumps from 64.9% to 83.9%).

| Language | Corpus | CTC-Phoneme (PER %) | CTC-Phoneme (Avg F1 %) | PhonoQ-2.0 (Avg F1 %) |
|---|---|---|---|---|
| Czech | In-Domain (CP) | 8.68 | 84.0 | 91.3 |
| Czech | FLEURS | 17.7 | 80.4 | 89.7 |
| German | In-Domain (CP) | 5.50 | 81.8 | 90.6 |
| German | FLEURS | 9.1 | 79.7 | 87.6 |
| English | In-Domain (CP) | 9.52 | 78.4 | 90.0 |
| Spanish | In-Domain (CP) | 3.49 | 85.7 | 93.3 |

## Limitations

The current 22-dimensional feature inventory fails to capture fine-grained phonetic contrasts present in certain languages, such as nasal vowels in French, palatalization in Russian, and gemination in Italian. Zero-shot cross-lingual transfer to typologically distant languages remains challenging for both models, indicating a need for broader linguistic inventories. Supervision relies entirely on automated MFA alignments, which may introduce annotation noise during frame-level feature extraction.

## Why read this

Speech and ML researchers focusing on multilingual representations or pronunciation analysis should read this paper to see how architectural multi-head designs with conditional gating outperform post-hoc phoneme mapping. It provides a concrete blueprint for leveraging frozen SSL backbones to directly extract robust, language-general articulatory features.

## Code

- https://github.com/abnerLing/PhonoQ-2.0

## Applications

Pronunciation assessment, computer-assisted language learning, clinical speech analysis, and low-resource speech processing pipelines.

## Related

- (link related pages by id as the wiki grows)
