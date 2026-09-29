---
id: shangguan26_interspeech
category: speaker
labels: [multilingual, self-supervised]
institutions: ["Nanjing University", "Shanghai Jiao Tong University", "AISpeech", "Soul AI Lab"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2274
pdf: https://www.isca-archive.org/interspeech_2026/shangguan26_interspeech.pdf
---

# Dual-LoRA: Parameter-Efficient Adversarial Disentanglement for Cross-Lingual Speaker Verification

*Qituan Shangguan, Junhao Du, Kunyang Peng, Feng Xue, Hui Zhang, Xinsheng Wang, Kai Yu, Shuai Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/shangguan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shangguan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2274)

**Category:** `speaker` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — Dual-LoRA tackles cross-lingual speaker verification bottlenecks by injecting parallel parameter-efficient LoRA adapters and a language-anchored adversary into a frozen pre-trained backbone, achieving a 0.91% validation EER.

## Key contributions

- Proposed Dual-LoRA, a parameter-efficient fine-tuning framework using parallel task-factorized LoRA adapter streams for speaker identity and language separation without catastrophic forgetting.
- Introduced a Language-Anchored Adversarial Disentanglement mechanism that guides the GRL discriminator via explicit language representations to target true linguistic cues.
- Validated across multiple model backbones (SamResNet34, SamResNet100, ResNet293, and w2v-BERT 2.0), demonstrating consistent improvements over standard fine-tuning and adversarial methods.
- Achieved top-tier performance on the TidyVoice benchmark, including a 0.91% validation EER and a 3rd place finish in the official challenge.

## Problem

Cross-lingual speaker verification struggles with language-speaker entanglement, where systems misinterpret shared linguistic properties as indicators of speaker identity. Standard adversarial domain adaptation using Gradient Reversal Layers (GRL) often damages speaker discriminability because blind discriminators inadvertently penalize traits that correlate with both language and voice identity. This causes severe performance degradation in worst-case scenarios where models must accept utterances from the same speaker across different languages while rejecting different speakers within the same language.

## Method

The framework freezes a pre-trained backbone model (such as SamResNet or w2v-BERT 2.0) and injects two independent, parallel low-rank adaptation (LoRA) streams globally across all layers: a Speaker Branch producing embedding e_spk and a Language Branch producing embedding e_lang. To prevent feature interference, an asymmetric rank allocation is utilized, assigning a higher rank to the speaker branch (rspk = 16 or 32) and a lower rank to the auxiliary language branch (rlang = 4 or 16).

To decouple identity from language without destroying speaker cues, the architecture uses a shared multi-layer perceptron discriminator D. Training relies on two passes: a Language Anchor Flow where e_lang is classified directly to establish solid linguistic decision boundaries, and an Adversarial Flow where e_spk passes through a Gradient Reversal Layer (GRL) scaled by -η before entering the same discriminator D. This shares explicit linguistic gradients with the speaker path.

The training objective combines Sub-center ArcMargin loss (K=3) on the speaker embeddings for discrimination alongside cross-entropy losses for language classification and adversarial suppression. A three-phase curriculum spans 3 training epochs: Phase I activates only language classification (λ1=1.0, λ2=0), Phase II introduces mild adversarial penalty (λ1=0.2, λ2=0.2), and Phase III ramps up adversarial enforcement (λ1=0.2, λ2=0.5). At inference time, the language branch and discriminator are discarded, and the speaker LoRA weights are merged directly into the frozen backbone to ensure zero extra computational overhead.

## Experimental setup

Evaluations are conducted on the TidyVoice Challenge dataset (TidyVoiceX), featuring a training set of 3,666 speakers (262k utterances) and a dev set of 808 speakers (60k utterances). For the final challenge evaluation, models are initialized using a large-scale internal multilingual corpus of approximately 18,000 hours across 396 languages. Baselines include Full Fine-Tuning, Standard LoRA (No Adv), and Standard Adversarial Training (Std Adv / DANN). Notable implementations use PyTorch, SGD/AdamW optimizers, and MUSAN/RIR data augmentation.

## Results

On the TidyVoice development set, the proposed w2v-BERT2 Dual-LoRA system achieves a headline validation EER of 0.91%, outperforming standard LoRA (1.25%) and standard adversarial training (0.96%). In the most challenging worst-case scenario (SS-DL vs. DS-SL), Dual-LoRA drastically reduces the error rate from the official baseline's 5.19% down to 1.62%. Diagnostic probing confirms that Dual-LoRA achieves superior disentanglement, lowering language identification (LID) accuracy on speaker embeddings to 49.02% compared to 72.71% for non-adversarial baselines. On the official challenge test sets, a score-level fusion of SamResNet100, ResNet293, and w2v-BERT2 backbones secures an EER of 2.43% on eval-A and 2.84% on eval-U.

| System | Pre-train Data | Dev EER (%) | eval-A EER (%) | eval-U EER (%) |
|---|---|---|---|---|
| Official Baseline | VB+VC | 3.07 | 9.06 | 11.59 |
| SamResNet100 (No Adv) | VB | 1.25 | - | - |
| SamResNet100 (Std Adv) | VB | 1.07 | - | - |
| SamResNet100 (Dual-LoRA) | VB | 0.98 | - | - |
| w2v-BERT2 (Dual-LoRA) | VB+VC | 0.91 | - | - |
| Ours (Fused Submission) | Internal (18k hrs) | 0.73 | 2.43 | 2.84 |

## Limitations

The framework relies heavily on access to explicit language labels during fine-tuning to anchor the adversarial discriminator, making it difficult to apply in completely unsupervised multi-dialect or zero-resource language settings. Additionally, while parameter-efficient, performance remains bounded by the representational capacity and language coverage of the initial pre-trained backbone.

## Why read this

Researchers working on cross-lingual representation learning or domain-robust speaker verification should read this to see how task-factorized LoRA streams and language-anchored GRL can mitigate feature entanglement without harming speaker discriminability.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cross-lingual voice authentication, multilingual speaker diarization, and speaker recognition pipelines deployed globally across diverse linguistic populations.

## Institutions / 機構

Nanjing University, Shanghai Jiao Tong University, AISpeech, Soul AI Lab

**Funding / 經費:** National Natural Science Foundation of China, Yangtze River Delta Science and Technology Innovation Community Joint Research Project

## Related

- (link related pages by id as the wiki grows)
