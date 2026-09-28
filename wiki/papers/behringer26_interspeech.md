---
id: behringer26_interspeech
category: speech-coding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1459
pdf: https://www.isca-archive.org/interspeech_2026/behringer26_interspeech.pdf
---

# Assessing the Impact of Noise and Speech Enhancement on the Intelligibility of Speech Codecs

[PDF](https://www.isca-archive.org/interspeech_2026/behringer26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/behringer26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1459)

**TL;DR** — A crowdsourced evaluation of speech codecs reveals that classical codecs are significantly more noise robust than neural codecs, though speech enhancement preprocessing effectively bridges this gap.

## Problem

Neural speech codecs are increasingly replacing classical codecs at very low bitrates, but their real-world intelligibility and noise robustness remain under-evaluated beyond simple clean-condition tests. Understanding how noise, speech enhancement, and codec design interact is critical for ensuring reliable real-time communication. This work addresses the scarcity of sentence-level subjective intelligibility and listening effort assessments for codecs in adverse acoustic environments.

## Method

The study benchmarks six speech codecs including classical 3GPP standards (AMR-WB at 6.6 kbps, EVS at 8 kbps) and neural architectures (LPCNet at 1.6 kbps, Lyra V2 at 3.2 kbps, DAC at 1.5 kbps, and Mimi at 1.1 kbps). Stimuli consist of naturalistic sentences from the Clarity Speech Corpus mixed with four DEMAND noise types (living room, restaurant babble, car engine, metro) at 5, 15, and 25 dB SNRs. The evaluation tests clean, noisy, and speech-enhanced conditions where DeepFilterNet2 is applied as a real-time preprocessing step prior to coding. Subjective sentence-level intelligibility and listening effort are gathered via Amazon Mechanical Turk using an incomplete block design with 160 vetted native English participants producing 7,670 valid responses.

## Results

Subjective evaluations show that classical codecs outperform neural codecs at lower SNRs (5 and 15 dB), with EVS establishing the highest overall noise robustness. Integrating DeepFilterNet2 speech enhancement significantly improves intelligibility for neural codecs most impacted by noise, yielding substantial gains for DAC (Δ = 0.060), LPCNet (Δ = 0.082), and Mimi (Δ = 0.036). Listening effort analysis successfully resolves ceiling effects where intelligibility saturates above 0.95, demonstrating that DAC requires significantly less listening effort than other neural alternatives. Among objective metrics, automatic speech recognition transcriptions (such as Whisper-B and Whisper-L) exhibit higher condition-wise correlation with subjective intelligibility than traditional intrusive metrics like STOI and ESTOI.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers designing real-time communication systems, mobile voice codecs, or audio processing pipelines incorporating neural codecs and speech enhancement.

## Limitations

Inter-annotator reliability decreases at very low SNRs, driven by heightened task difficulty and listener variability.

## Related

- (link related pages by id as the wiki grows)
