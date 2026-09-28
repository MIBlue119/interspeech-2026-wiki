---
id: franz26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2608
pdf: https://www.isca-archive.org/interspeech_2026/franz26_interspeech.pdf
---

# From Echo to Accuracy: Robust Voice Quality Assessment Using Blind Unsupervised Diffusion-based Dereverberation

[PDF](https://www.isca-archive.org/interspeech_2026/franz26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/franz26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2608)

**TL;DR** — This study evaluates whether blind diffusion-based dereverberation can enable room-independent clinical voice quality assessment using Smoothed Cepstral Peak Prominence (CPPS), showing that secondary dereverberation successfully compensates for reverberation-induced bias and restores ranking consistency in continuous speech.

## Problem

Objective voice quality metrics such as CPPS are increasingly used in speech and language therapy to complement subjective perceptual ratings, but room acoustics like reverberation systematically reduce CPPS values and distort pathology assessments. Because clinical environments naturally feature diverse and unmeasured room impulse responses, room-induced bias severely limits the reliability of automated voice diagnostics. Traditional dereverberation methods require explicit room impulse response estimation or paired clean data, which are unavailable in clinical routines.

## Method

The authors test the unsupervised diffusion-based dereverberation model BUDDy to process voice recordings without clean references or measured room impulse responses. The evaluation pipeline utilizes two German voice databases: the Saarbrücken Voice Database (SVDB) with controlled low-reverberation samples and the ReST study database containing field recordings from untreated school rooms. Sustained vowels and continuous speech samples are first dereverberated, convolved with 35 real therapy room impulse responses, and then dereverberated a second time. CPPS values are extracted across all four stages using Praat on identical voiced segments, and performance is assessed using nonparametric Wilcoxon tests and two one-sided tests (TOST) for equivalence against data-driven relevance thresholds.

## Results

For low-reverberation SVDB data, the initial dereverberation introduced minimal changes, whereas for reverberant ReST data, CPPS appropriately increased. Convolution with real room impulse responses systematically decreased CPPS and increased variance across datasets. A second dereverberation step successfully reduced convolution-induced variance for both databases (confirmed H3a). For continuous speech, the second dereverberation successfully restored CPPS values within a data-driven equivalence corridor and significantly recovered voice quality ranking consistency across 34 of 35 rooms (confirmed H3b and H3c).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-language pathologists and engineers building automated voice health monitoring applications or clinical diagnostic tools that must operate reliably in everyday, acoustically uncontrolled environments.

## Limitations

The restoration of CPPS levels and rankings after the second dereverberation was successful for continuous speech but largely unsuccessful for sustained vowels.

## Related

- (link related pages by id as the wiki grows)
