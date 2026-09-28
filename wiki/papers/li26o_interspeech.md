---
id: li26o_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-988
pdf: https://www.isca-archive.org/interspeech_2026/li26o_interspeech.pdf
---

# Audio-Cogito: Towards Deep Audio Reasoning in Large Audio Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/li26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-988)

**TL;DR** — Audio-Cogito is an open-source large audio reasoning model that achieves state-of-the-art performance among open systems on the MMAR benchmark by employing a novel data curation pipeline and a self-distillation training strategy.

## Problem

Current large audio language models struggle with logical inconsistencies and shallow reasoning when interpreting complex acoustic environments, primarily due to a scarcity of high-quality audio reasoning datasets. While datasets with complex reasoning traces do exist, their reliance on closed-source models creates high annotation costs, reproducibility roadblocks, and mismatched inference formats. Audio-Cogito addresses this gap by offering a fully open-source pipeline to elicit deep audio reasoning without proprietary APIs.

## Method

The system is built upon Qwen3-Omni-Thinking (30B parameters) and trained using the ms-swift framework via LoRA for one epoch with a maximum learning rate of 1e-5. It is trained on Cogito-Pipe, a four-stage automated data construction pipeline comprising Data Collection across sound, speech, and music domains; QA Construction using Qwen3-Omni-Instruct with few-shot seed exemplars and hard negative distractors; CoT Generation via self-distillation without ground-truth answers; and Quality Verification using a dual-stage consistency check and LLM-as-a-judge filter. This yields a large-scale dataset of 545k samples spanning 11 sub-datasets. The model is trained to jointly maximize the likelihood of a freeform Chain-of-Thought reasoning trace and a final response given an audio signal and query.

## Results

Evaluated on the MMAR benchmark and the Interspeech 2026 Audio Reasoning Challenge across single and mixed-domain conditions, Audio-Cogito achieves the best average accuracy among open-source models, outperforming Qwen3-Omni-Thinking and closing the gap with proprietary systems like Gemini 2.5 Pro. It also attains top-tier scores in reasoning quality metrics, specifically achieving superior Rubrics and Correct Reasoning Scores (CRS) among all evaluated large audio reasoning models. Ablation studies confirm that removing seed questions, quality verification, or meta information degrades overall model accuracy and increases hallucinations.

## Code

- https://github.com/llh666521/Audio-Cogito

## Applications

Speech and ML engineers building speech assistants, multimodal interaction systems, or audio-driven decision support tools requiring transparent, multi-step logical reasoning over complex acoustic environments.

## Related

- (link related pages by id as the wiki grows)
