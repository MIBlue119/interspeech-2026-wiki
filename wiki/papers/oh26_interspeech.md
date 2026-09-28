---
id: oh26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-410
---

# L-Proto: Language-Aware Episodic Prototypical Training for Multilingual Speaker Verification

**TL;DR** — A training strategy that samples each episode's speakers from a single language, preventing multilingual speaker-verification embeddings from clustering by language instead of by speaker identity.

## Problem

In multilingual speaker verification, embeddings often entangle language cues with speaker identity, causing speakers to cluster by language rather than identity and degrading cross-language generalization.

## Method

L-Proto builds language-consistent training episodes by sampling speakers from a single language per episode within an episodic prototypical training framework, reducing language-driven variation so embeddings focus more directly on speaker identity.

## Results

On the TidyVoice Challenge benchmark, L-Proto gives consistent performance improvements over conventional fine-tuning and random episodic sampling across multiple backbone architectures.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More robust multilingual speaker verification systems for voice biometrics and authentication used by speakers of different languages.

## Related

- (link related pages by id as the wiki grows)
