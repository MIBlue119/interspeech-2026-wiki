---
id: cai26c_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2297
pdf: https://www.isca-archive.org/interspeech_2026/cai26c_interspeech.pdf
---

# Beyond Mimicry: Constrained Exploration with GRPO for Joint Multi-Talker ASR and Diarization under Unknown Speaker Counts

*Yunrui Cai, Dingdong Wang, Lingwei Meng, Xixin Wu, Zhiyong Wu, Helen Meng*

[PDF](https://www.isca-archive.org/interspeech_2026/cai26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cai26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2297)

**Category:** `asr`

**TL;DR** — A two-stage generative framework combining Chain-of-Thought reasoning and GRPO reinforcement learning enables SpeechLLMs to jointly perform multi-talker ASR, speaker attribution, and time alignment under unknown speaker counts, yielding a 35% to 54% relative cpWER reduction over SFT-only baselines.

## Key contributions

- Adapts foundational SpeechLLMs for joint multi-talker ASR, speaker diarization, and timestamp estimation under unknown speaker counts using a unified generative sequence.
- Introduces a Chain-of-Thought (CoT) reasoning prefix that forces the model to explicitly estimate the global speaker count before generating transcripts.
- Proposes a Group Relative Policy Optimization (GRPO) training phase driven by a Multi-dimensional Constraint-Aware Reward (MCAR) engine to replace brittle SFT-only teacher forcing.
- Achieves competitive performance on Libri2Mix, Libri3Mix, and a challenging Dynamic-Mix (2+3) evaluation set without external speech separation, VAD, or clustering modules.

## Problem

Foundational SpeechLLMs degrade severely under overlapping speech due to acoustic interference, causing hallucinations and malformed temporal tags. Traditional cascaded pipelines suffer from error propagation, while end-to-end SFT models fail in dynamic scenarios with unknown speaker counts because teacher forcing never trains the model on its own auto-regressive errors. This work addresses the need for robust joint ASR, diarization, and timestamp estimation by shifting the learning paradigm from passive mimicry to active RL exploration.

## Method

The framework builds on Qwen2.5-Omni-7B, comprising an audio encoder $E_theta$, a modality projector $P_phi$, and an LLM $M_psi$. Universal Low-Rank Adaptation (LoRA) is applied across all linear layers ($r=16, \alpha=32, p=0.05$) to achieve fine-grained acoustic disentanglement without catastrophic forgetting. The two-stage recipe consists of Stage 1 (Constraint-Aware SFT) using Permutation-Invariant Prompting across $N!$ speaker permutations for 5 epochs ($lr=2\times 10^{-5}$, batch size 128) to learn the output format and CoT logic. Stage 2 applies GRPO to perform on-policy exploration over complete hypotheses without a value model, sampling $G=8$ independent rollouts per query.

The GRPO objective optimizes a clipped policy ratio regularized by a KL divergence penalty ($\beta=0.04, \epsilon=0.2, lr=1\times 10^{-6}$) against a frozen SFT reference model. The policy is guided by the Multi-dimensional Constraint-Aware Reward (MCAR) engine, which combines five orthogonal rewards: (1) CoT Counting Reward ($R_{cot}$) for exact speaker count matching ($N_{pred}$ vs $N_{true}$); (2) Dynamic Semantic Fidelity ($R_{sem}$) using an exponentially decaying score over optimal Permutation-Invariant WER (cpWER); (3) Time-Aligned Accuracy ($R_{time}$) rewarding timestamp precision within a $\tau=0.2\text{s}$ tolerance; (4) Fine-Grained Burst Penalty ($R_{burst}$) aggressively penalizing contiguous insertion/substitution errors exceeding a tolerance window $\tau_b = 2$ tokens to suppress hallucinations; and (5) Structural & Temporal Logic ($R_{logic}$) enforcing XML tag validity and preventing time inversions ($t_s \ge t_e$).

## Experimental setup

Evaluated on Libri2Mix, Libri3Mix, and a novel Dynamic-Mix (2+3 speakers) benchmark constructed by uniformly sampling and shuffling test utterances. GRPO optimization is performed on a curated subset of 10,000 highly overlapped speech training samples. Compared against zero-shot Qwen2.5-Omni-7B, SFT+CoT, specialized architectures (Whisper-Sidecar, UME, GEncSep, TS-ASR-AD), and hybrid SpeechLLMs (SOT-LLM, CMT-LLM, SOP-LLM). Metrics include cpWER, WDER (Word Diarization Error Rate), Timestamp Error (TE), and CoT-Acc.

## Results

On Libri3Mix, the full SFT+CoT+GRPO model achieves a cpWER of 14.52%, WDER of 1.95%, and TE of 0.10s, outperforming the SFT+CoT baseline which scored 22.45% cpWER. On the Dynamic-Mix (2+3) set, the model reaches 9.24% cpWER, 1.12% WDER, 0.08s TE, and 99.72% CoT-Acc, yielding a 54% relative cpWER reduction over SFT+CoT (20.17%). Ablations reveal that removing the CoT Counting Reward causes the most severe drop (cpWER surging to 18.02%), while omitting Dynamic $N!$ evaluation pushes cpWER to 16.56% and removing the Fine-Grained Burst Penalty degrades cpWER to 11.84%.

| System / Condition | cpWER (%) | WDER (%) | TE (s) | CoT-Acc (%) |
|---|---|---|---|---|
| Qwen2.5-Omni-7B (Zero-Shot) | 69.30 | 18.52 | N/A | 32.25 |
| + SFT | 24.78 | 4.81 | 0.20 | 76.80 |
| + SFT + CoT | 20.17 | 3.73 | 0.15 | 90.06 |
| **+ SFT + CoT + GRPO (Ours)** | **9.24** | **1.12** | **0.08** | **99.72** |

## Limitations

Evaluated primarily on simulated synthetic mixtures (LibriMix derivatives) which may not fully reflect the acoustic complexity, reverberation, and background noise profiles of real-world multi-talker recordings. The approach relies on an LLM-based sequence generation paradigm, which inherits inference latency overheads typical of auto-regressive speech models and has only been validated up to 3 active speakers.

## Why read this

Speech and ML researchers working on speech LLMs or joint multi-talker processing should read this paper to see how Group Relative Policy Optimization (GRPO) and constraint-aware reward engineering can successfully replace brittle teacher-forcing SFT for dense acoustic overlaps.

## Code

- https://github.com/caiyunrui/MT-GRPO

## Applications

Multi-talker meeting transcription, voice-controlled smart home devices in noisy environments, and automated multi-party conversation analysis.

## Institutions / 機構

Chinese University of Hong Kong, Tsinghua University

**Funding / 經費:** Centre for Perceptual and Interactive Intelligence, Innovation and Technology Commission of the Hong Kong Special Administrative Region Government

## Related

- (link related pages by id as the wiki grows)
