---
id: dai26b_interspeech
category: speaker
institutions: ["Northwestern Polytechnical University", "Soul AI", "Shanghai Jiao Tong University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-774
pdf: https://www.isca-archive.org/interspeech_2026/dai26b_interspeech.pdf
---

# Joint Learning Global-Local Speaker Classification to Enhance End-to-End Speaker Diarization and Recognition

*Yuhang Dai, Haopeng Lin, Jiale Qian, Ruiqi Yan, Hao Meng, Hanke Xie, Hanlin Wen, Shunshun Yin, Ming Tao, Xie Chen, Lei Xie, Xinsheng Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/dai26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dai26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-774)

**Category:** `speaker`

**TL;DR** — GLSC-SDR introduces a hierarchical Global-Local Speaker Classification joint-training paradigm for Large Audio-Language Models, improving end-to-end speaker diarization and recognition without requiring massive real conversational datasets. It achieves superior performance on benchmarks like AliMeeting, AISHELL-4, and AMI-SDM compared to multi-encoder and simulation-heavy baselines.

## Key contributions

- Proposes GLSC-SDR, a fully end-to-end joint training framework that integrates speaker classification directly with speech diarization and recognition within a unified LALM.
- Introduces the Global-Local Speaker Classification (GLSC) strategy using macro-acoustic clustering (via HDBSCAN) followed by micro-individual sequential re-encoding to enhance cross-segment speaker discriminability without architectural modifications to the LLM backbone.
- Develops an automated data preprocessing pipeline with quality filtering (discarding segments with WER > 30% or > 2 insertion errors) to construct robust composite speaker labels for single-utterance auxiliary training.
- Demonstrates state-of-the-art or competitive end-to-end speaker attribution and transcription performance across AliMeeting, AISHELL-4, and AMI-SDM datasets while cutting attribution errors relative to vanilla LALM baselines.

## Problem

Traditional end-to-end Large Audio-Language Models (LALMs) struggle with fine-grained speaker discrimination in rapid, overlapping, and acoustically similar conversational scenarios because speaker identity modeling remains implicit. Prior efforts typically rely on auxiliary architectural modules like separate speaker encoders, complex inference-time LLM post-processing, or heavy simulation pipelines that add significant system complexity. This work matters because it bridges the gap between modern deep speaker verification systems and speech-language models through a principled, representation-level joint training strategy that requires zero architectural expansion.

## Method

The framework utilizes Qwen2.5-Omni-7B as the foundational Large Audio-Language Model backbone, incorporating Low-Rank Adaptation (LoRA) with a rank of 8 applied to the AudioEncoder, Aligner, and Thinker modules. The training objective is a multi-task composite loss combining the Speaker Diarization and Recognition (SDR) loss and the Global-Local Speaker Classification (GLSC) loss, joined via a task token under the Serialized Output Training (SOT) paradigm.

The GLSC mechanism operates through a two-level hierarchical strategy: macro-acoustic coarse-grained global clustering followed by micro-individual fine-grained local identification. Raw audio waveforms are segmented by dataset timestamps, filtered through an ASR quality gate (dropping segments with >30% WER or >2 insertion errors), and passed to an ERes2Net model to extract speaker embeddings. Unsupervised clustering of embeddings is performed using HDBSCAN with cluster centroid cosine similarity merging at 0.75, producing global cluster IDs (Lg). Distinct speakers within each macro-cluster are sequentially re-encoded to generate local identifiers (Lu), which are concatenated with Lg to form composite supervisory labels for single-utterance auxiliary training tasks.

## Experimental setup

Evaluated on three far-field meeting benchmarks: AliMeeting (Mandarin, channel 1), AISHELL-4 (Mandarin, channel 1), and AMI (English, Single Distant Microphone subset). Models are compared against SOTA systems including TagSpeech, VibeVoice-ASR, Gemini-2.5-pro, Gemini-3-pro, and vanilla Qwen2.5-omni baselines. Primary evaluation metrics include Word Error Rate (WER), concatenated minimum-Permutation Word Error Rate (cpWER), the attribution error delta (Δcp = cpWER - WER), and Speaker Count Accuracy (SCA). Implemented with an initial learning rate of 1e-4, LoRA rank 8, trained for 30 epochs for main evaluations (3 epochs for ablations).

## Results

GLSC-SDR achieves state-of-the-art end-to-end results across all three benchmarks. On AliMeeting, it obtains a WER of 20.09%, cpWER of 25.43%, Δcp of 5.34, and SCA of 83.26%, outperforming the Qwen2.5-Omni-SFT baseline (cpWER 26.77%, SCA 81.28%) and TagSpeech (cpWER 33.84%). On AISHELL-4, it reaches a WER of 21.36%, cpWER of 23.49%, Δcp of 2.13, and SCA of 90.96%. On AMI-SDM, it yields a WER of 17.49%, cpWER of 23.32%, Δcp of 5.83, and SCA of 76.67%, outperforming VibeVoice-ASR (cpWER 28.82%) and Gemini-3-pro (cpWER 26.91%). 

Ablation studies on classification strategies show that the full GLSC-SDR framework outperforms Global-Only Classification (cpWER 30.81 vs 29.93) and direct speaker-label classification, which severely degrades semantic transcription quality. Comparisons of clustering algorithms demonstrate that HDBSCAN significantly outperforms K-means due to its robustness against outliers and non-uniform distributions, while an optimal granularity of 200 clusters balances fine-grained discrimination and intra-cluster redundancy.

| System / Condition | WER ↓ | cpWER ↓ | Δcp ↓ | SCA ↑ |
|---|---|---|---|---|
| Qwen2.5-omni (Baseline) | 29.21 | 43.64 | 14.43 | 71.28 |
| Qwen2.5-omni-sft | 20.22 | 26.77 | 6.55 | 81.28 |
| TagSpeech [7] | 25.42 | 33.84 | 8.42 | 81.63 |
| VibeVoice-ASR [18] | 27.40 | 29.33 | 1.93 | - |
| Gemini-3-pro* | 26.75 | 32.84 | 6.09 | - |
| **GLSC-SDR (Proposed)** | **20.09** | **25.43** | **5.34** | **83.26** |

## Limitations

The framework relies heavily on offline clustering hyperparameters such as HDBSCAN density thresholds and cluster count limits (optimal at 200), which may require tuning across drastically different acoustic domains. The data construction pipeline drops overlapping speech segments during the initial ASR quality filtering phase, potentially limiting the model's exposure to dense crosstalk conditions during GLSC auxiliary training. Evaluation is constrained to meeting domain datasets (AliMeeting, AISHELL-4, AMI) in Mandarin and English languages.

## Why read this

Speech and ML engineers building end-to-end Large Audio-Language Models for multi-speaker transcription should read this paper to learn how to inject explicit speaker verification objectives into sequence-to-sequence LALMs via hierarchical representation learning, bypassing the need for complex auxiliary network modules.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated multi-speaker conversational transcription, meeting minute generation, courtroom transcription, and clinical encounter logging systems.

## Institutions / 機構

Northwestern Polytechnical University, Soul AI, Shanghai Jiao Tong University

## Related

- (link related pages by id as the wiki grows)
