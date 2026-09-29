---
id: ross26b_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2411
pdf: https://www.isca-archive.org/interspeech_2026/ross26b_interspeech.pdf
---

# Sexualised Synthetic Personas Encode and Amplify Gendered Power Asymmetries through Voice

*Alice Ross, Ariadna Sanchez, Elin Kanhov, Catherine Lai, Éva Székely*

[PDF](https://www.isca-archive.org/interspeech_2026/ross26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ross26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2411)

**Category:** `tts`

**TL;DR** — A listening experiment evaluating commercial sexualised text-to-speech personas reveals that female-coded voices are disproportionately perceived as submissive and sexualised, whereas male-coded voices are associated with dominance and positive traits.

## Key contributions

- Evaluated how commercial, prompt-generated synthetic voice personas encode gendered power asymmetries using a diverse listener pool (N=120) across distinct demographic and orientation groups.
- Combined quantitative adjective selection from a controlled 36-word taxonomy, qualitative free-text comments, and acoustic measurements (F0, speaking rate).
- Isolated linguistic content effects by pairing sexualised and informative (Rainbow Passage) texts with identical voice personas.
- Demonstrated that female sexualised voice personas evoke stereotyped, sexualised, and submissive descriptors regardless of the underlying text content.

## Problem

While text-to-speech technology has evolved from utilitarian virtual assistants to customisable, emotional, and intimate commercial voice personas, public platforms like ElevenLabs continue to rely on gendered tropes. Prior work has examined algorithmic bias in word embeddings and image generation, but little research investigates how AI-generated voices encode and amplify heteronormative and gendered power asymmetries. Understanding these perceptions is crucial as conversational and companion AI systems become ubiquitous.

## Method

The study utilized stimuli generated via ElevenLabs' Voice Library using prompt-configured personas categorized under sexualised (flirt, flirty, temptress) and non-sexualised (informative, presenter, educational) styles, balanced equally between male and female gender codings. The stimulus set comprised 6 sexualised voices evaluated against both sexualised scripts and informative excerpts (modified Rainbow Passage), alongside 6 non-sexualised baseline voices evaluated exclusively on informative texts.

Participants completed a 30-trial listening experiment on a web interface built with jsPsych. In each trial, they listened to an audio sample and selected three descriptors from a 36-adjective taxonomy divided evenly into positive, negative, dominant, submissive, and sexual categories, followed by optional free-text comments. Acoustic analysis measured mean F0 (showing sexualised male voices averaging 70.08 Hz vs. 110.88 Hz for informative ones, while female voices remained around 204.73–211.43 Hz) and speaking rate (syllables per second, showing sexualised voices were universally slower at 2.4 vs. 3.8 for informative styles).

## Experimental setup

The experiment evaluated 12 unique voice personas (6 male, 6 female) across 30 randomized trials per participant. 120 North American participants recruited via Prolific were divided into four groups based on gender and sexual attraction: women attracted to women (N=40), women attracted to men (N=21), men attracted to men (N=34), and men attracted to women (N=25). Data was analyzed using generalized linear mixed-effects regression models implemented via lme4 in R with participant ID as a random effect.

## Results

Across the entire dataset, male-coded voices were significantly more frequently ascribed dominant (p < 0.001) and positive (p = 0.0027) adjectives, while female-coded voices were predominantly characterized as submissive (p < 0.001) and sexualised (p < 0.001). When text content was shifted from sexualised scripts to informative passages, the proportion of sexualised adjectives applied to male voices dropped sharply (from 46% down to 18%), whereas for female voices, the drop was much smaller (from 57% down to 36%), indicating that listener perceptions of female personas are heavily driven by intrinsic prosodic and paralinguistic cues (such as breathiness and sighs specified in prompts). Group 4 participants (men attracted to women only) were significantly more likely to apply sexualised adjectives to sexualised female voices (p = 0.0088) and less likely to apply negative adjectives to them compared to other groups.

| System / Voice Condition | Positive (%) | Dominant (%) | Submissive (%) | Sexualised (%) | Negative (%) |
|---|---|---|---|---|---|
| Female Sexualised Voices (Sexualised Text) | Low | Low | High | 57.0 | Moderate |
| Female Sexualised Voices (Informative Text) | Low | Low | Moderate | 36.0 | Moderate |
| Male Sexualised Voices (Sexualised Text) | High | High | Low | 46.0 | Moderate |
| Male Sexualised Voices (Informative Text) | High | High | Low | 18.0 | Moderate |

## Limitations

The study is limited to English-speaking participants from the United States and Canada, evaluating a specific set of commercial voices from a single platform (ElevenLabs) at a particular snapshot in time. The adjective taxonomy, while minimizing scale interpretation bias, constrains participants to predefined categories alongside optional free text. The investigation focuses primarily on binary male and female gender codings, reflecting the current limitations of default commercial prompt structures.

## Why read this

Speech and ML researchers building emotional or conversational text-to-speech agents should read this paper to understand how default commercial prompting strategies and acoustic styling inadvertently encode outdated gender stereotypes and power asymmetries. It provides concrete empirical evidence that listener perceptions of synthetic voices depend heavily on interactive gender coding rather than linguistic content alone.

## Code

- https://ariadnasc.github.io/synth-personas

## Applications

Guidance for ethical design and auditing of generative text-to-speech platforms, conversational agents, and AI companion systems to prevent the reinforcement of harmful gender stereotypes.

## Institutions / 機構

University of Edinburgh, KTH Royal Institute of Technology

**Funding / 經費:** UK Research and Innovation, Swedish Research Council

## Related

- (link related pages by id as the wiki grows)
