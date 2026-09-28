---
id: bejugam26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2565
pdf: https://www.isca-archive.org/interspeech_2026/bejugam26_interspeech.pdf
---

# UFL-GAN: A Multi-Discriminator GAN for Unsupervised Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/bejugam26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bejugam26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2565)

**TL;DR** — UFL-GAN is an unsupervised speech enhancement framework employing a multi-discriminator GAN with self-supervised feature conditioning, achieving competitive performance against state-of-the-art unsupervised baselines on the VoiceBank+DEMAND dataset.

## Problem

Supervised speech enhancement models require parallel clean and noisy training pairs, which are difficult or impossible to collect in real-world acoustic conditions, forcing reliance on synthetic data. Classical statistical methods and prior unsupervised deep learning approaches (such as NyTT, RemixIT, and MetricGAN-U) often struggle with nonstationary noise or fail to capture both global utterance-level characteristics and fine-grained local temporal patterns effectively.

## Method

The architecture builds on a Neural Time-Varying Filtering (NTVF) generator (with 1 block) that estimates magnitude masks using Short-Time Fourier Transform representations. To guide the generator without parallel clean targets, the model integrates two Least-Squares GAN discriminators: an utterance-level discriminator using adaptive max-pooling over time to capture global structure, and a frame-level discriminator providing fine-grained temporal feedback. Additionally, pre-trained Autoregressive Predictive Coding (APC) representations from a 960-hour LibriSpeech model are concatenated as auxiliary input channels into the generator's context-dependent filtering blocks to supply robust long-term contextual cues.

## Results

Evaluated on the VoiceBank+DEMAND test set using 16 kHz audio, the method is compared against statistical baselines (Wiener, MMSE) and unsupervised DNN approaches (NyTT, RemixIT, MetricGAN-U, DOTN, UnSE, QMixCAT). UFL-GAN achieves a PESQ-WB of 2.56, eSTOI of 0.82, CSIG of 3.99, CBAK of 3.27, COVL of 3.35, SI-SNR of 15.95 dB, and DNSMOS of 3.30. Ablation studies confirm that combining both utterance and frame-level discriminators alongside APC features consistently improves perceptual metrics and signal distortion scores over single-discriminator baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building robust automatic speech recognition, hearing aids, teleconferencing systems, and mobile communications tools that operate in noisy real-world environments without paired training data.

## Limitations

The current scope focuses solely on additive background noise and does not address other common distortions such as room reverberation or signal clipping.

## Related

- (link related pages by id as the wiki grows)
