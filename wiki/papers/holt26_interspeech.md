---
id: holt26_interspeech
category: phonetics-linguistics
institutions: ["Macquarie University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3053
pdf: https://www.isca-archive.org/interspeech_2026/holt26_interspeech.pdf
---

# Talker Discrimination and Identification in 7-12-year-old Children: Effects of Talker Gender and Phonological Ability

*Rebecca Holt, Parisa McGirr, Chi Yhun Lo, Anita Szakay*

[PDF](https://www.isca-archive.org/interspeech_2026/holt26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/holt26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3053)

**Category:** `phonetics-linguistics`

**TL;DR** — This study investigates talker discrimination and identification in 7-12-year-old typically-developing children, finding that phonological working memory predicts talker identification accuracy but not discrimination.

## Key contributions

- Evaluated child talker processing across male-female, female-female, and male-male talker pairs, showing equal performance for same-gender pairs.
- Demonstrated a moderate-to-strong correlation between talker discrimination and talker identification skills in children.
- Validated a novel, child-friendly modified ABX identification paradigm with reduced time and memory demands.
- Found that phonological working memory (measured via nonword repetition) significantly predicts talker identification accuracy, whereas phonological awareness does not.

## Problem

Processing talker variability is critical for speech comprehension and socialisation, yet little is known about how typically-developing children process different gender pairings (particularly male-male pairs) or how these skills relate to phonological abilities. Prior research lacks combined evaluations of discrimination and identification within the same pediatric cohorts, which is a necessary baseline for understanding communication difficulties in clinical populations like children with Developmental Language Disorder or who are hard of hearing.

## Method

The study evaluated 29 native English-speaking children aged 7-12 using remote online experiments via the Gorilla Experiment Builder. The stimulus set comprised sentences recorded by 16 native Australian English adults (8 male, 8 female) speaking in a child-directed manner, normalized to 70 dB in Praat. The talker discrimination task utilized an AX paradigm with 40 test trials assessing same-talker and different-talker pairs (M-F, F-F, M-M). The talker identification task used a modified ABX paradigm with 24 test trials, where children heard introductions from two talkers followed by a target sentence and answered a comprehension question to map the voice to the identity. Phonological skills were assessed via Zoom using the CTOPP-2 Elision subtest (phonological awareness) and Nonword Repetition subtest (phonological working memory).

Statistical analyses were conducted in R using mixed-effects logistic regression models via the lme4 package. Trial-level accuracy served as the dependent variable with a binomial link function. Fixed effects included talker pair type, elision, and nonword repetition (all z-scored), with age as a covariate. Random intercepts were included for participants, alongside random slopes for target talkers in the identification model to account for baseline voice identifiability differences. Pearson correlations were computed between discrimination and identification on same-gender trials.

## Experimental setup

The study analyzed 29 typically-developing native English-speaking children (mean age 10 years 7 months, SD 1 year 7 months; 16 male, 13 female) recruited online. Measures included d' sensitivity for discrimination and binomial accuracy for identification, alongside CTOPP-2 standardized scores. Models evaluated age, elision, nonword repetition, and pair type effects.

## Results

Accuracy for both talker discrimination and identification was significantly higher for mixed-gender (M-F) trials compared to same-gender trials (p < .001), with no significant difference between female-female (F-F) and male-male (M-M) pairings (p = .616 and p = .702, respectively). Nonword repetition significantly predicted identification accuracy (β = 0.274, z = 2.689, p = .007), whereas elision (p = .986) and age (p = .741) did not. Neither phonological measure predicted discrimination performance (p > .5). A moderate-to-strong correlation was observed between same-gender discrimination and identification accuracy (r = 0.44, p = .03).

| Task | Condition / Predictor | Metric | Statistical Result |
|---|---|---|---|
| Discrimination | M-F vs F-F Pairs | Accuracy / d' | β = -2.483, p < .001 |
| Discrimination | M-F vs M-M Pairs | Accuracy / d' | β = -2.643, p < .001 |
| Identification | M-F vs F-F Pairs | Accuracy | β = -2.050, p < .001 |
| Identification | Nonword Repetition | Accuracy | β = 0.274, p = .007 |
| Correlation | Same-Gender Trials | Pearson r | r = 0.44, p = .03 |

## Limitations

The sample size is relatively small (n = 29), and data were collected remotely in uncontrolled acoustic home environments rather than sound-attenuated laboratory booths. The findings are restricted to native English-speaking children and do not yet evaluate clinical speech disorder populations directly.

## Why read this

Speech researchers and developmental psychologists should read this to understand the cognitive dissociation between talker discrimination and identification in children, and how phonological working memory selectively scaffolds talker identification.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Assessment design for clinical speech-language pathology, screening tools for developmental language disorders, and pediatric auditory training paradigms.

## Institutions / 機構

Macquarie University

**Funding / 經費:** Macquarie University, Australian Linguistic Society

## Related

- [Learning speaker identities in dialogue: Conversational familiarisation modulates response bias and confidence in voice recognition](xu26m_interspeech.md) — same problem · relatedness 1.7/3
- [SayCheck: Gamified Speech Practice and Attribute-Based Speech Analysis for Children](shahin26_interspeech.md) — complementary · relatedness 1.6/3
- [Is Speaker Identity a Unitary Construct? Neural Evidence for Distinct Trait Processing](wang26r_interspeech.md) — same problem · relatedness 1.6/3
- [PhonLLM: Joint Phone Recognition and Phonological Process Inference for Child Speech](baumann26_interspeech.md) — same problem · relatedness 1.5/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
