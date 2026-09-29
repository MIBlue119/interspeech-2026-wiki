---
id: wang26e_interspeech
category: enhancement-separation
labels: [efficient-on-device, streaming-real-time]
institutions: ["Nanyang Technological University", "Northwestern Polytechnical University"]
code: https://github.com/Wang-Boxiang/PD-SFANC
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-271
pdf: https://www.isca-archive.org/interspeech_2026/wang26e_interspeech.pdf
---

# Predictive Directional Selective Fixed-Filter Active Noise Control for Moving Sources via a Convolutional Recurrent Neural Network

*Boxiang Wang, Zhengding Luo, Dongyuan Shi, Junwei Ji, Xiruo Su, Woon-Seng Gan*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-271)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — The paper introduces Predictive Directional Selective Fixed-Filter Active Noise Control (PD-SFANC), which uses a lightweight convolutional recurrent neural network to forecast the next-frame direction-of-arrival of moving noise sources and proactively select pre-trained control filters, achieving stable noise reduction above 15 dB across various trajectories.

## Key contributions

- Proposes a predictive directional active noise control framework (PD-SFANC) that replaces reactive filter switching with proactive, multi-frame context-based filter pre-selection.
- Designs a compact CRNN architecture combining 2D CNN blocks, adaptive frequency pooling, and a GRU layer to predict the next-frame DoA through multi-class classification.
- Eliminates the requirement for online gradient-based filter adaptation and feedback error signals in real time, avoiding convergence delays and divergence risks.
- Demonstrates robust generalization across unseen room geometries, high reverberation times (RT60 up to 0.83s), and real-world noise types from UrbanSound8K.

## Problem

Traditional active noise control systems designed for stationary sources fail when applied to time-varying noise positions like moving vehicles or vacuum cleaners. Adaptive algorithms like FxLMS suffer from slow convergence and divergence risks, while standard selective fixed-filter ANC (SFANC) and directional SFANC (D-SFANC) methods react with a one-frame lag because they only evaluate current or past frames without tracking spatial-temporal dynamics. Although dynamic factor graph approaches (DFG-SFANC) improve tracking, they rely on traditional signal processing techniques requiring delicate empirical parameter tuning. This delay during source transitions results in severe degradation of noise reduction performance and high-amplitude error fluctuations.

## Method

The PD-SFANC system separates processing into a co-processor running at the frame rate and a real-time controller running at the sampling rate (16 kHz). The co-processor inputs $K=4$ consecutive frames of $J=4$ channel reference signals, processed via STFT into magnitude and frequency spectrograms that are concatenated along the channel and time axes into a tensor $\mathbf{R} \in \mathbb{R}^{2J \times F \times TK}$. This tensor passes through three 2D convolutional blocks (each containing a 2D convolution, group normalization, ReLU activation, and max pooling) operating across time-frequency dimensions. Adaptive average pooling reduces dimensionality along the frequency axis, and a Gated Recurrent Unit (GRU) with a hidden state size of 64 models inter-frame temporal dynamics. Finally, a fully connected layer with softmax activation outputs the class probabilities for $V=36$ discrete azimuth DoA categories sampled at $10^\circ$ resolution. The network is optimized using cross-entropy loss and the Adam optimizer.

The system utilizes a pre-trained library of 36 control filter vectors of length 1024, pre-calculated via the FxLMS algorithm using broadband bandlimited white noise up to 2 kHz for each discrete DoA grid point. During online inference, after a brief $K$-frame cold-start period, the CRNN predicts the DoA index of the upcoming frame $\hat{v}$, and the system proactively updates the control filter vector $\mathbf{w}$ to $\mathbf{w}^{[\theta_{\hat{v}}]}$ before the frame transition occurs. Concurrently, the real-time controller executes signal cancellation at the audio sampling rate using $y(n) = \mathbf{w}^T(n)\mathbf{r}(n)$ and error calculation $e(n) = d(n) - s(n) * y(n)$, completely decoupling high-level tracking latency from real-time anti-noise generation.

## Experimental setup

