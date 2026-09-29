---
id: hao26_interspeech
category: tts
labels: [dataset-or-benchmark-release, generative-model]
institutions: ["Northwestern Polytechnical University", "Giant Network"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1547
pdf: https://www.isca-archive.org/interspeech_2026/hao26_interspeech.pdf
---

# YingMusic-Singer: Controllable Singing Voice Synthesis with Flexible Lyric Manipulation and Annotation-free Melody Guidance

*Chunbo Hao, Junjie Zheng, Guobin Ma, Yuepeng Jiang, Huakang Chen, Wenjie Tian, Gongyu Chen, Zihao Chen, Lei Xie*

[PDF](https://www.isca-archive.org/interspeech_2026/hao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1547)

**Category:** `tts` · **Labels:** `dataset-or-benchmark-release`, `generative-model`

**TL;DR** — YingMusic-Singer is a fully diffusion-based singing voice synthesis model that performs alignment-free lyric editing using three inputs—an optional timbre reference, a melody-providing singing clip, and modified lyrics—outperforming baselines in melody preservation and lyric adherence on a newly introduced benchmark.

## Key contributions

- Introduces an alignment-free singing voice editing paradigm that operates directly from audio melody clips and modified lyrics without requiring manual time-alignment or MIDI scores.
- Applies a curriculum training strategy combining TTS pretraining, domain-adapted SFT with sentence-level alignment, and a Centered Kernel Alignment (CKA) loss for melody guidance.
- Integrates Group Relative Policy Optimization (GRPO) using four multi-dimensional reward models to resolve the trade-off between phonetic intelligibility and melody adherence without a value network.
- Constructs LyricEditBench, a benchmark comprising 7,200 test instances across six common lyric modification scenarios for evaluation under matched melody conditions.

## Problem

Regenerating singing voices with edited lyrics while maintaining original melodies typically demands painstaking manual alignment of word-level timestamps with MIDI notes or relies on restrictive incontext learning masked-region strategies. Prior alignment-free models like Vevo2 suffer from poor intelligibility and weak melody adherence, whereas systems like SoulX-Singer still require manual timestamp annotation. This lack of scalable, flexible editing workflows creates a heavy bottleneck for tasks such as cross-lingual song translation and rapid vocal prototyping.

## Method

YingMusic-Singer operates at 44.1 kHz, utilizing a Stable Audio 2 VAE encoder to downsample stereo waveforms by 2048 to latents z, paired with a decoder for reconstruction. The melody extractor uses a pretrained MIDI extraction model's encoder to yield representations h, which are temporally interpolated to match latent frame rates. An IPA tokenizer maps Chinese and English lyrics into discrete phonemes, embedded with sentence-level onset alignment to separate prompt and generation zones.

The core backbone is a 727.3M-parameter DiT-based Conditional Flow Matching (CFM) network (22 layers, 16 heads, hidden dim 1024) following F5-TTS, trained with random latent frame masking gamma between 70% and 100%. The training pipeline utilizes curriculum learning: TTS pretraining on Emilia data, SFT Phase 1 for singing domain adaptation (sentence-level alignment), and SFT Phase 2 activating melody conditioning with an MSE reconstruction loss combined with a CKA loss measuring Gram matrix alignment between predicted velocity fields and interpolated melody representations.

Because SFT Phase 2 exposes a persistent trade-off between phoneme error rate and melody adherence, the authors apply Group Relative Policy Optimization (GRPO) to optimize the model online using an SDE formulation with a bounded stochastic window. Four equal-weight reward models score generation groups of size 8, computing within-group relative advantages using a clipped surrogate objective and a KL divergence penalty against the reference policy, all without requiring a separate value network.

## Experimental setup

TTS pretraining used the Chinese and English subsets of Emilia. Singing SFT used 33,562.6 hours of licensed music tracks segmented via SongFormer and isolated with Mel-band RoFormer. GRPO used a filtered subset of 20,240 clips selected via ASR PER < 5%, pyannote diarization, and DNSMOS P.808 quality >= 3.5. Evaluations used LyricEditBench (7,200 test instances derived from GTSinger, filtered via DeepSeek V3.2 into 6 modification types). Metrics include Phoneme Error Rate (PER), Speaker Similarity (SIM) via WavLM-large, F0 Pearson Correlation (F0-CORR) via RMVPE, Vocal Score (VS) via VocalVerse2, and N-MOS/M-MOS subjective ratings by 30 listeners. Trained on 8 x A800 80GB GPUs using DDP and bf16.

## Results

On LyricEditBench under Melody Control (cross-timbre), YingMusic-Singer achieves substantially lower Phoneme Error Rates (e.g., PSub Chinese PER 0.0192 vs Vevo2's 0.1378) and higher F0 Pearson Correlation (e.g., FSub Chinese F0-CORR 0.9428 vs Vevo2's 0.8188). In subjective ratings, YingMusic-Singer scores higher across all languages and settings, reaching 4.51 M-MOS in English Melody Control compared to Vevo2's 4.31. Ablations confirm that removing temporal dropout from the melody latent destroys intelligibility by allowing semantic leakage, while GRPO successfully recovers PER degradation introduced by SFT Phase 2 while further boosting melody correlation.

| System & Condition | PER (ZH PSub) | F0-CORR (ZH PSub) | VS (ZH PSub) | PER (EN PSub) | F0-CORR (EN PSub) | VS (EN PSub) |
|---|---|---|---|---|---|---|
| Vevo2 [9] (Melody Control) | 0.1378 | 0.8471 | 1.3578 | 0.3352 | 0.8794 | 1.0340 |
| YingMusic-Singer (Melody Control) | 0.0192 | 0.9364 | 2.0779 | 0.0685 | 0.9355 | 1.5054 |
| Vevo2 [9] (Sing Edit) | 0.1290 | 0.8858 | 1.4860 | 0.3414 | 0.9258 | 1.0910 |
| YingMusic-Singer (Sing Edit) | 0.0214 | 0.9615 | 1.9761 | 0.0906 | 0.9610 | 1.4448 |

## Limitations

Speaker similarity scores remain slightly lower than multi-stage architectures like Vevo2 because a single-stage CFM jointly handles timbre, melody, and text conditioning. Evaluation is constrained to Chinese and English languages and six defined text editing categories, meaning performance on more diverse tonal languages or extreme out-of-domain vocal styles remains unverified.

## Why read this

Researchers and engineers working on generative audio and singing voice editing will find this paper valuable for its practical application of GRPO reinforcement learning to align diffusion models without training a value network. It offers a blueprint for building single-stage, alignment-free editing pipelines that balance phoneme intelligibility with melodic precision.

## Code

- https://github.com/ASLP-lab/YingMusic-Singer-Plus

## Applications

Personalized cover song generation, song lyric adaptation, rapid vocal arrangement prototyping, and cross-lingual song localization.

## Institutions / 機構

Northwestern Polytechnical University, Giant Network

## Related

- (link related pages by id as the wiki grows)
