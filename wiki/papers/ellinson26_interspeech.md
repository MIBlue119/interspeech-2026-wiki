---
id: ellinson26_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-807
pdf: https://www.isca-archive.org/interspeech_2026/ellinson26_interspeech.pdf
---

# HRTF-guided Binaural Target Speaker Extraction with Real-World Validation

[PDF](https://www.isca-archive.org/interspeech_2026/ellinson26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ellinson26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-807)

**TL;DR** — This paper proposes a binaural target speaker extraction framework conditioned on listener-independent head-related transfer functions (HRTFs), effectively preserving spatial cues and speech quality across diverse subjects.

## Problem

Conventional target speaker extraction and blind source separation methods often distort perceived spatial locations or struggle when interfering speakers share similar spectral characteristics. Relying solely on spectral enrollment or direction of arrival ignores complex individualized acoustic filtering, leading to spatial mismatch or unnatural listening experiences for wearable audio devices. Providing a robust spatial conditioning mechanism that generalizes across different listeners without subject-specific tuning is crucial for maintaining perceptual coherence and speech intelligibility in complex acoustic environments.

## Method

The framework adapts a multi-channel narrow-band deep speech separation (NBSS) backbone, processing complex-valued STFT binaural mixtures and direct-path HRTF spatial cues via separate convolutional encoders. Encoded HRTF representations are replicated along the time axis and used to modulate mixture features through element-wise latent-space multiplication. P = 8 stacked NBC2-small self-attention blocks capture frequency correlations and emphasize spectral components matching the target spatial prior, before a linear decoder outputs complex spectral estimates. Training is performed on simulated reverberant mixtures generated using measured HRTFs from 789 distinct subjects across seven public datasets, utilizing WSJ0 speech corpora with T60 ranging from 0.2 to 0.8 seconds and SIR between -5 and 5 dB. The loss function combines Scale-Invariant Signal-to-Distortion Ratio (SI-SDR) and STFT-domain Mean Absolute Error (MAE), transitioning to pure SI-SDR fine-tuning in the final epochs.

## Results

The evaluation utilizes 16k training, 4k validation, and 2k testing utterances built from 7 unseen subjects, alongside real-world recordings captured with a head and torso simulator (HATS) in a reverberant room with T60 = 0.37 s. The proposed HRTF-guided model is compared against a strong baseline using boolean directivity embeddings (DOA-BDE). The text demonstrates that conditioning on measured HRTFs successfully preserves binaural cues like interaural level and time differences while outperforming or matching baseline extraction capabilities across simulated and real-world acoustic conditions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building hearing aids, augmented reality glasses, or wearable hearables can use this method to selectively extract a target speaker from background noise while preserving natural spatial awareness.

## Limitations

The framework assumes far-field conditions and that the target speaker's direct-path HRTF or spatial location is known a priori.

## Related

- (link related pages by id as the wiki grows)
