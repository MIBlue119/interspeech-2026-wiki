---
id: kim26y_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3442
pdf: https://www.isca-archive.org/interspeech_2026/kim26y_interspeech.pdf
---

# VividAC: Visually Informed and Visually Interacted Audio Captioning for Enhancing Audio-Visual Question Answering

[PDF](https://www.isca-archive.org/interspeech_2026/kim26y_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26y_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3442)

**TL;DR** — VividAC is a training-free, cascaded multi-agent framework that generates visually contextualized audio captions through natural-language communication, outperforming the strongest end-to-end Audio-Visual LLM on MUSIC-AVQA by 7.0%p overall accuracy.

## Problem

Integrating audio and visual information for joint reasoning remains a significant challenge in Audio-Visual Question Answering (AVQA), frequently causing models to underutilize or misinterpret the audio modality. While textual audio captions can theoretically unlock large language model reasoning, naive audio captions often degrade performance because they are inconsistent with the visual scene, lack task-relevant details, and can even contradict visual frames and questions.

## Method

VividAC implements a cascaded, zero-shot pipeline using off-the-shelf vision-language models (VLMs) and audio language models (ALMs) without any joint audio-visual training. First, a Visual Agent generates a query-relevant video description guided by noun phrases extracted from the user question via spaCy. To prevent error propagation, candidate visual nouns from this video caption are filtered using a CLIP text encoder similarity threshold against question nouns (tau = 0.8). These refined visual keywords are then passed alongside the audio file to an Audial Agent (Qwen2-Audio-7B-Instruct) to synthesize a visually contextualized audio caption. Finally, a reasoning LLM (such as Llama-3.1, Qwen2.5, or Mistral) ingests these captions to predict the final answer.

## Results

Evaluated on the MUSIC-AVQA test split (9,192 QA pairs across 6,399 samples), VividAC is tested across 12 combinations of 4 visual agents (VideoChat-R1-7B, Qwen2.5-VL 3B/7B, InternVL2.5-8B) and 3 reasoning LLMs, outperforming naive caption baselines in 11 of 12 configurations with accuracy gains reaching up to 11.01%p. When using Qwen2.5-7B, VividAC reaches 59.91% overall accuracy, surpassing the Video-SALMONN end-to-end baseline by 7.0%p. Ablations confirm that Vision-to-Audio directionality outperforms Audio-to-Vision (58.18% vs 52.54% with Mistral), and caption filtering prevents misidentifications (such as confusing a conga for a generic drum).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building multimodal systems, video understanding agents, and audio-visual question answering pipelines can use this training-free framework to enhance cross-modal reasoning.

## Limitations

The framework relies on cascaded text communication between separate models, which carries an inherent risk of error propagation from the initial video captioning stage despite mitigation via keyword filtering.

## Related

- (link related pages by id as the wiki grows)
