---
id: nitsu26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2027
pdf: https://www.isca-archive.org/interspeech_2026/nitsu26_interspeech.pdf
---

# Pseudo-Spatially Conditioned TF-Locoformer with MHCA+FiLM Fusion for Single-Channel Speech Separation

[PDF](https://www.isca-archive.org/interspeech_2026/nitsu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nitsu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2027)

**TL;DR** — A pseudo-spatial conditioning framework leverages multi-channel training mixtures as privileged information to pretrain a single-channel speech separation encoder, achieving an SI-SNRi of 18.9 dB on WHAMR!.

## Problem

Single-channel speech separation in noisy and reverberant environments lacks explicit spatial cues, creating ambiguity that limits separation quality. While multi-channel models easily exploit inter-channel geometric cues, these inputs are unavailable at test time. This paper bridges the gap by transferring multi-channel geometric insights into single-channel architectures during training.

## Method

The framework employs a ResNet-based spatial encoder pretrained via a margin-based triplet loss where multi-channel mixtures serve as privileged information to emphasize spatial configuration differences over speech content. This pretrained encoder is jointly fine-tuned with a TF-Locoformer backbone separator, conditioning time-frequency features via a fusion module that combines multi-head cross-attention (MHCA) and feature-wise linear modulation (FiLM). The full pipeline uses complex STFT inputs, 4 attention heads, a triplet margin of 0.2, and adds roughly 1.0 to 1.2 million parameters depending on the backbone size.

## Results

Evaluated on the WHAMR! and NF-WHAMR! datasets using SI-SNRi and SDRi metrics, the proposed method compares against baselines like Conv-TasNet, SepFormer, and TF-GridNet. On WHAMR!, the Medium TF-Locoformer model improves from 18.6 to 18.9 dB SI-SNRi (and SDRi from 16.9 to 17.2 dB). On noise-free NF-WHAMR!, the Small model gains 0.6 dB in both SI-SNRi and SDRi. Ablations confirm that triplet pretraining with differing spatial conditions and the MHCA+FiLM fusion mechanism yield optimal performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio engineers working on monaural speech enhancement, hearing aids, and conferencing systems operating under reverberant and noisy conditions.

## Related

- (link related pages by id as the wiki grows)
