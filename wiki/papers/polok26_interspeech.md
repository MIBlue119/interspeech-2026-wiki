---
id: polok26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-443
pdf: https://www.isca-archive.org/interspeech_2026/polok26_interspeech.pdf
---

# Mind the Gap: Impact of Synthetic Conversational Data on Multi-Talker ASR and Speaker Diarization

[PDF](https://www.isca-archive.org/interspeech_2026/polok26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/polok26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-443)

**TL;DR** — This paper investigates how synthetic conversation data properties impact multi-talker ASR and speaker diarization, introducing FastMSS, a highly efficient open-source conversation simulator that generates 1,000 hours of audio in under five minutes.

## Problem

Real conversational training data is severely scarce, expensive to annotate, and privacy-restricted, forcing reliance on synthetic data generation. However, simulation strategies remain fragmented and task-specific, leaving it unclear how turn-taking dynamics, source domains, and mixing strategies affect different downstream tasks. Furthermore, there is no consensus on whether synthetic data should substitute real recordings or how best to combine them.

## Method

The authors develop FastMSS, a conversation simulator featuring an expanded multi-speaker HMM turn-taking model (supporting turn hold, turn switch, interruption, and backchannel dynamics) and native Lhotse integration. They evaluate synthetic data generation recipes on two leading models: DiCoW (a Whisper-large-v3-turbo backbone conditioned on diarization for multi-talker ASR) and Sortformer (an offline 4-speaker EEND model with a 109M-parameter NEST-L encoder for diarization). Experiments systematically vary turn-taking priors, source domains (LibriSpeech, VoxPopuli, otoSpeech, AMI, and NOTSOFAR-1), acoustic augmentations via Pyroomacoustics and MUSAN, and data mixing strategies.

## Results

Optimal simulation recipes are highly task-dependent: boosting speech overlap improves multi-talker ASR (reducing NSF-1 tcpWER from 24.8% to 22.1%) but degrades speaker diarization (worsening macro DER from 26.1% to 27.6%). Broad source diversity consistently outperforms exact domain matching, with a combined synthetic dataset achieving a 10.0% macro average DER compared to 10.9% for real-only training on diarization. Combining synthetic data with real recordings yields the best overall performance, outperforming real-only training across every benchmark (e.g., reducing NSF-1 DiCoW tcpWER from 17.7% to 16.3% and AMI from 15.5% to 15.2%).

## Code

- https://github.com/popcornell/FastMSS

## Applications

Speech engineers and researchers building conversational AI systems can use FastMSS to rapidly scale up training data for multi-talker automatic speech recognition and speaker diarization models.

## Limitations

Concatenative simulation lacks inter-turn semantic coherence, which introduces distribution shifts mitigated in this work by freezing the ASR decoder.

## Related

- (link related pages by id as the wiki grows)
