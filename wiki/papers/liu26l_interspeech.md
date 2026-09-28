---
id: liu26l_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1531
pdf: https://www.isca-archive.org/interspeech_2026/liu26l_interspeech.pdf
---

# Decoupling Search and Evaluation: Efficient Beam Decoding for Language Model-Based Text-to-Speech Synthesis

*Chenlin Liu, Jie Gao, Wei Zhou, Guangyan Zhang, Minghui Fang, Jiqing Han*

[PDF](https://www.isca-archive.org/interspeech_2026/liu26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1531)

**TL;DR** — SaVE-Beam is an efficient beam decoding framework for language model-based text-to-speech that decouples hypothesis search from sequence evaluation using a lightweight student model and chunk-wise expansion, achieving a 5.1× speedup over traditional beam search and up to a 50% reduction in word error rate compared to standard sampling.

## Key contributions

- Identifies that over 98% of conventional beam search decoding time in LM-based TTS is consumed by the search stage, establishing a massive computational imbalance between search and evaluation.
- Proposes SaVE-Beam, a decoupled search-and-evaluation architecture where a compact student model performs chunk-wise beam tree construction and the original teacher LM executes exact sequence scoring.
- Implements hard repetition constraints with a recent token window mask during student beam search to aggressively prevent temporal collapse (silence/noise loops) inherent to maximization-based decoding.
- Introduces temperature-scaled knowledge distillation and dynamic pruning combined with a deterministic acceptance check (using lexicographic ordering on accepted length and log-probabilities) to ensure robust rank preservation.

## Problem

Language model-based text-to-speech systems typically depend on stochastic sampling strategies like top-k or nucleus sampling to maintain stability, but these sacrifice determinism and suffer from tail-sample errors. While maximization-based beam search offers a principled alternative, it fails in speech generation due to severe temporal collapse (prolonged silence and noise loops driven by local acoustic priors) and prohibitive inference latency caused by the multi-hypothesis expansion overhead. Prior mitigations like TRAD-BS use soft repetition penalties which remain vulnerable to degeneration and leave real-time factors unacceptably high (RTF ~4.95), blocking the adoption of beam search in latency-sensitive, real-time TTS pipelines.

## Method

SaVE-Beam addresses the inference latency bottleneck by delegating the hypothesis expansion phase to a lightweight student model (instantiated as the CosyVoice2 0.5B model variant with 1-2 hidden layers) while retaining the full-scale teacher LM for exact score evaluation. The student is trained via temperature-scaled knowledge distillation (temperature tau = 2) under self-referential autoregressive rollouts to match the high-probability token rankings of the teacher.

During inference, SaVE-Beam employs chunk-wise beam expansion where the student constructs a local beam tree over a short chunk length of L = 5 steps. Within this search stage, hard repetition constraints mask tokens appearing in a recent window (w = 10 for search, w = 15 for evaluation) and dynamic pruning retains only the top-N = 100 nodes. Subsequently, the teacher model executes tree-structured decoding with an LM filter restricting branches to the teacher's top-K = 5 tokens. A deterministic acceptance check compares student and teacher distributions via a threshold alpha = 0.5, selecting candidate paths via lexicographic maximization of accepted length first and cumulative log-probability second, before falling back to the teacher for a constrained single-token emission.

## Experimental setup

The framework uses LibriTTS and the premium subset of WenetSpeech4TTS for training, and is evaluated on the SeedTTS-Eval benchmark across English (test-en), Mandarin (test-zh), and hard multilingual subsets. CosyVoice 2 serves as the baseline foundation model, compared against conventional TRAD-BS (beam size B = 5). Metrics include Word Error Rate / Character Error Rate (WER/CER via Whisper-large-v3 and Paraformer-zh), Speaker Similarity (SS via CAM++), Mean Opinion Score (MOS), tokens per second (TPS), and real-time factor (RTF). Models are trained on 8 NVIDIA H800 GPUs and evaluated on a single NVIDIA RTX 3090 GPU using beam width B = 8.

## Results

SaVE-Beam-2h achieves a word error rate of 1.83% on English and a character error rate of 0.84% on Mandarin, representing reductions of up to 50% and 33% respectively compared to the standard sampling baseline while keeping speaker similarity constant (~0.82-0.84). Compared to the TRAD-BS baseline, SaVE-Beam accelerates the language model decoding module by 3.9× to 5.1×, raising throughput from ~5.2 TPS to ~22-25 TPS and bringing the system real-time factor down from 4.95 to 1.19, closely matching the 1.14 RTF of the baseline sampling system.

Ablations demonstrate that replacing soft repetition penalties with hard repetition constraints is essential to prevent severe temporal collapse on English data (dropping TRAD-BS WER from 5.51% down to 1.90%). On hard evaluation sets, removing dynamic pruning introduces controlled stochasticity that further mitigates hallucination and improves CER to 7.17%. The 2-layer student model variant outperforms the 1-layer variant by avoiding excess rejections and chunk expansions.

| System | TPS (LM) _↑_ | RTF _↓_ | W/CER (en/zh) _↓_ | MOS _↑_ |
|---|---|---|---|---|
| baseline (sampling) | 25.40 | 1.14 | 3.69 / 1.26 | 3.92 / 3.89 |
| + TRAD-BS | 5.22 | 4.95 | 5.51 / 0.91 | 4.25 / 3.95 |
| + SaVE-Beam-1h | 23.98 | 1.18 | 1.92 / 0.93 | 4.19 / 3.98 |
| + SaVE-Beam-2h | 23.92 | 1.19 | 1.83 / 0.84 | 4.28 / 4.03 |

## Limitations

The evaluation relies heavily on standard and hard subsets of SeedTTS-Eval primarily covering English and Mandarin, with limited exploration of extremely low-resource languages beyond initial multilingual trials. The student model architecture requires specialized distillation training on top of pre-trained teacher LMs, and performance depends on carefully tuned hyperparameters like chunk length, window sizes, and acceptance thresholds.

## Why read this

Speech and ML researchers focusing on autoregressive generative models or real-time text-to-speech will find this paper essential for learning how to decouple expensive hypothesis search from scoring without sacrificing generation quality.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time streaming text-to-speech assistants, conversational voice agents, and high-fidelity zero-shot voice cloning systems requiring deterministic maximization decoding.

## Related

- (link related pages by id as the wiki grows)
