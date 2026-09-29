---
id: ogunremi26_interspeech
category: speech-llm-dialogue
labels: [multilingual, self-supervised, dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2584
pdf: https://www.isca-archive.org/interspeech_2026/ogunremi26_interspeech.pdf
---

# Turning Speech Language Models into Multilingual Listeners

*Tolúlọpẹ́ Ògúnrẹ̀mí, Dan Jurafsky, Christopher D. Manning, Ahnmet Üstün, Martijn Bartelds*

[PDF](https://www.isca-archive.org/interspeech_2026/ogunremi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ogunremi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2584)

**Category:** `speech-llm-dialogue` · **Labels:** `multilingual`, `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — MULTISPEECHQA is a 9,200-hour, synthetically generated and human-verified multilingual spoken question-answering dataset covering 23 languages, which enables open-weight speech language models like Qwen2.5-Omni to achieve state-of-the-art multilingual performance after LoRA fine-tuning.

## Key contributions

- Released MULTISPEECHQA, a large-scale dataset comprising 10.8 million instructions and 9,200 hours of spoken QA pairs across 23 typologically diverse languages.
- Introduced MULTISPEECH-BENCH, a multi-task evaluation benchmark spanning Spoken Question Answering (SQA), Automatic Speech Recognition (ASR), and Automatic Speech Translation (AST) across 23 languages with human-verified translations.
- Demonstrated that parameter-efficient LoRA fine-tuning of Qwen2.5-Omni on MULTISPEECHQA achieves a 60.6% win rate on average against the base model, yielding the best open-weight SQA performance.
- Conducted controlled experiments showing that scaling training mixtures from 10 to 23 languages improves overall performance without capacity dilution.

## Problem

State-of-the-art Speech Language Models (SLMs) largely restrict their open-weight support to English and a handful of high-resource languages due to a critical scarcity of multilingual speech instruction-tuning data. Existing evaluation benchmarks for SLMs also lack linguistic coverage, limiting open-ended generative instruction following to English. This language gap creates digital exclusion for speakers of the vast majority of the world's languages who could otherwise benefit from natural spoken language interactions.

## Method

The authors construct MULTISPEECHQA by taking 470k instruction-completion pairs from the English Voice Assistant 400K (VA 400K) dataset and translating them into 22 additional target languages using Seamless M4T v2 Large, paired with the Aya Expanse 8B language model text backbone. For speech synthesis, they employ XTTS for 15 languages, and fallback to Seamless M4T or language-specific MMS TTS models for the remaining 7 lower-resource languages (such as Farsi and Greek). To guarantee speaker diversity, they apply XTTS voice-cloning capabilities across 37 perceived male and female LibriVox speaker clips. 

For downstream evaluation and adaptation, the authors utilize the SALMONN architecture for from-scratch ablation models and LoRA parameter-efficient fine-tuning (rank 32 across all linear modules in every transformer layer) on Qwen2.5-Omni. The training recipe for the SALMONN-based from-scratch models is split into two stages: Stage 1 uses a uniform 20 hours of CommonVoice (and supplementary low-resource) ASR data per language with a window-level Q-Former and mBERT text encoder to align speech-text representations using a learning rate of 1e-5; Stage 2 trains on 2.07 million balanced samples from MULTISPEECHQA for general instruction-following. Inference is performed end-to-end directly from spoken question inputs without auxiliary text prompts.

## Experimental setup

Evaluated across 23 languages using MULTISPEECH-BENCH, featuring 200 human-verified SQA pairs per language, alongside CommonVoice for ASR and CoVoST-2 for AST. Baselines include a cascaded system (Whisper Large v3 + Aya Expanse 8B), open-weight models (Qwen2-Audio, Phi-4-Multimodal, Qwen2.5-Omni), and commercial models (GPT-Audio, Gemini 2.5 series). LLM-as-a-judge (Command-A and GPT-4o) evaluates pairwise SQA preferences, while ASR uses WER/CER and AST uses BLEU/chrF.

## Results

The cascading Whisper + Aya baseline outperforms baseline open-weight SLMs (such as Qwen2-Audio and Phi-4-Multimodal) due to the lack of multilingual instruction tuning in those models. However, fine-tuning Qwen2.5-Omni on MULTISPEECHQA elevates it to achieve a 60.6% win rate against the un-finetuned Qwen2.5-Omni across 23 languages. On ASR, Qwen2.5-Omni achieves an average WER of 49.7% (stable at 50.4% post-finetuning), and on AST achieves an average BLEU of 22.7. In scaling ablations, models trained on 23 languages outperform those restricted to 10 languages, indicating no capacity dilution, whereas adding 20% CoVoST-2 AST data does not yield consistent performance gains.

| System / Condition | ASR WER % ↓ | AST BLEU ↑ | AST chrF ↑ |
|---|---|---|---|
| Cascading Baseline (Whisper + Aya) | 17.8 | 21.0 | 37.8 |
| Qwen2-Audio | 82.8 | 8.3 | 32.9 |
| Phi-4-Multimodal | 98.7 | 5.8 | 25.7 |
| Qwen2.5-Omni (Base) | 49.7 | 22.7 | 46.6 |
| Qwen2.5-Omni (Fine-tuned) | 50.4 | 21.0 | 45.2 |

## Limitations

The synthetic pipeline relies heavily on machine translation and text-to-speech models, which introduces occasional translation errors, unnatural phrasing, and lower acoustic quality in lower-resource languages (e.g., Farsi and Hebrew). The human evaluation phase noted that naturalness scores lag significantly behind content understanding scores, constrained by the limits of current TTS technology. Furthermore, the human-LLM judge alignment exhibits low Cohen's kappa values in certain languages due to quality imbalances between competing systems.

## Why read this

Speech and ML researchers building multilingual conversational agents should read this paper to learn how large-scale synthetic pipelines can cheaply bootstrap cross-lingual speech instruction-tuning data. It provides a blueprint for adapting existing SLMs to dozens of low-resource languages without manual speech data collection.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multilingual voice assistants, cross-lingual spoken question-answering systems, and open-ended voice-based conversational agents for low-resource languages.

## Institutions / 機構

Stanford University, Cohere Labs, Cohere

**Funding / 經費:** Stanford Interdisciplinary Graduate Fellowship, Google

## Related

- (link related pages by id as the wiki grows)
