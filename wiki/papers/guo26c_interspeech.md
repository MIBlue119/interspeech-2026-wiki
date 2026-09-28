---
id: guo26c_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2122
pdf: https://www.isca-archive.org/interspeech_2026/guo26c_interspeech.pdf
---

# Adaptive Federated Fine-Tuning of Self-Supervised Speech Representations

[PDF](https://www.isca-archive.org/interspeech_2026/guo26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/guo26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2122)

**TL;DR** — This paper proposes an adaptive federated fine-tuning framework for self-supervised speech models using early-exit branches and layer-wise partial aggregation to handle system and task heterogeneity.

## Problem

Conventional federated fine-tuning of deep self-supervised speech models ignores hardware and task heterogeneity, causing severe straggler effects on resource-constrained edge devices and high computational waste. Fine-tuning the entire backbone uniformly is inefficient because different speech tasks require different representation depths, ranging from shallow acoustic layers to deep semantic layers. Without addressing these disparities, deploying privacy-preserving speech foundation models across diverse client hardware remains impractical.

## Method

The framework uses a Wav2Vec 2.0 Base backbone transformed into a multi-exit architecture by inserting lightweight prediction heads at Transformer layers 3, 6, 9, and 12. Clients dynamically choose their maximum training depth based on local hardware limits and task complexity, freezing deeper layers to prevent memory overflow. To reconcile dimensional mismatches from varying client depths, the server employs a depth-weighted layer-wise partial aggregation strategy where each Transformer layer is independently averaged using weights proportional to local dataset size and training depth. The setup integrates Flower and SpeechBrain, evaluating five SUPERB benchmark tasks under non-IID speaker partitions.

## Results

Evaluated across LibriSpeech (ASR), Google Speech Commands (KWS-12 and KWS-35), IEMOCAP (ER), and VoxCeleb1 (SID and ASV), the proposed layer-wise partial aggregation strategy outperforms standard FedAvg under heterogeneous federated settings. For instance, on KWS-12, error rate drops from 18.40% (FedAvg) to 17.60% (layer-wise), while ASR test-clean WER improves from 9.21% to 8.79%. Speaker identification (SID) error rate decreases from 17.50% to 15.30%, and ASV equal error rate drops from 12.15% to 10.93%. Layer-wise analyses reveal that tasks prefer specific representation depths rather than always requiring the full 12 layers (e.g., KWS peaks at layer 6, while ASR and ER peak at layer 9).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Distributed speech application developers and mobile service providers looking to fine-tune speech foundation models across heterogeneous edge devices while preserving user data privacy.

## Limitations

The evaluation is restricted to Wav2Vec 2.0 Base and specific non-IID partition assumptions across five chosen datasets.

## Related

- (link related pages by id as the wiki grows)
