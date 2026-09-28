---
id: rackauckas26b_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/rackauckas26b_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/rackauckas26b_interspeech.pdf
---

# A Speech-First Character Interface for Stylized Japanese Dialogue Practice

[PDF](https://www.isca-archive.org/interspeech_2026/rackauckas26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rackauckas26b_interspeech.html)

**TL;DR** — Jouzu is a mobile demonstration system for Japanese language practice that integrates persona-conditioned LLM dialogue, expressive Style-BERT-VITS2 voice synthesis, and interactive vocabulary scaffolding.

## Problem

Traditional language-learning chatbots typically act as neutral tutors, failing to expose learners to the rich diversity of Japanese character language where register, wording, and sentence-final particles signal personality and social role. Because connecting these stylistic elements to pronunciation and written forms is difficult through text alone, learners need immersive spoken interfaces that embody distinct personas. However, effectively combining real-time LLM generation, character-specific voice synthesis, and low-friction vocabulary support into a cohesive live interaction loop remains a design challenge.

## Method

The Jouzu system uses persona-conditioned LLM prompting, where each character profile contains customized style instructions and verified sample lines to govern lexical choices and sentence-final forms. Responses are synthesized into expressive character audio using fine-tuned models based on the Style-BERT-VITS2 JP Extra architecture, trained on professional voice actor recordings. The mobile frontend provides a unified chat interface supporting typed or spoken prompts, audio playback, multi-character comparison, and a tap-based word inspector supplying furigana, romaji, and English definitions. The live demo pipeline is structured to execute core text-to-speech loops within one minute, while accommodating noisy booth conditions through robust fallback paths.

## Results

The paper presents a system demonstration and interaction workflow rather than a quantitative evaluation of model performance. The underlying expressive TTS pipeline relies on prior findings showing that Style-BERT-VITS2 JP Extra produces Japanese speech with no significant average difference from native ground truth. The demonstration showcases completed interaction loops within a one-minute timeframe, including character selection, prompt submission, stylized voice playback, and in-place vocabulary inspection across multiple personas.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Language learners practicing Japanese conversation and listening comprehension who want to experience diverse social registers and fictional personas.

## Limitations

The system utilizes stylized fictional characters whose linguistic forms are expressive and culturally recognizable, but explicitly not suitable for formal, real-world conversation.

## Related

- (link related pages by id as the wiki grows)
