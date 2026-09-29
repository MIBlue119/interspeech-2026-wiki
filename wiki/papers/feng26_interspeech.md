---
id: feng26_interspeech
category: tts
labels: [dataset-or-benchmark-release, generative-model]
institutions: ["Renmin University of China", "Carnegie Mellon University"]
code: https://fengjin1117.github.io/mmgenre-web/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-137
pdf: https://www.isca-archive.org/interspeech_2026/feng26_interspeech.pdf
---

# MMGenre: Benchmarking Singing Voice Synthesis across Multiple Musical Genres

*Wenhao Feng, Yuxun Tang, Jiatong Shi, Qin Jin*

[PDF](https://www.isca-archive.org/interspeech_2026/feng26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/feng26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-137)

**Category:** `tts` · **Labels:** `dataset-or-benchmark-release`, `generative-model`

**TL;DR** — MMGenre is a benchmark for evaluating genre generalization in singing voice synthesis (SVS), exposing that current models suffer from severe "genre collapse" and default to a pop-like style unless specifically fine-tuned.

## Key contributions

- Proposed an automated, scalable pipeline utilizing text-to-music models (Suno V4.5) and vocal separators (Mel-RoFormer) to generate genre-aligned music scores and disentangled vocal-score pairs.
- Introduced MMGenre, the first benchmark for multi-genre SVS evaluation spanning 10 major musical genres and 26 fine-grained subgenres.
- Conducted comprehensive evaluations across 8 representative SVS models, demonstrating a prevalent genre collapse phenomenon where non-pop outputs share nearly identical acoustic properties.
- Showed via controlled experiments that inference-time zero-shot style transfer yields negligible improvements, whereas lightweight continued training with 2 hours of genre-specific data dramatically raises genre alignment.

## Problem

Current singing voice synthesis (SVS) research heavily focuses on naturalness and expression using public datasets that are overwhelmingly dominated by pop music (e.g., M4Singer, Opencpop). Because musical genre is rarely treated as a primary evaluation dimension, it remains unclear whether modern SVS systems capture genuine genre-specific acoustic characteristics or simply memorize surface-level pop patterns. This limitation makes large-scale systematic analysis impossible and obscures how well models generalize to diverse musical styles like rock, jazz, and classical.

## Method

MMGenre comprises 3,152 Chinese score-audio segment pairs totaling ~4.36 hours (2-8 seconds per segment, averaging 5 seconds). The construction pipeline begins with hierarchical prompt design using ChatGPT, followed by audio generation via Suno V4.5. Vocal tracks are separated using Mel-RoFormer, annotated for phoneme-level pitch and duration using STARS, and filtered using MuQ-MuLan for consistency alongside human verification.

The paper evaluates 8 representative SVS models (RNN, XiaoiceSing, VISinger, VISinger2, DiffSinger, StyleSinger, TCSinger, and TechSinger). Zero-shot inference-time controls are tested using StyleSinger's reference-based style transfer and TechSinger's phoneme-level technique conditioning. Training-time dynamics are analyzed by performing genre-specific continued training on Rock using 2 hours of independently generated AI data, comparing fine-tuned models against baseline outputs.

## Experimental setup

Evaluated on the MMGenre benchmark (3,152 pairs, 10 major genres, 26 subgenres, ~4.36 hours). Models include autoregressive (RNN, XiaoiceSing, VISinger, VISinger2) and diffusion/recent paradigms (DiffSinger, StyleSinger, TCSinger, TechSinger), trained on Opencpop or using public checkpoints. Metrics include GCS-5 (Genre Consistency Score rated via Gemini 2.5 Pro on a 1-5 Likert scale, validated against human ratings with Spearman ρ = 0.85), pseudo-MOS predictors (SingMOS, SingMOS-Pro, SSQA), and character error rate (CER) via Whisper-WER in VERSA.

## Results

Across all 8 evaluated models, non-Pop genres consistently receive low GCS-5 scores (e.g., StyleSinger achieves only 1.3 on Rock and 1.4 on Rap, compared to Ground Truth ratings above 4.2). Zero-shot inference techniques yield only marginal gains (e.g., StyleSinger + Style Transfer moves Rock from 1.3 to 1.7), failing to overcome the dominant pop prior. However, when applying genre-specific continued training on Rock with just 2 hours of auxiliary data, the GCS-5 score surges dramatically from 1.5 to 4.9, proving that genre awareness depends on training distribution rather than inference-time score conditioning.

| System / Condition | SingMOS | SingMOS-Pro | SSQA | CER |
|---|---|---|---|---|
| RNN | 3.25 | 2.94 | 2.87 | 0.47 |
| XiaoiceSing | 3.43 | 3.08 | 2.97 | 0.69 |
| TechSinger | 3.84 | 3.76 | 3.78 | 0.59 |
| StyleSinger | 3.98 | 3.74 | 3.72 | 0.54 |
| DiffSinger | 4.08 | 4.04 | 4.06 | 0.31 |

## Limitations

The benchmark size is limited to 3,152 samples (~4.36 hours) and is restricted to Chinese singing text due to pipeline dependencies. The automatic rater (Gemini 2.5 Pro) and pseudo-MOS predictors, while validated with human correlation, may introduce automated evaluation biases. Furthermore, reliance on Suno V4.5 for source audio generation could introduce synthetic artifacts distinct from real-world studio recordings.

## Why read this

Speech and ML engineers building generative singing systems will discover why current models collapse into a pop-style average and learn whether zero-shot adaptation or targeted fine-tuning is required to fix it.

## Code

- https://fengjin1117.github.io/mmgenre-web/

## Applications

Multi-genre music production, genre-aware singing voice synthesis, and automated evaluation frameworks for audio generative models.

## Institutions / 機構

Renmin University of China, Carnegie Mellon University

**Funding / 經費:** National Natural Science Foundation of China

## Related

- [Towards Chinese Yue Opera Singing Voice Synthesis: A Benchmark with Dataset, Data Augmentation and Baseline Model](bai26_interspeech.md) — shared data / evaluation · relatedness 2.2/3
- [YingMusic-Singer: Controllable Singing Voice Synthesis with Flexible Lyric Manipulation and Annotation-free Melody Guidance](hao26_interspeech.md) — same problem · relatedness 2.2/3
- [Towards Unified Song Generation and Singing Voice Conversion with Accompaniment Co-Generation](zhang26e_interspeech.md) — same problem · relatedness 1.9/3
- [Listening Like a Judge: A Music-Aware Framework for Automatic Singing Performance Evaluation](saini26_interspeech.md) — complementary · relatedness 1.8/3
- [SongBench: A Fine-Grained Multi-Aspect Benchmark for Song Quality Assessment](wu26h_interspeech.md) — shared data / evaluation · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
