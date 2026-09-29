---
id: borodin26_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
institutions: ["Moscow Technical University of Communications and Informatics", "BitmanagerAI"]
code: https://github.com/lab260ru/balalaika
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-83
pdf: https://www.isca-archive.org/interspeech_2026/borodin26_interspeech.pdf
---

# Balalaika: Data-Centric, Prosody-Aware Annotation Pipeline for Russian Speech

*Kirill Borodin, Nikita Vasiliev, Vasiliy Kudryavtsev, Maxim Maslov, Mikhail Gorodnichev, Grach Mkrtchian*

[PDF](https://www.isca-archive.org/interspeech_2026/borodin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/borodin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-83)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — Balalaika is a data-centric, modular open-source pipeline for processing raw Russian audio into a 5,100-hour prosody-aware corpus, yielding consistent performance gains in speech denoising and TTS under equalized training budgets.

## Key contributions

- A modular, open-source pipeline combining semantic VAD, multi-ASR ROVER consensus, and multi-stage quality/speaker-purity filtering.
- Linguistic and prosodic text enrichment incorporating punctuation restoration, context-aware lexical stress assignment, e/yo normalization, and IPA phonemization via a custom G2P model.
- A 5,078-hour multi-source Russian speech dataset (Balalaika) accompanied by complete annotation provenance and replication scripts.
- Comprehensive empirical validation demonstrating that models trained on Balalaika data outperform those trained on 11 public Russian corpora under equalized training budgets for both speech denoising and TTS tasks.

## Problem

Publicly available speech datasets for Russian suffer from simplistic annotation, reliance on monotonous audiobooks that lack conversational prosody, or poor handling of complex linguistic phenomena such as vowel reduction, palatalization, and mobile stress. Prevailing pipelines optimized for high-resource languages ignore these morphological and prosodic nuances, resulting in unnatural text-to-speech synthesis and poor speech processing model performance. Furthermore, web audio mining is hindered by a lack of automated, scalable annotation frameworks that can simultaneously handle semantic segmentation, multi-speaker filtering, and high-fidelity transcription for under-resourced languages.

## Method

The Balalaika framework processes raw audio sequentially through eight specialized modules. First, audio is segmented using SmartTurnV3.1 semantic VAD to preserve context, discarding segments where speech share is below 70% or internal silence exceeds 1 second, and grouping consecutive chunks into 5 to 15-second windows. Second, automatic quality and speaker-purity screening removes clips shorter than 3 seconds, high impulsive-energy items with a CREST-factor > 10, low-perceptual-quality samples using NISQA-S MOS < 4.2, and multi-speaker or overlapping speech via pyannote diarization. Third, transcription generates five distinct hypotheses per segment (GigaAM-CTC-v3 plain, GigaAM-CTC-v3 with an n-gram language model for lexical priors and timestamps, GigaAM-RNNT-v3, Vosk, and T-one) which are fused using ROVER consensus decoding to minimize word errors. Fourth, timestamp extraction leverages the CTC+LM hypothesis to assign word-level boundaries.

Fifth, text streams are enriched for prosody by restoring sentence-final and intra-sentential punctuation using RuPunctBig as a proxy for phrase breaks. Sixth, context-aware lexical stress and e/yo normalization are applied using RuAccent to resolve homographs and pronunciation ambiguities. Seventh, text is converted to IPA phoneme sequences using a lightweight transformer encoder-decoder G2P model (d_model=128, d_ff=512, 3 encoder/decoder layers, 4 attention heads) trained on Wiktextract-derived IPA inventories using AdamW (lr 3e-4, batch size 256, label smoothing 0.1 for 10 epochs). Eighth, the compiled multi-layer annotated corpus integrates multi-source public Russian repositories into a unified 5,078-hour resource.

## Experimental setup

Experiments evaluate a 25-hour subset of Balalaika against 11 public Russian corpora including DeepSpeech, GOLOS-C/F, M-AILABS, OpenSTT, RuLS, RUSLAN, Common Voice (MCV), and SOVA variants. Speech denoising experiments train SEMamba from scratch using an identical budget (Adam, lr=5e-4, batch size 8, 50k steps) with MUSAN noise and RIR augmentation, evaluated on a 3,000-sample test benchmark using CSIG, CBAK, COVL, PESQ, VISQOL, STOI, and SI-SDR. TTS experiments train a VITS model from scratch under an equalized budget (Adam, lr=1e-4, batch size 32, 100k steps), evaluated on a held-out set of 2,000 texts using NISQA, UTMOS, Character Error Rate (CER), and human evaluation (MOS and IntMOS via LabelSpeech with 7 raters per clip).

## Results

Balalaika achieves top performance across objective perceptual metrics and human evaluations. For RQ1, the unified dataset outperforms all 11 baseline corpora, scoring highest in NISQA MOS (NMOS 4.484 vs M-AILABS 3.530 and RuLS 3.788), UTMOS (3.019 vs RuLS 2.816), and human MOS (4.601). For RQ2, SEMamba trained on Balalaika achieves top scores in CSIG (3.856), CBAK (3.165), COVL (3.340), PESQ (2.723), and SI-SDR (8.809 dB) compared to all baseline-trained denoisers. For RQ3, VITS trained on Balalaika achieves the highest TTS MOS (3.570), UTMOS (2.738), and human MOS (3.618), while maintaining a competitive CER of 0.1062 (second only to single-speaker RUSLAN's 0.0496, which leads in IntMOS at 3.182 vs Balalaika's 2.532). Ablations confirm that combining stress and punctuation yields the lowest CER and highest naturalness, and that raising the quality filter threshold from MOS > 3.5 to MOS > 4.2 improves both intelligibility and prosodic naturalness.

| Dataset | NMOS | TTS MOS | UTMOS | MOS ± 95% CI | CER |
|---|---|---|---|---|---|
| M-AILABS [10] | 3.530 | 3.032 | 2.307 | 2.962 ± 0.052 | 0.0908 |
| RUSLAN [37] | 3.744 | 1.913 | 2.130 | 3.253 ± 0.068 | 0.0496 |
| RuLS [11] | 3.788 | 2.927 | 2.107 | 2.750 ± 0.094 | 0.1003 |
| MCV [38] | 3.756 | 3.210 | 2.123 | 2.749 ± 0.062 | 0.2380 |
| SOVA AB [12] | 2.969 | 2.557 | 1.490 | 1.354 ± 0.063 | 0.9112 |
| Balalaika (ours) | 4.484 | 3.570 | 2.738 | 3.618 ± 0.083 | 0.1062 |

## Limitations

Models were trained under fixed data and compute budgets without running to full convergence, meaning some baseline models may be undertrained. The pipeline relies heavily on language-dependent components (ASR models, punctuation restorers, stress placers, and G2P tools) specific to Russian, limiting direct zero-shot transfer to other languages without tool replacement. Furthermore, because several source corpora are represented in Balalaika's multi-source mixture, the test evaluation set shares partial domain overlap with training data, preventing a fully source-independent evaluation.

## Why read this

Researchers and engineers building Russian speech generation systems or looking to construct automated, multi-layer web audio annotation pipelines should read this paper to adopt its robust ROVER fusion, prosody-enrichment, and data-filtering recipes.

## Code

- https://github.com/lab260ru/balalaika

## Applications

Training high-naturalness text-to-speech (TTS) systems, robust speech denoising models, and automated large-scale speech corpus mining pipelines for morphologically complex languages.

## Institutions / 機構

Moscow Technical University of Communications and Informatics, BitmanagerAI

## Related

- [Dialogs: a studio-quality expressive conversational Russian speech corpus for dialog assistants](shigabeev26_interspeech.md) — shared data / evaluation · relatedness 2.1/3
- [TriA Pipeline: A Large-Scale Automatic Audio Annotation Pipeline For Audio Classification In Specific Scenarios](lyu26_interspeech.md) — shared technique · relatedness 2.0/3
- [SpeechBench: A Unified Speech Annotation and Analysis Tool](nan26_interspeech.md) — complementary · relatedness 2.0/3
- [Collecting Prosody in the Wild: A Content-Controlled, Privacy-First Smartphone Protocol and Empirical Evaluation](koch26_interspeech.md) — shared data / evaluation · relatedness 2.0/3
- [VāṇīSetu: A Human-AI Collaborative Framework for Scalable Conversational Speech Corpus Creation in Low-Resource Settings](kumar26h_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
