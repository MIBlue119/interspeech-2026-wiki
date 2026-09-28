---
id: gotz26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2512
pdf: https://www.isca-archive.org/interspeech_2026/gotz26_interspeech.pdf
---

# Improving Multichannel Speech Enhancement through Accurate Room-Acoustic Simulations

[PDF](https://www.isca-archive.org/interspeech_2026/gotz26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gotz26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2512)

**TL;DR** — Training SpatialNet on high-fidelity hybrid room-acoustic simulations reduces median word error rate by up to 38% relative to lower-fidelity geometrical acoustics augmentation when evaluated on measured multichannel data.

## Problem

Deep learning models for multichannel speech enhancement often rely on simplistic synthetic room impulse responses (RIRs) derived from shoebox geometries and the image-source method (ISM) using frequency-independent absorption. Such simplified approximations fail to capture real-world acoustic complexities like room modes, diffraction, and frequency-dependent boundary conditions. This study investigates whether increasing simulation fidelity in training data augmentation directly improves downstream multichannel speech enhancement performance on real measurements.

## Method

The authors train the SpatialNet-small architecture (a Conformer-inspired model using narrow-band and cross-band attention blocks at a 16 kHz sampling rate) on 4801 scenes featuring up to three overlapping speakers. They compare three data augmentation setups: an uninformed image-source dataset (ISM-U) with randomly sampled room dimensions and reverberation times; an informed image-source dataset (ISM-M) matching room dimensions and T20 values to realistic targets; and a high-fidelity hybrid dataset (Hybrid) generated using the Treble SDK. The hybrid approach combines a wave-based solver at low/mid frequencies with a geometrical acoustics ray-radiosity solver above 1-2 kHz, incorporating complex surface impedances across 324 furnished room geometries (living rooms, classrooms, restaurants) and full-wave free-field device-related transfer functions (DRTFs) for a six-channel subset of the Eigenmike array.

## Results

Models are evaluated on LibriCSS-EM6, a newly introduced 60-session dataset comprising ~5000 measured Eigenmike RIR utterances across six speaker overlap conditions (0S, 0L, OV10, OV30, OV40) corrupted by diffuse noise at 0-20 dB SNR, using a Kaldi/BLSTM ASR pipeline. The model trained on high-fidelity hybrid simulations achieves statistically significant overall relative median WER reductions of 30.0% compared to ISM-U and 16.3% compared to ISM-M. On the highest overlap condition (OV40), the hybrid dataset achieves an absolute median WER improvement of 8.18% (38.3% relative reduction) over ISM-U and 4.00% (23.5% relative reduction) over ISM-M.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building robust far-field multichannel automatic speech recognition systems for smart speakers and devices operating in acoustically complex environments.

## Limitations

The study focuses specifically on a rigid spherical microphone array (Eigenmike subset) and the SpatialNet architecture.

## Related

- (link related pages by id as the wiki grows)
