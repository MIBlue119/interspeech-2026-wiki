---
id: wei26c_interspeech
category: source-separation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1191
pdf: https://www.isca-archive.org/interspeech_2026/wei26c_interspeech.pdf
---

# Perceptually Weighted Minimum Mean Square Error Precoding for Acoustic Multi-User MIMO in Vehicular Personal Sound Zones

[PDF](https://www.isca-archive.org/interspeech_2026/wei26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wei26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1191)

**TL;DR** — This paper proposes a perceptually weighted acoustic multi-user MIMO precoding framework for in-vehicle personal sound zones that integrates psychoacoustic masking into the WMMSE criterion to improve speech quality over traditional methods.

## Problem

Traditional spatial audio techniques for personal sound zones treat crosstalk uniformly as physical energy and neglect human psychoacoustics, leading to suboptimal distortion management. Furthermore, standard methods struggle to coordinate multiple zones simultaneously in highly reverberant and reflective environments like car cabins. This limits audio clarity and listener separation in smart cockpit applications.

## Method

The framework models in-vehicle sound delivery as a frequency-domain acoustic multi-user MIMO system, mapping loudspeaker arrays to multi-seat microphone receivers. It incorporates an MPEG-inspired psychoacoustic masking model combined with the absolute threshold of hearing to generate positive semidefinite weighting matrices. These weights penalize errors more heavily in perceptually sensitive time-frequency regions. The optimization problem is solved using a weighted minimum mean square error (WMMSE) approach with total transmit power and acoustic contrast constraints.

## Results

Evaluated using measured impulse responses from a sedan cabin equipped with 7 loudspeakers and 4 passenger seat positions containing 16 microphones each (totaling 64 sensors), the approach is compared against conventional acoustic contrast control and pressure matching baselines. The method achieves improved objective speech quality and inter-user interference suppression. The paper details performance across multiple seating zones under realistic car cabin acoustic conditions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smart cockpit audio systems and multi-zone in-vehicle infotainment requiring independent sound delivery to multiple passengers.

## Related

- (link related pages by id as the wiki grows)
