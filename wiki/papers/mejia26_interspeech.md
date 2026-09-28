---
id: mejia26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/mejia26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/mejia26_interspeech.pdf
---

# Sound Reactor Mission: Gamified Misophonia Assessment to Bridge the Gap in Audiology and Hearing Care

*Jorge Mejia, Jan-Willem Wasmann, Jane Gregory*

[PDF](https://www.isca-archive.org/interspeech_2026/mejia26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mejia26_interspeech.html)

**TL;DR** — Sound Reactor Mission (SRM) is a browser-based, gamified 6-minute speech-in-noise assessment tool that quantifies how personally annoying sounds impact speech intelligibility. In a pilot test of 14 participants, it achieved a 100% completion rate and revealed that self-selected annoying maskers severely degrade speech intelligibility (59.2%) compared to synthetic (71.7%) and standard (86.3%) noise.

## Key contributions

- Introduces the first browser-based, gamified assessment framework targeting misophonia and its impact on speech-in-noise understanding.
- Implements an adaptive 1-up/1-down staircase Speech Reception Threshold (SRT) estimation using VCV syllable tokens without requiring specialized laboratory rooms.
- Demonstrates a personalized masker selection module capturing individual auditory salience across everyday triggers like slurping and Styrofoam squeaking.
- Provides preliminary empirical evidence showing a performance gradient between standard, synthetic envelope-modulated, and personally annoying maskers.

## Problem

Misophonia affects an estimated 5-20% of the population, yet audiology lacks standardized, scalable assessment pathways that quantify its impact on speech understanding. Current diagnostic approaches rely heavily on subjective questionnaires and require expensive, calibrated sound booths and specialist examiners. This gap leaves millions of individuals with functional impairments unmonitored and unserved by conventional hearing healthcare frameworks.

## Method

The Sound Reactor Mission platform runs directly in modern web browsers and guides users through a six-minute space mission narrative consisting of five stages. The pipeline begins with an onboarding and audio calibration check for channel verification and volume control across consumer devices.

Next, an adaptive 1-up/1-down staircase algorithm estimates individual Speech Reception Thresholds (SRT) using amplitude-modulated noise with VCV syllable tokens. The procedure initializes at a +10 dB Signal-to-Noise Ratio (SNR), shifting from a 5 dB to a 2 dB step size following the initial reversal, and averages six reversal points. Participants then browse an everyday sound library, rating triggers on a misophonia annoyance scale to nominate their personal 'Premium Fuel' (masker).

Finally, participants undergo blocked speech identification at their individual SRTs across three distinct conditions: the personal Premium Fuel, a Synthetic Fuel sharing the temporal envelope of the annoying sound, and a Standard Fuel using amplitude-modulated noise. The framework captures per-condition accuracy, reaction times, and consonant confusion matrices to evaluate attentional and acoustic masking burdens.

## Experimental setup

Evaluated on a pilot cohort of 14 participants spanning six age bands from 18-24 to 65+. Metrics included session completion rate, mean session duration, adaptive SRT thresholds, per-condition speech intelligibility accuracy, Acceptable Noise Level (ANL) measures in audio units (AU), and sound preference distributions. The implementation is entirely browser-based, utilizing standard consumer headphones.

## Results

The pilot evaluation achieved a 100% session completion rate with a mean duration of 6.5 minutes. Adaptive SRT thresholds converged at a mean of -9.4 dB SNR (SD = 2.2 dB), though extreme low thresholds (-34 to -38 dB) indicated potential ceiling effects for high-performing listeners. Under identical SRT conditions among the subgroup with full comparative data, speech intelligibility dropped sequentially from Standard Fuel (86.3%) to Synthetic Fuel (71.7%) and further to the personalized Premium Fuel (59.2%). ANL noise tolerance followed a consistent directional trend, lowest for Premium Fuel (69.4 AU) and highest for Standard Fuel (75.2 AU).

| Masker Condition | Speech Intelligibility (%) | Acceptable Noise Level (AU) |
|---|---|---|
| Standard Fuel (Amplitude-Modulated Noise) | 86.3% | 75.2 |
| Synthetic Fuel (Envelope-Matched Noise) | 71.7% | 71.8 |
| Premium Fuel (Personalized Annoying Sound) | 59.2% | 69.4 |

## Limitations

The pilot study relies on a small sample size of 14 participants, limiting statistical power and broad clinical generalizability. Ceiling effects observed in participants with exceptionally low SRT thresholds (-34 to -38 dB SNR) indicate that current masker designs inadequately challenge high-performing listeners. Additionally, cross-device browser deployment introduces acoustic variability dependent on consumer headphone hardware rather than calibrated clinical transducers.

## Why read this

Speech and ML researchers focusing on hearing aid noise-reduction algorithms and digital health platforms should read this to understand how personalized, affective, and attentional noise factors impact speech intelligibility beyond generic acoustic metrics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Scalable web-based digital health screening, remote audiological assessment tools, and adaptive hearing aid noise-reduction algorithm optimization.

## Related

- (link related pages by id as the wiki grows)
