---
id: zhang26ha_interspeech
category: keyword-spotting
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3545
pdf: https://www.isca-archive.org/interspeech_2026/zhang26ha_interspeech.pdf
---

# Margin-Aware Contrastive Regularization for Robust Streaming Keyword Spotting under Strict False-Alarm Constraints

*Hanwen Zhang, Guosong Zhu, Zhen Qin*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26ha_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26ha_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3545)

**TL;DR** — Margin-Aware Contrastive Regularization (MACR) is a zero-inference-overhead training auxiliary objective for streaming keyword spotting that reduces false rejection rates by over 40% at strict false-alarm operating points.

## Key contributions

- Identifies and demonstrates the representation-margin limitation of standard Cross-Entropy training, causing severe FRR degradation under strict continuous-stream FA constraints.
- Proposes MACR, an offline regularization strategy that selectively pulls target classes while maintaining a margin against offline-mined hard negatives without distorting the heterogeneous Unknown manifold.
- Achieves >40% relative FRR reduction at strict FA operating points (0.2–0.5 FA/h) on Google Speech Commands V2 with negligible closed-set accuracy impact.
- Ensures zero deployment overhead, introducing no additional parameters, MACs, memory footprint, or algorithmic latency to the causal inference graph.

## Problem

Always-on edge keyword spotting models optimized with standard Cross-Entropy (CE) achieve high closed-set accuracy but suffer from severe false rejection rate (FRR) degradation when deployed in continuous streams under strict false alarm budgets (<0.5 FA/h). Standard CE establishes functional decision boundaries rather than geometric safety margins, rendering models vulnerable to phonetically similar imposters and environmental noise. Prior global contrastive learning approaches (like standard Supervised Contrastive learning) fail because forcing the heterogeneous Unknown category into a compact cluster causes representational distortion.

## Method

MACR introduces an offline auxiliary objective applied to the penultimate-layer embeddings of a causal 1D-CNN backbone, which are $\ell_2$-normalized onto a unit hypersphere. The objective consists of two components: a target-restricted intra-class pull ($L_{pull}$) and a margin-aware hard-negative repulsion ($L_{push}$). To avoid distortion, $L_{pull}$ restricts its contrastive denominator strictly to other target-keyword samples, completely excluding the heterogeneous Unknown and Silence categories from intra-class clustering.

The repulsion term ($L_{push}$) penalizes negative pairs only when their cosine similarity exceeds a geometric safety margin $m$ (set to 0.4). Furthermore, hard negative samples (confusing non-target speech) are asynchronously mined using the top-$K$ highest target posteriors from an exponential moving average (EMA) model and weighted by a factor $\alpha = 2.0$ to concentrate optimization on boundary-confusing errors. The total training loss combines standard CE with MACR scaled by $\lambda = 0.5$ using AdamW for 120 epochs with a weight decay of $10^{-4}$ to stabilize optimization.

At inference, the MACR auxiliary branch is completely discarded. The deployed causal inference graph retains 0 ms algorithmic lookahead, identical parameter counts, and identical multiply-accumulates (MACs) as the standard CE baseline.

## Experimental setup

Evaluated on the Google Speech Commands V2 (12-class) dataset using closed-set accuracy and a continuous-stream protocol comprising 50 independently synthesized 2-hour streams (100 hours total) with 2,000 class-balanced target events per stream. Baselines include standard CE, Focal Loss, ArcFace, Std. SupCon, CLDC, and GraphemeAug across lightweight causal backbones (1D-CNN with ~150K parameters, DS-CNN Tiny, and BC-ResNet-1). Trained for 120 epochs using AdamW (batch size 128, LR $10^{-3}$ to $10^{-5}$) with data augmentation including time shifting, noise mixing, and frequency masking.

## Results

On the 150K causal 1D-CNN backbone, MACR achieves a closed-set accuracy of 95.68% (comparable to CE's 95.82%) while slashing continuous-stream FRR at the strict 0.2 FA/h operating point from 29.85% down to 14.80%—a 50.4% relative reduction. At 0.5 FA/h, FRR drops from 16.32% to 7.64%. In contrast, global alternatives like ArcFace suffer high FRR (23.50% at 0.2 FA/h) due to manifold distortion, and standard SupCon degrades closed-set accuracy to 95.50%. Ablations confirm that removing the safety margin ($m=0$), dropping hard-negative weighting, or applying global Unknown clustering degrades FRR to 9.80%, 10.15%, and 13.60% respectively.

MACR does not win on unconstrained closed-set accuracy where ArcFace marginally peaks at 96.10%, but strictly dominates all methods under low false-alarm streaming conditions.

| System / Condition | Closed-Set Acc (%) | FRR (%) @ 1.0 FA/h | FRR (%) @ 0.5 FA/h | FRR (%) @ 0.2 FA/h |
|---|---|---|---|---|
| Scratch (Baseline CE) | 95.82 | 8.52 | 16.32 | 29.85 |
| + Focal Loss [7] | 95.91 | 7.95 | 14.85 | 26.10 |
| + ArcFace [14] | 96.10 | 7.30 | 13.50 | 23.50 |
| + Std. SupCon [10] | 95.50 | 8.20 | 12.50 | 21.40 |
| + MACR (Ours) | 95.68 | 4.85 | 7.64 | 14.80 |

## Limitations

Evaluation is restricted to the English multi-keyword Google Speech Commands V2 dataset under synthetic continuous streams. The approach has not yet been validated on larger-scale custom wake-word detection tasks, real-world far-field multi-talker environments, or highly multilingual settings.

## Why read this

Speech and ML engineers building always-on edge voice assistants should read this to learn how to deploy zero-overhead training regularization that drastically improves false-alarm robustness without sacrificing runtime efficiency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Always-on edge voice assistants, smart-home appliance speech controllers, and wearable audio sensor interfaces.

## Related

- (link related pages by id as the wiki grows)
