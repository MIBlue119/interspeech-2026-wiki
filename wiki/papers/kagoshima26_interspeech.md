---
id: kagoshima26_interspeech
category: audio-understanding
labels: [low-resource, robustness-noise]
institutions: ["Toshiba"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-153
pdf: https://www.isca-archive.org/interspeech_2026/kagoshima26_interspeech.pdf
---

# POP-SED: Prototype Orthogonal Projection for Robust Few-shot Sound Event Detection

*Takehiko Kagoshima*

[PDF](https://www.isca-archive.org/interspeech_2026/kagoshima26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kagoshima26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-153)

**Category:** `audio-understanding` · **Labels:** `low-resource`, `robustness-noise`

**TL;DR** — POP-SED is a fine-tuning-free framework for few-shot sound event detection that suppresses overlapping background noise by projecting target-event prototypes onto a subspace orthogonal to estimated background vectors. It achieves an F-score of 62.35% on the DCASE2024 Task 5 validation set without any model fine-tuning.

## Key contributions

- Proposed Prototype Orthogonal Projection (POP-SED), an adaptation method that projects target-event prototypes onto a subspace orthogonal to background vectors without modifying the underlying audio encoder.
- Formulated background modeling using a von Mises-Fisher mixture model (vMFMM) on the unit hypersphere to align with cosine similarity metrics.
- Designed a robustness-aware support-set criterion combining IoU at base and shifted thresholds to select optimal background mean vectors.
- Replaced conventional downsampling with waveform stretching to preserve critical high-frequency components prior to feature extraction.

## Problem

Few-shot sound event detection (SED) requires identifying acoustic events from a handful of support samples, but these samples and query streams are frequently contaminated with overlapping background sounds. Prior background-robust approaches rely heavily on fine-tuning pre-trained audio encoders (such as BEATs or CLAP) using domain-specific training data and support sets, which introduces severe computational overhead and limits deployment flexibility. This work matters because it achieves competitive detection performance in a lightweight, fine-tuning-free manner suitable for rapid on-site customization.

## Method

POP-SED builds upon a frozen acoustic foundation model (BEATs or CLAP) that processes audio using analysis windows set to the average duration of the five support events (frame shift $L/4$). Instead of fine-tuning, it models feature distributions on a unit hypersphere using a 4-component von Mises-Fisher mixture model (vMFMM, $M=4$) fitted on support negative (NEG) features and query features. The vMFMM components generate mean vectors $\mathbf{b}_i$, from which an optimal subset $B$ is selected to represent background noise.

The target-event prototype $\mathbf{z}$ (computed as the mean of positive support features) is then projected onto the subspace orthogonal to the selected background vectors via $\mathbf{z}^{\perp} = \mathbf{z} - \mathbf{Bw}$, where weights $\mathbf{w}$ are solved via a linear system constrained by orthogonality. To ensure robustness against threshold shifts between the support and query sets, the subset selection criterion maximizes an evaluation score combining IoU at threshold $\theta$ and a perturbed threshold $\theta + \delta$ (with $\delta = -0.03$).

For preprocessing, waveform stretching is employed instead of standard resampling to compress the frequency axis by $f_e/f_d$ while stretching the time axis, preventing high-frequency loss. Query frames compute cosine similarity against the projected prototype, smoothed with a moving average filter of length $W$, and thresholded to detect onset and offset timestamps.

## Experimental setup

Evaluated on the DCASE2024 Task 5 validation set (Few-shot Bioacoustic Event Detection), consisting of six subsets (HB, PB, ME, RD, PB24, PW) formulated as one-way 5-shot tasks. Compared against top DCASE2024 Task 5 systems (Liu et al., Sun et al., Bidarouni et al.) as well as a baseline without projection and a 'Full Background Model' using all vMFMM components without subset selection. Audio encoders evaluated include BEATs (12-layer ViT, ~90M parameters, 768-dim embeddings, 16kHz) and CLAP (CNN14, ~80M parameters, 1024-dim embeddings, 44.1kHz). Metrics use the official event-based F-measure.

## Results

Using BEATs as the audio encoder, POP-SED achieved an overall F-score of 62.35%, approaching top-performing fine-tuned systems (Liu et al. at 70.60%) while requiring zero fine-tuning. With CLAP, POP-SED reached an F-score of 53.21%. Compared to the unprojected baseline (which scored 2.34% total with BEATs due to background interference on subsets like PB and PB24), POP-SED yielded massive gains.

Ablation studies demonstrated that the robustness-aware background selection criterion (IoU($\theta$) + IoU($\theta + \delta$)) outperformed standard IoU($\theta$) alone (62.35% vs 57.13%). Modeling directional distributions with vMFMM outperformed a standard Gaussian Mixture Model (GMM) at 59.34%. Furthermore, waveform stretching vastly outperformed traditional resampling (46.49%), proving the necessity of high-frequency preservation. The full background model without subset selection lagged behind at 40.20% total F-score.

| System / Condition | BEATs F-score | CLAP F-score |
|---|---|---|
| Baseline (No Projection) | 2.34% | 0.94% |
| Full Background Model | 40.20% | 38.32% |
| POP-SED (Proposed) | 62.35% | 53.21% |
| Liu et al. (Fine-tuned) | 70.60%* | - |
| Sun et al. (Fine-tuned) | 55.50%* | - |

## Limitations

The computational complexity of background vector selection scales exponentially as $2^M$ with respect to the number of vMFMM components $M$, restricting scalability for larger mixture sizes without alternative search strategies. The evaluation is currently restricted to bioacoustic event detection datasets, and performance depends heavily on the quality of feature representations extracted from frozen foundational encoders.

## Why read this

Speech and audio researchers working on few-shot learning or acoustic event detection without access to large-scale training compute should read this to see how geometric subspace projection can replace costly model fine-tuning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-site customizable sound event detection, bioacoustic monitoring, and edge-device acoustic surveillance in noisy environments.

## Institutions / 機構

Toshiba

## Related

- [BG-CRNN: Boundary-Guided Dynamic Attention for Sound Event Detection in Complex Scenarios](lin26k_interspeech.md) — same problem · relatedness 2.3/3
- [A Semantic-Anchor-based Method for Open-Vocabulary Sound Event Detection](liu26f_interspeech.md) — same problem · relatedness 2.0/3
- [Consistency-Regularized Dual-Branch Network with Performance-Aware Mean Teacher for Sound Event Detection](dai26_interspeech.md) — same problem · relatedness 1.9/3
- [T-ORR: Text-Anchored Orthogonal Residual Rectification for Robust Multimodal Sarcasm Detection](chen26w_interspeech.md) — shared technique · relatedness 1.9/3
- [Few-shot Class-variable Incremental Audio Classification via Prototype Adaptation and Pseudo Class-variable Training](li26q_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
