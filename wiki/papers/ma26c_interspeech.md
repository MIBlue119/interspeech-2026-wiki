---
id: ma26c_interspeech
category: voice-conversion
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1961
pdf: https://www.isca-archive.org/interspeech_2026/ma26c_interspeech.pdf
---

# MeanVC 2: Robust Low-Latency Streaming Zero-Shot Voice Conversion

*Guobin Ma, Yuxuan Xia, Yuepeng Jiang, Dake Guo, Hanke Xie, Jingbin Hu, Yanbo Wang, Lei Xie, Pengcheng Zhu*

[PDF](https://www.isca-archive.org/interspeech_2026/ma26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ma26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1961)

**TL;DR** — MeanVC 2 is a lightweight, low-latency streaming zero-shot voice conversion system that uses future-receptive chunking and a universal timbre token encoder to achieve high fidelity. It reduces end-to-end pipeline latency to 110 ms while outperforming prior streaming models on speaker similarity and speech quality metrics.

## Key contributions

- Introduces future-receptive chunking (FRC) to eliminate clean-chunk teacher forcing, cutting training memory usage by 60% and enabling stable 40 ms chunk processing.
- Proposes a universal timbre token encoder (UTTE) that maps global speaker embeddings into key-value universal timbre tokens and uses bottleneck features as queries to retrieve fine-grained pronunciation-aware timbre cues.
- Achieves a low end-to-end first-packet latency of 109.88 ms while maintaining an 18M parameter footprint suitable for single-core CPU execution.
- Demonstrates improved robustness against low-quality reference audio compared to multi-reference timbre encoders.

## Problem

Real-time communication scenarios like live broadcasting and online meetings demand streaming voice conversion with low latency and low computational overhead. Prior autoregressive methods suffer from high decoding latency, while non-autoregressive methods under short-chunk configurations exhibit degraded intelligibility, audio quality, and cross-chunk consistency. Furthermore, existing models like MeanVC rely on multi-reference timbre encoders that make speaker conditioning highly sensitive to the quality of the reference audio, leading to poor speaker similarity when reference samples are degraded.

## Method

MeanVC 2 follows a recognition-synthesis framework comprising a streaming Fast-U2++ ASR encoder, an ECAPA-TDNN speaker encoder, a universal timbre token encoder (UTTE), a 4-layer diffusion transformer (DiT) decoder, and a Vocos vocoder. The streaming ASR model extracts bottleneck features (BNFs) from the 16 kHz source waveform using an 80 ms chunk size and 40 ms frame length, while the speaker encoder extracts a global speaker embedding from the reference audio.

UTTE transforms the global speaker embedding via multi-layer perceptrons (MLPs) and combines it with learnable universal timbre token (UTT) priors (scaled via a tanh function) to form 32 key-value pairs representing timbre prototypes. The BNFs act as queries in a cross-attention module over these key-value pairs to produce timbre-aware BNFs. This decouples fine-grained timbre extraction from direct reference mel-spectrogram reliance and enhances robustness under low-quality conditions.

The DiT decoder uses future-receptive chunking (FRC), partitioning temporal sequences into chunks of size B and enforcing a layer-wise block attention mask across its 4 layers. The past receptive field sizes across layers are P = [2, 2, 1, 1] and future receptive fields are F = [1, 0, 0, 0], totaling 6 past chunks, the current chunk, and 1 future chunk. This bounded look-ahead eliminates clean-chunk teacher forcing required by previous chunk-wise autoregressive denoising (CARD) methods, reducing training memory by 60%. Training utilizes the mean flows formulation, regressing the average velocity field along the ODE trajectory to enable high-quality spectrogram synthesis with a single neural function evaluation (1-NFE) during inference.

## Experimental setup

The system is trained on 10,000 hours of filtered Mandarin audio from the Emilia corpus, resampled to 16 kHz. Zero-shot evaluations use the Mandarin subset of the Seed-TTS test set containing 2,018 source-target pairs, plus a specialized subset of 30 low-quality reference speakers with 100 source utterances for robustness testing. Evaluations compare MeanVC 2 against StreamVoice+ (153M parameters) and MeanVC (80 ms and 160 ms chunk configurations, 14M parameters). Metrics include NMOS, DNSMOS, CER, speaker similarity (SSIM) via a WavLM-finetuned model, real-time factor (RTF), and end-to-end first-packet latency measured on a single-core AMD EPYC 7542 CPU.

## Results

MeanVC 2 achieves an NMOS of 3.81, a DNSMOS of 3.89, a character error rate (CER) of 7.44%, an SMOS of 3.89, and an SSIM of 0.710. It outperforms MeanVC (80 ms) across all five quality and similarity metrics, and surpasses the larger StreamVoice+ system in speaker similarity and DNSMOS. In end-to-end first-packet latency, MeanVC 2 reaches 109.88 ms, outperforming MeanVC (160 ms) at 211.52 ms and StreamVoice+ at 1258.56 ms.

Ablation studies show that removing the forward mask causes severe performance drops (CER increases to 20.65% and NMOS drops to 3.54), confirming the necessity of bounded future context. Removing UTTE drops SSIM from 0.710 to 0.682, verifying its role in capturing fine-grained timbre cues. Replacing UTTE with a multi-reference timbre encoder (MRTE) under low-quality reference evaluation causes DNSMOS to plummet from 1.87 to 1.39.

| System | NMOS | DNSMOS | CER (%) | SMOS | SSIM | Latency (ms) |
|---|---|---|---|---|---|---|
| Ground Truth | 4.07 | 3.79 | 1.36 | - | - | - |
| StreamVoice+ | 3.70 | 3.52 | 10.27 | 3.65 | 0.552 | 1258.56 |
| MeanVC (80 ms) | 3.61 | 3.37 | 11.66 | 3.61 | 0.599 | 111.64 |
| MeanVC (160 ms) | 3.86 | 3.81 | 5.11 | 3.87 | 0.687 | 211.52 |
| MeanVC 2 (Proposed) | 3.81 | 3.89 | 7.44 | 3.89 | 0.710 | 109.88 |

## Limitations

Evaluations are restricted to the Mandarin language subset of Seed-TTS and Emilia corpora, leaving multilingual and cross-lingual generalization untested. The model's acoustic quality and intelligibility (CER 7.44%) still lag slightly behind the larger-context MeanVC (160 ms) configuration (CER 5.11%). Furthermore, compute benchmarks are limited to a single CPU core without exploring quantization or kernel fusion optimizations.

## Why read this

Speech and ML engineers building ultra-low-latency real-time voice conversion systems should read this paper to learn how block-wise receptive-field scheduling in diffusion transformers can replace restrictive autoregressive denoising. It provides a blueprint for decoupling reference audio quality from speaker conditioning using key-value universal timbre tokens.

## Code

- https://aslp-lab.github.io/MeanVC2/

## Applications

Real-time voice chat in multiplayer games, live broadcasting, online meeting voice conversion, and communication aids for speech-impaired individuals.

## Related

- (link related pages by id as the wiki grows)
