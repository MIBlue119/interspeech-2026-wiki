---
id: kuzmin26b_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3181
---

# Privacy-Preserving End-to-End Full-Duplex Speech Dialogue Models

**TL;DR** — Shows that always-on full-duplex speech dialogue models like SALM-Duplex and Moshi leak substantial speaker identity from their hidden states, then proposes streaming anonymization methods that sharply cut this leakage.

## Problem

End-to-end full-duplex speech dialogue models feed raw user audio continuously through an always-on LLM backbone, but whether their internal hidden representations leak speaker identity had not been examined.

## Method

Following the VoicePrivacy 2024 protocol with a lazy-informed attacker, the authors probe layer-wise and turn-wise speaker leakage in SALM-Duplex and Moshi, then propose Stream-Voice-Anon in two variants: a waveform-level front-end (Anon-W2W) and a feature-domain replacement (Anon-W2F).

## Results

Speaker identity leaks persist across probed layers (concentrated early for SALM-Duplex, uniform for Moshi) and rise sharply within the first few conversational turns; Anon-W2F raises EER from 11.2% to 41.0% (over 3.5x, near the 50% chance ceiling) while Anon-W2W keeps 78-93% of baseline semantic similarity with sub-800ms first-response latency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy-preserving deployment of always-on full-duplex speech dialogue assistants where continuous audio streaming risks leaking user identity.

## Related

- (link related pages by id as the wiki grows)
