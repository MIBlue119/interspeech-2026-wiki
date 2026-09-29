---
id: ta26_interspeech
category: phonetics-linguistics
institutions: ["Peking University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1167
pdf: https://www.isca-archive.org/interspeech_2026/ta26_interspeech.pdf
---

# Age-related Differences in the Perception of Vowel Length Contrast in Northern Vietnamese: The Case of Hoang Van (Bac Ninh) Variety

*Van Dat Ta, Baoya Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/ta26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ta26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1167)

**Category:** `phonetics-linguistics`

**TL;DR** — This study investigates the perception of vowel length contrasts in Northern Vietnamese (Hoang Van variety) across older and younger generations, revealing that duration serves as the primary cue while F1/F2 act as secondary cues. The findings suggest an ongoing sound change where younger listeners exhibit higher sensitivity to duration than older listeners.

## Key contributions

- Conducted a controlled 2AFC perception experiment on the Hoang Van variety of Northern Vietnamese across 41 native speakers divided into younger and older age groups.
- Mapped the relative perceptual cue weights of vowel duration, F1, and F2, showing that duration is primary overall (β = 1.22, p < 0.001) followed by F1 (β = 0.97) and F2 (β = 0.15).
- Identified an age-related shift in cue weighting, where younger speakers rely more heavily on duration, whereas a subset of older speakers (6 out of 21) rely primarily on F1.
- Demonstrated through response time analyses that acoustically incongruent stimuli (mismatched duration and spectral quality) elicit significant processing delays (β = 0.15, p = 0.001) uniformly across age groups.

## Problem

While phonological vowel length contrasts typically rely on multiple acoustic cues, prior research on Northern Vietnamese had not systematically isolated the relative contributions of duration, F1, and F2, nor examined potential age-related perceptual differences within a single homogeneous speech community. Without controlled psycholinguistic experiments using apparent-time approaches, it remains unclear how synchronic variation initiates sound change. Addressing this gap requires testing how listeners from different generations integrate and weight duration and spectral cues during speech perception.

## Method

The study utilized base natural utterances (/ta:t 45/ 'to slap' and /tat 45/ 'to turn off') produced by a 42-year-old male speaker. Using Praat v6.4.38 and an LPC-based formant manipulation script, the authors constructed a 5-step duration continuum, a 3-step F1 continuum, and a 3-step F2 continuum, yielding 90 target stimuli (2 base sounds × 5 duration × 3 F1 × 3 F2) normalized for intensity (70 dB), f0, and VOT, alongside 30 filler items.

Participants completed a two-alternative forced-choice (2AFC) identification task on the Gorilla platform using Sony MDR-7506 headphones. Each stimulus was played twice, and participants had 5 seconds to respond via keyboard. Trials with response times <100 ms or >5000 ms were discarded. Statistical modeling relied on mixed-effects logistic regression models (using lme4 in R) with identification response as the dependent variable to determine log-odds coefficients for duration, F1, F2, and their interaction with generation. Response times were log-transformed and evaluated using linear mixed-effects regression to measure processing costs caused by cue incongruency.

## Experimental setup

The experiment evaluated 41 native speakers of Northern Vietnamese from Hoang Van commune, Bac Ninh province, divided into a younger group (n = 20, mean age 24.00) and an older group (n = 21, mean age 52.52). Each participant completed 240 trials (120 stimuli presented twice in random order). Baseline models compared younger versus older listener groups using mixed-effects logistic and linear regressions, with Marginal R² values of 0.547 and Conditional R² of 0.578 for identification models, and 0.174 / 0.476 for response time models.

## Results

At the group level, vowel duration emerged as the strongest predictor for identifying long vowels (β = 1.22, p < 0.001), followed by F1 (β = 0.97, p < 0.001) and F2 (β = 0.15, p = 0.004). Younger listeners showed significantly higher sensitivity to the duration cue compared to older listeners (duration × generation interaction: β = 0.25, p < 0.001). At the individual level, all younger participants used duration as their primary cue, whereas 6 out of 21 older participants relied primarily on F1. For response times, participants across both age groups responded significantly slower to duration-quality incongruent stimuli than to congruent stimuli (β = 0.15, p = 0.001), with no significant age-by-condition interaction.

| System / Condition | Duration Cue Weight (Log-Odds) | F1 Cue Weight (Log-Odds) | F2 Cue Weight (Log-Odds) | Mean RT Incongruent Penalty |
|---|---|---|---|---|
| Younger Group | Higher sensitivity (β = 1.22 + 0.25) | β = 0.97 (shared) | β = 0.15 (shared) | +0.15 log-ms |
| Older Group | β = 1.22 (baseline) | β = 0.97 (shared) | β = 0.15 (shared) | +0.15 log-ms |

## Limitations

The study is restricted to a single speech community (Hoang Van commune) and a single vowel pair (/a/ and /a:/) produced by a single male speaker voice. The sample size is relatively small (41 participants total), and the apparent-time inferences regarding sound change require longitudinal validation or production-side verification.

## Why read this

Phoneticians and speech researchers studying sound change, cue weighting, and psycholinguistic cue integration will find this a clean demonstration of how apparent-time paradigms uncover micro-variations in perceptual strategies.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving multi-cue speech recognition and synthesis systems by modeling human perceptual weighting and cognitive processing penalties of acoustic cue mismatches.

## Institutions / 機構

Peking University

**Funding / 經費:** National Social Science Fund of China

## Related

- (link related pages by id as the wiki grows)
