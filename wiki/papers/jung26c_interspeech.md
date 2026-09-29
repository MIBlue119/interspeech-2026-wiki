---
id: jung26c_interspeech
category: enhancement-separation
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3044
pdf: https://www.isca-archive.org/interspeech_2026/jung26c_interspeech.pdf
---

# Edit the Moment, Keep the Rest: Time-Localized Audio Editing via Instruction

*Jinwoo Jung, Gihun Son, Won-Gook Choi, Joon-Hyuk Chang*

[PDF](https://www.isca-archive.org/interspeech_2026/jung26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jung26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3044)

**Category:** `enhancement-separation` · **Labels:** `generative-model`

**TL;DR** — EMKR is an instruction-driven latent diffusion framework built on Stable Audio Open that enables precise time-localized audio editing (adding, removing, replacing, moving, extending) in polyphonic mixtures with 100 ms precision. It achieves a clip-level Fréchet Audio Distance of 3.05 and an F1 segment score of 65.3 at a 0.1 s resolution, outperforming prior instruction-based audio editors.

## Key contributions

- A temporal editing pipeline that generates online training triplets consisting of input audio, edited target audio, and natural language instructions annotated with reference and edit intervals.
- Interval-based timing conditioning combining cross-attention token insertion and multi-layer perceptron projection added to the diffusion timestep embedding for consistent temporal control.
- Source-event masking (SEM) operating in the VAE latent space to explicitly preserve acoustic identity and prevent background corruption during preservation-critical moving and extending tasks.
- Comprehensive evaluation across five editing tasks showing superior performance over existing baseline editors in both region-level signal fidelity and human-evaluated mean opinion scores.

## Problem

Prior text-guided audio editing models such as AUDIT, SAO-Instruct, and training-free approaches typically perform coarse-grained temporal modifications without precise control over event timing. This limitation causes catastrophic failures in polyphonic soundscapes, where multiple instances of the same sound class occur at different moments and users need to alter only a targeted occurrence. Existing techniques either lack fine-grained time localization, rely solely on event-class presence tokens rather than natural language instructions, or damage non-edited background scenes during complex editing operations like moving and extending.

## Method

EMKR builds upon Stable Audio Open (SAO), which integrates a variational autoencoder (VAE) for waveform-to-latent conversion, a T5-based text encoder for instruction embedding, and a diffusion transformer (DiT) operating in the latent domain. The framework processes natural language instructions alongside structured temporal metadata defined by a reference interval R = [rs, re] specifying the region to modify, and an edit interval E = [es, ee] specifying where resulting edits appear. These four temporal scalars (rs, re, es, ee) are mapped via a temporal embedding layer into 768-dimensional representations and injected through two parallel pathways: concatenated as extra tokens into the T5 text embedding sequence for cross-attention, and projected via an MLP (yielding a 3,072-dimensional vector) to condition the diffusion timestep embedding.

To handle preservation-critical tasks such as moving and extending, EMKR introduces a source-event mask (SEM) m_src that takes a value of 1 on the reference interval R and 0 elsewhere. The VAE latent of the input mixture z_0, its noised version z_t, and the binary mask m_src are concatenated along the channel dimension and projected with an MLP before entering the DiT blocks. SEM is explicitly activated only during moving and extending tasks to isolate the source instance and protect background scenes, while being zeroed out for adding, removing, and replacing.

The framework is trained end-to-end using an online data generation pipeline. Background clips are sampled from AudioCaps and WavCaps, while foreground events are drawn from ESC-50, FSD50K, and WavCaps. Task-specific audio pairs are synthesized on-the-fly by mixing foreground sounds into backgrounds at precise temporal offsets according to randomized instruction templates.

## Experimental setup

The evaluation dataset consists of 1,000 synthetic test samples balanced across the five tasks, generated using held-out background, foreground, and instruction combinations from AudioCaps, WavCaps, ESC-50, and FSD50K. Baselines include SAO-Instruct, AUDIT, ZETA (with T_start in {50, 75}), and AudioEditor. Metrics encompass region-level and clip-level Fréchet Audio Distance (FAD), Fréchet Distance (FD), Kullback-Leibler (KL) divergence, segment-based F1 score (F1seg) at 1.0 s and 0.1 s resolutions, log spectral distance (LSD), Scale-Invariant Signal-to-Distortion Ratio (SI-SDR), and human Mean Opinion Scores (MOS) across four axes. EMKR was trained for 60k steps with a batch size of 32 using the AdamW optimizer (learning rate 5e-5) on a single NVIDIA RTX 5090 GPU for approximately 40 hours.

## Results

EMKR achieved a clip-level FAD of 3.05, FD of 22.9, and KL divergence of 0.665, outperforming the strongest baseline (AudioEditor at FAD 3.59, and SAO-Instruct at KL 1.085). In region-level target evaluations, EMKR attained an F1seg (0.1 s) of 87.7% for adding and 83.0% for replacing, vastly outperforming baselines that stayed below 53%. For moving and extending tasks, an ablation study proved the necessity of the source-event mask (SEM): adding SEM increased the moving target F1seg (0.1 s) from 38.3% to 64.3% and improved non-edit SI-SDR from -2.42 to -0.25 dB, while increasing extending target F1seg from 77.8% to 83.7%. In subjective MOS evaluations, EMKR scored 4.35 in Quality and 4.75 in Content, coming closest to ground truth (4.83 and 4.71) and substantially beating SAO-Instruct (2.77 Quality, 1.84 Content).

| System | FAD ↓ | FD ↓ | KL ↓ | F1seg (1s) ↑ | F1seg (0.1s) ↑ |
|---|---|---|---|---|---|
| Ground Truth | - | - | - | 70.9 | 63.8 |
| ZETA (T_start=50) | 4.79 | 48.4 | 2.933 | 18.8 | 13.6 |
| AUDIT | 4.08 | 42.6 | 1.386 | 42.1 | 34.0 |
| AudioEditor | 3.59 | 42.1 | 1.699 | 45.4 | 36.7 |
| SAO-Instruct | 5.73 | 31.7 | 1.085 | 46.4 | 38.3 |
| EMKR (Ours) | 3.05 | 22.9 | 0.665 | 72.1 | 65.3 |

## Limitations

The evaluation relies heavily on synthetic mixtures constructed from isolated sound event datasets (ESC-50, FSD50K) combined with ambient backgrounds, which may not fully capture the acoustic complexity, reverberation, and overlapping harmonic structures of real-world continuous recordings. The temporal precision is upper-bounded by the latent frame rate of the underlying Stable Audio Open VAE and DiT backbone, and the framework requires explicit a priori interval coordinates (reference and edit timestamps) provided alongside natural language instructions.

## Why read this

Speech and ML researchers focusing on generative audio editing should read this paper to understand how explicit interval conditioning and latent-space masking can resolve spatial-temporal ambiguity in diffusion models. It provides a blueprint for achieving 100 ms-level temporal control in polyphonic sound mixtures without disrupting background acoustic contexts.

## Code

- https://jinwoo0302.github.io/emkr-demo/

## Applications

Automated post-production of film and podcast soundtracks, time-synchronized sound effect insertion, and precise audio cleanup or object rearrangement in complex acoustic environments.

## Institutions / 機構

Hanyang University

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation

## Related

- (link related pages by id as the wiki grows)
