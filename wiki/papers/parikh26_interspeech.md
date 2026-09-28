---
id: parikh26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2335
pdf: https://www.isca-archive.org/interspeech_2026/parikh26_interspeech.pdf
---

# A Finetuned SpeechLLM for Joint Multi-Granular L2 Assessment and Natural-Language Rationales

[PDF](https://www.isca-archive.org/interspeech_2026/parikh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/parikh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2335)

**TL;DR** — The paper introduces a rubric-guided end-to-end SpeechLLM that jointly predicts multi-granular L2 speech assessment scores and natural-language rationales, achieving strong sentence-level correlation (e.g., 0.73 PCC on fluency).

## Problem

Automated second language (L2) assessment systems typically output opaque numeric metrics or lack actionable pedagogical feedback, whereas existing generative speech LLMs suffer from a "niceness bias" and rarely handle multi-aspect, multi-granular assessment jointly. Furthermore, while these models can generate free-text rationales, it remains unclear whether these explanations are faithful to the underlying acoustic evidence or merely plausible surface text.

## Method

The authors build upon Qwen2-Audio-7B-Instruct, freezing the base weights under 4-bit quantization and applying Low-Rank Adaptation (LoRA) with rank r=64 and alpha=128 to approximately 1.6% of the parameters (~115M trainable). They propose a hybrid training objective combining supervised fine-tuning (SFT) and Bounded Direct Preference Optimization (BDPO) with beta=0.1 and margin bound delta=0.5 to mitigate severe class imbalance and near-miss preference degradation. The model takes speech audio, orthographic transcripts, target phonemes, and grading rubrics as inputs to jointly predict 5 dimensions—sentence accuracy, fluency, prosody, word-level accuracy, and phoneme-level accuracy—alongside a free-text rationale in a single response.

## Results

Evaluated on the SpeechOcean762 (SO762) dataset containing 2,500 training and 2,500 test utterances, the multi-granular model (BDPO-M) achieves Pearson Correlation Coefficients (PCC) of 0.66 for sentence accuracy, 0.73 for fluency, 0.71 for prosody, 0.52 for word accuracy, and 0.42 for phoneme accuracy. Compared to prior LLM-based SimPO approaches, BDPO-M outperforms them on sequence-level scoring (word and phoneme accuracy). Rationale analysis reveals high internal sentiment consistency at the sentence level (e.g., 0.87 PCC mention-based agreement with internal predictions), but faithfulness degrades sharply at fine-grained token levels.

## Code

- https://github.com/Aditya3107/speechllm-l2-assessment

## Applications

Computer-Assisted Language Learning (CALL) systems and autonomous educational platforms seeking to provide learners with automated, multi-granular oral proficiency scoring and interpretable natural-language feedback.

## Limitations

Token-level rationale faithfulness is weak, and fine-grained error localization often relies on orthographic heuristics rather than reliable acoustic grounding.

## Related

- (link related pages by id as the wiki grows)
