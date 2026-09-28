---
id: khaymonenko26_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-987
pdf: https://www.isca-archive.org/interspeech_2026/khaymonenko26_interspeech.pdf
---

# Scalable Keyword Spotting via Modular Network Expansion

[PDF](https://www.isca-archive.org/interspeech_2026/khaymonenko26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/khaymonenko26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-987)

**TL;DR** — This paper proposes a modular neural network expansion method for keyword spotting that adds new trigger words under a strict safety guarantee of zero regression for existing keywords, reducing average new-keyword false reject rate to 4.37%.

## Problem

Embedded voice interfaces frequently need to incorporate new trigger words after deployment, but updating fixed-vocabulary models is challenging when original training data are inaccessible due to privacy or storage limits. Full retraining or standard fine-tuning risks catastrophic forgetting and regressions on existing core keywords that users rely on. Meanwhile, existing parameter-efficient techniques or open-vocabulary models often sacrifice robustness or fail to provide strict, mathematically guaranteed non-regression behavior.

## Method

The base keyword spotting network, including all batch-normalization statistics and the core classifier head, is completely frozen, and a lightweight expansion branch containing up to 10k new parameters is attached. Each expanded block taps activations from a frozen base block, concatenates them with the previous expansion state, and passes them through a 1D temporal convolution, batch-normalization, and hard-swish activation. A separate new-keyword head predicts probabilities for incoming novel classes. Inference uses a core-first decision rule where the system checks the frozen core detector first and only evaluates the new-keyword head if the core model outputs a background/rejection label.

## Results

Evaluated on Google Speech Commands v2 using Mozilla Common Voice test partitions for false accept rate calibration at 1% FAR, the method is tested across five held-out keyword pairs. The proposed modular expansion achieves an average new-keyword false reject rate (FRR) of 4.37%, outperforming a separate-model ensemble baseline (6.46%), adapters (8.05%), LoRA (6.41%), and head-only tuning (22.30%). Furthermore, it consumes fewer worst-case MACs (16.34M) under the core-first deployment pipeline than adapters (18.45M) and LoRA (20.52M) under the same 10k added-parameter budget, while guaranteeing zero core-keyword regression by construction. Ablation studies demonstrate that tapping four intermediate base blocks yields optimal semantic transfer.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Embedded voice assistants and always-on consumer hardware needing safe, incremental vocabulary updates without original training data or core performance regressions.

## Limitations

Evaluated on class-incremental expansion of fixed-vocabulary systems; sequential multi-stage expansion across many future updates remains unexplored.

## Related

- (link related pages by id as the wiki grows)
