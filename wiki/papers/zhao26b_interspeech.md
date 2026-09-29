---
id: zhao26b_interspeech
category: phonetics-linguistics
institutions: ["Shanghai Jiao Tong University", "National Research Center for Language and Well-being", "Tongji University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-255
pdf: https://www.isca-archive.org/interspeech_2026/zhao26b_interspeech.pdf
---

# F0 realization of prosodic focus across adulthood in Jianghuai Mandarin

*Xinxian Zhao, Xiaohu Yang*

[PDF](https://www.isca-archive.org/interspeech_2026/zhao26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhao26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-255)

**Category:** `phonetics-linguistics`

**TL;DR** — This study investigates age-related variation in the F0 realization of prosodic focus across adulthood in Jianghuai Mandarin, demonstrating that the global tri-zone F0 pattern is preserved across age groups while fine-grained post-focus compression (PFC) is significantly enhanced in older speakers.

## Key contributions

- Establishes Jianghuai Mandarin as a canonical '+PFC' language exhibiting the tri-zone F0 pattern (on-focus raising, post-focus compression, and pre-focus stability) across adulthood.
- Reveals that global F0 patterning and F0 excursion are robustly preserved across young, middle-aged, and older adult speakers.
- Uncovers age-sensitive fine-grained F0 adjustments, showing that older speakers exhibit significantly greater post-focus mean F0 compression than younger and middle-aged adults.
- Provides acoustic datasets and linear mixed-effects (LME) modeling analyses tracking lifespan trajectories of prosodic focus production using 1,200 controlled utterances.

## Problem

While fundamental frequency (F0) modulation is known to signal prosodic focus, prior research has predominantly focused on young adults, leaving the impact of adult vocal aging on focus realization poorly understood. Furthermore, languages and regional dialects vary widely in whether they exhibit post-focus compression (PFC), and Jianghuai Mandarin—spoken by over 70 million people—has lacked empirical investigation regarding its focus-related F0 typology. Understanding whether age-related physiological degeneration alters or preserves speakers' command over prosodic structures is critical for both theoretical linguistics and speech technology applications.

## Method

The study utilized a production task with a Subject-Adverbial-Verb-Object (SAVO) sentence structure across five answer frames representing the five lexical tones of Jianghuai Mandarin. Four elicitation question types elicited neutral focus (NF) and three narrow focus conditions: initial focus (IF, subject), medial focus (MF, adverbial), and final focus (FF, object). Speech signals were recorded at 22.05 kHz using xRecorder, annotated in Praat via ProsodyPro by extracting nine equally spaced points per syllable, and converted from Hz to semitones using sex-specific references (Fr = 64 Hz for females, 55 Hz for males).

Dependent variables included mean F0 and F0 excursion (maximum minus minimum F0) for key constituents, alongside narrow-minus-neutral focus difference scores to capture fine-grained F0 adjustment. Statistical evaluations employed linear mixed-effect (LME) models in R with Group, Constituent, and Focus (or Focus Contrast) as fixed effects, and Participant as a random intercept, utilizing Bonferroni-corrected pairwise comparisons to test specific hypotheses about aging and regional intonation patterns.

## Experimental setup

Sixty healthy native speakers of Jianghuai Mandarin divided evenly into three gender-matched age groups: young (20–30 years), middle-aged (40–50 years), and older (60–70 years), with 20 participants (10 females) per group. A total of 1,200 recordings (60 participants × 20 prompt questions: 4 question types × 5 lexical tone frames) were analyzed. The primary metrics were mean F0, F0 excursion, and narrow-minus-neutral difference scores evaluated via LME models.

## Results

LME models confirmed significant main effects of Constituent and Focus, showing that Jianghuai Mandarin universally employs the canonical tri-zone F0 pattern: on-focus mean F0 increased significantly (e.g., Subject in IF: higher by p < .001), post-focus mean F0 decreased significantly, and pre-focus regions remained unchanged. F0 excursion mirrored this, showing larger excursions in on-focus and smaller excursions in post-focus regions.

For fine-grained F0 adjustment, older adults demonstrated significantly more negative mean F0 differences (enhanced PFC) in post-focus regions compared to young and middle-aged groups, specifically in the Adverbial and Object during IF vs. NF contrasts (p < .001 and p < .01) and in the Object during MF vs. NF contrasts (p < .001). Conversely, F0 excursion differences showed no significant group main effects, indicating that age-related modulation is localized specifically to mean F0 post-focus compression rather than global excursion metrics.

## Limitations

The study is limited by its moderate sample size per age-gender cohort and does not treat gender as a primary between-subject variable due to participant pool constraints. The analysis relies solely on acoustic F0 measurements without incorporating duration, intensity cues, or subjective speech intelligibility evaluations. Additionally, the scope is restricted to read speech elicited via prompt questions in a controlled laboratory environment rather than natural conversational dialogue.

## Why read this

Speech scientists and phoneticians should read this paper to understand how structural intonational invariants interact with physiological aging in tone languages. It offers critical empirical baseline data for modeling prosodic control, speaker normalization, and expressive text-to-speech synthesis across diverse adult age groups.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Development of age-robust text-to-speech (TTS) systems, clinical speech assessment tools for evaluating vocal aging and prosodic control, and automated speaker state monitoring.

## Institutions / 機構

Shanghai Jiao Tong University, National Research Center for Language and Well-being, Tongji University

**Funding / 經費:** China Postdoctoral Science Foundation

## Related

- (link related pages by id as the wiki grows)
