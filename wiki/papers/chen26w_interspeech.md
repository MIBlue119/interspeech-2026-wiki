---
id: chen26w_interspeech
category: paralinguistics-emotion
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2222
pdf: https://www.isca-archive.org/interspeech_2026/chen26w_interspeech.pdf
---

# T-ORR: Text-Anchored Orthogonal Residual Rectification for Robust Multimodal Sarcasm Detection

*Qi Chen, Junyi Chen, Jiabin Han, Hongjiao Yang*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26w_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26w_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2222)

**Category:** `paralinguistics-emotion`

**TL;DR** — T-ORR frames multimodal sarcasm detection as a signal separation problem, using orthogonal projection and dynamic alignment to isolate non-verbal contradictions from literal text semantics and achieving state-of-the-art F1 scores of 76.8% on MUStARD and 72.4% on MUStARD++.

## Key contributions

- Formulates multimodal sarcasm detection as a text-anchored signal separation and adaptive rectification task rather than indiscriminate joint feature fusion.
- Introduces a Dynamic Locality-Constrained Alignment module utilizing learnable shifts and Gaussian masks to handle non-linear speech pacing and prevent temporal drift.
- Develops a Structure-Preserving Geometric Decomposition using batch QR projection to decouple semantic resonance from modality-specific dissonance.
- Designs a Contrastive Incongruity Routing (CIR) mechanism with a sparsity constraint to model semantic divergence between literal and incongruous states.

## Problem

Conventional multimodal sarcasm detection models project features into a joint continuous space, which entangles modality-specific nuances with task-irrelevant background noise and neutralizes the sparse incongruity cues that define sarcasm. Prior methods like simple concatenation, hierarchical models, and attention networks struggle with non-linear speech pacing and temporal drift between text tokens and non-verbal frames. Addressing this matters because sarcasm relies heavily on subtle, targeted divergences—such as a deadpan facial expression paired with positive lexical choices—that require precise structural isolation rather than blurred averaging.

## Method

T-ORR extracts frozen representations using DeBERTa-v3-Large for text (Ht in R^{L x D}), WavLM for audio (Ha in R^{Ta x D}), and DINOv2-Large for video (Hv in R^{Tv x D}). To combat temporal drift, the Dynamic Locality-Constrained Alignment module uses a lightweight projection layer Wshift to predict a relative temporal center mu_i scaled by sequence length, building a Gaussian mask Ma with a learnable temporal window size sigma_learn^a. The aligned non-verbal features Em are mapped to the text semantic manifold via Wmap^m. A Structure-Preserving Geometric Decomposition then generates a K-dimensional text subspace via Wbasis, orthogonalized using batch QR decomposition to yield orthonormal basis Ut^(l). Non-verbal features are projected into this subspace to obtain Resonance components F_cons^m via P^(l) = Ut^(l)(Ut^(l))^T, while Dissonance components F_disc^m are calculated as residuals in the orthogonal complement space. A decoupled topology constraint (L_struct) enforces relative distance preservation on F_cons^m using cosine similarity across mini-batches.

The Contrastive Incongruity Routing (CIR) mechanism constructs two competing states. The literal state H_lit combines base text Ht with congruent resonance F_cons via token-wise linear transformation Wc. The incongruous state H_inc uses a non-linear gating mechanism via token-wise projection Wd to suppress or invert text semantics where orthogonal anomalies F_disc occur. A Gating Sparsity Constraint (L_gate_sparsity) penalizes gate activation for sincere samples (y=0) to block ambient non-verbal noise while allowing true conflict signals for sarcastic samples (y=1). Average pooling produces global utterance-level representations H_bar_lit and H_bar_inc, which feed into a distance vector and an MLP classifier. The total loss is L_task + lambda_1 L_struct + lambda_2 L_gate_sparsity, with lambda_1 = 0.5 and lambda_2 = 0.1.

## Experimental setup

Evaluated on the MUStARD dataset and its extension MUStARD++, using a strict Speaker-Independent protocol where test speakers remain unseen during training. Raw audio is resampled to 16kHz (10ms frames), video frames are extracted at 15 FPS, and text uses a maximum sequence length of L = 50. Compared against baselines including Text-Only, Simple-Concat, HFM, Res-BERT, IWAN, C&W, and DIP. Implemented in PyTorch on a single NVIDIA H20 GPU with the AdamW optimizer (batch size 32, weight decay 1e-4, learning rate 1e-4 for new layers) for up to 30 epochs with early stopping after 5 epochs.

## Results

On the MUStARD dataset, T-ORR achieves an F1 score of 76.8% (Precision: 77.5%, Recall: 76.2%), outperforming the Simple-Concat baseline at 70.8%, HFM at 65.7%, Res-BERT at 66.3%, IWAN at 70.0%, C&W at 71.4%, and DIP at 74.3%. On MUStARD++, T-ORR reaches an F1 score of 72.4%, surpassing DIP (69.1%) and Simple-Concat (66.1%). An ablation study demonstrates performance drops when removing individual components: without Dynamic Alignment F1 falls to 74.2%, without CIR (using simple concatenation) F1 drops to 73.5%, removing the Decoupled Topology Constraint yields 74.9%, and omitting the Gate Sparsity Constraint results in 75.3%.

T-ORR fails in scenarios where sarcastic intent relies purely on external world knowledge rather than observable multimodal incongruity, such as utterances delivered with completely sincere prosody and neutral facial expressions where dialogue history lacks the contextual absurdity.

| System | P | R | F1 (MUStARD) | F1 (MUStARD++) |
|---|---|---|---|---|
| Text-Only | 58.2 | 56.7 | 57.0 | 58.4 |
| Simple-Concat | 71.2 | 70.5 | 70.8 | 66.1 |
| HFM [16] | 66.2 | 65.7 | 65.7 | 62.1 |
| C&W [30] | 73.7 | 72.7 | 71.4 | 68.3 |
| DIP [20] | 74.8 | 73.9 | 74.3 | 69.1 |
| T-ORR (Ours) | 77.5 | 76.2 | 76.8 | 72.4 |

## Limitations

The framework relies heavily on observable audiovisual incongruity and fails when sarcasm is driven entirely by external world knowledge or subtle contextual absurdity absent from the immediate dialogue history. The approach is evaluated solely on English conversational datasets (MUStARD and MUStARD++), leaving multilingual and cross-cultural generalization untested. Furthermore, frozen foundational backbones (DeBERTa, WavLM, DINOv2) constrain upper-bound feature representations, and the model relies on a single hardware setup (NVIDIA H20 GPU) with predefined hyperparameters tuned via grid search.

## Why read this

Speech and NLP researchers working on multimodal fusion and incongruity detection should read this paper to learn how to reframe complex cross-modal alignment tasks as geometric signal separation problems using QR projection and contrastive routing.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated content moderation, social media sentiment analysis, customer service analytics, and empathetic conversational agents.

## Institutions / 機構

Tianjin Foreign Studies University, Beijing Language and Culture University

## Related

- (link related pages by id as the wiki grows)
