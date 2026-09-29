---
id: loweimi26b_interspeech
category: asr
labels: [self-supervised]
institutions: ["University of Edinburgh", "Cisco", "SLAI", "Chinese University of Hong Kong, Shenzhen", "King's College London"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-798
pdf: https://www.isca-archive.org/interspeech_2026/loweimi26b_interspeech.pdf
---

# Phonetic Error Analysis of Raw Waveform Acoustic Models

*Erfan Loweimi, Zhengjun Yue, Andrea Carmantini, Zoran Cvetkovic, Steve Renals, Peter Bell*

[PDF](https://www.isca-archive.org/interspeech_2026/loweimi26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/loweimi26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-798)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — This paper performs a granular phonetic error analysis of raw waveform acoustic models on TIMIT, establishing new state-of-the-art phone error rates (PER) of 13.9%/15.3% (Dev/Test) without transfer learning and 11.3%/12.3% with WSJ pre-training, which surpass standard filterbank baselines.

## Key contributions

- Achieved the lowest reported PER for raw waveform models trained on TIMIT by cascading parametric/non-parametric CNN front-ends with Bidirectional LSTMs.
- Provided a comprehensive per-broad-phonetic-class (BPC) breakdown of PER, substitution, deletion, and insertion errors across three distinct phonetic categorisations.
- Demonstrated that BLSTM layers yield the greatest benefit for transition-dependent classes (diphthongs, fricatives, semi-vowels, averaging 18-28% relative PER reduction).
- Revealed a consistent 3:1 consonant-to-vowel performance gain asymmetry when performing cross-corpus transfer learning from Wall Street Journal (WSJ).

## Problem

Aggregating performance into a single overall Phone Error Rate (PER) hides critical class-level deficiencies and does not explain whether raw waveform acoustic models behave fundamentally differently from traditional Filterbank-based systems. While raw waveform architectures avoid potentially lossy manual feature engineering and preserve phase information, prior studies have failed to examine how their jointly learned front-ends distribute errors across broad phonetic classes (BPCs). Understanding these fine-grained error and confusion patterns is essential for diagnosing model failure modes and guiding targeted architecture or training improvements.

## Method

The proposed architecture is a neural cascade consisting of a single convolutional layer, a Bidirectional LSTM (BLSTM) network, and a fully-connected layer. For the convolutional front-end, the authors evaluate non-parametric CNNs alongside parametric variants: SincNet (using rectangular frequency filters specified by center frequencies and bandwidths) and Sinc2Net (using Sinc-squared triangular kernels comparable to Mel Filterbanks). The convolutional layer uses 128 kernels of length 129 with max-pooling of size 4. This is followed by BLSTM layers containing 550 nodes per direction equipped with batch normalization and dropout. The network output features a dual-head setup trained with cross-entropy loss: a primary context-dependent (CD) head predicting 1936 state-clustered triphones, and a context-independent (CI) regularisation head predicting 48 monophones.

Models are trained via the PyTorch-Kaldi toolkit using a batch size of 8. For transfer learning, systems are first pre-trained on the WSJ (SI-284) corpus, after which only the weights between the penultimate and output layers are re-initialised and trained from scratch on TIMIT. The fully-connected layer employs 1024 nodes with ReLU activations and dropout. This design intentionally isolates the contribution of learnable time-domain front-ends versus temporal modelling and data scaling.

## Experimental setup

Evaluated on the TIMIT phone recognition dataset (using standard Dev and Test splits) and the Wall Street Journal (WSJ SI-284) corpus for transfer learning. Baselines include previous raw waveform literature and an 83-dimensional Filterbank baseline (80 filter energies plus 3 pitch features) paired with identical back-ends. Metrics include overall Phone Error Rate (PER), substitution/deletion/insertion breakdowns, relative per-BPC error reductions, and confusion matrices across 8-class, consonant/vowel/silence, and voiced/unvoiced/silence categorisations.

## Results

Without transfer learning, the proposed raw waveform models achieve 15.8% (CNN+BLSTM), 15.6% (SincNet+BLSTM), and 15.3% (Sinc2Net+BLSTM) Test PER, significantly outperforming prior raw waveform systems (which ranged from 16.5% to 21.9% Test PER). With WSJ transfer learning, the raw waveform models surpass the corresponding FBank-WSJ baseline (13.1% Test PER), with the CNN+BLSTM model achieving 11.3% Dev and 12.3% Test PER.

Ablations on sequential modelling show that BLSTM layers yield the highest gains for classes reliant on temporal dynamics: Diphthongs (28% relative PER reduction), Fricatives (19%), and Semi-vowels (18%), whereas stationary Vowels improve by only ~10%. Ablations on WSJ transfer learning reveal a pronounced 3:1 consonant-to-vowel gain asymmetry, where consonants improve by ~30% due to exposure to richer phonetic contexts, while vowels improve by only ~10% because WSJ provides more data but fewer total speakers than TIMIT. Raw waveform models underperform Filterbank models when data is scarce (TIMIT-only), but surpass them once sufficient training data (WSJ) is introduced.

| System | Architecture | Dev PER (%) | Test PER (%) |
|---|---|---|---|
| FBank-83 [2] | Best Filterbank Baseline | 12.8 | 14.1 |
| Raw-Wav [43] | Non-parametric CNN | 14.9 | 16.5 |
| Raw-Wav–Proposed | CNN + BLSTM | 13.9 | 15.8 |
| Raw-Wav–Proposed | SincNet + BLSTM | 14.2 | 15.6 |
| Raw-Wav–Proposed | Sinc2Net + BLSTM | 13.9 | 15.3 |
| Raw-Wav–Proposed (WSJ-TL) | CNN + BLSTM + WSJ | 11.3 | 12.3 |

## Limitations

The analysis is restricted to phoneme recognition on the clean, read-speech TIMIT corpus, meaning findings may not fully generalize to conversational speech, noisy acoustic environments, or large-vocabulary end-to-end ASR systems. The scope is bounded by the specific capacities of the evaluated architectures (single-layer CNNs paired with BLSTMs) and does not explore modern self-supervised learning representations or massive transformer-based speech models. Additionally, cross-corpus transfer improvements are bottlenecked by speaker diversity disparities between the source and target datasets.

## Why read this

Speech and machine learning researchers seeking a rigorous diagnostic breakdown of raw waveform representations versus filterbanks should read this to understand where learnable front-ends truly help. It delivers concrete evidence regarding how temporal modeling (BLSTMs) and transfer learning interact differently with distinct broad phonetic classes.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Targeted speech recognition model design, class-specific data augmentation strategies, loss function re-weighting for phone and acoustic modeling, and phonetic error diagnosis.

## Institutions / 機構

University of Edinburgh, Cisco, SLAI, Chinese University of Hong Kong, Shenzhen, King's College London

## Related

- (link related pages by id as the wiki grows)
