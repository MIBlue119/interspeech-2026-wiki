---
id: zhang26aa_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1734
pdf: https://www.isca-archive.org/interspeech_2026/zhang26aa_interspeech.pdf
---

# PART: Progressive Alignment Representation Training for Multilingual Speech-To-Text with LLMs

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26aa_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26aa_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1734)

**TL;DR** — The paper introduces Progressive Alignment Representation Training (PART), a multi-stage framework for multilingual speech-to-text models that preserves language-specific features and yields a relative word error rate reduction of 26.6% on FLEURS compared to traditional joint training.

## Problem

Simultaneously training speech large models on diverse multilingual tasks with frozen large language models often collapses audio representations into a shared space. This representation collapse degrades fine-grained language distinctions and limits task-specific performance in complex multilingual environments. Consequently, conventional methods achieve only coarse modality-level alignment and struggle with multi-task transfer across languages.

## Method

The framework utilizes a three-stage progressive training strategy leveraging an approximately 700M-parameter SenseVoice-large speech encoder, a lightweight adaptor (two transformer layers and one CNN layer), and Qwen2.5 LLMs in 1.5B and 7B scales. Stage 1 freezes the encoder and LLM while training only the adaptor on 810k hours of multilingual ASR data for coarse alignment. Stage 2 performs within-language alignment by progressively unfreezing the speech encoder (first the last eight layers, then the entire encoder) using ASR data. Stage 3 introduces 434k hours of cross-lingual speech translation (S2TT) data while jointly optimizing the encoder, adaptor, and LoRA-tuned LLM for robust instruction understanding and generation.

## Results

Evaluated on Common Voice 15, FLEURS, and CoVoST2 using 256 NVIDIA A800 GPUs. On FLEURS ASR, PART-2B/8B reduces average WER from 6.4 (baseline) to 4.7, outperforming Whisper-large-v3 (6.0). On Common Voice 15, average WER drops from 9.2 to 7.4. On CoVoST2 xx->en speech-to-text translation, PART improves over the same-size baseline by an average of 1.4 BLEU points across seven language pairs.

## Code

- https://github.com/ChenX17/PART

## Applications

Speech and machine learning engineers building multilingual speech recognition and speech-to-text translation systems powered by large language models.

## Related

- (link related pages by id as the wiki grows)
