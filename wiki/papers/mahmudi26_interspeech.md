---
id: mahmudi26_interspeech
category: asr
labels: [low-resource, self-supervised]
institutions: ["University of Melbourne"]
code: https://github.com/Aso-UniMelb/Easper
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2781
pdf: https://www.isca-archive.org/interspeech_2026/mahmudi26_interspeech.pdf
---

# Easper: An Accessible ASR Pipeline for Language Documentation

*Aso Mahmudi, Ting Dang, Ekaterina Vylomova, Nick Thieberger*

[PDF](https://www.isca-archive.org/interspeech_2026/mahmudi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mahmudi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2781)

**Category:** `asr` · **Labels:** `low-resource`, `self-supervised`

**TL;DR** — Easper is a no-code open-source pipeline that links ELAN annotations to cloud-based ASR fine-tuning, demonstrating that prioritizing lexically rich, repetitive narratives rather than acoustically clean audio accelerates early-stage model adaptation for endangered languages.

## Key contributions

- Released Easper, a portable, open-source no-code workflow integrating ELAN annotation parsing, cloud fine-tuning via Google Colab, and local offline deployment for diarised transcription.
- Proposed a session-level data selection framework evaluated across three low-resource Vanuatu languages (Bislama, Nafsan, and Nguna) spanning archival and recent field recordings.
- Formulated the Normalised Token-to-Type Ratio (ToTy) to measure session-level lexical repetition and vocabulary density for active elicitation guidelines.
- Empirically proved that foundation models (like Whisper) are robust to field noise, making linguistic richness (ToTy/TyTo) vastly superior to acoustic cleanliness (SNR/OVR) for bootstrapping ASR.

## Problem

Transcribing audio for language documentation is a massive bottleneck, yet field linguists lack both the technical expertise to fine-tune neural ASR foundation models and empirical guidelines for the 'cold start' problem of data selection. Prior tools like Elpis require local GPU infrastructure and lack modern neural model support, while standard active learning methods rely on utterance-level uncertainty metrics rather than holistic session-level fieldwork units. This matters because manual annotation is severely resource-constrained, requiring rigorous strategies to decide which recordings to transcribe first to bootstrap accurate models.

## Method

Easper consists of three stages: Data Preparation, Fine-Tuning, and On-Device Inference. The Data Preparation module uses pympi-ling to process ELAN (.eaf) files, flagging segments over 30 seconds, detecting overlapping annotations, and generating corpus-level character/word frequency statistics before exporting 16 kHz mono WAV files alongside CSV metadata. The Fine-Tuning stage offloads computation to Google Colab, recommending OpenAI's Whisper-Small (244M parameters) or Meta's XLS-R (300M) for their balance of cloud-trainability and compact off-line CPU deployment sizes (<1 GB). The On-Device Transcription stage utilizes SpeechBrain or pyannote-audio for robust speaker diarisation and segmentation (leveraging known speaker counts when available), transcribes via the fine-tuned Whisper model with an adjustable segmentation slider, and exports outputs back into ELAN tiers.

To study the cold start problem under realistic fieldwork constraints, sessions are treated as indivisible units rather than randomized isolated utterances. Five session-level prioritisation strategies are evaluated: Baseline (random), SNR Priority (cleanest background first via OM-LSA), Minimal Overlap Priority (least overlapping speech first), TyTo Priority (highest Type-Token Ratio vocabulary diversity first), and the newly introduced Normalised Token-to-Type Ratio (ToTy = total tokens divided by unique types, measuring average word repetition normalised by session length). Models are fully fine-rained for 3 epochs per incremental step with a batch size of 8 and a learning rate of 1e-5 using Whisper-Small.

## Experimental setup

Evaluated on a corpus of ELAN-annotated field recordings from three Vanuatu languages hosted on PARADISEC: Bislama (13h45m across 49 sessions, 123k tokens), Nafsan (14h50m across 32 sessions, 107k tokens), and Nguna (01h01m across 7 sessions, nearly 8k tokens). The evaluation compares 5 data selection strategies (Baseline, SNR, Min Overlap, TyTo, ToTy) using Character Error Rate (CER) to measure keystroke efficiency for post-editing. Test sets consist of a fixed 30-minute split for Bislama and Nafsan, and a 10-minute split for Nguna due to its limited total size.

## Results

Across all three languages, prioritizing the Normalised Token-to-Type Ratio (ToTy) consistently yields the lowest Character Error Rate (CER) during early-stage incremental learning curves compared to random selection. Conversely, strategies prioritizing Signal-to-Noise Ratio (SNR) or minimal speaker overlap underperform, demonstrating that pre-trained foundation models are inherently robust to field noise but starved for target-language vocabulary and orthographic rules. Comparing lexical breadth versus depth, ToTy (focusing on acoustic-phonetic repetition of a core vocabulary) outperforms TyTo (vocabulary diversity alone), proving that neural models require sufficient repetition to reliably learn novel grapheme-to-phoneme mappings.

## Limitations

The evaluation is restricted to three Vanuatu languages (two Oceanic and one Creole), leaving out highly agglutinative or tone-based low-resource language families. The simulation relies on pre-existing complete annotations, whereas real-world active elicitation workflows introduce human-in-the-loop annotation errors and biases. Furthermore, storage and compute strategies are optimized specifically for compact models under 1 GB, restricting direct scaling evaluations to larger foundation architectures.

## Why read this

Field linguists, speech engineers, and researchers building human-in-the-loop systems for low-resource languages should read this paper to understand how to bypass technical deployment barriers and strategically select audio data for rapid ASR bootstrapping.

## Code

- https://github.com/Aso-UniMelb/Easper

## Applications

Accelerating language documentation, community archiving, and semi-automated transcription for endangered or low-resource languages using desktop-deployed ASR tools.

## Institutions / 機構

University of Melbourne

**Funding / 經費:** Australian Research Council, Language Data Commons of Australia, Petascale Campus Initiative

## Related

- [Speech Recognition to Accelerate Documentation of Marquesan and Cook Islands Māori](teikitohe26_interspeech.md) — same problem · relatedness 2.2/3
- [Bootstrapping Endangered Language ASR with Short-Form Corpora](bartley26_interspeech.md) — same problem · relatedness 2.2/3
- [Hamsa: A Manually Annotated Emirati Arabic Corpus for Speech and Language Technologies](alyafeai26_interspeech.md) — same problem · relatedness 2.0/3
- [Genealogical Priors in Self-Supervised Learning: Improving Speech Technology for Low-Resource Languages](granda26_interspeech.md) — same problem · relatedness 2.0/3
- [Preserving the Iranian Turkic Language: Community-Driven ASR Datasets and Benchmarking for South Azerbaijani](farsi26_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
