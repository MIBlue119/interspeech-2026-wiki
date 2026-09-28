---
id: wang26r_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1018
pdf: https://www.isca-archive.org/interspeech_2026/wang26r_interspeech.pdf
---

# Is Speaker Identity a Unitary Construct? Neural Evidence for Distinct Trait Processing

[PDF](https://www.isca-archive.org/interspeech_2026/wang26r_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26r_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1018)

**TL;DR** — An fMRI study investigating neural processing of speaker identity demonstrates a "core-plus-extension" model, revealing that distinct speaker traits (gender, age, and accent) share a common voice-processing core in the superior temporal cortex while recruiting partially dissociable cortical regions.

## Problem

Previous speech perception research largely treats speaker identity as a unitary construct processed homogeneously within temporal voice areas. However, speaker identity comprises multidimensional and separable attributes—such as gender, age, and accent—that rely on different acoustic and phonological cues, leaving their distinct neural mechanisms under-explored.

## Method

The study utilized fMRI to record brain activity from 34 native Mandarin adults listening to 96 pseudo-English words synthesized via OpenAI TTS, evenly distributed across gender (adult male/female), age (children/adults), and accent (British/Indian English) conditions, alongside a tone baseline task. Structural and functional MRI data were preprocessed using DeepPrep (v25.1.0) on a 3T Siemens Prisma scanner. First-level general linear model (GLM) analyses, cluster-based one-sample permutation tests (10,000 permutations, cluster threshold p < 0.05, minimum 20 vertices), conjunction analyses, and repeated-measures ANOVAs were performed to isolate brain activations and evaluate trait-specific neural differences.

## Results

Behavioral results showed highest accuracy and fastest response times for gender identification (97.70%, 853.58 ms), followed by age (95.40%, 917.79 ms) and accent (86.76%, 1087.33 ms, p < 0.001). Univariate GLM and conjunction analyses revealed a shared voice core across all traits centered in bilateral Heschl's gyrus (HG) and superior temporal gyrus/sulcus (STG/STS). Accent processing elicited significantly stronger activation within the bilateral posterior and middle STG/STS compared to gender and age. Age identification uniquely engaged left sensorimotor and premotor cortices (PostCG/PreCG), while accent processing recruited widespread frontal areas including bilateral inferior frontal gyrus (IFG), middle frontal gyrus (MFG), and superior frontal gyrus (SFG). Gender identification relied exclusively on superior temporal auditory cortex.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cognitive neuroscientists and speech engineers designing advanced speech recognition systems can leverage these insights into hierarchical, trait-sensitive neural processing of vocal attributes to improve speaker adaptation performance.

## Related

- (link related pages by id as the wiki grows)
