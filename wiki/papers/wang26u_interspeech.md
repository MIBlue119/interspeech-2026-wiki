---
id: wang26u_interspeech
category: emotion-recognition
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1219
pdf: https://www.isca-archive.org/interspeech_2026/wang26u_interspeech.pdf
---

# Multi-Loss Learning for Speech Emotion Recognition with Energy-Adaptive Mixup and Frame-Level Attention

[PDF](https://www.isca-archive.org/interspeech_2026/wang26u_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26u_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1219)

**TL;DR** — This paper proposes a multi-loss learning framework integrating energy-adaptive mixup and frame-level attention for speech emotion recognition, achieving state-of-the-art unweighted accuracy of 79.14% on IEMOCAP.

## Problem

Speech emotion recognition is hindered by emotional complexity, subjective nuances, and severe data scarcity in annotated emotional speech corpora. Traditional data augmentation like label-adaptive mixup overlooks speech energy dynamics, while uniform pooling methods discard critical nonverbal emotional cues.

## Method

The architecture utilizes a pre-trained WavLM backbone to extract frame-level features, paired with an Energy-Adaptive Mixup (EAM) that scales segment energies based on SNR adjustments to generate diverse virtual samples. A Frame-Level Attention Module (FLAM) employs a 16-head self-attention mechanism and learnable projection vectors to dynamically aggregate temporal features. The model is jointly optimized using a Multi-Loss Learning (MLL) strategy combining Kullback-Leibler divergence, focal loss, center loss, and supervised contrastive loss across a 64-dimensional projected latent space.

## Results

Evaluated on four benchmark datasets using unweighted accuracy (UA) and weighted accuracy (WA): IEMOCAP achieves 78.47% WA and 79.14% UA; MSP-IMPROV achieves 58.55% WA and 58.34% UA; RAVDESS reaches 93.40% WA and 92.28% UA; and SAVEE attains an average UA of 72.3%. Ablation studies confirm that replacing standard length-based mixup with EAM, utilizing FLAM instead of max/mean pooling, and combining all four loss functions progressively improve performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building human-computer interaction systems, conversational agents, healthcare monitoring tools, and online education platforms.

## Limitations

Future work will extend the framework to cross-lingual settings, multi-modal cues, and advanced adaptive augmentations.

## Related

- (link related pages by id as the wiki grows)
