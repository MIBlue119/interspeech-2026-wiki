---
id: wang26y_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1490
pdf: https://www.isca-archive.org/interspeech_2026/wang26y_interspeech.pdf
---

# AugCodec: A Low-Bitrate Disentangled Neural Speech Codec via Data Augmentation

[PDF](https://www.isca-archive.org/interspeech_2026/wang26y_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26y_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1490)

**TL;DR** — AugCodec is a low-bitrate disentangled neural speech codec operating at a 12.5Hz semantic frame rate that decomposes speech into semantic, speaker, and prosody tokens via data augmentation, achieving a WER of 5.12 and PESQ of 1.99 on LibriSpeech test-clean.

## Problem

Standard neural speech codecs compress audio into monolithic tokens or rely on residual vector quantization requiring high frame rates, struggling to separate acoustic dimensions cleanly. Previous disentangled codecs extract all attributes from the same source, leading to cross-feature interference, poor low-bitrate semantic retention, and high word error rates during voice conversion tasks. AugCodec addresses this gap by utilizing tailored data augmentation across separate input variants to isolate semantic, speaker, and prosody streams prior to quantization.

## Method

AugCodec uses three separate encoder streams: a semantic stream taking wav2vec 2.0 features from diffusion-based voice-converted speech via ConvNeXt blocks and a 4x temporal compression/expansion scheme; an ECAPA-TDNN speaker encoder using an utterance from the same speaker; and an ECAPA-TDNN prosody encoder using low-frequency STFT components below 500Hz with a 160ms hop length. Semantic features use vector quantization, while speaker and prosody features use Finite Scalar Quantization (FSQ). The streams are fused via element-wise multiplication of semantic and prosody features followed by FiLM-based adaptive layer normalization conditioned on the global speaker token, and passed to a ConvNeXt/DAC-style decoder with Snake activations. Training utilizes multi-scale mel/STFT L1 reconstruction losses, adversarial losses, quantization losses, and an augmentation loss minimizing L1 distance between source and voice-converted semantic embeddings. Models are trained on ~3000 hours of LibriLight-medium and LibriTTS at 16kHz for 750k steps.

## Results

Evaluated on 1237 samples from LibriSpeech test-clean (4s-10s splits), AugCodec variants achieve WER between 5.12 and 5.71, PESQ between 1.94 and 1.99, and speaker similarity of 0.90, outperforming baseline models like BiCodec (WER 60.15 at 12.5Hz) and Mimi at comparable bitrates. In voice conversion tasks, AugCodec achieves a low WER of 5.87 at 12.5Hz compared to 65.43 for retrained BiCodec. An ablation study demonstrates that removing the augmentation loss causes a sharp degradation in WER (from 5.12 to 17.11) and PESQ (1.99 to 1.67).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building foundational speech language models, text-to-speech systems, and speech-to-speech translation pipelines requiring low-bitrate, highly disentangled representations.

## Related

- (link related pages by id as the wiki grows)
