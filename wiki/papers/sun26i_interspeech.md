---
id: sun26i_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3099
pdf: https://www.isca-archive.org/interspeech_2026/sun26i_interspeech.pdf
---

# Moot-Court: Training-Free Dialectical Reasoning for Depression Detection

[PDF](https://www.isca-archive.org/interspeech_2026/sun26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3099)

**TL;DR** — Moot-Court is a training-free, multi-agent LLM reasoning framework for multimodal depression detection that achieves an F1-score of 0.8856 on DAIC-WOZ without gradient updates.

## Problem

Current automated depression detection methods rely on costly instruction or parameter fine-tuning of Large Language Models, making them highly prone to severe overfitting under low-resource clinical constraints and lacking interpretability. Furthermore, text-only LLMs discard critical non-verbal acoustic biomarkers that are essential for accurate clinical screening.

## Method

The framework first constructs a multimodal blueprint by combining transcripts, utterance-level acoustic markers from Librosa and Parselmouth, statistical trajectories, and subject-level descriptive portraits from Qwen-Audio. It then employs adversarial agents—a Prosecutor building a Pathogenic Graph and a Defense Attorney building a Contextual Graph—to perform dialectical reasoning over clinical symptom networks. An ensemble of judges evaluates the cases using a logical temperature gradient, while a Reflector updates a self-evolving experience library (Codex) using a reward-based feedback algorithm with frequency, utility, and authority metrics.

## Results

Evaluated on the DAIC-WOZ dataset using the official split (107 train, 35 val, 47 test), Moot-Court with DeepSeek V3.2 achieves an F1-score of 0.8856, Recall of 0.9394, and Precision of 0.8378, outperforming fully fine-tuned models like SSL-SDD (F1 0.8290) and LoRA-tuned GPT-2. Cross-model experiments show robust performance with Qwen3-80b (F1 0.8400) and Qwen3-30b (F1 0.8234). Ablating the Codex and dialectical modules shows that direct inference yields an F1 of 0.6296, while adding the dynamic Codex boosts recall from 0.6061 to 0.9394. Text-only input yields an F1 of 0.7890, which increases to 0.8856 when adding audio.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinical engineers and digital health practitioners building objective, interpretable, and scalable automatic screening tools for psychological distress and depression.

## Related

- (link related pages by id as the wiki grows)
