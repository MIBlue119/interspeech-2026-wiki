---
id: choi26d_interspeech
category: tts
labels: [generative-model]
institutions: ["KAIST", "Chung-Ang University", "Chinese University of Hong Kong"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2146
pdf: https://www.isca-archive.org/interspeech_2026/choi26d_interspeech.pdf
---

# ProsoCodec: Prosody-Oriented Speech Codec for Voice Conversion

*Jeongsoo Choi, Ji-Hoon Kim, Shujie Hu, Joon Son Chung*

[PDF](https://www.isca-archive.org/interspeech_2026/choi26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/choi26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2146)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — ProsoCodec is a prosody-oriented neural speech codec that models prosody as a conditional residual using text and speaker prefix conditioning, achieving state-of-the-art zero-shot voice conversion with a Word Error Rate of 4.45% and a source timbre leakage score (SIMs) of 0.167.

## Key contributions

- Proposes ProsoCodec, a generative speech codec that models residual prosody by conditioning both encoder and decoder on explicit text and speaker priors, bypassing complex adversarial disentanglement.
- Introduces a dual-utterance training strategy using paired same-speaker utterances to decouple utterance-level prosody from global timbre and prevent prompt-style leakage.
- Applies a low-frequency mel-band input restriction to bias the discrete codec bottleneck toward prosodic variation instead of fine-grained spectral details.
- Demonstrates superior zero-shot voice conversion performance across objective and subjective metrics compared to established baselines like Vevo, Seed-VC, and FACodec.

## Problem

Traditional neural speech codecs learn holistic representations that entangle linguistic content, speaker identity, and prosody, making them effective for zero-shot voice cloning but poor for voice conversion where source prosody must be strictly preserved. Prior approaches attempt to decompose speech or use restrictive bottlenecks and adversarial objectives, but prosody inherently depends on content and speaker context, meaning fully speaker-independent prosody representations destroy expressive nuance. Enforcing holistic imitation via prompt-based decoders also causes prompt-style leakage, overriding the target source prosody. This paper tackles these limitations to enable fine-grained prosodic control without sacrificing naturalness or target timbre adaptation.

## Method

ProsoCodec combines an 8-layer Transformer encoder, a binary spherical quantizer (BSQ), and a 16-layer Diffusion Transformer (DiT) decoder, initialized from TaDiCodec with 1024 hidden dimensions, 4096 intermediate size, and 16 attention heads. Explicit priors are injected as prefix tokens by processing ASR transcripts through an MLP-based text encoder and extracting speaker embeddings via a pretrained speaker verification model (CAM++), concatenating them with input features as [e_spk; e_txt; e_mel].

To capture residual prosody, the continuous encoder representation undergoes linear interpolation and binary spherical quantization (BSQ) into an implicit binary codebook of size 4,096 at 12.5 Hz frame rate (150 bps bitrate). The input mel-spectrogram is restricted to its low-frequency band for the encoder to bias tokens toward prosody, while the decoder utilizes full-band mels with random span masking and flow-matching loss to handle conditional generation.

During training, a dual-utterance strategy alternates random span masking with paired same-speaker utterances (one as source, one as prompt) to break prompt-style copying. At inference, source speech tokens and transcript are fed alongside a reference prompt to generate the converted waveform via 32 Euler ODE steps and a Vocos vocoder.

## Experimental setup

Trained on the LibriTTS dataset (585 hours of 24 kHz read speech, 2,456 speakers). Evaluated on LibriTTS test-clean, test-other, and VCTK splits using 1,000 randomly sampled 2-8 second utterances. Baselines include DDDM-VC, UniAudio, HierSpeech++, FACodec, Seed-VC, and Vevo. Metrics include WER (evaluated via Whisper-large-v3), SIMr (reference speaker similarity via WavLM-Large), SIMs (source timbre leakage), P-MOS, S-MOS, UTMOS, N-MOS, and log-scaled F0 RMSE. Models are trained for 150k updates with AdamW (learning rate 2e-5, global batch size of 160 seconds).

## Results

ProsoCodec achieves a headline WER of 4.451%, outperforming Seed-VC (5.078%) and Vevo (4.826%), while scoring the best target speaker similarity (SIMr of 0.565) and lowest source timbre leakage (SIMs of 0.167). Ablation studies show that removing the low-frequency mel input degrades acoustic focus, while removing dual-utterance training raises F0 RMSE from 0.376 to 0.421, confirming worse prosody preservation. Removing text conditioning causes a catastrophic failure with WER exploding to 86.601%.

| System / Condition | WER ↓ | SIMr ↑ | SIMs ↓ | RMSE (F0) ↓ | P-MOS ↑ |
|---|---|---|---|---|---|
| Source Speech | 3.668 | 0.090 | 1.000 | 0.000 | - |
| FACodec | 5.454 | 0.354 | 0.347 | 0.455 | 3.364 |
| Seed-VC | 5.078 | 0.531 | 0.239 | 0.473 | 3.463 |
| Vevo | 4.826 | 0.478 | 0.243 | 0.464 | 3.506 |
| ProsoCodec (Ours) | 4.451 | 0.565 | 0.167 | 0.428 | 3.852 |

## Limitations

The approach relies heavily on the accuracy of external pretrained ASR and speaker verification models to supply robust text and speaker priors. Evaluation is restricted to clean read speech corpora (LibriTTS and VCTK), leaving robustness to noisy or conversational speech unverified. The framework requires paired same-speaker training data or careful dual-utterance construction strategies.

## Why read this

Researchers and engineers building zero-shot voice conversion or expressive speech generation systems should read this to learn how explicit conditioning and low-frequency spectral restriction can force a standard neural codec bottleneck to capture residual prosody without adversarial losses.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Zero-shot voice conversion, expressive text-to-speech, and spoken dialogue systems requiring precise prosody transfer across diverse speakers.

## Institutions / 機構

KAIST, Chung-Ang University, Chinese University of Hong Kong

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation

## Related

- [SDP-Codec: A Speaker-Decoupled Speech Codec with Pitch Injection for Low-Bitrate Coding and Zero-Shot Voice Conversion](kim26v_interspeech.md) — same problem · relatedness 2.9/3
- [CFLOW-VC: An unsupervised cycle training strategy based on normalizing flows for Voice Conversion](song26_interspeech.md) — same problem · relatedness 2.9/3
- [MeanVC 2: Robust Low-Latency Streaming Zero-Shot Voice Conversion](ma26c_interspeech.md) — same problem · relatedness 2.9/3
- [SSL-GMMVC: Interpretable Voice Conversion via Locally Linear GMM Transforms in Self-Supervised Representation Space](tanabu26_interspeech.md) — same problem · relatedness 2.8/3
- [From A to B to A: Palindromic Zero-Shot Voice Conversion with Non-Parallel Data](mandel26_interspeech.md) — same problem · relatedness 2.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
