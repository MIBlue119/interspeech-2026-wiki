---
id: a26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-266
pdf: https://www.isca-archive.org/interspeech_2026/a26_interspeech.pdf
---

# MTC-AVSR: Compressed-Token-based Audio-Visual Speech Recognition and Translation with Contrastive Language Alignment

*Lusi A, Zhiyong Duan, Jiang Li, Feilong Bao*

[PDF](https://www.isca-archive.org/interspeech_2026/a26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/a26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-266)

**TL;DR** — MTC-AVSR is a multitask audio-visual speech framework that uses an ultra-compressed rate of 3.5 tokens per second to perform both English ASR and multilingual speech translation without retraining the upstream encoder, achieving 0.74% WER on LRS3 and state-of-the-art BLEU scores on MuAViC.

## Key contributions

- Extends minimal multimodal speech (MMS) token compression (3.5 tokens/sec) to joint audio-visual speech recognition and multilingual translation without encoder retraining.
- Introduces a lightweight Language Adapter Module (LAM) with gated cross-attention to map source-aligned tokens into a multilingual lexicon space while keeping the LLM frozen.
- Proposes a Token-Contrastive Alignment Loss (TCAL) to explicitly optimize vector-space alignment between adapter outputs and multilingual lexical entries using cosine similarity and temperature scaling.
- Establishes a rigorous two-stage training regime that sequentially decouples source alignment from cross-lingual adaptation to prevent gradient interference.

## Problem

State-of-the-art audio-visual speech recognition (AVSR) systems leveraging large language models rely on high-resolution multimodal sequences that impose severe computational costs and high latency during inference. Existing token compression methods are strictly confined to single-task ASR and fail to support multi-task joint recognition and translation. Furthermore, compressed tokens are typically bound exclusively to the source language, lacking a mechanism to map them into a shared multilingual space without inflating LLM parameters.

## Method

The framework processes audio (resampled 16kHz mel-filterbanks) and visual streams (96x96 mouth crops at 25 fps via RetinaFace) through modality-specific front-ends fused via multi-head cross-attention. An AV-QFormer dynamically allocates query tokens using a rate of fQ = 3.5 tokens/s, producing multimodal tokens M. These tokens pass through the Language Adapter Module (LAM), featuring a two-layer gated cross-attention network with Tanh gating and LayerNorm, using a shared multilingual lexicon E (initialized from LLM embeddings) as keys and values.

Training uses a two-stage regime. Stage-1 optimizes the encoder and QLoRA adapters with a cross-entropy loss on source transcripts until convergence, after which encoder parameters are permanently frozen. Stage-2 unfreezes the LAM, its multilingual lexicon, and QLoRA adapters, training jointly with a multitask cross-entropy loss and the Token-Contrastive Alignment Loss (TCAL), which pulls adapter outputs toward target lexicon entries and repels negatives via cosine similarity with temperature tau = 0.07. An annealing factor lambda linearly drops from 1.0 to 0.3 to prioritize adapter adaptation.

Inference uses task-conditioned prompting inspired by Whisper (e.g., <sot> <translate> <Es> ... <eot>) feeding a frozen LLaMA-3-3B LLM equipped with QLoRA on query, key, value, and output projections. Beam search is executed with a beam width of 5 and temperature 0.3.

## Experimental setup

Models are trained on 1,759 hours of data combining LRS3 and an augmented VoxCeleb2 subset (transcribed via Whisper Large-v2), with 75% probability babble noise injection from MUSAN at 0-SNR. Multilingual evaluation uses MuAViC for En-X translation (Spanish, French, Italian, Portuguese) and LRS3 for ASR. Evaluated via Word Error Rate (WER) and BLEU. Implemented using LLaMA-3.2-3B (default), optimized with AdamW (beta1=0.9, beta2=0.98, weight decay=0.01), a cosine learning rate scheduler starting at 1e-4 with 0.5k warmup steps over 30k total steps, and gradient clipping set to 1.0.

## Results

On LRS3, MTC-AVSR achieves a clean WER of 0.74% (matching top SOTA like MMS-LLaMa) and a noisy WER of 2.0%. On MuAViC En-X clean tasks, it sets new state-of-the-art BLEU scores of 28.1 for Spanish, 26.3 for French, and 21.8 for Portuguese, outperforming Bilingual AV-HuBERT and matching Whisper-Flamingo variants. Under noisy conditions, it attains 25.2 Es, 23.5 Fr, 20.3 It, and 20.5 Pt BLEU.

Ablations demonstrate that adding LAM, the multilingual lexicon, and TCAL sequentially improves Spanish BLEU from 27.4 to 28.1 and reduces clean WER from 0.85% to 0.74%. LLM size scaling shows LLaMA-3.2-3B offers the best balance of clean performance and low resource overhead, whereas LLaMA-3.1-8B achieves a slightly better noisy WER (2.02% vs 2.04%) at higher memory costs.

| System | LRS3 Clean WER (%) | LRS3 Noisy WER (%) | MuAViC En-Es BLEU (Clean) |
|---|---|---|---|
| Whisper-Flamingo (Middle) | 0.76 | 5.6 | 28.0 |
| MMS-LLaMa | 0.74 | 1.9 | — |
| Bilingual AV-HuBERT | — | — | 26.6 |
| MTC-AVSR (1B LLM) | 0.77 | 2.13 | 27.7 |
| MTC-AVSR (3B LLM) | 0.74 | 2.04 | 28.1 |
| MTC-AVSR (8B LLM) | 0.75 | 2.02 | 28.0 |

## Limitations

The evaluation is restricted to English source speech translated into four specific European languages (Spanish, French, Italian, Portuguese) using LRS3 and MuAViC datasets, leaving zero-shot generalization to truly low-resource or non-Indo-European languages unverified. The model experiences a minor drop in translation robustness under severe babble noise compared to specialized bilingual architectures like AV-HuBERT. Furthermore, computational benefits depend on pre-compressed token extraction, but scaling to larger LLMs introduces substantial GPU memory overhead.

## Why read this

Speech and multimodal researchers seeking to integrate token compression with frozen LLMs for multi-task speech recognition and translation will find the LAM adapter and TCAL loss design highly practical. It demonstrates how to achieve state-of-the-art cross-lingual transfer without retraining heavy upstream audio-visual encoders.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multilingual video captioning, real-time cross-lingual audio-visual speech translation systems, and on-device noise-robust speech recognition assistants.

## Related

- (link related pages by id as the wiki grows)
