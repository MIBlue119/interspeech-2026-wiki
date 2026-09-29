---
id: liu26c_interspeech
category: tts
labels: [self-supervised, streaming-real-time, generative-model]
institutions: ["UC Berkeley"]
code: https://berkeley-speech-group.github.io/StyleStream
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-404
pdf: https://www.isca-archive.org/interspeech_2026/liu26c_interspeech.pdf
---

# StyleStream: Real-Time Zero-Shot Voice Style Conversion

*Yisi Liu, Nicholas Lee, Gopala Anumanchipalli*

[PDF](https://www.isca-archive.org/interspeech_2026/liu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-404)

**Category:** `tts` · **Labels:** `self-supervised`, `streaming-real-time`, `generative-model`

**TL;DR** — StyleStream is the first streamable zero-shot speech-to-speech voice style conversion system that jointly transfers timbre, accent, and emotion with an end-to-end latency of ~1.01 seconds. It achieves state-of-the-art objective and subjective conversion quality, significantly outperforming prior baselines like Vevo and CosyVoice 2.

## Key contributions

- Introduces the first streamable zero-shot voice style conversion system capable of holistic style transfer (timbre, accent, and emotion) with an end-to-end latency of 1,012.7 ms.
- Proposes a Destylizer combining sequence-to-sequence ASR loss and an extremely compact FSQ information bottleneck ([5,3,3], 45 codes) to achieve clean content-style disentanglement.
- Demonstrates that utilizing continuous pre-quantization bottleneck features ('soft units') avoids the degradation of linguistic content seen in discrete tokenizers like Vevo.
- Performs extensive evaluations on 3,000 source-target pairs across diverse accents and emotions, outperforming offline and streaming baselines in similarity and intelligibility metrics.

## Problem

Prior zero-shot voice style cloning methods are predominantly text-to-speech (TTS) systems (e.g., modern DiT and autoregressive models) which rely on text for clean content-style separation, making them unusable for direct speech-to-speech conversion. Existing speech-to-speech approaches like Vevo use purely self-supervised VQ-VAE content tokens and autoregressive modeling, leading to a tradeoff between content preservation (high WER) and style fidelity, and lack streaming support. Furthermore, while real-time timbre-only voice conversion exists, real-time voice style conversion involving joint timbre, accent, and emotion has remained unaddressed.

## Method

StyleStream consists of a Destylizer, a Stylizer, and a causal Vocos vocoder. The Destylizer takes frozen HuBERT-Large 18th layer representations, passes them through six conformer blocks, and applies an FSQ bottleneck with levels [5, 3, 3] (a 45-entry codebook) followed by four ALiBi-enabled transformer decoder layers trained via a sequence-to-sequence ASR loss. The continuous representations immediately preceding the FSQ layer are extracted as 50 Hz content features (fc), ensuring robust disentanglement while preventing the intelligibility collapse observed when using discrete FSQ indices directly.

The Stylizer is a Diffusion Transformer (DiT) with 16 layers (768 hidden size, 3072 FFN size) trained with a spectrogram inpainting objective under a conditional flow matching (CFM) loss with an Optimal Transport path formulation. It takes concatenated noisy mel-spectrograms, unmasked context, and content features, and is conditioned on a global style embedding extracted via a WavLM-TDNN style encoder with attentive statistics pooling. The style encoder and DiT are integrated using adaLN-Zero and trained end-to-end.

For streaming inference, chunked-causal attention masks and causal convolutions are applied across the stack. The Destylizer processes speech in 600 ms chunks and uses MSE distillation from a non-streaming teacher, while the streaming Stylizer uses a 600 ms chunk size, a fixed 5s target utterance, and a 5s content ring buffer. Classifier-Free Guidance (CFG strength = 2) and 16 Euler sampling steps are utilized.

## Experimental setup

The Stylizer is trained on 50k hours of Emilia (English portion). The Destylizer is trained on 1,300 hours combining LibriTTS, MSP-Podcast, and GLOBE (LMG dataset). Evaluation uses StyleStream-Test (3,000 pairs from ESD, GLOBE-test, LibriTTS-test-clean sources and ESD, RAVDESS, GLOBE-test, L2-ARCTIC targets across 5 emotions and 5 accents). Baselines include FACodec, CosyVoice 2.0, SeedVC v2, Vevo, and Vevo 1.5. Metrics include Whisper-large-v3 WER, S-SIM, A-SIM, E-SIM, and MOS variants (N-MOS, S-SMOS, A-SMOS, E-SMOS) evaluated via Prolific listeners (400 ratings/model). Trained on 8 NVIDIA RTX A6000 GPUs with AdamW.

## Results

Offline StyleStream achieves a state-of-the-art WER of 9.2% (vs Vevo's 17.5% and CosyVoice 2.0's 9.5%), an S-SIM of 0.852, A-SIM of 0.640, and E-SIM of 0.827. The streaming variant achieves a competitive WER of 15.3%, S-SIM of 0.855, A-SIM of 0.635, and E-SIM of 0.803, outperforming non-streamable Vevo in similarity scores. Subjectively, StyleStream (offline) scores 4.32 S-SMOS, 4.42 A-SMOS, and 4.36 E-SMOS, significantly exceeding Vevo (3.76, 3.49, 3.76). Ablations show that using FSQ discrete indices instead of continuous pre-quantization features triggers a catastrophic WER jump to 123.5%. Enlarging the FSQ codebook to [7,5,5,5,5] (4375 codes) boosts UTMOS to 3.58 but degrades accent and emotion similarity due to style leakage.

| System | WER (%) ↓ | S-SIM ↑ | A-SIM ↑ | E-SIM ↑ | S-SMOS ↑ | A-SMOS ↑ |
|---|---|---|---|---|---|---|
| Ground Truth | 3.8 | — | — | — | — | — |
| FACodec | 15.5 | 0.763 | 0.408 | 0.668 | 2.98 | 2.76 |
| CosyVoice 2.0 | 9.5 | 0.794 | 0.450 | 0.655 | 3.25 | 2.58 |
| Vevo | 17.5 | 0.818 | 0.596 | 0.712 | 3.76 | 3.49 |
| StyleStream (streaming) | 15.3 | 0.855 | 0.635 | 0.803 | 4.29 | 4.37 |
| StyleStream (offline) | 9.2 | 0.852 | 0.640 | 0.827 | 4.36 | 4.42 |

## Limitations

The system cannot provide independent control over individual style attributes (timbre, accent, and emotion are transferred jointly). Performance degrades noticeably when target reference utterances are shortened from 5 seconds to 2 seconds due to insufficient phonetic and prosodic coverage for robust global style estimation. Scaling the Destylizer training data from 1.3k hours to 50k hours yields marginal returns or slight style disentanglement degradation because the ASR-supervised extraction task saturates early. Real-time inference is compute-bound on consumer GPUs (e.g., RTX 4060) where processing time scales linearly with chunk size.

## Why read this

Researchers building real-time speech-to-speech voice conversion or unified voice cloning systems should read this paper to understand how a narrow FSQ information bottleneck combined with continuous ASR-supervised pre-quantization features achieves superior content-style disentanglement compared to discrete VQ tokens.

## Code

- https://berkeley-speech-group.github.io/StyleStream/

## Applications

Real-time dubbing, cross-lingual accent/emotion transfer in live communication, immersive real-time voice changers, and interactive speech-to-speech translation systems.

## Institutions / 機構

UC Berkeley

**Funding / 經費:** IARPA ARTS program, Meta AI, Robert E. & Beverly A. Brooks Endowed Chair in EECS, UC Berkeley

## Related

- [MeanVC 2: Robust Low-Latency Streaming Zero-Shot Voice Conversion](ma26c_interspeech.md) — same problem · relatedness 2.9/3
- [AccentDrift: Real-time Streaming Accent Conversion via Sparse Speech Tokenization](lee26g_interspeech.md) — same problem · relatedness 2.8/3
- [ProsoCodec: Prosody-Oriented Speech Codec for Voice Conversion](choi26d_interspeech.md) — same problem · relatedness 2.7/3
- [VOSSA: Voiceprint Optimization for Streaming Speech Architectures](tseng26c_interspeech.md) — same problem · relatedness 2.7/3
- [Improving Model Expressivity and Speaker Matching in Low-Latency Voice Conversion](bargum26_interspeech.md) — same problem · relatedness 2.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
