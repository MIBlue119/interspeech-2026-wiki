---
id: ramonda26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2439
pdf: https://www.isca-archive.org/interspeech_2026/ramonda26_interspeech.pdf
---

# Readability Does Not Predict Speech Recognition Errors: Contrasting Human and Machine Perception.

[PDF](https://www.isca-archive.org/interspeech_2026/ramonda26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ramonda26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2439)

**TL;DR** — This study demonstrates that modern end-to-end ASR architectures exhibit near-perfect orthogonality between text readability and transcription error, unaffected by acoustic noise or reverberation.

## Problem

Historically, text complexity and readability significantly affected both human comprehension and ASR performance due to high perplexity. While humans rely on top-down cognitive mechanisms and find simple texts easier to decode in noise, it remains unclear whether modern end-to-end models suffer from a similar "cognitive load" when processing complex syntax. Resolving this question matters for understanding the divergence between human and machine perception and for building modular speech applications.

## Method

The authors created a controlled TTS pipeline using Amazon Polly (voice "Joanna") on the CLEAR corpus (4,718 excerpts annotated with Bradley-Terry easiness scores) to isolate textual complexity from speaker-induced acoustic variations. They evaluated diverse architectures: traditional HMM-GMM (PocketSphinx), hybrid systems (Vosk), CTC-based models (Wav2Vec2 Base), and weakly-supervised E2E models (Whisper Tiny at 39M parameters and Medium at 769M parameters). Audio files were subjected to controlled degradations including additive babble noise from DEMAND at 0 dB, 10 dB, and 20 dB SNR, and simulated room reverberation from OpenAIR with RT factors of 0.1 and 0.9. Real-world validation was also performed using 6,983 concatenated audio files from the LibriSpeech train-clean-100 subset. Internal model metrics included predictive entropy and final zlib compression ratios.

## Results

Using the Global Readability Index (GRI) combining six readability metrics, experiments revealed that modern E2E models like Whisper Tiny and Medium show near-perfect orthogonality with readability (r <= 0.03), whereas CTC-based Wav2Vec2 (r = 0.24) and Vosk (r = 0.14) display minor sensitivity. PocketSphinx showed a flat correlation (r = 0.05) due to high error saturation. Under extreme noise (0 dB SNR) and reverberation, Whisper Tiny's correlation with GRI remained completely flat (r = 0.06), and real-world LibriSpeech evaluation confirmed no correlation with GRI (r = -0.02). Internal decoding metrics showed no correlation between GRI and predictive entropy (r = -0.01) or compression ratio (r = -0.08).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and designers building digital accessibility tools, such as tailored museum audio guides for individuals with intellectual disabilities, can use these findings to optimize upstream script readability without interfering with downstream ASR transcription modules.

## Related

- (link related pages by id as the wiki grows)
