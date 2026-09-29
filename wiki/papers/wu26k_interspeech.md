---
id: wu26k_interspeech
category: asr
labels: [efficient-on-device]
institutions: ["Harbin Institute of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2124
pdf: https://www.isca-archive.org/interspeech_2026/wu26k_interspeech.pdf
---

# Leveraging Temporal Redundancy via Layer-wise Key-Value Pooling Attention for Efficient ASR

*Yi Wu, Guibin Zheng, Chenhao Jing, Jiqing Han, Jiarui Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/wu26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2124)

**Category:** `asr` · **Labels:** `efficient-on-device`

**TL;DR** — The paper introduces Key-Value Pooling Attention (KV-Pooling) to mitigate self-attention quadratic complexity in ASR by downsampling Key and Value tensors via parameter-free average pooling while keeping Queries at full resolution. This achieves up to a 10% inference speedup (RTF) alongside absolute error reductions of 0.2% CER on AISHELL-1 and 0.3% WER on LibriSpeech.

## Key contributions

- Proposed Key-Value Pooling Attention (KV-Pooling) to decouple Query and Key/Value temporal resolutions, reducing attention time complexity from O(T^2) to O(T^2/s).
- Developed a Center Alignment Relative Positional Encoding strategy to correct granularity mismatches and maintain temporal geometric consistency across pooled windows.
- Designed a Layer-wise Differential Pooling strategy that assigns larger downsampling strides to redundant shallow layers and smaller strides to information-dense deep layers based on information entropy and cosine similarity analysis.
- Implemented causal and padding mask adaptations to ensure strict boundary handling and seamless integration into streaming ASR deployment.

## Problem

Transformer-based ASR models face severe memory and latency bottlenecks due to the quadratic O(T^2) complexity of standard self-attention over long speech sequences. Existing mitigation strategies, such as network depth reduction, macro-level input downsampling (e.g., Squeezeformer), or linear/sparse attention, either discard fine-grained acoustic boundary details (leading to temporal aliasing and accuracy degradation) or suffer from hardware inefficiency and poor long-range modeling. Furthermore, existing attention mechanisms ignore the extreme temporal redundancy inherent in speech—where phonemes span multiple similar frames—treating continuous speech with the same dense granularity required by discrete text.

## Method

The core KV-Pooling module takes input sequence representations and computes Key (K) and Value (V) matrices, which are then compressed along the temporal dimension using a parameter-free average pooling operator with a layer-wise stride s. This yields pooled KP and VP tensors of shape n x dk and n x dv (where n = ceil(T/s)), reducing dot-product complexity to O(T^2/s). Meanwhile, the Query (Q) tensor retains its original temporal resolution to precisely localize acoustic boundaries, and local pooling acts as an inductive bias that smooths feature distribution spikes in shallow layers.

Because standard Relative Positional Encoding (RPE) assumes identical temporal granularity, KV-Pooling breaks standard index alignment. To resolve this, the authors introduce a Center Alignment strategy that maps a pooled Key at index j back to the temporal center of its original window via j' = floor((j + 0.5) * s), ensuring the relative distance i - j' preserves true geometric consistency. For streaming inference, causal masking enforces that a pooled key is masked out if the query index i is strictly less than the right boundary of its pooling window (i < (j + 1) * s - 1), while padding masks invalidate any pooled token whose window contains padded elements.

To configure layer-wise strides, the authors analyze Zipformer (configured with downsampling rates {1, 1, 4, 4, 8, 8, 8, 2, 2}) by measuring inter-frame cosine similarity and information entropy across layers. Shallow layers (1-5) exhibit high similarity and low entropy (high compressibility), whereas deep layers maintain high semantic density. Guided by this, the authors adopt an optimal layer-wise differential pooling stride configuration of {4, 2, 1, 2} mapped across the 4 macro-stages of Zipformer, avoiding destructive over-compression in high-entropy layers while smoothing redundant representations.

## Experimental setup

