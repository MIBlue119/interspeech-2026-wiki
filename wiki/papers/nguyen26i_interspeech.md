---
id: nguyen26i_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3465
---

# Contrastive Training with LLM-generated Near-Misses for Robust Code-Switching Speech Recognition

**TL;DR** — Fine-tunes Whisper with LoRA using an LLM-generated set of hard 'near-miss' errors around code-switch points, improving recognition specifically at the language-switching regions that trip up code-switching ASR.

## Problem

Code-switching, alternating languages within one utterance, remains a hard case for ASR, and standard fine-tuning does not specifically target the points where language switches occur.

## Method

The authors detect code-switch spans (points of interest, POI), construct acoustically plausible near-miss hypotheses by perturbing POIs in ASR N-best outputs and expanding candidates with an LLM, filter these into hard-but-plausible negatives using acoustic, phonemic, and textual constraints, then fine-tune Whisper-small with LoRA using a POI-weighted cross-entropy anchor loss plus a multi-negative contrastive ranking loss.

## Results

On CS-FLEURS (Mandarin-English) and ViMedCSS (Vietnamese-English), the method reduces both general and code-switching-aware error rates by over 2% compared to standard LoRA fine-tuning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More accurate ASR for multilingual speakers who code-switch, e.g. bilingual voice assistants, transcription in multilingual regions, and medical/clinical transcription with mixed-language speech.

## Related

- (link related pages by id as the wiki grows)
