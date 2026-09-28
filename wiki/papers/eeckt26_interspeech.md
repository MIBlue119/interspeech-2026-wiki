---
id: eeckt26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3169
pdf: https://www.isca-archive.org/interspeech_2026/eeckt26_interspeech.pdf
---

# Parameter-Efficient Continual Learning for Automatic Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/eeckt26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/eeckt26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3169)

**TL;DR** — The paper introduces Continual Structured SVD (CSSVD), a parameter-efficient continual learning method for speech foundation models that restricts adaptation to low-energy tail singular subspaces and applies weight averaging to reduce catastrophic forgetting.

## Problem

Adapting large speech foundation models sequentially to new downstream tasks causes severe catastrophic forgetting of previously learned capabilities without retaining past training data. Full fine-tuning is computationally prohibitive given models containing hundreds of millions of parameters, while existing parameter-efficient continual learning strategies are mostly designed for NLP or vision and rarely evaluated comprehensively for automatic speech recognition. Consequently, speech engineers lack rehearsal-free adaptation methods that balance parameter efficiency with long-term knowledge retention.

## Method

The proposed CSSVD method modifies pretrained linear weight matrices by decomposing them via Singular Value Decomposition into head subspaces (dominant singular values) and tail subspaces (lowest singular values). Adaptation is restricted strictly to an approximate rotation matrix within the low-energy tail subspace, leaving dominant components untouched to prevent interference. When transitioning to subsequent tasks, the SVD head/tail partition is recomputed so that important directions moving into the head become permanently protected. Task-specific rotations are sequentially combined via convex weight averaging using an alpha factor derived from the task index. Experiments use the OWSM v3.2 small model featuring 366.7M parameters across nine E-Branchformer encoder and nine Transformer decoder layers, adapting approximately 8.9M parameters per run with the Adam optimizer for 20 epochs.

## Results

Evaluated on two speech benchmarks featuring English, German, Spanish, Dutch (NL), and Belgian Dutch (VL), as well as Southern Dutch Dialects (DVL) from Common Voice, Corpus Gesproken Nederlands, and GCND. CSSVD is compared against Full Fine-Tuning, LoRA, LoRA+FTA, SSVD, MiLoRA, OPLoRA, BiLoRA, and EWC-LoRA, measuring Word Error Rate (WER) and Backward Transfer (BWT). CSSVD achieves an average WER of 18.33% on Experiment 1 and 24.82% on Experiment 2, significantly outperforming all baseline PECL methods and full fine-tuning. It demonstrates minimal negative backward transfer (BWT of -1.9 and -2.2), indicating robust mitigation of catastrophic forgetting compared to baselines whose BWT drops past -30 or -70.

## Code

- https://github.com/StevenVdEeckt/pecl-for-asr

## Applications

Speech and ML engineers deploying multilingual or multi-domain speech recognition systems that must incrementally learn new accents, dialects, or domains on-device without retaining historical training data.

## Limitations

Assumes task identity is unavailable at inference time and requires periodic SVD re-computations of weight matrices between tasks.

## Related

- (link related pages by id as the wiki grows)
