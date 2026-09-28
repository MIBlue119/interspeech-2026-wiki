---
id: lee26u_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2149
pdf: https://www.isca-archive.org/interspeech_2026/lee26u_interspeech.pdf
---

# LLM-as-Joiner: Decoupling Alignment from Language Modeling in Label-synchronous ASR

[PDF](https://www.isca-archive.org/interspeech_2026/lee26u_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26u_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2149)

**TL;DR** — LLM-as-Joiner decouples speech-text alignment from language modeling in ASR by using an Aligner-Encoder to produce a short token-level speech interface, achieving 3.2/5.6 WER on LibriSpeech test-clean/other.

## Problem

Decoder-only speech-as-prefix ASR integrates powerful pretrained LLMs by prepending full acoustic frame sequences, but forcing the LLM to learn monotonic speech-text alignment from scratch is inefficient and incurs high memory costs over long contexts ($T+U$). Standard Aligner-Encoders simplify alignment via label-synchronous supervision but lack the rich linguistic priors of pretrained LLMs. Bridging these paradigms allows leveraging LLM priors while operating on significantly shorter contexts.

## Method

The architecture combines a Conformer-L speech encoder with a pretrained Llama-3.2-3B LLM, splitting the LLM into lower predictor blocks and upper joiner blocks. The encoder maps $T$ acoustic frames into $U$ label-synchronous speech states using token-level cross-entropy supervision at fixed label positions. Speech is injected at a chosen LLM split layer (default layer 7 of 28) via a position-wise gated residual fusion mechanism, while all pretrained LLM weights are frozen and only upper-layer LoRA adapters (rank 16) and fusion parameters are trained. A lightweight secondary non-LLM head with an LSTM predictor is trained jointly to allow deploying a standalone recognizer without the LLM.

## Results

Evaluated on LibriSpeech and a 5-language subset of Common Voice 16.1 (cv-5langs: de, en, es, fr, it), using a Conformer-L encoder trained from scratch. On LibriSpeech test-clean/other, LLM-as-Joiner achieves 3.2/5.6 WER, outperforming a size-matched LLM decoder-only baseline (3.7/7.1 WER). On cv-5langs, the jointly trained lightweight head (118M parameters) outperforms fully fine-tuned Whisper-small (241M parameters) on most languages (e.g., German 9.4 vs 10.7 WER, Italian 11.2 vs 12.4 WER) while running 9× faster (RTF 0.02 vs 0.18). Ablations show that injection at early-to-mid layers ($ℓ=0$ or $ℓ=7$) performs well, whereas late injection ($ℓ=14$) degrades accuracy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building high-accuracy, efficient ASR systems who want to leverage pretrained LLM linguistic priors without the extreme memory overhead and latency of full-sequence decoder-only speech prefix models.

## Limitations

The approach requires training speech encoders and joint heads from scratch on target datasets rather than leveraging fully pretrained end-to-end speech encoders.

## Related

- (link related pages by id as the wiki grows)
