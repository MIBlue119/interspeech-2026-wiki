---
id: wagner26b_interspeech
category: speech-coding
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2817
pdf: https://www.isca-archive.org/interspeech_2026/wagner26b_interspeech.pdf
---

# Content is What Remains: Invariant Speech Tokenization from Parallel Utterances

*Laurin Wagner*

[PDF](https://www.isca-archive.org/interspeech_2026/wagner26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wagner26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2817)

**Category:** `speech-coding` · **Labels:** `self-supervised`

**TL;DR** — PINT (Parallel INvariant Tokenization) fine-tunes a HuBERT encoder using parallel-utterance alignment losses and aggressive augmentations to eliminate non-linguistic nuisance variation, achieving a 98.7% relative reduction in speaker probe accuracy, a 42% lower ABX error rate, and a 27–30% lower language model perplexity versus baselines.

## Key contributions

- Formalizes semantic speech tokenization through a dual criterion: sufficient phonetic content capture and strict nuisance invariance to collapse conditional entropy.
- Proposes the PINT training framework which combines sequence-level soft-DTW, word-level contrastive loss, and autoregressive phoneme distillation across parallel data.
- Introduces a discrete Stage B optimization using student-teacher CTC alignment to guarantee sequence-level consistency in discrete code spaces.
- Demonstrates massive down-stream gains: 98.7% lower speaker probe accuracy, 42% lower across-speaker ABX error, and 27-30% lower LM test perplexity.

## Problem

Discrete speech tokens derived from standard self-supervised learning (SSL) models like HuBERT and WavLM suffer from a severe nuisance-leakage problem, where speaker identity, prosody, and channel conditions remain heavily recoverable. This variance causes token sequences to fluctuate drastically for the same underlying phonetic content, inflating conditional entropy and hurting compressibility and autoregressive predictability. Prior semantic tokenizers and neural codecs inherit this underlying feature brittleness rather than fixing it at the encoder root, forcing downstream generative and editing models to waste capacity undoing entanglement.

## Method

PINT builds upon a HuBERT-base encoder and processes audio in two stages. Stage A enforces continuous invariance and content capture via a multi-task loss combining sequence-level soft Dynamic Time Warping (sDTW, $\lambda_{\text{sdtw}}=0.5$) over parallel utterance pairs, a word-level contrastive loss ($\lambda_{\text{word}}=2$, duration-weighted cosine similarity with Jaccard-filtered negative pairs), and a teacher-forced phoneme cross-entropy loss ($\lambda_{\text{ce}}=10$) from a two-layer Transformer decoder.

Stage B transitions to discrete representations by attaching a linear projection layer mapping frames to a vocabulary of $K=200$ codes plus a blank symbol. Using a student-teacher EMA setup, an anchor utterance provides argmax token IDs that are deduplicated to form a stable reference sequence for each parallel group. The student is trained via Connectionist Temporal Classification (CTC) alongside a marginal entropy regularization loss ($L_{\text{marg}}$) and an orthogonality loss ($L_{\text{orth}}$) to prevent codebook collapse and encourage feature separability, weighted at $\lambda_{\text{id}}=0.6$ and $\lambda_{\text{m,o}}=0.3$.

The training recipe leverages diverse parallel datasets (ARCTIC, CHAINS, CSTR-VCTK, EnDialects, ESD, SynSpeech, TIMIT, and noise corpora) totaling over 500 hours of natural and synthetic parallel groups, alongside large non-parallel corpora augmented on-the-fly with additive noise, reverberation, and pitch/speed perturbations. At inference, PINT functions as a direct drop-in feature encoder or tokenizer yielding highly deterministic, deduplication-friendly sequences.

## Experimental setup

Evaluations utilize LibriSpeech (train-clean-360 for ASR BLSTM training, dev-clean/test-clean for ABX and CER/WER), CSTR-VCTK (held-out speakers for speaker probes and DTW invariance), RAVDESS (emotion probes), and LibriLight (6,000h clean subset for training 85M-parameter decoder-only transformer LMs). Baselines are HuBERT-base layer 9 and WavLM-base layer 12 using 200 k-means centroids. Models are compared using CER, WER, ABX error rates, TDNN probe accuracies, sequence DTW/edit distances, noise entropy/RMS SD, and autoregressive perplexity.

## Results

PINT achieves an outstanding reduction in speaker probe accuracy down to 1.2% (compared to 93.1% for HuBERT and 78.9% for WavLM) and lowers cross-speaker ABX error from 0.042 (WavLM) down to 0.040. In terms of downstream language modeling on LibriLight, an identical 85M-parameter transformer LM trained on PINT tokens reaches a test perplexity of 1.95, which is a 27–30% improvement over HuBERT (2.78) and WavLM (2.67), while converging 23× faster. Furthermore, PINT RLE compression achieves 152 bits/s (a 2.6× reduction from raw tokens), closely approaching pure text BPE at 116 bits/s.

Ablations demonstrate that omitting real parallel data (_synth-only_) degrades ASR/ABX performance, while dropping word-level contrastive loss or using CTC/AR-only decoders leads to severe code collapse or high speaker leakage (e.g., _dec-AR_ retains 20.1% speaker accuracy).

| System | CER ct/dis | WER ct/dis | ABX acr. | Spk Probe (%) | LM Perplexity |
|---|---|---|---|---|---|
| HuBERT-base | 4.33 / 7.55 | 10.99 / 21.37 | 0.066 | 93.1 | 2.78 |
| WavLM-base | 4.03 / 6.40 | 11.53 / 18.42 | 0.059 | 78.9 | 2.67 |
| PINT (ours) | 3.84 / 4.65 | 9.79 / 12.13 | 0.042 | 1.2 | 1.95 |

## Limitations

While PINT successfully removes speaker and noise variance, some emotional variation still leaks through (RAVDESS emotion probe accuracy is 32.1%). The approach relies heavily on parallel data availability, and although synthetic data augmentation via text-to-speech engine Kokoro alleviates this, pure synthetic training degrades absolute acoustic-phonetic performance. The evaluation is currently restricted to English speech and requires forced alignments during training preprocessing.

## Why read this

Speech and ML engineers building autoregressive speech generators, audio codecs, or disentangled voice conversion models should read this paper to learn how upstream encoder invariance can eliminate nuisance leakage, drastically boost sequence compressibility, and lower language model perplexity.

## Code

- https://github.com/nyrahealth/PINT

## Applications

Neural audio codecs, autoregressive speech generation, expressive text-to-speech, voice and accent conversion, and speech language models.

## Institutions / 機構

nyra health

## Related

- (link related pages by id as the wiki grows)
