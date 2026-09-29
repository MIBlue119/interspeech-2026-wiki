---
id: zhu26c_interspeech
category: asr
labels: [multilingual, efficient-on-device, self-supervised, streaming-real-time]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2455
pdf: https://www.isca-archive.org/interspeech_2026/zhu26c_interspeech.pdf
---

# Token-Independent Language Representations for Low-Latency Configurable Multilingual Speech Recognition

*Hongxu Zhu, Lahiru Samarakoon, Ivan Fung*

[PDF](https://www.isca-archive.org/interspeech_2026/zhu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2455)

**Category:** `asr` · **Labels:** `multilingual`, `efficient-on-device`, `self-supervised`, `streaming-real-time`

**TL;DR** — The paper introduces token-independent language representations for configurable multilingual automatic speech recognition, decoupling language identity from the autoregressive decoder to eliminate per-token inference overhead. This achieves accuracy parity with original mixture-of-experts/LSM designs while reducing peak inference latency by over 90% for long utterances.

## Key contributions

- Architectural efficiency: Replaces per-token neural language-specific modules (LSMs) in the decoder with token-independent representations, lowering per-step complexity from quadratic to linear relative to the hidden dimension.
- Encoder-informed adaptation (CMM-D): Fuses static learnable language vectors with utterance-level language features extracted from the top CTC-supervised encoder layer via global average pooling and a lightweight adapter.
- Parameter footprint reduction: Reduces the language-specific parameter cost from 0.13M parameters per language per layer down to 512 parameters per language vector (a 256x reduction for static components).
- Empirical validation: Demonstrates on both an 8-language imbalance MLS corpus and a balanced 4-language in-house dataset that the method maintains word error rate (WER) parity with original token-dependent CMM while yielding near-constant inference overhead.

## Problem

Configurable multilingual ASR models use language-specific modules (LSMs) to allow arbitrary user-selected language subsets at inference time, but executing these neural modules at every autoregressive step incurs a severe computational penalty that scales linearly with output token length. Prior configurable approaches like CMM couple language identity—a global utterance property—to the continuous per-token decoding loop, causing inference latency to blow up for long utterances. This creates a deployment bottleneck in latency-sensitive applications where managing separate models per language is already impractical.

## Method

The model is built on a Conformer-Transformer backbone using joint CTC-Attention decoding, equipped with a 12-layer encoder and a 6-layer decoder (hidden dimension d_model = 512, 8 attention heads, 2048 FFN units), with LSMs integrated into the first and last layers. To remove per-token decoding bottlenecks, the baseline decoder neural projections (which cost O(C * k * U * 2d^2)) are replaced with static token-independent language vectors (CMM-S), reducing the per-step cost to simple vector addition O(d_model). 

To restore capacity lost by dropping dynamic modeling, the authors introduce CMM-D, which extracts utterance-level cues from the top encoder LSM layer (positioned near the CTC loss) using global average pooling followed by a feed-forward adapter. Additionally, static capacity is expanded by extending each language vector into a matrix (size z x d_model, with bottleneck z = 128). These enhanced static vectors and dynamic encoder cues are fused via element-wise gating controlled by trainable weighting vectors. 

During training, user uncertainty is simulated by randomly injecting incorrect language IDs into the multi-hot prompt vector with probability p = 0.5. The multi-task objective combines CTC loss (weight 0.3) and attention cross-entropy loss (weight 0.7). Models are optimized using the Adam optimizer with gradient clipping and learning rate warmup for 70 epochs on a 2,000 subword vocabulary for MLS and 20,000 sentence pieces for the 4-language dataset.

## Experimental setup

Evaluated on ∼7K hours across 8 non-English and English languages from LibriSpeech and Multilingual LibriSpeech (MLS), alongside an in-house balanced 4-language corpus (Cantonese, Mandarin, English, Malay) with 3,000 hours per language. Compared against a universal multilingual baseline and the original Configurable Multilingual Model (CMM). Metrics include Word Error Rate (WER) under 'allhot' and 'onehot' prompt configurations, parameter counts, and total inference duration/latency across varying token lengths measured on an Intel Xeon CPU.

## Results

On the 8-language MLS corpus, CMM-D achieves an average WER of 8.70 (allhot) and 8.67 (onehot), exactly matching the original CMM performance of 8.70 and 8.69 while outperforming the universal multilingual baseline (9.26). On the balanced 4-language corpus, CMM-D achieves an average WER of 11.84 (allhot) and 11.60 (onehot), matching original CMM (11.83 / 11.60) and beating the baseline (12.29). In latency benchmarks for an 8-language model over 50 utterances, the original CMM adds +107.88s of overhead for long sequences (110-130 tokens), whereas CMM-S adds only +2.23s and CMM-D adds +7.34s, maintaining near-constant overhead regardless of output length.

| System | MLS (allhot) WER | MLS (onehot) WER | 4-Lang (allhot) WER | 4-Lang (onehot) WER | Long-Seq Overhead (110-130 tok) |
|---|---|---|---|---|---|
| Multilingual Baseline | 9.26 | - | 12.29 | - | +1208.62s |
| CMM [23] | 8.70 | 8.69 | 11.83 | 11.60 | +107.88s |
| CMM-S (Proposed) | 8.80 | 8.82 | 11.92 | 11.66 | +2.23s |
| CMM-D (Proposed) | 8.70 | 8.67 | 11.84 | 11.60 | +7.34s |

## Limitations

The effectiveness of language-specific specialization heavily depends on the absolute volume of training data per language; low-resource languages in imbalanced datasets (e.g., Polish and Portuguese in MLS) show minimal or negative gains from explicit onehot prompting. The evaluation is limited to a maximum of 8 languages per model configuration and relies partly on an unreleased in-house dataset for the code-switching/balanced evaluation.

## Why read this

Speech and ML engineers scaling multilingual speech recognition systems to handle configurable user prompts will learn how to completely eliminate autoregressive decoding latency bottlenecks without sacrificing accuracy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device and cloud-based multilingual speech recognition systems requiring low-latency configurable language subset selection.

## Institutions / 機構

Fano

## Related

- (link related pages by id as the wiki grows)
