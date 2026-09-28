---
id: miyahara26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1886
pdf: https://www.isca-archive.org/interspeech_2026/miyahara26_interspeech.pdf
---

# Evaluating Zero-Shot Cross-Lingual Stuttering Detection Based on Self-Attention Weights of Temporal Acoustic Vector Sequence

*Genzo Miyahara, Tsuneo Kato, Akihiro Tamura*

[PDF](https://www.isca-archive.org/interspeech_2026/miyahara26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/miyahara26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1886)

**TL;DR** — This paper investigates extracting self-attention weights from temporal acoustic vector sequences (SAWF) for zero-shot cross-lingual stuttering event detection, achieving F1 scores reaching 77-98% of monolingual settings across English, Mandarin, and German corpora. It outperforms traditional baselines on cross-lingual tasks and beats state-of-the-art models by 20 percentage points on word repetition.

## Key contributions

- Evaluates self-attention weight features (SAWF) derived from multiple Transformer encoders (wav2vec 2.0, xlsr-53, and Whisper medium) for language-transferable stuttering event detection.
- Demonstrates zero-shot cross-lingual transfer across combinations of Mandarin (AS-70), English (SEP-28k), and German (KSoF) stuttering corpora.
- Analyzes the impact of encoder pre-training strategies (ASR fine-tuning vs. multilingual SSL vs. weak supervision) on capturing distinct acoustic vs. linguistic stuttering symptoms.
- Shows that multi-source cross-lingual training (Mandarin + English to German) bridges linguistic gaps and achieves robust performance across all disfluency classes.

## Problem

Stuttering event detection (SED) models typically rely on large annotated data-hungry corpora, making them difficult to deploy in no- or low-resource languages. Prior architectures (like CNNs or standard wav2vec 2.0 / Whisper outputs) capture language-specific properties and acoustic variations that do not transfer well across languages. This paper tackles zero-shot cross-lingual SED to build universal detectors that can quantify speech disorders without target-language training data.

## Method

The method extracts acoustic vectors s_i from each window of an audio signal using frozen Transformer-based backbones (24 layers). SAWF is constructed by computing the 2D matrix X of inner products between all time points i_1 and i_2 across all layers, effectively mapping repetitions and prolongations of similar acoustic properties regardless of language. Three backbone variants are tested: Model 1 (wav2vec 2.0 fine-tuned on source ASR), Model 2 (wav2vec 2.0 xlsr-53), and Model 3 (Whisper medium encoder).

The resulting multi-layer 2D SAWF is fed into a VGG-19 image recognition classification network to predict multi-label disfluencies (blocks, interjections, prolongations, sound repetitions, word repetitions, and normal speech). VGG-19's architecture uses 5x5 convolutional kernels with padding width 3, replacing the standard flatten and linear layers with global average pooling to process variable-length audio clips without resizing or clipping. During training, only the VGG-19 classifier is trained while the feature extractors remain frozen.

## Experimental setup

Evaluated on three stuttering corpora: SEP-28k (English, ~23 hours, 28,177 clips), AS-70 (Mandarin, ~48.8 hours, 41,953 clips), and Kassel State of Fluency - KSoF (German, ~4.6 hours, 5,597 clips). All splits are speaker-open and balanced by symptom distribution and gender. Models are compared against a re-implemented attention baseline, Bayerl et al.'s model, and the StutterFuse retrieval-augmented classifier SOTA. Performance is measured via precision, recall, and F1 scores across 6 classes.

## Results

In zero-shot cross-lingual evaluation on German (KSoF), the multi-source Whisper SAWF model (Cmn+En->De) achieves F1 scores of 0.44 for No-Df, 0.46 for blocks, 0.69 for interjections, 0.47 for prolongations, 0.47 for sound repetitions, and 0.40 for word repetitions. Compared to the current SOTA StutterFuse (En->De), the Whisper SAWF model trails by 10-23% on acoustic-dominant symptoms like blocks and prolongations (0.46 vs 0.60, 0.47 vs 0.56), but significantly outperforms it on linguistically dependent categories, beating StutterFuse by 20 points in word repetition (0.40 vs 0.20) and improving interjections (0.69 vs 0.62). 

Ablations demonstrate that xlsr-53 (Model 2) underperforms on repetitions due to its lack of explicit ASR fine-tuning, whereas Whisper (Model 3) struggles slightly with interjections because Whisper's original training pipeline strips fillers during text standardization.

| System / Condition | Blocks (Bl) | Interjections (Int) | Prolongations (Pro) | Sound Rep (Snd) | Word Rep (Wd) |
|---|---|---|---|---|---|
| Baseline + MTL [10] | 0.10 | 0.55 | 0.44 | 0.35 | 0.23 |
| StutterFuse (En->De) [20] | 0.60 | 0.62 | 0.56 | 0.52 | 0.20 |
| SAWF (En->De, xlsr-53) | 0.46 | 0.65 | 0.48 | 0.50 | 0.31 |
| SAWF (Cmn+En->De, Whisper) | 0.46 | 0.69 | 0.47 | 0.47 | 0.40 |
| Supervised Topline (KSoF) [10] | 0.60 | 0.88 | 0.57 | 0.48 | 0.18 |

## Limitations

The study is restricted to three languages (English, Mandarin, and German) and three corresponding datasets, leaving true low-resource languages with zero web-scale representation untested. Whisper-based models exhibit blind spots for interjections due to training-data transcript normalization policies that drop fillers. Furthermore, cross-lingual performance disparities persist depending on linguistic distance, requiring multi-source training to fully stabilize accuracy across target domains.

## Why read this

Speech and ML researchers focusing on cross-lingual transfer, speech disorder analysis, or self-attention representation engineering should read this to see how 2D temporal self-attention maps can replace recurrent or large language model wrappers for robust zero-shot detection. It provides clear insights into how pre-training objectives (SSL vs. ASR supervision) trade off acoustic versus linguistic disfluency detection capabilities.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated clinical screening tools to quantify stuttering severity and frequencies (e.g., assisting SSI-4 diagnoses), and speech recognition frontend adaptation to improve ASR usability for persons who stutter (PWS).

## Related

- (link related pages by id as the wiki grows)
