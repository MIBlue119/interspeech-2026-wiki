---
id: sapkota26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2375
pdf: https://www.isca-archive.org/interspeech_2026/sapkota26_interspeech.pdf
---

# IACC-HuBERT: Intelligibility-Aware Channel Conditioning of HuBERT Frontend for Dysarthric Speech Conformer ASR

*Paban Sapkota, Hemant Kumar Kathania*

[PDF](https://www.isca-archive.org/interspeech_2026/sapkota26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sapkota26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2375)

**TL;DR** — The paper introduces IACC-HuBERT, a method that adapts a frozen HuBERT frontend for dysarthric speech recognition by applying intelligibility-aware channel conditioning via FiLM and Gated-FiLM mechanisms. This approach reduces the average Word Error Rate (WER) on the TORGO dataset from 28.9% (unadapted HuBERT) to 21.0% using only 15.78M trainable parameters.

## Key contributions

- Proposes an intelligibility-aware feature conditioning module using FiLM and Gated-FiLM architectures to modulate SSL representations based on speaker severity.
- Achieves state-of-the-art average WER of 21.0% under a leave-one-speaker-out (LOSO) evaluation on the TORGO database.
- Demonstrates parameter efficiency by updating only 6.3M to 15.78M parameters, outperforming partial fine-tuning of the last two HuBERT layers (25.2M parameters).
- Introduces independent neural classifiers predicting utterance-level severity embeddings mapped from speaker intelligibility ratings.

## Problem

Pretrained speech foundation models like HuBERT are predominantly trained on control (typical) speech and fail to adequately capture acoustic variations inherent in dysarthric speech. Traditional fine-tuning approaches require updating large numbers of parameters, risking overfitting due to the scarce availability of annotated dysarthric training data. Consequently, recognizing impaired speech with high inter-speaker variability remains a major challenge for automated speech recognition systems.

## Method

The architecture builds upon the pretrained HuBERT-large-ll60k model as an acoustic frontend, followed by an ESPnet-based Conformer encoder (12 blocks, 4 attention heads, 2048 linear units, kernel size 31) and a Transformer decoder (6 layers, 512 units). To capture dysarthria severity, utterance-level HuBERT mean features are fed into a neural classifier trained on mapped speaker intelligibility classes (four classes derived from TORGO scores) for 25 epochs using an 80/20 train-validation split, extracting a 128-dimensional embedding from the penultimate layer.

This 128-dimensional embedding is injected into the HuBERT frontend at every 10 transformer layers (total of 3 conditioning modules) via scale and shift Multi-Layer Perceptrons. In the FiLM-only setup, scaling and shifting are applied directly, whereas the Gated-FiLM variant introduces a learnable gating vector controlled by a Sigmoid function to dynamically weight the conditioning impact. The conditioning operation is formulated as H_c = H_norm(1 + g \u2299 s) + g \u2299 b, followed by a residual connection H' = H + H_c.

During training, the core HuBERT model remains frozen while only the conditioner and classification layers are updated using a joint CTC/attention objective (CTC weight 0.7, attention weight 0.3). The pipeline is trained using the Adam optimizer with a learning rate of 0.0003, a 5000-step warm-up schedule, and SpecAugment for regularization. Beam search decoding uses a beam size of 20 with an external language model weight of 0.3.

## Experimental setup

Evaluated on the TORGO database, comprising 5.42 hours of dysarthric speech and 9.71 hours of control speech across 8 dysarthric and 7 control speakers, following a leave-one-speaker-out (LOSO) cross-validation protocol. Compared against filterbank (FBANK) features, standard frozen HuBERT, partial HuBERT fine-tuning (last 2 layers, 25.2M parameters), and prior literature models including FMLR-HMM, FS2 & D-HMM, and SSL & FTDNN. Metrics reported include Word Error Rate (WER), Character Error Rate (CER), and Sentence Error Rate (SER).

## Results

Under the LOSO setup on TORGO, the proposed Gated-FiLM variant achieves an average WER of 21.0% and FiLM-only achieves 21.3%, substantially outperforming baseline FBANK (54.0% WER) and standard frozen HuBERT (28.9% WER). For the most severe speakers in Group D, FiLM-only drops the WER from 43.6% (HuBERT) down to 30.3%, while in Group B Gated-FiLM reduces WER from 44.5% to 34.8%. 

In the ablation study, FiLM-only updates 6.3M parameters and Gated-FiLM updates 15.78M parameters, both matching or exceeding the performance of partially fine-tuning HuBERT's last two layers (25.2M parameters). FiLM-only occasionally outperforms Gated-FiLM in severely distorted speech groups (C and D), whereas Gated-FiLM shows superiority in moderate variability cases.

| System | Avg. WER (%) | Avg. CER (%) | Avg. SER (%) |
|---|---|---|---|
| FBANK + Conformer | 54.0 | 45.6 | 68.3 |
| HuBERT + Conformer | 28.9 | 20.5 | 42.9 |
| HuBERT-FT (25.2M) | ~24.1 | ~16.2 | ~48.2 |
| FiLM-only (6.3M) | 21.3 | 13.7 | 37.3 |
| Gated-FiLM (15.78M) | 21.0 | 14.0 | 36.6 |

## Limitations

The evaluation is restricted solely to the TORGO database, which contains a limited cohort of only 8 dysarthric speakers primarily diagnosed with cerebral palsy or ALS, constraining generalization to broader pathological speech types. The approach relies on pre-calculated speaker-level intelligibility scores to derive class labels, meaning unknown test speakers require a proxy method or auxiliary classifier to obtain severity embeddings. Language coverage is strictly limited to English.

## Why read this

Speech and ML researchers focusing on low-resource adaptation of massive SSL models for pathological speech will find a concrete blueprint for parameter-efficient conditional modulation. It demonstrates how lightweight FiLM layers can inject semantic severity priors into frozen feature extractors without expensive end-to-end fine-tuning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Development of robust automatic speech recognition systems for individuals with motor speech disorders, dysarthria, and clinical voice pathologies.

## Related

- (link related pages by id as the wiki grows)
