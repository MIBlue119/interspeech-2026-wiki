---
id: tran26b_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3213
pdf: https://www.isca-archive.org/interspeech_2026/tran26b_interspeech.pdf
---

# Measuring English and Vietnamese language input and output in an Australian preschool – A longitudinal study

*Ha Chi Tran, Minh Anh Tran, Mai Linh Tran, Weicong Li, Paola Escudero*

[PDF](https://www.isca-archive.org/interspeech_2026/tran26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tran26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3213)

**TL;DR** — This paper presents a longitudinal quantitative analysis of language input and output in a bilingual (English-Vietnamese) preschool program in Melbourne, Australia, comparing two implementation years across 30 children using manual Praat annotations and Bayesian regression. The study finds that children's total speech output more than doubled from the first implementation (10.9%) to the second (25.3%), driven by returning participants and greater overall engagement, though English remained the dominant language.

## Key contributions

- Evaluates a longitudinal heritage language (HL) exposure program for preschoolers (ages 3-5) comparing year-over-year participation dynamics across 30 children (13 HL, 17 additional language learners).
- Establishes a refined quantitative annotation methodology using Praat and MATLAB scripts to measure exact speech durations for facilitators and children in both English and Vietnamese.
- Applies Bayesian regression modeling with informative priors to test hypotheses on shifts in English and Vietnamese input and output across implementation years.
- Quantifies a dramatic shift in the input-to-output ratio, dropping from 8.17:1 in implementation 1 to 2.94:1 in implementation 2, indicating significantly higher child engagement.

## Problem

Maintaining heritage languages (HL) outside the home in early childhood education settings is severely underresearched in Australia, risking subtractive bilingualism where majority languages completely overshadow heritage tongues. Prior measurement techniques rely heavily on indirect parental questionnaires (e.g., Q-BEx) or daylong automated recordings (e.g., LENA), which lack fine-grained conversational context and manual validation of actual educator-child verbal interactions. Understanding the exact balance of input and output in structured multilingual preschool programs is vital for designing effective early childhood intervention frameworks that foster bilingualism.

## Method

The study analyzes audio recordings collected via Zoom from a 45-minute structured Vietnamese language program conducted twice weekly across three terms (Term 1: 11 weeks, Term 2: 9 weeks, Term 3: 10 weeks). Each term focused on thematic units (e.g., Fruits and Colours, Farm Animals and Numbers, Space and the Universe) covering five linguistic outcomes: vocabulary, listening, speaking, literacy, and numeracy. Eight audio-visual segments per implementation year—comprising two 10-minute segments and six 5-minute segments—were manually annotated using Praat by a native Vietnamese speaker fluent in English to mark the exact start and end boundaries of facilitator and preschooler speech in English or Vietnamese.

Extracted intervals were processed via MATLAB scripts to calculate speech durations. Statistical evaluation utilized Bayesian regression models implemented in RStudio via the brms package, treating speech duration in seconds as the dependent variable and implementation year (IMP-1 vs. IMP-2) and speaker role (children vs. facilitator) as categorical independent variables. Bayesian methods were chosen to leverage informative priors, cumulative meta-analytic knowledge, and credible intervals to explicitly handle uncertainty given the limited sample size.

## Experimental setup

The dataset consists of speech recordings from 30 children aged 3 to 5 years (13 Vietnamese HL children, 17 additional language learners) and a native Vietnamese facilitator during IMP-2 (2024), compared directly against 39 children from IMP-1 (2023). Language exposure background was collected via parent Qualtrics surveys. Metrics evaluated include total speech duration in seconds, relative language use percentages, facilitator-to-child speech ratios, and Bayesian evidence ratios for five specific directional hypotheses regarding speech increases/decreases across years.

## Results

Children's speech output accounted for 25.3% of total speech in IMP-2, a substantial increase compared to 10.9% reported for equivalent segments in IMP-1. The facilitator-to-child speech ratio improved from 8.17:1 in IMP-1 down to 2.94:1 in IMP-2, reflecting heightened child engagement and conversational participation. Bayesian hypothesis testing revealed very strong evidence that facilitator English input increased (Estimate = 46.4, 95% CI [26.0, 66.0]) and child English output increased (Estimate = 30.2, 95% CI [7.26, 53.0]), alongside very strong evidence that facilitator Vietnamese input decreased (Estimate = 84.6, 95% CI [57.4, 112.4]). Conversely, only moderate evidence supported an increase in children's Vietnamese output (Estimate = 13.4, 95% CI [-17.4, 45.1]), with English remaining the dominant language across both years due to the high proportion of additional language learners.

| System / Condition | Children Total Speech (%) | Facilitator Total Speech (%) | English/Vietnamese Input-Output Ratio | Dominant Language ||
|---|---|---|---|---|
| IMP-1 (2023) | 10.9% | 89.1% | 8.17 : 1 | English |
| IMP-2 (2024) | 25.3% | 74.7% | 2.94 : 1 | English |

## Limitations

The study analyzes children's speech as a single aggregated cohort rather than independently tracking heritage language versus additional language learner subgroups, which may mask distinct longitudinal language trajectory patterns. The investigation is limited to a single heritage language (Vietnamese) within one geographic region (Melbourne, Australia) across a restricted sample of 30 children. Furthermore, data relies on selected 5-minute and 10-minute segments rather than continuous end-to-end logging of all classroom hours.

## Why read this

Speech researchers and educational technologists studying early childhood bilingualism, language acquisition tracking, or human-child interaction dynamics should read this paper to understand how structured longitudinal exposure shifts input-output ratios. It provides a rigorous template for combining manual Praat acoustic segmentation with Bayesian regression analysis to quantify classroom language immersion.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Designing bilingual preschool curricula, automated classroom acoustic monitoring tools, and language intervention programs for heritage language preservation in early childhood education.

## Related

- (link related pages by id as the wiki grows)
