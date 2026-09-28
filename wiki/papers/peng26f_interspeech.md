---
id: peng26f_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1799
pdf: https://www.isca-archive.org/interspeech_2026/peng26f_interspeech.pdf
---

# Cross-Lingual Speaker Verification with Self-Supervised Pre-Trained Models

*Jinghan Peng, Yu Zheng, Weiqiang Wang, Jian Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/peng26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/peng26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1799)

**TL;DR** — This paper presents a cross-lingual speaker verification system leveraging a 580M-parameter w2v-BERT 2.0 front-end with multi-scale feature aggregation, achieving an equal error rate (EER) of 2.21% on partially mismatched evaluation and 2.99% on fully unseen language evaluations on the TidyVoice2026 benchmark.

## Key contributions

- Proposes a cross-lingual speaker verification pipeline using a frozen/fine-tuned w2v-BERT 2.0 SSL front-end paired with a lightweight attentive statistics pooling back-end.
- Compares six multi-scale feature aggregation strategies (Mean Fusion, Layer-wise/Channel-wise Weighted Fusion, Channel/Temporal Concatenation, and Hierarchical Cross-Attention), showing Channel Concatenation achieves the best EER without extra parameters.
- Introduces a rigorous three-stage training paradigm (frozen feature extraction, full-model fine-tuning on massive multilingual data, and domain-specific large-margin fine-tuning).
- Achieves competitive scores on the TidyVoice2026 benchmark (2.21% EER on eval-A and 2.99% EER on eval-U via score-level fusion with ReDimNet models).

## Problem

Real-world speaker verification (SV) systems experience severe accuracy degradation under language mismatch conditions, where the acoustic cues of different languages become entangled with speaker identity. Prior systems trained primarily on monolingual or narrow datasets fail to generalize when enrollment and verification languages differ. The TidyVoice2026 benchmark targets this bottleneck, demanding language-agnostic representations that isolate physiological and behavioral speaker traits from linguistic content.

## Method

The primary model uses a w2v-BERT 2.0 pre-trained backbone (580M parameters, covering 143 languages) as a front-end feature extractor. Hidden representations from all transformer layers are first mapped through a two-layer MLP adapter to a unified dimension of 256. These adapted layer-wise outputs are then fused using Channel Concatenation (CC), which concatenates features along the channel dimension without adding trainable parameters. The aggregated frame-level features pass through an Attentive Statistics Pooling layer and an Embedding Projection Layer to output a 256-dimensional final speaker embedding.

The training protocol follows a three-stage recipe: (1) Freeze the PTM backbone and train downstream modules for 60 epochs on a large multilingual dataset (TidyVoiceX Train, VoxCeleb2, VoxBlink2, CN-Celeb, WenetSpeech subset, and 3D-Speaker) using AAM-Softmax loss with a margin scaling from 0 to 0.2 and a batch size of 16,384; (2) Unfreeze the PTM backbone and fine-tune all parameters for 20 epochs with a fixed margin of 0.2; (3) Perform large-margin fine-tuning (LM-FT) exclusively on the challenge in-domain TidyVoiceX Train set for 6 epochs with 6-second audio segments and an increased margin of 0.5. As an auxiliary system, lightweight ReDimNet-B5 (9.2M params) and ReDimNet-B6 (15M params) models are trained with SphereFace2-C loss and fused at the score level using Quality Measure Function (QMF) calibration.

## Experimental setup

The model is trained on a massive multilingual corpus combining TidyVoiceX Train (3,666 speakers, 40 languages), VoxCeleb2, VoxBlink2, CN-Celeb 1&2, WenetSpeech cleaned subset, and 3D-Speaker. Development is conducted on TidyVoiceX Dev (808 speakers, 40 languages, 12 million trials). Evaluation uses the TidyVoice2026 benchmark split into tv26 eval-A (partial language mismatch) and tv26 eval-U (full language mismatch across 38 unseen languages). Evaluation metrics are Equal Error Rate (EER%) and minimum Detection Cost Function (minDCF).

## Results

The w2v-BERT 2.0 SV system alone achieves an EER of 1.03% on the Dev set, 3.34% (2.73% with QMF calibration) on eval-A, and 4.59% (2.84% with QMF) on eval-U. Auxiliary ReDimNet-B6 achieves 0.98% on Dev and 2.52% on eval-A after calibration. The final score-level fusion across all calibrated systems reaches an EER of 2.21% on eval-A and 2.99% on eval-U.

Ablations on pre-trained backends on the Dev set without score calibration show w2v-BERT 2.0 outperforming Whisper Large-v3 (3.15% EER), XLS-R-300m (2.94% EER), XLS-R-1b (3.10% EER), XLS-R-2b (3.10% EER), MMS-300m (3.27% EER), and MMS-1b (3.46% EER). Step-by-step training ablations confirm that freezing the PTM yields 1.54% EER, full fine-tuning drops it to 1.14%, and subsequent domain-specific LM-FT achieves 1.03% EER.

| System | Params | tv26 eval-A EER(%) / minDCF | tv26 eval-U EER(%) / minDCF |
|---|---|---|---|
| ReDimNet-B5 (+QMF) | 9.2M | 3.47 / 0.26 | 4.84 / 0.29 |
| ReDimNet-B6 (+QMF) | 15.0M | 2.52 / 0.19 | 3.43 / 0.22 |
| w2v-BERT 2.0 SV (+QMF) | 593.7M | 2.73 / 0.25 | 2.84 / 0.28 |
| Fusion (with QMFs) | - | 2.21 / 0.18 | 2.99 / 0.20 |

## Limitations

The approach relies on massive pre-trained foundation models (580M parameters) which introduce substantial compute and memory overhead during training and feature extraction compared to lightweight back-ends like ReDimNet. While tested across multiple languages, performance guarantees drop on fully unseen languages (eval-U EER remains higher than eval-A). The work does not explore real-time on-device streaming constraints or investigate adversarial robustness against speech deepfakes.

## Why read this

Speech researchers and ML engineers tackling multilingual or zero-shot cross-lingual speaker verification should read this paper for a practical, step-by-step blueprint on adapting large-scale SSL speech models (like w2v-BERT 2.0) using multi-layer aggregation and a three-stage fine-tuning schedule.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cross-lingual speaker verification, multilingual voice biometrics, and secure multi-language conversational AI user authentication.

## Related

- (link related pages by id as the wiki grows)
