---
id: getman26b_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-566
pdf: https://www.isca-archive.org/interspeech_2026/getman26b_interspeech.pdf
---

# Do Learned Layer Weights Reflect Pretrained Information Structure in Self-Supervised Speech Models?

[PDF](https://www.isca-archive.org/interspeech_2026/getman26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/getman26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-566)

**TL;DR** — Learned layer weights in self-supervised speech models systematically reflect the pretrained model's internal information structure, contrary to prior conclusions that they are uninformative.

## Problem

Prior studies analyzing learned layer weights in downstream speech tasks found weak correlations with single-layer performance and concluded that these weights are unreliable for interpreting internal model behavior. However, those studies evaluated weights by their ability to predict single-layer task scores rather than examining whether the full weight distribution mirrors layerwise information content. This work investigates whether learned layer weights truly capture the underlying acoustic and linguistic information structure of pretrained models.

## Method

The study evaluates 13 self-supervised speech models across three objective families—contrastive (wav2vec 2.0 variants), clustering-based (HuBERT), and clustering plus denoising (WavLM)—spanning Base, Large, and XLarge sizes (12 to 48 layers). Layerwise information content is measured using adjusted mutual information (AMI) between clustered representations and phone or word labels, derived via forced alignments on LibriSpeech. These AMI profiles are compared against official ML-SUPERB ASR learned layer weights optimized via CTC loss under two limited supervision regimes: 10 minutes and 1 hour of labeled training data from datasets like MLS, NCHLT, and VoxPopuli. Spearman's rank correlation coefficient is used to quantify alignment between layer weights and layerwise AMI.

## Results

Out of 52 evaluated model-condition combinations, 49 show statistically significant positive rank correlations (p < 0.05). Contrastive models achieve the strongest alignments, with mean Spearman's rho values of 0.86 for phone AMI and 0.91 for word AMI under the 10-minute supervision regime (reaching individual values up to 0.98). Clustering-based and denoising models show weaker and more variable correlations, with mean phone/word AMI alignments of 0.67/0.77. Across all models, correlation strength depends systematically on supervision amount, consistently yielding higher alignment under 10 minutes of labeled data compared to 1 hour, as additional supervision concentrates weights toward later layers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech researchers and machine learning engineers analyzing or interpreting internal representations and layer combinations of self-supervised speech foundation models.

## Related

- (link related pages by id as the wiki grows)
