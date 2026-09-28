---
id: deng26b_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1004
pdf: https://www.isca-archive.org/interspeech_2026/deng26b_interspeech.pdf
---

# Codec-induced Mismatch, Speech Duration, and Speaker-dependent Effect in a DNN-based Forensic Speaker Recognition System

[PDF](https://www.isca-archive.org/interspeech_2026/deng26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/deng26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1004)

**TL;DR** — This study evaluates how lossy speech codecs and speech duration affect a deep neural network-based forensic speaker recognition system, revealing significant speaker-dependent vulnerabilities despite strong overall system performance.

## Problem

Forensic automatic speaker recognition systems often handle questioned speech samples that suffer from channel mismatches and short durations, yet prior evaluations largely study these factors in isolation. Furthermore, aggregate system-level performance metrics mask substantial individual-level variability, hiding the fact that some speakers experience severe performance degradation or instability. This oversight poses critical risks for forensic casework, where reliable evidence interpretation for every individual speaker is essential.

## Method

The system uses a ResNet34 backbone enhanced with an 8-head multi-head attentive statistics pooling (MHA) layer, producing 512-dimensional speaker embeddings, coupled with an LDA-PLDA backend for likelihood ratio scoring. It is trained on VoxCeleb1+2 (7,205 speakers) with extensive data augmentation including MUSAN noise, room impulse responses, and SpecAugment. Evaluations use a custom dataset of 102 male Hong Kong Cantonese speakers across four non-contemporaneous sessions, testing questioned speech durations from 5s to 90s in 5s increments. Tested lossy codecs applied to questioned speech include G.711 A-law (64 kb/s), AMR-NB (at 12.2 kb/s and 6.7 kb/s), and Opus (128 kb/s, 16 kHz).

## Results

Tested on 130 same-speaker and 4,292 different-speaker trials using log-likelihood-ratio cost (Cllr) and individual-level Cllr spk metrics. System-level performance reaches saturation at around 30 seconds of questioned speech, with Opus showing minimal impact compared to high-quality matching, while low-bitrate AMR-NB (6.7 kb/s) causes the greatest performance degradation. Individual-level analysis reveals that specific speakers experience severely elevated Cllr spk exceeding 1.0 (indicating misleading likelihood ratios) under short durations or heavy codecs, and that speakers with poorer average performance are disproportionately sensitive to codec-induced mismatch.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Forensic speech scientists, speech technology engineers, and legal experts evaluating the reliability and admissibility of automated speaker recognition evidence under degraded audio channels.

## Limitations

The evaluation relies on a relatively small, homogeneous dataset of young male Hong Kong Cantonese speakers, and individual-level metrics exhibit higher sampling variability due to limited trials per speaker.

## Related

- (link related pages by id as the wiki grows)
