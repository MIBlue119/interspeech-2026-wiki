---
id: kiyama26_interspeech
category: phonetics-linguistics
labels: [streaming-real-time]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2907
pdf: https://www.isca-archive.org/interspeech_2026/kiyama26_interspeech.pdf
---

# Voice Onset Time Categorical Perception in Mandarin-Speaking People Who Stutter: A Zoom-In Nonword Study

*Yusuke Kiyama, Xiyu Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/kiyama26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kiyama26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2907)

**Category:** `phonetics-linguistics` · **Labels:** `streaming-real-time`

**TL;DR** — This study investigates voice onset time (VOT) categorical perception in Mandarin-speaking people who stutter (PWS) using a nonword velar stop continuum and a high-sensitivity zoom-in design. Findings reveal that while PWS possess intact basic categorical perception ability, they exhibit atypical real-time category access and faster within-category reaction times linked to stuttering severity, pointing to right-hemisphere compensatory processing.

## Key contributions

- Isolated phonemic perception from lexical processing by utilizing nonword stimuli (/ko/ to /k^h o/ continuum) rather than real words.
- Maximized task sensitivity without external noise via a 'zoom-in' design concentrating 10 stimuli around the native boundary location derived from preliminary probit analysis.
- Demonstrated that PWS show a trend-level rightward boundary shift and a lack of typical boundary-associated reaction time slowing during identification tasks.
- Uncovered a significant interaction in PWS where higher stuttering severity (%SS) correlates with faster within-category discrimination reaction times without sacrificing accuracy.

## Problem

Prior research examining voice onset time (VOT) categorical perception in people who stutter (PWS) yielded conflicting results, largely due to three main methodological gaps. First, almost all prior work utilized real words, which confounded low-level phonemic perception with higher-level lexical processing and top-down lexical facilitation. Second, studies used coarse 7-to-9-step continua, failing to detect subtle group differences unless external noise was added (which muddies low-level auditory versus phonological deficits). Third, prior high-difficulty studies omitted discrimination tasks, leaving the broader categorical profile incomplete. Resolving these gaps is critical to understanding whether speech fluency disorders stem purely from motor execution failures or extend to atypical sensorimotor integration and phonemic categorization.

## Method

The study utilized an 11-step preliminary VOT continuum synthesized from a male native Mandarin speaker's recording of /k^h o55/ normalized to 500 ms (4 ms burst, 90 ms aspiration varying 0–80 ms, 406 ms /o/ vowel). A preliminary experiment with 20 native speakers placed the category boundary at step 3.69, corresponding to z = 9.07 on a 31-step scale using the linear transformation zm = 3si - 2. For the main experiment, a 31-step continuum was synthesized, and the 10 tokens centered around z = 9.07 (z5 through z14) were selected as experimental items.

The experimental procedure involved three tasks: a letter decision task (pressing X or O for visual letters) to baseline basic motor response speed, an identification task where the 10 stimuli were presented 8 times each (80 trials total) in a 5-second window to judge /ko/ vs /k^h o/, and an AX discrimination task where stimulus pairs at 4, 5, and 6 step-size levels were judged as same or different across 120 total trials. Data analysis utilized probit analysis for identification boundaries/widths, signal detection theory (d-prime) for discrimination sensitivity, and linear mixed-effects (LMEs) models incorporating Group, Category, and Step as fixed effects with participant random intercepts, alongside exploratory LMEs evaluating stuttering severity (%SS) within the PWS group.

## Experimental setup

The experiment evaluated 22 Mandarin-speaking PWS (17 males, ages 18–32, M = 25.5) and 18 fluent controls (PWNS; 13 males, ages 20–35, M = 26.9), matched for age, education, and handedness, with normal hearing thresholds under 25 dB HL. Stuttering severity was quantified via the SSI-4 percentage of stuttered syllables (%SS), yielding good inter-rater reliability (ICC = 0.833). Four PWS participants were excluded from identification analysis based on boundary criteria, leaving 18 participants per group. Metrics included identification boundary position and width, d-prime sensitivity and reaction times (RT) for discrimination, and inverse efficiency scores (IES).

## Results

In the identification task, PWS showed a trend-level rightward boundary shift (PWS M = 8.64, SD = 1.84 vs PWNS M = 7.43, SD = 1.08; W = 222.00, p = 0.060, r = 0.37), requiring longer VOTs for aspirated consonants, while boundary widths did not significantly differ. Crucially, while control participants exhibited the standard categorical perception pattern of significantly slower reaction times near the category boundary (p < 0.0001), PWS showed an attenuated, non-significant difference between- and within-category RTs (p = 0.142). In the discrimination task, d-prime and RT scores showed no main effect of group. However, within the PWS group, a significant Severity × Category interaction emerged for RT (chi-squared(1) = 6.70, p = 0.010): higher stuttering severity (%SS) strongly correlated with shorter within-category reaction times (Figure 4), while inverse efficiency scores confirmed this speedup occurred without a loss of accuracy.

| System / Condition | Boundary Position (Step) | Identification RT Between (s) | Identification RT Within (s) | Discrimination d' | Letter Decision Accuracy |
|---|---|---|---|---|---|
| PWNS (Controls) | 7.43 ± 1.08 | ~1.65 | ~1.35 | -- | Higher (W=287.5, p=0.013) |
| PWS (Stuttering) | 8.64 ± 1.84 | ~1.50 | ~1.40 | Equivalent | Lower (Fragile Exec. Function) |

## Limitations

The study's sample size is relatively small (18 participants per group after exclusions), making within-group severity regressions exploratory. The scope is limited to Northern Mandarin velar stops (/ko/–/k^h o/), leaving generalization to other places of articulation (bilabials, alveolars), vowels, and lexical tones unconfirmed. Furthermore, the behavioral paradigm lacks direct neurophysiological recording (such as EEG or fMRI), limiting the empirical proof for hypothesized right-hemisphere compensation and left STG dysfunction.

## Why read this

Speech researchers and ML engineers studying sensorimotor integration or atypical speech processing should read this to understand how eliminating lexical confounds via nonword zoom-in designs exposes true phonemic access deficits rather than broad categorical perception failures in stuttering.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Diagnostic tool design for speech-language pathology, speech therapy monitoring systems, and speech recognition front-ends tailored for atypical speech patterns.

## Institutions / 機構

Peking University

**Funding / 經費:** National Social Science Fund of China, Beijing Social Science Foundation

## Related

- (link related pages by id as the wiki grows)
