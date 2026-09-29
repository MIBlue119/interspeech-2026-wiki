---
id: friedrichs26_interspeech
category: phonetics-linguistics
institutions: ["Zurich Forensic Science Institute", "University of Zurich"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1883
pdf: https://www.isca-archive.org/interspeech_2026/friedrichs26_interspeech.pdf
---

# Acoustic Pharyngometry as an Auditable Anchor for Cross-Speaker EMA Normalization

*Daniel Friedrichs, Valeriia Vyshnevetska*

[PDF](https://www.isca-archive.org/interspeech_2026/friedrichs26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/friedrichs26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1883)

**Category:** `phonetics-linguistics`

**TL;DR** — The paper introduces an auditable, pharyngometry-anchored normalization method for electromagnetic articulography (EMA) that reduces cross-speaker trajectory dispersion by 16.5% but fails to improve leave-one-speaker-out formant prediction.

## Key contributions

- A palate-referenced EMA normalization pipeline combining uniform palate-length scaling with a pharyngometry-derived oral landmark anchoring a low-parameter anterior-posterior (A-P) warp.
- Extraction of robust hard-palate envelopes via A-P binning and envelope fitting to eliminate backtracking/loop artifacts.
- Demonstration that uniform scaling accounts for the vast majority (15.7% out of 16.5%) of between-speaker trajectory dispersion reduction in DDK sequences.
- Comprehensive evaluation showing that spatial alignment does not translate to improved speaker-independent articulatory-to-acoustic mapping.

## Problem

Cross-speaker kinematic analyses using electromagnetic articulography (EMA) are severely confounded by differences in vocal-tract morphology. Standard head corrections and palate-based coordinate definitions fail to eliminate morphology-driven positional offsets across speakers. Existing alternatives range from rigid global transforms to highly flexible nonrigid mappings like thin-plate splines, but these often lack interpretability and auditability. Consequently, researchers need normalization procedures that explicitly correct for specific anatomical factors while remaining phonetically transparent and inspectable.

## Method

The method processes synchronous EMA (1250 Hz) and audio (48 kHz) data from 29 German-speaking adults (14 with valid EMA palate traces and pharyngometry landmarks). EMA trajectories are rigidly head-corrected and expressed in a 2D midsagittal palate-referenced frame tracking three tongue sensors: tongue tip (TT), tongue blade (TB), and tongue dorsum (TD). A robust hard-palate envelope is estimated by binning points along the anterior-posterior (A-P) axis, extracting an upper envelope, and fitting a smooth curve. Its A-P extent defines a palate-length proxy $L_{pal}^{(s)}$ used for global scaling.

Acoustic pharyngometry provides distance-indexed area functions $A_s(d)$ averaged across four trials. After smoothing with a Savitzky-Golay filter (polynomial order 3, window length 11), two landmarks are extracted: an oral-cavity expansion peak $d_{peak}^{(s)}$ (0-8 cm) and the oral-pharyngeal junction (OPJ) minimum $d_{OPJ}^{(s)}$ (6-14 cm). The oral landmark is normalized as a unitless proportion $u_{peak} = (d_{peak} - d_0) / (d_{OPJ} - d_0)$ to anchor a monotonic A-P piecewise warp in palate-normalized coordinate space $u = (x - x_{ant})/L_{pal}$. The superior-inferior (S-I) axis is scaled uniformly by $L_{canon}/L_{pal}^{(s)}$ without warping.

Evaluations include DDK (diadochokinetic) blocks with vowels /i,a,u/ and sustained vowels (/i, y, e, ø, E, a, o, u/). Formants (F1, F2) are extracted via Burg LPC in Praat. Leave-one-speaker-out (LOSO) ridge regression (L2-regularized, tuning penalty $\lambda$ via inner CV) predicts F1 and F2 from concatenated 6D tongue positions, tested across Hz, Bark, VTLN-style length scaling, and palate-relative constriction predictors. Speaker identification is tested via multinomial logistic regression across cycles, comparing full trajectories, centered positions, and velocity-only features.

## Experimental setup

Evaluated on a German multimodal dataset comprising synchronous EMA and audio for 29 speakers (14 utilized after strict quality control on palate traces and pharyngometry landmarks). Data includes high-repetition DDK sequences and sustained vowels. Baselines include unnormalized baseline coordinates and scale-only uniform normalization. Metrics include mean pairwise Euclidean distance (between-speaker dispersion), Pearson correlation $r$ and RMSE for LOSO formant prediction, and classification accuracy for speaker identification across 5-fold cross-validation.

## Results

Scale-only normalization reduced mean between-speaker dispersion from 31.28 mm to 26.36 mm (15.7% reduction; 91 speaker pairs, $N=14$), while adding the pharyngometry-anchored A-P warp yielded a minor additional decrease to 26.13 mm (16.5% total reduction). However, LOSO ridge regression for formant prediction did not improve with the warp: F1/F2 correlations dropped compared to scale-only across all target modes (e.g., standard Hz correlation for scale-only was 0.381/0.646 versus 0.282/0.612 for scale+warp).

Speaker identification accuracy from absolute trajectory positions actually increased after normalization, rising from 0.751 (baseline) to 0.800 (scale-only) and 0.902 (scale+warp), whereas performance dropped sharply to chance levels (approx. 0.071 chance, velocities at ~0.161) when using velocity-only or mean-centered positional features. This demonstrates that decodable speaker identity is heavily dominated by static positional offsets that a 1D A-P warp preserves rather than removes.

| Coordinate Condition | Dispersion (mm) | DDK LOSO F1/F2 ($r$) | Speaker ID Accuracy |
| :--- | :--- | :--- | :--- |
| Baseline | 31.28 | 0.387 / 0.640 | 0.751 |
| Scale-only | 26.36 | 0.381 / 0.646 | 0.800 |
| Scale+warp | 26.13 | 0.282 / 0.612 | 0.902 |

## Limitations

The study is limited by a small sample size ($N=14$ speakers with complete multimodal data) drawn from a single language (German). The non-rigid mapping is restricted to a 1D anterior-posterior warp, which cannot capture complex 2D variations in palate curvature, vertical tongue shaping, or pharyngeal geometry. Additionally, acoustic pharyngometry measurements are static and sensitive to posture and mouthpiece protocol variations.

## Why read this

Speech researchers and engineers working on cross-speaker kinematic normalization or articulatory-to-acoustic mapping should read this to understand why achieving geometric trajectory alignment does not inherently yield speaker-independent acoustic prediction.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cross-speaker articulatory analysis, phonetic comparison, and phonetic corpus standardization.

## Institutions / 機構

Zurich Forensic Science Institute, University of Zurich

**Funding / 經費:** Swiss National Science Foundation

## Related

- [How Speaker Normalization Procedures Influence the Computational Modelling of Non-native Vowel Perception: Implications for the L2LP model](lee26l_interspeech.md) — same problem · relatedness 2.0/3
- [The ArtComp dataset: Articulatory and Acoustic Measurements of Swedish in Speech with Naturally Manipulated Jaw Position](cortes26_interspeech.md) — complementary · relatedness 1.9/3
- [Toward an Articulatory Weakness Index for Speech Kinematics in Parkinson’s Disease](baligar26_interspeech.md) — complementary · relatedness 1.9/3
- [Beyond Speaker Independence: Evaluating Cross-Lingual Acoustic-to-Articulatory Inversion Across Finnish and Russian](pandey26_interspeech.md) — same problem · relatedness 1.8/3
- [How Bilingual Are SSL Speech Models? Cross-Lingual Probing of Articulatory Encoding with Finnish and Russian EMA](pedro26_interspeech.md) — shared data / evaluation · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
