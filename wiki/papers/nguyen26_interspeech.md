---
id: nguyen26_interspeech
category: asr
labels: [multilingual]
institutions: ["Agency for Science, Technology and Research", "Nanyang Technological University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-110
pdf: https://www.isca-archive.org/interspeech_2026/nguyen26_interspeech.pdf
---

# Direct Preference Optimization for English-Mandarin Code-Switching Speech Recognition in Audio LLMs

*Trung Nguyen, Cheng Yi Lewis Won, Minh Duc Pham, Yingxu He, Shuo Sun, Ai Ti Aw*

[PDF](https://www.isca-archive.org/interspeech_2026/nguyen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nguyen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-110)

**Category:** `asr` · **Labels:** `multilingual`

**TL;DR** — This paper applies Direct Preference Optimization (DPO) to align multilingual Audio LLMs for English-Mandarin code-switching speech recognition, reducing Mixed Error Rate (MER) by up to 89.6% on in-distribution and 20.0% on out-of-distribution benchmarks. It constructs 100K preference pairs contrasting ground-truth transcripts with synthetically generated flawed ones that mimic translation, omission, and hallucination failure modes.

## Key contributions

- Identified three systematic failure modes in Audio LLM code-switching transcription: language omission, translation-instead-of-transcription, and hallucination.
- Proposed a scalable DPO data construction pipeline using Qwen3-32B to generate rejected samples via Global Translation (80%) and Partial Translation (20%) strategies.
- Curated a 566.8-hour dataset of ~100K preference pairs combining spontaneous dialogues (CS-Dialogue) and synthetic audio concatenations (EMILIA).
- Demonstrated consistent MER reductions across three distinct Audio LLM families (MERaLiON-2-3B, Phi-4-multimodal-instruct, and Qwen2-Audio-7B-Instruct).

## Problem

State-of-the-art multilingual Audio LLMs struggle with code-switching speech despite strong general multilingual performance, frequently exhibiting language omission, unwarranted translation, or repetition loops. Prior methods rely on hybrid pipelines, audio concatenation, or architectural modifications, but none explicitly address the behavioral alignment of Audio LLMs for code-switching transcription. This gap matters because code-switching is prevalent in everyday multilingual conversations, and existing models fail to faithfully preserve the original mixed-language composition when prompted to transcribe.

## Method

The authors apply Direct Preference Optimization (DPO) to align Audio LLM policies directly without an explicit reward model. Given an audio input, a text prompt, a preferred ground-truth response (chosen), and a dispreferred response (rejected), DPO increases the likelihood of the correct mixed-language transcription while decreasing the likelihood of flawed outputs. The preference dataset contains ~100K pairs (~570 hours) derived from CS-Dialogue (77.3 hours) and EMILIA (489.5 hours). Rejected responses are generated using Qwen3-32B via two strategies: Global Translation (80%), which translates all content from one language to the other, and Partial Translation (20%), which translates isolated spans.

Three architectures are trained for a single epoch on 8 H100 GPUs using different configurations: MERaLiON-2-3B (3B parameters, full fine-tuning, learning rate 1e-6, beta 0.5, batch size 256), Phi-4-multimodal-instruct (6B parameters, full fine-tuning, learning rate 5e-6, beta 0.05, batch size 256), and Qwen2-Audio-7B-Instruct (7B parameters, LoRA rank 256 on attention/MLP layers, learning rate 3e-5, beta 0.3, batch size 64). LoRA was necessary for Qwen2-Audio to prevent severe hallucination and output degradation observed during full fine-tuning. A diverse pool of 20 English and 20 Chinese transcription prompts is randomly sampled during training to avoid prompt overfitting.

## Experimental setup

Evaluated on four benchmarks: SEAME dev_man (2,610 samples, 2.0 hours) and SEAME dev_sge (3,222 samples, 2.5 hours) as out-of-distribution sets, and EMILIA-test (1,000 samples, 5.6 hours) and CS-Dialogue-test (359 samples, 2.1 hours) as in-distribution sets. Performance is measured using Mixed Error Rate (MER), combining character-level tokenization for Chinese and word-level for English. Baselines are the respective unaligned base models (MERaLiON-2-3B, Phi-4-MM, and Qwen2-Audio-7B-IT).

## Results

DPO training yields consistent relative MER reductions across all evaluated models and benchmarks. On out-of-distribution SEAME dev_man, Qwen2-Audio-7B-Instruct achieves a 20.0% relative improvement (dropping from 72.89% to 58.30% MER), while Phi-4-multimodal-instruct achieves a 10.3% relative reduction (51.97% to 46.63% MER). On in-distribution benchmarks, Phi-4 achieves an 89.6% relative drop on EMILIA (70.98% down to 7.38% MER) and 78.5% on CS-Dialogue. MERaLiON-2-3B exhibits smaller gains (0.7% to 11.1% relative) because its supervised fine-tuning already incorporated code-switching data. Qualitatively, DPO successfully corrects translation-to-single-language errors, severe repetition loops (e.g., dropping from 250 repetitions to 0), and language omission.

| System / Condition | SEAME dev_sge (MER%) | SEAME dev_man (MER%) | EMILIA (MER%) | CS-Dialogue (MER%) |
|---|---|---|---|---|
| MERaLiON-2-3B (Base) | 32.38 | 25.79 | 32.01 | 25.41 |
| MERaLiON-2-3B (DPO) | 31.75 | 25.61 | 30.41 | 22.58 |
| Phi-4-MM (Base) | 69.97 | 51.97 | 70.98 | 49.61 |
| Phi-4-MM (DPO) | 61.09 | 46.63 | 7.38 | 10.65 |
| Qwen2-Audio-7B-IT (Base) | 95.11 | 72.89 | 44.70 | 38.91 |
| Qwen2-Audio-7B-IT (DPO) | 85.52 | 58.30 | 42.08 | 31.40 |

## Limitations

The approach is evaluated solely on English-Mandarin code-switching, leaving other language pairs untested. Rejected samples are constructed via synthetic transformations rather than model-generated failures, which may introduce a distributional mismatch. The study uses vanilla DPO without advanced variants (like SimPO or mDPO) and focuses rejection primarily on translation errors while omitting explicit hallucination or omission penalty pairs. Finally, the paper does not evaluate potential catastrophic forgetting of general audio understanding or other conversational capabilities.

## Why read this

Speech and ML researchers working on Audio LLMs or multilingual speech recognition should read this paper to learn how lightweight Direct Preference Optimization can correct severe behavioral failures like translation-instead-of-transcription and hallucination without architectural redesigns.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multilingual conversational voice assistants, automatic meeting transcription systems in bilingual regions, and spoken translation platforms.

## Institutions / 機構

Agency for Science, Technology and Research, Nanyang Technological University

**Funding / 經費:** National Research Foundation, Singapore

## Related

- [Reinforcement Learning for Data-Efficient Code-Switched ASR](ye26c_interspeech.md) — same problem · relatedness 2.5/3
- [Contrastive Training with LLM-generated Near-Misses for Robust Code-Switching Speech Recognition](nguyen26i_interspeech.md) — same problem · relatedness 2.4/3
- [LLM-HB: Language-Aware LLM-Guided Hotword Biasing for Code-Switching ASR](he26c_interspeech.md) — same problem · relatedness 2.4/3
- [Improving Code-Switching ASR with Code-Mixing Guided Synthetic Speech](heng26_interspeech.md) — same problem · relatedness 2.4/3
- [Adding Robust Code-Switching Capabilities to High Performance Multilingual ASR](ugan26_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
