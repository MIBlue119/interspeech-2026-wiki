---
id: goes26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2277
pdf: https://www.isca-archive.org/interspeech_2026/goes26_interspeech.pdf
---

# PhonemeCVAE: Contrastive Latent Clustering with Class-Conditioned Priors for Controllable Phoneme Interpolation

[PDF](https://www.isca-archive.org/interspeech_2026/goes26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/goes26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2277)

**TL;DR** — PhonemeCVAE introduces a phoneme-conditioned variational autoencoder with class-conditioned Gaussian priors and supervised contrastive learning to enable smooth, controllable phoneme interpolation and editing in text-to-speech without sacrificing audio quality.

## Problem

Traditional neural speech synthesis and TTS models generate natural audio, but their internal representations lack interpretability and explicit control at the phoneme level. Fine-grained phonetic transformations—such as transitioning between minimal pairs like /s/ and /f/—typically require full re-synthesis, hindering applications in mispronunciation detection, dialect compensation, and speech therapy. Existing representation learning approaches like self-supervised models or discrete phonetic posteriorgrams fail to provide a continuous, explicitly regularized latent space that supports smooth interpolation.

## Method

The model utilizes a β-VAE architecture with an encoder that compresses Mel-spectrograms into phonetic tokens via Gaussian duration-aware pooling and Conformer blocks. Instead of a standard normal prior, it defines learnable class-conditional Gaussian priors for each of the 71 English phoneme classes derived from Montreal Forced Aligner annotations. A supervised contrastive loss pulls intra-class tokens toward their class centroids while maximizing inter-class separation. Training combines reconstruction loss, multi-resolution STFT magnitude loss, KL divergence against the class priors, contrastive loss, and adversarial/feature-matching losses with a HiFi-GAN vocoder.

## Results

Evaluated on LibriSpeech (train-clean-100), LJSpeech, and CMU Arctic (BDL and SLT), PhonemeCVAE achieves positive silhouette scores (e.g., 0.720 to 0.789 for model variant i) compared to negative or lower baseline scores, demonstrating tighter intra-class clustering and inter-class separation. Listening tests on minimal-pair word replacements (e.g., planks vs. flanks) across interpolation step sizes (α from 0.0 to 1.0) confirm that human listeners reliably perceive the gradual phonological morphing. Edited audio achieved mean MOS-like ratings of 3.14 for naturalness (SD=1.22) and 3.22 for audio quality (SD=1.16), compared to 3.45 and 3.55 for original audio.

## Code

- https://github.com/ankilab/PhonemeCVAE.git

## Applications

Speech engineers, researchers, and developers building TTS or speech-to-speech systems for computer-assisted pronunciation training, speech therapy, and fine-grained audio data augmentation.

## Limitations

Phoneme supervision relies entirely on forced alignment, which assumes rigid discrete boundaries and ignores natural coarticulation effects; experiments were restricted to English datasets.

## Related

- (link related pages by id as the wiki grows)
