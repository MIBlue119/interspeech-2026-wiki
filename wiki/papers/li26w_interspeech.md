---
id: li26w_interspeech
category: tts
labels: [efficient-on-device, streaming-real-time, generative-model]
institutions: ["Chinese University of Hong Kong, Shenzhen", "Shenzhen Loop Area Institute", "Shenzhen Transsion Holdings Co., Ltd", "Amphion Technology Co., Ltd"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1340
pdf: https://www.isca-archive.org/interspeech_2026/li26w_interspeech.pdf
---

# Zero-VC: Zero-Lookahead Streaming Voice Conversion via Speaker Anonymization

*Yudong Li, Zihao Fang, Junwen Qiu, Ruihai Jing, Ruixiang Hang, Yingda Shen, Zhizheng Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/li26w_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26w_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1340)

**Category:** `tts` · **Labels:** `efficient-on-device`, `streaming-real-time`, `generative-model`

**TL;DR** — Zero-VC is a strictly causal, zero-lookahead streaming voice conversion system that uses Speaker Anonymization (SA) as a perturbation mechanism to eliminate timbre leakage while preserving prosody, achieving an algorithmic latency of 20 ms.

## Key contributions

- Identifies and resolves the timbre leakage vs. utility preservation trade-off in streaming VC by introducing Speaker Anonymization (SA) as an advanced perturbation mechanism.
- Proves that SA-perturbed representations eliminate the need for future acoustic buffering, enabling a strictly causal, single-frame (20 ms) lookahead streaming architecture.
- Achieves state-of-the-art zero-shot performance among streaming models, recording the lowest source leakage (SS-S 0.171) and highest target similarity (SS-R 0.521) while maintaining a real-time factor (RTF) of 0.063 on CPU.

## Problem

Real-time streaming zero-shot voice conversion struggles to disentangle source timbre from linguistic content without inflating latency. Current information bottleneck (IB) methods discard fine-grained prosody, forcing models to explicitly inject features like F0 which require future frame buffering (e.g., 40-60 ms lookahead). Conversely, prior perturbation approaches like LSCodec or Seed-VC fail to optimize the critical balance between eliminating source identity and preserving linguistic utility. This creates an unacceptable compromise between high algorithmic latency and poor conversion quality in hard-real-time communication systems.

## Method

Zero-VC consists of a distilled streaming w2v-bert-2.0 content encoder, a WavLM-large timbre encoder with an attention-based learnable pooling layer, and a causal HiFi-GAN streaming decoder. The core innovation uses an off-the-shelf Speaker Anonymization (SA) module during training to map source audio into a pseudo-speaker space, stripping timbre while keeping temporal alignment and prosody intact.

The global timbre condition $c_{\text{timbre}} \in \mathbb{R}^D$ is extracted from the 7th transformer layer of WavLM-large using a learnable linear projection $W_p$ for attention-weighted temporal pooling. This condition is injected into the intermediate feature maps of the HiFi-GAN decoder using a three-layer 1D convolution offset mechanism.

The system is trained using an adversarial framework with Multi-Scale (MSD) and Multi-Period (MPD) Discriminators, optimizing a joint loss composed of Mel-Spectrogram loss ($L_{\text{mel}}$, weight 51), feature matching loss ($L_{\text{fm}}$, weight 3), and GAN loss ($L_{\text{adv}}$). During inference, all SA modules and discriminators are discarded; the causal convolution layers maintain a state cache for past receptive fields to enable $O(1)$ constant computational complexity per frame.

## Experimental setup

