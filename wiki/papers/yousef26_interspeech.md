---
id: yousef26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2777
pdf: https://www.isca-archive.org/interspeech_2026/yousef26_interspeech.pdf
---

# Modeling Lombard Effects in Voice Disorders Using Daily-Life Monitoring of Ambient Noise and Voice Acoustics

[PDF](https://www.isca-archive.org/interspeech_2026/yousef26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yousef26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2777)

**TL;DR** — This paper analyzes ambulatory voice and ambient noise monitoring data from 42 participants to model real-world Lombard effects in voice disorders, finding that cepstral peak prominence (CPP) provides the strongest coupling with noise and best distinguishes between phonotraumatic and non-phonotraumatic vocal hyperfunction.

## Problem

Real-world Lombard effects—vocal adjustments made in noisy environments—are poorly understood in patients with voice disorders, as prior evidence relies heavily on controlled laboratory studies rather than dynamic daily-life monitoring. Furthermore, studying these effects is clinically important because maladaptive phonatory adjustments in noise can increase vocal tissue loading and exacerbate voice disorder symptoms. Existing ambulatory studies have largely overlooked disorder-specific adaptations and focused narrowly on sound pressure level (SPL) and fundamental frequency (F0), missing broader shifts in voice quality.

## Method

The study collected 2 to 4 days of continuous ambulatory recordings (≥ 10 hours/day) from 14 patients with phonotraumatic vocal hyperfunction (PVH), 10 patients with non-phonotraumatic vocal hyperfunction (NPVH), and 18 healthy controls. A neck-worn accelerometer captured vocal metrics (SPL, F0, CPP, and the first-minus-second harmonic magnitude H1H2), while a shoulder-mounted noise dosimeter recorded ambient A-weighted equivalent noise levels (Leq). Features were extracted across 3-minute non-overlapping windows. Four regression models—linear regression, second-order polynomial Ridge/Lasso, and gradient-boosted regression trees (GBR)—were trained using 5-fold cross-validation to predict voice statistics from ambient noise mean and standard deviation (Leq SD).

## Results

Across groups, SPL, F0, and CPP increased while H1H2 decreased with higher ambient noise, with CPP showing the strongest correlation (r = 0.36 to 0.53) and highest predictability (max test r² = 0.32 for CPP in PVH). Nonlinear models outperformed linear regression across all final configurations. PVH patients exhibited a steeper SPL slope (0.65 dB/dB Leq mean) and larger CPP slope (0.18 dB/dB Leq mean) compared to NPVH patients, whereas control participants showed the strongest F0 increases with noise.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers, clinicians, and researchers developing wearable health monitors, digital biomarkers for voice pathology, or adaptive communication systems in noisy environments.

## Limitations

The predictive power of voice features from noise metrics was modest, and there were age differences across the participant groups.

## Related

- (link related pages by id as the wiki grows)
