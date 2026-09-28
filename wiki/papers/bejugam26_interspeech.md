---
id: bejugam26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2565
pdf: https://www.isca-archive.org/interspeech_2026/bejugam26_interspeech.pdf
---

# UFL-GAN: A Multi-Discriminator GAN for Unsupervised Speech Enhancement

*Satvik Bejugam, Venkatesh Parvathala, Sri Rama Murty Kodukula*

[PDF](https://www.isca-archive.org/interspeech_2026/bejugam26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bejugam26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2565)

**TL;DR** — UFL-GAN is an unsupervised speech enhancement framework that combines dual utterance- and frame-level discriminators with pre-trained self-supervised features, achieving a PESQ-WB of 2.64 on VoiceBank+DEMAND without paired clean data.

## Key contributions

- Proposes a multi-discriminator adversarial framework for unsupervised speech enhancement utilizing both utterance-level and frame-level discriminators.
- Integrates features from a pre-trained Autoregressive Predictive Coding (APC) model into the generator to provide robust, long-term contextual and spectral subspace guidance.
- Eliminates the need for parallel clean speech training pairs while matching or exceeding the performance of existing complex unsupervised DNN models.
- Demonstrates robust performance gains on VoiceBank+DEMAND across both intrusive quality measures (PESQ, CSIG, CBAK, COVL) and non-intrusive metrics (DNSMOS).

## Problem

Supervised deep learning speech enhancement approaches require parallel noisy-clean speech pairs, which are virtually impossible to acquire in real-world deployments, forcing reliance on synthetic data with severe domain mismatches. Classical statistical methods like Wiener filtering and MMSE estimators avoid parallel data but fail in complex, nonstationary acoustic environments due to overly simplistic distributional assumptions. Prior unsupervised deep approaches (e.g., NyTT, RemixIT, MetricGAN-U, DOTN, UnSE) either depend heavily on imperfect teacher pseudo-targets or use single global discriminators that miss fine-grained temporal dynamics and cause over-suppression. This work addresses the trade-off between capturing global structure and local temporal fidelity without clean parallel supervision.

## Method

The architecture operates in the time-frequency domain, taking noisy speech waveforms converted via Short-Time Fourier Transform (STFT) using a 25 ms Hamming window, 10 ms hop length, and 512-point FFT. The generator adopts a single-block Neural Time-Varying Filtering (NTVF) network containing context-independent filtering (CIF) and context-dependent filtering (CDF) blocks to progressively refine log-magnitude spectrograms, reconstructing the time-domain signal via ISTFT with noisy phase. To bolster long-term contextual dependencies under heavy noise, representations from a 960-hour LibriSpeech-trained Autoregressive Predictive Coding (APC) model are linearly projected and concatenated as extra channels into the generator's CDF block.

Adversarial training is driven by a Least-Squares GAN (LSGAN) objective utilizing two parallel discriminators: an Utterance-Level (UL) Discriminator ($D_u$) comprising four convolutional layers followed by instance normalization, PReLU, and time-wise adaptive max-pooling to evaluate global spectrogram properties; and a Frame-Level (FL) Discriminator ($D_f$) that skips temporal pooling to output a real/fake probability score for every individual time frame. Both discriminators use Mean Squared Error (MSE) loss against target scores of 1 for clean non-parallel samples and 0 for noisy or generator-enhanced samples, while the generator is trained to force high discriminator scores on its outputs.

## Experimental setup

Evaluated on the VoiceBank+DEMAND dataset, featuring 28 clean training speakers corrupted by 10 diverse DEMAND noise types at 0, 5, 10, and 15 dB SNR levels, with non-parallel training data constructed by shuffling noisy utterances. Tested on an unseen evaluation set of 2 speakers and 5 novel noises at 2.5, 7.5, 12.5, and 17.5 dB SNR. Compared against classical statistical baselines (MMSE, Wiener) and unsupervised DNN models (NyTT, RemixIT, MetricGAN-U, DOTN, UnSE, QMixCAT) as well as a supervised NTVF oracle. Evaluated using PESQ-WB, eSTOI, CSIG, CBAK, COVL, SI-SNR, and DNSMOS P.808. Trained using AdamW (initial lr=0.001, decayed by 0.5 after 10 epochs of no loss improvement) on a single NVIDIA GeForce GTX 1080 Ti GPU with batch size 32 and early stopping patience of 30 epochs.

## Results

UFL-GAN achieves a PESQ-WB of 2.64, eSTOI of 0.82, CSIG of 3.99, CBAK of 3.27, COVL of 3.35, SI-SNR of 15.95, and DNSMOS of 3.30 on the VoiceBank+DEMAND test set. It significantly outperforms prior unsupervised GAN architectures like MetricGAN-U (PESQ 2.45) and RemixIT (PESQ 2.41), and matches the current front-runner QMixCAT on PESQ (2.64 vs 2.66) while surpassing it on composite distortion and quality metrics (CSIG 3.99 vs 3.74, COVL 3.35 vs 3.18). Ablation studies show that combining both utterance and frame-level discriminators with APC auxiliary features yields cumulative gains, raising PESQ from 2.48 (UT-only, no APC) to 2.64 (UT+FL with APC). The model does not outperform supervised NTVF, which achieves 3.04 PESQ and 17.69 SI-SNR.

| Model | PESQ-WB | eSTOI | CSIG | CBAK | COVL | SI-SNR |
|---|---|---|---|---|---|---|
| Noisy | 1.97 | 0.79 | 3.47 | 2.54 | 2.72 | 8.45 |
| NTVF (Supervised) | 3.04 | 0.84 | 4.32 | 3.60 | 3.73 | 17.69 |
| MetricGAN-U [15] | 2.45 | - | 3.47 | 2.63 | 2.91 | - |
| RemixIT [13] | 2.41 | - | 3.59 | 2.84 | 2.98 | 11.24 |
| QMixCAT [14] | 2.66 | - | 3.74 | 3.05 | 3.18 | 14.40 |
| UFL-GAN (Proposed) | 2.64 | 0.82 | 3.99 | 3.27 | 3.35 | 15.95 |

## Limitations

Evaluated exclusively on additive noise conditions using the VoiceBank+DEMAND dataset, leaving performance on more complex real-world acoustic degradations like reverberation, clipping, or codec artifacts unvalidated. Relies on an external pre-trained self-supervised model (APC) trained on LibriSpeech, meaning performance could depend on the domain fit of the SSL features. The framework still maintains a performance gap relative to fully supervised models such as NTVF.

## Why read this

Researchers and engineers tackling speech enhancement without parallel training data should read this paper to understand how combining multi-scale adversarial discriminators with self-supervised representations bridges the performance gap with supervised architectures.

## Code

- https://siplab-iith.github.io/UFLGAN/

## Applications

Robust automatic speech recognition (ASR), hearing aids, mobile communications, teleconferencing systems, and assistive audio technologies operating in non-parallel, unlabelled training environments.

## Related

- (link related pages by id as the wiki grows)
