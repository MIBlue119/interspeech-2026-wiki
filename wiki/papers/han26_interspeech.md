---
id: han26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-534
pdf: https://www.isca-archive.org/interspeech_2026/han26_interspeech.pdf
---

# A Transcript-anchored Pipeline With Large Language Models For Detecting Inappropriate Pauses In Dysarthric Speech

[PDF](https://www.isca-archive.org/interspeech_2026/han26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/han26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-534)

**TL;DR** — This paper presents a transcript-anchored pipeline combining verbatim ASR, MFA alignment with VAD boundary refinement, and LLM reasoning to detect inappropriate pauses in dysarthric speech, achieving an F1 score of 0.68 for mild-to-moderate cases.

## Problem

Dysarthria causes prosodic abnormalities such as inappropriate pauses (IPs) that serve as crucial clinical indicators, but automatic evaluation is hindered by the lack of reliable transcript alignment. Standard speech recognition and alignment tools degrade on abnormal speech due to substitutions, repetitions, fillers, and out-of-lexicon pronunciations. Furthermore, end-to-end models struggle due to extreme training data scarcity in clinical domains.

## Method

The framework utilizes a four-stage pipeline: (1) a fine-tuned Whisper small model for verbatim transcription retaining fillers, repetitions, and self-repairs; (2) Montreal Forced Aligner (MFA) to generate time boundaries, with pause durations refined via a fine-tuned Silero-VAD to correct alignment failures; (3) GPT-5 for lexical adaptation to map unknown tokens (<unk>) into MFA-compatible forms while preserving transcript mapping; and (4) GPT-5 for classifying pause appropriateness into appropriate pauses or three IP categories (intra-word, following vocal fillers, or during correction attempts) using SLP definitions alongside generated rationales.

## Results

Evaluated on a Korean dataset of 743 Autumn Paragraph utterances (15.7 hours across 221 healthy controls, 467 mild-to-moderate, and 55 severe speakers), VAD fine-tuning improved overall pause alignment F1 by roughly 18 percentage points. The combined Whisper-MFA with VAD-refinement strategy achieved stable pause alignment across all severities (72.8% F1 overall). In expert evaluations by certified speech-language pathologists, the WhisperMFA configuration yielded macro-F1 scores of 0.64 for healthy controls and 0.68 for mild-to-moderate dysarthria groups in IP classification.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-language pathologists and clinical researchers seeking automated, explainable, and scalable assessment tools for prosodic deficits and intelligibility in dysarthric speech.

## Limitations

Appropriateness judgments for severely impaired speech were found to be unreliable when based on audio alone, restricting expert-verified evaluation subsets.

## Related

- (link related pages by id as the wiki grows)
