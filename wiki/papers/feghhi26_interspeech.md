---
id: feghhi26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2947
pdf: https://www.isca-archive.org/interspeech_2026/feghhi26_interspeech.pdf
---

# Lightbeam: An Accurate and Memory-Efficient CTC Decoder for Speech Neuroprostheses

[PDF](https://www.isca-archive.org/interspeech_2026/feghhi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/feghhi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2947)

**TL;DR** — LightBeam introduces a GPU-accelerated CTC decoder that integrates a large language model via delayed fusion into first-pass beam search, cutting decoder memory requirements from ~320 GB to ~10 GB while improving accuracy on speech neuroprosthesis benchmarks.

## Problem

State-of-the-art speech neuroprostheses decode cortical neural activity into text using Connectionist Temporal Classification (CTC) paired with massive weighted finite-state transducer (WFST) graphs and heavy 5-gram language models. Because these pipelines demand approximately 320 GB of RAM, local deployment on resource-constrained hardware is practically blocked, hindering patient privacy, increasing latency, and limiting accessibility. Building multi-modal LLM alternatives that completely bypass WFST decoding has also failed to match WFST performance due to limited neural dataset sizes.

## Method

LightBeam adapts the GPU-accelerated FlexCTC architecture to perform first-pass beam search without compiling large WFST graphs, replacing a massive 5-gram language model with a smaller 4-gram LM for shallow fusion and homophone tracking. Crucially, it incorporates an LLM (Llama 3.2 1B Base, fine-tuned on benchmark text distributions) directly into the beam search process at fixed time intervals via delayed fusion. The lexicon is represented as a state transition table rather than a trie to enable GPU parallelization across beams. It evaluates combinations using both baseline GRU encoders and time-masked Transformer encoders trained with CTC loss on intracranial Utah array recordings.

## Results

Evaluated on the Brain-to-Text '24 (B2T '24) and '25 (B2T '25) benchmark datasets, LightBeam achieves statistically significant Word Error Rate (WER) reductions compared to the baseline WFST decoders across 10 random seeds. For instance, on B2T '24 with a GRU encoder, LightBeam lowers WER to 9.37% compared to 9.71% for the re-implemented WFST baseline, and achieves 5.77% public / 6.47% private WER on B2T '25. Peak RAM consumption drops dramatically from ~318-322 GB down to ~10 GB, while average real-time factor (RTF) remains well below 1 on a GeForce RTX 5090 GPU.

## Code

- https://doi.org/10.5281/zenodo.20564139

## Applications

Engineers and clinical researchers building on-device, low-latency speech neuroprostheses for patients with severe speech production disorders such as dysarthria and anarthria.

## Limitations

Requires more frequent calls to an LLM during beam search, though average RTF remains under real-time operational thresholds.

## Related

- (link related pages by id as the wiki grows)
