---
id: xu26p_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2025
pdf: https://www.isca-archive.org/interspeech_2026/xu26p_interspeech.pdf
---

# Room Impulse Response Completion Using Signal-Prediction Diffusion Models Conditioned on Simulated Early Reflections

[PDF](https://www.isca-archive.org/interspeech_2026/xu26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2025)

**TL;DR** — The paper introduces a signal-prediction diffusion model for room impulse response (RIR) completion conditioned on incomplete early reflections from low-order image source method simulations, yielding continuous full-band RIRs without temporal artifacts.

## Problem

Existing deep learning methods for RIR completion require a fixed 50 ms or 80 ms early reflection window truncated from fully simulated or measured responses, making them incompatible with geometric simulation pipelines like the image source method (ISM) that rely on a maximum reflection order parameter. Truncated low-order ISM simulations directly cause severe temporal discontinuities in the completed RIRs. Solving this enables efficient, flexible RIR generation and spatial audio rendering from simpler geometric inputs.

## Method

The framework employs an x-prediction 1D U-Net diffusion model trained with 200 cosine-scheduled steps, featuring 7 stride-2 downsamples to support 32,768-sample RIRs and a 6-layer residual dilated Conv1D bottleneck stack with dilations up to 32 to capture long-range reverberation. The conditioner (low-order ISM direct path and early reflections) is concatenated with the noisy RIR along the channel dimension. Training incorporates classifier-free guidance (CFG) with a 0.2 null-conditioning probability and an energy decay curve (EDC) loss combined with mean squared error to preserve physically realistic energy decay behavior down to a -60 dB floor.

## Results

Evaluated on 10,000 paired shoebox room datasets generated via pyroomacoustics (ISM) and Treble SDK (numerical wave simulations capturing furniture and diffraction), the proposed model is compared against the Echo2Reverb baseline. Objective evaluations demonstrate that the proposed method avoids temporal discontinuities and successfully completes RIRs from low-order reflection inputs (orders 1, 3, 5, 7) while better matching residual energy ratios and energy decay curve mean absolute errors compared to baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio engineers and machine learning practitioners synthesizing large-scale datasets for acoustic spatial rendering, acoustic signal processing, and data augmentation.

## Related

- (link related pages by id as the wiki grows)
