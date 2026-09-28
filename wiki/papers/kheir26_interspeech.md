---
id: kheir26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1366
---

# DeepFense: A Unified, Modular, and Extensible Framework for Robust Audio Deepfake Detection

**TL;DR** — A large-scale, standardized evaluation of 400+ deepfake detectors finds that pretrained front-end choice dominates performance, and that even the best models carry serious biases by audio quality, gender, and language.

## Problem

Speech deepfake detection research is fragmented across incompatible implementations, datasets, and evaluation protocols, which limits reproducibility, benchmarking, and fair comparison across studies.

## Method

The authors build DeepFense, an open-source PyTorch toolkit that unifies the latest architectures, loss functions, and augmentation pipelines under over 100 standardized recipes, then use it to run a large-scale evaluation of more than 400 models.

## Results

Carefully curated training data improves cross-domain generalization, but the choice of pretrained front-end feature extractor dominates overall performance variance; high-performing models also show severe biases by audio quality, speaker gender, and language.

## Code

Toolkit reported as open-source by the authors — unverified by this wiki as of the `updated` date; please confirm and update this entry if you can.

## Applications

Standardized benchmarking, fair model comparison, and bias auditing for teams building or deploying audio deepfake detection systems.

## Related

- (link related pages by id as the wiki grows)
