---
id: yu26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-456
pdf: https://www.isca-archive.org/interspeech_2026/yu26_interspeech.pdf
---

# Investigating LLMs Behavior in Depression Severity Prediction

[PDF](https://www.isca-archive.org/interspeech_2026/yu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-456)

**TL;DR** — This paper investigates large language model behavior in depression severity prediction, showing that context relevance via symptom-focused excerpts dramatically improves performance while reducing token usage by 80%, whereas increasing in-context demonstration count yields negligible gains.

## Problem

Large language models are increasingly used for psychiatric health assessments like depression severity prediction, but key scaling and prompting behaviors remain poorly understood. Specifically, it was unclear whether increasing in-context learning demonstration counts improves performance, whether models genuinely rely on demonstration labels, or how much irrelevant conversational noise in full-session transcripts degrades accuracy. Understanding these factors is critical for developing cost-effective, reliable clinical decision support tools.

## Method

The study evaluates five LLMs (GPT-4o-mini, GPT-5.1, DeepSeek-Chat, DeepSeek-Reasoner, and Llama-3.1-8B) on PHQ-8 prediction using the E-DAIC dataset transcribed via Whisper-Large-V3. It tests few-shot scaling from 0 to 10 shots, introduces a contradictory-label intervention where gold demonstration scores are deliberately flipped to test label reliance, and compares raw transcripts against compact symptom-focused excerpts extracted by GPT-5.1. Additionally, the authors evaluate prediction averaging across five independent runs with randomly sampled demonstrations to stabilize variance, running all experiments at a fixed decoding temperature of 0.3.

## Results

Evaluated on the E-DAIC dataset using Concordance Correlation Coefficient (CCC), Mean Absolute Error (MAE), and Root Mean Squared Error (RMSE), scaling demonstration counts from 0 to 10 yielded flat, non-monotonic performance trends after an initial small gain at 2 shots. Replacing full raw transcripts with symptom-focused excerpts consistently boosted CCC across all models—improving Llama-3.1-8B by +0.26 to +0.41 and GPT-4o-mini by +0.20 to +0.24—while cutting prompt token usage by roughly 80%. Contradictory demonstration labels caused minimal degradation for GPT models but moderate drops (up to 17%) for reasoning models, indicating heterogeneous label usage. Finally, averaging predictions across five stochastic runs yielded an average CCC gain of +0.021, with GPT-5.1 achieving a test-set CCC of 0.71 and MAE of 3.65, outperforming baseline architectural competitors.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinical researchers and engineers designing automated mental health screening tools, conversational AI psychological agents, and cost-effective clinical decision support systems.

## Limitations

The study relies on audio data from the E-DAIC dataset which exhibits varying speaker audio quality, potentially limiting generalizability across diverse acoustic environments.

## Related

- (link related pages by id as the wiki grows)
