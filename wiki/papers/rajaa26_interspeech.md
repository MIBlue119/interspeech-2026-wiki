---
id: rajaa26_interspeech
category: speech-llm-dialogue
labels: [self-supervised, generative-model]
institutions: ["Anyreach AI"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2424
pdf: https://www.isca-archive.org/interspeech_2026/rajaa26_interspeech.pdf
---

# DualTurn: Learning Turn-Taking from Dual-Channel Generative Speech Pretraining

*Shangeth Rajaa*

[PDF](https://www.isca-archive.org/interspeech_2026/rajaa26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rajaa26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2424)

**Category:** `speech-llm-dialogue` · **Labels:** `self-supervised`, `generative-model`

**TL;DR** — DualTurn introduces a dual-channel generative speech pretraining method for modular ASR-LLM-TTS pipelines, outperforming VAP on agent action weighted F1 (0.633 vs. 0.389) and a 3.1B audio-text model on word-level turn prediction AUC (0.930 vs. 0.880).

## Key contributions

- First use of speech-to-speech generative pretraining as a representation-learning stage for explicit turn-taking prediction in modular voice pipelines.
- Derives six self-supervised per-channel signals (EOT, HOLD, BOT, BC, VAD, FVAD) compiled into five agent actions without human annotations.
- Demonstrates that continuous neural codec representations (Mimi) outperform discrete codebook indices for turn-taking representation learning.
- Achieves real-time CPU execution (~78 ms latency) with a lightweight 0.5B backbone using LoRA fine-tuning.

## Problem

Production speech pipelines relying on Large Language Models typically depend on crude silence timeouts for turn-taking, causing unnatural pauses, delayed responses, and frequent interruptions. While speech-to-speech (S2S) models capture turn dynamics implicitly, they lack text-based reasoning and instruction-following, and their representations cannot be exported to modular ASR-LLM-TTS setups. Prior discrete or single-channel audio classifiers (like VAP or 3.1B audio-text models) either collapse turn phenomena into binary outputs, ignore prosody, or are far too computationally heavy for low-latency production deployment.

## Method

DualTurn encodes dual-channel conversational audio streams using the frozen Mimi neural codec, converting 24 kHz waveforms into continuous 512-dimensional encoder embeddings at 12.5 frames per second. Each channel's features pass through a channel-specific MLP, concatenate, and project to an 896-dimensional hidden size that replaces the token embeddings of a Qwen2.5-0.5B backbone. Stage-1 pretraining uses an autoregressive next-audio-token prediction objective with a lightweight depth predictor (~10.6M parameters) that is discarded after pretraining. In Stage-2, twelve lightweight classification heads (six per channel, using focal loss for sparse events and binary cross-entropy for dense activity) are fine-tuned on self-supervised turn signals mapped from voice activity alignment with a 4-second lookahead.

During streaming inference, the model processes inputs with a 240 ms stride (3 audio frames) using KV-caching. Sparse event signals (EOT, HOLD, BOT, BC) are predicted via two-layer MLP heads (896 -> 256, GELU, 0.1 dropout), while dense signals (VAD, FVAD) use linear projections. Predicted signals are mapped to five distinct agent actions (Start-Talking, Continue-Listening, Start-Listening, Continue-Talking, Backchannel) using either zero-parameter domain heuristics or a multinomial logistic regression probe fitted on held-out validation data.

## Experimental setup

Evaluated on approximately 453 hours of dual-channel conversation audio, comprising otoSpeech (289 hours across 1,125 full-duplex English conversations) and Switchboard (220 hours of telephone speech, utilizing the standard 138-session test split). Baselines include native VAP (5.8M parameters, CPC encoder) and a 3.1B parameter audio-text fusion model (RedPajama + HuBERT). Models are evaluated using weighted F1 (wF1), Backchannel F1, Shift/Hold AUC, and word-level AUC metrics on hardware including A100 GPUs and CPUs.

## Results

On Switchboard, DualTurn (0.5B) achieves a weighted F1 of 0.633 compared to VAP's 0.389 on agent action prediction, and attains a Backchannel F1 of 0.349 versus VAP's 0.000. In word-level turn prediction on Switchboard, the multi-signal heuristic achieves an average AUC of 0.930 and the LR-probe hits 0.963, outperforming the 3.1B audio-text baseline's 0.880. DualTurn anticipates turn boundaries approximately 220 ms earlier than VAP (-360 ms vs. -140 ms relative to turn offset) while decreasing false interruptions by 5 percentage points. Ablations show that continuous Mimi codec representations surpass discrete codebook indices (wF1 0.633 vs. 0.602), and adding generative loss or text-generation objectives during Stage-2 or Stage-1 harms sparse signal performance.

| Model | wF1 | BC F1 | Ant@-240 (AUC) |
|---|---|---|---|
| VAP (native) | 0.276 | — | 0.785 |
| VAP (LR-6) | 0.389 | 0.000 | 0.780 |
| Wang et al. (3.1B) | — | — | 0.880* |
| DualTurn - No Pretrain | 0.604 | 0.079 | 0.863 |
| DualTurn - Full FT | 0.626 | 0.337 | 0.879 |
| DualTurn - LoRA (Main) | 0.633 | 0.349 | 0.874 |

## Limitations

The current evaluation is restricted to English-language, two-party telephone or online conversations totaling 453 hours, lacking multi-party and multi-lingual scope. While generative pretraining unlocks backchannel prediction, the resulting BC signal still exhibits low precision relative to its class sparsity, indicating that it should be used as a soft gating signal rather than a hard deterministic trigger.

## Why read this

Speech and ML engineers building low-latency conversational AI should read this to learn how to inject speech-to-speech generative pretraining representations into modular ASR-LLM-TTS pipelines for superior, anticipatory turn-taking.

## Code

- https://github.com/anyreachai/dualturn

## Applications

Real-time spoken dialogue systems, voice assistants, and full-duplex conversational agents requiring low-latency turn-taking and backchannel generation.

## Institutions / 機構

Anyreach AI

## Related

- (link related pages by id as the wiki grows)
