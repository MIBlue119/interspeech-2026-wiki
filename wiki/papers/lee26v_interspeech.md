---
id: lee26v_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2931
pdf: https://www.isca-archive.org/interspeech_2026/lee26v_interspeech.pdf
---

# Enhancing EMG-to-Speech via Silent-Voiced Representation Alignment

[PDF](https://www.isca-archive.org/interspeech_2026/lee26v_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26v_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2931)

**TL;DR** — The paper introduces a Silent-Voiced Alignment (SVA) loss to align intermediate representations of parallel silent and voiced facial EMG pairs, significantly improving content reconstruction in EMG-to-speech (ETS) interfaces.

## Problem

Silent Speech Interfaces (SSIs) that reconstruct speech from facial electromyography (EMG) suffer from severe data scarcity and the inherent absence of direct speech supervision for silent EMG signals. Prior target-transfer strategies only map voiced acoustic targets without ensuring structural representation consistency between silent and voiced conditions. This leads to suboptimal generalization and high performance variance across trials.

## Method

The architecture builds upon a standard ETS framework consisting of an EMG encoder (using residual convolutional downsampling followed by transformer layers) with two output heads for phoneme probabilities and acoustic targets (mel-spectrograms or soft speech units). A novel Silent-Voiced Alignment (SVA) loss is introduced, which computes Dynamic Time Warping (DTW) paths between parallel silent and voiced outputs and applies them across intermediate transformer layers using cosine similarity. A two-stage training strategy is employed, pretraining the EMG encoder on voiced EMG before fine-tuning with the auxiliary SVA loss, alongside a sample-wise soft scheduling weight based on alignment confidence.

## Results

Evaluated on the Gaddy & Klein dataset containing 1,289 silent-voiced parallel pairs and 5,477 non-parallel voiced utterances under a rigorous 10-seed trial evaluation protocol. The proposed SVA method consistently enhances content reconstruction and intelligibility across trials compared to baseline ETS models. The paper reports robust statistical significance over multiple random seed runs to account for high signal noise and variance in EMG data.

## Code

- https://github.com/jiwonlee-0218/SVAETS

## Applications

Speech and ML engineers building Silent Speech Interfaces (SSIs) for individuals with laryngeal injuries, neurodegenerative disorders, or for use in acoustically constrained environments.

## Limitations

The approach relies on the availability of utterance-parallel silent-voiced EMG training pairs.

## Related

- (link related pages by id as the wiki grows)
