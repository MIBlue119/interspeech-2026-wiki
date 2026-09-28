---
id: he26d_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1149
pdf: https://www.isca-archive.org/interspeech_2026/he26d_interspeech.pdf
---

# Disentangling Acoustic Cues in Alzheimer’s Pathology and Perception: The Roles of Language and Gender

[PDF](https://www.isca-archive.org/interspeech_2026/he26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/he26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1149)

**TL;DR** — This study evaluates whether automated Alzheimer’s Disease diagnosis models align with human listener perceptions across languages and genders, finding significant alignment in Mandarin and female speakers but complete divergence in Greek and male speakers.

## Problem

Diagnostic speech AI for Alzheimer's Disease often operates as a black box, raising clinical trust issues regarding whether its internal logic aligns with acoustic cues human listeners actually perceive. Furthermore, pathological markers and perceptual strategies vary substantially across languages and genders, meaning a single global explainability model can mask critical demographic divergences.

## Method

The authors train Random Forest models on 21 global acoustic features spanning temporal/fluency, prosodic, phonatory, and articulatory domains using 30 picture description utterances per language from Mandarin (NCMMSC2021) and Greek (ADReSS-M) datasets. SHAP is used to extract global feature importance for both automated clinical AD classification and human perception regression (evaluated via 16 native Mandarin listeners using webMUSHRA), complemented by Generalized Linear Mixed-Effects Models (GLMER) to validate demographic interactions.

## Results

Mandarin models outperformed Greek models in both pathology classification (AUC=0.83 vs. 0.60) and perception regression (Pearson's r = 0.84 vs. 0.54). Female pathology models achieved an AUC of 0.79 while male pathology models performed at chance level (AUC=0.52), though both male and female perception models performed strongly (r = 0.73 and 0.74 respectively). Permutation tests (5000 permutations) confirmed that Greek and male pathology models did not significantly exceed chance (p > 0.05). GLMER analysis revealed significant gender interactions, notably a complete reversal in the effect of the second formant (MeanF2) between genders (interaction β = -1.411, p < 0.001).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinical speech AI developers and researchers building equitable, transparent diagnostic tools for neurological disorders across diverse demographics.

## Limitations

The sample size is limited to 30 utterances per language and relies on culturally homogeneous naive student listeners.

## Related

- (link related pages by id as the wiki grows)
