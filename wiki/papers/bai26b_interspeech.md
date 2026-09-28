---
id: bai26b_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1056
pdf: https://www.isca-archive.org/interspeech_2026/bai26b_interspeech.pdf
---

# Controllable Accent Normalization via Discrete Diffusion

[PDF](https://www.isca-archive.org/interspeech_2026/bai26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bai26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1056)

**TL;DR** — DLM-AN is a controllable accent normalization system utilizing masked discrete diffusion over self-supervised speech tokens, achieving the lowest word error rate among compared systems while providing interpretable accent strength and duration control.

## Problem

Prior accent normalization techniques typically perform an all-or-nothing accent shift without letting users adjust accent strength, which is vital for applications like language learning and dubbing. Furthermore, many existing pipelines rely heavily on text-to-speech synthesized targets or continuous frameworks that lack fine-grained rhythm adjustability and duration control.

## Method

The model extends the LLaDA masked diffusion language model to speech by performing iterative token generation using a bidirectional Transformer without causal masking. An SSL tokenizer (WavLM) extracts discrete speech tokens, which are processed by a Transformer token encoder guided by CTC-based phonemic supervision. A Common Token Predictor (CTP) evaluates token confidence to identify natively pronounced regions, allowing users to selectively reuse high-confidence source tokens for initializing the reverse diffusion process and smoothly control accent strength. Additionally, a flow-matching Duration Ratio Predictor estimates the target-to-source duration ratio to automatically adjust timing and rhythm.

## Results

Evaluated on multi-accent English datasets, DLM-AN achieves the lowest word error rate (WER) among all compared baseline systems, outperforming prior methods in content preservation. It maintains competitive naturalness and accent reduction performance. Ablations and qualitative tests confirm that threshold-based source token reuse successfully provides smooth, interpretable control over accent retention.

## Code

- https://P1ping.github.io/dlman-demo/

## Applications

Speech engineers and developers building pronunciation training tools for language learners, authentic multimedia dubbing systems, or personalized text-to-speech platforms.

## Related

- (link related pages by id as the wiki grows)
