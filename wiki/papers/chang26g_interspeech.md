---
id: chang26g_interspeech
category: phonetics-linguistics
institutions: ["University of California, Irvine"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3106
pdf: https://www.isca-archive.org/interspeech_2026/chang26g_interspeech.pdf
---

# From Words to Sentences: Contextual Predictability Overrides Phonetic Ambiguity in Lexical Competition

*Will Chih-Chao Chang, Jiaxuan Li, Xin Xie*

[PDF](https://www.isca-archive.org/interspeech_2026/chang26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chang26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3106)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper investigates whether fine-grained sub-phonemic phonetic variation (VOT) modulates lexical competition during sentence comprehension, contrasting isolated-word processing with sentence contexts. The study finds that while isolated words show graded sensitivity to phonetic ambiguity, this effect disappears in sentence contexts where top-down expectations dominate.

## Key contributions

- Demonstrated that sub-phonemic VOT variation modulates lexical competition in isolated word recognition, replicating graded ambiguity effects (significant interaction with identity advantage, p < 0.01).
- Showed that when words are embedded in sentences, contextual predictability enhances lexical competition overall (larger identity advantage in high- vs low-predictability contexts, p < 0.05), but completely eliminates sub-phonemic VOT modulation.
- Provided empirical evidence favoring predictive coding and Bayesian inference frameworks (downweighting of bottom-up signals under top-down predictions) over interactive activation / signal-sharpening models of speech perception.
- Utilized a carefully controlled text-to-speech and cross-splicing stimulus generation pipeline with 24 minimal pairs across three places of articulation, ensuring identical acoustic tokens across isolated and sentence environments.

## Problem

Spoken word recognition models have historically been built using isolated-word paradigms, where sub-phonemic variations like voice onset time (VOT) are known to continuously shape lexical competition. However, words in real-world communication almost always occur within rich sentential contexts that generate strong top-down expectations. It remains unknown whether sub-phonemic sensitivity persists when sentence context is present, as existing literature yields conflicting predictions: interactive activation models argue that top-down feedback sharpens bottom-up processing, whereas predictive coding and Bayesian models predict that top-down expectations explain away or downweight bottom-up signals.

## Method

The authors conducted two cross-modal priming experiments using English minimal pairs differing in word-initial stop voicing (/b/-/p/, /d/-/t/, /g/-/k/). In the norming phase, 15-step VOT continua were generated in 5 ms increments using Praat scripts that preserved natural acoustic covariances (e.g., F0, aspiration intensity), from which three tokens representing different ambiguity levels (No ambiguity, Some ambiguity, Max ambiguity) were selected. In Experiment 1 (isolated words, N=58), participants heard auditory primes followed by visual lexical decision probes (Identical, Competitor, Unrelated words).

Experiment 2 (sentences, N=60) embedded the exact same spliced VOT target words into high-predictability (HP, mean GPT-2 surprisal = 3.06) and low-predictability (LP, mean GPT-2 surprisal = 9.41) sentence frames. Predictability was operationalized using GPT-2 small. Linear mixed-effects models were fit on log-transformed reaction times, controlling for covariates including visual word frequency, phonological/orthographic neighborhood density, bigram probability, morpheme count, and baseline lexical decision RTs from the English Lexicon Project. Orthogonal contrasts separated baseline priming from the lexical competition index (identity advantage: Competitor minus Identical RTs).

## Experimental setup

The study analyzed data from 58 participants in Experiment 1 and 60 participants in Experiment 2, recruited via Prolific and tested online via Gorilla. Stimuli comprised 24 English minimal word pairs with log frequency differences under 1.2 in SUBTLEXus. Experiment 1 used 72 critical trials per participant plus 144 fillers; Experiment 2 used 144 unique auditory sentences yielding 72 critical trials per participant. Evaluation metrics relied on speeded lexical decision reaction times (RTs) and error rates, evaluated using linear mixed-effects models.

## Results

In Experiment 1 (isolated words), the identity advantage (Competitor minus Identical RT difference) shrank as VOT ambiguity increased, becoming entirely eliminated at maximal ambiguity (Competitor vs Identical contrast at No ambiguity: beta = 0.051, p < 0.05; at Max ambiguity: beta = -0.007, p = 0.93), confirming graded sub-phonemic modulation. In Experiment 2 (sentences), contextual predictability significantly modulated the identity advantage, showing a larger difference in HP than LP contexts (beta = 0.022, p < 0.05), supported by a continuous differential surprisal model (beta = 0.016, p < 0.01).

However, VOT ambiguity failed to modulate lexical competition in sentences: neither two-way interactions between identity advantage and VOT (p = 0.48, p = 0.85) nor three-way interactions with predictability were significant. Planned comparisons showed significant identity advantages across all VOT ambiguity levels in HP sentences (No: beta = 0.148, p < 0.001; Some: beta = 0.146, p < 0.001; Max: beta = 0.127, p < 0.001) and in LP sentences without significant gradiency.

## Limitations

The study relies on online experimentation via Prolific and Gorilla, which inherently introduces more acoustic and attentional variance than a sound-attenuated laboratory setting. The linguistic stimuli are restricted to English word-initial stop voicing minimal pairs, leaving open whether these findings generalize to other phonetic features (e.g., vowel nasalization, fricative place) or languages with different phonotactic structures. Furthermore, the cross-modal priming paradigm indexes lexical competition rather than absolute phonetic encoding fidelity, leaving open whether sub-phonemic details are retained in memory without actively influencing lexical selection during sentence processing.

## Why read this

Speech and ML researchers building spoken language understanding models or evaluating human-like speech processing should read this to understand that isolated-word perception paradigms severely overestimate the role of sub-phonemic phonetic detail in natural sentence comprehension. It provides critical behavioral constraints challenging traditional signal-sharpening theories in favor of predictive coding frameworks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving cognitive models of human speech perception, informing architectural design for speech LLMs regarding contextual versus acoustic weighting, and refining text-to-speech evaluation benchmarks.

## Institutions / 機構

University of California, Irvine

## Related

- (link related pages by id as the wiki grows)
