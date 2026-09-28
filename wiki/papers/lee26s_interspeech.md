---
id: lee26s_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1975
pdf: https://www.isca-archive.org/interspeech_2026/lee26s_interspeech.pdf
---

# Comparing Self-Supervised and Domain-Invariant Features for Cross-Domain Voice Phishing Detection

[PDF](https://www.isca-archive.org/interspeech_2026/lee26s_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26s_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1975)

**TL;DR** — This paper evaluates domain-invariant prosodic features against frozen self-supervised representations (HuBERT and wav2vec 2.0) for cross-domain voice phishing detection, showing that domain-invariant features excel in zero-shot settings while HuBERT achieves 94.2% F1 with 5-shot adaptation.

## Problem

Voice phishing (vishing) detection models suffer from a severe domain shift when trained on controlled scenario-based actor recordings and deployed on authentic criminal phone calls, compounded by the strict unavailability of real criminal data due to privacy constraints. When a handful of authentic samples are accessible, traditional fine-tuning is insufficient, and lightweight acoustic-only detection is required to satisfy on-device privacy and resource limits instead of heavy text-based LLMs.

## Method

The authors construct a Korean speech corpus at 8 kHz telephony bandwidth comprising scenario-based actor voice phishing (406 utterances), authentic criminal calls (456 utterances), and financial consultation non-vishing data. They compare 88 full eGeMAPS prosodic features, a domain-invariant subset of 4 features filtered via Random Forest importance and Cohen's d (<0.5 effect size between domains), and frozen 74M-parameter HuBERT-Base and wav2vec2.0-Base models pretrained on LibriSpeech 960h. Classification uses L2-regularized Logistic Regression across zero-shot, 1-shot, and 5-shot settings using up to 5 authentic target-domain support samples.

## Results

Evaluated on an 812-utterance test set using F1 score, Recall, and Precision, domain-invariant 4-feature prosody achieves 69.5% zero-shot F1, outperforming HuBERT (58.3%) and wav2vec2.0 (36.2%) when no target data is available. However, with 5-shot adaptation, HuBERT reaches 94.2% F1 with 99.3% recall while wav2vec2.0 reaches 90.2% F1 with 99.4% precision. The full 88-feature set collapses under zero-shot (3.8% F1) but recovers to 85.2% F1 with 5-shot adaptation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building real-time, on-device voice security and call-monitoring systems can use these guidelines to choose between lightweight prosodic features for cold-start environments and self-supervised models when minimal target-domain data is available.

## Limitations

The evaluation is restricted to telephony-bandwidth Korean speech datasets, and whether the observed cross-domain regime structures generalize to other languages remains an open question.

## Related

- (link related pages by id as the wiki grows)
