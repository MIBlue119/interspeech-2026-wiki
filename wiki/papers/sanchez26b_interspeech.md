---
id: sanchez26b_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3022
pdf: https://www.isca-archive.org/interspeech_2026/sanchez26b_interspeech.pdf
---

# From Lab to Laptop: Validating 3D Speech Kinematics with MediaPipe Face Mesh

*Victoria Sanchez, Oliver Roesler, Michael Neumann, David Pautler, Brian Richburg, Karen Chenausky, Yana Yunusova, Vikram Ramanarayanan, Jordan Green*

[PDF](https://www.isca-archive.org/interspeech_2026/sanchez26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sanchez26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3022)

**TL;DR** — This paper analytically validates a markerless, single-camera 3D speech kinematics pipeline using MediaPipe Face Mesh, achieving a mean 3D unbiased RMS error of 2.03 mm compared to optical motion capture gold standards. It demonstrates that standard laptop video and even 15 fps bandwidth-constrained feeds are sufficient for millimeter-scale articulatory tracking.

## Key contributions

- Establishes a per-participant calibration and metric scaling method using outercanthal distance to convert MediaPipe Face Mesh normalized coordinates into millimeter units.
- Performs a rigorous trajectory-level benchmark comparing single-camera monocular tracking against an 8-camera optical motion capture system across 116 speech segments.
- Evaluates tracking robustness at both 30 fps and bandwidth-constrained 15 fps under matched low-pass filtering (7.125 Hz).
- Quantifies error across axes relative to physical movement magnitude (range of motion and 95th percentile speed) rather than absolute pixel distances alone.

## Problem

Traditional speech kinematic measurements require specialized, expensive laboratory infrastructure such as electromagnetic articulography or multi-camera optical motion capture. These rigid requirements restrict studies to academic medical centers, systematically excluding vulnerable, disabled, or geographically isolated patient populations. While computer vision and facial landmark models have advanced, prior video-based approaches either relied on multi-camera setups and depth sensors, validated only summary statistics rather than full kinematic trajectories, or outputted arbitrary units that prevent physical interpretation.

## Method

The pipeline processes standard RGB video from a MacBook Pro webcam using MediaPipe Face Mesh (MFM v0.10.21) to extract 3D facial landmark coordinates. The model outputs x and y as normalized image coordinates and z as relative depth scaled to image width. These are converted to isotropic pixel coordinates using frame width. A per-participant metric scaling factor converts pixels into millimeters using the participant's outer-canthal distance (the distance between outer left and right eye corners) as an anatomical reference, with depth scaling defined via the median scaling factor across frames. Head motion is isolated from articulatory movement by computing a proper 3D rotation matrix and translation vector via a rigid-body transform on stable facial landmark anchors (forehead anchors, eye corners, and nose tip) mapped to a reference frame.

To ensure fair comparisons across frame rates, full-length trajectories are low-pass filtered using identical zero-phase filters with a 7.125 Hz cutoff (respecting the 7.5 Hz Nyquist limit of 15 fps). Displacement is computed relative to segment onset, and velocity is derived as the first temporal derivative. Validation metrics include unbiased root mean square error (uRMSE) for 3D position, normalized displacement error relative to the 95th percentile range of motion, and normalized speed error relative to 95th percentile speed, alongside peak cross-correlation and spectral centroid differences.

## Experimental setup

Evaluated on data from 4 healthy adult laboratory staff (ages 26-58; 2 female, 2 male) performing 116 total segments across three tasks: a diadochokinetic (DDK) task (/pa/, /ta/, /ka/), a sentence repetition task (SRT), and a maximal movement (MMM) task. Ground truth trajectories were recorded simultaneously using an 8-camera Cortex optical motion capture system at 120 fps. Metrics include 3D uRMSE (mm), normalized displacement error (%), normalized speed error (%), peak cross-correlation, peak-lag (ms), and spectral centroid difference (Hz).

## Results

The system achieved a mean 3D uRMSE of 2.03 ± 0.59 mm at 30 fps and 2.03 ± 0.78 mm at 15 fps under matched filtering. Mean normalized displacement error was 6.63 ± 1.28% at 30 fps and 8.96 ± 4.40% at 15 fps, showing that trajectory amplitude is well-preserved. Dynamic fidelity revealed normalized speed errors of 13.96% (30 fps) and 12.89% (15 fps), with vertical axis velocity showing the strongest agreement (peak cross-correlation 0.74). Lateral tracking exhibited lower dynamic agreement due to the small magnitude of lateral speech movements pushing them close to the noise floor.

| System / Condition | 3D uRMSE (mm) | Normalized Displacement Error (%) | Normalized Speed Error (%) | Peak Velocity Corr (Y-Axis) |
|---|---|---|---|---|
| MFM 30 fps (Matched Filter) | 2.03 ± 0.59 | 6.63 ± 1.28 | 13.96 ± 5.13 | 0.74 ± 0.06 |
| MFM 15 fps (Matched Filter) | 2.03 ± 0.78 | 8.96 ± 4.40 | 12.89 ± 3.77 | 0.71 ± 0.05 |

## Limitations

The validation is limited to a small sample of 4 healthy adults under controlled laboratory lighting conditions. Real-time streaming, video compression artifacts, variable real-world lighting, and severe head motion were not evaluated. Furthermore, velocity derivatives showed higher susceptibility to noise (approx. 14% normalized speed error), and the per-participant manual eye-distance calibration requires further automation for unsupervised deployment.

## Why read this

Speech researchers and digital health engineers seeking to deploy scalable, remote, monocular computer vision pipelines for motor speech tracking should read this to understand the accuracy bounds and filtering requirements of MediaPipe Face Mesh relative to optical motion capture.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Remote clinical monitoring of neurodegenerative and neuropsychiatric conditions (e.g., ALS, Parkinson's disease), and motor speech tracking for populations with limited access to academic medical centers.

## Related

- (link related pages by id as the wiki grows)
