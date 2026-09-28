---
id: li26j_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-666
pdf: https://www.isca-archive.org/interspeech_2026/li26j_interspeech.pdf
---

# Towards Paradigm-General Suicide Risk Detection via Speech LLM

[PDF](https://www.isca-archive.org/interspeech_2026/li26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-666)

**TL;DR** — This paper introduces a cross-paradigm speech LLM architecture combining Mixture of DoRA Experts (MoDE) to unify ten distinct speech elicitation protocols for adolescent suicide risk detection, achieving a 4.5% relative accuracy improvement over separate paradigm tuning.

## Problem

Existing speech-based suicide risk detection systems typically evaluate patients using only a single speech elicitation paradigm, requiring isolated models that fail to leverage complementary acoustic and semantic cues across different assessment protocols. Building separate models for each interaction type is inefficient and misses opportunities for robust multi-task knowledge transfer. Furthermore, clinical applications demand high reliability, making proper model confidence calibration essential.

## Method

The framework uses Qwen2.5-Omni-7B as the speech LLM backbone, enhanced with a Mixture of DoRA Experts (MoDE) where weight-degraded low-rank adaptation units act as specialized experts governed by a fully connected router. A decoupled design computes expert routing weights using the base transformer backbone prior to activating the DoRA modules to maintain training stability. Auxiliary load balancing (via KL-divergence against a uniform distribution) prevents expert collapse, and temperature scaling sharpens router probabilities. The model is trained on 4 epochs with AdamW using a batch size of 64, employing 10 experts with a rank of 32 and alpha of 64.

## Results

Evaluated on a dataset of 1,223 Chinese adolescents (aged 10-18, where 53.4% present suicide risk) across 10 speech elicitation paradigms (SEPs) split into an 8:1:1 train/dev/test ratio. MoDE achieves an average accuracy of 0.656, outperforming separate tuning (0.628) and conventional joint tuning (0.635). Ablations reveal that removing temperature scaling degrades performance to 0.640, while omitting load balancing causes expert collapse and drops accuracy to 0.625. MoDE also improves confidence calibration, yielding a lower Expected Calibration Error (ECE of 0.061 vs 0.099) and higher AUROC (0.706 vs 0.645) compared to separate tuning baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Healthcare providers and clinical engineers building automated, non-invasive digital screening tools for mental health assessment and adolescent suicide risk monitoring.

## Limitations

Tested exclusively on a Mandarin-speaking adolescent cohort across ten predefined structured elicitation protocols.

## Related

- (link related pages by id as the wiki grows)
