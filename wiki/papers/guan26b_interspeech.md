---
id: guan26b_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2194
pdf: https://www.isca-archive.org/interspeech_2026/guan26b_interspeech.pdf
---

# UniVoice: Unifying Autoregressive ASR and Flow-Matching based TTS with Large Language Models

*Wenhao Guan, Zhikang Niu, Ziyue Jiang, Kaidi Wang, Peijie Chen, Qingyang Hong, Xie Chen, Lin Li*

[PDF](https://www.isca-archive.org/interspeech_2026/guan26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/guan26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2194)

**TL;DR** — UniVoice is a unified 360M-parameter LLM that integrates autoregressive ASR and flow-matching TTS within a single continuous-space Transformer backbone, achieving a 4.06 WER on zero-shot TTS and competitive ASR performance.

## Key contributions

- A hybrid dual-branch architecture combining an autoregressive Transformer (for ASR via a Whisper-large-v3-turbo encoder and adapter) with a flow-matching DiT backbone (for TTS) in a shared 360M parameter space.
- A dual-attention masking mechanism that dynamically toggles between causal masks for autoregressive ASR and bidirectional masks for flow-matching TTS.
- A text-prefix guided speech infilling strategy operating on continuous mel-spectrograms, enabling robust zero-shot voice cloning without relying on discrete acoustic quantization.
- Joint multi-task training on 50,000 hours of audio data that demonstrates mutual performance enhancement between speech understanding and generation.

## Problem

Existing speech LLMs either treat Automatic Speech Recognition (ASR) and Text-to-Speech (TTS) in isolation, missing natural task synergies, or rely on discrete tokenization (neural audio codecs) which causes irreversible information loss and harms acoustic fidelity. Alternatively, continuous diffusion and flow-matching models achieve high generation quality but lack the autoregressive reasoning needed for recognition. Bridging these paradigms within a single parameter-efficient edge-compatible architecture remains challenging due to the conflicting requirements of causal autoregression for ASR and bidirectional context processing for flow-matching generation.

## Method

UniVoice builds upon the SmolLM2-360M language model backbone, integrating an ASR branch that uses a pre-trained Whisper-large-v3-turbo encoder with adaptive average pooling for temporal downsampling, and a TTS branch that frames synthesis as flow-matching infilling. To maintain architectural homogeneity between understanding and generation, the TTS branch omits standard Diffusion Transformer AdaLN-zero modulation, instead concatenating time embeddings at the head of the sequence and employing Rotary Positional Embeddings (RoPE) across all attention layers.

The training objective combines an autoregressive language modeling loss for ASR with an Optimal Transport Conditional Flow Matching (OT-CFM) loss for TTS, weighted by a factor lambda = 0.005 to prioritize the harder flow-matching task. A dual-attention masking mechanism dynamically applies causal masks during ASR optimization and full bidirectional masks during TTS infilling, where 70% to 100% of the mel-spectrogram frames are masked. Classifier-Free Guidance (CFG) is utilized during training and inference (with weights of 2 for text and sampling over 32 steps) to condition generation on unmasked acoustic context and text-prefix tokens.

During inference, ASR performs standard token decoding while TTS runs a prompt-based infilling workflow. Given reference audio, its transcript, and target text, the model computes target duration ratios, sets up text and acoustic conditions, and solves the flow ODE from Gaussian noise to yield an 80-bin mel-spectrogram (1024 frame size, 256 hop size, upsampled to 22.05kHz), which is subsequently synthesized into a waveform using BigVGAN.

## Experimental setup

Trained on 50,000 hours of the LibriHeavy dataset. Zero-shot TTS evaluated on LibriSpeech-PC test set using UTMOS/MOS (naturalness), SIM/SMOS (speaker similarity), and WER (robustness). ASR evaluated on LibriSpeech test-clean and test-other subsets using WER. Implemented using SmolLM2-360M backbone, Whisper-large-v3-turbo encoder, and BigVGAN vocoder, trained for 10 epochs with AdamW (lr 1.5e-3, warmup 20k steps, batch size 160k frames).

## Results

UniVoice achieves a zero-shot TTS WER of 4.06, a speaker similarity (SIM) of 0.56, and a UTMOS naturalness score of 3.72 on LibriSpeech-PC, outperforming prior unified models like OpusLM-7B (4.60 WER). In ASR, it obtains 2.5 WER on LibriSpeech test-clean and 4.2 on test-other, closely tracking specialized models despite joint multi-task training pressure. Ablations show that text-prefix speech infilling outperforms speaker-embedding-only baselines (WER dropping from 5.72 to 4.06) and bidirectional masking beats AR masking (WER 4.66 vs 9.85). However, UniVoice lags behind dedicated single-task TTS models like CosyVoice2 (2.23 WER) in speaker similarity and naturalness due to parameter sharing and the lack of AdaLN-zero modulation.

| System | Params | WER ↓ | SIM ↑ | UTMOS ↑ | ASR Clean WER ↓ |
|---|---|---|---|---|---|
| Ground Truth | - | 2.43 | 0.69 | 4.07 | - |
| OpusLM-7B | 7.0B | 4.60 | - | - | - |
| CosyVoice2 | 0.6B | 2.23 | 0.66 | 4.38 | - |
| F5-TTS | 0.3B | 2.54 | 0.66 | 3.84 | - |
| UniVoice (Ours) | 0.4B | 4.06 | 0.56 | 3.72 | 2.5 |
| UniVoice-TTS | 0.4B | 4.66 | 0.56 | 3.92 | - |

## Limitations

Evaluated exclusively on English datasets (LibriHeavy and LibriSpeech), leaving multilingual and low-resource capabilities unverified. Speaker similarity trails specialized non-unified architectures like CosyVoice, likely caused by the omission of AdaLN-zero modulation. The evaluation is currently restricted to ASR and TTS tasks without expansion into broader speech-to-speech dialogue or conversational turn-taking.

## Why read this

Researchers and engineers building unified speech LLMs should read this paper to see how continuous representations and flow-matching can be successfully integrated into a causal autoregressive backbone without discrete neural codebooks.

## Code

- https://github.com/gwh22/UniVoice

## Applications

Unified speech assistants, real-time voice-to-voice conversational agents, zero-shot voice cloning systems, and edge devices requiring low-latency joint speech recognition and synthesis.

## Related

- (link related pages by id as the wiki grows)
