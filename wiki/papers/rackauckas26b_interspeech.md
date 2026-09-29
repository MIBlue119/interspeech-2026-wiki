---
id: rackauckas26b_interspeech
category: speech-llm-dialogue
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/rackauckas26b_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/rackauckas26b_interspeech.pdf
---

# A Speech-First Character Interface for Stylized Japanese Dialogue Practice

*Zackary Rackauckas*

[PDF](https://www.isca-archive.org/interspeech_2026/rackauckas26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rackauckas26b_interspeech.html)

**Category:** `speech-llm-dialogue` · **Labels:** `generative-model`

**TL;DR** — We present Jouzu, a mobile Show & Tell demonstration of expressive persona-conditioned spoken interaction for Japanese language practice featuring style-conditioned LLM dialogue and voice synthesis.

## Key contributions

- A speech-first character interface combining LLM-based dialogue with persona-specific voice synthesis using Style-BERT-VITS2.
- A direct comparison mode allowing users to send the same prompt to multiple fictional personas to observe variations in wording, register, and voice.
- An in-place word inspection feature providing furigana, romaji, and English definitions directly within the mobile chat UI.
- A fault-tolerant live demonstration workflow separating core audio-playback/text-input paths from optional speech recognition under noisy booth conditions.

## Problem

Spoken interaction is essential for Japanese language learners to connect written forms, pronunciation, register, and sentence-final particles, yet most existing language-learning chatbots are presented as neutral tutors. Text-only interfaces fail to convey the nuance of expressive character speech and register. Furthermore, prior systems rarely integrate multi-character comparisons and real-time vocabulary scaffolding into a single interactive mobile loop.

## Method

Jouzu utilizes persona-conditioned prompt engineering where each character is backed by a short profile, style instructions, and native-speaker-verified sample lines to constrain conversational style and sentence-final forms.

The generated Japanese text is synthesized into expressive audio using fine-tuned character-specific models built on top of the pretrained Style-BERT-VITS2 JP Extra model, leveraging recordings from professional Japanese voice actors. The mobile interface binds audio playback controls directly to the text transcript.

For input and support, the system accepts typed or spoken prompts and features a tap-based word inspection tool that instantly surfaces furigana, romaji, and English definitions without breaking the chat flow.

## Experimental setup

The system runs on a mobile interface demonstrating live interactive latency under one minute per multi-character exchange. It utilizes Style-BERT-VITS2 JP Extra fine-tuned on professional Japanese voice actor recordings. Evaluations and baselines are omitted here as this is strictly a demonstration paper, with user-study methodology and learning-outcome analyses delegated to a companion paper.

## Results

Because this paper presents a live mobile demonstration system rather than an empirical evaluation, explicit quantitative benchmark results, comparative metrics, or ablations are not reported in the text.

## Limitations

The system relies on fictional character registers which are explicitly not suitable for formal real-world conversation. The paper is scoped purely as a demonstration description without reporting formal user-study results or learning-outcome analyses in this text. Performance under extreme noise conditions relies on falling back from speech-input to text-input paths.

## Why read this

Speech and CALL researchers building interactive conversational agents will learn how to integrate persona-conditioned TTS pipelines, multi-agent response comparisons, and in-place scaffolding into a cohesive mobile interface.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-Assisted Language Learning (CALL) mobile applications, expressive character-based dialogue systems, and interactive spoken language practice tools.

## Institutions / 機構

RoleGaku

## Related

- (link related pages by id as the wiki grows)
