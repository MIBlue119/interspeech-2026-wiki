---
id: he26g_interspeech
category: auditory-attention-decoding
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3556
pdf: https://www.isca-archive.org/interspeech_2026/he26g_interspeech.pdf
---

# MOV-AAD: A Large-Scale Multimodal Dataset for Auditory Attention Decoding During Moving Conversations

*Xiaomin He, Vishal Choudhari, Tristan J. Spratt, Aarya Raghavan, Richard T. Lee, Nima Mesgarani*

[PDF](https://www.isca-archive.org/interspeech_2026/he26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/he26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3556)

**TL;DR** — MOV-AAD is a large-scale multimodal dataset featuring 64-channel EEG and synchronized autonomic signals from 50 participants under dynamic moving-speaker conversational conditions, yielding baseline linear discriminant analysis AAD accuracy significantly above chance.

## Key contributions

- Releases MOV-AAD: a dataset comprising 50 participants, 4,800 attentive-listening trials, and 64-channel EEG synchronized with 9 distinct peripheral physiological modalities (PPG, GSR, eye tracking, respiration, SpO2, temperature, motion).
- Introduces ecologically realistic spatial dynamics with continuous moving conversational speech sources spanning ±90° azimuth via head-related transfer functions (HRTFs).
- Establishes comprehensive baseline benchmarks across modalities, including speech envelope reconstruction, spatial trajectory decoding, linear discriminant analysis (LDA) auditory attention decoding, and intersubject correlation (ISC).
- Incorporates embedded behavioral validation measures (repeated-word detection and 9-point spatial localization tasks) to track listener engagement and spatial perception.

## Problem

Prior auditory attention decoding (AAD) datasets predominantly rely on static speaker positions, simplified synthetic mixtures, and isolated EEG recordings that fail to capture the complexity of real-world listening environments. Existing datasets like KULeuven, DTU, NJU AAD, and SparrKULee lack synchronized autonomic and behavioral metrics (such as pupillometry, galvanic skin response, and respiration) under continuous acoustic movement. This gap restricts the development of robust, ecologically valid neuro-steered hearing technologies and multimodal cognitive state assessment models that account for both cortical tracking and peripheral listening effort.

## Method

The dataset acquisition pipeline integrated 64-channel EEG and peripheral signals sampled at 1200 Hz using a g.HIamp amplifier, alongside binocular eye tracking via a Tobii Pro Nano sampled synchronously through Simulink. Stimulus audio consisted of naturalistic conversational streams embedded with repeated words every 7 seconds, spatialized via HRTFs to move continuously within the ±90° horizontal plane using a 1° resolution first-order Markov chain. Background noise (pedestrian or speech babble) was mixed diotically at -9 or -12 dB relative to the speech RMS power.

For baseline evaluation, speech envelopes were extracted via Hilbert transform and 4th-order Butterworth low-pass filtering at 8 Hz, followed by 1-8 Hz band-pass filtering of EEG. Backward regularized ridge regression decoders (mTRF Toolbox v2.3) with time lags of 0-400 ms mapped EEG to envelopes using leave-one-trial-out cross-validation with ridge parameters spaced from 10^-2 to 10^4. Spatial trajectory decoders used delta (0.05-2 Hz) and alpha (8-12 Hz) band EEG with 0-250 ms time lags. Auditory attention decoding (AAD) was formulated as a binary classification problem using Linear Discriminant Analysis (LDA) over trial-wise Pearson correlation vectors [r_A, r_U] alongside swapped-order training samples.

## Experimental setup

Evaluated on 50 participants (aged 18-38 years, mean 24 ± 4.5) undergoing ~12 minutes of repeated sentences, ~30 minutes of single-conversation tasks (40 trials), and ~45 minutes of multi-conversation tasks (56 trials). Modalities compared include EEG (1-8 Hz, 8-12 Hz), delta/alpha spatial trajectories, and multimodal physiological streams. Metrics include Pearson correlation (r), Mean Absolute Error (MAE) for localization, accuracy/precision/F1 scores for repeated-word detection, LDA classification accuracy, and intersubject correlation (ISC) against permutation-derived null distributions.

## Results

Speech envelope-based AAD yielded robust attentional selectivity, with attended envelope reconstruction correlations (r_A) remaining stable across window sizes while unattended correlations (r_U) stayed near chance. In full-trial LDA classification, envelope features achieved the highest accuracy, while alpha-band trajectory decoding performed significantly above chance (one-sample right-tailed t-test against permutation null, p < 0.05) and delta-band trajectory decoding remained at chance level. Combining envelope and trajectory features did not significantly outperform envelope-only models. Intersubject correlation (ISC) demonstrated significant group-level temporal alignment across participants for EEG, gaze location, pupil dilation, PPG, respiration flow/effort, and GSR (p < 0.001), while temperature showed no significant shared trial-level temporal structure.

| System / Condition | Feature Type | Window Size | AAD / Decoding Accuracy | Reconstruction Correlation (r_A) |
|---|---|---|---|---|
| SC / MC-A | Envelope (1-8 Hz) | Full Trial | > 80% (approx.) | ~0.10 - 0.12 |
| Multi-Conversation | Trajectory Alpha (8-12 Hz) | Full Trial | Above Chance | Positive (subsets) |
| Multi-Conversation | Trajectory Delta (0.05-2 Hz) | Full Trial | Chance Level | ~0.00 |
| Multi-Conversation | Envelope + Trajectory | Full Trial | Matches Envelope-Only | High |

## Limitations

The dataset utilizes non-individualized HRTFs, which likely contributed to increased spatial localization variability and reduced discriminability at extreme lateral positions (-90° / +90°). Peripheral physiological features such as skin temperature and slow tonic measures exhibited minimal trial-level intersubject correlation, indicating limits in capturing fast autonomic dynamics with certain modalities. The participant cohort is restricted to young adults (18-38 years) with normal hearing, limiting immediate generalization to older demographics or hearing-impaired populations.

## Why read this

Speech and ML researchers building multimodal AAD systems or neuro-steered hearing aids should read this to access the first large-scale benchmark containing synchronized high-density EEG and multi-sensor autonomic data during dynamic spatial movement.

## Code

- https://github.com/naplab/MOV-AAD

## Applications

Development of robust neuro-steered hearing aids, multimodal auditory attention decoding models, and cognitive listening-effort estimators operating in dynamic, multi-talker acoustic environments.

## Related

- (link related pages by id as the wiki grows)
