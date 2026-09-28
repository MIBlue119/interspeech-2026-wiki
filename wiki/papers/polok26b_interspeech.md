---
id: polok26b_interspeech
category: speech-recognition
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-445
pdf: https://www.isca-archive.org/interspeech_2026/polok26b_interspeech.pdf
---

# Grounding Spoken LLMs in Multi-Speaker Audio via Diarization Conditioning

*Alexander Polok, Samuele Cornell, Sathvik Udupa, Honza Černocký, Shinji Watanabe, Lukáš Burget*

[PDF](https://www.isca-archive.org/interspeech_2026/polok26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/polok26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-445)

**TL;DR** — Dixtral extends Spoken Large Language Models (SLMs) to far-field multi-talker audio by conditioning a Whisper-based acoustic encoder on diarization masks while keeping the LLM decoder frozen. It outperforms Gemini 3.0 Flash, VibeVoice, and Voxtral Mini Transcribe V2 on speaker-attributed transcription by 29.0%, 19.8%, and 16.0% absolute cpWER respectively.

## Key contributions

- Introduces Diarization-Conditioned Spoken LLMs, bypassing Serialized Output Training (SOT) to avoid catastrophic forgetting and vocabulary expansion.
- Proposes Dixtral, combining a Diarization-Conditioned Whisper (DiCoW) encoder with a frozen Voxtral/Ministral 3B decoder for target-speaker extraction, transcription, QA, and summarization.
- Releases NSF-QA, a long-form multi-speaker question-answering and summarization benchmark built on NOTSOFAR-1 covering content, emotion, and speaker gender.
- Demonstrates that independent target-speaker extraction scales generation with O(S * N^2) complexity rather than O((SN)^2) sequence-length penalties in SOT models.

## Problem

Spoken LLMs typically process multi-talker audio using Serialized Output Training (SOT), which serializes transcripts by onset time, expands the LLM vocabulary with special tokens, and requires heavy decoder fine-tuning. This causes severe distributional mismatch and catastrophic forgetting of core reasoning and QA capabilities. Modular pipelines solve transcription well but lack zero-shot generalization to cross-modal tasks like summarization and conversational QA.

## Method

Dixtral replaces the acoustic encoder of an SLM (Voxtral Mini 3B, using a Whisper large-v3 encoder and a Ministral 3B decoder) with a diarization-conditioned encoder derived from DiCoW. Frame-level speaker activity probabilities (Silence, Target, Non-target, Overlap - STNO) modulate the internal representations of each encoder layer via learnable diagonal affine transformation matrices using Frame-Level Diarization-Dependent Transformations (FDDT). The conditioned acoustic representations are passed through a two-layer MLP modality adapter with GELU activations to project them into the LLM embedding space. Text prompts and projected audio embeddings are concatenated as a prefix sequence, feeding a frozen Ministral 3B decoder that generates the target response autoregressively using standard cross-entropy loss over the generated tokens.

During training, both the LLM decoder and modality adapter are completely frozen; only the acoustic encoder layers and FDDT modules are updated. For multi-task scaling, the model is trained on 8x 24GB A5000 GPUs using bfloat16 precision, gradient checkpointing, and gradient accumulation of 4 steps (global batch size 32) for 20,000 steps with a peak learning rate of 6e-5 (5,000 warmup steps, cosine decay). Long-form QA fine-tuning is performed on H100 GPUs.

## Experimental setup

Evaluated on four multi-talker transcription datasets: NOTSOFAR-1 (NSF-1), AMI, LibriSpeechMix (LSMix), and Mixer6 (MX-6, out-of-domain evaluation). Transcription is measured via Concatenated Minimum-Permutation Word Error Rate (cpWER). QA and summarization are evaluated on the novel NSF-QA benchmark using Gemini 2.5 Flash as an LLM judge for accuracy and ROUGE-L for summarization. Compared against DiCoW v3.3, VibeVoice, Voxtral MTv2, and Gemini 3.0 Flash.

## Results

On speaker-attributed transcription across all datasets, Dixtral achieves a macro-average cpWER of 15.4%, outperforming Gemini 3.0 Flash (44.4%), VibeVoice (35.2%), and Voxtral Mini Transcribe V2 (31.4%). Specifically on NSF-1, Dixtral scores 29.1% cpWER compared to Gemini's 39.1% and VibeVoice's 35.8%. On the NSF-QA benchmark, zero-shot Dixtral achieves 54.6% Content QA accuracy (matching far-field Gemini at 55.1%) and 24.4 ROUGE-L on summarization. When fine-tuned on NSF-QA, Dixtral reaches 73.0% Content QA, 47.6% Emotion QA, 95.5% Gender QA, and 41.4 ROUGE-L, surpassing both close-talk Voxtral and Gemini.

| System | NSF-1 | AMI Small | LSMix 1 | LSMix 2 | LSMix 3 | MX-6 CH4 | Average |
|---|---|---|---|---|---|---|---|
| Voxtral MTv2 | 54.4 | 42.3 | 2.0 | 28.2 | 42.3 | 19.4 | 31.4 |
| VibeVoice | 35.8 | 33.7 | 2.1 | 50.8 | 72.8 | 16.0 | 35.2 |
| DiCoW v3.3 | 26.6 | 18.6 | 1.8 | 3.1 | 21.7 | 11.9 | 14.0 |
| Gemini 3.0 Flash | 39.1 | 56.3 | 4.5 | 23.3 | 84.7 | 58.3 | 44.4 |
| Dixtral | 29.1 | 19.8 | 2.1 | 3.6 | 23.5 | 14.4 | 15.4 |

## Limitations

The approach relies entirely on external diarization systems (such as DiariZen), meaning errors in upstream diarization directly cascade into target-speaker extraction failures. Joint end-to-end training with diarization has not yet been explored, and task-specific fine-tuning for QA/summarization can cause a trade-off that slightly degrades verbatim transcription accuracy on out-of-domain data like Mixer-6.

## Why read this

Speech and ML researchers working on far-field multi-talker audio or Spoken LLMs should read this paper to see how target-speaker extraction via encoder conditioning avoids SOT-related catastrophic forgetting while outperforming proprietary models like Gemini on speaker-attributed speech tasks.

## Code

- https://github.com/BUTSpeechFIT/Dixtral

## Applications

Automated meeting transcription and minutes generation, multi-speaker conversational AI assistants, far-field smart home voice interfaces, and multi-talker audio question-answering systems.

## Related

- (link related pages by id as the wiki grows)
