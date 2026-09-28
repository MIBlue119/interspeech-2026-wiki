---
id: xiao26b_interspeech
category: health
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2266
pdf: https://www.isca-archive.org/interspeech_2026/xiao26b_interspeech.pdf
---

# WSG: Clinically-Informed Weighted Speech Graphs for Dementia Detection

[PDF](https://www.isca-archive.org/interspeech_2026/xiao26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xiao26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2266)

**TL;DR** — Weighted Speech Graphs (WSGs) integrate semantic, phonological, spatial, and temporal attributes into speech graph edge weights to improve automated dementia detection, achieving performance comparable to full baseline feature sets using only one or two selected features.

## Problem

Traditional speech graph methods for dementia detection represent words merely as abstract tokens without capturing word meaning, pronunciation, spatial picture references, or timing. Overlooking these factors limits the ability to model cognitive indicators like semantic and phonological clustering or spatial picture description efficiency. Furthermore, building graphs from entire transcripts including filler words introduces noisy, highly connected nodes that distort graph connectivity measures.

## Method

The paper introduces Weighted Speech Graphs (WSGs) implemented via an open-source Python framework called PyWSG, using NetworkX for graph construction and feature extraction. Graphs are built exclusively from task-relevant target words (e.g., real words starting with 'p' for phonemic verbal fluency, WordNet animal terms for semantic verbal fluency, and Content Information Units for Cookie Theft Description) filtered via spellcheckers, dictionaries, and WhisperX timestamps. Directed edge weights are assigned using ConceptNet Numberbatch and SoundVectors cosine distances for semantic/phonological attributes, scaled Euclidean distances for spatial picture coordinates, and time differences for temporal intervals. Topological graph features—including number of nodes, edges, word count, diameter, average shortest path length (ASP), density, and average total degree (ATD)—are computed in both unweighted and weighted variants.

## Results

Evaluated on the CognoMemory dataset (110 recordings from 92 individuals) and the ADReSS dataset (156 recordings), classification experiments used Sequential Feature Selection (SFS) with Naïve Bayes classifiers. Using just one or two SFS-selected weighted features (such as phonologically weighted diameter for PVF, temporally weighted diameter and ASP for SVF, and spatially weighted ASP with word count for Cookie Theft), models achieved performance comparable to the full baseline feature sets. For instance, PVF tasks achieved AUC up to 0.89 using phonological diameter alone, where dementia patients showed shorter mean diameters (2.8) compared to healthy controls (5.3) due to fewer switches and less linear graphs.

## Code

- https://github.com/yaoxiao1999/weighted-speech-graphs

## Applications

Clinicians and digital health engineers building scalable, automated, and interpretable screening tools for early detection of Alzheimer's disease and related dementias from speech and language elicitation tasks.

## Limitations

Automatic transcriptions using WhisperX were necessary for datasets lacking manual transcripts, where poor audio quality in certain benchmarks required relying strictly on pre-existing manual transcripts.

## Related

- (link related pages by id as the wiki grows)
