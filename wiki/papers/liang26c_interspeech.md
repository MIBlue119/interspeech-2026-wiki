---
id: liang26c_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1135
---

# Text-Independent Speaker Verification Using Discrete Audio Tokens

**TL;DR** — Speaker identity is already hidden inside neural-codec discrete tokens; a cross-feature distillation trick that mimics a strong Fbank-based teacher's embedding space unlocks it for codec-based speaker verification.

## Problem

Neural audio codecs (NACs) compress audio efficiently and work well for speech synthesis, but their discrete tokens consistently underperform traditional spectral features in automatic speaker verification (ASV).

## Method

The authors show speaker cues are implicitly preserved in discrete codec tokens but underused by conventional ASV training, then propose Cross-Feature Knowledge Distillation (CFKD), which guides a codec-based student model to mimic the embedding space of a strong Fbank-based teacher, providing structured supervision for using speaker information already present in the tokens.

## Results

On VoxCeleb benchmarks, CFKD substantially improves ASV performance of codec-based systems, letting them approach the accuracy of Fbank-based teacher models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speaker verification pipelines built directly on discrete audio-codec tokens, useful for systems that already tokenize audio for LLM-based speech processing.

## Related

- (link related pages by id as the wiki grows)
