---
id: xu26j_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1128
pdf: https://www.isca-archive.org/interspeech_2026/xu26j_interspeech.pdf
---

# GLAD-CSpeech: A Dialectologically Comprehensive Benchmark for Genuine Chinese Dialect Speech

*Ke Xu, Lihan Xu, Jiayi Lin, Bin Zhang, Yunfei Chu, Shuting Yuan, Ruiye Lv, Guangxuan Zheng, Qi Han, Jin Xu, Bing Zhao, Hu Wei, Yang Bai, Ziyi Cheng, Qibin Ran*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1128)

**TL;DR** — GLAD-CSpeech is a linguistically grounded benchmark corpus containing over 163 hours of genuine Chinese dialect speech across 16 dialect regions and 23 representative points, supporting ASR, TTS, and DID tasks. Baseline experiments reveal severe performance drops on non-Mandarin varieties like Wu and Hakka, highlighting current model brittleness.

## Key contributions

- A full-coverage benchmark spanning 16 dialect regions and 23 representative dialect locations based on authoritative dialectological taxonomy rather than administrative boundaries.
- A principled separation of Genuine Dialect from Accented Mandarin, enabling controlled study of the Mandarin-dialect continuum and accent robustness.
- An expert-guided data pipeline featuring a 3-layer annotation schema: Mandarin semantic anchors, phonetic dialect transcriptions, and per-point dialect lexicons.
- Deployment-oriented baseline systems and standardized evaluation protocols for ASR, TTS, and Dialect Identification (DID).

## Problem

Speech technology performance degrades substantially when transferring from standard language varieties to non-standard dialects due to phonological, lexical, and morphosyntactic mismatches. Existing Chinese resources suffer from severe class imbalances, lack standardized evaluation protocols, and rely heavily on geo-tagged administrative labels rather than linguistic verification. Administrative labels cause high intra-class variance because dialect boundaries rarely coincide with provincial borders, obscuring true model generalization and preventing systematic error analysis along the Mandarin-dialect continuum.

## Method

GLAD-CSpeech encompasses over 163.3 hours of audio recorded across diverse consumer-grade devices (iOS, Android, PC) in unified 16 kHz, 16-bit WAV format. Each dialect point utilizes 6 speakers (4 for ASR, 2 for ASR and TTS), covering 13 application scenarios like daily life, customer service, and smart assistants, alongside hard cases such as long text and overlapping speech. The annotation schema provides a 3-layer architecture: (1) Mandarin text as a shared semantic anchor, (2) dialect transcription preserving natural phonetic and lexical realizations using a character-first principle with IPA fallback, and (3) a per-dialect-point lexicon glossary.

For ASR, zero-shot evaluations test models on 24 hours of speech across 6 representative dialect points without special handling for overlapping segments. For TTS, GPT-SoVITS is fine-tuned on 3.93 hours of Xi'an dialect data from 2 speakers using Layer 2 dialect transcriptions as input to map text directly to acoustic nuances. For DID, models like Dolphin are extended with a 6-way linear classification head and fine-tuned on 4,086 training utterances, evaluated on 844 utterances from unseen speakers under a speaker-independent protocol.

## Experimental setup

The corpus includes over 163 hours total, with the ASR/DID evaluation subset focusing on 6 representative dialect points totaling ~24 hours (~4 hours per point, 650 utterances each). TTS fine-tuning uses 3.93 hours from 2 speakers for the Xi'an dialect. Baselines evaluated include Whisper-large-v3, Dolphin, Qwen3-ASR, FireRedLID, and GPT-SoVITS. Metrics reported are Character Error Rate (CER, %), Macro F1 for DID, and Mean Opinion Scores (MOS, PMOS, IMOS, AMOS) for TTS.

## Results

On zero-shot ASR evaluation, models showed massive performance degradation on non-Mandarin dialects compared to Mandarin points; Wenzhou (Wu) and Meixian (Hakka) proved most challenging, with Whisper-large-v3 achieving an average CER of 61.65% across the 6 test points, while Qwen3-ASR and Dolphin reached 28.97% and 38.63% respectively. For TTS fine-tuning on the Xi'an dialect using GPT-SoVITS, the system achieved an overall MOS of 3.78, an intelligibility MOS (IMOS) of 3.91, and an accent-authenticity MOS (AMOS) of 3.65. In the DID task, a zero-shot mixed-taxonomy model (FireRedLID) achieved a 72.29% Macro F1, whereas fine-tuning Dolphin on linguistically grounded labels attained a Macro F1 of 99.08% on unseen speakers.

| System / Condition | CER (Whisper) | CER (Qwen3) | CER (Dolphin) | DID Macro F1 |
|---|---|---|---|---|
| Chengdu (Southwest Mandarin) | 26.64% | 4.42% | 19.26% | - |
| Xi'an (Central Plains Mandarin) | 35.85% | 5.04% | 21.03% | - |
| Changsha (Xiang) | 76.26% | 28.03% | 38.32% | - |
| Taiyuan (Jin) | 45.88% | 11.89% | 28.90% | - |
| Overall / Average (ASR) | 61.65% | 28.97% | 38.63% | - |
| Dolphin-FT (DID Task) | - | - | - | 99.08% |

## Limitations

The current release is restricted to non-commercial research use and covers 16 dialect regions through 23 representative locations, leaving numerous minor sub-dialects unrepresented. The total corpus scale (~163 hours) is relatively small for pre-training large foundational models from scratch, requiring fine-tuning approaches. Evaluation currently focuses on a subset of 6 test points for ASR and a single dialect point for TTS, leaving broader multi-dialect generative evaluations for future work.

## Why read this

Speech researchers and engineers building inclusive, multi-dialect speech systems should read this paper to understand how linguistically rigorous taxonomy exposes critical failure points in current ASR and TTS models that geo-tagged datasets obscure.

## Code

- https://github.com/RVC-Boss/GPT-SoVITS

## Applications

Robust multi-dialect automatic speech recognition, regional text-to-speech synthesis, and dialect identification systems for voice assistants and telecommunication services.

## Related

- (link related pages by id as the wiki grows)
