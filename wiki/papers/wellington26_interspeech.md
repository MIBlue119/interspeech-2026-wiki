---
id: wellington26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2683
pdf: https://www.isca-archive.org/interspeech_2026/wellington26_interspeech.pdf
---

# Shared Phone-Level Neural Representations of Auditory Perception and ‘Inner Voice’ Production: One-to-One Mapping using a Single-Subject EEG Corpus of Heard and Imagined Natural Speech

[PDF](https://www.isca-archive.org/interspeech_2026/wellington26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wellington26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2683)

**TL;DR** — The paper introduces the Corpus of Heard and Imagined Natural Speech (CHINS)—over 22 hours of single-subject surface EEG recording time-aligned heard and imagined natural sentences—and demonstrates a one-to-one mapping between heard and imagined phones that improves the separation ratio by 3.37x using convex quadratic optimization.

## Problem

Developing speech neuroprostheses (BCIs) that decode imagined speech into audio requires large amounts of training data, but surface EEG datasets for imagined natural sentences in non-tonal languages with per-participant durations over 20 minutes do not currently exist. Furthermore, it is unclear how closely the neural processing of imagined speech aligns with auditory perception at the phonetic level, a relationship vital for evaluating whether heard speech data can scaffold imagined speech decoder training.

## Method

The CHINS dataset was collected from a single expert-informed participant using a BioSemi ActiveTwo 64-channel EEG at 1,024 Hz while listening to and subsequently imagining narrated fiction audiobooks with time-aligned visual prompts. The data were filtered into 18 frequency sub-bands using a fourth-order Butterworth IIR filter, cleaned via ICA for ocular artefacts, and processed to compute event-related potentials (ERPs) smoothed with a Savitzky-Golay filter. A convex quadratic optimization problem was solved using BFGS and hard-constrained solvers over sub-band tensor weights, minimizing the sum of Canberra distances between imagined and heard phone ERPs subject to permutation-like linear constraints.

## Results

Using data across all 39 phones of the CMU pronouncing dictionary, the analysis established that the ERPs of imagined phones are closest in vector space to their corresponding heard phones. Hierarchical clustering of the ERP distances via Ward's method revealed four distinct groups based on phonological natural classes (vowels, nasals/plosives/approximants by placement, and fricatives). Optimization of the cross-modality sub-band weighting via convex quadratic programming improved the phonetic separation ratio by a factor of 3.37 compared to the unweighted baseline.

## Code

- https://www.speakunique.co.uk/research/CHINS

## Applications

Speech/ML engineers and biomedical researchers building non-invasive brain-computer interfaces and speech neuroprostheses for augmentative and alternative communication (AAC) devices.

## Limitations

The dataset is restricted to a single participant and captures covert speech production processes associated with the phonological loop rather than arbitrary unprompted inner speech.

## Related

- (link related pages by id as the wiki grows)
