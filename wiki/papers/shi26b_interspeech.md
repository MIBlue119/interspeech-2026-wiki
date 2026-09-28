---
id: shi26b_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-745
pdf: https://www.isca-archive.org/interspeech_2026/shi26b_interspeech.pdf
---

# Towards Fine-Grained Temporal Perception: Post-Training Large Audio-Language Models with Audio-Side Time Prompt

[PDF](https://www.isca-archive.org/interspeech_2026/shi26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shi26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-745)

**TL;DR** — The paper introduces TimePro-RL, a post-training framework combining timestamp embedding interleaving and reinforcement learning to significantly enhance the fine-grained temporal localization and reasoning capabilities of large audio-language models.

## Problem

Current large audio-language models excel at high-level semantic understanding but struggle to precisely infer the onset and offset timestamps of acoustic events, limiting their utility in fine-grained scenarios like audio grounding and sound event detection. Standard supervised fine-tuning lacks optimization signals specifically designed to correct time-boundary prediction deviations, leading to heavy penalties for near-miss timestamp predictions. To overcome this, explicit physical temporal cues must be introduced at the input level alongside dedicated reinforcement learning objectives aligned with temporal metrics.

## Method

The framework, named TimePro-RL, integrates Audio-Side Time Prompt (ASTP) and Group Relative Policy Optimization (GRPO). First, 750 timestamp tokens spanning 0 to 30 seconds (at 0.04s intervals corresponding to Whisper's 25 Hz encoder frame rate) are interleaved within the audio feature sequence, with their embeddings initialized via semantic averaging of tokenized numerical strings and frozen during training. The models (Qwen2-Audio and Qwen2.5-Omni) undergo Supervised Fine-Tuning (SFT) for 3 epochs, followed by GRPO post-training for 1 epoch on a subset of 10,200 samples with a group size of 4. An adaptive temporal reward mechanism combines a discrete primary metric (Event-based F1 score) with a continuous auxiliary reward (mean IoU or METEOR) via an element-wise product if the primary reward's variance falls below a threshold, preventing advantage degeneration.

## Results

Evaluated across audio grounding (FTAR dataset), sound event detection (DESED dataset), and dense audio captioning, TimePro-RL consistently outperforms zero-shot and SFT baselines, particularly on high-precision metrics. For Qwen2.5-Omni, audio grounding recall at 0.9 threshold (R@0.9) increases from 34.1 (SFT) to 39.8, and dense audio captioning Event-based F1 rises from 35.2 to 40.7. Ablations confirm that semantic prior initialization of timestamp tokens and the advantage-driven adaptive RL reward mechanism are both crucial for optimal performance, whereas random initialization leads to metric degradation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building applications that require precise temporal alignment of sound events, such as automated acoustic event detectors, video-audio indexing, and dense audio captioning systems.

## Related

- (link related pages by id as the wiki grows)
