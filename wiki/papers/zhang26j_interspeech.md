---
id: zhang26j_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-753
pdf: https://www.isca-archive.org/interspeech_2026/zhang26j_interspeech.pdf
---

# Improved modeling of vocal fold contacting and de-contacting in a geometric vocal fold model

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-753)

**TL;DR** — This paper presents a geometric vocal fold model with biomechanically motivated soft contacting and de-contacting mechanisms for articulatory speech synthesis, achieving an average A/B preference of 58.1% and a mean opinion score of 3.02 over a 2.68 baseline.

## Problem

Traditional geometric vocal fold models rely on sinusoidal oscillations clipped at the midsagittal plane, which completely neglects tissue deformation during the brief but crucial physical contacting and de-contacting phases. This simplification yields unnatural-sounding synthetic speech in articulatory speech synthesizers. Overcoming this limitation is vital for improving articulatory TTS quality, particularly for low-resource languages and basic speech research where explicit physiological control is required.

## Method

The proposed voice source model derives from Titze's geometric framework and is implemented within the VocalTractLab 2.4 articulatory synthesizer. It introduces exponential decay functions to model the gradual deceleration of vocal folds during partial contact (soft contacting) and reduced initial lateral velocities during separation (soft de-contacting). These mechanisms are coupled with a shaping parameter to control pulse skewness and asymmetric glottal area waveforms. The model parameters—including lower/upper rest displacements, phase lags, and pulse shapes—were evaluated across 81 distinct settings per sentence.

## Results

Evaluated using copy-synthesis on 9 sentences across 81 parameter combinations (yielding 1,458 total utterances evaluated by 27 listeners), the proposed model was preferred in 58.1% of pairwise comparisons (binomial test, p < 0.001, 95% CI [56.0%, 60.2%]). It achieved a mean opinion score (MOS) of 3.02 compared to 2.68 for the previous 2019 baseline model. A linear mixed-effects model confirmed a significant positive main effect for the new model (beta_1 = 0.911, p < 0.001), with predicted higher MOS ratings across 75.3% of the parameter configurations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers building articulatory text-to-speech systems or investigating physiological speech production processes in low-resource languages.

## Related

- (link related pages by id as the wiki grows)
