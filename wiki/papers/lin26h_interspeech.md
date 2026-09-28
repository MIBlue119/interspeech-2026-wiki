---
id: lin26h_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1567
pdf: https://www.isca-archive.org/interspeech_2026/lin26h_interspeech.pdf
---

# Improving Cross-Dataset Speech Intelligibility Prediction for Hearing-Impaired Listeners with Few-Shot Adaptation

[PDF](https://www.isca-archive.org/interspeech_2026/lin26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1567)

**TL;DR** — CFA-SIPNet is a cross-domain few-shot adaptation network for hearing-impaired speech intelligibility prediction that achieves an 8.5% relative RMSE reduction and a 4.2% PCC improvement over state-of-the-art baselines using under 20% of target-domain data.

## Problem

Non-intrusive speech intelligibility prediction models for hearing-impaired listeners suffer from steep performance drop-offs when transitioning to unseen datasets, listeners, or acoustic settings due to domain shift. Because gathering subjective listening evaluations from hearing-impaired individuals is costly and slow, target-domain data is severely limited. Standard training methods struggle under these data-scarce conditions because point-wise regression losses fail to explicitly emphasize discriminative feature boundaries between speech samples of varying intelligibility.

## Method

The architecture combines a dual-channel speech foundation model fusion front-end (using pretrained WavLM-Large and Whisper-Large v3 separately for left and right channels) with a Transformer-based backbone. The training framework operates in two stages: supervised pretraining on a source dataset using a combination of mean squared error and rank-based contrastive loss, followed by target-domain few-shot adaptation. During adaptation, the core foundation and transformer layers are frozen while lightweight bottleneck adapter modules, embedding layers, and scoring MLPs are fine-tuned. An embedding contrastive learning objective is added during adaptation to maximize feature similarity for closely-scored utterances and separate representations for differently-scored pairs based on ground-truth score margins.

## Results

Evaluated on the Arehart test set (1,620 samples from 3 unseen listeners) using CPC3 as the source domain, CFA-SIPNet achieves an RMSE of 26.05 and a PCC of 0.75, outperforming the top zero-shot baseline (ZipEnhancer + MP-SENet at RMSE 31.52 / PCC 0.64) and the best augmentation method (2-Clips at RMSE 28.48 / PCC 0.72). Crucially, utilizing a mere 100 samples per listener (less than 20% of the target training set) matches the performance ceiling of full target-domain dataset training. Ablation tests demonstrate that removing either the adapter modules and contrastive learning or the source pretraining step degrades the PCC down to 0.73 and 0.71, respectively.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers developing non-intrusive evaluation metrics for hearing aids, cochlear implants, or personalized speech enhancement systems deployed in diverse acoustic environments.

## Related

- (link related pages by id as the wiki grows)
