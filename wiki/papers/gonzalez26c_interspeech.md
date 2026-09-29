---
id: gonzalez26c_interspeech
category: asr
labels: [multilingual]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-920
pdf: https://www.isca-archive.org/interspeech_2026/gonzalez26c_interspeech.pdf
---

# How Linguistic Dimension Interactions Shape Meaning Preservation in Multilingual ASR

*Simon Gonzalez, Tao Hoang, Bradley Donnelly, Jason Littlefield, Myung Kim, Chloe Dean, Jennifer Biggs, Hayden Ooi, Latchman Singh, Tim Cawley*

[PDF](https://www.isca-archive.org/interspeech_2026/gonzalez26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gonzalez26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-920)

**Category:** `asr` · **Labels:** `multilingual`

**TL;DR** — This paper investigates how linguistic dimension interactions shape semantic preservation in multilingual ASR, discovering through mixed-effects beta regression that sentence-level meaning emerges from interdependent morphosyntactic and phonological-syntactic combinations rather than isolated error rates.

## Key contributions

- Replaces global Word Error Rate (WER) with a token-level, multi-dimensional error characterisation measuring phonetic, morphological, syntactic, and semantic similarities directly from ASR outputs.
- Formulates a four-stage mixed-effects beta regression framework (using glmmTMB) to model additive and pairwise interaction effects of linguistic dimensions across languages and architectures.
- Demonstrates that Whisper and Seamless integrate linguistic features through fundamentally different mechanisms, with Whisper showing higher sensitivity to single-dimension errors but better exploitation of morphological and multi-level feature alignments.
- Uncovers cross-linguistic performance variations where isolated dimension accuracies fail to predict sentence-level outcomes (e.g., Czech compensating for phonological deficits, Urdu suffering integration failure).

## Problem

Standard ASR evaluation metrics like Word Error Rate (WER) treat all errors as equally costly and fail to capture how substitution errors impact downstream semantic preservation, particularly in multilingual and morphologically rich settings. While prior work tried to correlate errors with external typological features (such as WALS), it remains unclear whether these patterns hold when linguistic features are measured directly from token-level ASR outputs. Consequently, downstream applications like dialogue systems and information retrieval lack insight into how different architectures weight and preserve linguistic information across languages.

## Method

The study analyzes substitution errors by aligning ASR hypotheses with reference transcripts, excluding insertions and deletions. Universal dependency parsing via Stanza extracts part-of-speech (morphological, MOR) and syntactic (SYN) tags. Phonetic similarity (PHN) is computed using normalized Levenshtein distance on phonemized transcripts via eSpeak-ng and phonemizer. Semantic word distance (SEM) uses pretrained fastText multilingual word embeddings, and sentence-level semantic similarity (SENT) serves as the primary response variable, calculated via sentence-transformers using paraphrase-multilingual-MiniLM-L12-v2.

The statistical pipeline uses mixed-effects beta regression in R via the glmmTMB package. Stage 1 estimates main effects. Stage 2 adds pairwise interaction terms (PHN:SEM, PHN:SYN, MOR:SYN, SYN:SEM, MOR:SEM, PHN:MOR). Stage 3 introduces ASR system as a moderator (three-way interactions with Whisper vs. Seamless) to isolate architectural dynamics. Stage 4 fits language-sensitive interactions to account for typological and cross-linguistic variation with language-specific random intercepts.

## Experimental setup

Evaluated on the FLEURS dataset, specifically selecting 42 diverse languages comprising over 48,000 audio files and 154+ hours of speech (averaging 3.7 hours per language). Evaluates two models: Whisper (OpenAI, supervised multitask Transformer) and SeamlessM4T (multilingual speech-text model with self-supervised representations). Metrics include normalized sentence similarity (SENT), normalized Levenshtein distance (PHN), and dependency-tag differences evaluated through likelihood-ratio tests and drop-one ANOVA.

## Results

The baseline model showed that semantic word similarity strongly drives sentence meaning (beta = 0.84, p < 0.001) while phonetic distance heavily degrades it (beta = -0.31, p < 0.001). Pairwise interaction models revealed a highly significant fit improvement (chi-squared = 165.54, df = 6, p < 2.2e-16), driven heavily by a robust MOR:SYN interaction (chi-squared = 113.02, p < 0.001) indicating interdependent grammatical processing.

Comparing architectures, Seamless demonstrated better baseline performance (beta = -0.20, p = 0.011) and higher stability, whereas Whisper exhibited heightened sensitivity to phonological (beta = -0.29), semantic (beta = -0.29), and syntactic degradation, but leveraged morphology more effectively (beta = 0.14). Three-way interactions showed Whisper recovers meaning exceptionally well when phonology and semantics align (beta = 0.45, p < 0.001) or when phonology and syntax coincide (beta = 0.26). Cross-linguistic random effects spanned widely (beta range -0.89 to 1.44), showing that high dimension scores do not guarantee sentence-level success, such as Vietnamese achieving high phonological/semantic scores but lower sentence-level similarity (beta = -0.26), and Czech compensating for phonological deficits to reach positive sentence similarity (beta = 0.42).

| System / Condition | Phonetic β | Semantic β | Morphological β | Syntactic β | Sentence Similarity β |
|---|---|---|---|---|---|
| Baseline (Main Effects) | -0.31 | +0.84 | +0.03 | -0.03 | - |
| Seamless (vs Whisper Baseline) | - | - | - | - | -0.20 |
| Whisper (Architecture Modifiers) | -0.29 | -0.29 | +0.14 | -0.07 | - |
| Czech (Language Effect) | -0.89 | +0.51 | -0.34 | +0.25 | +0.42 |
| Vietnamese (Language Effect) | +1.29 | +1.44 | - | - | -0.26 |

## Limitations

The analysis is scoped strictly to substitution errors, completely excluding deletions and insertions, which limits the exhaustive accounting of all ASR failure modes. Findings are constrained by the capabilities and potential parse errors of the universal dependency parser (Stanza) and the multilingual embeddings utilized. The dataset is limited to 42 FLEURS languages, leaving extreme low-resource and tone-heavy or non-alphabetic scripts under-analyzed or prone to integration anomalies (e.g., Urdu script complexity).

## Why read this

Researchers building or evaluating multilingual ASR systems should read this to understand why standard Word Error Rate is insufficient for semantic evaluation, and how different Transformer architectures trade off phonological, morphological, and syntactic reliance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving multilingual ASR evaluation pipelines, guiding architecture design for semantically sensitive downstream applications like spoken dialogue systems and cross-lingual information retrieval.

## Institutions / 機構

Defence Science and Technology Group

## Related

- (link related pages by id as the wiki grows)
