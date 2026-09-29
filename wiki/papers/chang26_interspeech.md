---
id: chang26_interspeech
category: audio-understanding
institutions: ["Information Engineering University"]
code: https://github.com/Changhy26/TAD
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-637
pdf: https://www.isca-archive.org/interspeech_2026/chang26_interspeech.pdf
---

# TAD: Token-Adaptive Contrastive Decoding with Confidence-Guided Gating for Hallucination Mitigation in Large Audio-Language Models

*Heyu Chang, Nianwen Si, Hao Zhang, Wenlin Zhang, Dan Qu*

[PDF](https://www.isca-archive.org/interspeech_2026/chang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-637)

**Category:** `audio-understanding`

**TL;DR** — Token-Adaptive Decoding (TAD) is a training-free inference strategy that suppresses audio object hallucinations in large audio-language models by applying a confidence-guided penalty to affirmative tokens at the first decoding step. It improves F1 by up to 0.117 on AudioCaps-Hallucination compared to fixed-strength contrastive baselines.

## Key contributions

- Proposes a decision-aware, training-free plug-in logits processor called Token-Adaptive Decoding (TAD) for large audio-language models.
- Employs a robust subword union strategy with log-sum-exp pooling over surface variants to aggregate vocabulary-level logits into semantic YES/NO categories.
- Introduces a confidence-margin-guided gate applied exclusively at the first decoding step based on the margin change between real audio and silent references.
- Demonstrates consistent F1 and recall improvements over Audio-Aware Decoding (AAD) and Adaptive Vector Steering (AVS) on AudioCaps-Hallucination and Clotho-AQA.

## Problem

Large audio-language models (LALMs) frequently generate audio object hallucinations, answering 'yes' to binary presence questions even when the target sound is absent, particularly for frequent categories and adversarial prompts. Prior training-free methods like Audio-Aware Decoding (AAD) and Adaptive Vector Steering (AVS) rely on global, fixed-strength contrastive reweighting across all decoding steps without adapting to varying audio evidence strength. Because binary audio question answering (AQA) decisions are predominantly locked in at the first decoding step, failing to condition interventions on initial confidence leads to overcorrection or insufficient hallucination suppression.

## Method

TAD operates by contrasting logits produced under real audio conditioning with those under a matched silent reference (an all-zero waveform of identical length), combined via an update weight $\alpha$ ($0.5$ or $1.0$). To make the vocabulary projection robust against subword tokenization artifacts, the method enumerates surface variants for 'yes' and 'no' (e.g., capitalized, spaced, and lowercase forms) and applies log-sum-exp pooling over these subword sets to extract scalar preferences $u_t^{\text{yes}}$ and $u_t^{\text{no}}$ for both the audio and silent branches.

At the first decoding step ($t=1$), TAD computes the YES/NO margin under real audio ($m^{\text{audio}}$) and under silence ($m^{\text{silent}}$), yielding an audio-induced margin gain $\delta = m^{\text{audio}} - m^{\text{silent}}$. A threshold $\tau$ (set to $0.2$) checks if the audio evidence is weak; if $\delta < \tau$, an additive penalty $\gamma = 2.5$ is applied exclusively to affirmative tokens in the contrastive logits. For all subsequent decoding steps ($t > 1$), standard AAD logits are used without gating, ensuring the intervention targets only the initial binary decision boundary.

## Experimental setup

Evaluated on AudioCaps-Hallucination (test split split into RANDOM with 30,220 pairs, ADVERSARIAL with 31,047 pairs, and POPULAR with 31,376 pairs) and a binary yes/no subset of Clotho-AQA containing 1,991 samples. Compared against default decoding, AVS, and AAD with contrast weights $\alpha \in \{0.5, 1.0\}$. Evaluated using Accuracy, Precision, Recall, and F1 (treating 'no' as the positive class). Implemented on Qwen2-Audio-7B-Instruct and Gemma-3n-E4B-it.

## Results

On AudioCaps-Hallucination using Qwen2-Audio-7B-Instruct (Random split), TAD achieves an F1 of 0.853 (vs 0.736 for AAD and 0.805 for AVS) and improves F1 by 0.059 to 0.117 across Random, Adversarial, and Popular splits compared to AAD. On Clotho-AQA with Qwen2, TAD attains the highest F1 of 0.816 (with $\alpha=1.0$) and a recall of 0.907, outperforming AAD's F1 of 0.810. However, on the smaller Gemma-3n-E4B-it model, while recall increases substantially, precision drops due to a conservative bias, indicating the intervention can occasionally overcorrect weaker backbones.

| System | Setting | Accuracy | Precision | Recall | F1 |
|---|---|---|---|---|---|
| Default (Qwen2) | Random | 0.593 | 0.769 | 0.266 | 0.395 |
| AAD [11] ($\alpha=1.0$) | Random | 0.762 | 0.824 | 0.666 | 0.736 |
| AVS [20] | Random | 0.773 | 0.706 | 0.937 | 0.805 |
| TAD (ours, $\alpha=1.0$) | Random | **0.841** | **0.847** | **0.858** | **0.853** |
| TAD (ours, $\alpha=1.0$) | Clotho-AQA | 0.796 | 0.741 | **0.907** | **0.816** |

## Limitations

Evaluated exclusively on binary AQA datasets with yes/no questions, leaving open-ended hallucination tasks unexplored. The fixed hyperparameters ($\tau = 0.2$, $\gamma = 2.5$) were not exhaustively tuned per architecture, leading to excessive conservativeness and precision drops on smaller multimodal models like Gemma-3n-E4B-it. The method assumes the binary decision is entirely formed at the first token, which may not generalize to multi-word or multi-token decision formats.

## Why read this

Speech and ML engineers building deployment-ready audio question answering systems will find a practical, training-free plug-and-play decoding algorithm that drastically reduces affirmative hallucinations. Researchers will appreciate the rigorous token-set log-sum-exp pooling and first-step confidence margin analysis.

## Code

- https://github.com/Changhy26/TAD

## Applications

Audio question answering systems, acoustic event detection validators, and reliable voice-controlled multimodal assistants.

## Institutions / 機構

Information Engineering University

**Funding / 經費:** Henan Province Major Industrial “Challenge-Based Innovation”, Natural Science Foundation of Henan, Science and Technology Key Project Plan of Henan

## Related

- (link related pages by id as the wiki grows)
