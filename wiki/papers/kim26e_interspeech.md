---
id: kim26e_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-474
pdf: https://www.isca-archive.org/interspeech_2026/kim26e_interspeech.pdf
---

# Temporal Transition-Aware Multi-Head Modeling for Partially Spoofed Audio Detection and Localization

[PDF](https://www.isca-archive.org/interspeech_2026/kim26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-474)

**TL;DR** — A transition-aware multi-head modeling framework is proposed for partially spoofed audio localization, utilizing directional inter-frame changes to precisely identify manipulated regions at a 20 ms resolution.

## Problem

Partially spoofed audio localization requires identifying short, manipulated spans within an utterance, but prior methods rely on binary frame authenticity or point-wise boundary detection. These frame-wise approaches overlook how neighboring frames evolve, making it difficult to separate manipulation artifacts from natural speech variability or handle complex utterances with multiple edited segments.

## Method

The framework uses a pretrained XLS-R-300M self-supervised front-end to extract frame-level features at a 20 ms resolution. A Multi-Scale GRU (MS-GRU) backbone processes these features through a multi-dilation 1D convolutional branch and a bidirectional GRU branch, dynamically fusing them via a GEGLU gating mechanism. A multi-head objective is trained jointly: a frame head for frame authenticity, a transition head classifying adjacent-frame changes into Real-to-Fake, Fake-to-Real, or None, and a refinement head that fuses both signals for coherent predictions.

## Results

Evaluated on the PartialSpoof Dataset and the PartialEdit-E1/E2 benchmarks, the proposed method achieves state-of-the-art localization performance. The approach effectively captures temporal dynamics and manipulation boundaries even in challenging scenarios containing multiple manipulated spans per utterance. Ablations confirm the utility of combining local multi-scale convolutional context with directional transition supervision.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech security and deepfake detection systems utilize this technique to identify and localize fine-grained semantic manipulations in audio recordings.

## Related

- (link related pages by id as the wiki grows)
