---
id: lee26k_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1477
pdf: https://www.isca-archive.org/interspeech_2026/lee26k_interspeech.pdf
---

# Spatial-Magnifier: Spatial upsampling for multichannel speech enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/lee26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1477)

**TL;DR** — Spatial-Magnifier uses a generative adversarial network with novel selection and dynamic channel allocation modules to estimate virtual microphone signals from sparse real measurements, improving downstream multichannel speech enhancement and neural beamforming performance.

## Problem

Physical constraints on consumer edge devices like AR glasses and earbuds restrict the size of microphone arrays, limiting the spatial directivity and performance of multichannel speech enhancement algorithms. Traditional virtual microphone estimation (Neural-VME) techniques often repurpose spectral enhancement models and lack a principled framework to optimally condition downstream speech extraction tasks on interpolated spatial signals.

## Method

The paper proposes Spatial-Magnifier, a GAN-based generative network inspired by deep back-projection networks (DBPN) operating on frequency-domain STFT representations. It introduces a Selection Module using pointwise convolutions and Mish gating to isolate relevant spatial features, and a Dynamic Channel Allocation (DCA) module using dynamic convolutions for efficient channel compression. It also introduces Spatial Audio Representation Learning (SARL), which conditions downstream multichannel models either via explicit signal-level augmentation (SARL-S) by concatenating estimated virtual waveforms, or via feature-level latent fusion (SARL-F) by adding predicted virtual features to the encoder output. The model is trained using a multi-task objective combining time-domain SNR losses for Neural-VME and VM-BF alongside adversarial losses, using the Adam optimizer with a learning rate of 0.001 over 100 epochs on 32 H100 GPUs.

## Results

Evaluated on simulated DNS challenge corpora using Pyroomacoustics with various array geometries including 2ch-RM/4ch-VM configurations and smart glasses form-factors (5ch-RM/2ch-VM), comparing against baselines like SpatialNet + MCWF and Conv-TasNet. On the Field-of-View speech enhancement (FoV-SE) task with 2ch real and 4ch virtual microphones, SpatialNet + MCWF with SARL-S achieved an SI-SDR of 9.49 dB and PESQ of 2.57, compared to 1.97 dB SI-SDR and 1.97 PESQ for the unprocessed 2ch baseline. Combining SpatialNet-small with Spatial-Magnifier via VM-SE outperformed a larger SpatialNet-large 2ch-RM model while requiring significantly fewer parameters (2.7M vs 6.5M) and lower compute (44.2 GMAC/s vs 110 GMAC/s). Ablations confirm that removing either the selection module or the DCA module degrades SI-SDR and PESQ performance significantly.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers developing real-time audio enhancement algorithms for space-constrained edge hardware such as augmented reality glasses, hearing aids, and earbuds.

## Limitations

Neural-VME is intrinsically linked to the training array geometry, making it difficult to generate signals at arbitrary, untrained positions.

## Related

- (link related pages by id as the wiki grows)