Trained on the LibriTTS corpus (English, 585 total hours, reduced to ~460 hours after dropping clips under 4 seconds, resampled to 16 kHz). Evaluated on the English subset of seed-tts-eval (~1,000 Common Voice pairs). Baselines include LSCodec, CosyVoice, Seed-VC-Small, StreamVC, and RT-VC. Evaluated via WavLM-large speaker similarity (SS-S, SS-R), Whisper-large-v3 WER, F0 Pearson Coefficients (FPC), Microsoft DNSMOS P.835 (OVRL), and subjective NMOS/SMOS. Trained for 1.2M steps using AdamW ($\beta_1=0.8, \beta_2=0.99$, lr $6\times 10^{-4}$, weight decay 0.01) with a Cosine-Annealing scheduler and batch size of 30 (2-second source/reference pairs) on hardware not explicitly specified except for CPU inference benchmarking on an Intel Xeon Platinum 8468V-2.4 GHz.

## Results

Zero-VC achieves superior streaming performance, outperforming streaming baselines with an SS-S of 0.171, an SS-R of 0.521, an SMOS of 3.88, an FPC of 0.688, and a WER of 3.96%. Ablation studies on lookahead context show that models trained with SA saturate their performance metrics (WER, FPC, SS-R) immediately at 0-20 ms (less than 3% relative improvement with up to 80 ms lookahead), whereas non-SA models require 40-60 ms of future frames to stabilize. Its algorithmic latency drops to 20 ms, beating StreamVC (60 ms) and RT-VC (47 ms).

Where it does not win: Its overall DNSMOS quality score (OVRL 3.044) and naturalness NMOS (3.81) fall slightly behind non-streaming heavyweights like CosyVoice (NMOS 3.82) and Seed-VC-Small (OVRL 3.141).

| System / Condition | SS-S | SS-R | WER (%) | FPC | NMOS | Latency (ms) |
|---|---|---|---|---|---|---|
| LSCodec (Non-Streaming) | 0.277 | 0.426 | 9.00 | 0.650 | 3.70 | - |
| CosyVoice (Non-Streaming) | 0.313 | 0.502 | 4.02 | 0.644 | 3.82 | - |
| Seed-VC-Small (Streaming) | 0.402 | 0.415 | 2.47 | 0.661 | 3.77 | - |
| StreamVC (Streaming) | - | - | - | - | - | 60 |
| RT-VC (Streaming) | - | - | - | - | - | 47 |
| Zero-VC (Ours, Streaming) | 0.171 | 0.521 | 3.96 | 0.688 | 3.81 | 20 |

## Limitations

The training pipeline relies on an off-the-shelf Speaker Anonymization module as a preprocessing step, which introduces external training overhead and prevents end-to-end optimization. Evaluation is strictly restricted to English speech corpora, and cross-lingual voice conversion capabilities are not yet supported.

## Why read this

Speech engineers and audio researchers building hard-real-time streaming communication tools should read this to learn how Speaker Anonymization can replace destructive information bottlenecks and eliminate lookahead latency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time voice changing, live streaming anonymization, secure real-time communication, and ultra-low latency interactive voice response systems.

## Institutions / 機構

Chinese University of Hong Kong, Shenzhen, Shenzhen Loop Area Institute, Shenzhen Transsion Holdings Co., Ltd, Amphion Technology Co., Ltd

**Funding / 經費:** Internal Project Fund from Shenzhen Research Institute of Big Data, Program for Guangdong Introducing Innovative and Enterpreneurial Teams

## Related

- [MeanVC 2: Robust Low-Latency Streaming Zero-Shot Voice Conversion](ma26c_interspeech.md) — same problem · relatedness 2.9/3
- [Improving Model Expressivity and Speaker Matching in Low-Latency Voice Conversion](bargum26_interspeech.md) — same problem · relatedness 2.8/3
- [ProsoCodec: Prosody-Oriented Speech Codec for Voice Conversion](choi26d_interspeech.md) — same problem · relatedness 2.7/3
- [VOSSA: Voiceprint Optimization for Streaming Speech Architectures](tseng26c_interspeech.md) — same problem · relatedness 2.6/3
- [Coco-VC: Degradation-Robust Streaming Voice Conversion System on the Listener Side](kato26_interspeech.md) — same problem · relatedness 2.6/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
