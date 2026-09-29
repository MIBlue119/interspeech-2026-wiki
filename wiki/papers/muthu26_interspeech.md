---
id: muthu26_interspeech
category: asr
labels: [self-supervised]
institutions: ["SRM Institute of Science and Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-696
pdf: https://www.isca-archive.org/interspeech_2026/muthu26_interspeech.pdf
---

# DysfluentNet: Joint Stuttering Event Detection and Dysfluency-Aware Transcription via Hierarchical Self-Supervised Learning

*Mohankumar Muthu, Sasikala E, Girirajan S*

[PDF](https://www.isca-archive.org/interspeech_2026/muthu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/muthu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-696)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — DysfluentNet is a hierarchical multi-task framework that jointly performs fine-grained stuttering event detection and dysfluency-aware transcription from raw waveforms. Evaluated on SEP-28k and FluencyBank, it achieves a macro F1 of 72.4 on stuttering detection and a dysfluency-inclusive word error rate (DI-WER) of 18.3.

## Key contributions

- A hierarchical multi-task architecture coupling a frozen WavLM-Large encoder with a multi-label dysfluency classifier and a dysfluency-conditioned CTC decoder.
- Stutter-Aware CTC (SA-CTC), a modified CTC objective integrating stuttering tokens and utterance-conditioned temporal alignment regularization.
- A curriculum learning protocol across five annotator-agreement tiers of SEP-28k based on Fleiss' kappa thresholds.
- Public release of code, configurations, and evaluation splits.

## Problem

Stuttering affects approximately 70 million people worldwide, but modern automatic speech recognition (ASR) systems perform poorly on dysfluent speech because they are trained predominantly on fluent corpora. Furthermore, automatic stuttering detection and transcription have historically been treated as independent pipelines rather than mutually constrained tasks. Standard ASR word error rate metrics also penalize systems for faithfully transcribing dysfluencies by comparing them against normalized fluent transcripts. Addressing these gaps is crucial for both clinical monitoring tools and accessible voice interfaces.

## Method

DysfluentNet uses a frozen WavLM-Large encoder (317M parameters, 24 layers) as a shared feature extractor. A learned weighted sum across layers produces frame-level representations, where the detection head concentrates on upper semantic layers (18-22) and the transcription decoder draws on lower-to-mid phonetic layers (6-15). The multi-label detection head applies attentive statistics pooling followed by a linear classifier and binary cross-entropy with focal loss (gamma=2) to predict six classes: block (BLK), prolongation (PRO), sound repetition (SR), word repetition (WR), interjection (INT), and fluent (FLU).

The transcription branch uses a bidirectional LSTM decoder (2 layers, 512 units per direction) operating on the shared encoder output. The standard CTC vocabulary is augmented with five explicit dysfluency token types (<BLK>, <PRO>, <SR>, <WR>, <INT>). Detection logits are sigmoid-activated, broadcast across frames, and passed through a cross-attention gating layer to condition the decoder without over-constraining temporal placement. Precise temporal alignment is enforced via the SA-CTC objective, which uses a per-frame soft mask derived from attentive statistics pooling weights scaled by utterance-level detection confidence, governed by an alignment penalty lambda = 0.2 and CTC weight beta = 0.5.

Training uses a curriculum learning schedule partitioning SEP-28k clips into five difficulty tiers based on Fleiss' kappa (from kappa >= 0.80 down to kappa < 0.40). The active training set expands by one tier per epoch for the first five epochs, after which the full dataset is used. The model is optimized using AdamW (peak LR 3e-4, 10% warm-up, weight decay 1e-2), a batch size of 48, mixed-precision BF16 training on an NVIDIA RTX 5090 GPU, and SpecAugment.

## Experimental setup

Evaluated on SEP-28k (22,541 train, 2,818 validation, and 2,818 test clips) and FluencyBank (315 test utterances from 32 speakers). Compared against baselines including StutterNet, MC-SN, wav2vec 2.0 + SVM, Whister, LLM-Dys, Whisper large-v3, and SSDM 2.0. Metrics include macro F1 (F1mac), standard Word Error Rate (WER), and Dysfluency-Inclusive WER (DI-WER). Trained for up to 60 epochs with early stopping (patience 10) on validation macro F1.

## Results

DysfluentNet achieves a macro F1 of 72.4% on SEP-28k stuttering event detection, outperforming the best published baseline (LLM-Dys at 65.6%) by 6.8 points, with the largest gains in minority classes like block detection (rising from 33.1 to 44.7) and sound repetition (51.2 to 60.8). On FluencyBank, it achieves a DI-WER of 18.3%, improving over SSDM 2.0 (22.4%) by 4.1 points, while maintaining a competitive standard WER of 13.8%.

Ablation studies show that removing curriculum learning drops macro F1 by 3.3 points (to 69.1%), removing SA-CTC conditioning drops it by 2.1 points (to 70.3%), and replacing WavLM with wav2vec 2.0 drops it by 4.6 points (to 67.8%). For transcription on FluencyBank, removing curriculum or SA-CTC similarly degrades DI-WER.

| System | SEP-28k F1mac | FluencyBank F1 | WER | DI-WER |
|---|---|---|---|---|
| LLM-Dys / SSDM 2.0 | 65.6 | 77.2 | 14.3 | 22.4 |
| DysfluentNet (w/o curriculum) | 69.1 | 79.4 | -- | -- |
| DysfluentNet (w/o SA-CTC) | 70.3 | 80.7 | 14.9 | 21.6 |
| DysfluentNet (wav2vec 2.0) | 67.8 | 78.1 | -- | -- |
| DysfluentNet (Ours) | 72.4 | 81.5 | 13.8 | 18.3 |

## Limitations

The framework is evaluated exclusively on English-language corpora, limiting generalizability to other languages due to WavLM pre-training distribution and dataset label constraints. The SA-CTC alignment window is fixed at +/- 15 frames (~0.3 seconds), which may suboptimally capture the diverse temporal extents of varied dysfluency types such as blocks versus interjections. Additionally, the FluencyBank evaluation is restricted to 32 speakers, and broader cross-accent, age, and severity subgroup evaluations remain unaddressed.

## Why read this

Speech and ML researchers working on speech pathology or dysfluent ASR should read this paper to see how joint multi-task modeling and curriculum learning can dramatically improve minority-class stuttering detection without harming fluent transcription.

## Code

- https://github.com/mm0718-srmist/dysfluentnet

## Applications

Automated clinical speech therapy monitoring and dysfluency-inclusive ASR accessibility systems for people who stutter.

## Institutions / 機構

SRM Institute of Science and Technology

**Funding / 經費:** Department of Science and Technology

## Related

- (link related pages by id as the wiki grows)
