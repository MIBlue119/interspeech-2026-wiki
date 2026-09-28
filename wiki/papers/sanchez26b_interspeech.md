---
id: sanchez26b_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3022
pdf: https://www.isca-archive.org/interspeech_2026/sanchez26b_interspeech.pdf
---

# From Lab to Laptop: Validating 3D Speech Kinematics with MediaPipe Face Mesh

[PDF](https://www.isca-archive.org/interspeech_2026/sanchez26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sanchez26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3022)

**TL;DR** — This study analytically validates a single-camera markerless 3D facial tracking pipeline using MediaPipe Face Mesh against optical motion capture, achieving a mean 3D positional uRMSE of 2.03 mm.

## Problem

Traditional speech kinematic measurements rely on expensive, bulky laboratory equipment like electromagnetic articulography or optical motion capture, restricting assessments to clinical settings and excluding vulnerable populations with limited mobility or access. Prior computer vision methods either lack trajectory-level depth validation, depend on multi-camera setups, or output measurements in uninterpretable normalized units. Establishing a validated, single-camera tracking pipeline using standard RGB video is crucial to democratizing speech motor assessment for remote, home, and clinical monitoring.

## Method

The pipeline processes standard laptop RGB video using MediaPipe Face Mesh (v0.10.21) to capture 3D facial landmark trajectories. To map pixel-based coordinates into physical units, the system applies a per-participant metric scaling procedure leveraging outer-canthal eye distance and centers the z-axis using a stable set of head anchors. A rigid-body transformation computed via head anchors is applied to isolate articulatory motion from whole-head movement. The setup evaluates performance across 116 speech segments from 4 adult participants performing diadochokinetic tasks, sentence repetitions, and maximal movement tasks recorded simultaneously with an 8-camera optical motion capture system. To test deployment robustness, videos are evaluated under matched-bandwidth conditions at both 30 fps and a temporally downsampled 15 fps.

## Results

Benchmarked against optical motion capture, the single-camera pipeline achieved a mean 3D unbiased root mean square error of 2.03 ± 0.59 mm at 30 fps and 2.03 ± 0.78 mm at 15 fps. Normalized displacement error averaged 6.63 ± 1.28% at 30 fps and 8.96 ± 4.40% at 15 fps relative to the 95th percentile range of motion. Velocity trajectories yielded a mean peak cross-correlation of 0.55 at 30 fps and 0.61 at 15 fps with minimal peak lag below 18 ms. Axis-specific evaluations revealed that tracking error was largest along each landmark's primary movement axis, with vertical axes showing the strongest dynamic agreement.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-language pathologists, neurologists, and clinical researchers can use this single-camera pipeline for scalable, remote monitoring of speech motor control and neurodegenerative disease progression.

## Limitations

The validation was restricted to a small sample of 4 healthy adults under controlled laboratory lighting without evaluating real-time streaming, video compression artifacts, or severe head motion.

## Related

- (link related pages by id as the wiki grows)
