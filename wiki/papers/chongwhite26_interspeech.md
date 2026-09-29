---
id: chongwhite26_interspeech
category: health-clinical
labels: [robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/chongwhite26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/chongwhite26_interspeech.pdf
---

# An Immersive VR System for Experiencing Spatial Speech-in-Noise Challenges in Clinical Audiology

*Nicky Chong-White, Thomas Ho*

[PDF](https://www.isca-archive.org/interspeech_2026/chongwhite26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chongwhite26_interspeech.html)

**Category:** `health-clinical` · **Labels:** `robustness-noise`

**TL;DR** — An immersive VR demonstration system built for the Apple Vision Pro that recreates spatial speech-in-noise challenges for clinical audiology counseling, evaluated via initial feedback from 8 clinicians. It allows clinicians to configure difficulty presets (signal-to-noise ratio, source count, and spatial separation) across three 3D environments (café, train station, living room) without requiring a sound-treated booth or loudspeaker array.

## Key contributions

- Developed a portable, booth-free spatial listening demonstration tool on Apple Vision Pro (using SwiftUI, RealityKit, AVFoundation, and Apple Speech framework) for clinical audiology counselling.
- Implemented three 3D environments (café, train station, living room) with 360° visual models and RealityKit spatial audio to anchor target and competing sound sources to physical coordinates.
- Integrated a clinician-configurable difficulty progression framework (Easy, Medium, Hard) that varies source number, position, and distance-based attenuation.
- Incorporated voice-based interaction via Apple's Speech framework to enable hands-free quiz responses for older adults or VR-unfamiliar users.

## Problem

Standard clinical audiology assessments provide essential diagnostic information like hearing thresholds and speech perception scores, but they fail to convey why everyday listening in complex acoustic scenes remains difficult. Patients and families often struggle to connect these abstract test results with real-world communication breakdowns, leading to lowered counselling effectiveness and patient disengagement. Prior approaches using VR have primarily focused on formal assessment, rehabilitation, or hearing-device fine-tuning rather than functioning as portable demonstration and counselling tools that bridge the gap between clinical tests and lived experience.

## Method

The system is implemented as an application for visionOS using SwiftUI for interface design, RealityKit for spatial audio rendering and 3D environment management, AVFoundation for media playback, and the Apple Speech framework for voice-based question answering. Three everyday environments (café, train station, living room) are constructed from 360° 3D models where visual characters and audio sources are co-located. Target dialogues (20-30 seconds) and competing maskers/environmental noises are attached to distinct 3D entities in the scene, leveraging Apple Vision Pro's head tracking to maintain spatial anchoring as the user moves.

Before each listening task, clinicians select an environment and a difficulty preset (Easy, Medium, Hard). The difficulty levels vary the number of competing sources, their azimuthal/spatial separation, and their proximity to the user. Because RealityKit applies distance-based attenuation, placing competing sources closer to the listener increases acoustic masking and lowers the local signal-to-noise ratio (SNR) dynamically. After listening to the spatial audio scene, users answer multiple-choice comprehension questions to structure post-task clinical discussions.

To ensure accessibility for older adults and individuals unfamiliar with XR hardware, the system implements voice-based response capture via Apple's Speech framework, bypassing the need for complex hand gestures or precise eye-tracking calibration. Alternative input methods such as gaze-based selection and pinch gestures remain available.

## Experimental setup

The system was demonstrated to an initial qualitative evaluation group of N = 8 clinicians and industry professionals who completed workflows across all three virtual environments. No large-scale datasets, quantitative baseline comparisons, or automated model training loops are applicable, as this is an application and systems paper. The hardware platform used is the Apple Vision Pro headset running visionOS.

## Results

The paper does not report quantitative accuracy metrics, signal-to-noise ratios in decibels, or formal user-study statistics because the work is a system prototype description and proof-of-concept. Initial qualitative demonstrations with a small cohort of N = 8 clinicians and industry professionals showed that users successfully noticed increased listening difficulty as the preset levels became more demanding. Participant feedback regarding system usability, audiovisual engagement, and workflow viability was reported as positive, though formal evaluation of perceived clinical utility with hearing-impaired patients remains unconducted.

## Limitations

The system prototype has only been demonstrated to a small, informal group of N = 8 clinicians and industry professionals, lacking formal empirical evaluation with hearing-impaired patients. The perceptual differences between the Easy, Medium, and Hard difficulty presets have not been formally validated or psychometrically calibrated. Furthermore, the application is currently locked to Apple Vision Pro hardware and has not been adapted to more widely accessible or lower-cost VR platforms like Meta Quest.

## Why read this

Speech and ML engineers building spatial audio applications, XR-based health tools, or assistive listening interfaces should read this paper to understand how modern mixed-reality frameworks (RealityKit and visionOS) can be packaged into portable clinical workflows for audiology.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinical audiology counselling, hearing rehabilitation patient education, and spatial audio demonstration tools for hearing-aid and cochlear-implant candidates.

## Institutions / 機構

National Acoustic Laboratories

## Related

- (link related pages by id as the wiki grows)
