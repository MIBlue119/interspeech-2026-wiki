---
id: alali26_interspeech
category: privacy
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-327
---

# Personal Attribute Leakage in Federated Speech Models

**TL;DR** — Federated ASR training still leaks who a speaker is: a weight-only attack can recover gender, age, accent, and other sensitive traits from model updates without ever touching raw audio.

## Problem

Federated learning trains ASR models without centralizing speech, but it is unclear whether the shared model updates themselves expose sensitive speaker attributes.

## Method

A non-parametric white-box attack that operates purely on weight differentials from a passive participant, tested against three ASR backbones (Wav2Vec2, HuBERT, Whisper) to infer demographic and clinical attributes such as gender, age, accent, emotion, and speech impairment.

## Results

The attack reliably infers several attributes, most consistently accent across all three models, and shows that traits underrepresented or missing from pretraining data are the most vulnerable to inference.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy auditing for federated ASR deployments, and a benchmark threat model for teams evaluating whether their aggregation protocol needs stronger defenses before rolling out on-device speech training.

## Related

- (link related pages by id as the wiki grows)
