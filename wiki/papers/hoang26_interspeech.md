---
id: hoang26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1060
pdf: https://www.isca-archive.org/interspeech_2026/hoang26_interspeech.pdf
---

# Towards Efficient Simultaneous Inverse Text Normalization with Pretrained Text-to-Text Language Model and Read-Tag-Write Policy

*Kiet Anh Hoang, Khanh Le, Bao Nguyen, Linh Pham, Dung Vo, Thai Tran, Mai Nguyen, Tri Nguyen, Vu Le*

[PDF](https://www.isca-archive.org/interspeech_2026/hoang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hoang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1060)

**TL;DR** — This paper presents the first end-to-end streaming Inverse Text Normalization (ITN) system using a pretrained text-to-text model, a joint 3-class IOB tagger, and a Read–Tag–Write decoding policy. Evaluated on Vietnamese datasets, it achieves accuracy close to non-streaming models while satisfying real-time latency requirements.

## Key contributions

- A recipe for streaming pretrained seq2seq models via Dynamic Right Context (DRC) masking, a multi-task objective, and prefix-based training augmentation.
- The Read–Tag–Write (RTW) policy with a Copy–Paste strategy and incremental KV caching for both encoder and decoder to pass through verbatim tokens and trigger generation selectively.
- Prefix-based training augmentation (p_trunc) that stochastically truncates training pairs to teach mid-sentence span termination without global EOS dependencies.
- A newly curated 5M-sentence Vietnamese ITN dataset featuring programmatic phonetic/semiotic alignments and token-level IOB boundaries.

## Problem

Streaming Inverse Text Normalization is crucial for live ASR and meeting transcription, but existing streaming methods rely entirely on hybrid systems combining neural taggers with expert-crafted finite-state transducer (FST) rules. These hybrid systems are difficult to scale across languages and domains due to heavy manual engineering. Conversely, standard end-to-end sequence-to-sequence models scale well but are inherently non-streaming due to global attention and suffer from hallucinations when processing full sentences. Prior Simultaneous Machine Translation (SiMT) reordering policies also introduce redundant computation inappropriate for the local, order-preserving transformations required by ITN.

## Method

The model is built on EnViT5-base (275M parameters, 12 encoder/decoder layers, hidden dimension 768), a pretrained text-to-text transformer. The encoder uses Dynamic Right Context (DRC) masking with variable chunk sizes (c in {3,4,5}) and right-context look-ahead (r in {0,1,2}) during training to simulate real-time constraints. A linear tagging layer sits atop the encoder representations to predict a 3-class IOB (Beginning, Inside, Outside) scheme for normalization span detection.

The Read–Tag–Write (RTW) policy governs inference: (1) Read incoming chunks through the causal encoder; (2) Tag tokens via the 3-class tagger; (3) Write via a selective decoding mechanism. Verbatim tokens tagged as 'O' bypass the decoder entirely and are copied directly to the output stream (Copy–Paste strategy), while maintaining their presence in the historical context cache. When a complete B-I normalization span is identified, the autoregressive decoder cross-attends exclusively to the relevant historical encoder states (H_0:m) to generate the written-form target, forced to stop via an explicit <EOS> or a maximum length of L_max^local = 64 tokens.

To bridge the train-test mismatch of local mid-sentence termination without global source-side <EOS> tokens, the authors introduce Prefix-based Training Augmentation with probability p_trunc = 0.8. Training pairs are stochastically truncated such that source inputs drop the global <EOS> while target prefixes terminate explicitly with an <EOS>. The model is trained using a multi-task objective combining cross-entropy span detection loss (L_tag) and sequence generation loss (L_gen). Inference is heavily optimized using incremental encoder/decoder KV caching for self- and cross-attention, reducing round-trip latency.

## Experimental setup

Experiments use a 5M-sentence Vietnamese training dataset, 50k validation pairs, and 50k test pairs derived from the binhvq news corpus, along with a challenging noisy test set synthesized via Microsoft Edge TTS and transcribed using a ChunkFormer ASR model (14.21% WER). Baselines include non-streaming seq2seq models (scratch B_0, pretrained EnViT5 B_1, and auxiliary-loss B_2), AdapITN, hybrid streaming models (H_1, H_2), and a multi-path wait-k model (k=9). Models are trained for up to 20 epochs using 4 NVIDIA H100 (80GB) GPUs with the AdamW optimizer (peak LR 10^-4, global batch size 512). Evaluation metrics are ITN Word Error Rate (I-WER), Non-ITN Word Error Rate (NI-WER), overall Word Error Rate (WER), and tagger F1-score.

## Results

On clean text with Punctuation and Capitalization (With PnC), the proposed streaming model S_2 achieves an I-WER of 12.91%, NI-WER of 1.36%, and an overall WER of 4.18%, substantially outperforming the wait-k baseline (6.99% WER) and the hybrid streaming model H_2 (8.27% WER). S_2 lags behind the fully non-streaming pretrained baseline B_2 (3.63% WER) by only a small margin. On noisy ASR transcripts (ASR-O), the fully optimized streaming model S_4 achieves 10.74% WER, outperforming hybrid streaming H_2 (13.67% WER) and wait-k (11.91% WER) by wide margins.

Ablations demonstrate that adding right-context look-ahead (r in {1,2}) yields a relative WER reduction of ~19% over zero look-ahead (r=0). Combining the Copy–Paste strategy, encoder KV caching, and decoder KV caching (fully streaming DC variant S_4) reduces per-chunk processing latency at chunk size 5 from 206 ms down to 60 ms (a 3.43x speedup), maintaining a p95 worst-case latency of 165.5 ms suitable for 100 concurrent users.

| System | Condition | I-WER (%) | NI-WER (%) | WER (%) |
|---|---|---|---|---|
| B_2 (Non-streaming) | With PnC | 10.80 | 1.32 | 3.63 |
| H_2 (Hybrid streaming) | With PnC | 28.39 | 1.78 | 8.27 |
| Wait-k (k=9) | With PnC | 19.40 | 3.00 | 6.99 |
| S_2 (Proposed streaming) | With PnC | 12.91 | 1.36 | 4.18 |
| S_4 (Fully streaming w/ DC) | With PnC | 13.22 | 1.31 | 4.21 |
| S_4 (Fully streaming w/ DC) | Noisy ASR (ASR-O) | 37.08 | 2.24 | 10.74 |

## Limitations

The model struggles with phonetic normalization of out-of-vocabulary (OOV) or rare foreign entities where the decoder occasionally hallucinates orthographically incorrect spellings due to ASR phonetic ambiguities. At 275M parameters, the model requires significant compute, and the current RTW policy waits for complete B-I spans before emitting outputs, which may introduce perceptual lag for long transformation spans.

## Why read this

Speech and ML engineers building real-time production ASR post-processing systems should read this paper to learn how to adapt heavy pretrained seq2seq models into efficient, low-latency streaming generators using Read-Tag-Write policies and KV caching.

## Code

- https://huggingface.co/VietAI/envit5-base

## Applications

Streaming ASR post-processing, live meeting transcription, and simultaneous speech translation systems requiring real-time formatting, punctuation, capitalization, and semiotic/phonetic normalization.

## Related

- (link related pages by id as the wiki grows)
