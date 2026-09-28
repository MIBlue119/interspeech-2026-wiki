---
id: kim26b_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-207
pdf: https://www.isca-archive.org/interspeech_2026/kim26b_interspeech.pdf
---

# The Role of Laryngeal Position in the Articulation of American English Velar Stop Consonants

*Daejin Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-207)

**TL;DR** — This study uses ultrasound tongue imaging and multivariate statistical modeling to examine the linguolaryngeal articulation of American English velar stops (/k/ vs. /ɡ/), revealing that /ɡ/ is produced with greater spatiotemporal tongue expansion and hyoid lowering, whereas /k/ features hyoid raising that correlates with higher post-stop f0 peaks.

## Key contributions

- Simultaneous kinematic measurement of tongue dorsum (TD) and hyoid bone (HY) movements relative to the mandible (MD) during American English velar stop production using synchronized audio-ultrasound imaging.
- Evaluation of competing hypotheses (tongue-pull vs. aerodynamic voicing constraint/virtual target) for American English voicing contrasts where pre-release voicing is absent.
- Application of Vector Generalized Linear Models (VGLMs) and Generalized Additive Mixed Models (GAMMs) to capture multi-dimensional spatial displacements and continuous contour shapes across gestural landmarks.
- Demonstration that hyoid positioning, rather than tongue-pulling, directly correlates with vowel-intrinsic f0 differences following voiceless versus voiced velar stops.

## Problem

Phonological voicing contrasts in American English stop consonants in syllable onsets are typically non-modal, lacking pre-release vocal fold vibration, and are instead cued by closure duration, VOT, and following-vowel f0 and duration. Prior work provides limited comprehensive, simultaneous measurements of lingual and laryngeal articulations to explain the underlying mechanisms of these acoustic correlates. Understanding how the tongue dorsum and hyoid bone coordinate to realize the /k/-/ɡ/ contrast remains an open question in articulatory phonology.

## Method

The study analyzes 720 tokens from 10 native American English speakers producing target words (/kip, ɡik, kup, ɡup, kɑd, ɡɑd/) embedded in carrier sentences following an unstressed schwa. Audio and ultrasound videos were acquired using a Telemed EchoBlaster 128 system with a head stabilizer unit. Tongue contours and hyoid (HY) and mandible (MD) shadow landmarks were tracked frame-by-frame using DeepLabCut within Articulate Assistant Advanced (AAA). Cartesian [x, y] coordinates were normalized by rotation and scaling relative to the TD-HY vector. Gestural landmarks annotated in Praat and AAA included ONSET (movement initiation), TARGET (spatially maximal/minimal displacement), and OFFSET (movement termination), alongside Peak Velocity (PV).

Statistical modeling employed three complementary frameworks: Linear Mixed-Effects Models (LMEMs) for univariate acoustic and kinematic metrics (closure duration, VOT, vowel duration, movement distance/duration, PV); Vector Generalized Linear Models (VGLMs) to estimate two-dimensional horizontal and vertical displacements [dx, dy] of HY relative to MD; and Generalized Additive Mixed Models (GAMMs) with tensor interaction terms and speaker factor smooths to evaluate differences in tongue contour shapes across T0-T10 measurement points. These models tested whether /k/ and /ɡ/ are differentiated by tongue-pulling mechanisms affecting f0 or hyoid adjustments bypassing the aerodynamic voicing constraint.

## Experimental setup

Dataset comprised 720 total recorded tokens (after excluding 144 tracker-failure tokens out of 720 collected) from 10 native speakers of American English (3 females, 7 males, mean age 20.3). Evaluated metrics include acoustic closure duration (CD), voice onset time (VOT), vowel duration (VD), f0 peak, tongue dorsum (TD) movement distance and duration between landmarks, peak velocity (PV), and hyoid-to-mandible (HY-MD) horizontal and vertical displacements. Analyzed via LMEMs, VGLMs, and GAMMs in R.

## Results

Acoustic analysis confirmed that /ɡ/ exhibited longer closure duration (-11.8 ms β difference, p < 0.001), shorter VOT (62.8 ms difference, p < 0.001), longer vowel duration (-26.0 ms difference, p < 0.001), and a lower following f0 peak (0.69 Hz difference, p < 0.001) compared to /k/. Tongue contour shape differences at TARGET between /k/ and /ɡ/ were statistically significant via GAMMs (edf = 2.92, F = 3.42, p < 0.001) but practically negligible (displacement < 0.05). Kinematically, /ɡ/ showed longer ONSET-to-TARGET distance (-1.01 mm, p < 0.001), higher peak velocity (-6.22 mm/sec, p < 0.05), and longer ONSET-to-TARGET duration (-9.85 ms, p < 0.001). VGLM results established that /ɡ/ featured a more retracted and raised HY at TARGET (dx: 0.93 mm, dy: 1.21 mm; p < 0.001) and OFFSET, while /k/ involved increased vertical HY raising between ONSET and TARGET (p < 0.05).

Where it does not win: Tongue contour shapes at ONSET and OFFSET showed no significant differences between /k/ and /ɡ/ (p = 0.08 and p = 0.93), and the tongue-pull hypothesis for f0 variation was unsupported by contour geometry.

| System / Condition | Closure Duration (CD) | Voice Onset Time (VOT) | Vowel Duration (VD) | Following f0 Peak | TD Peak Velocity (PV) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| /k/ (Baseline) | Reference | Reference | Reference | Reference | Reference |
| /ɡ/ (Voiced Velar) | +11.8 ms (p<0.001) | -62.8 ms (p<0.001) | +26.0 ms (p<0.001) | Lower (p<0.001) | Higher (-6.22 mm/s, p<0.05) |

## Limitations

The dataset is restricted to 10 speakers from a specific dialect region (Colorado, New Mexico, Texas) and a limited vocabulary set (/k/ and /ɡ/ preceding /i, u, ɑ/). VGLMs used for vector displacements do not support random intercepts/slopes or repeated measures, potentially underestimating speaker-related variations. Ultrasound imaging is limited in capturing precise physical boundaries of the velum surface directly.

## Why read this

Researchers in speech production and articulatory phonology should read this paper to understand how laryngeal positioning (hyoid bone movement) and tongue spatiotemporal expansion coordinate to signal voicing contrasts in the absence of pre-release vocal fold vibration.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving articulatory speech synthesis models, phonetic training tools, and diagnostic frameworks for speech motor control disorders.

## Related

- (link related pages by id as the wiki grows)
