---
id: wang26z_interspeech
category: phonetics-linguistics
labels: [multilingual]
institutions: ["Peking University"]
code: https://github.com/wbh-XC/Interspeech2026
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1602
pdf: https://www.isca-archive.org/interspeech_2026/wang26z_interspeech.pdf
---

# Categorical Perception of Mandarin Tones in Jingpo Native Speakers

*Binghao Wang, Xinyuan Li, Yao Lu*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26z_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26z_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1602)

**Category:** `phonetics-linguistics` · **Labels:** `multilingual`

**TL;DR** — This study investigates the categorical perception of Mandarin tones by native Jingpo speakers using 12 synthesized tone continua, discovering that Jingpo speakers exhibit categorical perception for most tone pairs except T2-T3, which is perceived continuously. Compared to native Mandarin speakers, Jingpo participants display significantly weaker categorical perception across several tone contrasts.

## Key contributions

- Conducted a comprehensive phonetic experiment evaluating categorical perception (CP) of all four Mandarin tones among native Jingpo speakers using 12 synthesized tone continua.
- Demonstrated that native Jingpo speakers lack categorical perception specifically for the Mandarin T2-T3 continuum, unlike native Mandarin speakers.
- Revealed that Jingpo speakers have significantly wider categorical boundaries (Wcb) and smaller discrimination peakness (Ppk) than native Mandarin speakers for multiple tone pairs (T1-T4, T2-T4, T3-T4).
- Provided empirical validation for the Perceptual Assimilation Model (PAM) by showing how L1 tone inventory constraints (specifically the lack of falling-rising tones) shape L2 tone perception.

## Problem

As ethnic minority speakers learn Mandarin as a second language (L2), the interaction between their native (L1) tone system and Mandarin tones remains poorly understood. Prior studies have heavily focused on major languages or specific language pairs, leaving minority languages like Jingpo underexplored. According to the Perceptual Assimilation Model (PAM), L2 sounds are perceived relative to native categories, where missing L1 structural equivalents—such as falling-rising tone contours—can lead to single-category assimilation or continuous perception failures, making it vital to study how L1 phonology constrains L2 tone categorization.

## Method

The study utilized 12 synthesized tone continua based on four Mandarin source characters ([ta55] for T1, [ta35] for T2, [ta214] for T3, and [ta51] for T4) recorded by a 35-year-old female native speaker at 44.1 kHz with 16-bit depth (approx. 500 ms duration). Continuas were generated using the PSOLA (Pitch Synchronous Overlap and Add) method, incrementally modifying F0 contours 10 times in both forward and reverse directions between endpoint pairs across 6 tone contrasts (T1-T2, T1-T3, T1-T4, T2-T3, T2-T4, T3-T4), yielding 11 stimuli per continuum (132 total stimuli).

Participants completed two main tasks implemented via E-Prime 2.0: an identification task involving 264 responses where participants chose between two Chinese characters per continuum within a 5-second window, and an AX discrimination task involving 648 total judgments per subject with a 500-ms interstimulus interval and 2-step different pairs (forward and backward). Data analysis fitted binary logistic regression models to compute categorical boundary locations (xcb) and boundary widths (Wcb), alongside linear mixed-effects models and Tukey HSD post-hoc tests to evaluate discrimination curve peakedness (Ppk). Three standard criteria were enforced to verify categorical perception: a clear xcb, a discrimination peak, and alignment between the peak and xcb.

## Experimental setup

The experiment evaluated 27 native Jingpo speakers (12 male, 15 female, aged 16-47) from Yunnan Province with Level 2-B Mandarin proficiency, and 23 native Mandarin speakers (10 male, 13 female, aged 18-30) from northern China as controls. Metrics included categorical boundary location (xcb), boundary width (Wcb), and discrimination curve peakedness (Ppk). Statistical evaluations were carried out using independent-samples T-tests and linear mixed-effects models in R 4.5.2, with a missing trial rate of only 2% excluded from final analyses.

## Results

For the T1-T2 and T1-T3 tone continua, Jingpo participants exhibited sharp discrimination peaks and no significant differences in Wcb or Ppk compared to native Mandarin speakers (p > .05), except for a slightly larger Wcb when T1 served as the source for T1-T3 (p = .012). Conversely, for the T1-T4, T2-T4, and T3-T4 continua, Jingpo participants demonstrated significantly smaller discrimination peakness (Ppk) and larger boundary widths (Wcb) than Mandarin controls (e.g., T1-T4 Ppk values around 17.9%-22.5% vs. 31.6%-33.9% for Mandarin). 

On the T2-T3 continuum, Jingpo speakers failed to show a clear discrimination peak or categorical boundary, exhibiting overlapping subsets in post-hoc tests and a significantly larger boundary width (Wcb = 3.38 with T2 source) and lower peakedness, matching continuous rather than categorical perception. This deficit is attributed to the absence of falling-rising tones in the Jingpo inventory, causing both T2 and T3 to map ambiguously onto existing L1 categories.

| Tone Contrast | Source | xcb (Jingpo) | xcb (Mandarin) | Ppk (Jingpo) | Ppk (Mandarin) | Wcb (Jingpo) | Wcb (Mandarin) |
|---|---|---|---|---|---|---|---|
| T1-T2 | T1 | 4.65 | 4.59 | 20.67% | 28.95% | 1.67 | 1.19 |
| T1-T3 | T1 | 4.63 | 4.50 | 24.13% | 22.06% | 1.69 | 0.92 |
| T1-T4 | T1 | 4.17 | 3.32 | 22.46% | 33.89% | 1.35 | 0.89 |
| T2-T3 | T2 | 6.41 | 7.68 | 0.76% | 5.68% | 3.38 | 1.90 |
| T2-T4 | T2 | 5.87 | 5.69 | 18.74% | 31.97% | 1.82 | 0.60 |
| T3-T4 | T3 | 5.72 | 5.28 | 9.91% | 31.52% | 1.31 | 0.80 |

## Limitations

The study is limited by its exclusive focus on native Jingpo speakers from a single geographic region (Dehong Prefecture) with uniform intermediate-low (Level 2-B) Mandarin proficiency, restricting generalizability across different L2 proficiency levels. Furthermore, the reliance on synthesized laboratory stimuli (PSOLA manipulation of a single female speaker's voice) limits ecological validity compared to natural, multi-speaker conversational speech. The sample size of 27 minority speakers, while standard for phonetics experiments, leaves room for broader demographic validation across age and dialectal sub-varieties.

## Why read this

Phoneticians and speech researchers studying cross-linguistic speech perception and second-language phonology should read this paper to understand how specific L1 inventory gaps (such as the absence of falling-rising tones) drive continuous versus categorical perception in L2 tonal acquisition. It provides concrete statistical benchmarks using PSOLA continua to test the predictive power of the Perceptual Assimilation Model on minority language speakers.

## Code

- https://github.com/wbh-XC/Interspeech2026

## Applications

Designing targeted second-language pronunciation training systems and accent-reduction curricula for ethnic minority Mandarin learners.

## Institutions / 機構

Peking University

**Funding / 經費:** National Social Science Fund of China

## Related

- (link related pages by id as the wiki grows)
