---
id: zhang26f_interspeech
category: audio-understanding
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-656
pdf: https://www.isca-archive.org/interspeech_2026/zhang26f_interspeech.pdf
---

# CoRE: Contrastive Evidence-Aware Rescoring for Multiple-Choice Audio Question Answering

*Peihong Zhang, Zhixin Li, Yuxuan Liu, Yiqiang Cai, Yizhou Tan, Shengchen Li*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-656)

**Category:** `audio-understanding`

**TL;DR** — CoRE is a training-free, test-time option re-scoring framework that mitigates modality bias in Large Audio-Language Models for multiple-choice Audio Question Answering by contrasting predictions against counterfactual audio; it improves Qwen2-Audio-7B top-1 accuracy by up to 10.7% absolute on bioacoustic tasks.

## Key contributions

- Proposes a block-wise temporal scrambling counterfactual audio generator combining random permutation and local time reversal to disrupt long-range semantic structure while preserving short-time acoustic statistics.
- Formulates a unified candidate-option level scoring and contrastive correction protocol using teacher-forced conditional log-likelihoods to avoid decoding-specific prefix and token generation confounds.
- Introduces an adaptive evidence-aware gating coefficient driven by Jensen-Shannon divergence conflict and one-sided entropy reduction to prevent over-correction in low-conflict regimes.
- Demonstrates consistent accuracy gains across diverse benchmarks including DCASE 2025 Task 5 and AIR-Bench SoundQA using Qwen2-Audio and Kimi-Audio backbones.

## Problem

Large Audio-Language Models in multiple-choice Audio Question Answering frequently suffer from modality bias, leaning heavily on textual priors and semantic associations between questions and choices rather than genuine acoustic evidence from the audio recording. For instance, models might associate "thunder" with "heavy rain" based on linguistic co-occurrence, ignoring contradictory sound cues like a car alarm. Standard training-time debiasing methods are computationally expensive and impractical for deployment, whereas existing inference-time contrastive methods rely on naive silence or token-level interventions that introduce severe distribution shifts and fail to capture option-level evidence gain.

## Method

The method takes an input audio waveform of length T samples, splits it into contiguous non-overlapping blocks of fixed duration tau = 40 ms, and applies a random block permutation along with stochastic within-block time reversal with a probability p_rev = 0.5. A 3 ms linear crossfade is applied at block boundaries, and the counterfactual audio is generated with one counterfactual waveform per example (N_cf = 1). The model computes option-level logits for both original audio (z^+) and counterfactual audio (z^-) using teacher-forced conditional log-likelihoods over length-normalized token sequences for each candidate option under a fixed answer template.

To fuse the original and counterfactual logits safely, an adaptive gate coefficient beta in [0, 1] is computed by combining a bounded conflict signal derived from Jensen-Shannon divergence (JSD^2) between the original distribution p^+ and counterfactual distribution p^-, and a confidence signal based on one-sided entropy reduction under real audio normalized by a small constant epsilon. The final gate uses a geometric mean combination rule, beta = sqrt(u_J * u_H), to ensure that updates are suppressed unless both distributional conflict and real-audio certainty gains are present. The final score vector is obtained via convex interpolation between z^- and z^+.

## Experimental setup

Evaluated on the DCASE 2025 Challenge Task 5 dataset across three subsets (Bioacoustics QA [BQA], Temporal Soundscapes QA [TSQA], and Complex QA [CQA]) and AIR-Bench SoundQA. Backbone models are Qwen2-Audio-7B-Instruct and Kimi-Audio-7B-Instruct. Metrics include top-1 accuracy evaluated as the mean +/- standard deviation over M = 8 random answer-choice permutations per example. The counterfactual configuration uses tau = 40 ms blocks and p_rev = 0.5.

## Results

On the DCASE 2025 Task 5 BQA subset with Qwen2-Audio-7B, the default baseline achieves 30.0% accuracy, prompt engineering reaches 31.6%, Audio-Aware Decoding (AAD) scores 33.1%, CoRE-Silence achieves 33.8%, and CoRE reaches 40.7% (+10.7% over default). On TSQA, CoRE achieves 49.6% compared to 39.2% for the default baseline. On AIR-Bench SoundQA with Qwen2-Audio, CoRE achieves 73.8% compared to 67.2% for default. Ablations on gating strategies show that constant fixed gating values (e.g., beta=0.5 yielding 54.0% overall) or single-signal gates (JSD-only at 54.8%, entropy-only at 54.4%) underperform compared to the proposed geometric mean adaptive gate (55.6% overall). Gains are smaller on complex CQA where high-level semantic reasoning supersedes low-level acoustic grounding.

| System / Condition | BQA Accuracy (%) | TSQA Accuracy (%) | CQA Accuracy (%) | SoundQA Accuracy (%) |
|---|---|---|---|---|
| Qwen2-Audio (Default) | 30.0 +/- 2.6 | 39.2 +/- 0.9 | 49.6 +/- 1.1 | 67.2 +/- 1.2 |
| Qwen2-Audio + Prompt Eng. | 31.6 +/- 2.3 | 42.5 +/- 0.8 | 51.0 +/- 1.0 | 68.5 +/- 1.1 |
| Qwen2-Audio + AAD | 33.1 +/- 2.1 | 45.7 +/- 0.8 | 52.6 +/- 0.9 | 71.5 +/- 1.0 |
| Qwen2-Audio + CoRE-Silence | 33.8 +/- 2.2 | 45.6 +/- 0.8 | 52.9 +/- 0.9 | 72.0 +/- 1.0 |
| Qwen2-Audio + CoRE (Ours) | 40.7 +/- 2.2 | 49.6 +/- 0.8 | 53.2 +/- 0.9 | 73.8 +/- 0.9 |

## Limitations

The method is currently restricted to multiple-choice QA and cannot be directly applied to open-ended generative AQA without modifications. It introduces a modest test-time inference overhead by requiring one additional forward pass to score the counterfactual audio clip. The evaluation is limited to two benchmark suites and 7B-parameter model scales.

## Why read this

Speech and ML researchers working on multimodal audio-language models and audio question answering should read this paper to learn how to construct distribution-preserving counterfactual audio references for robust inference-time debiasing without model retraining.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust audio question answering systems, acoustic scene analysis, and multi-modal voice assistants deployed in complex acoustic environments.

## Institutions / 機構

Xi'an Jiaotong-Liverpool University

**Funding / 經費:** Jiangsu Provincial Major Science and Technology Project

## Related

- (link related pages by id as the wiki grows)
