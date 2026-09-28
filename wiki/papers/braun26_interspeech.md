---
id: braun26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2806
pdf: https://www.isca-archive.org/interspeech_2026/braun26_interspeech.pdf
---

# Mitigating Scoring Errors and Compensating for Nonverbal Subtests in Speech-Based Dementia Assessment

[PDF](https://www.isca-archive.org/interspeech_2026/braun26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/braun26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2806)

**TL;DR** — This study presents an end-to-end framework that uses Whisper transcripts and deep embeddings to correct transcription-induced scoring errors in verbal dementia screening tests and compensate for missing nonverbal subtests.

## Problem

Automated speech-based dementia screening faces significant hurdles because pathological and atypical speech patterns cause high transcription error rates, and standard test batteries frequently include essential nonverbal tasks (such as motor skill evaluations) that cannot be assessed via audio. Relying solely on imperfect transcripts leads to compounding scoring inaccuracies, while completely omitting motor subtests reduces the sensitivity of early cognitive impairment detection.

## Method

The authors utilize OpenAI's Whisper models (whisper-small and whisper-large-v3) to process German audio recordings from 158 subjects across seven verbal subtests of the Syndrom-Kurz-Test (SKT), extracting word-level timestamps, transcripts, and unpooled encoder and decoder embeddings. A rule-based (RB) scoring baseline derives raw scores from transcripts based on processing time or missing objects. For deep correction, the RB scores are fused with self-attention processed encoder or decoder embeddings using fully connected layers and a 2-layer MLP (hidden dimension 64) trained with MSE loss to predict expert-approximate raw scores. For deep compensation, these subtest correction models are sequentially integrated and fed into an MLP to approximate overall SKT dementia scores when motor subtests are missing.

## Results

Using 5-fold cross-validation on a German clinical dataset, the integration of encoder and decoder embeddings with rule-based scoring successfully mitigates ASR errors, yielding strong correlations with expert scores (improving correlation by up to 0.35 on counting tasks where silent pauses and long repetitions cause high WERs). Whisper-large-v3 combined with encoder embeddings (RB+ENC) provides robust error correction for attention subtests, whereas memory subtests largely depend on the robust rule-based assessment. The deep compensation models effectively approximate expert overall ratings despite completely omitting motor sorting and returning subtests.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinicians and digital health engineers building automated, accessible screening tools for early detection of mild cognitive impairment and dementia in clinical practice.

## Limitations

The dataset is restricted to German-speaking subjects wearing surgical masks in clinical settings, and certain subtests suffer from high WERs exceeding 100% due to silent pauses and non-standard token sequences.

## Related

- (link related pages by id as the wiki grows)
