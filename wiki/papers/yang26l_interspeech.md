---
id: yang26l_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2018
pdf: https://www.isca-archive.org/interspeech_2026/yang26l_interspeech.pdf
---

# CraftTTS: Fine-Grained Prosody Control for Text-to-Speech

[PDF](https://www.isca-archive.org/interspeech_2026/yang26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2018)

**TL;DR** — CraftTTS introduces a three-stage alignment framework combining preference construction, SFT, DPO, and GRPO to achieve stable word-level prosody control in zero-shot text-to-speech without sacrificing global naturalness.

## Problem

Modern LLM-based TTS models excel at zero-shot voice cloning but struggle with fine-grained word-level prosodic control, such as local intensity or tempo instructions. Enforcing these strict local instructions typically disrupts autoregressive acoustic priors, causing artifacts, unnatural pauses, or emotional leakage due to data scarcity and conflicting objectives.

## Method

The framework operates in three stages using CosyVoice 2 as the backbone. In Stage 1, DeepSeek-V3 annotates plain text with word-level tags (strong, weak, fast, slow), and an external Indextts2 teacher generates multi-round preference pairs via best-of-N selection and token-level overlapping continuations. In Stage 2, the model undergoes joint Supervised Fine-Tuning and Direct Preference Optimization to enhance local tag sensitivity. In Stage 3, Group Relative Policy Optimization (GRPO) is applied using a multi-dimensional reward system comprising a pause-aware ASR reward, a decoupled emotion reward for intensity contrast, and a length penalty for tempo regularization.

## Results

Evaluated on Chinese subsets of InstructTTSEval and seed-tts-eval using 8 NVIDIA A100 GPUs, CraftTTS achieves superior performance across subjective 5-point MOS metrics, reaching 3.73 in SMOS, 3.87 in NMOS, 3.41 in STMOS, and 3.35 in SPMOS, outperforming baseline CosyVoice 2 and intermediate SFT/DPO variants. Objective evaluations show a character error rate of 7.01% and speaker similarity of 0.6820. Ablations demonstrate that progressive training through Stage 3 successfully resolves trade-offs between local control and global naturalness.

## Code

- https://ywbn.github.io/CraftTTS/

## Applications

Engineers and developers building expressive conversational agents, audiobook narrators, or virtual assistants requiring precise word-level cadence and emotion control.

## Limitations

Evaluated exclusively on Chinese datasets and language corpora.

## Related

- (link related pages by id as the wiki grows)
