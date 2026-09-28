---
id: maghsoudi26_interspeech
category: speech-decoding
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2836
pdf: https://www.isca-archive.org/interspeech_2026/maghsoudi26_interspeech.pdf
---

# Relating the Neural Representations of Vocalized, Mimed, and Imagined Speech

*Maryam Maghsoudi, Rupesh Chillale, Shihab A Shamma*

[PDF](https://www.isca-archive.org/interspeech_2026/maghsoudi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/maghsoudi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2836)

**TL;DR** — This paper investigates how neural representations relate across vocalized, mimed, and imagined speech modes using stereotactic EEG (sEEG) recordings, demonstrating successful cross-condition decoder transfer that reveals a hierarchical relationship. Despite lower raw correlation scores, linear decoders preserve stimulus-specific structure and sentence discriminability better than a convolutional-recurrent neural network.

## Key contributions

- Evaluates cross-condition generalization of speech decoders trained on vocalized, mimed, and imagined stereotactic EEG data.
- Formulates a neural response decomposition model mapping internal planning, articulation, and sensory feedback components to specific speech modes.
- Performs a rank-based AUC analysis to quantify sentence-level discriminability of reconstructed speech across conditions.
- Compares linear reconstruction models against a nonlinear convolutional-recurrent neural network coupled with HiFi-GAN, showing superior sentence discriminability for linear architectures.

## Problem

Most speech decoding research focuses exclusively on listening tasks or overt vocalization separately, leaving the representational overlap among vocalized, mimed, and imagined speech largely unexplored. Imagined speech lacks external timing cues and acoustic feedback, complicating alignment and decoding. Understanding how neural representations bridge these three modalities is crucial for developing robust brain-computer interfaces (BCIs) for individuals who cannot produce overt speech.

## Method

The study utilizes the publicly available VocalMind dataset, consisting of stereotactic EEG (sEEG) recordings from 110 electrodes low-pass filtered at 100 Hz. Time-frequency representations of acoustic stimuli are extracted using the NSL cortical model to simulate cochlear processing. The primary architecture consists of condition-specific linear decoders mapping time-lagged sEEG responses to spectrograms via ordinary least squares with grid-search regularization alpha. Null models are fit by shuffling trial orders to pair sEEG responses with mismatched spectrograms.

The nonlinear baseline reconstructs mel-spectrograms using a convolutional feature extraction block followed by a recurrent (RNN) block trained with mean squared error (MSE) loss, with waveforms subsequently synthesized using a pre-trained HiFi-GAN vocoder. Cross-condition performance is evaluated by training a decoder on condition A and testing it on condition B. Additionally, sentence-level discriminability is assessed via a rank-based analysis measuring how frequently the correct target envelope appears within the top-k matches against all candidate sentences, quantifying performance using area under the curve (AUC) above chance.

## Experimental setup

Evaluated on the VocalMind dataset containing stereotactic EEG recordings from a single participant speaking 100 sentences (repeated twice per condition) in Mandarin Chinese across vocalized, mimed, and imagined modes. Decoders are compared across linear and nonlinear (CNN-RNN) architectures. Evaluation metrics include linear correlation of spectrogram envelopes and sentence-level discriminability measured via top-k rank analysis AUC above chance.

## Results

Linear cross-condition decoders perform significantly above null distributions (p << 0.001 across all conditions). For linear models, the Vocalized-trained decoder achieves highest performance on Vocalized data (p << 0.001), followed by Mimed and Imagined data. The Mimed-trained decoder exhibits similar performance on Mimed and Vocalized data (p = 0.6), indicating shared articulatory structure, while the Imagined-trained decoder shows highest performance on Vocalized data. In rank-based sentence discriminability, the linear model trained and tested on Vocalized speech achieves an AUC of 0.32.

The nonlinear CNN-RNN model achieves higher mean envelope reconstruction correlations than the linear model (p << 0.005). However, linear models exhibit a steeper relationship between correlation and sentence-level discriminability (Steiger's test, p = 1.24 × 10^-4), indicating that higher raw reconstruction correlation from the nonlinear model does not translate to proportional gains in sentence-level separation.

| System / Condition Pair | Envelope Correlation | Rank Analysis AUC Above Chance |
| --- | --- | --- |
| Linear (Train Vocalized -> Test Vocalized) | High | 0.32 |
| Linear (Train Mimed -> Test Mimed) | Moderate | 0.13 |
| Linear (Train Imagined -> Test Imagined) | Moderate | 0.07 |
| Nonlinear (Train Vocalized -> Test Vocalized) | Higher | 0.59 |
| Nonlinear (Train Mimed -> Test Mimed) | Moderate | 0.06 |
| Nonlinear (Train Imagined -> Test Imagined) | Moderate | 0.07 |

## Limitations

The dataset is restricted to a single participant speaking Mandarin Chinese across only 100 sentences, limiting generalizability across speakers, languages, and vocabulary sizes. The study lacks simultaneous neural recordings during passive listening, precluding direct empirical verification of the hypothesized sensory feedback components. Furthermore, evaluation relies heavily on single-subject sEEG, which may not scale directly to surface EEG or non-invasive neuroimaging modalities.

## Why read this

Speech and BCI researchers should read this paper to understand how neural representations transition between overt, covert, and imagined speech modalities. It offers a critical cautionary note for deep learning engineers by demonstrating that higher neural reconstruction correlations do not automatically guarantee better stimulus-level discriminability.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Development of speech brain-computer interfaces (BCIs) for locked-in patients or individuals who cannot produce overt speech.

## Related

- (link related pages by id as the wiki grows)
