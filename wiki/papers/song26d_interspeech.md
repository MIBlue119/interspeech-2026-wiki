---
id: song26d_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1857
pdf: https://www.isca-archive.org/interspeech_2026/song26d_interspeech.pdf
---

# ARTT: Augmented Reverberant-Target Training for Unsupervised Monaural Speech Dereverberation

[PDF](https://www.isca-archive.org/interspeech_2026/song26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/song26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1857)

**TL;DR** — The paper proposes Augmented Reverberant-Target Training (ARTT), an unsupervised monaural speech dereverberation framework combining reverberant-target training and online self-distillation to achieve strong dereverberation performance without clean reference signals.

## Problem

Monaural unsupervised speech dereverberation is a challenging ill-posed inverse problem because acquiring clean, anechoic target signals for real-recorded reverberant mixtures is extremely difficult. While supervised models suffer from domain mismatch due to reliance on simulated room impulse responses, prior unsupervised methods either lack robust data-driven speech priors or rely on iterative, computationally heavy joint estimation frameworks.

## Method

ARTT consists of two stages: first, Reverberant-Target Training (RTT) trains a neural network to reconstruct an observed reverberant mixture from a further reverberated version created using a stochastic synthetic room transfer function. Second, an online self-distillation mechanism based on the mean-teacher algorithm uses an exponential moving average teacher to provide consistent pseudo-labels, while the student takes inputs corrupted by both physically-simulated relative reverberation filters and Gaussian noise. The architecture utilizes TF-GridNet trained via complex spectral mapping to predict real and imaginary components, optimizing a joint loss combining scale-invariant signal-to-distortion ratio, speech enhancement terms, and magnitude spectral distance.

## Results

Evaluated on the WSJ0CAM-DEREVERB benchmark dataset containing around 77.7 hours of training data and 6.4 hours of test data with reverberation times spanning 0.2 to 1.3 seconds. ARTT is compared against unsupervised baselines including WPE, USDnet, and BUDDy, as well as supervised DNN-WPE, demonstrating significant performance improvements across metrics such as PESQ, eSTOI, and SI-SDR.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers working on robust speech enhancement, automatic speech recognition, and downstream acoustic applications operating under single-microphone reverberant conditions.

## Related

- (link related pages by id as the wiki grows)
