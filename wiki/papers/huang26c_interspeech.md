---
id: huang26c_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-944
---

# Rethinking Entropy Minimization in Test-Time Adaptation for Autoregressive Models

**TL;DR** — A rigorous, unified derivation of entropy minimization for autoregressive test-time adaptation decomposes into a token-level policy-gradient loss plus a token-level entropy loss, improving Whisper ASR across 20+ domains.

## Problem

Entropy-minimization test-time adaptation works well for classifiers, but its application to generative autoregressive models has relied on separate heuristics — like teacher forcing with pseudo-labels or policy-gradient RL — without a unified mathematical foundation.

## Method

The authors derive a rigorous formulation of entropy minimization tailored specifically to autoregressive models, showing the exact objective decomposes into a token-level policy-gradient loss and a token-level entropy loss, and reinterpret prior heuristic methods as partial realizations of this unified formulation.

## Results

Using Whisper ASR as a testbed, the unified entropy-minimization approach consistently improves performance across more than 20 diverse domains, including acoustic noise, accents, and multilingual settings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Test-time domain adaptation for deployed ASR systems facing distribution shift (noise, accent, language) without needing labeled target-domain data.

## Related

- (link related pages by id as the wiki grows)
