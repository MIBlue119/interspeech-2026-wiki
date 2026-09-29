---
id: s26_interspeech
category: asr
labels: [self-supervised]
institutions: ["Indian Institute of Science"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3047
pdf: https://www.isca-archive.org/interspeech_2026/s26_interspeech.pdf
---

# Gender Bias in ASR: A Controlled Study of Gender Composition Across Training Paradigms

*Seshan S, Murali Kadambi, Amartya Veer, Prasanta Kumar Ghosh*

[PDF](https://www.isca-archive.org/interspeech_2026/s26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/s26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3047)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — A controlled evaluation of 132 experimental conditions reveals that fine-tuning pretrained ASR models on gender-balanced data fails to systematically alter gender disparity, whereas models trained entirely from scratch show dramatic, predictable shifts in recognition error rates based on training gender ratios.

## Key contributions

- Conducted a systematic, multi-factor study across 3 public datasets, 4 ASR systems, and 11 distinct training gender ratio splits (0% to 100% female representation in 10% increments, 132 total conditions).
- Isolated training paradigms by comparing three pretrained models (Wav2Vec 2.0, SPRING Wav2Vec 2.0, Whisper Medium) against a rigorously controlled from-scratch baseline (Kaldi TDNN-HMM with LF-MMI objective).
- Demonstrated that from-scratch systems exhibit massive, systematic Demographic Disparity Score (DDS) shifts (exceeding 80 percentage points on Indic TIMIT), proving the training data composition effect is genuine.
- Proved that fine-tuning data balancing alone is insufficient for mitigating gender disparity in pretrained ASR because entrenched pretraining representations mask fine-tuning data composition effects.

## Problem

Gender disparities in Automatic Speech Recognition (ASR) are widely documented, but prior fine-tuning studies report inconsistent, non-monotonic relationships between training gender balance and word error rates. These discrepancies are muddied by an uncontrolled confound: the unknown and undocumented gender distributions of the massive corpora used during large-scale pretraining. Because a small fine-tuned gender-controlled dataset cannot easily override entrenched pretraining representations, it remains unknown whether fine-tuning can truly reveal training composition effects or if observed behaviors simply reflect pretraining biases. Resolving this is critical to knowing whether balancing training data is a viable standalone fix for gender bias in modern ASR.

## Method

The study tests 132 model-dataset-ratio combinations by varying training sets across eleven Male:Female ratios (0:100 to 100:0 with 10% steps), capped at a uniform duration of 71.36 hours per configuration based on the maximum available female data in Common Voice. Pretrained models (Wav2Vec 2.0 base, SPRING Wav2Vec 2.0 trained on Indian English, and Whisper Medium) and the from-scratch Kaldi TDNN-HMM hybrid are trained under identical conditions per dataset. Kaldi uses a lattice-free maximum mutual information (LF-MMI) objective and a fixed external trigram language model. Wav2Vec models are fine-tuned using the Adam optimizer (lr=3e-5, batch size 8), while Whisper uses AdamW (lr=1e-5, batch size 4), all on NVIDIA RTX 3090 GPUs.

Evaluation employs a Demographic Disparity Score (DDS), a pairwise comparison of Word Error Rate (WER) between male and female subsets (with male speakers as the reference group), computed across ten non-overlapping test folds to ensure statistical robustness. Additionally, an end-to-end Zipformer model trained from scratch on extreme ratios (0:100 and 100:0) is evaluated to verify that compositional sensitivity is a general property of from-scratch training rather than an artifact of the Kaldi hybrid architecture.

## Experimental setup

Evaluated on three English speech corpora: LibriSpeech clean (1000h read audio, clean test set), Indic TIMIT (240h phonetically rich Indian English read speech, 80 speakers), and Mozilla Common Voice v3 (crowdsourced, diverse recording conditions, ~75:25 M:F skew). Compared systems include Wav2Vec 2.0, SPRING Wav2Vec 2.0, Whisper Medium, and a Kaldi TDNN-HMM baseline (plus an additional IceFall Zipformer check). Metrics include male WER, female WER, and Demographic Disparity Score (DDS). Models were trained across 132 total configurations on NVIDIA GeForce RTX 3090 GPUs using HuggingFace Transformers and Kaldi toolkits.

## Results

The from-scratch Kaldi system shows dramatic sensitivity to training gender composition: on Indic TIMIT, its DDS moves from +43.1 (all-male training) to -37.2 (all-female training), a range exceeding 80 percentage points that completely flips the recognition disparity. Common Voice mirrors this reversal with DDS shifting from +19.1 to -12.7, while LibriSpeech shifts from +33.2 to +4.7. The end-to-end Zipformer from-scratch check on LibriSpeech corroborates this with a 49-point DDS swing (-9.3 to +39.4).

In stark contrast, all three pretrained systems (Wav2Vec 2.0, SPRING, and Whisper) exhibit flat, unresponsive trends. Wav2Vec 2.0 and SPRING remain within a narrow DDS band of approximately ±10 to ±12 across ratios with no monotonic trend, and Whisper shows strong stability (fluctuating within ±8 without directional structure). Pretrained models fail to show systematic composition-disparity relationships, meaning balancing fine-tuning data does not correct their embedded demographic biases.

| System | Ratio (M:F) | LibriSpeech WER_M | LibriSpeech WER_F | LibriSpeech DDS | Indic TIMIT WER_M | Indic TIMIT WER_F | Indic TIMIT DDS |
|---|---|---|---|---|---|---|---|
| Kaldi | 100:0 | 7.6 | 10.1 | +33.2 | 18.6 | 26.5 | +43.1 |
| Kaldi | 0:100 | 8.5 | 8.9 | +4.7 | 26.8 | 16.8 | -37.2 |
| Wav2Vec 2.0 | 100:0 | 15.1 | 16.8 | +11.1 | 60.5 | 54.9 | -9.4 |
| Wav2Vec 2.0 | 0:100 | 15.8 | 16.3 | +3.2 | 44.2 | 47.5 | +7.5 |
| Whisper | 100:0 | 3.5 | 4.6 | +30.6 | 20.4 | 20.6 | +1.0 |
| Whisper | 0:100 | 3.7 | 3.9 | +6.8 | 21.5 | 20.0 | -7.3 |

## Limitations

The study is strictly scoped to English ASR and binary gender categories (male and female) reflecting standard corpus annotations. Only three representative pretrained architectures and limited data scales (~71 hours of training speech per configuration) were tested. The findings imply that future bias mitigation cannot rely solely on fine-tuning data curation, but the paper does not test or propose specific solutions for modifying internal pretraining representations.

## Why read this

Speech researchers and fair-ML engineers should read this paper to avoid wasting effort on data-balancing fine-tuning hacks for pretrained ASR models. It demonstrates conclusively that pretrained representations override fine-tuning data composition, redirecting the field toward representation-level interventions.

## Code

- https://asr.iitm.ac.in/models

## Applications

Auditing and improving fairness in automatic speech recognition systems, building equitable speech interfaces, and guiding data curation strategies for foundation speech models.

## Institutions / 機構

Indian Institute of Science

**Funding / 經費:** Defence Research and Development Organisation

## Related

- (link related pages by id as the wiki grows)
