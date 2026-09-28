---
id: polok26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-445
pdf: https://www.isca-archive.org/interspeech_2026/polok26b_interspeech.pdf
---

# Grounding Spoken LLMs in Multi-Speaker Audio via Diarization Conditioning

[PDF](https://www.isca-archive.org/interspeech_2026/polok26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/polok26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-445)

**TL;DR** — Dixtral conditions a spoken language model's acoustic encoder on diarization masks to isolate target-speaker representations, achieving a macro-average cpWER of 15.4% across four multi-talker datasets.

## Problem

Extending spoken large language models to far-field multi-talker audio typically relies on Serialized Output Training, which requires special speaker-change tokens, alters the LLM vocabulary, and causes catastrophic forgetting during decoder fine-tuning. Modular cascading pipelines also discard paralinguistic audio cues like emotion and gender. Dixtral avoids these issues by separating speaker extraction from the language generation step, enabling zero-shot downstream reasoning without modifying the LLM decoder.

## Method

Dixtral integrates a Diarization-Conditioned Whisper (DiCoW) encoder with the Voxtral spoken language model, which pairs a Whisper large-v3 encoder and a Ministral 3B LLM decoder. The DiCoW encoder uses Frame-Level Diarization-Dependent Transformations with learnable affine matrices across four Silence, Target, Non-target, and Overlap categories to adapt layer representations. An MLP modality adapter projects encoder outputs into the LLM embedding space. During training on eight A5000 GPUs, the LLM decoder and modality adapter are frozen while only the acoustic encoder and FDDT modules are updated using Cross-Entropy loss.

## Results

Evaluated on AMI, NOTSOFAR-1 (NSF-1), LibriSpeechMix, and Mixer6 using concatenated minimum-permutation word error rate (cpWER). Dixtral achieves a macro-average cpWER of 15.4%, outperforming Gemini 3.0 Flash (44.4%), VibeVoice (35.2%), and Voxtral Mini Transcribe V2 (31.4%). On the NSF-QA benchmark, zero-shot Dixtral matches Gemini on far-field content understanding, while fine-tuned Dixtral surpasses both Gemini and close-talk Voxtral across content, emotion, and gender QA tasks.

## Code

- https://github.com/BUTSpeechFIT/Dixtral

## Applications

Engineers building far-field speech assistants, meeting transcription systems, and multi-speaker audio analytics platforms requiring speaker-attributed question-answering and summarization.

## Limitations

Performance relies on the accuracy of the underlying speaker diarization system used to generate conditioning masks.

## Related

- (link related pages by id as the wiki grows)
