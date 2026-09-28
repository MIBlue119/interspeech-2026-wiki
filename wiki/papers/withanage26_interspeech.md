---
id: withanage26_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2855
pdf: https://www.isca-archive.org/interspeech_2026/withanage26_interspeech.pdf
---

# Articulatory Entrainment and Coordination Complexity in Spontaneous Autistic and Non-autistic Dialogue

[PDF](https://www.isca-archive.org/interspeech_2026/withanage26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/withanage26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2855)

**TL;DR** — This paper introduces a speaker-independent, non-invasive framework using acoustic-to-articulatory speech inversion to quantify vocal tract entrainment and coordination complexity in spontaneous conversations across autistic and non-autistic dyads.

## Problem

Prior studies on articulatory entrainment and phonetic convergence have predominantly relied on controlled, task-based setups or invasive measurement techniques like electromagnetic articulography, leaving naturalistic spontaneous dialogue underexplored, particularly among autistic populations. Understanding these dynamics is crucial for moving away from deficit-based narratives and capturing how neurodiversity influences interactional alignment. Without non-invasive, interpretable acoustic-to-articulatory tools, it remains difficult to examine how vocal tract coordination evolves over time in everyday conversation.

## Method

The framework processes mono audio streams using speech enhancement and voice activity detection, breaking conversations into chunks. It extracts six time-varying vocal tract variables (TVs)—such as lip aperture, tongue tip constriction, and tongue body constriction—via an acoustic-to-articulatory speech inversion technique. Articulatory coordination feature (ACF) matrices and 90-dimensional eigen spectra are generated to represent coordination structure, from which a weighted geometric decay score emphasizes prominent eigenvalues (with parameter alpha set to 0.51). Finally, directional entrainment scores are computed by measuring changes in inter-speaker eigenvalue distance across the first and second halves of conversations.

## Results

Evaluated on the CANDOR dataset (1,381 non-autistic dyads) and a UTD subset (62 dyads: 18 autistic-autistic, 31 autistic-non-autistic, 13 non-autistic), a repeated-measures ANOVA on non-autistic dyads showed a significant main effect of conversation half on coordination complexity (decreasing from 0.3552 to 0.3352, F(1, 1380) = 170.54, p < 0.001). Non-autistic dyads exhibited increasing coordination complexity and stronger entrainment over time, autistic dyads showed moderate effects, and mixed-neurotype dyads demonstrated the least alignment. Furthermore, greater articulatory entrainment correlated positively with self-reported perceived conversational success.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers, psychologists, and clinicians studying human interaction dynamics, neurodiversity, and computational models of social rapport in dialogue systems.

## Related

- (link related pages by id as the wiki grows)
