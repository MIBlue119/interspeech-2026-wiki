---
id: li26aa_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1767
pdf: https://www.isca-archive.org/interspeech_2026/li26aa_interspeech.pdf
---

# Weakly Masked Residual Reliability Learning for Unsupervised Domain Adaptation in Speech Models

[PDF](https://www.isca-archive.org/interspeech_2026/li26aa_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26aa_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1767)

**TL;DR** — The paper introduces Weakly Masked Residual Reliability Learning (WMR2L), an unsupervised domain adaptation framework that combines confidence modeling and residual dispersion to weight pseudo-labels, achieving relative WER reductions of up to 25.0% on cross-domain speech tasks.

## Problem

Unendowed end-to-end speech recognition models degrade significantly when exposed to unseen acoustic domains like noise or accents, but acquiring target-domain transcripts is expensive and privacy-constrained. While self-training and pseudo-labeling offer an alternative, standard confidence thresholds struggle under domain shift due to model overconfidence, leading to biased supervision or noisy updates. Simply filtering out uncertain predictions also removes critical training signals near complex decision boundaries.

## Method

The WMR2L framework jointly calculates maximum token confidence and residual dispersion (the variance across non-maximum class probabilities) at the utterance level, feeding them into a Gaussian kernel to weight reliable pseudo-labels while dampening overconfident tokens. A weak confidence masking strategy then applies mild loss down-weighting to high-confidence regions rather than full removal, encouraging contextual learning in complex zones. Additionally, a multi-perturbation consistency regularization scheme filters pseudo-labels by evaluating transcription variance across diverse speech perturbations including spectral masking, temporal cropping, and parametric equalization. Experiments fine-tune Whisper-medium (and Whisper-large-v3) with Adam using a learning rate of 1e-5, batch size 1, gradient accumulation of 16, and 2 epochs.

## Results

Evaluated on CHiME-4 (noisy), SLURP (human-machine interaction), and CORAAL (accented) datasets, WMR2L consistently outperforms baseline methods, yielding relative Word Error Rate (WER) reductions of 13.8% on CHiME-4, 25.0% on SLURP, and 15.7% on CORAAL. On multilingual speech translation using CoVoST2, the method improves BLEU scores (e.g., reaching 41.8 on Indonesian), closely approaching fully supervised performance. Scalability tests demonstrate consistent gains when applied to Whisper Large-v3. Ablation studies confirm that combining time-frequency masking, random resizing/cropping, and parametric equalization (m-r-eq) achieves the lowest test WER.

## Code

- https://anonymous.4open.science/status/Speech-Model-Adaptation-8D45

## Applications

Speech engineers and researchers adapting pretrained end-to-end speech recognition and speech translation models to target domains with limited unlabeled data.

## Limitations

The framework relies on multi-inferencing steps during the initial consistency scoring phase and requires hyperparameter tuning for masking ratios and smoothing coefficients.

## Related

- (link related pages by id as the wiki grows)
