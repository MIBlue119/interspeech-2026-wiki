---
id: kim26b_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-207
pdf: https://www.isca-archive.org/interspeech_2026/kim26b_interspeech.pdf
---

# The Role of Laryngeal Position in the Articulation of American English Velar Stop Consonants

[PDF](https://www.isca-archive.org/interspeech_2026/kim26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-207)

**TL;DR** — This study analyzes ultrasound tongue and laryngeal kinematics in American English velar stops, demonstrating that /ɡ/ is produced with greater spatiotemporal tongue expansion and hyoid lowering while /k/ exhibits hyoid raising and fronting tied to f0 peaks.

## Problem

Phonological voicing contrasts in American English onset stops lack clear pre-release vocal fold vibration, making their underlying articulatory mechanisms and acoustic-articulatory relations largely ambiguous. Previous studies rarely offer simultaneous, comprehensive measurements of lingual and laryngeal kinematics to explain how acoustic correlates like VOT, closure duration, and following vowel f0 are produced. This work tests competing hypotheses regarding tongue dorsum pulling and aerodynamic voicing constraints using multivariate statistical modeling.

## Method

The author collected synchronized audio and ultrasound recordings from 10 native American English speakers pronouncing target words (/kip, ɡik, kup, ɡup, kɑd, ɡɑd/) in carrier sentences, yielding 546 valid token productions after filtering. Tongue contours, tongue dorsum (TD), hyoid bone (HY), and mandible positions were tracked frame-by-frame using DeepLabCut within Articulate Assistant Advanced, then normalized via Cartesian coordinate transformation. Statistical inference utilized Generalized Additive Mixed Models (GAMMs) for tongue contour shapes, Linear Mixed-Effects Models (LMEMs) for univariate acoustic and kinematic metrics, and Vector Generalized Linear Models (VGLMs) for hyoid positioning.

## Results

Analyses reveal that /ɡ/ is produced with longer, larger, and faster TD raising from onset to target (higher peak velocity), indicating a full spatiotemporal tongue expansion to bypass aerodynamic voicing constraints. Conversely, /k/ features a more raised and fronted hyoid bone position at the target and offset, which directly correlates with the higher f0 peak observed in vowels following /k/ rather than tongue-pulling mechanisms. Additionally, /ɡ/ exhibits a shorter target-to-offset TD duration compared to /k/, supporting aspects of the virtual target hypothesis.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians, speech scientists, and speech-language pathologists studying articulatory phonology, consonant voicing contrasts, and physiological speech production mechanisms.

## Limitations

Ultrasound imaging cannot directly visualize precise surface limits of the velum, and 174 out of 720 total token productions had to be excluded due to tracking invisibility or low imaging quality.

## Related

- (link related pages by id as the wiki grows)
