---
id: nasrallah26_interspeech
category: speech-anonymization
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2927
pdf: https://www.isca-archive.org/interspeech_2026/nasrallah26_interspeech.pdf
---

# DECRA: Dynamic Emotion Control for Real-time Speech Anonymization

*Ghady Nasrallah, Waris Quamer, Mu-Ruei Tseng, Ricardo Gutierrez-Osuna*

[PDF](https://www.isca-archive.org/interspeech_2026/nasrallah26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nasrallah26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2927)

**TL;DR** — DECRA is a real-time streaming voice conversion and anonymization system that performs closed-loop, time-varying prosody control using continuous valence-arousal trajectories with less than 80 ms GPU latency. It achieves strong emotion steering (CCC arousal of 0.81 for neutralization) and high speaker anonymization (EER of 46.64%) while maintaining a low Word Error Rate (4.90%).

## Key contributions

- Simultaneous voice and emotion streaming conversion combining voice anonymization with continuous valence-arousal level manipulation.
- Dynamic, closed-loop emotion control via an integrated causal streaming module that predicts frame-wise valence-arousal trajectories online.
- A scalable training pipeline leveraging offline SER pseudo-labels on large unannotated corpora to eliminate dependency on small acted emotion datasets and enhance generalization to unseen speakers.

## Problem

Traditional voice conversion and streaming speech anonymization focus strictly on identity obfuscation while neglecting prosody or emotion control, which risks leaking sensitive affective information. Existing expressive voice conversion models typically operate offline at the utterance level, preventing time-varying manipulation during conversational speech. Furthermore, standard speaker representations entangle timbre with emotional attributes, and prior emotion VC methods suffer from poor generalization due to their reliance on small, acted emotion corpora.

## Method

DECRA is built on the TVTSyn streaming voice conversion architecture, utilizing a causal 1-D CNN content encoder with four strided downsampling stages and eight causal multi-head self-attention blocks (using a 2 s look-back and up to 80 ms look-ahead) followed by a factorized vector-quantized bottleneck. Speaker identity is modeled as a time-varying timbre (TVT) sequence derived from a 704-dim global speaker embedding (concatenated x-vectors and ECAPATDNN) mapped into a Global Timbre Memory of 48 slots and interpolated via Slerp. To disentangle emotion, an MLP projector maps the global speaker embedding into an emotion-free subspace using adversarial learning with a gradient-reversal layer (GRL) supervised by utterance-level valence-arousal (V/A) pseudo-labels.

For closed-loop streaming emotion control, a fully causal 1-D CNN SER head with three layers, kernel size 5, and dilations {1, 2, 4} is attached to the content encoder features before the VQ bottleneck to predict frame-level V/A trajectories using Huber loss and first-order temporal smoothness regularization. The resulting V/A sequence is projected to a 32-dim conditioning embedding via a 1x1 Conv1D, linearly interpolated to match the 20 ms frame rate, and fused into the waveform decoder via Conditional Layer Normalization with Fusion. The decoder combines time-varying timbre and V/A conditioning, optimized with L1 multi-resolution mel-reconstruction, multi-period/multiband adversarial discriminators, feature-matching, and L2 F0/energy prediction losses.

## Experimental setup

Trained on a mixture of LibriTTS and the Natural Voices EVC subset, with pre-trained speaker encoders from SpeechBrain trained on VoxCeleb, and evaluated on the ESD corpus. Models are optimized using AdamW (lr 10^-4, batch size 16) with the content encoder and waveform decoder containing 37.5M and 52.5M parameters respectively, trained separately for 500k steps on an NVIDIA RTX 5000 Ada GPU. Evaluated using Word Error Rate (WER via Whisper), speaker similarity (cosine distance of ECAPATDNN + x-vectors), NISQA-MOS, concordance correlation coefficients (CCC) for valence and arousal, equal-error-rates (EER) under the VPC'24 lazy-informed attacker model, and unweighted average recall (UAR) for emotion.

## Results

DECRA achieves a neutralization arousal CCC of 0.81 and valence CCC of 0.37, outperforming baselines like SeedVC (0.75 / 0.40) and Vevo (0.43 / 0.31) in arousal agreement while maintaining comparable intelligibility (14.0% WER) and speaker similarity (0.82). For emotion conversion, it attains a conversion arousal CCC of 0.74 and valence CCC of 0.14. In VPC'24 evaluations, DECRA achieves a 4.90% WER, an EER of 46.64% (compuring favorably to DarkStream's 49.09% and TVTSyn's 47.55%), and a substantially higher emotion preservation UAR of 48.70% compared to DarkStream (34.39%) and TVTSyn (37.32%). Streaming efficiency tests on 60 ms chunks yield a latency of 76.1 ms and a real-time factor (RTF) of 0.268 on a GPU.

| System | WER (%) ↓ | EER (lazy) ↑ | UAR (emotion) ↑ | CCC_A (Neutralization) ↑ |
|---|---|---|---|---|
| SLT24 | 5.70 | 31.40 | 57.00 | - |
| DarkStream | 10.80 | 49.09 | 34.39 | - |
| GenVC-s | 8.20 | 48.40 | 34.23 | - |
| TVTSyn | 5.35 | 47.55 | 37.32 | - |
| DECRA | 4.90 | 46.64 | 48.70 | 0.81 |

## Limitations

Valence control and prediction are significantly less reliable than arousal control (valence correlation to targets is 0.21 versus 0.78 for arousal), stemming from inherent SER challenges and the entanglement of valence with linguistic content. The streaming constraint leads to lower absolute NISQA-MOS scores relative to offline, non-causal models like SeedVC and Vevo. Evaluation scope is restricted to English corpora (LibriTTS, ESD, Natural Voices).

## Why read this

Speech and ML researchers focusing on real-time privacy and affect manipulation should read this to learn how to implement closed-loop adversarial disentanglement and frame-wise V/A conditioning for streaming voice conversion. It offers a clear blueprint for balancing strong speaker anonymization with high emotion preservation under strict sub-80ms latency constraints.

## Code

- https://ghadynasrallah.github.io/decra-demo

## Applications

Real-time voice anonymization for privacy-preserving communications, interactive conversational agents with dynamic emotional prosody adaptation, and secure streaming voice changers.

## Related

- (link related pages by id as the wiki grows)
