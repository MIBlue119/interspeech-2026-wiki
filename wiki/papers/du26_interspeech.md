---
id: du26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-235
pdf: https://www.isca-archive.org/interspeech_2026/du26_interspeech.pdf
---

# Streaming T5-based Text-to-Speech Synthesis with Limited Lookahead

[PDF](https://www.isca-archive.org/interspeech_2026/du26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/du26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-235)

**TL;DR** — S5-TTS is a streaming, word-by-word incremental text-to-speech model based on T5 that reduces end-to-end conversational AI latency while maintaining quality comparable to full-context models.

## Problem

Cascaded LLM-TTS systems suffer from high end-to-end response latency because most modern neural TTS models require full sentence context before beginning synthesis. While streaming incremental TTS can mitigate this, existing approaches are restricted to few-speaker setups and struggle with naturalness and zero-shot voice cloning.

## Method

S5-TTS uses an encoder-decoder architecture operating in a word-level streaming manner, conditioning generation on phoneme sequences and reference audio prompts. It introduces a lookahead-causal masking mechanism for both encoder and decoder supported by a Conv-based auxiliary attention module and Monotonic Alignment Search (MAS) to track word boundaries. To recover naturalness under limited lookahead, the authors employ Interleaved Multi-Source Distillation (IMSD) combining teacher forcing on paired data and ASR-filtered autoregressive synthetic text data. The model comprises 160 million parameters (4 encoder layers, 8 decoder layers) and predicts FSQ audio codec tokens.

## Results

Evaluated on LibriTTS and UltraChat test sets, distilled S5-TTS achieves MOS scores within 0.04 to 0.09 of full-context T5-TTS while significantly cutting First-Chunk Latency (FCL) and end-to-end response latency when paired with a Llama 3.3 70B LLM. On LibriTTS, the distilled S5-TTS model yields a Word Error Rate (WER) of 2.65% and a UTMOS of 3.72, outperforming the naive S5-TTS variant. Ablation studies confirm that removing encoder or decoder lookahead-causal masks causes severe degradation in intelligibility, and IMSD successfully closes the naturalness gap.

## Code

- https://s5-tts.github.io/

## Applications

Engineers building real-time conversational AI assistants and streaming voice-bot pipelines can use S5-TTS to reduce response latency.

## Related

- (link related pages by id as the wiki grows)
