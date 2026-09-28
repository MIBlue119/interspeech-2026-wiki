---
id: son26_interspeech
category: sound-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-855
pdf: https://www.isca-archive.org/interspeech_2026/son26_interspeech.pdf
---

# Teacher-Agnostic Temporal Knowledge Distillation for Resource-Efficient Sound Event Detection

[PDF](https://www.isca-archive.org/interspeech_2026/son26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/son26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-855)

**TL;DR** — The paper introduces a teacher-agnostic temporal knowledge distillation framework for sound event detection that achieves competitive polyphonic sound detection scores with significantly fewer parameters and computations.

## Problem

Sound event detection requires precise frame-level activity predictions and temporal boundary localization, but high-performance models typically rely on massive, high-capacity architectures. Resource-efficient sound event detection remains underexplored because standard knowledge distillation methods struggle with heterogeneous teacher-student pairs and fail to transfer temporally structured, frame-level information effectively.

## Method

The proposed Teacher-Agnostic Temporal Knowledge Distillation (TAT-KD) uses teacher logits as a common distillation space, overcoming architectural mismatches between heterogeneous teachers and students. To capture frame-level temporal dependencies, a conformer-based temporal context projector maps student hidden features to the logit space during training while being discarded at inference. Additionally, a teacher-confidence-aware distillation loss applies normalized confidence weighting to binary cross-entropy, upweighting reliable teacher predictions and downwighting ambiguous ones across intermediate stages and final outputs. Experiments evaluate compact SE-CRNN student variants (SC32, SC16, SC8, SC4) trained over 400 epochs using diverse teacher models including ATST-SED, JiTTER, MDFD-SED, and MDFD-TAT.

## Results

Evaluated on the domestic environment sound event detection (DESED) real validation set using the polyphonic sound detection score (PSDS), TAT-KD consistently outperforms training from scratch, standard logit-based KD, and feature-based KD across all teacher-student pairs. Specifically, an SE-CRNN student (SC32) distilled from the MDFD-TAT teacher achieves a PSDS of 0.574 with only 4.548M parameters and 3.668G MACs, demonstrating competitive performance compared to much larger state-of-the-art models. Ablation studies confirm that replacing the conformer-based projector with simple MLPs, CNNs, or RNNs degrades performance, and that the confidence-aware loss provides clear gains over standard binary cross-entropy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers deploying sound event detection systems on resource-constrained edge devices, smart home appliances, and robotics platforms.

## Limitations

Distillation efficacy varies depending on the teacher architecture, with post-processing-heavy models like ATST-SED yielding smaller gains as soft targets.

## Related

- (link related pages by id as the wiki grows)
