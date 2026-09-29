---
id: kheir26b_interspeech
category: applications-other
labels: [low-resource, self-supervised, dataset-or-benchmark-release]
institutions: ["German Research Center for Artificial Intelligence", "Technical University of Berlin", "University of Sheffield", "University of New South Wales", "Alexandria University", "Qatar Computing Research Institute", "Taibah University", "HUMAIN"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2445
pdf: https://www.isca-archive.org/interspeech_2026/kheir26b_interspeech.pdf
---

# IQRA 2026: Interspeech Challenge on Automatic Assessment Pronunciation for Modern Standard Arabic (MSA)

*Yassine El Kheir, Ahmed Ali, Ahmed Ali, Ahmed Ali, Ahmed Ali, Ahmed Ali, Ahmed Ali, Ahmed Ali*

[PDF](https://www.isca-archive.org/interspeech_2026/kheir26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kheir26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2445)

**Category:** `applications-other` · **Labels:** `low-resource`, `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — The IQRA 2026 Interspeech Challenge benchmarked automatic Mispronunciation Detection and Diagnosis (MDD) for Modern Standard Arabic, achieving an F1-score of 0.7201 (a 0.28 jump over the previous edition) by combining authentic human error data with advanced SSL architectures and generative models.

## Key contributions

- Introduced Iqra Extra IS26, the first publicly available dataset of real human mispronounced Modern Standard Arabic (MSA) speech comprising 1,333 utterances (1.5 hours).
- Expanded the benchmark evaluation suite with QuranMB.v2, containing 1,643 expert-annotated utterances (2.5 hours).
- Evaluated 19 diverse submitted systems spanning enhanced CTC temporal modeling, optimal transport alignment, agreement-based multi-model data filtering, and large audio-language models (LALMs).
- Demonstrated that incorporating small amounts of authentic human error data drastically outperforms relying solely on synthetic TTS-augmented training sets.

## Problem

Modern Standard Arabic (MSA) pronunciation assessment suffers from a severe lack of open standardized benchmarks, reproducible evaluation protocols, and annotated corpora of mispronounced speech. Arabic's complex phonology (34 phonemes, pharyngeal/uvular sounds, and emphatic/non-emphatic contrasts) combined with diglossia (where native speakers of regional dialects acquire MSA as a second language) creates a distinct error space. Prior editions of Arabic MDD tasks suffered from low performance (best F1 ~0.47) and an absence of real human mispronounced speech corpora, forcing models to rely purely on synthetic artifacts and limiting generalization.

## Method

The challenge task requires predicting pronounced phoneme sequences from speech utterances given reference vowelized transcripts, evaluated against a 68-phoneme MSA inventory derived from the Halabi phonetizer. The baseline utilizes a frozen 94M-parameter mHuBERT encoder with a SUPERB-style weighted layer sum, a 2-layer 1024-unit Bi-LSTM, and CTC loss.

Top submissions introduced diverse architectural and training strategies. The winning team (whu-iasp) utilized a frozen wav2vec2-xls-r-300m encoder with learnable multilayer weighted fusion, a Temporal Convolutional Network (TCN), multi-checkpoint confusion network decoding with edit distance aggregation, and Kneser-Ney n-gram language model rescoring. A two-stage curriculum first trained on Iqra train (79h) and Iqra TTS (52h), then adapted to Iqra Extra IS26 (1.5h). The runner-up (UTokyo) introduced CROTTC, replacing standard CTC frame alignment with 1D Optimal Transport Temporal Classification (OTTC) for dense frame-level alignments, coupled with consistency regularization via stochastic perturbations and shallow Transformer LM fusion.

Other notable designs included RAM's agreement-based multi-model filtering over three Wav2vec2.0 instances, SQZww's U2++ Conformer encoder with bidirectional Transformer decoder via joint CTC/attention loss, Najva's fine-tuning of the NVIDIA FastConformer Hybrid Large model, and Kalimat's pioneering application of a generative LALM (Qwen3ASR 1.7B) using parameter-efficient Low-Rank Adaptation (LoRA, rank=64, alpha=128) on decoder linear projections while keeping the audio encoder frozen.

## Experimental setup

Evaluations used QuranMB.v2 (1,643 utterances, ~2.5 hours of real human-annotated MSA speech). Training data included Iqra train (~79 hours, 74k utterances from Common Voice Ar v12 and Qur'anic recitation), Iqra TTS (~52 hours, 55.4k synthetic utterances generated via 7 single-speaker TTS systems and a phoneme confusion matrix), and Iqra Extra IS26 (~1.5 hours, 1,333 real mispronounced utterances). Systems were compared against the organizer's mHuBERT baseline across 19 participating teams using Precision, Recall, F1-score, Phoneme Error Rate (PER), True Accept (TA), False Reject (FR), False Accept (FA), and Correct Diagnosis (CD).

## Results

The top-performing system (whu-iasp) achieved a headline F1-score of 0.7201, a precision of 0.7416, recall of 0.6998, and a low PER of 0.0365, outperforming the organizer baseline F1 of 0.4414 by 0.2787 absolute points. The top three entries (whu-iasp, UTokyo at F1=0.7170, and RAM at F1=0.7157) clustered closely despite distinct methodologies, and 13 of 19 teams surpassed the baseline. Systems that lagged behind the baseline exhibited high recall (e.g., frenchfries at 0.8651) paired with very poor precision (0.1228), demonstrating a degenerate bias toward classifying all phonemes as errors.

| Rank | System | F1 ↑ | Precision ↑ | Recall ↑ | PER ↓ |
|---|---|---|---|---|---|
| 1 | whu-iasp | 0.7201 | 0.7416 | 0.6998 | 0.0365 |
| 2 | UTokyo | 0.7170 | 0.7325 | 0.7020 | 0.0372 |
| 3 | RAM | 0.7157 | 0.6769 | 0.7593 | 0.0405 |
| 4 | SQZww | 0.6996 | 0.7004 | 0.6987 | 0.0402 |
| 5 | Najva | 0.6894 | 0.7200 | 0.6613 | 0.0400 |
| 6 | Kalimat | 0.6702 | 0.6666 | 0.6738 | 0.0445 |
| – | Baseline | 0.4414 | 0.3039 | 0.7707 | 0.1308 |

## Limitations

The primary dataset of authentic mispronunciations (Iqra Extra IS26) remains relatively small at 1,333 utterances (~1.5 hours), limiting exposure to diverse dialectal error profiles. Current models output phoneme-level sequences rather than actionable character-level or diacritic-level script feedback, creating a difficult mapping gap for end-user Arabic language learners. Furthermore, evaluation is constrained to Modern Standard Arabic and Qur'anic recitation corpora, leaving spontaneous regional dialects underexplored.

## Why read this

Speech and ML researchers working on computer-aided pronunciation training (CAPT) or low-resource speech assessment should read this to understand how combining tiny real-error corpora with SSL-based temporal alignment (or parameter-efficient generative LALMs) solves Arabic MDD.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-Aided Pronunciation Training (CAPT) software for Modern Standard Arabic second-language learners and automated Qur'anic recitation assessment tools.

## Institutions / 機構

German Research Center for Artificial Intelligence, Technical University of Berlin, University of Sheffield, University of New South Wales, Alexandria University, Qatar Computing Research Institute, Taibah University, HUMAIN

## Related

- (link related pages by id as the wiki grows)
