---
id: anand26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3015
pdf: https://www.isca-archive.org/interspeech_2026/anand26_interspeech.pdf
---

# ParA-LLM: A Unified Approach to Paralinguistic and Acoustic Speech Understanding

[PDF](https://www.isca-archive.org/interspeech_2026/anand26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/anand26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3015)

**TL;DR** — ParA-LLM is an audio language model trained via a two-stage curriculum on 1.2M QA pairs covering 22 paralinguistic and acoustic attributes, outperforming state-of-the-art models like GPT-4o-Audio by 7.5% on a new benchmark called ParA-Bench.

## Problem

State-of-the-art audio LLMs excel at processing the verbal and semantic content of speech (what was said) but largely fail to capture paralinguistic factors like acoustic conditions, speaker traits, and expressive variations (how it was said). Existing models achieve poor performance on paralinguistic benchmarks (e.g., frontier models score only 36% on ParA-Bench), and prior specialized systems typically handle isolated attributes rather than supporting joint, free-form reasoning over multiple interacting characteristics.

## Method

The authors define a structured taxonomy of 22 paralinguistic characteristics (10 acoustic, 7 speaker-intrinsic, and 5 utterance-level speech properties) and curate an acoustic simulation engine using RIRs and environmental noise to generate over 1.2M Audio-QA pairs. ParA-LLM is initialized from Qwen2-Audio-7B-Instruct and trained using a two-stage curriculum with LoRA: first on 688K atomic single-attribute questions (Stage 1), and then on 513K multi-attribute questions generated via Qwen2.5-7B in-context learning (Stage 2). They also release ParA-Bench, a 6,000-question multiple-choice benchmark evaluated via an LLM-as-judge pipeline.

## Results

Evaluated on ParA-Bench, ParA-LLM achieves an overall accuracy of 43.53% (surpassing GPT-4o-Audio at 36.03% and Qwen2-Audio at 28.05%), outperforming baselines by 7.5%. The two-stage curriculum also yields downstream gains of 1.13% on MMAU-Pro Speech and 7.49% on MMAR Speech compared to the base model. Ablations confirm that each curriculum stage incrementally improves performance across both paralinguistic and broader audio benchmarks.

## Code

- https://nishitanand.github.io/paralinguistic-understanding-llm

## Applications

Engineers and researchers building speech LLMs, expressive text-to-speech systems, rich data annotation pipelines, or agentic speech editing tools can use ParA-LLM for fine-grained acoustic and paralinguistic reasoning.

## Limitations

The paper does not explicitly state major model limitations, though the evaluation relies heavily on synthetic acoustic simulations and automated LLM-as-judge alignment.

## Related

- (link related pages by id as the wiki grows)
