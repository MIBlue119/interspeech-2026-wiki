---
id: jabeen26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-707
pdf: https://www.isca-archive.org/interspeech_2026/jabeen26_interspeech.pdf
---

# The (non-)universality of prominence and Intonation Phrases: German and Hungarian listeners'' perception of an unfamiliar language

[PDF](https://www.isca-archive.org/interspeech_2026/jabeen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jabeen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-707)

**TL;DR** — This study evaluates the non-universality of prosodic perception by showing that German and Hungarian listeners rely on distinct L1-influenced F0 contours and scaling patterns to identify prominence and Intonation Phrase boundaries in unfamiliar Urdu speech.

## Problem

Prior literature claims that high inter-rater agreement by listeners identifying Intonation Phrase (IP) boundaries in unknown languages proves the universality of acoustic cues. The authors argue this is an analytical fallacy caused by listeners applying their native (L1) cue sets rather than responding to universal properties. Testing typologically diverse listeners on an unfamiliar language provides a cleaner experimental framework to isolate language-specific versus universal aspects of prosody perception.

## Method

The experiment used Rapid Prosody Transcription (RPT) with 26 German and 21 Hungarian listeners who annotated 4 Urdu speech extracts (each ~18 seconds, read by 2 male and 2 female speakers) presented orthographically without punctuation. Listeners first marked IP boundaries with slashes and then underlined prominent words, listening to each audio up to five times. The authors computed Fleiss' Kappa for inter-rater agreement, fitted Generalized Linear (Mixed) Models to analyze speaker effects, and applied Generalised Additive Mixed Models (GAMMs) with tensor smooths on time-normalized, speaker-mean-normalized F0 contours to evaluate prominence perception differences.

## Results

Aggregated Fleiss' Kappa values for IP boundaries showed weak to moderate agreement between listener groups (ranging from 0.47 to 0.63 across speakers), while prominence agreement was minimal to none (Fleiss' Kappa 0.16 to 0.28). Germans perceived a much higher percentage of words as prominent (49% to 97% across speakers) compared to Hungarians (36% to 44%). GAMM analyses revealed a significant three-way interaction (F = 55.2, p = 0.001) demonstrating that Hungarian listeners associated falling F0 contours (HL) with prominence, whereas German listeners associated rising F0 contours (LH) with prominence, reflecting their distinct L1 intonational strategies.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech scientists, phoneticians, and computational linguists building cross-lingual speech understanding, prosody modeling, or text-to-speech systems that must account for cross-linguistic variations in prominence perception.

## Limitations

The study uses a limited stimulus set of only four Urdu extracts and does not explicitly address the cross-linguistic comparability of different levels within the prosodic hierarchy between German and Hungarian.

## Related

- (link related pages by id as the wiki grows)
