---
id: xiao26c_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3210
pdf: https://www.isca-archive.org/interspeech_2026/xiao26c_interspeech.pdf
---

# Evidence Subspace Projection: Measuring How Much Evidence Explains Deepfake Detection in Self-Supervised Speech Models

*Yixuan Xiao, Cheng-Wei Lin, Xin Wang, Yassine El Kheir, Arnab Das, Tim Polzehl, Sebastian Möller, Ngoc Thang Vu*

[PDF](https://www.isca-archive.org/interspeech_2026/xiao26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xiao26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3210)

**TL;DR** — The paper introduces Evidence Subspace Projection (ESP), a method that maps SSL model neuron activations and classification decisions into a shared space to quantify how much specific metadata and signal-level factors explain audio deepfake detection. The analysis reveals that while fine-tuning reduces within-spoof biases and diverse training data decorrelates signal-level artifacts, shortcuts like leading/trailing silence remain persistently embedded in the decision axis.

## Key contributions

- Proposes Evidence Subspace Projection (ESP), the first neuron-level interpretability framework applied to isolate self-supervised learning (SSL) front-ends in audio deepfake detection.
- Formulates a shared neuron-activation space representation using FFN key-value activation coverage matrices and one-vs-rest contrast vectors to define a clear decision axis.
- Quantifies the explanatory power (E_delta / erank) of nine distinct evidence factors across multiple training regimes (frozen, fine-tuned, post-trained) and six evaluation datasets.
- Reveals that training data homogeneity introduces heavy signal-level confounds (like silence and frequency bands) into the decision axis, whereas high-diversity training data successfully decorrelates them.

## Problem

Audio deepfake detectors built on SSL front-ends often exhibit poor out-of-domain generalization because they rely on dataset-specific cues rather than genuine spoofing artifacts. Prior interpretability methods typically evaluate the entire detection pipeline end-to-end, conflating the contributions of the SSL front-end, back-end architecture, loss functions, and optimization dynamics. Without directly connecting what internal representations capture to final decisions, it remains unclear why models fail on unseen distributions or how different training strategies reshape model dependencies.

## Method

The method analyzes Transformer feed-forward (FFN) layers from a key-value perspective, treating the first weight matrix as keys and the second as values to measure individual neuron activation probabilities. Using a HuBERT quantizer to assign frame-level sub-phonetic token labels, the framework calculates conditional activation probabilities by counting co-occurrences where a neuron's activation ranks in the top 1% for a given token. These probabilities are aggregated into an activation coverage matrix A across layers, yielding one-vs-rest contrast residual representations r_g for each label within a shared dataset condition.

To measure explanatory power, the normalized spoof-vs-bonafide decision axis (r_spf) is projected onto subspaces formed by the residual vectors of defined evidence groups (e.g., vocoders, attacker IDs, silence structure, frequency bands). The resulting squared projection energy E_delta is normalized by the effective rank of the subspace to ensure fair comparisons across groups of varying intrinsic dimensionality. Experiments evaluate 300M-parameter XLSR and HuBERT models across three conditions: frozen, fine-tuned on ASVspoof 2019 (FT-19; homogeneous/older) or ASVspoof 5 (FT-5; diverse/modern), and an XLSR model post-trained on large-scale deepfake data.

## Experimental setup

The evaluation utilizes six datasets: ASVspoof 2019 (dev and test), ASVspoof 2021 Logical Access (LA) and Deepfake (DF), ASVspoof 5 test, and In-the-Wild (ITW). Models compared include 300M-parameter XLSR and HuBERT under frozen, fine-tuned (using a simple MLP projection backend with mean pooling, loop-padded 4s inputs, and no data augmentation), and post-trained settings. The primary metrics are Equal Error Rate (EER) and the normalized explanatory power per effective rank (E_delta / erank %).

## Results

Frozen models show that the silence structure group accounts for over 10% of decision variance on ASV19-test but drops below 0.5% on ITW, confirming it as a dataset-specific shortcut rather than a general artifact. Fine-tuning on ASV19 substantially increases signal-level shortcut dependency (e.g., silence and frequency bands), whereas fine-tuning on ASV5 and large-scale post-training effectively suppresses within-spoof variation and decorrelates most signal-level dependencies. Across 22 training-test-group triplets comparing fine-tuned XLSR and HuBERT, lower E_delta / erank correctly predicted lower EER in 18 cases. However, XLSR FT-19 exhibited higher E_delta for text-to-speech (TTS) attacks on ASV21DF yet achieved a lower overall EER (3.81% vs 5.91%) due to a voice-conversion majority dominating the evaluation set.

| System Condition | ASV19 EER (%) | ASV21LA EER (%) | ASV21DF EER (%) | ASV5 EER (%) |
| :--- | :--- | :--- | :--- | :--- |
| XLSR (FT-19) | 0.25 | 5.37 | 3.81 | 17.98 |
| HuBERT (FT-19) | 0.53 | 7.66 | 5.91 | 22.47 |
| XLSR (FT-5) | 15.75 | 19.33 | 10.86 | 5.69 |
| HuBERT (FT-5) | 16.69 | 20.16 | 16.10 | 10.05 |

## Limitations

The analysis is bounded by the specific neuron activation thresholding (top 1%) and HuBERT quantizer used for token generation, which may omit subtle non-linear interactions. Explanatory power metrics can occasionally be conflated when evidence factors are inherently correlated in the underlying datasets. Furthermore, post-training analysis was restricted to XLSR due to the lack of a comparable public post-trained HuBERT model.

## Why read this

Speech researchers and security engineers working on deepfake detection should read this paper to understand how internal SSL representations encode shortcuts and how downstream fine-tuning alters decision logic. It provides a concrete mathematical tool (Evidence Subspace Projection) to diagnose model vulnerabilities before deployment.

## Code

- https://github.com/XIAOYixuan/ESP

## Applications

Auditing audio deepfake detectors for generalization failure, guiding robust architecture and dataset design to eliminate shortcut learning, and interpreting black-box SSL front-ends in security-critical speech applications.

## Related

- (link related pages by id as the wiki grows)
