---
id: xie26b_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1692
pdf: https://www.isca-archive.org/interspeech_2026/xie26b_interspeech.pdf
---

# FlashTTS: Fast Streaming TTS with MTP Acceleration and X-pred Mean Flow Distillation

[PDF](https://www.isca-archive.org/interspeech_2026/xie26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xie26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1692)

**TL;DR** — FlashTTS is a low-latency streaming text-to-speech framework combining lagged multi-track inputs, parallel multi-token prediction, and an X-pred mean flow decoder, achieving a first-packet latency of 325ms.

## Problem

Modern conversational speech systems require low-latency streaming inputs and outputs, but existing single-codebook LLM-based TTS models rely on multi-stage pipelines that demand sentence-level buffering. Furthermore, these systems are bottlenecked by slow autoregressive token prediction and multi-step flow matching that requires ten or more sampling steps.

## Method

FlashTTS uses a Qwen2.5-0.5B backbone paired with a stacked, lagged multi-track structure that processes speech, text, and language inputs in parallel without waiting for complete sentences. To accelerate generation, it integrates parallel Multi-Token Prediction (MTP) modules backed by a shared language model head and verification operations. For acoustic reconstruction, it utilizes an X-pred mean flow distillation strategy with block-level causal attention to predict clean mel-spectrograms directly in just two neural function evaluations (2-NFE). The model is trained on roughly 300,000 hours of open-source speech data.

## Results

Evaluated on the Minimax multilingual subset and Seed test sets, FlashTTS reduces First-Packet Latency (FPL) to 325ms using an MTP-3 (2-NFE) configuration compared to the CosyVoice2 baseline's 843ms. It achieves a Real-Time Factor (RTF) of 0.632 and maintains competitive Word Error Rates (WER) and Speaker Similarity (SIM). Ablation studies confirm that removing either the MTP modules or the X-pred strategy drastically reduces the speed-up ratio.

## Code

- https://github.com/ASLP-lab/FlashTTS

## Applications

Engineers building real-time conversational voice assistants and speech dialogue systems requiring low first-packet latency and native streaming inputs and outputs.

## Limitations

Speaker similarity scores moderately trail heavily parameterized offline models like Seed-TTS due to the speed-quality trade-offs inherent in single-stream token modeling.

## Related

- (link related pages by id as the wiki grows)
