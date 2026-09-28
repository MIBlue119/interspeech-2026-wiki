---
id: gachot26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2768
pdf: https://www.isca-archive.org/interspeech_2026/gachot26_interspeech.pdf
---

# A Generalized Formalism of Auto-Regressive Decoding for Speech Processing

[PDF](https://www.isca-archive.org/interspeech_2026/gachot26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gachot26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2768)

**TL;DR** — This paper establishes a generalized theoretical formalism for auto-regressive decoding in speech processing models, unifying diverse search strategies under a modular stochastic integer programming framework.

## Problem

State-of-the-art speech sequence prediction models rely on auto-regressive (AR) decoding strategies, but the field lacks a unified overview due to implicit, task-specific definitions of next-token search. This ambiguity creates inconsistencies in categorizing methods as AR or non-AR, complicates strategy comparisons, and treats inference as an implementation detail rather than an isolated design choice. Addressing this gap is critical for systematically evaluating and benchmarking generation algorithms across speech tasks.

## Method

The authors propose a generalized theoretical framework treating auto-regressive generation as a stochastic integer problem under probabilistic constraints (SIPC), defined by a tuple of a neural model and an inference algorithm. An iterative function executes four modular steps per decoding step: estimation via conditional probability mass functions, decision making via objective functions like Maximum a Posteriori, prior updating to track history, and termination testing. The formalism provides a systematic way to formulate specific algorithms like beam search through explicit recurrence relations and initial conditions.

## Results

The paper presents theoretical derivations and a structural taxonomy rather than empirical benchmarks on specific speech datasets. It demonstrates how the modular formalism simplifies the design of decoding-centered benchmarks and enables focused ablation studies on individual search strategy components across speech architectures. The framework successfully isolates the contributions of estimation, decision rules, prior updates, and termination conditions without relying on task-specific heuristics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers designing, benchmarking, or comparing decoding strategies and search algorithms for speech processing tasks such as ASR, TTS, and speech translation.

## Limitations

The work provides a theoretical formalization and framework design without offering quantitative performance evaluations or runtime benchmarks on empirical speech datasets.

## Related

- (link related pages by id as the wiki grows)
