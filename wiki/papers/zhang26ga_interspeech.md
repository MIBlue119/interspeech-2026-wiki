---
id: zhang26ga_interspeech
category: speech-coding
labels: [generative-model]
institutions: ["Zhejiang University", "StepFun"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3314
pdf: https://www.isca-archive.org/interspeech_2026/zhang26ga_interspeech.pdf
---

# A Dual-Stream Discrete Neural Codec with Fixed-Length Global Speaker Tokens and Dynamic Frame Rates for Low-Bitrate Speech Tokenization

*Boyang Zhang, Yechang Huang, Xuerui Yang, Ziyue Jiang*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26ga_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26ga_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3314)

**Category:** `speech-coding` · **Labels:** `generative-model`

**TL;DR** — DySTCodec is a low-bitrate dual-stream discrete speech codec that combines a single content stream with similarity-based dynamic frame aggregation and fixed-length global speaker tokens, achieving high-fidelity reconstruction at 0.57–0.70 kbps.

## Key contributions

- A dual-stream architecture separating a single time-varying semantic token stream from a compact set of 32 fixed-length global speaker tokens discretized via finite scalar quantization (FSQ).
- A similarity-based dynamic frame aggregation module that merges temporally redundant frames and supports controllable token rates at inference via a single threshold tau.
- An adaptive deaggregation module paired with a non-causal bottleneck transformer to restore base frame rates and mitigate boundary artifacts.
- A timbre perturbation preprocessing technique applied prior to semantic feature extraction to prevent speaker leakage into the content stream.

## Problem

Neural audio codecs typically rely on multi-stream residual vector quantization (RVQ) which burdens downstream speech language models with excessive token generation complexity. Single-codebook codecs simplify this but suffer from feature entanglement, where linguistic content and speaker timbre are intertwined in the same representation. Meanwhile, standard fixed-frame-rate codecs waste token capacity on slowly varying regions like long vowels and silence. Prior codecs such as BiCodec and TiCodec lack dynamic token rate control or suffer from speaker-content leakage.

## Method

DySTCodec features a global encoding pathway, a semantic encoding pathway, a fusion prenet, a postnet, an adaptive deaggregation module, and a waveform decoder. The global pathway takes an 80-bin mel-spectrogram through an ECAPA-TDNN, aggregates variable outputs into $M=32$ continuous tokens via cross-attention, and quantizes them using finite scalar quantization (FSQ) with $d_g=6$ scalar dimensions and $L=4$ levels per dimension ($|C_g|=4096$, contributing ~52 bps). The semantic pathway applies a time-stretching timbre perturbation ($\beta \sim U[0.8, 1.2]$) to the raw waveform, extracts hidden states from layers 11, 14, and 16 of a frozen Wav2Vec2.0 encoder, computes adjacent-frame cosine similarities, and merges frames exceeding similarity threshold $\tau$. A local-window transformer refinement module smooths transitions before mapping features through a 12-block ConvNeXt semantic encoder quantized with an 8192-size codebook.

The fusion prenet injects the flattened global speaker embedding into the semantic features via adaptive layer normalization. Because aggregation alters the timeline, the adaptive frame deaggregation module maps segment latents back to the original 50 Hz frame timestamps. A lightweight non-causal bottleneck transformer then refines local transitions to eliminate boundary discontinuities. Finally, a progressive transposed-convolution upsampling decoder (stride factors [8, 5, 4, 2], total factor 320) reconstructs the 16 kHz time-domain waveform.

The system is trained using a joint objective combining multi-scale mel-spectrogram loss ($L_{\text{mel}}=15$), feature distillation loss ($L_{\text{featdistill}}=1.0$), semantic quantization loss ($L_{\text{vq}}=1.0$), speaker $L_1$ embedding loss ($L_{\text{spk}}$), and adversarial losses (multi-scale STFT and multi-period discriminators with $\lambda_{\text{adv}}=2.0, \lambda_{\text{fm}}=1.0$). Training runs for 300 epochs on 8 H800 GPUs with batch size 36 on 1,000 hours of LibriSpeech.

## Experimental setup

