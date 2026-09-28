---
id: kim26n_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1548
---

# Cross-Modal Consistency-Aware Structured Pruning for Efficient Speech Enhancement with Air- and Bone-Conduction Microphones

**TL;DR** — A pruning method that keeps channels consistent across modalities compresses multimodal (air + bone-conduction mic) speech enhancement models for wearables without hurting fusion quality.

## Problem

Multimodal speech enhancement using both air- and bone-conduction microphones improves intelligibility in noise, but the resulting models are too complex and compute-heavy for wearable devices, and generic compression methods aren't designed to preserve features critical to multimodal fusion.

## Method

Cross-modal consistency-aware structured pruning (CCAP) estimates channel importance using modality-wise zero masking and ranks channels by how consistent their responses are across modalities, prioritizing channels that carry modality-shared information.

## Results

On a paired air/bone-conduction microphone dataset, CCAP improves PESQ and STOI over prior pruning baselines across multiple architectures and reduces inference latency at equivalent pruning ratios.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Compressing multimodal speech enhancement models for deployment on wearable and embedded devices that combine air and bone-conduction microphones.

## Related

- (link related pages by id as the wiki grows)
