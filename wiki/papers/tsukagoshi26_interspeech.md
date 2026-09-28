---
id: tsukagoshi26_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1540
pdf: https://www.isca-archive.org/interspeech_2026/tsukagoshi26_interspeech.pdf
---

# Distilling Structured Reasoning into SpeechLLMs for Spoken Language Understanding

*Toshihiro Tsukagoshi, Natsuo Yamashita, Kota Dohi, Hiroaki Kokubo, Masaaki Yamamoto*

[PDF](https://www.isca-archive.org/interspeech_2026/tsukagoshi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tsukagoshi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1540)

**TL;DR** — Reasoning-Guided Fine-Tuning (RG-FT) distills structured reasoning trajectories from DeepSeek-R1 into SpeechLLMs as a multitask auxiliary regularizer, improving intent accuracy by up to +2.4% and SLU-F1 by up to +2.8 points on SLURP and Speech-MASSIVE without any inference-time overhead.

## Key contributions

- Proposed RG-FT, a reasoning distillation framework incorporating candidate enumeration, rejection reasoning, and label prediction as a multitask regularizer for SpeechLLM-based SLU.
- Demonstrated consistent performance gains across six SpeechLLM architectures on SLURP and Speech-MASSIVE-FR benchmarks.
- Provided quantitative latent space analysis via Silhouette coefficients, Fisher ratios, and centroid margins showing enhanced inter-class intent separability.
- Validated that pure reasoning fine-tuning (Reasoning-FT) degrades performance, proving that reasoning is effective as an auxiliary regularizer rather than a standalone training objective.

## Problem

Spoken language understanding (SLU) via Speech Large Language Models (SpeechLLMs) struggles to accurately distinguish between semantically adjacent intents that differ only in subtle scope or granularity. Conventional direct fine-tuning fails to provide sufficient separation between these competing interpretations unless supplied with expensive near-boundary data. While text-based LLMs benefit from reasoning distillation, it remains unclear whether and how such supervision transfers to speech inputs that contain speaker, prosodic, and acoustic variability.

## Method

The framework utilizes DeepSeek-R1 as a teacher to construct structured training trajectories $T = (C, R, L)$, where $C$ represents intent and slot candidate spaces, $R$ contains natural language rationales explaining why incorrect candidates are rejected, and $L$ is the final structured label (intent and entities). The training procedure uses a multitask objective combining label prediction and reasoning distillation: $\mathcal{L}_{RG-FT} = \alpha \mathcal{L}_{reasoning} + (1-\alpha) \mathcal{L}_{label}$, with the mixing ratio set to $\alpha = 0.5$. During inference, the auxiliary reasoning tasks are dropped entirely, generating only direct labels $L$ to ensure zero additional computational overhead.

All models are fully fine-tuned using BF16 precision, AdamW optimizer, a learning rate of $4 \times 10^{-5}$ with a cosine annealing schedule, a batch size of 4, and 4 gradient accumulation steps for up to 4 epochs. Training feeds both speech and gold text transcriptions into the SpeechLLM to stabilize fundamental capabilities, with maximum generation length capped at 384 tokens.

## Experimental setup

Evaluated on the English SLURP dataset (11,514 training, 2,033 dev, 2,974 test sentences across 18 domains and 60 intents) and the French subset of Speech-MASSIVE. Compared against Direct-FT and Reasoning-FT baselines across six SpeechLLM architectures (Qwen2.5-Omni-7B/3B, Qwen2-Audio-7B, Qwen2-Audio-7B-Inst, Audio-Flamingo-3, and Music-Flamingo). Metrics include Scenario accuracy, Action accuracy, Intent accuracy, and SLU-F1. Experiments ran on 2x H200 GPUs.

## Results

RG-FT outperforms Direct-FT and Reasoning-FT across all tested models and datasets. For instance, Music-Flamingo on SLURP gains +2.40% in intent accuracy and +2.80 in SLU-F1, while Qwen2.5-Omni-7B gains smaller but consistent margins. Reasoning-FT alone consistently underperforms Direct-FT (e.g., -3.06% intent accuracy for Qwen2.5-Omni-3B on SLURP), confirming the necessity of multitask regularization over pure reasoning training.

Latent space analysis on Qwen2.5-Omni-7B/3B shows RG-FT improves cosine Silhouette (0.242 to 0.279 for 7B), Euclidean Silhouette, Fisher ratio (1.133 to 1.276), and centroid margin (0.174 to 0.194), verifying that reasoning supervision sharpens inter-class boundaries.

| System / Condition | Scenario Acc. | Action Acc. | Intent Acc. | SLU-F1 |
|---|---|---|---|---|
| Qwen2.5-Omni-7B (Direct-FT) | 91.30 | 88.67 | 87.78 | 76.19 |
| Qwen2.5-Omni-7B (Reasoning-FT) | 89.53 | 86.53 | 85.24 | 74.89 |
| Qwen2.5-Omni-7B (RG-FT, Proposed) | 91.81 | 89.22 | 88.35 | 76.88 |
| Music-Flamingo (Direct-FT) | 87.63 | 84.07 | 82.81 | 69.36 |
| Music-Flamingo (Reasoning-FT) | 86.87 | 82.96 | 81.31 | 69.35 |
| Music-Flamingo (RG-FT, Proposed) | 89.81 | 86.23 | 85.21 | 72.16 |

## Limitations

The approach relies on offline distillation from a proprietary-scale teacher (DeepSeek-R1), which requires well-formed trajectories (94% parseable format in this work). Evaluation is restricted to English (SLURP) and French (Speech-MASSIVE), leaving multilingual scaling under-explored. The study does not evaluate performance degradation under severe acoustic noise or variable microphone conditions.

## Why read this

Researchers and engineers building end-to-end spoken language understanding systems should read this paper to learn how to inject text-based reasoning distillation into speech LLMs as a lightweight multitask regularizer without incurring any inference latency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Commercial voice assistants, contact center customer-service automation, and spoken dialogue systems requiring precise intent classification and slot filling.

## Related

- (link related pages by id as the wiki grows)
