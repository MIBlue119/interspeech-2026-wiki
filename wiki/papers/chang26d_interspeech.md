---
id: chang26d_interspeech
category: resources-evaluation
labels: [low-resource, dataset-or-benchmark-release]
institutions: ["Massachusetts Institute of Technology", "National Taiwan University", "National Taiwan University Artificial Intelligence Center of Research Excellence", "Academia Sinica", "National Yang Ming Chiao Tung University", "University of Southern California"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1511
pdf: https://www.isca-archive.org/interspeech_2026/chang26d_interspeech.pdf
---

# TaigiSpeech: A Low-Resource Real-World Speech Intent Dataset with Scalable Data Mining In-the-Wild

*Kai-Wei Chang, Yi-Cheng Lin, Huang-Cheng Chou, Wenze Ren, Yu-Han Huang, Yun-Shao Tsai, Chien-Cheng Chen, Yu Tsao, Yuan-Fu Liao, Shrikanth Narayanan, James Glass, Hung-yi Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/chang26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chang26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1511)

**Category:** `resources-evaluation` · **Labels:** `low-resource`, `dataset-or-benchmark-release`

**TL;DR** — TaigiSpeech is a new 6.1-hour spoken intent dataset of Taiwanese Hokkien from 21 elderly speakers covering 8 healthcare and home-assistant intents, exposing major domain gaps when models are trained purely on in-the-wild web data.

## Key contributions

- Introduces TaigiSpeech: 3,079 utterances across 8 intents (4 emergency, 4 functional) from 21 elderly speakers aged 54-78.
- Explores two unwritten/low-resource data mining pipelines: Mandarin subtitle keyword matching with LLM pseudo-labeling, and audio-visual cross-modal retrieval.
- Establishes comprehensive benchmarks evaluating lightweight CNNs, self-supervised speech models, and ASR+LLM cascades on domain adaptation and fine-tuning.

## Problem

Spoken language understanding (SLU) benchmarks heavily favor high-resource tongues like English, Mandarin, and French, while low-resource unwritten languages like Taiwanese Hokkien lack standardized orthographies and domain-specific corpora. This shortfall severely impacts elderly populations—who predominantly speak Hokkien in regions like Taiwan—leaving them vulnerable during health emergencies due to the absence of robust voice-activated health and home-assistance interfaces. Prior approaches struggle because supervised data is scarce, and models trained on auxiliary web sources (such as TV dramas) suffer from severe domain mismatch when deployed on real-world elderly acoustic styles.

## Method

The TaigiSpeech dataset was captured via a custom web application featuring a pre-recording ambient noise level check (using a 1-second silent audio buffer) to ensure acoustic quality, yielding 3,079 mono audio files at 48 kHz (averaging 7.15 seconds per utterance). To augment data without direct text annotations, the authors investigate two scalable mining setups from a 7,000-hour Taiwanese drama pool: (1) Keyword Match Mining using Mandarin pivot subtitles filtered by Gemini-3 LLM pseudo-labeling across 10+ intent-specific keywords per class, and (2) Audio-Visual Mining utilizing the PE-AV large cross-modal encoder to align video streams and intent embeddings in a shared space without text supervision. Downstream models include MatchboxNet variants (69k to 119k parameters) and SSL speech backbones (HuBERT and WavLM base/large variants), trained via cross-entropy objectives and evaluated under zero-shot transfer, task-specific fine-tuning (Taigi-adapt with 1,600 utterances), and cascaded ASR+LLM pipelines (Whisper or Qwen3-ASR coupled with Qwen3-8B).

Inference benchmarking evaluates 5-class emergency/functional categories, binary classification, and full 8-class intent categorization. The primary design choice to leverage multi-modal and cross-lingual pivot methods stems from the complete absence of a universally accepted orthography or large transcribed speech corpora for Taiwanese Hokkien, necessitating indirect supervision strategies to bootstrap model training.

## Experimental setup

Experiments utilize the TaigiSpeech corpus (6.1 hours, 3,079 utterances, 21 speakers) partitioned into a 6-speaker test set (960 samples, balanced across age and gender) and a 10-speaker training adaptation pool (1,600 samples). Mined datasets from television dramas provide roughly 28k clips for pre-training. Baselines evaluated span MatchboxNet (S, M, L), HuBERT (Base, Large), WavLM (Base, Base-plus, Large), Whisper (Base to Large-v3), and Qwen3-ASR (0.6B, 1.7B) paired with Qwen3-8B. Metrics reported are classification accuracy (%) computed with bootstrapping confidence intervals and confusion matrices.

## Results

Direct zero-shot transfer from mined drama data to real elderly speech yields significant degradation: WavLM-large drops from 92.36% on the Drama test set to 70.00% on TaigiSpeech for the 5-class setting, and HuBERT-base falls from 89.60% to 67.92%. Audio-visual mining under zero-shot transfer yields near-random accuracy (~52-54% binary), revealing that weak multi-modal supervision fails to capture fine-grained semantic distinctions without target-domain adaptation. However, when models undergo Taigi-adapt fine-tuning using just 1,600 in-domain utterances, performance rebounds sharply: WavLM-base-plus reaches 90.21% and HuBERT-base hits 90.10% on the 8-class task. End-to-end SSL classifiers substantially outperform cascaded foundation models (e.g., Whisper-large-v3 + Qwen3-8B achieves only 34.38% accuracy, and Qwen3-ASR 1.7B + Qwen3-8B reaches 74.48%), highlighting the efficacy of direct speech representation learning over error-prone text pipelines.

| System / Condition | # Params | Accuracy (%) | | :--- | :--- | :--- | | Whisper-large-v3 + Qwen3-8B (Cascade) | 1.55B + 8B | 34.38 | | Qwen3-ASR 1.7B + Qwen3-8B (Cascade) | 1.7B + 8B | 74.48 | | MatchboxNet-M (Taigi-adapt, 8-class) | 85k | 33.33 | | HuBERT-base (Taigi-adapt, 8-class) | 94M | 90.10 | | WavLM-base-plus (Taigi-adapt, 8-class) | 94M | 90.21 |

## Limitations

The dataset is currently limited to 21 speakers and 6.1 hours of audio, restricting deep speaker-independent generalization across diverse dialects. Audio-visual mining fails to separate fine-grained emergency categories (such as distinguishing breathing distress from physical falls) under weak supervision, resulting in near-random zero-shot performance. Furthermore, lightweight models struggle severely on the task (MatchboxNet peaking near 33% accuracy post-adaptation), demonstrating that resource-constrained on-device deployment remains a major bottleneck.

## Why read this

Speech researchers and engineers building voice assistants for low-resource or unwritten languages should read this paper to understand the limitations of cross-lingual web-mined data and to utilize the first publicly available elderly-focused Taiwanese Hokkien intent dataset.

## Code

- https://kwchang.org/taigispeech

## Applications

Smart home emergency response systems, elderly care monitoring, hands-free assistive home devices, and spoken language understanding tools for low-resource dialects.

## Institutions / 機構

Massachusetts Institute of Technology, National Taiwan University, National Taiwan University Artificial Intelligence Center of Research Excellence, Academia Sinica, National Yang Ming Chiao Tung University, University of Southern California

**Funding / 經費:** National Science and Technology Council, Ministry of Education, National Science Foundation, Intelligence Advanced Research Projects Activity

## Related

- (link related pages by id as the wiki grows)
