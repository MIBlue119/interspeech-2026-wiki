---
id: lemerle26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2863
pdf: https://www.isca-archive.org/interspeech_2026/lemerle26_interspeech.pdf
---

# Low-Framerate Speech Tokenization via Two-Stage Latent Patch Modeling

[PDF](https://www.isca-archive.org/interspeech_2026/lemerle26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lemerle26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2863)

**TL;DR** — Z-Codec is a two-stage speech tokenizer that achieves state-of-the-art low-framerate (12.5 Hz) speech compression and high-fidelity reconstruction while remaining fully reproducible on consumer-grade hardware (single RTX 4070 GPU).

## Problem

Neural speech tokenizers typically require complex joint optimization of adversarial waveform reconstruction, compression, and semantic supervision, making training computationally prohibitive. Simultaneously, reducing frame rates through large vector quantization codebooks or residual quantization introduces codebook collapse and complicated downstream decoding schedules. These bottlenecks restrict reproducible research and efficient scaling of large text-to-speech (TTS) systems on standard consumer hardware.

## Method

The method uses a decoupled two-stage architecture: the first stage (WavVAE) trains a VAE-GAN with ConvNeXt decoders on raw waveforms to produce high-framerate (100 Hz) continuous latents, absorbing adversarial training complexity. The second stage (PatchAE) groups these latents into patches of 8 and compresses them to 12.5 Hz using either a continuous VAE or discrete Finite Scalar Quantization (FSQ) via flow matching. Semantic supervision is incorporated at the second-stage velocity head by maximizing cosine similarity against WavLM-large layer 6 features. The downstream TTS backbone employs a T5-style encoder-decoder transformer with a 3-layer MLP velocity prediction head operating on the continuous PatchVAE latents.

## Results

Evaluated on LibriTTS test-clean and HiFiTTS-2, Z-Codec achieves competitive objective and subjective reconstruction performance against strong baselines like Mimi, Higgs, and Semanticodec, while operating at 1.1 kbps (FSQ) or continuous settings at 12.5 Hz. MUSHRA evaluation places Z-Codec (both VAE and FSQ variants) on par with production-grade tokenizers like Higgs. An ablation removing WavLM semantic supervision causes dCER to more than double (from 0.59% to 1.49% for FSQ), confirming the critical role of distillation. Downstream TTS evaluation yields a character error rate of 1.1% and competitive naturalness (NMOS 4.13) compared to larger baseline models.

## Code

- https://github.com/theodorblackbird/z-codec

## Applications

Speech and ML engineers building scalable, high-quality text-to-speech (TTS) systems and low-bitrate neural audio codecs.

## Limitations

The architecture uses non-causal convolution and attention layers, restricting its applicability in streaming or low-latency scenarios, and experiments are currently limited to English speech.

## Related

- (link related pages by id as the wiki grows)
