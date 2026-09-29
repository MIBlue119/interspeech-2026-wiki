---
id: peng26e_interspeech
category: resources-evaluation
institutions: ["Shanghai Jiao Tong University", "AISpeech Ltd", "ETH Zurich", "Nanjing University", "Hangzhou Dianzi University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1225
pdf: https://www.isca-archive.org/interspeech_2026/peng26e_interspeech.pdf
---

# A Unified and Reproducible Experimentation Framework for Speech Understanding

*Jing Peng, Junhao Du, Chenghao Wang, Hanqi Li, Yi Yang, Xiaoyu Gu, Guanyu Chen, Yixuan Wang, Haoyu Li, Zhangjie Zhao, Li Jiang, Haoran Wang, Wenming Tu, Yucheng Wang, Jiaqi Guo, Hui Zhang, Shuai Fan, Wenbin Jiang, Shuai Wang, Kai Yu*

[PDF](https://www.isca-archive.org/interspeech_2026/peng26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/peng26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1225)

**Category:** `resources-evaluation`

**TL;DR** — SURE is a unified experimentation and evaluation framework designed for deployment-oriented model selection in speech understanding, addressing inconsistencies in scoring, data scales, and training pipelines. It introduces scenario stress tests, a horizontal multi-task evaluation suite, and an agent-assisted workflow for controlled, reproducible training from scratch.

## Key contributions

- Releases SURE as an end-to-end evaluation and experimentation package unifying prediction formats, post-processing, text normalization, and task-specific scoring protocols.
- Curates scenario-focused stress test suites (Track I) covering acoustic stressors (noise, reverberation, multi-speaker meetings) and linguistic challenges (code-switching, dialects, contextual hotwords).
- Establishes a horizontal multi-task evaluation suite (Track II) spanning basic perception, speech translation, paralinguistic analysis, and deep reasoning across heterogeneous model families.
- Introduces an agent-assisted conversion workflow (Track III) that translates research papers and code repositories into versioned, executable training recipes under the swift framework.

## Problem

Prior speech foundation models and Speech LLMs suffer from non-comparable reported results due to inconsistent post-processing, scoring heuristics, and text normalization choices (such as casing, punctuation, and number mapping). Existing benchmarks often focus on a single model family (predominantly Speech LLMs) and evaluate under narrow, canonical test conditions that fail to reflect real-world acoustic and linguistic stressors. Furthermore, modern architectures are trained on heterogeneous, opaque data mixtures, making it impossible to attribute performance gains to genuine modeling choices rather than varying training recipes.

## Method

The SURE evaluation framework follows a fixed input-preprocess-normalize-score-report pipeline. Given a reference JSON and prediction text file, it performs task identification and alias resolution, applies language-dependent text normalization, and invokes task-specific backends such as meeteval for Diarization Error Rate (DER) and concatenated minimum-permutation WER (cpWER), sacrebleu for BLEU/chrF2, and standardized scripts for text-centric tasks. To aggregate heterogeneous tasks, SURE computes a Relative Performance Score (RPS) in [0, 1] by normalizing each model's score against the current best score on the SURE leaderboard, dynamically updating as new models or tasks are integrated.

The agent-assisted training conversion workflow (Track III) automates the transition from static research papers and repositories into executable training pipelines within the open-source swift framework. The agent analyzes model specifications, generates a versioned configuration detailing the model, data, optimizer, and training schedule, and passes it through a validator module. This validator performs static checks (dependency resolution, config sanity, loss and metric signature verification) followed by a dynamic integration check (a short smoke-run on a small batch) to guarantee runnability before launching full training on matched open-data subsets.

## Experimental setup

The evaluation utilizes multiple benchmark datasets including VoxPopuli-en and AISHELL-5 for acoustic stress tests, AMI and AliMeeting for multi-speaker meeting transcription, CS-Dialogue and KeSpeech for linguistic stressors, and LibriSpeech, AISHELL-1, CoVoST2, IEMOCAP, MELD, and MMSU-Reason for full-stack horizontal evaluation. Baselines span conventional cascaded pipelines (e.g., Diarizen+DiCoW, Sortformer+FireRedASR), encoder-decoder speech foundation models (e.g., Whisper, SenseVoice, Parakeet), end-to-end speech LLMs (e.g., VibeVoice-ASR, Kimi-Audio, Qwen2/3-Audio, FireRedLLM), and commercial APIs (Gemini 2.5/3.0 Pro). Track III trains models from scratch using controlled open-data subsets (e.g., Qwen2-Audio-7B and TASU-2B).

## Results

Under SURE's unified protocol, evaluation results shift significantly compared to original paper reports (e.g., LibriSpeech evaluation yields an RPS shift of approximately 0.3). In Track I front-end perception, cascaded pipelines remain highly competitive on multi-speaker meeting tasks, with Sortformer+FireRedASR achieving a DER of 33.22% and cpCER of 41.92% on AliMeeting compared to 47.33% and 43.66% for end-to-end VibeVoice-ASR. In Track II horizontal tasks, Qwen3-Audio achieves top ASR performance with 1.70/3.05 WER on LibriSpeech clean/other and 1.02% CER on AISHELL-1, while Gemini 2.5 Pro scores 60.14 on CoVoST2 Zh2En S2TT.

In Track III controlled training, Qwen2-Audio-7B outperforms TASU-2B on paralinguistic tasks such as emotion recognition (SER accuracy 40.38% vs 31.49% on MELD) and gender recognition (GR accuracy 98.93% vs 46.78%), whereas TASU remains competitive on semantic tasks like SLU (47.81% vs 45.13%). However, several instruction-following Speech LLMs experience severe performance degradation on simple tasks due to format adherence errors where outputs deviate from required generation schemas.

| Model | Type | AMI (DER/cpWER ↓) | AliMeeting (DER/cpCER ↓) |
|---|---|---|---|
| Diarizen+DiCoW | Cascaded | 30.21 / 17.26 | – |
| Sortformer+FireRedASR | Cascaded | – | 33.22 / 41.92 |
| VibeVoice-ASR | E2E SLM | 41.26 / 36.80 | 47.33 / 43.66 |

## Limitations

The framework's controlled training track is currently an initial proof-of-concept tested on a small set of model architectures (e.g., Qwen2-Audio, TASU) and constrained data budgets. Certain models still require lightweight human intervention due to incomplete or non-standard public code releases. Evaluation is currently bounded by the language coverage and task taxonomy defined in the benchmark suites, leaving room for expansion into broader dialectal and interactive dialogue settings.

## Why read this

Researchers and deployment engineers building speech understanding systems or selecting models for production should read this to understand how post-processing and scoring discrepancies distort published metrics. It provides a concrete blueprint for standardized evaluation under realistic stressors and an agent-based framework for reproducible training comparisons.

## Code

- https://sure-eval-framework.github.io/speechllm_series/

## Applications

Deployment-oriented model selection for speech recognition, spoken language understanding, speech translation, and paralinguistic analysis in robust real-world environments.

## Institutions / 機構

Shanghai Jiao Tong University, AISpeech Ltd, ETH Zurich, Nanjing University, Hangzhou Dianzi University

**Funding / 經費:** China NSFC Projects, YangtzeRiver Delta Science and Technology Innovation Community Joint Research Project

## Related

- (link related pages by id as the wiki grows)
