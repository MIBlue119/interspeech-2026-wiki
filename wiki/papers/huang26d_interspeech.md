---
id: huang26d_interspeech
category: speech-llm-dialogue
institutions: ["National Tsing Hua University", "National Yang Ming Chiao Tung University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1243
pdf: https://www.isca-archive.org/interspeech_2026/huang26d_interspeech.pdf
---

# Before the Turn: Investigating Motion Cues Preceding Speech in Dyadic Interaction

*Ying-Hsuan Huang, Woan-Shiuan Chien, Huan-Yu Chen, Chi-Chun Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/huang26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1243)

**Category:** `speech-llm-dialogue`

**TL;DR** — This paper investigates continuous 3D skeletal kinematics in dyadic interactions to show that conversational intent operates on asynchronous timelines, where upper-body posture enables stable turn predictions up to 3.0s prior to speech onset. Specifically, floor-claiming exhibits a 1.5s preparatory kinematic buildup, whereas floor-holding triggers an explosive burst precisely at the speech collision boundary.

## Key contributions

- Formulates continuous kinematic metrics—joint-level angular velocity and kinematic diversity (standard deviation of velocities)—to quantify pre-speech physical motor planning.
- Demonstrates a modality-specific temporal hierarchy where upper-body kinematics sustain turn-taking predictions up to 3.0 seconds prior to speech, significantly outperforming distal joints.
- Uncovers a fundamental intent-driven temporal contrast: turn-claiming (shifts without pauses) features a 1.5s preparatory accumulation of motion diversity, whereas floor-holding involves an immediate explosive kinetic burst at the speech boundary.
- Provides empirical biomechanical evidence on the InterAct dataset proving that conversational turn negotiation is multimodal and physically encoded well before vocalization.

## Problem

Computational turn-taking models have historically framed transitions as a reactive acoustic boundary detection task using audio and linguistic cues. This speech-centric approach inherently lags behind human intention and struggles to resolve ambiguous behaviors such as overlapping speech or short pauses. Prior multimodal works append visual features like gaze or facial expressions as abstracted, synchronized action labels rather than modeling continuous physical kinematics across distinct body parts. Consequently, the physical temporal mechanisms and independent pre-speech motion onsets governing anticipatory turn negotiation remained largely unexplored.

## Method

The study utilizes the InterAct dataset, processing 60-joint skeletal hierarchies in BVH format downsampled to 30 fps, with audio timestamps quantized to 0.1s intervals. To isolate anticipatory motor planning from prior co-speech, skeletal streams are represented using 6D continuous rotation matrices and speaker-wise Z-score normalized for both angular velocity ($V_t$) and kinematic diversity ($D_t$).

The authors evaluate a Transformer architecture adapted from multimodal Voice Activity Projection (mm-VAP) frameworks. The model is trained to perform binary classification (Shift vs. Hold) using a weighted binary cross-entropy loss optimized via AdamW (learning rate $1\times 10^{-4}$, weight decay $1\times 10^{-4}$) for up to 25 epochs with early stopping based on validation Weighted F1-score. Dropout is set to 0.1 and batch size to 64.

Inference involves systematically shifting a 3.0-second observation window backward using prediction lead times $\tau \in \{0.0, 0.5, 1.0, 1.5\}$ seconds. This design isolates early UpperBody postural shifts from late-stage distal (head/hands) synchronization cues, revealing how different body parts map to distinct communicative intents and conversational pause/overlap scenarios.

## Experimental setup

Evaluated on the InterAct dataset consisting of 8.3 hours of high-fidelity 3D skeletal data across 241 semi-structured dyadic scenarios (totaling 2,439 shifts and 1,505 holds after filtering). Performance is assessed using F1-score (Shift, Hold, Weighted), Balanced Accuracy (BACC), Overall Accuracy (ACC), and Area Under the Precision-Recall Curve (AUPRC). The setup reserves 5% of the data as a hold-out test set with the remaining 95% used for 5-fold cross-validation.

## Results

The UpperBody feature stream achieves a peak F1-Shift of 71.26% and an AUPRC of 0.7355 at a 1.5s lead time ($\tau = 1.5s$), outperforming the immediate speech onset boundary ($\tau = 0.0s$, F1-Shift 61.97%). This demonstrates that early postural changes provide a higher signal-to-noise ratio than static post-preparation postures at speech onset. Ablations across body parts reveal that while the head provides a rapid immediate signal at $\tau = 0.5s$ (F1-Shift 54.50%), its performance collapses over longer windows due to listening backchannels. For Case C (immediate shifts/overlaps), the upper body achieves 79.29% accuracy at $\tau = 1.5s$ driven by early kinematic diversity ($D_t = 0.029$). Conversely, Case D (continuous holds) fails at early lead times, requiring speech-onset evaluation ($\tau = 0.0s$) where it peaks with maximum upper-body velocity ($V_t = 0.068$) and diversity ($D_t = 0.049$).

| System / Condition | Lead Time ($\tau$) | Shift F1 | Hold F1 | Weighted F1 | BACC | AUPRC |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| FullBody | 0.0s | 64.56 | 41.32 | 55.09 | 54.40 | 0.6422 |
| FullBody | 1.0s | 71.21 | 16.86 | 51.92 | 47.86 | 0.5798 |
| UpperBody | 0.0s | 61.97 | 49.14 | 56.74 | 56.00 | 0.6531 |
| UpperBody | 1.5s | 71.26 | 34.12 | 58.43 | 53.65 | 0.7355 |
| Hands | 1.0s | 67.32 | 29.95 | 54.05 | 49.10 | 0.6879 |
| Head | 1.0s | 66.53 | 44.41 | 58.67 | 59.53 | 0.7147 |

## Limitations

The study is bounded by the InterAct dataset's scale (8.3 hours, 7 participants), which may limit cross-demographic and cross-cultural generalization of conversational kinematics. The evaluation is restricted to dyadic interactions, omitting multi-party conversational dynamics where floor-claiming cues compete among multiple listeners. Furthermore, the binary classification formulation groups diverse pause and overlap scenarios into broad shift/hold categories, potentially masking finer-grained backchannel and interruption subtypes.

## Why read this

Speech and ML researchers working on proactive conversational agents and turn-taking models should read this to understand how continuous 3D kinematics provide early-warning intent signals long before vocalization. It challenges the assumption that longer historical windows always help and highlights how upper-body posture versus distal joints operate on independent temporal hierarchies.

## Code

- https://github.com/Dawn2745/MCBF

## Applications

Proactive conversational agents, full-duplex spoken dialogue systems, human-robot interaction, and immersive virtual avatars.

## Institutions / 機構

National Tsing Hua University, National Yang Ming Chiao Tung University

## Related

- (link related pages by id as the wiki grows)
