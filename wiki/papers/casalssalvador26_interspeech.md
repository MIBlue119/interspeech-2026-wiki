---
id: casalssalvador26_interspeech
category: speech-emotion-recognition
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1907
pdf: https://www.isca-archive.org/interspeech_2026/casalssalvador26_interspeech.pdf
---

# How Attention Shapes Emotion: A Comparative Study of Attention Mechanisms for Speech Emotion Recognition

*Marc Casals-Salvador, Federico Costa, Rodolfo Zevallos, Javier Hernando*

[PDF](https://www.isca-archive.org/interspeech_2026/casalssalvador26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/casalssalvador26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1907)

**TL;DR** — This paper presents a systematic benchmark of optimized, sub-quadratic attention mechanisms (RetNet, LightNet, GSA, FoX, and KDA) for Speech Emotion Recognition, revealing that while standard softmax attention achieves the best generalizability on evaluation tests, efficient variants reduce inference latency and GPU memory by up to an order of magnitude on long sequences.

## Key contributions

- Carries out the first systematic evaluation of efficient, linear/recurrent attention mechanisms (RetNet, LightNet, GSA, FoX, KDA) specifically for Speech Emotion Recognition (SER).
- Establishes a unified multimodal framework concatenating frozen SSL speech and text features (WavLM/Wav2Vec2/HuBERT/Wav2Vec2-XLSR + BERT/RoBERTa/ModernBERT) with a fixed 20M-parameter seq2seq fusion module.
- Quantifies the accuracy vs. efficiency trade-off across MSP-Podcast v1.0 and v2.0 datasets (Test1 and Test2 splits).
- Demonstrates that efficient attention operators reduce peak memory and latency by up to 37.6x and 8.15x respectively for 400-second sequences compared to standard softmax attention.

## Problem

Standard softmax self-attention (SA) models long-range dependencies in speech emotion recognition effectively, but its quadratic O(L^2) computational and memory complexity hinders scalability for long-duration audio signals. Prior work almost exclusively focuses on recognition accuracy while ignoring computational footprints like inference speed and peak memory consumption. This omission makes standard models impractical for resource-constrained or real-time deployment environments, necessitating a thorough empirical comparison of modern linear and recurrent attention alternatives.

## Method

The proposed architecture takes raw audio waveforms and tokenized text, passing them through pretrained, frozen feature extractors (producing hidden size D = 1024) to create a combined sequence representation U in R^(L x D) where L = M + N. This sequence is processed by a sequence-to-sequence attention module M_theta (using 4 heads, dropout of 0.4) whose design is swapped between Softmax Attention, RetNet, LightNet, Gated Slot Attention (GSA), Forgetting Transformer (FoX), and Kimi Delta Attention (KDA). The resulting hidden vector is aggregated via a trainable attention-pooling parameter and passed to a classifier consisting of dropout, GELU activation, and layer normalization to predict one of eight categorical emotions.

All models share approximately 20M trainable parameters inside the seq2seq, pooling, and classification blocks, sitting atop ~635M frozen parameters from large pretrained encoders. Training uses AdamW with a learning rate of 1e-4 (halved every 5 epochs without validation improvement), batch size 32, and 20 epochs on 5.5-second audio crops. Evaluation processes full-length audio files with batch size 1 using Flash Linear Attention on four NVIDIA H100 GPUs.

## Experimental setup

Evaluated on MSP-Podcast v1.0 (Dev set) and MSP-Podcast v2.0 (Test1 following retrieval-based natural distribution, and Test2 control split without emotion-based retrieval). Compared against dataset baseline models using simple fully connected classification heads. Evaluation metric is Macro F-score to handle severe class imbalance, alongside seq2seq inference latency (ms) and peak GPU memory (GB) measured across variable sequence lengths (up to 400s).

## Results

On the development set using Wav2Vec2-XLSR, LightNet achieves the top single result with 38.11% Macro F-score and leads mean Dev performance across backbones at 36.62%, narrowly beating standard SA's 36.39%. However, on evaluation splits, standard SA generalizes best, yielding the highest mean on Test1 (36.42%) and Test2 (27.19%). FoX consistently places second (34.95% on T1, 25.31% on T2), whereas GSA exhibits severe instability on Test2 with a mean of 21.73%. 

Regarding computational efficiency, standard SA latency grows quadratically from 0.55 ms at 10s to 48.59 ms at 400s, whereas KDA finishes a 400s sequence in 5.96 ms (an 8.15x speedup). Peak GPU memory for SA surges to 12.35 GB at 400s, while efficient alternatives stay below 1.50 GB, with FoX achieving the lowest memory footprint at 0.328 GB (37.6x reduction).

| Mechanism | Dev (Mean) | Test1 (Mean) | Test2 (Mean) |
|---|---|---|---|
| Baseline | - | 20.6% - 28.5% | 15.6% - 19.2% |
| SA | 36.39% | **36.42%** | **27.19%** |
| RetNet | 34.92% | 34.30% | 24.59% |
| LightNet | **36.62%** | 33.93% | 25.19% |
| FoX | 35.88% | 34.95% | 25.31% |
| KDA | 33.50% | 32.97% | 24.46% |

## Limitations

Efficient attention variants trade off generalization performance on out-of-distribution evaluation splits (such as Test2) for runtime gains, underperforming compared to standard softmax attention. The study is limited to English-language corpora and the specific 8-class categorical emotion space of MSP-Podcast. Furthermore, evaluation of latency and memory was isolated to the seq2seq module using a fixed speech feature extractor rather than end-to-end system benchmarking.

## Why read this

Speech and ML engineers building production-grade or real-time SER systems should read this paper to understand the exact latency-accuracy trade-offs of modern linear attention variants. It provides concrete empirical evidence on whether switching from softmax attention to mechanisms like FoX or LightNet is worth the drop in out-of-domain robustness.

## Code

- https://github.com/marccasals98/AttentionAlternatives

## Applications

Real-time speech emotion recognition, affective computing, conversational agents, and call center analytics.

## Related

- (link related pages by id as the wiki grows)
