---
id: s26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3047
pdf: https://www.isca-archive.org/interspeech_2026/s26_interspeech.pdf
---

# Gender Bias in ASR: A Controlled Study of Gender Composition Across Training Paradigms

[PDF](https://www.isca-archive.org/interspeech_2026/s26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/s26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3047)

**TL;DR** — Balancing fine-tuning data composition fails to systematically alter gender disparities in pretrained ASR models due to entrenched pretraining representations, whereas from-scratch models show high sensitivity.

## Problem

Prior studies analyzing gender disparities in ASR through fine-tuning on gender-controlled data report contradictory findings and fail to establish a stable relationship between training composition and performance gaps. This ambiguity is compounded by the unknown and uncontrolled gender distributions of large-scale pretraining corpora, which make it unclear whether fine-tuning alone can effectively shift gender bias or if results are merely artifacts of pretraining representations.

## Method

The authors perform a controlled empirical study across 132 configurations, evaluating three pretrained models (Wav2Vec 2.0, SPRING Wav2Vec 2.0, and Whisper Medium) and one from-scratch reference system (Kaldi TDNN-HMM with LF-MMI objective, plus an additional Zipformer end-to-end model). Training data is capped at approximately 71.36 hours per dataset, with 11 gender ratio configurations ranging from 0% to 100% female speakers in 10% increments. Evaluations are conducted across three English speech corpora: LibriSpeech (clean), Indic TIMIT, and Mozilla Common Voice v3. Gender disparity is quantified using the Demographic Disparity Score (DDS), comparing male versus female word error rates across ten randomized test subsets.

## Results

On Indic TIMIT, the from-scratch Kaldi system exhibits a massive DDS shift from +43.1 (all-male training) to -37.2 (all-female training), and Common Voice shows a reversal from +19.1 to -12.7. In contrast, pretrained systems show minimal and inconsistent sensitivity: Wav2Vec 2.0, SPRING, and Whisper all remain confined within roughly ±8 to ±12 DDS across configurations without monotonic trends. Additionally, a Zipformer from-scratch model on LibriSpeech replicates the directional reversal, moving from -9.3 (all-female) to +39.4 (all-male).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building or auditing ASR models who need to understand the limitations of data-balancing interventions for mitigating demographic bias.

## Limitations

The study is restricted to English-language speech corpora, binary gender annotations (male and female), and specific architectural choices.

## Related

- (link related pages by id as the wiki grows)
