---
id: liu26s_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3478
pdf: https://www.isca-archive.org/interspeech_2026/liu26s_interspeech.pdf
---

# Bridging the Distribution Gap in Real-World Far-Field Speech Enhancement via Lightweight Latent Representation Alignment

[PDF](https://www.isca-archive.org/interspeech_2026/liu26s_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26s_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3478)

**TL;DR** — A lightweight two-stage framework uses latent representation alignment to bridge the distribution gap in real-world far-field speech enhancement, achieving a P.835 overall score of 2.94 and P.808 score of 3.35 at a computational cost of 0.8 GMAC/s.

## Problem

Deep learning speech enhancement models often experience severe performance degradation in real-world far-field scenarios due to the distribution gap between simulated room impulse responses and actual acoustic environments. Lightweight models struggle to directly learn this complex mapping from heavily degraded signals to clean waveforms, while large models are impractical for resource-constrained devices. To address this, the authors introduce a paired real-world dataset and a low-complexity alignment approach.

## Method

The architecture uses a staged two-step pipeline: a pretrained and frozen GTCRN denoising model first performs coarse noise and reverberation reduction. A distribution mapping module built from a reduced ConvNeXt architecture then projects these intermediate features into a clean latent space learned by a DAC-based autoencoder. Finally, a lightweight ConvNeXt-based decoder reconstructs the high-fidelity speech waveform from the aligned latent representation. The training incorporates a combination of multi-scale Mel-spectrogram reconstruction loss, adversarial loss, and a latent space mean squared error alignment loss.

## Results

Evaluated on a custom real-world far-field test set consisting of 900 utterances across 10 diverse acoustic environments, the method is compared against GTCRN, LiSenNet, and causal TF-GridNet baselines trained on both simulated and real datasets. Measured via DNSMOS metrics, the proposed approach scores 2.94 in P.835 OVRL (outperforming the best real-data baseline TF-GridNet at 2.79) and 3.35 in P.808, while requiring only 0.8 GMAC/s of computational complexity. Ablations and data comparisons show that standard lightweight models fail to benefit from direct real-data training, whereas the proposed latent alignment framework successfully preserves speech structure and suppresses background noise.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building real-time speech enhancement systems for smart devices, voice interaction hardware, and far-field teleconferencing applications.

## Related

- (link related pages by id as the wiki grows)
