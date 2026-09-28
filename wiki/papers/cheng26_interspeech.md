---
id: cheng26_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-158
pdf: https://www.isca-archive.org/interspeech_2026/cheng26_interspeech.pdf
---

# Diffusion Reconstruction towards Generalizable Audio Deepfake Detection

[PDF](https://www.isca-archive.org/interspeech_2026/cheng26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cheng26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-158)

**TL;DR** — This paper proposes a hard-sample classification framework for audio deepfake detection using diffusion-based audio reconstruction and Regularization-Assisted Contrastive Learning, achieving an average EER reduction from 15.789% to 8.247% across five test sets.

## Problem

Contemporary audio deepfake detectors struggle to generalize to unseen or cross-domain synthetic speech attacks created by rapidly evolving generative models. Existing systems often overfit to specific training artifacts, making them unreliable when deployed against out-of-domain spoofing methods. Addressing this requires improving model robustness through hard-sample discrimination.

## Method

The framework combines a frozen XLS-R 300M feature extractor with an AASIST classifier enhanced by an adaptive multi-layer feature aggregation module. To generate challenging hard samples, input waveforms are reconstructed using a SemantiCodec latent diffusion model, alongside alternative codecs like HiFi-GAN, DAC, and Encodec. The network is optimized via Regularization-Assisted Contrastive Learning (RACL), which integrates a dual contrastive loss—combining standard contrastive loss with an enhanced loss focused on bona fide and reconstructed bona fide pairs—and a variance-based regularization loss to enforce intra-class compactness.

## Results

Evaluated across five diverse datasets including ASVspoof 2019 LA eval, CodecFake, DiffSSD, WaveFake, and In-The-Wild (ITW), measured by Equal Error Rate (EER). The proposed RACL Diffusion model achieves an average EER of 8.247%, outperforming the baseline implementation (15.789%) and a vanilla CodecFake baseline (12.220% on subset aggregates). Ablation studies show that adding the enhanced contrastive loss and variance-based regularization loss progressively improves average EER from 10.328% down to the optimal 8.247%. t-SNE visualizations confirm that RACL increases inter-class separation and reduces intra-class variance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Security systems, telecommunications fraud prevention, and content moderation platforms requiring robust detection of unseen synthetic speech and audio deepfakes.

## Limitations

Minor performance degradation is observed on individual datasets, indicating a trade-off where the model prioritizes generalized global features over specific local artifacts.

## Related

- (link related pages by id as the wiki grows)
