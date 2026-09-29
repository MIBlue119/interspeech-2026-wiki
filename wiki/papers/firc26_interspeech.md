---
id: firc26_interspeech
category: deepfake-security
institutions: ["Brno University of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-120
pdf: https://www.isca-archive.org/interspeech_2026/firc26_interspeech.pdf
---

# The Hidden Cost of Pairwise Verification in Synthetic Speech Source Tracing

*Anton Firc, Zbyněk Lička, Vojtěch Staněk, Kamil Malinka*

[PDF](https://www.isca-archive.org/interspeech_2026/firc26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/firc26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-120)

**Category:** `deepfake-security`

**TL;DR** — Global anchoring outperforms pairwise verification objectives for open-set synthetic speech source tracing under matched backbones, achieving 8.61% EER on MLAAD compared to 12-15% for pairwise variants. Pairwise training causes embedding dimensionality collapse, concentrating variance into fewer directions and increasing tail overlap at strict forensic operating points.

## Key contributions

- Demonstrates that global anchoring (cross-entropy/softmax classification) consistently outperforms pairwise verification objectives for open-set synthetic speech source tracing under matched backbones, data, and epoch budgets.
- Compares four trial selection regimes for pairwise training (intermediate random, hard-mining, directional, and metadata-guided rival mining) and shows that while rival mining helps, it fails to bridge the gap to global anchoring.
- Performs embedding geometry and cumulative variance analysis (k99) to show that pairwise training leads to severe variance concentration, whereas a globally supervised baseline retains high performance even under an explicit 10/13-dimensional bottleneck.
- Conducts fine-grained error and binary probe analyses proving that digital twins (identical architectures/weights with minor config changes) are indistinguishable (EER ~39-50%) using standard feature extractors.

## Problem

As speech synthesis advances, open-set source tracing must attribute deepfakes to unseen generators. While biometric verification leverages Siamese-style pairwise training and local mining for open-set generalization, these objectives optimize similarity directly and may sacrifice fine-grained generator separability. Prior works show conflicting preferences for pairwise vs global metrics without controlled comparisons, leaving the representation geometry and failure modes of these objectives unclear in audio forensics.

## Method

The paper compares two training strategies using a Wav2Vec 2.0 XLS-R (300M, frozen by default) backbone with a MultiHead Factorized Attention (MHFA) pooling head. The global anchoring baseline projects the pooled embedding via a linear layer to N=24 training generators and optimizes via Softmax Cross-Entropy, extracting penultimate-layer embeddings for cosine similarity evaluation at inference. The pairwise systems replace the classification head with an FFCosine scoring head (s = w * cos(ha, hb) + b) optimized via Binary Cross-Entropy over pairs, testing four sampling regimes: Intermediate random (1:1 ratio), Hard-Negative mining via a teacher model, Directional k-means coverage-driven selection, and Rival mining (replacing 50% of non-targets with structural or disentanglement rivals). 

All systems are trained with a fixed data and epoch budget on MLAADv8 (in-domain) and evaluated on MLAAD and STOPA (out-of-domain). To investigate embedding geometry, the authors compute k99 (number of principal components explaining 99% variance) and test explicit 10- and 13-dimensional embedding bottlenecks applied to the globally supervised baseline.

## Experimental setup

Evaluated on MLAADv8 for in-domain development/evaluation (fixed dev trial list of 97k trials: 20k target, 77k non-target) and STOPA for out-of-domain evaluation. Evaluated under claim-based evaluation with R=1 and R=5 enrolled utterances. Metrics include Equal Error Rate (EER), normalized Expected Cost Function (nDCF0.01), Precision-Recall at 0.01% FPR (PR@0.01%), and True Positive Rate at fixed False Positive Rates (TPR@0.01%, TPR@0.1%). Models use a 300M XLS-R backbone and MHFA pooling across 3 random seeds.

## Results

On in-domain MLAAD (R=1), the Global (CE) baseline achieves an EER of 8.61% and nDCF0.01 of 0.90, outperforming the best Pairwise system (Rival + XLS-R finetune at 12.39% EER). Adding an explicit 10-dimensional bottleneck to the global baseline yields 7.05% EER and 0.83 nDCF0.01. On out-of-domain STOPA, all methods degrade sharply (best EER around 27.74% with TPR@0.1% below 1.3%), showing that OOD domain shift overwhelms objective differences. Pairwise models exhibit a steeper embedding decay (k99 ~13) compared to global anchoring (k99 ~121), which correlates with wider score distributions and heavier tails that inflate false acceptances at strict thresholds (FPR < 1%).

| System | EER (%) ↓ | nDCF0.01 ↓ | PR@0.01% ↑ | TPR@0.1% ↑ |
|---|---|---|---|---|
| Global (CE) | 8.61 | 0.90 | 4.42 | 19.29 |
| + XLS-R finetune | 7.99 | 0.87 | 5.50 | 21.83 |
| + emb bottleneck (10) | 7.05 | 0.83 | 6.82 | 26.79 |
| Pairwise (Intermediate) | 14.92 | 0.99 | 1.57 | 8.97 |
| Pairwise (Rival mining) | 14.22 | 0.98 | 2.33 | 10.65 |
| Pairwise (Rival + Finetune) | 12.39 | 0.99 | 1.41 | 10.31 |

## Limitations

The conclusions are constrained to the evaluated pairwise regimes, XLS-R backbone, and MHFA pooling heads; alternative metric-learning losses like supervised contrastive or proxy-based objectives might yield different geometry. Out-of-domain performance on STOPA degrades uniformly across all models, preventing definitive ranking for severe domain shifts. The evaluation focuses primarily on a fixed epoch/data budget.

## Why read this

Speech and ML forensic researchers should read this to understand why standard biometric pairwise verification fails to outperform global classification in synthetic speech source tracing. It challenges the assumption that dimensionality reduction drives performance gaps and offers practical guidelines for setting up attribution backends.

## Code

- https://github.com/Security-FIT/hidden-cost-pairwise-verification

## Applications

Post-incident audio forensics, synthetic speech attribution, and deepfake generator tracing.

## Institutions / 機構

Brno University of Technology

**Funding / 經費:** Brno University of Technology, Ministry of Education, Youth and Sports of the Czech Republic, e-INFRA CZ

## Related

- (link related pages by id as the wiki grows)
