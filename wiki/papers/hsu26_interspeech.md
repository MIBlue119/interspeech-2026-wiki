---
id: hsu26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-640
pdf: https://www.isca-archive.org/interspeech_2026/hsu26_interspeech.pdf
---

# Entity Binding Failures in Speech LLM Reasoning: Diagnosis and Chain-of-Thought Intervention

[PDF](https://www.isca-archive.org/interspeech_2026/hsu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hsu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-640)

**TL;DR** — The speech-to-text modality gap in speech large language models is not a uniform cognitive deficit but an entity binding failure caused by encoder downsampling, which can be mitigated via a targeted chain-of-thought intervention yielding up to a 24.4 percentage-point improvement.

## Problem

Speech large language models consistently underperform their text counterparts on complex reasoning tasks, but prior work has treated this as a generalized information dilution or modality divergence. The authors show this deficit is unevenly distributed and heavily concentrated in logical reasoning tasks that require entity tracking. They diagnose that temporal pooling and downsampling in speech encoders blur fine-grained acoustic details and discrete token boundaries, causing the model to lose track of precise entity-property associations during implicit reasoning.

## Method

The authors propose Entity-Aware Chain-of-Thought (EA-CoT), a lightweight inference-time intervention that forces the model to explicitly enumerate entities, record claim associations, execute step-by-step reasoning, and extract the answer within an expanded 1,024-token budget. It is evaluated across two open speech LLMs with distinct architectures: Qwen2.5-Omni-7B (which features a dedicated internal reasoning module) and Phi-4-Multimodal (which generates responses directly). To isolate the structural mechanism from token budget effects and general prompt benefits, they use token budget control experiments comparing 256 and 1,024 token limits, isomorphic structured control prompts for non-entity tasks, and ablation studies dissecting format enforcement, step-by-step reasoning, and entity enumeration components.

## Results

Evaluated on four categories from the VoiceBench BIG-bench Hard split totaling 1,000 items, baseline speech accuracy on web of lies plummeted to near-chance levels while text accuracy reached up to 90.4%. With EA-CoT, speech accuracy on web of lies recovered substantially, yielding up to a +24.4 percentage-point gain for Phi-4-Multimodal and +13.2 percentage points for Qwen2.5-Omni-7B. Ablation tests reveal that entity enumeration alone accounts for the majority of the performance recovery (+10.4 pp), while token budget control confirms the gains stem from the structured instruction rather than extra generation capacity. Furthermore, testing phonetically corrupted text names shows that name misrecognition accounts for only a minor fraction of the degradation, confirming the bottleneck is structural semantic binding rather than acoustic perception.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers developing end-to-end speech large language models and conversational voice assistants can use these insights and inference-time prompting strategies to improve complex multi-step reasoning capabilities.

## Limitations

The proposed EA-CoT intervention requires an expanded token generation budget and is specifically targeted at tasks requiring entity-property bookkeeping rather than acoustic-heavy reasoning benchmarks like MMSU.

## Related

- (link related pages by id as the wiki grows)
