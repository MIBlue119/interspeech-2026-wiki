---
id: loweimi26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-798
pdf: https://www.isca-archive.org/interspeech_2026/loweimi26b_interspeech.pdf
---

# Phonetic Error Analysis of Raw Waveform Acoustic Models

[PDF](https://www.isca-archive.org/interspeech_2026/loweimi26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/loweimi26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-798)

**TL;DR** — This paper analyzes phonetic error distributions and confusion patterns of raw waveform acoustic models on TIMIT phone recognition, achieving a best-reported raw waveform test PER of 15.3% trained from scratch and 12.3% with WSJ transfer learning.

## Problem

While overall phone error rate (PER) is the standard evaluation metric for speech recognition, it hides which broad phonetic classes (BPCs) contribute most to errors and how classes are confused. Although raw waveform models jointly learn speech parameterisation and avoid lossy feature engineering, their fine-grained error behavior, susceptibility to temporal dynamics, and behavior under transfer learning compared to filterbank systems remain unexplored.

## Method

The authors propose an acoustic model architecture combining a convolutional front-end (either non-parametric CNN, SincNet with rectangular filters, or Sinc2Net with triangular filters) followed by Bidirectional LSTM layers and a fully-connected layer. The network uses a dual-head output structure with context-dependent (CD) state-clustered triphones as the primary head and context-independent (CI) monophones for regularisation, trained using cross-entropy loss via PyTorch-Kaldi. The CNN layer uses 128 kernels of length 129 with max pooling of size 4, the fully-connected layer has 1024 nodes, and BLSTM layers contain 550 nodes per direction. Experiments evaluate performance on TIMIT with and without Wall Street Journal (WSJ) transfer learning across three phonetic categorisations.

## Results

Models are evaluated on the TIMIT dataset using phone error rate (PER), comparing against baseline filterbank (FBank-83) systems and prior raw waveform architectures. Trained solely on TIMIT, the proposed Sinc2Net+BLSTM model achieves 13.9% Dev and 15.3% Test PER, setting a new state of the art for raw waveform models. With WSJ transfer learning, the CNN+BLSTM model achieves 11.3% Dev and 12.3% Test PER, outperforming the FBank-83-WSJ baseline. Ablation analyses reveal that BLSTM layers yield the greatest PER reductions on transition-dependent classes like Diphthongs (28% average relative gain) and Fricatives (19%), whereas WSJ transfer learning delivers a consistent 3:1 consonant-to-vowel gain asymmetry, improving consonants by ~30% while vowels improve by only ~10%. Confusion matrix analysis demonstrates that dominant confusions (such as Plosives vs. Fricatives and Vowels vs. Diphthongs) mirror those of filterbank systems, reflecting inherent phonetic similarities rather than model-specific artifacts.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers designing raw waveform end-to-end speech recognition systems, acoustic models, or performing phonetic error diagnostics.

## Limitations

Analysis of certain classes like affricates is constrained by small sample sizes in the evaluation corpus.

## Related

- (link related pages by id as the wiki grows)
