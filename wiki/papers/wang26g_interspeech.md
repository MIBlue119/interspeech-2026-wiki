---
id: wang26g_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-416
pdf: https://www.isca-archive.org/interspeech_2026/wang26g_interspeech.pdf
---

# MS-GNN: Multi-Scale Graph Neural Network for Detecting Local Audio-Visual Forgery Traces

[PDF](https://www.isca-archive.org/interspeech_2026/wang26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-416)

**TL;DR** — MS-GNN is a multi-scale graph neural network that detects localized audio-visual deepfakes by hierarchically aggregating and refining window-level features, achieving 99.81% AUC on LAV-DF.

## Problem

Modern audio-visual deepfakes frequently confine manipulations to short temporal windows, such as a single altered phrase, while leaving the surrounding context authentic. Standard detectors rely on global feature pooling, which dilutes these transient forgery traces and lowers the effective signal-to-noise ratio. This design gap causes models to miss subtle local inconsistencies, motivating a structure-aware, reference-free hierarchy that preserves fine-grained evidence while incorporating global context.

## Method

The framework partitions video streams into non-overlapping 400ms windows, extracting 768-dimensional features via TimeSformer and WavLM, combined with temporal encodings. A heterogeneous graph models intra-modal temporal neighbors and cross-modal synchronized relationships, utilizing a soft Gaussian temporal locality prior and a Dual Cross-modal Graph Attention module with learnable gates. Three stacked MS-GNN layers execute window-level interaction, bottom-up segment-level aggregation via Transformers with CLS tokens, and top-down residual contextual refinement. The model is trained using an AdamW optimizer for 30 epochs with a multi-task objective combining a main video-level Focal Loss and an auxiliary window-level Focal Loss.

## Results

Evaluated on LAV-DF and FakeAVCeleb datasets, MS-GNN achieves 98.12% accuracy and 99.81% AUC on LAV-DF, outperforming baselines like Referee and DiMoDif. On FakeAVCeleb, which primarily features global manipulations, it achieves 93.20% accuracy and a leading 96.75% AUC. Ablation studies on LAV-DF show that combining temporal encoding, time-aware attention, and hierarchical fusion yields a 6.32% accuracy gain over the base model, and demonstrate that window-level supervision is optional since the multi-scale architecture alone reaches 98.01% accuracy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and forensic analysts use this system for video authentication and deepfake detection, specifically to locate and classify short-span or localized audio-visual tampering.

## Limitations

End-to-end inference latency is heavily dominated by heavy feature extraction backbones like TimeSformer and WavLM.

## Related

- (link related pages by id as the wiki grows)
