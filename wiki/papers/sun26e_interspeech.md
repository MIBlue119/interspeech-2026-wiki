---
id: sun26e_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1716
pdf: https://www.isca-archive.org/interspeech_2026/sun26e_interspeech.pdf
---

# Label Correction Enhanced Dual-Stream Multiple Instance Learning for Weakly-Supervised Depression Detection in Speech

[PDF](https://www.isca-archive.org/interspeech_2026/sun26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1716)

**TL;DR** — The paper introduces Label Correction enhanced Dual-Stream Multiple Instance Learning (LC-DMIL) to simultaneously handle inaccurate and inexact labels in weakly-supervised speech-based depression detection, achieving a UAR of 0.651 and an F1-score of 0.642 on the DAIC-WOZ dataset.

## Problem

Speech-based automatic depression detection often suffers from weakly-supervised conditions involving inaccurate labels (caused by subjective questionnaires or annotator errors) and inexact labels (where depressive traits are confined to subtle, easily overlooked audio segments). Ignoring these issues degrades model robustness and generalization. The proposed approach addresses both challenges jointly within a unified framework.

## Method

The framework consists of a label correction module and a MIL-based depression detection module, both utilizing backbones composed of a 1D-CNN layer (256 kernels, size 3) and a Bidirectional LSTM layer. The label correction module uses a weighted fusion of likelihood-ratio-based correction and prototype-based cosine similarity correction to predict pseudo-labels. The depression detection module splits samples into bags of instances and applies a dual-stream multi-instance learning strategy combining a max-rule stream (identifying key instance embeddings) and a MIL-aggregator stream (using query-value attention over instance embeddings). Training utilizes classification and entropy losses for both sample and instance levels.

## Results

Evaluated on the DAIC-WOZ dataset (7,742 training samples, 2,935 test samples) and AVEC 2014 dataset with simulated label noise. On DAIC-WOZ, LC-DMIL achieves 0.651 UAR and 0.642 F1-score, outperforming baselines such as DepAudioNet (0.574 UAR), ConvBiLSTM (0.580 UAR), SpeechFormer (0.576 UAR), ComParE (0.550 UAR), and SLLC (0.614 UAR). Ablation studies confirm the superiority of the dual-stream MIL strategy over mean-rule, weighted-rule, Transformer-based, and attention-based alternatives, as well as the effectiveness of combining label correction with dual-stream MIL.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing paralinguistic diagnostic tools for healthcare, specifically automated mental health screening and computer-aided depression monitoring systems.

## Limitations

The performance depends on tuning the label correction weight parameter and selecting appropriate MIL aggregator strategies and instance bag sizes.

## Related

- (link related pages by id as the wiki grows)
