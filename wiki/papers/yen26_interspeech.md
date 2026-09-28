---
id: yen26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-488
pdf: https://www.isca-archive.org/interspeech_2026/yen26_interspeech.pdf
---

# MDM-ASR: Bridging Accuracy and Efficiency in ASR with Diffusion-Based Non-Autoregressive Decoding

[PDF](https://www.isca-archive.org/interspeech_2026/yen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-488)

**TL;DR** — MDM-ASR bridges the accuracy and efficiency gap in automatic speech recognition by combining a pre-trained speech encoder with a masked diffusion decoder, achieving competitive accuracy with autoregressive baselines while enabling parallel non-autoregressive decoding.

## Problem

Traditional autoregressive (AR) sequence-to-sequence models achieve high accuracy in automatic speech recognition but suffer from slow, sequential decoding whose inference time scales linearly with output length. Conversely, non-autoregressive (NAR) models like CTC allow parallel token decoding but experience performance degradation due to strong conditional independence assumptions, while prior diffusion-based or flow-matching NAR approaches still lag significantly behind AR counterparts and lack thorough empirical evaluation.

## Method

The framework couples a pre-trained speech encoder to extract acoustic representations with a non-causal Transformer-based discrete diffusion decoder that iteratively refines masked token sequences conditioned on the acoustic features. To mitigate training-inference mismatch caused by exposure to intermediate errors, the authors introduce Iterative Self-Correction Training (ISCT). They also propose an Entropy-Bounded Confidence (EB-Conf) sampler and a Position-Biased EB-Conf (PBEB-Conf) sampler to handle positional bias and stabilize generation during parallel multi-step unmasking.

## Results

Evaluated across four benchmark English datasets and multilingual tasks, MDM-ASR consistently outperforms prior generative NAR ASR models while delivering competitive accuracy compared against strong AR baselines. It retains fast parallel decoding efficiency across the board. Comprehensive ablations validate the scaling behavior, the effectiveness of Iterative Self-Correction Training, and the impact of different sampling strategies.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building real-time speech transcription systems, virtual assistants, or large-scale voice interfaces that require both high accuracy and low inference latency.

## Related

- (link related pages by id as the wiki grows)
