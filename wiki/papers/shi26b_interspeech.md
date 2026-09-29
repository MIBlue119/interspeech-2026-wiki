---
id: shi26b_interspeech
category: speech-llm-dialogue
labels: [self-supervised]
institutions: ["University of Science and Technology of China", "Singapore Institute of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-745
pdf: https://www.isca-archive.org/interspeech_2026/shi26b_interspeech.pdf
---

# Towards Fine-Grained Temporal Perception: Post-Training Large Audio-Language Models with Audio-Side Time Prompt

*Yanfeng Shi, Pengfei Cai, Jun Liu, Qing Gu, Nan Jiang, Lirong Dai, Ian McLoughlin, Yan Song*

[PDF](https://www.isca-archive.org/interspeech_2026/shi26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shi26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-745)

**Category:** `speech-llm-dialogue` · **Labels:** `self-supervised`

**TL;DR** — TimePro-RL equips large audio-language models with fine-grained temporal perception by interleaving timestamp embeddings into audio features and applying reinforcement learning with adaptive rewards, boosting R@0.9 audio grounding accuracy to 39.8%.

## Key contributions

- Proposed Audio-Side Time Prompt (ASTP) which inserts explicitly encoded timestamp tokens directly into the audio feature sequence at a 25 Hz resolution.
- Introduced a semantic initialization strategy for timestamp embeddings by averaging subword embeddings of their corresponding numerical strings, preventing optimization drift.
- Designed an advantage-driven adaptive temporal reward mechanism combining sparse discrete metrics (Eb-F1) with continuous auxiliary metrics (mIoU/METEOR) for group relative policy optimization.
- Demonstrated consistent performance gains across audio grounding, sound event detection, and dense audio captioning tasks.

## Problem

Current Large Audio-Language Models (LALMs) like Qwen2-Audio and Qwen2.5-Omni excel at semantic audio recognition and high-level acoustic understanding but fail at precise temporal grounding, such as accurately predicting event onsets and offsets. Standard autoregressive positional embeddings (like RoPE) and token-level cross-entropy SFT objectives lack explicit physical temporal coordinates and fail to penalize boundary deviations smoothly, leading to high-precision localization errors.

## Method

The framework uses 750 Timestamp Tokens spanning 0 to 30 seconds at a 0.04-second stride, matching the 25 Hz frame rate of the underlying Whisper audio encoder. These tokens are mapped via a frozen Timestamp Embedding layer initialized from the mean subword embeddings of their numerical string representations and interleaved directly into the audio-text input sequence.

Following supervised fine-tuning (SFT) for 3 epochs on the full dataset, the model undergoes reinforcement learning for a single epoch using Group Relative Policy Optimization (GRPO) with a group size of 4. To resolve optimization plateaus caused by discrete thresholds in Event-based F1 (Eb-F1), an adaptive temporal reward uses an element-wise product with a continuous auxiliary reward (mIoU for grounding/SED, METEOR for captioning) whenever group reward variance falls below a threshold of 1e-6.

## Experimental setup

Evaluated on the FTAR dataset (61,862 training / 483 test samples for audio grounding), DESED dataset (15,041 training / 1,153 test samples for sound event detection), and a dense audio captioning set (92,443 training / 741 test samples). Compared against zero-shot and finetuned baselines including Qwen2-Audio (7B), Qwen2.5-Omni (7B), Audio Flamingo 2 (3B), Kimi-Audio (7B), and TimeAudio. Implemented using LoRA (r=8, alpha=32) with SFT learning rate 1e-5 and RL learning rate 1e-6.

## Results

On the audio grounding task using Qwen2.5-Omni, TimePro-RL improves R@0.5 from 74.0 to 80.1, R@0.7 from 59.8 to 66.3, and R@0.9 from 34.1 to 39.8, outperforming baselines like Kimi-Audio (76.1 R@0.5). In sound event detection, the Eb-F1 score for Qwen2-Audio reaches 58.4, surpassing standard fine-tuned Qwen2-Audio (49.8). Ablations show that random initialization of timestamp embeddings degrades SED Eb-F1 down to 46.0 (compared to 50.1 with semantic init), and using pure Eb-F1 RL drops dense captioning METEOR from 32.6 down to 31.6, which is recovered to 33.9 using the proposed adaptive reward mechanism.

| System / Condition | AG R@0.5 | AG R@0.9 | SED Eb-F1 | DAC Eb-F1 |
|---|---|---|---|---|
| Qwen2.5-Omni (Zero-shot) | 25.4 | 10.6 | 13.7 | 10.4 |
| Qwen2.5-Omni (SFT) | 74.0 | 34.1 | 48.9 | 35.2 |
| Kimi-Audio (Finetuned) | 76.1 | 34.5 | 50.9 | 32.7 |
| Qwen2-Audio (TimePro-RL) | 78.8 | 38.1 | 58.4 | 39.8 |
| Qwen2.5-Omni (TimePro-RL) | 80.1 | 39.8 | 57.6 | 40.7 |

## Limitations

The current setup is restricted to audio clips up to 30 seconds due to the 750 timestamp token discretization strategy. The method has only been validated on English-centric or standard benchmark corpora and relies heavily on accurate pre-extracted audio frame encoder representations at a fixed 25 Hz rate. Scaling to longer audio files requires expanding the timestamp vocabulary and handling increased sequence lengths.

## Why read this

Researchers and engineers building time-aligned speech-language models or handling dense audio event detection will find a practical recipe for combining input-level time prompting with GRPO-based reward shaping to fix high-precision localization errors.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated audio event localization, video/audio content indexing, dense audio captioning, and timestamp-grounded conversational assistants.

## Institutions / 機構

University of Science and Technology of China, Singapore Institute of Technology

**Funding / 經費:** Anhui Province Major Science and Technology Research Project

## Related

- [AudioGround: Fine-Grained Temporal Grounding in Audio via Deterministic Boundary Supervision](kim26z_interspeech.md) — same problem · relatedness 2.9/3
- [GigaChat Audio: Time-aware Large Audio Language Model](kutsakov26_interspeech.md) — shared technique · relatedness 2.8/3
- [A Closer Look at Failure Modes in Temporal Understanding of Large Audio-Language Models](kulkarni26_interspeech.md) — same problem · relatedness 2.3/3
- [A Sensitivity Analysis of Multi-Event Audio Grounding in Audio LLMs](lee26o_interspeech.md) — same problem · relatedness 2.2/3
- [Parameter-Efficient Adaptation of Speech-Aware LLMs for Timestamp Prediction](sunder26_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
