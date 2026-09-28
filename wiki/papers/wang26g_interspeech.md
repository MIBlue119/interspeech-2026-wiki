---
id: wang26g_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-416
pdf: https://www.isca-archive.org/interspeech_2026/wang26g_interspeech.pdf
---

# MS-GNN: Multi-Scale Graph Neural Network for Detecting Local Audio-Visual Forgery Traces

*Jianrong Wang, Hengyang Guo, Jie Liu, Ju Zhang, Qi Li, Ying Guo, Jing Zhao*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-416)

**TL;DR** — MS-GNN is a multi-scale graph neural network designed to detect localized audio-visual deepfakes by preventing transient manipulation cues from being diluted by global pooling. It achieves 98.12% accuracy on the LAV-DF dataset.

## Key contributions

- Formulates audio-visual forgery detection as a multi-scale graph problem, using non-overlapping temporal windows to isolate short-span tampering traces.
- Proposes a bi-directional multi-scale graph architecture featuring bottom-up semantic aggregation and top-down context-guided refinement.
- Introduces time-aware attention with a Gaussian temporal bias and Dual Cross-modal Graph Attention with learnable identity gates to suppress untrained cross-modal noise.
- Employs a multi-task training objective combining video-level and auxiliary window-level focal losses to preserve both fine-grained localization and global discrimination.

## Problem

Modern deepfake generation tools often restrict manipulations to brief, specific temporal windows (e.g., replacing a single spoken phrase or injecting a localized lip-sync error) while leaving the remainder of the video authentic. Traditional audio-visual detectors rely on global feature pooling, which lowers the signal-to-noise ratio by treating local tampering evidence as background noise and leading to missed detections. Prior paradigms like DiMoDif and Referee rely heavily on high-level semantic discourse or external reference clips, leaving them vulnerable to non-semantic artifacts in reference-free settings.

## Method

The framework partitions input video streams into non-overlapping 400 ms windows to match natural word durations. Visual features (768-dim) from TimeSformer and audio features (768-dim) from WavLM are concatenated with temporal encodings and processed through a heterogeneous graph where nodes represent audio and visual windows, and edges model temporal adjacency (with a time-aware Gaussian attention bias parameter $\tau$) and cross-modal synchronization.

Each MS-GNN layer operates in three stages: (1) Window-level interaction via dual-stream graph attention with a learnable scalar identity gate $\gamma$ initialized near zero (e.g., -0.045, 0.058, 0.012) to protect pre-trained uni-modal features; (2) Bottom-up semantic aggregation, grouping windows into overlapping segments of size $S_{size}=8$ (3.2 seconds) processed via Transformers with CLS tokens and cross-attention; and (3) Top-down contextual refinement, injecting averaged segment representations back into the window nodes via residual connections.

The final window representations pass through attention pooling to produce a global video vector. The model is trained for 30 epochs using the AdamW optimizer (learning rate $1\times 10^{-4}$, batch size 256, CosineAnnealingLR) with a multi-task focal loss objective combining video-level ($\lambda_{vid}=0.9$) and window-level ($\lambda_{win}=0.1$) supervision.

## Experimental setup

Evaluated on LAV-DF (rich in local forgeries) and FakeAVCeleb (large-scale, mostly global manipulations evaluated via 5-fold cross-validation). Compared against baselines including MDS, JAVDD, BA-TFD, DimoDif, Referee, VFD, AVOID-DF, and MRDF-CE using Accuracy (ACC) and Area Under ROC Curve (AUC). Notable implementation details include an NVIDIA A800 GPU for complexity tracking, 3 MS-GNN layers with hidden dimensions [512, 256, 64], and TimeSformer/WavLM frozen/extracted features.

## Results

On LAV-DF, MS-GNN achieves 98.12% ACC and 99.81% AUC, outperforming DimoDif (97.84% ACC) and Referee (96.74% ACC). On FakeAVCeleb, which lacks isolated local anomalies and favors global models, it records a competitive 93.20% ACC and the highest AUC of 96.75%. Ablation studies confirm that combining window interaction and hierarchical segment fusion yields a synergistic +6.32% ACC gain over a base graph network (91.80% to 98.12%), and demonstrate that the multi-scale graph architecture remains highly effective (98.01% ACC) even when auxiliary window-level supervision is omitted.

| System | LAV-DF ACC (%) | LAV-DF AUC (%) | FakeAVCeleb ACC (%) | FakeAVCeleb AUC (%) |
|---|---|---|---|---|
| MDS / VFD | 93.42 | 97.83 | 81.52 | 86.11 |
| DimoDif | 97.84 | 99.74 | - | - |
| Referee | 96.74 | 99.70 | 83.75 | 89.86 |
| MRDF | - | - | 94.05 | 92.43 |
| MS-GNN (ours) | 98.12 | 99.81 | 93.20 | 96.75 |

## Limitations

The model's end-to-end latency is bottlenecked by heavy offline feature extractors (TimeSformer and WavLM), requiring over 2.3 seconds per 2.8-second clip despite the lightweight MS-GNN graph module running at 0.123 G FLOPs. Performance relies on fixed window sizes (400 ms) and segment counts, which may require tuning for non-standard speech rates or music-heavy videos. The evaluation is currently restricted to standard English-centric or benchmark multi-modal datasets, leaving multilingual and in-the-wild generalization unproven.

## Why read this

Read this paper if you work on multi-modal deepfake detection and need a principled hierarchical graph approach to resolve the SNR drop caused by global pooling. It provides a blueprint for combining window-level local temporal tracking with global context without relying on external reference videos.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated multi-modal deepfake video screening, forensic verification of news media, and localized audio-visual tampering localization.

## Related

- (link related pages by id as the wiki grows)
