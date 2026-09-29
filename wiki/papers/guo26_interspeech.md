---
id: guo26_interspeech
category: asr
institutions: ["Nankai University"]
code: https://github.com/NKU-HLT/GLAD
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1022
pdf: https://www.isca-archive.org/interspeech_2026/guo26_interspeech.pdf
---

# GLAD: Global-Local Aware Dynamic Mixture-of-Experts for Multi-Talker ASR

*Yujie Guo, Jiaming Zhou, Yuhang Jia, Shiwan Zhao, Yong Qin*

[PDF](https://www.isca-archive.org/interspeech_2026/guo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/guo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1022)

**Category:** `asr`

**TL;DR** — GLAD introduces a global-local aware dynamic Mixture-of-Experts architecture for multi-talker ASR, fusing shallow speaker-aware global context with intermediate local acoustic features to guide expert routing. It achieves a state-of-the-art OA-WER of 21.5% on LibriSpeechMix-3mix (generalization) and 40.7% average WER on CH109.

## Key contributions

- First application of Mixture-of-Experts (MoE) to multi-talker automatic speech recognition (MTASR), replacing linear layers in a Conformer encoder with low-rank experts (MoLE).
- Proposes a dual-path routing mechanism that extracts global speaker context from shallow frontend representations and fine-grained patterns from local intermediate layers.
- Introduces a Global-Local Aware Dynamic Fusion module to adaptively weight global and local streams per frame, avoiding the static limitations of fixed routing.
- Demonstrates superior performance and generalization on both simulated (LibriSpeechMix-2mix/3mix) and real-world conversational datasets (CH109).

## Problem

End-to-end multi-talker ASR models using Serialized Output Training (SOT) implicitly handle speaker separation via attention but struggle because speaker-specific acoustic characteristics dilute as signals pass through deep network layers. Prior SIMO approaches require fixed speaker counts and explicit branch separation, while standard MoE routers only look at local layer inputs and fail to distinguish speaker identities in high-overlap scenarios. This limitation causes performance degradation when handling complex multi-party dialogues with unknown speaker counts and heavy overlaps.

## Method

The GLAD-SOT architecture builds upon a 12-block Conformer encoder and a 6-block Transformer decoder (4-head self-attention, 256 hidden units, FFN dim 1024/2048), integrating Mixture of Low-Rank Experts (MoLE) into all encoder linear layers. Each MoLE module employs N=3 parallel low-rank experts (rank r=8, scaling factor alpha=8) alongside a shared linear transformation. To resolve the speaker dilution problem, a global linear encoder maps frontend convolution features (X_S) into a shared global representation (X_global) which is broadcast to every MoLE layer to compute global expert probabilities (P_global) via a KeepTopK routing function. Simultaneously, a local router computes local expert probabilities (P_local) from the intermediate layer input (X_in).

A trainable dynamic fusion module takes the local input to generate a frame-level gating weight matrix (beta in R^{T x 2}) via a linear layer (W_fusion in R^{dh x 2}), yielding balancing weights beta_g and beta_l for the global and local streams. The final expert activation probabilities are computed via element-wise weighted summation, feeding into the experts. Training uses a switch-transformer auxiliary load-balancing loss (balancing weight gamma=0.01) combined with standard ASR loss, optimized with Adam (lr=5e-4, 25k warmup steps) under bfloat16 mixed precision on 8 RTX 3090 GPUs for 50 epochs.

## Experimental setup

Evaluated on LibriSpeechMix (LSM) containing 1.35k hours of training data (0.69k hours 1-speaker, 0.66k hours 2-speaker) and tested across low, medium, and high overlap ratios. Real-world evaluation uses the CH109 dataset (Callhome American English Speech subset) after fine-tuning on the CH11-mix dataset for 5 epochs. Baselines include SOT, CSE-SOT, and SOT+SACTC variants under comparable parameter constraints (~34-39M parameters). Metrics include Word Error Rate (WER), Permutation-Invariant WER (PI-WER), and Overlap-Aware WER (OA-WER).

## Results

GLAD-SOT achieves the best overall performance across all datasets, scoring an OA-WER of 7.4% on LSM-2mix (vs 8.1% for SOT and 8.1% for CSE-SOT) and 21.5% OA-WER on the LSM-3mix zero-shot generalization test (vs 24.1% for SOT and 22.9% for SOT+SACTC-12). In high-overlap 3-mix conditions, it attains 26.3% WER compared to 28.2% for SOT+SACTC-12 and 31.5% for CSE-SOT. Ablations confirm the absolute necessity of the global router: removing it causes OA-WER to degrade from 7.4% to 9.3% on LSM-2mix. On real-world CH109 data, GLAD-SOT achieves an average WER of 40.7% (outperforming SOT at 46.8% and CSE-SOT at 43.9%).

| System | Method | LSM-2mix OA-WER | LSM-3mix OA-WER | CH109 Avg WER |
|---|---|---|---|---|
| S1 | SOT [8] | 8.6% | 24.1% | 46.8% |
| S2 | CSE-SOT [16] | 8.1% | 24.4% | 43.9% |
| S3 | SOT+SACTC-12 [14] | 8.6% | 22.9% | - |
| S4 | SOT+SACTC-13 [14] | 8.3% | 22.6% | 41.9% |
| S5 | GLAD-SOT (Ours) | 7.4% | 21.5% | 40.7% |

## Limitations

The evaluation is restricted to English-language simulated mixtures (LibriSpeechMix) and a single real-world corpus (Callhome American English), leaving multilingual and domain-specific robustness unverified. The model relies on serialized output training (SOT) token order constraints which can scale poorly with very high numbers of concurrent speakers. Additionally, the introduction of dynamic routing layers and global broadcast pathways increases routing compute overhead compared to standard dense conformers.

## Why read this

Speech researchers working on multi-talker ASR or cocktail-party problems should read this paper to see how mixing global shallow acoustic cues with local MoE routing bypasses the layer-dilution bottleneck of speaker representations.

## Code

- https://github.com/NKU-HLT/GLAD

## Applications

Multi-speaker meeting transcription, multi-party dialogue analysis, and automatic speech recognition in heavy-overlap acoustic environments.

## Institutions / 機構

Nankai University

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
