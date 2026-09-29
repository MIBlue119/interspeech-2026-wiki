---
id: wellington26_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
institutions: ["University of Bath", "SpeakUnique"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2683
pdf: https://www.isca-archive.org/interspeech_2026/wellington26_interspeech.pdf
---

# Shared Phone-Level Neural Representations of Auditory Perception and ‘Inner Voice’ Production: One-to-One Mapping using a Single-Subject EEG Corpus of Heard and Imagined Natural Speech

*Scott Wellington, Oliver Watts, Damien Coyle, Benjamin Metcalfe*

[PDF](https://www.isca-archive.org/interspeech_2026/wellington26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wellington26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2683)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — The paper introduces the Corpus of Heard and Imagined Natural Speech (CHINS), containing over 22 hours of single-participant surface EEG data for continuous heard and imagined sentences, and demonstrates a robust one-to-one mapping and phonetic-level neural alignment between auditory perception and imagined speech production.

## Key contributions

- Released the CHINS dataset, comprising over 21 hours and 22 minutes of time-aligned heard and imagined natural fully-connected speech EEG data from a single expert-informed participant.
- Demonstrated that event-related potentials (ERPs) of phones elicited during imagined speech are closest in vector space to their corresponding phones in heard speech.
- Formulated a convex quadratic optimisation approach utilizing a weighted sum of 18 frequency sub-bands to optimize the one-to-one mapping between heard and imagined phones, improving the separation ratio by a factor of 3.37.
- Revealed through hierarchical clustering that cross-modality ERP distances cluster according to shared phonological features (such as manner and placement of articulation).

## Problem

Non-invasive brain-computer interfaces (BCIs) and speech neuroprostheses for imagined speech suffer from a severe scarcity of large-scale, continuous-speech datasets, with most existing corpora limited to isolated words or very short durations (e.g., under 20 minutes for non-tonal surface EEG). Prior studies typically show much stronger decoding performance for vocalized speech than imagined speech due to stronger motor cortex activation and higher signal-to-noise ratios (SNR). Furthermore, surface EEG suffers from signal smearing, attenuation, and ocular artefacts, making it difficult to model subtle neural signals without comprehensive datasets.

## Method

The CHINS dataset was collected using a BioSemi ActiveTwo 64-channel EEG system at 1,024 Hz, combined with audio-visual presentation of Sherlock Holmes novellas where text was synchronized word-by-word with a central red-highlighted fixation letter to minimize EOG artefacts. Raw EEG was re-referenced, notch-filtered at 50 Hz, high-pass filtered at 1 Hz, and cleaned via ICA on auxiliary VEOG/HEOG channels without discarding any trials. Data were bandpass filtered into 18 frequency sub-bands (spanning conventional ranges and up to 50–100 Hz) using a fourth-order Butterworth IIR filter, and partitioned into epochs from -0.5 s pre-onset to 1.0 s post-onset.

To capture ERP morphology differences while reducing noise, a Savitzky-Golay filter was jointly optimized with an ERP analysis window (-0.11 s to 0.4 s) by minimizing the summed Canberra distance between imagined and heard phone pairs across all homologous channels and sub-bands. Canberra distance normalizes by magnitude, emphasizing proportional deviations in ERP shapes over raw amplitude variations. A convex quadratic optimisation with L2 regularization and linear constraints was solved via a relaxed BFGS annealing schedule followed by a hard-constrained solver to learn tensor weights combining sub-band distance matrices into an optimal separation metric.

## Experimental setup

The dataset contains over 21 hours and 22 minutes (split evenly into >10.5 hours of auditory speech and >10.5 hours of imagined speech) collected over ~20-minute sessions from a single expert-informed participant. Evaluation metrics include the summed Canberra distance across 64 channels, phonological hierarchical clustering via Ward's variance minimization algorithm, and the separation ratio of the distance matrix diagonal. Implementation relied on MNE-Python for preprocessing and custom convex quadratic optimization solvers.

## Results

The optimized one-to-one mapping increased the separation ratio of the distance matrix by a factor of 3.37 compared to the unweighted baseline. Hierarchical clustering of the weighted ERP distances between imagined and heard phones recovered four distinct groups based on phonological natural classes (vowels, alveolar nasals/plosives/approximants, bilabial/velar nasals/plosives/approximants, and fricatives), aligning closely with known auditory perception clusters.

## Limitations

The dataset is limited by its single-subject scope, which restricts immediate cross-subject generalization without further domain adaptation. The participant is an expert-informed researcher, which may not reflect the proficiency or fatigue profiles of paralyzed end-users. Additionally, surface EEG inherently suffers from low signal-to-noise ratios and spatial smearing compared to invasive recordings.

## Why read this

Speech and ML researchers building non-invasive speech neuroprostheses or transfer-learning pipelines from perception to imagination should read this to understand how auditory perception EEG data can scaffold imagined speech decoders.

## Code

- https://www.speakunique.co.uk/research/CHINS

## Applications

Non-invasive brain-computer interfaces (BCIs), assistive communication devices, and speech neuroprostheses for individuals with neurodegenerative conditions like motor neurone disease.

## Institutions / 機構

University of Bath, SpeakUnique

**Funding / 經費:** United Kingdom Research Institute

## Related

- (link related pages by id as the wiki grows)
