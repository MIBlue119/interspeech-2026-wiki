---
id: manabe26_interspeech
category: audio-understanding
labels: [multilingual, self-supervised, dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-845
pdf: https://www.isca-archive.org/interspeech_2026/manabe26_interspeech.pdf
---

# ProLAP: Probabilistic Language-Audio Pre-Training

*Toranosuke Manabe, Yuchi Ishikawa, Hokuto Munakata, Yoshimitsu Aoki, Tatsuya Komatsu*

[PDF](https://www.isca-archive.org/interspeech_2026/manabe26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/manabe26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-845)

**Category:** `audio-understanding` · **Labels:** `multilingual`, `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — ProLAP introduces probabilistic language-audio pre-training using Gaussian embeddings and hierarchical inclusion losses to capture many-to-many semantic hierarchies without hurting retrieval performance. It significantly outperforms deterministic CLAP baselines on a new audio traversal diagnostic dataset.

## Key contributions

- Formulates language-audio representation learning using probabilistic distributions (Gaussian random variables with diagonal covariance) rather than deterministic points.
- Proposes a hierarchical inclusion loss via recursive masking for both audio and text encoders to explicitly encode coarse-to-fine semantic hierarchies.
- Introduces two diagnostic datasets, AudioCaps-HC (Hierarchical Captions with 4 abstraction levels) and AudioCaps-EC (Event-level Captions).
- Demonstrates robust open-vocabulary audio-text retrieval on AudioCaps and ClothoV2 alongside intuitive uncertainty estimation linked to input text length.

## Problem

Standard contrastive language-audio pre-training (CLAP) assumes a rigid one-to-one correspondence between audio clips and text captions, ignoring real-world many-to-many relationships where an audio clip can be described at multiple levels of specificity. Unlike vision-language domains, extending hierarchical modeling to audio is complicated by the complex superposition of overlapping sound sources in acoustic signals. Failing to capture this hierarchy restricts models from filtering ambiguous samples, performing coarse-to-fine retrieval, and capturing underlying data structures.

## Method

ProLAP models each audio or text input as a Gaussian random variable with a diagonal covariance matrix, parameterized by a mean vector $\mu$ and variance vector $\sigma^2$. Following ProLIP, it utilizes the probabilistic pairwise contrastive loss (PPCL), replacing cosine similarity with a corrected similarity metric derived from closed-form sampled distance to align audio and text distributions.

To capture semantic hierarchy, the framework leverages intra-modal and cross-modal inclusion losses based on asymmetric inclusion scores mapped via a logistic link. For hierarchical learning, it applies recursive masking ($M_0$ to $M_{L+1}$) where tokens are masked with binomial probability $q$ (masking probability set to 0.75), ensuring that masked inputs (representing more abstract or incomplete contexts) are correctly encompassed by unmasked inputs in the embedding space. A variational information bottleneck regularizer ($L_VIB$) prevents variance collapse.

For implementation, ProLAP initializes from pretrained CLAP weights, using HTS-AT (Swin Transformer-based) for the audio encoder and GPT-2 for the text encoder. Since HTS-AT prevents token dropping, uncertainty and mask handling are implemented by adding an uncertainty head and a learnable [MASK] token, while averaging only unmasked tokens in the final adaptive average pooling layer to avoid representation collapse.

## Experimental setup

Evaluated on AudioCaps and ClothoV2 for audio-text retrieval, plus the newly introduced diagnostic datasets AudioCaps-HC and AudioCaps-EC. Compared against deterministic CLAP baselines trained with InfoNCE and SigLIP losses. Models are fine-tuned for 50 epochs with a batch size of 256 using the Adam optimizer, a cosine learning rate scheduler with 1 warm-up epoch, and a maximum learning rate of $1 \times 10^{-5}$. Hyperparameters include loss weights $\lambda_1 = 5 \times 10^{-3}$, $\lambda_2 = 5 \times 10^{-7}$, $\gamma = 1 \times 10^{-5}$, with text hierarchical level $L=2$ and audio hierarchical level $L=1$.

## Results

On AudioCaps audio-text retrieval, ProLAP with hierarchical inclusion achieves competitive R@1 (42.70 for text-to-audio, 42.13 for audio-to-text) and mAP@10 (57.40 and 56.66), slightly outperforming or matching InfoNCE and SigLIP baselines. On the audio traversal task using AudioCaps-HC, ProLAP with $L_{inc}^h$ achieves a precision of 26.83% and R@1 of 15.67% (and 11.43% on the most abstract Level 1), vastly outperforming deterministic CLAP InfoNCE (12.77 precision, 13.46 R@1). Furthermore, the hierarchical inclusion loss successfully enforces an intuitive negative correlation between text length and uncertainty ($r_{TLU} = -0.43$).

| System | AC T->A R@1 | AC T->A mAP@10 | AC A->T R@1 | AC A->T mAP@10 |
|---|---|---|---|---|
| CLAP (InfoNCE) | 41.90 | 57.30 | 39.75 | 55.84 |
| CLAP (SigLIP) | 41.45 | 56.22 | 40.88 | 56.22 |
| ProLAP (Ours) | 42.70 | 57.37 | 41.22 | 56.36 |
| ProLAP w/ $L_{inc}^h$ (Ours) | 42.70 | 57.40 | 42.13 | 56.66 |

## Limitations

The evaluation relies heavily on synthetic hierarchical and event-level extensions derived via LLMs (GPT-oSS and Ministral 3) rather than entirely human-annotated hierarchies. The approach inherits the compute and architectural constraints of underlying heavy backbone models (HTS-AT and GPT-2) and has only been validated on English-centric audio-captioning benchmarks.

## Why read this

Speech and ML researchers working on multi-modal audio representation learning should read this paper to learn how to transition deterministic embedding spaces into probabilistic distribution spaces that cleanly capture acoustic and semantic hierarchies.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Open-vocabulary audio-text retrieval, hierarchical dataset curation, filtering ambiguous samples, and robust multi-granular audio understanding.

## Institutions / 機構

Keio University, LY Corporation

## Related

- (link related pages by id as the wiki grows)
