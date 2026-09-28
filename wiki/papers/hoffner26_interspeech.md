---
id: hoffner26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1891
pdf: https://www.isca-archive.org/interspeech_2026/hoffner26_interspeech.pdf
---

# Deep learning-based predictions of perceived listening effort and intelligibility across enhanced, synthetic, natural, and binaural speech

[PDF](https://www.isca-archive.org/interspeech_2026/hoffner26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hoffner26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1891)

**TL;DR** — This paper evaluates two deep learning-based perception models, PHOBI and HASA-Net+, for non-intrusive prediction of speech intelligibility and listening effort across spatial, enhanced, and synthetic speech conditions, achieving high overall correlations exceeding 0.88 with human ratings.

## Problem

Predicting human speech perception metrics such as speech intelligibility (SI) and listening effort (LE) is crucial for evaluating hearing aids, communication systems, and synthetic speech, but traditional subjective listening tests are time-consuming. While various intrusive and non-intrusive models exist, it remains unclear whether deep learning perception models designed for specific tasks can generalize to predict both SI and LE across diverse, challenging conditions like spatial noise scenes, speech enhancement algorithms, and text-to-speech outputs. This study addresses this gap by testing two fundamentally different non-intrusive neural models against an extensive dataset of over 10,500 human listener responses.

## Method

The study analyzes two distinct models: PHOBI, a phone-based binaural intelligibility model using a hybrid ASR feed-forward neural network (trained on 960 hours of LibriSpeech) to compute triphone prediction uncertainty via Mean Temporal Distance (KL-divergence), and HASA-Net+, a teacher-student model combining WavLM-Large representations and audiogram patterns through a BLSTM and multi-head attention branches to predict HASPI. Model outputs are mapped to subjective listening effort (ESCU scale) via linear fits on an independent calibration dataset, and to speech recognition thresholds (SRT) by fitting sigmoid psychometric functions to outputs across varying SNRs (-40 to 20 dB). For binaural spatial scenes, a better-ear listening strategy selects the higher numerical output between left and right channels processed via HRTFs, with a single-condition offset correction applied to SRT predictions.

## Results

Evaluated on over 10,500 responses from 39 participants across spatial intelligibility, enhanced speech, and synthetic speech datasets, both models achieved high overall correlation coefficients above 0.88. For spatial speech intelligibility (SIspatial), PHOBI outperformed HASA-Net+ across anechoic, office, and cafeteria acoustic environments, yielding an anechoic Pearson correlation of 0.97 (RMSE 1.0 dB) for PHOBI versus 0.94 for HASA-Net+. On listening effort for enhanced speech (LEenhanced), both models achieved linear correlations of r = 0.94 (PHOBI) and r = 0.98 (HASA-Net+), though PHOBI achieved a lower RMSE of 1.2 ESCU compared to HASA-Net+'s 1.9 ESCU. For text-to-speech synthetic speech under various noisy spatial configurations (LEsynthetic), both models attained strong aggregate correlations of r = 0.94 (PHOBI) and 0.96 (HASA-Net+), though noise-specific subset correlations varied widely between 0.43 and 0.91.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers, hearing aid developers, and researchers evaluating speech enhancement algorithms, text-to-speech systems, and spatial audio quality without requiring clean reference signals.

## Limitations

Model correlations drop significantly when evaluated on narrower noise-specific subsets rather than aggregate datasets, and PHOBI occasionally mispredicted the directional trend of listening effort improvements for specific cafeteria noise conditions.

## Related

- (link related pages by id as the wiki grows)
