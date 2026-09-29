---
id: qi26_interspeech
category: speech-llm-dialogue
labels: [streaming-real-time]
institutions: ["KTH Royal Institute of Technology"]
code: https://github.com/Haotian-Qi/MuVAP
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1381
pdf: https://www.isca-archive.org/interspeech_2026/qi26_interspeech.pdf
---

# MuVAP: Multimodal Multiparty Voice Activity Projection for Turn-taking Prediction in the wild

*Haotian Qi, Gabriel Skantze*

[PDF](https://www.isca-archive.org/interspeech_2026/qi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/qi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1381)

**Category:** `speech-llm-dialogue` · **Labels:** `streaming-real-time`

**TL;DR** — MuVAP is a causal, multimodal turn-taking framework that predicts when and who will speak next in unconstrained multiparty conversations using only a single monaural audio stream and a single camera view. It outperforms unimodal and MLP baselines on Shift-Hold and Next Speaker Prediction tasks across 2- and 3-speaker settings.

## Key contributions

- Role-Relative Projection: A spatial-combinatorial reduction mapping N-speaker interactions to a fixed 'current vs. next' floor-holder state, bypassing exponential label growth.
- Audio-Visual Conversation Corpus (AVCC): A 31-hour dataset of unedited, single-camera multiparty conversations capturing natural turn-taking dynamics without jump cuts or editorial artifacts.
- Causal Multimodal Architecture: Integrates a VAP backbone with a causally modified TalkNet ASD backbone using cross-attention and gated fusion to resolve speaker identities from a mono audio mix.
- GVAP-Conditioned Filtering: A hierarchical prediction strategy that uses global voice activity projection priors to constrain next-speaker candidate pools.

## Problem

Traditional conversational systems and standard Voice Activity Projection (VAP) models rely on silence thresholds or strictly dyadic telephone setups, failing to scale to multiparty human-robot interaction where identity attribution and visual cues are crucial. Existing multiparty audio datasets often require complex microphone arrays or multi-camera setups, whereas existing audiovisual ASD datasets (e.g., AVA-ActiveSpeaker, MSDWild) suffer from disruptive editing jump cuts that break causal history tracking and temporal conversational flow. MuVAP addresses the need for a causally grounded, commodity-hardware-friendly framework that handles unconstrained multiparty dialogues using only a single monaural mic and a single camera view.

## Method

MuVAP combines a VAP acoustic backbone and a causally adapted active speaker detection (ASD) visual backbone into a unified framework with 27.7M parameters. The acoustic pipeline maps raw 16 kHz mono audio via a contrastive predictive coding (CPC) encoder and causal downsampling to 25 Hz, followed by a 4-layer ALiBi Transformer (hidden dimension 768, 4 heads). The visual pipeline uses SCRFD/InsightFace for face tracking and a modified TalkNet ASD encoder with causal temporal convolutions and dilations [1, 2, 4, 8, 16] to extract visual embeddings from face crops. To resolve the combinatorial explosion of VAP in multiparty settings, Role-Relative Projection discretizes history and future windows ([1.4s, 0.6s, 0.6s, 1.4s]) into a fixed 136-state codebook representing the current floor holder (S_curr) and primary next speaker (S_next).

The core MuVAP module aligns global audio embeddings (Z_VAP) and individual speaker visual embeddings (Z_ASD) into a shared 256-dimensional space using Linear-LayerNorm blocks. A frame-level cross-attention transformer uses Z_VAP as the query and Z_ASD as key/value, followed by a temporal transformer to produce GlobalVAP (GVAP) embeddings representing group coordination. These GVAP embeddings dynamically modulate the speaker features via gated addition before feeding into SpeakerVAP (SVAP) heads. The models are trained using cross-entropy and binary cross-entropy objectives alongside auxiliary frame-level VAD and TalkNCE contrastive losses.

## Experimental setup

Evaluated on the AVCC dataset (30 hours 52 minutes of unedited English multiparty video, split into 2- and 3-speaker subsets), alongside Fisher Corpus (1,958h phone dialogues), MSDWild, WASD, and AVA-ActiveSpeaker for modular pretraining. Compared against Majority Class / Random baselines and an unconditioned No-Fusion MLP baseline. Metrics include Macro-F1 for Shift-Hold prediction and Accuracy for Next Speaker Prediction (NSP), averaged over 10 random seeds. Implemented on a single NVIDIA A100 (40GB) GPU using a Cosine Annealing LR scheduler (peak 1e-3, decay to 1e-4) with batch sizes of 4 (ASD training) and 16 (MuVAP training) for 5 epochs.

## Results

On the AVCC validation set for Silent Shift-Hold Prediction, MuVAP achieves Macro-F1 scores of 0.696 (2-speaker) and 0.670 (3-speaker), outperforming the VAP baseline (0.672 / 0.655) and MLP baseline (0.650 / 0.654). For Active Shift-Hold Prediction, MuVAP scores 0.641 (2-speaker) and 0.652 (3-speaker), beating the MLP baseline (0.610 / 0.635). In Next Speaker Prediction (NSP) accuracy on AVCC, Silent MuVAP achieves 0.637 (2-spk) and 0.477 (3-spk), which increases to 0.666 and 0.508 when conditioned on GVAP (+GVAP), and reaches an upper bound of 0.702 and 0.547 with ground truth previous speaker labels. Active NSP accuracy reaches 0.560 (2-spk) and 0.441 (3-spk), improving to 0.605 and 0.483 with +GVAP conditioning. The primary ablation shows that adding visual grounding via the ASD backbone consistently outperforms purely acoustic VAP features, and GVAP conditioning provides significant accuracy boosts for individual speaker selection.

| System / Condition | 2-Spk Silent NSP (Acc) | 3-Spk Silent NSP (Acc) | 2-Spk Active NSP (Acc) | 3-Spk Active NSP (Acc) |
|---|---|---|---|---|
| Random | 0.500 | 0.333 | 0.500 | 0.333 |
| MLP Baseline | 0.617 | 0.464 | 0.543 | 0.429 |
| MuVAP (Ours) | 0.637 | 0.477 | 0.560 | 0.441 |
| MuVAP (+GVAP) | 0.666 | 0.508 | 0.605 | 0.483 |
| MuVAP (+GVAP+GT) | 0.702 | 0.547 | 0.652 | 0.516 |

## Limitations

The Role-Relative Projection introduces severe training data class imbalance due to the high frequency of speech continuations (holds) compared to turn shifts. The model's reliance on history bins creates a recognition delay of up to two seconds when identifying a new floor holder. The visual backbone uses a standard ASD module that overlooks subtle micro-facial expressions, and current evaluations are strictly limited to English-language conversations with a maximum of three speakers.

## Why read this

Researchers and engineers building real-time interactive conversational agents or social robots will find this essential reading for learning how to scale turn-taking prediction to multiparty settings using only a single monaural audio stream and a single camera.

## Code

- https://github.com/Haotian-Qi/MuVAP

## Applications

Real-time human-robot interaction, multiparty virtual assistants, social robotics, and interactive conversational agents.

## Institutions / 機構

KTH Royal Institute of Technology

**Funding / 經費:** Wallenberg AI, Autonomous Systems and Software Program (WASP), Knut and Alice Wallenberg Foundation, Swedish Research Council

## Related

- (link related pages by id as the wiki grows)
