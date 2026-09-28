---
id: koh26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1417
pdf: https://www.isca-archive.org/interspeech_2026/koh26_interspeech.pdf
---

# A Multi-Agent Framework to Automate Feedback Generation for IELTS Speaking Test using Multimodal SpeechLMs

[PDF](https://www.isca-archive.org/interspeech_2026/koh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/koh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1417)

**TL;DR** — This paper proposes a multi-agent framework utilizing multimodal SpeechLMs to automate IELTS speaking test scoring and feedback generation directly from audio, achieving higher correlation with human examiners than traditional regression baselines.

## Problem

Automated speaking assessment models typically rely on regression over handcrafted features or use ASR pipelines that transcribe speech to text before evaluation by LLMs. This text conversion creates an informational bottleneck that discards vital acoustic, prosodic, and temporal nuances, while single-agent LLMs struggle with score centralisation and rubric entanglement across multiple evaluation criteria.

## Method

The system employs Qwen-Omni SpeechLMs in a collaborative multi-agent architecture where four role-based agents independently assess the four official IELTS criteria: Fluency and Coherence, Pronunciation, Lexical Resource, and Grammatical Range and Accuracy. A meta-reviewer agent synthesizes these criterion-specific scores and feedback texts by cross-checking against the original audio to resolve conflicts. The framework is tested across model scales (3B, 7B, 30B parameter variants) in both zero-shot and few-shot conditions using nine human-annotated exemplar dialogues per agent.

## Results

Evaluated on a newly curated 22.63-hour benchmark dataset of 270 IELTS mock test recordings with human-examiner ground-truth scores, the multi-agent framework consistently outperforms multiple linear regression and single-agent setups across Pearson's r, Spearman's rho, and Kendall's tau metrics. For instance, the 3B multi-agent model achieves nearly four times the correlation of the regression baseline. Furthermore, few-shot prompting paired with the multi-agent design yields the highest semantic similarity to expert human feedback.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Educational technology platforms and language testing organizations seeking automated, rubric-aligned diagnostic scoring and actionable feedback for high-stakes speaking examinations like IELTS.

## Related

- (link related pages by id as the wiki grows)
