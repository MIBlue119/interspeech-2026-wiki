---
id: yang26h_interspeech
category: asr
labels: [streaming-real-time, robustness-noise]
institutions: ["Ohio State University", "Chinese University of Hong Kong"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1503
pdf: https://www.isca-archive.org/interspeech_2026/yang26h_interspeech.pdf
---

# Robust Streaming ASR with Decoupled Separation and Recognition

*Yufeng Yang, Cheng Yu, Vahid A. Kalkhorani, DeLiang Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/yang26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1503)

**Category:** `asr` · **Labels:** `streaming-real-time`, `robustness-noise`

**TL;DR** — The paper proposes a decoupled framework for robust streaming ASR that pairs an online speech separation frontend with a clean-trained streaming ASR backend, outperforming standard multi-condition training baselines without degrading clean speech performance. It also introduces FastMambaformer, a novel streaming ASR model integrating Mamba into a FastConformer backbone.

## Key contributions

- Establishes a rigorous benchmark for robust streaming ASR evaluating multiple online speech separation frontends and streaming ASR architectures under zero-lookahead constraints.
- Proposes FastMambaformer, a new streaming ASR architecture that replaces convolutional modules in FastConformer with Mamba selective state-space blocks for superior long-context modeling.
- Demonstrates that a decoupled architecture using a strong online speech separation frontend and a clean-trained ASR backend outperforms multi-condition training (MCT) models in streaming conditions.
- Shows that the decoupled benefits are architecture-agnostic, successfully integrating various frontends with pre-trained models like NeMo FastConformer and SimulStreaming.

## Problem

Real-world speech applications require streaming ASR with low latency, but existing systems struggle with background noise, room reverberation, and interfering speakers due to limited future context. The standard mitigation, multi-condition training (MCT), degrades transcription accuracy on clean speech and demands massive data scaling. Alternatively, speech separation frontends often suffer from a domain mismatch where separated audio artifacts deviate from clean ASR training distributions.

## Method

The decoupled framework separates the speech enhancement and recognition tasks: an online speech separation frontend cleans the noisy input, and a streaming ASR backend processes the output using parameters trained exclusively on clean speech. For the frontend, the authors investigate DPDFNet (utilizing dual-path blocks in DeepFilterNet2 with 3.54M parameters) and oTF-CrossNet (an online adaptation of TF-CrossNet with causal attention and convolution masks, containing 7.95M parameters and trained for 50 epochs on complex spectral mapping predicting real/imaginary STFT components). 

For the ASR backend, the novel FastMambaformer (130M parameters) replaces the convolutional blocks of a FastConformer with Mamba selective state-space model (SSM) blocks, utilizing an SSM state expansion factor of 16, a local convolution width of 4, and a block expansion factor of 2. All backends employ an RNN-T decoder. Additionally, large-scale pre-trained models such as NeMo FastConformer (114M parameters) and SimulStreaming (1.5B parameters based on Whisper) are evaluated as backends.

Training uses LibriSpeech data (960 hours) mixed dynamically with 10k non-sound effects at SNRs uniformly sampled from [-5, 0] and [0, 10] dB. Backends are trained for 600 epochs using 8 NVIDIA H100 GPUs.

## Experimental setup

Evaluated on LibriSpeech (test-other mixed with ADTBabble/ADTCafeteria noises at -5 to 10 dB SNRs), CHiME-4 (1-channel track, 1320 simulated and 1320 real utterances), and LibriCSS (utterance-wise evaluation with overlap ratios from 0% to 40%). Baselines include clean-trained and noisy-trained (MCT) FastMambaformer, NeMo pre-trained FastConformer, and SimulStreaming. Metrics are Word Error Rate (WER), Short-Time Objective Intelligibility (STOI), and Perceptual Evaluation of Speech Quality (PESQ).

## Results

On LibriSpeech noisy conditions, the clean-trained FastMambaformer coupled with oTF-CrossNet achieves an average WER of 36.1%, outperforming the noisy-trained MCT baseline (36.9% WER). On the CHiME-4 real test set, the oTF-CrossNet + NeMo pre-trained system achieves 13.66% WER, significantly improving over the standalone NeMo pre-trained model (29.86% WER) and beating the noisy-trained baseline (26.17% WER). 

In ablation comparisons, online frontends (oTF-CrossNet) lag slightly behind offline counterparts (TF-CrossNet, which achieves 25.4% average WER on LibriSpeech when paired with NeMo pre-trained vs 30.9% for oTF-CrossNet), illustrating the fundamental difficulty of zero-lookahead streaming constraints. The framework struggles most when frontend artifacts introduce severe processing distortions, such as DPDFNet on LibriCSS where certain speaker overlap conditions suffer from structural degradation.

| SS Frontend | ASR Backend | LibriSpeech Avg WER | CHiME-4 Real Test | LibriCSS Avg WER |
|---|---|---|---|---|
| - | Clean-trained | 76.8% | 57.35% | 26.51% |
| - | Noisy-trained (MCT) | 36.9% | 26.17% | 25.88% |
| - | SimulStreaming | 45.8% | 16.36% | 23.06% |
| oTF-CrossNet | Clean-trained | 36.1% | 24.56% | 22.93% |
| oTF-CrossNet | NeMo Pre-trained | 30.9% | 13.66% | 20.09% |
| oTF-CrossNet | SimulStreaming | 33.5% | 13.79% | 20.75% |

## Limitations

The approach is bounded by the compounding latency and computational cost of chaining two large neural networks (frontend separation plus ASR decoding) for on-device real-time deployment. Frontend separation artifacts can occasionally hurt ASR performance when speech separation removes high-frequency harmonics or introduces musical noise, as observed with DPDFNet on LibriCSS. Evaluation is limited to English corpora (LibriSpeech, WSJ/CHiME-4, LibriCSS), leaving cross-lingual generalizability unverified.

## Why read this

Speech and ML researchers building real-time audio systems should read this to understand how to bypass the limitations of multi-condition training by leveraging modular, decoupled online speech separation frontends that preserve clean-speech accuracy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time voice assistants, live captioning, multi-talker meeting transcription, and streaming spoken dialogue systems operating in noisy acoustic environments.

## Institutions / 機構

Ohio State University, Chinese University of Hong Kong

**Funding / 經費:** National Science Foundation, Ohio Supercomputer Center

## Related

- [Parallel Time-Band Mixing with Learned Observation-Adding for Robust ASR Front-Ends](shen26c_interspeech.md) — same problem · relatedness 2.2/3
- [Sweep-RSE: Streaming Region-of-Interest Speech Extraction in Multi-Talker Scenarios via Explicit Spatial Sweeping](yu26d_interspeech.md) — complementary · relatedness 2.0/3
- [DelayGSE: A Generative Speech Enhancement Framework with Delayed Text-Aware Conditioning](yuan26b_interspeech.md) — complementary · relatedness 2.0/3
- [DASH: Dual-View Self-Distillation with Multi-Layer Hidden Representations for Robust Speech Recognition](baik26_interspeech.md) — same problem · relatedness 2.0/3
- [Improving Streaming Speaker Diarization for LLM Based Multi-talker Speech Understanding](lin26f_interspeech.md) — shared technique · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
