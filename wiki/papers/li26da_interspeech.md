---
id: li26da_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2170
pdf: https://www.isca-archive.org/interspeech_2026/li26da_interspeech.pdf
---

# Carrier-Aware Sound Zone Control for Parametric Array Loudspeakers

[PDF](https://www.isca-archive.org/interspeech_2026/li26da_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26da_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2170)

**TL;DR** — A carrier-aware sound zone control framework for parametric array loudspeakers treats the ultrasonic carrier as an active control variable alongside sidebands, achieving an 11.2 dB improvement in acoustic contrast.

## Problem

Conventional sound zone control (SZC) for parametric array loudspeakers (PALs) treats the ultrasonic carrier as a fixed background component and only optimizes sideband excitations. This constraint restricts available degrees of freedom, limits acoustic contrast in bright versus dark zones, and results in poor demodulation efficiency due to unoptimized inter-channel nonlinear acoustic coupling.

## Method

The framework models the system using sideband-conditional and carrier-conditional transfer functions that exploit the symmetric relationship between the carrier and sideband components. It employs a finite-stage alternating optimization strategy consisting of initial sideband optimization, carrier weight updating, and a final sideband re-alignment stage to match the refined carrier background. Experiments and simulations utilized a 24-column PAL array with 24 circular emitters per column operating at a 40 kHz carrier frequency. Acoustic contrast control (ACC) was used as the objective optimization algorithm.

## Results

Validated through simulations and anechoic chamber experiments using a 24-column PAL array across a broadband frequency range of 500 Hz to 4 kHz. Under identical power constraints, the proposed carrier-aware ACC achieved a total acoustic contrast of 23.6 dB compared to 12.4 dB for sideband-only control, representing an 11.2 dB improvement. Additionally, it yielded a 7.0 dB increase in total bright-zone sound pressure level (SPL), demonstrating higher demodulation efficiency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio engineers and researchers developing personal audio systems, directional sound reproduction, and private speech communication setups using parametric array loudspeakers.

## Limitations

Each stage of the alternating optimization requires a complete physical remeasurement of the transfer functions, incurring a significant temporal and experimental cost that precludes full convergence iteration in practice.

## Related

- (link related pages by id as the wiki grows)
