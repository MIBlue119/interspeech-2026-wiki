---
id: hwang26_interspeech
category: paralinguistics-emotion
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1875
pdf: https://www.isca-archive.org/interspeech_2026/hwang26_interspeech.pdf
---

# MF-EDM: Graph-based Multimodal Fusion and Emotional Dynamics Modeling for Emotion Recognition in Conversation

*Sooyeon Hwang, Eunseong Kwon, Gahgene Gweon*

[PDF](https://www.isca-archive.org/interspeech_2026/hwang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hwang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1875)

**Category:** `paralinguistics-emotion`

**TL;DR** — MF-EDM is a two-stage graph-based framework for multimodal Emotion Recognition in Conversation that addresses intra-utterance cross-modal fusion via an early-fused anchor node and inter-utterance emotional dynamics via specialized inertia and contagion GNNs, achieving state-of-the-art results (e.g., 74.24% weighted F1 on IEMOCAP).

## Key contributions

- Proposes a two-stage graph architecture (MF-EDM) separating intra-utterance multimodal fusion from inter-utterance emotional dynamics modeling.
- Introduces an Intra-Utterance Graph in Stage 1 featuring an early-fused multimodal anchor node that participates directly in message passing with unimodal nodes.
- Develops two psychologically motivated GNN pathways in Stage 2: EIGNN for intra-speaker emotional inertia and ECGNN with multi-frequency filtering for cross-speaker emotional contagion.
- Demonstrates multilingual generalizability and state-of-the-art performance across four benchmark datasets spanning English, Korean, and Mandarin (IEMOCAP, MELD, K-MIND, M^3ED).

## Problem

Emotion Recognition in Conversation (ERC) suffers from two fundamental bottlenecks: suboptimal multimodal fusion and inadequate modeling of temporal emotional shifts across speakers. Prior early fusion methods smear modality-specific cues, late fusion limits inter-modal interaction until the final step, and conventional graph-based fusion approaches employ uniform message passing without structural anchors for proper alignment. Furthermore, standard context-modeling techniques fail to explicitly capture psychological mechanisms of conversational emotion evolution—specifically, intra-speaker emotional persistence (inertia) and inter-speaker emotional influence (contagion).

## Method

MF-EDM decouples the ERC pipeline into two distinct stages. In Stage 1, unimodal features are extracted for text (RoBERTa-based models), acoustic signals (openSMILE IS10 or Wav2Vec2.0), and visual frames (DenseNet or 3D-CNN). Textual features are encoded via bidirectional GRUs, while acoustic and visual features use MLPs into dimensionality D. An early-fused multimodal anchor node is computed by linearly transforming the concatenation of all three unimodal features using learnable weights W_m and bias b_m. One-hot speaker embeddings are added to all representations. An Intra-Utterance Graph G_k is constructed with four nodes (text, acoustic, visual, anchor), where undirected multi-edges capture pairwise cross-modal dependencies and directed edges aggregate unimodal cues into the anchor node.

In Stage 2, inter-utterance temporal dynamics are modeled using two parallel GNN pathways built on top of the Stage 1 node outputs. The Emotional Inertia GNN (EIGNN) constructs directed temporal edges connecting same-speaker utterances within past (P^I) and future (F^I) windows, applying L_I GCN layers with residual connections to capture intra-speaker emotional persistence. The Emotional Contagion GNN (ECGNN) connects utterances across any speaker within past (P^C) and future (F^C) windows with undirected temporal edges, utilizing a multi-frequency filtering mechanism where low-frequency components model convergent emotional alignment and high-frequency components capture divergent or complementary linkages over L_C propagation layers.

The final multimodal anchor node representations from EIGNN and ECGNN are concatenated to form an emotional dynamics feature vector e_k, which passes through a ReLU-activated feedforward layer and a softmax classifier to predict the emotion class. The framework is trained end-to-end using cross-entropy loss and L2 regularization with a batch size of 32 on a single NVIDIA RTX 4090 GPU.

## Experimental setup

Evaluated on four conversational emotion datasets: IEMOCAP (151 dyadic conversations, 7.4K utterances, 6 emotions), MELD (1,433 multi-party conversations, 13.7K utterances, 7 emotions), K-MIND (816 Korean dyadic conversations, 70K utterances), and M^3ED (990 Mandarin dyadic conversations, 24.4K utterances). Compared against graph-based baselines MMGCN, MM-DFN, M^3Net, and GraphSmile reimplemented under identical settings. Metrics used are Weighted F1 (w-F1) and Accuracy (Acc). Hyperparameters include dropout rates of 0.4-0.5, and dataset-specific layer counts and temporal window sizes tuned per corpus.

## Results

MF-EDM establishes new state-of-the-art results across all four benchmark datasets, outperforming the strongest baseline (GraphSmile) by clear margins. On IEMOCAP, it reaches 74.24% w-F1 / 74.49% Acc (vs. GraphSmile's 71.36% w-F1); on MELD, it achieves 67.40% w-F1 / 68.77% Acc; on K-MIND, 74.48% w-F1 / 77.24% Acc; and on M^3ED, 55.05% w-F1 / 56.15% Acc.

Stage 1 ablations replacing the Intra-Utterance Graph with Early, Late, or standard Graph-based fusion variants confirm that the multimodal anchor node architecture consistently yields superior performance (e.g., outperforming MF-EDM with Early Fusion by nearly 2% w-F1 on IEMOCAP). Stage 2 subset analyses demonstrate complementary behaviors: EIGNN alone dominates the Inertia subset (e.g., 77.31% w-F1 on IEMOCAP), whereas ECGNN alone dominates the Contagion subset (e.g., 58.83% w-F1 on MELD), validating the necessity of combining both pathways.

| System | IEMOCAP (w-F1) | MELD (w-F1) | K-MIND (w-F1) | M^3ED (w-F1) |
|---|---|---|---|---|
| MMGCN | 65.35 | 59.57 | 72.39 | 46.85 |
| MM-DFN | 68.27 | 58.69 | 70.21 | 50.90 |
| M^3Net | 69.41 | 65.54 | 73.98 | 50.43 |
| GraphSmile | 71.36 | 66.61 | 73.62 | 52.37 |
| MF-EDM (Ours) | 74.24 | 67.40 | 74.48 | 55.05 |

## Limitations

The model relies on gold-standard speaker identity labels for constructing EIGNN and ECGNN temporal edges, which may degrade when applied to unannotated conversational data with noisy automatic speaker diarization. Furthermore, static window hyperparameters (P and F) and fixed pathway concatenation do not dynamically adapt to varying local distributions of emotional inertia versus contagion within a conversation.

## Why read this

Researchers building conversational multimodal fusion architectures and dialogue emotion models will find clear technical blueprints for structuring intra-utterance cross-modal message passing and decoupling speaker dynamics into explicit inertia and contagion GNN pathways.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multi-party meeting analysis, empathetic conversational agents, customer service quality monitoring, and mental health session tracking.

## Institutions / 機構

Seoul National University

**Funding / 經費:** Institute for Information & communications Technology Promotion, Ministry of Science and ICT

## Related

- (link related pages by id as the wiki grows)
