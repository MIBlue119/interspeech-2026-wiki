---
id: lanzendoerfer26b_interspeech
category: source-separation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2864
---

# Speaker Separation via Audio Language Modeling

**TL;DR** — LlaSep separates mixed speech into per-speaker streams by generating discrete audio codec tokens autoregressively with a causal language model, showing that token-level LM decoding is a viable alternative to continuous-spectrogram separation.

## Problem

Existing speaker-separation methods rely on continuous spectral representations and task-specific architectural components, and it is unclear whether purely discrete, token-based generative modeling can compete.

## Method

LlaSep uses a causal language model to generate per-speaker codec token streams in a single decoding pass, conditioned on the tokenized mixture and semantic features from a pretrained speech encoder, and is trained via supervised fine-tuning on ground-truth speaker tokens from a large synthetic multilingual conversation dataset (seven languages, 15k hours).

## Results

On LibriCSS and CallHome, LlaSep achieves competitive separation and diarization performance and substantially higher audio quality than previous baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multi-speaker speech processing pipelines (meeting transcription, call-center analytics) that could benefit from a unified token-based generative separation approach instead of specialized continuous-domain separators.

## Related

- (link related pages by id as the wiki grows)
