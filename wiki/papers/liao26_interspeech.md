---
id: liao26_interspeech
category: speaker-diarization
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-155
pdf: https://www.isca-archive.org/interspeech_2026/liao26_interspeech.pdf
---

# Role-Aware Semi-Supervised Domain Adaptation for Teacher-Student Speaker Diarization

[PDF](https://www.isca-archive.org/interspeech_2026/liao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-155)

**TL;DR** — This paper presents a mean teacher-based semi-supervised domain adaptation framework using a novel teacher-student dataset to perform role-aware speaker diarization in classrooms, achieving a Diarization Error Rate of 16.95%.

## Problem

Generic speaker diarization models experience severe performance degradation in educational environments due to high reverberation, complex classroom noise, and severe in-domain data scarcity. Furthermore, classroom settings require a "many-to-one" mapping that separates a single teacher from a collective group of students rather than distinguishing individual identities, which standard identity-based models fail to decouple. High annotation costs and privacy concerns make acquiring massive supervised in-domain datasets impractical, necessitating effective semi-supervised domain adaptation.

## Method

The framework utilizes a Mean Teacher architecture initialized from a pre-trained DSE-CBM model comprising 7 ConBiMamba layers. It introduces the Role-Aware Union Loss, which treats the collective student label as a logical union of multiple latent channels (via a max operator over C-1 streams) and uses Permutation Invariant Training to induce channel specialization without requiring fine-grained student identities. Additionally, a Permutation-Invariant Training Mean Squared Error (PIT-MSE) consistency loss aligns student and teacher models by resolving output permutation ambiguity. Training leverages 3,536 hours of simulated data and 8 public real-world datasets for pre-training, followed by adaptation on the newly introduced TSSD dataset using asymmetric data augmentations.

## Results

Evaluated on the TSSD test set consisting of 45 annotated sessions (26.57 hours), the proposed method achieves a Diarization Error Rate (DER) of 16.95%, substantially outperforming off-the-shelf PyAnnote (34.88%), PyAnnote combined with VBx (26.45%), and fully supervised fine-tuned baselines (21.42%). Incorporating the Mean Teacher framework alone reduces DER to 19.77%, while adding the Role-Aware Union Loss drops speaker confusion to 2.70%, and introducing PIT-MSE further refines the DER to 17.80%. The complete integration of both losses achieves the headline 16.95% DER.

## Code

- https://github.com/lz-hust/TSSD

## Applications

Speech and ML engineers building automated classroom analysis systems, lecture transcription pipelines, or educational audio monitoring tools.

## Related

- (link related pages by id as the wiki grows)
