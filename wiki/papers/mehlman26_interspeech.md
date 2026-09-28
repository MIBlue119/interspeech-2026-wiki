---
id: mehlman26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2851
pdf: https://www.isca-archive.org/interspeech_2026/mehlman26_interspeech.pdf
---

# Speech Entrainment in Multi-Party Conversations with a Digital Agent

*Nicholas Mehlman, Kaitlin Zareno, Kleanthis Avramidis, Anfeng Xu, Shrikanth Narayanan*

[PDF](https://www.isca-archive.org/interspeech_2026/mehlman26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mehlman26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2851)

**TL;DR** — This paper investigates conversational entrainment in a multi-party setting involving humans and a digital agent, revealing that while adults show robust local human-to-human entrainment, global entrainment and entrainment with the agent are minimal and cohort-dependent. Only children demonstrate long-term semantic entrainment toward the digital agent.

## Key contributions

- Collected and analyzed a unique dataset of multi-party conversations (adult cohorts and parent/child family cohorts) interacting with an animated digital agent using a Wizard of Oz setup.
- Formulated and tested two temporal hypotheses of conversational entrainment: local (within-turn style alignment) and global (long-term session convergence).
- Evaluated a comprehensive suite of representations spanning handcrafted acoustic features (RMS amplitude, PESTO pitch), emotion models (VoxProfile), and speech foundation models (Whisper-base, Moshi/Mimi).
- Discovered that adults exhibit strong local entrainment across almost all speech features, whereas children primarily track high-level emotional and semantic cues rather than pitch or amplitude.

## Problem

Prior research on conversational entrainment has been predominantly restricted to dyadic human-to-human interactions, ignoring how speech style adaptation functions in complex multi-party environments or when non-human digital agents participate. Existing studies typically look at isolated features or single conversational timescales, leaving a gap in understanding how age (e.g., adults versus children) and interaction structure modulate entrainment. This matters because voice-based AI is increasingly entering multi-user contexts, and designing effective, natural conversational agents requires knowing whether and how humans adapt their speech when interacting alongside them.

## Method

The authors collected 30 adult sessions and 10 family sessions (children aged 8-14) where participants engaged in 8-12 minute multi-party conversations with a digital agent acting as an alien with nefarious plans. The agent's utterances were triggered via a Wizard of Oz setup using a dialog tree, and single-channel beamformed audio was segmented per speaker with non-speech intervals replaced by silence. Conversations were partitioned into turns consisting of an agent prompt followed by participant responses.

To analyze entrainment, features were extracted across three tiers: (1) handcrafted amplitude (frame-level RMS statistics: mean, std, min, max, range) and pitch features using PESTO; (2) emotion values (arousal, valence, dominance) and penultimate layer embeddings from VoxProfile (averaging Whisper- and WavLM-based models); and (3) speech foundation models, extracting encoder representations from Whisper-base (averaged across time for semantic attributes) and Mimi/Moshi neural codecs sampled at 24 kHz (averaged across time for phonetic attributes). 

Two interaction timescales were modeled using mixed-effects regression models with random intercepts for each session/speaker-pair combination. Local entrainment tested if within-turn feature differences were significantly smaller than cross-turn differences (measured by coefficient gamma). Global entrainment tested whether feature differences in the final 5 turns were smaller than in the first 5 turns, or specifically evaluated children-to-agent (C2A) shifts over time. Bonferroni corrections were applied within feature categories to control for multiple testing.

## Experimental setup

The dataset comprises 30 adult sessions (median 24.5 turns/session, total 337.61 minutes, 2-6 speakers) and 10 family sessions with children aged 8-14 (median 28 turns/session, total 65.88 minutes, 2-3 speakers). The evaluation relies on mixed-effects regression coefficients (gamma) and p-values corrected via the Bonferroni method across handcrafted amplitude, pitch, emotion, and foundation model (Whisper, Mimi) distance metrics ($L_2$ and cosine distance). Notable implementation details include open-source models (PESTO, VoxProfile, Whisper-base, Moshi/Mimi codec) and statistical modeling of paired utterance differences.

## Results

Adult participants exhibited strong local entrainment (P2P), showing statistically significant within-turn convergence across amplitude means (gamma = -0.0091, p < 0.0001), pitch range (gamma = -81.736, p = 0.0047), emotional arousal/dominance, and deep learning embeddings (Whisper cosine distance gamma = -0.0134, p < 0.0001; Mimi cosine distance gamma = -0.0287, p < 0.0001). Families showed no local amplitude or pitch entrainment, but did exhibit local emotional and deep learning feature alignment between humans (P2P) and between children and guardians (C2G, e.g., emotion cosine distance gamma = -0.0557, p = 0.0055). Globally, adult P2P entrainment was minimal, restricted to mean pitch and Mimi phonetic embeddings, while family P2P global entrainment was non-existent. Notably, children showed global semantic entrainment to the digital agent (C2A Whisper cosine distance gamma = -0.0189, p = 0.0330), though their amplitude metrics increased over time (gamma > 0), reflecting growing confidence rather than true acoustic entrainment.

## Limitations

The study is constrained by a modest sample size, particularly in the family cohort (only 10 sessions), which limits statistical power for detecting subtle global entrainment effects. The interaction paradigm was highly structured and hierarchical, with the agent acting exclusively in an interviewing role, restricting generalization to spontaneous, unconstrained multi-party conversations. Furthermore, pre-experiment familiarity (adults spending ~10 minutes together before recording and families traveling together) likely induced baseline synchrony that masked global entrainment trends.

## Why read this

Speech and ML researchers designing multi-party conversational AI agents should read this paper to understand how human-agent entrainment deviates from human-human baselines and varies across age groups. It provides concrete statistical evidence that users do not instinctively entrain acoustically with digital agents, and highlights how children interact with non-human interlocutors over time.

## Code

- https://github.com/kyutai-labs/moshiko-pytorch-bf16

## Applications

Designing multi-party conversational virtual assistants, social robots, educational digital tutors, and interactive family-oriented entertainment systems.

## Related

- (link related pages by id as the wiki grows)
