---
id: hegde26_interspeech
category: audio-captioning
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2052
pdf: https://www.isca-archive.org/interspeech_2026/hegde26_interspeech.pdf
---

# Aligning Audio Captions with Human Preferences

*Kartik Hegde, Rehana Mahfuz, Yinyi Guo, Erik Visser*

[PDF](https://www.isca-archive.org/interspeech_2026/hegde26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hegde26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2052)

**TL;DR** — This paper proposes a preference-aligned audio captioning framework using Reinforcement Learning from Human Feedback (RLHF) with a custom CLAP-based reward model, eliminating the need for ground-truth captions during fine-tuning while outperforming baselines in human preference win rates.

## Key contributions

- Develops a lightweight multimodal reward model combining LAION CLAP embeddings with a 2-layer MLP (512-128 hidden dimensions) trained on pairwise human preference data via a Bradley-Terry model.
- Formulates an audio captioning RLHF pipeline using Self-Critical Sequence Training (SCST) with REINFORCE policy gradients, requiring zero paired ground-truth audio-caption data.
- Introduces length-penalty reward shaping to effectively mitigate reward hacking (such as generating excessively long or repetitive captions).
- Demonstrates substantial human preference win-rate improvements on challenging acoustic test splits (e.g., 59.13% win rate over baselines on AudioCaps challenging subsets).

## Problem

Traditional audio captioning relies heavily on supervised learning paired with automatic metrics like BLEU, METEOR, and CIDEr, which correlate poorly with human judgments of semantic fidelity and naturalness. While contrastive models like CLAP provide scalable embeddings, they fail to capture nuanced human preferences and suffer from a modality gap. Furthermore, optimization via large external language models introduces massive computational overhead, making them impractical for resource-constrained or low-memory embedded devices.

## Method

The audio captioning baseline is a lightweight model comprising a CNN10 PANN audio encoder and a Transformer decoder containing approximately 15M parameters. The reward model takes 512-dimensional audio and text embeddings from a pretrained LAION CLAP (htsat-unfused) encoder, concatenates them into a 1024-dimensional joint representation, and passes them through a two-layer neural network with hidden dimensions of 512 and 128, followed by a sigmoid output layer. The reward model is optimized using binary cross-entropy loss based on the Bradley-Terry preference formulation with an L2 regularization coefficient of 0.1 and reward-difference scaling factor $\beta = 5$.

During reinforcement learning, policy gradient updates are computed via Self-Critical Sequence Training (SCST), utilizing greedy decoding as the inference baseline and multinomial sampling for alternative completions to reduce gradient variance. To combat reward hacking—specifically length exploitation—a length penalty is incorporated into the reward function. This penalty activates when the generated caption length exceeds the expected length ($L_e = 13$), scaling proportionally via a tunable coefficient $\alpha$ (set to 0.4 for AudioCaps and 1.0 for proprietary datasets).

The reward model is trained for 70 epochs using the Adam optimizer with a learning rate of $10^{-4}$ and batch size of 64. Subsequent RLHF fine-tuning runs for 100 epochs using Adam (learning rate $10^{-6}$, weight decay $10^{-6}$) with a batch size of 128, featuring a 2-epoch linear warm-up followed by a step-decay schedule multiplying the learning rate by 0.1 every 10 epochs.

## Experimental setup

Experiments use AudioCapsEval and ClothoEval (derived from AudioCaps and Clotho) containing 1,473 and 1,555 unanimous human preference pairs respectively, alongside a curated proprietary dataset of 4,424 preference samples and 880 challenging cases. Baselines include the supervised CNN10-Transformer audio captioning model. Evaluation metrics consist of n-gram scores (BLEU-4, CIDEr), semantic/error metrics (S-BERT, FENSE), CLAPAT, custom reward scores, and human evaluation win rates via Fleiss' Kappa inter-annotator agreement.

## Results

On the AudioCaps non-challenging split, the baseline achieves a 48.20% win rate versus 51.80% for RLHF, while on the challenging split, RLHF achieves a headline 53.93% win rate (59.14% preference win rate) compared to the baseline's 46.07%. On the proprietary dataset, RLHF reaches a 53.41% win rate on non-challenging data and 59.11% on challenging data. Ablations demonstrate that increasing preference training data size from 1,178 pairs (AudioCapsEval only) to 2,422 pairs (AudioCapsEval + ClothoEval) increases the downstream human win rate for RLHF from 43.55% to 47.97%. The custom reward model achieves the lowest weighted deviation from human preferences (4.19) compared to S-BERT (4.35), CLAPAT (5.55), and FENSE (11.78).

| System | Dataset Split | BLEU-4 | CIDEr | S-BERT | FENSE | Human Win Rate (%) |
|---|---|---|---|---|---|---|
| Baseline | AudioCaps (Challenging) | 0.0541 | 0.3357 | 0.4565 | 0.1441 | 46.07 |
| +RLHF (Ours) | AudioCaps (Challenging) | 0.0498 | 0.3465 | 0.5007 | 0.3571 | 53.93 |
| Baseline | Proprietary (Challenging) | 0.0780 | 0.4570 | 0.5194 | 0.4637 | 40.89 |
| +RLHF (Ours) | Proprietary (Challenging) | 0.0555 | 0.4463 | 0.5607 | 0.4933 | 59.11 |

## Limitations

The framework relies on a fixed set of human pairwise preference annotations, and its performance is bounded by the diversity of the preference data distribution. The evaluation is limited to moderate-sized baseline models (15M parameters) and specific benchmark sets (AudioCaps, Clotho, and one proprietary dataset), leaving open scalability questions for massive multi-billion parameter foundation models or highly multilingual settings.

## Why read this

Speech and ML engineers working on resource-constrained audio models should read this to learn how to apply lightweight RLHF and reward shaping to align captioning systems with human preferences without needing ground-truth annotations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated acoustic scene description, smart home audio monitoring assistants, accessibility tools for the hearing-impaired, and content-based audio indexing.

## Related

- (link related pages by id as the wiki grows)
