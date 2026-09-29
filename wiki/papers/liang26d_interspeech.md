---
id: liang26d_interspeech
category: speech-coding
labels: [multilingual, self-supervised, generative-model]
institutions: ["Tsinghua University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3355
pdf: https://www.isca-archive.org/interspeech_2026/liang26d_interspeech.pdf
---

# ContextCodec: Content-Focused Context Guidance for Ultra-Low Bitrate Speech Coding

*Chengbin Liang, Wenqi Guo, Hao Cao, Zhijin Qin*

[PDF](https://www.isca-archive.org/interspeech_2026/liang26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liang26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3355)

**Category:** `speech-coding` · **Labels:** `multilingual`, `self-supervised`, `generative-model`

**TL;DR** — ContextCodec is a content-first, ultra-low-bitrate neural speech codec that uses a dual-branch encoder with CLIP-style phoneme alignment and stage-wise context injection, achieving strong intelligibility and perceptual quality down to 500 bps.

## Key contributions

- Proposes a content-first dual-branch encoder that explicitly decouples acoustic details from linguistic context to resolve the zero-sum bit allocation problem at ultra-low bitrates.
- Introduces a CLIP-style frame-level contrastive alignment loss against forced-aligned phonemes to maximize linguistic information while minimizing paralinguistic speaker and dialect leakage.
- Designs a context-guided attention decoder featuring acoustic pre-conditioning, time-varying residual modulation, and stage-wise context feature injection via lightweight gates.
- Integrates a lightweight autoregressive (AR) latent refinement module operating over interleaved phase sequences to progressively predict and remove means/scales before quantization.

## Problem

As speech coding is pushed to ultra-low bitrates below 1000 bps, it becomes a zero-sum bit allocation problem where bits spent on fine acoustic details starve the core linguistic message, degrading intelligibility. Traditional neural acoustic codecs prioritize timbre and waveform fidelity, while hybrid codecs incorporating self-supervised learning (SSL) features often suffer from paralinguistic leakage (speaker identity, emotion) and let semantic priors attenuate across successive decoding stages. This creates an urgent need for a codec that explicitly prioritizes and actively reinforces linguistic content throughout the decoding process.

## Method

ContextCodec builds upon a GAN-based quantized autoencoder framework using finite scalar quantization (FSQ) and DAC-style base blocks, mapping an input waveform to shared features that are split into an acoustic stream (da = 512) and a context stream (dc = 512) via a dual-branch encoder. The context head utilizes 2 Transformer layers with 4 attention heads. Prior to decoding, the concatenated latents y are partitioned into P = 4 interleaved phase sequences and refined using a reusable predictor module gp that estimates per-time means and scales from already restored phases using depthwise-separable 1D convolutions with Snake activations, forming normalized residuals that are independently quantized.

The CLIP-style phoneme alignment loss uses Montreal Forced Aligner (MFA) frame-level phoneme IDs mapped via an embedding table, computing a masked symmetric InfoNCE contrastive loss with temperature tau = 0.07 between l2-normalized quantized context features and phoneme embeddings.

The context-guided attention decoder takes the restored latents, splits them into acoustic and context streams, and passes the acoustic features through a context feature enhancer (global channel-wise gate and local time-varying residual pathway). At each upsampling stage (using transposed convolutions and residual 1D conv blocks with hop size h = 640 for a 16 kHz model), the context stream is linearly interpolated to match temporal resolution, projected via pointwise convolution, and applied via sigmoid gating and residual fusion to actively guide waveform reconstruction before a final tanh output layer.

## Experimental setup

Trained on LibriTTS and AISHELL-3 datasets with audio segmented into 3-second clips at 16 kHz sample rate. Evaluated on 6,000 VCTK utterances and 300 utterances per language across 10 Common Voice 21.0 languages, comparing against baselines like EnCodec, DAC, SNAC, Secousticodec, SemantiCodec, FACodec, SpeechTokenizer, X-Codec, and Mimi. Metrics include PESQ, STOI, SI-SDR, Word Error Rate (WER) using Whisper-Turbo, and subjective pairwise preference listening tests. Implemented with AdamW optimizer (lr 2e-4, betas 0.8, 0.99), trained for 1M steps on a single NVIDIA RTX 4090 GPU with batch size 8, using loss weights lambda_m=15, lambda_adv=1, lambda_fm=2, lambda_clip=3.

## Results

At 1000 bps on the multilingual set, ContextCodec achieves a PESQ of 2.140, STOI of 0.866, SI-SDR of 2.110 dB, and WER of 28.31%, outperforming Mimi (PESQ 2.028, STOI 0.852, SI-SDR 1.614 dB, WER 33.60%) and X-Codec. On VCTK at 1000 bps, it yields a PESQ of 2.476, STOI of 0.880, SI-SDR of 3.614 dB, and a low WER of 2.25%. Pushed down to 500 bps, ContextCodec achieves a VCTK PESQ of 2.120 and STOI of 0.846, outperforming Mimi at 550 bps (PESQ 1.685) and SemantiCodec at 625 bps (PESQ 1.910). Subjectively, ContextCodec at 500 bps is preferred over Opus 6K (97.92% to 0.0%) and SemantiCodec (52.92% to 40.83%).

Ablations demonstrate that replacing CLIP phoneme alignment with Wav2Vec 2.0 SSL distillation increases WER from 5.56% to 7.91%, removing stage-wise context injection degrades WER to 8.20%, and eliminating AR latent refinement drops PESQ from 2.048 down to 1.887. Attribute probing on TIMIT shows ContextCodec's Phoneme-CLIP objective achieves higher phone accuracy (88.7% vs 70.2%) and lower speaker leakage (51.8% vs 91.0%) compared to SSL distillation.

| Model | Type | Bitrate (bps) | Multilingual PESQ_↑ | Multilingual STOI_↑ | Multilingual WER_↓ | VCTK PESQ_↑ | VCTK STOI_↑ | VCTK WER_↓ |
|---|---|---|---|---|---|---|---|---|
| Mimi [22] | Hybrid | 1100 | 2.028 | 0.852 | 33.60% | 2.256 | 0.840 | 4.57% |
| X-Codec [18] | Hybrid | 1000 | 1.846 | 0.812 | 31.06% | 2.257 | 0.822 | 3.29% |
| ContextCodec (ours) | Hybrid | 1000 | 2.140 | 0.866 | 28.31% | 2.476 | 0.880 | 2.25% |
| Mimi [22] | Hybrid | 550 | 1.553 | 0.790 | 60.35% | 1.685 | 0.772 | 10.22% |
| SemantiCodec [29] | Hybrid | 625 | 1.660 | 0.788 | 52.69% | 1.910 | 0.820 | 11.42% |
| ContextCodec (ours) | Hybrid | 500 | 1.758 | 0.812 | 52.11% | 2.120 | 0.846 | 5.85% |

## Limitations

Phonological inventories differ across languages, meaning rare or unseen phonemes in the training data may be underrepresented and suffer in cross-lingual generalization. The current evaluation focuses on batch processing, and a fully streaming, stateful implementation requires further engineering validation to minimize algorithmic delay.

## Why read this

Researchers and engineers working on speech coding, generative audio tokenization, or low-bandwidth communication should read this paper to see how explicit linguistic supervision via CLIP-style alignment and stage-wise context injection can overcome the intelligibility bottlenecks of ultra-low-bitrate neural codecs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Satellite communications, bandwidth-constrained IoT voice links, emergency radio systems, and tokenization backbones for ultra-low-bitrate speech language models.

## Institutions / 機構

Tsinghua University

**Funding / 經費:** National Key Research and Development Program of China, National Natural Science Foundation of China, Beijing Natural Science Foundation

## Related

- (link related pages by id as the wiki grows)
