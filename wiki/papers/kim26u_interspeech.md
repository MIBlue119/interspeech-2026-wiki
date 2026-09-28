---
id: kim26u_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3088
pdf: https://www.isca-archive.org/interspeech_2026/kim26u_interspeech.pdf
---

# ETC-TTS: Emotion Trajectory Learning for Controllable Emotional Text-to-Speech

[PDF](https://www.isca-archive.org/interspeech_2026/kim26u_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26u_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3088)

**TL;DR** — ETC-TTS models emotion intensity as continuous neutral-to-emotion trajectories in latent style space using flow matching and RVQ prototypes, achieving stable intensity control with lower monotonicity error rates than heuristic baselines.

## Problem

Existing emotional text-to-speech systems typically apply post-hoc scaling, interpolation, or diffusion at inference time to manipulate emotion embeddings. This creates a training-inference mismatch because models are trained only on discrete emotional endpoints, leading to unstable intermediate behavior, non-monotonic intensity scaling, and degraded speech naturalness.

## Method

The framework utilizes a FastSpeech2 acoustic backbone combined with a style module containing a residual vector quantization (RVQ)-based style extractor and an emotion prototype representation (with codebooks initialized via k-means centroids). A level-wise triplet loss separates emotion clusters, and periodic codebook reinitialization prevents collapse. Emotion intensity control is formulated as a conditional rectified flow-matching objective that learns continuous velocity fields between a neutral prototype source distribution (augmented with Gaussian noise) and target emotional prototypes.

## Results

Evaluated on the Korean AIHub dataset (80 hours, 7 emotions, 4 speakers) and the English ESD dataset (17,500 utterances, 5 emotions, 10 speakers) using a 34.1M-parameter model trained for 500k steps on an RTX 5090. Compared against FastSpeech2 with emotion labels, relative attribute (RA) control, and scaling factor (SF) control. On AIHub, the proposed model achieves an N-MOS of 3.71, E-MOS of 3.76, CER of 0.1454, F0 RMSE of 0.1409, UTMOS of 2.45, and EmoAcc of 92.93%. In pairwise AB tests measuring monotonicity violations, the proposed model achieves lower error rates across intensity pairs (e.g., 7.0% to 14.8% error on ESD subsets compared to over 30% for baselines) and demonstrates more stable UTMOS and CER across varying intensity levels.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building emotional text-to-speech systems for virtual assistants, dubbing, or interactive characters requiring fine-grained, continuous control over emotion intensity.

## Related

- (link related pages by id as the wiki grows)
