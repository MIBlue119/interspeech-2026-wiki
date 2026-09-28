---
id: xiao26c_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3210
pdf: https://www.isca-archive.org/interspeech_2026/xiao26c_interspeech.pdf
---

# Evidence Subspace Projection: Measuring How Much Evidence Explains Deepfake Detection in Self-Supervised Speech Models

[PDF](https://www.isca-archive.org/interspeech_2026/xiao26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xiao26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3210)

**TL;DR** — This paper introduces Evidence Subspace Projection (ESP) to quantify how much specific evidence factors explain deepfake detection decisions in self-supervised learning speech models, revealing that fine-tuning reduces within-spoof biases while diverse training data decorrelates signal-level shortcuts.

## Problem

Audio deepfake detectors built on self-supervised learning (SSL) front-ends excel in-domain but frequently fail to generalize to out-of-domain data, indicating a heavy reliance on dataset-specific shortcuts rather than true spoofing artifacts. Prior work predominantly evaluates detectors as monolithic systems, which obscures the specific contributions and internal behaviors of the SSL front-end. Understanding what information these front-ends actually exploit is critical for improving both interpretability and cross-domain generalization.

## Method

The authors propose Evidence Subspace Projection (ESP), a method that represents both authenticity labels and evidence factors in a shared neuron-activation space derived from Transformer FFN key-value activation statistics. By using HuBERT quantizers to map frames to sub-phonetic tokens, they construct one-versus-rest residual contrast vectors and compute orthonormal bases via SVD for nine evidence groups spanning metadata and signal-level properties. They project the normalized decision axis onto these evidence subspaces to compute a per-effective-rank explanatory power ratio. The evaluation studies 300M-parameter models (XLSR and HuBERT) across three training setups: frozen, fine-tuned on ASV19 or ASV5 with a simple MLP backend, and post-trained on large-scale deepfake datasets.

## Results

Evaluated across six datasets (including ASV19, ASV21LA, ASV21DF, ASV5, and ITW) and nine evidence factors, the experiments demonstrate that frozen models inherently encode dataset-specific shortcuts and align within-spoof variations with the decision axis. Fine-tuning on ASV19 (homogeneous data) substantially amplifies signal-level shortcuts like silence and frequency, whereas fine-tuning on ASV5 (diverse data) successfully decorrelates these properties from the detection task. Post-training (PT) suppresses most signal-level and within-spoof dependencies, although silence structure persists as a robust shortcut (e.g., ASV19 silence gain of +8.1%). Across model comparisons, XLSR generally achieves lower EER than HuBERT, and the empirical correlation confirms that lower evidence subspace overlap typically translates to better EER performance.

## Code

- https://github.com/XIAOYixuan/ESP

## Applications

Speech and ML engineers building, auditing, or deploying audio deepfake detection systems can use this framework to diagnose model vulnerabilities, evaluate feature representations, and audit datasets for shortcut learning.

## Limitations

Some explanatory power attributed to a specific evidence group may actually stem from an unmeasured, correlated confounding factor.

## Related

- (link related pages by id as the wiki grows)
