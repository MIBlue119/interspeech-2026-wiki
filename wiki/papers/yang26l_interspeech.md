---
id: yang26l_interspeech
category: tts
labels: [generative-model]
institutions: ["Beijing University of Posts and Telecommunications", "Hello Group Inc"]
code: https://ywbn.github.io/CraftTTS/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2018
pdf: https://www.isca-archive.org/interspeech_2026/yang26l_interspeech.pdf
---

# CraftTTS: Fine-Grained Prosody Control for Text-to-Speech

*Wenbing Yang, Qihang Lu, Bingsong Bai, Zihan Sun, Yueran Hou, Peilei Jia, Yingming Gao, Ya Li, Jun Gao*

[PDF](https://www.isca-archive.org/interspeech_2026/yang26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2018)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — CraftTTS introduces a three-stage alignment framework (compute-driven data generation, SFT+DPO, and GRPO with multi-dimensional prosody rewards) to achieve stable word-level prosody and tempo control in LLM-based zero-shot text-to-speech models without sacrificing global fluency or speaker identity. It achieves a state-of-the-art prosodic naturalness MOS (NMOS) of 3.87 and speed matching MOS (SPMOS) of 3.35.

## Key contributions

- A scalable, compute-driven zero-shot data pipeline leveraging DeepSeek-V3 and an external teacher model (Indextts2) to automatically construct large-scale prosody preference pairs without human annotation.
- A systematic audio alignment paradigm (SFT followed by DPO) adapted for discrete audio tokens to establish localized tag controllability without corrupting pre-trained autoregressive priors.
- A multi-dimensional reinforcement learning reward mechanism using GRPO that decouples intelligibility, intensity contrast, and rhythm/tempo regularization to prevent acoustic artifacts.
- Demonstrated ability to perform precise word-level prosody adjustments (strong, weak, fast, slow) while preserving the zero-shot voice cloning capabilities of the CosyVoice 2 backbone.

## Problem

Modern large language model-based text-to-speech (TTS) systems excel at zero-shot voice cloning and global prosody transfer, but they fail when required to perform fine-grained, word-level intensity and tempo control. Enforcing strict local acoustic instructions via heuristic prompting typically introduces severe acoustic artifacts, unnatural pauses, unnatural emotional leakage, and disrupted global fluency. This failure is primarily caused by two critical bottlenecks: a severe scarcity of precisely aligned expressive speech data lacking human annotation, and an inherent architectural conflict in autoregressive LLMs where aggressive local conditioning shatters the global acoustic prior.

## Method

CraftTTS operates as a three-stage training pipeline built upon the CosyVoice 2 backbone. In Stage 1, plain text is annotated with four discrete span-level prosody tags (strong, weak, fast, slow) using DeepSeek-V3. An external teacher model (Indextts2) uses multi-round autoregressive inference—propagating terminal acoustic tokens of previous segments as prefixes—to generate tag-consistent speech candidates. A best-of-N selection strategy filters these candidates based on speaker embedding cosine similarity for timbre preservation and length heuristics for speed control, yielding contrastive preference pairs (preferred multi-round stylized audio vs. rejected plain audio).

In Stage 2, the CosyVoice 2 backbone undergoes joint Supervised Fine-Tuning (SFT) and Direct Preference Optimization (DPO). SFT minimizes negative log-likelihood on the winning samples, while DPO maximizes the preference margin between tag-consistent audio and baseline audio using an implicit reward derived from the log-likelihood ratio between the active policy and a frozen reference model.

In Stage 3, to resolve the trade-off between strict local control and global naturalness, the model is optimized via Group Relative Policy Optimization (GRPO) without a value network. For each input text, G=8 candidate outputs are sampled and evaluated using a multi-dimensional prosodic reward: (1) a pause-aware ASR reward mapping punctuation to a boundary token '|' via Whisper to preserve phrasing; (2) a decoupled emotion reward that anchors generated speech toward a neutral emotional baseline while retaining non-neutral reference affect to prevent global emotional leakage; and (3) a tempo regularization reward that compares generated duration against text-derived base duration using a smoothly scaled directional factor. Group-wise Z-score normalization and a token-level KL divergence penalty constrain policy deviation.

## Experimental setup

The framework was evaluated using Chinese datasets: texts sourced from AISHELL-3 and THCHS-30, style prompts from StoryTTS, and evaluation subsets from InstructTTSEval and seed-tts-eval. Stage 2 training utilized 9,330 generated utterances; Stage 3 utilized 3,224 text prompts. Experiments were conducted on 8 NVIDIA A100 GPUs. Stage 2 trained for 13 epochs with Adam (lr 1e-5, beta=0.1, max norm 5.0). Stage 3 optimized via GRPO with G=8, temperature 1.0, lr 1e-6, clipping epsilon 0.2, KL penalty coefficient 0.01, and reward weights set to 0.6 (ASR), 0.15 (emotion), and 0.25 (tempo). Baselines included the original CosyVoice 2 backbone, intermediate SFT, and SFT+DPO models, evaluated via Word Error Rate (CER), speaker similarity (Sim), and 5-point MOS metrics (SMOS, NMOS, STMOS, SPMOS).

## Results

CraftTTS achieves superior subjective prosodic quality compared to the CosyVoice 2 baseline, raising NMOS from 3.67 to 3.87 and SPMOS from 3.09 to 3.35, while achieving an SMOS of 3.73. Speaker similarity remains tightly preserved at 0.6820 (vs 0.6999 baseline), and CER changes marginally from 6.36% to 7.01%, which is attributed to the pause-aware ASR reward penalizing unnatural pauses rather than pure lexical errors. Stage-wise ablations demonstrate that SFT alone improves stress matching (STMOS 3.43) but harms naturalness due to rigid behavioral imitation, whereas the full Stage 3 GRPO pipeline serves as the decisive turning point that suppresses acoustic artifacts and recovers overall naturalness. Acoustic deviation analysis confirms that 'strong' tags increase pitch standard deviation (+6.48) and range (+13.37), while 'fast' tags successfully increase characters per second (+0.54 CPS).

| Method | CER (↓) | Sim. (↑) | SMOS (↑) | NMOS (↑) | STMOS (↑) | SPMOS (↑) |
|---|---|---|---|---|---|---|
| Baseline (CosyVoice 2) | 6.36% | 0.6999 | 3.61±0.14 | 3.67±0.14 | 3.18±0.19 | 3.09±0.16 |
| + SFT | 7.34% | 0.6841 | 3.62±0.17 | 3.57±0.14 | 3.43±0.22 | 3.15±0.17 |
| + Stage 2 (SFT+DPO) | 7.38% | 0.6873 | 3.64±0.15 | 3.57±0.15 | 3.30±0.19 | 3.22±0.18 |
| CraftTTS (full model) | 7.01% | 0.6820 | 3.73±0.15 | 3.87±0.13 | 3.41±0.21 | 3.35±0.21 |

## Limitations

The current evaluation is restricted strictly to the Chinese language, leaving multilingual and cross-lingual generalization unverified. The pipeline relies heavily on external teacher models (Indextts2 and DeepSeek-V3) for data generation, which may bottleneck performance or inherit biases from those models. Furthermore, evaluation was conducted on short-to-medium sentences, and long-form document stability under intensive prosody tagging requires further scaling analysis.

## Why read this

Researchers and audio engineers working on controllable speech synthesis, LLM-based TTS alignment, or RLHF for discrete acoustic tokens should read this paper to understand how decoupled multi-dimensional rewards can stabilize localized prosody control without breaking global autoregressive priors.

## Code

- https://ywbn.github.io/CraftTTS/

## Applications

Expressive audiobook narration, conversational AI avatars, dynamic character voice acting in video games, and fine-grained emotional text-to-speech generation.

## Institutions / 機構

Beijing University of Posts and Telecommunications, Hello Group Inc

**Funding / 經費:** National Key R&D Program of China, National Natural Science Foundation of China, National Language Commission, National Social Science Fund of China

## Related

- [CtrlSpeech: Coarse-to-Fine Control for Expressive Speech Synthesis](zheng26c_interspeech.md) — same problem · relatedness 2.9/3
- [Refining Emphasis Control in Flow-Matching TTS via Preference Alignment and Reinforcement Learning](ye26b_interspeech.md) — same problem · relatedness 2.7/3
- [Dynamic Prosody Prediction in LLM-based TTS for Improving Speaker Similarity](mou26b_interspeech.md) — same problem · relatedness 2.5/3
- [Improving Flow Matching based Text-to-Speech with Dual-Model Preference Optimization and Classifier-Free Guidance](chen26y_interspeech.md) — same problem · relatedness 2.5/3
- [Unified Prosody Restoration Using Diffusion Models for Controllable Text-to-Speech Synthesis](ito26_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
