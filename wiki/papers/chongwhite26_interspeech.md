---
id: chongwhite26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/chongwhite26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/chongwhite26_interspeech.pdf
---

# An Immersive VR System for Experiencing Spatial Speech-in-Noise Challenges in Clinical Audiology

[PDF](https://www.isca-archive.org/interspeech_2026/chongwhite26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chongwhite26_interspeech.html)

**TL;DR** — The paper presents a portable virtual reality demonstration system built on Apple Vision Pro to simulate spatial speech-in-noise listening challenges for clinical audiology counselling, though formal evaluation is limited to informal feedback from eight professionals.

## Problem

Standard audiological assessments like pure-tone thresholds and speech scores often fail to convey real-world listening struggles to patients and their families, leading to reduced engagement in hearing rehabilitation. Without a shared experiential reference of everyday communication barriers, clinical counseling and discussions about hearing devices become less effective. Bridging this gap requires an immersive yet portable system that allows patients to experience spatialized background noise and competing speakers firsthand within standard clinical rooms.

## Method

The system is implemented on the Apple Vision Pro using visionOS, SwiftUI, RealityKit, AVFoundation, and Apple's Speech framework. It features three 3D environments (café, train station, living room) constructed from 360-degree models, incorporating targeted speech and competing audio sources spatially anchored via RealityKit. Clinicians use presets (Easy, Medium, Hard) to manipulate the number, position, and distance of competing noise sources, modulating the signal-to-noise ratio through distance attenuation. Users interact through voice responses powered by the Apple Speech framework—avoiding complex headset gestures—alongside optional gaze and pinch controls, followed by brief comprehension questions.

## Results

The prototype was demonstrated to a small pilot group of eight clinicians and industry professionals who completed the workflow across all three virtual environments. Participants qualitatively noted increased listening difficulty as the preset levels became more demanding. Initial feedback indicated positive usability and engagement, but formal evaluation with hearing-impaired users, systematic testing of perceptual differences across difficulty presets, and quantitative clinical utility assessments have not yet been conducted.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinicians and audiologists use this system as a portable counselling and demonstration tool to help patients and families understand real-world listening difficulties and the need for hearing devices.

## Limitations

The system is designed purely as an uncalibrated clinical demonstration and counselling tool rather than a diagnostic assessment, and it has not yet been evaluated with hearing-impaired patients.

## Related

- (link related pages by id as the wiki grows)
