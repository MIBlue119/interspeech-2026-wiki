---
id: ramonda26_interspeech
category: asr
institutions: ["IRIT", "CNRS", "Université de Toulouse", "Queensland University of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2439
pdf: https://www.isca-archive.org/interspeech_2026/ramonda26_interspeech.pdf
---

# Readability Does Not Predict Speech Recognition Errors: Contrasting Human and Machine Perception.

*Baptiste Ramonda, Laurianne Sitbon, Julien Pinquier*

[PDF](https://www.isca-archive.org/interspeech_2026/ramonda26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ramonda26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2439)

**Category:** `asr`

**TL;DR** — This study demonstrates that modern end-to-end ASR models exhibit near-perfect orthogonality between text readability and transcription error (WER), showing no artificial cognitive load despite challenging acoustic degradations.

## Key contributions

- Designs a controlled speech synthesis pipeline using the CLEAR corpus to strictly isolate textual complexity from speaker-induced acoustic variations like rate and prosody.
- Proves that end-to-end ASR architectures (Whisper Tiny and Medium) have a near-zero correlation ($r \le 0.03$) between Global Readability Index (GRI) and Word Error Rate.
- Validates real-world generalizability using a concatenated 6,983-file subset of LibriSpeech natural speech, confirming zero correlation ($r = -0.02$).
- Analyzes internal model dynamics (predictive entropy and zlib compression ratio), confirming that textual complexity does not induce model hesitation or structural simplification.

## Problem

Human listeners rely heavily on top-down cognitive mechanisms where textual readability acts as a compensatory factor during acoustic degradation. Historically, older ASR systems also suffered from higher WER on complex syntax due to high perplexity. With the advent of large self-supervised and end-to-end (E2E) models, it remains unclear whether modern ASR retains this cognitive load or has completely decoupled acoustic transcription from linguistic structural complexity.

## Method

The pipeline takes text excerpts from the CLEAR corpus (4,718 excerpts, 172 words average length) and synthesizes them using the Amazon Polly Standard engine (voice 'Joanna') to ensure invariant elocution and prosody. Audio is then subjected to controlled acoustic degradation: additive babble noise from the DEMAND dataset at 0dB, 10dB, and 20dB SNR, and simulated room impulse response reverberation from OpenAIR (Mills Art Museum) at levels 0.1 and 0.9. Real-world validation uses 6,983 natural speech files from LibriSpeech (train-clean-100), concatenated to ~1-minute averages. Textual complexity is measured via the Global Readability Index (GRI), a normalized arithmetic mean combining Flesch Reading Ease, SMOG, New Dale-Chall, Coleman-Liau, Gunning, and ARI indices. Human-perceived ease is quantified using the Bradley-Terry (BT) coefficient of readability (ranging from -3.68 to 1.71). Models evaluated span traditional HMM-GMM (PocketSphinx), hybrid systems (Vosk), CTC-based models (Wav2Vec2 Base), and weakly supervised E2E architectures (Whisper Tiny at 39M parameters and Whisper Medium at 769M parameters). Cognitive effort is assessed via average predictive token entropy and zlib compression ratios.

Architectures are tested across clean and degraded conditions to observe whether capacity scaling or noise reinstates human-like sensitivity to syntax. The core hypothesis is that modern E2E acoustic-to-lexical mapping operates independently of linguistic readability, unlike human decoding mechanisms.

## Experimental setup

Evaluated on the CLEAR corpus (4,718 synthetic excerpts via Amazon Polly) and LibriSpeech (train-clean-100, 6,983 concatenated files). Compared baselines include PocketSphinx (HMM-GMM), Vosk (Kaldi-based hybrid), Wav2Vec2 Base (CTC), and Whisper (Tiny at 39M params; Medium at 769M params). Metrics include Word Error Rate (WER), Global Readability Index (GRI), Bradley-Terry (BT) easiness score, average predictive entropy, and zlib compression ratio. Acoustic tests use DEMAND babble noise (0, 10, 20 dB SNR) and OpenAIR reverberation (0.1, 0.9 levels).

## Results

Under optimal acoustic conditions, Whisper Tiny and Whisper Medium exhibit near-perfect orthogonality with textual complexity (both $r \le 0.03$), whereas CTC-based Wav2Vec2 and Vosk show mild sensitivity ($r = 0.24$ and $r = 0.14$). PocketSphinx shows a low correlation ($r = 0.05$), which is attributed to an error saturation threshold masking structural effects rather than architectural robustness. When evaluated against human-perceived text difficulty (BT scores), all models consistently show a negative correlation ($r \in [-0.35, -0.19]$), indicating that while factors challenging humans affect ASR, pure textual readability has been decoupled. Under severe acoustic degradation (Whisper Tiny at 0 dB SNR), the GRI correlation remains flat ($r = 0.06$), proving noise does not restore the link to readability. Real-world natural speech validation on LibriSpeech confirms this decoupling ($r = -0.02$). Predictive entropy ($r = -0.01$) and compression ratio ($r = -0.08$) remain entirely stable across GRI ranges.

| System | Architecture Type | GRI Correlation ($r$) | BT Easiness Correlation ($r$) |
|---|---|---|---|
| Whisper Tiny | E2E Transformer (39M) | 0.03 | -0.32 |
| Whisper Medium | E2E Transformer (769M) | 0.03 | -0.39 |
| Wav2Vec2 Base | CTC Encoder | 0.24 | -0.33 |
| Vosk | Hybrid HMM/DNN | 0.14 | -0.24 |
| PocketSphinx | HMM-GMM | 0.05 | -0.19 |

## Limitations

The study relies on synthetic TTS speech generated via a single Amazon Polly voice for its core controlled pipeline, which may not capture all nuances of human expressive variability. The real-world validation is restricted to English via LibriSpeech, leaving multilingual generalizability unverified. The evaluation scope is limited to text readability indices and does not exhaustively test non-syntactic semantic or pragmatic dimensions.

## Why read this

Researchers and engineers building modular speech accessibility pipelines or studying machine perception vs. human cognition should read this to understand that modern E2E ASR models do not suffer from linguistic readability bottlenecks. It provides empirical proof that text simplification and acoustic transcription can be optimized independently.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Design of digital accessibility tools, such as text-optimized audio guides for museums tailored for individuals with cognitive disabilities, utilizing modular script pre-processing without risking downstream ASR interference.

## Institutions / 機構

IRIT, CNRS, Université de Toulouse, Queensland University of Technology

## Related

- (link related pages by id as the wiki grows)
