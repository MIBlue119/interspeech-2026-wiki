---
id: zhao26f_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1995
pdf: https://www.isca-archive.org/interspeech_2026/zhao26f_interspeech.pdf
---

# SA-HRTF: A Sound-Assisted Approach to Personalized HRTF Modeling

[PDF](https://www.isca-archive.org/interspeech_2026/zhao26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhao26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1995)

**TL;DR** — The paper introduces SA-HRTF, a sound-assisted head-related transfer function personalization model that combines structural database priors with acoustic perceptual cues from binaural recordings to improve accuracy under sparse measurements.

## Problem

Personalizing head-related transfer functions (HRTFs) under sparse spatial measurements is challenging because limited spatial data fails to capture complex acoustic-anatomical interactions. Existing database-retrieval methods are constrained by small dataset scales and diversity, while signal-based approaches struggle with audio stability and require tedious setups. Solving this is critical for high-fidelity 3D audio rendering in AR, VR, and hearing aids.

## Method

The architecture utilizes a dual-branch design combining a conditional residual retrieval-augmented neural field (CR-RANF) primary branch and a sound-informed HRTF (SI-HRTF) auxiliary branch. The CR-RANF branch encodes reference HRTFs and uses a Feature-wise Linear Modulation (FiLM) module with Low-Rank Adaptation (LoRA) for feature fusion, while the SI-HRTF branch processes binaural audio magnitude spectra through Conv1d-ReLU-BN blocks embedded with Squeeze-and-Excitation networks (SENet). An adaptive fusion module combines both predictions via a learned weight vector generated through convolutional and sigmoid layers. The model is trained using log-spectral distortion (LSD) loss across the public SONICOM HRTF dataset (200 subjects) and custom sound-augmented simulation mixtures.

## Results

Evaluated on the SONICOM dataset partitioned into 160 training, 19 validation, and 20 test subjects across sparse measurement settings (q = 3, 5, 7, 9 directions), the method was compared against nearest-neighbor baselines, ITD/LSD-based selection, Neural IIR Filter Fields (NIIRF), and Retrieval-Augmented Neural Fields (RANF). The proposed SA-HRTF consistently achieved the lowest log-spectral distortion (LSD) across all measurement quantities compared to all baselines. The improvements are especially pronounced under extremely sparse conditions like q = 3 and q = 5 due to the complementary nature of the dual-branch fusion strategy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio engineers working on immersive 3D spatial audio rendering for augmented reality, virtual reality, and smart consumer headphones or earables.

## Related

- (link related pages by id as the wiki grows)
