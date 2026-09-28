---
id: pangsatabam26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2304
pdf: https://www.isca-archive.org/interspeech_2026/pangsatabam26_interspeech.pdf
---

# Scalable Neural TTS for Latin-Script Low-Resource Languages of Manipur

[PDF](https://www.isca-archive.org/interspeech_2026/pangsatabam26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pangsatabam26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2304)

**TL;DR** — This paper introduces the first speech corpora and monolingual text-to-speech baseline systems for Tangkhul and Maring, two unscripted, Latin-adapted tribal languages of Manipur, achieving a Mean Opinion Score of up to 4.36 in naturalness with FastSpeech 2 and Style MelGAN.

## Problem

Many indigenous languages in Northeast India lack native scripts and rely on varied, unstandardized adaptations of the Latin alphabet to represent complex phonotactics and tone. Because these communities lack existing speech resources and digital corpora, they are excluded from modern speech technology development. Building automated speech systems for these endangered or under-represented Tibeto-Burman languages is critical for language preservation, accessibility, and educational tool creation.

## Method

The authors construct high-quality speech datasets via studio recordings from native speakers reading textbooks, storybooks, and Bible translations, followed by an automated VAD segmentation pipeline, LUFS loudness normalization (-16.0 LUFS), and peak limiting. They train monolingual character-level text-to-speech architectures using Tacotron 2 (15.32M parameters, 100K iterations) and FastSpeech 2 (37.10M parameters, 320K iterations) implemented within the ESPnet toolkit on an NVIDIA Quadro RTX 5000 GPU. For waveform generation, they compare the Griffin-Lim algorithm against Style MelGAN, a neural vocoder utilizing global style vectors to preserve dialectal timbre.

## Results

Evaluated on Tangkhul and Maring datasets (consisting of 9.58h and 10.79h of processed speech respectively), neural vocoding with Style MelGAN substantially outperforms Griffin-Lim, yielding a 25% to 29% reduction in Mel-Cepstral Distortion (MCD). Subjective evaluations via Mean Opinion Score (MOS) demonstrate that FastSpeech 2 paired with Style MelGAN achieves the highest perceptual performance, reaching a seen-speaker MOS of 3.84 to 4.00 and a naturalness score of up to 4.36 for Maring.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building educational applications, accessibility tools, or digital preservation pipelines for low-resource and unscripted tribal languages.

## Limitations

The work focuses solely on single-speaker read speech within specific standard dialects of two tribal languages, relying on constrained dataset sizes under 11 hours per language.

## Related

- (link related pages by id as the wiki grows)
