---
id: sun26d_interspeech
category: speech-translation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1292
pdf: https://www.isca-archive.org/interspeech_2026/sun26d_interspeech.pdf
---

# Automated Gradient-Driven Parameter Sharing for Low-Resource Multilingual Speech-to-Text Translation

*Ruiyan Sun, Satoshi Nakamura*

[PDF](https://www.isca-archive.org/interspeech_2026/sun26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1292)

**TL;DR** — The paper introduces a gradient-driven framework (GDPS) that automates parameter sharing configurations for multilingual speech-to-text translation, achieving consistent relative BLEU gains up to 14.4% and COMET gains up to 3.26% over unified fine-tuning on low-resource datasets.

## Key contributions

- Formulates an automated end-to-end pipeline (Gradient Analysis -> Configuration Generation -> Grouped Fine-tuning) replacing manual parameter sharing design or expensive neural architecture search.
- Identifies and addresses the 'Purity Paradox' in deeper conformer layers where higher self-similarity coexists with reduced cross-task purity, pinpointing Encoder Layer 11 FFN2 as the conflict bottleneck.
- Combines language clustering, gradient cosine similarity/conflict metrics, and joint SVD with ridge-regularized canonical correlation analysis (CCA) to determine optimal grouping, shared-private ratios, and initialization.
- Demonstrates consistent improvements across four low-resource language pairs using the 1.2B-parameter SeamlessM4T-Medium model without relying on external massive auxiliary datasets.

## Problem

Massively multilingual speech translation models typically use uniform parameter sharing, which induces 'negative transfer' and gradient conflicts when trained on low-resource settings with divergent language tasks. Existing structural strategies like shared-private representations or task disentangling heavily depend on human intuition or expensive neural architecture search (NAS) to determine layer-wise configurations. This paper addresses the challenges of language heterogeneity, extreme low-resource data constraints, and the manual search overhead in expanding language sets.

## Method

The GDPS framework operates on the 1.2B-parameter SeamlessM4T-Medium model (12 conformer encoder/decoder layers, hidden dimension d=4096). The method consists of three gradient analysis techniques: (A) K-means and hierarchical clustering based on pairwise gradient cosine similarity matrices to group languages (yielding Group 1: Bemba, and Group 2: Tunisian, Estonian, Irish); (B) Self-task vs. cross-task gradient similarity analysis to quantify gradient divergence conflict scores (δ ≈ 0.075), informing a 50% shared and 50% private parameter ratio; and (C) Joint SVD and ridge-regularized CCA on concatenated gradient matrices to capture principal energy directions.

Building on these insights, Encoder Layer 11 FFN2 is restructured by splitting weights into a shared subspace (target dimension Ds = 2048, retaining 512 singular components from the square 1024-dimensional factorization) and group-specific private branches (Dp = 1024 capacity per group). An energy-driven residual initialization allocates the residual weight matrix (W_equiv - W_shared,equiv) to each group proportionally to its gradient energy distribution (pi), using top-k right singular vectors to prevent cold-start failures. Training uses grouped updates with AdamW (α = 4e-5, group-adjusted αg = 10e-4, batch size 4, dropout 0.05, weight decay 0.05, FP16 precision on NVIDIA A100 GPUs).

## Experimental setup

Experiments use sub-sampled IWSLT 2025 low-resource 2-way speech translation corpora translated to English: Tunisian (aeb, 20k lines), Bemba (bem, 20k lines), Estonian (est, 20k lines), and Irish (gle, 7k lines) with roughly 10:1:1 train/val/test splits. The baseline models are SeamlessM4T-Medium (1.2B parameters) and Unified Fine-Tuning. Metrics evaluated include BLEU, TER, BERTScore, and COMET.

## Results

GDPS achieves consistent improvements across all language pairs over the Unified FT baseline. For Aeb-en, GDPS reaches 8.74 BLEU and 0.5500 COMET (vs 7.64 BLEU / 0.5326 COMET for Unified FT). For Bem-en, it reaches 19.69 BLEU and 0.7012 COMET (vs 18.45 BLEU / 0.6866 COMET). For Est-en, it scores 16.49 BLEU and 0.7414 COMET (vs 16.68 BLEU / 0.7363 COMET, showing a slight dip in BLEU but higher COMET). For Gle-en, it achieves 46.20 BLEU and 0.7473 COMET (vs 43.59 BLEU / 0.7257 COMET). Ablations confirm that removing any component (A, B, or C) causes performance drops, and applying GDPS to low-conflict modules (like Layer 10 FFN2 or Layer 11 FFN1) yields marginal gains or performance degradation.

| Systems / Conditions | Aeb-en (BLEU/COMET) | Bem-en (BLEU/COMET) | Est-en (BLEU/COMET) | Gle-en (BLEU/COMET) |
| :--- | :--- | :--- | :--- | :--- |
| SeamlessM4T-Med | 3.19 / 0.5017 | 0.82 / 0.4037 | 11.29 / 0.7102 | 30.62 / 0.6620 |
| Unified FT | 7.64 / 0.5326 | 18.45 / 0.6866 | **16.68** / 0.7363 | 43.59 / 0.7257 |
| GDPS (Ours) | **8.74** / **0.5500** | **19.69** / **0.7012** | 16.49 / **0.7414** | **46.20** / **0.7473** |

## Limitations

The evaluation is restricted to four low-resource language pairs translating exclusively into English under an IWSLT 2025 data-constrained protocol. The hyperparameter thresholding and conflict score derivations rely on empirical distributions that may require re-tuning for larger or structurally different multilingual model families. Furthermore, the architecture specifically targets FFN2 of a single encoder layer (Layer 11), leaving multi-layer or decoder-side sharing largely unexplored.

## Why read this

Speech and ML researchers working on massively multilingual speech translation under low-resource constraints should read this to learn how to replace expensive neural architecture searches with automated gradient-based parameter sharing.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-resource multilingual speech translation systems, on-device translation assistants supporting endangered or indigenous languages, and multi-task speech foundation model adaptation.

## Related

- (link related pages by id as the wiki grows)
