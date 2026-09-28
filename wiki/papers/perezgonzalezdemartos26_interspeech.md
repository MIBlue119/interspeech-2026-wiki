---
id: perezgonzalezdemartos26_interspeech
category: speech-translation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1407
pdf: https://www.isca-archive.org/interspeech_2026/perezgonzalezdemartos26_interspeech.pdf
---

# Not Quite My Tempo: Voice Activity-aware Speech Synthesis for Lip-Synchronous Dubbing

[PDF](https://www.isca-archive.org/interspeech_2026/perezgonzalezdemartos26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/perezgonzalezdemartos26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1407)

**TL;DR** — This paper proposes a voice activity-conditioned text-to-speech framework for lip-synchronous dubbing that matches source temporal patterns with high accuracy while maintaining natural prosody.

## Problem

Automatic dubbing requires target speech to precisely match the temporal pause and speech patterns of a source video clip to ensure audio-visual coherence. Traditional methods rely on complex video-based lip-movement encoders that are brittle in out-of-domain scenarios like cartoons or multi-speaker scenes, and standard text-to-speech models fail to align pause structures across different languages without explicit temporal constraints.

## Method

The architecture builds on F5-TTS, replacing filler-token upsampling with average upsampling and using explicit speaker encoders (FACodec and ERes2NetV2) alongside Global Style Tokens for timbre and style transfer. A pretrained SoundStream vocoder maps waveforms to scalar-quantized latents, while frame-level binary voice activity masks—extracted via Silero VAD—are embedded and added to the encoder representations to condition an 18-layer Diffusion Transformer decoder trained with optimal-transport Conditional Flow Matching. During training, voice activity conditioning is randomly masked with a 20% drop probability for classifier-free guidance, making the feature entirely optional at inference time.

## Results

Evaluated on a 291-sample multilingual TEDx test set covering Greek, French, Portuguese, and Russian, the VAD-conditioned model achieves an average frame-level VAD alignment accuracy of ~91.5% to ~96.2% (compared to ~71% to ~72% for unconditioned models operating at chance level). Subjective evaluation via Mean Opinion Scores (MOS) from 40 participants shows no statistically significant degradation in pause placement (3.73 vs 3.82) or overall prosody naturalness (3.68 vs 3.81) when VAD conditioning is enabled.

## Code

- https://alexdemartos.github.io/NQMT_IS26

## Applications

Engineers and media localization professionals building automated video dubbing pipelines, post-editing suites, and cross-lingual speech synthesis systems.

## Limitations

Slightly lower VAD alignment accuracy is observed in multilingual settings due to non-speech acoustic events like laughter, hesitations, and varied voice modes.

## Related

- (link related pages by id as the wiki grows)
