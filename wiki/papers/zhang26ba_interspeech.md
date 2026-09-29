---
id: zhang26ba_interspeech
category: phonetics-linguistics
institutions: ["Hong Kong Polytechnic University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1940
pdf: https://www.isca-archive.org/interspeech_2026/zhang26ba_interspeech.pdf
---

# Neural Oscillatory Mechanisms of Speaker Normalization Under Cognitive Load: Evidence from Cantonese Tone Perception

*Kaile Zhang, Gang Peng*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26ba_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26ba_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1940)

**Category:** `phonetics-linguistics`

**TL;DR** — This study investigates the neural oscillatory mechanisms of speaker normalization in Cantonese tone perception under cognitive load using EEG, finding that behavioral performance remains resilient despite substantial neural resource reallocations via alpha and delta band modulations.

## Key contributions

- Demonstrates that speaker normalization under cognitive load is supported by active neural compensation rather than being a purely automatic bottom-up process.
- Reveals that introducing a secondary visual search task triggers sustained parieto-occipital alpha synchronization (8-13 Hz, ~200-800 ms), reflecting the top-down suppression of visual distractors.
- Shows that high cognitive load uniquely induces prefrontal delta-band desynchronization (1-3 Hz, 303-565 ms), indicating an attentional shift toward external auditory processing.
- Provides empirical EEG evidence reconciling the debate around the active control hypothesis of speech normalization in adverse multi-tasking conditions.

## Problem

A major challenge in speech perception is overcoming acoustic variability across speakers to achieve perceptual constancy, a process known as speaker normalization. In tonal languages like Cantonese, where pitch changes carry lexical meaning, listeners rely on extrinsic spectral context cues from preceding carrier phrases to calibrate target tone categories. While dual-task studies show that listeners can successfully normalize talker variability even when cognitive resources are depleted, it remains an empirical paradox whether this process is automatic or resource-demanding. Prior work failed to clarify how the neural system dynamically reconfigures itself to support speaker normalization when cognitive resources are scarce.

## Method

The experiment utilized a dual-task paradigm combining a primary auditory Cantonese tone identification task with a secondary visual search task across three blocks: no-load (NL), low-load (LL with a 4x4 visual grid), and high-load (HL with an 8x8 visual grid). Auditory stimuli comprised context-target word pairs recorded by 4 native speakers (2 male, 2 female), where context fundamental frequency (F0) trajectories were shifted by 3 semitones to create high-, mid-, and low-F0 contexts, and targets consisted of the syllable /ji33/ normalized to 450 ms duration. Electroencephalography (EEG) data were recorded using a 64-channel system at a 1000 Hz sampling rate, band-pass filtered (0.01-50 Hz), and decomposed into Event-Related Spectral Perturbations (ERSP) via Fast Fourier Transform and Hanning window tapering across a 1 to 50 Hz range.

To analyze neural dynamics, single-trial ERSP epochs from -500 to 800 ms were baseline-corrected (-300 to -100 ms) and evaluated using non-parametric permutation tests (1000 iterations, p < 0.01). Cluster-based permutation tests with linear mixed-effects models compared alpha-band (8-13 Hz) and delta-band (1-3 Hz) activity across experimental conditions, treating cognitive load as a fixed effect and subject as a random intercept. These time-frequency and regional topography choices were designed to track inhibitory gating mechanisms and attentional shifts during multi-tasking.

## Experimental setup

The study evaluated 30 right-handed native Cantonese speakers (after filtering out participants retaining fewer than 70% of trials, from an initial set of 32 participants aged 20.5 years). EEG data were recorded using a 64-channel NeuroScan SynAmps 2 system. The experiment evaluated three conditions (No Load, Low Load with 4x4 grid, High Load with 8x8 grid) comprising 108 test trials and 36 fillers per block. Metrics included behavioral expected response accuracy based on the contrastive context effect, visual search accuracy, and time-frequency ERSP power changes across alpha (8-13 Hz) and delta (1-3 Hz) frequency bands.

## Results

Behavioral results indicated a significant main effect of Context F0 (chi-square(2) = 19.77, p < 0.001), showing strong contrastive context effects across all conditions, but no significant main effect of Cognitive Load (chi-square(2) = 0.32, p = 0.85) or interaction, demonstrating that speaker normalization was behaviorally unaffected by visual distractions. Visual search accuracy dropped significantly from LL (M = 0.91, SD = 0.06) to HL (M = 0.70, SD = 0.09; t(31) = -14.67, p < 0.001). ERSP analyses revealed that NL induced early prefrontal and parieto-occipital alpha inhibition (0-415 ms), whereas LL (~200-800 ms) and HL (~159-800 ms) triggered sustained parieto-occipital alpha activation. Furthermore, HL uniquely elicited prefrontal delta-band inhibition (303-565 ms). HL elicited significantly stronger alpha activation than LL from 428 to 707 ms (cluster mass = 365, mean t = 1.76, p < 0.001). A significant negative correlation was found between secondary task accuracy and alpha-band power in the LL condition (r = -0.38, p = 0.036).

| Condition | Alpha-Band Response | Delta-Band Response | Visual Search Accuracy | Tone Normalization Accuracy |
|---|---|---|---|---|
| No Load (NL) | Early ERD (0–415 ms) | Baseline | N/A | Maintained |
| Low Load (LL) | Sustained ERS (~246–800 ms) | Baseline | 0.91 (SD 0.06) | Maintained |
| High Load (HL) | Sustained ERS (~159–800 ms) | Inhibition (303–565 ms) | 0.70 (SD 0.09) | Maintained |

## Limitations

The study is restricted to a relatively small sample of young native Cantonese speakers (n=30), limiting generalization across diverse age groups and linguistic backgrounds. Cognitive load was manipulated exclusively through visual search grids, leaving auditory or linguistic secondary tasks untested. Furthermore, scalp EEG provides limited spatial resolution for identifying deep-brain sources underlying the observed prefrontal delta and parieto-occipital alpha modulations.

## Why read this

Speech perception and cognitive neuroscience researchers should read this paper to understand how the human brain marshals active neural compensation mechanisms to protect speech processing under adverse multi-tasking conditions, challenging purely automatic views of talker normalization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving speech recognition interfaces, auditory prosthetics, and cognitive load management systems in multi-modal environments.

## Institutions / 機構

Hong Kong Polytechnic University

**Funding / 經費:** National Natural Science Foundation of China

## Related

- [How Speaker Normalization Procedures Influence the Computational Modelling of Non-native Vowel Perception: Implications for the L2LP model](lee26l_interspeech.md) — same problem · relatedness 1.8/3
- [Tone-space Distribution Modulates Transfer from Non-linguistic Pitch Training to Cantonese Tone-in-Noise Perception in Native Speakers](weng26_interspeech.md) — same problem · relatedness 1.7/3
- [Effects of listener language experience, masker language, and cognitive load on word monitoring accuracy and response time](chin26_interspeech.md) — relatedness 1.6/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
