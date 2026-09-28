---
id: wang26s_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1102
pdf: https://www.isca-archive.org/interspeech_2026/wang26s_interspeech.pdf
---

# FlowTTS-GRPO: Online Reinforcement Learning with Multi-Objective Reward Optimization for Flow-Matching Based Text-to-Speech

*Haoxu Wang, Biao Tian, Weiqing Li, Xiang Lv, Han Zhao, Xiangang Li*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26s_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26s_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1102)

**TL;DR** — FlowTTS-GRPO is an online reinforcement learning framework that fine-tunes flow-matching (FM) text-to-speech models by converting ODE trajectories into stochastic differential equation paths, achieving state-of-the-art speaker similarity on Seed-TTS-Eval-zh.

## Key contributions

- First successful application of Flow-GRPO to zero-shot TTS, enabling direct fine-tuning of open-source FM models without separate stochastic generators or auxiliary networks (like value models or preference pairs).
- Formulation of a multi-objective reward combination using standard deviation normalization to stabilize and accelerate convergence across conflicting targets (speaker similarity, ASR, and DNSMOS).
- Introduction of hard case text augmentation strategies (Local, Sparse Multi-word, and Global Sentence Repetitions) to improve robustness on edge-case linguistic patterns.
- Discovery of key practical training dynamics: omitting classifier-free guidance during training accelerates exploration, and RL on FM components specifically optimizes audio-detail metrics.

## Problem

Prior RL research for speech generation heavily focuses on autoregressive language models via PPO or DPO, which either require complex auxiliary value models, are unstable, or depend on expensive human-preference pairs. Meanwhile, existing non-autoregressive Flow Matching TTS models produce superior acoustic details and faster inference, but lack direct online RL fine-tuning capabilities that align their generations with human perceptual preferences without auxiliary generator networks.

## Method

The method models the FM decoding process as a Markov Decision Process (MDP) by treating states as conditionals and latents, actions as predicted velocities, and defining a terminal reward at step $t=1$. To introduce the necessary stochasticity for GRPO without a separate stochastic generator, the deterministic ODE sampler is transformed into an equivalent reverse-time SDE path with noise level parameter $\sigma_t = a \sqrt{\frac{1-t}{t}}$, utilizing a windowed training subset ($t \in [S_{\min}, S_{\min} + w_s]$).

The multi-objective reward function combines Speaker Similarity ($R_{SS}$ via ERes2Net), linguistic accuracy ($R_{asr}$ via Paraformer/Whisper-v3), and perceptual quality ($R_{mos}$ via P.835 DNSMOS OVRL). To prevent reward hacking and uneven scale dominance, rewards are combined via a weighted sum of standard-deviation-normalized individual rewards across the batch. Training utilizes LoRA adapters (rank 32, alpha 64; 10.09M parameters / ~2.8% of FM model weights) on top of pretrained CosyVoice 3.0 and F5-TTS architectures, using 8 GPUs, a learning rate of 1e-4 (CosyVoice) or 5e-5 (F5-TTS) with linear decay over 10k steps, and omitting classifier-free guidance (CFG) during training loops to enhance exploration.

## Experimental setup

Experiments use WenetSpeech4TTS Premium (Chinese) and LibriTTS-960 (English) combined into 40k easy samples, alongside 20k hard-case augmented Chinese samples. Evaluation is performed on Seed-TTS-Eval (test-zh, test-en, test-hard) and CV3-Eval (multilingual voice cloning across 9 languages, 500 samples each). Baselines include F5-TTS, MaskGCT, Seed-TTS, CosyVoice 1.0/2.0/3.0, and LM-RL/DiffRO variants. Metrics include CER, WER, WavLM/ERes2Net Speaker Similarity (SS1/SS2), and P.808/P.835 DNSMOS.

## Results

On Seed-TTS-Eval-zh, CosyVoice 3.0 with FlowTTS-GRPO improves ERes2Net speaker similarity (SS2) from 0.830 to 0.859 and WavLM similarity (SS1) from 0.777 to 0.804, surpassing closed-source Seed-TTS (SS1 0.755). F5-TTS with FlowTTS-GRPO drops Chinese CER from 1.56 to 1.55 (and down to 5.44 on zh in multilingual sets) while raising SS2 from 0.794 to 0.827. Ablations reveal that weighted combination with standard deviation normalization significantly accelerates DNSMOS and similarity growth compared to probabilistic assignment, and omitting CFG during training yields faster reward saturation.

| System | Condition | CER $\downarrow$ | WER $\downarrow$ | SS1 $\uparrow$ | SS2 $\uparrow$ | P835 $\uparrow$ |
|---|---|---|---|---|---|---|
| CosyVoice 3.0-0.5B | Baseline | 1.12 | 2.21 | 0.781 | 0.837 | 3.353 |
| CosyVoice 3.0-0.5B + FM-GRPO | Ours (9545 steps) | 1.26 | 2.49 | 0.804 | 0.859 | 3.536 |
| F5-TTS Base v1 | Baseline | 1.56 | 1.83 | 0.741 | 0.794 | - |
| F5-TTS + FM-GRPO | Ours (1289 steps) | 1.55 | 1.73 | 0.777 | 0.827 | 3.514 |

## Limitations

The current framework was evaluated primarily on English and Chinese training sets, relying on cross-lingual zero-shot generalization for other languages rather than native multilingual RL optimization. Training F5-TTS required substantially more compute resources and steps than hybrid LLM-FM models like CosyVoice, and ASR reward metrics on hybrid models can plateau quickly due to constraints imposed by frozen LLM front-ends.

## Why read this

Speech researchers and engineers working on generative voice cloning will learn how to apply stable online reinforcement learning directly to flow-matching audio models without complex auxiliary networks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Zero-shot voice cloning, expressive text-to-speech generation, multi-lingual dubbing, and high-fidelity speech synthesis.

## Related

- (link related pages by id as the wiki grows)
