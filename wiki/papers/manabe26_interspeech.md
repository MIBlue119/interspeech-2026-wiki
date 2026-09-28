---
id: manabe26_interspeech
category: audio-captioning
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-845
pdf: https://www.isca-archive.org/interspeech_2026/manabe26_interspeech.pdf
---

# ProLAP: Probabilistic Language-Audio Pre-Training

[PDF](https://www.isca-archive.org/interspeech_2026/manabe26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/manabe26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-845)

**TL;DR** — ProLAP extends contrastive language-audio pre-training by representing inputs as probability distributions with a hierarchical inclusion loss, improving semantic hierarchy capture while maintaining retrieval performance.

## Problem

Standard language-audio models assume a simplistic one-to-one mapping between audio and text, ignoring the inherently many-to-many and hierarchical nature of real-world sound and language. Capturing this data hierarchy is non-trivial in audio due to complex sound source superposition, unlike in the vision-language domain. Without hierarchical modeling, models fail to process multi-granular descriptions or filter ambiguous audio-text samples effectively.

## Method

ProLAP models each audio and text input as a Gaussian random variable with a diagonal covariance parameterized by a mean vector and variance vector. It employs a Probabilistic Pairwise Contrastive Loss (PPCL) using a closed-form sampled distance metric alongside cross-modal and intra-modal inclusion losses. To handle fine-grained semantics, the authors propose a hierarchical inclusion loss that recursively applies random masking (using 75% masking probability on the first 12.5% of batches) across multiple abstraction levels ($L=1$ for audio, $L=2$ for text). The framework initializes encoders from pretrained CLAP—specifically using HTS-AT for audio (averaging only unmasked tokens to prevent representation collapse) and GPT-2 for text—and is trained for 50 epochs with the Adam optimizer.

## Results

Evaluated on AudioCaps and ClothoV2, ProLAP achieves competitive audio-text retrieval performance (e.g., 42.70 R@1 and 57.40 mAP@10 on AudioCaps when using hierarchical inclusion). On the newly introduced AudioCaps-HC diagnostic dataset for audio traversal, ProLAP with hierarchical inclusion substantially improves precision (26.83 vs 12.77 for standard CLAP InfoNCE) and top-level R@1 (11.43 vs 8.48). Inclusion tests on AudioCaps-EC demonstrate that 83.5% to 91.7% of samples satisfy the hierarchical inclusion hypothesis. Furthermore, the model yields intuitive uncertainty estimations, showing a negative correlation ($r = -0.43$) between text input context length and uncertainty.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building open-vocabulary audio understanding systems, coarse-to-fine audio retrieval search engines, and multi-granular audio captioning applications.

## Related

- (link related pages by id as the wiki grows)
