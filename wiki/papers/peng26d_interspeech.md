---
id: peng26d_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
institutions: ["Shanghai Jiao Tong University", "Central South University", "AISpeech Co., Ltd", "Shanghai Innovation Institute", "Harbin Institute of Technology", "Shanghai Aviation Electric Co., Ltd", "National University of Defense Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1055
pdf: https://www.isca-archive.org/interspeech_2026/peng26d_interspeech.pdf
---

# MAC-SLU: Multi-Intent Automotive Cabin Spoken Language Understanding Benchmark

*Yuezhang Peng, Chonghao Cai, Ziang Liu, Shuai Fan, Sheng Jiang, Hua Xu, Yuxin Liu, Sheng Wang, Qiguang Chen, Yao Li, Kele Xu, Kai Yu, Libo Qin, Xie Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/peng26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/peng26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1055)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — The paper introduces MAC-SLU, a Chinese multi-intent spoken language understanding benchmark for automotive cabins, and evaluates various large language and audio-language models using in-context learning, supervised fine-tuning, and end-to-end paradigms.

## Key contributions

- Introduces MAC-SLU, a Chinese multi-intent SLU dataset featuring 8 domains, 81 intents, 192 slots, and complex multi-intent queries up to 5 intents.
- Establishes a unified evaluation benchmark for SOTA open-source and closed-source LLMs and LALMs across direct inference, ICL, and SFT paradigms.
- Demonstrates that end-to-end LALMs match or exceed pipeline approaches by eliminating ASR error propagation.
- Identifies lexical variance penalties in exact-match evaluation metrics as a primary source of underestimation for model capabilities.

## Problem

Traditional SLU datasets like ATIS and SNIPS are constrained by limited intent and slot categories, resulting in saturation where models exceed 95% accuracy. Meanwhile, datasets like SLURP lack multi-intent queries, and prior research lacks a unified benchmark standardizing prompts, data formats, and training methodologies across modern LLMs and LALMs. This lack of rigorous, complex testbeds hinders the development of robust spoken semantic extraction systems for interactive environments like automotive cabins.

## Method

The MAC-SLU corpus contains 20,539 samples (17,997 train, 1,391 dev, 1,152 clean test) derived from real automotive text commands and synthesized into Mandarin speech via CosyVoice-2 using speaker embeddings from AIShell-1. The evaluation framework tests open-source LLMs (Qwen3 series from 1.7B to 32B), pipeline setups pairing Whisper or Paraformer ASR with Qwen3 NLU decoders, and E2E Large Audio Language Models (Qwen2-Audio-Instruct, Qwen2.5-Omni, Phi-4-multimodal, MiniCPM-o-2.6) alongside closed-source APIs (GPT-4o-Audio, Gemini-2.5-Flash).

Supervised fine-tuning (SFT) is performed using the Llama-Factory framework with the LoRA parameter-efficient technique (rank 16, alpha 32) on Nvidia 3090 GPUs. In-context learning (ICL) and zero-shot evaluations are conducted on Nvidia H20 GPUs with vLLM acceleration using structured system prompts that enforce strict matching against predefined domain-intent and slot lists to parse complex, multi-intent semantic frames.

## Experimental setup

Evaluated on the MAC-SLU dataset comprising 20,539 total samples across 8 domains (including car control, navigation, music, phone calls, weather). Baselines include pipeline systems combining Whisper-LargeV3-Turbo (CER 10.40%) or Paraformer (CER 3.64%) with Qwen3 LLMs, alongside zero-shot/ICL/SFT variants of Qwen3, Qwen2.5-Omni, Phi-4-multimodal, and MiniCPM-o-2.6. Metrics include Intent Classification (IC) Accuracy, Slot Filling (SF) F1-score, and Overall Accuracy (OA) where both IC and SF must be correct.

## Results

For in-context learning with 10-shot prompting, Qwen3-32B achieves the highest text ICL performance with 70.37% IC Accuracy, 55.09% SF F1, and 14.42% Overall Accuracy. In end-to-end speech evaluation under ICL, GPT-4o-Audio leads with 55.92% IC Accuracy, 46.45% SF F1, and 12.21% Overall Accuracy. Under SFT, text-based Qwen3-8B reaches 90.91% IC, 84.69% SF F1, and 60.73% Overall Accuracy, which degrades significantly by over 13% when coupled with Paraformer transcriptions and over 25% with Whisper transcripts due to ASR error propagation. End-to-end SFT models like Qwen2.5-Omni-7B achieve 91.24% IC, 83.02% SF F1, and 55.60% Overall Accuracy, outperforming pipeline setups that rely on error-prone ASR text inputs.

| System / Condition | IC Accuracy (%) | SF F1-Score (%) | Overall Accuracy (%) |
|---|---|---|---|
| Qwen3-8B (Text SFT) | 90.91 | 84.69 | 60.73 |
| Paraformer + Qwen3-8B (Pipeline SFT) | 88.92 | 79.09 | 47.18 |
| Whisper + Qwen3-8B (Pipeline SFT) | 82.42 | 70.58 | 35.45 |
| Qwen2.5-Omni-7B (E2E SFT) | 91.24 | 83.02 | 55.60 |
| MiniCPM-o-2.6 (E2E SFT) | 88.98 | 81.26 | 51.87 |
| Phi-4-Multimodal (E2E SFT) | 81.69 | 74.12 | 37.97 |

## Limitations

The benchmark relies on TTS-synthesized speech rather than natural acoustic recordings, which may limit the direct transferability of acoustic robustness findings to real-world noisy vehicle interiors. The dataset scope is restricted to Mandarin Chinese within the automotive cabin domain, excluding multilingual variations and other acoustic environments. Furthermore, evaluation relies on exact string matching metrics, which penalize semantically correct paraphrases and lexical variations.

## Why read this

Speech and ML researchers focusing on spoken language understanding or large audio-language models should read this paper to understand the limits of zero-shot in-context learning versus supervised fine-tuning on complex multi-intent tasks.

## Code

- https://github.com/Gatsby-web/MAC_SLU

## Applications

Automotive voice assistants, in-car infotainment control systems, and task-oriented multi-intent conversational dialogue agents.

## Institutions / 機構

Shanghai Jiao Tong University, Central South University, AISpeech Co., Ltd, Shanghai Innovation Institute, Harbin Institute of Technology, Shanghai Aviation Electric Co., Ltd, National University of Defense Technology

**Funding / 經費:** National Natural Science Foundation of China, Shanghai Municipal Science and Technology Major Project, Yangtze River Delta Science and Technology Innovation Community Joint Research Project

## Related

- (link related pages by id as the wiki grows)
