---
id: park26e_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2005
pdf: https://www.isca-archive.org/interspeech_2026/park26e_interspeech.pdf
---

# Pushing the Boundaries of Streaming Multi-Speaker ASR: A Systematic Study of Architectural Trade-offs

[PDF](https://www.isca-archive.org/interspeech_2026/park26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2005)

**TL;DR** — This paper presents a systematic architectural study and unified framework for streaming multi-speaker ASR, introducing a Permutation-Invariant Dynamic Time Warping (PI-DTW) algorithm to enable scalable end-to-end Serialized Output Training (SOT).

## Problem

Deploying multi-speaker ASR under streaming constraints requires balancing accuracy, latency, and memory while handling overlapping speech and long-form conversational contexts. However, prior work lacks a comprehensive controlled comparison of architectural trade-offs, and end-to-end SOT models suffer from label-permutation ambiguities and length mismatches between short training clips and long inference sessions.

## Method

The authors categorize streaming multi-speaker ASR into four architectural paradigms using shared open-source components (Nemotron Speech streaming ASR based on FastConformer/RNN-T and Sortformer v2.1 diarization): (1) Cascaded ASR and Diarization, (2) Diarization Masked Input, (3) Word-Level Serialized Output Training (WL-SOT) with an Arrival-Order Speaker Cache and speaker kernels, and (4) Diarization-Conditioned Self-Speaker Adaptation (SSA). To overcome speaker spill-over and transcription-RTTM misalignment during WL-SOT training on short clips (10-60s), they propose the Permutation-Invariant Dynamic Time Warping (PI-DTW) algorithm combined with an inverse-frequency speaker cost function. Models are trained on datasets including AMI, ICSI, DipCo, Fisher, and Notsofar1 using 8x NVIDIA A100 GPUs, starting with 8-12s segments for 50k steps followed by fine-tuning on 10-55s variable-length utterances.

## Results

The framework is evaluated on conversational datasets including CH109, Mixer6, and the AMI Meeting Corpus (IHM and SDM settings), measuring concatenated minimum permutation word error rate (cpWER). Under oracle diarization, the Diarization-Conditioned SSA approach achieves the best multi-speaker accuracy (e.g., 14.2% cpWER on AMI IHM compared to 23.49% for Cascaded and 24.27% for WL-SOT), while largely preserving single-speaker base ASR performance on Hugging Face OpenASR leaderboard datasets where WL-SOT experiences noticeable degradation. The PI-DTW algorithm successfully resolves alignment bottlenecks for SOT-style training data preparation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers building interactive conversational voice agents, duplex models, and real-time speech-to-speech translation systems requiring low-latency streaming multi-speaker recognition.

## Limitations

WL-SOT exhibits significant degradation in single-speaker ASR accuracy compared to dedicated base models, and parallel multi-instance setups increase memory footprint and computational costs as the number of speakers grows.

## Related

- (link related pages by id as the wiki grows)
