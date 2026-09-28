---
id: jung26c_interspeech
category: audio-captioning
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3044
pdf: https://www.isca-archive.org/interspeech_2026/jung26c_interspeech.pdf
---

# Edit the Moment, Keep the Rest: Time-Localized Audio Editing via Instruction

[PDF](https://www.isca-archive.org/interspeech_2026/jung26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jung26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3044)

**TL;DR** — The EMKR framework enables instruction-driven, time-localized editing of polyphonic audio with 100 ms precision across adding, removing, replacing, moving, and extending tasks.

## Problem

Current text-guided audio editors perform coarse-grained temporal modifications, making it difficult to alter specific event instances in complex polyphonic soundscapes without affecting overlapping classes or background contexts. This lack of precise time-localized control hinders timing-critical sound design and editing tasks in real-world mixtures.

## Method

Building on Stable Audio Open (SAO), EMKR incorporates a T5 text encoder, a VAE, and a diffusion transformer (DiT) trained on synthetic triplets generated via an on-the-fly mixing pipeline. It introduces interval-based timing conditioning by mapping four temporal scalars (reference and edit start/end times) into 768-dimensional embeddings appended to the text tokens and added to the diffusion timestep conditioning. Additionally, it applies source-event masking (SEM)—concatenating a binary mask indicating the source interval alongside noisy and clean latents—specifically for preservation-critical tasks like moving and extending.

## Results

Evaluated on 1,000 synthetic held-out mixtures derived from AudioCaps, WavCaps, ESC-50, and FSD50K, EMKR compares favorably against baselines such as AUDIT, AudioEditor, ZETA, and SAO-Instruct. EMKR achieves superior temporal precision with a 0.1s segment F1-score of 87.7 for adding, 83.0 for replacing, 64.3 for moving, and 83.7 for extending, while maintaining high background faithfulness (4.29 MOS) and overall quality (4.35 MOS). Clip-level evaluation demonstrates that EMKR reaches an FAD of 3.05, FD of 22.9, and KL divergence of 0.665.

## Code

- https://jinwoo0302.github.io/emkr-demo/

## Applications

Speech and audio engineers, post-production professionals, and content creators can use this framework for precise sound effect replacement, Foley timing adjustment, and automated soundtrack editing.

## Limitations

The framework relies heavily on synthetic training triplets and paired intervals generated via automated pipelines rather than fully unconstrained in-the-wild editing data.

## Related

- (link related pages by id as the wiki grows)
