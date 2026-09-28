---
id: dudek26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1416
pdf: https://www.isca-archive.org/interspeech_2026/dudek26_interspeech.pdf
---

# Phoneme-Level Mispronunciation Screening in Polish-Speaking Children with an Explainable Assistant

[PDF](https://www.isca-archive.org/interspeech_2026/dudek26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dudek26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1416)

**TL;DR** — This paper presents a phoneme-level mispronunciation screening pipeline for Polish-speaking children that couples a wav2vec2 tokenizer with expert substitution markers, achieving 88.7% exact sequence match on unseen child speech.

## Problem

Early identification of childhood speech sound disorders is hindered by long waiting lists and specialist shortages, while standard ASR systems struggle with children's acoustic variability and mask articulatory errors due to strong language model priors. Polish is especially challenging due to its dense consonantal inventory and complex sibilant contrasts, requiring specialized automated screening tools that can operate outside the clinic without making full clinical diagnoses.

## Method

The acoustic model utilizes a fine-tuned Polish wav2vec2-large encoder paired with a 6-layer Transformer post-encoder and a CTC head, trained on a proprietary corpus of 201 children (ages 4-8). To capture specific articulation errors, the token inventory is extended with bracketed IPA substitution evidence markers representing 12 common outcomes across Polish sibilant series. The system employs LoRA adaptation (rank 32, alpha 64) and partial unfreezing of the top 6 layers, updating 33.3% of the 359.6M parameters. Prompted canonical sequences are aligned with recognized productions using Levenshtein distance, extracting diagnostic vectors that feed a template-grounded caregiver assistant.

## Results

Evaluated on a speaker-disjoint held-out test set of 10 children comprising 559 utterances, the recognizer achieves an exact sequence match of 88.7% and a token accuracy of 95.0% (WER 5.95%, CER 4.09%). As a screening proxy, flagging target sibilant mismatches via bracketed substitution tokens yields 72.9% precision, 61.4% recall, an F1 score of 0.67, and a false-alarm rate of 2.7% on target-correct items. Ablation studies demonstrate that removing the 6-layer Transformer post-encoder decreases exact sequence match from 88.7% to 84.5%, while replacing wav2vec2 with a WavLM backbone drops performance to 78.6%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-language pathologists and caregivers can use this lightweight screening assistant for at-home practice and early identification of sibilant errors in Polish-speaking children.

## Limitations

The current evaluation focuses exclusively on a fixed prompt inventory and sibilant/affricate substitutions rather than open-vocabulary transcription or general speech sound disorders.

## Related

- (link related pages by id as the wiki grows)
