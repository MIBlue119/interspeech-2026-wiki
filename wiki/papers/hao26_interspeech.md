---
id: hao26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1547
pdf: https://www.isca-archive.org/interspeech_2026/hao26_interspeech.pdf
---

# YingMusic-Singer: Controllable Singing Voice Synthesis with Flexible Lyric Manipulation and Annotation-free Melody Guidance

[PDF](https://www.isca-archive.org/interspeech_2026/hao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1547)

**TL;DR** — YingMusic-Singer is a diffusion-based singing voice synthesis model for melody-preserving lyric editing that eliminates manual alignment, outperforming baseline models on intelligibility and melody adherence.

## Problem

Generating altered lyrics while preserving the melody of an existing singing track typically requires laborious, manual word-level timestamp alignments with musical scores or notes, which restricts scalability and flexibility. Existing alignment-free in-context learning approaches offer limited controllability over the melody, whereas existing commercial pipelines demand extensive manual intervention. To bridge this gap, the authors introduce a streamlined alignment-free editing framework alongside LyricEditBench, a new comprehensive evaluation benchmark for lyric modification.

## Method

YingMusic-Singer processes an optional timbre reference, a melody-providing singing clip, and modified lyrics using a ~727.3M parameter architecture. It combines a Stable Audio 2 VAE encoder/decoder, a pretrained MIDI encoder as a Melody Extractor, an IPA Tokenizer with sentence-level alignment for boundary control, and a DiT-based Conditional Flow Matching (CFM) backbone. The training pipeline uses curriculum learning—consisting of TTS pretraining, SFT Phase 1 without melody conditioning, and SFT Phase 2 incorporating a Centered Kernel Alignment (CKA) loss—followed by Group Relative Policy Optimization (GRPO) using multiple reward models and SDE sampling to resolve trade-offs between lyric intelligibility and melody preservation.

## Results

Evaluated on LyricEditBench (comprising 7,200 test instances across six editing tasks like translation and partial substitution in Chinese and English), YingMusic-Singer is compared against Vevo2. Objective evaluations show YingMusic-Singer consistently achieves significantly lower Phoneme Error Rate (PER) and higher F0 Pearson Correlation (F0-CORR) and Vocal Scores (VS) across both melody-control and self-timbre configurations. Subjective evaluations confirm superior Naturalness (N-MOS) and Melody (M-MOS) mean opinion scores, outperforming Vevo2. Ablations demonstrate that curriculum phases, CKA loss, melody temporal dropout, and GRPO each provide essential, complementary gains to intelligibility and melody adherence.

## Code

- https://github.com/ASLP-lab/YingMusic-Singer-Plus

## Applications

Speech and audio engineers and music producers developing tools for song adaptation, personalized cover generation, rapid vocal arrangement prototyping, and multilingual song localization.

## Related

- (link related pages by id as the wiki grows)
