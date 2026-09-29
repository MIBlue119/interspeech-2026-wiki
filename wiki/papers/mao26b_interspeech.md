---
id: mao26b_interspeech
category: phonetics-linguistics
institutions: ["Nanjing University of Science and Technology", "Johns Hopkins University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1702
pdf: https://www.isca-archive.org/interspeech_2026/mao26b_interspeech.pdf
---

# Age-Related Changes in Mandarin Lexical Tone Production: Acoustic Properties and Tonal Distinctiveness

*Zhongxuan Mao, Yan Feng, Chenyu Li*

[PDF](https://www.isca-archive.org/interspeech_2026/mao26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mao26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1702)

**Category:** `phonetics-linguistics`

**TL;DR** — Older Mandarin speakers exhibit compressed tonal spaces, contour flattening, and increased F0 variability during lexical tone production, resulting in an SVM classification accuracy drop to 84.50% (compared to 94.35% for younger speakers), with severe bidirectional T2↔T3 confusion.

## Key contributions

- Identifies gender-divergent F0 centralization across tones in Mandarin-speaking older adults, where older females show lowered F0 in T1-T3 and older males show elevated F0 in T4.
- Demonstrates contour flattening (t_slope) in T2, T3, and T4 across both genders, reflecting age-related decline in laryngeal and respiratory control of dynamic F0 movements.
- Quantifies tonal distinctiveness decline using Bhattacharyya distance, revealing that the T2-T3 pair suffers the most dramatic degradation (dropping 84.5% in females and 70.3% in males).
- Uses radial basis function SVM classification on 16,847 tokens to prove that older speaker errors concentrate heavily on bidirectional T2↔T3 misclassifications (36.47% total confusion).
- Reveals a shift in SVM feature importance where duration and F0 variability (t_SD) become significantly more prominent for older speakers, pointing to compensatory temporal extension.

## Problem

While age-related speech changes are well-documented in non-tonal languages like English (showing increased F0 variability and 20-25% longer syllable duration), how aging affects lexical tone production in tonal languages such as Mandarin remains underexplored. In Mandarin, fundamental frequency is not merely intonational but carries primary linguistic meaning via four distinct lexical tones (T1-T4). As China's population ages rapidly—with over 224 million citizens aged 65 and above—the intersection of laryngeal aging, auditory-motor integration breakdown, and tone production presents critical challenges for speech technology and clinical assessment.

## Method

The study analyzes 16,847 valid spoken tokens from 78 native Mandarin speakers split into a younger group (18-30 years, N=36) and an older group (55-77 years, N=42). Participants read 236 syllables covering all four lexical tones in isolation via high-fidelity equipment (Neumann U87 microphone sampled at 44.1 kHz). Fundamental frequency contours were extracted via Praat and converted to speaker-normalized T-values.

Seven acoustic parameters were derived: pitch height (t_mean), pitch slope (t_slope), pitch standard deviation (t_SD), pitch range (t_range), onset (t_onset), offset (t_offset), and syllable duration. To answer research question one, linear mixed-effects models (lme4/lmerTest) were fitted with Group, Tone, and Gender as fixed effects, and trial and subject as random intercepts, using FDR-corrected post hoc comparisons. To answer research question two, distributional separation was quantified using Bhattacharyya distance (BD) across six tone pairs, and acoustic separability was evaluated using a radial basis function (RBF) kernel SVM with 10-fold cross-validation.

Feature importance was determined via permutation importance (100 repetitions per feature). RBF SVM was chosen to capture nonlinear decision boundaries among correlated acoustic cues, and speaker-normalized T-values were utilized to mitigate inter-speaker physiological variations.

## Experimental setup

Datasets comprised 18,408 total recorded tokens from 78 speakers producing 236 syllables across 4 lexical tones (yielding 16,847 valid tokens after filtering). The study compared younger adults (mean age 22.35) against community-dwelling older adults (mean age 66.30) with normal hearing or mild hearing loss (≤40 dB HL) and normal-to-mildly-decline cognitive scores (MoCA mean 26.00). Evaluation metrics included linear mixed-effects coefficient significance, Bhattacharyya distance, RBF SVM classification accuracy, confusion matrices, and permutation feature importance. Notable implementation details include Praat-based F0 extraction, speaker-normalized T-values, and lme4/emmeans in R.

## Results

Younger speakers achieved an overall SVM classification accuracy of 94.35% (SD = 0.89%), whereas older speakers achieved 84.50% (SD = 1.14%). In older speakers, T1 and T4 recognition remained relatively high (90.30% and 90.82%), while T3 (71.27%) and T2 (79.58%) experienced severe degradation. Dominant misclassifications in older adults were bidirectional T2↔T3 errors totaling 36.47% (T3→T2 at 20.05% and T2→T3 at 16.42%), compared to <5.46% for other pairs. Bhattacharyya distance metrics dropped precipitously for key pairs, most notably T2-T3 (females: 2.13 to 0.33, -84.5%; males: 1.35 to 0.40, -70.3%). Feature importance analysis showed duration and F0 variability increased in importance for older speakers (both Δ = +0.05), while offset and range decreased in importance (Δ = -0.08 and -0.05).

| System / Condition | Accuracy (%) | T1 Rec (%) | T2 Rec (%) | T3 Rec (%) | T4 Rec (%) | T2↔T3 Conf (%) |
|---|---|---|---|---|---|---|
| Younger Speakers | 94.35 | 97.88 | 94.27 | 94.56 | 94.27 | 7.63 |
| Older Speakers | 84.50 | 90.30 | 79.58 | 71.27 | 90.82 | 36.47 |

## Limitations

The study scope is constrained by evaluating isolated syllables read from a character list rather than continuous, spontaneous conversational speech, which may elicit different coarticulatory and durational patterns. Voice quality parameters—specifically creaky voice, which heavily interacts with low F0 realizations in Mandarin tone 3—were not directly measured or controlled. The older participant cohort was restricted to community-dwelling adults aged 55-77 in Nanjing with normal or mild hearing loss, limiting generalizability to very advanced age cohorts (80+) or individuals with severe hearing and cognitive impairments.

## Why read this

Speech and ML engineers building automatic speech recognition (ASR) or clinical voice diagnostic tools for aging populations will learn why standard models fail on older speakers. It provides concrete empirical evidence that tonal confusability is heavily concentrated in the T2-T3 contrast due to acoustic compression and motor control decline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Age-adaptive automatic speech recognition (ASR) systems for elderly populations and clinical speech therapy/assessment tools targeting early laryngeal motor deterioration via tone production tasks.

## Institutions / 機構

Nanjing University of Science and Technology, Johns Hopkins University

**Funding / 經費:** Ministry of Education of China

## Related

- (link related pages by id as the wiki grows)
