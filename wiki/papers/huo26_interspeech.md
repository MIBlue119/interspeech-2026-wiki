---
id: huo26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2676
---

# Do speech foundation models really learn words?

**TL;DR** — By statistically removing phoneme information from HuBERT and wav2vec 2.0 representations, the authors show these models' later layers do encode word identity beyond just phonetic form, and that this disentanglement helps word discovery.

## Problem

Speech foundation models are widely used downstream, but it's unclear whether their strong ability to discriminate words reflects a genuine, form-independent representation of word identity, or simply good encoding of phoneme sequences that happens to let words be told apart.

## Method

The authors use residualization to partial out phoneme information from HuBERT and wav2vec 2.0 representations, isolating whether the remaining signal still encodes word identity independently of local phonetic content, and test whether this disentangled information helps word discovery tasks.

## Results

In later layers, HuBERT and wav2vec 2.0 generally do learn representations that encode words with reasonable fidelity independent of local phonetic content, and this simple disentanglement approach enhances higher-order linguistic information available for word discovery.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Interpretability and probing work for self-supervised speech models, and improving unsupervised/weakly-supervised word discovery and spoken-language-model tokenization.

## Related

- (link related pages by id as the wiki grows)
