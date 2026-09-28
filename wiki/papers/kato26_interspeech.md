---
id: kato26_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: abstract-only
source: https://www.isca-archive.org/interspeech_2026/kato26_interspeech.html
---

# Coco-VC: Degradation-Robust Streaming Voice Conversion System on the Listener Side

**TL;DR** — A real-time voice conversion system deployed on the listener's side of a phone call, trained with telephony data augmentation and multi-teacher distillation, keeps voices clear even over degraded lines.

## Problem

In telephone conversations, speakers cannot know how clearly their voice reaches the listener, and naturalness degrades not just from the acoustic/communication channel but from the speaker's own unintelligible timbre.

## Method

The authors build Coco-VC, a real-time streaming voice conversion system meant to run on the listener side, trained with telephony-specific data augmentation and multi-teacher distillation to extract robust representations; an interactive demo shows low-latency conversion on a standard laptop with a GUI for switching VC settings.

## Results

Experimental evaluation shows Coco-VC maintains high quality even for degraded telephony speech, compared to existing streaming VC systems.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Listener-side voice enhancement for phone/VoIP calls where the incoming signal is degraded by the network or the speaker's own voice quality.

## Related

- (link related pages by id as the wiki grows)
