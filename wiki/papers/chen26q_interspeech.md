---
id: chen26q_interspeech
category: asr
labels: [streaming-real-time]
institutions: ["Samsung"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1676
pdf: https://www.isca-archive.org/interspeech_2026/chen26q_interspeech.pdf
---

# Streaming Open-Vocabulary Keyword Spotting via Role Swapping in Cross-Attention

*Xi Chen, Haichuan Bai, Liming Song*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26q_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26q_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1676)

**Category:** `asr` · **Labels:** `streaming-real-time`

**TL;DR** — This paper presents a streaming open-vocabulary keyword spotting (KWS) framework using a novel cross-attention data flow where streaming speech acts as the Query and text enrollment as the Key/Value. Evaluated on LibriPhrase, the 0.8M-parameter model achieves an EER of 28.21% and AUC of 79.19% on hard negatives.

## Key contributions

- Redesigns cross-attention data flow for streaming open-vocabulary KWS by assigning streaming speech as Query and text enrollment as Key/Value for frame-by-frame processing.
- Introduces a two-stage training strategy for the Pattern Discriminator using attention outputs initially and affinity-based inputs subsequently.
- Applies online hard negative generation via time-domain masking (masking the first 600 ms) to improve robustness against false alarms.
- Eliminates explicit CTC alignment requirements and heuristic post-processing, yielding an end-to-end trainable streaming architecture with an RTF of 0.065 on a single CPU thread.
- Incorporates multi-task learning combining frame-level binary classification, phone matching loss, and bidirectional InfoNCE contrastive loss.

## Problem

Traditional multi-modal open-vocabulary keyword spotting frameworks rely on segment-level cross-attention that requires full-utterance speech context, violating streaming constraints. Prior streaming work either uses Connectionist Temporal Classification (CTC), which suffers confidence drops on mismatched text-speech pairs and demands extra tuning, or similarity-based approaches relying on heuristic post-processing. These shortcomings lead to high false alarm rates and degraded performance under complex acoustic conditions, making them unsuitable for robust on-device deployment.

## Method

The architecture instantiates a text-registered model with approximately 0.8M parameters. The audio encoder consists of two causal convolutional layers (filter sizes 128 and 256, kernel size 5, stride 2 and 1 respectively) followed by two GRU layers with hidden dimensions of 128, processing 100 Hz filterbank features down to 50 Hz. The pre-trained text encoder extracts token embeddings that project to Key/Value vectors. 

To bridge the streaming data flow mismatch where audio provides local frames while text holds global semantics, the affinity matrix $A$ is computed frame-by-frame via dot products between projected audio Query vectors $Q_s(t)$ and text Key vectors $K_t(i)$, ensuring zero algorithmic latency in the attention stage. Training uses a multi-task objective combining frame-level binary classification loss ($L_f$), token-level phone matching loss ($L_p$), and bidirectional InfoNCE contrastive loss ($L_c$) computed over sequence-level GRU embeddings. 

A two-stage training strategy governs the Pattern Discriminator (a GRU and Dense layer): Phase I trains the discriminator on attention-based inputs (concatenating attention outputs $O$ and text embeddings $E_t$) to establish correct semantic alignment patterns, while Phase II continues training on affinity-based inputs (concatenating the affinity matrix row $A(t,:)$ and raw speech embeddings $E_s(t)$) for decision optimization. Hard negatives are generated online by masking the first 600 ms of audio features, and ambient noise is simulated using MS-SNSD babble noise at SNRs ranging from -5 dB to 15 dB alongside time-frequency masking.

## Experimental setup

Evaluated on the LibriPhrase dataset, with training sets extracted from LibriSpeech train-clean-100/360 and test sets from train-others-500, divided into easy negative (LPE) and hard negative (LPH) subsets. Compared against baseline streaming models CTCAT (0.2M params) and SYNASPOT-AT (0.9M params). Performance is measured using Equal Error Rate (EER %) and Area Under Curve (AUC %). Implemented in TensorFlow using the Adam optimizer, with latency profiled on an AMD EPYC 9654 CPU single-thread platform.

## Results

The 0.8M model achieves an EER of 6.82% (AUC 97.95%) on LPE and an EER of 28.21% (AUC 79.19%) on LPH. Compared to SYNASPOT-AT, it improves LPH EER by 0.48% and AUC by 1.84%, while outperforming CTCAT on the hard negative subset (CTCAT yields 29.63% EER on LPH vs. ours 28.21%). 

Ablation studies confirm the importance of each component: removing hard negative generation increases LPH EER from 28.21% to 29.04%, dropping the staged training strategy raises LPH EER to 30.24%, and omitting phone matching loss degrades LPH EER to 30.73%. The system does not win on the easy negative subset (LPE), where CTCAT achieves a slightly better EER of 6.06% compared to the proposed model's 6.82%.

| System | Params (M) | EER LPE (%) | EER LPH (%) | AUC LPE (%) | AUC LPH (%) |
|---|---|---|---|---|---|
| SYNASPOT-AT | 0.9 | 7.07 | 28.69 | 97.17 | 77.35 |
| CTCAT | 0.2 | 6.06 | 29.63 | 98.32 | 77.10 |
| Ours | 0.8 | 6.82 | 28.21 | 97.95 | 79.19 |

## Limitations

The evaluation is restricted to a text-registered instantiation on the LibriPhrase dataset, leaving multi-modal enrollment modalities (e.g., audio-registered KWS) untested in this streaming setup. The model's performance was validated primarily on simulated babble noise and time-frequency masked conditions, which may not capture all real-world acoustic variations. Furthermore, the 0.8M parameter footprint and float32 RTF of 0.065 require further edge-specific compression (like quantization or pruning) for ultra-low-power microcontrollers.

## Why read this

Speech and ML engineers building resource-constrained, on-device keyword spotters should read this to see how redesigning cross-attention data flow eliminates CTC and heuristic post-processing. It provides a concrete blueprint for implementing staged discriminator training and online hard sample generation to drastically improve robustness against false alarms.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device voice wake-up and hands-free voice interaction systems for smartphones, wearables, and IoT appliances requiring open-vocabulary personalization.

## Institutions / 機構

Samsung

## Related

- [MPA-KWS: Multi-Modal Phoneme-Level Alignment for Streaming Open-Vocabulary Keyword Spotting](zhang26fa_interspeech.md) — same problem · relatedness 3.0/3
- [SPARK: Efficient Audio-Text Matching for User-Defined Keyword Spotting via Spiking Neural Networks](baek26_interspeech.md) — same problem · relatedness 2.8/3
- [Massive Open-Vocabulary Keyword Spotting](barreiros26_interspeech.md) — same problem · relatedness 2.8/3
- [KFC-KWS: Keyframe Fusion with CTC for User-Defined Keyword Spotting](li26y_interspeech.md) — same problem · relatedness 2.8/3
- [Mitigating Causality Mismatch with Causal Temporal Relation Distillation for Streaming Keyword Spotting](zhang26ia_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
