---
id: stergaard26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3430
pdf: https://www.isca-archive.org/interspeech_2026/stergaard26_interspeech.pdf
---

# Don''t Listen to Me: A Lightweight, Low-Latency Model for Own-Voice Cancellation in Far-Field Speech Enhancement

*Mads Østergaard, Alexander Neergaard Zahid, Karl Ulbæk, Andreas Bagge, Kenny Falkær Olsen, Rasmus Lindrup*

[PDF](https://www.isca-archive.org/interspeech_2026/stergaard26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/stergaard26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3430)

**TL;DR** — The paper introduces own-voice cancellation (OVC) to remove an enrolled speaker's voice from a far-field audio stream, eliminating latency-induced distortion, and proposes a compute-efficient Mamba-MinGRU time-domain model that matches ConvTasNet performance at a fraction of the compute while maintaining a 2 ms algorithmic latency.

## Key contributions

- Formulates own-voice cancellation (OVC) as a novel task and counterpart to target speaker extraction for mitigating streaming far-field own-voice artifacts.
- Proposes a compute-efficient Mamba-MinGRU time-domain masking architecture that replaces heavy convolutions with state-space and linear recurrence blocks.
- Replaces the standard ConvTasNet auxiliary speaker encoder with a lightweight bidirectional linear RNN encoder to improve speaker embeddings while reducing auxiliary compute.
- Demonstrates causal streaming performance with an algorithmic latency of only 2 ms, achieving a real-time factor below 1 on a single CPU thread for compact variants.

## Problem

When far-field devices enhance and stream audio back to a user, round-trip processing delays exceeding 15–20 ms create disruptive echo-like artifacts and own-voice distortion due to acoustic interference with the user's direct speech. Traditional deep learning enhancement and target speaker extraction models (such as ConvTasNet and SpeakerBeam) require heavy compute and higher algorithmic latency, making them impractical for lightweight, low-latency edge deployment. OVC addresses this by treating the user's enrolled voice as an unwanted signal to be jointly suppressed alongside environmental noise.

## Method

The system follows a time-domain speaker conditioning framework split into an auxiliary network and a main masking network. The auxiliary network extracts an embedding from a 2-second enrollment utterance of the target speaker, which is injected into the main network via element-wise adaptation layers. The main network utilizes a TasNet-style encoder-decoder structure operating at a 16 kHz sample rate with a kernel size of 32 (yielding a 2 ms algorithmic latency).

The masking network consists of $N=15$ Mamba-MinGRU blocks. Each block is a pre-norm residual layer containing LayerNorm, a linear expansion by factor $K=2.0$ split into $y$ and $z$, a short causal depthwise 1D convolution with a SiLU activation, a MinGRU recurrence temporal mixing layer (computed via parallel associative scan or Hydra bidirectionality for causal/non-causal modes), a gating mechanism ($y \odot \text{SiLU}(z)$), and a final linear projection. The auxiliary network is evaluated using either a 1-repetition ConvTasNet or a 5-block bidirectional linear RNN.

Models are optimized using a negative thresholded signal-distortion ratio (SDR) loss extended with soft thresholds ($\tau = 10^{-3}$ for active speakers, $\tau = 10^{-2}$ for silence/inactive states) to prevent over-optimization on clean separations. Training uses a batch size of 8 for 1 million steps with the AdamW optimizer and a linear decay-to-zero learning rate schedule starting at $5 \times 10^{-4}$.

## Experimental setup

Models are trained on dynamically generated mixtures using LibriSpeech (train-clean-360 partition) mixed with WHAM! noise, where speaker SNRs are sampled from [-5, 5] dB and noise SNRs from [0, 25] dB. Evaluation uses the test-clean split under two main conditions: full mixtures with the own-voice present (F, SNR [10, 20] dB) and denoising-only where the own-voice is absent (D, SNR [0, 10] dB), alongside multi-speaker LibriMix evaluations (3-5 speakers). Baselines include TD-SpeakerBeam configured with $N=256, L=32, B=256, H=512, P=3, X=8, R=4$ (4.94M parameters). Performance is measured using SDR improvement and predicted MOS (DistillMOS), while real-time factor (RTF) is evaluated in causal streaming mode on a single thread of an Intel Core i7-13700 CPU via C++ ExecuTorch runtimes.

## Results

In non-causal full mixture conditions (F), the proposed Mamba-MinGRU baseline achieves 13.38 dB SDR (3.22 pMOS) with a main network compute cost of only 0.33 GMAC/s, compared to 13.42 dB SDR and 4.97 GMAC/s for non-causal TD-SpeakerBeam. Integrating the linear RNN auxiliary encoder further boosts non-causal F performance to 13.57 dB SDR while lowering auxiliary compute from 1.67 to 0.26 GMAC/s. In causal streaming mode, the small Mamba-MinGRU variant with a linear RNN auxiliary encoder achieves 11.47 dB SDR (2.71 pMOS) on condition F and 11.25 dB SDR on condition D, running with an RTF of 0.82 on a single CPU thread. Across ablations, performance drops when speakers share identical fundamental pitch frequencies ($f_0$ around 11 dB SDR) compared to when pitches differ (up to 12.24 dB SDR when enrolled is low pitch). Furthermore, performance degrades by roughly 2 dB in SDR improvement as the number of interfering speakers in the mixture increases from 3 to 5.

| System / Condition | Causal | RTF | SDR (F, dB) | SDR (D, dB) | pMOS (F) | Main MACs (G/s) |
|---|---|---|---|---|---|---|
| Mixture | - | - | -0.07 | 5.02 | 3.28 | - |
| TD-SpeakerBeam (OVC) | - | - | 13.42 | 14.78 | 3.19 | 4.97 |
| TD-SpeakerBeam (OVC) | Yes | - | 11.13 | 12.09 | 2.66 | 4.94 |
| Mamba-MinGRU (Linear RNN) | - | - | 13.38 | 14.93 | 3.22 | 0.33 |
| Mamba-MinGRU + Linear RNN aux | Yes | 1.69 | 11.98 | 11.35 | 2.80 | 0.33 |
| Small Mamba-MinGRU + Linear RNN aux | Yes | 0.82 | 11.47 | 11.25 | 2.71 | 0.18 |

## Limitations

The evaluation is restricted to controlled clean speech and stationary noise datasets (LibriSpeech combined with WHAM!) without testing under real-world acoustic reverberation or actual hardware microphone array distortions. The approach is currently limited to a maximum of two simultaneous speakers during training, showing notable performance degradation as mixture complexity scales to 3-5 speakers. Additionally, while small variants achieve real-time performance on CPU, the base model requires further hardware optimization to comfortably operate below an RTF of 1.0.

## Why read this

Speech and ML engineers building low-latency, streamed far-field communication devices should read this paper to see how linear RNN architectures (Mamba-MinGRU) can perform real-time own-voice cancellation with a 2 ms algorithmic latency at a fraction of the compute cost of traditional ConvTasNet models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smart speakers, conference room hardware, far-field telecommunication systems, and hearing assistive devices requiring real-time streaming own-voice suppression.

## Related

- (link related pages by id as the wiki grows)
