---
id: ghosh26_interspeech
category: deepfake-security
labels: [generative-model]
institutions: ["Otto-von-Guericke University", "University of Birmingham"]
code: https://github.com/suhitaghosh10/phy-vc.git
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-378
pdf: https://www.isca-archive.org/interspeech_2026/ghosh26_interspeech.pdf
---

# Phy-VC: Physics-Informed Voice Conversion for Privacy-Preserving Pathological Speech

*Suhita Ghosh, Yamini Sinha, Melanie Jouaiti, Tim Wansiedler, Kim Hakenberg, Julian Karcher, Ingo Siegert, Sebastian Stober*

[PDF](https://www.isca-archive.org/interspeech_2026/ghosh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ghosh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-378)

**Category:** `deepfake-security` · **Labels:** `generative-model`

**TL;DR** — Phy-VC is a physics-informed voice conversion framework for anonymising pathological and atypical speech while preserving clinical diagnostic markers. It integrates a differentiable vocal tract resonance model as an inductive bias, outperforming state-of-the-art baselines in intelligibility, prosody preservation, and clinical attribute retention.

## Key contributions

- A physics-informed vocal tract bottleneck that replaces unconstrained spectral estimation with articulatory-to-acoustic modelling, yielding physically consistent resonance patterns and robust out-of-distribution generalisation.
- Target-pool prosodic feature mapping to prevent source-speaker leakage through emotion and prosody pathways.
- Interpretable speaker control via vocal tract length (VTL) manipulation (larynx height parameter alpha_6), allowing systematic speaker diversification and size modification beyond the training pool.
- Comprehensive expert clinical evaluation by speech-language pathologists demonstrating significantly better preservation of pathological attributes (e.g., prolongation, dysphonia) compared to prior DDSP frameworks.

## Problem

Speech-based digital biomarkers are critical for clinical assessments in dementia and affective monitoring, but sharing clinical speech risks privacy breaches and voice cloning attacks. Standard speech anonymisation methods alter or suppress critical diagnostic cues like dysfluencies, unnatural pauses, and voice tremor, while generalising poorly to atypical pathological and elderly articulation. Existing deep learning approaches such as VAEs, GANs, and unconstrained DDSP-based architectures either over-smooth rapid irregular acoustic events, leak source emotion, or suffer from implausible resonance drift because they lack physical constraints on vocal tract shaping.

## Method

Phy-VC builds upon DDSP-QbE, operating in three stages: mapping, fusion, and synthesis. First, phonetic representations from the 6th layer of WavLM are matched to a target speaker phonetic pool via KNN, and emotion representations from the 12th layer are similarly matched to a target emotion pool to prevent information leakage. In the physics-informed bottleneck stage, the mapped features pass through a Conv1D smoother, self-attention layers, and an MLP to predict eight Maeda articulatory degrees of freedom alpha in [-1, 1]^8 (jaw opening, tongue-body position, tongue shape, tongue tip, lip aperture, lip protrusion, larynx height alpha_6, and velopharyngeal port alpha_7).

Next, the vocal tract geometry module translates these articulatory controls into a time-varying area function using Story's parametric framework, separating oral geometry from nasal coupling via Gaussian perturbations. Instead of solving the expensive Sturm-Liouville differential equations directly, a lightweight CNN Webster surrogate (using multi-scale Conv1D branches with kernel sizes 3, 7, and 11, GroupNorm, and global pooling) maps the area function to 5 formant frequencies and log-bandwidths. An exponential warp driven by larynx height alpha_6 scales all formants to simulate speaker size. Formant filter construction converts these into smooth Lorentzian peaks forming the spectral envelope E(f,t).

Finally, the subtractive DDSP synthesis path uses a predicted fundamental frequency F_0 with PolyBLEP anti-aliasing, a harmonic source filter to model spectral tilt, and the physics-based vocal tract filter. A stochastic path adds filtered white noise, blended using a predicted voicing mask with squared suppression to eliminate noise in voiced regions. The model is trained jointly with multi-resolution spectral losses, F_0 losses, explicit formant (linear space) and bandwidth (log space) supervision, voicing binary cross-entropy, expressiveness floors for articulatory variability, and an intra-utterance variance penalty on alpha_6 for identity stability.

## Experimental setup

Models are trained on a standard non-pathological speech corpus comprising 50 speakers from LibriSpeech (~15 hours) and 5 speakers from ESD (~8 hours, all emotions) with an 80/20 train/validation split, intentionally excluding clinical data. Evaluation uses 5 datasets resampled to 16kHz: LibriSpeech train-clean-100, ESD, ADReSSo (2,729 utterances from 293 speakers for elderly/dementia speech), Sep-28k and Fluency Bank (16,135 recordings from 419 speakers for stuttering speech), and VCTK (target speakers with Scottish/Welsh accents). Baselines include Emo-StarGAN, KNN-VC, and DDSP-QbE. Metrics include Equal Error Rate (EER) via ECAPA-TDNN embeddings, Character Error Rate (CER) via Whisper-medium, Pearson Correlation Coefficient (PCC) of F_0 contours, predicted MOS (pMOS), and domain preservation classifier accuracy.

## Results

In the pooled All->SD scenario, Phy-VC achieves competitive privacy with an EER of 44.8% while outperforming DDSP-QbE across utility metrics, yielding higher pMOS (3.5 vs 3.2), higher prosody preference (59.2%), lower speaker similarity (2.1 vs 2.6), and superior clinical attribute retention (e.g., prolongations preserved at 89% vs 68%). On elderly-to-SD conversion, Phy-VC achieves an 82.9% domain preservation rate and 15.7% CER, significantly improving over DDSP-QbE's 19.6% CER. On stuttering-to-SD (specifically blocks), Phy-VC reaches 89.1% domain preservation and 22.8% CER versus 28.7% for DDSP-QbE. 

Ablations demonstrate that removing the physics bottleneck or formant loss causes catastrophic degradation in intelligibility (CER jumping from 5.3% to 18.2% without formant loss). Removing identity stability or expressiveness floor losses compromises privacy protection by reducing EER from 44.9% down to 41.0%-42.0%.

| System | Domain Pr. (%) | PCC (x10^2) | pMOS | CER (%) | EER (%) |
|---|---|---|---|---|---|
| Emo-StarGAN (Elderly) | 61.2 | 65.2 | 1.8 | 29.0 | - |
| KNN-VC (Elderly) | 66.0 | 41.5 | 1.8 | 16.3 | - |
| DDSP-QbE (Elderly) | 77.9 | 69.2 | 2.7 | 19.6 | - |
| Phy-VC (Elderly) | 82.9 | 73.1 | 3.0 | 15.7 | - |
| Phy-VC (Full, All->SD) | 85.0 | 79.4 | 3.2 | 5.3 | 44.9 |

## Limitations

The all-pole Lorentzian filter models nasalisation primarily through formant shifts rather than spectral zeros (anti-resonances) expected from true velopharyngeal coupling. The one-dimensional acoustic model simplifies complex three-dimensional vocal tract geometry and source-filter interactions. Articulatory parameters are inferred from acoustics rather than measured directly via EMA or MRI, and LPC-based formant tracking remains unreliable during severe pathological dysfluencies.

## Why read this

Researchers and engineers working on speech anonymisation, privacy-preserving machine learning, or digital health biomarkers should read this paper to see how differentiable physics-based neural modules can prevent diagnostic distortion in atypical speech. It provides a blueprint for integrating articulatory inductive biases into deep generative audio pipelines.

## Code

- https://github.com/suhitaghosh10/phy-vc.git

## Applications

Privacy-preserving clinical data sharing, clinical speech anonymisation for telemedicine, and voice conversion for neurological or affective speech assessment.

## Institutions / 機構

Otto-von-Guericke University, University of Birmingham

**Funding / 經費:** Federal Ministry of Education and Research of Germany

## Related

- (link related pages by id as the wiki grows)
