---
id: song26e_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2282
pdf: https://www.isca-archive.org/interspeech_2026/song26e_interspeech.pdf
---

# Speaker-Filtered Heterogeneous Graph Network: Toward Privacy-Preserving Multimodal Emotion Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/song26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/song26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2282)

**TL;DR** — The paper introduces the Speaker-Filtered Heterogeneous Graph Network (SF-HGN), a privacy-aware framework for multimodal dialogue emotion recognition that isolates graph propagation to single-speaker subgraphs while outperforming baseline methods on standard benchmarks.

## Problem

Existing multimodal dialogue emotion recognition (MDER) approaches frequently rely on global context aggregation across all speakers, which violates individual privacy by mixing non-target speaker representations and introduces temporal information leakage from future utterances. Furthermore, conversations involve noisy or unaligned interactions across text, audio, and visual modalities, making robust context modeling difficult without incurring negative transfer or semantic dominance. Resolving these issues is critical for deploying intelligent agents and customer service systems that respect user data boundaries while accurately capturing emotional shifts.

## Method

SF-HGN uses a two-stage privacy-aware architecture comprising a Context-Aware Graph Injection (CAGI) module and a Single-Speaker Heterogeneous Graph (SS-HG). CAGI extracts cross-speaker emotional cues via tri-modal attention—using RoBERTa for text, DenseNet for visual FER+ features, and openSMILE for IS10 acoustic features—restricted by a causal window and Top-K selection to filter long-tail noise. It incorporates a sentiment dynamics conflict-aware feature via linear projections and element-wise products between the target state and injected context. The injected representations are then fed into SS-HG, which builds pairwise cross-modal structures (text-visual, text-audio, audio-visual) exclusively within single-speaker induced subgraphs. Graph propagation applies normalized adjacency relations across layers with residual connections, followed by concatenation and a lightweight MLP classification head trained via cross-entropy loss with L2 regularization (hidden dimension of 128, window size W=12, K=2).

## Results

Evaluated on the IEMOCAP and MELD benchmark datasets using metrics including Accuracy, F1-score, Weighted Accuracy (WA), and Weighted F1-score (WF1). On IEMOCAP, SF-HGN achieves a WA of 68.76% and WF1 of 68.73%, outperforming sequence-based, graph-based, and context-augmented baselines like DialogueCRN and LR-GCN. On the multi-party MELD dataset, it achieves a WA of 66.40% and WF1 of 65.65%, establishing competitive performance and strong robustness on minority interaction-sensitive categories such as Fear (21.69%), Disgust (34.23%), Anger (53.39%), and Surprise (58.86%). Ablation studies confirm that removing event injection, speaker filtering, sentiment dynamics, or residual connections all lead to performance drops, with residual connections and event injection showing the largest degradations. Additionally, SF-HGN achieves 63.7% to 94.3% lower inference time and reduced GPU memory usage compared to strong baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers building intelligent customer service tools, multi-party conversational assistants, and interactive human-computer interfaces that require secure, privacy-preserving emotion tracking.

## Limitations

The model struggles with implicit or low-arousal conflict cases (such as angry samples misclassified as neutral on IEMOCAP) and suffers from majority-class bias on highly imbalanced multi-party datasets like MELD.

## Related

- (link related pages by id as the wiki grows)
