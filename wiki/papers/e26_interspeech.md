---
id: e26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3255
pdf: https://www.isca-archive.org/interspeech_2026/e26_interspeech.pdf
---

# Benchmarking Speech Systems for Frontline Health Conversations: The DISPLACE-M Challenge

*Dhanya E, Ankita Meena, Manas Nanivadekar, Noumida A, Victor Azad, Ashwini Nagaraj Shenoy, Pratik Roy Chowdhuri, Shobhit Banga, Vanshika Chhabra, Chitralekha Bhati, Shareef babu Kalluri, Srikanth Raj Chetupalli, Deepu Vijayasenan, Sriram Ganapathy*

[PDF](https://www.isca-archive.org/interspeech_2026/e26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/e26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3255)

**TL;DR** — The DISPLACE-M challenge introduces a 40-hour Hindi benchmark dataset and evaluation framework for goal-oriented medical conversations between frontline health workers and care seekers, featuring four tracks: speaker diarization, ASR, topic identification, and dialogue summarization. Baseline and challenge submission evaluations show that domain adaptation and end-to-end models substantially outperform zero-shot systems, though dialogue summarization remains exceptionally difficult.

## Key contributions

- A 40-hour benchmark dataset of spontaneous, code-mixed, multi-speaker Hindi health conversations recorded in unconstrained rural/semi-urban field environments.
- A unified evaluation framework covering four interconnected tasks: speaker diarization, ASR, topic identification, and dialogue summarization.
- Baseline systems and evaluation leaderboards for reproducible multi-task assessment of conversational speech-understanding models.
- An empirical Phase-I evaluation comparing open-source baselines, challenge team submissions, and state-of-the-art closed-source models (such as Gemini 2.5 Pro and Sarvam AI Saaras v3).

## Problem

Existing speech processing datasets in the healthcare domain are predominantly English, recorded in clean clinical or hospital environments with formal clinician-patient workflows, and fail to capture real-world community healthcare interactions. Frontline health conversations are characterized by spontaneous, noisy, code-mixed multi-speaker dialogues containing regional dialects (Haryanvi, Bhojpuri, Magahi), overlapping speech, and implicit or fragmented symptoms. Consequently, general-purpose speech tools and clinical NLP datasets perform poorly when deployed in unconstrained community outreach settings, necessitating a dedicated benchmark for goal-oriented medical conversations.

## Method

The challenge evaluates systems via a cascaded pipeline (speaker diarization, followed by ASR, feeding into topic identification and dialogue summarization) or through end-to-end speech-language models. Track 1 (Speaker Diarization) uses a base DiariZen model combining an EEND neural network (8-second segments, powerset loss) with Agglomerative Hierarchical Clustering (AHC) using ResNet34-LM embeddings trained on VoxCeleb2. Track 2 (ASR) evaluates IndicConformer (600M multilingual) and Whisper-large-v3 (1.55B parameter encoder-decoder), applying fine-tuning on challenge development sets. Track 3 (Topic Identification) and Track 4 (Dialogue Summarization) employ LLMs such as medgemma-1.5-4b-it, LLaMA-3.2-3B, Llama-3.1-70B, and GPT-based models operating on ASR transcripts or directly on raw audio.

Training recipes for winning challenge teams included multi-dataset pre-training combined with domain fine-tuning. For instance, top ASR submissions fine-tuned Qwen3-ASR-1.7B on 1,800 hours of open-source Hindi speech plus challenge dev sets, supplemented by GPT-4.1 post-processing for medical term correction. Diarization teams fine-tuned DiariZen variants using WavLM backbones with distinct learning rates for conformer blocks (10^-3) and WavLM (2 x 10^-5). Design choices emphasized domain-specific vocabulary adaptation, acoustic fine-tuning on field recordings, and auxiliary demographic extraction (age and biological sex estimated from speaker streams) to inform clinical topic identification.

## Experimental setup

The dataset includes 40 hours of development data (released in Dev Set 1 [15h] and Dev Set 2 [10h], plus a 15h curated subset for topic/summarization) and 15 hours of blind evaluation recordings across 260 unique speakers. Evaluations use Diarization Error Rate (DER), Word Error Rate (WER), Character Error Rate (CER), Time-Constrained minimum-Permutation Word Error Rate (tcpWER), and ROUGE scores (R-1, R-L). Baselines are compared against challenge submissions and closed-source models including Gemini 2.5 Pro and Sarvam AI Saaras v3.

## Results

For Track 1, Baseline-2 achieved a DER of 20.79%, while top challenge team T1 achieved a lower DER through dynamic logits fusion of 5 complementary systems. In Track 2 (ASR), fine-tuning IndicConformer (Baseline-2) significantly improved tcpWER from 26.78% (zero-shot Baseline-1) down to 20.23%, while top submission T1 reached a CER of 10.59%, WER of 18.15%, and tcpWER of 18.63% using Qwen3-ASR-1.7B with GPT-4.1 post-processing. Closed-source Gemini 2.5 Pro achieved 10.76% CER and 19.60% WER.

For Track 3 (Topic Identification), top team T1 scored 0.46 R-1 and 0.44 R-L using zero-shot Gemini 3 Pro directly on raw audio, outperforming the baseline (0.15 R-1, 0.14 R-L). For Track 4 (Dialogue Summarization), T1 achieved a ROUGE-L of 0.20, outperforming the baseline of 0.18, while Gemini 2.5 Pro achieved 0.21. Dialogue summarization proved to be the most challenging task, where even large closed-source models struggled due to implicit symptom descriptions and complex conversational structures.

| System | CER (%) | WER (%) | tcpWER (%) |
|---|---|---|---|
| ZS IndicConformer (Baseline-1) | 15.03 | 25.56 | 26.78 |
| FT IndicConformer (Baseline-2) | 11.40 | 19.01 | 20.23 |
| FT Whisper-large-v3 | 14.07 | 23.60 | 26.32 |
| Sarvam AI (Saaras v3) | 14.20 | 24.60 | 26.63 |
| Gemini 2.5 Pro | 10.76 | 19.60 | – |
| Challenge Team T1 | 10.59 | 18.15 | 18.63 |

## Limitations

Phase-I evaluation is currently restricted to Hindi conversations collected in specific rural/semi-urban regions of India (Haryana and Bihar), limiting immediate cross-lingual and cross-cultural generalizability. The dataset size (40 hours development, 15 hours evaluation) is relatively small compared to web-scale ASR corpora, and the short 6-week challenge timeline restricted more exhaustive hyperparameter optimization and larger-scale multi-pass training explorations.

## Why read this

Researchers and engineers working on domain-adapted speech recognition, medical conversational agents, and multi-speaker diarization pipelines in low-resource or code-mixed settings should read this paper to understand the limits of current ASR and LLM cascades on real-world frontline healthcare audio.

## Code

- https://www.codabench.org/competitions/13833/?secret_key=1b714e64-0f0d-4e0f-8a3c-be9b3d10f00c#

## Applications

Automated clinical documentation, community healthcare analytics, and AI-assisted medical transcription for frontline health workers in multilingual developing regions.

## Related

- (link related pages by id as the wiki grows)
