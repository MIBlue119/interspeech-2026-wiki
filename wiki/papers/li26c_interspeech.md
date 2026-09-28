---
id: li26c_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-301
pdf: https://www.isca-archive.org/interspeech_2026/li26c_interspeech.pdf
---

# MSR-Codec: A Low-Bitrate Multi-Stream Residual Codec for High-Fidelity Speech Generation with Information Disentanglement

[PDF](https://www.isca-archive.org/interspeech_2026/li26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-301)

**TL;DR** — MSR-Codec factorizes speech into four disentangled streams—semantic, timbre, prosody, and residual—achieving high-fidelity reconstruction at a low bitrate of 424-612 bps and superior downstream TTS performance.

## Problem

Neural audio codecs compress speech into discrete tokens but often require high bitrates exceeding 6 kbps, complicating downstream language model generation and transmission. While prior disentanglement methods rely on complex adversarial training, this paper introduces a stable cascaded architecture to achieve efficient, independent manipulation of speech attributes without heavy training overhead.

## Method

The architecture encodes Mel-spectrograms into four distinct streams: time-invariant speaker timbre via a frozen CAM++ network, 25Hz semantic tokens via a frozen Hubert model, 12.5Hz prosody captured in the residual domain with an auxiliary F0/energy predictor, and a 25Hz fine-grained residual stream. These streams are progressively fused in a cascaded decoder using residual connections and cross-attention, followed by a pre-trained FreGAN vocoder. For text-to-speech, a lightweight two-stage autoregressive transformer architecture predicts semantic tokens first at 12.5Hz, followed by an acoustic decoder predicting prosody and residual tokens.

## Results

Evaluated on LibriSpeech, MLS, Wenetspeech, and VCTK datasets, the codecs achieve competitive reconstruction (UTMOS around 4.13-4.15). In zero-shot TTS on the Seed-TTS English test set, a 0.2B parameter model trained on 45 hours of data achieves a lower WER of 3.07 and higher speaker similarity (0.613) than larger models like FireRedTTS (3.82 WER) and CosyVoice2, while running faster with an RTF of 0.67. Voice conversion experiments demonstrate successful factor separation, yielding higher target speaker similarity and accurate prosody transfer compared to baseline systems.

## Code

- https://github.com/herbertLJY/MSRCodec

## Applications

Speech and ML engineers building high-efficiency text-to-speech, voice conversion, and low-latency speech generation systems.

## Limitations

Signal-level metrics like STOI and PESQ are relatively lower at extreme low bitrates compared to higher-bandwidth baseline codecs.

## Related

- (link related pages by id as the wiki grows)
