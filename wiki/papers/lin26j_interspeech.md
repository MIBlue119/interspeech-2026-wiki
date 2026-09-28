---
id: lin26j_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1858
pdf: https://www.isca-archive.org/interspeech_2026/lin26j_interspeech.pdf
---

# First-to-Spike: An Early-Exit Framework for Rapid and Energy-Efficient Spiking Neural Networks

[PDF](https://www.isca-archive.org/interspeech_2026/lin26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1858)

**TL;DR** — The First-to-Spike (F2S) framework introduces an intrinsic early-exit mechanism for spiking neural networks that terminates inference immediately upon the first output spike, improving accuracy and reducing latency and energy consumption.

## Problem

Spiking neural networks (SNNs) process entire input sequences statically, creating computational waste when dealing with redundant speech or physiological data that could be recognized early. Existing early-exit SNNs rely on extrinsic, non-spiking confidence rules like softmax thresholds, which complicate deployment on neuromorphic hardware. F2S addresses this by demonstrating that SNNs possess an innate early-exit capability using the spike itself as a robust decision signal.

## Method

The F2S architecture combines a multilayer SNN backbone with a Leaky Integrate-and-Fire (LIF) decision layer where each output neuron corresponds to a class, and inference halts as soon as the first neuron fires. A biologically-inspired Winner-Take-All (WTA) circuit uses trainable lateral inhibitory connections to suppress competing neurons and accelerate convergence. The model is optimized using a Hybrid Temporal Training (HTT) objective combining weighted Temporal Efficient Training loss, a temporal margin loss to enforce firing order separation, and an efficiency regularization loss penalizing late decisions.

## Results

Evaluated on Google Speech Commands V2 (GSC V2), SEED, and SEED-IV datasets, F2S achieves a GSC V2 accuracy of 92.89% with an average decision timestep (ADT) of 63.68 and an energy consumption of 2.75 uJ, outperforming baseline ED-sKWS. Ablations show that adding the WTA circuit boosts accuracy to 92.32%, while HTT drops the ADT to 66.32, with the combined framework yielding the best performance.

## Code

- https://github.com/PatrickZLin/F2S

## Applications

Engineers and researchers deploying low-power, real-time speech keyword spotting, audio recognition, and brain-computer interface emotion recognition on edge or neuromorphic hardware.

## Limitations

The text does not state specific limitations or scope bounds.

## Related

- (link related pages by id as the wiki grows)
