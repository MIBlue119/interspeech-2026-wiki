---
id: magoshi26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-977
pdf: https://www.isca-archive.org/interspeech_2026/magoshi26_interspeech.pdf
---

# Refining Pseudo-Audio Prompts with Speech-Text Alignment for Text-Only Domain Adaptation in LLM-Based ASR

*Ryo Magoshi, Takashi Maekaku, Yusuke Shinohara*

[PDF](https://www.isca-archive.org/interspeech_2026/magoshi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/magoshi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-977)

**TL;DR** — The paper introduces Text-Embedding-to-Speech-Latent (TE2SL), a framework for text-only domain adaptation in LLM-based ASR that uses a learnable Conformer module to transform text embeddings into modality-aligned pseudo-audio prompts. It achieves significant error rate reductions and out-of-vocabulary recovery gains across English and Japanese benchmarks compared to heuristic or LLM-only baselines.

## Key contributions

- Proposes TE2SL, a text-only domain adaptation framework for LLM-based ASR that generates architecture-aware and sample-dependent pseudo-audio prompts.
- Introduces a lightweight, 18.6M-parameter Conformer-based refinement module trained via mean-squared error (MSE) loss against ground-truth audio encoder-projector outputs.
- Outperforms standard text-only baselines (LLM-only fine-tuning, Soft Prompt, and Upsample-and-Mask) across diverse domains in English (SPGISpeech, SlideSpeech) and Japanese (CSJ APS).
- Demonstrates substantial improvements in out-of-vocabulary token recall (RecOOV), validating better retention and adaptation of domain-specific vocabulary.

## Problem

LLM-based automatic speech recognition models suffer performance degradation under domain shifts, yet target domains frequently lack paired audio-transcription data, necessitating text-only adaptation methods. Existing strategies either fine-tune only the LLM (ignoring acoustic context and causing modality mismatch during inference) or synthesize pseudo-audio prompts via Text-to-Speech (which lack multilingual scalability) or heuristic text-embedding manipulation (which ignore audio encoder and projector output characteristics). Neglecting these modular characteristics yields inexpressive prompts that fail to bridge the modality gap.

## Method

The architecture comprises a frozen WavLM-Large audio encoder, a projector (frame stacking with 1/5 downsampling followed by two 3072-dimensional linear layers with ReLU activations), and an instruction-tuned Llama-3.2 3B LLM adapted using LoRA (rank r = 8, alpha = 16) on query and value projection matrices. The core TE2SL framework replaces heuristic upsample-and-mask strategies with a learnable refinement module placed between upsampling and masking. This module is a 16-layer Conformer encoder with a hidden size of 256 and input/output linear projections (18.6M parameters).

During pre-training on paired source data, the refinement module is trained to minimize frame-wise Mean Squared Error (MSE) loss between generated pseudo-audio prompts and ground-truth audio prompts produced by the encoder-projector pipeline. For target-domain adaptation, audio is absent; target text embeddings are randomly upsampled to match temporal lengths, passed through the frozen TE2SL refinement module, time-masked for regularization, and fed to the LLM as pseudo-audio prompts alongside instructions and target transcriptions.

Optimization uses AdamW (beta1 = 0.9, beta2 = 0.999, weight decay = 0.001). Pre-trained models are adapted using dynamic batching with batch bins, utilizing learning rates of 5e-5 for TE2SL adaptation (with module pre-training at 4e-5 using batch size 32).

## Experimental setup

Evaluated on English corpora (LibriSpeech 960h source; SPGISpeech 1.93M samples and SlideSpeech 482k samples as targets) and Japanese corpora (CSJ SPS 257h source; CSJ APS eval1/eval2 130k samples as targets). Compared against a non-adapted baseline, Soft Prompt, and Upsample-and-Mask. Metrics include Word Error Rate (WER, %), Character Error Rate (CER, %), and Out-of-Vocabulary Recall (RecOOV, %). Experiments used ESPnet extended with dynamic batching.

## Results

On the English SPGISpeech target domain, TE2SL achieves an 8.5% WER and 50.1.0% RecOOV, outperforming the baseline (11.1% WER, 39.4% RecOOV) and Upsample-and-Mask (9.1% WER, 45.6% RecOOV). On SlideSpeech, TE2SL reduces WER to 14.0% with 57.3% RecOOV, compared to 16.3% WER and 51.0% RecOOV for Upsample-and-Mask. On Japanese CSJ eval1, TE2SL achieves a 19.6% CER and 19.7% RecOOV (vs 21.5% CER for baseline), and on eval2 achieves 17.5% CER and 21.0% RecOOV (vs 20.2% CER for baseline). Soft Prompt yields minimal or no consistent gains over the base model across these settings.

| System / Condition | SPGISpeech WER (%) | SPGISpeech RecOOV (%) | SlideSpeech WER (%) | SlideSpeech RecOOV (%) |
|---|---|---|---|---|
| Baseline | 11.1 | 39.4 | 17.0 | 50.8 |
| Soft Prompt [20] | 11.1 | 39.3 | 16.4 | 50.7 |
| Upsample-and-Mask [13,20] | 9.1 | 45.6 | 16.3 | 51.0 |
| Proposed (TE2SL) | 8.5 | 50.1 | 14.0 | 57.3 |

## Limitations

The framework relies on having a reliable source domain dataset containing paired speech-audio data to pre-train the Conformer refinement module via MSE loss. The method was evaluated using a single fixed audio encoder (WavLM-Large) and LLM backbone (Llama-3.2 3B), leaving the interaction with alternative model scales or purely multilingual foundation encoders unexplored.

## Why read this

Speech and ML engineers working on LLM-based ASR domain adaptation without target-domain audio will find a concrete, architecture-aware solution that outperforms heuristic text embedding strategies. Researchers will benefit from the formulation of training an intermediate Conformer module to bridge the text-to-audio-prompt modality gap.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Rapid domain adaptation of production ASR systems for specialized vocabularies (e.g., financial earnings calls, academic presentations) using only text corpora.

## Related

- (link related pages by id as the wiki grows)
