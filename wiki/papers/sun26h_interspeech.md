---
id: sun26h_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2166
pdf: https://www.isca-archive.org/interspeech_2026/sun26h_interspeech.pdf
---

# Activation Steering for Accent Adaptation in Large Audio Language Models

*Jinuo Sun, Yang Xiao, Sung Kyun Chung, Qiuchi Hu, Gongping Huang, Eun-Jung Holden, Ting Dang*

[PDF](https://www.isca-archive.org/interspeech_2026/sun26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2166)

**TL;DR** — This paper introduces a parameter-free activation steering method to adapt Large Audio Language Models (LALMs) to regional and non-native accents at inference time, achieving relative Word Error Rate (WER) reductions of up to 90.7% on data-scarce accents without modifying model weights.

## Key contributions

- Formulates accent adaptation as an interpretable subspace intervention by computing layer-wise mean-shift directions between standard and accented speech representations.
- Derives a layer-wise accent sensitivity profile across 32 encoder layers, revealing that accent information concentrates in a narrow middle band (layers 15-19).
- Introduces an inference-time activation steering method that injects normalized mean-shift vectors via forward hooks, requiring zero parameter updates.
- Demonstrates robust generalizability on 8 different accents using strictly isolated extraction and evaluation sets, outperforming Parameter-Efficient Fine-Tuning (PEFT) in data-scarce settings.

## Problem

Accent variability in automatic speech recognition causes severe recognition errors and performance disparities that degrade user experience and fairness. Conventional supervised fine-tuning and parameter-efficient fine-tuning (PEFT) methods like bottleneck adapters are computationally expensive, require heavy supervision, and often degrade on low-resource accents or interfere with higher-level semantic representations. The field lacks a lightweight, mechanistic approach that locates where accent information is encoded before attempting adaptation.

## Method

The authors utilize the 32-layer Whisper-style audio encoder of Qwen2-Audio-7B followed by a multimodal projector. To locate accent information, they construct text-matched utterance pairs—cross-standard-accent pairs and within-single-accent pairs (to factor out speaker timbre and prosody)—and extract token-level hidden activations across layers, applying mean pooling over time. They compute a mean-shift direction vector from source to target accents at each layer, apply a controlled perturbation, propagate it through the remaining layers and projector, and compute an Accent Alignment Score (AAS) via cosine similarity. By subtracting within-accent baseline shifts, they derive a specificity score and layer sensitivity ranking.

For inference-time steering, a generalized mean-shift steering vector is extracted from a separate data split containing 80% of speakers with zero transcript overlap. This vector is normalized to unit norm to separate direction from magnitude, allowing a controlled scaling factor alpha (tested across [0.5, 1, 2, 5]). During inference, the normalized steering vector is broadcast across all time steps and injected into hidden states at chosen middle layers (specifically layers 15-19) via a forward hook. This design avoids any model weight updates, preserves higher-level semantic abstractions, and prevents the representation collapse observed when steering late layers (such as terminal layer 31).

## Experimental setup

The evaluation uses the VCTK corpus for native accents (Scottish, South African, Canadian, Irish, Northern Irish compared against standard English) and the L2-ARCTIC corpus for non-native accents (Hindi, Arabic, Spanish compared against matched CMU-ARCTIC native references). For steering extraction, 1,000 pairs are sampled from an extraction set comprising 80% of speakers, while evaluation uses balanced sampling of 200 utterances per accent (half with WER = 0, half with WER > 0) to avoid difficulty bias. Comparisons include unadapted Base models and PEFT baselines trained on accent-specific subsets ranging from 44 to 802 pairs.

## Results

Inference-time steering in the optimal middle layer window (layers 15-19) yields substantial absolute and relative WER improvements across all tested accents. For native VCTK accents, steering reduces WER drastically on data-scarce sets, achieving absolute drops such as -33.80% on Canadian (base 37.27% down to 3.47%) and -25.51% on South African (base 29.86% down to 4.35%) using alpha = 5. For non-native L2-ARCTIC accents with larger training sets (around 800 pairs), absolute reductions are more modest but consistent: -8.06% for Arabic, -4.04% for Hindi, and -5.92% for Spanish. 

In baseline comparisons against PEFT, steering dominates when training data is scarce (fewer than 100 samples per accent, where PEFT struggles severely due to underfitting, yielding only -1.63% to -4.67% drops). However, PEFT outperforms steering when ample training data (approx. 800 pairs) is available (e.g., Arabic PEFT achieves -10.93% vs. Steer's -8.06%). Ablations over steering strength alpha show that higher values like alpha = 5 boost mid-layer performance but trigger catastrophic representation collapse in late layers (especially layer 31, which uniformly spikes error rates by +3.7 to +5.8 points).

| Accent | Train Pairs | Base WER | Steer WER | PEFT WER | Steer Delta | PEFT Delta |
|---|---|---|---|---|---|---|
| Scottish | 197 | 26.72% | 6.80% | 9.25% | -19.92% | -17.47% |
| South African | 44 | 29.86% | 4.35% | 27.10% | -25.51% | -2.76% |
| Canadian | 51 | 37.27% | 3.47% | 32.60% | -33.80% | -4.67% |
| Arabic | 802 | 18.13% | 10.07% | 7.20% | -8.06% | -10.93% |
| Hindi | 790 | 14.26% | 10.22% | 7.82% | -4.04% | -6.44% |

## Limitations

The method relies on having access to paired standard-to-accented utterances or representative extraction data to compute the mean-shift vectors. It assumes that accent variations map reasonably well to linear subspaces, which may degrade under highly complex code-switching or heavy background noise. While highly effective in low-resource settings, standard supervised fine-tuning still surpasses activation steering when large, high-resource accent adaptation datasets are readily available.

## Why read this

Researchers and engineers working on Large Audio Language Models or deployment-constrained ASR will learn how to locate and exploit internal representation subspaces for zero-weight model adaptation. It provides a blueprint for replacing expensive fine-tuning with plug-and-play inference steering, particularly valuable for low-resource accent adaptation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice assistants, automated call centers, educational technology software, and multilingual speech recognition systems requiring fair and robust performance across diverse regional and non-native accents without retraining weights.

## Related

- (link related pages by id as the wiki grows)
