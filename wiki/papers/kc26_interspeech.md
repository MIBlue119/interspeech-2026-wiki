---
id: kc26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1535
pdf: https://www.isca-archive.org/interspeech_2026/kc26_interspeech.pdf
---

# ECAPA-TDNN-based Speaker Embedding Framework for Voice Mimicry Assessment

[PDF](https://www.isca-archive.org/interspeech_2026/kc26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kc26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1535)

**TL;DR** — This paper evaluates voice mimicry quality by fusing spectral and prosodic features through attention-augmented ECAPA-TDNN embeddings, achieving a top-1 hit rate of 75% on the MIMICz dataset.

## Problem

Assessing vocal impersonation requires distinguishing subtle differences between genuine and mimicked speech that are distributed across both spectral and temporal-prosodic dimensions. Traditional speaker verification systems struggle with this because imitations are crafted to closely mimic target speakers while altering voice traits. Addressing this gap is critical for forensic audio analysis and security applications against voice impersonation attacks.

## Method

The framework extracts 32-dimensional prosodic features (loudness, pitch, speaking rate, shimmer, tempogram ratio) and spectral features (MFCCs, chroma, tonnetz, spectral roll-off, bandwidth, flux, centroid) using Librosa with a 30ms frame size and 10ms shift. These features are mapped into ECAPA-TDNN E-vectors trained from scratch on the MIMICz dataset. The resulting embeddings are processed via a 1D CNN, an attention mechanism, and a sparse autoencoder to yield attention-augmented latent representations. A sequential DNN classifier with five dense layers (512 to 64 units) outputs 20 celebrity probability classes, combining prosodic and spectral streams via a weighted score-level fusion.

## Results

Evaluated on the MIMICz dataset comprising 500 studio-quality Malayalam utterances across 20 target actors and 5 mimicry artists. Performance is measured by top-1 hit rate against human-identified Mean Opinion Score (MOS) rankings. An ablation study demonstrates that score fusion of prosodic and spectral features consistently outperforms single modalities, with fused X-vectors achieving 55%, D-vectors 65%, and the proposed ECAPA E-vectors reaching a top-1 hit rate of 75%. This surpasses baseline GMM, i-vector/DNN, and LSTM Siamese network approaches ranging from 41% to 72% on the same dataset.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Biometric security systems and forensic audio analysts evaluating the authenticity of voices or assessing the skill of professional voice impersonators.

## Limitations

The study is currently restricted to a 20-celebrity Malayalam dataset, and future work is needed to validate real-time detection and cross-lingual adaptation.

## Related

- (link related pages by id as the wiki grows)
