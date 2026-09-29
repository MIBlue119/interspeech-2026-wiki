---
id: chen26ca_interspeech
category: enhancement-separation
labels: [efficient-on-device, self-supervised]
institutions: ["Chinese University of Hong Kong, Shenzhen", "Jilin University", "Hunan University", "University of Electronic Science and Technology of China"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2684
pdf: https://www.isca-archive.org/interspeech_2026/chen26ca_interspeech.pdf
---

# Inside the Latent Flow: Causal Deciphering of Attention Dynamics in Audio Separation Foundation Models

*Yuxuan Chen, Haoyuan Yu, Peize He*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26ca_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26ca_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2684)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `self-supervised`

**TL;DR** — By applying inference-time causal interventions to audio separation foundation models (SAM Audio), this work uncovers an asymmetric dual-pathway text conditioning mechanism and asynchronous layer-wise convergence, leading to a training-free attention caching method (LSAC) that cuts self-attention compute by ~25% with up to 6.7x higher quality retention than naive step reduction.

## Key contributions

- Orthogonal probing discovery that additive text injections drive semantic identity while cross-attention governs acoustic structure and transient sharpness.
- Causal identification of an asynchronous 'scaffold and sculpt' convergence schedule across layers during ordinary differential equation (ODE) integration.
- Characterization of a 'prior suppression' phenomenon where the model actively suppresses native temporal span segmentation capabilities to preserve continuous-flow stability.
- Introduction of Layer-Selective Attention Caching (LSAC), a training-free acceleration strategy that caches attention in stable layers to dominate naive step reduction.

## Problem

Modern audio separation foundation models couple continuous flow matching with diffusion transformers to handle universal sound separation, yet their internal latent dynamics remain opaque. Current explainability practices blindly transfer spatial grounding heuristics from computer vision models (like treating cross-attention maps as precise spatial markers), which can be misleading for acoustic generation. Because attention is not inherently explanation, researchers need rigorous causal interventions rather than passive observation to decode multi-modal feature injection, spatiotemporal routing, and integration trajectories without altering pretrained weights.

## Method

The authors deploy deterministic inference-time causal interventions on SAM Audio (which processes audio in a 25 Hz discrete autoencoder latent space via an Euler solver). To separate text conditioning effects, they apply orthogonal probing: zeroing out cross-attention (CA -> 0), zeroing additive projections, and enforcing uniform softmax weights. For temporal dynamics, they classify layers into 'stable' or 'fast' based on the entropic rate of change of self-attention matrices across integration steps, using this to define causal freezing points where attention matrices are clamped.

To probe geometric capacity, they use 'gate hijacking' on span prompts by forcefully shifting the learnable gating parameter from its pretrained negative default (gamma = -0.14) to a positive value (gamma = +5.0), measuring topological selectivity via block ratio (BR). Building on these insights, they propose Layer-Selective Attention Caching (LSAC), which skips expensive O(T^2 d) query-key multiplications in stable layers after their freeze step while continuing to recompute value matrices V at each step. LSAC is evaluated across three configurations (Safe, Balanced, Aggressive) against naive uniform integration step truncation and global block-skipping baselines like DeepCache.

## Experimental setup

Evaluated on the SAM Audio Small model (12 layers, 16-step Euler solver) and the 3B parameter Large model (22 layers), covering over 10,000 independent ODE runs across three complexity tiers: Clean (LibriSpeech cross-gender speech mixtures), Noisy (LibriSpeech with 5 dB steady-state white noise), and Env (cross-domain audio from ESC-50 and FSD50K). Metrics include Scale-Invariant Signal-to-Noise Ratio (SI-SNR), Signal-to-Artifacts Ratio (SAR), Short-Time Objective Intelligibility (STOI), and Perceptual Evaluation of Speech Quality (PESQ), backed by paired t-tests, Cohen's d effect sizes, and Bonferroni corrections.

## Results

