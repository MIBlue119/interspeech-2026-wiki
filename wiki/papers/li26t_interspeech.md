---
id: li26t_interspeech
category: paralinguistics-emotion
labels: [robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1178
pdf: https://www.isca-archive.org/interspeech_2026/li26t_interspeech.pdf
---

# Hearing Smiles in the Crowd: How Babble Noise Shapes Smiled Speech Perception

*Rong Li, Esther Janse, Dirk Heylen, Khiet Truong*

[PDF](https://www.isca-archive.org/interspeech_2026/li26t_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26t_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1178)

**Category:** `paralinguistics-emotion` · **Labels:** `robustness-noise`

**TL;DR** — This paper investigates how multi-talker babble noise affects human auditory perception of amused versus mechanical spread-lip smiled speech. Increasing noise reduces perceptual sensitivity and triggers a systematic shift toward a more conservative decision strategy that downplays positive affect under uncertainty.

## Key contributions

- Evaluates human auditory perception of smiled speech across two distinct binary tasks: smile-like detection (smile vs. neutral) and smile-type categorization (amused vs. spread-lip).
- Analyzes the impact of multi-talker cafeteria babble noise across progressive Signal-to-Noise Ratios (Quiet, -3 dB, and -6 dB).
- Applies Signal Detection Theory (SDT) to isolate perceptual sensitivity (d') from decision bias (c), uncovering adaptive strategy shifts under acoustic uncertainty.
- Compares two balanced subsets from the AMuS corpus controlling for language, speaker gender, and speaker identity (English female vs. French male).

## Problem

Auditory smile perception has predominantly been studied under clean laboratory conditions, whereas real-world communications lack visual context and feature competing background babble. Prior work has not established how multi-talker babble degrades the perception of affective versus mechanical smiles or whether listeners adjust their decision strategies under uncertainty. Understanding this is crucial for evaluating and designing speech technologies intended for noisy real-world interactions.

## Method

The authors designed two binary forced-choice perceptual tasks using selected items from the AMuS corpus. Task 1 required listeners to distinguish smile-like speech (pooling amused and spread-lip styles) from neutral speech. Task 2 tested the categorization of smile-like speech into amused versus spread-lip classes. Clean speech waveforms were intensity-normalized to 70 dB using Praat and mixed with multi-talker cafeteria babble noise from NOISEX-92 (containing ~100 concurrent speakers, featuring 50 ms linear fade-ins and fade-outs) at three SNR conditions: Quiet, -3 dB, and -6 dB.

Stimuli were presented via web experiments to 38 English-fluent participants (for the English female speaker subset) and 37 French-fluent participants (for the French male speaker subset) recruited via Prolific. Strict screening was enforced using a McDermott Lab headphone check and embedded auditory attention checks. Trial-level generalized linear mixed-effects models (GLMMs) with binomial logit links and signal detection theory (SDT) metrics (d', decision criterion c, and AUC) were used to analyze accuracy, sensitivity, and bias variations across noise levels and categories.

## Experimental setup

Evaluated on subsets of the AMuS corpus featuring two speakers: Speaker B (French, male) and Speaker C (English, female). Tested on 75 total participants (38 English-fluent, 37 French-fluent). Metrics include GLMM log-odds estimates, Signal Detection Theory measures (d' sensitivity, c decision criterion), and Area Under the ROC Curve (AUC) with 95% confidence intervals.

## Results

In Task 1 (smile-like detection), classification accuracy and sensitivity d' declined systematically with noise, dropping from 1.87 in quiet to 1.00 at -3 dB and 0.58 at -6 dB, while the decision criterion c became increasingly conservative (0.09 -> 0.49 -> 0.69). AUC similarly dropped from 0.97 in quiet to 0.83 (-3 dB) and 0.73 (-6 dB). Amused speech was consistently recognized more accurately than spread-lip speech across all noise levels.

In Task 2 (smile-type categorization), a striking crossover interaction occurred: while amused speech was categorized with high accuracy in quiet, its accuracy plummeted under noise (-3 dB and -6 dB), whereas spread-lip accuracy paradoxically increased as SNR decreased. This corresponded to a shift in decision criterion from a liberal bias toward 'amused' in quiet (c = -0.51) to a strong conservative bias under noise (c = 0.25 at -3 dB, 0.64 at -6 dB), reflecting a top-down adjustment under acoustic ambiguity.

| Condition | Task 1 d' | Task 1 c | Task 1 AUC [95% CI] | Task 2 d' | Task 2 c | Task 2 AUC [95% CI] |
| --- | --- | --- | --- | --- | --- | --- |
| Quiet | 1.87 | 0.09 | 0.97 [0.95, 0.98] | 1.28 | -0.51 | 0.93 [0.88, 0.96] |
| -3 dB SNR | 1.00 | 0.49 | 0.83 [0.78, 0.87] | 0.82 | 0.25 | 0.84 [0.77, 0.89] |
| -6 dB SNR | 0.58 | 0.69 | 0.73 [0.67, 0.78] | 0.55 | 0.64 | 0.77 [0.70, 0.83] |

## Limitations

The study is limited by a small speaker sample size (only two speakers representing different genders, languages, and identities), making it impossible to fully decouple speaker-specific acoustic traits from language and gender effects. The stimuli rely on read rather than spontaneous speech, which may restrict the generalization of acoustic cues and perceptual strategies to natural conversational settings.

## Why read this

Speech and ML researchers building affective speech processing models or robust communication technologies should read this paper to understand that noise degradation in paralinguistics is not purely a bottom-up sensory loss, but also involves shifts in human decision biases.

## Code

- https://doi.org/10.5281/zenodo.20729215

## Applications

Design and evaluation of robust speech-emotion recognition systems, conversational agents, and contact-center audio enhancement filters operating in noisy real-world acoustic environments.

## Institutions / 機構

University of Twente, Radboud University

**Funding / 經費:** European Union

## Related

- (link related pages by id as the wiki grows)
