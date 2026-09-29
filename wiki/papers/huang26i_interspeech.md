---
id: huang26i_interspeech
category: asr
institutions: ["University of Iowa"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1471
pdf: https://www.isca-archive.org/interspeech_2026/huang26i_interspeech.pdf
---

# Align-Consistency: Improving Non-autoregressive and Semi-supervised ASR with Consistency Regularization

*Wanting Huang, Weiran Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/huang26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1471)

**Category:** `asr`

**TL;DR** — Align-Consistency extends consistency regularization (CR) to the Align-Refine non-autoregressive ASR framework, improving both supervised training and online pseudo-labeling for semi-supervised learning. It reduces test Word Error Rate (WER) on LibriSpeech-100 from 12.2 to 10.0 (fully supervised) and down to 3.8 with unlabeled data.

## Key contributions

- Proposes Align-Consistency, integrating consistency regularization across both the base Connectionist Temporal Classification (CTC) module and subsequent non-autoregressive iterative refinement steps.
- Demonstrates that non-autoregressive decoding and consistency regularization provide mutually additive accuracy improvements in fully supervised ASR.
- Shows that using Align-Refine rather than standard CTC for online pseudo-label generation substantially enhances semi-supervised self-training performance.
- Achieves competitive LM-free WERs on LibriSpeech using moderate amounts of unlabeled data (up to 6,000 hours of Libri-Light).

## Problem

End-to-end ASR models heavily depend on large amounts of transcribed speech and suffer significant performance degradation in low-resource settings. While consistency regularization (CR) has proven effective for basic CTC models by enforcing invariance to input perturbations, its extension to non-autoregressive models with iterative refinement remains unexplored. Furthermore, standard pseudo-labeling in self-training often relies on less accurate CTC hypotheses, limiting the quality of unsupervised adaptation.

## Method

The architecture builds upon the Align-Refine model, featuring a 12-layer Conformer encoder with an attention dimension of 512, 8 attention heads, and a feed-forward dimension of 2048 (totaling ~110M to 116M parameters). A temporal reduction of 2x is applied at the encoder output via average pooling. The model uses a base CTC module (step s = 0) followed by S = 2 transformer-based refinement steps that update frame-level hypotheses using full attention context and shared audio features.

The learning objective combines standard CTC loss (with weight alpha = 0.3) across refinement steps with a symmetric KL-divergence consistency regularization loss applied between two augmented views of the input (generated via SpecAugment). Specifically, consistency is enforced on both the base CTC posteriors (weighted by lambda_0 = 0.2) and the refinement step posteriors (weighted by lambda_1 = 0.2) using stop-gradient operations on one branch.

In the semi-supervised setup, clean input utterances are passed through the trained non-Refine model (using the final refinement step s = 2) to generate online pseudo-labels on the fly. The Align-Consistency loss is then computed using these pseudo-labels for the supervised terms and unlabelled consistency terms on augmented versions, trained for 110 epochs for LS-100 and 80 epochs for LS-960.

## Experimental setup

Evaluated on LibriSpeech (train-clean-100 [LS-100] and train-960 [LS-960]) and Libri-Light 6,000-hour subset (LL-6000) for unlabelled data, using Word Error Rate (WER) on standard dev and test sets. Compared against baselines including standard CTC, CR-CTC, LPM, IPL, and NST. Implemented in ESPnet with checkpoint averaging over the last 5 epochs.

## Results

On the fully supervised LibriSpeech LS-100 test set, baseline CR-CTC achieves 12.2/26.7 (clean/other), whereas Align-Consistency achieves 10.0/22.9. On the LS-960 test set, CR-CTC yields 4.3/9.9 while Align-Consistency reaches 3.3/7.4. In semi-supervised self-training starting from the LS-100 model, adding 960 hours of unlabeled data reduces test WERs to 4.3/9.6, and further adding 6,000 hours of Libri-Light brings WERs down to 3.8/9.1. Ablation studies confirm that omitting consistency regularization on unsupervised data or relying on base CTC pseudo-labels instead of refined pseudo-labels causes significant WER regressions.

| System / Condition | Test-Clean WER | Test-Other WER |
|---|---|---|
| CTC ($\alpha=1, \lambda_0=0.0$, LS-100) | 12.8 | 27.6 |
| CR-CTC (LS-100) | 12.2 | 26.7 |
| Align-Consistency (LS-100) | 10.0 | 22.9 |
| Align-Consistency + LS-960 | 4.3 | 9.6 |
| Align-Consistency + LS-960 + LL-6000 | 3.8 | 9.1 |
| Align-Consistency + LL-6000 (LS-960 Sup) | 2.5 | 5.7 |

## Limitations

The evaluation is restricted to English speech corpora (LibriSpeech and Libri-Light), leaving multilingual and low-resource non-English scalability unverified. The framework relies on fixed hyperparameter settings (alpha = 0.3, S = 2, lambda = 0.2) which may require tuning for different acoustic domains or alternative non-AR architectures. Computational overhead is increased due to the dual-augmentation forward passes required for consistency regularization.

## Why read this

Speech researchers and engineers working on non-autoregressive ASR and semi-supervised self-training should read this paper to learn how to effectively combine consistency regularization with iterative frame-level refinement for substantial gains in data efficiency and accuracy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building high-throughput, low-latency automatic speech recognition systems for voice assistants, transcription services, and low-resource speech environments using semi-supervised learning.

## Institutions / 機構

University of Iowa

## Related

- (link related pages by id as the wiki grows)
