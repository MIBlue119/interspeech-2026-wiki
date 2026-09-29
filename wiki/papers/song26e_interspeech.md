---
id: song26e_interspeech
category: paralinguistics-emotion
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2282
pdf: https://www.isca-archive.org/interspeech_2026/song26e_interspeech.pdf
---

# Speaker-Filtered Heterogeneous Graph Network: Toward Privacy-Preserving Multimodal Emotion Recognition

*Heying Song, Jing Han, Yandi Zheng, Zixing Zhang, Ziping Zhao, Bjoern Schuller*

[PDF](https://www.isca-archive.org/interspeech_2026/song26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/song26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2282)

**Category:** `paralinguistics-emotion`

**TL;DR** — The paper introduces the Speaker-Filtered Heterogeneous Graph Network (SF-HGN) for multimodal dialogue emotion recognition, which structurally preserves speaker privacy and prevents future information leakage by restricting graph message propagation to single-speaker subgraphs. It achieves state-of-the-art weighted F1 scores of 68.73% on IEMOCAP and 65.65% on MELD while reducing inference time significantly.

## Key contributions

- Proposes a privacy-aware graph architecture (SF-HGN) that isolates graph message passing into single-speaker induced subgraphs, preventing feature contamination from non-target speakers.
- Introduces the Context-Aware Graph Injection (CAGI) module to capture past cross-speaker affective cues through tri-modal attention under a strict causal window.
- Models sentiment dynamics using normalized differences and element-wise interactions to detect conflicts between the current state and injected context.
- Demonstrates superior parameter efficiency, using only 1.19M parameters and achieving a 51.3 ms inference time—outperforming standard GNN baselines in speed and memory footprint.

## Problem

Multimodal Dialogue Emotion Recognition (MDER) methods commonly employ global graph propagation across all dialogue turns, which creates serious privacy violations by mixing non-target speaker representations and introducing temporal information leakage from future utterances. Furthermore, naive multi-modal fusion strategies often suffer from noise, negative transfer, and semantic dominance in unaligned conversational data. Existing graph privacy studies also fail to address speaker-level isolation in multimodal dialogues under causal inference constraints, making prior frameworks unsuitable for real-time or privacy-sensitive applications.

## Method

SF-HGN processes multi-modal inputs using pre-trained backbones: RoBERTa for text, DenseNet (FER+) for visual frames, and openSMILE (IS10 set) for acoustic features. In the first stage, the Context-Aware Graph Injection (CAGI) module calculates tri-modal attention independently for text, audio, and visual streams, applying a binary causal mask to block future, out-of-window, or same-speaker tokens. A Top-K selection mechanism ($K=2$) filters out long-tail noise, and a sentiment dynamics feature explicitly models conflicts between the target utterance state and the retrieved cross-speaker context through normalized differences and Hadamard products.

In the second stage, the model builds single-speaker heterogeneous subgraphs ($G_p$) containing both intra-modal temporal edges (within window $W=12$) and pairwise inter-modal edges (text-audio, text-visual, audio-visual) for each speaker $p$. Graph propagation uses normalized adjacency matrices over relational layers with a hidden dimension of 128. Finally, a residual connection combines the original, injected, and propagated representations into an aggregated vector fed into a lightweight MLP classifier trained via cross-entropy loss with an Adam optimizer (learning rate $10^{-4}$, dropout $0.1$).

## Experimental setup

Evaluated on IEMOCAP (151 dyadic dialogues, 7,433 utterances, 6 classes, split 5,810/1,623 train/test) and MELD (1,433 multi-party dialogues from Friends, 13,708 utterances, 7 classes, split 11,098/2,610 train/test). Compared against 10 baselines including sequence models (bc-LSTM, DialogueRNN, CMN), graph models (DialogueGCN, RGAT, MMGCN, LR-GCN, DialogueCRN), and context-augmented variants (CoMPM, COGMEN). Metrics include Accuracy, F1-score, Weighted Accuracy (WA), and Weighted F1-score (WF1). Implemented with a hidden size of 128, causal window $W=12$, and Top-K value of 2.

## Results

On IEMOCAP, SF-HGN achieves a headline WA of 68.76% and WF1 of 68.73%, outperforming strong graph models like LR-GCN (68.50% WA) and DialogueCRN (68.43% WF1). On MELD, it reaches a WA of 66.40% and WF1 of 65.65%, setting new competitive marks while securing top F1 scores on minority or conflict-heavy emotion categories such as Fear (21.69%), Disgust (34.23%), Anger (53.39%), and Surprise (58.86%). Ablations reveal that removing residual connections causes the sharpest drop (falling to 65.12% WF1 on IEMOCAP), while omitting speaker filtering or event injection also substantially degrades performance. However, due to severe class imbalance on MELD (where Neutral constitutes 48.1%), the model experiences majority-class bias and struggles with low-frequency classes like Fear.

| System / Condition | IEMOCAP WA (%) | IEMOCAP WF1 (%) | MELD WA (%) | MELD WF1 (%) |
|---|---|---|---|---|
| DialogueRNN | 63.89 | 37.73 | 66.25 | 65.01 |
| DialogueGCN | 55.51 | 56.04 | 38.80 | 37.13 |
| LR-GCN | 68.50 | 68.30 | - | - |
| DialogueCRN | 68.27 | 68.43 | - | - |
| COGMEN | 68.20 | 67.60 | 66.20 | 65.10 |
| SF-HGN (Ours) | 68.76 | 68.73 | 66.40 | 65.65 |

## Limitations

The evaluation is restricted to English-language datasets (IEMOCAP and MELD) featuring acted or sitcom-derived dyadic and multi-party conversations, leaving real-world spontaneous or multi-lingual generalizability untested. The framework inherits limitations from heavy class imbalances in datasets like MELD, resulting in poor recall for rare emotions despite speaker isolation. Additionally, the fixed causal window and Top-K selection heuristics may truncate long-range pragmatic dependencies spanning beyond 12 utterances.

## Why read this

Researchers and engineers building conversational AI agents or privacy-compliant affective computing pipelines should read this paper to see how structural subgraph isolation and causal attention can eliminate non-target speaker feature contamination without sacrificing emotion recognition accuracy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy-aware smart assistants, customer service conversation analytics, and real-time multi-party emotion monitoring systems.

## Institutions / 機構

Tianjin Normal University, Hunan University, Yuelushan Center for Industrial Innovation, Technische Universitat Munchen, Imperial College London

**Funding / 經費:** Project of Yuelushan Center for Industrial Innovation, National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
