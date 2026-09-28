---
id: ren26c_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1117
pdf: https://www.isca-archive.org/interspeech_2026/ren26c_interspeech.pdf
---

# Adapting Audio Large Language Models for Speaker Verification

[PDF](https://www.isca-archive.org/interspeech_2026/ren26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ren26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1117)

**TL;DR** — This paper adapts Audio Large Language Models for speaker verification by reformulating it as an audio question-answering task and applying lightweight LoRA fine-tuning with hard pair sampling.

## Problem

Current Audio Large Language Models exhibit limited zero-shot speaker verification capabilities, performing near chance level in complex acoustic environments such as cross-device and cross-dialect scenarios. Developing robustness is critical because interactive ALLM-based systems remain largely insensitive to individual speaker identity during dialogue.

## Method

The authors reformulate speaker verification and text-dependent speaker verification as audio question-answering tasks, evaluating prompt formats including separate utterances, concatenation, concatenation with silence, and mixing. They employ Low-Rank Adaptation with rank 16 and alpha 32 on 7B parameter foundation models like Kimi-Audio, Qwen2-Audio, and MiMo-Audio, updating 18M trainable parameters. Training utilizes a rule-based hard pair sampling strategy covering challenging dimensions like age, gender, device, and dialect over 9 million training pairs from VoxCeleb2, CN-Celeb, and 3D-Speaker.

## Results

Zero-shot evaluation shows concatenation with silence performs best, but accuracy remains weak under complex conditions (e.g., ~50-60% across diverse challenge sets). Supervised fine-tuning of Kimi-Audio dramatically reduces EERs down to 4.87% on gender and 2.93% on language conditions. Ablations confirm that replacing hard pair sampling with random sampling degrades dialect EER from 10.93% to 15.40%. For text-dependent verification on LibriSpeech, the fine-tuned ALLM achieves performance competitive with conventional cascaded ASR-SV systems while preserving general audio understanding.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building unified spoken dialogue systems, conversational voice assistants, or multimodal audio models requiring integrated speaker verification and text-dependent authentication.

## Limitations

A performance gap still remains between fine-tuned ALLMs and highly optimized conventional task-specific speaker verification models.

## Related

- (link related pages by id as the wiki grows)
