---
id: fang26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-11
pdf: https://www.isca-archive.org/interspeech_2026/fang26_interspeech.pdf
---

# Temporal Ensembling Threshold and Neighbor-Aware Label Mixup for Speaker Verification with Open-Set Noisy Labels

[PDF](https://www.isca-archive.org/interspeech_2026/fang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-11)

**TL;DR** — This paper proposes a temporal ensembling threshold and neighbor-aware label mixup (TET-LM) method for robust speaker verification under open-set noisy labels, reducing average EER by 54% and minDCF by 42% compared to standard training.

## Problem

Large-scale speech dataset collection frequently introduces noisy labels, including open-set noisy samples whose true identities fall completely outside the predefined label set. Traditional label correction methods fail on open-set noise because forcing one-hot or standard soft labels on unknown speakers introduces severe correction bias and degrades downstream speaker representation learning. This compromises the reliability of deployed speaker verification systems trained on web-scraped data.

## Method

The framework utilizes an ECAPA-TDNN encoder (1024 channels, 192-dim embeddings) trained with AM-Softmax loss, accompanied by a momentum-updated mean-teacher model. First, a two-component GMM models cosine similarity between sample embeddings and speaker prototypes per epoch, with historical thresholds temporally ensembled via an exponential moving average (EMA factor alpha=0.5) to dynamically split clean and noisy sets. Second, for noisy samples, a neighbor-aware label mixup constructs soft target distributions by re-weighting the top-K (K=10) nearest class prototypes from the mean-teacher's output using a confidence threshold (mu=0.4). Training follows a three-stage recipe: warmup, training exclusively on clean subsets, and joint training with neighbor-aware mixed labels.

## Results

Evaluated on VoxCeleb1 and VoxCeleb2 datasets under various symmetric (Sym-10% to Sym-50%) and asymmetric (Asym-20% to Asym-40%) noise corruptions against baselines including LNCL, OR-Gate, CEC, LESS, and ES-GMM. On average across conditions, TET-LM achieves relative EER and minDCF reductions of 54% and 42% over standard training, and 52% and 40% over the best competing baseline (ES-GMM). Ablations confirm that removing either the temporal ensembling threshold or the neighbor-aware mixup causes notable performance degradation, particularly in high-noise regimes.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building large-scale speaker verification or speaker recognition systems using uncurated, web-harvested audio datasets containing out-of-set speakers.

## Related

- (link related pages by id as the wiki grows)
