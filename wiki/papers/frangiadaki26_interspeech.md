---
id: frangiadaki26_interspeech
category: asr
labels: [low-resource, self-supervised, dataset-or-benchmark-release]
institutions: ["Athena Research Center"]
code: https://github.com/athena-ilsp/lyrics-transcription
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1371
pdf: https://www.isca-archive.org/interspeech_2026/frangiadaki26_interspeech.pdf
---

# Automatic Lyric Transcription for Greek Songs: Scaling and Task Composition Effects in Whisper Adaptation

*Maria Frangiadaki, Dimitrios Damianos, Kosmas Kritsis, Vassilis Katsouros*

[PDF](https://www.isca-archive.org/interspeech_2026/frangiadaki26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/frangiadaki26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1371)

**Category:** `asr` · **Labels:** `low-resource`, `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — This paper establishes the first benchmark for Automatic Lyric Transcription (ALT) in Greek by curating the GAD-ALT dataset and evaluating Whisper adaptation strategies. A two-stage fine-tuning approach on Whisper Large-v3 achieves a word error rate (WER) of 27.2%.

## Key contributions

- Curated GAD-ALT, the first segment-level aligned Greek singing dataset comprising 17,458 segments (19.65 hours) with source-separated vocals and English translations.
- Conducted a systematic evaluation of Whisper model scaling, multitask learning ratios, and two-stage speech-to-singing adaptation for low-resource ALT.
- Introduced a task-pure batching scheme with language-aware pre-processing that stabilizes training on singing voice.
- Provided a quantitative and qualitative error taxonomy tailored to Greek lyrics, identifying semantic substitutions, boundary drift, and orthographic ambiguities as major challenges.

## Problem

Automatic lyric transcription is substantially harder than standard speech recognition due to melodic variability, pitch excursions, sustained vowels, melisma, and instrumental accompaniment. For low-resource languages like Greek, these challenges are compounded by a complete lack of prior benchmarks, aligned singing corpora, and reproducible evaluation protocols. While foundation models like Whisper excel at speech, their zero-shot accuracy degrades severely on polyphonic singing voice, necessitating dedicated domain adaptation strategies.

## Method

The authors utilize OpenAI's Whisper model (Small, Medium, and Large-v3) as the base architecture, experimenting with model capacities ranging from 244M to 1.55B parameters. The input audio consists of 16 kHz mono vocal stems extracted from polyphonic tracks using Hybrid Transformer Demucs (htdemucs_ft) and segmented into 30-second overlapping windows. Training incorporates three main paradigms: transcription-only supervised fine-tuning, multitask learning with interleaved Greek transcription and English translation tokens at 2:1 and 4:1 ratios via deterministic samplers, and a two-stage curriculum. In the two-stage curriculum, Stage 1 freezes the encoder and fine-tunes solely on 37.5 hours of read speech from the Greek Common Voice (v23.0) dataset, while Stage 2 unfreezes the entire network for training on the GAD-ALT singing corpus.

All models are optimized using AdamW via the Hugging Face Seq2SeqTrainer on NVIDIA A100 nodes for 5 epochs using mixed-precision FP16. A learning rate of 5e-5 is used for Small and Medium variants, while 3e-5 is applied to Large-v3. Per-GPU batch sizes range from 4 to 8 segments. The evaluation metric is the normalized Word Error Rate (WER) computed via the jiwer library after lowercasing, punctuation removal, and standard text normalization.

## Experimental setup

Evaluated on the GAD-ALT dataset containing 19.65 hours (17,458 segments) split into 13,750 training, 1,892 validation, and 1,816 test segments with an average duration of 4 seconds. Compared against zero-shot Whisper baselines (Small, Medium, Large-v3). Notable implementation details include multi-GPU NVIDIA A100 training, FP16 precision, and 5 training epochs.

## Results

Zero-shot evaluation exhibits a strong scaling trend but yields unacceptably high error rates: 92.3% for Small, 65.1% for Medium, and 53.6% for Large-v3. Supervised adaptation dramatically bridges the domain gap. For Whisper Small, a 2:1 transcribe-translate multitask ratio achieves the best performance at 33.6% WER, acting as a beneficial regularizer. For Whisper Medium and Large-v3, larger capacities absorb linguistic structure from pretraining better, allowing transcription-only and two-stage adaptation to outperform multitask learning. Specifically, the two-stage adaptation reaches 30.1% WER for Medium and 27.2% WER for Large-v3. Ablations show that training on source-separated isolated vocal stems yields better results (27.2% to 28.4% WER) compared to training on raw polyphonic mixtures (33.4% WER).

| Training Setup | Small | Medium | Large-v3 |
|---|---|---|---|
| Zero-shot | 92.3 | 65.1 | 53.6 |
| 2:1 transcribe-translate | 33.6 | 32.3 | 30.7 |
| 4:1 transcribe-translate | 34.9 | 31.6 | 30.2 |
| Transcribe-only | 36.7 | 30.3 | 28.4 |
| 2 stages transcribe | 36.6 | 30.1 | 27.2 |

## Limitations

The dataset is restricted to Greek songs (roughly 20 hours), which limits multi-language generalization. The intermediate speech domain used in Stage 1 relies on read speech with controlled prosody from Common Voice, which may be acoustically too distant from spontaneous singing compared to expressive or conversational speech corpora. The study does not evaluate parameter-efficient tuning methods like LoRA or incorporate explicit language model rescoring.

## Why read this

Speech and ML engineers working on low-resource domain adaptation or music information retrieval will find this a definitive blueprint for adapting multilingual ASR foundation models to singing voices. Readers will take away concrete recipes regarding when multitask regularization helps versus when direct transcription-only and staged fine-tuning dominate at scale.

## Code

- https://github.com/athena-ilsp/lyrics-transcription

## Applications

Automatic lyric transcription, music information retrieval systems, karaoke synchronization, and cross-lingual alignment for under-resourced musical traditions.

## Institutions / 機構

Athena Research Center

**Funding / 經費:** European High-Performance Computing Joint Undertaking, Pharos AI Factory, Greek Ministry of Digital Governance and Artificial Intelligence

## Related

- [Beyond Standard Greek: Adapting Whisper for Greek Dialects through Curriculum Multitask Learning](klimi26_interspeech.md) — same problem · relatedness 2.1/3
- [Hamsa: A Manually Annotated Emirati Arabic Corpus for Speech and Language Technologies](alyafeai26_interspeech.md) — shared technique · relatedness 2.0/3
- [Pashto Common Voice: Building the First Open Speech Corpus for a 60-Million-Speaker Low-Resource Language](rahman26_interspeech.md) — shared data / evaluation · relatedness 2.0/3
- [Probing LoRA-to-LoRA Cross-Lingual Transfer for Unseen Low-Resource Conditions in Whisper-Based ASR](mondal26_interspeech.md) — shared technique · relatedness 1.9/3
- [Which Languages Transfer Best to Warlpiri? A Similarity-Based Study for Low-Resource ASR](mylvaganam26b_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
