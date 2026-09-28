---
id: lee26t_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2132
pdf: https://www.isca-archive.org/interspeech_2026/lee26t_interspeech.pdf
---

# Progressive Alignment Objectives for Aligner-Encoder based ASR

[PDF](https://www.isca-archive.org/interspeech_2026/lee26t_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26t_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2132)

**TL;DR** — InterAligner introduces progressive intermediate Aligner and CTC objectives to Aligner-Encoder ASR models, reducing LibriSpeech test-clean/other WER from 5.0/7.8 to 3.1/5.6.

## Problem

Aligner-Encoders replace traditional decoder cross-attention by predicting tokens directly from matching encoder positions, but clear diagonal alignment only forms abruptly in the top few layers. This late-layer bottleneck makes training brittle and causes severe performance degradation on long utterances where frame-to-token count mismatches are large.

## Method

The method builds on a 17-layer Conformer-L encoder (~118M parameters) with a one-layer LSTM prediction network and a feed-forward joiner network. It adds an intermediate CTC loss at layer 12 (using a 256 BPE vocabulary) and an intermediate Aligner objective at layer 15 using a longer, finer-grained token sequence with its own separate predictor-joiner head. The final Aligner loss operates at the 17th layer using a shorter, coarser 1024 BPE vocabulary. The combined loss function is minimized jointly using standard Transformer warmup and learning rate scheduling.

## Results

Evaluated on LibriSpeech 960h and Common Voice 16.1 English. On LibriSpeech test-clean/test-other, the final-only Aligner scores 5.0/7.8 WER, adding InterCTC achieves 3.4/6.0, and full InterAligner achieves 3.1/5.6. On Common Voice test, WER drops from 12.4% (baseline) to 11.2% with InterCTC and 10.9% with InterAligner. Long-utterance evaluation (>21s) on LibriSpeech shows massive improvements, cutting test-clean WER from 17.0 to 11.6 and test-other from 18.0 to 13.5. Ablations demonstrate that matching the intermediate Aligner and CTC vocabulary size (256/256) outperforms mismatched setups and that intermediate placement at layer 15 is optimal.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing efficient end-to-end ASR systems that require lightweight decoding without full attention decoders, particularly for processing long-form audio.

## Related

- (link related pages by id as the wiki grows)
