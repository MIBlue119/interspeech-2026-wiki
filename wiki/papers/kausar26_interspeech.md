---
id: kausar26_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1703
pdf: https://www.isca-archive.org/interspeech_2026/kausar26_interspeech.pdf
---

# DisenEEG-Net: Disentangling EEG features via sufficient information bottleneck and adversarial learning for cross-subject auditory attention detection

[PDF](https://www.isca-archive.org/interspeech_2026/kausar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kausar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1703)

**TL;DR** — DisenEEG-Net introduces an end-to-end feature disentanglement framework combining information theory and adversarial learning to improve cross-subject auditory attention decoding, achieving 75.9% accuracy on the KUL dataset with 1-second EEG windows.

## Problem

Auditory Attention Decoding (AAD) using EEG signals suffers from poor cross-subject generalization due to large inter-subject physiological variability and domain shift. Models trained on specific groups often fail when applied to unseen individuals, severely limiting the real-world deployment of neuro-steered hearing devices. Existing architectures struggle to simultaneously extract discriminative task-relevant patterns and remove idiosyncratic subject noise.

## Method

The framework utilizes a parallel spatiotemporal Transformer encoder to process raw 64-channel EEG data through separate temporal and spatial pathways. A feature disentanglement module then decomposes the latent representations into orthogonal task-specific and subject-specific subspaces. Training is guided by five complementary losses: an orthogonal regularization constraint, an adversarial alignment objective via a gradient reversal layer, a sufficient information bottleneck loss to retain subject identity cues, a task classification cross-entropy loss, and a reconstruction mean squared error loss for feature fidelity. The model uses embedding dimensions of D = 128, 2-layer transformers with 8 heads, and is optimized end-to-end using AdamW.

## Results

Evaluated using a Leave-One-Subject-Out cross-validation scheme on the KUL, DTU, and AVED public benchmarks against baselines including SSFCNN, MBSSFCC, DGSD, DBPNet, Listennet, and DARNet. On the KUL dataset, DisenEEG-Net achieves 75.9% accuracy with 1-second EEG windows (outperforming DARNet by over 5%) and 76.1% with 2-second windows. Ablation studies confirm that removing orthogonal regularization, sufficiency information bottleneck, or adversarial alignment leads to consistent accuracy drops ranging from 2.8% to 3.2%.

## Code

- https://github.com/hello1233-maker/DisenEEG-Net

## Applications

Engineers and researchers developing neuro-steered hearing aids and brain-computer interfaces for robust real-time auditory attention decoding across diverse users.

## Limitations

Performance depends on temporal window length, with shorter windows offering lower accuracy compared to extended contexts.

## Related

- (link related pages by id as the wiki grows)
