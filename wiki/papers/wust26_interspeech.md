---
id: wust26_interspeech
category: phonetics-linguistics
institutions: ["University of Berne"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-329
pdf: https://www.isca-archive.org/interspeech_2026/wust26_interspeech.pdf
---

# Applying the Simplified Vocal Profile Analysis to Swiss German Dialects

*Alessia Wüst, Adrian Leemann*

[PDF](https://www.isca-archive.org/interspeech_2026/wust26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wust26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-329)

**Category:** `phonetics-linguistics`

**TL;DR** — This study presents the first perceptual investigation of vocal profiles across Swiss German dialects, using the Simplified Vocal Profile Analysis (SVPA) protocol on 127 speakers. Results reveal a distinct Northeastern 'nasality belt' (correlating with uvular /r/) and gender-based supralaryngeal patterns, alongside low-to-fair inter-rater reliability (Fleiss' kappa 0.09-0.39).

## Key contributions

- Conducted the first empirical perceptual investigation of suprasegmental vocal profiles in Swiss German, moving past impressionistic historical accounts.
- Applied and evaluated the Simplified Vocal Profile Analysis (SVPA) protocol on spontaneous speech data, documenting inter-rater reliability across ten settings.
- Uncovered geographic stratification of voice quality, specifically identifying a Northeastern nasality belt and a Central Swiss pharyngeal expansion zone.
- Identified systematic gender differences in Swiss German vocal posture, showing that men exhibit more relaxed vocal tracts while women show higher rates of pharyngeal expansion.

## Problem

While Swiss German segmental phonetics are heavily documented, the suprasegmental domain of vocal profiles has remained a massive research gap with historical accounts being purely impressionistic. Prior work in Anglophone and Romance linguistics established that voice quality functions as a salient social marker of identity, but German-speaking varieties lacked rigorous empirical data. Applying standard frameworks is challenging due to the subjective nature of perceptual coding, high potential for rater disagreement, and the need to decouple regional linguistic features from social and demographic confounds.

## Method

The study utilized spontaneous speech extracted from a 10-minute conversational block at the end of interviews in the Swiss Dialäktatlas corpus. The analysis adapted the Simplified Vocal Profile Analysis (SVPA) protocol, which simplifies Laver's comprehensive scheme from fine-grained scalar judgments down to binary presence/absence categorical distinctions across ten vocal profile parameters against a defined neutral baseline. Four coders with varying phonetic experience underwent a calibration phase consisting of a training session with the protocol's author and reference sheet creation, followed by 127 individual sample ratings and five synchronous consensus review meetings to resolve discrepancies.

Statistical analysis relied on unweighted Fleiss' Kappa (κ) to quantify inter-rater reliability, evaluated against Landis and Koch benchmarks. Geographic mapping was implemented using QGIS-LTR with scalar interpolation via k-nearest neighbor smoothing (k=5) over the 127 survey locations. The methodological design purposely restricted the speaker sample to the younger demographic cohort (aged 18–40) to mitigate age-related physiological shifts in vocal tract tension, ensuring a balanced distribution of 64 male and 63 female subjects across disparate geographic points.

## Experimental setup

Evaluated a subsample of 127 speakers (one per survey site) from the Swiss Dialäktatlas corpus, comprising spontaneous smartphone-recorded audio captured at 44.1 kHz, 16-bit under remote Zoom supervision. Coder consistency was measured using Fleiss' Kappa (κ) and Z-scores with a significance threshold of p < 0.05. Geographic trends were visualized via QGIS using k-NN interpolation (k=5).

## Results

Inter-rater reliability (Fleiss' Kappa) spanned slight to fair ranges across parameters, with the velopharyngeal setting (nasality) achieving the highest agreement at κ=0.386 (p < 0.05), followed by voice type (κ=0.302) and vocal tract tension (κ=0.276). Visually-dependent settings such as mandibular (κ=0.095) and labial (κ=0.126) alongside the pharyngeal setting (κ=0.094) yielded the lowest agreement.

Socially, a significant gender split emerged: men exhibited a relaxed vocal tract ('hypoarticulation') significantly more often than women (24 vs. 10 speakers, χ²=7.67, p=0.022), whereas pharyngeal expansion was predominantly female (16 women vs. 3 men, χ²=10.70, p=0.001). Non-modal phonations were remarkably scarce; modal voice dominated 112 speakers, with creaky voice occurring in only ~9% of the cohort (12 speakers) and breathy/whispered types virtually absent. Geographically, nasality concentrated heavily in Northeast Switzerland (Appenzell, St. Gallen, Schaffhausen, Thurgau), overlapping with the regional uvular /r/ distribution, while pharyngeal expansion clustered in Central Switzerland (Uri, Schwyz), though the latter is likely confounded by a slight local overrepresentation of female speakers.

| Rank | SVPA Setting | Kappa (κ) | z-Score | p-Value | Agreement Level |
|---|---|---|---|---|---|
| 1 | Velopharyngeal | 0.386 | 10.7 | <0.05 | Fair |
| 2 | Voice Type | 0.302 | 10.8 | <0.05 | Fair |
| 3 | Vocal Tract Tension | 0.276 | 9.95 | <0.05 | Fair |
| 4 | Apical | 0.213 | 6.02 | <0.05 | Fair |
| 5 | Laryngeal Tension | 0.173 | 6.08 | <0.05 | Slight |

## Limitations

Inter-rater reliability was generally low (Fleiss' κ < 0.40), confirming that binary SVPA simplification does not fully eliminate subjective auditory variance. The dataset is limited to one speaker per survey site, forcing spatial visualizations to rely on interpolation rather than dense local sampling. Audio-only recording constraints degraded the assessment of visual articulatory features like lip and jaw settings. Additionally, demographic imbalances in local subsamples (such as female overrepresentation in Central Switzerland) confound geographic interpretations of pharyngeal expansion.

## Why read this

Phoneticians and sociolinguists should read this paper to understand the methodological bottlenecks and reliability limits of applying Simplified Vocal Profile Analysis to dialect corpora. It provides a rare empirical blueprint for mapping suprasegmental voice qualities across a complex, multilingual regional landscape.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Geographic sociophonetic mapping, automated voice quality auditing for dialect identification systems, and forensic speaker profiling.

## Institutions / 機構

University of Berne

**Funding / 經費:** Swiss National Science Foundation

## Related

- [Acoustic correlates of voice quality settings: variation within and between individual speakers](paver26_interspeech.md) — same problem · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
