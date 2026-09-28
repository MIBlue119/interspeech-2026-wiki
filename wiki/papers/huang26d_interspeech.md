---
id: huang26d_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1243
pdf: https://www.isca-archive.org/interspeech_2026/huang26d_interspeech.pdf
---

# Before the Turn: Investigating Motion Cues Preceding Speech in Dyadic Interaction

[PDF](https://www.isca-archive.org/interspeech_2026/huang26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1243)

**TL;DR** — This paper investigates how continuous 3D full-body kinematics precede speech in dyadic interactions, demonstrating that upper-body posture can predict turn shifts up to 3.0 seconds prior to vocalization.

## Problem

Traditional conversational models rely almost exclusively on reactive acoustic and linguistic boundary detection, which inherently lags behind human intention and fails during overlapping speech or short pauses. While some multimodal models include visual features, they treat them as synchronized, abstract labels rather than continuous kinematic trajectories and ignore temporal differences across body parts. Understanding these asynchronous physical dynamics is crucial for building natural, proactive human-agent conversational systems.

## Method

The authors evaluate a Transformer model on the InterAct 3D skeletal dataset (60 joints, downsampled to 30 fps), framing turn-taking prediction as a binary classification task (Shift vs. Hold). Input features comprise 6D continuous rotation matrices and speaker-Z-scored kinematic velocity and diversity metrics for the FullBody, UpperBody, Hands, and Head. The training pipeline utilizes an AdamW optimizer (learning rate 1e-4, weight decay 1e-4) with a weighted binary cross-entropy loss to handle class imbalance across 5-fold cross-validation. The experimental setup systematically varies observation windows (WL from 0.5s to 3.0s) and predictive lead times (tau from 0.0s to 1.5s) to isolate anticipatory motor planning.

## Results

Evaluated on the InterAct dataset (8.3 hours across 241 semi-structured dyadic scenarios containing 2,439 shifts and 1,505 holds), the method achieves an F1-Shift score of up to 76.81% using UpperBody features under a 0.5s window. The study reveals a temporal hierarchy where distal joints (head and hands) trigger 0.5 to 0.6 seconds prior to speech, whereas upper-body movements sustain predictions up to 3.0 seconds in advance. Furthermore, predicting turns at a lead time of 1.5 seconds frequently outperforms zero-lag evaluation because subsequent static postures act as temporal noise. Floor-claiming intent features a preparatory kinetic accumulation over 1.5 seconds, while floor-holding triggers an immediate explosive burst at the speech collision boundary.

## Code

- https://github.com/Dawn2745/MCBF

## Applications

Speech and ML engineers building embodied conversational agents, social robots, and interactive spoken dialogue systems that require natural, proactive turn-taking.

## Limitations

The current evaluation focuses on isolated body-part modalities rather than modeling the complex synergistic synchronization across multiple modalities simultaneously.

## Related

- (link related pages by id as the wiki grows)
