---
id: lee26t_interspeech
category: asr
institutions: ["NTT"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2132
pdf: https://www.isca-archive.org/interspeech_2026/lee26t_interspeech.pdf
---

# Progressive Alignment Objectives for Aligner-Encoder based ASR

*Jaeyoung Lee, Masato Mimura, Takafumi Moriya*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26t_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26t_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2132)

**Category:** `asr`

**TL;DR** — InterAligner introduces progressive intermediate alignment and CTC objectives to Aligner-Encoder ASR to prevent late-layer alignment bottlenecks, reducing LibriSpeech test-other WER from 7.8 to 5.6.

## Key contributions

- Proposes InterAligner, an auxiliary intermediate Aligner objective operating on a longer, finer-grained token sequence at an upper encoder layer to stage alignment formation.
- Integrates an early-layer intermediate CTC loss (InterCTC) to stabilize optimization and improve intermediate token-predictive representations.
- Demonstrates substantial word error rate reductions on LibriSpeech (down to 3.1/5.6 on test-clean/other) and Common Voice English.
- Shows that InterAligner disproportionately improves speech recognition robustness on very long utterances (>21 seconds), slashing long-form test-other WER from 18.0 to 13.5.

## Problem

Standard Aligner-Encoders replace traditional cross-attention or transducer lattices by having the encoder self-attention learn explicit monotonic alignments directly, but this alignment typically forms abruptly only in the final top layers. This late-layer bottleneck creates severe training brittleness and high sensitivity, especially on long utterances where the large mismatch between acoustic frame counts and token lengths leads to catastrophic alignment failures. Prior auxiliary methods like standard CTC or uniform intermediate supervision do not directly target or structure this internal self-attention alignment mechanism.

## Method

The architecture is built on a 17-layer Conformer-L encoder totaling approximately 118M parameters. The baseline Aligner-Encoder passes input features $X$ through an encoder $f_{enc}$, where a feed-forward joiner $f_{joint}$ combines acoustic embeddings $h_u$ and prediction network embeddings $g_u$ (from a 1-layer LSTM predictor) via a one-to-one pairing without full $T' 	imes U$ lattices. 

To cure the late-layer bottleneck, InterAligner attaches an intermediate Aligner objective at layer 15 ($\ell_{int}$) utilizing a finer-grained target BPE vocabulary size of 256 (yielding longer token sequence $U_{int}$) with its own separate predictor-joiner head. Concurrently, an intermediate CTC loss ($L_{ctc}$) is attached at layer 12 ($\ell_{ctc}$) with a matching vocabulary size of 256 and a fixed weight $\lambda_{ctc} = 0.1$. The final Aligner head at layer 17 uses a coarser 1024 BPE vocabulary. The losses are combined hierarchically to form a curriculum over alignment difficulty, forcing the network to transition representations progressively: frames to fine tokens at layer 12/15, and fine tokens to coarse tokens at layer 17.

During inference, decoding operates sequentially using beam search (beam width 6) over the final Aligner head.

## Experimental setup

Evaluated on LibriSpeech (960 hours) reporting WER on test-clean and test-other, and Common Voice 16.1 English (punctuation removed). Trained for 100 epochs on LibriSpeech and 50 epochs on Common Voice with model averaging over the 10 best checkpoints using an effective batch size of roughly 2 hours of audio. Uses Transformer warmup/decay schedules with 20k warmup steps and peak learning rates set to 0.0020 or 0.0025.

## Results

On LibriSpeech, the baseline final-only Aligner yields 5.0/7.8 WER (clean/other). Adding InterCTC drops this to 3.4/6.0, and adding InterAligner further improves the system to 3.1/5.6 WER. On Common Voice English, the final-only Aligner obtains 12.4% WER, improved by InterCTC to 11.2%, and further optimized by InterAligner to 10.9%. Utterance length stratification reveals that InterAligner's gains concentrate on segments longer than 21 seconds, where test-other WER drops from 18.0 to 13.5.

| System | test-clean | test-other |
| --- | --- | --- |
| Final Aligner only (ours) | 5.0 | 7.8 |
| + InterCTC | 3.4 | 6.0 |
| + InterAligner | 3.1 | 5.6 |
| Common Voice: Final Aligner only | - | 12.4 |
| Common Voice: + InterAligner | - | 10.9 |

## Limitations

Evaluated strictly on English datasets (LibriSpeech and Common Voice) without exploring multilingual scaling or low-resource generalization. The framework relies heavily on hyperparameter tuning of loss weights ($\lambda_{final}, \lambda_{int}$) and intermediate layer placement (optimal at layer 15). The study does not evaluate streaming or low-latency constraints.

## Why read this

Speech researchers and ML engineers working on non-autoregressive or Aligner-Encoder architectures will find this an essential read for mastering stable training techniques and unlocking long-form robustness.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Offline automatic speech recognition, long-form audio transcription, and efficient sequence-to-sequence speech processing pipelines.

## Institutions / 機構

NTT

## Related

- (link related pages by id as the wiki grows)
