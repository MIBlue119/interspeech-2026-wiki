---
id: singh26e_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3451
pdf: https://www.isca-archive.org/interspeech_2026/singh26e_interspeech.pdf
---

# ProSarc: Prosody-Aware Sarcasm Recognition Framework via Temporal Prosodic Incongruity

*Prathamjyot Singh, Ashima Sood, Sahil Sharma, Jasmeet Singh*

[PDF](https://www.isca-archive.org/interspeech_2026/singh26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/singh26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3451)

**TL;DR** — ProSarc is an audio-only sarcasm recognition framework that models temporal prosodic incongruity between local frame-level dynamics and utterance-level emotional baselines, achieving a headline F1 score of 75.3 on MUStARD++.

## Key contributions

- Proposes an audio-only sarcasm detection architecture that explicitly computes a scalar prosodic incongruity score using a dedicated Prosodic Incongruity Analyzer.
- Introduces a weak-supervision mechanism for temporal onset estimation via attention-weighted per-frame divergence without requiring frame-level timestamp labels.
- Evaluates rigorously across four datasets covering scripted, spontaneous, and cross-lingual settings, outperforming prior audio-only baselines.
- Incorporates Monte Carlo dropout for predictive uncertainty, demonstrating that model variance tracks inter-annotator disagreement and perceptual ambiguity.

## Problem

Sarcasm in spoken language relies heavily on prosodic cues such as pitch contours, timing variations, and intensity shifts, yet prior computational systems treat audio as an auxiliary signal or rely on utterance-level global statistics that discard fine-grained temporal dynamics. Multimodal systems are typically dominated by textual or visual cues, while existing audio-only approaches fail to explicitly formulate sarcasm as a measurable mismatch between local prosodic variations and the global emotional baseline. This gap limits robustness, interpretability, and performance under acoustic-only constraints in conversational and cross-lingual settings.

## Method

ProSarc uses a dual-path encoding strategy. The Global Emotion Encoder extracts a 10-dimensional prosodic feature vector (pitch, energy, speaking rate proxy, spectral centroid/bandwidth, and MFCC1) using librosa (25 ms window, 10 ms hop), passing it through a 3-layer MLP (10 -> 128 -> 128 -> 256) with ReLU, batch normalization, and dropout (p = 0.2) to yield a global emotional embedding p_global in R^256. The Temporal Prosody Encoder feeds frame-level embeddings H from a partially fine-tuned self-supervised model (Wav2Vec 2.0, HuBERT, or WavLM with lower 10 layers frozen and last 2 layers trainable) through a 2-layer bidirectional LSTM (hidden size 256 per direction) and a multi-head self-attention layer (4 heads, d_k = 128, dropout 0.2), followed by attention-weighted pooling to produce a local embedding p_local in R^256.

The two path outputs are concatenated into z in R^512 and passed to a Prosodic Incongruity Analyzer comprising an MLP and sigmoid activation to predict a scalar incongruity score s in [0, 1]. This score acts as a gating mechanism to adaptively fuse p_local and p_global into a fused representation p_fused, which is further concatenated with z into z_tilde in R^768 and fed to a single logit classification head optimized via weighted binary cross-entropy.

During inference, temporal onset estimation finds the frame maximizing attention-weighted per-frame divergence using pooled attention weights and Euclidean distance from temporal mean features. Monte Carlo dropout (TMC = 10, p = 0.2) is retained in the classification head during inference to compute predictive variance for uncertainty estimation without altering class decisions.

## Experimental setup

Evaluated on four benchmarks: MUStARD++ (1,203 clips), MUStARD (690 clips), PodSarc stratified sample (1,000 clips), and MuSaG (213 clips), all using 5-fold cross-validation. Compared against a random baseline, OpenSMILE + SVM, and base/large variants of Wav2Vec 2.0, HuBERT, and WavLM. Metrics include F1 score, Accuracy, Precision, Recall, MCC, Cohen's kappa, and AUC-ROC. Implemented in PyTorch on a single NVIDIA Tesla T4 GPU using the Adam optimizer (lr = 2e-5, batch size 4, early stopping patience 5 on validation F1).

## Results

On MUStARD++, ProSarc with WavLM-Large achieves a headline F1 score of 75.28% and 73.29% Accuracy, outperforming prior audio-only methods such as Gao et al. (67.9%) and Tiwari et al. (66.6%). On MUStARD, it achieves 77.03% F1, significantly surpassing Baroiu et al. (60.1%). Generalization tests yield 62.89% F1 on PodSarc and 65.59% F1 on MuSaG. A 10-run validation shows consistent improvements over baselines with a Wilcoxon p = 0.00195 and a large Cohen's d of 1.51. Ablation studies reveal that removing the Prosodic Incongruity Analyzer causes the largest drop in F1 (down to 67.69, a 4.4% relative decrease), followed by removing the Global Emotional Encoder (-2.39 F1) and Temporal Prosody Encoder (-1.48 F1).

| System / Condition | Accuracy (%) | F1 Score (%) | Precision (%) | Recall (%) |
|---|---|---|---|---|
| Random Baseline | 49.17 | 50.00 | 48.94 | 51.11 |
| OpenSMILE + SVM | 53.53 | 52.94 | 53.39 | 52.50 |
| Wav2Vec2-Base (ProSarc) | 55.60 | 49.77 | 56.99 | 44.17 |
| HuBERT-Large (ProSarc) | 68.56 | 71.59 | 67.06 | 77.68 |
| WavLM-Large (ProSarc) | 73.29 | 75.28 | 71.62 | 79.51 |

## Limitations

ProSarc relies solely on audio and misses semantic cues, failing to detect sarcasm when intent is driven by words alone. The single-onset mechanism cannot handle utterances with multiple sarcastic beats. Uncertainty estimates reflect relative predictive variance rather than perfectly calibrated probabilities, and cross-lingual evaluation is constrained by small dataset sizes and English-centric SSL pretraining.

## Why read this

Speech and ML researchers focusing on paralinguistics should read this paper to learn how to explicitly model temporal prosodic incongruity using dual-path self-supervised encoders and weak supervision for onset localization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated content moderation, conversational agent affect analysis, and uncertainty-aware routing for multimodal dialogue systems.

## Related

- (link related pages by id as the wiki grows)
