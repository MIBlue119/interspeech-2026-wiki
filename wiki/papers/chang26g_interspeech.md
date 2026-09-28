---
id: chang26g_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3106
pdf: https://www.isca-archive.org/interspeech_2026/chang26g_interspeech.pdf
---

# From Words to Sentences: Contextual Predictability Overrides Phonetic Ambiguity in Lexical Competition

[PDF](https://www.isca-archive.org/interspeech_2026/chang26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chang26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3106)

**TL;DR** — This study demonstrates that when sentence context is present, top-down predictability overrides sub-phonemic phonetic ambiguity during spoken word recognition, nullifying the graded lexical competition effects typically observed in isolated words.

## Problem

Spoken word recognition models are predominantly built on isolated-word paradigms that show fine-grained sub-phonemic variation modulates lexical competition. However, it remains unknown whether this graded sensitivity persists during sentence comprehension, where top-down sentence context generates strong lexical expectations. Resolving this distinction is critical for evaluating competing theoretical frameworks such as interactive activation, predictive coding, and Bayesian inference models.

## Method

The authors conducted two cross-modal priming experiments using 24 English minimal word pairs manipulated across a 15-step voice onset time (VOT) continuum to create three levels of sub-phonemic ambiguity (No, Some, Max ambiguity). Experiment 1 tested isolated auditory word primes (N=58) paired with visual lexical decision probes (Identical, Competitor, Unrelated). Experiment 2 embedded the exact same acoustic tokens into sentence contexts (N=60) varying in predictability (High Predictability vs. Low Predictability, operationalized via GPT-2 small surprisal values). Linear mixed-effects models analyzed log reaction times, incorporating orthogonal contrasts for visual probe types and polynomial contrasts for VOT ambiguity.

## Results

In Experiment 1 (isolated words), a significant identity advantage (Competitor slower than Identical) was found at No and Some ambiguity levels but was entirely eliminated at Max ambiguity (beta = -0.007, p = .93), replicating graded sub-phonemic competition. In Experiment 2 (sentences), contextual predictability significantly modulated lexical competition, yielding a larger identity advantage in High Predictability than Low Predictability contexts (beta = 0.022, p < .05). Crucially, unlike in isolated words, VOT ambiguity failed to modulate the identity advantage in sentences (p = .48 for linear interaction), and a robust identity advantage persisted across all VOT levels even in Low Predictability sentences.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cognitive scientists, psycholinguists, and speech engineers designing spoken language understanding systems or evaluating speech perception models.

## Limitations

The study was conducted online using text-to-speech generated sentences and a cross-modal visual lexical decision task rather than continuous natural speech tracking.

## Related

- (link related pages by id as the wiki grows)
