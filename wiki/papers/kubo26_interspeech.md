---
id: kubo26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1672
---

# Building Tailored Speech Recognizers for Japanese Speaking Assessment

**TL;DR** — A specialized Japanese ASR system that outputs phonemic transcriptions with pitch-accent markers for speaking assessment, cutting error rate nearly in half versus prior approaches despite scarce accent-labeled training data.

## Problem

Japanese speaking assessment needs ASR that transcribes phonemes together with accent marks, but training data with accurate phonemic-plus-accent transcriptions is scarce even though Japanese is otherwise resource-rich.

## Method

The authors use a multitask training scheme with auxiliary losses including one targeting pitch patterns, and fuse two estimators — one over phonetic alphabet strings and one over text token sequences — to mitigate the data sparsity for accent-marked phonemic ASR.

## Results

The proposed methods reduce average mora-label error rate from 12.3% to 7.1% on the CSJ core evaluation sets, outperforming the use of generic multilingual recognizers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated Japanese pronunciation and speaking assessment tools, e.g. for language learning or accent training.

## Related

- (link related pages by id as the wiki grows)
