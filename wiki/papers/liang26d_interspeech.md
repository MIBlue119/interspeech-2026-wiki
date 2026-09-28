---
id: liang26d_interspeech
category: speech-coding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3355
pdf: https://www.isca-archive.org/interspeech_2026/liang26d_interspeech.pdf
---

# ContextCodec: Content-Focused Context Guidance for Ultra-Low Bitrate Speech Coding

[PDF](https://www.isca-archive.org/interspeech_2026/liang26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liang26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3355)

**TL;DR** — ContextCodec is an ultra-low bitrate neural speech codec that transmits content-focused context features guided by a CLIP-style phoneme alignment loss, achieving high intelligibility and perceptual quality down to 500 bps.

## Problem

At ultra-low bitrates below 1000 bps, neural speech codecs face a zero-sum bit-allocation trade-off between acoustic detail and linguistic content, where prioritizing acoustic fidelity degrades speech intelligibility. Existing hybrid codecs often incorporate self-supervised semantic priors, but these features lack explicit linguistic constraints and suffer from attenuation across decoder stages, leading to severe information loss. This hurts communication reliability in bandwidth-constrained environments such as satellite links.

## Method

ContextCodec uses a GAN-based quantized autoencoder framework built upon Finite Scalar Quantization (FSQ) and a dual-branch encoder that separates acoustic details from content-focused context. The context branch uses a CLIP-style frame-level contrastive loss against Montreal Forced Aligned phoneme indices to align representations and minimize paralinguistic leakage. A lightweight autoregressive (AR) latent refinement module processes interleaved phases to predict per-phase mean and scale prior to quantization. A context-guided attention decoder applies acoustic pre-conditioning via global and local modulation pathways, alongside stage-wise context injection via linear interpolation and sigmoid gating. Models use 4 phases, 512 channels, and are trained on LibriTTS and AISHELL-3 at 16 kHz using AdamW and a combination of multi-scale mel, adversarial, feature-matching, and contrastive losses.

## Results

Evaluated on VCTK and 10 languages from Common Voice 21.0, ContextCodec achieves competitive PESQ, STOI, and Whisper-Turbo WER scores compared to baselines like Mimi, SpeechTokenizer, and SemantiCodec at 500 bps. In subjective pairwise preference tests, ContextCodec outperforms Opus 6K and SemantiCodec in listener preference. Ablations demonstrate that the Phoneme-CLIP supervision yields lower word error rates (5.56%) compared to SSL distillation (7.91%) or unguided variants, and linear probe tests confirm higher phone classification accuracy (88.7%) with reduced speaker and dialect leakage.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building telecommunication systems, speech communication tools, or audio tokenizers for bandwidth-constrained environments such as satellite links and mobile networks.

## Limitations

Phonological inventories differ across languages, meaning rare or unseen phonemes can be underrepresented in multilingual training scenarios.

## Related

- (link related pages by id as the wiki grows)
