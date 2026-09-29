---
id: park26m_interspeech
category: audio-understanding
labels: [generative-model]
institutions: ["Gwangju Institute of Science and Technology", "AunionAI"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/park26m_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/park26m_interspeech.pdf
---

# Listening to Motion in Space: Vision-Grounded Event-wise Video-to-Audio Generation and Rendering

*Hyeonwoo Park, Dayeon Ku, Hong Kook Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/park26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26m_interspeech.html)

**Category:** `audio-understanding` · **Labels:** `generative-model`

**TL;DR** — VisionSFX is a training-free video-to-audio workflow that decomposes silent videos into editable, spatially rendered binaural audio tracks using vision-language models, optical flow, and HRTF rendering in about one minute.

## Key contributions

- Proposes a modular, training-free V2A pipeline that avoids the need for massive paired video-binaural training corpora or model fine-tuning.
- Introduces event-wise scene decomposition using Gemma 4-VL to separate distinct sound events and ambient audio into independent tracks.
- Combines Dense Farneback optical flow with ego-motion correction and monocular depth (Depth Anything 3) to compute 3D spatial coordinates for HRTF binaural rendering.
- Enables real-time, independent source editing (re-prompting, timeline injection, and 3D repositioning) where modifying one track leaves all others untouched.

## Problem

Traditional video-to-audio (V2A) systems like MMAudio or FoleyCrafter produce a single mono mixture of all sounds, making per-source editing and spatial control impossible for post-production, game engines, or AR/VR. While end-to-end binaural methods like ViSAudio exist, they require fixed output formats and massive proprietary datasets—such as a dedicated 97K-pair video-binaural corpus. These bottlenecks restrict creative flexibility and demand heavy compute investments just to adapt audio to varying playback environments.

## Method

The pipeline begins by analyzing an input video using Gemma 4-VL (31B parameters) to generate an event list consisting of time intervals and descriptive text prompts (e.g., 'basketball bounce on hardwood'), alongside a separate ambient prompt. For per-source generation, each segmented video clip and prompt are passed to MMAudio large44k-v2, operating on a 5-second padded crop centered at the midpoint of the event's duration; output boundaries are smoothed using a raised-cosine envelope with a 23 ms attack and 232 ms release. Because MMAudio tends to mix event sounds into background tracks when given long intervals, ambient sound is instead generated video-agnostically via TangoFlux using 25 diffusion steps and a CFG rate of 4.5 (matching MMAudio's CFG rate of 4.5).

To spatialize the tracks, Dense Farneback optical flow computes time-varying 2D coordinates for each event. Ego-motion is removed by subtracting the frame-wise median coordinate trajectory, and a spatial centroid is calculated to map the object's position. Monocular depth maps from Depth Anything 3 sampled at these centroids yield scale-shift-invariant relative depth values, which together translate into azimuth and elevation angles for head-related transfer function (HRTF) binaural rendering. Ambient tracks are converted from mono to stereo via a Hilbert decorrelator to eliminate interaural level cues. Finally, the audible mix is synthesized by summing the ambient and binaural tracks through a tanh activation function.

## Experimental setup

The workflow is demonstrated on two NVIDIA DGX Spark GPUs running a real-time UI. It processes 10-second video clips within approximately 1 to 2 minutes. The system integrates off-the-shelf foundation models including Gemma 4-VL (31B) for scene decomposition, MMAudio large44k-v2 for per-source generation, TangoFlux for ambiance, and Depth Anything 3 for monocular depth estimation, requiring zero task-specific training or fine-tuning epochs.

## Results

The system populates a per-source editable timeline for a 10-second video clip within approximately 1 minute. Spatial repositioning and re-rendering of individual sources occur in real-time (approximately 0.3 seconds) without requiring audio regeneration. The workflow successfully delivers spatial depth and per-source edit independence that traditional mono V2A systems and fixed-format end-to-end binaural pipelines cannot achieve.

## Limitations

Because the system relies entirely on off-the-shelf pretrained models like Gemma 4-VL and MMAudio, its generation quality and event localization are strictly bounded by the capabilities and failure modes of those constituent models. The optical flow and monocular depth estimation can falter under heavy occlusions, fast camera motion, or poorly lit video scenes, leading to inaccurate HRTF spatialization. Additionally, processing long-form videos remains constrained by VLM context limits and cumulative generation latency.

## Why read this

Speech and ML researchers building compositional or spatial audio generation systems should read this to see how modular, training-free pipelines can bypass the need for massive paired multimodal datasets while offering superior editing control.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Film post-production, game audio design, AR/VR environment generation, and interactive media authoring.

## Institutions / 機構

Gwangju Institute of Science and Technology, AunionAI

**Funding / 經費:** Technology Development Programs, Korea MSS, MOTIE, Science and Technology Opens the Future of the Region program, MSIT, Gwangju Metropolitan City

## Related

- (link related pages by id as the wiki grows)
