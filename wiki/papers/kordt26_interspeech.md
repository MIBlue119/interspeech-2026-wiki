---
id: kordt26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2080
pdf: https://www.isca-archive.org/interspeech_2026/kordt26_interspeech.pdf
---

# Learning to Hear Hesitation: Continual Learning for Disfluency-Aware ASR

[PDF](https://www.isca-archive.org/interspeech_2026/kordt26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kordt26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2080)

**TL;DR** — This paper investigates continual learning (CL) strategies to incorporate explicit disfluency tokens into a pretrained ASR model for verbatim transcription, demonstrating that Weight Averaging optimizes word error rates while Experience Replay excels at disfluency marker retention.

## Problem

State-of-the-art automatic speech recognition models are typically optimized to omit disfluencies like filler words and hesitations to produce clean transcripts, which causes information loss, hallucinations, and a failure to capture clinically relevant speech patterns. Adapting models to handle disfluent speech using small datasets often leads to catastrophic forgetting of general-domain knowledge, while full joint retraining on all data is computationally inefficient and impractical due to privacy regulations.

## Method

The authors use whisper-small.en as a backbone model and introduce four aggregate disfluency token types (FILLER, REP, DISRUPT, PAUSE). They evaluate four domain-incremental continual learning methods: Elastic Weight Consolidation (EWC), Experience Replay (ER), A-GEM, and Weight Averaging (WA). The experimental pipeline uses three datasets from the TalkBank repository containing annotated disfluent speech—the Standard Malaysian English (SME) Corpus, the Pitt Corpus, and the Delaware Corpus—alongside LibriSpeech for rehearsal buffers and clean speech baselines. They analyze internal model dynamics using a decoder cross-attention head masking and attribution approach to detect specialized attention circuits for disfluency tokens.

## Results

Evaluated on SME, Pitt, and Delaware corpora using preprocessed Word Error Rate (pWER) and marker micro/macro F1 scores, the methods reveal a trade-off between ASR performance and marker generation. In the initial disfluency introduction stage on SME, WA achieves the lowest pWER of 9.64% and best clean LibriSpeech retention (3.41%), but fails to emit markers, whereas ER and A-GEM achieve micro-F1 scores around 0.73-0.75 with a pWER around 12.17% to 12.47%. In sequential continual adaptation across all datasets, WA yields the best ASR performance (A-WER of 18.90%), while ER achieves the best overall marker retention with a macro-F1 score of 0.49 and minimal forgetting (FM of 0.02). Attention head analysis reveals that successful marker emission consistently relies on a specific small subset of decoder cross-attention heads, which, when zero-masked, reduces marker emission by roughly 57% without hurting pWER.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and clinical researchers building speech-to-text systems for clinical diagnostics, language learning analysis, or verbatim transcription tasks that require preserving hesitation and dysfluency markers.

## Limitations

The study is restricted to a single backbone architecture (whisper-small.en) and a fixed sequential task ordering.

## Related

- (link related pages by id as the wiki grows)
