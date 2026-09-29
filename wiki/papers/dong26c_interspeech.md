---
id: dong26c_interspeech
category: resources-evaluation
institutions: ["Radboud University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1991
pdf: https://www.isca-archive.org/interspeech_2026/dong26c_interspeech.pdf
---

# Can Speech LLMs Approximate Human Ratings of Accentedness and Comprehensibility? Evidence from Correlational and Feature-Based Analyses

*Wenwei Dong, Catia Cucchiarini, Roeland van Hout, Helmer Strik*

[PDF](https://www.isca-archive.org/interspeech_2026/dong26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dong26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1991)

**Category:** `resources-evaluation`

**TL;DR** — This paper investigates whether the speech large language model Qwen3-Omni-30B-Instruct can automatically approximate human ratings of accentedness and comprehensibility in second-language (L2) English speech. Using zero-shot and few-shot prompting, the model achieves moderate correlations with expert human ratings (Spearman's rank correlation up to 0.505) and successfully captures pre-to-post-test learner progress.

## Key contributions

- Systematic evaluation of a speech LLM for automated pronunciation assessment (accentedness and comprehensibility) under zero-shot and few-shot prompting conditions.
- Demonstration via linear mixed-effects models that speech LLM-generated scores successfully track L2 learner progress over a 36-day CALL intervention, aligning with expert human trends.
- Acoustic cue analysis combining Praat, eGeMAPS, and ASR word distance features with Lasso regression to reveal that speech LLMs utilize overlapping segmental and suprasegmental features similar to human raters, particularly for comprehensibility.

## Problem

Evaluating second-language pronunciation relies heavily on expert human raters, which is expensive, time-consuming, and hard to scale for computer-assisted language learning (CALL) systems. Traditional automatic pronunciation systems depend on rigid predefined acoustic or ASR metrics that fail to mirror human perceptual judgments of comprehensibility (how easily speech is understood) and accentedness (the perceived strength of a foreign accent). While speech LLMs encode rich latent representations of segmental accuracy, prosody, and fluency directly from raw audio, empirical evidence regarding their alignment with human perceptual ratings and their sensitivity to longitudinal language development remains scarce.

## Method

The study utilizes the open-source Qwen3-Omni-30B-Instruct speech LLM, which accepts raw audio and text prompts as input and generates text outputs. The authors test zero-shot prompting (providing definitions and speech files together or separately, with and without reading texts) and few-shot prompting (incorporating 1 to 5 example audio files paired with low, intermediate, or high human scores). Scores for accentedness and comprehensibility are evaluated separately to prevent cross-contamination.

To analyze acoustic alignment, the authors extract 105 utterance-level features: 16 Praat features (duration, center of gravity, formants, pitch/intensity statistics, speech rate), 88 extended Geneva Minimalistic Acoustic Parameter Set (eGeMAPS) features via openSMILE (frequency, spectrum, and temporal descriptors), and 1 ASR word distance metric computed using Whisper (insertions + deletions + substitutions relative to reading texts). Lasso regression and Spearman's rank correlation coefficients are used to rank feature importance and compare LLM scoring heuristics against human expert evaluations.

## Experimental setup

The dataset comprises 1,848 speech utterances collected from 33 Indonesian 10th-grade EFL learners (out of 65 participants) across pre- and post-tests (28 unique sentences per test) after a 36-day CALL practice period. Nine expert human raters (B2-C1 CEFR proficiency) evaluated the files using a 9-point reversed scale (higher score = less foreign accent / easier to understand), showing high inter-rater reliability (ICC > 0.97). Performance is measured using Spearman's Rank Correlation Coefficient (SPCC) and Mean Squared Error (MSE) against averaged human scores across utterance, sentence, and speaker levels.

## Results

In zero-shot settings, providing definitions separately yielded moderate SPCCs (0.300 for accentedness, 0.419 for comprehensibility), whereas providing reading texts degraded performance (0.198 and 0.348), likely because the model over-weights text-based errors over acoustic nuances. Few-shot prompting with balanced examples (Exp. 6: 2 low, 2 intermediate, and 2 high score samples) achieved the lowest MSE (0.82 for accented, 1.37 for comprehensibility) and a top comprehensibility SPCC of 0.505. Linear mixed-effects models confirmed that LLM scores significantly captured learner progress from pre- to post-test (p < 0.001), mirroring human expert models. Feature rankings showed strong alignment between human raters and the LLM for comprehensibility (where Whisper Word Distance ranked 1st for both), but temporal features played an oversized role in the LLM's accentedness scoring compared to human raters.

| System / Condition | Accentedness SPCC / MSE | Comprehensibility SPCC / MSE |
|---|---|---|
| Whisper Word Distance (Baseline) | 0.280 / - | 0.400 / - |
| Exp. 1: Zero-shot (Definitions + Together) | 0.314 / 2.50 | 0.402 / 3.26 |
| Exp. 2: Zero-shot (Definitions Separate) | 0.300 / 1.96 | 0.419 / 3.23 |
| Exp. 3: Zero-shot (+ Reading Text) | 0.198 / 1.37 | 0.348 / 4.15 |
| Exp. 5: Few-shot (2 low + 2 high) | 0.284 / 0.85 | 0.505 / 1.73 |
| Exp. 6: Few-shot (2 low + 2 inter + 2 high) | 0.283 / 0.82 | 0.497 / 1.37 |

## Limitations

The study is restricted to L2 English speech produced by a single native language background (Indonesian high school students), limiting immediate cross-linguistic generalization. The dataset size is relatively small (33 learners, 1,848 total utterances), and evaluations rely on a single speech LLM architecture (Qwen3-Omni-30B-Instruct) without exploring direct model fine-tuning or specialized prompt engineering incorporating explicit phonetic linguistic knowledge.

## Why read this

Speech and ML researchers building automated pronunciation scoring or CALL systems should read this to understand the current ceiling of off-the-shelf speech LLMs in matching human perceptual ratings, as well as how few-shot examples and acoustic cues influence LLM scoring behavior.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated computer-assisted language learning (CALL) platforms, pronunciation training apps, and scalable second-language oral proficiency testing.

## Institutions / 機構

Radboud University

**Funding / 經費:** China Scholarship Council

## Related

- [A Finetuned SpeechLLM for Joint Multi-Granular L2 Assessment and Natural-Language Rationales](parikh26_interspeech.md) — same problem · relatedness 2.7/3
- [LOPA: Enhancing Spoken Language Assessment via Latent Ordinal Prototype Alignment](lin26e_interspeech.md) — same problem · relatedness 2.5/3
- [A Multi-Agent Framework to Automate Feedback Generation for IELTS Speaking Test using Multimodal SpeechLMs](koh26_interspeech.md) — same problem · relatedness 2.4/3
- [ALFreeD: Teacher-Guided Few-Shot Pronunciation Assessment via Segmentation-Free Deviation Modeling](sirigiraju26_interspeech.md) — same problem · relatedness 2.3/3
- [Calibration-Reasoning Framework for Descriptive Speech Quality Assessment](kostenok26_interspeech.md) — same problem · relatedness 2.2/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
