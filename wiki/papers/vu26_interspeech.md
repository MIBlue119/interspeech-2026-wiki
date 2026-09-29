---
id: vu26_interspeech
category: applications-other
labels: [low-resource]
institutions: ["Japan Advanced Institute of Science and Technology", "Educational Testing Service", "Vericant"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1650
pdf: https://www.isca-archive.org/interspeech_2026/vu26_interspeech.pdf
---

# Adaptive Multimodal Expert Specialization by Meta-Learning for Spoken English Assessment

*Cong-Thanh Vu, Candy Olivia Mawalim, Hung Le, Chee Wee Leong, Guy Sivan, Shogo Okada*

[PDF](https://www.isca-archive.org/interspeech_2026/vu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/vu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1650)

**Category:** `applications-other` · **Labels:** `low-resource`

**TL;DR** — A meta-learning framework with a mixture-of-experts (MoE) architecture is proposed for automated spoken English assessment under data scarcity, achieving an F1-score of 84.88% and a 32.4% reduction in mean squared error compared to strong baselines.

## Key contributions

- Treats each automated scoring criterion as a distinct meta-task, utilizing first-order MAML (FOMAML) to learn an optimal shared parameter initialization for rapid adaptation to unseen speakers and tasks.
- Employs a Mixture-of-Experts (MoE) architecture with 16 experts and a top-2 gating router to capture diverse vocal profiles and multimodal interaction patterns without cross-task interference.
- Integrates multimodal features combining DisVoice prosody, Qwen3-Embedding-0.6B text representations, OpenFace facial action unit histograms (HAU), and custom turn-taking/rubric-guided statistics.
- Formulates a composite soft-discretized regression loss combining KL-divergence, MoE load balancing, standard MSE, and a margin-penalized term to handle discrete CEFR-aligned proficiency scores.

## Problem

Automated spoken English assessment is bottlenecked by data scarcity and strict privacy constraints that prevent the collection of large-scale audiovisual dialogue datasets. Traditional monolithic deep learning models or simple feature concatenation approaches fail to capture diverse non-verbal, acoustic, and linguistic cues while lacking the capacity for rapid personalization under extreme data constraints. This makes reliable automated coaching expensive to build and prone to domain shift when encountering new evaluation criteria or speakers.

## Method

The framework extracts features across four modalities: 103 prosodic features from DisVoice, text embeddings from Qwen3 0.6B, HAU visual features from OpenFace, and statistical turn-taking/rubric-guided metrics (e.g., word count per utterance, filler word proportions, speech rate). These modality-specific representations are projected via linear layers with layer normalization, stacked along the modality dimension, and fed into a Transformer encoder for self-attention-based inter-modal fusion, followed by attentive pooling.

The fused features are routed through a Mixture-of-Experts (MoE) network comprising 16 experts and a top-2 gating mechanism, which dynamically selects and combines the two most relevant expert outputs via a weighted sum to balance expert specialization and parameter efficiency. The expert-derived features feed into a multi-head scorer tailored for different rubric criteria.

For training, the system uses first-order MAML (FOMAML) to learn a meta-initialization across video segments cut into 200-250 second clips. The model is optimized using binary cross-entropy for classification and a composite soft-discretized loss for regression containing KL-divergence loss (L_KL), MoE load balancing loss (L_LB), MSE loss (L_MSE), and margin-penalized MSE loss (L_Margin) with weights alpha=0.01, beta=0.1, and gamma=0.3.

## Experimental setup

Evaluated primarily on the ETS Vericant dataset containing synchronized audio, video, and transcripts of 427 non-native English speakers (ages 9–16) in university admission interviews (segmented into 200–250s clips), and generalized on the MIT Interview Dataset of 138 mock interview recordings (120–200s clips). Compared against baseline configurations (Prosody-Text, Prosody-Turn, HAU-Turn, Prosody-HAU-Turn) and LightGBM multi-output wrappers. Evaluated using Macro F1 for binary classification and Mean Squared Error (MSE) for regression via 5-fold or 6-fold cross-validation with 3 repetitions on an NVIDIA A40 GPU. Hyperparameters were tuned via Bayesian Optimization using BoTorch.

## Results

On the ETS Vericant dataset for the primary SEE target, the proposed model achieved an 84.88% binary classification F1-score (up from 81.78%) and reduced regression MSE from 0.333 to 0.225, representing a 32.4% decrease in error. Across all rubric dimensions (Range, Accuracy, Fluency, Interaction, Coherence), the MAML-backed MoE architecture consistently outperformed standard dense layers and non-meta-learning baselines.

Ablation studies confirmed that removing MAML degraded F1 to 83.93% and increased MSE to 0.251, while replacing the MoE with a dense layer increased MSE to 0.230 and omitting rubric-guided features caused a severe drop in F1 to 76.99% and MSE to 0.357. On the MIT Interview Dataset for hirability prediction, the model achieved an F1-score of 67.04% using Turn+Prosody+HAU features.

| System / Configuration | SEE F1 (%) | SEE MSE | Range MSE | Fluency MSE |
|---|---|---|---|---|
| Baseline [23] (Prosody-Turn) | 81.78 | 0.333 | 0.380 | 0.350 |
| Dense Layer Variant | 82.43 | 0.230 | 0.315 | 0.312 |
| w/o MAML | 83.93 | 0.251 | 0.320 | 0.318 |
| w/o Rubric-Guided Features | 76.99 | 0.357 | 0.420 | 0.390 |
| Proposed MetaSEE (Full) | 84.88 | 0.225 | 0.307 | 0.309 |

## Limitations

The framework relies heavily on frozen pretrained feature extractors (DisVoice, Qwen3, OpenFace), which may limit domain sensitivity and restrict the model's ability to capture ultra-fine-grained acoustic or visual nuances. Evaluation is limited to English-language datasets focused on educational and mock-interview contexts, leaving multilingual generalization unproven.

## Why read this

Researchers and engineers working on multimodal speech assessment, low-resource domain adaptation, or mixture-of-experts routing will find a concrete recipe for combining MAML with MoE architectures to bypass data scarcity bottlenecks.

## Code

- https://github.com/cngthnh/meta_see

## Applications

Automated language testing platforms, AI-driven spoken English coaching tools, and objective interview scoring systems.

## Institutions / 機構

Japan Advanced Institute of Science and Technology, Educational Testing Service, Vericant

**Funding / 經費:** JSPS KAKENHI, JST CREST, JST CRONOS, AMED

## Related

- (link related pages by id as the wiki grows)
