---
id: mojarad26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-808
---

# Layer-wise Probing of wav2vec 2.0 and Whisper for Consonant Cluster Reduction in African American English

**TL;DR** — Layer-wise probing shows wav2vec2 and Whisper encode consonant cluster reduction in African American English as structured, gradient phonological variation rather than simple deletion, retaining cues to the reduced consonant's identity.

## Problem

Consonant cluster reduction in African American English is a common phonological pattern linked to ASR performance disparities, but how self-supervised and supervised speech models internally represent it was unexplored.

## Method

The authors run speaker-independent layer-wise probing of wav2vec2-base and Whisper-small on two tasks — detecting whether a cluster is reduced, and restoring the identity of the underlying reduced stop — to see what each model's internal layers encode.

## Results

Both models distinguish reduced from canonical forms with high accuracy, and reduced segments still retain decodable cues to their underlying stop consonant, showing CCR is encoded as structured gradient variation rather than outright deletion.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Informs more equitable ASR system design and evaluation for African American English and other dialects with systematic phonological reduction patterns.

## Related

- (link related pages by id as the wiki grows)
