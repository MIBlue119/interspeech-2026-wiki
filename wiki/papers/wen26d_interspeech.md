---
id: wen26d_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2646
pdf: https://www.isca-archive.org/interspeech_2026/wen26d_interspeech.pdf
---

# Towards Robust Ultrasound-based Silent Speech Recognition Learning Physics-Aware and Context-Rich Representations

[PDF](https://www.isca-archive.org/interspeech_2026/wen26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wen26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2646)

**TL;DR** — This paper proposes a physics-aware and context-rich representation framework for ultrasound tongue imaging-based silent speech recognition, reducing word error rate by up to 50.4% under unseen speaker conditions.

## Problem

Ultrasound-based silent speech recognition suffers from acquisition-related physical variabilities such as speckle noise and probe displacement, alongside complex temporal dependencies driven by co-articulation. Standard architectures struggle to separate noise from true articulatory movements across different acquisition conditions, leading to ambiguous representations and poor speaker generalization.

## Method

The framework utilizes an offline k-means clustering strategy to temporally downsample high-frame-rate ultrasound sequences while maintaining context, paired with a physics-inspired data augmentation pipeline incorporating spatial translation shifts, Gaussian noise injection, and temporal masking. The core architecture combines a 3D convolutional network frontend for local spatiotemporal feature extraction with bidirectional Gated Recurrent Units for long-range temporal modeling. End-to-end training is optimized using Connectionist Temporal Classification loss on a single NVIDIA RTX 4090 GPU.

## Results

Evaluated on the UXTD corpus type-A word-level data under overlap and unseen speaker settings using Word Error Rate and Character Error Rate, comparing against Spatiotemporal-GRU, Spatiotemporal-LSTM, and Spatiotemporal-Transformer baselines. In the overlap setting, the method achieves a Word Error Rate of 0.1595 and Character Error Rate of 0.1009, representing relative reductions of 36.5% and 32.6% over the best baseline. In the unseen speaker setting, Word Error Rate drops to 0.1719 and Character Error Rate to 0.0734, corresponding to a 50.4% Word Error Rate reduction compared to the top baseline. Ablation studies confirm that removing either the 3D-CNN frontend or the physics-inspired data augmentation causes substantial performance drops.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers working on silent speech interfaces, non-acoustic speech recognition, and assistive healthcare communication technologies.

## Limitations

Evaluated exclusively on word-level child speech data from the UXTD corpus, and the augmentation magnitude must be strictly constrained to prevent obscuring genuine tongue structures.

## Related

- (link related pages by id as the wiki grows)
