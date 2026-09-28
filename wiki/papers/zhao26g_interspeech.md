---
id: zhao26g_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2159
pdf: https://www.isca-archive.org/interspeech_2026/zhao26g_interspeech.pdf
---

# MSpoofTTS: Multi-Resolution Spoof-Guided Inference for Discrete Speech Synthesis

*Junchuan Zhao, Minh Duc Vu, Ye Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/zhao26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhao26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2159)

**TL;DR** — MSpoofTTS is a training-free inference framework that integrates multi-resolution token-level spoof detectors into autoregressive neural codec language model decoding, improving perceptual naturalness and reducing artifacts without altering model weights.

## Key contributions

- Extends spoof detection to discrete codec sequences by building multi-resolution authenticity models.
- Develops a hierarchical decoding strategy utilizing spoof scores for candidate pruning and hypothesis re-ranking at inference time.
- Avoids the need to retrain or fine-tune the underlying pretrained codec language model.
- Demonstrates consistent perceptual quality and robustness gains on standard evaluation and challenging tongue-twister benchmarks.

## Problem

Autoregressive neural codec language models suffer from token-level inconsistencies and distributional drift during inference due to accumulated small errors. While training-time alignment and reward-driven objectives mitigate this, they require expensive retraining. Prior decoding-time adjustments (such as repetition penalties or nucleus sampling) target specific failure modes rather than globally evaluating sequence naturalness or token authenticity.

## Method

The framework utilizes NeuTTS as the frozen base generator. To detect token distribution drift, five distinct Conformer-based binary discriminators are trained on 100 hours of LibriTTS data using cross-entropy loss: three operating on contiguous sequence crops of lengths L ∈ {10, 25, 50} to capture local transitions and broader contexts, and two operating on skip-sampled representations (downsampling rates r = 2 and r = 5 from 50-token lengths) to reveal structural inconsistencies. 

During inference, the system builds on Entropy-Aware Sampling (EAS)—which uses a memory window W = 15, cluster size ke = 3, and penalty hyperparameters α = 0.2, β = 0.7, γ = 0.8—within a hierarchical coarse-to-fine pruning loop. After generating an initial warmup segment of Lw = 20 tokens, the decoder samples B0 = 8 candidate continuations, extends them to stage length L1 = 10, prunes them down to top B1 = 5 using the short-span detector (M10), extends them further to L2 = 25, prunes to top B2 = 3 using M25, extends to L3 = 50, and finally evaluates them across M50 and its skip-sampled variants (M50←25, M50←10). The aggregated rank score selects the optimal token continuation without altering the autoregressive backbone.

## Experimental setup

Experiments use LibriSpeech and LibriTTS test sets for standard zero-shot evaluation, alongside the TwistList benchmark containing dense alliteration and repetitive phoneme structures for robustness stress-testing. Spoof detectors are trained using AdamW (lr = 1e-4, weight decay = 1e-4) on a single NVIDIA L40S GPU. Evaluation metrics include Whisper-large-v3 Word Error Rate (WER), WavLM cosine speaker similarity (SIM), NISQA and MOSNet neural quality estimators, and human Mean Opinion Scores (MOS-N, MOS-Q, SMOS) rated by 15 participants.

## Results

On LibriSpeech and LibriTTS, HierEAS (MSpoofTTS) achieves superior or competitive performance, yielding a LibriSpeech WER of 0.0532 and NISQA of 4.602 compared to the vanilla Original baseline (WER 0.0694, NISQA 4.462) and non-hierarchical EAS (WER 0.0576, NISQA 4.571). On LibriTTS, HierEAS reaches a NISQA score of 4.562 and MOSNET score of 4.3409, outperforming the original baseline (NISQA 4.397, MOSNET 4.1879). On the challenging TwistList tongue-twister stress test, HierEAS maintains robustness with a WER of 0.1531 and achieves the highest perceptual quality scores (NISQA 4.513, MOSNET 3.9802). Subjective listening tests confirm clear gains in naturalness (MOS-N) over baseline decoding schemes while preserving speaker similarity.

| Inference Scheme | LibriSpeech WER ↓ | LibriSpeech NISQA ↑ | LibriTTS WER ↓ | LibriTTS NISQA ↑ |
|---|---|---|---|---|
| Ground Truth | 0.0337 | 4.620 | 0.0430 | 4.593 |
| Original | 0.0694 | 4.462 | 0.0715 | 4.397 |
| RAS | 0.0641 | 4.553 | 0.0657 | 4.425 |
| EAS | 0.0576 | 4.571 | 0.0672 | 4.408 |
| HierRAS | 0.0591 | 4.596 | 0.0628 | 4.520 |
| HierEAS (MSpoofTTS) | 0.0532 | 4.602 | 0.0633 | 4.562 |

## Limitations

The framework relies entirely on the quality and generalizability of auxiliary token-level spoof detectors, which may struggle with unseen speaker accents or domain shifts not covered by the LibriTTS training split. Hierarchical beam expansion and multi-resolution discriminator evaluations introduce additional inference latency compared to single-pass sampling. Evaluations are restricted to English datasets and a single base neural codec language model (NeuTTS).

## Why read this

Researchers and practitioners working on neural codec language models or decoding-time steering will find this a practical, gradient-free blueprint for improving perceptual synthesis quality without expensive model retraining.

## Code

- https://danny-nus.github.io/MSpoofTTS.github.io/

## Applications

Zero-shot text-to-speech, audiobook narration, and voice cloning applications requiring high perceptual fidelity and robustness against repetition artifacts.

## Related

- (link related pages by id as the wiki grows)
