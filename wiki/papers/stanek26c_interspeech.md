---
id: stanek26c_interspeech
category: speaker
institutions: ["Brno University of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-132
pdf: https://www.isca-archive.org/interspeech_2026/stanek26c_interspeech.pdf
---

# RAT: Reference-Augmented Training for ASV Anti-Spoofing

*Vojtěch Staněk, Anton Firc, Jakub Reš, Kamil Malinka*

[PDF](https://www.isca-archive.org/interspeech_2026/stanek26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/stanek26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-132)

**Category:** `speaker`

**TL;DR** — The paper introduces Reference-Augmented Training (RAT) for ASV anti-spoofing, which uses speaker reference recordings during training to induce beneficial regularization and invariance. This achieves state-of-the-art performance on ASVspoof 5 (2.57% EER, 0.074 minDCF) even when no reference is provided at inference.

## Key contributions

- Proposed Reference-Augmented Training (RAT) strategy that conditions deepfake detection on speaker reference recordings via a Reference-Informed Block (RIB).
- Demonstrated through mechanistic and functional analysis that reference influence naturally diminishes during training, yielding a model that operates effectively as a single-utterance detector at inference.
- Achieved state-of-the-art results on the ASVspoof 5 benchmark (2.57% EER and 0.074 minDCF) with a single model of roughly 328M parameters, outperforming large multi-model fusions.
- Released the complete code, model weights, and scored evaluation trials publicly on GitHub.

## Problem

Traditional ASV anti-spoofing countermeasures operate strictly on single test utterances without exploiting enrollment or reference data, missing an opportunity to catch anomalies via fine-grained speaker comparison. While prior reference-based methods like Spoofing-Aware Speaker Verification (SASV) or Siamese networks exist, they rigidly depend on having clean, matched enrollment utterances available during inference. This dependency makes them fragile when reference audio is noisy, truncated, mismatched, or entirely absent.

## Method

The architecture uses a pretrained XLS-R (Wav2Vec2) 300M model as a shared feature extractor yielding 1024-dimensional embeddings across all 24 transformer layers for both test and reference utterances. The Reference-Informed Block (RIB) processes normalized features through two parallel paths: a lightweight MLP branch (expanding 1024 to 4096 and projecting back to 1024) operating only on test embeddings, and a Multi-Head Cross-Attention branch (4 heads) where test embeddings serve as queries and reference embeddings act as keys and values. The outputs are combined via a residual connection and Layer Normalization, allowing the model to smoothly bypass the cross-attention path if the reference is a zero vector.

After RIB, the outputs are mean-pooled across layers and temporal dimensions to produce a single 1024-dimensional vector, which is fed into a 3-layer MLP classifier with ReLU activations to output logits for bona fide and spoof classes. During training, the dataloader pairs each test utterance with a randomly selected bona fide reference from the same speaker. Stochastic data augmentations (30% probability each for time masking, mu-law encoding, RawBoost, noise types, and filtering) are applied to prevent the model from overfitting to clean references.

The training uses a two-stage recipe with the Adam optimizer and Cross-Entropy loss. Stage 1 freezes the XLS-R frontend and trains all other components for 5 epochs with a learning rate of 10^-3 and a batch size of 16. Stage 2 unfreezes and jointly fine-tunes the XLS-R frontend with the rest of the network for 6 epochs with a learning rate of 10^-6 and a batch size of 6, selecting the checkpoint with the lowest validation EER.

## Experimental setup

Evaluated on the ASVspoof 5 benchmark dataset, using training, development, and evaluation splits that are disjoint by speaker and attack. Compared against baselines including WavLM-SLIM (101M), WavLM + Hybrid Pruning (86M), the 12-model fusion ASVspoof 5 winner T43 (>3.5B), and an in-house XLS-R + mean pooling baseline (316M). Metrics used are Equal Error Rate (EER) and minimum Detection Cost Function (minDCF). Implemented using PyTorch with models trained on institutional GPUs.

## Results

The proposed XLS-R + RAT (zero reference) achieves a state-of-the-art 2.57% EER and 0.074 minDCF on the ASVspoof 5 evaluation set, outperforming the T43 winner fusion (2.59% EER, 0.075 minDCF), WavLM + Hybrid Pruning (3.75% EER), and the standard XLS-R mean pooling baseline (4.87% EER, 0.141 minDCF). When evaluated under various reference degradations (such as 10 dB and 20 dB additive noise, 1s and 3s truncations, silence, noise-only, and speaker-mismatched references), performance remains virtually unchanged (ranging between 2.57% and 2.68% EER), proving that the reference channel can be completely removed at inference without hurting performance.

| System | EER | minDCF |
|---|---|---|
| WavLM-SLIM [29] | 5.56% | 0.149 |
| WavLM + Hybrid Pruning [28] | 3.75% | 0.103 |
| T43 (ASVspoof 5 Winner) [31] | 2.59% | 0.075 |
| XLS-R + mean pooling baseline | 4.87% | 0.141 |
| XLS-R + RAT (with reference) | 2.63% | 0.075 |
| **XLS-R + RAT (zero reference)** | **2.57%** | **0.074** |

## Limitations

The study relies on a single pretrained SSL frontend architecture (XLS-R 300M) and is validated solely on the ASVspoof 5 dataset, leaving open how well RAT generalizes to completely different acoustic domains or older ASVspoof versions. Additionally, while the inference stage is reference-invariant, training requires paired speaker data and significantly higher data preparation overhead than standard single-utterance countermeasure training.

## Why read this

Speech security researchers and ML engineers should read this to understand how multi-input architectures can act as regularizers during training without imposing inference-time deployment burdens, providing a blueprint for robust deepfake detection.

## Code

- https://github.com/Security-FIT/RAT

## Applications

Voice biometric security, biometric authentication protection, speech deepfake detection systems, and fraud prevention in telephony.

## Institutions / 機構

Brno University of Technology

**Funding / 經費:** Brno University of Technology, Ministry of Education, Youth and Sports of the Czech Republic

## Related

- (link related pages by id as the wiki grows)
