---
id: islam26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-506
---

# CAPS: A Cascaded Reconstruction Model to Power Saving in Hearables Using Sub-Nyquist Sampling with Bandwidth Extension

**TL;DR** — CAPS intentionally under-samples hearable microphone signals below the Nyquist rate and reconstructs wideband speech from the narrowband result, cutting ADC power use by 3.3x while running in 1.36ms on mobile hardware.

## Problem

Hearables use both bone- and air-conduction microphones for multimodal speech enhancement, but no prior work explores jointly reducing ADC sampling bit resolution and sampling frequency for power savings, and existing frameworks lack a way to reconstruct wideband signals from sub-Nyquist narrowband components.

## Method

CAPS intentionally applies sub-Nyquist sampling and low bit resolution in the ADC, then uses a cascaded reconstruction model to recover wideband speech from the resulting narrowband, low-resolution signal, supporting streaming operation on mobile platforms.

## Results

CAPS achieves a 3.3x reduction in power consumption with an inference time of 1.36ms and an 11.04MB memory footprint, while maintaining robust speech intelligibility in real-world settings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Directly applicable to battery-constrained hearable and hearing-aid hardware that needs to cut ADC power draw without sacrificing speech intelligibility.

## Related

- (link related pages by id as the wiki grows)
