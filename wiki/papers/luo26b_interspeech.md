---
id: luo26b_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2577
pdf: https://www.isca-archive.org/interspeech_2026/luo26b_interspeech.pdf
---

# Visually-Guided Spatial Audio Generation for 360° In-the-Wild Speech Scenes

*Qingyu Luo, Peng Zhang, Wenwu Wang, Philip J.B. Jackson*

[PDF](https://www.isca-archive.org/interspeech_2026/luo26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/luo26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2577)

**TL;DR** — The paper introduces YT-SPEECH, an 8.9-hour dataset of speech-dominant 360-degree video and First-Order Ambisonics (FOA) audio, alongside a Localizer-Renderer framework that achieves superior spatial accuracy and speech quality via confidence-gated audio-visual priors.

## Key contributions

- YT-SPEECH: The first speech-oriented 360-degree video-FOA dataset (8.9 hours, 197 source videos, 24 kHz) curated via multi-stage filtering for multi-channel audio and on-screen speaker activity.
- A Localizer-Renderer framework that utilizes an audio-visual segmentation (AVS) backbone to produce fine-grained spatial heatmaps for direction-consistent FOA reconstruction.
- A confidence-based gating mechanism (combining peak concentration and entropy) and Feature-wise Linear Modulation (FiLM) to dynamically adapt conditioning strength under acoustically ambiguous conditions.
- Comprehensive validation demonstrating consistent improvements in reconstruction fidelity, spatial angular error (∆ang), and perceptual speech quality (PESQ, MOS-P).

## Problem

Recovering high-quality spatial First-Order Ambisonics (FOA) audio from unconstrained 360-degree video and omnidirectional microphone recordings remains challenging due to a lack of paired real-world datasets and suboptimal prior methods. Existing spatial audio datasets are predominantly binaural or rely on synthetic/simulated labels rather than real panoramic video cues. Meanwhile, prior explicit spatial reconstruction approaches (like SpatialAudioGen) utilize self-supervised label-free separation that introduces acoustic artifacts, and end-to-end models prioritize semantic consistency over precise spatial localization.

## Method

The proposed architecture features a two-stage Localizer-Renderer framework operating in the complex short-time Fourier transform (STFT) domain. Given an equirectangular projection (ERP) video frame and an omnidirectional FOA channel $W$, a fine-tuned Audio-Visual Segmentation (AVS) backbone acts as the Localizer to output a dense 7x14 normalized spatial heatmap $P_t$, using circular padding along ERP dimensions to preserve horizontal wrap-around continuity. 

The Renderer consists of a complex-domain U-Net that takes the omnidirectional spectrum $\Phi_W$ and predicts complex-valued masks $M_i$ for missing directional channels ($Y, Z, X$). To handle noisy or diffuse visual frames, a frame-level confidence gate $g(t)$ is derived from the spatial prior's peak concentration and entropy. This scalar gate computes modulation parameters via Feature-wise Linear Modulation (FiLM) applied across the U-Net decoder blocks to balance visual guidance and audio evidence adaptively.

The training recipe involves pretraining the Renderer on Sphere360 data using AdamW (learning rate $5 \times 10^{-5}$), followed by joint fine-tuning on YT-SPEECH (Localizer lr $5 \times 10^{-6}$, Renderer lr $5 \times 10^{-5}$). Data augmentation includes random horizontal yaw rotations ($[-\pi, \pi]$) and horizontal flipping applied with probabilities of 0.8 and 0.2, respectively, with corresponding FOA channel rotations. The composite loss function combines multi-resolution STFT loss ($L_{\text{MRS}}$), magnitude loss ($L_{\text{mag}}$), and $L_2$ waveform loss, weighted by confidence scores.

## Experimental setup

Evaluations utilize the newly curated YT-SPEECH dataset (8.9 hours total, 5-second clips at 24 kHz) split into train, validation, and test sets. The method is compared against ablation variants (NoVideo-Renderer, VidEnc-Renderer, FrozenLoc-Renderer, Ours-NoPT), analytic baselines (Localizer-AmbiEnc, Localizer-Pyroom), and SpatialAudioGen (SAG) on benchmark datasets including YT-ALL, YT-MUSIC, YT-CLEAN, and YT-SPEECH. Metrics include reconstruction errors ($\ell_2$, $L_{\text{mag}}$, $L_{\text{phs}}$, $L_{\text{MRS}}$), DOA spatial errors ($\Delta\text{abs } \theta$, $\Delta\text{abs } \phi$, $\Delta\text{ang}$), ear-wise PESQ (with $W=0$), and subjective MOS scores (MOS-Q for audio quality, MOS-P for spatial accuracy) evaluated by 9 human listeners.

## Results

On the YT-SPEECH test set, the full proposed model achieves the lowest $\ell_2$ reconstruction error ($1.15 \times 10^3$), minimal angular error ($\Delta\text{ang} = 0.64^\circ$), and top-tier speech quality with a PESQ of 3.42 and MOS-P of 3.16. Compared to analytic baselines like Localizer-AmbiEnc, the learned Renderer offers substantial gains in spatial accuracy (reducing $\Delta\text{ang}$ from $0.83^\circ$ to $0.64^\circ$) and subjective spatial preference. In compatibility comparisons against SpatialAudioGen (SAG) across YT-ALL, YT-MUSIC, YT-CLEAN, and YT-SPEECH, the proposed model consistently outperforms SAG on complex STFT and envelope (ENV) distance metrics, showing the most pronounced advantages on visually clean speech (YT-SPEECH STFT: 0.85 vs SAG's 1.14; YT-CLEAN STFT: 0.91 vs SAG's 1.58). The framework does not win as decisively on acoustically diverse open-domain datasets like YT-ALL where speech is less dominant, and struggles in outdoor or highly noisy backgrounds containing overlapping sound sources which trigger spurious spatial activations.

| Model | $\ell_2$ ($\times 10^3$) $\downarrow$ | $\Delta\text{ang } (^{\circ}) \downarrow$ | PESQ $\uparrow$ | MOS-Q $\uparrow$ | MOS-P $\uparrow$ |
|---|---|---|---|---|---|
| NoVideo-Renderer | 1.59 | 0.73 | 2.50 | 3.24 | 2.28 |
| VidEnc-Renderer | 1.95 | 0.66 | 1.78 | 3.03 | 3.02 |
| Localizer-AmbiEnc | 1.55 | 0.83 | 3.35 | 3.68 | 2.97 |
| Ours (NoPT) | 1.71 | 0.92 | 1.48 | 2.94 | 2.90 |
| **Ours (Full)** | **1.15** | **0.64** | **3.42** | **3.63** | **3.16** |

## Limitations

The YT-SPEECH dataset is relatively small at 8.9 hours, constraining the diversity of learned acoustic interactions. The system exhibits reduced stability and produces spurious heatmap activations when handling overlapping multiple sound sources, complex reverberation, or heavy background noise where visual grounding becomes ambiguous.

## Why read this

Speech and audio researchers working on immersive 360-degree video, ambisonic spatialization, or audio-visual multi-modal learning should read this to see how audio-visual segmentation priors can be effectively coupled with complex-domain U-Nets via confidence gating.

## Code

- https://spatial-audio-demo.github.io/demos/

## Applications

Immersive telepresence, virtual reality (VR) video players, panoramic streaming platforms, and interactive 360-degree media applications.

## Related

- (link related pages by id as the wiki grows)