Evaluated on the 16 kHz LibriSpeech corpus (1,000 hours of training data, test-clean evaluation set) and VCTK for cross-dataset voice conversion. Baselines include FACodec, FlexiCodec, DAC, TiCodec, SpeechTokenizer, WavTokenizer, Single-Codec, LsCodec, and BiCodec. Metrics include WER, STOI, PESQ, UTMOS, speaker embedding cosine similarity (SECS), and F0-PCC. Trained on 8 H800 GPUs using AdamW optimizer ($\beta_1=0.8, \beta_2=0.9$).

## Results

At a total bitrate of 0.70 kbps (50 Hz FFR), DySTCodec achieves a WER of 6.09, STOI of 0.92, PESQ of 2.51, UTMOS of 4.13, and SECS of 0.85, outperforming BiCodec (WER 6.59, SECS 0.80) at the identical bitrate. When utilizing dynamic frame rate (DFR) with $\tau=0.90$, the bitrate is compressed further to 0.57 kbps (average 40 Hz) while maintaining competitive performance (WER 6.12, STOI 0.90, PESQ 2.48, SECS 0.85). Rate-matched ablations at 40 Hz show DFR substantially outperforming static downsampling (FFR 40 Hz), which suffers a drop in STOI (0.90 vs 0.71) and SECS (0.85 vs 0.77).

In cross-dataset voice conversion from LibriSpeech to VCTK at 0.70 kbps, DySTCodec achieves a WER of 6.82, SECS of 0.75, and F0-PCC of 0.72, showing strong speaker transfer compared to BiCodec (SECS 0.46). Ablations confirm that removing timbre perturbation severely hurts SECS (0.85 drops to 0.74) and STOI (0.90 drops to 0.70), and removing the lightweight refinement transformer degrades all reconstruction metrics.

| Systems / Conditions | Bitrate | WER (%) ↓ | STOI ↑ | PESQ ↑ | SECS ↑ |
|---|---|---|---|---|---|
| BiCodec | 0.7 kbps | 6.59 | 0.91 | 2.49 | 0.80 |
| DySTCodec (FFR) | 0.7 kbps | 6.09 | 0.92 | 2.51 | 0.85 |
| DySTCodec (DFR) | 0.57 kbps | 6.12 | 0.90 | 2.48 | 0.85 |
| DySTCodec 40 Hz (FFR) | ~0.57 kbps | 6.84 | 0.71 | 2.16 | 0.77 |
| DySTCodec 25 Hz (DFR) | ~0.40 kbps | 7.23 | 0.54 | 1.96 | 0.67 |

## Limitations

Evaluated primarily on English speech via LibriSpeech and VCTK, leaving multilingual generalization untested. Aggressive frame compression (e.g., merging threshold yielding 25 Hz) incurs noticeable degradation in intelligibility (WER 7.23) and speaker similarity (SECS 0.67). The model relies on a frozen Wav2Vec2.0 encoder, binding its feature space to pretrained SSL representations.

## Why read this

Speech and ML engineers building low-bitrate speech language models should read this to learn how similarity-based dynamic frame aggregation and global speaker tokenization bypass multi-stream RVQ bottlenecks while avoiding feature entanglement.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-bitrate speech compression, generative speech language modeling, and cross-dataset voice conversion.

## Institutions / 機構

Zhejiang University, StepFun

## Related

- [An Ultra-Low-Bitrate Neural Speech Codec with Plain-to-Pseudo Synergistic Vector Quantization](jiang26h_interspeech.md) — same problem · relatedness 3.0/3
- [VoCodec: A Low-bitrate Streamable Neural Speech Codec with Voicing-driven Quantization](jiang26b_interspeech.md) — same problem · relatedness 2.9/3
- [SDP-Codec: A Speaker-Decoupled Speech Codec with Pitch Injection for Low-Bitrate Coding and Zero-Shot Voice Conversion](kim26v_interspeech.md) — same problem · relatedness 2.9/3
- [ContextCodec: Content-Focused Context Guidance for Ultra-Low Bitrate Speech Coding](liang26d_interspeech.md) — same problem · relatedness 2.9/3
- [Low-Framerate Speech Tokenization via Two-Stage Latent Patch Modeling](lemerle26_interspeech.md) — same problem · relatedness 2.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
