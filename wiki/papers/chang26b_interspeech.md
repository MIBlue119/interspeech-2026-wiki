---
id: chang26b_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1125
---

# A Two-Stage Defence for Robust Federated Speech Emotion Recognition

**TL;DR** — A federated speech emotion recognition framework that adds adversarial training plus test-time randomization to protect both user data privacy and model robustness against adversarial attacks.

## Problem

IoT-style speech emotion recognition typically uploads raw speech to servers, risking privacy, and the underlying deep networks are vulnerable to adversarial perturbations that flip predicted emotional states.

## Method

Combines federated learning (keeping raw speech local) with a two-stage defence — adversarial training during training and randomization at test time — to protect both data and model robustness.

## Results

Experiments show the framework effectively protects speech data locally and improves model robustness against a series of adversarial attacks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy-sensitive emotion-aware IoT devices, such as wearables and smart speakers, deployed in untrusted network environments.

## Related

- (link related pages by id as the wiki grows)
