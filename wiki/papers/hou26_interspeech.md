---
id: hou26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1577
pdf: https://www.isca-archive.org/interspeech_2026/hou26_interspeech.pdf
---

# UGPCB: Uncertainty-Gated Phonetic Contextual Biasing for Improving Hotword Recognition in Large Speech Models

[PDF](https://www.isca-archive.org/interspeech_2026/hou26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hou26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1577)

**TL;DR** — UGPCB is a training-free, decode-time contextual biasing framework that uses entropy-driven gating and bimodal contrastive penalties to improve hotword recognition in large speech models, achieving a 16.04% recall improvement (90.81% F1) on Mandarin ASR.

## Problem

End-to-end ASR models struggle with proper nouns and domain-specific hotwords due to training distribution biases and brittle subword (BPE) tokenization boundaries. While phonetic fuzzy matching helps bypass subword fragmentation, it introduces severe vulnerabilities such as over-biasing confident model regions and triggering homophone hallucinations. Existing mitigation methods often require parameter-intensive fine-tuning, architectural modifications, or introduce high inference latency.

## Method

The method builds on top of a frozen 372M-parameter Dolphin base model without requiring parameter updates or fine-tuning, using a parameter-free logit bridge to cache raw decoding logits. It employs parallel grapheme-phoneme dual-track tries (BPE trie for orthographic matching, and tone-aware/tone-agnostic pinyin tries with global phonetic mapping to prevent truncation) to match hotwords. An entropy-driven dynamic gating mechanism normalizes Shannon entropy from acoustic posteriors to activate biasing only under high uncertainty. Finally, a contrastive homophone penalty (CHP) operates during N-best rescoring by cross-validating graphemic and phonetic matches, penalizing phonetic-only matches via step-wise penalties and Needleman-Wunsch fuzzy similarity checks.

## Results

Evaluated on the AISHELL-1 corpus using the SeACo Mandarin test set (808 utterances) with text shallow fusion and unmodified Dolphin baselines. Full UGPCB (B4) reduces CER from 7.28% to 5.60%, improves recall by 16.04% (from 68.15% to 84.19%), and reaches an F1 score of 90.81% while restricting precision reduction to 0.78%. When scaling synthetic distractors up to 1,000, B4 maintains a 3 to 5 percentage point recall advantage over text shallow fusion (B2), finishing at 82.41% recall and 88.57% F1. Component ablations confirm that entropy gating successfully lowers false alarms from 8 to 4, while the contrastive homophone penalty drives the primary recall jump.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers deploying large E2E speech recognition systems in production domains requiring accurate proper noun and keyword transcription.

## Limitations

The framework experiences a rise in false alarms (up to 33) and a steeper precision drop when large distractor lists (N=1000) expand the phonetic search space.

## Related

- (link related pages by id as the wiki grows)
