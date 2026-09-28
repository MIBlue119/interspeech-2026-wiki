---
id: mehlman26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2851
pdf: https://www.isca-archive.org/interspeech_2026/mehlman26_interspeech.pdf
---

# Speech Entrainment in Multi-Party Conversations with a Digital Agent

[PDF](https://www.isca-archive.org/interspeech_2026/mehlman26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mehlman26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2851)

**TL;DR** — This paper analyzes local and global conversational entrainment in a novel dataset of multi-party human groups interacting with an animated digital agent, revealing that humans entrain strongly with each other but display limited entrainment toward the non-human agent.

## Problem

Prior conversational entrainment research has been almost exclusively limited to dyadic human-to-human interactions. As voice-based AI and digital agents increasingly participate in complex multi-party and multi-age settings, it is critical to understand how non-human participants modulate conversational dynamics. Without this knowledge, designing agents that effectively build rapport and communicate smoothly across diverse cohorts remains challenging.

## Method

The authors collected a novel dataset comprising 30 adult sessions (337.6 minutes total) and 28 family sessions with children aged 8-14 (65.9 minutes total) engaging in 8-12 minute multi-party conversations (2-6 speakers) with an animated digital agent using a Wizard-of-Oz setup. They analyzed entrainment across both timescales (local turn-level vs. global session-level) and interaction modes (participant-to-participant, child-to-guardian, and participant-to-agent). Features extracted include handcrafted acoustic properties (RMS amplitude via root-mean-square, pitch/F0 via PESTO, and emotion arousal/valence/dominance via VoxProfile) alongside deep learning representations from speech foundation models (VoxProfile emotion model embeddings, Whisper-base encoder embeddings, and Mimi neural codec latent embeddings). Mixed-effects regression models with speaker-pair random intercepts were used to quantify entrainment effects, applying Bonferroni corrections for multiple testing.

## Results

Adults exhibited robust local participant-to-participant entrainment across nearly all features, including amplitude, pitch, emotion, and deep learning embeddings (p < 0.0001). Family sessions showed no local amplitude or pitch entrainment, but did demonstrate significant local emotional and foundation-model embedding entrainment between participants and within child-guardian pairs. Crucially, neither adults nor families showed significant local or global entrainment toward the digital agent. Post-interaction surveys indicated that 70% of adults perceived good group rapport and 62% felt in sync, confirming that humans distinguish non-human agents from human interlocutors during rapport-building.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers designing social conversational agents, multi-party dialogue systems, and educational or tutoring technologies for mixed-age or family environments.

## Limitations

The dataset scope is restricted to English-speaking participants in a controlled Wizard-of-Oz scenario featuring an alien persona, which may bias user accommodation behaviors.

## Related

- (link related pages by id as the wiki grows)
