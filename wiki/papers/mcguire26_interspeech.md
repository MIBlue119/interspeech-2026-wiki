---
id: mcguire26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3116
pdf: https://www.isca-archive.org/interspeech_2026/mcguire26_interspeech.pdf
---

# Lexical stress-conditioned spatiotemporal gestural coordination in L2 English

*Paul McGuire, Michael Proctor, Feng-fan Hsieh, Yueh-chin Chang*

[PDF](https://www.isca-archive.org/interspeech_2026/mcguire26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mcguire26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3116)

**TL;DR** — This paper investigates how L1 Taiwanese Mandarin speakers produce English lexical stress in the supralaryngeal articulation of the syllable /flIkt/, finding that 4 out of 6 speakers successfully achieve stress-conditioned separation using multivariate functional principal component analysis (FPCA). Results indicate that successful stress production relies on joint spatiotemporal reorganisation—specifically greater jaw lowering and temporal expansion—rather than duration alone, and failure to separate correlates with higher foreign accent ratings and constriction target ordering errors.

## Key contributions

- Applies multivariate functional principal component analysis (FPCA) with landmark-based temporal registration to evaluate supralaryngeal gestural coordination for L2 English lexical stress without using acoustic cues.
- Demonstrates that 4 out of 6 L1 Taiwanese Mandarin speakers produce statistically significant separation between stressed and unstressed tokens of /flIkt/ in FPCA score space.
- Identifies that speakers with the highest perceived foreign accent ratings (AR 6.0 and 6.5) fail to achieve stress-conditioned separation and exhibit abnormal temporal sequencing reversals in consonant clusters.
- Reveals through perturbation plots that successful lexical stress realization involves coordinated jaw lowering during the vocalic interval and higher lower-lip position during the onset /f/ constriction alongside temporal expansion.

## Problem

Taiwanese Mandarin (TWM) is a syllable-timed tonal language lacking a perceptually salient lexical stress contrast, leading L2 learners to rely heavily on fundamental frequency (F0) while struggling with supralaryngeal articulatory correlates. Prior work on L2 English stress has primarily focused on acoustic parameters or isolated vowel midpoint measurements (using corpora or EMA), neglecting consonantal gestures, whole-syllable intergestural coordination, and the impact of perceived foreign accentedness. Consequently, it remains poorly understood whether and how learners without lexical stress in their native language coordinate spatial and temporal articulatory gestures across an entire syllable to signal English stress contrasts.

## Method

The study analyzes electromagnetic articulography (EMA) recordings of the second syllable /flIkt/ (from the noun-verb pair CONflict – conFLICT) captured via a Carstens AG501 system at 1,250 Hz (down-sampled to 250 Hz). Sensors track lower lip (LL), tongue tip (TT), tongue dorsum (TD), and lower incisor/jaw (JAW), alongside head-movement correction sensors. The findgest algorithm identifies four primary consonantal gestures in the vertical (z) dimension: LL for /f/, TT for /l/, TD for /k/, and TT for /t/. Six temporal landmarks are established: Landmark 1 (syllable onset/GONS movement for /f/), Landmark 2 (/f/ constriction/NONS), Landmark 3 (/l/ constriction), Landmark 4 (/k/ constriction), Landmark 5 (/t/ constriction), and Landmark 6 (syllable offset/GOFFS movement for /t/). Monotonic ordering is enforced for 6 out of 98 tokens where adjacent landmarks briefly reverse. 

Multivariate functional principal component analysis (FPCA) with landmark-based temporal registration is applied to combine spatial trajectories (LL, TT, TD, JAW) with temporal variation represented by a log time-warping function. JAW is included strictly as a spatial dimension bounded by global syllable landmarks due to overlap with the tongue dorsum. This design cleanly models stress-conditioned differences as joint spatiotemporal patterns. Permutation-based MANOVA (PERMANOVA with 999 permutations, Euclidean distance) assesses the separation of stressed (FLICT) and unstressed (flict) tokens within each speaker's 2D FPCA score space (PC1–PC2), which is further analyzed using spatial and temporal perturbation plots.

## Experimental setup

Ten native Taiwanese Mandarin university speakers were initially recruited, reading disyllabic minimal pairs in a carrier phrase ("Say again") with 8-10 repetitions per item, but 4 speakers were excluded due to inconsistent production of complex consonant clusters. The final analysis covers 6 speakers (08F, 09M, 05M, 02M, 01M, 07F) contributing a total of 98 usable tokens (ranging from 10 to 16 tokens per speaker across conditions). Two L1 English instructors with extensive teaching experience in Taiwan rated perceived foreign accentedness on a 9-point scale (Interrater agreement ICC(2,2) = 0.947). Evaluation metrics comprise PERMANOVA p-values, R-squared variance explained, F-statistics, and Proportion of Variance Explained (PVE) by PC1 and PC2.

## Results

PERMANOVA tests on PC1-PC2 score space reveal significant stress-conditioned separation for four speakers: 08F (p = 0.001, R^2 = 0.413, F = 12.7), 09M (p = 0.005, R^2 = 0.240, F = 5.68), 05M (p = 0.014, R^2 = 0.416, F = 5.69), and 02M (p = 0.007, R^2 = 0.246, F = 5.53). Conversely, the two speakers with the highest perceived foreign accentedness ratings (AR) fail to show separation: 01M with AR 6.0 (p = 0.104, R^2 = 0.135) and 07F with AR 6.5 (p = 0.702, R^2 = 0.036). 

PC1 perturbation plots demonstrate that separated tokens undergo spatial-temporal expansion characterized by greater jaw lowering in the vocalic interval (L3–L4), higher lower-lip positions at /f/ constriction, and elongated registered time axes. Crucially, overall syllable duration alone does not drive FPCA separation; speaker 01M exhibits large duration differences between conditions yet fails to separate, underlining the necessity of coordinated gestural timing. The two unseparated speakers also display target-achievement ordering reversals (L3 preceding L2 in 07F; L5 preceding L4 in 01M), pointing to unstable consonant sequencing.

| Speaker | AR | p-value | R^2 | F-statistic | FPCA Separation Status |
|---|---|---|---|---|---|
| 08F | 3.5 | 0.001 | 0.413 | 12.7 | Significant |
| 09M | 3.5 | 0.005 | 0.240 | 5.68 | Significant |
| 05M | 5.0 | 0.014 | 0.416 | 5.69 | Significant |
| 02M | 5.0 | 0.007 | 0.246 | 5.53 | Significant |
| 01M | 6.0 | 0.104 | 0.135 | 2.49 | Not Significant |
| 07F | 6.5 | 0.702 | 0.036 | 0.339 | Not Significant |

## Limitations

The study relies on a very small sample size of only 6 speakers and 98 total usable tokens, restricting statistical generalizability and precluding multi-speaker mixed-effects modeling of accentedness ratings. The dataset is narrowly scoped to a single syllable type (/flIkt/) and a single lexical pair (CONflict / conFLICT), meaning findings may not extend to other syllable structures or prominence types. Furthermore, exclusions due to speakers' inability to produce complex TWM non-native consonant clusters introduce a survivor bias toward more proficient L2 speakers.

## Why read this

Phoneticians and speech researchers studying second-language acquisition should read this paper to see how functional principal component analysis with landmark-based temporal registration can isolate non-acoustic articulatory coordination in speech. It offers a concrete methodological blueprint for evaluating supralaryngeal gestural timing without relying on acoustic confounds like F0.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Diagnostic tools for computer-aided pronunciation training (CAPT) and speech therapy targeting L2 articulatory gestural timing and coordination.

## Related

- (link related pages by id as the wiki grows)
