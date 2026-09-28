---
id: zhao26d_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-976
pdf: https://www.isca-archive.org/interspeech_2026/zhao26d_interspeech.pdf
---

# Speech-Worthy Alignment for Japanese SpeechLLMs via Direct Preference Optimization

[PDF](https://www.isca-archive.org/interspeech_2026/zhao26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhao26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-976)

**TL;DR** — The paper introduces a preference-based alignment approach for Japanese SpeechLLMs using Direct Preference Optimization (DPO) and supervised fine-tuning to produce concise, conversational speech-worthy outputs, achieving an 18% relative improvement on a new evaluation benchmark.

## Problem

SpeechLLMs typically combine ASR encoders with text LLM backbones, causing them to inherit written-style output patterns like markdown, bullet points, and complex syntax that are poorly suited for audio-first consumption and text-to-speech synthesis. This mismatch is especially severe in Japanese, where spoken and written registers diverge significantly in politeness markers, particles, and syntax. Furthermore, there are no existing evaluation resources specifically dedicated to testing the speech-worthiness of Japanese spoken dialog systems.

## Method

The architecture connects a Whisper-large speech encoder to a Sarashina-7B LLM backbone via a shallow projector layer. The authors utilize Direct Preference Optimization (DPO) combined with Supervised Fine-Tuning (SFT) using translated and adapted preference corpora including SpeechPref, InstructS2S-200K, and DeepDialogue, where chosen responses are speech-worthy and rejected responses are written-style. Training updates the projector alongside key, query, and LayerNorm (KQ-LN) parameters across all transformer layers. To evaluate the task, the authors construct SpokenElyza, a 34-example benchmark derived from ELYZA-tasks-100 through modality filtering, GPT-based style transfer, and human auditory verification.

## Results

Evaluated using an LLM-as-judge (Qwen2.5-32B-Instruct) rubric scored from 1 to 5 and surface-form metrics on SpokenElyza and Elyza datasets. The proposed DPO+SFT method combined with a spoken system prompt achieves a SpokenElyza score of 3.44 (an 18% relative improvement over the 2.91 pretrained baseline) while retaining 3.78 out of 3.97 on the text-oriented Elyza benchmark. Surface-form evaluations on SpokenElyza show that the aligned model reduces dependency depth to 4.97 and non-vocalizable content (NV%) to 3.24%. Ablations demonstrate that KQ-LN parameter tuning outperforms top-layer tuning, and higher DPO loss weights consistently improve speech-worthiness.

## Code

- https://huggingface.co/datasets/sbintuitions/voicebench-ja

## Applications

Engineers building Japanese speech-to-speech dialog systems, conversational agents, and real-time voice assistants can use this method to align SpeechLLM text generators for natural downstream TTS synthesis.

## Limitations

The approach is specifically evaluated and tuned for Japanese due to its extreme written-spoken register divergence.

## Related

- (link related pages by id as the wiki grows)
