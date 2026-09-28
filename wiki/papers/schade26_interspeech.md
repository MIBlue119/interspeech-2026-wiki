---
id: schade26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2247
pdf: https://www.isca-archive.org/interspeech_2026/schade26_interspeech.pdf
---

# Naming Heroes and Villains – The Influence of Phonaesthetics

*Leonie Schade, Daniel Duran, Florian Kankowski, Joana Cholin, Petra Wagner, Christine Mooshammer*

[PDF](https://www.isca-archive.org/interspeech_2026/schade26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/schade26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2247)

**TL;DR** — This study investigates how phonaesthetics and sound symbolism govern human-crafted names for fictional heroes and villains in German, revealing a systematic preference for high-sonority syllables for heroes and low-sonority syllables combined with alternating profiles for villains. Findings demonstrate that speakers reliably exploit sonority indices to encode character alignment, though gender effects did not reach statistical significance in syllable selection.

## Key contributions

- Evaluated how lay speakers apply phonaesthetic principles (sonority, nucleus length, CV-complexity) when inventing names for fictional heroes and villains.
- Generated and rated a standardized benchmark set of 6 character images (varying across good/evil and male/female/androgynous axes) using the Flux image generation demo and JATOS/jsPsych.
- Formulated Generalized Linear Mixed Effects Models (GLMERs) demonstrating significant predictive power of character alignment (hero vs. villain) and cross-syllable interactions on selected sonority indices.
- Discovered that villain naming frequently employs contrasting, alternating sonority profiles (e.g., low-sonority short vowel paired with high-sonority long vowel syllables) rather than uniformly harsh segments.

## Problem

While phonaesthetic design principles are well-documented in established constructed languages (conlangs) like Tolkien's Quenya and Orkish, and observational studies exist on Disney or Pokémon characters, it remains unclear how these sound-symbolic associations generalize when everyday speakers actively invent novel names. Prior literature established that voiced obstruents, high sonority, and vowels signal pleasantness and goodness, while complex syllables and low sonority evoke harshness and evil. However, cross-linguistic and cross-cultural generalizability, particularly regarding how speakers combine phonological building blocks under controlled experimental conditions, has lacked rigorous quantitative evaluation. Addressing this gap illuminates the cognitive foundations of linguistic creativity and sound symbolism.

## Method

The study utilized a two-part experimental design hosted via jsPsych and JATOS. Experiment I generated 45 images via the Flux Image Generation demo, which were rated by 28 participants across 1,257 valid trials on continuous 0-100 scales for goodness, gender, age, and likeability to isolate 6 canonical character archetypes (male, female, androgynous for both hero and villain categories). Experiment II involved 32 native German speakers paired into 16 dyads inside a sound booth with a transparent plastic divider. Participants were shown a character image and given a 2x2 matrix containing predefined canonical German syllables representing a factorial design of sonority (high SI > 10.5 vs. low SI < 8.5, calculated via phone-class sonority indices from 1 to 12) and nucleus length (short vowel V vs. long vowel/diphthong VV), plus CV-complexity variations. Participants selected two syllables sequentially to form a name.

Statistical evaluation was performed using Generalised Linear Mixed Effects Models (GLMERs) via the lme4 package in R, treating character type, gender, nucleus length, and sonority choices as fixed effects, and dyad, presented syllable combinations, and character images as random effects. Model fit was evaluated using AIC and conditional/marginal R-squared values, alongside estimated marginal means (EMMs) for pairwise comparisons.

## Experimental setup

The dataset comprised 45 generated images rated in Experiment I (yielding 1,257 valid ratings across 28 participants) and a final subset of 6 targeted character images used in Experiment II. Experiment II gathered data from 32 native German speakers (19 female, 12 male, 1 non-binary; aged 19-35 years, mean/median 25) organized into 16 dyads, yielding 96 trials and 192 total selected syllables. The primary metrics evaluated included phonological Sonority Index (SI) calculations, nucleus length distributions, CV-complexity classes, and GLMER model parameters (conditional R-squared up to 0.49). Implementation utilized jsPsych, JATOS, and R.

## Results

Across 96 trials (192 selected syllables), high sonority with short vowels (hi.V) accounted for 31.77% of selections, low sonority with short vowels (lo.V) for 30.21%, high sonority with long nuclei (hi.VV) for 25.52%, and low sonority with long nuclei (lo.VV) for 12.50%. The distribution of syllable bins differed significantly between heroes and villains (Chi-square p < 0.001), confirming a strong main effect of sonority where heroes favored high-sonority components (especially hi.V) and villains leaned heavily toward low-sonority segments (lo.V comprising 36.45% of villain choices). The best GLMER predicting the first selected syllable achieved a conditional R-squared of 0.44, revealing significant effects for character type (hero vs. villain, p = 0.003), second syllable sonority (p < 0.001), and an interaction between long nuclei and low sonority in the second syllable (p = 0.007). The best GLMER predicting the second syllable achieved a conditional R-squared of 0.49, showing significant effects of gender [female] (p = 0.023), character type (p = 0.001), first syllable sonority (p < 0.001), and an interaction between villain character and simple CV structure (p = 0.011). Notably, contrary to initial hypotheses, main gender effects across the three categories (male, female, androgynous) did not reach statistical significance in pairwise EMM comparisons.

| System / Condition | Primary Selection Trend | Dominant Syllable Bin | Model Conditional $R^2$ | Significant Factors ($p < 0.05$) |
|---|---|---|---|---|
| Hero Naming | High sonority preference | hi.V (40.62%) / hi.VV | 0.44 (Syllable 1) | Character type, Sonority 2 |
| Villain Naming | Low sonority & contrast | lo.V (36.45%) / lo.VV | 0.49 (Syllable 2) | Character type, Gender [female], Sonority 1 |
| Combined Dataset | Balanced vs. alternating | hi.V & lo.V (overall ~62%) | - | Interaction: Nucleus $\times$ Sonority |

## Limitations

The study is scoped exclusively to native German speakers, limiting cross-linguistic and cross-cultural generalizability given that phonotactic inventories and sound-symbolic mappings vary globally. The participant pool was constrained to 32 young adults (ages 19–35), which restricts demographic diversity. Furthermore, models attempting to predict fine-grained nucleus length and CV-complexity failed to converge or yielded singular fits, indicating that these features require larger sample sizes or alternative parametrizations to isolate cleanly.

## Why read this

Speech and ML researchers studying sound symbolism, linguistic creativity, or controllable text-to-speech naming generation should read this to understand how humans map phonological sonority profiles to personality archetypes. It provides concrete statistical models and experimental paradigms for decoupling sonority, nucleus length, and structural complexity in phonosemantic research.

## Code

- https://osf.io/gtajk

## Applications

Automated character naming in video game generation, fantasy text-to-speech style adaptation, and expressive speech synthesis systems requiring emotionally or perceptually aligned pseudowords.

## Related

- (link related pages by id as the wiki grows)
