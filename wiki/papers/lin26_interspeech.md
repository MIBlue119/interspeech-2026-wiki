---
id: lin26_interspeech
category: audio-understanding
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-147
pdf: https://www.isca-archive.org/interspeech_2026/lin26_interspeech.pdf
---

# Progressive Learnable Counterfactual Attention for Music Classification

*Yi-Xing Lin, Wen-Li Wei, Jia-Ching Wang, Jen-Chun Lin*

[PDF](https://www.isca-archive.org/interspeech_2026/lin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-147)

**Category:** `audio-understanding`

**TL;DR** — Progressive Learnable Counterfactual Attention (P-LCA) extends counterfactual attention learning into a multi-stage framework using stage-wise representation projection, improving music classification accuracy by systematically uncovering and removing residual latent biases.

## Key contributions

- Proposes P-LCA, a multi-stage extension of Learnable Counterfactual Attention that refines attention via sequential representation projections across multiple latent spaces.
- Introduces stage-wise representation projection as a perspective-shifting mechanism to make residual, entangled attention biases separable across stages.
- Inaugurates fixed sinusoidal stage embeddings to provide stage-awareness to attention computations without adding stage-specific attention parameters.
- Demonstrates consistent gains across three core music tasks: artist identification, musical genre classification, and musical emotion recognition.

## Problem

Weakly supervised attention mechanisms in music classification are vulnerable to spurious correlations and background interference because they lack explicit causal guidance. While Counterfactual Attention Learning (CAL) uses random attention interventions and Learnable Counterfactual Attention (LCA) employs a learnable counterfactual branch, both operate within a single representation space. This single-space constraint leaves complex and residual bias patterns entangled with task-relevant cues, limiting further debiasing capability.

## Method

P-LCA builds upon genreMERT (and Short-chunk ResNet architectures) by organizing counterfactual refinement into $K$ sequential stages (found optimal at $K=3$). Each stage computes temporal attention weights over the current stage representation $H^{(k)}$ via a main (factual) attention branch and a counterfactual attention branch, producing predictions $y^{(k)}$ and $	ilde{y}^{(k)}$ respectively. The counterfactual branch explicitly targets plausible bias-related cues to force the main branch away from misleading regions.

Following each stage's counterfactual supervision, the main attention-conditioned feature representation is pushed through a shared stage-wise representation projection module that preserves dimensionality while reshaping the latent feature distribution. This structural projection transforms the perspective under which subsequent stages examine attention biases, making previously inseparable residual biases tractable. Additionally, fixed sinusoidal positional stage embeddings are injected into the attention computation to guarantee stage-awareness while sharing attention parameters. The final objective sums the composite LCA losses (cross-entropy classification, effect loss, counterfactual entropy, attention discrepancy, and main entropy) across all $K$ stages, optimized jointly.

## Experimental setup

Evaluated on three datasets: Artist20 for Singer Identification (SID), GTZAN for Musical Genre Classification (MGC), and EMOPIA for Musical Emotion Recognition (MER). Models are compared against baseline MERT, genreMERT, genreMERT with CAL, capacity-matched LCA with enlarged FC layers, and capacity-ablated P-LCA without representation projection. Trained using the Adam optimizer with a learning rate of $1 \times 10^{-4}$, dropout, up to 300 epochs for Artist20 and GTZAN, and up to 100 epochs for EMOPIA.

## Results

On the Artist20 SID task, genreMERT (with P-LCA at $K=3$) achieves an average frame-level F1 of 0.70 and song-level F1 of 0.88 (best 0.94), outperforming standard LCA (0.66 frame / 0.84 song average F1) and capacity-matched LCA (0.66 frame / 0.83 song average F1). On the GTZAN MGC task, P-LCA achieves 0.91 frame-level accuracy and 0.94 song-level accuracy, surpassing LCA's 0.89 and 0.92 respectively. On the EMOPIA MER task using Short-chunk ResNet, P-LCA reaches 0.78 4Q accuracy, 0.92 arousal accuracy, and 0.84 valence accuracy, beating LCA (0.76, 0.92, 0.82). Ablations confirm that removing the stage-wise representation projection drops SID performance back to baseline levels (0.64 frame / 0.82 song), verifying that gains stem from the projection mechanism rather than mere parameter scaling.

| System | SID Frame F1 (Avg) | SID Song F1 (Avg) | MGC Song Acc | MER 4Q Acc |
|---|---|---|---|---|
| Baseline (MERT / ResNet) | 0.64 | 0.81 | 0.88 | 0.68 |
| with CAL | 0.64 | 0.83 | 0.88 | - |
| with LCA | 0.66 | 0.84 | 0.92 | 0.76 |
| with P-LCA (Ours) | 0.70 | 0.88 | 0.94 | 0.78 |

## Limitations

The evaluation is restricted to music classification tasks (artist, genre, emotion) and validated primarily on small-to-medium benchmark datasets (Artist20, GTZAN, EMOPIA). The multi-stage sequential projection increases architectural complexity and depth, and performance peaks at $K=3$ with degradation or stagnation observed beyond $K=4$, indicating sensitivity to stage hyperparameters.

## Why read this

Speech and ML researchers working on attention debiasing, causal representation learning, or music information retrieval will find this a compelling blueprint for turning single-step debiasing into an iterative, multi-space refinement process.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated music tagging, music recommendation systems, artist identification, and music emotion recognition tools.

## Institutions / 機構

Academia Sinica, National Central University

**Funding / 經費:** NSTC

## Related

- (link related pages by id as the wiki grows)
