---
id: tsoi26_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1053
---

# Next-Turn: Duration-Aware Streaming Endpoint Detection via Time-to-Next-Speech-Onset Prediction

**TL;DR** — Next-Turn trains streaming endpoint detection using time-to-next-speech-onset, a target derived automatically from speech timestamps, giving a large accuracy boost over standard acoustic and semantic endpoint detectors, especially as pauses get longer.

## Problem

Reliable endpoint detection for natural turn-taking in streaming speech systems is hard because speakers often pause mid-utterance from hesitation or disfluency, and recent semantic endpoint detection approaches are hindered by ambiguous supervision and strict streaming constraints.

## Method

Next-Turn trains on the time until the next speech onset as its objective, with targets derived directly from speech timestamps requiring no manual annotation, and is trained jointly with a standard binary endpoint-detection objective.

## Results

Next-Turn outperforms conventional acoustic and recent semantic endpoint-detection baselines, achieving a 25.9-point absolute improvement in endpoint accuracy within 320ms over the strongest baseline, with gains that grow as pauses get longer.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More natural turn-taking in streaming voice assistants and spoken dialogue systems, reducing premature cutoffs during hesitant speech.

## Related

- (link related pages by id as the wiki grows)
