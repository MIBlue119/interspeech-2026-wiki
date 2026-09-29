---
id: jiang26_interspeech
category: tts
labels: [generative-model]
institutions: ["Northwestern Polytechnical University", "Xiaomi"]
code: https://github.com/xiaomi-research/diffrhythm2
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-128
pdf: https://www.isca-archive.org/interspeech_2026/jiang26_interspeech.pdf
---

# DiffRhythm 2: Efficient and High Fidelity Song Generation via Block Flow Matching

*Yuepeng Jiang, Huakang Chen, Ziqian Ning, Jixun Yao, zerui Han, Di Wu, Meng Meng, Jian Luan, Zhonghua Fu, Lei Xie*

[PDF](https://www.isca-archive.org/interspeech_2026/jiang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jiang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-128)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — DiffRhythm 2 is an end-to-end semi-autoregressive song generation framework utilizing block flow matching, a 5 Hz music VAE, and cross-pair preference optimization to produce 210-second songs with faithful lyric alignment and strong open-source benchmark performance.

## Key contributions

- A semi-autoregressive block flow matching architecture that achieves reliable lyric-vocal alignment without external duration labels or explicit constraints.
- Stochastic block representation alignment (REPA) loss using MuQ representations to improve long-sequence structural coherence and musicality.
- Cross-pair preference optimization (CPPO) that groups and jointly optimizes conflicting/synergistic preference pairs in a single model, avoiding weight-merging degradation.
- A customized 5 Hz music VAE that achieves a 4800× encoding and 9600× decoding compression ratio to enable feasible long-sequence modeling.

## Problem

Generating full-length songs exceeding three minutes requires joint modeling of lyrics, structure, singing vocals, and accompaniment. Existing non-autoregressive models struggle with long-sequence lyric-vocal alignment unless constrained by sentence-level timestamps or intermediate representations, which often hurt creativity and musicality. Meanwhile, autoregressive alternatives suffer from slow inference speeds, and multi-preference alignment via independent DPO models followed by weight interpolation causes performance degradation due to averaging effects.

## Method

DiffRhythm 2 combines a 5 Hz music VAE with a Diffusion Transformer. The VAE processes 24 kHz audio and reconstructs it at 48 kHz, employing Stable Audio 2 VAE encoder architecture, an intermediate transformer block, and a BigVGAN decoder optimized via multi-scale mel, multi-scale STFT, and CQT/multi-period/multi-scale discriminators.

The generative backbone uses block flow matching. A target latent sequence $Z$ of length $l$ is split into blocks of size $b$ ($k = \lceil l/b \rceil$). Each block is generated via flow matching conditioning on style prompts $S$, lyrics $L$, timestep $t$, and preceding blocks via a block-level causal attention mask. The input format stacks clean and noisy block sequences paired with an attention mask where the $i$-th block attends to clean blocks $1$ through $i-1$ and its own noisy block. Timesteps are fixed to $-1$ for prompts/lyrics, $1$ for clean sequences, and sampled from $U[0, 1]$ independently for noisy blocks.

Variable length generation is supported by appending $n$ End-of-Prediction (EOP) frames modeled as a constant vector of ones ($N(1, 0)$) to the final block. To guide structure, a stochastic block REPA loss randomly samples 10 blocks per noisy sequence against MuQ target representations. For multi-preference tuning, cross-pair preference optimization pairs (musicality, lyric alignment) and (style similarity, audio quality) during DPO training, where winning samples satisfy both preferences and losing samples satisfy at least one.

## Experimental setup

Trained on 1.4 million songs comprising roughly 70,000 hours of Chinese, English, and instrumental music (4:5:1 ratio). Evaluated on a test set of 50 real and 50 generated lyrics paired with 3 randomized style prompts each (300 total cases). Compared against commercial baselines (Suno V4.5, Mureka-O1) and open-source models (DiffRhythm+, ACE-Step, LeVo). Evaluated via professional human MOS (MUS, HAR, VOC, ACC, OVP) and objective metrics (PER, Mulan-T, Mulan-A, Audiobox-Aesthetics, SongEval).

## Results

DiffRhythm 2 achieves a Phoneme Error Rate (PER) of 0.13 and Mulan-T text prompt style similarity of 0.40, outperforming open-source baselines. In subjective evaluations, it attains a musicality (MUS) score of 3.57, vocal-accompaniment harmony (HAR) of 3.81, and overall performance (OVP) of 3.77, beating ACE-Step (OVP 3.55) and LeVo (OVP 3.56). Ablation studies show that removing CPPO degrades PER to 0.18 and lowers SongEval overall musicality (MU) from 3.93 to 3.57, while removing REPA loss leads to structural alignment failure.

| Model | PER $\downarrow$ | Mulan-T $\uparrow$ | MUS $\uparrow$ | HAR $\uparrow$ | OVP $\uparrow$ |
|---|---|---|---|---|---|
| SUNO V4.5 | 0.28 | 0.38 | 3.68 | 4.03 | 3.92 |
| Mureka-O1 | 0.09 | 0.37 | 3.71 | 3.99 | 3.87 |
| DiffRhythm+ | 0.15 | 0.25 | 3.10 | 3.22 | 3.27 |
| ACE-Step | 0.23 | 0.28 | 3.40 | 3.75 | 3.55 |
| LeVo | 0.19 | 0.35 | 3.48 | 3.68 | 3.56 |
| DiffRhythm 2 | 0.13 | 0.40 | 3.57 | 3.81 | 3.77 |

## Limitations

The 5 Hz low-frame-rate VAE compresses audio heavily, imposing an upper bound on reconstructed audio fidelity compared to real recordings. Global modeling of audio style prompts limits fine-grained stylistic capture (lower Mulan-A score than LeVo). Open-source models still lag behind commercial benchmarks like Suno and Mureka in overall vocal quality and emotional nuance.

## Why read this

Read this if you want to understand how block flow matching and cross-pair preference optimization can solve long-sequence alignment and reward-merging degradation in generative audio without autoregressive latency bottlenecks.

## Code

- https://github.com/xiaomi-research/diffrhythm2

## Applications

Full-length controllable song generation, interactive music creation platforms, and multi-track audio generation.

## Institutions / 機構

Northwestern Polytechnical University, Xiaomi

## Related

- (link related pages by id as the wiki grows)
