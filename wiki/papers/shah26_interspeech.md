---
id: shah26_interspeech
category: deepfake-security
labels: [multilingual, dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2573
pdf: https://www.isca-archive.org/interspeech_2026/shah26_interspeech.pdf
---

# SingFox: A Multi-Lingual Singfake Detection Corpus

*Arth J. Shah, Devanshi K. Trivedi, Himanshi U. Borad, Hemant A. Patil*

[PDF](https://www.isca-archive.org/interspeech_2026/shah26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shah26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2573)

**Category:** `deepfake-security` · **Labels:** `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — SingFox is a large-scale, multilingual singing deepfake detection corpus spanning 126.32 hours across 20 languages and 1,150 singers, featuring specialized tracks for alternative fakes and source tracing. Cross-testing models trained on various datasets yielded a highest accuracy of 77.84%.

## Key contributions

- Introduces SingFox, a multilingual singing deepfake dataset containing 113,802 audio clips across 20 languages (14 international and 6 Indic).
- Provides six distinct evaluation tracks (T1-T6) covering global languages, Indic languages, diverse music styles, alternative fakes, and source tracing.
- Incorporates multiple generation paradigms—GANs, Diffusion Models, Voice Conversion (VC), and Text-to-Music (TTM)—to improve cross-model generalization.
- Implements text-symmetric design and dual normalization (peak and RMS) to eliminate shortcut biases such as volume level, silent gaps, or vocabulary asymmetries.

## Problem

Audio Deepfake Detection (ADD) research has heavily concentrated on normal speech, leaving singing deepfakes (singfakes) underexplored despite their complex acoustic attributes like rhythm, pitch modulations, and vibrato. Existing datasets like ASVSpoof lack singing data, while current singfake corpora such as SONICS, WildSVDD, and CtrSVDD suffer from limited architectural diversity (relying on single generation classes like diffusion or LLM music generators), restricted language representation (mostly English or single-region), and text asymmetry. These limitations cause models trained on speech or narrow singing datasets to fail under real-world conditions where attacks involve diverse languages and unseen synthesis techniques.

## Method

The SingFox corpus was constructed using real audio downloaded from copyright-free sources (e.g., Pixabay) and converted to .flac at 16 kHz. To prevent shortcut biases, dual normalization (peak and RMS normalization) was applied to adjust maximum amplitude and signal energy, after which files were trimmed into 4-second chunks with no overlap in singers, languages, or data. Singfakes were synthesized using 4 distinct paradigms: 3 GAN vocoders (HiFi-GAN, BigVGAN, UnivNet), 2 diffusion models (DiffSinger, DiffRhythm), 2 voice conversion models (RVC, So-VITS-SVC), and 1 Text-to-Music model (MusicGen). Lyrics and transcripts required for symbolic-to-audio models were obtained using OpenAI's Whisper-960h large model (averaging 4.9% WER).

The dataset is divided into six tracks: T1 (14 non-Indic global languages), T2 (6 Indic languages), T3 (5 instrumental deepfake categories), T4 (supertrack of T1 and T2), T5 (alternative fakes mixing real background music with fake vocals across 3 configurations), and T6 (source verification protocol for explainability). Baseline acoustic features—such as Linear Frequency Cepstral Coefficients (LFCC), Mel-Frequency Cepstral Coefficients (MFCC), and Gammatone Frequency Cepstral Coefficients (GFCC)—combined with classifiers like ResNet, CNN, BiLSTM, and BiGRU were evaluated alongside self-supervised learning (SSL) models (Wav2Vec2, HuBERT, XLSR-Whisper, AASIST, RawNet2). A 30% subset of the data was used for training (utilizing HiFi-GAN, So-VITS-SVC, and DiffRhythm), leaving the remaining models and portions for zero-shot and cross-model testing.

## Experimental setup

Evaluations utilized 113,802 audio files (126.32 hours) across 20 languages and 1,150 singers. Baseline classifiers included ResNet paired with spectral features (LFCC, MFCC, GFCC) and backends like CNN, BiLSTM, and BiGRU, compared against SSL features (Wav2Vec2, HuBERT, XLSR-Whisper, AASIST, RawNet2). Cross-dataset experiments tested generalization using CtrSVDD, WildSVDD, and FMC datasets. Metrics reported include Detection Error Trade-off (DET) curves, Equal Error Rate (EER), Accuracy, PESQ, STOI, PCC, MSD, MCD, and Mean Opinion Score (MOS).

## Results

Baseline evaluation showed that LFCC paired with a ResNet classifier achieved an accuracy of 89.06% on source tracing (outperforming MFCC at 88.71% and GFCC at 70.34%). Traditional spectral features like LFCC with BiLSTM outperformed SSL-based Wav2Vec2 and most SOTA models on the T4 track, a phenomenon attributed to the relatively small training subset size. In cross-dataset evaluations, models trained on FMC achieved 77.84% accuracy on SingFox T4, while models trained on CtrSVDD and WildSVDD scored 46.06% and 54.17% respectively. Model-specific evaluation revealed that UniVNet generated the most easily detectable singfakes (71.17% model accuracy), whereas BigVGAN produced the highest fidelity fakes, dropping detector accuracy to 1.02%.

| Train Dataset \ Test Dataset | CtrSVDD | WildSVDD | FMC | SingFox (T4) |
|---|---|---|---|---|
| CtrSVDD | 65.87% | 43.88% | 36.13% | 46.06% |
| WildSVDD | 44.65% | 71.55% | 49.11% | 54.17% |
| FMC | 77.58% | 22.24% | 98.32% | 77.84% |

## Limitations

The study's training set was constrained to a 30% subset utilizing only a fraction of the synthesis models (HiFi-GAN, So-VITS-SVC, and DiffRhythm), which limits the upper bound of baseline performance. Human-centric subjective evaluations (MOS) were limited to non-native English speakers aged 19 to 25 due to difficulties accumulating native listeners for all 20 languages. Language-specific perceptual validation remains an open research problem.

## Why read this

Researchers and engineers building robust singing deepfake detectors or investigating model explainability and source tracing should read this paper to leverage SingFox's multi-paradigm, multilingual, and text-symmetric benchmark. It demonstrates why speech-centric deepfake models fail on music and highlights cross-dataset generalization gaps.

## Code

- https://github.com/Arth-Shah/SingFox

## Applications

Singing deepfake detection, audio forensics, voice copyright protection, and source attribution systems for music streaming platforms.

## Institutions / 機構

Dhirubhai Ambani University, Sarvajanik College of Engineering and Technology

## Related

- (link related pages by id as the wiki grows)
