---
id: chen26q_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1676
pdf: https://www.isca-archive.org/interspeech_2026/chen26q_interspeech.pdf
---

# Streaming Open-Vocabulary Keyword Spotting via Role Swapping in Cross-Attention

[PDF](https://www.isca-archive.org/interspeech_2026/chen26q_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26q_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1676)

**TL;DR** — This paper introduces a streaming open-vocabulary keyword spotting model using role-swapped cross-attention, achieving 6.82% EER on easy negatives and 28.21% EER on hard negatives on LibriPhrase.

## Problem

Traditional open-vocabulary keyword spotting systems either rely on CTC alignment which struggles with mismatched text-speech pairs and requires special tuning, or similarity-based methods that depend on heuristic postprocessing. Furthermore, conventional cross-attention designs assume complete utterance availability, making low-latency streaming deployment difficult. This gap matters because practical on-device voice wake-up applications require real-time processing and robust performance under complex acoustic interference.

## Method

The model features a lightweight 0.8M parameter architecture comprising a causal audio encoder (two causal convolutional layers and two GRU layers operating at 50 Hz) and a pretrained text encoder. To enable streaming without sacrificing semantic richness, the data flow of cross-attention is redesigned: streaming speech serves as the Query and registered text acts as Key/Value. Training employs a multi-task framework with an audio-text contrastive InfoNCE loss, a token-level phone match loss, and a frame-level binary classification loss. A two-stage learning scheme is utilized for the pattern discriminator, where the first stage trains on attention outputs combined with text embeddings to establish correct decision boundaries, and the second stage continues training on an affinity matrix concatenated with speech embeddings. Additionally, online hard negative samples are generated via time-frequency masking.

## Results

Evaluated on the LibriPhrase dataset using easy negative (LPE) and hard negative (LPH) subsets, the model is compared against SYNASPOT-AT and CTCAT baselines. On the LPE subset, it achieves an EER of 6.82% and an AUC of 97.95%, while on the LPH subset it records an EER of 28.21% and an AUC of 79.19%. Compared to the best baseline (SYNASPOT-AT), the model reduces LPH EER by 0.48% and improves LPH AUC by 1.84%. Ablation studies confirm that removing hard negative generation, the staged strategy, or phone matching leads to noticeable drops in both LPE and LPH performance, with original ablations without hard negatives dropping to 7.45% EER on LPE and 29.04% EER on LPH.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building on-device voice assistants, smart home devices, and mobile applications requiring personalized, open-vocabulary keyword spotting and streaming voice wake-up.

## Related

- (link related pages by id as the wiki grows)
