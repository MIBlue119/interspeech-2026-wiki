---
id: xu26j_interspeech
category: resources-evaluation
labels: [low-resource, dataset-or-benchmark-release]
institutions: ["Alibaba Group", "Nankai University", "Fudan University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1128
pdf: https://www.isca-archive.org/interspeech_2026/xu26j_interspeech.pdf
---

# GLAD-CSpeech: A Dialectologically Comprehensive Benchmark for Genuine Chinese Dialect Speech

*Ke Xu, Lihan Xu, Jiayi Lin, Bin Zhang, Yunfei Chu, Shuting Yuan, Ruiye Lv, Guangxuan Zheng, Qi Han, Jin Xu, Bing Zhao, Hu Wei, Yang Bai, Ziyi Cheng, Qibin Ran*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1128)

**Category:** `resources-evaluation` · **Labels:** `low-resource`, `dataset-or-benchmark-release`

**TL;DR** — GLAD-CSpeech is a linguistically grounded benchmark corpus containing over 163 hours of genuine Chinese dialect speech across 16 dialect divisions and 23 locations, supporting ASR, TTS, and dialect identification. Baseline evaluations reveal severe performance drops on non-Mandarin dialects like Wu and Hakka (e.g., ASR character error rates reaching up to 108.14%), proving that accent-robust models fail on true dialectal divergence.

## Key contributions

- A full-coverage benchmark spanning 16 dialect regions (8 Mandarin subgroups and 8 major non-Mandarin groups) and 23 representative dialect points based on dialectological taxonomy rather than administrative boundaries.
- A principled separation between Genuine Dialect and Accented Mandarin, allowing controlled study of structural/lexical divergence versus pure phonological accent.
- An expert-guided pipeline implementing a consistent 3-layer annotation scheme: Mandarin semantic anchor, dialect transcription with phonetic grounding, and per-dialect-point lexicons.
- Standardized baseline evaluations across ASR, TTS, and Dialect Identification (DID) using open-source and commercial models like Whisper-large-v3, Dolphin, and GPT-SoVITS.

## Problem

Current speech technology experiences severe performance degradation when transferring from standard varieties to non-standard dialects due to phonological, lexical, and morphosyntactic mismatches. Existing Chinese dialect resources suffer from severe imbalance, lack standardized evaluation protocols, and rely on unverified geo-tagged or mixed-speech data where administrative provincial boundaries cause intra-class linguistic variance to exceed inter-class variance. This practice obscures true cross-provincial consistency and underestimates model generalization, necessitating a high-purity benchmark grounded in professional dialectology.

## Method

GLAD-CSpeech comprises over 163.3 hours of audio recorded across diverse consumer-grade devices (iOS, Android, PC) in unified 16 kHz, 16-bit WAV format. Each of the 23 dialect points utilizes 6 speakers (3 female, 3 male spanning elderly, middle-aged, and youth groups) mapped to 4 ASR speakers and 2 dual ASR/TTS speakers across 13 real-world scenarios (predominantly Daily Life alongside smart/service domains). The corpus features a 3-layer annotation schema: (1) Standard Mandarin text as a semantic pivot, (2) dialect transcription applying a character-first principle with phonetic grounding (utilizing popular/colloquial characters, etymological characters, homophones with IPA, and '□ (IPA)' placeholders where needed), and (3) a per-dialect-point lexicon glossary standardizing local vocabulary. Overlapping speech and hesitations are explicitly preserved to model natural conditions.

For downstream baselines, ASR evaluation tests zero-shot performance across models without specialized dialect fine-tuning on a 24-hour subset (650 utterances per point). For TTS, GPT-SoVITS is fine-tuned on 3.93 hours of Xi'an Central Plains Mandarin using the Layer 2 dialect transcriptions as input, allowing an otherwise non-dialect-capable backbone to map dialectal text directly to acoustic nuances. For DID, a 6-way linear classification head is appended to the Dolphin multilingual foundation model and fine-tuned on 4,086 training utterances, evaluated against a zero-shot FireRedLID baseline on speaker-independent test splits.

## Experimental setup

Evaluations use a 24-hour ASR test split across 6 representative dialect points (Chengdu, Xi'an, Changsha, Taiyuan, Wenzhou, Meixian) compared against Whisper-large-v3, Dolphin, and Qwen3-ASR under Character Error Rate (CER %). TTS fine-tunes GPT-SoVITS on 3.93 hours (2 speakers) of Xi'an speech, evaluated using MOS, PMOS, IMOS, and AMOS by 6 native raters on 50 expert-designed sentences. Dialect Identification (DID) utilizes 4,086 training and 844 testing utterances across 6 points to measure Macro F1 comparing zero-shot FireRedLID and fine-tuned Dolphin-FT.

## Results

On the ASR task, non-Mandarin varieties proved substantially harder than Mandarin points, with Whisper-large-v3 achieving an average CER of 61.65% across the 6 test points, while Wenzhou (Wu) and Meixian (Hakka) reached massive error rates of 108.14% and 77.15% respectively. Commercial model Qwen3-ASR achieved an average CER of 28.97%, and Dolphin averaged 38.63%. In contrast, corresponding Mandarin points on KeSpeech showed much lower error rates (e.g., Chengdu at 27.05% vs GLAD-CSpeech Chengdu at 76.26% under Whisper), highlighting GLAD-CSpeech's superior reflection of real-world dialect difficulty.

For TTS fine-tuning on Xi'an Mandarin using GPT-SoVITS, the model achieved an overall MOS of 3.78, Prosody MOS (PMOS) of 3.72, intelligibility (IMOS) of 3.91, and accent-authenticity (AMOS) of 3.65. For Dialect Identification, zero-shot FireRedLID attained a Macro F1 of 72.29% due to mixed geographical-linguistic taxomomies, whereas fine-tuned Dolphin-FT reached 99.08% Macro F1, confirming that linguistically grounded taxonomy yields sharp acoustic boundaries even across unseen speakers.

| System / Condition | ASR CER (%) | TTS MOS | DID Macro F1 (%) |
|---|---|---|---|
| Whisper-large-v3 (Avg) | 61.65 | - | - |
| Qwen3-ASR (Avg) | 28.97 | - | - |
| Dolphin-ASR (Avg) | 38.63 | - | - |
| GPT-SoVITS-FT (Xi'an) | - | 3.78 | - |
| FireRedLID (Zero-shot) | - | - | 72.29 |
| Dolphin-FT | - | - | 99.08 |

## Limitations

The current release is restricted to non-commercial research use and totals 163.3 hours, which is relatively modest for training deep generative models from scratch without pre-trained backbones. Evaluation is currently constrained to 6 representative test points out of the total 23 dialect locations for primary zero-shot benchmarks. Furthermore, handling of extreme multi-speaker overlaps and complex conversational dynamics remains basic, leaving open challenges for future multi-talker and long-context scaling.

## Why read this

Speech researchers and engineers building multilingual or dialect-robust speech foundation models should read this to understand why geographic metadata fails for dialect modeling and how a linguistically grounded benchmark exposes true model limitations in non-Mandarin varieties.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building robust regional ASR systems, localized conversational agents and smart assistants, and accent-authentic text-to-speech synthesis for diverse Chinese dialects.

## Institutions / 機構

Alibaba Group, Nankai University, Fudan University

**Funding / 經費:** Alibaba Innovative Research Program

## Related

- (link related pages by id as the wiki grows)
