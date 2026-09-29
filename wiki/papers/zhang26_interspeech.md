---
id: zhang26_interspeech
category: enhancement-separation
labels: [generative-model]
institutions: ["Harbin Institute of Technology"]
code: https://ethuil.github.io/AURA/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-87
pdf: https://www.isca-archive.org/interspeech_2026/zhang26_interspeech.pdf
---

# AURA: Audio-Geometry Conditioned U-Net Refinement with Flow Matching for High-Fidelity Monaural-to-Binaural Synthesis

*Wenjie Zhang, Changjun He, Yinghan Cao, Shiyun Xu, Mingjiang Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-87)

**Category:** `enhancement-separation` · **Labels:** `generative-model`

**TL;DR** — AURA is a two-stage monaural-to-binaural audio synthesis framework combining a hybrid Transformer-CNN U-Net for coarse estimation with conditional flow matching for fine-grained spatial-spectral refinement, achieving a Wave-L2 of 0.123 and an overall MOS of 3.82.

## Key contributions

- Designed a hybrid U-Net backbone (TCDB) integrating multi-head self-attention and depthwise convolutions for robust coarse binaural prediction.
- Introduced a Spatial-Awareness and Motion Attention (SAMA) mechanism to track source geometry and quaternion-parameterized orientation.
- Employed a conditional flow matching (CFM) refinement stage using an optimal transport path to inject stochastic acoustic details and subtle spatial micro-cues.
- Demonstrated superior objective and perceptual performance over state-of-the-art models like BinauralGrad and DPATFNet on open-air recordings.

## Problem

Synthesizing high-fidelity binaural audio from monaural input requires inferring missing spatial cues like interaural level and time differences (ILD/ITD) while preserving fine timbral details. Traditional DSP methods rely on rigid Head-Related Transfer Function (HRTF) databases that fail under dynamic listener motion and reverberant real-world environments. Prior deep learning models (such as WarpNet, BinauralGrad, NFS, and DPATFNet) struggle to jointly capture fine-grained acoustic textures and precise spatial-geometric relationships without audio degradation or high computational costs. This limitation prevents realistic, immersive binaural rendering from becoming practical for VR, AR, and telepresence applications.

## Method

AURA takes monaural audio paired with source position (3 channels) and orientation represented as unit quaternions (4 channels). The input sequence undergoes Time Dynamic Warping (TDW), followed by Transformer-CNN Downsample Blocks (TCDBs) that combine multi-head self-attention with a SimpleGate feed-forward network and depthwise 1x1/3x3 convolutions to jointly extract global context and local patterns.

To explicitly handle geometry, the Spatial-Awareness and Motion Attention (SAMA) mechanism processes the 7-channel pose tensor via self-attention, cross-attention between position and orientation, and multi-scale convolutions. Spatial-Enhanced Residual Upsample Blocks (SERUBs) progressively reconstruct coarse binaural audio by concatenating pose information across multiple decoder stages.

In the second stage, Conditional Flow Matching (CFM) refines the coarse binaural estimate by learning a continuous-time vector field transported from a Gaussian noise prior around the coarse prediction to the ground-truth distribution along a linear optimal transport path. The CFM network takes the intermediate state, time step, and pose sequence as input, using a fixed-step Euler solver with 10 steps during inference. The composite training loss combines waveform L2, STFT phase error, STFT amplitude error, and the CFM velocity-matching loss weighted by respective hyperparameters.

## Experimental setup

Evaluated on a 2-hour publicly available dataset of paired monaural and binaural recordings sampled at 48 kHz recorded outside an anechoic chamber using a KEMAR mannequin and moving participants. Compared against traditional DSP, WaveNet, WarpNet, BinauralGrad, NFS, and DPATFNet. Metrics include objective Wave-L2, Amplitude-L2, and Phase-L2, alongside subjective 1-5 scale MOS, Spatial MOS, and Similarity MOS evaluated by 15 listeners. The model uses 200 ms audio chunks, batch normalization, GELU activation, and the Adam optimizer with cosine annealing (lr 1e-3 to 1e-5 with 1000 warmup steps) trained for 300,000 steps.

## Results

AURA achieves a headline Wave-L2 of 0.123 (vs BinauralGrad's 0.128, DPATFNet's 0.148, and WarpNet's 0.167) and an Amp-L2 of 0.028, while scoring a top overall MOS of 3.82 and Similarity MOS of 4.21. In ablation studies, removing the flow matching refinement (w/o CFM) causes the largest performance degradation, spiking Wave-L2 to 0.183, while dropping the SAMA module degrades Wave-L2 to 0.145. AURA does not achieve the absolute lowest Phase-L2 score, where DPATFNet performs better (0.717 vs 0.843), and carries a higher computational cost in MACs (759.17 G) compared to smaller baselines like DPATFNet (2.44 G).

| Model | Wave-L2 ↓ | Amp-L2 ↓ | Phase-L2 ↓ | MOS ↑ |
|---|---|---|---|---|
| WaveNet | 0.179 | 0.037 | 0.968 | 3.57 |
| WarpNet | 0.167 | 0.048 | 0.807 | 3.47 |
| BinauralGrad | 0.128 | 0.030 | 0.837 | 3.53 |
| NFS | 0.172 | 0.035 | 0.999 | 3.42 |
| DPATFNet | 0.148 | 0.037 | 0.717 | 3.56 |
| AURA | 0.123 | 0.028 | 0.843 | 3.82 |

## Limitations

The evaluation relies on a single 2-hour dataset recorded with a fixed KEMAR mannequin setup, limiting known generalization to diverse acoustic environments, varying room impulse responses, and different human head shapes. The high MAC count (759.17 G) and iterative ODE solver steps for flow matching impose heavy computational overhead, making real-time on-device deployment challenging without further optimization.

## Why read this

Speech and audio researchers working on spatial audio rendering should read this to see how continuous-time flow matching can be effectively coupled with geometric-conditioned U-Nets to push mono-to-binaural synthesis fidelity beyond diffusion-based baselines.

## Code

- https://ethuil.github.io/AURA/

## Applications

Virtual reality, augmented reality, immersive telepresence, and spatial audio enhancement for mono recordings.

## Institutions / 機構

Harbin Institute of Technology

**Funding / 經費:** National Natural Science Foundation of China, Key Research and Development Program of Xinjiang Uygur Autonomous Region, Shenzhen Higher Education Institutions Stability Support Program, Guangdong Basic and Applied Basic Research Foundation

## Related

- [Spec2Spatial: A Time-Frequency Spatial Attention Network for Binaural Audio Synthesis](he26b_interspeech.md) — same problem · relatedness 2.8/3
- [TTBA: Spatial Prompted Text to Binaural Audio Generation Using Transformer](he26_interspeech.md) — same problem · relatedness 2.1/3
- [Spatial-Magnifier: Spatial upsampling for multichannel speech enhancement](lee26k_interspeech.md) — same problem · relatedness 2.1/3
- [AV-FlowSep: Audio-Visual Target Speaker Separation via Flow Matching](tipaksorn26_interspeech.md) — shared technique · relatedness 1.9/3
- [PhASE-Flow: Phonetic-Conditioned Acoustic Flow Matching in SSL Representation Domain for Speech Enhancement](gao26e_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
