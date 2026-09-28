---
id: baumann26_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3378
---

# PhonLLM: Joint Phone Recognition and Phonological Process Inference for Child Speech

**TL;DR** — A single decoder that jointly outputs canonical phones and tags the phonological processes explaining a child's mispronunciations, giving more interpretable diagnostics than plain ASR.

## Problem

Explaining deviations in child speech for clinical and educational screening requires more than a transcript — it requires recovering both the canonical phone sequence and the phonological processes (e.g. substitutions, deletions) that produced the observed pronunciation, which standard ASR does not provide.

## Method

The model is first pretrained on phone recognition without text conditioning, then in a second stage fuses embeddings of an expected phone sequence with downsampled audio tokens so a single decoder can output canonical phones with explicit process tags; a rule-based augmentation pipeline injects process supervision at scale and supports multilingual training by swapping grapheme-to-phone mappings.

## Results

Across multilingual child and clinical corpora, joint modeling improves phonological process tagging accuracy and reduces phone error rate compared to ASR-based baselines, while yielding interpretable phone-level diagnostics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-language pathology screening and Computer-Assisted Pronunciation Training (CAPT) tools for children, including across multiple languages.

## Related

- (link related pages by id as the wiki grows)
