---
id: zhao26f_interspeech
category: spatial-audio
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1995
pdf: https://www.isca-archive.org/interspeech_2026/zhao26f_interspeech.pdf
---

# SA-HRTF: A Sound-Assisted Approach to Personalized HRTF Modeling

*Qingying Zhao, Siyuan Chen, De Hu*

[PDF](https://www.isca-archive.org/interspeech_2026/zhao26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhao26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1995)

**TL;DR** — SA-HRTF introduces a dual-branch architecture that combines database retrieval priors with sound-informed acoustic cues to personalize head-related transfer functions (HRTFs) from sparse spatial measurements. It achieves a state-of-the-art log-spectral distortion (LSD) of 3.76 with only 3 measurement points.

## Key contributions

- Proposes a sound-assisted personalized HRTF framework (SA-HRTF) that integrates binaural acoustic recordings with structural database priors to overcome data scarcity.
- Develops the Conditional Residual Retrieval-Augmented Neural Field (CR-RANF), upgrading standard RANF with a FiLM-based conditional residual module and LoRA adaptation for multi-subject feature integration.
- Implements a Sound-Informed HRTF (SI-HRTF) auxiliary branch featuring cascaded Conv1d-ReLU-BN blocks and SENet modules to extract perceptual cues from frequency-domain binaural audio signals.
- Designs a frequency-dependent adaptive HRTF fusion module using sigmoid gating weights to dynamically combine predictions from both branches.

## Problem

Personalizing head-related transfer functions (HRTFs) typically requires dense spatial measurements that are tedious and time-consuming to collect. Existing data-driven mapping models from 3D anatomy or point clouds struggle due to highly nonlinear sound-anatomy interactions and small dataset sizes, while recent retrieval methods like RANF are bottlenecked by database diversity and scale. Signal-based alternatives require excessive measurement positions or complex hardware setups, highlighting the need to exploit ambient everyday acoustic signals for robust personalization under sparse data.

## Method

The architecture uses a dual-branch design processing inputs in parallel. The primary CR-RANF branch encodes HRTF magnitudes from K retrieved reference subjects (selected via ITD matching) using 1D convolutions and Tanh activations. Simultaneously, a spatial-individual cue encoder processes concatenated ITD and directional coordinates via random Fourier features (RFF), fully connected, and Conv1d layers. These auxiliary features modulate the reference hidden states via a Feature-wise Linear Modulation (FiLM) affine transformation, which are then passed through an FC layer with LoRA and a transposed convolution block to output the primary HRTF estimate.

The auxiliary SI-HRTF branch takes a two-channel sound signal, transforms it via FFT into a one-sided magnitude spectrum, and passes it through four Conv1d-ReLU-BN sequential blocks interspersed with Squeeze-and-Excitation networks (SENet) at blocks 2 and 3. The resulting hidden representation is average-pooled, flattened, and mapped via an MLP to generate a supplementary HRTF estimate.

An HRTF fusion module concatenates the outputs of both branches and passes them through two Conv1d-ReLU layers followed by a Sigmoid output layer to yield a frequency-dependent weight vector alpha. This vector performs element-wise reweighting of the two branch predictions, followed by a final Conv1d-ReLU-Conv1d refinement block. All modules are optimized end-to-end using the log-spectral distortion (LSD) loss function.

## Experimental setup

Evaluated on the public SONICOM HRTF dataset containing measurements from 200 subjects at 793 directions (sampled at 48 kHz). Custom audio signals (speech, white noise, music) mixed with diffuse-field noise at 5-10 dB SNR were synthesized to train the SI-HRTF branch. Data split used 160 subjects for training, 19 for validation, and 20 for testing (subject P0079 removed due to atypical ITDs). Evaluated under sparse measurement settings with q in {3, 5, 7, 9} directions using the log-spectral distortion (LSD) metric.

## Results

Under a sparse measurement setting of q = 3 directions, SA-HRTF achieves an LSD of 3.76, outperforming nearest-neighbor (8.68), HRTF selection via ITD (6.37), NIIRF (4.67), standard RANF (4.47), and the standalone CR-RANF (4.23). As measurement points increase to q = 9, SA-HRTF reaches an LSD of 3.42 compared to RANF's 3.85. Ablations across sound types show that white noise yields the lowest LSD (3.02 at q = 3) due to broad frequency coverage, whereas speech performs worse (4.22 at q = 3) because it lacks high-frequency content, forcing the model to rely more heavily on the CR-RANF branch for upper bins.

| Method | q=3 | q=5 | q=7 | q=9 |
|---|---|---|---|---|
| nearest neighbor | 8.68 | 8.30 | 8.20 | 7.43 |
| NIIRF | 4.67 | 4.54 | 4.24 | 4.21 |
| RANF | 4.47 | 4.57 | 4.02 | 3.85 |
| CR-RANF | 4.23 | 4.41 | 3.95 | 3.85 |
| SA-HRTF | 3.76 | 3.82 | 3.49 | 3.42 |

## Limitations

The model's performance relies heavily on the frequency profile of the environmental audio signal, performing sub-optimally with narrow-band signals like speech that lack high-frequency content. Testing was constrained to simulated noisy conditions on a single public dataset (SONICOM), leaving real-world acoustic capture via consumer headphones unvalidated. The method assumes accurate direction-of-arrival (DOA) information, though minor robustness was shown up to 10-degree angular deviations.

## Why read this

Researchers and engineers building immersive audio, AR/VR, or hearing aid personalization systems should read this to see how integrating ambient acoustic signals with database retrieval priors dramatically improves HRTF reconstruction under extremely sparse measurement constraints.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Personalized 3D audio rendering for virtual reality, augmented reality, and smart consumer headphones.

## Related

- (link related pages by id as the wiki grows)
