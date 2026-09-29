---
id: li26b_interspeech
category: enhancement-separation
institutions: ["Huawei"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-170
pdf: https://www.isca-archive.org/interspeech_2026/li26b_interspeech.pdf
---

# The Effect of Neck Skin Vibration on the Periauricular Acoustic Receiver

*Ruoyan Li, Yuhao Sun, Fan Fan*

[PDF](https://www.isca-archive.org/interspeech_2026/li26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-170)

**Category:** `enhancement-separation`

**TL;DR** — This study demonstrates that neck skin vibrations during self-voicing generate secondary airborne acoustic components that significantly contaminate periauricular microphones, revealing a major blind spot in mouth-only simulation models. By comparing dummy-head experiments and human recordings against Boundary Element Method (BEM) simulations, the authors show that microphones closest to the neck experience severe low-frequency magnitude excesses (>10 dB) not predicted by oral-radiation models.

## Key contributions

- Constructed a GPU-accelerated Frequency-Domain Boundary Element Method (BEM) solver validated against analytical sphere-scattering benchmarks and COMSOL.
- Performed comparative multi-channel acoustic measurements using a GRAS KEMAR dummy head (mouth-only reference) versus real human subjects (S1, S2) during stable phonation.
- Identified and quantified a spatial-frequency coupling trend showing that periauricular receivers positioned closer to the neck exhibit prominent low-frequency magnitude elevations (<1 kHz) due to tissue-borne structural vibration pathways.
- Proved that standard self-speech simulation models treating mouth radiation as the sole acoustic source fail to capture near-ear acoustic properties during vocalization.

## Problem

Speech production involves both oral-cavity air-borne radiation and internal structural tissue vibrations transmitted to the neck surface. While accelerometers and contact sensors capture neck vibrations, the exact acoustic modulation they inflict on non-contact periauricular microphones (in-ear, behind-the-ear, ear-hook devices) has remained unexplored. Prior simulation and acoustic modeling frameworks treat the mouth and nasal cavities as the sole acoustic sources, ignoring neck skin surface radiation. This omission introduces unmodeled low-frequency artifacts and spectral distortions into self-generated speech, impairing tasks like self-voice separation and wearable audio enhancement.

## Method

The authors deployed a multichannel hardware setup comprising a GRAS KEMAR Head & Torso dummy head with a mouth simulator and human subjects (S1, S2) reading short passages for >=30 seconds. Audio was acquired synchronously at a 48 kHz sampling rate via an RME Fireface 802 audio interface using five microphones: three in periauricular positions, one on the forehead, and one front-of-mouth acoustic reference. The GRAS dummy head playback used a linear sweep excitation from 20 Hz to 20 kHz to isolate mouth-only propagation.

To simulate exterior acoustic fields, a custom GPU-accelerated Frequency-Domain Boundary Element Method (BEM) solver was developed, discretized using triangular constant elements with hard-wall boundary conditions on 3D-scanned head geometries (retaining pinna details). Mouth excitation was modeled as a uniform 1 Pa pressure boundary condition over the mouth region. Due to computational and mesh constraints, BEM human simulations were restricted to 0-8 kHz with a 125 Hz step size (requiring ~30 minutes per mesh under 20k elements).

Data analysis relied on relative transfer functions (RTFs) relative to the front-of-mouth microphone. For dummy-head sweeps, impulse responses were recovered via inverse sweep filtering. For human speech, spatial covariance matrices and eigen-decomposition of STFT frames isolated the dominant steering vector corresponding to oral speech propagation. By contrasting the mouth-only BEM predictions against real human recordings, the authors isolated the surplus acoustic energy attributable to neck-surface vibrations.

## Experimental setup

Datasets included controlled GRAS KEMAR dummy head mouth-playback sweeps (20 Hz–20 kHz) and continuous 30+ second steady voiced speech recordings from two human participants (S1, S2). Systems compared included BEM mouth-only simulations versus physical measurements across forehead and periauricular (above, beside, below ear) microphone positions. Metrics focused on complex Relative Transfer Functions (RTFs), capturing both amplitude magnitude (dB) and phase responses across 100 Hz–8 kHz (with primary analysis focused on the 200 Hz–1 kHz band). Implementation utilized a custom GPU BEM solver benchmarked against COMSOL.

## Results

The forehead microphone demonstrated strong agreement with BEM simulations across both dummy-head and human tests in both magnitude and phase, validating global head-related propagation modeling. However, periauricular microphones—particularly those positioned below the ear closer to the neck—revealed substantial magnitude discrepancies: measured sound pressure levels consistently exceeded BEM simulated predictions, in some cases surpassing the forehead reference. Specifically, in the 200 Hz–1 kHz band where neck skin vibrations dominate, the below-ear microphone showed excess acoustic energy that standard oral-radiation models completely fail to account for.

| Condition / System | Frequency Band | Forehead RTF Agreement | Periauricular Below-Ear RTF Delta vs. Simulation | Primary Driver |
|---|---|---|---|---|
| GRAS Dummy Head (Mouth Playback) | 200 Hz – 1 kHz | High match (Magnitude & Phase) | Low deviation (Matches BEM) | Oral radiation only |
| Human Participant S1 | 200 Hz – 1 kHz | High match (Magnitude & Phase) | Pronounced positive magnitude excess (> simulation) | Neck skin vibration |
| Human Participant S2 | 200 Hz – 1 kHz | High match (Magnitude & Phase) | Substantial positive magnitude excess (exceeds forehead) | Neck skin vibration |

## Limitations

The study is restricted by a very small human cohort (two participants), omitting inter-subject variations in neck geometry, tissue impedance, and articulation. Sensors were uncalibrated regarding absolute normal velocity or skin-surface acceleration, restricting the analysis to relative transfer functions rather than a fully physical predictive mapping. High-frequency evaluation above 1 kHz was limited by natural human speech energy roll-off and local pinna scattering sensitivity.

## Why read this

Wearable audio engineers and researchers building self-voice separation, speech enhancement, or active noise cancellation algorithms for hearables should read this to understand why near-ear microphones capture unmodeled low-frequency components during self-voicing. It provides empirical proof and a BEM simulation baseline demonstrating that neck skin vibration cannot be ignored in acoustic sensing models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Wearable hearables, hearing aids, directional voice pickup, self-voice separation algorithms, and speech enhancement systems.

## Institutions / 機構

Huawei

## Related

- (link related pages by id as the wiki grows)
