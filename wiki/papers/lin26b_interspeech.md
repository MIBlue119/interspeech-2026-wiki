---
id: lin26b_interspeech
category: phonetics-linguistics
labels: [multilingual]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-739
pdf: https://www.isca-archive.org/interspeech_2026/lin26b_interspeech.pdf
---

# The Role of Context and Prosody in the Understanding of English Irony by Chinese L2 Learners

*Yinan Lin, Shanpeng Li*

[PDF](https://www.isca-archive.org/interspeech_2026/lin26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-739)

**Category:** `phonetics-linguistics` · **Labels:** `multilingual`

**TL;DR** — This study investigates how context and prosody jointly influence second-language (L2) irony comprehension among Chinese learners of English, finding that context plays a dominant role while prosody acts independently when contextual information is ambiguous. Results show that contextual incongruity dictates 83.8% of ironic responses on average, whereas language proficiency exhibits only a minor moderating effect.

## Key contributions

- Demonstrates the hierarchical dominance of context over prosody in L2 English irony processing, where strong contextual incongruence elicits an average of 83.80% ironic judgments regardless of prosodic realization.
- Establishes that prosody functions independently and critically when contextual information is ambiguous, elevating ironic response rates to 75.47% compared to 29.46% for neutral and 10.97% for sincere prosody.
- Reveals through GLMM analysis that general language proficiency (assessed via C-tests) does not exert a significant main effect on overall irony perception rates, though high-proficiency learners show heightened sensitivity under salient conditions.
- Provides a fully crossed factorial behavioral dataset of 486 validated English stimuli combining 61 sentence frames across 3 contextual types and 3 prosodic variants.

## Problem

Irony comprehension in a second language is complicated by the ambiguity of matching literal utterances against speakers' actual intentions, forcing learners to rely heavily on contextual cues and prosodic variation. Prior research offers conflicting accounts: some frameworks argue that prosody provides an autonomous, cognitively economical cue to sarcasm, while others maintain that prosody is largely inert without explicit contextual grounding. Furthermore, it remains contentious whether general second-language proficiency significantly improves pragmatic irony detection or if learners process these pragmatic mismatches independently of lexical-syntactic fluency. Resolving these conflicting accounts is critical for understanding L2 pragmatic processing and improving communicative language pedagogy.

## Method

The experiment utilized 61 declarative English target sentences following a rigid syntactic frame ("X + be + really + adj.", mean length 5.1 syllables), restricted to literal praises to isolate pragmatic effects. Each sentence was embedded into three distinct textual contexts via a Discourse Completion Task paradigm: strong incongruent (creating ironic scenarios), ambiguous (neutral backstories permitting multiple readings), and non-incongruent (sincere backstories). Context audio was synthesized using TTSMAKER via a male American English neutral voice at 44.1kHz/16-bit WAV to eliminate speaker variability across conditions. Target sentences were recorded by a 22-year-old female native English speaker under three distinct prosodic postures (ironic, neutral, sincere) and normalized to 70 dB using Praat; validation filtering eliminated 7 low-performing items per category to yield 486 final audio pairs.

Forty-eight native Chinese undergraduate participants (43 females, 5 males; aged 19-24) took part, split evenly into high- and low-proficiency cohorts based on a 100-gap C-test score (mean 66.60, SD 13.52). The perception experiment was administered via PsychoPy (v2024.1.4) in a quiet computer classroom using ECD-69 headphones. Participants listened to the context text and audio, followed by a 500 ms pause before hearing the target sentence audio without text, and made a two-alternative forced-choice response ('f' for critical/negative, 'j' for praising/positive) with no time limit. One-third of trials included a comprehension check to ensure engagement.

Statistical analysis was executed using Generalized Linear Mixed Models (GLMM) in R via Type II Wald chi-square tests, setting Context, Prosody, and Language Level as fixed effects, and participants and item IDs as random effects. Significant interactions were probed using Tukey-HSD pairwise comparisons and compact letter displays via the emmeans and multcompView packages.

## Experimental setup

The study evaluated 48 participants divided into high-level (M=77.50) and low-level (M=55.71) proficiency groups using a standard C-test. Stimuli comprised 486 trials per participant group (61 items reduced to 54 valid experimental trials per condition block). Metrics included the proportion of ironic responses and reaction times (RT), modeled via GLMMs with participant and item random intercepts.

## Results

Across all conditions, strong incongruent contexts yielded the highest proportion of ironic responses (83.80%), followed by ambiguous contexts (38.33%) and non-incongruent contexts (22.80%). Prosody also showed a robust main effect, with ironic prosody generating 66.32% ironic responses, neutral prosody 47.57%, and sincere prosody 31.37%. A significant Context × Prosody interaction (χ²(4) = 11.931, p = .018) confirmed that prosody's impact is largest in ambiguous contexts, where ironic prosody spiked irony detection to 75.47% compared to 10.97% for sincere prosody. Conversely, in strong incongruent contexts, irony choices remained high regardless of prosody (96.64% for ironic, 90.98% for neutral, 79.12% for sincere).

Language proficiency failed to reach statistical significance as a main effect on response rates (χ²(1) = 0.058, p = .809), though significant interactions emerged between Level and Context (χ²(2) = 16.697, p < .001) and Level and Prosody (χ²(2) = 9.700, p = .008). High-proficiency learners identified more irony under strong incongruent conditions (93.9% vs. 83.9%) and under explicitly ironic prosody (74.8% vs. 64.2%). Reaction time analyses revealed that sincere prosody produced the fastest RTs in non-incongruent contexts, whereas ironic prosody yielded the fastest RTs in strong incongruent contexts.

| Context | Prosody | Proportion of Ironic Response ||
|---|---|---|
| Strong Incongruent | Ironic | 96.64% |
| Strong Incongruent | Neutral | 90.98% |
| Strong Incongruent | Sincere | 79.12% |
| Ambiguous | Ironic | 75.47% |
| Ambiguous | Neutral | 29.46% |
| Ambiguous | Sincere | 10.97% |

## Limitations

The study relies exclusively on behavioral responses (forced-choice judgments and reaction times) from a relatively homogeneous demographic of Chinese undergraduate learners of English, limiting generalizability to other L1-L2 pairings or spontaneous conversational dynamics. The target materials were restricted to short, highly stylized literal praise statements in fixed syntactic frames, excluding complex ironic forms like ironic compliments or sarcastic reprimands. Furthermore, the absence of real-time neural or ocular tracking measures restricts fine-grained conclusions regarding the exact temporal milliseconds at which contextual versus prosodic constraints are integrated.

## Why read this

Speech researchers and cognitive scientists studying pragmatics should read this paper to understand how bottom-up prosodic cues compensate for top-down contextual ambiguity during second-language speech perception. It offers rigorous empirical evidence supporting the Parallel Constraint Satisfaction Model over single-cue deterministic theories.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Designing computer-assisted language learning (CALL) software, pragmatic diagnostic tests, and synthetic speech generation systems for affective text-to-speech that model irony.

## Institutions / 機構

Nanjing University of Science and Technology

**Funding / 經費:** Ministry of Education Humanities and Social Sciences Research Youth Fund Project, Jiangsu Social Science Fund Youth Project, Research Project of Philosophy and Social Sciences in Higher Education of the Jiangsu Provincial Department of Education

## Related

- (link related pages by id as the wiki grows)