Numerical simulations use a 16 kHz sampling rate, 4 cardioid reference microphones in a tetrahedral Sennheiser AMBEO VR Mic geometry (0.025 m diameter), 1 secondary source, and 1 error source. The CRNN datasets comprise 86,400 training samples, 9,600 validation samples, and 9,600 test samples per room-SNR subset, built using synthesized white noise and real recordings from UrbanSound8K convolved with room impulse responses via the image source method. Baselines include standard FxLMS (stepsize $1\times 10^{-2}$), D-SFANC, and DFG-SFANC (adjacent observation weight 0.02, observation length 2). Evaluation metrics include DoA classification accuracy, power spectral density (PSD), and averaged noise reduction level (NRL) over 0.5-s evaluation windows. The CRNN model contains 0.05 million parameters and requires 480.08 million MACs.

## Results

The CRNN achieves high DoA classification accuracy across all test rooms, exceeding 90% accuracy at SNRs of 20 dB and above (e.g., 90.3% to 91.7% in Room $\prime_1$), with a minor drop to around 86.8%–87.9% at 10 dB SNR. In continuous movement evaluations under vacuum cleaner noise moving at a constant angular velocity of $10^\circ/\text{s}$, both DFG-SFANC and PD-SFANC maintain an average noise reduction level (NRL) above 15 dB for the majority of the duration, whereas D-SFANC suffers from high-amplitude performance drops due to a one-frame filter-switching lag, and FxLMS shows minimal noise reduction due to slow convergence. Under a more challenging sinusoidal time-varying rate trajectory between $50^\circ$ and $150^\circ$, PD-SFANC maintains stable, high noise reduction throughout the trajectory, while DFG-SFANC experiences significant performance drops around the 7th and 15th seconds due to difficulties tracking rapidly varying acceleration in reverberant environments.

| System | Constant Rate NRL | Sinusoidal Rate NRL | Latency / Adaptation |
|---|---|---|---|
| FxLMS [2] | Low (<10 dB) | Low (<10 dB) | Slow convergence |
| D-SFANC [23] | Moderate (fluctuating) | Moderate (fluctuating) | 1-frame delay |
| DFG-SFANC [24] | High (>15 dB avg) | Drops at acceleration peaks | Manual tuning required |
| PD-SFANC (Proposed) | Stable high (>15 dB) | Stable high across trajectory | Proactive, frame-level |

## Limitations

The evaluation is restricted to numerical simulations in simulated acoustic rooms and assumes single-source scenarios. The model relies on a discrete DoA grid resolution of $10^\circ$ (36 categories) and evaluates only horizontal plane movements at a fixed radius from the microphone array. Performance in multi-source acoustic environments, moving source distances involving significant Doppler shifts, or real-world physical hardware deployment tests are not assessed in the scope of this work.

## Why read this

Researchers and audio engineers working on active noise control for non-stationary or mobile systems should read this paper to see how framing directional filter selection as a temporal classification and sequence prediction task bypasses the divergence and convergence bottlenecks of traditional adaptive filters like FxLMS.

## Code

- https://github.com/Wang-Boxiang/PD-SFANC

## Applications

Active noise control systems for vehicles, drones, and robotic vacuum cleaners operating in environments with moving noise sources.

## Institutions / 機構

Nanyang Technological University, Northwestern Polytechnical University

**Funding / 經費:** Ministry of Education, Singapore

## Related

- [Active Noise Control With a Gain Constraint for Micro-Loudspeakers](cheng26b_interspeech.md) — same problem · relatedness 2.3/3
- [A Causal Reference-Enhanced Keep-Speech Active Noise Control Method](rao26_interspeech.md) — same problem · relatedness 2.1/3
- [Active Constructive Interference for Speech](yaish26_interspeech.md) — same problem · relatedness 2.0/3
- [Ego-Noise-Aware Spatial Filtering for Reliable UAV Audition in Extreme Low-SNR Conditions](jeon26b_interspeech.md) — same problem · relatedness 1.9/3
- [WaveNorm: Real-Time Neural AGC for Noise-Robust Speech Enhancement on Resource-Constrained Edge Devices](ijjada26b_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
