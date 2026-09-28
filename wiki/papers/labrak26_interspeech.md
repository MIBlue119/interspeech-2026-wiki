---
id: labrak26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2901
pdf: https://www.isca-archive.org/interspeech_2026/labrak26_interspeech.pdf
---

# Generating Synthetic Doctor-Patient Conversations for Long-form Audio Summarization

*Yanis Labrak, David Grünert, Severin Baroudi, Jiyun Chun, Pawel Cyrta, Sergio Burdisso, Ahmed Hassoon, David Liu, Adam Rothschild, Reed Van Deusen, Petr Motlicek, Andrew Perrault, Ricard Marxer, Thomas Schaaf*

[PDF](https://www.isca-archive.org/interspeech_2026/labrak26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/labrak26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2901)

**TL;DR** — The paper introduces Synth-DoPaCo, a fully synthetic pipeline built on open-weight models that generates 8,800 doctor-patient conversations totaling 1,329 hours of audio along with reference SOAP notes. Evaluation of open-weight systems reveals that cascaded ASR-to-text models still substantially outperform end-to-end models by achieving lower hallucination rates and higher faithfulness.

## Key contributions

- Proposes a three-stage synthetic pipeline combining persona-conditioned multi-turn text generation, acoustic simulation, and fact-grounded reference note creation.
- Releases Synth-DoPaCo: 8,800 doctor-patient conversations totaling 1,329 hours of audio with synchronized transcripts and SOAP notes.
- Establishes a rigorous two-stage LLM-as-a-judge evaluation framework measuring 12 clinical documentation dimensions including faithfulness and over-medicalization.
- Benchmarks current open-weight end-to-end LALMs against cascaded pipelines, exposing severe hallucination issues in native speech models.

## Problem

Long-context audio reasoning in Large Audio Language Models (LALMs) is severely bottlenecked by a lack of long-form training data and benchmarks, particularly for open-ended generation tasks like medical summarization. Existing public medical datasets are either tiny (like PriMock57 with 57 actor-performed clips) or text-only (like ACIBench), while real clinical data remains locked behind strict privacy regulations like HIPAA. Furthermore, evaluating open-ended long-form audio generation via surface overlap metrics fails to capture human quality judgments or penalize hallucinations.

## Method

The data generation pipeline operates in three stages using open-weight models. First, structured doctor and patient personas (covering attributes like age, gender, formality, and 724 unique medical chief complaints) are sampled. Second, Gemma 3-27B-IT generates multi-turn text dialogues incrementally using the conversation history, which significantly increases interpersonal challenge and persona adherence compared to single-shot generation.

Third, text is converted to audio via Qwen3-TTS-1.7B using gender-matched LibriTTS voice clones. The audio is enriched using PyRoomacoustics to simulate an 8-square-meter examination room, injected with 66 sound event classes (e.g., paper rustling, typing) via scaper based on Gemma 3-parsed temporal triggers, and augmented with 16 kbps Opus compression and amplitude downscaling for the patient track. Reference SOAP notes are produced by extracting a structured, quote-grounded JSON fact table from the transcript via Kimi K2 Thinking to prevent LALM hallucinations during clinical rewriting.

## Experimental setup

The Synth-DoPaCo dataset comprises 1,329 hours across 8,800 dialogues split into train (7,200), dev (400), and test (1,200) sets. Baselines include cascaded pipelines (Whisper Large V3 or Qwen3-ASR followed by Qwen3-30B-A3B) and end-to-end models (Qwen3-Omni-Instruct and Qwen3-Omni-Thinking). Evaluation uses a 12-dimension LLM-as-a-judge pipeline and medical concept F1 metrics. TTS synthesis utilized a single NVIDIA A100 40GB GPU (~2,500 hours), while LLM generation ran on dual NVIDIA A100s.

## Results

Cascaded systems significantly outperform end-to-end LALMs in clinical faithfulness: end-to-end systems exhibit a 32% per-claim hallucination rate compared to 22-24% for cascaded architectures and 1% for reference notes. Although end-to-end models like Qwen3-Omni-Instruct achieve higher ROUGE and medical concept F1 scores due to longer, more verbose generation (averaging 545 words vs 255 for cascaded), they suffer from severe over-documentation and hallucinated clinical details.

| Architecture | Faithfulness (1-5) | Coverage (1-5) | Structure (1-5) | Conciseness (1-5) |
|---|---|---|---|---|
| Whisper Large V3 + Qwen3-Thinking | 3.3 | 4.3 | 4.0 | 3.5 |
| Qwen3-Omni-Instruct | 2.7 | 4.3 | 4.3 | 3.0 |
| Qwen3-Omni-Thinking | 2.7 | 4.2 | 4.0 | 3.1 |
| Reference (Oracle + Kimi K2) | 5.0 | 4.2 | 4.5 | 3.8 |

## Limitations

The reference SOAP notes are entirely LLM-generated rather than physician-authored, risking systematic biases. All synthetic conversations are restricted to English, two-speaker, primary-care first visits, limiting generalizability to multilingual, multi-party, or specialist clinical settings. Furthermore, Whisper achieving 2-3% Word Error Rate on the synthetic wet audio indicates that the acoustic simulation may not fully replicate the extreme noise and transcription difficulty of real-world clinical recordings.

## Why read this

Researchers and engineers building long-context audio language models or automated medical documentation systems should read this paper to learn how to construct large-scale synthetic dialogue datasets and tackle the severe hallucination bottlenecks of end-to-end speech models.

## Code

- https://huggingface.co/datasets/Play-Your-Part/Synth-DoPaCo

## Applications

Automated clinical documentation, long-form speech summarization, and training data generation for end-to-end spoken language understanding systems.

## Related

- (link related pages by id as the wiki grows)
