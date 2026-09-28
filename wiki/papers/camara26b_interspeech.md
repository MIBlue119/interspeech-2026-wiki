---
id: camara26b_interspeech
category: prosody
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1379
pdf: https://www.isca-archive.org/interspeech_2026/camara26b_interspeech.pdf
---

# Word Lengthening as a Function of Utterance Position: A Multi-Corpus Study

[PDF](https://www.isca-archive.org/interspeech_2026/camara26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/camara26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1379)

**TL;DR** — This study analyzes four corpora across English and Spanish to demonstrate that turn-final words undergo significant duration lengthening, with a pooled mean increase of 203.1 ms (Cohen's d = 1.22) concentrated heavily in the final syllable.

## Problem

Efficient conversational turn-taking requires interlocutors to predict turn completions within hundreds of milliseconds, well ahead of standard speech production latencies. While listeners leverage syntactic and pragmatic constraints, acoustic-prosodic cues like pre-boundary lengthening are critical for projecting upcoming turn transitions. However, prior research has largely focused on read speech or isolated phrase boundaries, leaving the robustness and fine-grained localization of turn-final lengthening in spontaneous, multi-style, and multi-language conversations less systematically quantified.

## Method

The authors evaluate four established corpora spanning spontaneous, task-oriented, and read speech in English and Spanish: Switchboard, Columbia Games, BU Radio News, and Glissando, encompassing over 500 speakers, approximately 39,500 turns, and 245,738 total tokens after excluding backchannels. They conduct baseline duration contrasts, matched-word analyses pairing identical words from the same speakers across turn-final and mid-sentence contexts, and syllable-level segmentations to isolate structural localization. Additionally, they examine the relationship between word duration and ToBI-style break indices to test prosodic boundary strength effects.

## Results

Across the pooled dataset, turn-final words average 0.44 s compared to 0.24 s for mid-sentence tokens, yielding a 203.1 ms increase (d = 1.22). Matched-word comparisons confirm a persistent effect of ~80 ms (d = 0.59 to 0.69) that rules out purely lexical selection artifacts, with 92.8% of words showing positive lengthening. Syllable-level analysis demonstrates that the elongation is tightly localized to the final syllable (d = 0.09 for final vs d = 0.01 for non-final syllables). Furthermore, prosodic boundary strength strongly correlates with duration, showing a 215 ms increase between low (0-1) and high (3-4) break indices.

## Code

- https://mateocamara.com/

## Applications

Speech and ML engineers building conversational agents, spoken dialogue systems, and turn-taking models can use these empirical duration measurements and edge-localization insights to improve turn-ending prediction and response timing.

## Limitations

Corpus heterogeneity limits direct cross-corpus comparisons, and the study does not model speech rate or syntax within a unified regression framework.

## Related

- (link related pages by id as the wiki grows)
