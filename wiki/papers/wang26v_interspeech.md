---
id: wang26v_interspeech
category: tts
labels: [generative-model]
institutions: ["Tsinghua University", "Ant Group"]
code: https://thuhcsi.github.io/interspeech2026-TC-DBI/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1242
pdf: https://www.isca-archive.org/interspeech_2026/wang26v_interspeech.pdf
---

# TC-DBI: A Plug-and-Play Trajectory Confidence-Guided Dynamic Block Inference Strategy for Speech Synthesis with Continuous Block Flow Matching

*Ren Wang, Zhiyu Cui, Shun Lei, Jiawei Jin, Dongfu Song, Zhiyong Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26v_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26v_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1242)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — The paper introduces Trajectory Confidence-Guided Dynamic Block Inference (TC-DBI), a training-free decoding strategy for continuous block flow matching text-to-speech models that dynamically adjusts block sizes by detecting and regenerating unreliable trajectories. It achieves superior Naturalness MOS and lower Word Error Rate on the Seed-eval benchmark with only a 1.08x relative runtime overhead.

## Key contributions

- Proposed Trajectory Confidence (TC), a training-free geometric metric measuring ODE integration trajectory straightness to quantify local generation stability in continuous block flow matching.
- Introduced TC-DBI, a plug-and-play decoding strategy that adaptively truncates and regenerates low-confidence suffix regions to enhance conditioning without model retraining or architecture changes.
- Demonstrated strong correlation between low Trajectory Confidence and actual generation errors (WER > 0) via error enrichment analysis.
- Achieved state-of-the-art Naturalness MOS (3.809 on Mandarin, 3.973 on English) and reduced Word Error Rate on the Seed-eval test set compared to standard block flow matching and prominent baselines.

## Problem

Modern text-to-speech synthesis balances expressiveness and efficiency through block-wise generative modeling, such as continuous Block Flow Matching. However, these systems rely on a fixed block size during inference, ignoring the non-uniform information density of speech where phonetic transitions require stronger contextual conditioning than steady segments. While prior work uses token-level probabilities in discrete models to control block size, continuous ODE-based samplers do not expose explicit probabilistic confidence signals. Consequently, fixed block sizes in challenging regions lead to unstable velocity estimation, error accumulation, and degraded perceptual quality.

## Method

The base architecture uses a frozen VoxCPM neural speech VAE codec operating at 25 Hz to compress 44.1 kHz audio into continuous latents, paired with a Diffusion Transformer (DiT) backend for block-wise autoregressive generation. The DiT comprises 22 layers, a hidden dimension of 1024, and 16 attention heads, and is trained via Conditional Flow Matching (CFM) with Optimal Transport (OT) interpolation over a block size of 32.

During inference, the model solves a conditional ordinary differential equation (ODE) in 32 steps. To evaluate generation stability on-the-fly, Trajectory Confidence (TC) is computed for each frame as the ratio of Euclidean displacement from noise to final latent divided by the total path length traversed across the ODE integration steps. A higher value (approaching 1) denotes a straighter, more reliable trajectory.

TC-DBI acts as a plug-and-play inference strategy: after generating a candidate block of maximum length, the framework computes per-frame TC and finds the truncation boundary based on a confidence threshold tau. The reliable prefix is kept as contextual conditioning while unreliable tails are discarded and regenerated. A minimum retention constraint of one frame per step prevents infinite loops, and generation proceeds until an End-of-Prediction signal is encountered.

## Experimental setup

The model is trained on approximately 100,000 hours of speech data from Chinese and English subsets of Emilia on 16 NVIDIA A100 (80G) GPUs for two weeks. Evaluation is performed on the Seed-eval benchmark comparing against CosyVoice2, F5-TTS, MaskGCT, and a reproduced Block Flow Matching baseline. Metrics include Word Error Rate (WER) using Whisper-large-v3 for English and Paraformer-zh for Mandarin, Speaker Similarity (SIM) via WavLM-large, and Naturalness MOS (N-MOS) rated by 15 experienced listeners. The TC-DBI confidence threshold is set to tau = 0.75.

## Results

On the Seed-eval Mandarin test set (seed-test-zh), BFM with TC-DBI achieves a WER of 1.568% and an N-MOS of 3.809, outperforming the baseline BFM (WER 1.628%, N-MOS 3.673) and exceeding baseline F5-TTS N-MOS (3.509). On the English test set (seed-test-en), it records a WER of 1.798% and an N-MOS of 3.973, beating baseline BFM (WER 1.921%, N-MOS 3.727) and setting the top N-MOS among compared systems. Ablation studies on the confidence threshold tau demonstrate that tau = 0.75 hits the optimal sweet spot, yielding the lowest WER with a minor 1.08x relative RTF, whereas overly aggressive thresholds like tau = 0.80 increase RTF to 1.63x with diminished returns. Error density analysis shows that filtering samples below a confidence threshold raises the error rate up to 1.64x above the global baseline.

| System | Seed-ZH WER (%) | Seed-ZH N-MOS | Seed-EN WER (%) | Seed-EN N-MOS |
| --- | --- | --- | --- | --- |
| CosyVoice2 | 1.504 | 3.391 | 2.634 | 3.700 |
| F5-TTS | 1.640 | 3.509 | 1.830 | 3.545 |
| MaskGCT | 2.330 | 3.191 | 3.936 | 3.409 |
| BFM (Reproduced) | 1.628 | 3.673 | 1.921 | 3.727 |
| BFM + TC-DBI (Ours) | 1.568 | 3.809 | 1.798 | 3.973 |

## Limitations

The method incurs a modest computational overhead (up to 1.63x RTF depending on the threshold tau) because truncating and regenerating unreliable blocks requires extra ODE integration steps. The evaluation is currently restricted to English and Mandarin languages using Emilia data, leaving open how well trajectory straightness correlates with errors in highly diverse low-resource languages or extreme paralinguistic conditions. Furthermore, the approach relies on hyperparameters such as the confidence threshold tau and minimum frame retention rules that require empirical tuning.

## Why read this

Speech researchers and engineers working on continuous flow matching or diffusion-based text-to-speech should read this paper to learn how geometric trajectory straightness can serve as a training-free, highly effective proxy for generation confidence and adaptive decoding.

## Code

- https://thuhcsi.github.io/interspeech2026-TC-DBI/

## Applications

High-fidelity, robust text-to-speech synthesis for dialogue systems, voice assistants, and audiobook narration requiring natural prosody and strict error control.

## Institutions / 機構

Tsinghua University, Ant Group

**Funding / 經費:** National Natural Science Foundation of China, Ant Group

## Related

- (link related pages by id as the wiki grows)
