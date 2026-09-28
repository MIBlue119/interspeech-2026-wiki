---
id: si26_interspeech
category: source-separation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-513
pdf: https://www.isca-archive.org/interspeech_2026/si26_interspeech.pdf
---

# Explicit Context-Driven Neural Acoustic Modeling for High-Fidelity RIR Generation

[PDF](https://www.isca-archive.org/interspeech_2026/si26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/si26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-513)

**TL;DR** — MiNAF introduces an explicit geometry-driven neural implicit model for room impulse response generation that queries local room meshes to achieve competitive accuracy and superior few-shot data robustness.

## Problem

Prior neural implicit methods for room impulse response estimation rely on indirect or implicit visual contexts like RGB-D images or NeRF features, while generative mesh methods often dilute fine-grained spatial details. These approaches overlook direct, physically grounded local geometry, limiting their ability to reason about sound propagation, reflections, and occlusions. Incorporating explicit local structure is critical for achieving high fidelity and data efficiency in diverse acoustic environments.

## Method

The paper proposes MiNAF, which extracts explicit local context by casting uniformly distributed rays from transmitter and receiver positions using Fibonacci lattice sampling against a rough room mesh. For each location, it gathers point-of-first-hit distances, surface unit normals, neighbor distance statistics, and a global threshold occupancy histogram. This explicit geometry context is concatenated with positions, receiver orientations, and channel indices, then element-wise time-embedded into two identical MLPs. The networks separately predict the log-magnitude and instantaneous frequency spectra in the STFT domain to reconstruct time-domain room impulse responses.

## Results

The model is evaluated using room mesh data and sparse acoustic measurements across standard indoor simulation datasets. MiNAF performs competitively against conventional and state-of-the-art baselines across multiple evaluation metrics. Furthermore, experiments demonstrate that MiNAF maintains strong robustness under data-scarce conditions, consistently outperforming previous state-of-the-art methods in few-shot training scenarios.

## Code

- https://chen-si-cs.github.io/projects/MiNAF/

## Applications

Engineers building augmented reality, virtual reality, or spatial audio simulation systems can use MiNAF to accurately synthesize room impulse responses for novel speaker and microphone configurations.

## Limitations

The approach relies on having access to a rough room mesh or 3D scan of the environment.

## Related

- (link related pages by id as the wiki grows)
