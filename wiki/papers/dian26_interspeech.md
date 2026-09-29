---
id: dian26_interspeech
category: phonetics-linguistics
institutions: ["University of Oxford", "University of Cyprus"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2585
pdf: https://www.isca-archive.org/interspeech_2026/dian26_interspeech.pdf
---

# Reconciling Dynamic Data Analysis with Linguistic Reality: Comparing Legendre Polynomial Modelling and GAMM Applied to Prosodic Contact

*Angelo Dian, Mary Baltazani, Spyros Armostis, Elinor Payne*

[PDF](https://www.isca-archive.org/interspeech_2026/dian26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dian26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2585)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper evaluates and compares Legendre Polynomial modelling and Generalized Additive Mixed Modelling (GAMM) for analyzing contact-induced intonational variation in Cypriot Greek versus Athenian Greek, demonstrating that both methods converge on identifying two distinct Cypriot Greek continuation-rise patterns.

## Key contributions

- Evaluates two dynamic data analysis frameworks (Legendre Polynomials and GAMM) on the same intonational contact dataset.
- Replicates and extends previous archival findings using contemporary semi-spontaneous speech from young speakers, identifying two distinct Cypriot Greek continuation-rise patterns (CYG-nl and CYG-nh).
- Compares global geometric curve characterization (polynomial coefficients) against localized temporal difference detection (GAMM difference smooths).
- Provides methodological guidelines for matching dynamic statistical techniques to specific phonetic/phonological research questions in language contact scenarios.

## Problem

When languages or dialects come into contact, prosodic patterns can coexist, intertwine, or influence one another, creating surface contours that blur the boundaries between phonetics and phonology. Traditional static target-based approaches under the Autosegmental-Metrical (AM) framework often fail to capture the continuous functional organization of pitch contours and dynamic f0 trajectories. While dynamic modelling techniques like polynomials and GAMMs provide continuous curve descriptions, they lack an innate mapping to abstract phonological categories, creating a potential methodological mismatch that requires careful evaluation.

## Method

The study analyzes speech productions from 8 speakers of Athenian Greek (ATG) and 13 speakers of Cypriot Greek (CYG) from Nicosia, aged 18-30, performing semi-spontaneous conversation and map tasks. Utterances classified as broad-focus, non-final continuation rises ending in high boundary tones had their f0 extracted at 10 ms intervals via ESPS get_f0/praatsauce and converted into semitones per token within a Region of Interest (RoI) extending from the prenuclear syllable onset to phrase offset.

For polynomial modelling, a 4th-order polynomial was fitted to the RoI and expressed in an orthogonal Legendre basis, yielding five coefficients (c0–c4). Coefficients c1 (slope), c2 (curvature), and c3 (higher-order N-shape) were entered into linear mixed-effects regression (LMER) models with variety*tone as fixed effects and by-speaker slopes. For GAMM, models were fitted using bam() from the mgcv package with cubic regression splines, incorporating variety*tone as a parametric term, by-factor smooths over normalized RoI duration, and random smooths for speaker and token.

These design choices were made to contrast holistic geometric shape capture (polynomials, ideal for whole-contour borrowing evaluation) with localized temporal alignment and random-effects flexibility (GAMMs, ideal for system-internal fine-grained timing variations).

## Experimental setup

The dataset comprises speech data from 21 speakers (8 ATG, 13 CYG) collected via semi-spontaneous tasks and map-tasks. The systems compared are Athenian Greek (ATG), low-nuclear Cypriot Greek (CYG-nl), and high-nuclear variant Cypriot Greek (CYG-nh). Metrics include Legendre polynomial coefficients (c1–c3), GAMM estimated degrees of freedom, F-statistics, p-values, and pairwise difference smooths evaluated via itsadug.

## Results

Linear mixed-effects models on Legendre coefficients found a significant effect of variety*tone for slope, curvature, and N-shape (F(2,21.41) = 74.872, p < .001 for c1; F(2,21.11) = 9.892, p < .001 for c2; F(2,21.32) = 52.245, p < .001 for c3). Post-hoc tests demonstrated that the high-nuclear variant (CYG-nh) differs significantly from both CYG-nl and ATG by exhibiting reduced overall slope (lower c1), greater U-shaped curvature (higher c2), and a more pronounced N-like configuration (higher c3), whereas ATG and CYG-nl do not differ significantly.

GAMM model comparison confirmed a significant overall effect of variety*tone (difference = 465.725, df = 8, p < .001), with smooth differences localized between 29.2% and 49.5% of normalized RoI duration for CYG-nh versus ATG, and spanning 0–55.5% and 67.7–87.9% for CYG-nh versus CYG-nl.

| System / Condition | c1 (Slope) F-stat | c2 (Curvature) F-stat | c3 (N-Shape) F-stat | GAMM vs ATG p-value |
| :--- | :--- | :--- | :--- | :--- |
| ATG vs CYG-nl vs CYG-nh | F = 74.87 (p < .001) | F = 9.89 (p < .001) | F = 52.25 (p < .001) | p < .001 |

## Limitations

Both Legendre polynomial modelling and GAMMs require a degree of token pre-classification based on qualitative inspection, which introduces potential researcher bias and makes them less suitable for unstudied or under-documented languages. The study focuses exclusively on young speakers in specific urban centers (Nicosia and Athens) performing controlled map and conversation tasks, which may limit generalizability to broader rural dialects or spontaneous dialogue genres.

## Why read this

Phoneticians and speech researchers studying language contact or intonational variation will gain a rigorous comparative framework for choosing between holistic polynomial geometry and localized GAMM smooths.

## Code

- https://doi.org/10.5281/zenodo.20734758

## Applications

Analyzing intonational variation, prosodic contact phenomena, and dynamic acoustic trajectories in multilingual or dialectal speech corpora.

## Institutions / 機構

University of Oxford, University of Cyprus

**Funding / 經費:** Oxford University John Fell Fund, Economic and Social Research Council

## Related

- (link related pages by id as the wiki grows)
