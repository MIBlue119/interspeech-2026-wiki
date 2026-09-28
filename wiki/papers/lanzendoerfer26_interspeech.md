---
id: lanzendoerfer26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1809
pdf: https://www.isca-archive.org/interspeech_2026/lanzendoerfer26_interspeech.pdf
---

# Evaluating Objective Speech Quality Metrics for Neural Audio Codecs

[PDF](https://www.isca-archive.org/interspeech_2026/lanzendoerfer26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lanzendoerfer26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1809)

**TL;DR** — This paper evaluates how well objective speech quality metrics correlate with human perceptual scores when assessing reconstructions from state-of-the-art neural audio codecs, finding that traditional PESQ and recent SCOREQ offer the strongest alignment.

## Problem

While neural audio codecs (NACs) provide high compression and fidelity, evaluating their perceptual speech quality usually requires costly and slow human listening tests. Existing objective metrics often exhibit domain dependence and their reliability in capturing distortions introduced by modern sub-10 kbps NACs remains insufficiently understood. This lack of validated automated metrics hinders efficient codec development and benchmarking.

## Method

The authors perform a double-blind MUSHRA listening test using clean speech and mixed speech-plus-background audio samples from the ODAQ dataset, resampled to 48 kHz. They evaluate six low-bitrate state-of-the-art models operating below 8 kbps: DAC, EnCodec, Multi-Band Diffusion, Mimi, SNAC, and Vocos. They then compute Pearson correlation coefficients and Kendall's tau between mean subjective MUSHRA scores and a comprehensive suite of 20+ objective metrics—encompassing intrusive distortion/perceptual measures, intelligibility measures, and non-intrusive MOS predictors.

## Results

PESQ and SCOREQ demonstrated the strongest and most consistent correlation with human perception across conditions, achieving Pearson correlation coefficients around 0.87 to 0.94 on speech-only data and robust performance on combined audio. In contrast, reference-free (non-intrusive) metrics like DNSMOS, NISQA, and NORESQA showed poor or near-zero correlation on mixed content because background sounds confused the models. DAC achieved the highest subjective scores among the tested codecs, though it operates at a slightly higher bitrate than ultra-low-rate alternatives like SNAC.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers developing, selecting, or benchmarking neural audio codecs and generative audio models can use these findings to choose reliable objective evaluation metrics.

## Limitations

None of the evaluated metrics explicitly account for spatial/stereo quality, which limited their correlation performance on multi-channel mixed audio contents.

## Related

- (link related pages by id as the wiki grows)
