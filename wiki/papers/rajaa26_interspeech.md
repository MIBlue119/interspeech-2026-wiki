---
id: rajaa26_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2424
pdf: https://www.isca-archive.org/interspeech_2026/rajaa26_interspeech.pdf
---

# DualTurn: Learning Turn-Taking from Dual-Channel Generative Speech Pretraining

[PDF](https://www.isca-archive.org/interspeech_2026/rajaa26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rajaa26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2424)

**TL;DR** — DualTurn uses generative pretraining on dual-channel conversational audio to learn turn-taking dynamics, outperforming VAP on agent action prediction (wF1 0.633 vs. 0.389).

## Problem

Production ASR-LLM-TTS pipelines rely on silence timeouts for turn-taking, causing delayed responses and unnatural interruptions, whereas current audio classifiers lack semantic context or fail to distinguish backchannels from turn ends. While speech-to-speech models learn turn-taking implicitly, they lack the reasoning and instruction-following capabilities of text LLMs and cannot be easily integrated into modular pipelines.

## Method

DualTurn encodes dual-channel waveforms via the frozen 24 kHz Mimi neural codec into 512-dim continuous embeddings, which pass through channel-specific MLPs and concatenate into an 896-dim representation that replaces the token embeddings of a Qwen2.5-0.5B LLM backbone. Training proceeds in two stages: first, autoregressive generative speech pretraining on both speakers' future audio tokens using a temporary depth predictor; second, fine-tuning twelve classification heads (six per channel, using two-layer MLPs for sparse signals like EOT, HOLD, BOT, BC and linear projections for dense VAD and FVAD) via focal loss and binary cross-entropy using self-supervised labels. Agent actions are inferred using domain-knowledge heuristics or a multinomial logistic regression probe.

## Results

Evaluated on the Switchboard (138-session test split) and otoSpeech (113-session) datasets, DualTurn achieves an agent action weighted F1 of 0.633 on Switchboard (vs 0.389 for VAP) and 0.707 on otoSpeech (vs 0.461 for VAP). On word-level turn prediction, DualTurn reaches an average AUC of 0.930 (and 0.963 with an LR probe), outperforming a 3.1B-parameter audio-text fusion model (0.880 AUC). DualTurn anticipates turn boundaries at a median of -360 ms relative to speech offset (220 ms earlier than VAP) and reduces ST-for-CL confusions from 27.4% to 22.4%. Ablations show continuous Mimi features vastly outperform discrete codebook indices (wF1 0.633 vs. 0.602), and Stage-1 pretraining is essential for backchannel detection (BC F1 0.349 vs 0.077 without pretraining).

## Code

- https://github.com/anyreachai/dualturn

## Applications

Speech and ML engineers integrating low-latency, anticipatory turn-taking into modular spoken dialogue systems and ASR-LLM-TTS voice assistants.

## Limitations

Evaluated exclusively on English two-party conversations (453 hours total across Switchboard and otoSpeech).

## Related

- (link related pages by id as the wiki grows)
