---
id: wu26g_interspeech
category: asr
labels: [efficient-on-device]
institutions: ["Qifu Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1953
pdf: https://www.isca-archive.org/interspeech_2026/wu26g_interspeech.pdf
---

# Accelerating End-to-End ASR via Semi-Autoregressive Speculative Decoding

*Long Wu, Lingchao Zhao, Yuanzhong Zheng, Haojun Fei, Qing Yang*

[PDF](https://www.isca-archive.org/interspeech_2026/wu26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1953)

**Category:** `asr` · **Labels:** `efficient-on-device`

**TL;DR** — Semi-Autoregressive Speculative Decoding (SASD) accelerates end-to-end ASR by using CTC greedy search as a fast drafting mechanism and selectively invoking an autoregressive attention decoder only for low-confidence tokens, matching attention-rescoring accuracy while delivering a 2.8x to 3.5x speedup.

## Key contributions

- Proposes a token-level speculative decoding algorithm (SASD) that avoids complex CTC-prefix scoring bottlenecks and multi-pass iterative refinement.
- Leverages the peaky distribution of CTC probabilities to dynamically generate a confidence mask (with a threshold Pthres = 0.99), isolating hard tokens for attention-based verification.
- Eliminates the requirement for specialized retraining, integrating seamlessly with standard pre-trained hybrid CTC/attention models.
- Achieves competitive Character Error Rates (CER) on par with full attention rescoring while reducing Real-Time Factor (RTF) across multiple public datasets.

## Problem

Traditional autoregressive Attention-Based Encoder-Decoder (AED) models yield high accuracy but suffer from slow, sequential inference limitations. Conversely, non-autoregressive (NAR) models such as Mask-CTC or Paraformer offer high parallelism and fast decoding speeds, but struggle with semantic modeling, length prediction, and overall recognition quality. Furthermore, standard hybrid CTC/attention decoding and attention rescoring rely on expensive CTC prefix beam searches and complex scoring computations that severely disrupt GPU parallel processing.

## Method

SASD operates within a joint CTC-attention framework comprising a shared encoder, a CTC decoder, and an attention decoder, trained with a combined multi-task loss balanced by factor lambda. The inference pipeline consists of five main steps: first, a fast CTC greedy search generates an initial token sequence without any beam search. Second, a confidence mask is constructed by flagging tokens where the CTC probability falls below a strict threshold (Pthres = 0.99); empirical observations show that for roughly 80% of sentences, low-confidence token ratios stay under 16%. Third, CTC token probabilities are calculated via the mean probability of duplicate tokens during greedy search, bypassing the need for computationally heavy prefix scoring. Fourth, a speculative beam search (with beam size Katt = 10) executes: high-confidence tokens are directly accepted from the CTC output, whereas low-confidence positions trigger the autoregressive attention decoder to rescore and interpolate log probabilities with CTC scores ((1 - Wctc) * logPatt + Wctc * logPctc) using a CTC weight Wctc = 0.2. Finally, the sequence with the maximum score is selected, keeping output lengths strictly identical to the initial CTC hypothesis.

Because the attention decoder only replaces tokens at explicitly flagged index positions without altering sequence structure, the model preserves standard output lengths and integrates smoothly with chunk-based streaming decoding.

## Experimental setup

Evaluated on the Chinese AISHELL-1 dataset (5 hours, 7,176 utterances), WenetSpeech (TestNet with 23 hours of internet audio and TestMeeting with 15 hours of far-field/meeting audio), and an internal Chinese industrial dataset (33 hours). Compared against baselines including CTC greedy search, CTC prefix beam search, attention beam search, attention rescoring, and NAR models like Paraformer, E-Paraformer, TSNAT, and CASS-NAT. Implemented using WENET and ESPNET frameworks across five pretrained Conformer variants (ranging from 46M to 117M parameters, model sizes 184MB to 467MB). Hardware benchmarks were executed on an NVIDIA GeForce RTX 4090 GPU and an Intel Xeon Platinum 8336C CPU.

## Results

On AISHELL-1 using the u2++ conformer, SASD achieves a test CER of 4.73% (full chunk) and 5.12% (16-frame chunk), practically matching attention rescoring (4.77% and 5.19%) while substantially outperforming CTC greedy search (5.18% and 5.81%). On a GPU (batch size 1), SASD yields an RTF of 0.0188—representing a 2.8x speedup over attention rescoring (0.0535) and running nearly as fast as pure CTC greedy search (0.0112). At batch size 8 on AISHELL-1, SASD attains an RTF of 0.0098 with a 4.73% CER, balancing NAR throughput with AR precision. On WenetSpeech TestNet and TestMeeting with the u2pp conformer, SASD achieves full-chunk CERs of 9.40% and 15.35% respectively, outperforming standard attention decoding (9.62% and 16.78%) and closely tracking attention rescoring (9.26% and 15.53%). On the 33-hour industrial call-center dataset, SASD maintains a 4.58% CER while accelerating inference by 3.5x over baseline E2E decoding.

| System | Decoding Mode | AISHELL-1 CER (%) | GPU RTF (BS=1) |
|---|---|---|---|
| u2++ Conformer | CTC Greedy | 5.18 | 0.0112 |
| u2++ Conformer | Attention Rescoring | 4.77 | 0.0535 |
| u2++ Conformer | SASD (Ours) | 4.73 | 0.0188 |
| Paraformer | NAR | 5.20 | 0.0168 |
| E-Paraformer | NAR | 4.79 | 0.0069 |

## Limitations

The evaluation is restricted to Chinese language datasets (AISHELL-1, WenetSpeech, and an internal dataset), leaving multilingual and cross-lingual generalization untested. The method relies heavily on the peaky alignment properties of CTC outputs; highly degraded acoustic environments with severe noise or overlapping speech might degrade initial CTC confidence calibration, causing dense masking that degrades speedup efficiency toward standard AR levels.

## Why read this

Speech researchers and systems engineers looking to deploy high-accuracy autoregressive ASR models with non-autoregressive inference speeds will find SASD a practical, retraining-free drop-in algorithm.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-latency real-time automatic speech recognition, cloud transcription services, live meeting assistants, and on-device voice control systems.

## Institutions / 機構

Qifu Technology

## Related

- (link related pages by id as the wiki grows)
