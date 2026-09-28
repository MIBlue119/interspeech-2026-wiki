---
id: tang26b_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1627
pdf: https://www.isca-archive.org/interspeech_2026/tang26b_interspeech.pdf
---

# DeSRPA: Decoupled Speech Role-Playing Agent via Inference-Time Intervention

[PDF](https://www.isca-archive.org/interspeech_2026/tang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1627)

**TL;DR** — DeSRPA introduces a training-free framework for speech role-playing agents using dual-level inference-time intervention on frozen LLM and TTS backbones, outperforming end-to-end fine-tuned baselines in personality and emotional consistency.

## Problem

Current speech role-playing agents rely heavily on end-to-end supervised fine-tuning, which suffers from a generalization trap on unseen characters and a modality alignment tax that degrades core LLM reasoning capabilities. Meanwhile, conventional cascaded pipelines break down due to semantic-acoustic misalignment because standard text-to-speech modules drop dynamic emotional context. This separation prevents agents from maintaining robust character traits alongside natural paralinguistic expression.

## Method

The proposed DeSRPA framework uses a frozen 4-billion-parameter Qwen3 LLM as the cognitive brain and a frozen StyleTTS 2 module for expressive rendering, avoiding weight updates entirely. For cognitive steering, sparse autoencoders inject personality base, contextual activation, and linguistic style vectors directly into layers 15 and 20 of the LLM residual stream. For external expressive rendering, emotion-aware acoustic control vectors are derived via style subtraction using parallel emotional corpora (ESD and CREMA-D) filtered by emotion2vec scores above 0.90. Finally, a dual-path fusion strategy modulates the style space and uses a diffusion sampler with style interpolation to synthesize character-consistent speech.

## Results

Evaluated on the SpeechRole dataset across 72 characters, DeSRPA achieved a mean multimodal judge score of 0.8379, outperforming open-source end-to-end models like SpeechRole and LLaMA-Omni while closely trailing GPT-4o Audio. It attained strong objective scores including a speaker similarity (SIM) above 0.85 and competitive word error rates. Ablations omitting the control vectors demonstrated significant drops in prosodic consistency and emotion appropriateness, validating the necessity of both internal and external steering components.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building interactive voice assistants, video game NPCs, or conversational agents requiring deep character personality and emotional consistency without expensive fine-tuning.

## Limitations

The framework relies on pre-extracted style vectors and emotion tags from a frozen TTS setup, meaning highly novel acoustic styles outside the vector bank bounds cannot be generated without expanding the reference set.

## Related

- (link related pages by id as the wiki grows)
