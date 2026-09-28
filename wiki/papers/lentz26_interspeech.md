---
id: lentz26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2713
pdf: https://www.isca-archive.org/interspeech_2026/lentz26_interspeech.pdf
---

# BeatGain - A Rhythmic Pattern Enhancement Algorithm for Music Listening with Cochlear Implants

[PDF](https://www.isca-archive.org/interspeech_2026/lentz26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lentz26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2713)

**TL;DR** — The BeatGain algorithm enhances music perception for cochlear implant users by selectively amplifying metrically strong beats and eighth-note subdivisions while attenuating off-grid sixteenth notes, significantly improving rhythmic clarity over baseline remixing approaches.

## Problem

Cochlear implant (CI) users experience limited music perception due to reduced spectral resolution and current spread, though their temporal envelope cues remain well preserved. While prior music enhancement methods adjust spectral balance or globally amplify percussive stems, they fail to explicitly target the internal rhythmic structure and metrical hierarchy of music. This lack of metrically guided temporal shaping leaves complex syncopation and off-beat events to interfere with concurrent spectral components, reducing clarity for listeners with impaired spectral hearing.

## Method

The BeatGain pipeline first decomposes input music into vocal, bass, drums, and other stems using the pretrained Spleeter neural network. Each stem is separated into harmonic and percussive components using directional median filtering, after which harmonic components of bass, drums, and others are discarded while vocals are fully retained. Pretrained BeatThis! neural beat tracking extracts quarter-note timings and metrical positions, which are linearly interpolated to sixteenth-note grids and modulated via Hann-windowed gain signals. In this proof-of-concept setup, quarter and eighth notes are amplified by a factor of two while intermediate sixteenth notes are attenuated to zero.

## Results

Evaluated on the IKA CI Pop Music Dataset containing 15 rock and pop excerpts, the proposed method was tested against unprocessed signals and baseline remixing conditions (V+P, V+2P) using a noise-excited band-pass vocoder to simulate CI perception with 17 normal-hearing participants in a 2AFC listening experiment. Objective instrumental complexity scores (Buyens et al.) decreased more sharply for BeatGain at higher amplification parameters while maintaining stable scale-invariant SI-SDR distortion bounds. In subjective evaluations, BeatGain was significantly preferred over unprocessed audio and standard stem remixing in rhythmic clarity and overall impression. Furthermore, BeatGain achieved a statistically significant preference over uniform percussive amplification (V+2P) specifically for rhythmic clarity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cochlear implant sound processors and music pre-processing software for listening devices to enhance rhythm and overall enjoyment of music.

## Limitations

The current framework is restricted to 4/4 meter music and relies on a fixed, simple proof-of-concept gain pattern without listener-specific parameterization.

## Related

- (link related pages by id as the wiki grows)
