---
id: gong26_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-182
pdf: https://www.isca-archive.org/interspeech_2026/gong26_interspeech.pdf
---

# NCPSZ: A Nonlinear Control Network for Miniature Loudspeakers in Personal Sound Zone Applications

[PDF](https://www.isca-archive.org/interspeech_2026/gong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-182)

**TL;DR** — NCPSZ is a data-driven nonlinear control network for personal sound zones that suppresses miniature loudspeaker distortion and achieves a 3.78 dB acoustic contrast improvement over linear baselines.

## Problem

Personal sound zone systems relying on linear control methods experience significant performance degradation on miniature consumer loudspeakers due to severe nonlinear distortion at high playback volumes. In privacy-sensitive leakage-prevention scenarios, assisting speakers must output high-amplitude anti-phase cancellation signals that generate unmodeled harmonic and inter-modulation artifacts. These nonlinearities create a practical performance ceiling for traditional linear filters like acoustic contrast control and pressure matching.

## Method

The framework utilizes an asymmetric dual-network architecture where a high-fidelity modeling network (ModelNet) characterizes offline loudspeaker nonlinearity to supervise a lightweight, causal control network (CtrlNet) in real time. Both networks share an Encoder-Bottleneck-Decoder structure featuring depthwise-separable 2D convolutions, a causal Gated Recurrent Unit (GRU) bottleneck, and a 3D complex mask head for phase-aware STFT spectral correction. The system employs an anchor-speaker strategy where the primary earpiece maintains target sound pressure in the bright zone, while CtrlNet optimizes assisting speakers using a joint time-frequency reconstruction loss to suppress leakage in the dark zone. ModelNet uses a 4-layer topology with 128 channels and 32.71M parameters, whereas CtrlNet is a 2-layer edge-friendly model with 16 channels and just 0.18M parameters.

## Results

Evaluated on a speech-to-speech dataset of over 1,300 LibriSpeech-derived recordings played through four 1115 miniature loudspeakers in a semi-anechoic chamber, NCPSZ achieved an average acoustic contrast improvement of 3.78 dB over the linear VAST baseline and 1.80 dB over a parameter-matched causal CNN baseline across the 200–2000 Hz frequency band. ModelNet achieved an average modeling mean squared error of 1.6×10^-9 on the test set, verifying precise nonlinear system identification. Ablations and SPL comparisons confirm that NCPSZ successfully reduces dark zone energy while maintaining bright zone target reproduction fidelity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio engineers designing personal audio devices, such as smartphones, looking to prevent sound leakage and protect user privacy in public spaces.

## Related

- (link related pages by id as the wiki grows)
