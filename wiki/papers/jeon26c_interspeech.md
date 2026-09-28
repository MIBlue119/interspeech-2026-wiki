---
id: jeon26c_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1569
pdf: https://www.isca-archive.org/interspeech_2026/jeon26c_interspeech.pdf
---

# Not All Frames Are Equal: Difference-Aware Quantization for Ultra-Low-Bit ASR

*Woori Jeon, Jungmin So*

[PDF](https://www.isca-archive.org/interspeech_2026/jeon26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jeon26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1569)

**TL;DR** — DiffAQ is a training-free post-training quantization modification that weights Hessian calibration using frame-to-frame activation differences, reducing Whisper Medium 2-bit WER on LibriSpeech test-other from 17.53% to 12.93%.

## Key contributions

- Identifies a modality gap in standard PTQ for ASR, where frame-agnostic Hessian estimation is dominated by zero-padding and steady-state temporal redundancy.
- Proposes DiffAQ, computing frame-to-frame L2 activation differences to measure acoustic rate of change and scale Hessian importance proportionally.
- Introduces a normalized temporal importance weight with a base floor parameter alpha to prioritize phonetic transitions while maintaining Hessian numerical stability.
- Validates consistent WER improvements over GPTQ and AWQ across three Whisper sizes (base, small, medium) at 2-bit and 3-bit precisions on LibriSpeech and FLEURS.

## Problem

State-of-the-art ASR foundation models require high memory footprints that prevent real-time on-device execution, but applying existing LLM post-training quantization methods like GPTQ and AWQ directly to speech leads to severe transcription collapse and hallucination loops at ultra-low bit-widths (2-3 bits). This failure stems from a modality gap: text features discrete tokens of uniform density, whereas continuous ASR log-Mel inputs feature heavy zero-padding (e.g., in Whisper's 30-second window) and 60% frame overlap from temporal windowing. Standard PTQ treats every frame equally, causing static regions and silence to dominate the calibration Hessian and leaving the model incapable of resolving transient phonetic boundaries.

## Method

DiffAQ modifies the layer-wise Hessian accumulation step of GPTQ by scaling each temporal frame's activation outer product according to an acoustic change importance score, applied exclusively to the ASR encoder's linear layers while standard GPTQ is retained for the autoregressive text decoder.

For an intermediate hidden activation vector xt at frame t, the temporal density score dt is calculated as the L2 norm of the finite difference vector: dt = ||xt - xt-1||2. This naturally assigns near-zero weights to zero-padded frames and temporally redundant steady-state segments (due to 15ms spectrogram overlap), while assigning maximum weight to rapid acoustic state changes at phonetic boundaries.

To prevent a singular Hessian matrix, the density score is normalized by the sequence mean mu_d = (1/T) sum(dt) to yield d_bar_t = dt / mu_d. A temporal importance weight wt is then defined as wt = (1 - alpha) * d_bar_t + alpha, where base importance factor alpha is set to 0.2 across all experiments. The modified Hessian is accumulated as H_DiffAQ = sum(wt * xt * xt^T) and plugged into the standard Cholesky-based GPTQ solver.

## Experimental setup

Evaluated on OpenAI Whisper base.en (~74M parameters), small.en (~244M parameters), and medium.en (~769M parameters) models. Tested on LibriSpeech (test-clean and test-other splits) and the English subset of FLEURS out-of-domain benchmark. Calibration uses 128 randomly sampled utterances from LibriSpeech train-other-500. Compares against Round-To-Nearest (RTN), AWQ, and standard GPTQ at asymmetric W3A16 and W2A16 configurations with a group size of 64, averaging results over 10 random calibration seeds.

## Results

At 3-bit quantization, DiffAQ consistently achieves the lowest mean WER across all configurations, such as lowering Whisper Small on FLEURS from 11.37% (GPTQ) to 8.69%. At 2-bit quantization, baseline methods like RTN and AWQ fail completely with degenerate outputs exceeding 100% WER, while standard GPTQ suffers severe degradation; DiffAQ substantially recovers accuracy, lowering Whisper Medium test-other WER from 17.53% to 12.93% and Whisper Small test-clean WER from 36.64% to 28.02%. However, DiffAQ fails on Whisper Base at 2-bit precision (WER > 100%), indicating a hard capacity bottleneck where the 74M parameter model lacks sufficient representational capacity regardless of calibration strategy. Sensitivity analysis on the floor parameter alpha in the range {0.0, 0.1, 0.2, 0.3} shows minimal WER variation (less than 0.2% on LibriSpeech), confirming that performance gains stem from temporal difference weighting rather than hyperparameter tuning.

| System / Condition | Precision | LibriSpeech clean | LibriSpeech other | FLEURS |
|---|---|---|---|---|
| FP16 Baseline | 16-bit | 2.73 | 5.69 | 4.58 |
| Standard GPTQ (Whisper Medium) | 3-bit | 2.90 | 6.21 | 5.08 |
| DiffAQ (Whisper Medium, Ours) | 3-bit | 2.81 | 6.08 | 4.84 |
| Standard GPTQ (Whisper Medium) | 2-bit | 13.73 | 17.53 | 18.05 |
| DiffAQ (Whisper Medium, Ours) | 2-bit | 7.93 | 12.93 | 12.07 |

## Limitations

The temporal difference metric is not speech-selective, meaning transient non-speech background noise or environmental audio spikes can produce high activation differences and receive unintended high Hessian importance. The evaluation is restricted to the Whisper architecture, and uniform 2-bit quantization completely breaks down on smaller models (Whisper Base) due to representational capacity limits rather than calibration flaws.

## Why read this

Speech and ML engineers looking to compress large ASR foundation models to ultra-low bit-widths will learn how to adapt LLM PTQ algorithms for continuous audio inputs by exploiting temporal feature redundancies.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Deploying state-of-the-art ASR foundation models like Whisper onto resource-constrained edge devices, mobile phones, and embedded hardware with reduced memory footprints.

## Related

- (link related pages by id as the wiki grows)
