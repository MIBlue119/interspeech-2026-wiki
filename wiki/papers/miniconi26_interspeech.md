---
id: miniconi26_interspeech
category: resources-evaluation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-449
pdf: https://www.isca-archive.org/interspeech_2026/miniconi26_interspeech.pdf
---

# TDScore: Learning Synthetic Speech Quality Predictors from TTS Training Dynamics without Human annotation

*Natacha Miniconi, Meysam Shamsi, Anthony Larcher*

[PDF](https://www.isca-archive.org/interspeech_2026/miniconi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/miniconi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-449)

**Category:** `resources-evaluation`

**TL;DR** — TDScore is a zero-human-annotation framework that trains automatic speech quality predictors by exploiting the training dynamics (checkpoint iterations and loss values) of text-to-speech models, achieving out-of-domain system-level Spearman correlations up to 0.73 on BVCC.

## Key contributions

- Proposes a zero-human-annotation framework for synthetic speech quality estimation using TTS training metadata (checkpoint iteration index and training loss).
- Introduces a checkpoint selection strategy using objective metrics to discard saturated, low-variability checkpoints from training sets.
- Compares three different TTS model families (FastSpeech 2, FastPitch, F5-TTS) as generation sources to analyze how training dynamics impact proxy quality prediction.
- Demonstrates competitive or superior performance against existing unsupervised proxy methods (deepfake, layer-wise SSL, and uncertainty proxies) across French and English evaluation benchmarks.

## Problem

Subjective listening tests are the gold standard for assessing synthetic speech quality, but they are exceptionally costly, time-consuming, and difficult to scale across languages and domains. Existing automatic speech quality predictors eliminate human ratings during inference but still rely heavily on large collections of human-annotated Mean Opinion Score (MOS) data, causing them to degrade severely under domain shifts. Furthermore, human perceptual limitations make it hard to discern fine-grained quality improvements during model development, necessitating alternative proxy signals that require zero human annotation.

## Method

The TDScore framework operates in four pipeline steps: training a TTS model from scratch, periodically extracting synthetic speech and metadata (checkpoint iteration $k$ and training loss $\ell^{t_k}(x)$) from intermediate checkpoints using a fixed utterance set $P$, filtering out saturated checkpoints based on an ensemble of objective quality measures, and training a quality predictor from audio without human perceptual labels.

The core neural architecture adopts the SSL-MOS regression backbone, taking an audio waveform and predicting either the normalized training iteration index (TDScore-TTS-Ite) or standardized z-scored training loss (TDScore-TTS-Loss). Models are optimized using a pairwise ranking objective via binary cross-entropy over score differences. The data recipe uses the French Blizzard Challenge 2023 NEB corpus (51 hours, 63,943 training utterances sampled at 22.05 kHz from a single female speaker) across three architectures: FastSpeech 2 (FS, duration/energy/mel regression, 2020), FastPitch (FP, explicit F0/pitch conditioning, 2021), and F5-TTS (F5, flow-matching/consistent-diffusion paradigm, 2025). Checkpoints are saved every $10^4$ iterations.

Inference relies on feeding synthesized audio into the trained SSL-MOS backbone to output a relative quality score, which is then evaluated against human MOS datasets using Spearman Rank Correlation Coefficients (SRCC). Iteration-based supervision consistently outperforms loss-based supervision because training losses exhibit oscillatory, input-dependent behaviors, whereas checkpoint iterations reflect stable, progressive macro-level learning states—especially prominent in flow-matching models like F5-TTS.

## Experimental setup

Evaluated on four datasets: a held-out synthetic test split of $D_{loss}^t / D_{ite}^t$ (comprising 1,300 generated and 300 reference utterances for F5; 1,212 and 300 for FP; 1,208 and 300 for FS), VoiceMOS Challenge 2023 (BC, French, in-domain), BVCC (English, 2021, out-of-domain), and SOMOS (English, 2022, out-of-domain). Baselines include supervised SSL-MOS and TDScore-MOS models, alongside unsupervised proxy baselines including DeepFake detectors, layer-wise SSL distances, and uncertainty-based proxies. Models are trained over 5 random seeds using an SSL-MOS architecture.

## Results

On the in-domain French BC benchmark, TDScore-F5-Ite achieves a system-level SRCC of 0.74 (and 0.54 utterance-level), outperforming the DeepFake proxy baseline (0.60/0.50) and zero-shot uncertainty proxies (0.25). On the out-of-domain English BVCC benchmark, TDScore-F5-Ite reaches 0.73 system-level and 0.66 utterance-level SRCC, surpassing the DeepFake proxy system score of 0.34 and coming within striking distance of the fully supervised TDScore-MOS (0.88 system-level).

Ablations demonstrate that iteration-based predictors vastly outperform loss-based counterparts (e.g., F5-Ite achieves 0.73 system-level on BVCC compared to -0.64 for F5-Loss, where loss optimization paths fluctuate). The framework does not win as heavily on the SOMOS dataset (F5-Ite drops to 0.38 system-level / 0.22 utterance-level) or when using older architectures like FastSpeech 2, where intermediate quality progression during training is less smooth and monotonic.

| System / Condition | BC (Sys) | BC (Utt) | BVCC (Sys) | BVCC (Utt) | SOMOS (Sys) |
|---|---|---|---|---|---|
| SSL-MOS (Supervised) [4] | 0.65 | 0.40 | 0.94 | 0.86 | 0.80 |
| DeepFake Proxy [8] | 0.60 | 0.50 | 0.34 | 0.34 | - |
| TDScore–F5 – Ite (Ours) | 0.74 | 0.54 | 0.73 | 0.66 | 0.38 |
| TDScore–FP – Ite (Ours) | 0.54 | 0.37 | 0.41 | 0.37 | -0.04 |
| TDScore–FS – Ite (Ours) | 0.46 | 0.29 | 0.53 | 0.38 | 0.23 |

## Limitations

The framework is strictly bound by the quality dynamics of the underlying TTS training process; architectures whose intermediate checkpoints do not exhibit monotonic or smooth perceptual improvements yield weaker quality signals. The study is currently constrained to a single speaker dataset (51 hours of French audiobook data) and evaluates only three TTS architectures, leaving multi-speaker data scaling and multilingual TTS mixing largely unexplored.

## Why read this

Speech researchers and ML engineers building automatic evaluation metrics or TTS monitoring tools should read this to learn how to bypass expensive human MOS collection by leveraging internal training dynamics as a self-supervised proxy signal.

## Code

- https://git-lium.univ-lemans.fr/jsalt2025/wp1/tts4all_eval

## Applications

Automated text-to-speech development monitoring, hyperparameter tuning, checkpoint selection, and zero-human-annotation quality control for speech synthesis pipelines.

## Institutions / 機構

Le Mans Universite

**Funding / 經費:** European Union

## Related

- (link related pages by id as the wiki grows)
