---
id: tsukagoshi26_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1540
pdf: https://www.isca-archive.org/interspeech_2026/tsukagoshi26_interspeech.pdf
---

# Distilling Structured Reasoning into SpeechLLMs for Spoken Language Understanding

[PDF](https://www.isca-archive.org/interspeech_2026/tsukagoshi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tsukagoshi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1540)

**TL;DR** — Reasoning-Guided Fine-Tuning (RG-FT) distills DeepSeek-R1 reasoning trajectories into SpeechLLMs using a multitask objective, improving intent accuracy by up to 2.4% and SLU-F1 by up to 2.8 with zero inference cost.

## Problem

Adapting SpeechLLMs to spoken language understanding tasks like intent classification suffers when distinguishing semantically adjacent intents. Conventional fine-tuning fails to provide sufficient separation between competing interpretations near decision boundaries, and acquiring enough near-boundary training data is expensive.

## Method

The method introduces Reasoning-Guided Fine-Tuning (RG-FT), which leverages DeepSeek-R1 as a teacher to generate structured reasoning trajectories consisting of candidate enumeration (C), rejection reasoning (R), and final label prediction (L). These trajectories are supervised under a multitask learning objective alongside direct label prediction using a balanced mixing ratio alpha of 0.5. At inference time, the model predicts labels directly without generating intermediate reasoning chains, incurring no extra computational overhead. The framework is fully fine-tuned using BF16 precision, the AdamW optimizer, and cosine annealing across six SpeechLLM architectures including Qwen2.5-Omni and Audio-Flamingo.

## Results

Evaluated on the SLURP and French Speech-MASSIVE datasets across six SpeechLLMs, RG-FT consistently outperforms standard Direct-FT and standalone Reasoning-FT baselines. For instance, Music-Flamingo gains 2.40% in intent accuracy and 2.80 in SLU-F1 points. Latent space separability metrics—including Silhouette coefficients, Fisher ratios, and centroid margins—confirm that RG-FT sharpens inter-class decision boundaries and increases cluster separation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building spoken dialogue systems, voice assistants, and customer service automation tools can use this to improve intent classification and slot filling accuracy in end-to-end SpeechLLMs.

## Limitations

The approach requires high-quality teacher-generated reasoning trajectories and depends on selecting an appropriate balancing weight alpha for the multitask objective.

## Related

- (link related pages by id as the wiki grows)
