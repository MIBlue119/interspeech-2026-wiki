---
id: mukhituly26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2797
pdf: https://www.isca-archive.org/interspeech_2026/mukhituly26_interspeech.pdf
---

# A Unified Safety Subspace Exists in Speech Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/mukhituly26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mukhituly26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2797)

**TL;DR** — A shared low-dimensional safety subspace exists in speech language models across modalities and attacks, and a single steering vector can flip model refusal versus compliance without retraining.

## Problem

Speech language models (SLMs) integrate audio inputs into large language models, expanding the attack surface to diverse audio-based jailbreaks alongside standard text threats. Prior defenses typically treat safety as an isolated metric or handle modalities separately, leaving it unclear whether audio jailbreaks exploit modality-specific failures or bypass the same internal safety mechanisms as text attacks. Understanding and controlling these internal representations is critical to building robust cross-modal safety defenses.

## Method

The authors analyze residual-stream activations at middle layers (layer 15 for Qwen2-Audio, layer 17 for GLM-4-Voice) using Principal Component Analysis (PCA) to map benign, harmful, and jailbreak queries. They formulate difference-of-means (DoM) directions and derive low-dimensional compliance-shift vectors that are back-projected into the full-dimensional residual stream space. At inference time, these Audio and Text steering vectors are injected into the last-token activation via a scaled, normalized shift controlled by a scalar multiplier alpha. Experiments evaluate cross-attack and cross-modal transfer across two open-source SLMs (Qwen2-Audio and GLM-4-Voice) using Alpaca and AirBench for benign inputs, AdvBench for harmful inputs, and five jailbreak attacks (AdvWave, AMSE, CAVA, AutoDan, BEAST).

## Results

On Qwen2-Audio and GLM-4-Voice, applying negative steering vectors to jailbreak inputs reduces Attack Success Rate (ASR) to below 7% across all five tested attacks. For example, AdvWave audio jailbreak ASR drops from 97.93% to 0.52% on Qwen2-Audio, and AutoDan text jailbreak ASR falls from 72.69% to 2.82%. Conversely, positive steering on refused harmful inputs increases compliance ASR from under 6% to between 56% and 90%. Random direction controls fail to yield comparable behavioral shifts, confirming that the geometry of the subspace is specifically responsible for the control.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building safety guardrails or post-hoc activation defenses for speech language models and multimodal conversational systems.

## Limitations

The work focuses on inference-time activation steering and evaluates specifically on two open-source SLM architectures and five attack families.

## Related

- (link related pages by id as the wiki grows)
