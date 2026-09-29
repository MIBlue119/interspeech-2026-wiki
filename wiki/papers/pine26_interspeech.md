---
id: pine26_interspeech
category: tts
labels: [low-resource, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/pine26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/pine26_interspeech.pdf
---

# Two Lessons Learned from the SGILE project: Efficient Building and Evaluation of TTS Voices

*Aidan Pine, Korin Richmond*

[PDF](https://www.isca-archive.org/interspeech_2026/pine26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pine26_interspeech.html)

**Category:** `tts` · **Labels:** `low-resource`, `generative-model`

**TL;DR** — The SGILE project introduces the open-source EveryVoice TTS toolkit for training high-quality neural speech synthesis on small datasets and demonstrates the efficiency of Best-Worst Scaling (BWS) for subjective evaluation.

## Key contributions

- Development of the EveryVoice TTS Toolkit designed for building high-quality voices with modest compute and limited audio data typical of under-resourced languages.
- Methodical exploration and promotion of efficient subjective evaluation paradigms such as Best-Worst Scaling (BWS) and AB tests over traditional Mean Opinion Score (MOS) tests to minimize listener fatigue.
- A showcase web application combining interactive TTS voice demonstrations across multiple languages with an informal, embedded listening test framework.
- Insights showing that neural text-to-speech models can be effectively trained from scratch using only a few hours of speech data, challenging assumptions about required corpus scale.

## Problem

More than 99% of the world's 7,100+ languages are classified as under-resourced, lacking the massive speech and text corpora exploited by high-resource speech technology models. Conventional neural TTS assumptions dictate that tens, hundreds, or thousands of hours of speech data are mandatory to achieve acceptable voice quality. Furthermore, standard evaluation methods like MOS require large amounts of listener effort and plentiful evaluator pools, which are severely constrained in under-resourced and Indigenous language communities.

## Method

The EveryVoice TTS Toolkit is engineered to lower computational and data barriers, allowing non-expert community members to construct custom speech synthesis models from scratch using modest hardware resources. The system is paired with a user-friendly wizard interface to streamline the voice building pipeline for non-specialist users.

For subjective evaluation, the framework utilizes Best-Worst Scaling (BWS). In a BWS evaluation panel, a user is presented with four audio stimuli simultaneously, from which they must identify the best-sounding and worst-sounding samples. Evaluating four samples in this manner yields five pairwise preference comparisons, achieving statistical efficiency that would otherwise require 10 individual audio presentations and 5 separate selections in a standard pairwise AB testing setup.

## Experimental setup

The demo showcases EveryVoice models trained on constrained datasets consisting of only a few hours of speech data across multiple under-resourced Indigenous languages. The evaluation methodology compares BWS and AB testing paradigms against traditional evaluation approaches. The interactive interface is deployed as a web application accessible via mobile devices, tablets, and laptops using QR code integration.

## Results

The project demonstrates that natural-sounding neural TTS voices can be successfully constructed from scratch using only a few hours of target speech data. Using Best-Worst Scaling (BWS), evaluators can extract five pairwise preference comparisons from listening to just four audio samples, significantly increasing evaluation throughput compared to traditional AB testing frameworks.

## Limitations

The reliance on small training corpora can introduce architectural and generative constraints in complex acoustic domains. The evaluation framework, while optimized for low-listener-availability environments, still requires human participation. Scope is bounded by the specific characteristics of the Indigenous languages targeted in the SGILE and Own Your Voice projects.

## Why read this

Researchers and practitioners working on low-resource speech technology or community-driven speech documentation should read this to learn how to build functional TTS models with minimal data and evaluate them efficiently without exhausting small listener communities.

## Code

- https://github.com/EveryVoiceTTS/EveryVoice

## Applications

Community-led Indigenous language education, preservation of under-resourced languages, and localized text-to-speech application deployment.

## Institutions / 機構

National Research Council, University of Edinburgh

**Funding / 經費:** National Research Council of Canada, UK ESRC Impact Acceleration Award

## Related

- (link related pages by id as the wiki grows)
