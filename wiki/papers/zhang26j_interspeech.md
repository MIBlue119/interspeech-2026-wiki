---
id: zhang26j_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-753
pdf: https://www.isca-archive.org/interspeech_2026/zhang26j_interspeech.pdf
---

# Improved modeling of vocal fold contacting and de-contacting in a geometric vocal fold model

*Tianyi Zhang, Zihao Huang, Peter Birkholz*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-753)

**TL;DR** — This paper presents a geometric vocal fold model for articulatory speech synthesis featuring biomechanically-motivated soft contacting and de-contacting phases, achieving a significant preference of 58.1% in A/B tests and a mean opinion score (MOS) of 3.02 compared to 2.68 for the baseline.

## Key contributions

- Introduces a modified geometric vocal fold model that incorporates natural exponential functions to simulate gradual tissue deformation during contacting and adhesive- преодолевание during de-contacting.
- Proposes a unified shape parameter that controls glottal pulse asymmetry by smoothly extending the soft contacting and de-contacting phases.
- Evaluates the model through a rigorous perception experiment encompassing 81 distinct parameter configurations across nine sentences.
- Demonstrates statistically significant improvements in perceived speech naturalness via both AB preference testing and a linear mixed-effects model.

## Problem

Articulatory speech synthesis allows precise low-level control required for basic speech research and low-resource languages, but its output often lacks naturalness due to simplistic voice source models. Prior geometric vocal fold models—such as Titze's model and the 2019 baseline variant—rely on purely sinusoidal string-like oscillations clipped at the midsagittal plane. This rigid clipping completely neglects the critical mechanical realities of tissue deformation during the brief contacting and de-contacting phases of oscillation cycles, leading to unnatural-sounding acoustic outputs.

## Method

The proposed voice source model computes time-varying glottal areas for the lower and upper vocal fold edges using static prephonatory displacements and dynamic oscillations. The dynamic displacement scales with oscillation amplitude proportional to rest length and the square root of transglottal pressure. Instead of a purely wrapped cosine function used in the 2019 model, the new oscillation function employs natural exponential decay curves to model soft contacting and de-contacting phases.

The soft contacting phase begins at instantaneous phase threshold gamma_1, decelerating medial tissue movement via an exponential decay parameter tau_1. Conversely, soft de-contacting ends at phase threshold gamma_2, modeling initial lateral resistance caused by tissue adhesion via exponential decay parameter tau_2. These decay parameters are analytically derived so that the exponential segments remain perfectly tangent to the underlying cosine oscillation curve at the boundary phases.

A unified shape parameter s governs pulse skewness by dynamically shifting gamma_1 and gamma_2 via Heaviside step functions, allowing symmetric pulses for s = 0 and left/right-leaning asymmetry for non-zero values. As the rest displacement increases, the model naturally gracefully reverts to standard cosine behavior, ensuring smooth transitions into voiceless consonants.

## Experimental setup

The models were implemented in VocalTractLab 2.4 using copy synthesis of 9 German sentences with a default male speaker profile (JD2 reference parameters: L0=1.6 cm, T0=0.45 cm, f_nat=120 Hz, A_chink=0.02 cm^2). The parameter evaluation space tested combinations of lower rest displacement (0.1, 0.4, 0.7 mm), upper rest displacement (0.1, 0.4, 0.7 mm), phase lag (40, 70, 100 degrees), and pulse shape parameters (s in {-1, 0, 1} for the new model; s' in {-0.5, 0, 0.5} for the 2019 baseline), yielding 81 settings per sentence and 1,458 total utterances. Perception tests involved 27 native and proficient German listeners evaluating subsets via AB preference tests and 5-point Mean Opinion Score (MOS) evaluations.

## Results

The new model achieved a significant overall preference of 58.1% (95% CI [56.0%, 60.2%], p < 0.001) in the AB comparison test against the 2019 baseline model. In the MOS evaluation, the proposed model attained an overall average score of 3.02 compared to 2.68 for the previous model. A linear mixed-effects model confirmed a strong positive main effect for the new model (beta_1 = 0.911, p < 0.001), showing superior naturalness across 75.3% of the evaluated parameter combinations. The interaction analysis revealed that the performance advantage varied slightly depending on specific rest displacements and phase lags, particularly showing diminished preference margins at extreme parameter extremes.

| System | AB Preference (%) | Mean Opinion Score (MOS) |
|---|---|---|
| 2019 Baseline Model | 41.9% | 2.68 |
| Proposed NEW Model | 58.1% | 3.02 |

## Limitations

The study evaluates synthetic speech exclusively for a single default male speaker model (JD2) and relies heavily on copy synthesis that preserves natural natural durations and f0 contours. The acoustic evaluation was restricted to modal phonation across a constrained set of nine sentences and German phonetic structures. Furthermore, aerodynamic and biomechanical interactions are geometrically approximated rather than fully solved via finite element tissue simulation.

## Why read this

Speech researchers and TTS engineers working on articulatory speech synthesis will learn how incorporating low-level biomechanical constraints like tissue collision softening can measurably improve synthetic voice quality. It offers a concrete mathematical formulation for glottal pulse shaping that replaces rigid clipping heuristics.

## Code

- https://www.vocaltractlab.de/index.php?page=birkholz-supplements

## Applications

Articulatory text-to-speech systems, low-resource language speech synthesis, and basic phonetic and speech production research.

## Related

- (link related pages by id as the wiki grows)
