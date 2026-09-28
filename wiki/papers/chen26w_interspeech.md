---
id: chen26w_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2222
pdf: https://www.isca-archive.org/interspeech_2026/chen26w_interspeech.pdf
---

# T-ORR: Text-Anchored Orthogonal Residual Rectification for Robust Multimodal Sarcasm Detection

[PDF](https://www.isca-archive.org/interspeech_2026/chen26w_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26w_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2222)

**TL;DR** — The paper introduces Text-Achored Orthogonal Residual Rectification (T-ORR) for multimodal sarcasm detection, reframing the task as signal separation and achieving a state-of-the-art F1 score of 76.8% on MUStARD.

## Problem

Standard multimodal sarcasm detection models entangle textual semantics with non-verbal acoustic and visual streams in a joint continuous space, which obscures sparse incongruity cues. Because sarcasm inherently relies on a covert contradiction between literal positive text and suppressed or mismatched delivery, indiscriminate feature fusion neutralizes the exact signals needed for detection. Effectively isolating these transient, multi-source discrepancies remains a critical technical bottleneck in conversational understanding.

## Method

T-ORR treats text as a stable anchor coordinate while utilizing Dynamic Locality-Constrained Alignment with learnable Gaussian temporal windows to map non-verbal streams (WavLM audio and DINOv2-Large video) against non-linear speech pacing. A Structure-Preserving Geometric Decomposition then employs batch QR projection to map non-verbal features into a text-derived subspace, separating them into semantic Resonance and orthogonal Dissonance components. Finally, a Contrastive Incongruity Routing (CIR) mechanism models the divergence between literal and incongruous states using a non-linear gating mechanism regularized by topology and sparsity constraints.

## Results

Evaluated on the MUStARD and MUStARD++ datasets under a speaker-independent protocol, T-ORR achieves F1 scores of 76.8% and 72.4% respectively, outperforming strong baselines including DIP and a simple concatenation baseline at 70.8% F1. Ablation studies confirm the critical role of each component, showing drops in F1 when removing dynamic alignment (74.2%), the contrastive routing mechanism (73.5%), the decoupled topology constraint (74.9%), or the gate sparsity constraint (75.3%).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and multimodal dialogue systems engineers building affective computing tools, conversational agents, or social media monitoring pipelines to detect sarcasm, irony, and subtle sentiment discrepancies.

## Related

- (link related pages by id as the wiki grows)
