---
id: takagi26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1478
pdf: https://www.isca-archive.org/interspeech_2026/takagi26_interspeech.pdf
---

# Investigating Human-Model Discrepancies in Speech Quality Assessment via Acoustic and Prosodic Perturbations

*Masato Takagi, Masaya Kawamura, Reo Shimizu, Yuma Shirahata*

[PDF](https://www.isca-archive.org/interspeech_2026/takagi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/takagi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1478)

**TL;DR** — This paper investigates the discrepancy between human listeners and automatic MOS prediction models when evaluating speech quality across acoustic, prosodic, and speaker-specific perturbations. The findings reveal that while models track acoustic degradation well, they are completely insensitive to prosodic errors and exhibit heavy, unhuman-like biases toward mean fundamental frequency.

## Key contributions

- Designs a controlled evaluation framework using 656 samples split into acoustic degradation, prosodic/accent errors, and pitch/speaking rate variations.
- Demonstrates that popular MOS predictors (SHEET-MB, SHEET-BV, UTMOS, UTMOSv2, NISQA, DNSMOS) fail to detect linguistically critical pitch-accent errors, showing less than 0.1 score changes against a 1.84 drop in human MOS.
- Uncovers a double dissociation in speaker characteristics: models exhibit strong, unhuman-like biases toward mean log F0 while missing human sensitivities to F0 variability and speaking rate.
- Shows that multi-domain training data composition heavily dictates system-level rank ordering and failure modes across degradation types.

## Problem

Automatic mean opinion score (MOS) prediction models like SSLMOS and UTMOS are routinely used as direct proxies for human listening tests in text-to-speech (TTS) research. However, collapsing multidimensional speech quality into a single scalar introduces information loss, and prior work hints that models may ignore prosodic nuance or suffer from speaker-dependent biases. It remains entirely unclear whether these models are sensitive to the same perceptual dimensions that humans use, particularly as modern TTS systems eliminate coarse acoustic artifacts and quality shifts to fine-grained prosodic and speaker attributes. This paper addresses this gap by systematically comparing human and model sensitivity using controlled acoustic-prosodic perturbations in Japanese, a pitch-accent language.

## Method

The study constructs three groups of evaluation samples: Group A (acoustic degradation including clipping, pink noise, and low-bitrate MP3 compression applied to 4 speakers), Group B (prosodic errors generated via a NANSYTTS model by swapping binary high-low pitch-accent labels across accentual phrases at low [10-20%] and high [80-90%] probabilities for 4 speakers), and Group C (natural and manipulated pitch/speaking rate variations using F0 scaling factors from 0.5x to 2.0x via SiFi-GAN and duration scaling via WORLD). 

Subjective evaluations were conducted with 15 native Japanese speakers rating all 656 samples on a 5-point naturalness scale. Objective evaluations were performed using six prominent models—SHEET-MB, SHEET-BV, UTMOS, UTMOSv2, NISQA, and DNSMOS—run through the VERSA toolkit with audio resampled to 16 kHz. These models span wav2vec 2.0, WavLM Large encoders, and convolutional neural networks trained on diverse corpora like BVCC, NISQA, and DNS Challenge.

The experimental design isolates distinct quality dimensions to expose architectural and data-driven blind spots. By testing models across these orthogonal axes, the authors isolate whether training data composition (e.g., inclusion of singing data in SingMOS vs. speech-only corpora) or model architecture drives specific perceptual alignments and divergences.

## Experimental setup

Evaluated 656 total samples across 4 subsets: 120 acoustic degradation samples, 120 TTS accent error samples, 200 natural speech samples, and 216 pitch/speaking rate converted samples. Compared 6 proxy models (SHEET-MB, SHEET-BV, UTMOS, UTMOSv2, NISQA, DNSMOS) against 15 native Japanese human listeners. Assessed performance via Spearman's rank correlation coefficients (SRCC) and Pearson correlation coefficients (r).

## Results

In Group A (acoustic degradation), most models achieved high system-level SRCC (0.929 to 0.964), except SHEET-MB (0.750), confirming H1; changing training data from MOS-Bench to BVCC dramatically improved system-level ranking. In Group B (prosodic errors), human MOS plummeted by 1.84 points (from 4.00 for none to 2.16 for high accent swapping), but all models varied by less than 0.1 points, strongly verifying H2 and showing that standard training data and architectures ignore prosodic correctness. In Group C (speaker characteristics), humans showed moderate correlation with speaking rate (r = -0.520) and F0 variability (r = 0.477) but no correlation with mean log F0 (r = -0.059), whereas models exhibited strong, erroneous negative correlations with mean log F0 (r up to -0.788) and near-zero correlation with F0 variability, verifying H3.

| Condition | Human MOS | SHEET-BV | UTMOSv2 | NISQA |
|---|---|---|---|---|
| Natural / None | 3.49 / 4.00 | 3.10 / 3.05 | 3.65 / 3.56 | 4.56 / 3.81 |
| Clipping (heavy) | 1.12 | 1.39 | 1.92 | 1.26 |
| MP3 8 kbps | 1.43 | 1.51 | 2.01 | 1.39 |
| High Accent Swap | 2.16 | 3.09 | 3.61 | 3.84 |

## Limitations

The study focuses exclusively on Japanese, a pitch-accent language, which may limit direct generalization to stress-timed or tone languages, though pitch-accent sensitivity findings align with broader prosodic blind spots. The evaluation relies on a limited set of four base speakers for perturbation experiments and a total of 15 human evaluators. Furthermore, the work tests current off-the-shelf models rather than proposing a new training recipe to fix the identified discrepancies.

## Why read this

Speech researchers and engineers relying on automatic MOS predictors for model selection or hyperparameter tuning should read this to understand that high MOS scores do not guarantee natural prosody or correct speaker characteristics. It provides a sobering reality check on popular evaluation toolkits like VERSA and UTMOS.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Auditing and improving automated speech evaluation pipelines, guiding the design of multidimensional speech quality metrics for text-to-speech, and refining self-supervised representation learning objectives.

## Related

- (link related pages by id as the wiki grows)
