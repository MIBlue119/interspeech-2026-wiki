---
id: yang26b_interspeech
category: source-separation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-259
---

# Enroll-on-Wakeup: A First Comparative Study of Target Speech Extraction for Seamless Interaction in Real Noisy Human-Machine Dialogue Scenarios

**TL;DR** — Proposes using the naturally spoken wake-word itself as the enrollment reference for target speech extraction, removing the need for pre-recorded enrollment speech in voice assistants.

## Problem

Target speech extraction typically needs pre-recorded high-quality enrollment speech, which disrupts user experience and limits feasibility for spontaneous human-machine interaction.

## Method

Enroll-on-Wakeup (EoW) automatically uses the wake-word segment, captured naturally during interaction, as the enrollment reference, and the paper runs the first systematic study of EoW-TSE across discriminative and generative models under real diverse acoustic conditions, including LLM-based TTS enrollment augmentation to counter the short, noisy nature of wake-word segments.

## Results

Current TSE models degrade in performance under the EoW setting, but TTS-based enrollment augmentation significantly improves listening experience, though gaps in downstream speech recognition accuracy remain.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice assistants and smart speakers that want seamless, enrollment-free target speaker extraction using just the wake word.

## Related

- (link related pages by id as the wiki grows)
