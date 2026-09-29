---
id: chen26n_interspeech
category: health-clinical
labels: [generative-model]
institutions: ["National Tsing Hua University", "Carnegie Mellon University"]
code: https://github.com/xinyu0308/FAST-SR
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1217
pdf: https://www.isca-archive.org/interspeech_2026/chen26n_interspeech.pdf
---

# Formant-Guided Speech Repair for Enhanced Comprehension of Dysarthric Speech

*Xin-Yu Chen, Jing-Tong Tzeng, Carlos Busso, Chi-Chun Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1217)

**Category:** `health-clinical` · **Labels:** `generative-model`

**TL;DR** — The paper introduces Formant-Aligned Speech Repair (FAST), a modular speech-in, speech-out framework that explicitly regularizes distorted vowel formants prior to neural TTS synthesis, achieving a 72.4% relative reduction in character error rate on Mandarin dysarthric speech.

## Key contributions

- Proposes the Formant-Aligned Spectral Transformation (FAST) module that explicitly remaps distorted vowel formants toward healthy reference distributions using a Gaussian-weighted warping function.
- Combines a dysarthria-adapted ASR (Wav2Vec 2.0 + Conformer) with speaker-adaptive TTS (XTTS v2 backend with a fine-tuned speaker encoder) for speech reconstruction.
- Demonstrates robust cross-lingual and cross-pathology generalization across four Mandarin and English dysarthric speech datasets (CDSD, MDSC, MSDM, TORGO).
- Achieves lower character error rates than Oracle TTS on certain corpora, proving that explicit acoustic vowel space regularization is as critical as correct textual conditioning.

## Problem

Dysarthria severely degrades speech intelligibility due to impaired articulatory control that compresses the vowel space and eliminates spectral contrast. Existing automatic speech recognition systems only output text, thereby discarding vital paralinguistic and prosodic cues essential for natural human interaction. Meanwhile, prior speech-in, speech-out neural reconstruction methods like voice conversion or latent diffusion models operate as black boxes that struggle with severe non-linear articulatory distortions and fail to achieve high intelligibility.

## Method

The system processes source dysarthric speech through three cascaded modules: a dysarthria-adapted ASR, a formant correction module, and a speaker-adaptive TTS. The ASR module uses frozen Wav2Vec 2.0 front-ends (WenetSpeech for Mandarin, LibriSpeech for English) feeding a Conformer encoder and recurrent decoder, trained on a hybrid CTC and attention cross-entropy objective with lambda_CTC set to 0.3.

The FAST module obtains phone boundaries via the Montreal Forced Aligner, estimates F1 and F2 across the central 80% of vowel segments using Praat's Burg method, and computes deviations against healthy reference values derived from AISHELL-1 (Mandarin) and TORGO (English) stratified by vowel class (/a/, /e/, /i/, /o/, /u/) and gender. It applies a Gaussian-weighted spectral warping function governed by a repair factor scaling parameter kappa (set optimally to 2.0), followed by inverse STFT, spectral cross-fading, RMS energy normalization, and high-frequency enhancement.

The Speaker-Adaptive TTS is built on the XTTS v2 framework, where the core backbone is frozen and only the speaker encoder is fine-tuned to map utterance embeddings close to target speaker centroids. The TTS is conditioned on the FAST-corrected speech waveform for prosody and timbre while taking ASR-predicted text transcripts as linguistic input.

## Experimental setup

Evaluated on four pathological speech datasets: CDSD (Mandarin, 29.4h, 44 speakers), MDSC (Mandarin, 9.1h, 21 speakers), MSDM (Mandarin, 2.2h, 62 speakers), and TORGO (English, 2.5h, 8 speakers), covering cerebral palsy, stroke, ALS, and degeneration. Compared against baseline systems including DiffDSR, RnV, and Liu et al., plus ablation variants (w/o SPK, w/o FAST). Metrics include Character Error Rate (CER), Word Error Rate (WER), UTMOS naturalness, speaker cosine similarity via Resemblyzer, Formant Centralization Ratio (FCR), Vowel Space Area (VSA), and a 5-point subjective MOS evaluation with 18 native listeners.

## Results

The full proposed system achieves a CER of 22.33% on CDSD and 38.44% on MDSC, representing massive error reductions compared to input speech (80.97% and 88.92%) and outperforming external baselines like DiffDSR (95.78% CER on CDSD) and RnV. On the TORGO English corpus, it achieves 13.65% WER compared to 32.06% for the raw input. Ablations show that removing FAST or speaker adaptation degrades CER/WER by 4-7% absolute. Subjective evaluations demonstrate over 90% gains in intelligibility, comprehension, and fluency, alongside a 60.9% reduction in listening effort (dropping from 3.81 to 1.49). Speaker similarity exhibits a slight trade-off, dropping from around 0.74-0.76 down to 0.63-0.68 in exchange for large intelligibility improvements.

| System / Condition | CDSD (CER %) | MDSC (CER %) | MSDM (CER %) | TORGO (WER %) | UTMOS (CDSD) |
|---|---|---|---|---|---|
| Input (Dysarthric) | 80.97 | 88.92 | 48.65 | 32.06 | 1.576 |
| Input + FAST | 69.91 | 76.95 | 44.98 | 32.90 | 1.546 |
| ASR + TTS | 29.95 | 46.91 | 36.84 | 20.67 | 2.083 |
| Ours (w/o FAST) | 28.52 | 45.38 | 35.60 | 23.18 | 2.076 |
| Ours (Full) | 22.33 | 38.44 | 34.50 | 13.65 | 2.250 |
| Oracle TTS | 23.80 | 39.74 | 32.38 | 89.65 | 2.061 |

## Limitations

The framework relies on accurate phone alignments and text transcripts from ASR to perform formant correction, meaning severe ASR failures can propagate errors to the FAST module. Articulatory repair is currently restricted to vowels, omitting consonants which also contribute significantly to dysarthric speech degradation. Furthermore, the system experiences a minor trade-off wherein enhanced intelligibility slightly reduces native speaker voice similarity.

## Why read this

Researchers and engineers building speech-to-speech assistive communication systems will learn how to integrate linguistically grounded acoustic rules (formant correction) with neural TTS generative priors to bypass the limitations of black-box diffusion or voice conversion models.

## Code

- https://github.com/xinyu0308/FAST-SR

## Applications

Assistive communication devices for individuals with motor speech disorders, smart-home voice assistants adapted for pathological speech, and real-time conversational speech repair interfaces.

## Institutions / 機構

National Tsing Hua University, Carnegie Mellon University

## Related

- [WhisperVC: Decoupled Cross-Domain Alignment and Speech Generation for Low-Resource Whisper-to-Normal Conversion](liu26o_interspeech.md) — same problem · relatedness 2.2/3
- [Transcript-Free Flow-Matching Text-to-Speech via Speech Feature Conditioning](eom26_interspeech.md) — same problem · relatedness 2.2/3
- [BetterSpeak: An Atypical Speech to Typical Speech Platform for Dysarthric Speakers](shahamiri26_interspeech.md) — same problem · relatedness 2.0/3
- [WER Are We (Really): How Well Do Top Open ASR Leaderboard Models Generalize to Nonstandard Speech?](dhaka26_interspeech.md) — same problem · relatedness 2.0/3
- [Phy-VC: Physics-Informed Voice Conversion for Privacy-Preserving Pathological Speech](ghosh26_interspeech.md) — shared technique · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
