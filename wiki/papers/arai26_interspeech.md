---
id: arai26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-840
pdf: https://www.isca-archive.org/interspeech_2026/arai26_interspeech.pdf
---

# Articulatory Dynamics using Physical Vocal-tract Models

[PDF](https://www.isca-archive.org/interspeech_2026/arai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/arai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-840)

**TL;DR** — This study demonstrates that the VTM-UT30-D9 physical dynamic vocal-tract model can simulate speech dynamics and coarticulation phenomena, such as nasalization and targetless schwa insertion, from an articulatory phonology perspective.

## Problem

Evaluating synthesized speech outputs from physical vocal-tract models is crucial for phonetics, speech science, and pathology, but how well mechanical models simulate dynamic aspects of speech like coarticulation and timing variations remains insufficiently studied. Understanding these physical simulations provides an intuitive and practical platform for testing how temporal coordination and overlap of articulatory gestures shape acoustic output.

## Method

The authors utilized the VTM-UT30-D9 physical vocal-tract model, featuring a straight vocal tract with six movable polyoxymethylene blocks (representing lips, tongue blade, dorsum, and root) and a side-branch nasal cavity with a variable velopharyngeal (VP) port controlled by a dial. Articulatory movements were programmed using linear cam mechanisms corresponding to gestural scores under the Task Dynamics framework. Two sets of experiments were conducted: producing word pairs like [bɑb] vs. [bɑm] with varying VP coupling degrees (measured via 48 kHz swept-sine impulse responses), and generating the consonant cluster sequence [ɑbɹɑ] across eight temporal steps by progressively delaying the onset of the [ɹ] gesture.

## Results

Frequency response measurements for [ɑ] with VP coupling angles from 0° to 45° revealed expected nasal formants and anti-formants. For the [ɑbɹɑ] timing experiment across eight steps (N = 80 total trials, 10 repetitions per step), a Cochran–Armitage trend test showed a significant monotonic decrease in correct ASR (wav2vec 2.0 via MATLAB) recognition of the cluster (χ² = 42.538, p < 0.001), transitioning from 100% accuracy at Steps 0-1 to 0% at Steps 6-7 where a targetless schwa emerged due to gestural timing delays. Fisher's exact tests with Bonferroni correction confirmed an abrupt performance drop specifically between Step 1 and Step 2 (adjusted p = 0.021).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech scientists, phoneticians, and educators can use physical dynamic vocal-tract models to intuitively demonstrate speech production, gestural overlap, and coarticulation mechanisms.

## Related

- (link related pages by id as the wiki grows)
