---
id: heo26b_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2354
---

# Tracing the Origins: Legacy Codec Identification in Neural Audio Transcoding

**TL;DR** — A transformer-based forensic method that can still identify the original legacy compression codec of audio even after it has been re-encoded through a modern neural audio codec.

## Problem

Neural audio codecs based on residual vector quantization compress audio non-linearly, which disrupts traditional audio-forensic techniques that rely on detecting traces of legacy compression.

## Method

The authors model the hierarchical and temporal dependencies within RVQ token sequences using a Transformer, capturing inter-layer causal relationships and dynamic forensic significance to disentangle superimposed legacy and neural transcoding artifacts.

## Results

The method achieves over 97% accuracy identifying the legacy codec and robust joint identification performance across a 32-128 kbps bitrate range, showing legacy codec traces survive neural transcoding.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio forensics and provenance verification for content authenticated or distributed through modern low-bitrate neural audio codecs.

## Related

- (link related pages by id as the wiki grows)
