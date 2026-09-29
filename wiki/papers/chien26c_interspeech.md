---
id: chien26c_interspeech
category: paralinguistics-emotion
institutions: ["National Yang Ming Chiao Tung University", "National Institute of Advanced Industrial Science and Technology", "National Tsing Hua University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3201
pdf: https://www.isca-archive.org/interspeech_2026/chien26c_interspeech.pdf
---

# Two-Sided Fairness Transfer for Gender-Neutral Speech Emotion Recognition with Partially Observed Attributes

*Woan-Shiuan Chien, Tomohiko Nakamura, Huan-Yu Chen, Satoru Fukayama, Hitoshi Suda, Jun Ogata, Chi-Chun Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/chien26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chien26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3201)

**Category:** `paralinguistics-emotion`

**TL;DR** — The paper introduces a two-stage framework to achieve two-sided (speaker- and rater-side) fairness in speech emotion recognition under partial attribute supervision by leveraging a parameter-space task vector called ATT2Fair. It successfully transfers fairness to target domains lacking attribute labels while keeping average F1-score drops to roughly 2.15%.

## Key contributions

- Formulates a novel cross-dataset fairness transfer task for speech emotion recognition under partial attribute supervision, where gender labels are available on only one side (speaker or rater) in the target domain.
- Proposes FairCLAP, a fine-tuned contrastive language-audio pre-training foundation model integrated with adversarial debiasing to independently build one-sided gender-neutral models.
- Introduces the ATT2Fair task vector, derived from the parameter difference between speaker- and rater-side fair models in an attribute-known source domain, enabling the inference of the absent-side fair model in a target domain.
- Demonstrates through embedding trajectory alignment analysis that the ATT2Fair task vector induces a consistent positive directional shift (mean cosine similarity of 0.31-0.33) in the target domain's representation space.

## Problem

Ensuring fairness in Speech Emotion Recognition (SER) is inherently a two-sided challenge requiring neutrality to both speaker-side and rater-side demographic biases. Existing debiasing techniques (such as adversarial training frameworks by Gorrostieta et al. and Chien et al.) rely heavily on explicit attribute supervision for both sides during training, which fails in real-world deployment scenarios where attributes are only partially available or completely absent on one side. Addressing this gap is critical for deploying compliant emotion AI systems under frameworks like the EU AI Act without discarding unlabelled data or retraining from scratch.

## Method

The proposed framework operates in two distinct stages: FairCLAP fine-tuning and ATT2Fair task vector transfer. In Stage 1, pre-trained CLAP models mapping text queries ("the utterance is [e_class]/not [e_class]") and speech inputs are fine-tuned using a multi-task objective combining cross-entropy emotion classification loss (L_CE) and an adversarial loss (L_Adv) from a two-layer dense domain classifier that predicts gender attribute labels from speech embeddings. This yields independent speaker-side (θ_SPK) and rater-side (θ_RAT) fair models.

In Stage 2, parameter-space arithmetic is utilized. Given paired source-domain fair models θ_SPK^S and θ_RAT^S, the ATT2Fair task vector is computed as τ = θ_RAT^S - θ_SPK^S (or vice versa). To infer an absent-side model in a target domain possessing only one available side (e.g., speaker-side θ_SPK^T), the task vector is applied via vector addition: θ_RAT^T = θ_SPK^T + λτ, where λ is a grid-searched scaling factor. This allows knowledge transfer across datasets under severe attribute scarcity.

## Experimental setup

Experiments use three public corpora focusing on four primary emotion classes (Neutral, Happiness, Anger, Sadness): IEMOCAP (dyadic interactions, 6 raters), MSP-Podcast v1.11 (151,654 speaking turns, speaker gender only), and BIIC-Podcast v1.01 (61,592 Taiwanese-Mandarin utterances, speaker and rater gender). Evaluation metrics include weighted F1-score for emotion recognition and statistical parity score (Δ_SP, ideal = 0) for fairness on speaker sets (S1) and rater-gender biased sets (S2). Implementation details include PyTorch, an NVIDIA A100 GPU (40GB), Adam optimizer with a learning rate of 1e-4, batch size of 32, 30 fine-tuning epochs, and scaling factor λ grid-searched over [1e-3, 1e-2].

## Results

FairCLAP fine-tuning achieved an average F1-score drop of only ~2.15% compared to unconstrained CLAP baselines while consistently improving fairness across both speaker and rater sides (e.g., substantially reducing gender disparities in IEMOCAP and MSP, particularly for Sadness). When evaluating the ATT2Fair inferred models against ground-truth FairCLAP baselines, the inferred models maintained competitive recognition and frequently exceeded baselines—such as in IEMOCAP for Anger, where the inferred rater-side model outperformed FairCLAP by 1.8% F1 and the inferred speaker-side model improved by 4.8% F1. In cross-domain transfer settings where target datasets lacked attributes entirely for one side (e.g., MSP rater-side), ATT2Fair successfully stabilized fairness values around 0.2 across all emotions while outperforming standard CLAP baselines. Cosine similarity distributions for embedding trajectory alignments concentrated heavily in the positive region, showing peaks around 0.4 to 0.5 and mean similarities of 0.31 (IEMOCAP) and 0.33 (BIIC-Podcast).

| System / Condition | Neutral F1 (%) | Neutral Δ_SP | Happiness F1 (%) | Happiness Δ_SP | Anger F1 (%) | Anger Δ_SP | Sadness F1 (%) | Sadness Δ_SP |
|---|---|---|---|---|---|---|---|---|
| Target IEMOCAP (CLAP Baseline) | 72.33 | 0.382 | 79.68 | 0.296 | 75.41 | 0.412 | 82.00 | 0.368 |
| Target IEMOCAP (FairCLAP Speaker) | 70.20 | 0.262 | 76.88 | 0.208 | 74.12 | 0.284 | 80.24 | 0.245 |
| Target IEMOCAP (ATT2Fair Inferred Speaker) | 69.01 | 0.251 | 75.34 | 0.206 | 78.92 | 0.230 | 77.82 | 0.203 |
| Target MSP (CLAP Baseline) | 79.82 | 0.262 | 81.86 | 0.223 | 82.02 | 0.260 | 78.22 | 0.236 |
| Target MSP (FairCLAP Speaker) | 76.82 | 0.205 | 80.23 | 0.198 | 81.67 | 0.111 | 78.92 | 0.154 |
| Target MSP (ATT2Fair Inferred Rater via BIIC) | 70.87 | 0.242 | 77.04 | 0.228 | 75.02 | 0.209 | 75.24 | 0.182 |

## Limitations

The current scope is restricted to binary gender attributes for speakers and raters, leaving multi-attribute fairness (e.g., age, accent, intersectional demographics) unexplored under partial supervision. The approach assumes that transfer vectors learned from high-resource source datasets (like IEMOCAP and BIIC) generalize well to target domains without causing catastrophic forgetting of domain-specific acoustic characteristics. Furthermore, performance heavily depends on the quality and representativeness of the source domain task vector computation.

## Why read this

Researchers and engineers building production-ready Speech Emotion Recognition systems constrained by incomplete demographic labels will learn how to leverage parameter-space task arithmetic for zero-shot or cross-dataset fairness transfer without retraining models from scratch.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Deploying legally compliant, unbiased voice-assistants, mental health monitoring tools, and customer service analytics platforms that must ensure equal emotional interpretation performance across diverse speaker and rater demographics despite missing sensitive labels.

## Institutions / 機構

National Yang Ming Chiao Tung University, National Institute of Advanced Industrial Science and Technology, National Tsing Hua University

## Related

- (link related pages by id as the wiki grows)
