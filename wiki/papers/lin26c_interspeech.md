---
id: lin26c_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1025
pdf: https://www.isca-archive.org/interspeech_2026/lin26c_interspeech.pdf
---

# Hearing the Order: Investigating Position Bias in Large Audio-Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/lin26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1025)

**TL;DR** — This paper investigates position bias in large audio-language models (LALMs) on multiple-choice questions, showing that shuffling answer options causes accuracy fluctuations of up to 24% and permutation-based mitigation can stabilize evaluations.

## Problem

Large audio-language models are increasingly evaluated using multiple-choice question benchmarks, but it remains unknown whether their predictions are swayed by the presentation order of answer options rather than true semantic comprehension. This position bias undermines the reliability and validity of current evaluation practices across both text and spoken modalities. The work addresses this gap by conducting the first systematic analysis of positional effects in LALMs.

## Method

The authors evaluate six state-of-the-art LALMs (Gemini-2.0-Flash, Phi-4-Multimodal, Qwen2.5-Omni variants 3B/7B, and Voxtral variants 3B/24B) across three established benchmarks (MMAU test-mini, MMAR, MMLU) and their spoken counterparts created via GPT-4o mini TTS. They systematically reassign correct answers across positions A, D while randomizing other options, and test cyclic and full-permutation mitigation strategies. Evaluation metrics include accuracy, delta accuracy, Relative Standard Deviation (RSD), and Choice Kullback-Leibler Divergence (CKLD).

## Results

Experiments demonstrate that every tested LALM exhibits pervasive position bias, with accuracy fluctuations reaching up to 24% for Phi-4-Multimodal depending on the correct option's location. Standard option identifiers (A, B, C, D) improve base accuracy but fail to mitigate position bias. Full-permutation and cyclic mitigation strategies successfully reduce variance (RSD and CKLD) and enhance evaluation robustness across both text and speech datasets. Comparisons with base text-only LLMs show that position bias is sometimes inherited directly from text models, but can also diverge significantly following audio-language instruction tuning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing or evaluating large audio-language models can use these findings and permutation-based mitigation strategies to obtain more reliable, unbiased benchmark scores.

## Limitations

Permutation-based strategies introduce additional test-time computational overhead.

## Related

- (link related pages by id as the wiki grows)
