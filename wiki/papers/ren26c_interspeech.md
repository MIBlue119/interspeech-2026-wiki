---
id: ren26c_interspeech
category: speaker
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1117
pdf: https://www.isca-archive.org/interspeech_2026/ren26c_interspeech.pdf
---

# Adapting Audio Large Language Models for Speaker Verification

*Yiming Ren, Xuenan Xu, Shuai Wang, Chao Zhang, Baoxiang Li*

[PDF](https://www.isca-archive.org/interspeech_2026/ren26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ren26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1117)

**Category:** `speaker` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates adapting Audio Large Language Models (ALLMs) for text-independent and text-dependent speaker verification by reformulating the task as audio question answering, demonstrating that supervised fine-tuning with hard pair sampling dramatically improves zero-shot deficits while retaining general audio capabilities.

## Key contributions

- Pioneers a systematic evaluation of ALLMs (Qwen2-Audio, Kimi-Audio, MiMo-Audio) on speaker verification, exposing severe limitations in zero-shot settings.
- Proposes a rule-based hard pair sampling strategy targeting difficult dimensions (age, gender, device, dialect, distance, duration) to optimize training data.
- Formulates text-dependent speaker verification as an audio QA task that jointly verifies speaker identity and semantic content, bypassing cascaded ASR-SV limits.
- Demonstrates that lightweight parameter-efficient fine-tuning (LoRA) on SV tasks preserves general audio understanding metrics across ASR, AQA, SER, and AAC.

## Problem

Current Audio Large Language Models excel at semantic tasks like automatic speech recognition and audio captioning, but remain largely insensitive to individual speaker identity and paralinguistic cues. Traditional speaker verification systems use dedicated neural embedding extractors followed by scoring backends, but struggle in complex real-world conditions like cross-device, noise, and short-duration mismatches. Because ALLMs process audio through generative language modelling paradigms, their zero-shot speaker verification capability across challenging covariate shifts is largely unexplored and inadequate.

## Method

The architecture builds upon Kimi-Audio, utilizing a hybrid audio encoder combining discrete audio tokens and continuous Whisper features, feeding an autoregressive Large Language Model backbone. Speaker verification is reformulated as an audio question answering task where two audio segments—an enrollment utterance and a test utterance—are processed using various prompting strategies (Separate, Concat, Concat + Silence, Mix). Among these, concatenating the two segments with a 1-second silence interval performs best by providing explicit temporal boundaries for the LLM to process. To overcome zero-shot failures, the model is supervised fine-tuned using a cross-entropy loss over text token outputs ("One" or "Two"), extracting similarity metrics from normalized token probabilities.

Training datasets comprise 9 million text-independent pairs from VoxCeleb2, CN-Celeb, and 3D-Speaker, alongside 280k text-dependent pairs from LibriSpeech. Optimization uses the AdamW optimizer with a cosine learning rate schedule starting at 10^-5. Parameter-efficient fine-tuning is implemented via Low-Rank Adaptation (LoRA) with rank r = 16, scaling factor alpha = 32, applied to all attention projection layers excluding biases, resulting in 18M trainable parameters. A rule-based hard pair sampling strategy curates training pairs based on shared or mismatched attributes such as age gaps, identical genders, or recording setups to harden representations.

## Experimental setup

Evaluations are conducted on custom benchmark subsets sampled from VoxCeleb1/2, CN-Celeb, and 3D-Speaker covering 10 distinct challenge dimensions (gender, language, age, device, dialect, distance, short/medium/long duration, and scene), plus LibriSpeech-test for text-dependent evaluation. Baselines include conventional supervised systems such as ResNet34, ECAPA-TDNN, and CAM+, as well as a cascaded Whisper + ECAPA-TDNN system for text-dependent verification. Metrics reported include Accuracy (%) for zero-shot and classification settings, and Equal Error Rate (EER %) for verification comparisons.

## Results

Zero-shot ALLMs perform near chance level or poorly (EERs exceeding 30-48% across many test dimensions). After fine-tuning Kimi-Audio with hard pair sampling, EERs drop dramatically, achieving 4.87% on gender and 2.93% on language conditions on VoxCeleb. Under short-duration test conditions (<2s), fine-tuned ALLMs achieve an EER of 19.10%, occasionally outperforming conventional baselines like ECAPA-TDNN (21.20%). Ablations show that replacing hard pair sampling with random sampling degrades dialect EER from 10.93% to 15.40%. In text-dependent verification on LibriSpeech, the fine-tuned ALLM achieves 98.87% overall accuracy, matching the cascaded Whisper + ECAPA-TDNN baseline (98.83%).

However, fine-tuned ALLMs still lag behind specialized backends like CAM+ on difficult acoustic domains such as cross-device (10.13% vs 4.80% EER) and different scene conditions (20.60% vs 19.80% EER). General audio benchmark evaluations confirm that fine-tuning on speaker verification does not degrade performance on ASR, Audio Question Answering, or Speech Emotion Recognition, and even improves Audio Captioning (METEOR increasing from 0.178 to 0.195).

| System / Condition | VoxCeleb Gender EER | VoxCeleb Lang EER | 3D-Speaker Device EER | CNCeleb Short Dur EER |
|---|---|---|---|---|
| Kimi-Audio (Zero-shot) | 30.14% | 33.40% | 48.67% | 48.70% |
| Kimi-Audio (Fine-tuned w/ Hard Sampling) | 4.87% | 2.93% | 10.13% | 19.10% |
| Kimi-Audio (Fine-tuned w/ Random Sampling) | 5.40% | 7.67% | 13.67% | 19.50% |
| ResNet34 | 0.93% | 0.89% | 4.93% | 19.45% |
| ECAPA-TDNN | 0.67% | 0.80% | 5.33% | 21.20% |
| CAM+ | 0.73% | 0.53% | 4.80% | 20.20% |

## Limitations

The study is limited by its evaluation scope, which focuses heavily on English-centric datasets (VoxCeleb, LibriSpeech, CN-Celeb) without broad multilingual or low-resource linguistic tests. The approach relies on lightweight LoRA fine-tuning rather than full model updates, which may cap the upper bound of speaker representation capacity. Furthermore, the generative QA formulation incurs higher computational inference overhead compared to traditional fixed-dimensional vector dot-product scoring backends.

## Why read this

Speech and ML engineers working on multimodal generative models should read this to understand how to adapt Audio Large Language Models for biometric speaker verification via prompt engineering and hard pair sampling without sacrificing general audio understanding.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Unified conversational voice assistants that authenticate user identity simultaneously with spoken dialogue interaction, smart home security systems, and personalized multi-user interactive audio interfaces.

## Institutions / 機構

Shanghai Artificial Intelligence Laboratory, Nanjing University, Tsinghua University

**Funding / 經費:** Shanghai Artificial Intelligence Laboratory

## Related

- (link related pages by id as the wiki grows)
