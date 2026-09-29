---
id: fukuda26_interspeech
category: paralinguistics-emotion
institutions: ["Keio University", "University of Tokyo"]
code: https://github.com/takamichi-lab/selfvoice-playback-imagery-gap
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-973
pdf: https://www.isca-archive.org/interspeech_2026/fukuda26_interspeech.pdf
---

# What Makes Us Hate Our Own Voice? Large-scale experiments on Playback–Imagery Gaps and Individual--Speech Feature Effects

*Koki Fukuda, Shinnosuke Takamichi*

[PDF](https://www.isca-archive.org/interspeech_2026/fukuda26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fukuda26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-973)

**Category:** `paralinguistics-emotion`

**TL;DR** — A large-scale online study of Japanese participants (N = 459) reveals that listening to recorded self-voice (playback) evokes significantly greater negative affect and discomfort compared to auditory imagery, while identity-related self-likeness remains largely unaffected. The evaluation gap is modulated by order effects, block drift, and stable listener traits interacting with acoustic features.

## Key contributions

- Quantified the playback-imagery evaluation gap across 7 multidimensional Likert scales, showing a severe affective penalty for playback (discomfort beta = 0.490, p = 6.69e-20) with no reliable difference in identity self-likeness.
- Isolated order effects and block-to-block drift using a four-group crossover and repetition-baseline design, demonstrating that drift partially explains sequence effects but leaves desirability and strangeness robust.
- Identified reliable trait-dependent acoustic modulation of the gap via exploratory discovery-validation splits, linking listener traits like social anxiety and voice preference to specific acoustic cue weightings.
- Provided empirical evidence that self-voice aversion operates as a listener-specific inference process rather than a universal response driven uniformly by low-level acoustic properties.

## Problem

Hearing one's own recorded voice often triggers aversive reactions known as voice confrontation, typically attributed to the mismatch between air- and bone-conducted acoustic transmission. However, bone-conduction differences alone fail to account for massive individual variability, and the role of internally generated auditory imagery in self-voice evaluation remains unquantified. Understanding this playback-imagery gap matters for designing better speech interfaces, synthetic voice personas, and resolving psychological aversions tied to voice confrontation.

## Method

The online experiment utilized a four-group assignment combining a crossover design and repetition baselines to separate sequence effects from block-to-block drift. Participants (N = 459 after screening 637 recruits) recorded two neutral Japanese sentences from WRIME (at least 15 characters, neutral polarity) and completed playback and imagery blocks in counterbalanced orders. Trial-level evaluations used 7-point Likert scales covering desirability, valence, discomfort, self-likeness, familiarity, eeriness, and strangeness. Pre-task traits included recording exposure frequency, self-voice preference, Rosenberg self-esteem, SPS-6 social anxiety, age, and gender.

For exploratory analyses (RQ1-RQ2), a pre-specified 70%/30% discovery-validation split was employed. Playback acoustic features were z-scored and included RMS energy, F0, spectral descriptors, MFCC summaries, and mean-pooled facebook/wav2vec2-base-960h embeddings. Models were fitted using trial-level mixed-effects regressions and ordinary least squares with HC3 robust standard errors, applying Benjamini-Hochberg FDR correction and Holm validation thresholds (p <= 0.05 with sign consistency) to filter candidate acoustic correlates and trait-acoustic interactions.

## Experimental setup

The study analyzed N = 459 Japanese participants (mean age 43.89 years, SD = 10.93; 246 male, 210 female, 3 other/unanswered) recruited via Lancers, after filtering out 178 incomplete or low-quality responses based on strict VAD and response-time criteria. Conditions were compared using linear mixed-effects models and OLS with HC3 robust standard errors across 6 secondary outcomes corrected via BH-FDR. Acoustic representations extracted via wav2vec2-base-960h and standard spectral descriptors were tested against participant-level score differences (delta y) using a 70/30 discovery-validation protocol.

## Results

Playback produced significantly higher discomfort (beta = 0.490, 95% CI [0.385, 0.595], p = 6.69e-20), increased eeriness (beta = 0.506), higher strangeness (beta = 0.439), lower desirability (beta = -0.518), and more negative valence (beta = -0.320) compared to imagery, whereas self-likeness showed no reliable difference. Drift adjustments attenuated order effects for discomfort (adjusted beta = -0.161, p = 0.250), but sequence robustness persisted for desirability (adjusted beta = 0.338, p = 0.0088) and strangeness (adjusted beta = -0.513, p = 0.0012). Exploratory feature screening revealed sparse main effects of low-level acoustics (e.g., 19th MFCC predicting discomfort gap, beta = 0.288, p = 0.016), but 12 replicated trait-acoustic interactions—such as social anxiety interacting with wav2vec2 embedding dimensions for self-likeness (emb671 mean beta = -0.490, p < 0.001)—indicating idiosyncratic cue weighting.

| Evaluation Metric | Playback vs Imagery (Beta) | p-value | Drift-Adjusted Sequence Effect (Beta) |
| :--- | :--- | :--- | :--- |
| Discomfort | +0.490 | 6.69e-20 | -0.161 |
| Desirability | -0.518 | * | +0.338 |
| Eeriness | +0.506 | * | +0.198 |
| Strangeness | +0.439 | * | -0.513 |
| Valence | -0.320 | * | +0.007 |
| Self-Likeness | Not Significant | 0.767 | Not Tested |

## Limitations

The sample was restricted to Japanese speakers recruited via a single online crowd-sourcing platform, limiting cross-linguistic and broader demographic generalization. The online setup could not directly verify whether participants faithfully performed the imagery task as instructed, relying instead on post-block subjective vividness and difficulty ratings. Acoustic exploratory analyses yielded sparse main effects, pointing to high unexplained variance that requires more sophisticated listener-adaptive computational models.

## Why read this

Speech researchers and ML engineers building personalized voice interfaces, TTS systems, or synthetic avatars should read this to understand that self-voice aversion is driven by affective prediction errors and listener-specific trait weights rather than uniform acoustic properties.

## Code

- https://github.com/takamichi-lab/selfvoice-playback-imagery-gap

## Applications

Personalized text-to-speech systems, voice conversion feedback filters, speech therapy applications for speech anxiety, and user-adaptive synthetic voice design.

## Institutions / 機構

Keio University, University of Tokyo

**Funding / 經費:** JST Moonshot R&D, JST FOREST Program

## Related

- [SELFIX: An Interactive System for Natural Self-Voice Approximation](orepic26_interspeech.md) — complementary · relatedness 1.7/3
- [Beyond One-Size-Fits-All: Personalized and Culturally Adaptive Emotional TTS via Interactive Optimization of Individual Emotion Perception Spaces](zhou26e_interspeech.md) — complementary · relatedness 1.5/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
