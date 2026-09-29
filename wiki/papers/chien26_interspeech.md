---
id: chien26_interspeech
category: asr
institutions: ["National Yang Ming Chiao Tung University", "Industrial Technology Research Institute"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1708
pdf: https://www.isca-archive.org/interspeech_2026/chien26_interspeech.pdf
---

# Attentive Mamba: Channel-wise Local Attention for Speech Recognition

*Jen-Tzung Chien, Fan-Che Feng, Ching-Hsien Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/chien26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chien26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1708)

**Category:** `asr`

**TL;DR** — Attentive Mamba integrates causal channel-wise local attention into state-space models to replace static convolutions, achieving superior speech recognition accuracy with fewer parameters than Conformer baselines.

## Key contributions

- Replaces the content-agnostic static convolutional local aggregation in Mamba2 with a causal, channel-wise local self-attention mechanism.
- Formulates a contextualized projection using individual causal depth-wise convolutions to generate channel-specific queries, keys, and values before cross-channel attention.
- Implements a bidirectional attentive Mamba architecture that jointly optimizes non-autoregressive CTC and autoregressive AED losses.
- Demonstrates consistent word error rate (WER) reductions on both read (LibriSpeech) and spontaneous (TED-LIUM v3) speech benchmarks while using fewer parameters than comparable Conformer models.

## Problem

While Transformers excel at content-based global interactions, they suffer from quadratic computational complexity with respect to sequence length. Conversely, State Space Models (SSMs) like Mamba offer linear-time complexity and strong global context modeling, but their selection mechanisms rely on static depth-wise convolutions for local information processing. This static local aggregation lacks the content-aware adaptability needed to effectively parameterize state transitions for expressive speech representation. This architectural gap motivates a hybrid approach combining SSMs with dynamic local feature extraction.

## Method

The proposed attentive Mamba block replaces the static convolutional projection of Mamba2 with a causal convolutional channel-wise self-attention layer. First, individual causal depth-wise convolutions with learnable kernels W in R^{C x w} (where C is channels and w is local window size) are applied to contextualize row-wise queries (q), keys (k), and values (v) for each dimension independently. Subsequently, cross-channel attention operates over a recent causal temporal window of width w=4, computing dot products between full-dimensional vectors to produce dynamic, content-aware context vectors U.

These attended representations parameterize the element-wise SSM state recurrence matrices (A, B, C) for each time step t and channel c. The encoder uses a bidirectional architecture to exploit full temporal context. The model is jointly optimized via multi-task training using a combination of connectionist temporal classification (CTC) loss L_ctc, attention-based encoder-decoder (AED) cross-entropy loss L_aed, and an external language model (LM) rescoring loss L_lm based on 4-grams (combined empirically as 0.3 L_ctc + 0.5 L_aed + 0.2 L_lm).

## Experimental setup

Evaluated on the 960-hour LibriSpeech corpus (dev-clean, dev-other, test-clean, test-other) and the 450-hour TED-LIUM v3 spontaneous speech dataset. Input features are 80-dimensional log-Mel filterbanks extracted with a 25 ms window and 10 ms shift, preceded by a 2-layer 2D CNN subsampling module. Compared against Conformer-CTC, baseline Mamba2, wav2vec-base, HuBERT-base, and WavLM-base. Model configurations include Small (256 hidden dims, 18 encoder layers) and Large (512 hidden dims, 18 layers) variants, utilizing an SSM state dimension N=64 and attention window w=4.

## Results

On LibriSpeech test-other using CTC decoding, the small attMamba-CTC (21.2M params) achieves a WER of 12.31%, outperforming the conformer-CTC baseline (30.0M params, 12.57% WER). Under the advanced setting with CTC+AED and 4-gram LM rescoring on the large model configuration, attMamba+lm achieves state-of-the-art test-clean and test-other WERs of 2.73% and 6.02% respectively, while maintaining a smaller footprint (65.1M params) than large conformer models (118.0M params). Ablation studies confirm that adding bidirectionality drops test-other WER from 22.89% (Mamba2 baseline) to 15.69%, and replacing the static convolution with channel-wise attention further improves it to 12.31%.

| System | #Params (M) | Test-Clean | Test-Other |
|---|---|---|---|
| conformer-CTC (S) | 30.0 | 6.59 | 12.57 |
| attMamba-CTC (S) | 21.2 | 6.24 | 12.31 |
| conformer-CTC (L) | 78.9 | 8.22 | 8.22 |
| attMamba-CTC (L) | 61.3 | 6.88 | 6.88 |
| attMamba+lm (L) | 65.1 | 4.98 | 4.98 |

## Limitations

The evaluation is restricted to English ASR datasets (LibriSpeech and TED-LIUM v3), leaving multilingual and low-resource generalizability unverified. The model relies on bidirectional processing, which prevents strictly streaming or low-latency online speech recognition without architectural modifications. Additionally, the computational overhead of the channel-wise attention compared to purely hardware-accelerated linear SSM scans is not explicitly profiled.

## Why read this

Speech researchers and ML engineers looking to replace Transformers with sub-quadratic State Space Models will find a concrete recipe for injecting dynamic content-awareness into Mamba via channel-wise local attention.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automatic speech recognition for read and spontaneous speech domains.

## Institutions / 機構

National Yang Ming Chiao Tung University, Industrial Technology Research Institute

## Related

- (link related pages by id as the wiki grows)
