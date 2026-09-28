---
id: lee26f_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-665
pdf: https://www.isca-archive.org/interspeech_2026/lee26f_interspeech.pdf
---

# SEMamba++: A General Speech Restoration Framework Leveraging Global, Local, and Periodic Spectral Patterns

[PDF](https://www.isca-archive.org/interspeech_2026/lee26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-665)

**TL;DR** — SEMamba++ is a general speech restoration framework utilizing a Fourier-based frequency module, multi-resolution parallel processing, and a softplus mapping decoder, achieving superior restoration performance and efficiency.

## Problem

General speech restoration requires repairing multiple overlapping distortions such as noise, reverberation, bandwidth limitation, and clipping, but current State-Space Models and time-frequency dual-path architectures fail to adequately capture spectral periodicity and multi-resolution frequency patterns. Existing single-resolution models either miss fine-grained structural cues or incur prohibitive computational overhead when scaled. Furthermore, traditional masking-based decoders struggle with band-limited extrapolation tasks where upper frequency components completely lack energy.

## Method

The architecture features an encoder-bottleneck-decoder layout operating on power-law compressed STFT magnitude and phase spectra, utilizing 4 bottleneck blocks with a hidden channel dimension of 48. The core Frequency GLP module pairs a Global Periodicity branch using Fourier Analysis Networks (FAN) directly on frequency bins with a Local sub-band 1D convolutional branch, followed by a channel FFN. A multi-resolution parallel time-frequency dual-path (TFDP) block processes features across three frequency-only downsampled scales independently without sequential degradation. Finally, a learnable frequency-wise softplus mapping decoder estimates clean magnitude spectra instead of traditional hard masking.

## Results

Evaluated against advanced speech enhancement and restoration baselines across benchmark datasets, the proposed SEMamba++ achieves state-of-the-art performance in objective metrics while maintaining high computational efficiency. The combination of Frequency GLP, multi-resolution parallel TFDP, and learnable softplus mapping yields consistent improvements across in-domain and out-of-domain evaluation scenarios. Ablations demonstrate that modeling spectral periodicity via FAN and executing parallel frequency-only downsampling are crucial for capturing diverse degradation kernels without temporal degradation.

## Code

- https://sites.google.com/view/semambapp

## Applications

Speech and audio engineers building robust communication systems, hearing aids, and speech preprocessing pipelines that must simultaneously handle denoising, dereverberation, bandwidth extension, and clipping correction.

## Related

- (link related pages by id as the wiki grows)
