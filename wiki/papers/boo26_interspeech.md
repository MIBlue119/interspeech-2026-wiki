---
id: boo26_interspeech
category: deepfake-detection
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1246
pdf: https://www.isca-archive.org/interspeech_2026/boo26_interspeech.pdf
---

# Referee: Reference-aware Audiovisual Deepfake Detection

[PDF](https://www.isca-archive.org/interspeech_2026/boo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/boo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1246)

**TL;DR** — Referee is a reference-aware audiovisual deepfake detection framework that models cross-modal speaker identity consistency using an identity bottleneck and matching modules, achieving state-of-the-art cross-dataset and cross-lingual performance (e.g., 99.41% AUC on KoDF).

## Problem

Prior audiovisual deepfake detectors rely heavily on fine-grained lip-synchronization patterns, rendering them vulnerable to lip occlusions, low-resolution degradation, and poor generalization to unseen forgery techniques. Existing identity-based methods often use pixel-level proxy tasks that overfit to low-level synthesis artifacts, or naive feature concatenation that lacks cross-modal interaction and requires impractically long reference footage.

## Method

Referee extracts joint audiovisual features using pretrained Synchformer encoders and processes them through an identity bottleneck module (IDB) with learnable identity queries shared across target and reference branches via weight-sharing. An ID matching module then aligns target identity tokens against reference tokens using stacked cross-attention blocks, optimized with an auxiliary binary cross-entropy identity verification loss. Finally, these reference-aware identity tokens are concatenated with the target audiovisual feature sequence and fed into an AV-Transformer for joint deepfake classification.

## Results

Evaluated on FakeAVCeleb, FaceForensics++ (FF++), and KoDF datasets using Accuracy (ACC), Average Precision (AP), and AUC metrics. On the cross-lingual KoDF evaluation, Referee achieves 99.41% AUC and 99.47% AP, surpassing prior state-of-the-art models. On FF++ cross-dataset evaluation, it reaches 99.4% AUC and 99.4% AP, significantly outperforming models like Xception and POI-Forensics while trained on a modest 14k clips instead of million-scale datasets. Ablations confirm the critical role of both the reference identity queries and the auxiliary identity matching loss.

## Code

- https://github.com/ewha-mmai/referee

## Applications

Speech and security engineers building robust forensic systems to detect audio-visual deepfakes in real-world scenarios across unseen languages and manipulation techniques.

## Related

- (link related pages by id as the wiki grows)
