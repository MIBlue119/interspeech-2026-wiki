---
id: du26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-235
pdf: https://www.isca-archive.org/interspeech_2026/du26_interspeech.pdf
---

# Streaming T5-based Text-to-Speech Synthesis with Limited Lookahead

*Muyang Du, Jason Roche, Junjie Lai*

[PDF](https://www.isca-archive.org/interspeech_2026/du26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/du26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-235)

**TL;DR** — S5-TTS is an encoder-decoder streaming text-to-speech model that enables low-latency, word-by-word incremental speech generation using limited lookahead-causal masking and multi-source distillation, reducing end-to-end conversational AI latency by over 50% compared to full-context baselines.

## Key contributions

- Lookahead-causal masking mechanism for both encoder self-attention and decoder cross-attention to enforce strict context windows during streaming inference.
- Conv-based auxiliary attention module coupled with monotonic alignment search (MAS) and CTC loss to dynamically map decoder steps to encoder words.
- Interleaved Multi-Source Distillation (IMSD) using paired speech data and ASR-filtered text-only utterances from an LLM to restore naturalness under limited lookahead.
- Word-level streaming generation pipeline with dynamic completion detection via cross-attention monitoring and Hanning-window overlap-crossfading for smooth chunk transitions.

## Problem

Cascaded conversational AI pipelines pairing text LLMs with state-of-the-art neural TTS models suffer from high end-to-end response latency because most TTS architectures demand full sentence context before triggering synthesis. Existing incremental TTS approaches are predominantly restricted to single-speaker or few-speaker setups, failing to scale to modern zero-shot multi-speaker models. Furthermore, restricting context windows typically degrades prosody, intelligibility, and speaker similarity, necessitating dedicated structural mitigations.

## Method

S5-TTS adapts a 160M-parameter T5 architecture consisting of 4 encoder layers and 8 decoder layers (768-dim embeddings, 4096-dim feedforward, 8 heads), operating on phonemes via G2P and predicting 8-codebook FSQ discrete audio codec tokens (22.05 kHz at 6.9 kbps). During inference, the encoder processes the current word alongside past words and $k$ lookahead words ($k=2$ found optimal), while the decoder auto-regressively generates corresponding audio codec chunks. Word boundaries are tracked by monitoring average cross-attention weights; when the peak attention shifts into the lookahead window, current word generation finishes.

To enforce this constraint, lookahead-causal masks ($M^{\text{enc}}$ and $M^{\text{dec}}$) are applied across all layers. $M^{\text{dec}}$ requires explicit alignment between decoder steps and encoder words, obtained via a Conv-based auxiliary attention module (two 3x3 convolutions with ReLU followed by 1x1 convolutions producing scaled negative squared Euclidean distances) combined with Monotonic Alignment Search (MAS) and CTC loss during training. A Connectionist Temporal Classification loss over the cross-attention matrix further reinforces monotonic alignment.

To counteract the naturalness drop from limited context, Interleaved Multi-Source Distillation (IMSD) trains the student S5-TTS against a full-context T5-TTS teacher using paired audio datasets ($D_{\text{audio}}$) and text-only conversational data ($D_{\text{text}}$ from UltraChat-200k) filtered by a 0.6B ASR model to retain only zero-WER samples. The distillation loss combines MSE on final decoder hidden states, KL divergence on decoder logits, and standard cross-entropy, with batches interleaved during gradient accumulation.

## Experimental setup

Trained on LibriTTS and HiFiTTS (845.04 hours, 2,319 speakers) plus 3,827.5-hour synthetic distillation set (1.3M utterances). Evaluated against T5-TTS, E2-TTS, FireRedTTS, MaskGCT, and CosyVoice on LibriTTS, VCTK, and UltraChat unseen test sets. Metrics include CER, WER, WavLM Speaker Similarity (SSIM), UTMOS, STOI, PESQ, Real-Time Factor (RTF), First-Chunk Latency (FCL), and End-to-End Latency (E2E) paired with Llama 3.3 70B INT4. Hardware: 4 NVIDIA B200 GPUs, batch size 32, gradient accumulation 4 (effective 128), trained for 250k steps via AdamW (lr warm-up to $2 \times 10^{-4}$).

## Results

With lookahead $k=2$, S5-TTS with IMSD achieves a WER of 2.65% and UTMOS of 3.72 on LibriTTS (vs 3.20% WER and 3.77 UTMOS for full-context T5-TTS), and improves to 0.83% WER and 4.17 UTMOS on UltraChat. Ablations demonstrate that removing encoder lookahead-causal masks causes catastrophic failures (WER soaring to 40.15%), while IMSD distillation recovers MOS scores from 3.64 up to 3.71 on LibriTTS (nearly matching T5-TTS's 3.75). S5-TTS reduces end-to-end response latency (E2E) down to ~0.34s compared to ~0.73s for full-context T5-TTS when coupled with a streaming LLM.

| System | CER $\downarrow$ | WER $\downarrow$ | UTMOS $\uparrow$ | PESQ $\uparrow$ | SSIM $\uparrow$ |
|---|---|---|---|---|---|
| Ground Truth | 0.91% | 2.02% | 3.79 | – | 1.0000 |
| T5-TTS (Full Context) | 2.05% | 3.20% | 3.77 | – | 0.9356 |
| S5-TTS ($k=2$, Naive) | 2.12% | 3.49% | 3.66 | – | 0.9328 |
| S5-TTS ($k=2$, w/ IMSD) | 1.47% | 2.65% | 3.72 | 1.075 | 0.9340 |
| E2-TTS [45] | – | 2.82% | 3.65 | 1.071 | 0.9487 |
| MaskGCT [47] | – | 2.31% | 3.74 | 1.071 | 0.9495 |

## Limitations

Evaluated primarily in English across clean read speech and synthetic conversational text datasets, leaving multilingual and noisy acoustic robustness unverified. The streaming boundary detection relies on attention weights and fixed word chunks, which may experience degradation under extreme disfluencies, stuttering, or highly expressive conversational overlaps.

## Why read this

Read this paper if you are building real-time conversational agents and need to deploy a zero-shot multi-speaker neural TTS with minimal first-chunk latency without sacrificing the stability of encoder-decoder architectures.

## Code

- https://s5-tts.github.io/

## Applications

Real-time conversational AI, low-latency voice assistants, duplex spoken dialogue systems.

## Related

- (link related pages by id as the wiki grows)
