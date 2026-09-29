---
id: zhang26x_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release, robustness-noise]
institutions: ["National Institute of Informatics"]
code: https://github.com/nii-yamagishilab/VoxEffects
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1621
pdf: https://www.isca-archive.org/interspeech_2026/zhang26x_interspeech.pdf
---

# VoxEffects: A Speech-Oriented Audio Effects Dataset and Benchmark

*Zhe Zhang, Yigitcan Özer, Junichi Yamagishi*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26x_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26x_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1621)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`, `robustness-noise`

**TL;DR** — VoxEffects introduces a speech-oriented audio effects dataset and multi-task benchmark (AudioMAE-Fx) to infer applied post-production chains and parameters, achieving up to 95.58% macro presence accuracy under robust degradation training.

## Key contributions

- VoxEffects dataset featuring clean speech processed through a 6-stage canonical speech post-production chain with 2,520 curated preset combinations.
- A reproducible audio renderer supporting offline synthesis and on-the-fly generation with multi-granularity supervision (presence, preset, count, and intensity).
- A standardized robustness protocol simulating capture-side and platform-side degradations (noise, resampling, codecs) across in-domain and out-of-domain evaluation splits.
- AudioMAE-Fx, an AudioMAE-based multi-task baseline demonstrating the necessity of curriculum-style robustness fine-tuning for cross-corpus generalization.

## Problem

Real-world speech audio is routinely processed by post-production effects that improve intelligibility but shift signal statistics, confounding downstream systems, audio forensics, and content understanding. Existing audio effect identification (AEI) research largely targets music production regimes (e.g., guitar or singing vocals) rather than speech pipelines, or focuses on binary anti-spoofing tasks instead of attributing benign processing chains. Furthermore, prior work fails to evaluate robustness against real-world capture and platform artifacts like resampling ladders and lossy compression, leaving a major gap in speech production understanding.

## Method

VoxEffects models a fixed canonical speech post-production chain consisting of six ordered effects: Denoising (DN), Dynamic Range Compression (DRC), Equalization (EQ), De-essing (DS), Reverberation (RVB), and Limiting (LIM), implemented via the Pedalboard library. Each effect $e \in \mathcal{V}$ is paired with a discrete preset bank $P_e$ containing a bypass state and $K_e$ quality-oriented presets (totaling 2,520 preset tuples $\mathbf{p}$). Degradations $D(\cdot)$ are independently parameterized via capture-side ($D_{\text{pre}}$) and platform-side ($D_{\text{post}}$) modules using additive noise, resampling, quantization, and lossy codecs under five settings: None, Pre-only, Post-only, Either, and Both.

The baseline model, AudioMAE-Fx, takes 16 kHz log-mel filterbank features as input and feeds them into a pretrained AudioMAE backbone. It employs lightweight prediction heads trained jointly via a multi-task objective: binary cross-entropy for $K$-way effect presence ($L_{\text{pres}}$, weighted by $\lambda_{\text{pres}}=5$), cross-entropy for $C$-way preset classification ($C=2520$), classification for active effect counts ($L_{\text{\#act}}$), and L1 losses for scalar ($L_s$) and vector intensity regression ($L_v$).

Training proceeds in two stages: Stage 1 fine-tunes on clean rendered data using AdamW with a base learning rate of $10^{-3}$, weight decay $0.05$, and a layer-wise learning rate decay factor of $0.75$ until plateau. Stage 2 executes robustness fine-tuning for an additional 50,000 steps by curriculum-style training on data augmented with 'Both' capture and platform degradations.

## Experimental setup

The dataset is built from clean source corpora (DAPS, EARS, TSP) split 8:1:1 for train/val/test to evaluate in-domain (ID) performance, using VCTK for out-of-domain (OOD) generalization. Models are evaluated across five degradation configurations using fixed subsets of 60 ID and 60 OOD utterances rendered across all 2,520 presets. Metrics include macro-averaged accuracy ($\text{Acc}_{\text{macro}}$), exact match ratio (EMR), Top-1/Top-5 preset accuracy, active count accuracy, and mean absolute error ($\text{MAE}_{\text{mean}}$, $\text{MAE}_{\text{overall}}$) for intensity regression.

## Results

Robustness fine-tuning substantially outperforms baseline training without augmentation, boosting OOD effect presence detection accuracy from 82.81% to 86.15% (and macro accuracy from 91.59% to 95.58% ID under 'Both' conditions). For fine-grained preset classification (2,520 classes), Top-1 accuracy improves from 5.76% to 12.19% on OOD and 21.52% to 36.78% ID when using degradation augmentation, though absolute numbers remain challenging due to perceptual overlap. In intensity regression, degradation fine-tuning reduces mean vector intensity MAE from 0.22 to 0.19 on OOD test sets.

| Test Augmentation | Train Augmentation | Effect Presence Acc_macro (ID/OOD) | Exact Match Ratio (ID/OOD) | Preset Top-1 Acc. (ID/OOD) | #Active Acc. (ID/OOD) | Intensity MAE_mean (ID/OOD) |
|---|---|---|---|---|---|---|
| None | None | 91.59 / 82.81 | 58.96 / 30.86 | 21.52 / 5.76 | 61.11 / 45.81 | 0.14 / 0.22 |
| None | Both | 95.58 / 86.15 | 76.48 / 39.22 | 36.78 / 12.19 | 77.24 / 47.36 | 0.10 / 0.19 |
| Both | None | 75.42 / 71.13 | 21.68 / 13.85 | 4.54 / 1.76 | 40.72 / 39.85 | 0.27 / 0.31 |
| Both | Both | 88.48 / 80.87 | 49.77 / 27.58 | 12.57 / 5.48 | 56.57 / 39.78 | 0.17 / 0.23 |

## Limitations

The dataset assumes a rigid, fixed post-production chain ordering and a finite preset bank, ignoring alternative orderings, repeated processing stages, or continuous parameter variations. The rendering pipeline relies exclusively on the Pedalboard library, risking implementation mismatch with commercial toolchains. Certain effects like conservative denoising and limiters exhibit weak alignments between preset labels and observable acoustic artifacts under domain shifts. Finally, evaluation is currently restricted to fixed-length segments and a single AudioMAE backbone architecture.

## Why read this

Researchers and engineers tackling speech forensics, content understanding, or audio engineering assistance should read this paper to adopt the first standardized speech-oriented audio effects benchmark and understand how data degradation impacts multi-granularity effect inference.

## Code

- https://github.com/nii-yamagishilab/VoxEffects

## Applications

Audio forensics, production-aware speech content understanding, automated audio engineering assistance, and educational ear-training tools for sound engineers.

## Institutions / 機構

National Institute of Informatics

**Funding / 經費:** New Energy and Industrial Technology Development Organization

## Related

- [Audio-Visual Feature Reconstruction Pretraining for Noise-Robust Emotion Recognition](parmonangan26_interspeech.md) — complementary · relatedness 1.8/3
- [Interpretable Audio Editing Evaluation via Chain-of-Thought Difference-Commonality Reasoning with Multimodal LLMs](jia26b_interspeech.md) — shared data / evaluation · relatedness 1.7/3
- [NoiseLoRA-SV: Hierarchical Noise-Conditioned Adaptation with Embedding Distillation for Robust Speaker Verification](gao26_interspeech.md) — complementary · relatedness 1.7/3
- [Robust Audio-Visual Emotion Recognition via Conditional Transformer U-Nets with Frequency-Injected Visual Stream](chung26b_interspeech.md) — complementary · relatedness 1.7/3
- [Coco-VC: Degradation-Robust Streaming Voice Conversion System on the Listener Side](kato26_interspeech.md) — complementary · relatedness 1.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
