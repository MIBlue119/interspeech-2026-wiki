---
id: chen26ca_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2684
pdf: https://www.isca-archive.org/interspeech_2026/chen26ca_interspeech.pdf
---

# Inside the Latent Flow: Causal Deciphering of Attention Dynamics in Audio Separation Foundation Models

[PDF](https://www.isca-archive.org/interspeech_2026/chen26ca_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26ca_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2684)

**TL;DR** — We adapt causal-intervention probing to SAM Audio, revealing a dual-pathway text-conditioning mechanism and asynchronous layer convergence, which inspires Layer-Selective Attention Caching (LSAC) to cut self-attention compute by ~25% with up to 6.7x higher quality retention than naive truncation.

## Problem

Modern audio separation foundation models use continuous flow matching and diffusion transformers, but their internal mechanisms for multimodal feature injection and spatiotemporal routing remain opaque. Because passive attention observation can be misleading due to entangled nonlinear interactions, principled causal interventions are necessary to understand and optimize these architectures without altering pretrained weights.

## Method

The authors apply deterministic inference-time causal interventions to SAM Audio (Small and 3B models, 12 to 22 layers, 16-step Euler solver) across 10,000+ ODE runs. Methods include orthogonal probing (zeroing cross-attention, additive injections, or uniform softmax to isolate pathways), causal freezing (clamping attention matrices based on entropic rate of change to classify stable vs. fast layers), and gate hijacking (forcibly setting temporal span gating parameter gamma to +5.0). Building on these insights, they propose Layer-Selective Attention Caching (LSAC), a training-free acceleration strategy that reuses cached attention matrices in stable layers after their convergence step.

## Results

Evaluated on LibriSpeech, ESC-50, and FSD50K across Clean, Noisy (5 dB white noise), and Env tiers using SI-SNR, SAR, STOI, and PESQ with Bonferroni-corrected paired t-tests. Ablating additive text injections caused major semantic drops (STOI delta = -0.219, d = -0.89), while zeroing cross-attention severely harmed acoustic structures (SAR = -9.85 dB, d = -0.82). Freezing stable layers midway caused negligible degradation (SI-SNR drop 0.05 dB, d = 0.07). Gate hijacking surged block ratios by 66% to 9.55 but collapsed SI-SNR by 14.6 dB, revealing prior suppression of hard temporal boundaries. LSAC achieved ~25% self-attention FLOP savings with negligible quality loss, yielding up to 6.7x higher quality retention in the Noisy tier compared to naive step reduction.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building, optimizing, or deploying audio separation and foundation models can use these mechanistic insights and LSAC for efficient inference acceleration.

## Limitations

The study is confined to the SAM Audio family (Small and 3B variants); it remains open whether the dual-pathway division and asynchronous convergence transfer to other architectures.

## Related

- (link related pages by id as the wiki grows)
