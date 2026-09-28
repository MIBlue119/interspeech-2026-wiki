---
id: stanek26c_interspeech
category: asv-anti-spoofing
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-132
pdf: https://www.isca-archive.org/interspeech_2026/stanek26c_interspeech.pdf
---

# RAT: Reference-Augmented Training for ASV Anti-Spoofing

[PDF](https://www.isca-archive.org/interspeech_2026/stanek26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/stanek26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-132)

**TL;DR** — The paper introduces Reference-Augmented Training (RAT) for ASV anti-spoofing, which uses speaker-reference conditioning during training to achieve reference invariance and state-of-the-art performance (2.57% EER, 0.074 minDCF on ASVspoof 5) even when the reference is absent at inference.

## Problem

Traditional ASV spoofing countermeasures act as isolated single-utterance binary classifiers without utilizing auxiliary enrollment or reference data. While reference-based methods leverage enrollment data to spot anomalies, they typically require valid references during inference, making them fragile when reference audio is missing, noisy, or mismatched. This paper bridges this gap by investigating how reference conditioning affects learning dynamics and whether its benefits can be retained without inference-time dependence.

## Method

The architecture comprises a frozen or fine-tuned 300M-parameter XLS-R frontend, a Reference-Informed Block (RIB), and a downstream 3-layer MLP classifier. RIB features two parallel branches applied to layer-normalized SSL embeddings from 24 transformer layers: a lightweight MLP branch processing only test utterances (4x hidden expansion), and a multi-head cross-attention branch (4 heads) where test queries attend to reference keys and values. Outputs are combined via residual connections, mean-pooled across layers and time, and trained using cross-entropy loss with the Adam optimizer in a two-stage recipe (frozen frontend then joint fine-tuning). Stochastic data augmentations (time-masking, mu-law encoding, RawBoost, noise, and filters) are applied to both test and reference streams with 30% probabilities.

## Results

Evaluated on the ASVspoof 5 benchmark, RAT achieves an Equal Error Rate (EER) of 2.57% and a minimum Detection Cost Function (minDCF) of 0.074, surpassing strong single-utterance baselines such as WavLM-SLIM (5.56% EER) and even large multi-model fusions like the ASVspoof 5 winner T43 (2.59% EER). A standard XLS-R mean-pooling baseline achieves 4.87% EER, whereas adding RAT with a zero-vector reference at inference matches the fully conditioned performance (2.57% EER). Ablations show robust performance under reference degradations such as additive noise at 10–20 dB SNR, 1-second truncation, complete silence, and speaker mismatch.

## Code

- https://github.com/Security-FIT/RAT

## Applications

Speech engineers and security practitioners deploying automated speaker verification anti-spoofing and deepfake speech detection systems in production environments where reference enrollment data may be intermittently unavailable.

## Limitations

The approach relies heavily on robust data augmentations during training to prevent over-reliance on clean references, and requires speaker-paired data during the training phase.

## Related

- (link related pages by id as the wiki grows)
