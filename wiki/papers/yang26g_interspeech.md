---
id: yang26g_interspeech
category: multilingual
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1224
---

# Pitch-Injected Residual Adapter for Tonal Language in Neural Audio Codec

**TL;DR** — A tiny plug-in adapter injects explicit pitch information into a frozen neural audio codec, cutting tone errors by 35.7% for tonal languages while adding under half a kilobit-per-second of overhead.

## Problem

Neural Audio Codecs reconstruct audio at low bitrates with high fidelity but are insensitive to fundamental-frequency (F0) distortion — a critical flaw for tonal languages (over 40% of the world's languages), where F0 contour carries lexical meaning.

## Method

The authors propose the Pitch-Injected Residual Adapter (PIRA), a lightweight plug-and-play module that restores tonal information in frozen codecs by explicitly injecting quantized F0 and voiced/unvoiced side-information through dilated convolutions (to capture tone sandhi dependencies), supervised by a CREPE embedding loss and gated per-frame by a confidence network that suppresses injection for checked tones and unvoiced segments.

## Results

With only 1.25M-1.65M trainable parameters, PIRA reduces codec-induced Tone Error Rate by 35.7% on average across five codecs and three tonal languages, while preserving English quality and adding no more than 0.4 kbps overhead.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Retrofitting existing neural audio codecs to properly handle tonal languages (e.g. Mandarin, Vietnamese, Thai) in speech coding and LLM-based speech pipelines.

## Related

- (link related pages by id as the wiki grows)
