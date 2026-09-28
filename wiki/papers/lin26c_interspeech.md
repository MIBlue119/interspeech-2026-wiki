---
id: lin26c_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1025
---

# Hearing the Order: Investigating Position Bias in Large Audio-Language Models

**TL;DR** — The first systematic study of position bias in large audio-language models shows that simply reordering multiple-choice answers can swing accuracy by up to 24% and flip model rankings, but permutation-based strategies largely fix the problem.

## Problem

Large audio-language models are often used for tasks requiring reasoning over ordered answer options, but it is unclear whether their predictions are unduly influenced by option order, which would signal an unreliable form of position bias.

## Method

The authors run extensive experiments across six LALMs and three widely used benchmarks and their spoken counterparts, shuffling the order of answer choices to measure the resulting effect on model predictions, and then evaluate permutation-based strategies designed to mitigate any bias found.

## Results

No tested model is immune to position bias: shuffling answer-option order can cause performance fluctuations of up to 24% and even reorder model rankings, but permutation-based mitigation strategies reduce the bias in most cases.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More reliable evaluation practices and mitigation strategies for multiple-choice benchmarking of large audio-language models.

## Related

- (link related pages by id as the wiki grows)
