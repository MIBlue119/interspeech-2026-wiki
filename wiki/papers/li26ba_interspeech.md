---
id: li26ba_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1823
pdf: https://www.isca-archive.org/interspeech_2026/li26ba_interspeech.pdf
---

# Resonate: Reinforcing Text-to-Audio Generation via Online Feedback from Large Audio Language Models

*Xiquan Li, Junxi Liu, Wenxi Chen, Haina Zhu, Ziyang Ma, Xie Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/li26ba_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26ba_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1823)

**TL;DR** — Resonate introduces online Group Relative Policy Optimization (Flow-GRPO) and Large Audio Language Model (LALM) feedback for text-to-audio generation, establishing a new SOTA on TTA-Bench with 470M parameters.

## Key contributions

- First successful integration of online reinforcement learning (GRPO) into text-to-audio generation via a continuous SDE-based sampling formulation.
- Adoption of Large Audio Language Models (LALMs) framed as an Audio Question Answering task (AQAScore) to provide fine-grained, human-aligned reward signals.
- A compact 470M-parameter Flux-style flow Transformer model (Resonate) that sets new state-of-the-art results on TTA-Bench in both quality and semantic alignment.

## Problem

Prior text-to-audio methods predominantly rely on offline reinforcement learning paradigms like Direct Preference Optimization (DPO), which suffer from distribution shifts and restricted policy exploration due to decoupled training and data generation. Furthermore, existing frameworks rely heavily on Contrastive Language-Audio Pretraining (CLAP) models as reward functions, which endure from a 'bag-of-words' effect that lacks temporal and compositional reasoning. These limitations yield coarse-grained rewards that align poorly with human perception, hindering progress in complex, multi-event acoustic generation.

## Method

Resonate uses a Flux-style flow Transformer backbone containing 16 Multi-Modal DiT (MMDiT) blocks and 36 single-modal DiT blocks with a hidden dimension of 448 (470M parameters). Text prompts are encoded using FLAN-T5, while audio latents are derived from VAE-encoded mel-spectrograms. The model is initially pre-trained using the Conditional Flow Matching (CFM) objective.

To apply online RL, the deterministic flow-matching ODE sampler is converted into an equivalent reverse-time Stochastic Differential Equation (SDE) using a noise schedule parameter $\sigma_t = a \sqrt{\frac{1-t}{t}}$ where $a=0.7$, enabling stochastic exploration during generation. The training process uses Flow-GRPO, which formalizes generation as a Markov Decision Process where rewards are assigned at the terminal step. For each prompt, a group of $G=24$ trajectories is sampled, and advantages are computed via normalized terminal rewards. The policy is optimized by maximizing a clipped surrogate objective with a KL divergence penalty coefficient of $\beta=0.04$.

The reward model uses Qwen2.5-Omni, framing audio evaluation as an Audio Question Answering (AQA) task with the query: 'Does the audio contain the sound events described by the text: {c}? Please answer yes or no.' The reward is defined as the softmax-normalized probability of the affirmative response, providing granular, human-aligned supervision without triggering reward hacking.

## Experimental setup

Pre-trained on a curated corpus of 3.7 million audio-text pairs (~10,000 hours) sourced from AudioCaps, AudioSet, Clotho, VGGSound, WavCaps, and AudioStock. Evaluated on the 1,500-prompt Accuracy subset of TTA-Bench. Compared against baselines including AudioLDM-L-Full, AudioLDM-2-Large, Tango-Full, Tango-2-Full, MeanAudio-L-Full, EzAudio-XL, GenAU-L-Full, and TangoFlux. Evaluated using AudioBox-Aesthetics objective metrics (Content Enjoyment, Content Usefulness, Production Complexity, Production Quality), Microsoft CLAP score, AQAScore computed via Qwen3-Omni-Instruct, and human expert subjective ratings (Overall Quality and Relevance). Pre-trained for 500k steps with batch size 256; post-trained with Flow-GRPO for 1,000 steps using group size 24.

## Results

Resonate-GRPO achieves state-of-the-art performance on TTA-Bench, securing an AQAScore of 0.737, a CLAP score of 0.476, and top-tier Production Quality (PQ) of 6.064 while maintaining a Content Usefulness score of 5.328. It outperforms offline DPO and SFT baselines by wide margins; specifically, DPO yields an AQAScore of only 0.676, and SFT causes degradation in acoustic fidelity due to noisy dataset conditions. Subjectively, human experts rate Resonate-GRPO highest with an Overall Quality (OVL) of 3.86 and Relevance (REL) of 3.83. Ablations show that LALM-based rewards (AQAScore) outperform CLAP-based rewards in overall quality and semantic alignment, and group size scaling from 4 to 24 monotonically improves performance.

| System | Params | NFE | CU $\uparrow$ | PQ $\uparrow$ | CLAP $\uparrow$ | AQAScore $\uparrow$ |
|---|---|---|---|---|---|---|
| AudioLDM-2-Large | 718M | 200 | 5.440 | 5.984 | 0.415 | 0.589 |
| Tango-2-Full | 866M | 200 | 5.196 | 5.895 | 0.467 | 0.702 |
| MeanAudio-L-Full | 480M | 25 | 5.151 | 5.743 | 0.469 | 0.729 |
| TangoFlux | 516M | 50 | 5.074 | 5.782 | 0.472 | 0.677 |
| Resonate-PT (Ours) | 470M | 25 | 5.238 | 5.923 | 0.458 | 0.651 |
| Resonate-GRPO (Ours) | 470M | 25 | 5.328 | 6.064 | 0.476 | 0.737 |

## Limitations

The model's performance relies heavily on the quality and reasoning capability of the underlying LALM reward model, which introduces significant compute overhead during the RL feedback loop. The study is scoped primarily to English text prompts and standard acoustic evaluation datasets, leaving multilingual and extreme out-of-domain sound generation underexplored. Furthermore, supervised fine-tuning (SFT) on uncurated 'in-the-wild' datasets caused acoustic degradation, indicating that online RL is sensitive to initial data distributions and requires careful regularization.

## Why read this

Researchers building text-to-audio or speech generation systems should read this paper to see how online RL (Flow-GRPO) paired with LALM-derived rewards can decisively overcome the limitations of offline DPO and CLAP-based reward models.

## Code

- https://github.com/xiquan-li/Resonate

## Applications

Automated sound effect generation for film, gaming, virtual reality, and multimedia content creation.

## Related

- (link related pages by id as the wiki grows)
