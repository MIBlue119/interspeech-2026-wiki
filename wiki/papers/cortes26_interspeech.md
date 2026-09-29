---
id: cortes26_interspeech
category: phonetics-linguistics
labels: [dataset-or-benchmark-release]
institutions: ["Stockholm University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2647
pdf: https://www.isca-archive.org/interspeech_2026/cortes26_interspeech.pdf
---

# The ArtComp dataset: Articulatory and Acoustic Measurements of Swedish in Speech with Naturally Manipulated Jaw Position

*Elísabet Eir Cortes, Lisa Gustavsson, Ellen Marklund*

[PDF](https://www.isca-archive.org/interspeech_2026/cortes26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cortes26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2647)

**Category:** `phonetics-linguistics` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — The ArtComp dataset provides time-aligned acoustic, electromagnetic articulography (EMA), EGG, and video recordings from 7 Swedish speakers uttering 18 vowels under natural jaw perturbations caused by variable vocal effort. It captures 3,000 total tokens (1,100 fully analyzed) to support research on compensatory articulation.

## Key contributions

- Introduces the ArtComp dataset containing multi-modal articulatory (EMA), glottal (EGG), acoustic, and visual measurements for Central Standard Swedish (CSS).
- Employs a novel elicitation protocol (DOVA: Damped Output and Visual Aid) using a custom attenuator and real-time visual feedback to prompt a full range of vocal effort from softest phonation to shouting without relying on ambient noise or bite-blocks.
- Provides standardized post-processing pipelines incorporating custom bite-plates for coordinate transformation into a speaker-referenced midsagittal and maxillary occlusal coordinate space.
- Replaces unreliable automated high-f0 formant tracking with an aggregated semi-manual method combining wideband spectrograms, inverse filtering (Sopran), and spectral envelope fitting evaluated via acoustic synthesis (Madde).

## Problem

Investigating how speakers compensate for altered jaw positions typically requires artificial constraints like bite-blocks or mechanical resistive loads, which disrupt natural articulatory dynamics. Alternative methods like the Lombard effect (using ambient noise) fail to elicit very soft speech and can cause auditory discomfort during loud utterances. Existing electromagnetic articulography (EMA) datasets for Swedish lack comprehensive coverage of extreme, naturally induced jaw variability across the full vowel inventory, leaving a gap for studying adaptive articulatory compensation.

## Method

Data were recorded in a soundproof studio using a 5DOF Wave Speech Research System sampling at 100 Hz with six sensors placed on the jaw (JW), upper lip (UL), lower lip (LL), mouth corner (MC), and tongue (TT, TB), plus a nasion reference sensor (REF). Custom Tenax wax bite-plates with embedded 5DOF sensors were used to capture the maxillary occlusal plane for subsequent spatial rotation and translation into a speaker-referenced working space. Vocal effort was modulated via the DOVA setup, where a control-room attenuator dropped microphone output by 10 dB across 4-5 steps, forcing speakers to monitor a VU-meter to keep red indicator lights visible.

Audio was captured at 48 kHz/24-bit stereo via an AKG CK93 hypercardioid microphone and Scarlett 2i2 interface, alongside a synchronizing headset lavalier. Vocal fold contact area was monitored via an EG2-PCX EGG device with four laryngeal electrodes, and lip movements were recorded from front and side angles via 1080p/30fps action cameras. Acoustic annotations in Praat mapped 18 CSS vowels in an /iːbɔːb/ context, while formant values were derived using a hybrid approach of manual inspection, Sopran inverse filtering, and custom spectrum-matching code.

## Experimental setup

The dataset comprises 7 native speakers of Central Standard Swedish (3 female, 4 male, mean age 31 years) producing 3,000 total tokens of 18 CSS vowels (1,100 fully analyzed). Data modalities include 100 Hz 3D EMA coordinates, 48 kHz stereo audio, dual-angle 30 fps video, and EGG signals. The paper serves as a descriptive dataset release and methodological validation rather than an algorithmic benchmark comparison.

## Results

ArtComp contains 3,000 tokens of 18 vowels across 4 to 5 vocal effort damping levels, resulting in relative intensity spans up to 85 dB Rel.Int. Comparisons between the DOVA method and traditional ambient noise elicitation confirm that DOVA yields a wider relative intensity range and greater articulatory response. The authors note that inherent confounding factors such as fundamental frequency (f0) shifts tied to high vocal effort must be accounted for when modeling the resulting articulatory trajectories.

## Limitations

The dataset currently includes a limited cohort of only 7 speakers of Central Standard Swedish, restricting dialectal and cross-linguistic generalizability. Articulatory tracking via EMA sensors, despite being lightweight (3x3x3 mm), may introduce minor mechanical interference, and the tight coupling of vocal effort with fundamental frequency requires explicit disentanglement in downstream models.

## Why read this

Speech researchers and machine learning engineers building acoustic-to-articulatory inversion models, articulatory speech synthesizers, or studying speech motor control should read this paper to leverage a clean, multi-modal resource capturing natural compensatory adaptation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Acoustic-to-articulatory inversion, articulatory speech synthesis, speech motor control modeling, and clinical assessments of speech production.

## Institutions / 機構

Stockholm University

**Funding / 經費:** The L3WOproject, The Marcus and Amalia Wallenberg Foundation

## Related

- (link related pages by id as the wiki grows)
