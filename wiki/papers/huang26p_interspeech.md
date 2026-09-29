---
id: huang26p_interspeech
category: paralinguistics-emotion
institutions: ["Hong Kong Polytechnic University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3532
pdf: https://www.isca-archive.org/interspeech_2026/huang26p_interspeech.pdf
---

# EII-SCL: Harnessing Emotional Inertia for Multimodal Emotion Recognition in Conversation

*Zilong Huang, Kong Aik Lee, Chong-xin Gan, Zezhong Jin, Ruichen Zuo, Man-Wai Mak*

[PDF](https://www.isca-archive.org/interspeech_2026/huang26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3532)

**Category:** `paralinguistics-emotion`

**TL;DR** — The paper introduces EII-SCL, a supervised contrastive learning module that incorporates psychological emotional inertia within speaker-specific temporal windows to improve multimodal emotion recognition in conversation (MERC). When integrated into Transformer- and graph-based backbones, it achieves state-of-the-art accuracy and weighted F1 scores on IEMOCAP and MELD without requiring extra annotations.

## Key contributions

- Proposes the EII-SCL supervised contrastive module that constructs hard-negative samples influenced by emotional inertia using speaker identity, emotion labels, and temporal windows.
- Formulates a dynamic attention-based window weighting mechanism to capture gradual emotional transitions rather than rigid fixed windows.
- Demonstrates that incorporating emotional inertia helps resolve ambiguous emotion pairs (e.g., Happy-Excited confusion) and reduces misclassification rates.
- Shows seamless plug-and-play integration into existing MERC architectures (MMTransFormer and MMDialogueGCN) without needing extra training data.

## Problem

Mainstream multimodal emotion recognition in conversation (MERC) methods—such as DialogGCN, MMGCN, AdaIGN, and DER-GCN—focus extensively on graph- or transformer-based contextual dependencies across utterances but completely overlook emotional inertia. Emotional inertia is a psychological phenomenon where an individual's emotional state resists abrupt change, meaning adjacent turns by the same speaker often maintain high semantic similarity despite label shifts. Ignoring this temporal persistence leads models to treat these subtle transitions as standard negatives, limiting feature discrimination and causing high misclassification rates among ambiguous emotion pairs.

## Method

The backbone MERC processes text, audio, and video streams using modality-specific encoders (RoBERTa, Wav2vec2.0, and CLIP, respectively), extracting utterance-level embeddings that are averaged across final layers. Bidirectional GRUs capture temporal dependencies per modality, and a feature fusion module (Transformer-based or Graph-based) merges them into fused multimodal representations $f_i$ optimized via standard cross-entropy loss ($L_{CE}$). 

The core EII-SCL module operates on these fused embeddings by redefining positive and negative sample sets via speaker-specific temporal windows. Positive pairs ($P_i$) comprise utterances from the same speaker with identical emotion labels. To capture emotional inertia, an attention mechanism computes query-key projections between the anchor utterance $i$ and other same-speaker utterances $j$, generating an adaptive inertia window size $\omega_i = \lfloor \frac{1}{|t|} \sum_{j \in t} \text{attn}(i,j) \cdot |i-j| \rfloor$. 

Within this window, same-speaker utterances with different emotion labels form the hard-negative set ($N_i^{\text{hard}}$), capturing gradual emotional persistence, whereas easy-negatives ($N_i^{\text{easy}}$) comprise cross-speaker samples or same-speaker samples falling outside the window. A supervised contrastive loss ($L_{\text{eii}}$) uses a temperature $\tau = 0.07$ and dynamic weights to penalize hard-negatives without over-penalizing similar contexts. The total loss combines cross-entropy and contrastive objectives: $L = L_{CE} + \alpha L_{\text{eii}}$ with balancing coefficient $\alpha = 0.02$. Training runs for 40 epochs on IEMOCAP and 50 epochs on MELD with batch size 13, using the Adam optimizer (learning rate 0.0002, dropout 0.3), and averaging weights from the last 10 checkpoints.

## Experimental setup

Experiments use IEMOCAP (evaluated via Leave-One-Session-Out / LOSO) and MELD (using predefined train/val/test splits from Friends TV series scripts). Evaluation metrics are Accuracy and Weighted F1-score (w-F1). Baselines include DialogGCN, MMGCN, CFN-ESA, AdaIGN, DER-GCN, FEMI, alongside reproduced multimodal extensions MMDialogueGCN and MMTransFormer. Implementation is executed on a single NVIDIA RTX 4090 GPU.

## Results

When integrated into MM-TransFormer, EII-SCL achieves a new state-of-the-art on IEMOCAP with 73.95% Accuracy and 74.01% w-F1 (outperforming FEMI's 71.97% / 73.53% and baseline MM-TransFormer's 72.53% / 72.57%). On MELD, MM-TransFormer with EII-SCL scores 68.19% Accuracy and 67.33% w-F1, beating MMDialogueGCN and prior baselines. Ablations show that hard-negative samples have significantly higher cosine similarity ($p \le 0.001$) than easy negatives (peaking with a 0.3645 gap at $\omega=1$), and dynamic windows consistently outperform fixed window sizes. EII-SCL successfully reduces confusion errors on ambiguous pairs, dropping Exc-Hap confusion from 7.54% to 5.37% on MM-TransFormer.

| System / Condition | IEMOCAP Acc | IEMOCAP w-F1 | MELD Acc | MELD w-F1 |
|---|---|---|---|---|
| DialogGCN (2019) | 65.25 | 64.18 | - | 58.10 |
| AdaIGN (2024) | - | 70.74 | - | 66.79 |
| FEMI (2025) | 71.97 | 73.53 | 64.88 | 66.41 |
| MM-TransFormer (Baseline) | 72.53 | 72.57 | 67.64 | 66.58 |
| MM-TransFormer + EII-SCL | 73.95 | 74.01 | 68.19 | 67.33 |

## Limitations

The approach relies heavily on accurate speaker identity and timestamp annotations to construct temporal windows, which may degrade in unsegmented or heavily overlapped conversational audio streams. The evaluation is restricted to two standard English conversation datasets (IEMOCAP and MELD), leaving multilingual and low-resource generalizability unverified. The framework also inherits the base feature encoder limitations (RoBERTa, Wav2vec2.0, CLIP) regarding fine-grained multimodal alignment.

## Why read this

Researchers working on conversational speech and multimodal affective computing should read this paper to learn how to inject psychological priors like emotional inertia into contrastive learning objectives without requiring external data annotations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Human-computer interaction systems, empathetic conversational agents, and intelligent mental health monitoring assistants.

## Institutions / 機構

Hong Kong Polytechnic University

**Funding / 經費:** Research Platform for Advanced Audio and Speech Signal Processing

## Related

- (link related pages by id as the wiki grows)
