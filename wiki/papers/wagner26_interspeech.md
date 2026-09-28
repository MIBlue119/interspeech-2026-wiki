---
id: wagner26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2792
pdf: https://www.isca-archive.org/interspeech_2026/wagner26_interspeech.pdf
---

# Transcription Policy as a Latent Variable: Activating Controllable Verbatim ASR with Word-Level Timing

[PDF](https://www.isca-archive.org/interspeech_2026/wagner26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wagner26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2792)

**TL;DR** — This paper resolves latent transcription policy ambiguity in ASR models like Whisper via explicit mode tags, supervised cross-attention timing, and transcript-conditioned disfluency recovery, reducing beam divergence by 46% and outperforming forced alignment on disfluent speech.

## Problem

Modern ASR models treat transcription style (verbatim vs. intended/fluent) as an uncontrolled latent variable, causing unstable beam search outputs, evaluation confusion where up to 60% of reported WER stems from style mismatches rather than errors, and ill-defined word-level timestamps. These issues create severe discrepancies when processing spontaneous, disfluent, or pathological speech, making downstream clinical and linguistic analysis unreliable.

## Method

The paper introduces coverage-aware decoder task tokens (mode tags) that parameterize the output policy between verbatim and intended modes, initialized from OpenAI's Whisper-medium architecture. It adds atomic vocabulary tokens for filled pauses and paralinguistic sound events, trains via paired supervision on parallel verbatim and intended transcripts, and introduces supervised cross-attention tuning for word-level boundary detection. Additionally, a new task called 'verbatimize' conditions the model on an intended text hint to reconstruct a canonical verbatim transcript by inserting acoustically grounded disfluencies.

## Results

Evaluated on English and German benchmarks including DisfluencySpeech, TED-LIUM, AMI, and FluencyBank, the proposed method raises German disfluency event F1 from 10% to 79% zero-shot using solely English verbatim training data. Beam divergence on disfluent AMI samples drops from 15.1% to 8.1% CER. Word-level boundary error on disfluent speech reaches 102 ms MAE, outperforming traditional forced-alignment baselines which degrade to 142–200 ms. Verbatimize lifts rare-word recall from 6.8% to 96.1%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building conversational agents, transcription services, and clinical speech analysis tools where precise control over verbatim versus intended text, reliable timestamps, and disfluency tracking are required.

## Limitations

The approach relies on having access to paired or well-annotated supervision data to effectively train the mode tags and cross-attention alignment targets.

## Related

- (link related pages by id as the wiki grows)
