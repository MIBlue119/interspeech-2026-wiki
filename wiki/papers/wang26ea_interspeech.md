---
id: wang26ea_interspeech
category: tts
institutions: ["University of Tuebingen", "Tongji University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2730
pdf: https://www.isca-archive.org/interspeech_2026/wang26ea_interspeech.pdf
---

# Not Flat, But Dissociated: Prosodic and Segmental Divergence in Neural TTS

*Rong Wang, Kun Sun, Harald Baayen*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26ea_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26ea_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2730)

**Category:** `tts`

**TL;DR** — By analyzing 13,100 matched LJSpeech utterances across four neural TTS architectures, the paper uncovers a cross-timescale prosodic dissociation (compressed global F0 range combined with elevated local pitch fluctuations) alongside severe segmental vowel space contraction (reducing to 9-30% of human baselines).

## Key contributions

- Identifies a dual-timescale prosodic deficit where global F0 variability is compressed (Cohen's d = -0.55) while local pitch inflection reversals increase (d = +0.82), distinguishing intonation shape from jitter-like micro-perturbations.
- Quantifies severe vowel space area (VSA) contraction across architectures—ranging from 9% (FastSpeech2) to 30% (MixerTTS) of the human baseline—demonstrating universal articulatory undershoot.
- Applies locus equation analysis to neural TTS, confirming weakened place-conditioned consonant-to-vowel F2 coarticulation most prominently in alveolar contexts (elevated slopes relative to human bounds).
- Establishes that prosodic and segmental deviations are largely uncorrelated across utterances, proving they represent distinct dimensions of speech quality that standard Mean Opinion Scores (MOS) conflate.

## Problem

Standard neural TTS evaluation relies heavily on Mean Opinion Scores (MOS) and global spectral distance metrics like mel-cepstral distortion, which collapse multi-dimensional structural properties into a single number. Prior work fails to formally dissociate suprasegmental prosody from segmental articulatory precision at corpus scale, leaving system-specific structural defects hidden. This matters because models can achieve near-human MOS while maintaining radically distorted phonetic and prosodic internal organizations that hinder intelligibility under adverse conditions and expressive flexibility.

## Method

The study analyzes 13,100 parallel utterances from the LJ-TTS dataset across four representative two-stage TTS architectures: Tacotron2-DDC (autoregressive attention), FastSpeech2 (feed-forward duration prediction), Glow-TTS (monotonic normalizing flow), and MixerTTS (MLP-Mixer backbone). All systems use the exact same text, training splits, and a shared HiFi-GAN vocoder to isolate acoustic model behavior. Prosodic analysis extracts 21 features spanning F0 dynamics, micro-variability, contour shape, and temporal/intensity dimensions, evaluated via Mann-Whitney U tests with Benjamini-Hochberg correction and an L1-regularized LASSO logistic regression classifier (nested 5-fold cross-validation) to find discriminative features.

Segmental analysis maps Montreal Forced Aligner (MFA) boundaries from human recordings to the TTS audio clips by clip ID, sampling formants at vowel-internal time points (20%, 50%, 80% duration) to prevent boundary artifacts. Vowel Space Area (VSA) is computed over the F1-F2 plane for cardinal corner vowels (/i/, /A/, /u/) and a 10-vowel convex hull. Consonant-vowel coarticulation is measured via within-vowel F2 trajectory shifts (F280% - F220%) and locus equation regressions (F2onset = beta * F2mid + alpha) grouped by labial, alveolar, and velar places of articulation.

## Experimental setup

Evaluates 13,100 matched utterance pairs from the LJ-TTS dataset (single American English female speaker). Compares four distinct acoustic architectures (Tacotron2-DDC, FastSpeech2, Glow-TTS, MixerTTS) paired with a shared HiFi-GAN vocoder against human reference ground truth. Metrics include 21 prosodic features, Mann-Whitney U rank-biserial effect sizes, LASSO classification AUC (0.851), cardinal vowel space area (Hz^2), F2 trajectory differentials, and locus equation slopes (beta +/- 95% CI).

## Results

Pooled TTS comparison reveals compressed global F0 standard deviation (d = -0.55, p < 0.001) and range (d = -0.31), contrasted with a massive surge in pitch inflections (d = +0.82, producing 11.8% more direction reversals per voiced frame). Timing metrics (voiced ratio, speaking rate, final F0 drop) showed no significant differences from humans (p > 0.05), localizing the prosodic failure purely to F0 coordination. Vowel space area collapsed drastically across systems, with FastSpeech2 retaining only 9% of the human triangle area (4,265 Hz^2 vs 49,955 Hz^2) and MixerTTS retaining 30% (14,898 Hz^2); 10-vowel convex hulls dropped to 9-21% of human scale. Locus equation slopes for alveolar contexts confirmed weaker coarticulation, with human baseline beta at 0.793 +/- 0.011 falling entirely below the confidence intervals of all four TTS systems (0.827 to 0.870). Spearman rank correlations between global F0 range and vowel reduction were near zero (rho between -0.031 and +0.028), proving prosodic and segmental failures are completely independent.

| System | Triangle Area (Hz^2) | Triangle % of Human | Hull Area (Hz^2) | Hull % of Human | Alveolar Locus Slope (beta) |
|---|---|---|---|---|---|
| Human | 49,955 | 100% | 170,433 | 100% | 0.793 |
| MixerTTS | 14,898 | 30% | 35,385 | 21% | 0.841 |
| Tacotron2-DDC | 7,807 | 16% | 19,303 | 11% | 0.844 |
| Glow-TTS | 7,541 | 15% | 20,414 | 12% | 0.827 |
| FastSpeech2 | 4,265 | 9% | 15,169 | 9% | 0.870 |

## Limitations

The evaluation is restricted to clean read speech from a single speaker in one language (American English), meaning the observed human-TTS gap is likely conservative and would widen under expressive or conversational conditions. The study is limited to four traditional two-stage neural TTS pipelines, omitting newer end-to-end models like VITS or StyleTTS2. Furthermore, automated MFA boundary transfer, while audited, introduces minor segmental alignment boundaries that could constrain fine-grained formant variance.

## Why read this

Speech researchers and TTS engineers building loss functions or model architectures should read this to understand why standard MSE mel-spectrogram losses fail to enforce phonetic peripherality and hierarchical prosody, providing concrete acoustic metrics to target beyond MOS.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Diagnostic evaluation tools for neural text-to-speech systems, automated quality control pipelines for synthetic voice generation, and loss-function regularization design.

## Institutions / 機構

University of Tuebingen, Tongji University

## Related

- (link related pages by id as the wiki grows)
