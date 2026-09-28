---
id: liu26s_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3478
pdf: https://www.isca-archive.org/interspeech_2026/liu26s_interspeech.pdf
---

# Bridging the Distribution Gap in Real-World Far-Field Speech Enhancement via Lightweight Latent Representation Alignment

*Biao Liu, Haoyuan Xie, Zengqiang Shang, Mou Wang, Xin Liu, Pengyuan Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/liu26s_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26s_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3478)

**TL;DR** — This paper presents a lightweight two-stage framework for real-world far-field speech enhancement that bridges the distribution gap between simulated and real recordings via latent representation alignment, achieving 2.94 in P.835 OVRL and 3.35 in P.808 with 0.8 GMAC/s complexity.

## Key contributions

- Constructed a high-quality real-world dataset comprising 70 hours of paired near-field and far-field recordings across 10 diverse indoor, semi-outdoor, and outdoor acoustic scenarios.
- Proposed a lightweight two-stage speech enhancement pipeline that decomposes the task into coarse denoising followed by latent representation alignment.
- Integrated a DAC-derived autoencoder to learn a compact clean near-field latent space alongside a reduced ConvNeXt distribution mapping module.
- Demonstrated through extensive experiments that latent distribution alignment bypasses the limitations of lightweight single-stage networks on real-world recordings.

## Problem

Deep learning speech enhancement models often experience severe performance degradation in real-world far-field scenarios due to the distribution gap between simulated room impulse responses and actual acoustic propagation characteristics. Prior approaches rely on either massive generative models with high computational requirements (several to tens of GMACs) or compact single-stage architectures like GTCRN and LiSenNet. However, directly training lightweight single-stage networks on complex real-world far-field speech often results in suboptimal mapping and decreased performance. This gap matters because practical voice interactions and smart devices require robust enhancement under tight computational constraints.

## Method

The framework processes far-field input signals via a short-time Fourier transform (STFT). In the first stage, a pretrained GTCRN model (with channel dimensions increased from 16 to 48) performs preliminary noise and reverberation reduction. Instead of mapping directly back to the waveform in the spectral domain, a second stage projects these intermediate features into a compact latent space using a lightweight distribution mapping module implemented via a reduced ConvNeXt architecture.

To establish the latent space, an autoencoder adopts an encoder adapted from DAC (initial channel dimension 96, downsampling rates (4, 4, 4, 4), latent dimension 257) and a ConvNeXt-based decoder. The autoencoder is optimized using a combination of multi-scale Mel-spectrogram reconstruction loss and DAC-based adversarial loss. The distribution mapping network uses 4 ConvNeXt blocks with 256 channels, causal padding, and separate magnitude/phase branches, and is optimized via a mean squared error loss against clean target latents.

The system is trained in two stages. First, the encoder, decoder, and distribution mapping module are jointly optimized while the GTCRN denoiser remains frozen, aligning far-field features to clean latents while learning waveform reconstruction. In the second stage, the encoder is frozen to stabilize the latent space structure, while the distribution mapping module and decoder are fine-tuned to refine transformation and reconstruction accuracy.

## Experimental setup

The simulated training set consists of 600 hours generated using DNS Challenge 3 clean speech, noise clips, and over 112,000 RIRs at SNRs from -5 dB to 15 dB. The real-world dataset comprises 70 hours of paired training data and a 20-minute test set (900 utterances across 10 environments) recorded via a synchronized dual-channel system using an Audio-Technica AT4050 near-field mic and DPA 4060 far-field mics at 4m, 6m, and 8m. Baselines include GTCRN, LiSenNet, and causal TF-GridNet evaluated using DNSMOS P.835 (SIG, BAK, OVRL) and P.808 metrics.

## Results

On the real-world far-field test set, the proposed method achieves an OVRL of 2.94, SIG of 3.23, BAK of 4.01, and a P.808 score of 3.35, outperforming all baseline systems. Specifically, the causal TF-GridNet trained on real data reaches an OVRL of 2.49 and P.808 of 3.16 with a heavy cost of 7.97 GMAC/s and 16M parameters, whereas the proposed model operates at 0.8 GMAC/s with 10.38M parameters. Lightweight baselines like GTCRN (2.07 OVRL on real data) and LiSenNet (1.75 OVRL on real data) show drops when trained directly on real data compared to simulation-only training, highlighting the efficacy of the proposed latent alignment strategy.

| Model | Para. (M) | MACs (G/s) | OVRL↑ | SIG↑ | BAK↑ | P.808↑ |
|---|---|---|---|---|---|---|
| Far-field | – | – | 1.20 | 1.45 | 1.33 | 2.38 |
| GTCRN (Real) | 1.78 | 0.26 | 2.07 | 2.34 | 3.81 | 2.80 |
| LiSenNet (Real) | 0.04 | 0.06 | 1.75 | 1.94 | 3.54 | 2.54 |
| TF-GridNet (Real) | 16 | 7.97 | 2.49 | 2.79 | 3.91 | 3.16 |
| Proposed | 10.38 | 0.80 | 2.94 | 3.23 | 4.01 | 3.35 |

## Limitations

The current framework relies on a fixed, pretrained GTCRN denoiser for initial reduction, meaning upstream errors from the first stage cannot be jointly corrected by the encoder-decoder backpropagation in the initial phase. The real-world dataset is limited to 10 environments and AISHELL-3 speech content, which may restrict acoustic and linguistic generalization to broader deployment scenarios.

## Why read this

Researchers and engineers tackling real-world far-field speech enhancement under resource constraints should read this paper to learn how latent representation alignment can bypass the scaling limits of direct waveform mapping.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smart speakers, far-field voice interaction systems, and teleconferencing hardware deployed on resource-constrained edge devices.

## Related

- (link related pages by id as the wiki grows)
