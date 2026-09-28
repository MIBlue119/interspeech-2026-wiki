---
id: hao26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1659
pdf: https://www.isca-archive.org/interspeech_2026/hao26b_interspeech.pdf
---

# Can Large Language Models Reliably Correct Errors in Low-Resource ASR? A Contamination-Aware Case Study on West Frisian

[PDF](https://www.isca-archive.org/interspeech_2026/hao26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hao26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1659)

**TL;DR** — This paper investigates LLM-based generative error correction for low-resource West Frisian ASR while explicitly controlling for data contamination, achieving a best WER of 8.9% on Common Voice (surpassing the 5-best oracle) using GPT-5.1.

## Problem

While generative error correction (GER) with large language models has driven major ASR accuracy gains in high-resource languages like English, its effectiveness in truly low-resource settings remains underexplored. Furthermore, performance improvements reported in prior work could be confounded by data contamination, where LLMs have already seen evaluation texts during pretraining. This study investigates both challenges for West Frisian using a public corpus alongside a newly constructed, non-public offline speech dataset.

## Method

The ASR backbone uses XLS-R 1B fine-tuned on the Common Voice Frisian dataset using CTC for 2,000 steps. For error correction, the system feeds the 5-best hypotheses from beam search decoding (beam width = 50) into various LLMs under zero-shot and k-shot prompting (k=1, 3, 5, 10). Evaluated LLMs include closed-source models (GPT-4o-mini, GPT-5.1) and open-source models (Qwen3-8B in both base form and LoRA fine-tuned on XLS-R 5-best lists with rank r=16, alpha=32, and dropout 0.05 for 3 epochs). A custom Frisian offline dataset (811 utterances, 1.5 hours) was constructed using a storybook and original native-speaker sentences to eliminate data contamination.

## Results

On the Common Voice Frisian test set (baseline WER 13.5%, trigram 12.1%, 5-best oracle 9.6%), GPT-5.1 achieved a minimum WER of 8.9% under 3-shot generative prompting, outperforming the oracle, whereas a selection-based approach achieved 12.1% WER. On the contamination-free Frisian offline dataset (baseline WER 21.1%, trigram 19.2%, oracle 18.0%), GPT-5.1 similarly reduced WER to 13.8% under 3-shot generative prompting, confirming true generalization rather than memorization. Qwen3 and Qwen3-FT yielded only marginal improvements (13.4% WER on Common Voice, 20.9% on offline data), demonstrating that GER benefits do not transfer equally across all LLMs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building robust speech recognition pipelines for low-resource languages where acoustic models alone yield high error rates.

## Limitations

The study is restricted to West Frisian and evaluated primarily using specific model architectures (XLS-R as the ASR backbone, and Qwen3 and GPT variants as the corrector LLMs).

## Related

- (link related pages by id as the wiki grows)
