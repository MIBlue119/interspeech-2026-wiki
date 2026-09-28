---
id: gan26_interspeech
category: l2-acquisition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2605
pdf: https://www.isca-archive.org/interspeech_2026/gan26_interspeech.pdf
---

# L2 Speakers Accommodate Differently to AI and Human Voices Across Phonetic Features

[PDF](https://www.isca-archive.org/interspeech_2026/gan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2605)

**TL;DR** — This study investigates how L2 English learners accommodate their phonetic patterns when shadowing a neural TTS voice versus a native human voice, finding that convergence is feature-dependent with human voices eliciting stronger VOT alignment and AI voices eliciting greater vowel-duration and intensity-rhythm adjustment.

## Problem

While phonetic accommodation to human versus AI voices is well-studied in native speakers, research has almost entirely ignored second language (L2) populations whose developing phonological systems make accommodation a key mechanism for language acquisition. As synthetic text-to-speech (TTS) systems are increasingly deployed in language learning applications, it remains unknown whether L2 learners respond to AI voice input in the same way as human input. This knowledge gap hinders the effective pedagogical design of voice-AI tools for pronunciation training.

## Method

The authors conducted a within-participant crossover shadowing experiment with 28 female L1 Mandarin learners of English (B2 proficiency). Participants shadowed 47 sentences from the ALLSSTAR corpus produced by two female voices: a native human speaker and a neural TTS voice (Microsoft Azure 'en-US-LunaNeural'). Acoustic analyses measured stop-consonant voice onset time (VOT), the tense-lax vowel contrast (/i/-/I/) through duration ratio (DR) and spectral distance (SD), and duration- and intensity-based speech rhythm metrics. Difference-in-distance (DID) metrics quantifying convergence were analyzed using linear mixed-effects models controlling for baseline-to-model distance and speech rate.

## Results

Evaluating 3,945 sentence-level clips across two sessions, participants showed significantly stronger VOT convergence toward the human voice than the AI voice (p = .008). Conversely, accommodation in vowel duration ratio (DR) was significantly stronger in the AI condition (p < .001), while vowel spectral distance (SD) showed no reliable difference between voices (p = .470). For speech rhythm, intensity-based metrics revealed a reliable AI advantage showing stronger adjustment toward the synthetic model (p < .001), whereas duration-based rhythm metrics showed no significant model-type differences.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers, educators, and developers building AI-driven language learning platforms, pronunciation training apps, and conversational agents.

## Limitations

The study was restricted to female L1 Mandarin speakers of English shadowing female voices in a non-interactive sentence-shadowing task.

## Related

- (link related pages by id as the wiki grows)
