---
id: ye26c_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2667
pdf: https://www.isca-archive.org/interspeech_2026/ye26c_interspeech.pdf
---

# Reinforcement Learning for Data-Efficient Code-Switched ASR

[PDF](https://www.isca-archive.org/interspeech_2026/ye26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ye26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2667)

**TL;DR** — Applying reinforcement learning with verifiable rewards and a script fidelity penalty enables an audio-language model trained on only 10% code-switched TTS data to match full-dataset LoRA supervised fine-tuning.

## Problem

Speech-augmented large language models struggle with code-switched automatic speech recognition because standard cross-entropy training suffers from exposure bias and fails to directly optimize sequence-level metrics like character error rate. This limitation is severely magnified at language boundaries, where models frequently exhibit language confusion, translation errors, and script hallucinations. Furthermore, collecting large-scale human-recorded code-switched training data is expensive and scarce.

## Method

The approach frames code-switched ASR as a verifiable reward problem using Group Relative Policy Optimization on Qwen2-Audio-7B-Instruct, freezing the Whisper audio encoder and training the LLM decoder. The reward combines a negative character error rate term with a script fidelity reward bonus that penalizes characters from writing systems outside the allowed language pair. A training-time two-pass draft-and-refinement procedure samples multiple draft transcripts in a first pass, selects the highest-reward draft, and conditions a second GRPO pass on both the audio and the draft to enforce self-correction. Training uses 10% to 20% of the CS-FLEURS XTTS-TRAIN split (2,310 to 4,625 utterances across 10 language pairs) for 4 to 8 epochs with DeepSpeed ZeRO-2.

## Results

Evaluated on the human-read CS-FLEURS test split and zero-shot transferred to the human-recorded SwitchLingua corpus across 10 language pairs. With only 20% training data, the two-pass RLVR model achieves a micro-averaged character error rate of 0.147, outperforming 100% LoRA SFT at 0.159 while using five times less data. The script fidelity reward substantially drops script hallucinations from 0.068 down to 0.025 at 10% data without harming error rates. The error rate reward completely eliminates unintended translations of inserted words, while the two-pass refinement yields consistent gains over single-pass variants.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and practitioners developing multilingual speech recognition systems or deploying audio-language models for code-mixed conversational interfaces.

## Limitations

Evaluated exclusively on 10 language pairs supported by the base Qwen2-Audio model that involve English as one of the constituent languages.

## Related

- (link related pages by id as the wiki grows)
