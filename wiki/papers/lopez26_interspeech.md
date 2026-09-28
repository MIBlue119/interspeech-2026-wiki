---
id: lopez26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2503
pdf: https://www.isca-archive.org/interspeech_2026/lopez26_interspeech.pdf
---

# Robustness Assessment of Large Audio Language Models in Multiple-choice Evaluation

[PDF](https://www.isca-archive.org/interspeech_2026/lopez26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lopez26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2503)

**TL;DR** — This paper evaluates the robustness of large audio language models (LALMs) on multiple-choice benchmarks, revealing high sensitivity to choice ordering and phrasing, and introduces a mixed-perturbation protocol using correctness and consistency metrics.

## Problem

Current evaluations of large audio language models (LALMs) rely heavily on multiple-choice question answering (MCQA) benchmarks that report single accuracy numbers, ignoring potential vulnerabilities. Specifically, these frameworks are susceptible to language bias—where text-only models can guess correct answers without audio—and show high fragility to minor linguistic perturbations such as answer reordering and paraphrasing. Consequently, reported progress may reflect evaluation artifacts rather than true improvements in auditory reasoning capabilities.

## Method

The study conducts a systematic evaluation across three benchmarks (MMAU, MMAR, MMSU) and four LALMs (Audio Flamingo 2, Audio Flamingo 3, Qwen2.5-Omni-7B-Instruct, and Kimi-Audio-7B-Instruct). The authors apply controlled isolated and mixed variations to the text components: exploring all 24 choice permutations, and using Gemini-2.5-flash and Gemma-3-12B-it to generate 7 distinct phrasing versions for questions, ground-truth answers, and distractors. They establish text-only LLM controls (using Qwen2.5-7B, Llama-3.1-8B, and Gemma-3-27B without audio) to quantify language bias. Performance is assessed using mean accuracy, consistency rate (CR), and a stricter correctness rate (CoR) that demands correct responses across all perturbations.

## Results

Text-only LLMs exceed random chance across all benchmarks, with Gemma-3-27B-it achieving 48.3% accuracy on MMAU (22.6 points above chance) and outperforming several audio models. LALMs exhibit extreme sensitivity to textual framing, with distractor rephrasing alone producing an accuracy standard deviation of up to 13.7%. The proposed evaluation framework demonstrates that models often rely on surface-level textual cues rather than robust audio grounding.

## Code

- https://github.com/ferugit/mcqa-lalms-robustness

## Applications

Speech and machine learning engineers developing or benchmarking large audio language models can use this evaluation framework and code to measure true model robustness against prompt and choice perturbations.

## Limitations

The study focuses exclusively on linguistic sensitivity within MCQA-based multimodal evaluation, leaving signal-level acoustic perturbations as an orthogonal scope.

## Related

- (link related pages by id as the wiki grows)
