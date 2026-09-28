---
id: han26d_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2107
---

# Imitation Learning for Elder-Facing Speech Synthesis

**TL;DR** — A TTS training method that learns from expert demonstrations rather than costly older-adult preference collection, using an improved GRPO to avoid reward hacking and better serve age-related listening needs.

## Problem

TTS systems are designed for general adults and overlook older adults' age-related sensory and cognitive comprehension needs; collecting enough preference feedback from older adults is costly since they fatigue quickly during collection.

## Method

Proposes an imitation learning framework that learns TTS models from expert demonstrations, plus a two-stage on-policy reward learning (OPRL) extension to Group Relative Policy Optimization (GRPO) to mitigate reward hacking under limited supervision.

## Results

GRPO with OPRL outperforms plain GRPO and supervised baselines on both objective and subjective metrics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Accessibility-focused TTS for elderly users, assistive devices, and audiobooks or announcements tuned for age-related hearing decline.

## Related

- (link related pages by id as the wiki grows)
