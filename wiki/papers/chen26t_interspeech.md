---
id: chen26t_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1882
pdf: https://www.isca-archive.org/interspeech_2026/chen26t_interspeech.pdf
---

# A Preclinical Study of Electrolaryngeal Voice Conversion for a Novel Nasal Electrolarynx: Feature Choice and Data Augmentation

[PDF](https://www.isca-archive.org/interspeech_2026/chen26t_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26t_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1882)

**TL;DR** — This paper presents the first systematic evaluation of sequence-to-sequence voice conversion for a novel nasal electrolarynx (NEL), demonstrating that Mel-spectrogram inputs outperform self-supervised representations due to device-specific acoustics, and that an LLE-VC-based data augmentation strategy improves intelligibility.

## Problem

Patients who have undergone laryngectomy commonly use cervical electrolaryngeal (CEL) devices, which suffer from loud mechanical noise and a lack of pitch variation, and require neck contact. A newly invented nasal electrolarynx (NEL) offers internal coupling and hands-free speech, but exhibits unique acoustic traits like mid-high-frequency resonances and low-frequency attenuation. Because traditional CEL-oriented voice conversion and general zero-shot VC fail to handle these unique characteristics, and parallel patient data is extremely scarce, specialized conversion and augmentation strategies are required.

## Method

The study adapts transformer-based sequence-to-sequence voice conversion models—specifically VTN-VC and an extended ETN-VC with extra pretraining—for electrolaryngeal voice conversion (ELVC). To address NEL data scarcity, the authors propose an LLE-VC-based data augmentation pipeline that synthesizes paired sNEL-sNL datasets using 10,000 sentences from the TWnews corpus generated via F5-TTS. They evaluate two input feature types: 80-dimensional Mel-spectrograms and 1024-dimensional features extracted from layer 6 of the WavLM-Large model. Separate HiFi-GAN vocoders are trained on the 44-hour COSPRO dataset for waveform reconstruction across both feature variants.

## Results

Experiments on a Mandarin Chinese dataset of 320 TMHINT sentences show a device-dependent feature split: WavLM features work best for CEL-to-NL conversion, whereas Mel-spectrograms better preserve NEL-specific spectral cues for NEL-to-NL conversion. Incorporating the proposed LLE-VC data augmentation (ETN-VC with Mel-spectrograms) reduces the character error rate (CER) from 72.0% to 63.0% and the syllable error rate (SER) from 58.8% to 53.8% compared to the baseline VTN-VC. Off-the-shelf zero-shot VC baselines (SeedVC, MKL-VC, Vevo) yielded drastically higher SERs between 71.8% and 101.5%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and medical device developers building voice restoration and enhancement systems for laryngectomy patients using nasal electrolarynx devices.

## Limitations

The study is currently conducted as a preclinical evaluation using recordings from a single healthy speaker in a controlled ward setting rather than actual patients.

## Related

- (link related pages by id as the wiki grows)
