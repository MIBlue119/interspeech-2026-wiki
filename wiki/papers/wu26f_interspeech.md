---
id: wu26f_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1834
pdf: https://www.isca-archive.org/interspeech_2026/wu26f_interspeech.pdf
---

# EmoInstruct-TTS: Dual-Path Instruction-Guided Emotional Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/wu26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1834)

**TL;DR** — EmoInstruct-TTS is a dual-path instruction-guided emotional speech synthesis framework that utilizes structured semantic-acoustic emotion embeddings and flow-based modeling to improve fine-grained emotional control and speech naturalness.

## Problem

Existing instruction-driven text-to-speech systems rely on coarse emotion categories and lack explicit mechanisms to model fine-grained emotional variation and intensity, which leads to unstable control. Furthermore, natural language instructions alone often fail to capture the detailed acoustic correlates required for precise emotional expression. Solving this is vital for enhancing engagement and personalization in interactive voice agents and virtual assistants.

## Method

The framework separates semantic planning from emotion-specific acoustic control via a dual-path design. It introduces Emotion2embed, a semantic-acoustic representation covering 48 emotional states (27 categories and 21 intensity-level combinations) trained with multi-task objectives including an ordinal intensity ranking loss. To map free-form instructions to these embeddings, an Instruction-Conditioned Emotion Flow Model (ICE-Flow) is employed, combining sample-level regression supervision with covariance distribution regularization. An LLM (Qwen2.5-0.5B adapted with LoRA, 9.87M parameters) processes the instruction, content text, and emotion embedding to generate semantic tokens, which are then fed into a Conditional Flow Matching TTS (CFM-TTS) decoder and a BigVGAN neural vocoder.

## Results

Evaluated on the ESD and CNCED datasets across 21 emotion-intensity tasks and 27 fine-grained emotion tasks, EmoInstruct-TTS consistently outperforms strong baselines like CosyVoice2 and CosyVoice3 in Mean Opinion Score (MOS) and Emotion Similarity MOS (ESMOS). Specifically, it achieves a higher Emotion2embed Cosine Similarity (ECS) of 0.870 compared to baseline scores of 0.855 and 0.865 on 48-category evaluation. Ablation studies confirm that removing either the Emotion2embed component or textual instructions causes noticeable degradation in subjective naturalness and emotional similarity metrics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building conversational agents, virtual assistants, and audiobooks requiring fine-grained, instruction-guided emotional expressiveness.

## Limitations

The current framework relies on predefined emotion categories and structured intensity levels, though future work aims to support completely open-ended natural language descriptions.

## Related

- (link related pages by id as the wiki grows)