Additive conditioning ablation causes catastrophic semantic loss, highlighted by a drop in STOI of Delta = -0.219 (d = -0.89, p < 0.001) for the small model and Delta STOI = -0.336 (d = -1.14) for the 3B model. Conversely, zeroing cross-attention primarily harms the acoustic axis, inflicting a SAR degradation of -9.85 dB (d = -0.82). Freezing stable layers (e.g., L1, L6, L9) as early as step 4 results in negligible SI-SNR degradation (Delta = 0.05 dB, d = 0.07), whereas premature freezing of fast layers at step 8 causes a significant 0.66 dB drop (d = 0.35).

LSAC-Balanced cuts self-attention compute by ~25% while achieving strict Pareto dominance over naive step reduction. In the Noisy tier, LSAC incurs only 0.13 dB degradation compared to 0.87 dB for naive truncation, achieving a 6.7x advantage; in the Environmental tier, it achieves a 5.3x advantage (0.30 dB vs 1.60 dB loss). On the 3B parameter variant, LSAC-Balanced achieves |Delta| = 0.01 dB on Clean audio, outperforming DeepCache-Skip2 (0.37 dB loss) by a 37x quality margin.

| System / Condition | SI-SNR Degr. (Clean) | SI-SNR Degr. (Noisy) | SI-SNR Degr. (Env) | SA Compute Saved (%) |
|---|---|---|---|---|
| LSAC - Safe (ours) | 0.5 dB | 0.1 dB | 0.2 dB | ~25% |
| LSAC - Balanced (ours) | 0.2 dB | 0.1 dB | 0.3 dB | ~25% |
| LSAC - Aggressive (ours) | 2.5 dB | 0.6 dB | 0.2 dB | ~25% |
| Naive Truncation (12-step) | 5.0 dB | 3.2 dB | 4.1 dB | ~25% |
| Naive Truncation (10-step) | 7.3 dB | 4.7 dB | 7.4 dB | ~37% |
| DeepCache [37] (Skip-2) | 0.9 dB | 0.7 dB | 1.1 dB | ~25% |

## Limitations

The investigation is confined exclusively to the SAM Audio family (Small and 3B parameter variants); whether the dual-pathway division and asynchronous convergence generalize to alternative audio conditioning architectures remains unverified. The proposed LSAC strategy relies on fixed static thresholds per layer rather than dynamic real-time signal-to-noise estimation. Furthermore, generative ODE-based models exhibit high intrinsic evaluation variance, requiring thousands of paired runs to resolve statistically significant trends.

## Why read this

Speech and ML engineers building or accelerating audio separation and generation foundation models will learn how to peer inside continuous flow-matching transformers using principled causal interventions rather than visual heuristics. Readers will take away a practical, training-free attention caching recipe (LSAC) that reduces transformer compute overhead with minimal perceptual loss.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time universal sound source separation, promptable audio target extraction, and efficient on-device deployment of large-scale speech enhancement models.

## Institutions / 機構

Chinese University of Hong Kong, Shenzhen, Jilin University, Hunan University, University of Electronic Science and Technology of China

## Related

- [TF-MossFormer: Integrating Convolution Gated Local-Global Attentions for Enhanced Time-Frequency Domain Monaural Speech Separation](zhao26_interspeech.md) — same problem · relatedness 2.2/3
- [TF-MoE: Time-Frequency Mixture-of-Experts for Efficient Speech Separation](hu26d_interspeech.md) — same problem · relatedness 2.1/3
- [MeCo: One-Step MeanFlow-based Corrector for Multi-Channel Speech Separation](kim26j_interspeech.md) — same problem · relatedness 2.1/3
- [Improving Audio Codec-based Speech Separation By Stacking Residual Vector Quantization Layers](dinh26_interspeech.md) — same problem · relatedness 2.1/3
- [SAM: A Mamba-2 State-Space Audio-Language Model](lee26d_interspeech.md) — complementary · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
