---
id: weller26_interspeech
category: resources-evaluation
labels: [self-supervised, dataset-or-benchmark-release]
institutions: ["University of St. Gallen"]
code: https://huggingface.co/datasets/nwllr/haessigDB
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3304
pdf: https://www.isca-archive.org/interspeech_2026/weller26_interspeech.pdf
---

# HaessigDB: A Database of Irritable Speech with Intensity Grading

*Niklas Weller, Marc Grau, Ivo Blohm*

[PDF](https://www.isca-archive.org/interspeech_2026/weller26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/weller26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3304)

**Category:** `resources-evaluation` · **Labels:** `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — HaessigDB is a curated database of 1,068 acted customer service speech snippets annotated with ordinal intensity ratings (1-10) for annoyance, frustration, and aggression, preserving temporal dialogue trajectories. Fine-tuning pretrained speech encoders like XLSR-wav2vec on this dataset achieves a Pearson correlation of r = 0.710 for aggression intensity prediction.

## Key contributions

- Introduces HaessigDB, an audio corpus specifically targeting service-domain irritability across three dimensions: annoyance, frustration, and aggression.
- Provides ordinal intensity ratings (1-10) rather than binary labels, capturing graded affective states essential for escalation management.
- Preserves temporal ordering within simulated banking call scripts to support trajectory modeling and early escalation detection.
- Releases high-agreement subsets curated via Krippendorff's alpha (alpha >= 0.80) to mitigate label noise and class imbalance.

## Problem

Existing speech emotion recognition datasets like Emo-DB, IEMOCAP, and RAVDESS are designed for broad categorical emotion recognition, lack service-domain context, and omit intensity ratings. In practice, binary or coarse labels are insufficient for conversational agents needing to make nuanced intervention or human-transfer decisions. Without graded and temporally evolving affect signals, voicebots cannot reliably detect early breakdown risk before conversations completely deteriorate.

## Method

HaessigDB was constructed using 45 synthetically generated banking call transcripts designed to escalate in irritability, recorded by four professional voice actors hired via Upwork. The resulting audio was segmented into sentence-level snippets (mean length 3.91s, std 2.13s) and rated by 374 Prolific annotators on ordinal 1-10 scales for annoyance, frustration, and aggression. To ensure annotation quality, snippets were iteratively pruned until Krippendorff's alpha reached alpha >= 0.80, resulting in high-agreement subsets of 553 (annoyance), 537 (frustration), and 516 (aggression) snippets.

For downstream modeling, pretrained speech encoders (HuBERT and XLSR-wav2vec) were adapted using Low-Rank Adaptation (LoRA) combined with a simple linear regression head to predict scalar intensity scores. Models were trained for 5 epochs using a batch size of 4 and a learning rate of 1x10^-4 on an NVIDIA T4 GPU. This parameter-efficient fine-tuning adapts transformer backbones to output continuous ordinal values, overcoming the flat threshold-sweep behaviors observed in off-the-shelf categorical SER models.

## Experimental setup

The dataset contains 1,068 raw audio snippets and curated high-agreement subsets ranging from 516 to 553 samples per emotion dimension, plus inner (250 snippets) and outer (832 snippets) join variants. Baselines included five popular Hugging Face SER models (harshit345/xlsr-wav2vec, Rajaram1996/Hubert, speechbrain/emotion-recognition-wav2vec2-IEMOCAP, ehcalabres/wav2vec2-lg-xlsr-en, and firdhokk/whisper-large-v3). Evaluation metrics include Mean Absolute Error (MAE), Pearson correlation coefficient (r), and threshold-sweep recall curves.

## Results

Off-the-shelf Hugging Face models failed to track graded intensity, exhibiting nearly flat recall curves across different threshold sweeps for aggression. When fine-tuned using LoRA on an 80/20 random split of the aggression subset, XLSR-wav2vec achieved an MAE of 1.333 and a Pearson correlation of r = 0.710, outperforming HuBERT which scored an MAE of 1.502 and r = 0.607. Fine-tuned models successfully aligned with human-perceived aggression thresholds, demonstrating that the corpus contains a learnable acoustic signal.

| System / Condition | MAE (Aggression) | Pearson Correlation (r) |
|---|---|---|
| HuBERT (LoRA Fine-tuned) | 1.502 | 0.607 |
| XLSR-wav2vec (LoRA Fine-tuned) | 1.333 | 0.710 |

## Limitations

The dataset is limited to English-speaking voice actors covering a single simulated banking customer-service domain, which may restrict cross-domain and cross-lingual generalizability. The evaluation relies on a random 80/20 split rather than a speaker-disjoint split, meaning out-of-sample speaker generalizability remains unverified. Furthermore, the total scale is relatively small (~500 curated snippets per dimension), and data was gathered from acted rather than authentic live service calls.

## Why read this

Researchers and engineers building escalation-aware conversational agents or voicebots should read this paper to understand how to operationalize and model graded, temporally evolving irritability in speech. It offers a concrete open-source resource (HaessigDB) and demonstrates how to adapt pretrained speech transformers for continuous intensity regression.

## Code

- https://huggingface.co/datasets/nwllr/haessigDB

## Applications

Automated customer service call routing, proactive voicebot escalation management, and customer frustration tracking.

## Institutions / 機構

University of St. Gallen

**Funding / 經費:** Innosuisse

## Related

- [A Large-Scale Dataset of Listener Impressions of Emotional TTS](cooper26_interspeech.md) — shared data / evaluation · relatedness 2.0/3
- [From Game-Based Annotation to Representation Probing: Cross-Validated Prosodic Speech and Privacy Implications](sepanta26_interspeech.md) — shared data / evaluation · relatedness 2.0/3
- [Comparative Reasoning: Making an Audio Language Model Better at Comparing Emotions](naini26_interspeech.md) — complementary · relatedness 1.9/3
- [The False Resonance: A Critical Examination of Emotion Embedding Similarity for Speech Generation Evaluation](tsai26_interspeech.md) — complementary · relatedness 1.9/3
- [How Language-Independent Are Emotional Attributes? A Study on Training Data Scaling and Cross-Lingual Generalization](halmai26_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
