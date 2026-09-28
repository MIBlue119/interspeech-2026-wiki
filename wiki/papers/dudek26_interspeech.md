---
id: dudek26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1416
---

# Phoneme-Level Mispronunciation Screening in Polish-Speaking Children with an Explainable Assistant

**TL;DR** — A wav2vec2-based screening pipeline flags sibilant mispronunciations in Polish-speaking children with 88.7% exact sequence match and a low 2.7% false-alarm rate, paired with a caregiver-facing explainable assistant.

## Problem

Early identification of speech sound errors in children is often bottlenecked by limited access to specialists, motivating lightweight tools that can screen for mispronunciation outside a clinic.

## Method

The pipeline couples a wav2vec2-based CTC token recognizer with alignment-based error typing to detect sibilant substitutions, and adds a template-grounded caregiver assistant explicitly scoped as screening rather than diagnosis.

## Results

On a held-out set of 10 unseen children (559 utterances), the recognizer achieves 88.7% exact sequence match; as a conservative screening signal, flagging substitution-evidence tokens yields 72.9% precision, 61.4% recall (F1 = 0.67), and a 2.7% false-alarm rate on target-correct items.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

At-home or classroom pre-screening tools for pediatric speech sound disorders that route flagged cases to speech-language clinicians for full assessment.

## Related

- (link related pages by id as the wiki grows)
