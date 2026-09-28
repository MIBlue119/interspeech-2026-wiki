---
id: chen26i_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1064
---

# G2PO: A Lightweight Lexicon-enhanced Framework for Open-Vocabulary Mandarin Polyphone Disambiguation

**TL;DR** — A tiny BERT-based model fused with a dictionary lookup that disambiguates Mandarin polyphone pronunciations for TTS at a fraction of the size of prior BERT-based approaches, while also handling words never seen in training.

## Problem

Chinese TTS needs accurate polyphone disambiguation, but strong BERT-based classifiers are too large for on-device deployment and cannot predict pronunciations for words absent from their training set.

## Method

g2pO pairs a tiny BERT encoder with a lexicon adapter that injects external dictionary knowledge into the hidden states, building word representations on the fly via mix-pooling instead of relying on large pretrained word embeddings.

## Results

With only 3.99M parameters — 27x smaller than prior BERT-based methods — g2pO reaches 99.15% accuracy on the CPP dataset and 70.79% zero-shot accuracy on pronunciations unseen during training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device Chinese TTS front-ends and other resource-constrained text-normalization pipelines that need open-vocabulary polyphone handling.

## Related

- (link related pages by id as the wiki grows)
