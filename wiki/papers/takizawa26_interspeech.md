---
id: takizawa26_interspeech
category: asr
labels: [multilingual, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3002
pdf: https://www.isca-archive.org/interspeech_2026/takizawa26_interspeech.pdf
---

# Dissecting Sensitivity to Training Language in Self-Supervised Speech Learning Using Neural Audio Codec Tokens

*Daigo Takizawa, Tomohiko Nakamura, Samuele Cornell, William Chen, Satoru Fukayama, Shinji Watanabe*

[PDF](https://www.isca-archive.org/interspeech_2026/takizawa26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/takizawa26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3002)

**Category:** `asr` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — A systematic cross-lingual analysis of codec-based self-supervised speech learning reveals that downstream task performance is insensitive to the neural audio codec (NAC) training language, but heavily dependent on the SSL pre-training language. This demonstrates that a single acoustic NAC can be safely reused across languages without retraining, provided the SSL model is aligned with the target language.

## Key contributions

- Disentangles language sensitivity in codec-based SSL by independently varying the NAC training language and the SSL pre-training language across English, Japanese, and Chinese.
- Proves that acoustic NAC training language has negligible impact on downstream ASR and SER performance (evaluated on both reconstructed waveforms and discrete tokens).
- Establishes that language-specific characteristics and task-relevant structures are predominantly acquired during the SSL pre-training phase rather than at the acoustic quantization stage.
- Validates that a single multilingual or cross-lingually trained neural audio codec (e.g., DAC) achieves high stability and eliminates the need for language-specific NAC retraining.

## Problem

Neural audio codecs (NACs) discretize speech into compact tokens, enabling efficient codec-based self-supervised learning (SSL) that drastically reduces storage and compute compared to waveform-based models. However, it remained entirely unclear whether cross-lingual performance degradation originates from the NAC discretizer or the SSL pre-training stage. Because prior work did not decouple these components, practitioners assumed language shifts required retraining both the NAC and the SSL model—destroying the deployment efficiency of NAC-based pipelines.

## Method

The study employs a controlled, staged evaluation framework using the Descript Audio Codec (DAC) and HuBERT-based SSL models. The NAC is trained on 1056 hours of data under four distinct conditions: EN+ (English plus non-speech), JP (in-house Japanese broadcast TV), ZH (WenetSpeech subset-L), and All (multilingual blend). DAC uses an 18-codebook configuration at 16 kHz, boosting bitrates from 6 kbps to 9 kbps to maximize reconstruction fidelity. Codec-HuBERT inputs are formed by feeding frozen NAC codebook embeddings (summed across codebooks) directly into a Transformer encoder, matching the standard HuBERT architecture.

For SSL pre-training (RQ2 and RQ3), models are trained on language-matched and mismatched corpora (960 hours of English LibriSpeech, 4821 hours of Japanese broadcast TV, and 7173 hours of WenetSpeech for Chinese). Two-stage clustering uses either MFCC features (for RQ2 two-stage comparison) or language-specific HuBERT Base checkpoints using 9th-layer features and k-means clustering (for RQ3). Downstream evaluations cover ASR (Conformer models combining layer-wise SSL representations via trainable weighted sums, evaluated using WER/CER) and Speech Emotion Recognition (SER, following SUPERB 4-class emotion settings with unweighted/weighted average recall across IEMOCAP, JTES, and EmoTalk).

## Experimental setup

Datasets include Libri-Light, LaboroTVSpeech (100h), CSJ, COJADS, WenetSpeech subset-S/L, AISHELL-1, IEMOCAP, JTES, and EmoTalk. Baselines include raw waveform-input HuBERT and various public NACs (DAC, EnCodec, SpeechTokenizer, X-Codec, PAST). Metrics include Word Error Rate (WER), Character Error Rate (CER), Average Recall (AR) for SER, and Coefficient of Variation (CoV) to quantify cross-lingual error variability relative to waveform baselines.

## Results

Evaluating NAC reconstruction across public codecs (RQ1) showed DAC achieved the lowest cross-lingual coefficient of variation (CoV: 3.38% ASR / 2.22% SER), outperforming EnCodec (4.61% / 9.62%) and SpeechTokenizer (23.72% / 4.99%). Retraining DAC under EN+, JP, ZH, and All conditions showed virtually identical downstream ASR/SER (CoV below 3.38%), proving NAC training language does not drive performance gaps.

When fixing the NAC and varying the SSL pre-training language (RQ2), matching the SSL language to the target downstream language consistently yielded superior results (e.g., English pre-training on LL-10h achieved 12.3% WER, whereas Japanese/Chinese pre-training yielded 28.0% and 27.5% WER). Conversely, fixing the SSL language to match the downstream task while varying the NAC training language (RQ3) resulted in negligible performance swings across EN+, JP, ZH, and All DACs (ASR CoV <= 3.90%), confirming that acoustic NACs do not need target-language retraining.

| System / Condition (NAC -> SSL) | LL-10h ASR (WER %) | LTVS-100h ASR (CER %) | IEMOCAP SER (AR %) | CoV ASR / SER (%) |
| :--- | :--- | :--- | :--- | :--- |
| Waveform Baseline (Top-line) | 10.2 / 17.7 | 13.5 | 65.11 | - / - |
| All-NAC -> EN SSL (Mismatched) | 12.3 / 22.5 | 20.4 | 66.15 | 37.89 / 18.61 |
| All-NAC -> JP SSL (Mismatched) | 28.0 / 46.1 | 15.7 | 64.73 | 37.89 / 10.19 |
| All-NAC -> ZH SSL (Mismatched) | 27.5 / 45.7 | 18.4 | 65.16 | 42.99 / 13.00 |
| EN+-NAC -> Match SSL (RQ3) | 10.2 / 20.5 | 14.5 | 65.21 | 2.47 / 1.38 |
| JP-NAC -> Match SSL (RQ3) | 10.8 / 21.0 | 14.6 | 65.55 | 3.90 / 3.76 |

## Limitations

The study is restricted to three languages (English, Japanese, and Chinese) and two downstream tasks (ASR and SER), leaving tonal variations, low-resource dialects, and non-speech paralinguistic tasks unexplored. The analysis focuses exclusively on acoustic neural audio codecs (DAC) and does not test semantic-heavy tokenizers or hybrid discrete representations.

## Why read this

Speech engineers and ML researchers building scalable, multilingual audio foundation models should read this paper to safely eliminate redundant neural audio codec retraining pipelines, realizing that computational budgets should instead focus entirely on target-language SSL pre-training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building efficient, multilingual speech recognition and emotion recognition pipelines using shared neural audio codebook representations.

## Institutions / 機構

National Institute of Advanced Industrial Science and Technology, Carnegie Mellon University

**Funding / 經費:** Programs for Bridging the gap between R&D and the IDeal society (society 5.0) and Generating Economic and social value (BRIDGE), R&D on Generative AI Foundation Models for the Physical Domain

## Related

- (link related pages by id as the wiki grows)
