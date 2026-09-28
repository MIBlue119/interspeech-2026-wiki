---
id: geng26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-711
pdf: https://www.isca-archive.org/interspeech_2026/geng26_interspeech.pdf
---

# Beyond Acoustic Sparsity and Linguistic Bias: A Prompt-Free Paradigm for Mispronunciation Detection and Diagnosis

[PDF](https://www.isca-archive.org/interspeech_2026/geng26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/geng26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-711)

**TL;DR** — The paper introduces CROTTC-IF, a prompt-free framework for mispronunciation detection and diagnosis that uses optimal temporal transport classification and indirect knowledge transfer to achieve 71.77% F1 on L2-ARCTIC.

## Problem

Current ASR-derived mispronunciation detection and diagnosis systems suffer from two main flaws: the acoustic trap, where sequence-level CTC optimization smooths over transient pronunciation errors, and the linguistic trap, where explicit canonical text prompts bias models to over-correct toward intended targets. These limitations reduce diagnostic sensitivity and overlook fine-grained acoustic deviations. Overcoming them is essential for building objective computer-aided pronunciation training and religious recitation assessment systems.

## Method

The framework features CROTTC, an acoustic model that uses 1D optimal transport consistency-regularized classification to enforce strict monotonic, frame-level alignments without blank-token dominance. It pairs this with Consistency Regularization (CR) via stochastic spectrogram perturbations to stabilize frame-level posterior distributions. To incorporate linguistic context without explicit inference-time prompts, it uses an Indirect Fusion (IF) strategy rooted in Learning Using Privileged Information, treating canonical text and error patterns as privileged training data. The model operates entirely without explicit canonical prompts or auxiliary data during inference.

## Results

Evaluated on general L2 English benchmarks and specialized datasets, the CROTTC-IF system achieves a 71.77% F1-score on L2-ARCTIC and a 71.70% F1-score on the Iqra’Eval2 leaderboard. The paper demonstrates strong generalization across L2-ARCTIC, ERJ, speechocean762, and Iqra’Eval2 corpora. Empirical analyses highlight that avoiding explicit canonical priors prevents the over-correction tendency typical of LLM- and text-prompted baselines.

## Code

- https://github.com/Secondtonumb/IF-MDD

## Applications

Speech engineers and educators building computer-aided pronunciation training (CAPT) tools, L2 English learning applications, and religious recitation scoring systems like Qur'anic evaluation platforms.

## Related

- (link related pages by id as the wiki grows)
