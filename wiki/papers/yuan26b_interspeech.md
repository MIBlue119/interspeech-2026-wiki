---
id: yuan26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-232
---

# DelayGSE: A Generative Speech Enhancement Framework with Delayed Text-Aware Conditioning

**TL;DR** — DelayGSE reduces the speech-like hallucinations that plague generative speech enhancement at low SNR by conditioning a delayed multi-codebook language model on both noisy-speech features and Whisper text representations.

## Problem

Generative speech enhancement methods based on language and diffusion models achieve strong perceptual quality but are more prone than discriminative methods to hallucinating speech-like artifacts under low SNR and transient noise.

## Method

DelayGSE is a text-aware generative enhancement framework using a multi-codebook language model for denoising, dereverberation, and super-resolution, conditioning on noisy-speech STFT features and Whisper encoder representations, modeling multiple discrete codebooks in a delayed manner for stable generation, and using importance-aware codebook weighting to balance perceptual fidelity against semantic consistency.

## Results

Experiments show state-of-the-art performance with ablations confirming effective hallucination suppression and a 15.8% relative WER reduction; audio samples are available online.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust speech enhancement for downstream ASR and communication systems operating at low SNR where hallucination risk is highest.

## Related

- (link related pages by id as the wiki grows)
