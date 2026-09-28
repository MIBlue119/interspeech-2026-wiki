---
id: zhang26da_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2157
pdf: https://www.isca-archive.org/interspeech_2026/zhang26da_interspeech.pdf
---

# Grammar-Guided Hierarchical Parsing for Long-form Audio Activity Recognition

*Peng Zhang, Qingyu Luo, Philip J.B. Jackson, Wenwu Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26da_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26da_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2157)

**TL;DR** — The paper introduces Hierarchical Activity Grammar (HAG) with grammar-guided Viterbi decoding to infer act-sub-event parse trees from long-form audio event detections, achieving strong temporal-order consistency (Edit score of 35.3 on Eval) without requiring sub-activity or activity training labels.

## Key contributions

- Formulates long-form audio activity recognition as hierarchical parsing from event-level evidence into an Act-Sub-Event parse tree.
- Proposes Hierarchical Activity Grammar (HAG) modeled as a Probabilistic Context-Free Grammar (PCFG) encoding multi-level temporal ordering constraints.
- Augments the grammar with explicit noise non-terminals to absorb missing, background, or spurious event predictions.
- Adapts an Earley-style Viterbi MAP decoding algorithm combining event acoustic posteriors and a grammar prior weighted by hyperparameter lambda.

## Problem

Long-form audio spans minutes to hours and exhibits a natural hierarchy (events form sub-activities, which form high-level activities), but prior work trains separate models for each level without structural constraints. This leads to cross-level inconsistencies, invalid step orderings, and error drift across boundaries, especially since gathering multi-level annotations is expensive. While prior work models flat events or uses multi-level supervision, they lack explicit global decoding constraints. This paper solves the gap by enabling unsupervised structured inference of intermediate sub-activities and root activities directly from event-level detections using a syntactic grammar prior.

## Method

The framework takes an input long-form audio file, passes it through an event-centric acoustic front-end (SlowFast encoder combined with an ActionFormer segmenter) to extract an onset-ordered sequence of $N$ event segments with class posteriors $\pi_n \in [0, 1]^{|\Sigma|}$. The Hierarchical Activity Grammar $G = (N, \Sigma, R, S_{start}, P)$ defines production rules split into two layers: $R_{act}$ for global procedural logic expanding the root activity ACT into an ordered sequence of sub-activities $SUB_c$, and $R_{sub}$ for local acoustic variability anchoring each $SUB_c$ to a characteristic set of event classes $K_c$. Noise non-terminals $\zeta_i$ are introduced between anchors to generate optional non-anchor events $u \in U_c$ or empty strings $\epsilon$. Decoding is framed as finding the optimal parse tree $T^*$ that maximizes $\log p_{acous}(E | T) + \lambda \log p_{gram}(T)$, where $p_{acous}$ multiplies segment posteriors along the tree terminals and $p_{gram}$ aggregates production rule probabilities. An Earley-style Viterbi decoder performs predict, scan, and complete operations in the log domain, pruning candidate terminals to the top-$m=10$ classes per segment for efficiency.

## Experimental setup

Evaluated on the MultiAct long-form procedural audio dataset (8.97 hours total, 3 activity classes across 51 instances averaging 628s, 12 sub-activity classes across 472 instances averaging 63.6s, and 44 event classes). Baselines include fully-supervised sub-activity and activity neural networks, and a standalone event detector (Event NN). Metrics include Average Precision (AP) at temporal IoU thresholds [0.1, 0.2, 0.3, 0.4, 0.5] for event detection, segmental Edit score, F1@10/25/50, and frame-wise accuracy for sub-activity segmentation, and Top-1 accuracy, mPCA, mAP, and mAUC for activity classification. The grammar weight $\lambda$ is fixed at 0.3 based on validation sweeps.

## Results

Applying grammar-guided decoding yields a minor bump in event detection mAP on the validation split (13.10 to 13.13) and evaluation split (14.63 to 14.65). For sub-activity segmentation, grammar-induced parsing substantially boosts temporal-order consistency on the evaluation split, raising the Edit score from 24.6 (fully-supervised baseline) to 35.3, though high-IoU overlap metrics (F1@25/F1@50) and frame-wise accuracy remain limited because the parser cannot refine temporal boundaries beyond the detector's proposal granularity. For high-level activity classification, the event-only grammar-induced model achieves 73.3% Top-1 accuracy (70.3 mPCA) on validation and 66.7% Top-1 accuracy (75.0 mAUC) on evaluation without using any sub-activity or activity training labels.

| System / Condition | Edit (Eval) | F1@10 (Eval) | Top-1 Activity (Eval) | mAP Activity (Eval) |
|---|---|---|---|---|
| Fully-Supervised Subactivity/Activity NN | 24.6 | 21.9 | 83.3 | 72.2 |
| Grammar-Induced (Event-only, Ours) | 35.3 | 24.6 | 66.7 | 58.3 |

## Limitations

The framework is strictly bounded by the temporal proposal granularity and boundaries of the upstream event detector, meaning it cannot correct localization errors or improve high-IoU overlap metrics (F1@25/50). Performance is sensitive to the grammar prior weight $\lambda$ (with values exceeding 0.5 degrading accuracy), and activity classification performance drops compared to fully-supervised upper bounds when acoustic evidence is ambiguous.

## Why read this

Researchers and engineers building long-form speech and audio understanding systems should read this to learn how to inject symbolic procedural grammars into neural event decoders via Earley parsing, trading costly multi-level supervision for global temporal-order consistency.

## Code

- https://github.com/PennyZhang9/MultiAct

## Applications

Long-form audio activity monitoring, egocentric audio analysis, smart home activity logging, and procedural task tracking.

## Related

- (link related pages by id as the wiki grows)
