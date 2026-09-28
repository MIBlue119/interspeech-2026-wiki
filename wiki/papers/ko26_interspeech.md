---
id: ko26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-891
pdf: https://www.isca-archive.org/interspeech_2026/ko26_interspeech.pdf
---

# Mispronunciation Modeling via PPG-Based Phone Editing: A Data Augmentation Framework for Dysarthric Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/ko26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ko26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-891)

**TL;DR** — This paper proposes a dysarthric speech data augmentation framework using phonetic posteriorgram (PPG) phone editing and speaking style conversion, achieving an overall word error rate of 19.53% on the UASpeech corpus.

## Problem

Automatic speech recognition systems struggle with dysarthric speech due to severe acoustic mismatches, high pronunciation variability, and extreme data scarcity. Collecting large amounts of disordered speech is impractical, while existing augmentation methods primarily alter global acoustics rather than fine-grained, speaker-dependent articulatory defects and mispronunciations. This creates a critical need for generative techniques that can accurately simulate individual pathological pronunciation patterns to train robust ASR models.

## Method

The framework consists of three main components: pronunciation variation analysis for PPG phone editing, speaking style conversion via a modified UUVC synthesizer, and phonetic-level speed perturbation. First, a phonetic mapping matrix is constructed by aligning phoneme sequences from paired dysarthric and control utterances to quantify speaker-dependent substitutions and deletions. Target phonemes in typical speech PPGs are then edited by swapping probability distributions based on accuracy and substitution thresholds. Next, a modified UUVC synthesizer replaces discrete units with continuous PPGs and integrates speaker/pitch embeddings through a source-filter-energy network to generate mel-spectrograms converted via HiFi-GAN. Finally, phonetic-level speed perturbation is applied using WSOLA based on forced-alignment phoneme durations from the Kaldi toolkit. The system fine-tunes a HuBERT Large ASR model on the augmented UASpeech dataset.

## Results

Evaluated on the UASpeech corpus using word error rate (WER), the method is compared against a GAN-based augmentation baseline. The overall WER is reduced to 19.53%, outperforming the 21.88% baseline, with the largest gains in low and very-low intelligibility subgroups (improving by 3.69% and 4.54%, respectively). Synthesizer evaluation on MOSNet yields a 2.55 naturalness score (close to ground truth 2.68) and a speaker embedding similarity of 0.71. Ablation studies confirm the superiority of the proposed structured phonetic mapping over random replacement, and validate the importance of speaking style conversion and phonetic-level speed perturbation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building accessible voice interfaces and assistive automatic speech recognition technologies for individuals with motor speech disorders.

## Limitations

The framework is speaker-dependent, requiring paired control and dysarthric utterances to construct the mapping matrices.

## Related

- (link related pages by id as the wiki grows)
