---
id: jeong26_interspeech
category: resources-evaluation
labels: [self-supervised]
institutions: ["Sogang University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1549
pdf: https://www.isca-archive.org/interspeech_2026/jeong26_interspeech.pdf
---

# An Empirical Analysis of Task-Induced Encoder Bias in Fréchet Audio Distance

*Wonwoo Jeong*

[PDF](https://www.isca-archive.org/interspeech_2026/jeong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jeong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1549)

**Category:** `resources-evaluation` · **Labels:** `self-supervised`

**TL;DR** — Fréchet Audio Distance (FAD) inherits severe task-induced biases from its underlying feature extractor, forcing a four-axis trade-off between Recall, Precision, Semantic Alignment, and Structural Alignment. Evaluating six encoders across speech and general audio datasets reveals that no single model functions as a universal perceptual evaluator.

## Key contributions

- Decomposes audio generation evaluation into four explicit axes: Recall, Precision, Semantic Alignment, and Structural Alignment.
- Introduces log-scale self-reference normalization (S_norm) to resolve cross-encoder dynamic range discrepancies spanning orders of magnitude.
- Maps the targeted invariance sets and blind spots of six popular audio encoders (AudioMAE, EnCodec, Wav2Vec 2.0, VGGish, CLAP, and Whisper).
- Identifies fundamental trade-offs, such as an anti-correlation (r = -0.67) between structural and semantic sensitivity, and VGGish's 'recall trap'.

## Problem

Fréchet Audio Distance (FAD) has become the standard automated metric for text-to-audio generation, yet its scores frequently diverge from human perceptual judgment. Prior work notes this encoder-dependent variability, but the exact feature sets discarded or preserved by specific training tasks remain unmapped. Because every pretrained encoder possesses a distinct approximate invariance set—such as ASR discarding pitch/timbre or codecs ignoring inter-frame ordering—FAD only measures distributional divergence projected onto that specific task subspace.

## Method

The paper evaluates six pretrained encoders across five paradigms: AudioMAE (masked reconstruction, 16kHz, 768-dim), EnCodec (neural audio compression, 24kHz, 128-dim), Wav2Vec 2.0 (contrastive SSL, 16kHz, 768-dim), VGGish (audio classification, 16kHz, 128-dim), CLAP (cross-modal contrastive, 48kHz, 512-dim), and Whisper (ASR, 16kHz, 1280-dim). Final hidden states (or continuous encoder outputs prior to RVQ for EnCodec) are aggregated using temporal mean-pooling to generate clip-level embeddings, ensuring pooling mechanisms do not confound task-induced biases. FAD is then computed via 2-Wasserstein distance between multivariate Gaussians estimated from clean reference sets and perturbed generated sets.

To compare encoders spanning multiple orders of magnitude in dynamic range (e.g., EnCodec raw FAD exceeding 148 versus CLAP barely reaching 1.0), the authors introduce a log-scale self-reference normalization, S_norm(tau) = log(1 + FAD(R, G_tau)) / log(1 + FAD_max^(e)). This compressive mapping prevents visual squashing of low-sensitivity encoders and aligns with the Weber-Fechner law by concentrating discriminative resolution in the low-distortion regime. The evaluation suite consists of targeted DSP-based perturbations mapped to the four axes: mild pitch/time shifts for Recall, noise/filtering/reverberation for Precision, extreme pitch/formant shifts for Semantic Alignment, and time reversal/chunk shuffling for Structural Alignment.

## Experimental setup

Evaluated on LibriSpeech test-clean (2,620 variable-length utterances) and ESC-50 (2,000 environmental sounds, 5 seconds each). Audio files are loudness-normalized to -23 LUFS (ITU-R BS.1770-4) and resampled to each encoder's native rate. Metrics include normalized Recall, Precision, Semantic Alignment, and Structural Alignment scores derived from log-normalized FAD trajectories across a suite of controlled perturbations.

## Results

AudioMAE achieves the highest Precision sensitivity (0.463), closely followed by EnCodec (0.450), but exhibits moderate structural detection. Whisper dominates Structural Alignment (0.495) and Recall tolerance (0.889) while suffering from severely suppressed Precision sensitivity (0.147). VGGish maximizes Semantic Alignment (0.445) but penalizes Recall (0.580), exhibiting a severe 'recall trap' where mild +-1-st pitch shifts trigger an S_norm of 0.36—nine times higher than Whisper's 0.04. Across all encoders, structural and semantic scores exhibit a strong anti-correlation (r = -0.67), proving that task-specific embeddings cannot simultaneously capture chronological flow and spectral identity.

| Encoder | Recall | Precision | Semantic Alignment | Structural Alignment |
|---|---|---|---|---|
| AudioMAE | 0.645 | **0.463** | 0.300 | 0.238 |
| EnCodec | 0.851 | 0.450 | 0.254 | 0.042 |
| Wav2Vec 2.0 | 0.767 | 0.420 | 0.294 | 0.170 |
| VGGish | 0.580 | 0.380 | **0.445** | 0.140 |
| CLAP | 0.694 | 0.309 | 0.261 | 0.238 |
| Whisper | **0.889** | 0.147 | 0.119 | **0.495** |

## Limitations

The analysis relies on DSP-based artificial perturbations, whereas real-world generative artifacts are highly entangled. The work focuses on speech and general environmental audio, omitting the music domain where harmony, rhythm, and timbre interact intricately. Furthermore, mapping analytical R/P/A axes directly to human auditory judgments requires large-scale subjective MOS studies, and the findings should be verified across a wider array of architectures per paradigm (e.g., HuBERT, AST).

## Why read this

Speech and ML engineers building or evaluating text-to-audio and speech generation systems must read this to understand why their automated FAD metrics conflict with human perception. It provides a principled diagnostic framework to audit encoder selection and exposes the intrinsic blind spots of using off-the-shelf features as evaluation proxies.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Auditing and selecting automated evaluation metrics for text-to-audio generation, speech synthesis, and audio enhancement pipelines.

## Institutions / 機構

Sogang University

## Related

- [ELSA: Acoustic Event-Level Semantic Alignment for Fine-Grained Reference-Free Text-to-Audio Evaluation](suzuki26_interspeech.md) — same problem · relatedness 2.4/3
- [The False Resonance: A Critical Examination of Emotion Embedding Similarity for Speech Generation Evaluation](tsai26_interspeech.md) — same problem · relatedness 2.2/3
- [Evaluating Objective Speech Quality Metrics for Neural Audio Codecs](lanzendoerfer26_interspeech.md) — same problem · relatedness 2.1/3
- [Investigating the Relationship between Objective AI-driven Metrics and Subjective MOS for In-the-Wild Speech](sanjotra26_interspeech.md) — shared data / evaluation · relatedness 2.0/3
- [Investigating Human-Model Discrepancies in Speech Quality Assessment via Acoustic and Prosodic Perturbations](takagi26_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
