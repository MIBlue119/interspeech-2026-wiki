---
id: zhang26o_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1105
pdf: https://www.isca-archive.org/interspeech_2026/zhang26o_interspeech.pdf
---

# Rubric-Aligned Disentangled Evaluation of Human Simultaneous Interpreting

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1105)

**TL;DR** — This paper proposes a dual-head neural evaluation framework for simultaneous interpreting that outperforms prompt-based LLMs and scalar baselines by explicitly decoupling meaning transfer and delivery quality.

## Problem

Evaluating human simultaneous interpreting (SI) requires analyzing multiple dimensions like meaning transfer, delivery quality, and latency, but current automatic metrics collapse these into a single score. Furthermore, structured LLM prompting and standard scalar supervision fail to preserve rubric dimensions, suffering from strong cross-dimension coupling and near-zero correlation with human ratings. Developing automated segment-level diagnostics that align with professional human standards remains a key challenge due to high inter-rater variability and subjective judgment.

## Method

The authors introduce a text-based, rubric-aligned evaluation framework built on the COMET-KIWI reference-free quality estimation backbone (XLM-R Large, roughly 550M parameters). Instead of a single regression output, the model employs two independent linear heads to predict meaning transfer (LQ) and delivery quality (EXP) separately. Parameter adaptation is performed using LoRA applied to attention Q and V projections with rank 8, keeping trainable parameters under 1M. Training uses residual prediction objectives with mean squared error losses for both heads plus a variance regularization term, following a two-stage schedule that first warms up the regression heads before jointly updating LoRA parameters.

## Results

Evaluated on a newly constructed corpus of 1,101 professional SI segments split at the talk level (839 train, 87 dev, 169 test) across English-Chinese directions. On the held-out test set, the proposed dual-head model achieves Pearson correlations of 0.388 for meaning transfer (LQ) and 0.301 for delivery quality (EXP), significantly outperforming the frozen COMET-KIWI baseline (0.219 and 0.175). Prompt-based LLM evaluation and scalar fine-tuning collapse rubric dimensions on the development set, yielding near-zero correlations and excessive cross-dimension coupling near 0.90. The proposed architecture successfully maintains a dimension coupling of 0.529, closely mirroring the human rating coupling of 0.56.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech translation engineers and educational platforms building formative assessment tools for automated segment-level feedback in simultaneous interpreting training.

## Limitations

The model relies strictly on text transcripts and currently acts as a lower bound that cannot fully capture acoustic delivery signals or perceived latency without multimodal timing cues.

## Related

- (link related pages by id as the wiki grows)
