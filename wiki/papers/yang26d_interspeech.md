---
id: yang26d_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-616
pdf: https://www.isca-archive.org/interspeech_2026/yang26d_interspeech.pdf
---

# K-DIALECT : Korean Dialect-Aware Face-Based Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/yang26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-616)

**TL;DR** — K-DIALECT is a multimodal face-based text-to-speech framework for low-resource regional dialects that synthesizes dialect-consistent speech without requiring reference audio, outperforming reference-based baselines in intelligibility and prosodic accuracy.

## Problem

Most neural TTS systems are trained primarily on standard languages, failing to capture the distinct prosodic patterns, intonations, and cultural markers of regional dialects, especially in low-resource settings. While face-based speech synthesis eliminates the need for scarce or noisy reference audio, modeling dialectal prosody from visual information remains largely unexplored. This limitation forces synthesized dialect speech to sound unnatural, homogenized, or burdened by artifacts transferred from reference recordings.

## Method

The framework integrates a dual-branch face encoder (combining ArcFace for speaker identity and CLIP for visual/stylistic context, producing a 1024-dimensional visual representation), a dialect-conditioned pitch predictor, a T5-based dialect translator for text adaptation, and a FiLM-based fusion module. The pitch predictor outputs relative pitch offsets in semitones modulated by target dialect IDs, supervised via MSE loss on log f0 trajectories. The entire system is trained via a multitask loss combining cross-entropy for text/mel-spectrograms, contrastive loss, MSE, distillation, orthogonality constraints, and pitch supervision. It is trained on an NVIDIA RTX A6000 Ada 49GB GPU using AdamW with a batch size of 10 for 1.2M steps.

## Results

Evaluated on the AI Hub Korean Dialect Dataset comprising six dialects across 2,749 speakers (~1,511.55 total minutes), the proposed model achieves a speaker encoder cosine similarity (SECS) of 0.70, word error rate (WER) of 0.25, and mel cepstral distortion (MCD) of 14.66, outperforming the voice-based XTTS-v2 baseline (SECS 0.79, WER 0.29, MCD 18.93) in intelligibility and spectral fidelity. Subjective evaluations by 30 native listeners show that the full model achieves an average Mean Opinion Score (MOS) of 3.96 for dialectal fluency and 3.90 for naturalness, significantly beating the XTTS-v2 baseline (2.18 fluency, 1.90 naturalness) and an ablation without the pitch predictor.

## Code

- https://dxlabskku.github.io/K-Dialect/

## Applications

Speech engineers and developers building culturally adaptive text-to-speech engines, localized virtual assistants, or archiving tools for low-resource regional dialects where clean reference speech is unavailable.

## Limitations

The current approach focuses on inter-dialect variation and does not model intra-dialect variations.

## Related

- (link related pages by id as the wiki grows)
