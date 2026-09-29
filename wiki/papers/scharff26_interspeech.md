---
id: scharff26_interspeech
category: phonetics-linguistics
institutions: ["University of California Los Angeles"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2920
pdf: https://www.isca-archive.org/interspeech_2026/scharff26_interspeech.pdf
---

# Gradient phonetic detail is less detrimental to word segmentation in infant-directed speech

*Gabriel Scharff, Megha Sundara*

[PDF](https://www.isca-archive.org/interspeech_2026/scharff26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/scharff26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2920)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper investigates how gradient phonetic detail (such as allophonic variation, flapping, and glottalization) affects unsupervised word segmentation algorithms when applied to infant-directed speech, finding surprisingly little performance degradation compared to previous reports on adult-directed speech. Two of the four evaluated algorithms (TP and PUDDLE) showed no degradation, while the other two (DiBS and AG) showed only modest drops in token F-score.

## Key contributions

- Evaluated unsupervised word segmentation models on naturally occurring infant-directed speech comparing phonemic versus phonetically transcribed inputs.
- Demonstrated that TPU (Transitional Probability) and PUDDLE algorithms are completely resilient to consonantal phonetic variation in full-corpus infant-directed speech, defying prior adult-directed speech findings.
- Simulated early language experience by testing models on a 1/10 reduced subset of the corpus to observe the impact of data scale and phonetic consistency.
- Showed that expanded phonetic inventories (2025 bigram types vs 1318 phonemic) increase position-specific contextual cues, which can benefit transitional probability metrics.

## Problem

Computational models of word segmentation traditionally idealize input speech as sequences of canonical dictionary phonemes, ignoring gradient pronunciation variations like segment deletion, vowel reduction, and consonant assimilation. Prior work on adult-directed speech (e.g., Buckeye corpus by Beech & Swingley) demonstrated that encoding phonetic variation degrades segmentation F-scores by an average of 0.12. However, it remained unknown whether this vulnerability translates to infant-directed speech, which differs structurally—featuring shorter utterances, more isolated single-word utterances, higher word repetition, and a smaller vocabulary. Failing to account for infant-directed speech characteristics and using purely phonemic idealizations mischaracterizes the actual learning problem faced by infants.

## Method

The authors utilized the PhonProv corpus derived from the Providence Corpus, featuring parent-child interactions with 5 American English-learning children at 16-18 and 22-24 months. The corpus includes 6,970 utterances (31,198 word tokens). The phonemic transcription uses 24 consonant and 21 vowel symbols, whereas the phonetic transcription uses 35 consonant and 21 vowel symbols (capturing variation including aspiration, unreleased stops, tapping, glottalization, affrication, assimilation, devoicing, and deletion, without vowel variation). PRAAT TextGrid segment tiers were extracted, converted to IPA, stripped of stress/length markers, and sequence-aligned.

Four unsupervised word segmentation algorithms from the WordSeg package were evaluated: (1) Backward Transitional Probability (TP) using relative thresholds, which computes conditional probabilities of adjacent sounds; (2) Diphone-Based Segmentation (DiBS), a bottom-up model estimating boundary probabilities from phrase-medial diphone frequencies and utterance edge distributions; (3) PUDDLE (Phonotactics from Utterances Determine Distributional Lexical Elements), an incremental joint-learning model with a bigram window of 2 and 2-fold evaluation that builds a proto-lexicon and edge bigrams; and (4) Adaptor Grammars (AG), using the U-T-Seg hierarchical configuration to discover recurring word-like units via Pitman-Yor process nonterminals and MCMC sampling. Configurations were selected by averaging performance across transcription types and corpus sizes.

Inference involved running the models on 90% random subsets for the full corpus (averaged over 10 runs) and 1/10 reduced subsets to simulate less accumulated language experience. Performance was quantified using position-aware token F-scores (harmonic mean of recall and precision against gold-standard word boundaries).

## Experimental setup

Evaluated on the PhonProv corpus (6,970 utterances, 31,198 tokens) and a 1/10 reduced subset. Compared against a random baseline (inserting boundaries with 50% probability after every segment). Evaluated using token F-score averaged over 10 runs with paired t-tests and Bonferroni correction for statistical reliability.

## Results

On the full corpus, the AG algorithm achieved the highest overall F-score of 0.58 on phonemic and 0.52 on phonetic input (a moderate drop of 0.06). TP scored lowest but exhibited zero degradation, scoring 0.30 on phonemic and 0.32 on phonetic transcriptions. PUDDLE was remarkably resilient on the full corpus, scoring 0.40 on phonemic and 0.39 on phonetic input, but suffered a severe drop from 0.21 to 0.12 on the 1/10 reduced corpus. DiBS dropped moderately from 0.41 to 0.34 on the full corpus and from 0.34 to 0.30 on the 1/10 corpus. In contrast to adult-directed speech where every model degraded significantly (average drop of 0.12), infant-directed speech segmentation proved substantially more robust to phonetic detail.

| Algorithm | Transcription Type | Full Corpus F-Score | 1/10 Corpus F-Score |
|---|---|---|---|
| TP (Backwards) | Phonemic | 0.30 | 0.29 |
| TP (Backwards) | Phonetic | 0.32 | 0.30 |
| DiBS | Phonemic | 0.41 | 0.34 |
| DiBS | Phonetic | 0.34 | 0.30 |
| PUDDLE | Phonemic | 0.40 | 0.21 |
| PUDDLE | Phonetic | 0.39 | 0.12 |

## Limitations

The PhonProv corpus encodes substantial consonantal variation but lacks vowel variation, meaning the study may potentially underestimate the total cost of full phonetic variation. The evaluation is restricted to English infant-directed speech data from 5 children, leaving cross-linguistic generalizability unverified. Furthermore, computational unsupervised models operate on discretized symbolic representations (IPA strings) rather than raw continuous acoustic waveforms, leaving direct speech-to-word acoustic modeling outside the current scope.

## Why read this

Cognitive scientists, computational linguists, and speech researchers studying language acquisition will find this paper essential for understanding how structural properties of infant-directed speech buffer against phonetic variability. It challenges long-held assumptions derived from adult-directed speech datasets and demonstrates that symbolic models can be robust to pronunciation variation.

## Code

- https://doi.org/10.5281/zenodo.20767608

## Applications

Improving computational models of early language acquisition, evaluating unsupervised speech processing pipelines, and guiding developmental cognitive architectures for spoken word recognition.

## Institutions / 機構

University of California Los Angeles

**Funding / 經費:** National Science Foundation

## Related

- (link related pages by id as the wiki grows)
