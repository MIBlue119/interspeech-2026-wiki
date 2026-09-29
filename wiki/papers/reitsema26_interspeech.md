---
id: reitsema26_interspeech
category: phonetics-linguistics
institutions: ["Leiden University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3530
pdf: https://www.isca-archive.org/interspeech_2026/reitsema26_interspeech.pdf
---

# Returning the Turn: Do Backchannels Pattern More Like Turn-Holds or Turn-Changes Given Preceding Syntactic Completion and Boundary Tones?

*Ariëlle Reitsema, Matthijs Westera, Yiya Chen, Johanneke Caspers*

[PDF](https://www.isca-archive.org/interspeech_2026/reitsema26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/reitsema26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3530)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper investigates whether backchannels in Dutch conversations pattern more like turn-holds or turn-changes based on preceding syntactic completion and final boundary tones. Using a multinomial mixed regression model, the study finds that backchannels differ significantly from both categories but show a statistically significant closer resemblance to turn-changes (Jensen-Shannon divergence of 0.070 vs 0.187).

## Key contributions

- Re-evaluates the categorization of backchannels in Dutch turn-taking, separating them methodologically from turn-holds.
- Analyzes a curated corpus dataset of over one hour of Dutch task-oriented dialogues (1,910 observations) annotated for IPUs, syntactic completion, and ToDI boundary tones.
- Fits a multinomial mixed-effects logistic regression model with weighted effect coding to isolate main effects and interactions of boundary tones and syntactic completion.
- Demonstrates via Jensen-Shannon divergence and bootstrap tests that backchannels pattern closer to turn-changes than turn-holds.

## Problem

In conversational analysis and speech technology, backchannels (short listener responses like "uh-huh") are often conflated with turn-holds or ignored as noise. Prior work provides conflicting evidence: some studies (e.g., Caspers for Dutch) group backchannels with turn-holds because they do not claim the floor, whereas others (e.g., Gravano and Hirschberg for English) suggest intonational cues align them closer to turn-changes. This ambiguity hinders precise predictive modeling of dialogue dynamics, turn-taking, and responsive listener behavior.

## Method

The study analyzes a little over an hour of task-oriented dialogue from the Dutch Map Task Corpus, involving 8 participants across 12 annotated conversations. Conversational data is segmented into inter-pausal units (IPUs), defined as maximal same-speaker speech stretches uninterrupted by pauses over 100 ms or overlapping speech. Transition types at each IPU onset are categorized into Hold (H), Backchannel (B), or Change (C) based on strict interactional criteria.

For each preceding IPU, two main categorical variables are annotated: IPU-final boundary tones using the Transcription of Dutch Intonation (ToDI) system (classified as high H%, low L%, or level %), and syntactic completion evaluated incrementally using Ford and Thompson's criteria (complete vs. incomplete). Data points with ambiguous intonation, severe overlaps, or following backchannels are excluded, leaving 1910 observations (736 holds, 280 backchannels, 894 changes).

A multinomial mixed regression model is fitted using the mblogit function in R. Fixed effects include syntactic completion, boundary tone, and their interaction, using weighted effect coding so predictor estimates act as main effects relative to the sample mean. Random intercepts account for speaker and dialogue variability. Model similarity is evaluated via Jensen-Shannon divergence (JSD) on predicted probabilities, validated with a 1000-resample non-parametric bootstrap test.

## Experimental setup

The dataset consists of 1,910 observations derived from 12 dialogues (~1 hour) of the Dutch Map Task Corpus involving native Dutch university students. The analysis compares three transition types: 736 holds (38.5%), 280 backchannels (14.7%), and 894 changes (46.8%). Evaluation metrics include log-odds coefficients ($eta$), standard errors, z-scores, p-values from multinomial mixed regression, and Jensen-Shannon divergence (JSD) paired with non-parametric bootstrap tests.

## Results

Descriptive statistics show that preceding IPUs are syntactically complete in 52.3% of holds, 82.1% of backchannels, and 94.2% of changes. Preceding boundary tones for backchannels are 50.0% high (H%), 35.7% low (L%), and 14.3% level (%), compared to 20.0% high and 50.8% level for holds, and 37.7% high and 50.9% low for changes.

The multinomial mixed regression reveals that level boundary tones significantly increase the log-odds of a hold over a backchannel ($eta$: 0.760, $p < 0.001$) but show no significant effect on change vs. backchannel ($p = 0.779$). Syntactic incompletion significantly increases holds relative to backchannels ($eta$: 0.606, $p = 0.001$) while decreasing changes relative to backchannels ($eta$: -0.955, $p < 0.001$). The Jensen-Shannon divergence between holds and backchannels is 0.187, significantly larger ($p < 0.001$) than the divergence between changes and backchannels (0.070), confirming that backchannels pattern more like turn-changes.

| System / Transition Condition | Preceding Complete (%) | Preceding Incomplete (%) | High Tone (H%) (%) | Level Tone (%) (%) | Low Tone (L%) (%) |
|---|---|---|---|---|---|
| Turn Hold (H) | 52.3 | 47.7 | 20.0 | 50.8 | 29.2 |
| Backchannel (B) | 82.1 | 17.9 | 50.0 | 14.3 | 35.7 |
| Turn Change (C) | 94.2 | 5.8 | 37.7 | 11.9 | 50.9 |

## Limitations

The dataset is restricted to task-oriented dialogues in Dutch (Map Task), which may artificially inflate the rate of listener feedback compared to free-flowing or casual conversation. The study exclusively examines IPU-final boundary tones and syntactic completion, omitting earlier prosodic markers like pitch accents or durational cues. The corpus size (~1 hour, 1,910 observations across 8 speakers) limits broader demographic generalization.

## Why read this

Spoken dialogue system and conversational AI researchers should read this paper to understand how backchannels align with turn-taking mechanics rather than being treated as unstructured noise. It provides empirical linguistic grounding for building reactive dialogue models that properly time listener feedback.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Conversational AI, spoken dialogue systems, embodied conversational agents, and turn-taking models for interactive speech assistants.

## Institutions / 機構

Leiden University

**Funding / 經費:** Dutch Research Council

## Related

- (link related pages by id as the wiki grows)
