---
id: xu26f_interspeech
category: speaker
labels: [multilingual]
institutions: ["University of Zurich", "Shanghai International Studies University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-858
pdf: https://www.isca-archive.org/interspeech_2026/xu26f_interspeech.pdf
---

# Human-like cross-language generalisation in deep neural speaker embeddings and its acoustic foundations

*Tianze Xu, Xiyang Li, Xiaoming Jiang, Volker Dellwo*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-858)

**Category:** `speaker` · **Labels:** `multilingual`

**TL;DR** — Evaluating 18 state-of-the-art deep neural speaker embedding models on Cantonese-English bilingual speech reveals robust cross-language generalisation that closely mirrors human perceptual similarity patterns and acoustic cue weightings. Mean machine-perceptual RSA correlation coefficients reached r = 0.44 across conditions.

## Key contributions

- Comprehensive cross-language generalisation audit of 18 SOTA speaker embedding models (ResNet, SimAM-ResNet, ECAPA, CAM++) using paired Cantonese-English bilingual speech.
- First direct benchmarking of machine-derived speaker embedding similarity against human listener perceptual ratings (from 40 bilingual and monolingual participants) across within- and cross-language conditions.
- Representational Similarity Analysis (RSA) mapping machine embeddings against 29 psychoacoustic features spanning temporal, fundamental frequency, formant structure, harmonic source, and inharmonic source domains.
- Empirical demonstration that supervised domain adaptation on small-scale target data (~4-5 hours of Cantonese) fails to improve identity discrimination, showing unexpected degradation in same-speaker similarity scores.

## Problem

State-of-the-art deep speaker embeddings are heavily engineered and trained predominantly on high-resource languages like English (VoxCeleb) or Mandarin (CN-Celeb), leaving their cross-language generalisation capabilities poorly understood. While humans demonstrate remarkable ability to evaluate voice similarity across unfamiliar languages, prior machine studies (e.g., Liu et al.) investigated English only, and older acoustic work relied on primitive cepstral coefficients. It remains unknown whether modern neural architectures capture acoustically grounded and cognitively aligned identity representations when transferring across phonologically distinct languages like Cantonese and English.

## Method

The study evaluates 18 open-source speaker embedding models via the Wespeaker toolkit (v1.2.0), encompassing seven ResNet variants (depths 34 to 293), four SimAM-ResNet variants with parameter-free attention, five ECAPA models (with 512/1024 channels and DINO self-supervised variants), and two CAM++ models utilizing context-aware masking and multi-granularity pooling. Models were tested in their original pretrained configurations (trained on VoxCeleb, CN-Celeb, or VoxBlink2) and after supervised fine-tuning on ~4-9 hours of Cantonese speech data (ASR-SCCantDuSC and ASR-SCCantCabSC corpora).

Representational dissimilarity matrices (RDMs) were built using cosine dissimilarity (1 - cosine similarity) for machine embeddings, absolute differences across 29 psychoacoustic variables for acoustic representations, and 9-point scale ratings for human perception. Acoustic features extracted via VoiceSauce every 5 ms included speech rate (SR), f0, formants F1-F4, formant dispersion (FD), harmonic amplitude differences (H1*-H2*, H2*-H4*, etc.), RMS energy, cepstral peak prominence (CPP), subharmonics-to-harmonics ratio (SHR), and harmonics-to-noise ratio (HNR).

Linear mixed models (LMMs) and Spearman's rank-based Representational Similarity Analysis (RSA) with FDR correction were employed to quantify how speaker identity, stimulus language context (Cantonese-only, English-only, mixed-language), model architecture, and fine-tuning status modulate machine similarity and its alignment with human perceptual and acoustic geometries.

## Experimental setup

Speech data comprised 10 early Cantonese-English bilingual female speakers from the SpiCE corpus uttering short festive greetings in both languages. Perceptual data came from 40 human raters (20 native Cantonese-English bilinguals, 20 English monolinguals) completing 220 trials across four blocks. Models were evaluated using Wespeaker toolkit implementations, extracting high-dimensional vectors per utterance to compute pairwise cosine similarities.

## Results

Machine similarity scores averaged 0.63 (SD = 0.09, range 0.41–0.92). Same-speaker pairs yielded significantly higher similarity (M = 0.78) than different-speaker pairs (M = 0.60, chi-square(1) = 671.39, p < 0.001), with the same-different contrast attenuating for mixed-language pairs (delta M = 0.16) compared to Cantonese-only (delta M = 0.19) or English-only (delta M = 0.21). SimAM architectures attained the highest baseline similarity (M = 0.65). 

Machine-perceptual RSA correlations ranged from 0.34 to 0.57 (M = 0.44). Machine-acoustic RSA demonstrated that machine similarity was most strongly associated with speech rate, F1-F4 means, and SHR, with language-specific profile shifts (e.g., F2/F4 and H2*kHz-H5kHz dominating Cantonese-only pairs; f0, FD, and CPP dominating English-only pairs). Surprisingly, Cantonese fine-tuning did not improve identity estimation: original pretrained models yielded slightly higher mean similarity scores (M = 0.64) than fine-tuned models (M = 0.63), reducing same-speaker similarity rather than enhancing it.

| System Condition | Mean Cosine Similarity (Same) | Mean Cosine Similarity (Diff) | RSA Correlation w/ Perception (M) |
| :--- | :--- | :--- | :--- |
| Original Pretrained (All) | 0.78 | 0.60 | 0.44 |
| Cantonese Fine-Tuned (All) | 0.77 | 0.59 | 0.44 |
| Cantonese-Only Pairs | 0.79 | 0.60 | 0.43 |
| English-Only Pairs | 0.81 | 0.60 | 0.45 |
| Mixed-Language Pairs | 0.70 | 0.54 | 0.44 |

## Limitations

The evaluation is restricted to a small cohort of 10 female speakers uttering short, fixed greeting phrases from a single bilingual corpus (SpiCE), limiting phonetic coverage and speaker diversity. The fine-tuning intervention relied on restricted datasets (~4-9 hours), which may have caused overfitting or representational collapse rather than effective multilingual adaptation. Testing is limited to Cantonese and English, leaving broader language families and tonal vs non-tonal language transfers unexplored.

## Why read this

Speech researchers and ML engineers building cross-lingual speaker recognition or voice cloning systems should read this to understand that modern speaker embeddings inherently possess robust cross-language generalisation aligned with human acoustic cue weighting, but naive small-scale fine-tuning can degrade identity separation.

## Code

- https://github.com/xiyangg12/wespeaker

## Applications

Cross-lingual speaker verification, zero-shot voice cloning, and speaker adaptation for low-resource automatic speech recognition.

## Institutions / 機構

University of Zurich, Shanghai International Studies University

**Funding / 經費:** Marie Skłodowska-Curie Actions Doctoral Networks, European Union, Swiss State Secretariat for Education, Research and Innovation

## Related

- (link related pages by id as the wiki grows)
