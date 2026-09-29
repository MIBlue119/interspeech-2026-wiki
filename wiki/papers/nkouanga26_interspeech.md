---
id: nkouanga26_interspeech
category: asr
institutions: ["Portland State University", "US Army Research Laboratory"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3191
pdf: https://www.isca-archive.org/interspeech_2026/nkouanga26_interspeech.pdf
---

# Mitigating Speaker Leakage in Cascaded Multi-talker ASR with Diarization-based Transcript Correction

*Hermann Yepdjio Nkouanga, Minwei Luo, Maggie Wigness, Suresh Singh*

[PDF](https://www.isca-archive.org/interspeech_2026/nkouanga26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nkouanga26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3191)

**Category:** `asr`

**TL;DR** — The paper introduces a multimodal, pruning-based post-processing correction algorithm for cascaded multi-talker ASR that removes speaker leakage using a tripartite consensus of acoustic containment, lexical cross-validation, and temporal alignment, achieving up to a 29% relative cpWER reduction on high-leakage subsets.

## Key contributions

- Proposed a novel diarization-based pruning algorithm to detect and correct speaker leakage errors in cascaded multi-talker ASR systems.
- Demonstrated significant cpWER reductions across synthetic (Libri2Mix, LibriSpeechMix) and organic meeting datasets (AMI).
- Evaluated an experimental multi-task architecture incorporating a diarization head into a speech separation backbone (MossFormer2) to study signal-level leakage suppression and generalization challenges.
- Conducted an ablation showing that a multi-modal tripartite consensus prevents the over-correction common in text-only or acoustic-only pipelines.

## Problem

Cascaded multi-talker ASR systems achieve modularity by chaining speech separation models with ASR transcribers, but their performance is fundamentally limited by separation quality. Imperfect separation causes speaker leakage, where residual speech from interfering speakers contaminates output streams and corrupts speaker attribution. Prior post-processing approaches primarily rely on lexical re-labeling or computationally expensive LLMs which suffer from hallucinations, latency, and over-correction in ambiguous high-leakage scenarios.

## Method

The proposed correction algorithm processes separated audio streams A and B along with initial ASR transcripts T1 and T2 consisting of word, start time, and end time tuples. First, pyannote.audio 3.1 is applied to A and B to obtain leakage windows WA representing temporal intervals of interfering speech. A word tuple in T1 is flagged as leakage if it satisfies a tripartite consensus: Acoustic Containment (Ca: temporally inside a leakage window), Lexical Cross-Validation (Clex: word exists in parallel transcript T2), and Temporal Alignment (Ctemp: matching word in T2 with overlapping time interval). Pruning is only triggered if global transcript similarity computed via the Ratcliff/Obershelp algorithm exceeds an adaptive threshold gamma = 0.40; otherwise, separation is deemed successful and correction is skipped.

In parallel, an exploratory multi-task framework augments the MossFormer2 separation backbone—which encodes 512-dimensional frame representations via 24 interleaved FLASH self-attention and Gated Feedforward Sequential Memory Network iterations—with a 2-layer transformer diarization head. This head uses 8-head self-attention and position-wise feed-forward networks to predict frame-level speaker probabilities. The joint network minimizes a multi-task loss L_total = L_sep + lambda_diar * L_diar, where lambda_diar = 20.0 and L_diar is cross-entropy loss. Training used a phased fine-tuning schedule freezing the separation backbone for 10 epochs before unfreezing the entire module for 5 additional epochs on Libri2Mix-both.

## Experimental setup

Evaluated on Libri2Mix (test-clean and test-both sets with full overlap, 3000 samples each), LibriSpeechMix (partial overlap), and the AMI Meeting Corpus (659 two-speaker segments for both Single Distant Microphone [SDM] and Individual Headset Mix [IHM]). Evaluated using Concatenated minimumPermutation Word Error Rate (cpWER). Backbones tested include Sepformer (libri2mix pre-trained) and MossFormer2, paired with Universal-2 for transcription and pyannote.audio 3.1 for diarization.

## Results

On the full test sets, the proposed speaker leakage fix reduced cpWER across all conditions, achieving relative improvements of up to 10.55% on AMI IHM with Sepformer and 7.97% on AMI SDM with MossFormer. On high-leakage subsets (transcript similarity > 0.4), the proposed fix yielded dramatic relative cpWER reductions, peaking at 29.26% for MossFormer on AMI IHM (dropping from 65.58% to 46.39%) and 28.96% on LibriSpeechMix 2spk. In contrast, the joint MossFormer-Diarization model suffered significant degradations on cleaner domains like LibriSpeechMix (+18.91%) and AMI IHM (+20.78%), revealing domain shift sensitivity. Ablation studies demonstrated that text-only pruning degrades performance via over-correction, acoustic-only pruning reduces WER but underperforms the full multimodal tripartite consensus.

| System / Condition | Libri2Mix Clean | Libri2Mix Both | LibriSpeechMix 2spk | AMI SDM | AMI IHM |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Sepformer Baseline | 3.24 | 16.96 | 3.71 | 42.10 | 39.80 |
| Sepformer + Proposed Fix | 3.20 | 16.90 | 3.53 | 39.66 | 35.60 |
| MossFormer Baseline | 3.53 | 9.31 | 5.13 | 35.50 | 23.96 |
| MossFormer + Proposed Fix | 3.44 | 9.17 | 4.64 | 32.67 | 22.26 |
| Joint MossFormer-Diar | 3.52 | 9.23 | 6.10 | 34.77 | 28.94 |

## Limitations

The joint multi-task architecture suffers from severe domain shift and generalization issues when moving from noisy synthetic training data (Libri2Mix-both) to cleaner evaluation domains (LibriSpeechMix and AMI IHM). The pipeline depends heavily on the external quality of frame-level ASR timestamps and third-party speaker diarization models, and the evaluation was scoped strictly to two-speaker overlap conditions.

## Why read this

Speech and ML engineers building cascaded multi-talker ASR systems should read this paper to learn how a lightweight, post-processing multimodal pruning rule can outperform complex LLM re-labeling or fragile joint training paradigms.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multi-talker automatic speech recognition for meeting transcription, multi-speaker conversational AI systems, and automated court or lecture transcription.

## Institutions / 機構

Portland State University, US Army Research Laboratory

## Related

- (link related pages by id as the wiki grows)
