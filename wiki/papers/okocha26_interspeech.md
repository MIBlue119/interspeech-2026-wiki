---
id: okocha26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2909
pdf: https://www.isca-archive.org/interspeech_2026/okocha26_interspeech.pdf
---

# Reasoning Beyond Transcription: Audio Language Models on Child Stuttering Speech

[PDF](https://www.isca-archive.org/interspeech_2026/okocha26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/okocha26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2909)

**TL;DR** — This paper evaluates audio-language models on child-focused semantic reasoning and disfluency preservation using child stuttering speech corpora, finding that while models extract high-level meaning, their reasoning degrades under heavy disfluency and speaker interference.

## Problem

Automatic speech understanding systems are typically optimized for fluent adult speech and treat speech disfluencies as noise to be excised. For children who stutter, this leads to a transcription bottleneck where clinically meaningful disfluencies and acoustic properties are discarded. Furthermore, multi-speaker settings introduce adult-speech interference that breaks conventional signal-level diarization and separation pipelines.

## Method

The study benchmarks popular 7B-scale Audio-Language Models (including Audio Flamingo 2/3, Kimi-Audio, Qwen2.5-Omni, Qwen2-Audio, SALMONN, GAMA, and LTU) in zero-shot settings across two main tasks: child-only semantic summarization and child speech entailment. The entailment probe uses 186 expert-verified hypotheses manually stratified across three difficulty levels (easy, medium, hard) with high inter-annotator agreement (Cohen's Kappa 0.93). To isolate acoustic versus semantic failures, models are compared against cascaded baselines combining ASR (Whisper Large-v3 or Granite) with text LLMs (Llama 3.2, Mistral-7B, Qwen 2.5).

## Results

Evaluated on the Voices of Children Who Stutter corpus (44 recordings across single-speaker reading and mixed-speaker interviews), Audio Flamingo 3 and Kimi-Audio achieved the highest LLM-judge scores for interview summaries above 3.0 overall, with Audio Flamingo 3 reaching top fluency (4.28) and purity (4.73). For semantic fidelity, Kimi-Audio attained the highest interview BERTScore F1 of 0.478, closely followed by Audio Flamingo 3 at 0.433. In the child speech entailment task, Qwen2.5-Omni achieved the best overall accuracy of 0.681 and macro F1 of 0.683, while Kimi-Audio led in contradiction accuracy at 0.811. Most ALMs exhibited a severe, persistent bias toward predicting the entailment class, showing near-zero contradiction accuracy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinicians, speech-language pathologists, and educational technology engineers designing assistive tools to automatically analyze, summarize, and monitor children's speech disfluencies.

## Limitations

Evaluated on a relatively small dataset of 44 total recordings from 22 children, and current audio-language models demonstrate a severe predictive bias toward entailment while struggling heavily with contradiction detection.

## Related

- (link related pages by id as the wiki grows)
