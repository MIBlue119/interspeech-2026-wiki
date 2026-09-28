---
id: yoshinaga26_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-559
---

# Noise Scaling Factor for the One-Dimensional Voice Production Model

**TL;DR** — Comparing a standard 1D acoustic turbulence-noise model against detailed 3D flow simulations shows the conventional noise scaling factor works well for normal phonation but needs adjustment for breathy voice and constricted vowel configurations.

## Problem

One-dimensional acoustic models of voice production incorporate aerodynamic turbulence noise at the glottis, important for breathy voice quality, but the accuracy of the scaling factor used in these models has rarely been directly examined against ground truth.

## Method

The authors evaluate the noise scaling factor used in a 1D noise model for the vowels /a/ and /u/ by comparing it against three-dimensional flow simulations that explicitly compute sound generation from turbulent airflow.

## Results

For normal phonation of /a/, the conventional scaling factor agrees well with the 3D simulation results, but for breathy phonation with an incompletely closed glottis, and for /u/ with supraglottal constriction, the optimal scaling factor differs from the conventional value.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving the physical accuracy of articulatory speech synthesis and voice-production models used in voice science and clinical voice research.

## Related

- (link related pages by id as the wiki grows)
