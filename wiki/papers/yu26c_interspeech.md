---
id: yu26c_interspeech
category: health-clinical
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1075
pdf: https://www.isca-archive.org/interspeech_2026/yu26c_interspeech.pdf
---

# Learning to Attend to Depression-Related Patterns: An Adaptive Cross-Modal Gating Network for Depression Detection

*Hangbin Yu, Yudong Yang, Rongfeng Su, Nan Yan, Lan Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/yu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1075)

**Category:** `health-clinical`

**TL;DR** — The paper introduces an Adaptive Cross-Modal Gating (ACMG) network for automatic depression detection that dynamically reweights frame-level acoustic and textual features to focus on sparse diagnostic patterns, achieving 81.25% average accuracy on PDCD2025 and an F1 of 69.39% on DAIC-WOZ.

## Key contributions

- Proposes the Adaptive Cross-Modal Gating (ACMG) mechanism to address the inherent sparsity of depression-related cues by selectively emphasizing informative segments and filtering out redundant noise.
- Utilizes an instruction-aware large language model (Qwen-Embedding-0.6B) to extract depression-specific semantic priors instead of generic text representations.
- Demonstrates through Pearson correlation analysis that acoustic gating weights exhibit a strong negative correlation with frame-level energy, effectively capturing low-energy patterns associated with psychomotor retardation.
- Provides extensive evaluations on two distinct benchmarks (PDCD2025 and DAIC-WOZ), outperforming standard fusion and non-gating Transformer baselines.

## Problem

Automatic depression detection systems typically process speech signals by extracting frame-level acoustic and textual features and compressing them into utterance-level embeddings using global average pooling. This traditional design operates on the flawed assumption that depression-related markers are uniformly distributed across an entire utterance. In reality, clinical indicators such as flattened intonation, prolonged pauses, and negative sentiment exhibit extreme temporal sparsity. Ignoring this localized nature causes models to dilute discriminative signals with neutral speech, motivating the need for an adaptive gating architecture that selectively attends to salient temporal segments.

## Method

The framework utilizes a dual-branch architecture combining audio and text modalities. Audio is processed by a frozen 12th layer of a pre-trained HuBERT model to extract frame-level acoustic representations (H_a in R^(T_a x d)), while ASR-generated transcripts (via WeNet) are encoded using the instruction-aware Qwen-Embedding-0.6B language model to yield textual representations (H_t in R^(T_t x d)). To capture global context without being skewed by batch padding, masked mean pooling calculates summary vectors h_bar_a and h_bar_t.

The core Adaptive Cross-Modal Gating (ACMG) module computes gating weights using either unimodal or cross-modal strategies. In cross-modal gating, the global context of one modality is temporally expanded and concatenated with the features of the other modality, followed by a linear projection and a sigmoid activation function sigma(W_a * (h_tilde_t || H_a)). These weights are applied via element-wise multiplication to refine the representations, amplifying diagnostically relevant patterns while suppressing irrelevant background.

The refined features H_a_prime and H_t_prime are subsequently processed by modality-specific Transformer encoders, concatenated, and fed into an MLP classifier to predict depression severity or binary status.

## Experimental setup

Evaluated on the PDCD2025 dataset (22.9 hours from 272 participants across healthy, mild, and moderate categories using official 5-fold cross-validation) and the DAIC-WOZ benchmark (189 clinical interviews annotated with PHQ-8 scores, using official participant speech segments). Baselines include Al Hanai et al. (2018), Gomez-Zaragoza et al. (2025), Wang et al. (2022), and standard Transformer models driven by RoBERTa or Qwen embeddings. Metrics comprise Accuracy, F1-score, Precision, and Recall.

## Results

On the PDCD2025 dataset, the Transformer(Qwen) model with cross-modal ACMG achieves an average accuracy of 81.25% and an F1 of 80.77%, outperforming the non-gated baseline (79.78%) and standard RoBERTa-based setups (75.74% without ACMG, 78.68% with cross-modal ACMG). Replacing RoBERTa with Qwen-Embedding-0.6B consistently yields an immediate ~4% absolute boost in average accuracy.

On the DAIC-WOZ development split, the system attains a 69.39% F1 score, surpassing earlier baselines like Al Hanai et al. (50.00% F1) and Wang et al. (68.34%). Gating weight analyses confirm a negative Pearson correlation between acoustic gating weights and eGeMAPS energy (overall r = -0.329, scaling to -0.374 for moderate depression), proving the model focuses on low-energy, paused speech segments.

| System | Acc. | F1 | Prec. | Recall |
|---|---|---|---|---|
| Transformer(RoBERTa) | 75.74 | 76.17 | 75.64 | 76.70 |
| + ACMG w Cross-modal (RoBERTa) | 78.68 | 78.33 | 78.33 | 78.33 |
| Transformer(Qwen) | 79.78 | 79.48 | 79.37 | 79.59 |
| + ACMG w Unimodal (Qwen) | 80.88 | 80.58 | 80.31 | 80.85 |
| + ACMG w Cross-modal (Qwen) | 81.25 | 80.77 | 80.61 | 80.93 |

## Limitations

The study relies heavily on ASR transcripts which may introduce error propagation into the textual branch, and is constrained by the limited scale of available clinical depression datasets (e.g., ~23 hours for PDCD2025 and 189 sessions for DAIC-WOZ). Language coverage is restricted to English (DAIC-WOZ) and Chinese (PDCD2025), requiring further validation for low-resource or cross-lingual generalizability. Additionally, the pre-trained speech encoder (HuBERT) and language encoder (Qwen) are frozen during training, which may restrict adaptation to specialized psychiatric vocabulary.

## Why read this

Researchers and engineers working on multimodal affective computing or clinical speech analysis should read this paper to see how cross-modal global context can effectively gate sparse time-series features. It provides a clean blueprint for integrating instruction-aware LLM embeddings with acoustic models via lightweight adaptive gating networks.

## Code

- https://github.com/wenet-e2e/wenet

## Applications

Automated mental health screening, non-invasive digital biomarker tracking, and computer-aided clinical diagnosis tools for depressive disorder monitoring.

## Institutions / 機構

Chinese Academy of Sciences, University of Chinese Academy of Sciences

**Funding / 經費:** National Key R&D Program of China, National Natural Science Foundation of China, Shenzhen Peacock Team Project

## Related

- (link related pages by id as the wiki grows)
