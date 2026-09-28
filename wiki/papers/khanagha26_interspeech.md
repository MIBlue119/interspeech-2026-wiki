---
id: khanagha26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2707
pdf: https://www.isca-archive.org/interspeech_2026/khanagha26_interspeech.pdf
---

# Your U-Net Dereverberation Model is Secretly an RIR Encoder

[PDF](https://www.isca-archive.org/interspeech_2026/khanagha26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/khanagha26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2707)

**TL;DR** — Audio dereverberation models based on U-Net architectures implicitly encode structured room impulse responses (RIRs) in their intermediate layers, and explicitly conditioning them on pre-trained RIR embeddings improves representation quality, accelerates training convergence, and reduces required inference steps.

## Problem

While diffusion-based models excel at speech enhancement framed as additive noise removal, reverberation is a deterministic convolutional process rather than a random additive one, leaving the theoretical behavior of diffusion versus discriminative models under reverberation unexplored. Furthermore, standard models lack explicit awareness of room acoustics, which limits their ability to fully capture global room characteristics. Investigating and leveraging these internal representations bridges the gap between deterministic room degradation theory and generative speech restoration.

## Method

The authors analyze the internal representations of the NCSN++ U-Net architecture (using the 27.8M-parameter 'M' configuration for both SGMSE+ diffusion and discriminative baselines) via t-SNE clustering on features extracted from attention blocks. To improve performance, they train separate RIR encoders (a ResNet34 and a 10-layer Conformer with 256 hidden units and 4 attention heads) using a contrastive self-supervised framework optimized with a cosine-similarity InfoNCE loss and a hard negative-pair loss. These pre-trained RIR embeddings are injected into every BigGAN-style residual block of the NCSN++ backbone using Feature-wise Linear Modulation (FiLM) with zero-initialized identity-mapping safeguards. The models are trained on downsampled 16 kHz audio from the VCTK corpus paired with roughly 10,000 real RIRs.

## Results

Evaluated on the VCTK-Reverb test set containing 774 samples, incorporating pre-trained RIR embeddings boosts wide-band PESQ scores notably. Specifically, SGMSE+ equipped with ResNet34 RIR embeddings reaches a PESQ of 2.86 (compared to 2.62 for baseline SGMSE+ and 2.77 for discriminative NCSN++), while SGMSE+ with Conformer embeddings achieves 2.89. Visualizations show that intermediate model layers form distinct clusters corresponding to individual RIR identities. Additionally, explicit RIR conditioning enables the diffusion model to maintain high performance with significantly fewer reverse diffusion steps (N) during inference.

## Code

- https://github.com/sp-uhh/rir-encoder

## Applications

Speech and audio engineers working on single-channel speech dereverberation, robust speech enhancement, and acoustic environment adaptation for communication systems.

## Limitations

The study focuses primarily on single-channel offline dereverberation scenarios using simulated VCTK-Reverb datasets.

## Related

- (link related pages by id as the wiki grows)
