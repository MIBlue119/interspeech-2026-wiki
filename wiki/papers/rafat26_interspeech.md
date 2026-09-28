---
id: rafat26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3334
---

# Dynamic Block-Online Streaming ASR for Low-Resource Agglutinative Code-Switching Speech with Morphology-Aware Evaluation

**TL;DR** — A dynamic block-online streaming ASR framework, combined with loanword-augmented training and a morphology-aware error metric, substantially improves low-latency recognition of intra-sentential Bangla-English code-switched speech.

## Problem

Low-resource, agglutinative languages challenge low-latency ASR because fixed lookahead windows fail when grapheme order diverges, suffixes cross code-switch boundaries, or code-switching training data is imbalanced, and this problem was previously unstudied for Bangla-English streaming ASR.

## Method

The authors introduce a Dynamic Block-Online framework with VAD-aligned inference that balances semantics, latency, and context via global bidirectional attention to preserve morphological integrity, plus Script-Anchored Loanword Injection to augment training text with English loanwords and model phonotactic transitions, and a new CS-WER metric that separates switch, root, and suffix errors.

## Results

The flexible-latency approach improves recognition of agglutinative, mixed-language speech, with the framework successfully transferring to a menstrual-health medical domain as well.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Streaming voice interfaces and transcription for Bangla-English and other agglutinative code-switching speech communities, including domain-specific applications like health chatbots.

## Related

- (link related pages by id as the wiki grows)
