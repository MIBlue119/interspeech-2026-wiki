---
id: oliveira26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2597
pdf: https://www.isca-archive.org/interspeech_2026/oliveira26b_interspeech.pdf
---

# Too Good to Be True: A Study on Modern Automatic Speech Recognition Systems for the Evaluation of Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/oliveira26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/oliveira26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2597)

**TL;DR** — This study evaluates how different modern ASR models perform as proxies for human listening tests when assessing speech enhancement (SE) systems, finding that transducer and large-scale weakly supervised models correlate best with human transcription accuracy despite susceptibility to noise and hallucinations.

## Problem

Word error rate (WER) derived from automatic speech recognition is frequently used to evaluate speech enhancement performance, but WER scores vary wildly depending on undisclosed ASR choices and text normalization pipelines. Furthermore, it remains unclear whether modern ASR models—which leverage powerful language priors and noise robustness—truly reflect human acoustic intelligibility or if their internal biases skew the evaluation of SE artifacts.

## Method

The authors evaluate six ASR models ranging from 18.9M to 600M parameters (QuartzNet-15x5, wav2vec2 LARGE LV-60k, Parakeet TDT v2, Whisper Base, Whisper Large v3 Turbo, and Distil-Whisper Large v3) against human listening experiments involving 20 participants. The listening dataset comprises 30 speech files from the EARS-WHAM test set corrupted across multiple SNRs and processed by five distinct SE paradigms: predictive (NCSN++M, SE-Mamba), generative (SGMSE+, SB-SGMSE+), and hybrid (StoRM). Greedy decoding without external LMs is used across all models, and text is standardized using jiwer with added punctuation removal and number expansion.

## Results

Parakeet TDT v2 achieved the highest system-level Spearman correlation with human recognition accuracy (SRCC = 1.00 [0.86, 1.00]), followed closely by Whisper variants (SRCC = 0.96 to 1.00). On clean audio, human word accuracy (WAcc) averaged 95.1%, while ASR models like Distil-Whisper reached up to 98.1%. However, Whisper models exhibited severe insertion errors and looping at low SNRs, yielding WAccs as low as -2061% due to hallucinations. Ablations on text normalization revealed that failing to strip punctuation caused a ~10% WAcc penalty and altered system rankings in up to 18.6% of samples for CTC models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing or benchmarking speech enhancement systems who wish to choose appropriate, human-aligned ASR models for automated intelligibility evaluation.

## Limitations

The listening experiments were restricted to English-language speech files from a single dataset (EARS-WHAM) and evaluated a fixed set of five SE models and six ASR architectures.

## Related

- (link related pages by id as the wiki grows)
