---
id: zhu26_interspeech
category: asr
labels: [efficient-on-device]
institutions: ["BOE Technology Group"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-230
pdf: https://www.isca-archive.org/interspeech_2026/zhu26_interspeech.pdf
---

# Content-Aware Dynamic Compression for Efffcient Speech Recognition based on Large Language Model

*Huifeng Zhu, Bingqian Wang, Shaoxun Xiu, Xingqun Jiang, Bin Lv*

[PDF](https://www.isca-archive.org/interspeech_2026/zhu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-230)

**Category:** `asr` · **Labels:** `efficient-on-device`

**TL;DR** — The paper introduces a content-aware dynamic acoustic mapping method using Continuous Integrate-and-Fire (CIF) to replace fixed-rate downsampling in speech-enabled LLMs, achieving 12-26% relative error reduction and over 45% sequence length reduction.

## Key contributions

- Replaces fixed-stride acoustic downsampling in speech LLMs with a content-aware dynamic mapping framework.
- Adapts the Continuous Integrate-and-Fire (CIF) mechanism to dynamically align speech frames with target text token counts based on speech rate and linguistic content.
- Demonstrates massive reductions in Average Speech Embedding Length (ASEL) and Time to First Token (TTFT) while simultaneously lowering error rates.
- Proposes a two-stage training strategy tailored for efficient adapter/mapper learning and subsequent LLM fine-tuning.

## Problem

Current LLM-based ASR systems rely on fixed-rate downsampling operations (e.g., local feature concatenation or sliding-window convolutions) to compress acoustic representations before passing them to the language model. As downsampling ratios increase to save compute, these static methods discard fine-grained acoustic boundaries and ignore the fundamental variability of speech dynamics, resulting in severe recognition performance degradation. Furthermore, fixed downsampling fails to adapt to variable speech rates, leading to information loss or redundant token generation.

## Method

The architecture comprises three main components: a frozen speech encoder, a CIF-based dynamic mapper, and a lightweight adapter feeding into a pre-trained LLM (Qwen3 or Qwen2). The speech encoder processes raw waveforms into a sequence of features H at a 25 Hz frame rate. The dynamic mapper transforms H via a 1D convolution (kernel size 3), a transpose, and a ReLU activation with a residual connection to yield M. A linear layer with a sigmoid activation then predicts firing weights alpha for each time step. 

During training and inference, the Continuous Integrate-and-Fire (CIF) mechanism accumulates the firing weights alpha and fires an acoustic embedding whenever the accumulated value reaches a threshold beta, generating a variable-length embedding sequence E_a whose token count is guided by text transcripts. The training loss is optimized using cross-entropy alongside supervision on sequence length (evaluated via MAE, MSE, and SMAE). The adapter subsequently maps these features to the LLM input dimension.

A two-stage training strategy is adopted: Stage 1 freezes the speech encoder and LLM, training only the dynamic mapper and adapter using AdamW (lr = 5e-5, gradient clipping threshold 5) for 100 epochs on AISHELL-1, 10 on LibriSpeech, and 5 on GigaSpeech. Stage 2 unfreezes and updates only the LLM parameters on large-scale data (GigaSpeech) using an lr of 1e-5 for 5 epochs.

## Experimental setup

Evaluated on AISHELL-1 (178 hours, Mandarin), LibriSpeech (960 hours, English), and GigaSpeech (10,000 hours, multilingual). Speech encoders tested include StepAudio2-Mini (637M parameters) and FireRedLLM-ASR (710M parameters). LLMs include Qwen3-1.7B and Qwen2-7B. Baselines include WEST fixed-stride setups, Conv-MLP, and Concat-MLP with downsampling rates of 2, 4, and 6. Metrics include Character Error Rate (CER), Word Error Rate (WER), Average Speech Embedding Length (ASEL), and Time to First Token (TTFT).

## Results

On AISHELL-1 using the FireRedLLM-ASR encoder and Qwen2-7B, Dyn-MLP achieves a CER of 2.67% with an ASEL of 27, compared to the baseline CER of 4.01% at an ASEL of 70 (a 33.4% relative CER reduction alongside a 61.4% reduction in ASEL). On LibriSpeech test-clean with StepAudio2 and Qwen3-1.7B, Dyn-MLP attains a WER of 2.65% with an ASEL of 54, beating fixed Conv-MLP downsampling rates which trade off accuracy for length. Across varying utterance durations, Dyn-MLP reduces Time to First Token (TTFT) by 7.1% on 6-second clips and up to 19.5% on 15-second clips compared to standard Conv-MLP (DS=2).

Ablations on training criteria (MAE, MSE, SMAE) show negligible impact on final CER or ASEL, confirming robustness to regression loss choice. The method's primary limitation is tied to tokenizer dependencies and the overhead of learning the integration thresholds.

| Method | LLM | CER / WER (%) | ASEL |
|---|---|---|---|
| Baseline (Conv-MLP) | Qwen3-1.7B | 4.17 (CER) | 70 |
| Baseline (Conv-MLP) | Qwen2-7B | 4.01 (CER) | 70 |
| Dyn-MLP (Ours) | Qwen3-1.7B | 3.53 (CER) | 27 |
| Dyn-MLP (Ours) | Qwen2-7B | 2.67 (CER) | 27 |

## Limitations

The evaluation is restricted to Mandarin and English benchmarks (AISHELL-1, LibriSpeech, GigaSpeech), leaving out extremely low-resource or highly noisy acoustic conditions. The approach requires transcription length supervision or proxy targets during training to guide the CIF integration process. Computational overhead during training includes tuning the dual-stage schedule for massive datasets.

## Why read this

Speech and LLM engineers seeking to eliminate fixed sequence-compression bottlenecks in speech-to-text models should read this to learn how to integrate Continuous Integrate-and-Fire as a learnable, content-aware front-end adapter.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Efficient speech recognition, real-time on-device speech transcription, and multi-modal speech-language models.

## Institutions / 機構

BOE Technology Group

## Related

- [AdaTS: Adaptive Token Sampling for Efficient Speech Language Models](sannigrahi26_interspeech.md) — same problem · relatedness 2.8/3
- [Leveraging Temporal Redundancy via Layer-wise Key-Value Pooling Attention for Efficient ASR](wu26k_interspeech.md) — same problem · relatedness 2.0/3
- [LLM-as-Joiner: Decoupling Alignment from Language Modeling in Label-synchronous ASR](lee26u_interspeech.md) — same problem · relatedness 2.0/3
- [Entity Binding Failures in Speech LLM Reasoning: Diagnosis and Chain-of-Thought Intervention](hsu26_interspeech.md) — same problem · relatedness 2.0/3
- [MTC-AVSR: Compressed-Token-based Audio-Visual Speech Recognition and Translation with Contrastive Language Alignment](a26_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
