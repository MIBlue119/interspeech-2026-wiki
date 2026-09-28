---
id: cortes26_interspeech
category: dataset
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2647
pdf: https://www.isca-archive.org/interspeech_2026/cortes26_interspeech.pdf
---

# The ArtComp dataset: Articulatory and Acoustic Measurements of Swedish in Speech with Naturally Manipulated Jaw Position

[PDF](https://www.isca-archive.org/interspeech_2026/cortes26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cortes26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2647)

**TL;DR** — The ArtComp dataset provides time-aligned acoustic, electromagnetic articulography (EMA), electroglottography (EGG), and video data from seven native Swedish speakers producing vowels across naturally manipulated jaw positions induced by varying vocal effort.

## Problem

Investigating how articulators adapt and compensate for perturbed jaw positions usually requires artificial tools like bite-blocks or mechanical loads, which lack ecological validity. Existing Swedish speech datasets lack natural extremes in jaw opening and vocal effort, limiting research into phonetic variability, acoustic-to-articulatory inversion, and compensatory speech mechanisms.

## Method

The dataset captures seven native Central Standard Swedish speakers (3 female, 4 male; mean age 31) uttering 18 vowels in an 'i"b b' context across 3,000 total tokens (1,100 fully analyzed). To elicit variable jaw positions naturally without artificial bite-blocks, researchers developed DOVA (Damped Output and Visual Aid), attenuating microphone output in 10 dB steps while speakers used a VU-meter visual aid to maintain vocal effort from soft to shouting. Articulatory tracking used a 100 Hz Wave Speech Research System with 5DOF sensors on the jaw, lips, mouth corners, and tongue, alongside a reference sensor, custom maxillary bite-plates for coordinate calibration, EGG for vocal fold contact area, dual-angle lip video, and a 48 kHz hypercardioid microphone setup.

## Results

The ArtComp release contains 3,000 tokens (1,100 fully analyzed) across seven speakers, covering 18 Swedish vowels in bilabial contexts. Data processing standardizes all EMA tracks into a speaker-referenced midsagittal and maxillary occlusal coordinate space using individual bite-plate calibrations. Comparisons verify that the DOVA elicitation method yields broader articulatory responses and wider relative intensity ranges than traditional ambient noise methods.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians, speech engineers, and clinical researchers use this dataset for studying articulatory compensation, acoustic-to-articulatory inversion, articulatory speech synthesis, vocal effort modulation, and pitch control.

## Limitations

Varying vocal effort inherently alters fundamental frequency alongside jaw position, requiring researchers to disentangle f0 effects from articulation, and minor mechanical interference from EMA sensors cannot be entirely ruled out.

## Related

- (link related pages by id as the wiki grows)
