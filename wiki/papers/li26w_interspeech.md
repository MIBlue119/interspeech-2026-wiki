---
id: li26w_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1340
pdf: https://www.isca-archive.org/interspeech_2026/li26w_interspeech.pdf
---

# Zero-VC: Zero-Lookahead Streaming Voice Conversion via Speaker Anonymization

[PDF](https://www.isca-archive.org/interspeech_2026/li26w_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26w_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1340)

**TL;DR** — Zero-VC introduces a zero-lookahead streaming voice conversion framework leveraging speaker anonymization to resolve the trade-off between timbre leakage and utility preservation, achieving a theoretical minimum algorithmic latency of 20 ms.

## Problem

Streaming zero-shot voice conversion struggles to disentangle source timbre from linguistic content without inflating latency. Information bottleneck methods discard prosody, forcing models to inject features like fundamental frequency through temporal buffering that creates algorithmic lookahead latency. Conversely, existing perturbation methods fail to optimize the critical balance between timbre leakage and utility preservation.

## Method

The model utilizes an off-the-shelf speaker anonymization module to perturb the source speech, mapping it to a pseudo-speaker space while preserving temporal alignment and prosody. An anonymized audio stream is passed to a distilled streaming w2v-bert-2.0 encoder to extract content features at a 20 ms frame shift. A WavLM-large model extracts reference speaker embeddings via an attention-based learnable pooling layer, which are injected into a HiFi-GAN-based streaming decoder using a three-layer Conv1D conditioning scheme with causal convolutions. During training, the system uses Multi-Scale and Multi-Period Discriminators optimized with Mel-spectrogram, feature matching, and adversarial losses.

## Results

Evaluated on the English subset of seed-tts-eval (derived from Common Voice), Zero-VC achieves a source speaker similarity (SS-S) of 0.171 and a reference similarity (SS-R) of 0.521, outperforming baseline models like LSCodec and CosyVoice. Ablation studies confirm that SA perturbation reduces source similarity leakage to 0.119 while maintaining a prosody Pearson coefficient of 0.671. Lookahead context experiments show that performance metrics for the SA-trained model saturate immediately at 0 to 20 ms with less than 3% relative improvement from future context, compared to 12% to 15% improvements required by non-SA models.

## Code

- https://github.com/microsoft/unilm

## Applications

Real-time communication platforms, interactive voice response systems, and live streaming applications requiring secure or altered voice identities with ultra-low latency.

## Limitations

The intermediate word error rate for speaker anonymized audio is elevated compared to raw inputs, though downstream training successfully recovers acceptable intelligibility.

## Related

- (link related pages by id as the wiki grows)
