---
id: charlot26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2772
pdf: https://www.isca-archive.org/interspeech_2026/charlot26_interspeech.pdf
---

# BabyHuBERT: Multilingual Self-Supervised Learning for Segmenting Speakers in Child-Centered Long-Form Recordings

[PDF](https://www.isca-archive.org/interspeech_2026/charlot26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/charlot26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2772)

**TL;DR** — BabyHuBERT is a multilingual self-supervised speech representation model trained on over 13,000 hours of child-centered daylong recordings, achieving an average F1-score of 66.9% on voice type classification.

## Problem

Speech models trained primarily on clean adult data fail catastrophically when applied to child-centered naturalistic recordings, which are dominated by non-speech noise, overlapping speakers, and atypical acoustic characteristics. This mismatch hampers automated language acquisition research, especially in underrepresented languages where manual annotation is unfeasible. Existing SSL models like W2V2-LL4300 are restricted to English and smaller pre-training scales, limiting their cross-linguistic utility.

## Method

The authors introduce BabyHuBERT, using the HuBERT-base architecture trained in a two-iteration setup on 13,164 hours of raw child-centered audio spanning 40+ languages. Because raw daylong audio contains roughly 80% non-speech, PyanNet-VTC was used to extract and pad speech segments, reducing non-speech content to about 8%. Iteration 1 clustered features extracted from the 6th layer of WavLM-base-plus, while Iteration 2 clustered features from the 7th transformer layer of BabyHuBERT-1 using MiniBatchKMeans with 500 clusters. Fine-tuning for voice type classification employed four independent binary classification heads fed by the encoder's last layer with a dropout of 0.5, freezing convolutional layers while updating transformer layers.

## Results

Evaluated on the 670-hour multilingual BabyTrain-2025 dataset, BabyHuBERT-VTC achieves an average F1-score of 66.9% across four speaker categories (key child, other children, male adult, female adult), closely approaching human annotator performance (69.8%). It substantially outperforms HuBERT base (50.7%), HuBERT large (49.1%), and W2V2-LL4300 (58.4%). On underrepresented corpora, BabyHuBERT-VTC yields absolute F1 gains over HuBERT of 14.0 points on Vanuatu and 18.3 points on the Solomon Islands.

## Code

- https://github.com/LAAC-LSCP/VTC

## Applications

Speech and machine learning researchers studying early language development, developmental psychology, and automated analysis of child-centered acoustic environments across diverse multilingual cohorts.

## Limitations

The model uses the base-size HuBERT architecture constrained by computational limits, and relies on an initial VTC preprocessing step to filter out heavy non-speech background noise.

## Related

- (link related pages by id as the wiki grows)
