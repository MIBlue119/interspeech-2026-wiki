---
id: lee26o_interspeech
category: audio-understanding
labels: [self-supervised]
institutions: ["Sogang University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1684
pdf: https://www.isca-archive.org/interspeech_2026/lee26o_interspeech.pdf
---

# A Sensitivity Analysis of Multi-Event Audio Grounding in Audio LLMs

*Taehan Lee, Jaehan Jung, Hyukjun Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1684)

**Category:** `audio-understanding` · **Labels:** `self-supervised`

**TL;DR** — A large-scale sensitivity analysis reveals that as acoustic scene complexity increases, state-of-the-art audio LLMs suffer from a significant drop in true-positive rate (~29 percentage points) and a rise in false-positive rate (~8 percentage points).

## Key contributions

- Extracted and normalized ~145K structured (source, attribute) events from 71K AudioCapsV2 clips to construct a multi-event evaluation set spanning 578 unique event types.
- Generated ~356K absent-event queries using ReCLAP embeddings with similarity-filtered negative sampling to evaluate model hallucinations independently of lexical or semantic overlap.
- Quantitatively characterized detection performance across 12 prompt variants, demonstrating a rigid trade-off between recall (true positives) and hallucinations (false positives).
- Analyzed token-level output probabilities, revealing that auditory scene complexity increases model uncertainty on correct responses.

## Problem

Prior audio LLM evaluations typically focus on single-event audio or small-scale human-annotated datasets under 400 samples, leaving multi-event robustness underexplored. Existing adversarial query construction methods often introduce ontology-inconsistent labels that penalize evidence-consistent answers or fail to isolate how auditory scene complexity impacts grounding and false alarms. This leaves a major gap in understanding whether models can reliably distinguish what is present from what is absent in real-world, complex acoustic environments.

## Method

The authors construct a multi-event evaluation pipeline using AudioCapsV2 (71K clips). Captions are parsed into (source, attribute) pairs via Qwen3-Next-80B-A3B-Instruct-FP8, then cleaned through an automated extraction and strict human-curated normalization protocol (ontology, number, format, and canonical normalization), retaining events with over 20 occurrences. This yields 578 unique events (129 sources, 201 attributes) across clips containing 1 to 5 events. To test hallucination robustness, absent-event queries are sampled using ReCLAP—an audio-text contrastive model chosen because it aligns acoustic similarity better than general text models like T5 or Qwen3. Negative events are filtered using a cosine similarity threshold (setting alpha=0.3 to remove excessively close distractors) and randomly sampled (m=5), generating 356K absent-event queries.

Four SOTA audio LLMs (Qwen3-Omni-30B-A3B, Qwen2.5-Omni-7B, Qwen2.5-Omni-3B, and Audio-Flamingo 3-7B) are evaluated using vLLM with greedy decoding on an RTX PRO 6000 GPU. The evaluation tests 12 prompt variants combining 4 question templates (inquiring about the existence of event x) and 3 response instructions (requiring strict 'yes' or 'no' one-word outputs). Output token probabilities are extracted to analyze confidence distributions and response bias across varying event counts.

## Experimental setup

Evaluated on 71K clips from AudioCapsV2 comprising ~578 unique events, totaling over 500K yes/no queries per model across 12 prompt variants. Benchmarked four open-source audio-capable LLMs: Qwen3-Omni-30B-A3B, Qwen2.5-Omni-7B, Qwen2.5-Omni-3B, and Audio-Flamingo 3-7B. Metrics include True Positive Rate (TPR) for present-event detection, False Positive Rate (FPR) for absent-event detection, conditional FPR (cFPR), Kendall's tau for prompt bias, and normalized output token probabilities.

## Results

Across all four evaluated models, increasing the audio event count from 1 to 5 consistently degraded performance, dropping the average True Positive Rate by roughly 29 percentage points and raising the False Positive Rate by roughly 8 percentage points. Prompt sensitivity analysis revealed a strong negative correlation (Pearson r between -0.73 and -0.95) across prompts, confirming that phrasing designed to boost recall (Yes-bias) inherently drives up false alarms. Conditional FPR (cFPR) remained virtually identical to overall FPR (at most 0.3 percentage points lower), proving that false alarms occur independently of whether the model successfully recognizes present events. Model confidence analysis showed that correct predictions exhibit long-tailed high confidence that degrades with complexity, whereas incorrect predictions remain flat and uncertain.

| System / Model | 1-Event TPR / FPR | 5-Event TPR / FPR | Overall TPR (Avg) | Overall FPR (Avg) |
|---|---|---|---|---|
| Qwen3-Omni-30B-A3B | ~0.95 / ~0.04 | ~0.66 / ~0.12 | 0.88 | 0.07 |
| Qwen2.5-Omni-7B | ~0.94 / ~0.03 | ~0.65 / ~0.09 | 0.87 | 0.05 |
| Qwen2.5-Omni-3B | ~0.93 / ~0.04 | ~0.61 / ~0.10 | 0.85 | 0.06 |
| Audio-Flamingo 3-7B | ~0.96 / ~0.05 | ~0.59 / ~0.16 | 0.87 | 0.10 |

## Limitations

The analysis is scoped to clips containing at most 5 events drawn exclusively from AudioCapsV2, potentially missing extreme acoustic overlaps found in dense urban or multichannel soundscapes. The query generation relies heavily on ReCLAP embeddings and predefined text templates, which may not capture pragmatic or context-dependent sound interactions. Furthermore, the evaluation is restricted to English-language captions and binary yes/no query formulations.

## Why read this

Speech and ML researchers building audio LLMs or evaluation benchmarks should read this to understand how acoustic scene complexity systematically triggers hallucinations and biases. It provides a rigorous methodology using contrastive text embeddings to decouple semantic similarity from acoustic absence during evaluation.

## Code

- https://github.com/alm-evaluation/multi-event

## Applications

Improving the hallucination robustness, reliability, and acoustic grounding of audio-language models deployed in complex real-world listening environments.

## Institutions / 機構

Sogang University

## Related

- (link related pages by id as the wiki grows)
