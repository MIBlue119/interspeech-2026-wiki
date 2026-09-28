---
id: feng26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-137
pdf: https://www.isca-archive.org/interspeech_2026/feng26_interspeech.pdf
---

# MMGenre: Benchmarking Singing Voice Synthesis across Multiple Musical Genres

[PDF](https://www.isca-archive.org/interspeech_2026/feng26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/feng26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-137)

**TL;DR** — MMGenre is a multi-genre singing voice synthesis benchmark that reveals current SVS models suffer from a genre collapse phenomenon, producing pop-biased acoustic outputs across diverse musical styles.

## Problem

Existing singing voice synthesis benchmarks are heavily biased toward pop music, leaving their ability to generalize across diverse musical genres unexplored. Without systematic evaluation, it remains unclear whether current models genuinely capture genre-specific vocal attributes or simply reproduce surface-level acoustic patterns learned from pop-centric training data.

## Method

The authors introduce MMGenre, a benchmark spanning 10 major genres and 26 subgenres, comprising 3,152 Chinese score-audio segment pairs totaling about 4.36 hours. The construction pipeline uses Suno V4.5 for genre-conditioned music generation, Mel-RoFormer for vocal separation, STARS for phoneme-level pitch and duration score annotation, and MuQ-MuLan for automated consistency filtering. The benchmark is used to evaluate eight representative SVS models across autoregressive and non-autoregressive architectures, including RNN, XiaoiceSing, VISinger, VISinger2, DiffSinger, StyleSinger, TCSinger, and TechSinger. Model evaluation relies on a Gemini 2.5 Pro-based 5-point Genre Consistency Score (GCS-5), alongside pseudo-MOS metrics (SingMOS, SingMOS-Pro, SSQA) and Whisper-based character error rate (CER).

## Results

Evaluated on MMGenre, all SVS models achieve high genre alignment only on Pop and closely related genres, while non-Pop genres receive uniformly low alignment scores due to acoustic feature collapse. Inference-time zero-shot strategies like style transfer and technique conditioning yield marginal gains, whereas genre-specific continued training using two hours of AI-generated data boosts the Rock genre GCS-5 score from 1.5 to 4.9. Overall quality metrics show steady progress across models (e.g., DiffSinger achieving a SingMOS of 4.08), but fail to expose the underlying stylistic collapse.

## Code

- https://fengjin1117.github.io/mmgenre-web/

## Applications

Speech and ML engineers building expressive singing voice synthesis systems can use MMGenre to evaluate and diagnose genre generalization capabilities.

## Limitations

The benchmark dataset relies on Suno-synthesized singing rather than real human recordings for out-of-pop genres, and the current study focuses on Chinese language song scores.

## Related

- (link related pages by id as the wiki grows)
