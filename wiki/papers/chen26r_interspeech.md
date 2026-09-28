---
id: chen26r_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1683
---

# Explainable and Trustworthy Speech Emotion Recognition Using Confidence Score and Reinforcement Learning Rectified Speech Emotion Descriptors

**TL;DR** — Rectifying automatically annotated speech-emotion-descriptor labels with a confidence score and reinforcement learning produces explainable SER systems that beat baselines trained without this correction.

## Problem

Explainable and trustworthy speech emotion recognition is hard to achieve because reliable labels for speech emotion descriptors (SEDs) like prosodic features and speaker traits are scarce.

## Method

The authors present a confidence-score and reinforcement-learning based on-the-fly SED rectification approach for post-training SER systems on automatically annotated SED labels, combining selective data use with RL-driven correction of noisy descriptor labels.

## Results

On IEMOCAP and MELD, the best system combining both components outperforms baselines without data selection or SED rectification, gaining 2.9% and 3.3% absolute (3.7% and 5.4% relative) SER accuracy respectively.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building interpretable, auditable emotion-recognition systems for use cases like call-center analytics or mental-health monitoring where explainability matters.

## Related

- (link related pages by id as the wiki grows)
