---
id: krishnan26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-309
pdf: https://www.isca-archive.org/interspeech_2026/krishnan26_interspeech.pdf
---

# On Optimizing Multimodal Jailbreaks for Spoken Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/krishnan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/krishnan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-309)

**TL;DR** — The paper introduces JAMA, a joint audio-text multimodal optimization framework that simultaneously perturbs speech and text inputs to bypass safety guardrails in Spoken Language Models, surpassing unimodal jailbreak success rates by 1.5x to 20x.

## Problem

Current safety evaluations for Spoken Language Models (SLMs) focus on unimodal adversarial attacks, optimizing either the text suffix or the audio perturbation in isolation. However, adversaries in real-world scenarios can exploit multiple input channels simultaneously, meaning that unimodal robustness claims drastically overestimate actual system security. This gap leaves SLMs vulnerable to composite attacks that leverage cross-modal synergies to bypass safety alignments.

## Method

The authors propose JAMA (Joint Audio-text Multimodal Attack), combining Greedy Coordinate Gradient (GCG) for discrete text suffix token optimization and Projected Gradient Descent (PGD) for continuous audio perturbation. The framework minimizes a joint loss function over a batch of malicious queries by alternating normalized PGD updates on the audio signal and top-k candidate evaluations for text token substitutions. Experiments use AdvBench across four safety-aligned models: Audio Flamingo 3, Qwen2 Audio (7B), Gemma 3N (E2B), and Qwen2.5 Omni (7B). To enable backpropagation through the audio pipeline, model-specific feature extractors with gradient shattering or numpy implementations are rewritten in PyTorch.

## Results

Evaluated on 480 test samples from AdvBench using LLaMA Guard 3 and string matching across 5 random seeds, JAMA consistently outperforms unimodal baselines by 1.5x to 20x across four audio types (audiobook, switchboard conversational speech, and music). GCG-only baselines achieve high success on Qwen2.5 Omni and Qwen2 Audio (up to 90.9%), while Gemma 3N proves highly robust to text-only optimization (3.0% success). PGD-only attacks prove weaker overall due to speech encoder dampening, though music signals provide better attack transferability than human speech due to wider frequency coverage. A sequential variant (SAMA) achieves a 4x to 6x speedup over simultaneous optimization while retaining comparable jailbreak rates.

## Code

- https://repos.lsv.uni-saarland.de/akrishnan/multimodal-jailbreak-slm

## Applications

Security researchers and red-teaming engineers evaluating the robustness of multimodal Spoken Language Models before deployment.

## Limitations

The framework assumes white-box access to model gradients and differentiable audio feature extraction pipelines.

## Related

- (link related pages by id as the wiki grows)
