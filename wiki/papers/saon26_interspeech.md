---
id: saon26_interspeech
category: asr
labels: [efficient-on-device]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2680
pdf: https://www.isca-archive.org/interspeech_2026/saon26_interspeech.pdf
---

# Self-Speculative Decoding for LLM-based ASR with CTC Encoder Drafts

*George Saon, Samuel Thomas, Takashi Fukuda, Tohru Nagano, Avihu Dekel, Luis Lastras*

[PDF](https://www.isca-archive.org/interspeech_2026/saon26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/saon26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2680)

**Category:** `asr` · **Labels:** `efficient-on-device`

**TL;DR** — The paper introduces self-speculative decoding (SSD) for speech-aware language models (SLMs), using the model's own frozen CTC encoder as a draft to accelerate autoregressive inference while simultaneously improving ASR accuracy. On the HuggingFace Open ASR benchmark, SSD achieves a record 5.58% WER and a 4.4x speedup in inverse real-time factor (RTFx) with only a 12% relative WER increase over standard autoregressive search.

## Key contributions

- Reuses the CTC encoder head of a speech-aware LLM as a non-autoregressive draft model without requiring a separate auxiliary draft architecture.
- Proposes a two-stage gating mechanism combining frame-level CTC entropy thresholds for direct acceptance and token-likelihood criteria for single-pass LLM verification.
- Demonstrates that LLM verification of CTC hypotheses actually improves ASR accuracy over full autoregressive decoding by mitigating LLM over-regularization (language model bias).
- Establishes a pareto-efficient operating spectrum tunable via acceptance thresholds, delivering up to 4.4x RTFx gains or lower WER (5.58% vs 5.75%) on the Open ASR benchmark.

## Problem

Speech-aware language models (SLMs) achieve state-of-the-art ASR accuracy via attention encoder-decoder architectures, but suffer from slow inference because text tokens are generated strictly autoregressively (one forward pass per token). Prior non-autoregressive alternatives like CTC greedy decoding or mask-predict error correction sacrifice accuracy, while conventional speculative decoding requires training a separate small draft model. Furthermore, standard encoder-decoder models are prone to language model bias where the text decoder hallucinates fluent tokens that diverge from actual audio signals.

## Method

The proposed self-speculative decoding procedure operates in three sequential steps. First, the input waveform passes through a 440M-parameter conformer encoder to compute acoustic embeddings, which are evaluated by a CTC head to yield a greedy draft hypothesis and frame-level entropies. If all frame entropies fall below a strict threshold ($	au_{	ext{CTC}}$), the CTC hypothesis is accepted immediately, completely bypassing the LLM.

Second, if the entropy condition fails, the CTC hypothesis is validated via a single parallel forward pass through the LLM. Using a speech modality adapter (a 37M-parameter query transformer downsampling acoustic frames by a factor of 5), acoustic and text embeddings are fed into the LLM, and the CTC tokens are verified using a relaxed token-likelihood acceptance threshold ($	au_{	ext{SLM}}$). If all token likelihoods exceed $	au_{	ext{SLM}}$, the entire CTC draft is accepted.

Third, if token-level verification fails, the system identifies the longest verified CTC prefix and falls back to standard autoregressive (AR) generation starting from that exact token position. This eliminates redundant computation while leveraging complementary error correction between the CTC encoder's acoustic grounding and the LLM's language modeling capacity.

## Experimental setup

Experiments are conducted on 9 corpora spanning 5 languages (English, German, Spanish, French, Portuguese), including the HuggingFace Open ASR benchmark (AMI, Earnings22, GigaSpeech, LibriSpeech, SPGISpeech, TED-LIUM, VoxPopuli) and Multilingual LibriSpeech/CommonVoice. Models evaluated include the newly trained granite-speech-4.0-1b (utilizing a 1B parameter LLM and 440M parameter CTC encoder) alongside granite-speech-3.3-2b and 8v. Metrics reported are Word Error Rate (WER) and Inverse Real-Time Factor (RTFx) measured on a single H100 GPU in batched bfloat16 precision with an adaptive token budget (50K max tokens).

## Results

In the high-accuracy operating mode ($	au_{	ext{CTC}} = 0.7, 	au_{	ext{SLM}} = 0.2$), the 1B SLM achieves an average English Open ASR WER of 5.58% compared to 5.75% for full AR decoding, while matching throughput (548 vs 564 RTFx). In the high-throughput regime ($	au_{	ext{CTC}} = 3.0, 	au_{	ext{SLM}} = 0.1$), RTFx jumps to 2491 (a 4.4x speedup) with a modest WER of 6.56%. Ablations show that removing the CTC acceptance gate destroys high-throughput speedups, while removing LLM verification prevents the system from achieving its lowest WER point.

| System | Open ASR WER (%) | Open ASR RTFx | MLS WER (%) | MLS RTFx |
|---|---|---|---|---|
| Full AR (Baseline) | 5.75 | 564 | 5.47 | 629 |
| High Accuracy SSD | 5.58 | 548 | 5.33 | 699 |
| High RTFx SSD | 6.56 | 2491 | 5.73 | 2753 |

## Limitations

The approach requires an underlying SLM whose acoustic encoder was explicitly trained with a CTC head, restricting its direct application to encoder-adapter-LLM configurations. It is currently limited to ASR tasks and does not extend natively to speech translation or spoken question answering without architectural modifications. Because verification is utterance-based, corpora or utterances with low CTC/LLM acceptance rates experience fallback penalties where the model must resort to full AR decoding.

## Why read this

Speech and ML engineers building production-ready speech LLMs should read this paper to learn how to inject non-autoregressive CTC draft verification into causal LLM decoders without retraining the core model. It provides a blueprint for achieving multi-fold inference acceleration while paradoxically improving transcription accuracy.

## Code

- https://ibm.biz/~5pwn29DW4

## Applications

Real-time speech transcription systems, automated meeting transcription, and low-latency multilingual voice-to-text cloud services.

## Institutions / 機構

IBM

## Related

- (link related pages by id as the wiki grows)
