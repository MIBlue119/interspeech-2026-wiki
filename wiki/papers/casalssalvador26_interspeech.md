---
id: casalssalvador26_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1907
pdf: https://www.isca-archive.org/interspeech_2026/casalssalvador26_interspeech.pdf
---

# How Attention Shapes Emotion: A Comparative Study of Attention Mechanisms for Speech Emotion Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/casalssalvador26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/casalssalvador26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1907)

**TL;DR** — This paper benchmarks efficient sequence-to-sequence attention mechanisms for speech emotion recognition, demonstrating that optimized variants reduce latency and memory usage by up to an order of magnitude while suffering a minor drop in accuracy compared to standard softmax attention.

## Problem

Standard softmax self-attention in speech emotion recognition models incurs quadratic computational and memory complexity with respect to sequence length, creating bottlenecks for long audio recordings and resource-constrained environments. Although various efficient attention mechanisms have been proposed in general machine learning, prior SER research has overwhelmingly focused on standard transformers, leaving a gap in understanding how these scalable alternatives perform on emotional speech tasks. Addressing this trade-off is critical for deploying practical, low-latency SER systems in real-world interactive applications.

## Method

The study evaluates five efficient attention variants—RetNet, LightNet, Gated Slot Attention (GSA), Forgetting Transformer (FoX), and Kimi Delta Attention (KDA)—against standard softmax self-attention (SA) within a unified multimodal SER framework. Audio and text inputs are processed by frozen large self-supervised feature extractors (such as WavLM, Wav2Vec2, HuBERT, and BERT-like text models) to yield 1024-dimensional embeddings, which are concatenated and fed into a seq2seq module powered by the tested attention mechanism. An attention pooling layer and a multi-layer classifier then map the representations to an 8-class emotional prediction. All models are configured with approximately 20 million trainable parameters (out of 655 million total) and trained using the AdamW optimizer for 20 epochs.

## Results

Evaluated on the MSP-Podcast corpus (versions 1.0 and 2.0) using Macro F-score, standard softmax attention achieves the highest recognition performance across most backbones (e.g., averaging around 27.3% to 37.04% depending on the split and SSL setup). Among efficient variants, RetNet and GSA closely track standard SA's accuracy while delivering massive efficiency gains. For sequence lengths reaching 400 seconds, SA inference latency balloons to 48.59 ms and peak GPU memory reaches 12.35 GB, whereas efficient alternatives like KDA drop latency to 5.96 ms (an 8.15x speedup) and FoX restricts memory consumption to 0.328 GB (a 37.6x reduction).

## Code

- https://github.com/marccasals98/AttentionAlternatives

## Applications

Speech and ML engineers designing real-time, on-device, or resource-constrained speech emotion recognition systems for human-computer interaction.

## Limitations

The evaluation focuses exclusively on fusion-stage sequence-to-sequence architectures using frozen pretrained feature extractors on the MSP-Podcast dataset.

## Related

- (link related pages by id as the wiki grows)
