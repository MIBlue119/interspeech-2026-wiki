---
id: palka26_interspeech
category: speaker-diarization
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2224
pdf: https://www.isca-archive.org/interspeech_2026/palka26_interspeech.pdf
---

# SphereVBx: Spherical Variational Bayes Clustering for Simplified EEND-VC Diarization

[PDF](https://www.isca-archive.org/interspeech_2026/palka26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/palka26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2224)

**TL;DR** — SphereVBx replaces the Gaussian PLDA backend in VBx with a von Mises-Fisher mixture based on Toroidal Probabilistic Spherical Discriminant Analysis, matching hyperspherical speaker embeddings and simplifying end-to-end neural speaker diarization.

## Problem

Modern speaker embeddings are length-normalized and trained with angular-margin objectives to lie on unit hyperspheres, making standard Gaussian PLDA sub-optimal since cosine similarity often outperforms it. Furthermore, state-of-the-art end-to-end neural diarization with vector clustering (EEND-VC) relies on heuristic engineering steps such as filtering short unreliable segments and running post-hoc cosine reassignment. This work introduces a principled probabilistic framework that honors hyperspherical geometry natively while streamlining the pipeline.

## Method

SphereVBx substitutes the PLDA within- and between-speaker distributions with Toroidal Probabilistic Spherical Discriminant Analysis (T-PSDA), performing variational Bayesian inference in a mixture of von Mises-Fisher (vMF) distributions. A parameter-free variant (SphereVBx-PF) matches cosine-scoring behavior without requiring pretrained backend weights. To handle short segments without discarding them, duration-based reliability weights are multiplied into the variational responsibilities. A Multi-Stream extension (MS-SphereVBx) directly incorporates intra-window cannot-link constraints into the probabilistic tensor updates.

## Results

Evaluated across eight speaker diarization benchmarks including AMI, AISHELL-4, AliMeeting, NOTSOFAR-1, MSDWild, DIHARD3, RAMC, and VoxConverse. SphereVBx improves clustering accuracy in cascaded pipelines and achieves performance comparable to or better than heavy EEND-VC baselines while removing heuristic preprocessing blocks. Duration-based reliability weighting successfully retains short-segment information, and MS-SphereVBx effectively enforces the cannot-link constraint within local windows.

## Code

- https://github.com/BUTSpeechFIT/DiariZen

## Applications

Speech engineers and researchers building speaker diarization pipelines, multi-speaker transcription systems, and audio indexing engines.

## Limitations

Reliability weights are presently derived heuristically from segment duration rather than learned adaptively.

## Related

- (link related pages by id as the wiki grows)
