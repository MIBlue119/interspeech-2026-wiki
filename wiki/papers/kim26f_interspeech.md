---
id: kim26f_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-664
pdf: https://www.isca-archive.org/interspeech_2026/kim26f_interspeech.pdf
---

# ArtBoost: Synthetic Articulatory Data Augmentation for Acoustic-to-Articulatory Inversion

[PDF](https://www.isca-archive.org/interspeech_2026/kim26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-664)

**TL;DR** — ArtBoost is a synthetic articulatory data augmentation framework for acoustic-to-articulatory inversion that leverages speech-mesh datasets to improve prediction performance, yielding up to a 45.3% improvement in Pearson correlation coefficient on low-resource benchmarks.

## Problem

Acoustic-to-articulatory inversion (AAI) models require paired audio and electromagnetic articulography (EMA) data to learn speech production dynamics. However, collecting high-precision EMA data relies on specialized laboratory hardware and precise sensor placement, resulting in very small datasets with limited phonetic and speaker diversity. This data scarcity severely restricts the scalability and generalization capabilities of modern deep learning-based AAI models.

## Method

The method repurposes large-scale speech-driven 3D facial animation corpora (specifically TFHP, containing 27.1 hours across 588 subjects with FLAME-topology meshes) as a scalable source of pseudo-articulatory supervision. First, continuous video recordings are segmented into utterance-level clips using ASR word timestamps with silence thresholds and safety margins. Second, visible facial anchors corresponding to the upper lip, lower lip, and lower incisor are tracked on the 3D meshes to extract 2D motion trajectories representing protrusion and aperture. Third, AAI models are pre-trained using a channel-masked mean squared error loss on these pseudo trajectories, and subsequently fine-tuned on real EMA datasets using full-channel supervision.

## Results

Evaluated on the HPRC and USC-TIMIT EMA datasets using leave-one-speaker-out cross-validation, ArtBoost consistently improves Pearson correlation coefficient (PCC) and reduces root mean square error (RMSE) across multiple baseline architectures like SSL-AAI and SI-AAI. On the HPRC dataset, the baseline PCC improves by +2.9%, while on the smaller USC-TIMIT dataset, PCC increases by +45.3% (overall mean PCC rising from 0.351 to 0.510). Articulator-wise analyses confirm that supervising only lip and jaw mesh anchors also benefits unmeasured internal articulators, demonstrating robust representation transfer.

## Code

- https://cau-irislab.github.io/Interspeech26-ArtBoost/

## Applications

Speech and ML engineers working on articulatory-aware speech synthesis, speech analysis, and production-aware speech modeling under low-resource supervision constraints.

## Limitations

Pseudo-articulatory targets are restricted to surface-visible structures like the lips and lower incisor, leaving internal vocal tract organs unmonitored during the pre-training stage.

## Related

- (link related pages by id as the wiki grows)
