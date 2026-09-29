---
id: maruyama26_interspeech
category: applications-other
labels: [streaming-real-time]
institutions: ["University of New South Wales", "Augusta University", "Georgia Institute of Technology"]
code: https://github.com/google/carfac
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/maruyama26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/maruyama26_interspeech.pdf
---

# Real-Time CARFAC/SAI-derived Pitchogram for Seeing and Correcting Pronunciation in Mandarin Chinese Tones

*Yuka Maruyama, Jason Orlosky, Chris Lee, Flora Salim, Thad Starner, Benjamin Tag*

[PDF](https://www.isca-archive.org/interspeech_2026/maruyama26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/maruyama26_interspeech.html)

**Category:** `applications-other` · **Labels:** `streaming-real-time`

**TL;DR** — This paper presents a Computer-Assisted Pronunciation Training (CAPT) system for Mandarin Chinese tones that replaces conventional spectrograms with a CARFAC/SAI-derived pitchogram to provide intuitive, real-time visual feedback. The system features dual-screen tone production and perception interfaces built for self-guided learners.

## Key contributions

- Adapts the biologically inspired CARFAC and Stabilised Auditory Image (SAI) pipeline into a real-time pitchogram visualizer specifically for Mandarin tone training.
- Implements a zero-setup, Python-based CAPT prototype combining tone perception exercises with a dual-screen live production interface.
- Establishes a workflow utilizing Google Text-to-Speech (TTS) for on-the-fly reference audio generation tied to 22 foundational HSK Level 1 and 2 vocabulary words.
- Proposes a modular vocabulary extension mechanism allowing users to easily add custom words, tone numbers, and reference audio clips.

## Problem

Non-tonal language speakers frequently struggle to acquire Mandarin Chinese's four traditional lexical tones because mapping pitch variations to discrete categories is difficult. Conventional CAPT systems typically rely on mel-spectrograms derived from Fast Fourier Transforms, but their rapidly shifting temporal fine structures are notoriously difficult for novice learners to interpret in real time. This high cognitive load hinders self-guided learners from accurately diagnosing and correcting their own tonal errors without expert human coaching.

## Method

The system processes incoming microphone audio sampled at 16 kHz by segmenting it into short frames of 450 samples (approximately 28 ms). These frames are fed into the Google CARFAC (Cascade of Asymmetric Resonators with Fast-Acting Compression) cochlear model, which approximates mammalian inner-ear mechanics. The subsequent SAI (Stabilised Auditory Image) processing demodulates and stabilises temporal fine structures into slowly varying functions of time lag, producing a clean, temporally stable pitchogram.

The software architecture comprises two main Python-based prototypes toggleable via a single keypress without requiring calibration. In the tone perception prototype, users listen to a reference audio sample, view its pitchogram, and identify the correct tones for one- or two-syllable items via keyboard inputs or on-screen buttons, receiving instant color-coded correctness feedback. In the tone production prototype, a dual-screen layout displays a real-time pitchogram of the learner's live speech on the left screen (powered by the Google CARFAC pitchogram web tool) and a reference audio player with its target pitchogram on the right screen. This side-by-side design lets learners visually align their pitch contours directly against native-like targets.

Vocabulary is constrained to a default set of 22 Mandarin words drawn from HSK Levels 1 and 2, but can be manually expanded by providing custom audio files (generated via Google Cloud TTS or native speaker recordings) alongside explicit tone metadata.

## Experimental setup

The system runs locally from the command line on Windows hardware taking 16 kHz audio input. It evaluates learners across a default vocabulary set of 22 HSK Level 1 and 2 Mandarin words using Google Cloud Text-to-Speech to generate baseline audio and reference pitchograms.

## Results

As a demonstration and system design paper rather than an empirical user study, this work does not report quantitative accuracy metrics, user study error rates, or formal baseline comparisons against mel-spectrogram CAPT systems. Instead, the contribution is validated through the qualitative presentation of the CARFAC/SAI pitchogram pipeline clearly mapping out the distinct visual contours for all four Mandarin tones (Tone 1 high, Tone 2 rising, Tone 3 falling-rising, and Tone 4 falling), demonstrating real-time capability on standard Windows hardware.

## Limitations

The current prototype relies on a very small static vocabulary of only 22 words from HSK Levels 1 and 2, requiring manual entry of audio and tone metadata for any expansion. The system lacks automated semantic text analysis or AI-generated textual coaching, leaving learners to interpret visual contours entirely on their own. Furthermore, the work omits formal user evaluations, leaving the pedagogical effectiveness of CARFAC/SAI pitchograms compared to traditional mel-spectrograms unverified by user trials.

## Why read this

Speech and ML engineers building interactive CAPT tools or auditory front-ends should read this paper to learn how biologically inspired cochlear models (CARFAC/SAI) can be adapted for real-time visual pitch feedback. It offers a practical blueprint for bypassing the high cognitive load of raw spectrograms in second-language acquisition.

## Code

- https://google.github.io/carfac/pitchogramdemo/index.html

## Applications

Computer-assisted language learning software, speech therapy applications, and real-time visual feedback tools for tonal language acquisition.

## Institutions / 機構

University of New South Wales, Augusta University, Georgia Institute of Technology

## Related

- [Amadea: An AI Companion for Pitch-Aware Spoken Language Practice](agrawal26_interspeech.md) — same problem · relatedness 2.3/3
- [Using Phonological-Level Wav2Vec2 for Mandarin Automatic Mispronunciation Detection and Diagnosis](chen26g_interspeech.md) — same problem · relatedness 1.8/3
- [Light-weight Pronunciation Assessment via Discrete Speech Token Surprisal](sara26_interspeech.md) — same problem · relatedness 1.8/3
- [ALFreeD: Teacher-Guided Few-Shot Pronunciation Assessment via Segmentation-Free Deviation Modeling](sirigiraju26_interspeech.md) — same problem · relatedness 1.8/3
- [Learning Contextualized Tonal Contours from F0: A Core-Auxiliary Branched Transformer for Mandarin Tone Recognition](liu26n_interspeech.md) — same problem · relatedness 1.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
