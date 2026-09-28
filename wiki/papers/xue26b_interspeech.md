---
id: xue26b_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-901
pdf: https://www.isca-archive.org/interspeech_2026/xue26b_interspeech.pdf
---

# Edge–Cloud Collaborative Speech Emotion Captioning via Token-Level Speculative Decoding in Audio-Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/xue26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xue26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-901)

**TL;DR** — The paper introduces an edge-cloud collaborative framework for speech emotion captioning using uncertainty-guided speculative decoding, achieving up to 62.7% BLEU improvements and an 8.5x higher token throughput compared to edge-only models.

## Problem

Deploying large audio-language models (LALMs) on resource-constrained edge devices for speech emotion captioning creates high inference latency and memory footprints, while transmitting raw audio to the cloud raises biometric privacy risks. Conversely, small audio-language models (SALMs) running locally struggle to capture subtle paralinguistic cues and fine-grained affective states. Prior edge-cloud collaborative approaches rely on static partitioning or process all tokens uniformly, failing to target the small subset of emotionally salient, high-uncertainty tokens that dictate caption fidelity.

## Method

The framework couples an edge-side small audio-language model (Qwen2.5-Omni-3B) that drafts captions locally with a cloud-side large audio-language model verifier (Qwen3-Omni-30B-A3B-Instruct). Token-level prediction entropy serves as an uncertainty metric to selectively offload unreliable token blocks to the cloud via a rank-based verification rule, keeping raw waveforms on the device. An adaptive block length mechanism dynamically adjusts drafting spans between 3 and 7 based on local prediction stability and cloud correction feedback to balance communication overhead and accuracy.

## Results

Evaluated on the English and Chinese subsets of the MER2024 benchmark (332 recordings each), the proposed uncertainty-guided speculative decoding (UGSD) improves BLEU-1, BLEU-4, METEOR, and ROUGE-L by 21.6% to 76.4% over an edge-only baseline. UGSD reduces end-to-end inference time from 40.21 seconds to 28.67 seconds (1.40x faster) and increases token throughput from 1.53 to 13.05 tokens/s. Furthermore, only 18.2% of generated tokens require cloud verification, minimizing communication costs and protecting user privacy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building privacy-preserving, real-time affective computing systems, empathetic AI assistants, or accessibility tools targeting resource-limited edge hardware.

## Limitations

The framework assumes network connectivity to a cloud verifier and requires tuning for the entropy threshold and acceptance rank parameters.

## Related

- (link related pages by id as the wiki grows)
