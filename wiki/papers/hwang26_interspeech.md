---
id: hwang26_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1875
pdf: https://www.isca-archive.org/interspeech_2026/hwang26_interspeech.pdf
---

# MF-EDM: Graph-based Multimodal Fusion and Emotional Dynamics Modeling for Emotion Recognition in Conversation

[PDF](https://www.isca-archive.org/interspeech_2026/hwang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hwang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1875)

**TL;DR** — The paper introduces MF-EDM, a two-stage graph-based framework for multimodal emotion recognition in conversation that achieves state-of-the-art results across four benchmark datasets.

## Problem

Multimodal emotion recognition in conversation suffers from two major limitations: semantic discrepancies and information redundancies during cross-modal fusion, and the complex, unmodeled evolution of emotions across speakers over time. Existing graph-based models typically rely on uniform message passing without structural anchors for multimodal aggregation and fail to separate speaker-specific emotional dynamics. Addressing these gaps is crucial for robust conversational understanding in multilingual and multi-party settings.

## Method

The proposed MF-EDM framework operates in two distinct stages. Stage 1 constructs an Intra-Utterance Graph containing three unimodal nodes (text, acoustic, visual) and an early-fused multimodal anchor node that guides structured in-graph aggregation via directed and undirected edges. Stage 2 models inter-utterance emotional dynamics using two GNNs: the Emotional Inertia GNN (EIGNN), which captures intra-speaker emotional persistence using same-speaker temporal edges, and the Emotional Contagion GNN (ECGNN), which captures cross-speaker emotional interactions utilizing multi-frequency filtering for low- and high-frequency spectral components. Unimodal features are extracted using language models like RoBERTa, openSMILE or Wav2Vec2.0 for audio, and DenseNet or 3D-CNN for visual data, with training optimized via cross-entropy loss and L2 regularization on a single NVIDIA RTX 4090 GPU.

## Results

Evaluated on IEMOCAP, MELD, K-MIND, and M3 ED, MF-EDM sets new state-of-the-art performance, achieving weighted F1 and accuracy scores of 74.24% / 74.49% on IEMOCAP, 67.40% / 68.77% on MELD, 74.48% / 77.24% on K-MIND, and 55.05% / 56.15% on M3 ED, outperforming baselines such as MMGCN, MM-DFN, M3Net, and GraphSmile. Ablation studies demonstrate that replacing the Intra-Utterance Graph with early, late, or standard graph-based fusion drops performance, and removing either EIGNN or ECGNN degrades accuracy on both inertia and contagion subsets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building conversational AI assistants, empathetic agents, or dialogue analytics tools requiring robust multimodal emotion tracking across diverse languages and speaker configurations.

## Limitations

The text does not state any explicit limitations or scope bounds.

## Related

- (link related pages by id as the wiki grows)
