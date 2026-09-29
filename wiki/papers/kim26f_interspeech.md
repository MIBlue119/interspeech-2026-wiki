---
id: kim26f_interspeech
category: phonetics-linguistics
labels: [low-resource]
institutions: ["Chung-Ang University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-664
pdf: https://www.isca-archive.org/interspeech_2026/kim26f_interspeech.pdf
---

# ArtBoost: Synthetic Articulatory Data Augmentation for Acoustic-to-Articulatory Inversion

*Hyung Kyu Kim, Byungchan Hwang, Hak Gu Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-664)

**Category:** `phonetics-linguistics` · **Labels:** `low-resource`

**TL;DR** — ArtBoost is a novel data augmentation framework for acoustic-to-articulatory inversion (AAI) that leverages large-scale speech-mesh datasets to extract pseudo-articulatory trajectories for pre-training, yielding up to a +45.3% relative improvement in Pearson correlation on low-resource EMA benchmarks.

## Key contributions

- Proposes ArtBoost, a synthetic data augmentation pipeline that repurposes large-scale speech-driven 3D facial animation datasets (TFHP) for AAI supervision without requiring costly new sensor recordings.
- Implements an ASR-guided utterance segmentation and anchor tracking method to extract 12-channel pseudo-articulatory trajectories (focusing on upper lip, lower lip, and lower incisor) from FLAME-topology meshes.
- Establishes a two-stage training paradigm combining channel-masked pre-training on large pseudo datasets followed by full-channel fine-tuning on real EMA data.
- Demonstrates robust, architecture-agnostic performance gains across multiple established AAI models (SSL-AAI and SI-AAI) and standard benchmarks (HPRC and USC-TIMIT).

## Problem

Data-driven acoustic-to-articulatory inversion (AAI) models require paired audio-articulatory data, but collecting ground-truth electromagnetic articulography (EMA) is labor-intensive, restricted to controlled laboratory settings, and severely limited in scale and phonetic diversity. Prior remedies such as self-supervised learning, auxiliary phonetic constraints, or alternative imaging modalities (MRI, ultrasound) fail to overcome the fundamental data scarcity bottleneck. This limits AAI generalization across speakers and speaking styles, making scalable articulatory supervision a critical unsolved problem.

## Method

The ArtBoost pipeline bridges in-the-wild talking head videos and sensor-based AAI protocols using a three-stage framework. First, long video-level recordings from the TFHP speech-mesh dataset (588 subjects, 27.1 hours, FLAME topology with 5,023 vertices at 25 fps) are segmented into utterance-level clips via ASR word timestamps (grouping up to 7 words with a 0.1-second boundary margin). 

Second, pseudo-articulatory trajectories are extracted by tracking visible facial anchor regions corresponding to the upper lip (UL), lower lip (LL), and lower incisor (LI). The mean vertex coordinates in these regions are mapped to a 12-channel target format matching standard EMA conventions (retaining protrusion z-axis and mouth opening y-axis components), with unobserved internal articulators masked out to zero. These trajectories are resampled to the target articulatory frame rate using cubic interpolation.

Third, AAI models undergo a two-step training recipe: pre-training on the speech-mesh pseudo dataset using a channel-masked loss function (applying a binary mask corresponding to the UL/LL/LI channels), followed by fine-tuning on real EMA datasets (HPRC and USC-TIMIT) using full-channel supervision.

## Experimental setup

Experiments use the HPRC EMA dataset (8 speakers, 11,520 utterances, 7.2 hours) and the USC-TIMIT dataset (4 speakers, 1,673 utterances, 1.2 hours) as target real corpora, alongside TFHP (27.1 hours) for pseudo-articulatory pre-training. Models are evaluated using Pearson correlation coefficient (PCC) and root mean square error (RMSE) under a leave-one-speaker-out protocol. Implementation utilizes a single NVIDIA RTX 3090 GPU following standard hyperparameters for SSL-AAI and SI-AAI baselines.

## Results

Applying ArtBoost to SSL-AAI improved overall PCC on HPRC from 0.678 to 0.698 (and reduced RMSE from 0.736 to 0.717) and showed even starker gains on the smaller USC-TIMIT dataset, raising PCC from 0.351 to 0.510 (a +45.3% relative improvement) and lowering RMSE from 0.864 to 0.792. When evaluated on the SI-AAI architecture, ArtBoost similarly boosted USC-TIMIT PCC from 0.488 to 0.593 and HPRC PCC from 0.717 to 0.732. Trajectory analyses confirm that supervising only visible anchor channels successfully enhances prediction accuracy across unobserved internal articulators as well.

| System / Condition | HPRC PCC (↑) | HPRC RMSE (↓) | USC-TIMIT PCC (↑) | USC-TIMIT RMSE (↓) |
| :--- | :--- | :--- | :--- | :--- |
| SSL-AAI (Baseline) | 0.678 | 0.736 | 0.351 | 0.864 |
| SSL-AAI + ArtBoost (Ours) | **0.698** | **0.717** | **0.510** | **0.792** |
| SI-AAI (Baseline) | 0.717 | 0.706 | 0.488 | 0.917 |
| SI-AAI + ArtBoost (Ours) | **0.732** | **0.689** | **0.593** | **0.817** |

## Limitations

The approach relies on visible facial anchors, meaning internal vocal tract structures like the tongue body and velum cannot be directly supervised from facial meshes alone and must be inferred purely through network-level correlations learned during EMA fine-tuning. The evaluation is currently restricted to standard laboratory English corpora (HPRC and USC-TIMIT), leaving multilingual and in-the-wild generalization under noisy acoustic conditions open for future work.

## Why read this

Speech and ML researchers working on acoustic-to-articulatory inversion or speech-to-physical mapping will find this a blueprint for leveraging abundant audio-visual talking head data to bypass expensive sensor collection limitations. It demonstrates how masked multi-task pre-training bridges the modality gap between 3D facial meshes and internal sensor trajectories.

## Code

- https://cau-irislab.github.io/Interspeech26-ArtBoost/

## Applications

Production-aware speech synthesis, articulatory-based speech analysis, speech pathology assessment, and speech-driven 3D facial animation.

## Institutions / 機構

Chung-Ang University

**Funding / 經費:** Ministry of Science and ICT, Institute for Information & Communications Technology Planning & Evaluation, Ministry of Culture, Sports and Tourism, Korea Creative Content Agency

## Related

- (link related pages by id as the wiki grows)
