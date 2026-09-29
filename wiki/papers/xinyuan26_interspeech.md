---
id: xinyuan26_interspeech
category: tts
labels: [low-resource]
institutions: ["Johns Hopkins University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-198
pdf: https://www.isca-archive.org/interspeech_2026/xinyuan26_interspeech.pdf
---

# Universal Speech Content Factorization

*Henry Li Xinyuan, Zexin Cai, Lin Zhang, Leibny Paola Garcia-Perera, Berrak Sisman, Sanjeev Khudanpur, Nicholas Andrews, Matthew Wiesner*

[PDF](https://www.isca-archive.org/interspeech_2026/xinyuan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xinyuan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-198)

**Category:** `tts` · **Labels:** `low-resource`

**TL;DR** — Universal Speech Content Factorization (USCF) extends closed-set Speech Content Factorization to open-set settings by learning a universal linear mapping via least-squares optimization, achieving competitive zero-shot voice conversion using only 10 seconds of target speaker speech.

## Key contributions

- Proposes USCF to generalize the linear structure of Speech Content Factorization to unseen speakers via least-squares optimization and linear estimation.
- Derives speaker-specific content-to-speech transformations from as little as a few seconds of target speech without requiring additional neural training.
- Evaluates USCF as a zero-shot voice conversion system, demonstrating competitive intelligibility, naturalness, and speaker similarity.
- Demonstrates that USCF features can serve as an efficient acoustic representation for training timbre-prompted text-to-speech models.

## Problem

Self-supervised speech models like WavLM have strong geometric structures where phonetic content dominates feature variance, enabling training-free voice conversion methods such as kNN-VC, LinearVC, and closed-set Speech Content Factorization (SCF). However, SCF is strictly a closed-set method that requires target speakers to be included in the original matrix factorization, making it computationally prohibitive or impossible for large, unconstrained web-crawled datasets. This restriction prevents its use in open-set voice conversion and timbre-prompted text-to-speech tasks where unseen speakers must be supported without recomputing decompositions.

## Method

USCF builds upon closed-set SCF, which applies rank-r truncated Singular Value Decomposition (SVD) on content-aligned WavLM features stacked across k speakers (X = U * Sigma * S), where C = U * Sigma is the low-rank content representation and S_j are speaker transformation matrices. To handle open-set speakers, USCF introduces three candidate universal speech-to-content mapping matrices (W_1, W_2, W_3). W_1 minimizes ||X_j * W - U||_F^2 by dropping singular values to treat all content dimensions equally. W_2 directly attempts to invert the speaker transformations, while W_3 assumes linear separability and orthogonality between content and timbre subspaces, defining W_3 as the Moore-Penrose inverse of a random reference speaker's transformation matrix.

For an unseen speaker m with a small set of target WavLM features X'_m (minimum 500 frames or 10 seconds), the speaker transformation matrix S_m is derived via least-squares estimation using the relation S_m = (C'^dagger) * X'_m, where C'_m approx X'_m * W. Voice conversion is subsequently performed by projecting source features through the inverse source transformation and the target speaker transformation. USCF uses r = 75 dimensions by default and is trained using LibriSpeech data splits.

## Experimental setup

Voice conversion experiments use 4 non-overlapping sets of 20 speakers from LibriSpeech (test-clean, test-other, dev-clean). Baselines include kNN-VC, LinearVC, closed-set SCF, and SeedVC. Evaluation metrics include Whisper large ASR WER for intelligibility, UTMOS-v2 for quality, and ECAPA-TDNN cosine similarity for speaker similarity.

## Results

USCF with W_1 achieves an ASR WER of 2.70%, UTMOS of 2.805, and speaker similarity of 0.524, compared to closed-set SCF which achieves 2.18% WER, 2.886 UTMOS, and 0.603 speaker similarity. While USCF trails slightly in speaker similarity compared to fully supervised kNN-VC (0.666) or LinearVC (0.621), subjective MOS evaluations show listeners have no statistically significant preference between USCF and baseline systems except SeedVC, which scored lowest. Ablations on target speech duration show speaker similarity degrades sharply when target speech drops below 500 frames (10 seconds), with diminishing returns past 2000 frames (40 seconds).

| Method | WER (%) ↓ | UTMOS ↑ | Spk Sim ↑ |
|---|---|---|---|
| USCF W1 | 2.70 | 2.805 | 0.524 |
| USCF W3 | 2.31 | 2.826 | 0.420 |
| kNN-VC | 3.16 | 2.855 | 0.666 |
| LinearVC | 2.69 | 2.765 | 0.621 |
| SCF | 2.18 | 2.886 | 0.603 |
| SeedVC | 6.24 | 3.173 | 0.532 |

## Limitations

Speaker similarity drops compared to closed-set methods that leverage full target speaker corpora. Performance is sensitive to the amount of adaptation data, dropping noticeably when target speech falls below 10 seconds. The approach relies heavily on the geometric properties of the underlying WavLM feature space and requires tuning of rank parameters.

## Why read this

Researchers and engineers working on zero-shot voice conversion and efficient text-to-speech representations will appreciate USCF as a lightweight, training-free alternative to heavy generative disentanglement models.

## Code

- https://github.com/HSTEHSTEHSTE/uscf

## Applications

Zero-shot voice conversion and timbre-prompted text-to-speech model training.

## Institutions / 機構

Johns Hopkins University

**Funding / 經費:** Office of the Director of National Intelligence, Intelligence Advanced Research Projects Activity, ARTS Program

## Related

- (link related pages by id as the wiki grows)
