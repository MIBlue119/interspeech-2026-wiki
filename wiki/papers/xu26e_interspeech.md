---
id: xu26e_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-843
pdf: https://www.isca-archive.org/interspeech_2026/xu26e_interspeech.pdf
---

# SCNet: Enhancing GAN-based Speech Generation with Subband Condition Network and Magnitude-aware Phase Loss

[PDF](https://www.isca-archive.org/interspeech_2026/xu26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-843)

**TL;DR** — SCNet is a dual-branch GAN-based speech vocoder that integrates a subband condition network and a magnitude-aware phase loss to achieve high-fidelity waveform synthesis from mel-spectrograms.

## Problem

Traditional GAN-based and iSTFT-based neural vocoders typically operate as black-box models that lack explicit spectral guidance, leading to fine-grained spectral information loss and unstable training objectives. Furthermore, standard phase modeling methods suffer from phase wrapping issues and treat all time-frequency bins equally, ignoring the perceptual importance of high-energy regions. These limitations introduce audible artifacts and degrade the overall naturalness of synthesized speech.

## Method

The proposed SCNet architecture consists of a standard iSTFTNET backbone (with Snake activation functions replacing Leaky ReLU) and a lightweight subband condition network called CondNet. CondNet utilizes four ConvNeXtV2 blocks to predict magnitude and phase components within a low-frequency subband (6 kHz at a 64 hop size), which are converted via STFT and injected into the backbone layers through two coupling blocks. To handle phase estimation without wrapping artifacts, the model introduces a periodic magnitude-aware phase loss using squared sine functions weighted by raw spectral magnitudes. Training utilizes the LibriTTS train-clean-100 dataset at a 24 kHz sampling rate, combining multi-resolution mel-spectrogram reconstruction loss and the proposed phase loss.

## Results

Experimental evaluations on in-domain LibriTTS and unseen speaker test sets demonstrate that SCNet outperforms baseline GAN-based vocoders in both objective and subjective metrics. Ablation studies confirm the effectiveness of both the CondNet prior integration and the magnitude-aware anti-wrapping phase loss in improving speech fidelity. Additionally, SCNet maintains competitive inference speeds compared to conventional time-domain and frequency-domain generative models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building text-to-speech, voice conversion, or singing voice synthesis pipelines where high-fidelity, artifact-free waveform generation from mel-spectrograms is required.

## Related

- (link related pages by id as the wiki grows)
