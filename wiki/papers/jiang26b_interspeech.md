---
id: jiang26b_interspeech
category: speech-coding
labels: [streaming-real-time, generative-model]
institutions: ["University of Science and Technology of China", "Tsinghua University"]
code: https://pb20000090.github.io/VoCodec/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-466
pdf: https://www.isca-archive.org/interspeech_2026/jiang26b_interspeech.pdf
---

# VoCodec: A Low-bitrate Streamable Neural Speech Codec with Voicing-driven Quantization

*Xiao-Hang Jiang, Yang Ai, Rui-Chen Zheng, Lirong Dai, Zhen-Hua Ling, Ji Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/jiang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jiang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-466)

**Category:** `speech-coding` · **Labels:** `streaming-real-time`, `generative-model`

**TL;DR** — VoCodec is a fully causal, low-bitrate neural speech codec that employs a voicing-driven quantization strategy, allocating higher bitrates to perceptually sensitive voiced frames and lower bitrates to unvoiced frames. It achieves competitive perceptual quality at 1.1 kbps on 16 kHz audio while reducing bitrates by approximately 27% compared to uniform quantization baselines.

## Key contributions

- Integrates a lightweight, parallelizable voicing detector into a fully causal encoder-quantizer-decoder streaming neural speech coding pipeline.
- Proposes a voicing-driven quantizer that applies residual scalar-vector quantization (RSVQ) to voiced frames and simple scalar quantization (SQ) to unvoiced frames.
- Develops a mask-based efficient training strategy using dual-path parallel quantization and a frame-level binary mask matrix to bypass sequential training bottlenecks.
- Demonstrates ~27% bitrate reduction (e.g., matching 1.5 kbps baseline quality at 1.1 kbps) without degrading human perceptual metrics.

## Problem

Traditional neural speech codecs utilize uniform quantization across all temporal frames, wastefully allocating identical bitrates to both voiced and unvoiced sounds regardless of their acoustic content. While unvoiced frames have a weak perceptual impact, voiced frames carry rich periodic structures and concentrated low-frequency energy that heavily govern speech intelligibility. Existing non-causal codecs scale parameters up but fail real-time streaming constraints, while prior causal lightweight codecs suffer from suboptimal bit allocation.

## Method

VoCodec builds upon a fully causal architecture using 8 modified ConvNeXt v2 blocks, causal convolutions, and a unidirectional LSTM layer at the end of the encoder to improve sequence modeling, paired with a symmetric upsampling decoder and inverse MDCT. The input speech waveform is processed in parallel by an energy-based voicing detector computing FFT spectra and fundamental frequency range energies (between f0min=60 Hz and f0max=600 Hz, with energy threshold tau_energy=0.75) to generate binary voicing flag tokens (dV_F). The voicing-driven quantizer routes encoded features to either an RSVQ (consisting of 1 coarse scalar quantizer and 2 improved vector quantizers with online codebook balancing to prevent collapse) for voiced frames (dV_F=1), or a single scalar quantizer for unvoiced frames (dV_F=0). 

To overcome the training speed bottleneck of streaming architectures, the authors use a mask-based efficient training recipe: batch features undergo parallel dual-path quantization through both RSVQ and SQ, and a binary mask matrix constructed from the voicing flag vector element-wise multiplies the outputs before feeding the decoder. The total loss combines spectral-level loss, codebook loss, and generative adversarial loss.

## Experimental setup

Evaluated on LibriTTS (16 kHz, train-clean-100/360 for training; dev/test-clean for validation/test) and VCTK (48 kHz, ~41k utterances training, ~3k test). Evaluated against non-streamable baselines (DAC, BigCodec) and streamable baselines (AudioDec, MDCTCodec-S, StreamCodec) matched to target bitrates of 1.1 kbps (16 kHz) and 2.7 kbps (48 kHz). Metrics include log-spectral distance (LSD), short-time objective intelligibility (STOI), virtual speech quality objective listener (ViSQOL), FLOPs, parameter count, and subjective evaluations via MUSHRA and ABX preference tests.

## Results

On LibriTTS at 1.1 kbps, VoCodec achieves an LSD of 0.896, STOI of 0.916, and ViSQOL of 4.115, outperforming StreamCodec (LSD 0.918, STOI 0.896, ViSQOL 4.048) and approaching the heavyweight BigCodec (ViSQOL 4.086). In subjective MUSHRA tests at 1.1 kbps, VoCodec scores 75.18, ranking second only to BigCodec (77.40) and beating StreamCodec (69.64). ABX tests show VoCodec at 1.1 kbps performs comparably to multiple baseline codecs running at 1.5 kbps (p > 0.05), confirming a 27% bitrate savings. Ablation studies reversing the strategy (RSVQ on unvoiced, SQ on voiced, termed VoCodec-r) severely degrades overall LSD (0.959), STOI (0.823), and ViSQOL (3.673). Where it does not win: VoCodec achieves higher individual LSD on unvoiced frames (LSD_u = 0.645 vs StreamCodec's 0.620), though this does not negatively impact overall human perception.

| System | Streamable | LSD ↓ | STOI ↑ | ViSQOL ↑ | MUSHRA ↑ |
|---|---|---|---|---|---|
| DAC | × | 0.936 | 0.888 | 3.781 | 74.83 ± 5.32 |
| BigCodec | × | 0.888 | 0.920 | 4.086 | 77.40 ± 5.07 |
| AudioDec | ✓ | 0.988 | 0.698 | 3.617 | 71.02 ± 5.89 |
| MDCTCodec-S | ✓ | 0.952 | 0.867 | 3.772 | 65.37 ± 7.71 |
| StreamCodec | ✓ | 0.918 | 0.896 | 4.048 | 69.64 ± 6.52 |
| VoCodec | ✓ | 0.896 | 0.916 | 4.115 | 75.18 ± 5.16 |

## Limitations

The codec's effective bitrate is content-dependent and varies dynamically based on the local voiced-frame ratio, which may complicate buffer management in fixed-bandwidth transmission channels. Evaluation is limited to clean English speech datasets (LibriTTS and VCTK) and has not been tested on noisy speech, environmental acoustics, or non-speech audio types like music or singing. The heuristic energy-based voicing detector may fail in high-background-noise or highly reverberant real-world environments.

## Why read this

Speech and ML engineers building real-time, low-latency communication systems will learn how content-adaptive variable bit allocation via simple voicing detectors can drastically cut bandwidth without sacrificing perceptual quality. It offers a practical template for bypassing slow streaming model training loops using parallel mask-based training strategies.

## Code

- https://pb20000090.github.io/VoCodec/

## Applications

Real-time speech communication, mobile VoIP, satellite communication, low-bandwidth audio storage, and streamable neural text-to-speech backends.

## Institutions / 機構

University of Science and Technology of China, Tsinghua University

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
