---
id: higuchi26_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-592
pdf: https://www.isca-archive.org/interspeech_2026/higuchi26_interspeech.pdf
---

# Incremental End-to-End Spoken Dialogue State Tracking with a Multimodal LLM and Reinforcement Learning

[PDF](https://www.isca-archive.org/interspeech_2026/higuchi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/higuchi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-592)

**TL;DR** — This paper proposes an incremental end-to-end spoken dialogue state tracking framework using a multimodal LLM and reinforcement learning, achieving a Joint Goal Accuracy of 49.20% on SpokenWOZ.

## Problem

Cascaded ASR-DST pipelines suffer from error propagation where speech recognition mistakes corrupt downstream belief state updates. Meanwhile, existing end-to-end multimodal LLM approaches typically regenerate the full belief state at every turn, which inflates output length, risks hallucinating unchanged slot values, and degrades performance as dialogues grow longer.

## Method

The method uses Qwen2.5-Omni-7B as a base multimodal LLM adapted with QLoRA (rank 64, alpha 128, 4-bit NF4 quantization). Instead of full-state prediction, the model conditions on the text dialogue history, previous belief state, and current user audio to output transcripts and a constrained set of symbolic edit operations (set, update, delete). The training recipe consists of a supervised fine-tuning stage followed by Group Relative Policy Optimization (GRPO) with a group size of 16, directly optimizing a multi-component reward combining word error rate, operation F1, exact match bonuses, and format validity.

## Results

Evaluated on SpokenWOZ (1,000 test dialogues), the incremental method outperforms the full-state Qwen2.5-Omni-7B baseline by 3.16 JGA points (48.52% vs 45.36%). Adding GRPO further improves JGA to 49.20% and reduces Word Error Rate from 22.39% to 21.61%. An ablation study confirms that removing the WER reward component from GRPO degrades JGA to 48.34% and increases WER to 23.37%. Turn-level analysis demonstrates that the incremental approach consistently outperforms full-state generation across all dialogue lengths, especially in mid-range turns.

## Code

- https://github.com/UEC-InabaLab/IncrementalR

## Applications

Engineers and researchers building task-oriented spoken dialogue systems, voice assistants, and conversational agents.

## Limitations

There is a ~40 JGA point gap between oracle mode and predicted mode due to error propagation from imperfect previous belief states during inference, and GRPO training incurs substantial computational overhead from sampling multiple candidates per prompt.

## Related

- (link related pages by id as the wiki grows)
