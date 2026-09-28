---
id: ghosh26e_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1316
pdf: https://www.isca-archive.org/interspeech_2026/ghosh26e_interspeech.pdf
---

# AnySimLite: A Lightweight Few-Shot Similarity Encoder for On-Device Speech-Adjacent Classification

[PDF](https://www.isca-archive.org/interspeech_2026/ghosh26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ghosh26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1316)

**TL;DR** — The paper introduces AnySimLite, a lightweight similarity encoder combining word and character channels to solve multiple speech-adjacent natural language classification tasks through nuanced text similarity, achieving competitive performance with minimal memory overhead.

## Problem

Deploying multiple specialized models on edge devices like smartphones for speech-adjacent natural language tasks creates an unsustainable memory footprint and latency burden. While many of these tasks—such as intent detection, sentiment analysis, and spam detection—can be unified under text similarity, traditional semantic similarity metrics fail to capture domain-specific nuances like out-of-vocabulary named entities or specific alignment rules. Developing a single, highly resource-efficient model that solves diverse classification tasks in a few-shot setting remains a critical gap for on-device applications.

## Method

The proposed AnySimLite architecture uses a dual-channel encoder containing a word-level channel with an attention layer and a character-level channel with a 1D convolution and global max pooling. To train this encoder without requiring massive datasets, the authors formulate a nuanced text similarity (NTS) framework and introduce a dataset transformation strategy that samples hard positive and negative pairs using PLM embeddings clustered via DBSCAN at an 8:2 intra-to-inter-cluster ratio. Ablation studies explore various configurations including binary classification models, Siamese networks, and origin clustering before identifying the optimal base model and its distilled deployment variant. The final deployment model requires only about 700K parameters and operates with low latency.

## Results

Evaluated across multiple public benchmark tasks and a curated event title similarity dataset (TitleSimCurated), AnySimLite achieves state-of-the-art or state-of-the-art-competitive few-shot performance. Across diverse problem statements, the model maintains an average accuracy degradation of only 2.24% compared to the best reported heavy baseline results. Notably, AnySimLite uses less than 1/250th of the model size of a SOTA qLLaMA LoRA-7B baseline while keeping performance drops under 7% in worst-case scenarios. The on-disk knowledge base footprint is roughly 700K parameters with an inference latency under 30 ms.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building on-device voice assistants, mobile applications, and edge SDK runtimes for intent detection, sentiment classification, spam filtering, and text matching.

## Limitations

The evaluation is currently bounded within classification tasks reducible to nuanced text similarity.

## Related

- (link related pages by id as the wiki grows)
