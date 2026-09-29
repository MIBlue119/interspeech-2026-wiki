---
id: wang26r_interspeech
category: paralinguistics-emotion
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1018
pdf: https://www.isca-archive.org/interspeech_2026/wang26r_interspeech.pdf
---

# Is Speaker Identity a Unitary Construct? Neural Evidence for Distinct Trait Processing

*Yike Wang, Kaile Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26r_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26r_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1018)

**Category:** `paralinguistics-emotion`

**TL;DR** — An fMRI study investigating how the human brain processes different speaker identity traits reveals a "core-plus-extension" neural model, where a shared auditory core in the superior temporal cortex handles basic acoustic extraction while distinct cortical regions manage trait-specific demands (gender, age, accent). Accent processing proved most cognitively demanding, eliciting significantly stronger bilateral STG/STS activation and recruiting widespread frontal networks compared to gender and age.

## Key contributions

- Demonstrates that speaker identity is not processed as a unitary construct, decomposing neural processing into shared auditory substrates and dissociable trait-specific cortical extensions.
- Identifies a shared "voice core" in bilateral Heschl's gyrus (HG) and superior temporal gyrus/sulcus (STG/STS) via fMRI conjunction analysis across gender, age, and accent tasks.
- Reveals that accent identification requires significantly greater cognitive and neural demand, showing longer response times (1087 ms vs 853 ms for gender) and recruiting frontal areas (IFG, MFG, SFG).
- Links age-related vocal parsing to left sensorimotor/premotor cortices, suggesting embodied simulation mechanisms for vocal tract maturation, while gender relies exclusively on superior temporal acoustic regions.

## Problem

Prior functional neuroimaging studies on voice perception have predominantly treated speaker identity as a unitary, monolithic construct processed homogeneously within Temporal Voice Areas (TVAs). However, speaker identity is multidimensional—encompassing separable attributes like gender, age, and regional accent—each relying on distinct acoustic, phonological, and prosodic properties. Treating identity as monolithic overlooks how the brain efficiently extracts and integrates these diverse paralinguistic cues during communication, limiting both cognitive neuroscience models of voice perception and bio-inspired architectural designs for speech technology.

## Method

The experiment utilized a blocked fMRI design where 34 native Mandarin adults listened to 96 pseudo-English words (synthesized via OpenAI TTS, 32 per condition) while performing forced-choice identification tasks for gender, age, accent, or a tone baseline. The gender condition used adult male and female speakers; the age condition used children and adults; and the accent condition featured British and Indian English accents. All audio clips were loudness-normalized to 70 dB.

Functional and structural MRI data were acquired on a 3T Siemens Magnetom Prisma scanner using a 32-channel head coil and a multiband T2*-weighted EPI sequence (TR = 1000 ms, TE = 30 ms, voxel size = 3 x 3 x 3.5 mm³). Preprocessing was performed using DeepPrep (v25.1.0) with spatial normalization to MNI space and cortical surface alignment to fsaverage6. First-level GLMs estimated condition-specific beta coefficients by convolving event onsets with a canonical hemodynamic response function, using six head-motion parameters as nuisance regressors.

At the group level, trait-specific contrast maps (against the tone baseline) were analyzed via cluster-based permutation tests (10,000 permutations, cluster threshold p < 0.05, extent >= 20 vertices). A conjunction analysis isolated overlapping regions activated across all three traits to define the shared voice-core ROI. Subsequent repeated-measures ANOVAs and permutation-corrected t-tests evaluated activation magnitudes within this ROI and mapped trait-specific cortical extensions.

## Experimental setup

Thirty-four right-handed native Mandarin adults (mean age 24.09 years, 18 females) with normal hearing and no neurological impairments participated. The study compared four experimental tasks: gender identification, age identification, accent identification, and a pure-tone baseline. Evaluation metrics included behavioral accuracy rates, response times (RTs), and BOLD signal blood-oxygen-level-dependent activation clusters (t-statistics, p-values, and Cohen's d effect sizes) derived from vertex-wise surface GLM analyses.

## Results

Behavioral performance showed a significant main effect of speaker trait on accuracy (F(2, 66) = 51.96, p < 0.001) and response times (F(2, 66) = 73.80, p < 0.001). Gender identification was the easiest (97.70% accuracy, 853 ms RT), followed by age (95.40% accuracy, 918 ms RT), with accent identification being the most difficult (86.76% accuracy, 1087 ms RT; Cohen's d = 1.75 vs gender).

In the fMRI conjunction analysis, bilateral STG/STS and Heschl's gyrus formed a shared voice core, but activation within this core was not uniform. Accent processing elicited significantly stronger activation in bilateral posterior and middle STG/STS compared to gender (left cluster 1: t = 2.81, p < 0.01, d = 0.73) and age (left: t = 2.82, p = 0.01, d = 0.62; right: t = 2.69, p < 0.001, d = 0.85). Beyond the core, age identification uniquely recruited left postcentral and precentral motor cortices (t = 2.48–4.32, d = 0.43–0.74), while accent processing engaged widespread frontal areas including bilateral IFG, MFG, and SFG (t = 3.41–4.21, d = 0.59–0.72). Gender identification showed no exclusive extensions beyond the temporal core.

## Limitations

The study tested only native Mandarin speakers evaluating English pseudo-words, potentially introducing cross-linguistic and phonetic familiarity biases. The stimulus set was relatively small (96 total words distributed across conditions) and limited to specific binary or narrow categories (e.g., British vs. Indian accents, adults vs. children). Additionally, fMRI temporal resolution (TR = 1000 ms) restricts fine-grained causal tracking of the millisecond-level temporal dynamics involved in acoustic vs. phonological decoding.

## Why read this

Speech and ML researchers building speaker adaptation, multi-task speech models, or disentangled representation learning should read this paper to understand that speaker identity is hierarchically organized rather than unitary. It provides empirical neuroscientific grounding for decoupling acoustic speaker verification from higher-order sociolinguistic attribute modeling.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multi-task speech representation learning, neural speaker adaptation in automatic speech recognition (ASR), and context-aware text-to-speech (TTS) synthesis.

## Institutions / 機構

Hong Kong Polytechnic University

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
