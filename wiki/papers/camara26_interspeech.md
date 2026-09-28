---
id: camara26_interspeech
category: dataset
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1374
pdf: https://www.isca-archive.org/interspeech_2026/camara26_interspeech.pdf
---

# An Acoustic Landmark Database of the English Lexicon via Articulatory Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/camara26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/camara26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1374)

**TL;DR** — The paper introduces a synthetic English lexicon dataset containing over 200,000 words with time-aligned acoustic landmark annotations generated via physical articulatory synthesis.

## Problem

Research on acoustic landmark theory is constrained by a lack of large-scale, reliably annotated speech corpora, as manual labeling is labor-intensive and natural speech introduces confounding coarticulatory variations. Overcoming this gap is crucial for advancing event-driven automatic speech recognition and clinical speech analysis. By turning to a generative framework, the authors aim to produce an error-free sandbox corpus.

## Method

The corpus is generated using the Pink Trombone physical vocal-tract synthesizer, mapping entries from the CMU Pronouncing Dictionary converted to International Phonetic Alphabet sequences. Articulatory parameter targets for vowels, consonants, and diphthongs are interpolated linearly to simulate coarticulation under constant phone durations and fundamental frequency. The framework synthesizes parallel adult male and female configurations, rendering 16-bit 48 kHz audio files. Landmark labels are placed deterministically at exact physical event timestamps based on phoneme manner.

## Results

The resulting dataset comprises over 200,000 synthesized words for both adult male and female configurations, complete with time-aligned annotations. Intelligibility is quantitatively evaluated using the Short-Time Objective Intelligibility (STOI) metric. Lexical statistics from an articulatory-event perspective are reported, detailing landmark frequencies and dominant cue patterns. The database serves as a ground-truth benchmark for training and evaluating automatic landmark detectors.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers working on event-driven ASR systems, clinical speech pathology assessment, and phonetic research can use this dataset to train and benchmark automatic landmark detectors.

## Limitations

The synthesized words use constant phone durations and a fixed fundamental frequency, omitting natural prosodic variability.

## Related

- (link related pages by id as the wiki grows)
