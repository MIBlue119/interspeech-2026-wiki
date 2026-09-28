---
id: ulgen26b_interspeech
category: voice-conversion
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1331
pdf: https://www.isca-archive.org/interspeech_2026/ulgen26b_interspeech.pdf
---

# DiffAnon: Diffusion-based Prosody Control for Voice Anonymization

[PDF](https://www.isca-archive.org/interspeech_2026/ulgen26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ulgen26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1331)

**TL;DR** — DiffAnon introduces a diffusion-based voice anonymization framework with classifier-free guidance that enables continuous inference-time control over prosody preservation while maintaining competitive privacy and utility.

## Problem

Voice anonymization faces a fundamental tension where stripping speaker identity often destroys prosody and expressiveness, whereas retaining prosody risks identity leakage via characteristic acoustic patterns. Existing systems typically operate at fixed design points by either discarding prosody entirely or applying heuristic perturbations, lacking a principled mechanism to adjust the utility-privacy trade-off dynamically. This limitation hinders flexible deployment in scenarios requiring fine-grained control over emotional and paralinguistic fidelity.

## Method

The framework models anonymization as an iterative denoising process built on a denoising diffusion probabilistic model, refining acoustic details on top of semantic representations derived from a residual vector quantization speech codec. First-level codec embeddings from SpeechTokenizer act as a speaker-agnostic semantic prior, while frame-level latent features from a masked prosody model and utterance-level speaker embeddings from FreeVC provide auxiliary conditioning. Classifier-free guidance is leveraged during inference to regulate the contribution of source prosody and pseudo-speaker identity without external classifiers. The architecture incorporates 40 WaveNet-style residual blocks with 1024 channels, trained on LibriTTS using DDPM objectives with condition dropout rates of 50% for full conditioning, 30% for dropped prosody, and 20% for dropped prosody and speaker.

## Results

Evaluated under the VoicePrivacy Challenge 2024 protocol, DiffAnon demonstrates systematic navigation of the utility-privacy trade-off by adjusting the prosody guidance weight from 1 down to 0. At full prosody preservation, it achieves an F0 correlation of 76.67 and an emotion recognition recall of 52.32 on libri-dev, which smoothly scales down as prosody guidance decreases. Privacy is measured via equal error rates against speaker verification attacks, confirming strong resistance across operating points while preserving linguistic content with low word error rates.

## Code

- https://github.com/rsmlgen/diffanon

## Applications

Speech engineers and privacy-conscious application developers building speech communication systems, voice assistants, or telecommunication tools that require adjustable speaker anonymization while retaining emotional expression.

## Limitations

The framework relies on pre-trained components such as a speech codec, masked prosody model, and speaker encoder, meaning its performance is bounded by the quality and domain adaptation of these upstream representations.

## Related

- (link related pages by id as the wiki grows)
