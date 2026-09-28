---
id: dey26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3115
pdf: https://www.isca-archive.org/interspeech_2026/dey26b_interspeech.pdf
---

# Rethinking Organization Entity Modeling in End-to-End Acoustic Named Entity Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/dey26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dey26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3115)

**TL;DR** — This paper proposes an organization-aware Whisper-based acoustic named entity recognition framework utilizing LLM-based targeted semantic augmentation, category-specific boundary supervision, and structure-constrained entity learning, achieving a peak organization F1-score of 51.40% (a 32.36% absolute gain over two-stage baselines).

## Problem

End-to-end acoustic NER integrates speech transcription and entity detection to bypass the error propagation inherent in cascaded ASR-NER pipelines. However, organization entities remain notably harder to detect because of multi-word spans containing non-entity words, frequent acronym usage, high lexical variability, and out-of-vocabulary terms. Conventional cross-entropy training fails to properly model these complex entity span dependencies and lacks explicit boundary cues in speech.

## Method

The framework utilizes a Whisper-small architecture where the encoder and the first nine decoder layers are frozen during fine-tuning. To address data scarcity and span variations, it introduces a two-stage LLM-based targeted semantic augmentation pipeline using Phi-3-medium-128k-instruct for abbreviation expansion and lexical variation, followed by speech synthesis via XTTS-2. For optimization, a structure-constrained entity learning (SCEL) objective is introduced, combining entity-modeling losses (entity-aware differential loss, tag suppression loss, span coverage constraint, and boundary consistency loss) with structural-regularization losses (entropy regularization and confidence calibration). Additionally, a dedicated category-specific boundary token (<org end>) is employed during training to handle multi-word organization spans.

## Results

Evaluated on a 150-hour English acoustic NER dataset (LibriSpeech and Common Voice split 90:5:5) containing 38,891 unique entities, the model is compared against a two-stage ASR-NER pipeline, the cross-entropy baseline of Yadav et al., and WhisperNER. While standard cross-entropy yields an organization F1 (Org-F1) of 30.35% and an ASR word error rate (WER) of 13.15%, the complete proposed framework (SCEL + targeted semantic augmentation + org end modeling) achieves an Org-F1 score of 51.40% and a WER of 9.53%. Individual SCEL application boosts overall entity F1 to 78.11% with an 8.27% WER, and span-wise analysis demonstrates significant gains specifically on multi-span organization entities.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice-driven interfaces in smart devices and conversational speech applications requiring accurate direct extraction of organization names from audio without cascading error propagation.

## Limitations

Organization-specific optimizations slightly reduce category-agnostic recall and overall ASR performance compared to the pure SCEL configuration.

## Related

- (link related pages by id as the wiki grows)
