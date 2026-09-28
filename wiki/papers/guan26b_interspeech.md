---
id: guan26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2194
pdf: https://www.isca-archive.org/interspeech_2026/guan26b_interspeech.pdf
---

# UniVoice: Unifying Autoregressive ASR and Flow-Matching based TTS with Large Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/guan26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/guan26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2194)

**TL;DR** — UniVoice is a unified 0.4B-parameter LLM that integrates autoregressive ASR and flow-matching-based TTS in a continuous signal space, achieving a 12% relative WER reduction on LibriSpeech test-clean compared to prior unified models.

## Problem

Existing speech LLMs typically treat ASR and TTS as isolated tasks or rely on discrete tokenization, which incurs quantization information loss and compromises reconstruction fidelity. Furthermore, unifying understanding and generation is difficult due to the architectural divergence between causal autoregressive requirements (ASR) and bidirectional generative requirements (TTS). Solving this within a parameter-efficient framework is crucial for embodied intelligence and real-world edge deployment.

## Method

UniVoice utilizes SmolLM2-360M as the Transformer backbone, a Whisper-large-v3-turbo encoder with an adaptive average pooling adapter for ASR feature extraction, and BigvGAN for vocoding. For TTS, it models speech generation as a text-prefix guided speech infilling task using a flow-matching objective with Optimal Transport Conditional Flow Matching (OT-CFM). To bridge architectural divergence, it omits AdaLN-zero modulation, uses concatenated time embeddings at the head of noisy mel-spectrograms, incorporates RoPE, and introduces a dual-attention masking mechanism that dynamically toggles between causal masks for ASR and bidirectional masks for TTS. The model is trained jointly on 50k hours of LibriHeavy with a multi-task loss weighted by a secondary ASR weight lambda = 0.005.

## Results

Evaluated on LibriSpeech test-clean/test-other for ASR and the LibriSpeech-PC test set for zero-shot TTS. UniVoice achieves an ASR WER of 2.5% on test-clean and 4.2% on test-other, competitive with specialized single-task systems. For zero-shot TTS, it obtains a WER of 4.66, speaker similarity (SIM) of 0.56, and UTMOS of 3.72, outperforming prior unified models like OpusLM-7B (WER 7.7) and LauraGPT (WER 10.4). Ablations demonstrate that the text-prefix speech infilling variant outperforms a speaker-embedding baseline by 18% in WER, full bidirectional attention masks outperform autoregressive masks for TTS, and setting lambda = 0.005 balances the multi-task optimization effectively.

## Code

- https://github.com/gwh22/UniVoice

## Applications

Engineers and researchers building end-to-end, parameter-efficient conversational speech assistants, edge-deployable speech interaction systems, and multi-task spoken language interfaces.

## Limitations

The current framework is scoped exclusively to ASR and TTS tasks, and joint training introduces a slight trade-off in naturalness and speaker similarity compared to heavily specialized single-task models.

## Related

- (link related pages by id as the wiki grows)
