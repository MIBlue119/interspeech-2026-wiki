---
id: wang26s_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1102
pdf: https://www.isca-archive.org/interspeech_2026/wang26s_interspeech.pdf
---

# FlowTTS-GRPO: Online Reinforcement Learning with Multi-Objective Reward Optimization for Flow-Matching Based Text-to-Speech

[PDF](https://www.isca-archive.org/interspeech_2026/wang26s_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26s_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1102)

**TL;DR** — FlowTTS-GRPO introduces an online reinforcement learning framework for flow-matching-based text-to-speech models by converting ODE trajectories into SDE paths, achieving notable gains in speaker similarity and perceptual quality.

## Problem

Existing reinforcement learning research for text-to-speech heavily focuses on large language models, leaving flow-matching architectures largely under-explored. Prior trial applications of RL to flow-matching TTS either require complex auxiliary generators or use inefficient single-rollout setups that fail to leverage group-wise advantage comparisons and multi-objective optimization. Addressing this is crucial because zero-shot TTS must jointly preserve speaker identity, linguistic content, and perceptual quality under competing reward pressures.

## Method

The framework models the flow-matching decoding process as a Markov decision process by converting ordinary differential equation trajectories into stochastic differential equation paths, enabling direct policy fine-tuning without retraining auxiliary generative models. It employs Group Relative Policy Optimization (GRPO) to update only the flow-matching acoustic components of pretrained models—specifically tested on CosyVoice 3.0 and F5-TTS—using off-the-shelf reward signals. Multi-objective reward optimization balances speaker similarity via ERes2Net cosine similarity, linguistic accuracy via Paraformer and Whisper-v3 error rates, and perceptual quality via P.835 DNSMOS overall scores. Training incorporates window-based SDE sampling on early steps, weighted reward combinations, omitting classifier-free guidance during training to speed convergence, and synthesizing hard cases to enhance robustness.

## Results

Experiments on CosyVoice 3.0 and F5-TTS demonstrate objective and subjective preference gains in speaker similarity and perceptual quality, with F5-TTS additionally yielding improved intelligibility and lower word error rates. The authors observe that weighted reward combinations converge faster and more stably than probabilistic schemes. Ablations confirm that omitting classifier-free guidance accelerates convergence and that targeting hard cases boosts overall training robustness.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building zero-shot text-to-speech systems, voice cloning applications, and generative audio pipelines looking to align non-autoregressive models with human perceptual preferences.

## Limitations

The method requires careful tuning of multi-objective reward weights and SDE window parameters to prevent reward hacking and balance competing acoustic versus linguistic metrics.

## Related

- (link related pages by id as the wiki grows)
