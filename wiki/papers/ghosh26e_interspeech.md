---
id: ghosh26e_interspeech
category: applications-other
labels: [low-resource, efficient-on-device]
institutions: ["Samsung"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1316
pdf: https://www.isca-archive.org/interspeech_2026/ghosh26e_interspeech.pdf
---

# AnySimLite: A Lightweight Few-Shot Similarity Encoder for On-Device Speech-Adjacent Classification

*Sourav Ghosh, Yash Bhatia, Keshav Goyal, Sahil Singh Bagri, Mohamed Akram Ulla Shariff, Saravana Balaji Shanmugam*

[PDF](https://www.isca-archive.org/interspeech_2026/ghosh26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ghosh26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1316)

**Category:** `applications-other` · **Labels:** `low-resource`, `efficient-on-device`

**TL;DR** — ANYSIMLITE is a lightweight similarity encoder combining word and character embedding channels that solves diverse speech-adjacent text classification tasks via reduction to nuanced text similarity (NTS). It achieves state-of-the-art competitive performance in few-shot settings while using less than 1/2500th of the parameters of a large LoRA baseline.

## Key contributions

- Proposes a lightweight dual-channel (word and character) encoder architecture optimized for on-device nuanced text similarity (NTS).
- Demonstrates how multiple speech-adjacent NLP classification tasks can be unified and solved via problem reduction to NTS in a few-shot setting.
- Introduces a novel dataset transformation technique utilizing pretrained language models and DBSCAN clustering to sample hard pairs for robust training.
- Curates the 'TitleSimCurated' toy dataset featuring 14 event categories to validate non-obvious entity- and event-matching constraints.

## Problem

Modern edge devices like smartphones require numerous specialized models for natural language and intent classification, leading to excessive memory footprints, storage overhead, and elevated inference latency. While traditional text similarity relies on generic semantic embeddings or naive token matching, they fail to capture domain-specific nuances such as out-of-vocabulary named entities or specific categorical alignments (e.g., sentiment or spam criteria). Prior heavy models like qLLaMA-LoRA-7B or massive BERT architectures are too compute- and memory-intensive for efficient on-device execution. Addressing this requires a unified, lightweight, and commutative similarity formulation that can handle diverse classification tasks without dedicated heavy models.

## Method

The architecture of ANYSIMLITE comprises two distinct channels: a word embedding channel followed by a BiLSTM layer and an attention mechanism to capture semantic context and token importance, and a character embedding channel followed by a Conv1D layer and global max pooling to robustly handle out-of-vocabulary (OOV) named entities. The outputs from both channels are concatenated, passed through a dense projection layer, and normalized using L2 normalization to produce a compact document embedding. Similarity between two documents is computed via the cosine similarity of their respective embeddings, naturally preserving the commutative property.

To train this encoder, classification datasets are transformed into pairs of documents using a pretrained language model combined with DBSCAN clustering. By clustering document embeddings, the pipeline samples intra-cluster and inter-cluster dissimilar pairs at an 8:2 ratio to guarantee that negative pairs include hard examples (dissimilar yet sharing broad contextual traits) rather than trivially dissimilar texts. A knowledge-distilled deployment variant (B8, based on MiniLM-style structures) is also explored to optimize memory.

At inference time, the model computes query embeddings in O(1) relative to the database size when exemplar embeddings are precomputed, maintaining an end-to-end latency below 30 ms on edge hardware.

## Experimental setup

Experiments are conducted on an NVIDIA RTX A6000 GPU with 48 GB memory. Evaluated datasets include the custom TitleSimCurated, Quora Question Pairs, Sentiment-140, IMDB Movie Reviews, SNIPS, ATIS, SMS Spam Collection, AG News, and Toxic Comment datasets, covering 2 to 6 classes depending on the task. Baselines span traditional BERT models, sentence transformers, RoBERTa-BiLSTM, and qLLaMA-LoRA-7B. Evaluation metrics include Accuracy, F1-score, Precision, Recall, and ROC, utilizing a few-shot setting with 20 exemplar samples per class.

## Results

ANYSIMLITE achieves competitive performance across diverse benchmarks while operating at a fraction of baseline parameter sizes. On the SMS Spam Collection dataset, it outperforms competing methods with an F1-score of 97.50% and accuracy of 99.28% using only 0.47M parameters. On the custom TitleSimCurated dataset, ANYSIMLITE achieves an accuracy of 88.73%, surpassing sentence transformer and BERT baselines. Across all evaluated tasks, the average accuracy degradation remains within 2.24% relative to the best reported heavy models, while model size is kept around 0.1M to 3.6M parameters. It exhibits larger performance drops on complex multi-class topic and toxicity classification tasks, such as AG News (91.12% vs 95.50% for Yang et al.) and Toxic Comment (94.20% ROC vs 98.86% for Toxic Crusaders), where subtle multi-label nuances exceed the capacity of a lightweight pairwise similarity reduction.

| System / Condition | #Params | Accuracy / Metric |
|---|---|---|
| TitleSimCurated (BERT) | 108M | 75.39 (Acc) |
| TitleSimCurated (MiniLM L6-v2) | ~20M | 86.14 (Acc) |
| TitleSimCurated (ANYSIMLITE) | 0.1M | **88.73** (Acc) |
| SMS Spam Collection (Liu et al.) | - | 96.13 (F1) / 98.92 (Acc) |
| SMS Spam Collection (ANYSIMLITE) | 0.47M | **97.50** (F1) / **99.28** (Acc) |
| AG News (Yang et al.) | - | **95.50** (Acc) |
| AG News (ANYSIMLITE) | 1.3M | 91.12 (Acc) |

## Limitations

The evaluation is restricted to classification tasks, leaving regression and generation tasks unexplored. Performance on highly granular multi-class topic and toxicity classification tasks shows noticeable degradation compared to multi-million parameter models. The approach relies on a fixed set of few-shot exemplars per class, which can limit generalization if the exemplar pool does not span diverse real-world edge demographics.

## Why read this

Speech and ML engineers building on-device voice assistants or OEM applications should read this to learn how to collapse dozens of specialized classification heads into a single lightweight similarity encoder, drastically reducing memory footprint without sacrificing few-shot accuracy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device intent detection, spam filtering, sentiment analysis, and few-shelf document classification for mobile voice assistants and edge SDK runtimes.

## Institutions / 機構

Samsung

## Related

- [Scaling few-shot spoken word classification with generative meta-continual learning](beyers26_interspeech.md) — same problem · relatedness 1.8/3
- [MambAdapter: Lightweight Mamba-Based Adapters for Parameter-Efficient Transfer Learning in Speech and Audio](ali26b_interspeech.md) — same problem · relatedness 1.8/3
- [Similarity as Evidence: An Explainable Siamese Framework for Snore Sound Classification](meng26f_interspeech.md) — shared technique · relatedness 1.8/3
- [Bridging Languages and Modalities: Lightweight Cross-Lingual Text and Speech Summarization for Low-Resource Scenarios](chellaf26_interspeech.md) — same problem · relatedness 1.8/3
- [Task-Aware Joint Pruning and Distillation for Efficient Audio Deepfake Detection](he26f_interspeech.md) — relatedness 1.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
