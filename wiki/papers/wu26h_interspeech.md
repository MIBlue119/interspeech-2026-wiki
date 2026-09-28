---
id: wu26h_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1985
pdf: https://www.isca-archive.org/interspeech_2026/wu26h_interspeech.pdf
---

# SongBench: A Fine-Grained Multi-Aspect Benchmark for Song Quality Assessment

[PDF](https://www.isca-archive.org/interspeech_2026/wu26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1985)

**TL;DR** — SongBench introduces a fine-grained, multi-aspect benchmark and expert-annotated dataset comprising 11,717 song samples to evaluate text-to-song generative models across seven distinct dimensions.

## Problem

Existing song evaluation metrics and benchmarks suffer from high semantic overlap, rating compression, and a ceiling effect where modern models cluster at the top, making it difficult to measure subtle artistic differences. Because objective metrics fail to capture aesthetic nuances, reliable assessment requires specialized human or automated evaluation frameworks that isolate specific musical components.

## Method

The framework establishes seven atomic dimensions: Vocal, Instrument, Melody, Structure, Arrangement, Mixing, and Musicality. Data was collected using 4,000 Hunyuan LLM-generated lyrics and 384 prompts, producing 20,000 audio samples from commercial models like Suno, open-source architectures like LeVo and SongBloom, and professional references. Experts were rigorously filtered through qualitative ranking and quantitative calibration (Pearson correlation and gap scores) to form a trusted annotation panel. The automated predictor leverages the pre-trained MuQ self-supervised backbone for musical representation extraction and is trained using AdamW with a cosine annealing learning rate on 8 NVIDIA A100 GPUs.

## Results

Evaluated on an out-of-distribution (OOD) test set, the proposed predictor achieves strong utterance-level LCC and SRCC scores exceeding 0.78 for Melody, Arrangement, and Musicality, and high system-level LCCs above 0.95 across dimensions. For instance, the Instrument dimension achieves a low utterance-level MAE of 0.528, confirming precise absolute score estimation. In AB tests for fine-grained discernment, the proposed benchmark consistently outperforms baseline SongEval frameworks in identifying subtle preference gaps between advanced generative systems.

## Code

- https://github.com/Tencent/SongBench

## Applications

Speech and ML engineers building or fine-tuning text-to-song generation models can use this evaluation toolkit and dataset to benchmark performance, diagnose dimensional weaknesses, and steer model development.

## Related

- (link related pages by id as the wiki grows)
