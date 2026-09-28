---
id: daoxuanquang26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1542
---

# M-LAMA: Multimodal Automated Scoring of Long-form Spoken English

**TL;DR** — A multimodal scoring model for multi-minute spoken English exam responses that fuses raw audio, ASR transcripts, and question context to grade delivery, language, and content together.

## Problem

Automatic speech assessment research mostly targets short utterances, leaving reliable scoring of extended, spontaneous multi-minute exam responses across acoustic, linguistic, and task-fulfillment criteria underexplored.

## Method

M-LAMA uses dual encoders and a discourse-aware fusion decoder over audio, transcript, and question context, with part-based audio structuring and a three-stage training strategy to handle the bell-curve score distribution of high-stakes exams.

## Results

On 87,226 full-length exam sessions, structured multimodal alignment substantially improves scoring reliability across five grading criteria compared to simpler approaches.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated grading for large-scale English proficiency exams, particularly the speaking sections of standardized tests.

## Related

- (link related pages by id as the wiki grows)
