---
id: chen26i_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1064
pdf: https://www.isca-archive.org/interspeech_2026/chen26i_interspeech.pdf
---

# G2PO: A Lightweight Lexicon-enhanced Framework for Open-Vocabulary Mandarin Polyphone Disambiguation

[PDF](https://www.isca-archive.org/interspeech_2026/chen26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1064)

**TL;DR** — The g2pO framework is a lightweight, open-vocabulary Mandarin polyphone disambiguation model with 3.99M parameters that achieves 99.15% accuracy on the CPP test set and 70.79% zero-shot accuracy on unseen pronunciations.

## Problem

Mandarin text-to-speech requires precise grapheme-to-phoneme conversion, but existing polyphone disambiguation models rely on large pre-trained language models exceeding 100M parameters, demand gigabytes of storage for dense word embeddings, and fail as closed-set classifiers to predict unseen pronunciations. These drawbacks heavily hinder efficient on-device deployment and robust generalization in real-world voice assistants.

## Method

The model utilizes a tiny RoBERTa encoder (3.2M parameters) paired with a dynamic lexicon fusion module that constructs word representations on-the-fly via mix-pooling over hidden states, avoiding heavy pre-trained word embeddings and requiring only 3MB of storage for a 100K-entry dictionary. An auxiliary part-of-speech (POS) prediction module with 10 collapsed categories provides syntactic guidance via joint cross-entropy optimization. Finally, a lexicon prior derived from attention weights conditions a weighted softmax over the phoneme prediction outputs, enabling open-vocabulary generalization to unseen pinyins.

## Results

Evaluated on Chinese Polyphone with Pinyin (CPP), revised CPP (RCPP), and Modern Common Polyphone (MCP) datasets, g2pO achieves 99.15% test accuracy on CPP and 99.03% on RCPP, outperforming or matching 100M+ parameter baselines like g2pW and PDF while being roughly 27x smaller (3.99M total parameters). On an open-vocabulary zero-shot test set of 541 samples with unseen pronunciations, g2pO achieves 70.79% accuracy, whereas closed-set baselines score 0.00%. Ablations confirm that removing the lexicon adapter drops accuracy to 98.55%, removing POS drops it to 98.91%, and removing the lexicon prior yields 99.10%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building on-device Mandarin text-to-speech front-ends and voice synthesis systems requiring low memory footprints and robust pronunciation handling.

## Related

- (link related pages by id as the wiki grows)
