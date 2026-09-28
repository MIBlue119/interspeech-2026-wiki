---
id: yalegama26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2524
---

# Deep Learning Based Relative Transfer Matrix Estimation for Multiple Sources and Multiple Microphones

**TL;DR** — Three deep-learning frameworks estimate the Relative Transfer Matrix more accurately than the existing covariance-based method, enabling comparable speech enhancement performance.

## Problem

The Relative Transfer Matrix (ReTM), a multi-source, multi-microphone generalization of the relative transfer function, is useful for speech enhancement in noisy environments, but until now the only estimation approach relied on covariance matrices of multichannel recordings.

## Method

The authors propose three novel supervised deep-learning frameworks for ReTM estimation: time-domain and short-time-frequency-transform-domain convolutional networks, and an LSTM-based recurrent neural network.

## Results

Across five objective metrics, the proposed deep-learning models achieve more accurate ReTM estimation than the covariance-based method, and show effectiveness for speech enhancement on par with the baseline method.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving multi-source, multi-microphone speech enhancement systems (e.g., smart speakers, conferencing devices) that rely on accurate transfer function/matrix estimation.

## Related

- (link related pages by id as the wiki grows)
