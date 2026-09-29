---
id: xu26c_interspeech
category: applications-other
institutions: ["Australian National University", "University of Queensland"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-702
pdf: https://www.isca-archive.org/interspeech_2026/xu26c_interspeech.pdf
---

# HRIR-Former: Grid-Free Time-Domain Reconstruction of Head-Related Impulse Responses with a Spatially Encoded Transformer

*Shaoheng Xu, Chunyi Sun, Jihui Zhang, Amy Bastine, Prasanga N. Samarasinghe, Thushara D. Abhayapala, Hongdong Li*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-702)

**Category:** `applications-other`

**TL;DR** — HRIR-Former is a time-domain, grid-free binaural Transformer that up-samples head-related impulse responses (HRIRs) from sparse per-listener measurements to arbitrary spatial directions, achieving an ITD error of 16.4 µs and ILD error of 1.10 dB under 5-measurement sparsity.

## Key contributions

- Time-domain binaural reconstruction framework that avoids minimum-phase assumptions and preserves raw phase information directly.
- Grid-free directional modeling via multi-frequency sinusoidal position encoding to infer HRIRs at completely unseen target directions.
- Auxiliary ITD and ILD prediction heads to explicitly anchor interaural timing and level cues under sparse measurement layouts.
- Post-Transformer Conv1D temporal refinement module operating across sorted spatial directions to eliminate local discontinuities and audible artifacts.

## Problem

Acquiring individualized head-related transfer functions (HRTFs) and HRIRs requires tedious experimental setups and specialized anechoic facilities, motivating spatial up-sampling from sparse measurements. Classical basis-function and spherical-harmonic interpolations degrade severely under sparse sampling gaps of 30 to 40 degrees, while prior machine learning techniques mostly operate in the frequency domain, rely on rigid fixed grids, or enforce limiting minimum-phase (MP) approximations. This leaves time-domain, spatially continuous HRIR reconstruction across arbitrary 3D directions largely underexplored, despite phase and timing being critical for immersive spatial audio perception.

## Method

The architecture treats HRIR up-sampling as a masked inpainting task over a unified set of L = M measured and N unmeasured directions. Measured binaural HRIR pairs h_m (sampled at 48 kHz, length K=256) are concatenated into row vectors, projected via an MLP encoder with GELU activation, and combined with multi-frequency sinusoidal positional embeddings (P=6) of the spherical coordinates (azimuth, elevation, radius). A 3-layer Transformer encoder (model dimension D=256, 4 attention heads) processes these combined tokens using self-attention where missing directions are masked out from keys. A shared multi-layer perceptron decoder maps contextual features back to full-length binaural HRIRs, followed by a masked fusion step to exactly preserve observed measurements.

The decoded field is reordered by descending elevation and ascending azimuth and passed through a lightweight 1-dimensional convolution with a kernel size of 3 to ensure smooth local directional continuity. The total training loss is a sum of time-domain reconstruction loss, a complex HRTF spectral loss (L_HRTF scaled by lambda=500), and auxiliary ITD and ILD mean absolute error heads (weighted by lambda=0.05). Training is performed with AdamW at a learning rate of 3e-4 and batch size 8 for 500 epochs on an NVIDIA A100 GPU.

## Experimental setup

Evaluated on the SONICOM database containing measurements for over 200 subjects across 793 source directions per subject, using the protocol from prior literature (180 subjects for training, 20 for validation, subject P0079 excluded). Compared against six baselines: Nearest Neighbor (Nbr), HRTF-Sel-ITD, HRTF-Sel-LSD, NF-CbC, NF-LoRA, and RANF across sparsity levels M = 3, 5, 19, and 100. Evaluated using ITD Error (ITD-E), ILD Error (ILD-E), Normalized Mean Squared Error (NMSE), and Cosine Distance (CD).

## Results

HRIR-Former achieves the lowest ILD error across all measurement sparsity levels (e.g., 1.14 dB at M=3 and 0.70 dB at M=100) and attains the best ITD error in extremely sparse regimes (18.5 µs at M=3 and 16.4 µs at M=5), remaining competitive with top frequency-domain baselines at denser inputs. For time-domain reconstruction fidelity, it records NMSE values ranging from -6.90 dB (M=3) down to -10.20 dB (M=100) and Cosine Distances from 0.233 down to 0.102. Ablation studies confirm that removing sinusoidal encoding causes the steepest drop in performance (CD degrading from 0.210 to 0.298 at M=5), and show that explicit minimum-phase pre-processing is unnecessary as it hurts rather than helps performance.

| Method | M=3 ITD-E (µs) | M=3 ILD-E (dB) | M=5 ITD-E (µs) | M=5 ILD-E (dB) | M=100 ITD-E (µs) | M=100 ILD-E (dB) |
|---|---|---|---|---|---|---|
| HRIR-Former (Proposed) | 18.5 | 1.14 | 16.4 | 1.10 | 10.6 | 0.70 |
| Nbr [35] | 274.2 | 7.6 | 154.2 | 4.8 | 44.0 | 1.4 |
| HRTF-Sel-ITD [35] | 26.3 | 1.4 | 24.5 | 1.5 | 20.0 | 1.4 |
| NF-CbC [45] | 22.1 | 1.5 | 20.7 | 2.0 | 11.8 | 1.7 |
| NF-LoRA [46] | 28.6 | 1.3 | 24.7 | 1.4 | 9.1 | 1.1 |
| RANF [35] | 20.5 | 1.2 | 18.7 | 1.2 | 10.0 | 0.8 |

## Limitations

The evaluation is restricted to free-field compensated HRIR datasets under controlled acoustic conditions, leaving room acoustics and reverberation untested. The model's generalization to extreme out-of-distribution anthropometries or highly sparse real-world recordings with physical measurement noise requires further validation. Additionally, subjective human listening tests were not conducted to verify whether objective error reductions translate to perceptible localization improvements.

## Why read this

Spatial audio researchers and ML engineers building personalization or up-sampling systems for virtual reality should read this to see how time-domain Transformers with explicit auxiliary cue heads can outperform traditional frequency-domain and minimum-phase pipelines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Binaural audio rendering for virtual reality (VR), augmented reality (AR), and object-based spatial audio production in films.

## Institutions / 機構

Australian National University, University of Queensland

**Funding / 經費:** ANU PhD Scholarship, ANU HDR Fee Merit Scholarship

## Related

- (link related pages by id as the wiki grows)
