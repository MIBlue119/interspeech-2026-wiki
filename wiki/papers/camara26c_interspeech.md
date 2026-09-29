---
id: camara26c_interspeech
category: asr
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1386
pdf: https://www.isca-archive.org/interspeech_2026/camara26c_interspeech.pdf
---

# Acoustic Landmark Detector based on Conformer and HuBERT

*Mateo Cámara, José Luis Blanco, Juan Ignacio Godino-Llorente, Jeung-Yoon Choi, Stefanie Shattuck-Hufnagel*

[PDF](https://www.isca-archive.org/interspeech_2026/camara26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/camara26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1386)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — This paper evaluates Conformer-based acoustic landmark detection across 14 configurations and introduces Gaussian soft labels to model human annotation variability, achieving an F1@20 ms of 0.77 using frozen HuBERT features.

## Key contributions

- Proposed a Gaussian soft-label training strategy with per-class temporal spreads (sigma = 10-20 ms) to account for human annotation ambiguity.
- Conducted a systematic comparison of mel spectrograms, wav2vec2, HuBERT, and hybrid features for landmark detection.
- Performed rigorous ablation studies covering loss functions, model capacity, and data conditions.
- Linked landmark detection difficulty directly to Stevens' acoustic theory, showing higher accuracy for abrupt events like stops and fricatives.

## Problem

Automatic landmark detection traditionally relies on signal-processing heuristics or shallow statistical models, while deep learning approaches in phoneme boundary detection target dense segmentations rather than sparse articulatory events. Existing deep learning approaches like Auto-Landmark and SpeechMark leave open how effectively modern self-supervised features and temporal modeling can localize eight distinct linguistic landmark types. Addressing this gap matters because acoustic landmarks serve as a crucial bridge between raw acoustics and phonological features for speech recognition, clinical assessment, and timing analysis.

## Method

The primary architecture is a Conformer encoder with d_model = 256, 12 layers, 4 attention heads, feed-forward dimension 1024, and depthwise convolution kernel size 31, which processes complete utterances non-causally and feeds a linear classification head with dropout 0.3. The output produces per-frame logits over 9 classes (background plus 8 landmark types: vowels, glides, stop closures, stop releases, fricative closures, fricative releases, nasal closures, nasal releases). A per-category variant with five separate smaller Conformer models is also evaluated.

To address temporal annotation uncertainty, Gaussian soft labels replace hard frame labels, smoothing probability mass around annotated positions using per-class sigma values derived from phonetic priors: sigma_V = 20 ms for gradual vowel transitions, sigma_G = 15 ms for glides, sigma_Fc,Fr = 12 ms for fricatives, and sigma_Sc,Sr,Nc,Nr = 10 ms for abrupt stops and nasals. Feature extraction compares 80-dim log-mel spectrograms, frozen wav2vec2-base, frozen HuBERT-base, and a hybrid mel+wav2vec2 concatenation. Post-processing uses peak detection on non-background softmax probability curves with minimum height 0.5, minimum inter-peak distance of 5 frames, and minimum prominence 0.2.

## Experimental setup

Evaluated on a custom corpus of 1,839 speech recordings (mean duration 0.80 s) containing 678 VCV syllables and 1,161 real English words from 3 speakers, totalizing 8,428 landmark instances split 90/10 with speaker stratification. Baselines include hard-label references, mel spectrograms, wav2vec2, hybrid features, and prior literature systems like Auto-Landmark and SpeechMark. Models are trained using AdamW (lr = 10^-4, weight decay 0.01), cosine annealing with warm restarts, automatic mixed precision, gradient clipping at 1.0, and early stopping, evaluated primarily via tolerance-based F1@20 ms and F1@30 ms alongside Landmark Error Rate (LER).

## Results

Frozen HuBERT features achieve the best overall performance with an F1@20 ms of 0.77 and F1@30 ms of 0.84, closely followed by the hybrid mel+wav2vec2 model (0.76 F1@20 ms), the mel baseline (0.74), and wav2vec2 (0.70). Gaussian soft labels provide the single largest performance gain, improving F1@20 ms by 0.70 absolute over hard labels (which degrade vowel F1 from 0.54 down to 0.18). Detectability correlates with event abruptness under Stevens' theory, where stop releases (Sr), fricative releases (Fr), and stop closures (Sc) are easiest (F1 > 0.80), whereas vowels (V) and nasal releases (Nr) remain challenging (F1 ~ 0.55).

Ablations show that focal loss decreases F1 by 0.048, removing class weights drops F1 by 0.027, and training exclusively on VCV syllables severely degrades performance by 0.101. Zero-shot cross-corpus evaluation on TIMIT yields a 63.0% LER for the HuBERT model compared to 31.3% for Auto-Landmark's ConBiMamba, highlighting limitations in cross-taxonomical transfer.

| System | V | G | Sc | Sr | Fc | Fr | Nc | Nr | F1@20 | F1@30 |
|---|---|---|---|---|---|---|---|---|---|---|
| Baseline (mel) | 0.54 | 0.70 | 0.85 | 0.91 | 0.74 | 0.82 | 0.76 | 0.57 | 0.74 | 0.81 |
| wav2vec2 | 0.43 | 0.52 | 0.83 | 0.87 | 0.73 | 0.79 | 0.89 | 0.54 | 0.70 | 0.78 |
| HuBERT | 0.53 | 0.69 | 0.83 | 0.93 | 0.78 | 0.89 | 0.86 | 0.62 | 0.77 | 0.84 |
| Hybrid (mel+w2v2) | 0.53 | 0.61 | 0.81 | 0.93 | 0.72 | 0.90 | 0.93 | 0.62 | 0.76 | 0.84 |
| Hard labels (ref) | 0.18 | 0.63 | 0.81 | 0.85 | 0.71 | 0.89 | 0.73 | 0.54 | 0.67 | 0.72 |

## Limitations

The study relies on a small corpus consisting of only 1,839 files across 3 speakers with a single train/test split. Zero-shot transfer to continuous speech corpora like TIMIT shows poor alignment across different landmark taxonomies. The evaluation does not test broad generalization to spontaneous speech, noisy recording environments, or diverse speaking styles.

## Why read this

Speech and machine learning researchers working on temporal speech event localization, phonetic feature extraction, or self-supervised representation benchmarking should read this paper to see how Gaussian soft labels and frozen HuBERT features significantly improve acoustic landmark detection.

## Code

- https://mateocamara.github.io/acoustic-landmarks/

## Applications

Acoustic landmark detection can be integrated into automatic speech recognition pipelines, pronunciation training systems, clinical speech assessment tools, and linguistic timing analyses.

## Institutions / 機構

Universidad Politecnica de Madrid, Massachusetts Institute of Technology

**Funding / 經費:** Ministry of Economy and Competitiveness of Spain, Fundacion Santander, MISTI MIT Global Experiences

## Related

- (link related pages by id as the wiki grows)
