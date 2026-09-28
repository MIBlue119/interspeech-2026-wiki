---
id: shahamiri26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/shahamiri26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/shahamiri26_interspeech.pdf
---

# BetterSpeak: An Atypical Speech to Typical Speech Platform for Dysarthric Speakers

[PDF](https://www.isca-archive.org/interspeech_2026/shahamiri26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shahamiri26_interspeech.html)

**TL;DR** — BetterSpeak is a mobile ASR platform for dysarthric speakers powered by a two-phase personalized Conformer adaptation pipeline that achieves word error rates of 21.5% on UASpeech and 12.7% on TORGO.

## Problem

Commercial speaker-independent ASR models fail severely on dysarthric speech, yielding up to 76.4% Word Error Rates due to extreme acoustic mismatch and a severe lack of training data. This performance gap creates major communication barriers for affected children, preventing effective interaction with technology and peers.

## Method

The system utilizes a Sequence-to-Sequence Conformer architecture trained via a Two-Phase Personalized Adaptation Pipeline. Phase 1 adapts a pre-trained general model using healthy control speakers from dysarthric corpora to align lexical and phonological representations. Phase 2 performs rapid individual adaptation by fine-tuning only the acoustic Conformer encoder layers on a small amount of target speaker data gathered during mobile onboarding.

## Results

Evaluations on standard benchmark datasets demonstrate average Word Error Rates of 21.5% on UASpeech and 12.7% on TORGO. These figures substantially outperform prior sequence-to-sequence approaches and baseline commercial models. The pipeline successfully operates in a resource-efficient manner using limited, publicly available samples.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Individuals with dysarthria, particularly children, can use the mobile platform for real-time speech transcription, text-to-speech communication translation, and continuous model adaptation.

## Limitations

No specific limitations or scope bounds were explicitly stated in the text.

## Related

- (link related pages by id as the wiki grows)
