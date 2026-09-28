---
id: sinha26b_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2666
---

# Error Diversity and Performance Variability in Zero-Shot Children's Speech Recognition

**TL;DR** — A layer-wise analysis of Wav2Vec2, HuBERT, and Data2Vec under strict zero-shot adult-to-child ASR transfer shows substantial cross-representation variability and complementary information across layers, indicating errors stem mainly from acoustic representation limits rather than recoverable linguistic issues.

## Problem

Children's speech recognition remains challenging due to acoustic variability and limited labeled data, and it's unclear how well self-supervised representations trained on adult speech transfer to children's speech in a strict zero-shot setting.

## Method

The authors evaluate layer-wise representations from Wav2Vec2, HuBERT, and Data2Vec using hybrid ASR systems trained only on adult speech, analyzing error structures and testing whether LLM-based post-recognition correction helps, plus an oracle analysis of complementary information across layers.

## Results

Several layers achieve comparable best-case WER but with substantial variability across representations; error structures are dataset-dependent, LLM-based correction provides little improvement, and oracle analysis shows different layers capture complementary acoustic information especially under stronger domain mismatch.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Informs designers of children's speech technology (educational apps, voice assistants for kids) about where to focus effort — acoustic representation improvement rather than post-hoc linguistic correction.

## Related

- (link related pages by id as the wiki grows)
