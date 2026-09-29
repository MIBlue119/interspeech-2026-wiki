---
id: lee26u_interspeech
category: asr
institutions: ["NTT", "Kyoto University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2149
pdf: https://www.isca-archive.org/interspeech_2026/lee26u_interspeech.pdf
---

# LLM-as-Joiner: Decoupling Alignment from Language Modeling in Label-synchronous ASR

*Jaeyoung Lee, Masato Mimura, Ryo Magoshi, Tatsuya Kawahara*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26u_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26u_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2149)

**Category:** `asr`

**TL;DR** — LLM-as-Joiner decouples monotonic speech-text alignment from language modeling by having an Aligner-Encoder produce U token-level speech states that are injected into a frozen pretrained LLM via gated fusion. This reduces inference context length from T+U to U, achieving a 3.2 / 5.6 WER on LibriSpeech test-clean/other.

## Key contributions

- Introduces an LLM-based ASR architecture decoupling monotonic alignment (via Aligner-Encoder) from language modeling (via LLM joiner operating on U label positions rather than T+U speech-prefixed sequences).
- Proposes a practical integration recipe reusing the LLM as-is (unchanged tokenizer, embeddings, and LM head) with speech injected at an intermediate layer and only upper layers LoRA-tuned.
- Demonstrates consistent WER improvements over size-matched baselines on LibriSpeech and multilingual Common Voice without large pretrained speech encoders.
- Shows that joint training with a lightweight non-LLM head yields implicit knowledge transfer from the LLM pathway to the shared speech encoder without explicit distillation.

## Problem

Standard decoder-only speech-as-prefix ASR systems force large language models to learn speech-text temporal alignment from scratch over long acoustic contexts, adding memory overhead and inefficiency. Because pretrained LLMs are not trained with acoustic alignment, they require additional compressors, boundary tokens, or forced alignment aids. Furthermore, attending to full frame-level sequences (T frames plus U tokens) dominates decoding memory costs, and prior decoder-only baselines often struggle to converge on multilingual datasets.

## Method

The architecture uses an Aligner-Encoder backbone (Conformer-L with 17 layers, hidden dim 2048, 8 heads) trained from scratch with an inter-CTC loss at the 12th layer (lambda_ctc = 0.1). Given T acoustic frames and a target transcript of length U, the encoder applies token-level cross-entropy supervision directly at fixed label positions 1, ..., U, producing a U-length label-synchronous speech interface S = (s_1, ..., s_U).

The pretrained LLM (Llama-3.2-3B base, 28 layers) is split at layer l (default l=7, with early/mid layers acting as the predictor and upper layers as the joiner). The lower LLM blocks process text token history under a causal mask to produce text states G. Speech states S are projected and fused with G at the split layer via position-wise gated fusion: f_u = alpha * sigmoid(z_u) * Lin(s_u) + (1 - alpha * sigmoid(z_u)) * g_u, where z_u is computed using speech, text, or both. The resulting fused states F are processed by the upper LLM blocks and native LM head.

All pretrained LLM weights are frozen, and LoRA (rank 16) is applied exclusively to attention modules above the split layer l. A lightweight non-LLM head (1-layer LSTM predictor and small feed-forward joiner) runs concurrently on the same Aligner-Encoder using a subset vocabulary (4,359 for LibriSpeech, 6,351 for Common Voice) with multi-task loss (lambda_llm = 1.0, lambda_lite = 0.5, lambda_ctc = 0.1). Decoding uses beam search (beam size 6) in O(U) time without external LMs or test-time adaptation.

## Experimental setup

Evaluated on LibriSpeech (test-clean and test-other) and multilingual Common Voice 16.1 (cv-5langs: de, en, es, fr, it). Baselines include a from-scratch Aligner Lite baseline (118M parameters), an LLM decoder-only speech-as-prefix baseline using Llama-3.2-3B with frame stacking (stack size 5) and LoRA, and fully fine-tuned Whisper-small (241M parameters). Systems are trained with the Transformer learning rate schedule (peak 10^-3, 20k warmup steps), effective batch size of 70 minutes of audio per update, for 100 epochs on LibriSpeech and 30 epochs on cv-5langs using a single RTX 6000 Ada GPU.

## Results

On LibriSpeech test-clean/test-other, the proposed LLM-as-Joiner (LLM head, 3.3B) achieves 3.2 / 5.6 WER, significantly outperforming the size-matched LLM decoder-only baseline (3.7 / 7.1 WER) and running faster at an RTF of 0.65 vs 0.90. The decoder-only baseline failed to converge on the multilingual Common Voice set.

For multilingual Common Voice (cv-5langs), the jointly trained lightweight head (Lite head, 118M) achieves an average WER of 12.5%, outperforming the size-matched Aligner baseline (14.4%) and even beating the fully fine-tuned Whisper-small (13.3%) across all languages except English, while running roughly 9x faster (RTF 0.02 vs 0.18). Ablations show that injection depth is robust at layers 0 and 7 (both 3.2 / 5.6 on LibriSpeech), but degrades at layer 14 (4.0 / 5.8). Gating variant ablations indicate that text-only gating performs well for the LLM head (3.2 / 5.7), whereas speech-conditioned gating is more critical for the lightweight head.

| Model | Model Size | RTF | LibriSpeech (clean/other) | cv-5langs (avg.) |
|---|---|---|---|---|
| Aligner (Lite, from-scratch) | 118M | 0.02 | 3.9 / 6.5 | 14.4 |
| LLM Decoder-only baseline | 3.3B | 0.90 | 3.7 / 7.1 | did not converge |
| Whisper-small | 241M | 0.18 | 2.8 / 6.5 | 13.3 |
| LLM-as-Joiner (Lite head) | 118M | 0.02 | 3.8 / 6.4 | 12.5 |
| LLM-as-Joiner (LLM head) | 3.3B | 0.65 | 3.2 / 5.6 | 11.5 |

## Limitations

Evaluated on a relatively small five-language subset of Common Voice and LibriSpeech, without scaling experiments on massive web-scale audio corpora. The speech encoder is trained entirely from scratch rather than leveraging massive external self-supervised representations like wav2vec 2.0 or Whisper encoders. Language coverage is restricted to European languages, and computational trade-offs were only tested using Llama-3.2-3B and Conformer-L architectures.

## Why read this

Speech and ML researchers seeking an efficient alternative to decoder-only speech-as-prefix LLM integration will learn how to decouple alignment from language modeling via Aligner-Encoders and U-length state injections. Readers will take away a practical recipe for reducing LLM inference memory overhead while enabling implicit linguistic transfer to lightweight backbones.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-latency multilingual automatic speech recognition and deployable on-device speech transcription using hybrid large language model backbones.

## Institutions / 機構

NTT, Kyoto University

## Related

- (link related pages by id as the wiki grows)
