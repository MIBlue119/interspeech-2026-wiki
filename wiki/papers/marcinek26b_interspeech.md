---
id: marcinek26b_interspeech
category: dialogue-systems
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2799
pdf: https://www.isca-archive.org/interspeech_2026/marcinek26b_interspeech.pdf
---

# Optimal Linguistic Complexity for Dialogue System Speech in Noise: Convergent Evidence from Automatic and Human Transcription

[PDF](https://www.isca-archive.org/interspeech_2026/marcinek26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/marcinek26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2799)

**TL;DR** — Investigating how linguistic complexity affects speech intelligibility in noise, the authors demonstrate through large-scale ASR evaluation and human trials that natural grammatical sentences (9–16 words) outperform telegraphic forms by over 40% in error rate.

## Problem

Spoken dialogue systems must generate responses that remain understandable in noisy environments, yet designers lack clear guidelines on whether utterances should be shortened or simplified. While psycholinguistic literature explores syntactic complexity, it has not been operationalized as a noise-adaptive design principle, leaving developers uncertain about how sentence structure impacts listener and recognizer comprehension.

## Method

The authors conducted two studies evaluating 250 semantically matched sentences across five linguistic complexity levels (from L1 telegraphic at 3–5 words to L5 complex up to 30 words). Study 1 processed 168,000 synthetic utterances generated via XTTS v2 and KokoroTTS, combined with 12 DEMAND noise types across seven SNR levels (−15 to +15 dB), and transcribed using Whisper large-v3 and Wav2Vec2 base-960h. Study 2 ran a human listening pilot with 15 native English speakers transcribing 40 stimuli each across four noise environments and three SNRs. Ordinary least squares regression with multi-way cluster-robust standard errors and Friedman tests analyzed the error patterns.

## Results

In Study 1, ASR word error rate (WER) exhibited a U-shaped curve where natural grammatical speech (Level 3, 26.9% WER) outperformed telegraphic forms (Level 1, 47.5% WER) by a 43% relative reduction, with Levels 3 and 4 forming an optimal zone (9–19 words). Paradoxically, the relative grammar advantage grew as acoustic conditions improved, with the L1/L3 WER ratio rising from 1.33× at −15 dB to 3.36× at +10 dB. Study 2 confirmed these findings with human listeners, showing a significant U-shaped WER pattern with Level 3 achieving 19.4% error compared to 35.3% for Level 1 (a 45% relative reduction).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Spoken dialogue system engineers and human-robot interaction designers can use these findings to optimize response generation modules and listening-speaker architectures for noisy real-world environments.

## Limitations

The human listening evaluation was limited to a pilot study with 15 participants, and the upper length boundary was restricted to 30 words.

## Related

- (link related pages by id as the wiki grows)
