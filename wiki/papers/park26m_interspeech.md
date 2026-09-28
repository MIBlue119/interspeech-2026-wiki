---
id: park26m_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/park26m_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/park26m_interspeech.pdf
---

# Listening to Motion in Space: Vision-Grounded Event-wise Video-to-Audio Generation and Rendering

[PDF](https://www.isca-archive.org/interspeech_2026/park26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26m_interspeech.html)

**TL;DR** — VisionSFX is a training-free video-to-audio workflow that decomposes silent video into discrete, editable, and spatially rendered binaural audio tracks within 1-2 minutes.

## Problem

Conventional video-to-audio systems output a single mono mixture of all sound sources, preventing the per-source editing and spatial control required in professional workflows like film post-production and game engines. While end-to-end binaural systems exist, they rely heavily on large, paired video-binaural training corpora and fixed output formats. VisionSFX addresses this gap by offering a compositional, training-free approach that produces spatialized, independently editable audio tracks from any silent video.

## Method

The pipeline utilizes off-the-shelf pretrained models without any fine-tuning or training data. First, a vision-language model, Gemma 4-VL (31 billion parameters), decomposes the video into discrete sound events with onset/offset timestamps and sound descriptions, alongside an ambient prompt. Second, per-event audio is generated using the MMAudio (large44k-v2) model within padded temporal windows, while a video-agnostic text-to-audio model, TangoFlux (set to 25 diffusion steps and a CFG rate of 4.5), handles ambient sound generation. Finally, audio rendering combines Dense Farneback optical flow with ego-motion correction and monocular depth maps (Depth Anything 3) to compute 3D centroids, which are converted to azimuth and elevation for binaural localization via Head-Related Transfer Functions (HRTF). Ambient audio is converted to stereo using a Hilbert decorrelator, and all tracks are combined using a tanh activation mix.

## Results

The system operates in real-time, executing the complete pipeline of scene decomposition, per-source generation, HRTF spatialization, and live editing on two NVIDIA DGX Spark GPUs within approximately 1 to 2 minutes. The workflow demonstrates edit independence, meaning re-prompting, repositioning, or timeline injection of a single source leaves all other tracks entirely unchanged on disk. Users can interactively manipulate sources in 3D space with instantaneous audio repositioning since no audio regeneration is required for spatial changes.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers, game developers, and film post-production artists building or utilizing AR/VR and video editing tools requiring per-source audio manipulation and spatial control.

## Related

- (link related pages by id as the wiki grows)
