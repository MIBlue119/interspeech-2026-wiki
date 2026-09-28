---
id: zhang26ea_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2364
pdf: https://www.isca-archive.org/interspeech_2026/zhang26ea_interspeech.pdf
---

# AcoustEmo: An Utterance-Aware Acoustic Q-Former for Open-Vocabulary Emotion Reasoning

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26ea_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26ea_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2364)

**TL;DR** — AcoustEmo is a time-sensitive multimodal large language model featuring an utterance-aware acoustic Q-Former that improves open-vocabulary emotion reasoning by capturing fine-grained local acoustic dynamics, achieving 67.55% average accuracy on the EMER-Fine test set.

## Problem

Current multimodal large language models rely on global audio encoders that compress entire audio tracks into coarse representations, which smooths out transient paralinguistic cues such as micro-prosody and intonation shifts. This limitation impairs their ability to perform complex, open-vocabulary emotion reasoning in video dialogues. Addressing this gap is crucial for building accurate empathetic conversational agents and mental health monitoring tools.

## Method

The model uses LLaMA-2 (7B) as its backbone and integrates frozen visual and acoustic encoders with a novel Utterance-Aware Acoustic Q-Former. A timestamp-synchronized sliding window maps continuous audio features to discrete utterance boundaries provided by transcriptions, ensuring semantic alignment without arbitrary word truncation. Within each window, learnable query tokens extract 32 segment-level acoustic features via cross-attention, while a parallel global Q-Former retains holistic context. The combined multi-scale tokens, visual tokens, and instruction prompts are fed into the LLM, which is fine-tuned using LoRA (r=32, alpha=32) for 3 epochs with the AdamW optimizer.

## Results

Evaluated on the EMER-Fine test set, AcoustEmo achieves an average accuracy of 67.55% and recall of 70.15%, outperforming baseline models such as AffectGPT (61.75% avg) and MicroEmo (66.21% avg). An ablation study confirms the necessity of individual components: removing the utterance-aware Q-Former drops average accuracy to 61.20%, replacing timestamp-synchronized windows with fixed 2-second windows lowers it to 62.85%, and removing the global acoustic Q-Former decreases it to 64.10%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building empathetic conversational agents, advanced human-computer interaction systems, and automated mental health monitoring tools.

## Limitations

The approach relies on pre-computed utterance-level transcription timestamps to synchronize the sliding audio windows.

## Related

- (link related pages by id as the wiki grows)
