---
id: wang26y_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1490
---

# AugCodec: A Low-Bitrate Disentangled Neural Speech Codec via Data Augmentation

**TL;DR** — AugCodec uses tailored data augmentation (rather than architectural disentanglement alone) to decompose speech into separate semantic, speaker, and prosody token streams at just 12.5Hz, outperforming state-of-the-art codecs in both reconstruction quality and disentanglement on LibriSpeech.

## Problem

Neural speech codecs efficiently compress speech but are usually learned as holistic representations that intertwine linguistic content, speaker identity, and prosody, limiting downstream disentangled use.

## Method

AugCodec uses tailored augmentation strategies to transform speech into distinct variants, each used to extract tokens preserving a target attribute (semantic, speaker, or prosody) while suppressing others, plus an augmentation loss aligning semantic encoder outputs between source and voice-converted speech to encourage speaker-agnostic embeddings and mitigate voice-conversion-induced acoustic mismatch.

## Results

On LibriSpeech test-clean, AugCodec significantly outperforms state-of-the-art methods in both reconstruction quality and disentanglement, operating at only 12.5Hz with three token streams.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Enables downstream speech generation systems (TTS, voice conversion) to independently control content, speaker identity, and prosody using a compact, low-bitrate disentangled codec.

## Related

- (link related pages by id as the wiki grows)
