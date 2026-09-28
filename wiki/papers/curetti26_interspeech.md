---
id: curetti26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2534
pdf: https://www.isca-archive.org/interspeech_2026/curetti26_interspeech.pdf
---

# Towards an understanding of prosodic cue weighting for turn-end classification in older adults with varying hearing abilities

[PDF](https://www.isca-archive.org/interspeech_2026/curetti26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/curetti26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2534)

**TL;DR** — Older adults with hearing loss and typical hearing both perform above chance on turn-end classification, but rely on fundamentally different prosodic cue-weighting strategies.

## Problem

Sensorineural hearing loss can limit access to prosodic cues or alter their perceptual weighting, leading to conversational timing differences. However, the exact perceptual basis of how hearing-impaired listeners judge utterance completion remains unclear, leaving a gap in understanding real-time spoken interaction difficulties.

## Method

The study evaluated 112 older adults (55 with typical hearing, 57 with hearing loss based on online Digit Triplet Test scores) performing a forced-choice classification task on 40 items across 80 recorded declarative question stimuli (finished vs. continuing). Four acoustic measures were extracted to capture boundary strength and pitch movement: target word duration, mean intensity, rise duration, and pitch rise excursion. Rank-based regression models with backward elimination were fitted separately for each listener group and stimulus version to predict accuracy from z-standardized prosodic measures and their interactions.

## Results

Sensitivity did not significantly differ between groups (p = 0.12), and all groups performed above chance. For finished stimuli, typical hearing listeners relied on boundary strength cues, showing a significant interaction between intensity and duration where higher intensity hindered performance on shorter words (R² = 0.28). In contrast, hearing-impaired listeners ignored duration and intensity, relying instead on pitch movement metrics (rise duration and excursion) to determine completion (R² = 0.24). Continuing stimuli models yielded no reliable predictors for either group (R² = 0.07 to 0.09).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and hearing researchers, audiologists, and developers of hearing assistive technologies aiming to model conversational dynamics and improve speech perception interventions for older adults.

## Limitations

The study was conducted online with uncontrolled listening environments, participants were categorized using a threshold rather than continuous metric, and overall task accuracy was only modestly above chance.

## Related

- (link related pages by id as the wiki grows)
