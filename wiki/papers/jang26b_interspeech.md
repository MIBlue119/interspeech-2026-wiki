---
id: jang26b_interspeech
category: speech-llm-dialogue
institutions: ["Seoul National University", "Korea Electronics Technology Institute"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3216
pdf: https://www.isca-archive.org/interspeech_2026/jang26b_interspeech.pdf
---

# DP-BCT: A Dual-Path model for predicting BackChannel Timing

*Jin Yea Jang, Saim Shin, Gahgene Gweon*

[PDF](https://www.isca-archive.org/interspeech_2026/jang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3216)

**Category:** `speech-llm-dialogue`

**TL;DR** — DP-BCT is a dual-path model for predicting backchannel timing and functional categories that decouples fast and slow behavioral groups, improving Macro-F1 from 0.4862 to 0.6254 over single-path baselines.

## Key contributions

- Empirically proves using Cox Proportional Hazards analysis on 115 hours of Korean dyadic dialogue (K-MIND) that backchannel functional categories exhibit statistically distinct BOP-relative latency distributions (p < 0.001).
- Introduces DP-BCT (Dual-Path Backchannel Timing Prediction Model), which structurally separates fast-group responses (contact/perception) from slow-group responses (understanding, assessment, affect) to mitigate multi-task optimization interference.
- Implements a two-stage training scheme utilizing a VAD-fine-tuned HuBERT encoder paired with auxiliary paths, a BOP head, and a balanced frame sampling strategy to handle severe class imbalance.
- Achieves a 28.6% relative improvement in Macro-F1 (0.6254 vs 0.4862) and superior multi-window onset timing precision (Hit@k) compared to single-path and unified multi-task architectures.

## Problem

Spoken dialogue systems struggle with backchannel timing because listener responses occur at varying latencies relative to Backchannel Opportunity Points (BOPs). Prior models typically optimize multiple functional feedback categories through a single shared path, which introduces optimization interference when categories have distinct temporal profiles. Dual-Process Theory (DPT) distinguishes fast, automatic responses (Type 1) from slower, integrative responses (Type 2), suggesting that forcing them through a shared path limits predictive accuracy and temporal precision.

## Method

DP-BCT processes a 20-second mono audio segment using a pretrained Korean HuBERT encoder (team-lucid/hubert-base-korean) yielding 768-dimensional frame-level representations at 50 Hz. Training is conducted in two stages: Stage I fine-tunes the HuBERT encoder via a VAD head using speaker activity supervision, while Stage II freezes the encoder and optimizes downstream modules. 

The downstream architecture takes the last 100 frames (a 2-second window) and passes them to a BOP Head (a 2-layer MLP predicting frame-level BOP logits via binary cross-entropy) and a Dual-Path Module. The Dual-Path Module splits features into a Fast Path (handling contact/perception 'CP' categories via a linear projection and a 4-layer Transformer Encoder with 8 attention heads) and a Slow Path (handling understanding 'CPU', assessment 'A', and affect 'E' categories with a symmetric architecture). 

Fast-path features, slow-path features, and BOP logits are fused by a frame-level BC Predictor producing 5-class logits (Neg, CP, CPU, A, E) over a 100-frame output window. The model is optimized using a weighted sum of a main multiclass Focal Loss (gamma = 2.0, alpha = 0.25), auxiliary path binary cross-entropy losses, and BOP head losses. A Balanced Frame Mask samples negative frames at a 2:1 ratio relative to positive frames to resolve extreme class imbalance.

## Experimental setup

Evaluated on the K-MIND dataset, consisting of 115 hours of spontaneous Korean dyadic dialogue. Compared against a single-path baseline (SP-BCT, an 8-layer transformer predicting all categories in one path) and a unified dual-path variant (both paths learning all categories). Metrics include Macro-F1, Accuracy, and Hit@k (onset timing precision evaluated at 50 ms, 100 ms, and 200 ms windows). Models are trained using the AdamW optimizer (learning rate 2e-5, weight decay 1e-4) on NVIDIA A100 GPUs for up to 100 epochs with early stopping.

## Results

The proposed DP-BCT achieves a Macro-F1 of 0.6254 and Accuracy of 0.6382, substantially outperforming the single-path SP-BCT baseline (Macro-F1 0.4862, Accuracy 0.4858) and the unified dual-path baseline (Macro-F1 0.6129). Ablations on task-to-path mapping demonstrate that moving slow-group categories like assessment (Swap-A) into the Fast Path severely degrades overall Macro-F1 down to 0.5746 and drops 50ms CP hit precision from 0.5992 to 0.5055. For fine-grained timing precision (Hit@k), the proposed model achieves a 50ms Hit@k of 0.5992 for CP and 0.9536 for A.

| Model | Macro-F1 | Accuracy |
| --- | --- | --- |
| SP-BCT | 0.4862 ± 0.0093 | 0.4858 ± 0.0147 |
| DP-BCT (Unified) | 0.6129 ± 0.0248 | 0.6276 ± 0.0264 |
| DP-BCT (Proposed) | 0.6254 ± 0.0311 | 0.6382 ± 0.0295 |

## Limitations

The empirical study is restricted entirely to a single Korean dataset (K-MIND), leaving cross-lingual and cross-cultural generalization unproven. The model relies strictly on mono acoustic inputs, omitting crucial multimodal cues like gaze, gesture, and facial expressions that naturally influence conversational turn-taking. Furthermore, fixed temporal thresholds are used for BOP extraction and evaluation, which may fail to capture the fluid variability of real-world dialogue dynamics.

## Why read this

Speech and dialogue researchers building real-time spoken language systems will learn how to design structural inductive biases into transformer architectures to resolve multi-task optimization interference in turn-taking models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Spoken dialogue systems, voice assistants, and interactive conversational agents requiring natural, human-like timing and functional feedback generation.

## Institutions / 機構

Seoul National University, Korea Electronics Technology Institute

**Funding / 經費:** Ministry of Science and ICT, Republic of Korea, Artificial Intelligence Graduate School Program, Seoul National University, Ministry of Culture, Sports and Tourism, Republic of Korea, Korea Electronics Technology Institute

## Related

- [Considerate Listener Modeling for Korean Streaming Backchannel Prediction](choi26c_interspeech.md) — same problem · relatedness 2.7/3
- [Returning the Turn: Do Backchannels Pattern More Like Turn-Holds or Turn-Changes Given Preceding Syntactic Completion and Boundary Tones?](reitsema26_interspeech.md) — same problem · relatedness 1.9/3
- [When “yeah” means “not quite”: Multimodal detection of backchannels expressing incomplete understanding](turk26_interspeech.md) — same problem · relatedness 1.9/3
- [MuVAP: Multimodal Multiparty Voice Activity Projection for Turn-taking Prediction in the wild](qi26_interspeech.md) — same problem · relatedness 1.8/3
- [Adaptive Turn-Taking for Real-time Multi-Party Voice Agents](mitra26_interspeech.md) — same problem · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
