---
id: fukuda26b_interspeech
category: dialogue-management
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2923
pdf: https://www.isca-archive.org/interspeech_2026/fukuda26b_interspeech.pdf
---

# Evaluating Large Language Models Abilities for Addressee, Turn-change, and Next Speaker Prediction in Meetings

[PDF](https://www.isca-archive.org/interspeech_2026/fukuda26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fukuda26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2923)

**TL;DR** — This paper evaluates large language models, multimodal LLMs, and human subjects on turn-taking prediction tasks in multi-party meetings, finding that text-based LLMs outperform humans and supervised baselines in next speaker prediction.

## Problem

Multi-party conversations involve complex turn-taking dynamics with multiple potential addressees and next speaker candidates, presenting challenges that differ significantly from dyadic interactions. Existing work lacks a unified evaluation framework comparing supervised models, text-based LLMs, multimodal LLMs (MM-LLMs), and human performance under real-time conversational constraints. Understanding these gaps is crucial for building responsive conversational agents that avoid awkward pauses or interruptions.

## Method

The study establishes a unified online evaluation framework using the AMI corpus (four-speaker design meetings comprising 10,451 utterances across sessions) for three utterance-level tasks: addressee detection, turn-change prediction, and next speaker prediction. Models are restricted to past and current conversation context to simulate online meeting participation. The authors compare four conventional supervised baselines, three variants of text-based Qwen3 LLMs, and MM-LLMs including Qwen-Omni models and Gemini 2.5 Pro, alongside a human evaluation subset involving non-native speakers.

## Results

On next speaker prediction (evaluated across four candidates), text-based LLMs achieved superior performance, outperforming both supervised models and human evaluators (who secured roughly 60% F1). For addressee detection and turn-change prediction, Gemini 2.5 Pro outperformed text-based LLMs but still lagged behind human capabilities, indicating current MM-LLMs struggle to effectively exploit raw audio-visual signals. Ablation analyses proved conversational context is vital for next speaker prediction. Furthermore, segments with frequent speaker changes and balanced participation proved equally difficult for both humans and LLMs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building conversational agents, virtual meeting assistants, and social robots operating in multi-party environments can use these evaluation insights to improve turn-taking management.

## Limitations

Human evaluations were conducted by non-native speakers, which may underestimate native human performance levels.

## Related

- (link related pages by id as the wiki grows)
