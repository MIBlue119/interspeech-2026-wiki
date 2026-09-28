---
id: wang26ca_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2069
pdf: https://www.isca-archive.org/interspeech_2026/wang26ca_interspeech.pdf
---

# FreqGuard: Leveraging Frequency-Domain Feature Priors for Universal Proactive Voice Defense

[PDF](https://www.isca-archive.org/interspeech_2026/wang26ca_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26ca_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2069)

**TL;DR** — FreqGuard introduces a frequency-domain proactive defense framework that adds imperceptible perturbations to audio, lowering attack success rates against modern black-box TTS systems to a maximum of 27.50% while preserving high speech quality.

## Problem

Existing proactive voice defenses primarily rely on random noise initialization and embedding-space displacement, failing to disrupt underlying spectral statistical structures. Consequently, these methods are vulnerable to filtering, compression, and diffusion-based purification, while also suffering from poor cross-model generalization. This leaves user voice data unprotected against unauthorized deepfake cloning and modern text-to-speech synthesis.

## Method

FreqGuard combines a prior-driven defense network (PriorNet) and a gradient-guided perturbation module (GradPert) trained with a multi-objective loss function. PriorNet uses encoder, dense, attention, and decoder blocks to reconstruct magnitude and phase spectrograms guided by a specially curated 24,000-sample guidance dataset representing balanced, disruptive, and reference audio operations. GradPert optimizes magnitude perturbations using a retrained ERes2NetV2 speaker verification model that takes magnitude spectrograms directly. Training jointly minimizes time-domain reconstruction, magnitude, phase, log-power spectrum, structural similarity, and speaker embedding cosine losses.

## Results

Evaluated on 4,200 utterances from LJSpeech, VCTK, and AIShell3 across four black-box TTS models (YourTTS, StyleTTS2, XTTS-v2, and CosyVoice), FreqGuard achieves robust protection with a maximum attack success rate of 27.50% on large-scale models like XTTS-v2. It maintains strong speech quality, scoring up to 2.467 in PESQ and 0.883 in STOI on VCTK. Compared to baselines like E2E and Enkidu, which heavily degrade audio quality (PESQ below 1.56), FreqGuard offers superior speech fidelity alongside consistent cross-model defense generalization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and security practitioners deploy this framework on personal audio devices or cloud platforms to preemptively protect user voice recordings from unauthorized cloning and synthesis by malicious deepfake systems.

## Related

- (link related pages by id as the wiki grows)
