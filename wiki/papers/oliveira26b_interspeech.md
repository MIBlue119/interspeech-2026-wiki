---
id: oliveira26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2597
---

# Too Good to Be True: A Study on Modern Automatic Speech Recognition Systems for the Evaluation of Speech Enhancement

**TL;DR** — A listening study finds that modern, noise-robust ASR models correlate better with human recognition of enhanced speech than older models, but their very robustness can make them a poor, uninformative signal for evaluating acoustically focused speech enhancement quality.

## Problem

Using ASR-derived WER to evaluate speech enhancement systems is common, but WER scores depend heavily on the choice of ASR system and text normalization, and it's unclear how well modern ASR models actually reflect human perception of enhancement quality.

## Method

The authors run a listening experiment comparing how several modern ASR models' transcription accuracy correlates with human recognition of speech-enhancement output, including a transducer model with embedded language modeling.

## Results

Modern ASR models trained with large-scale noisy data and embedded language models correlate more with human WER than simpler models, with a transducer model giving the most reliable transcriptions; however, these same models' noise robustness and contextual reliance can make them uninformative for an acoustics-focused evaluation of enhancement quality.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides researchers on choosing appropriate ASR models and being cautious about WER-based evaluation protocols when benchmarking speech enhancement systems.

## Related

- (link related pages by id as the wiki grows)
