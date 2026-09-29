---
id: withanage26_interspeech
category: phonetics-linguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2855
pdf: https://www.isca-archive.org/interspeech_2026/withanage26_interspeech.pdf
---

# Articulatory Entrainment and Coordination Complexity in Spontaneous Autistic and Non-autistic Dialogue

*Thanushi Withanage, Carol Espy-Wilson, Elizabeth Redcay, Desi Jones, Noah Sasson*

[PDF](https://www.isca-archive.org/interspeech_2026/withanage26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/withanage26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2855)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper introduces a speaker-independent, non-invasive framework using acoustic-to-articulatory speech inversion to measure articulatory entrainment and coordination complexity in spontaneous dyadic conversations across autistic and non-autistic adults. The authors find that non-autistic and same-neurotype dyads exhibit increasing articulatory coordination complexity and robust entrainment over time—which correlates positively with perceived conversational success—whereas mixed-neurotype dyads show patterns reflecting sustained or increased articulatory effort.

## Key contributions

- Introduces a speaker-independent, non-invasive quantitative framework to track articulatory entrainment using vocal tract variables derived via acoustic-to-articulatory speech inversion.
- Formulates higher-order articulatory coordination feature (ACF) matrices and 90-dimensional eigenvalue eigenspectra to capture phonetic convergence and temporal phasing complexity without invasive sensors.
- Analyzes large-scale naturalistic spontaneous dialogue across 1,381 non-autistic CANDOR dyads and 62 UTD neurodiverse dyads (AT-AT, AT-NA, NA-NA).
- Establishes a empirical link between articulatory entrainment metrics and self-reported perceived conversational success (PCS).

## Problem

Prior studies measuring articulatory kinematics relied heavily on invasive measurement techniques like electromagnetic articulography (EMA) or ultrasound, which require specialized laboratory setups and disrupt natural conversational speech. Furthermore, most acoustic-phonetic investigations utilize controlled, task-based, or semi-structured paradigms (e.g., shadowing, word repetition, map-tasks) or read speech, failing to capture the variability, coarticulation, and articulatory undershoot present in spontaneous dialogue. This gap is especially pronounced in autism research, where communications between autistic and non-autistic individuals are frequently mischaracterized by deficit-based assumptions rather than analyzing the specific articulatory dynamics driving cross-neurotype interactions.

## Method

Audio streams were preprocessed via 14 dB speech enhancement, Silero VAD (for CANDOR 30-minute chunks) or Pyannote diarization (for UTD 3-minute chunks), and fed into an acoustic-to-articulatory inversion system. This extracts six time-varying vocal tract variables (TVs): lip aperture, lip protrusion, tongue tip constriction degree/location, and tongue body constriction degree/location. Pairwise cross-correlations among TV channels with a 7-second fixed delay form the Articulatory Coordination Feature (ACF) matrix, from which a 90-dimensional rank-ordered eigenspectrum is computed.

A weighted sum of geometric decay score (W) with decay parameter alpha = 0.51 (optimized via Cohen's d for maximum separation) reduces each eigenspectrum to a scalar measure ws. Temporal entrainment (e) is then calculated by evaluating how the gap in the speaker's weighted eigenscores (delta omega) changes from the first half of the conversation to the second half, normalizing directional shifts relative to initial inter-speaker separation. This formulation robustly handles convergence (positive entrainment) versus divergence or stabilization across various initial configurations.

## Experimental setup

Evaluated on two primary corpora: the CANDOR dataset comprising 1,381 non-autistic–non-autistic (NA–NA) 30-minute unacquainted dyadic Zoom conversations, and a subset of the UTD dataset containing 62 dyadic interactions (18 AT-AT, 31 AT-NA, 13 NA-NA) from 5-minute face-to-face get-to-know-you chats. Metrics include repeated-measures ANOVA, FDR-corrected pairwise comparisons, weighted eigenscore distance trajectories, and post-session perceived conversational success (PCS) survey ratings.

## Results

For NA–NA CANDOR dyads, mean weighted eigenscores (omega) decreased significantly from the first to second half (0.3552 to 0.3352; repeated-measures ANOVA F(1, 1380) = 170.54, p < 0.001) and across quarters (0.3904 down to 0.3560; F(3, 4134) = 136.81, p < 0.001), indicating that articulatory coordination complexity increases as conversations progress and participants grow comfortable. The largest drop in mean omega occurs within the first 7 minutes. A majority of conversations exhibiting positive entrainment (e > 0) correspond to high perceived conversational success (PCS).

In the UTD neurodiverse dataset, NA–NA dyads showed the highest level of entrainment, followed by AT–AT dyads (which maintained stable complexity throughout), while mixed AT–NA dyads showed the lowest entrainment and tended to shift toward simpler coordination at the end, consistent with the double empathy framework and Lindblom's hypo-/hyper-articulation theory.

| Dyad Group / Condition | Temporal Phase / Metric | Quantitative Outcome | Primary Finding |
| :--- | :--- | :--- | :--- |
| CANDOR (NA–NA) | First Half vs. Second Half ($\omega_s$) | 0.3552 $\rightarrow$ 0.3352 ($p < 0.001$) | Coordination complexity increases over time |
| CANDOR (NA–NA) | Quarter 1 vs. Quarter 4 ($\omega_s$) | 0.3904 $\rightarrow$ 0.3560 ($p < 0.001$) | Sharpest coordination change occurs in early dialogue |
| UTD Dataset | Dyad Entrainment Tendency | NA–NA > AT–AT > AT–NA | Same-neurotype dyads show higher alignment than mixed dyads |

## Limitations

The study's scope is bounded by relying on an acoustic-to-articulatory inversion model rather than direct fleshpoint tracking (EMA), which introduces estimation noise. The UTD dataset sample size is relatively small (62 dyads total, with only 18 AT-AT dyads), limiting deep statistical granularity across subgroups. The analysis does not yet extend to child populations or multi-participant workplace settings, and relies on self-reported survey data for conversational success.

## Why read this

Speech and ML researchers studying conversational dynamics, phonetic convergence, or automated social signal processing will find a novel, highly interpretable framework that transforms raw audio into geometric articulatory spectra. It offers a principled alternative to black-box transformer models for quantifying interpersonal alignment and neurodiverse interaction patterns.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated analysis of conversational quality, computer-mediated communication profiling, social skills coaching, and developing empathetic conversational AI agents sensitive to neurodiverse interaction styles.

## Institutions / 機構

University of Maryland, University of Texas at Dallas

**Funding / 經費:** Grand Challenge grant from University of Maryland

## Related

- (link related pages by id as the wiki grows)
