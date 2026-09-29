---
id: buragohain26_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-377
pdf: https://www.isca-archive.org/interspeech_2026/buragohain26_interspeech.pdf
---

# Exploiting EEG-based Gamma-Band Time Frequency Feature in WaveNet Decoder Framework for High-Fidelity Speech Reconstruction

*Rantu Buragohain, Saket Maheshwari, Karan Nathwani*

[PDF](https://www.isca-archive.org/interspeech_2026/buragohain26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/buragohain26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-377)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — This paper presents a speech synthesis framework that reconstructs log-Mel spectrograms directly from invasive stereotactic EEG (sEEG) high-gamma band recordings using a causal dilated WaveNet decoder, achieving a mean Pearson correlation coefficient (PCC) of 0.9349. By leveraging gated activation units and stacked residual convolutional blocks, the model outperforms prior linear and recurrent architectures in both reconstruction fidelity and computational efficiency.

## Key contributions

- Adapts a WaveNet-based decoder utilizing stacked causal dilated convolutions and gated activations for direct neural-to-spectrogram speech decoding from sEEG.
- Applies high-gamma band time-frequency feature extraction (70–170 Hz envelope via Hilbert transform with window expansion model order 4, step size 5) to capture fine-grained articulatory dynamics.
- Achieves state-of-the-art reconstruction performance across 10 subjects with a mean PCC of 0.9349 and Spectral-Temporal Glimpsing Index (STGI) of 0.5120.
- Demonstrates superior inference efficiency with a latency of 177.30 ms and throughput of 574.20 FPS while containing 2.17M trainable parameters.

## Problem

Reconstructing audible speech directly from brain signals offers vital communication pathways for individuals with severe speech impairments due to conditions like ALS, apraxia, or stuttering. Traditional linear models and formant synthesis with Kalman filters yield poor audio quality with Pearson correlation coefficients below 0.7. While recent deep learning approaches—such as fully connected networks, convolutional models, and multi-scale Inception-GRU modules (NeuroIncept)—improve nonlinear mapping, they still struggle to effectively capture long-range temporal dependencies, handle low signal-to-noise ratios, and account for high inter-subject anatomical variability without excessive computational overhead.

## Method

Stereotactic EEG (sEEG) signals sampled at 2048/1024 Hz are downsampled to 16 kHz, detrended, bandpass filtered in the high-gamma band (70–170 Hz), and notch-filtered at 50 Hz and its harmonics (100 Hz, 150 Hz) to remove line noise. The analytic signal envelope is extracted via Hilbert transform, segmented into 0.05s windows with a 0.01s frameshift, and expanded using a sliding window model order of 4 and step size of 5 to integrate temporal context. Target audio is converted into 128-bin log-Mel spectrograms using identical windowing parameters.

The WaveNet decoder architecture begins with a 1x1 convolutional projection layer with 64 filters to scale input dimensionality. The core consists of 4 stacked WaveNet modules, each comprising 5 causal dilated convolutional blocks with exponentially increasing dilation rates (1, 2, 4, 8, 16). Each block employs a gated activation unit combining parallel causal convolutions with tanh and sigmoid activations multiplicatively. Residual connections handle gradient stability, while skip connections aggregate multiscale temporal features.

All skip connections are summed, passed through a ReLU activation, reduced via Global Average Pooling, and fed into fully connected layers of dimensions 512 -> 256 -> 128 -> 32 with dropout (0.2) to mitigate overfitting. The network is trained using Mean Squared Error (MSE) loss against target log-Mel spectrograms with the Adam optimizer (learning rate 0.0001, batch size 128) for up to 100 epochs with early stopping (patience of 5 epochs).

## Experimental setup

Evaluated on a publicly available dataset of sEEG recordings from 10 Dutch participants (5 male, 5 female, mean age 32) with pharmacoresistant epilepsy reading 100 words from the Dutch IFA corpus (~5 minutes per subject). The data uses an 80:20 train/validation split with 10-fold cross-validation on 1000 randomly selected validation samples per subject. Baselines compared include Linear Regression (LR), Fully Connected Network (FCN), Convolutional Neural Network (CNN), and NeuroIncept Decoder. Metrics include Mean Squared Error (MSE), Pearson Correlation Coefficient (PCC), Spectral-Temporal Glimpsing Index (STGI), training time, GFLOPs, inference latency, and frames per second (FPS). Experiments run on an NVIDIA RTX 5070 GPU (12 GB VRAM), 64 GB RAM, Ubuntu 24.04, using Python 3.10 and TensorFlow-Keras 2.15.0.

## Results

The proposed WaveNet Decoder achieves a mean PCC of 0.9349 and an STGI of 0.5120, outperforming all baseline models. Specifically, it improves upon the prior NeuroIncept Decoder (PCC 0.9050, STGI 0.4925), CNN (PCC 0.8874, STGI 0.4583), FCN (PCC 0.8640, STGI 0.3947), and Linear Regression (PCC 0.7050, STGI 0.3318). In terms of computational efficiency, the proposed system reaches an inference latency of 177.30 ms and 574.20 FPS (compared to NeuroIncept's 298.11 ms and 366.12 FPS).

Subject-specific analysis reveals performance variance linked to electrode density and anatomical placement: participants with denser coverage in Broca's and Wernicke's areas (e.g., Sub05 and Sub06) achieve higher correlation coefficients (up to 0.9510), whereas subjects with minimal electrode placement in language centers (e.g., Sub10) exhibit lower scores (PCC 0.9014).

| Model | PCC | STGI | GFLOPs | Latency (ms) | FPS |
|---|---|---|---|---|---|
| LR [22] | 0.7050 | 0.3318 | 0.051 | 238.70 | 446.10 |
| FCN [23] | 0.8640 | 0.3947 | 0.0084 | 260.96 | 383.27 |
| CNN [23] | 0.8874 | 0.4583 | 0.0825 | 289.95 | 358.58 |
| NeuroIncept Decoder [25] | 0.9050 | 0.4925 | 0.0927 | 298.11 | 366.12 |
| WaveNet Decoder (Proposed) | 0.9349 | 0.5120 | 0.062 | 177.30 | 574.20 |

## Limitations

The study relies on a relatively small dataset comprising ~5 minutes of recordings per participant across only 10 subjects speaking a restricted vocabulary of 100 Dutch words. Performance is heavily dependent on clinical sEEG electrode placement, leading to notable inter-subject variability when coverage over language-associated regions like Broca's and Wernicke's areas is sparse. Furthermore, evaluations are strictly restricted to neural-to-spectrogram reconstruction metrics (MSE, PCC, STGI) without subjective listening tests or vocoder-based waveform evaluation.

## Why read this

Speech and BCI researchers working on neural decoding should read this paper to see how replacing recurrent networks with a lightweight, causal dilated WaveNet architecture improves both spectrogram reconstruction fidelity and computational latency. It offers a clear blueprint for modeling long-range temporal dependencies in high-dimensional, low-SNR neural time series.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Direct brain-computer interface (BCI) speech neuroprosthetics for restoring vocal communication in patients with severe motor or neuromuscular impairments such as ALS.

## Institutions / 機構

Indian Institute of Technology Jammu, GLA University

**Funding / 經費:** TIH IIT Guwahati

## Related

- (link related pages by id as the wiki grows)
