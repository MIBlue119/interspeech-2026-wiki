---
id: pedro26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1324
pdf: https://www.isca-archive.org/interspeech_2026/pedro26_interspeech.pdf
---

# How Bilingual Are SSL Speech Models? Cross-Lingual Probing of Articulatory Encoding with Finnish and Russian EMA

[PDF](https://www.isca-archive.org/interspeech_2026/pedro26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pedro26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1324)

**TL;DR** — This paper evaluates cross-lingual articulatory encoding in self-supervised speech models using electromagnetic articulography (EMA) data from bilingual Finnish-Russian speakers, demonstrating strong prediction performance (Pearson r up to 0.69) with only five minutes of training data.

## Problem

While self-supervised learning (SSL) speech models capture rich acoustic and phonetic information, how they encode physical articulatory dynamics across typologically distinct and multilingual settings remains largely unexplored. Most prior work focused on monolingual English read speech, leaving open questions about how language background, second-language proficiency, and spontaneous speech tasks affect articulatory representation.

## Method

The authors analyze 24-layer transformer-based SSL models (Wav2Vec 2.0 Large, MMS-300m, XLSR-53, and language fine-tuned variants) using the FROST-EMA corpus, which contains parallel acoustic and 10-dimensional EMA coordinate data from 18 bilingual Finnish-Russian speakers across 9 conditions (combining L1, L2, and accented speech with read and spontaneous tasks). They extract hidden representations from all transformer layers and train linear regression probes on 80/20 train-test splits. Key experimental axes include cross-model comparisons, sensor-layer profiling, training-data size sensitivity (20 seconds to 20 minutes), leave-one-speaker-out generalization, and task/proficiency condition stratifications.

## Results

MMS-300m and language-specific fine-tuned XLSR variants achieve the highest mean articulatory prediction scores (Pearson r ≈ 0.69), outperforming standard XLSR-53 (r = 0.62). Articulatory information consistently peaks at intermediate transformer layers across models, and tongue movements are substantially more predictable than lip movements (particularly upper lip Z). Probing performance saturates rapidly after approximately 5 minutes of training data. Controlled reading tasks yield higher correlations (r ≈ 0.70–0.74) than spontaneous picture descriptions (r ≈ 0.58–0.62), while L2 speech demonstrates robust articulatory match (up to r ≈ 0.76) comparable to L1.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers studying acoustic-to-articulatory inversion, low-resource articulatory modeling, computer-aided pronunciation training, and clinical speech assessment.

## Limitations

The study relies on a modest active cohort of 5 bilingual speakers for detailed layer-wise probing configurations and is limited to linear probing probes.

## Related

- (link related pages by id as the wiki grows)
