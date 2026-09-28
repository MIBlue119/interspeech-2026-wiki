---
id: moon26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1715
pdf: https://www.isca-archive.org/interspeech_2026/moon26_interspeech.pdf
---

# SLICE: Speech Enhancement via Layer-wise Injection of Conditioning Embeddings

[PDF](https://www.isca-archive.org/interspeech_2026/moon26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/moon26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1715)

**TL;DR** — SLICE proposes a layer-wise conditioning injection mechanism via timestep embeddings for diffusion-based speech enhancement, improving SI-SDR to 3.7 dB on compound degradations.

## Problem

Real-world speech is frequently corrupted simultaneously by additive noise, room reverberation, and nonlinear distortion, but existing diffusion-based enhancement methods struggle with these compound degradations. Prior noise-aware techniques inject external conditioning exclusively at the input layer, which can dilute the signal across deep residual blocks and perform even worse than unconditioned models.

## Method

The framework extends the SGMSE+ score-based speech enhancement backbone with a frozen WavLM-Base encoder (768-dim features) combined with a convolutional pooling network to extract a 256-dim representation. Three specialized multi-task auxiliary heads supervise this encoder via DEMAND noise classification (cross-entropy), T60 reverberation regression (MSE), and distortion intensity regression (MSE) with a loss weight lambda of 0.3. The resulting degradation features are projected into branch-specific 128-dim embeddings, concatenated, and mapped to a 512-dim vector that is added directly to the existing timestep embedding fed into every residual block of the NCSN++ network.

## Results

Evaluated on a multi-degradation test set of 2,472 files, SLICE achieves a PESQ of 2.60, ESTOI of 0.80, SI-SDR of 3.7 dB, and UTMOS of 3.71, outperforming input-level conditioning (ESTOI 0.73, SI-SDR 1.4 dB) and unconditioned models (ESTOI 0.73, SI-SDR 1.4 dB). On noise-only VoiceBank-DEMAND data, it achieves a PESQ of 2.83, ESTOI of 0.86, SI-SDR of 17.4 dB, and a top UTMOS score of 3.93. Ablations confirm that removing multi-task auxiliary losses drops ESTOI to 0.77 and causes severe performance degradation on reverberant mixtures.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building robust voice communication pipelines, telephony systems, or automatic speech recognition front-ends that must operate reliably in acoustically adverse environments.

## Limitations

The performance benefits of the degradation encoder are less pronounced on out-of-domain, in-the-wild recordings compared to controlled evaluation sets.

## Related

- (link related pages by id as the wiki grows)
