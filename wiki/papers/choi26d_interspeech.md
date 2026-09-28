---
id: choi26d_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2146
---

# ProsoCodec: Prosody-Oriented Speech Codec for Voice Conversion

**TL;DR** — ProsoCodec models prosody as a conditional residual, rather than a fully disentangled stream, letting a speech codec preserve and transfer prosody more faithfully for voice conversion while reducing source-timbre leakage.

## Problem

Neural speech codecs typically learn holistic representations that intertwine content, speaker identity, and prosody, which works for zero-shot cloning but hurts tasks like voice conversion that need explicit prosody preservation or transfer.

## Method

ProsoCodec conditions both the encoder and decoder on text and speaker embeddings as prefix tokens so the discrete bottleneck is pushed to capture prosodic variation not explained by content or speaker, further using the low-frequency mel band and training on paired same-speaker utterances.

## Results

Experiments on voice conversion show improved prosody preservation and reduced source-timbre leakage compared to prior codec designs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Useful for voice conversion and expressive dubbing systems that need to transfer or retain prosodic style independent of speaker timbre.

## Related

- (link related pages by id as the wiki grows)
