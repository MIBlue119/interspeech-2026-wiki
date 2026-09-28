---
id: ye26c_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2667
pdf: https://www.isca-archive.org/interspeech_2026/ye26c_interspeech.pdf
---

# Reinforcement Learning for Data-Efficient Code-Switched ASR

*Ziwei Ye, Peter Vickers*

[PDF](https://www.isca-archive.org/interspeech_2026/ye26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ye26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2667)

**TL;DR** — The paper proposes Reinforcement Learning with Verifiable Rewards (RLVR) using Group Relative Policy Optimization (GRPO) to adapt audio-language models for code-switched ASR, matching full-dataset LoRA SFT using only 10-20% of the training data.

## Key contributions

- Applies RLVR with GRPO and a script fidelity reward (SHR) to code-switched ASR to directly optimize sequence-level transcription quality and encourage correct writing systems at code-switch boundaries.
- Introduces a training-time two-pass draft-and-refinement procedure that conditions a second decoding pass on the best draft to stimulate self-correction behavior.
- Demonstrates data-efficient scaling where 10% to 20% training data matches or outperforms 100% data LoRA SFT, with the largest gains observed on typologically distant language pairs.
- Shows zero-shot transfer from TTS-synthesized training speech to human-recorded code-switching corpora (SwitchLingua).

## Problem

Code-switched automatic speech recognition (CS-ASR) struggles due to rapidly shifting acoustic and linguistic cues combined with scarce labeled training data. Standard speech-augmented large language models (speech-LLMs) are autoregressively trained via token-level cross-entropy, suffering from exposure bias and language confusion or script hallucination at code-switch boundaries. Prior approaches fail to directly optimize sequence-level metrics like CER, necessitating data-efficient adaptation techniques.

## Method

The method builds on Qwen2-Audio-7B-Instruct, freezing the Whisper-based audio encoder while updating all parameters of the Qwen-2 LLM decoder using Group Relative Policy Optimization (GRPO). For each input audio and language context prompt, the model samples G=8 candidate completions at temperature 1.0, and computes a composite reward combining Levenshtein Character Error Rate (CER) and a Script Fidelity Reward (SHR). The SHR grants a binary bonus if all characters belong to the union of Unicode scripts for the target language pair, weighted by a coefficient beta_sf = 0.05. Rewards are z-scored within the group to derive advantages without a learned value function, optimized via a clipped surrogate objective with KL regularization.

To improve robustness, a training-time two-step draft-and-refinement procedure is introduced. In the first pass, G drafts are sampled, rewards are computed, and a policy update occurs. The highest-reward draft is selected, and a second decoding pass is conditioned on the original audio along with this draft to sample G refinements, followed by a second GRPO policy update. Training uses DeepSpeed ZeRO-2 across 8 GPUs with a per-device batch size of 1, gradient accumulation of 8, and a constant learning rate of 1e-6. Two-pass models are trained for 4 epochs (2 updates per step) and single-pass models for 8 epochs, using bfloat16 precision.

## Experimental setup

Experiments use the CS-FLEURS XTTS-TRAIN dataset (128 hours, 16 X-English pairs, subsampled to 10% or 20%) for training, and evaluate on CS-FLEURS READ-TEST (3.3 hours, 14 pairs) and SwitchLingua (8 supported X-English pairs, 80+ hours of human-recorded audio) for zero-shot transfer. Baselines include a format-only prompt baseline and LoRA SFT (r=64, alpha=128, dropout=0.05) trained on 100% of the training set. Evaluation metrics are Character Error Rate (CER) and Script Hallucination Rate (SHR).

## Results

On CS-FLEURS read_test, 20% RLVR with refinement and SHR achieves a micro-averaged CER of 0.147, outperforming 100% LoRA SFT (0.159) while using 5x less data. On the zero-shot SwitchLingua transfer test, 20% RLVR achieves 0.219 micro-averaged CER compared to 0.246 for 100% LoRA SFT. RLVR yields massive improvements on typologically distant language pairs (e.g., ara-eng CER 0.393 vs 0.831 for LoRA on SwitchLingua), whereas LoRA maintains an advantage on specific European pairs and cmn-eng where baseline CER is already very low.

| System | CS-FLEURS Read-Test (Avg CER) | SwitchLingua Zero-Shot (Avg CER) |
|---|---|---|
| Base Qwen2-Audio | 0.465 / 0.553 | 0.587 / 0.609 |
| 100% LoRA SFT | 0.138 / 0.159 | 0.265 / 0.246 |
| 10% RLVR (CER + refine) | 0.141 / 0.155 | 0.239 / 0.229 |
| 10% RLVR (CER + SHR + refine) | 0.138 / 0.155 | 0.234 / 0.224 |
| 20% RLVR (CER + SHR + refine) | 0.134 / 0.147 | 0.229 / 0.219 |

## Limitations

The study is restricted to 10 language pairs supported by Qwen2-Audio, excluding pairs involving unhandled languages like Cantonese or Hindi. Two-pass refinement can occasionally overcorrect on language pairs with ambiguous script boundaries, such as Arabic-English, leading to performance degradation. The base model's frozen audio encoder and fixed LLM backbone limit adaptation capacity compared to full fine-tuning.

## Why read this

Speech and ML researchers focusing on audio-language models will learn how verifiable rewards and sequence-level RL (GRPO) can drastically reduce data requirements for code-switched ASR. It provides actionable insights into reward engineering—specifically combining error-rate penalties with script fidelity constraints and multi-pass self-correction.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multilingual automatic speech recognition systems, voice assistants, and audio transcription services targeting code-switched and multilingual user populations.

## Related

- (link related pages by id as the wiki grows)
