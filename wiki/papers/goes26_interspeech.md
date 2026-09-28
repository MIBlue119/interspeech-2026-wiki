---
id: goes26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2277
pdf: https://www.isca-archive.org/interspeech_2026/goes26_interspeech.pdf
---

# PhonemeCVAE: Contrastive Latent Clustering with Class-Conditioned Priors for Controllable Phoneme Interpolation

*Nina Goes, Lars Meyer, Katrin Neumann, Paula Andrea Pérez-Toro, Andreas M. Kist*

[PDF](https://www.isca-archive.org/interspeech_2026/goes26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/goes26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2277)

**TL;DR** — PhonemeCVAE is a phoneme-conditioned variational autoencoder that combines class-conditional Gaussian priors and supervised contrastive learning to structure a continuous latent space for controllable phoneme interpolation. It achieves clear phonological transitions on minimal pairs while maintaining competitive perceptual naturalness ratings (3.14 vs 3.45 for originals).

## Key contributions

- Introduces PhonemeCVAE, a beta-VAE incorporating class-conditioned Gaussian priors to model individual phonemes as structured latent distributions.
- Combines class-conditioned priors with supervised contrastive learning to drive compact intra-class clustering and sharp inter-class separation.
- Enables smooth, controllable phoneme editing and interpolation via latent trajectory traversal between class prior centroids without sacrificing output speech quality.
- Demonstrates cross-dataset generalization across unseen English corpora (LJSpeech, CMU ARTIC BDL/SLT, LibriSpeech).

## Problem

Modern neural TTS systems produce natural audio, but their internal representations remain opaque and hard to interpret or modify at a granular level. Prior approaches like self-supervised representations (wav2vec) or discrete phonetic posteriorgrams (PPGs) lack a continuous, explicitly regularized latent space, restricting smooth phonetic transformations or precise interpolation between speech sounds such as minimal pairs. This limitation impedes applications in mispronunciation detection, dialect compensation, and speech therapy where fine-grained, interpretable phoneme manipulation is required.

## Method

The architecture features an encoder that converts Mel-spectrograms (80 channels, 64ms window, 16ms hop) into phoneme tokens via Gaussian duration-aware pooling, followed by a conformer block. Instead of a standard multivariate Gaussian prior, the model defines a learnable Gaussian prior with mean mu_c and variance sigma_c^2 for each of the 71 phoneme classes derived via the Montreal Forced Aligner. The decoder upsamples tokens, passes them through a conformer block, and refines them via a PostNet comprising five 1D convolutional layers with GroupNorm, tanh activation, and Dropout.

The training objective combines a mean squared error (MSE) reconstruction loss, a multi-resolution STFT magnitude loss, a Kullback-Leibler (KL) divergence term measuring distance to the class-conditioned priors, a supervised contrastive loss (Prototypical/proxy-based, temperature tau=0.1) using class centroids to maximize inter-cluster separation, an adversarial discriminator loss with feature matching, and a duration prediction loss (L_dur). Total loss weights are set to alpha=100, lambda_KL=0.1, lambda_CL=0.1, lambda_adv=5.0, lambda_fm=2.0, and lambda_dur=1.0.

At inference time, latent representations for minimal pairs (e.g., /p/ vs /b/) are linearly interpolated between class prior centroids using an interpolation coefficient alpha in [0, 1]. The modified latent phoneme token replaces the original in the token sequence before the decoder, denormalization, and conversion to audio via a HiFi-GAN vocoder.

## Experimental setup

Models are trained on the 100-hour TRAIN-CLEAN-100 subset of LibriSpeech. Evaluation is performed on unseen corpora: LibriSpeech TEST-CLEAN, LJSpeech, and CMU ARTIC subsets BDL (male) and SLT (female). Models are trained using an NVIDIA A40 GPU with a batch size of 64, Adam optimizer (learning rate 2.5e-4), and mixed precision. Evaluation metrics include cosine-intra-mean similarity, cosine-inter-mean similarity, cosine Silhouette scores, and human subjective ratings (5-point Likert scale for naturalness and audio quality evaluated by N=18 participants across 10 minimal pairs).

## Results

The full PhonemeCVAE (Prior + Contrastive Loss) achieves superior latent space clustering metrics compared to ablations. On the CMU SLT dataset, the full model achieves a cosine-intra-mean of 0.453, cosine-inter-mean of 0.070, and a silhouette-cosine score of 0.027, vastly outperforming models lacking contrastive loss (which drop to negative silhouette scores of -0.027 on LJSpeech). In listening tests, the morphing step strongly predicts phoneme identification (beta=0.844, p < 0.001), confirming that linear interpolation along the latent space yields a perceptually smooth phonetic continuum. Edited words achieve competitive mean ratings of 3.14 (SD=1.22) for naturalness and 3.22 (SD=1.16) for quality, compared to 3.45 and 3.55 for original references.

| System Condition | LJSpeech Silhouette | LibriSpeech Silhouette | CMU-BDL Silhouette | CMU-SLT Silhouette |
|---|---|---|---|---|
| Prior + Contrastive Loss (Full) | 0.720* | 0.737* | 0.782* | 0.789* |
| w/o Contrastive Loss | 0.203* | 0.183* | 0.307* | 0.316* |
| w/o Prior | -0.027 | 0.009 | 0.038 | 0.027 |

## Limitations

Phoneme supervision relies entirely on forced alignments, which assume rigid discrete boundaries and ignore natural coarticulation phenomena. The empirical evaluation focuses primarily on structural latent space geometry and English datasets, leaving low-resource language settings, multilingual scalability, and broader acoustic variations unexplored.

## Why read this

Speech and ML researchers focusing on controllable generative audio will appreciate this paper as a blueprint for marrying VAE priors with supervised contrastive learning to achieve interpretable, continuous latent spaces.

## Code

- https://github.com/ankilab/PhonemeCVAE.git

## Applications

Fine-grained speech editing, mispronunciation detection, computer-aided language learning (CALL), dialect compensation, and therapeutic speech generation.

## Related

- (link related pages by id as the wiki grows)
