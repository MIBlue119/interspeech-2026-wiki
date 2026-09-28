---
id: park26c_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-952
---

# LoRA-Tuned Large Language Models for Dementia Detection via Multi-View Speech-Derived Features

**TL;DR** — A LoRA-tuned LLM that reasons jointly over four different speech-derived signals in one unified prompt, reaching 90.14% F1 for dementia detection from spontaneous speech without needing separate modality-specific encoders.

## Problem

Spontaneous speech is a promising non-invasive dementia screening modality, but conventional approaches focus on a single representational dimension, such as acoustics or ASR transcripts, limiting integrative reasoning across heterogeneous cognitive symptoms.

## Method

Encodes four complementary speech-derived signals, ASR transcripts with pause markers, discourse-level topic cues, temporal fluency statistics, and phonological sequences, into a unified prompt, letting a single LoRA-tuned LLM learn a coherent decision function without modality-specific encoders or late-stage fusion.

## Results

On ADReSSo, the best model achieves an F1-score of 90.14%, with ablations confirming each of the four views contributes complementary information.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Non-invasive, LLM-based early dementia screening tools from spontaneous conversational speech.

## Related

- (link related pages by id as the wiki grows)
