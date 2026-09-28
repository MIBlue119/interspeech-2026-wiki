---
id: srirag26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-819
---

# TriageSim: A Conversational Emergency Triage Simulation Framework from Structured Electronic Health Records

**TL;DR** — TriageSim generates realistic synthetic nurse-patient triage conversations (text and audio) directly from structured electronic health records, working around the regulatory barriers that normally block emergency-triage research.

## Problem

Research into emergency triage conversation is largely restricted to structured electronic health records because regulatory constraints limit access to real nurse-patient interactions, leaving conversational aspects of triage understudied.

## Method

TriageSim is a simulation framework that generates persona-conditioned, multi-turn triage conversations from structured EHR records with explicit control over disfluency and decision behavior, producing roughly 800 synthetic transcripts and matching audio, evaluated with automated linguistic/behavioral/acoustic analysis plus manual medical-fidelity review of 50 conversations.

## Results

The generated corpus supports conversational triage classification experiments, and the authors observe modest agreement on acuity levels across the three tested modalities — synthetic text, ASR transcripts, and direct audio input; code is released.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Training and evaluating conversational triage and clinical dialogue systems without needing direct access to real patient conversations.

## Related

- (link related pages by id as the wiki grows)
