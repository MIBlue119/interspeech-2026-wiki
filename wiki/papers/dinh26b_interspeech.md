---
id: dinh26b_interspeech
category: speech-coding
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3474
pdf: https://www.isca-archive.org/interspeech_2026/dinh26b_interspeech.pdf
---

# LitCodec: ASR-Guided Streaming Speech Coding with Unified Quantization

*Son Dang Dinh, Nguyen Thi Minh Anh, Nhat Tran Hong, Huyen Ngo Thi Thu*

[PDF](https://www.isca-archive.org/interspeech_2026/dinh26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dinh26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3474)

**TL;DR** — LitCodec is a semantic-aware, low-latency streaming neural speech codec that injects ASR supervision prior to Finite Scalar Quantization to produce a unified, single-codebook token stream. It achieves state-of-the-art PESQ (2.56) and STOI (0.925) alongside a 2.8% WER among streaming codecs at 800 bps and 50 tokens per second.

## Key contributions

- Pre-quantization ASR supervision embeds linguistic structure into encoder latents more effectively than post-quantization placement.
- Finite Scalar Quantization (FSQ) eliminates multi-codebook complexity, producing a unified semantic-acoustic token stream compatible with language models.
- Dynamic chunk training enables a single causal Conformer model to handle both variable-latency streaming and offline modes.
- Achieves state-of-the-art PESQ, STOI, and WER among streaming neural codecs at both 800 and 640 bps.

## Problem

Real-time speech applications require codecs that provide low-latency streaming while preserving both acoustic fidelity and linguistic content. Traditional waveform-oriented codecs (e.g., EnCodec, SoundStream) suppress fine-grained phonetic cues at low bitrates, while semantic-aware codecs (e.g., SpeechTokenizer, X-Codec) rely on non-causal SSL encoders, multi-stream Residual Vector Quantization (RVQ), or dual-branch architectures that are fundamentally incompatible with causal single-pass streaming. Bridging this gap requires embedding semantic awareness directly into a causal encoder without multi-stream synchronization or representation fragmentation.

## Method

LitCodec operates on STFT-domain representations, converting waveforms to real and imaginary spectrogram features before passing them through a strided linear projection to target frame rate R. A fully causal Conformer encoder (4 layers, D=1024, FFN 4096, 8 heads, kernel 9) transforms these features into frame-level embeddings H. A detachable auxiliary text decoder (2-layer Conformer stack with CTC loss) uses H during training to predict subword tokens, driving gradients directly into pre-quantized latents; SpecAugment time masking (N_mask=5, p_time=5%) is applied exclusively to this auxiliary branch to prevent temporal memorization and distribute phonetic information redundantly.

Following the encoder, Finite Scalar Quantization (FSQ) independently rounds each dimension of a low-dimensional projection of H to a small set of integer levels using fixed grids (e.g., levels [8, 8, 8, 5, 5, 5] mapped to 6 dimensions, yielding 64,000 codebook entries). FSQ is fully deterministic, requires no commitment losses, and avoids codebook collapse, emitting a single flat token stream Z directly consumable by language models. A mirrored causal Conformer decoder reconstructs the STFT features, transformed back via inverse STFT.

The training loss combines a multi-scale mel spectral loss (L1 and log-scaled L2 across multiple STFT resolutions), an adversarial loss via a Multi-Period and Multi-Scale STFT Discriminator with LSGAN objective, and the CTC semantic loss (L_G = 2 L_recon + 1 L_adv + 0.5 L_sem). Dynamic chunk training is used to support variable latencies: full-sequence context is sampled with probability 0.2, while chunk lengths are drawn uniformly from {4, 8, 12, 16} frames. At C=4 frames and R=50 Hz, algorithmic latency is 80 ms.

## Experimental setup

Trained on LibriHeavy (~50,000 hours of 16 kHz read English speech) and evaluated on LibriSpeech test-clean. Compared against baseline codecs including EnCodec, BigCodec, WavTokenizer, SpeechTokenizer, DualCodec, X-Codec, TS3-Codec, and Mimi. Evaluated using HuBERT-Large WER for semantic preservation, wide-band PESQ and STOI for acoustic fidelity, UTMOS for naturalness, and WavLM SPKSIM for speaker similarity. Trained using AdamW (beta_1=0.9, beta_2=0.95), OneCycleLR scheduler (peak lr 1e-5, 1% warmup), 1M steps, batch size 16 per GPU on 8 NVIDIA H100 (80 GB) GPUs with bf16 mixed precision.

## Results

LitCodec-V1 at 800 bps (50 tok/s) achieves a PESQ of 2.56, STOI of 0.925, and WER of 2.8%, outperforming all streaming baselines and exceeding non-streaming models like DualCodec in PESQ (2.56 vs 2.33). At 640 bps (40 tok/s), LitCodec-V2 achieves a PESQ of 2.41, STOI of 0.913, and WER of 3.1%, maintaining high intelligibility where EnCodec degrades to 29.0% WER at 750 bps. Ablation studies demonstrate that removing ASR supervision degrades WER from 2.8% to 3.5% and drops PESQ from 2.56 to 2.42, while shifting ASR supervision to post-quantization yields a weaker WER of 3.2% and lower PESQ of 2.45.

| System | Streaming | BPS | Tok/s | PESQ | STOI | WER (%) |
|---|---|---|---|---|---|---|
| Ground Truth | - | - | - | - | 1.000 | 2.0 |
| EnCodec | Yes | 1500 | 150 | 1.56 | 0.845 | 4.9 |
| TS3-Codec | Yes | 800 | 50 | 2.22 | 0.909 | 3.6 |
| Mimi | Yes | 1100 | 100 | 2.22 | 0.905 | 3.0 |
| LitCodec-V1 | Yes | 800 | 50 | 2.56 | 0.925 | 2.8 |
| LitCodec-V2 | Yes | 640 | 40 | 2.41 | 0.913 | 3.1 |

## Limitations

Evaluation is restricted to objective metrics on English clean speech (LibriSpeech test-clean). Subjective listening tests (e.g., MUSHRA), noisy or spontaneous speech conditions, multilingual generalization, and downstream generation evaluations (such as TTS or SLU) are missing and deferred to future work.

## Why read this

Researchers and engineers building real-time speech language models or streaming speech-to-speech systems should read this paper to learn how pre-quantization ASR supervision and Finite Scalar Quantization can be combined into a single causal token stream without multi-codebook complexity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time live captioning, streaming speech-to-speech translation, and speech-language model tokenization.

## Related

- (link related pages by id as the wiki grows)
