---
id: hovsepyan26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2168
pdf: https://www.isca-archive.org/interspeech_2026/hovsepyan26_interspeech.pdf
---

# Exploratory analysis of yellow mongoose vocalization: detection from in-the-wild recordings and call classification

[PDF](https://www.isca-archive.org/interspeech_2026/hovsepyan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hovsepyan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2168)

**TL;DR** — This study explores yellow mongoose vocalization detection and classification using handcrafted speech features and deep learning, achieving a mean cross-validation accuracy of 68.4% with a random forest classifier.

## Problem

Analyzing animal vocal repertoires like those of facultatively social yellow mongooses is labor-intensive and challenging due to reliance on naturalistic recordings, background noise, and uncharacterized call types. Developing automated or semi-automated tools is crucial to reduce annotation burdens and decode the evolutionary drivers of animal communication.

## Method

The authors evaluated two datasets: 940 expert-annotated clean pup vocalizations and 29 noisy field recordings. For classification, they compared a convolutional neural network (CNN) operating on raw waveforms against a random forest (RF) classifier using 384-dimensional handcrafted features derived from short-term Fourier transforms (16 temporal and 24 frequency channels) based on human speech perception models. For voice activity detection in field recordings, they benchmarked unsupervised rVAD against supervised WhisperSeg, testing temporal post-processing thresholds from 0.1 to 1.0 seconds to reduce false positives.

## Results

Using 5-fold stratified cross-validation, the RF classifier with handcrafted features achieved a mean accuracy of 0.684 (±0.016), outperforming the raw waveform CNN which scored 0.610 (±0.029). On real-world field detection, rVAD consistently outperformed WhisperSeg in sensitivity across various call types. Applying temporal merging (up to 1.0 s) successfully improved rVAD's precision from 0.19 to 0.37 while maintaining an unmerged sensitivity of 0.81.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Behavioral ecologists, bioacousticians, and zoologists studying animal communication, social complexity, and vocal repertoire annotation.

## Limitations

Dataset imbalance, notably the heavy predominance of 'krr voc' samples, and high false-positive rates in real-world detection that necessitate temporal post-processing.

## Related

- (link related pages by id as the wiki grows)
