---
id: sapkota26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2375
pdf: https://www.isca-archive.org/interspeech_2026/sapkota26_interspeech.pdf
---

# IACC-HuBERT: Intelligibility-Aware Channel Conditioning of HuBERT Frontend for Dysarthric Speech Conformer ASR

[PDF](https://www.isca-archive.org/interspeech_2026/sapkota26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sapkota26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2375)

**TL;DR** — The paper introduces IACC-HuBERT, which conditions pretrained self-supervised speech representations on speaker intelligibility using channel-wise FiLM modulation to improve dysarthric automatic speech recognition, lowering average word error rate to 21.0%.

## Problem

Pretrained speech foundation models are primarily trained on typical control speech and struggle to generalize to the acoustic variability and pronunciation anomalies of dysarthric speech. Although fully fine-tuning these large models can help, it is computationally expensive and risks overfitting on small, scarce pathological speech datasets. Addressing this gap is critical for making speech technology accessible and accurate for individuals with neuro-motor speech disorders.

## Method

The framework extracts utterance-level HuBERT-large-ll60k features and passes them alongside speaker intelligibility embeddings through a custom channel conditioner module. The intelligibility embeddings (128-dimensional) are derived by training a neural classifier on 4-class severity mappings derived from TORGO database scores. Conditioners apply scale and shift transformations across HuBERT transformer layers either via standard FiLM or a novel Gated-FiLM mechanism. While the HuBERT frontend remains frozen, the conditioner (6.3M parameters for FiLM-only, 15.78M for Gated-FiLM) and a downstream 12-block Conformer ASR encoder with a 6-layer Transformer decoder are trained end-to-end using a joint CTC/attention objective.

## Results

Evaluated on the TORGO English dysarthric speech corpus under a leave-one-speaker-out (LOSO) protocol, the system compares FBANK (54.0% average WER), baseline HuBERT (28.9% WER), partially fine-tuned HuBERT, and prior literature. The proposed FiLM-only and Gated-FiLM models achieve average WERs of 21.3% and 21.0% respectively, outperforming existing SSL-and-FDNN baselines (22.3% WER) and traditional HMM/multimodal systems. Ablation experiments confirm that channel conditioning matches or exceeds the performance of partially fine-tuning the last two HuBERT layers (25.2M parameters) while requiring fewer trainable parameters.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and accessibility researchers building robust automatic speech recognition and assistive communication tools for individuals with impaired or dysarthric speech.

## Limitations

The evaluation is restricted to the TORGO database containing eight dysarthric speakers, and future work is needed to validate the approach across a wider range of SSL foundation models and larger pathological datasets.

## Related

- (link related pages by id as the wiki grows)
