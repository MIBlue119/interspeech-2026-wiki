---
id: mou26b_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2312
---

# Dynamic Prosody Prediction in LLM-based TTS for Improving Speaker Similarity

**TL;DR** — Predicting each syllable's prosody based on the speech already generated so far, instead of ignoring style-specific prosodic patterns, improves speaker similarity in LLM-based voice cloning TTS.

## Problem

Personalized TTS aims to clone a target speaker's voice and speaking style, but current LLM-based TTS methods ignore style-specific prosodic patterns during generation, limiting how similar the synthesized speech sounds to the target speaker.

## Method

The authors condition prosody learning on the synthesized speech itself, predicting the prosody of the current syllable based on previously predicted speech, rather than treating prosody as independent of generation history.

## Results

Across three datasets, the dynamic prosody prediction method improves prosody learning capability and thereby improves speaker similarity of generated speech.

## Code

None released (as of this page's `updated` date). Audio samples: https://muzw.github.io/dynapros/

## Applications

Voice-cloning and personalized TTS systems needing to better preserve a target speaker's distinctive prosodic style.

## Related

- (link related pages by id as the wiki grows)
