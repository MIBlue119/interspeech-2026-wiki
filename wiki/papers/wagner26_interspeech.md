---
id: wagner26_interspeech
category: asr
labels: [self-supervised]
institutions: ["nyra health"]
code: https://github.com/nyrahealth/CrisperWhisper
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2792
pdf: https://www.isca-archive.org/interspeech_2026/wagner26_interspeech.pdf
---

# Transcription Policy as a Latent Variable: Activating Controllable Verbatim ASR with Word-Level Timing

*Laurin Wagner*

[PDF](https://www.isca-archive.org/interspeech_2026/wagner26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wagner26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2792)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — The paper introduces coverage-aware decoder mode tags and supervised cross-attention to resolve transcription policy ambiguity (verbatim vs. intended) in large ASR models, raising German disfluency F1 from 10% to 79% zero-shot with frozen model weights and improving word-level timing past forced alignment baselines.

## Key contributions

- Coverage-aware decoder mode tags that parameterize transcription policy as a binary choice (verbatim vs. intended) and handle heterogeneously annotated data without gradient conflicts.
- Supervised cross-attention training on selected alignment heads using averaged cosine distance loss, achieving 36 ms MAE on read speech and 102 ms on disfluent speech.
- Verbatimize: a transcript-conditioned generation mechanism that reconstructs canonical verbatim text by inserting acoustically grounded disfluencies, achieving 96.1% rare-word recall.
- A language-agnostic evaluation framework that decomposes Word Error Rate into content loss rate (CLR) and style mismatch, explaining up to 60% of reported conversational WER.

## Problem

Large-scale ASR models (e.g., Whisper) trained on heterogeneously annotated data treat transcription style as an uncontrolled latent variable, resulting in decoding instability (15.1% CER beam divergence on disfluent speech), evaluation confounding where up to 60% of conversational WER reflects style mismatch rather than recognition failure, and ill-defined word-level timing. Prior approaches lack bidirectional style control, depend on language-specific external forced aligners (like WhisperX or MFA), or require expensive manual verbatim annotations that are scarce beyond English.

## Method

The architecture builds directly upon the 764M-parameter OpenAI Whisper-medium checkpoint. The token vocabulary is extended with 2 filled pause tokens ([uh], [um]), 12 paralinguistic sound event tokens ([laughter], [cough], etc.), 10 mode tags partitioned by annotation coverage, and 2 verbatimize delimiters (<sot>, <eot>). Mode tags are split into disfluency control tags ([verbatim_1..3], [sound_1..2]) and intended tags ([intended_1..5]) to prevent conflicting gradients when training on datasets with partial annotations.

Training proceeds in two stages: Stage 1 freezes all pretrained encoder and decoder weights and updates only the newly added token embeddings for 1 epoch (learning rate 5e-4); Stage 2 unfreezes the decoder and continues training for 3 epochs with a reduced learning rate of 1e-5. For word-level timing, the 10 cross-attention heads whose unsupervised patterns best correlate with ground truth are selected. During training, their averaged cross-attention distribution is supervised using a scale-invariant mean cosine distance loss against binary time-span target vectors, weighted at 0.2 relative to cross-entropy. At inference time, token-level attention is coupled with an energy-based virtual pause model using utterance-normalized frame-wise mel energy, temperature scaling (tau=3), and Viterbi decoding.

Verbatimize uses a prompt format where the decoder receives verbatim mode tags followed by a delimited intended text hint ([verbatim_1..5] <sot> intended text <eot>), forcing the model to reconstruct the verbatim audio-aligned text while applying symmetric casing perturbation (randomly uppercasing 1-3 content words in both prompt and target) to encourage close attention to exact lexical forms.

## Experimental setup

Training utilizes a curated mix of 40h high-quality verbatim English corpora (ICSI [72h], AMI [100h], CORAAL [150h], NSC [2000h subset]), LibriSpeech (960h clean), Common Voice (multilingual), and augmented sounds from VocalSound (21k) and Nonspeech7k (7k). Evaluations use DisfluencySpeech (4,707 EN samples), German DisfluencySpeech (GDS, 202 samples), TIMIT (5h read), FluencyBank (4h disfluent), Thorsten (23h DE read), and the ICSI rare-word set (1,342 samples). Baselines include Whisper-medium, Canary-1B, Reverb, AssemblyAI Universal-3-Pro, CrisperWhisper, WhisperX, and Montreal Forced Aligner (MFA). Implementation uses Hugging Face Transformers, fp16, batch size 160 with 4-step gradient accumulation, on a single NVIDIA A100.

## Results

On English DisfluencySpeech, fully fine-tuned models with tags achieve 4.0% vWER and 90.7% event F1, outperforming CrisperWhisper (73.2% eF1) and AssemblyAI (85.8% eF1). On German DisfluencySpeech with zero German verbatim training data, the model achieves 5.1% vWER and 93.8% event F1. Freezing all pretrained weights and training only tag embeddings (Stage 1) lifts German disfluency event F1 from 10.3% (base Whisper) to 78.9% solely via capability activation.

For word-level timing, supervised averaged-head loss combined with inference sharpening reduces MAE on disfluent speech (FluencyBank) to 102 ms, outperforming MFA (142 ms) and WhisperX (200 ms). On the ICSI rare-word evaluation set, verbatimize with casing perturbation improves rare-word recall from 6.8% (baseline) to 96.1% while maintaining a low content loss rate (1.3%).

| System | vWER (%) | eF1 (%) | iWER (EN) | iWER (DE) | Timing MAE (FluencyBank) |
|---|---|---|---|---|---|
| Whisper [13] | 10.9 | 12.0 | 14.2 | 5.7 | 568 ms |
| Canary-1B [31] | 9.6 | 19.9 | 15.4 | 4.6 | 166 ms |
| CrisperWhisper [19] | 6.4 | 73.2 | 20.5 | 19.6 | 122 ms |
| AssemblyAI [53] | 4.9 | 85.8 | 21.1 | 15.4 | — |
| Ours (FT0, with tags) | 4.0 | 90.7 | 9.4 | 4.9 | 102 ms |

## Limitations

Cross-lingual transfer and zero-shot performance were evaluated exclusively on German, a language typologically close to English. The custom German evaluation set (GDS) was recorded by non-professional authors, potentially lacking naturalistic in-the-wild disfluency variations. Most training data timestamps rely on automated MFA alignments rather than gold manual boundaries.

## Why read this

Speech and ML researchers working on controllable ASR, disfluency modeling, or word-level timing should read this paper to learn how discrete prefix tokens and supervised cross-attention can systematically unlock latent capabilities in massive pretrained sequence-to-sequence models without architectural overhauls.

## Code

- https://github.com/nyrahealth/CrisperWhisper

## Applications

Clinical speech analysis for neurological and speech disorders, expressive text-to-speech data curation, and scalable cost-efficient speech corpus enrichment via automated verbatim recovery.

## Institutions / 機構

nyra health

## Related

- (link related pages by id as the wiki grows)
