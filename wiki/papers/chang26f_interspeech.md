---
id: chang26f_interspeech
category: dataset
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2367
pdf: https://www.isca-archive.org/interspeech_2026/chang26f_interspeech.pdf
---

# VIP-MINGLE: A Corpus for Videoconference and In-Person Multimodal Interaction in Group Language Engagement

[PDF](https://www.isca-archive.org/interspeech_2026/chang26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chang26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2367)

**TL;DR** — VIP-MINGLE is a 59-hour multimodal corpus featuring paired in-person and videoconference group conversations that exposes significant behavioral distribution shifts across settings.

## Problem

Prior conversational datasets are typically isolated within either in-person or remote settings, hindering the development of models that bridge the domain shift between physical and virtual communication. Because videoconferencing fundamentally alters human interaction rather than simply degrading signal quality, controlled cross-setting data is required to isolate medium effects from speaker and task variations.

## Method

The corpus uses a counterbalanced, within-subjects design where 32 groups (105 participants) complete identical collaborative Family Feud-style tasks in both in-person and videoconferencing environments. The processing pipeline extracts raw audio and video, applies the pyannote speaker diarization pipeline and Whisper (large) for speech transcription, and utilizes OpenFace and DeepFace for 3D head pose, gaze, action units, and emotion probabilities. Supplementary 360-degree video and pre-session psychometric inventories (Big Five personality and PANAS mood scales) are also collected, alongside 7,077 crowdsourced human annotations rated on a 5-point Likert scale.

## Results

Covering 59 hours of recordings with an average session duration of 21 minutes, pairwise analyses show that videoconference sessions exhibit significantly longer turn-taking gaps (beta = 0.113, p = 0.037) and shorter utterance durations (beta = -0.094, p < 0.001) compared to in-person sessions. Syntactic complexity measured via Mean Dependency Distance is significantly higher in-person (p = 0.017), and facial expressions display distinct setting-specific patterns with greater overall positive emotion salience in-person. Human ratings reveal that in-person conversations receive significantly higher enjoyment scores (p = 0.001) and feature more frequent interruptions and gaps, whereas remote sessions are more uneventful.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers studying multimodal machine learning, multiparty conversation dynamics, and conversational AI can use this corpus to build domain-aware models and improve videoconferencing systems.

## Limitations

The conversations rely on a specific semi-structured family feud game task, which may not fully generalize to all conversational formats.

## Related

- (link related pages by id as the wiki grows)
