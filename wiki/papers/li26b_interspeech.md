---
id: li26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-170
pdf: https://www.isca-archive.org/interspeech_2026/li26b_interspeech.pdf
---

# The Effect of Neck Skin Vibration on the Periauricular Acoustic Receiver

[PDF](https://www.isca-archive.org/interspeech_2026/li26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-170)

**TL;DR** — This study demonstrates that neck skin vibrations during self-voicing generate secondary airborne acoustic components that significantly contaminate periauricular microphone recordings, particularly below 1 kHz.

## Problem

Traditional self-speech simulation models assume that mouth radiation is the sole acoustic source, ignoring structural tissue vibrations transmitted through the neck. During vocalization, neck skin vibrations propagate through the air and reach wearable ear-level devices, introducing low-frequency artifacts and distorting spectral features. Revealing this vibro-acoustic coupling relationship is crucial for improving wearable audio hardware design and self-voice separation algorithms.

## Method

The authors compare experimental recordings from a GRAS KEMAR dummy head (mouth-only playback) and two human subjects reading passages against frequency-domain Boundary Element Method (BEM) acoustic simulations. A GPU-accelerated BEM solver was developed and validated against COMSOL using a sphere-scattering benchmark. Multi-channel relative transfer functions (RTFs) were computed from simultaneous recordings of periauricular, forehead, and front-of-mouth reference microphones using 48 kHz audio interfaces.

## Results

Comparisons between dummy-head measurements and BEM simulations showed close agreement, validating the mouth-only acoustic model in the absence of tissue vibrations. For human subjects, forehead microphone measurements closely matched BEM predictions, but periauricular microphones—especially those positioned closer to the neck—exhibited measured sound pressure magnitudes substantially exceeding simulation curves below 1 kHz. This excess energy indicates that neck skin vibration serves as a critical secondary acoustic excitation pathway near the ear.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers designing wearable audio devices, hearing aids, and self-voice separation or speech enhancement algorithms for hearables.

## Limitations

The study is limited by a small cohort of human subjects (two participants), uncalibrated sensors, and a qualitative focus on observed coupling rather than a fully calibrated physical mapping between absolute neck acceleration and periauricular pressure.

## Related

- (link related pages by id as the wiki grows)
