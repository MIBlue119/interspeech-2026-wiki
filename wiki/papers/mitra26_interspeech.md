---
id: mitra26_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2493
---

# Adaptive Turn-Taking for Real-time Multi-Party Voice Agents

**TL;DR** — A streaming speech-LLM voice agent that conditions its turn-taking behavior on its assigned conversational role, with optional chain-of-thought reasoning, cuts false-positive interruptions while sharply improving turn-taking precision and recall.

## Problem

Turn-taking in multi-party spoken conversations is a fundamental challenge for voice agents, especially under dynamic floor competition and varying user expectations, and prior systems don't condition their turn-taking behavior on an explicit conversational role.

## Method

The authors propose ModeratorLM, a role-playing voice agent built on a chunk-wise streaming speech LLM that conditions turn-taking on an explicitly assigned role, plus a reasoning-augmented variant with chain-of-thought over conversational context and role; they also build RolePlayConv, a large synthetic dataset of spoken multi-party conversations with diverse assistant roles.

## Results

On real-world meeting data and RolePlayConv, the approach improves turn-taking precision by over 40% and recall by more than 70%, while substantially reducing false-positive interruptions compared to non-role-conditioned baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multi-party voice assistants and meeting agents (e.g. moderating group calls) that need to know when to speak and when to yield the floor.

## Related

- (link related pages by id as the wiki grows)
