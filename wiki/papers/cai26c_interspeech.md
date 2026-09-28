---
id: cai26c_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2297
pdf: https://www.isca-archive.org/interspeech_2026/cai26c_interspeech.pdf
---

# Beyond Mimicry: Constrained Exploration with GRPO for Joint Multi-Talker ASR and Diarization under Unknown Speaker Counts

[PDF](https://www.isca-archive.org/interspeech_2026/cai26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cai26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2297)

**TL;DR** — A unified two-stage SpeechLLM framework combining Chain-of-Thought reasoning and Group Relative Policy Optimization (GRPO) achieves 9.24% cpWER on dynamic multi-talker overlapping speech with unknown speaker counts.

## Problem

Off-the-shelf SpeechLLMs fail on overlapping speech due to severe acoustic interference, while pure Supervised Fine-Tuning (SFT) is brittle and prone to burst hallucinations, temporal degradation, and malformed speaker tags. Cascaded pipelines also suffer from error propagation, making a robust end-to-end generative solution necessary for jointly solving ASR and diarization when speaker counts are unknown.

## Method

The model uses a foundational SpeechLLM architecture (Qwen2.5-Omni-7B) with universal LoRA rank r=16 applied across the audio encoder, modality projector, and LLM. Stage 1 applies constraint-aware SFT with permutation-invariant prompting and a Chain-of-Thought (CoT) reasoning prefix that forces the model to estimate speaker count before transcription. Stage 2 applies Group Relative Policy Optimization (GRPO) using G=8 rollouts without a value model, guided by a Multi-dimensional Constraint-Aware Reward (MCAR) engine. MCAR combines five components: a CoT counting reward, a permutation-invariant semantic fidelity reward (PI-WER), a time-aligned accuracy reward, a fine-grained burst penalty (suppressing hallucinations exceeding τb=2 tokens), and structural/temporal logic checks.

## Results

Evaluated on Libri2Mix, Libri3Mix, and a newly constructed Dynamic-Mix (2+3) set. On Libri3Mix and Dynamic-Mix, the full model achieves 14.52%/9.24% cpWER, 1.95%/1.12% WDER, and 0.10s/0.08s timestamp error (TE), respectively, with Dynamic-Mix reaching 99.72% CoT accuracy. GRPO yields a 35% relative cpWER reduction on Libri3Mix and 54% on Dynamic-Mix compared to SFT+CoT. Ablation studies confirm that removing the CoT counting reward causes the steepest drop (cpWER surging to 18.02% and CoT accuracy falling to 91.67%), and omitting the fine-grained burst penalty or dynamic N! evaluation significantly degrades performance.

## Code

- https://github.com/caiyunrui/MT-GRPO

## Applications

Speech and ML engineers building end-to-end conversational speech systems, meeting transcription tools, and audio-based assistants that require joint multi-talker ASR and diarization without external VAD or clustering modules.

## Limitations

Evaluated primarily on synthetic mixtures (LibriMix derivatives) rather than real-world conversational datasets like AMI or AliMeeting.

## Related

- (link related pages by id as the wiki grows)
