---
id: bhattacharya26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-249
pdf: https://www.isca-archive.org/interspeech_2026/bhattacharya26_interspeech.pdf
---

# The Sound of Code-Switching: Prosodic Profiles of Spontaneous Spanish-English Speech

[PDF](https://www.isca-archive.org/interspeech_2026/bhattacharya26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bhattacharya26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-249)

**TL;DR** — This paper analyzes the prosody of spontaneous Spanish-English code-switching using a large corpus, finding that code-switched speech is prosodically distinct—sounding higher-pitched, quieter, and more disjointed—from monolingual speech.

## Problem

Prior work on the prosody of code-switching (CSW) has relied on small-scale read speech, isolated lexical items, or narrow feature sets, leading to contradictory conclusions. Understanding how spontaneous CSW prosody compares to monolingual speech remains an open and vital challenge for naturalistic multilingual speech synthesis.

## Method

The study uses the Bangor Miami corpus containing 35 hours of spontaneous Spanish-English dialogue across 84 speakers. The authors extract 103 utterance-level prosodic features via DisVoice covering fundamental frequency (F0), energy, and duration across voiced, unvoiced, and pause segments. They evaluate these features using Benjamini-Hochberg corrected t-tests, a k-means clustering model, and a diagnostic fine-tuned Whisper-base (74M parameters) model adapted for binary prosodic language identification.

## Results

More than 96% of duration features and 87.5% of energy features differ significantly between code-switched and monolingual utterances (p < 0.05). Unsupervised k-means clustering separates code-switched from monolingual speech with approximately 85% accuracy. Fine-tuning Whisper-base on prosodic inputs achieves up to 92% accuracy in binary prosodic language identification. Speaker proficiency metrics—specifically primary and secondary school language media—show that CSW prosody aligns more closely with the speaker's higher-proficiency language.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers building multilingual text-to-speech or naturalistic conversational speech synthesis systems can use these insights to improve the modeling of intonation and prosody in code-switched utterances.

## Limitations

The analysis is restricted to a single language pair (Spanish-English) from a specific regional demographic (Miami, USA) and does not examine cross-dialectal code-switching.

## Related

- (link related pages by id as the wiki grows)
