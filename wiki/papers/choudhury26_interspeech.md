---
id: choudhury26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3500
---

# Impact Analysis of Speech Representation Learning Models for Acoustic Side-Channel Attack

**TL;DR** — Speech representation learning models can be repurposed to identify keystrokes from acoustic recordings, and a new KAN-based fine-tuning approach handles cross-VoIP-codec conditions that standard fine-tuning cannot.

## Problem

Acoustic side-channel attacks that infer typed keystrokes from sound are a known privacy risk, but how well modern speech representation learning models transfer to this attack, especially across different VoIP codecs, was previously unexplored.

## Method

The authors build KEYAC, a dataset for studying representation generalization for acoustic side-channel attacks under standard and VoIP codec conditions, evaluate six representation models under zero-shot and partial fine-tuning, and introduce Kolmogorov-Arnold Network (KAN) based fine-tuning to better model nonlinear feature interactions.

## Results

Partial fine-tuning improves performance but standard architectures still struggle to generalize across VoIP codecs; KAN-based fine-tuning consistently beats these baselines and sets a new state of the art on KEYAC.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Security research into keyboard acoustic eavesdropping risks, and as a case study in adapting speech representation models to non-speech acoustic classification tasks.

## Related

- (link related pages by id as the wiki grows)
