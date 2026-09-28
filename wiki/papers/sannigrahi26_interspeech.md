---
id: sannigrahi26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2753
pdf: https://www.isca-archive.org/interspeech_2026/sannigrahi26_interspeech.pdf
---

# AdaTS: Adaptive Token Sampling for Efficient Speech Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/sannigrahi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sannigrahi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2753)

**TL;DR** — AdaTS is a dynamic token sampling framework for speech language models that adaptively merges redundant speech tokens based on pairwise similarity, reducing sequence length by 2× on average while improving downstream task performance and cutting inference costs by 40%.

## Problem

Modern speech language models (SLMs) struggle with long-form audio tasks because traditional speech encoders generate thousands of tokens per minute, quickly exhausting transformer context windows due to quadratic attention complexity. Existing downsampling methods apply static, uniform pooling or convolutional compression indiscriminately across the entire audio stream, forcing a suboptimal trade-off by crushing fine-grained, content-critical phonetic details together with redundant background regions.

## Method

AdaTS introduces a score-and-merge token reduction mechanism operating directly on the output of a frozen pretrained speech encoder (Wav2Vec2Bert). It computes pairwise cosine similarities between consecutive feature vectors, grouping and merging sub-sequences where similarity exceeds a tuned threshold t into a single normalized, weighted representation. The training utilizes a standard two-stage pipeline: first aligning a linear projector between the frozen speech encoder and frozen LLM decoder using ASR data, followed by full fine-tuning of the decoder using an instruction-tuning data mix of roughly 80K hours covering ASR, SQA, and speech translation. The architecture experiments with small-scale open-source decoders including Qwen2.5 1.5B, Llama 3.2 1B, and EuroLLM 1.7B.

## Results

Evaluated across automatic speech recognition (LibriSpeech, VoxPopuli, FLEURS), speech question answering (Spoken SQuAD, SLUE SQA-5, LibriSQA), and speech translation (CoVoST-2, FLEURS), AdaTS consistently outperforms static downsampling and content-dependent baselines like FastLongSpeech. On Qwen2.5 1.5B, AdaTS achieves a LibriSpeech Clean WER of 2.9 (compared to 4.3 for vanilla LLaMA/Qwen baselines and 3.6 for standard pooling) and an SLUE SQA-5 frame-F1 score of 37.5. Ablations show that similarity-weighted averaging outperforms top-1 pruning or uniform averaging, and that applying the sampling module during both alignment and instruction tuning phases yields optimal performance. The approach achieves an average speech token compression ratio of roughly 1.76× (ranging up to 4.16× depending on the task).

## Code

- https://github.com/sonalsannigrahi/AdaTS

## Applications

Speech and ML engineers building real-time or long-form speech understanding systems, speech assistants, and multilingual translation tools will use AdaTS to fit extended audio clips into LLM context windows while lowering compute overhead.

## Related

- (link related pages by id as the wiki grows)
