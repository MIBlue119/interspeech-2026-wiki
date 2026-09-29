---
id: okocha26_interspeech
category: speech-llm-dialogue
labels: [self-supervised]
institutions: ["University of Florida"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2909
pdf: https://www.isca-archive.org/interspeech_2026/okocha26_interspeech.pdf
---

# Reasoning Beyond Transcription: Audio Language Models on Child Stuttering Speech

*Chibuzor Okocha, Christan Grant, Zoey Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/okocha26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/okocha26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2909)

**Category:** `speech-llm-dialogue` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates how state-of-the-art Audio-Language Models (ALMs) perform semantic reasoning and summarization on disfluent child speech within mixed-speaker interviews without explicit source separation. Results show that while models like Audio Flamingo 3 and Kimi-Audio extract high-level meaning, most ALMs suffer from a severe entailment prediction bias and degrade under dense disfluency and speaker interference.

## Key contributions

- Formalized the problem of child-focused semantic reasoning over raw audio in mixed-speaker, disfluent settings, separating intent-driven reasoning from classical source separation.
- Proposed a novel child speech entailment task with manually verified hypotheses across three difficulty levels (Easy, Medium, Hard) validated by expert clinical linguists (Cohen's Kappa = 0.93).
- Evaluated a suite of prominent 7B-parameter ALMs (Audio Flamingo 2/3, Kimi-Audio, Qwen2.5-Omni, Qwen2-Audio, SALMONN, GAMA, LTU) against strong ASR+LLM cascaded baselines.
- Conducted detailed error analyses showing how disfluency density types (repetitions, blocks, prolongations, filled pauses) impact model faithfulness and entailment calibration.

## Problem

Current speech and language processing systems are predominantly optimized for fluent adult speech, treating natural childhood disfluencies like repetitions and prolongations as noise to be excised. This creates a transcription bottleneck where clinically and educationally vital child-specific cues are lost. Furthermore, semi-structured interviews interleave adult prompts with child speech, presenting a severe acoustic and semantic challenge. While Audio-Language Models bypass explicit transcription, their capabilities in reasoning about irregular child acoustic patterns and avoiding adult-speech leakage remain unestablished.

## Method

The authors define two core tasks: child-only semantic summarization (generating concise summaries from audio x given prompt p focusing exclusively on the child) and child speech entailment (determining ENTAILMENT, NEUTRAL, or CONTRADICTION between audio x and textual hypothesis h). They evaluate zero-shot 7B-parameter ALMs utilizing diverse audio encoders (Whisper variants, hertz-level tokenizers, Q-Former aggregators) paired with autoregressive LLM backbones. To isolate whether errors stem from acoustics or reasoning, they establish a transcriptoracle baseline using Whisper Large-v3 or Granite 3.3.2 for transcription followed by text LLMs like Llama 3.2, Mistral 7B, and Qwen 2.5.

The experimental corpus comprises the Voices of Children Who Stutter dataset, providing 44 total recordings (22 single-speaker reading, 22 mixed-speaker interviews) spanning 5 to 10 minutes each. Hypotheses for entailment were generated via LLaMA 3.2 8B and rigorously vetted by three clinical linguistics experts across 186 instances. Prompt engineering variants (few-shot, reasoning-focused v3, and simple v4) were tested to analyze sensitivity to instruction tuning.

## Experimental setup

Evaluated on the Voices of Children Who Stutter dataset (44 total recordings from 22 children, split into single-speaker reading and mixed-speaker interviews). Metrics include LLM-judge scores (Fluency, Coherence, Faithfulness, Relevance, Purity on a 5-point scale), BERTScore F1 for summarization, and macro-averaged Accuracy and F1 (alongside class-specific E-ACC, N-ACC, C-ACC) for speech entailment. Baseline setups contrast zero-shot ALMs against cascades of ASR (Whisper Large-v3, Granite 3.3.2) + Text LLMs (Llama 3.2, Mistral 7B, Qwen 2.5).

## Results

Audio Flamingo 3 and Kimi-Audio lead summarization tasks, achieving overall LLM-judge scores above 3.0 and top BERTScore F1 up to 0.478, whereas SALMONN, GAMA, and Qwen 2 Audio lag below 2.6 overall score. For entailment, Qwen2.5-Omni attains the highest overall accuracy (0.681) and F1 (0.683), while Kimi-Audio excels at contradiction detection (C-ACC = 0.811). However, most ALMs exhibit a severe class bias, predicting entailment 87-92% of the time and failing on contradiction detection (C-ACC < 0.12). ASR+LLM cascades using Whisper paired with Qwen 2.5 substantially outperform end-to-end ALMs, reaching 0.739 accuracy and demonstrating that text-based LLMs handle logical reasoning far better when provided clean transcriptions.

| System / Condition | Accuracy | Macro F1 | Entailment ACC | Contradiction ACC |
|---|---|---|---|---|
| Qwen2.5-Omni (End-to-End) | 0.681 | 0.683 | 0.812 | 0.550 |
| Kimi-Audio (End-to-End) | 0.647 | 0.582 | 0.754 | 0.811 |
| Audio Flamingo 3 (End-to-End) | 0.386 | 0.284 | 0.971 | 0.119 |
| Whisper + Qwen 2.5 (Cascade) | 0.739 | 0.737 | 0.870 | 0.812 |
| Granite + Qwen 2.5 (Cascade) | 0.715 | 0.715 | 0.710 | 0.812 |
| Whisper + Llama 3.2 (Cascade) | 0.560 | 0.537 | 0.913 | 0.580 |

## Limitations

The evaluation relies on a relatively small specialized corpus (44 recordings from 22 children who stutter), restricting demographic and dialectal generalizability. End-to-end ALMs exhibit heavy model-wise bias toward the entailment class and struggle with out-of-domain disfluency densities. Furthermore, the work does not explore fine-tuning or adaptation strategies, evaluating models exclusively in zero-shot settings.

## Why read this

Researchers and engineers building speech-language models or clinical speech analysis tools should read this to understand the severe limitations of current zero-shot ALMs when dealing with disfluent, multi-speaker child audio. It highlights that while end-to-end audio reasoning is an appealing paradigm, traditional ASR-to-text cascades currently retain a massive performance advantage due to foundational acoustic bottlenecks in ALMs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated clinical screening tools for speech-language pathologists, educational monitoring systems for children who stutter, and instruction-guided audio analytics for multi-speaker child-adult interactions.

## Institutions / 機構

University of Florida

## Related

- (link related pages by id as the wiki grows)
