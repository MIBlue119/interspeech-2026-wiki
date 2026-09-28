---
id: hassan26_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2651
pdf: https://www.isca-archive.org/interspeech_2026/hassan26_interspeech.pdf
---

# SCANS: Supervised Contrastive Temporal Alignment of Neural Responses and Speech Stimuli

[PDF](https://www.isca-archive.org/interspeech_2026/hassan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hassan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2651)

**TL;DR** — SCANS is a supervised contrastive learning framework for EEG-speech temporal alignment that achieves a state-of-the-art total score of 86.1 on the ICASSP 2023 challenge benchmark and 69.33% held-out accuracy on the ICASSP 2024 benchmark.

## Problem

Aligning noisy, high-dimensional electroencephalography (EEG) signals with speech stimuli suffers from poor generalization due to high cross-subject variability and the strict one-to-one mapping limits of self-supervised contrastive learning. Furthermore, independent encoder architectures typically prevent modalities from exchanging information until the final layer, missing crucial cross-modal dependencies during feature extraction.

## Method

SCANS uses a dilated convolutional frontend (DCF) with exponentially increasing dilation rates and spatial filters to project 64-channel EEG and mono-channel speech envelopes into a shared 128-dimensional space. Symmetric cross-modal attention (CMA) transformer blocks with 4-head attention allow the EEG and speech pathways to act as queries and keys/values for each other, enabling continuous multi-layer feature fusion. The network is trained with a multi-task objective combining cross-entropy classification and a supervised contrastive alignment loss based on a strict identity target matrix, optimized via AdamW.

## Results

Evaluated on the SParrKULee dataset across ICASSP Auditory-EEG Decoding Challenge configurations, SCANS achieves 87.09% within-subject and 84.12% held-out mean accuracy for N=2, t=3s, outperforming the previous best total score of 82.13. For the high-complexity N=5, t=5s condition, SCANS establishes a new state-of-the-art held-out subject mean accuracy of 69.33% (surpassing the prior best of 62.80%) while substantially reducing subject standard deviation to 4.60%. Increasing window length from 3 to 5 seconds consistently improves alignment accuracy and reduces variance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-reconstruction brain-computer interfaces and objective diagnostic tools for assessing auditory function or physiological speech perception in humans.

## Related

- (link related pages by id as the wiki grows)
