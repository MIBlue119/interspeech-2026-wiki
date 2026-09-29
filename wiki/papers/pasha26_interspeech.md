---
id: pasha26_interspeech
category: enhancement-separation
labels: [low-resource, robustness-noise]
institutions: ["University of Western Australia", "University of Southampton", "University of Wollongong"]
code: https://github.com/ShahabP/DeepRIRnet
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-31
pdf: https://www.isca-archive.org/interspeech_2026/pasha26_interspeech.pdf
---

# A Novel Transfer Learning Approach for Room Impulse Response Estimation and Speech Dereverberation Across Geometrically Diverse and Data-Scarce Environments

*Shahab Pasha, Jiahong Zhao, Hualin Ren, Christian Ritz*

[PDF](https://www.isca-archive.org/interspeech_2026/pasha26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pasha26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-31)

**Category:** `enhancement-separation` · **Labels:** `low-resource`, `robustness-noise`

**TL;DR** — A novel transfer learning framework for room impulse response (RIR) estimation adapts models from data-rich rectangular rooms to complex L-shaped and irregular geometries by freezing a geometry-aware encoder and fine-tuning a physics-informed decoder, achieving a 56% lower mean squared error on unseen spaces with only 10 training rooms.

## Key contributions

- A cross-geometry transfer learning setup enabling generalization from convex, axis-aligned rectangular rooms to complex, non-convex L-shaped and irregular rooms.
- A selective fine-tuning strategy that freezes the encoder weights while updating only the decoder, preventing overfitting and reducing target-domain MSE by 56% using just 2% of the source data volume.
- Physics-informed regularizers enforcing echo sparsity and exponential energy decay without relying on unstable adversarial training.
- Demonstrated downstream utility in speech dereverberation, outperforming GAN-based baselines with a PESQ of 3.24 versus 2.78 and an STOI of 0.89 versus 0.79.

## Problem

Accurate Room Impulse Response (RIR) estimation is fundamental for speech enhancement, echo cancellation, and acoustic modeling, but traditional measurement and simulation methods are computationally prohibitive across diverse room layouts. Standard deep learning models generalize poorly when deployment geometries differ from training environments, causing degradation in out-of-domain enclosures. Prior generative adversarial network (GAN) approaches suffer from mode collapse, training instability, and a lack of explicit physical boundary constraints. Furthermore, no existing transfer learning pipeline combines selective layer freezing with physics-informed priors to handle cross-geometry adaptation from rectangular to irregular shapes.

## Method

The architecture comprises two main parts: a geometry-aware encoder and a physics-regularized decoder. The encoder processes input parameters—concatenated room geometry vertex codes and wall reflection coefficients (dimension p), alongside 3D source (s) and microphone (m) coordinates—projecting them into a 256-dimensional latent space combined with learned temporal basis vectors. This sequence is processed by two stacked Long Short-Term Memory (LSTM) layers with a hidden dimension of 256, where the first LSTM layer acts as the encoder and the second operates within the decoder to output time-domain RIR samples of length T = 4096 (256 ms at 16 kHz).

The loss function combines time-domain Mean Squared Error (MSE) and frequency-domain Log-Spectral Distance (LSD) alongside two physics-informed regularizers: a sparsity regularizer (λ1 = 0.01) that penalizes non-zero energy arriving before the direct-path arrival time, and a decay regularizer (λ2 = 0.05) utilizing a rectified linear unit to penalize energy increases violating Sabine's exponential decay model (with expected decay rate ρ = 17.3 nepers/s). 

The training recipe is split into two stages: Stage 1 involves source pretraining on 500 rectangular rooms (25,000 RIR pairs) for 50 epochs using the Adam optimizer with a learning rate of 1e-3 and batch size 64. Stage 2 executes target fine-tuning on only 10 target rooms (5 L-shaped and 5 irregular rooms, totaling 500 training positions) for 50 epochs, during which the input projection and first LSTM layer (encoder) are completely frozen while the second LSTM and output linear layer (decoder) are adapted. This selective freezing preserves spatial extraction capabilities while conforming waveform synthesis to target acoustic properties.

## Experimental setup

The evaluation utilizes simulated RIR datasets generated via the image-source method at a 16 kHz sampling rate, comprising 500 rectangular rooms (25,000 source-domain RIRs), 30 L-shaped rooms (1,500 RIRs), and 20 irregular rooms (1,000 RIRs). Target testing is performed on an unseen split of 25 L-shaped and 15 irregular rooms (2,000 total test RIRs). Models are evaluated using Mean Squared Error (MSE), Log-Spectral Distance (LSD in dB), Average Time Error (ATE), PESQ, and STOI. Implementation uses the Adam optimizer with a ReduceLROnPlateau scheduler.

## Results

On the target-domain test set, the proposed fine-tuned model reduces MSE by 56% (from 0.0025 to 0.0011), LSD by 37% (from 3.12 dB to 1.95 dB), and ATE by 50% (from 8.4 to 4.2) compared to the source-only baseline. In downstream speech dereverberation using TIMIT utterances convolved with target RIRs and processed via Wiener filtering, the proposed approach achieves a PESQ of 3.24 (vs 2.78 for GAN baselines and 2.91 for source-only), an STOI of 0.89 (vs 0.79 for GAN), and a cepstral distance of 2.1 dB (vs 4.2 dB for GAN). Ablation studies demonstrate that a balanced loss weighting of alpha = 1.0 (time domain) and beta = 0.5 (frequency domain) yields robust spectral matching across diverse wall reflection coefficients ranging from 0.2 to 0.8.

| Method | MSE | LSD [dB] | ATE | PESQ | STOI |
|---|---|---|---|---|---|
| Source-only | 0.0025 | 3.12 | 8.4 | 2.91 | 0.82 |
| GAN Baseline | - | - | - | 2.78 | 0.79 |
| Proposed Fine-Tuned | 0.0011 | 1.95 | 4.2 | 3.24 | 0.89 |

## Limitations

The evaluation is performed exclusively on simulated room impulse responses rather than physical, measured real-world enclosures with complex acoustic anomalies. The data scale is bounded to axis-aligned rectangular source rooms and two specific target geometries (L-shaped and irregular). Furthermore, the approach assumes known or estimable room geometry descriptors and source-receiver coordinates as inputs.

## Why read this

Speech and ML researchers focusing on acoustic simulation or transfer learning will benefit from seeing how selective layer freezing combined with physics-informed regularization can adapt spatial neural networks to data-scarce irregular domains with minimal samples.

## Code

- https://github.com/ShahabP/DeepRIRnet

## Applications

Speech dereverberation, acoustic echo cancellation, and spatial audio reproduction in geometrically diverse environments.

## Institutions / 機構

University of Western Australia, University of Southampton, University of Wollongong

## Related

- [Dual-Geometry Manifolds for Few-shot RIR Prediction](bhosale26b_interspeech.md) — same problem · relatedness 2.7/3
- [Explicit Context-Driven Neural Acoustic Modeling for High-Fidelity RIR Generation](si26_interspeech.md) — same problem · relatedness 2.6/3
- [Blind Room Impulse Response Identification via Reverberant Speech Spectrum Reconstruction](wang26c_interspeech.md) — same problem · relatedness 2.5/3
- [Echoes after Edits: Room Impulse Response Estimation for Geometry Update](bhosale26_interspeech.md) — same problem · relatedness 2.5/3
- [Room Impulse Response Completion Using Signal-Prediction Diffusion Models Conditioned on Simulated Early Reflections](xu26p_interspeech.md) — same problem · relatedness 2.3/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
