---
id: ghosh26_interspeech
category: speech-anonymisation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-378
pdf: https://www.isca-archive.org/interspeech_2026/ghosh26_interspeech.pdf
---

# Phy-VC: Physics-Informed Voice Conversion for Privacy-Preserving Pathological Speech

[PDF](https://www.isca-archive.org/interspeech_2026/ghosh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ghosh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-378)

**TL;DR** — Phy-VC is a physics-informed voice conversion method for privacy-preserving pathological speech anonymisation that integrates a differentiable vocal tract resonance model to improve intelligibility and preserve clinical attributes.

## Problem

Standard speech anonymisation and voice conversion methods rely on purely data-driven spectral envelope estimation, which fails to generalize to acoustic patterns rarely seen during training such as dysfluencies in pathological or elderly speech. Existing black-box neural vocoders and VAE/GAN frameworks either smooth out critical phonation irregularities or leak speaker emotion and identity cues. This fragility makes them unreliable for clinical settings where preserving diagnostic markers like tremors, stuttering dysfluencies, and unnatural pauses is paramount.

## Method

Phy-VC builds upon DDSP-QbE by introducing a physics-informed vocal tract bottleneck and target-pool prosodic feature mapping. It extracts phonetic and emotional representations via WavLM layers 6 and 12, matches them against target speaker pools using KNN, and passes them to a Conformer encoder. The physics bottleneck predicts eight articulatory control trajectories based on Maeda's model, translates them into a two-channel oral and nasal area function via Story's parametric framework, and computes formant frequencies and bandwidths using a lightweight differentiable Webster surrogate (PWB) driven by multi-scale Conv1D branches. Finally, a subtractive synthesiser constructs a spectral filter using Lorentzian peaks, and an exponential warp applies larynx height control for speaker-size manipulation.

## Results

Evaluated across diverse atypical datasets including stuttering (SEP-28k, Fluency Bank), dementia (ADReSSo), elderly speech, and emotional speech datasets (ESD), Phy-VC outperforms state-of-the-art baselines in intelligibility, prosody preservation, and naturalness while achieving robust speaker anonymisation. Expert clinical evaluations by speech-language pathologists confirm that the method successfully preserves clinically relevant speech and pathological attributes. Ablations demonstrate that the physics-informed bottleneck prevents implausible resonance drift and ensures physically consistent formant shifts.

## Code

- https://github.com/suhitaghosh10/phy-vc.git

## Applications

Speech-language pathologists, clinical researchers, and health tech engineers building privacy-preserving systems to share clinical speech data for neurological condition monitoring and affective computing.

## Related

- (link related pages by id as the wiki grows)