Experiments were conducted on Mandarin AISHELL-1 (178 hours) and English LibriSpeech (960 hours) datasets using 80-dimensional Log-Mel spectrograms with SpecAugment and speed perturbation (0.9, 1.1 factors). The models were implemented within the Pruned RNN-T framework using two NVIDIA RTX 4090 D GPUs. Evaluations employed three scales of Zipformer (Small: 22.87M params, Medium: 40.49M params, Large: 52.17M params). Inference uses beam search with a width of 4, and Real-Time Factor (RTF) is evaluated using single-core batch size 1 on an AMD EPYC 7763 CPU averaged over 200 random test utterances.

## Results

On the AISHELL-1 test set, the KV-Pooling-Zipformer models consistently outperformed the baseline across all scales, lowering CER for Large from 6.58% to 6.35% (RTF improving from 0.1280 to 0.1121), Medium from 6.57% to 6.35%, and Small from 8.10% to 7.87%. On LibriSpeech, the Large model reduced test-other WER from 8.32% to 8.09% while improving clean WER (3.33% to 3.30%), and the Medium and Small models achieved marked robustness gains on test-other (improving from 8.54% to 8.26% and 9.63% to 9.33% respectively), despite minor cleaning set regressions due to temporal smoothing filtering out subtle phonetic details required by smaller-capacity models.

Ablation studies on AISHELL-1 confirmed that the differential stride configuration {4, 2, 1, 2} outperforms uniform fixed-strides like {2, 2, 2, 2} (which yielded 6.62% CER on Large) and monotonic strides like {4, 2, 1, 1}, proving that a moderate stride at deep tail stages effectively compresses sequence length without semantic loss. Furthermore, replacing parameter-free Average Pooling with learnable Convolutional Pooling caused severe overfitting and performance degradation on Zipformer-S, pushing CER up to 8.41% due to parameter sensitivity in redundant regions.

| Model Scale | Pooling Strategy | AISHELL-1 Test CER (%) | LibriSpeech Test-Other WER (%) | RTF (CPU) |
|---|---|---|---|---|
| Large | No (Baseline) | 6.58 | 8.32 | 0.1280 |
| Large | KV-Pooling (Avg, {4,2,1,2}) | 6.35 | 8.09 | 0.1121 |
| Medium | No (Baseline) | 6.57 | 8.54 | 0.1213 |
| Medium | KV-Pooling (Avg, {4,2,1,2}) | 6.35 | 8.26 | 0.1152 |
| Small | No (Baseline) | 8.10 | 9.63 | 0.0908 |
| Small | KV-Pooling (Avg, {4,2,1,2}) | 7.87 | 9.33 | 0.0889 |

## Limitations

The method acts as a temporal smoothing filter that can obscure subtle phonetic details in extremely clean speech when applied to smaller-capacity model architectures, resulting in minor clean-set accuracy regressions. The evaluation is currently restricted to Mandarin (AISHELL-1) and English (LibriSpeech) datasets within RNN-T transducer frameworks, leaving multi-lingual and attention-encoder-decoder (AED) sequence-to-sequence exploration as future work. Additionally, while causal masking is provided, strict end-to-end streaming deployment evaluations are deferred.

## Why read this

Speech and ML engineers building efficient, long-sequence end-to-end ASR systems should read this paper to learn how to decouple Query and Key/Value temporal resolutions using non-parametric pooling. It provides a concrete blueprint for replacing uniform downsampling with entropy-informed layer-wise differential pooling to achieve simultaneous gains in speed and accuracy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-latency streaming automatic speech recognition, on-device voice interfaces, and compute-constrained acoustic modeling environments.

## Institutions / 機構

Harbin Institute of Technology

## Related

- [AdaTS: Adaptive Token Sampling for Efficient Speech Language Models](sannigrahi26_interspeech.md) — shared technique · relatedness 2.2/3
- [Content-Aware Dynamic Compression for Efffcient Speech Recognition based on Large Language Model](zhu26_interspeech.md) — same problem · relatedness 2.0/3
- [Accelerating End-to-End ASR via Semi-Autoregressive Speculative Decoding](wu26g_interspeech.md) — same problem · relatedness 2.0/3
- [WAND: Windowed Attention and Knowledge Distillation for Efficient Autoregressive Text-to-Speech Models](lee26j_interspeech.md) — shared technique · relatedness 1.9/3
- [How Attention Shapes Emotion: A Comparative Study of Attention Mechanisms for Speech Emotion Recognition](casalssalvador26_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
