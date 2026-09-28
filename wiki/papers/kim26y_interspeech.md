---
id: kim26y_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3442
pdf: https://www.isca-archive.org/interspeech_2026/kim26y_interspeech.pdf
---

# VividAC: Visually Informed and Visually Interacted Audio Captioning for Enhancing Audio-Visual Question Answering

*Mingi Kim, Jaehoon Go, Jinkwon Hwang, Sangyeon Cho, Sunjae Yoon, Junyeong Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26y_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26y_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3442)

**TL;DR** — VividAC is a training-free framework that uses natural-language communication between a Visual Agent and an Audial Agent to generate visually contextualized audio captions, boosting zero-shot AVQA accuracy by up to 11.01%p.

## Key contributions

- Proposes VividAC, a training-free, cascaded framework utilizing natural-language communication between off-the-shelf Visual Agents (VLMs) and Audial Agents (ALMs) for audio-visual question answering.
- Introduces a query-guided video caption refinement step using CLIP-based semantic similarity to filter out noisy or irrelevant visual details and mitigate error propagation.
- Demonstrates that Vision-to-Audio (V->A) interaction directionality significantly outperforms reverse Audio-to-Vision (A->V) interaction for zero-shot AVQA reasoning.
- Outperforms the strongest end-to-end Audio-Visual LLM (Video-SALMONN) by 7.0%p on MUSIC-AVQA without requiring any joint audio-visual model training.

## Problem

Audio-Visual Question Answering (AVQA) requires simultaneous, joint reasoning across auditory and visual modalities, yet models frequently misinterpret or underutilize the audio stream. While textual audio captions could theoretically bridge this gap for Large Language Models, naive audio captions often degrade downstream performance because they lack task-relevant details and contradict the visual scene. Existing dedicated Audio-Visual Large Language Models (AVLLMs) also struggle to robustly capture the nuanced interplay between modalities due to difficult joint-training dynamics. VividAC solves this by establishing structured, query-informed communication between specialized unimodal agents to ensure perceptual alignment before reasoning.

## Method

VividAC operates in a cascaded, training-free pipeline consisting of visual processing, caption filtering, audial generation, and final LLM reasoning. First, a Visual Agent (such as Qwen2.5-VL, VideoChat-R1, or InternVL2.5) ingests a video clip and noun phrases extracted from the question (using spaCy) to generate a query-relevant video caption, Cv. To prevent error propagation from irrelevant visual hallucinations, a query-guided refinement step extracts candidate nouns from Cv and computes their CLIP-based text embedding similarity against question nouns, retaining only those exceeding a strict similarity threshold of tau = 0.8.

Next, these filtered visual keywords and the structured video caption are fed directly into an Audial Agent (Qwen2-Audio-7B-Instruct) via a prompt template alongside the raw audio file. The Audial Agent conditions on this visual context to produce a visually contextualized audio caption, Ca, which eliminates cross-modal discrepancies (e.g., confusing a guzheng for a harp). Finally, a reasoning Large Language Model (such as Qwen2.5-7B, Llama-3.1-8B, or Mistral-7B) consumes the contextualized audio caption and video context to synthesize the final answer for the AVQA query.

## Experimental setup

Evaluated on the official test split of the MUSIC-AVQA benchmark, comprising 9,192 QA pairs across 6,399 unique video-audio samples spanning 9 question categories. Tested across 4 VLM architectures (Qwen2.5-VL 3B/7B, VideoChat-R1-7B, InternVL2.5-8B), 1 ALM (Qwen2-Audio-7B-Instruct), and 3 LLM backbones (Qwen2.5-7B-Instruct, Llama-3.1-8B-Instruct, Mistral-7B-Instruct). Performance is measured via normalized answer accuracy matching ground-truth keywords. The system operates entirely in zero-shot fashion using off-the-shelf models without custom fine-tuning epochs.

## Results

When paired with Qwen2.5-7B-Instruct and Qwen2.5-VL-7B-Instruct, VividAC achieves an overall accuracy of 59.91%, outperforming the strongest end-to-end baseline, Video-SALMONN (52.91%), by 7.0%p. Across 12 tested VLM-LLM combinations, VividAC consistently improves performance over naive audio-captioning baselines in 11 configurations, with gains reaching up to 11.01%p when using Llama-3.1-8B with Qwen2.5-VL-3B (increasing from 40.27% to 51.28%). Ablations on interaction direction demonstrate that Vision-to-Audio (V->A) communication achieves 58.18% overall accuracy, outperforming the reverse Audio-to-Vision (A->V) flow at 52.54% and the no-interaction baseline at 55.55%. The sole negative transfer occurs with Llama-3.1 paired with InternVL2.5 (-0.63%p overall), though its audio-specific average still increases.

| System / Condition | A-Avg (%) | V-Avg (%) | AV-Avg (%) | Overall (%) |
|---|---|---|---|---|
| Video-SALMONN (Baseline) | 66.91 | 51.87 | 48.84 | 52.91 |
| VividAC + Llama-3.1 (VideoChat) | 63.03 | 59.41 | 42.52 | 49.22 |
| VividAC + Llama-3.1 (Qwen2.5-7B) | 64.49 | 59.17 | 46.59 | 53.08 |
| VividAC + Mistral (Qwen2.5-7B) | 68.96 | 68.00 | 50.10 | 58.18 |
| VividAC + Qwen2.5 (Qwen2.5-7B) | 69.21 | 72.58 | 50.94 | 59.91 |

## Limitations

The framework relies entirely on off-the-shelf cascaded models, meaning inference latency is higher due to sequential generation steps across multiple independent LLMs, VLMs, and ALMs. Error propagation can still occur if the initial Visual Agent completely misses essential scene elements that fail the CLIP similarity threshold (tau = 0.8). Evaluation is strictly bounded to the MUSIC-AVQA dataset containing musical instrument performances, leaving open its generalization to broader, unconstrained open-world audio-visual environments and multilingual domains.

## Why read this

Speech and ML researchers working on multimodal interfaces or zero-shot reasoning should read this to see how structured natural-language inter-agent communication can completely bypass the need for costly joint audio-visual training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Zero-shot audio-visual question answering, video understanding assistants, and multimodal retrieval systems.

## Related

- (link related pages by id as the wiki grows)
