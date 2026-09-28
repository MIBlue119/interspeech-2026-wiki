---
id: choi26d_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2146
pdf: https://www.isca-archive.org/interspeech_2026/choi26d_interspeech.pdf
---

# ProsoCodec: Prosody-Oriented Speech Codec for Voice Conversion

[PDF](https://www.isca-archive.org/interspeech_2026/choi26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/choi26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2146)

**TL;DR** — ProsoCodec is a prosody-oriented neural speech codec that models prosody as a conditional residual via explicit text and speaker conditioning, achieving improved prosody preservation and reduced source-timbre leakage in voice conversion.

## Problem

Traditional neural speech codecs learn holistic representations that entangle linguistic content, speaker identity, and prosody to reconstruct audio efficiently. While ideal for zero-shot voice cloning, this entanglement hinders voice conversion tasks that demand strict preservation of source prosody and content alongside target timbre adaptation. Prior attempts to cleanly disentangle these attributes often discard essential speaker-conditioned prosodic nuances and limit expressiveness.

## Method

ProsoCodec builds upon a diffusion autoencoder and incorporates explicit text priors (from Qwen3-ASR) and speaker embeddings (from CAM++) as prefix tokens concatenated with the input mel-spectrogram to guide both a Transformer-based encoder and a Diffusion Transformer (DiT) decoder. A strict binary spherical quantization (BSQ) bottleneck forces the model to ignore redundant linguistic and timbre information and instead capture residual prosodic variations. To bias tokens toward prosody, the input mel-spectrogram is restricted to its low-frequency band. The model is trained using a conditional flow-matching loss combined with a dual-utterance training strategy that pairs different utterances from the same speaker to prevent prompt-style leakage during inference.

## Results

Evaluated on a merged test set of LibriTTS (test-clean, test-other) and VCTK using 1,000 sampled utterances, ProsoCodec is compared against baselines including DDDM-VC, UniAudio, HierSpeech++, FACodec, Seed-VC, and Vevo. ProsoCodec achieves a Word Error Rate (WER) of 4.451, reference speaker similarity (SIMr) of 0.565, source speaker similarity (SIMs) of 0.167 (indicating minimal timbre leakage), and f0 Root Mean Square Error (RMSE) for prosody of 0.428. Subjective evaluations demonstrate a speaker similarity MOS (S-MOS) of 4.000, prosody similarity MOS (P-MOS) of 3.309, and naturalness MOS (N-MOS) of 3.852, outperforming previous zero-shot voice conversion baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers building zero-shot voice conversion systems, expressive text-to-speech pipelines, or speech editing tools requiring precise transfer of target speaker timbre while retaining source prosody and linguistic content.

## Related

- (link related pages by id as the wiki grows)
