---
id: tanner26_interspeech
category: phonetics-linguistics
labels: [self-supervised]
institutions: ["University of Glasgow", "McGill University", "University of Oregon", "North Carolina State University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-743
pdf: https://www.isca-archive.org/interspeech_2026/tanner26_interspeech.pdf
---

# wav2VOT: automatic estimation of voice onset time, closure duration, and burst realisation with wav2vec2

*James Tanner, Morgan Sonderegger, Jane Stuart-Smith, Tyler Kendall, Jeff Mielke*

[PDF](https://www.isca-archive.org/interspeech_2026/tanner26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tanner26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-743)

**Category:** `phonetics-linguistics` · **Labels:** `self-supervised`

**TL;DR** — wav2VOT adapts the wav2vec2 architecture to automatically estimate voice onset time (VOT), closure duration, and burst realisation at a 1ms temporal resolution. Evaluated across multiple speech datasets, it achieves high predictive fidelity comparable to existing domain-specific tools like AutoVOT while handling a broader set of stop consonant features.

## Key contributions

- Modifies the standard wav2vec2 feature encoder convolutional strides from (5, 2, 2, 2, 2, 2, 2) down to (2, 2, 2, 2), improving temporal resolution from 20ms to 1ms for fine-grained phonetic segmentation.
- Introduces a multi-task formulation predicting four frame-wise labels (context window, closure, VOT, lenition) supervised by combined frame-wise cross-entropy and Connectionist Temporal Classification (CTC) losses.
- Performs extensive cross-corpus evaluations across five diverse English and Japanese speech datasets, analyzing the impact of fine-tuning data scales (50 to 500 tokens).
- Validates wav2VOT through a Bayesian regression phonetic study context, demonstrating negligible differences between automated predictions and manual annotations across voicing, place of articulation, and speech rate.

## Problem

Traditional phonetic annotation tools like AutoVOT are limited to estimating only VOT, requiring separate workflows for closure duration and struggling with stop lenition where no distinct burst occurs. Existing methods also demand extensive, error-prone data formatting and programming expertise. While large speech models like wav2vec2 excel at speech classification, their native architectural configurations lack the high temporal resolution needed for precise forced alignment and sub-phonemic phonetic segmentation.

## Method

wav2VOT builds on the standard wav2vec2 framework containing a Feature Encoder (FE) and Transformer Encoder (TE). By modifying the FE convolutional strides to (2, 2, 2, 2), the total downsampling factor is reduced from 320 to 16, producing 1 frame per 1ms for an input 16kHz audio signal. The downstream head predicts 4 discrete states per frame: surrounding context window, closure, VOT, and lenition.

Training sequences are formed by extracting stop tokens with surrounding context windows whose lengths are randomized via uniform distributions to prevent spatial overfitting. The training objective combines framewise cross-entropy with a Connectionist Temporal Classification (CTC) loss scaled by 0.05, which enforces valid label transition sequences (e.g., ensuring closures never follow VOT). During inference, softmax frame-wise predictions are converted to timestamps with a minimum interval enforcement threshold of 5ms to suppress frame-length artifacts.

## Experimental setup

Evaluated on 6 corpora including the Corpus of Spontaneous Japanese-Core (CSJ-C; 205,034 stop tokens across 45 hours), TIMIT (14,389 tokens), Sounds of the City (SOTC; 12,555 tokens), SPADE (1,903 tokens), Switchboard (SWB; 893 tokens), and Big Brother (BB; 704 tokens). Baselines include AutoVOT and zero-shot vs fine-tuned setups. Implemented using an 80GB NVIDIA H100 GPU, training for 10 epochs with a batch size of 64. Evaluation metrics include frame-wise accuracy, frame-wise F1, sequence word error rate (WER), and tolerance threshold percentages.

## Results

The base CSJ-C-trained model achieves a frame-wise accuracy of 96.4%, F1 of 0.93, and sequence WER of 0.06 on its held-out test split, with over 80% of VOT predictions falling within a 5ms error margin. On unseen English corpora without fine-tuning, wav2VOT achieves competitive VOT performance against AutoVOT (e.g., 80% vs 73% within 5ms on Switchboard, and 80% vs 79% on Big Brother). Fine-tuning on 200+ target tokens consistently improves VOT, closure duration, and lenition accuracy, though very small fine-tuning sets (50-100 tokens) can temporarily degrade performance on acoustically variable spontaneous datasets like SOTC and SPADE.

| System / Condition | VOT < 2ms (%) | VOT < 5ms (%) | Lenition Accuracy (%) |
|---|---|---|---|
| CSJ-C Base (Zero-Shot) | - | - | 93.3 |
| Switchboard (AutoVOT) [10] | 53.0 | 73.0 | - |
| Switchboard (wav2VOT Zero-Shot) | 47.0 | 80.0 | - |
| Big Brother (AutoVOT) [10] | 53.0 | 79.0 | - |
| Big Brother (wav2VOT Zero-Shot) | 46.0 | 80.0 | 85.0 |

## Limitations

The current evaluation focuses primarily on English and Japanese stop systems, leaving multi-way voicing systems and languages with pre-aspiration or negative VOT largely unexplored at scale. Small fine-tuning sample sizes (50 to 100 items) can occasionally impair model performance on spontaneous speech corpora characterized by high acoustic and recording variability. Furthermore, the pipeline relies on pre-existing rough utterance-level or word-level alignments to extract stop windows for fine-tuning.

## Why read this

Phoneticians, speech scientists, and ML researchers building automated speech annotation pipelines will find this a blueprint for adapting self-supervised representation models to fine-grained sub-phonemic temporal regression tasks.

## Code

- https://github.com/james-tanner/wav2VOT

## Applications

Automated acoustic phonetic annotation, clinical speech analysis, large-scale sociolinguistic corpus processing, and phonetic feature extraction for speech corpora.

## Institutions / 機構

University of Glasgow, McGill University, University of Oregon, North Carolina State University

**Funding / 經費:** Economic and Social Research Council, Natural Sciences and Engineering Research Council of Canada, Social Sciences and Humanities Research Council, National Science Foundation, Canada Research Chairs, British Academy, University of Glasgow

## Related

- (link related pages by id as the wiki grows)
