---
id: jia26b_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3176
pdf: https://www.isca-archive.org/interspeech_2026/jia26b_interspeech.pdf
---

# Interpretable Audio Editing Evaluation via Chain-of-Thought Difference-Commonality Reasoning with Multimodal LLMs

[PDF](https://www.isca-archive.org/interspeech_2026/jia26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jia26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3176)

**TL;DR** — The paper introduces a natural language-based automated evaluation framework built on Qwen2-Audio for audio editing systems, achieving strong alignment with human expert judgments through difference-commonality reasoning and Chain-of-Thought prompting.

## Problem

Evaluating generative audio editing is challenging because it requires joint perception of paired audio samples alongside textual instructions without ground-truth references, while conventional objective metrics or simple 1-5 scale MOS prediction models fail to provide comprehensive, interpretable feedback on editing effectiveness, acoustic preservation, and overall quality. This makes scalable model selection and reinforcement learning optimization for audio editing difficult.

## Method

The framework builds on Qwen2-Audio-7B-Instruct using LoRA (rank=8, alpha=32) across four RTX 4090 GPUs. It introduces two caption-based fine-tuning tasks—Audio Difference Captioning and Audio Commonality Captioning—trained on 30,000 pseudo-paired audio editing samples. A 7-step Chain-of-Thought (CoT) prompting strategy is designed, incorporating an attention-leakage mitigation process (randomly shuffling ground-truth captions in batches during training) and reference-repetition steps. Additionally, 40 curated samples are used for lightweight instruction tuning to enhance step-by-step reasoning, and two composite metrics (Edit score and Faith score) are derived via sigmoid-transformed combinations of captioning metrics weighted by linear correlation coefficients.

## Results

Evaluated on the AuditScore dataset (covering 23 audio editing systems and 6,300 annotated instances), the proposed Edit score achieves a Linear Correlation Coefficient (LCC) of 0.7652 and Spearman's Rho of 0.7312 for editing effectiveness, outperforming the specialized supervised baseline AuditEval-ssl (0.6196 LCC). For multi-audio captioning fine-tuning, the FENSE score improved from near-zero baseline capability to 0.83 for difference captioning and 0.69 for commonality captioning. Faith score reaches a correlation of 0.5908 with human-rated faithfulness. Ablation studies confirm that removing multi-audio fine-tuning, attention-leakage mitigation, or ground-truth repetition substantially degrades the evaluation performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing generative audio editing models can use this framework for automated benchmarking, model selection, and reinforcement learning-based optimization.

## Limitations

The Faith score is less effective at capturing low-level acoustic consistency (such as subtle variations in prosody, volume, and noise) compared to high-level semantic consistency, representing a current boundary in multimodal LLM perception.

## Related

- (link related pages by id as the wiki grows)
