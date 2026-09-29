---
id: hoffner26_interspeech
category: resources-evaluation
labels: [self-supervised, robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1891
pdf: https://www.isca-archive.org/interspeech_2026/hoffner26_interspeech.pdf
---

# Deep learning-based predictions of perceived listening effort and intelligibility across enhanced, synthetic, natural, and binaural speech

*Dirk Eike Hoffner, Hartmut Schoon, Rainer Huber, Jan Rennies, Bernd T. Meyer*

[PDF](https://www.isca-archive.org/interspeech_2026/hoffner26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hoffner26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1891)

**Category:** `resources-evaluation` · **Labels:** `self-supervised`, `robustness-noise`

**TL;DR** — This paper evaluates two deep learning-based speech perception models—PHOBI (phone-posterior entropy) and HASA-Net+ (teacher-student WavLM model)—on predicting subjective listening effort (LE) and speech intelligibility (SI) across spatial, enhanced, synthetic, and binaural acoustic conditions, achieving overall correlation coefficients above 0.88 across over 10,500 listener ratings.

## Key contributions

- Comprehensive cross-evaluation of two contrasting deep perception models (PHOBI and HASA-Net+) on over 10,500 subjective LE and SI ratings from 39 listeners.
- Demonstration that PHOBI and HASA-Net+, despite being designed or trained for specific metrics, generalize well to out-of-domain tasks like listening effort estimation and text-to-speech evaluations.
- Application of a simple better-ear listening (BEL) strategy combined with head-related transfer functions to model spatial speech intelligibility release from masking.
- Identification of specific failure modes, such as PHOBI's ceiling behavior in cafeteria noise due to interfering speech glimpses.

## Problem

Subjective listening tests for evaluating speech intelligibility (SI) and listening effort (LE) are time-consuming and expensive, making computational prediction models essential for hearing research and speech technology development. Traditional intrusive measures require clean reference signals, while non-intrusive predictors struggle to generalize across diverse real-world acoustic challenges such as spatial separation, hearing-aid enhancement algorithms, and synthetic text-to-speech voices. Furthermore, prior deep learning models are typically evaluated on isolated metrics or narrow conditions, leaving open the question of whether a single perception model can jointly and reliably predict both SI and LE in complex environments.

## Method

The paper investigates two distinct deep learning architectures: PHOBI and HASA-Net+. PHOBI relies on a hybrid ASR feed-forward neural network trained on 960 hours of LibriSpeech to output triphone posterior probabilities, discarding the HMM decoder stage. Degradation in noise is measured via Mean Temporal Distance (MTD) using Kullback-Leibler (KL) divergence across triphone distribution pairs over a fixed time lag. HASA-Net+ is a teacher-student model that extracts representations from raw waveforms using the pretrained WavLM-Large foundation model, fuses them with audiogram patterns via a dense layer, and passes them to a Bidirectional LSTM (BLSTM) followed by multi-head attention branches targeting HASPI (Hearing-Aid Speech Perception Index). HASA-Net+ was trained on VCTK-DEMAND and TIMIT corpora augmented with noise, reverberation, enhancement, and vocoders.

For inference, model outputs are mapped to target metrics. For SI data, psychometric sigmoid functions are fitted across noise levels (-40 to 20 dB in 0.5 dB steps) to extract the Speech Recognition Threshold (SRT) at 50% intelligibility. Spatial scenarios utilize head-related transfer functions (HRTFs) for left/right channels, employing a better-ear listening (BEL) strategy that selects the higher numerical output between ears. An offset correction is learned from a co-located anechoic reference condition (S0N0) for both models. Listening effort (LE) is mapped using linear fits derived from an independent dataset of 80 varying acoustic modifications evaluated on the Göttinger Sentence Test.

## Experimental setup

Evaluated across three listening experiment datasets comprising over 10,500 responses from 39 participants: SIspatial (Beutelmann & Brand, 8 normal-hearing participants using OLSA sentences in anechoic, office, and cafeteria rooms with HRTFs), LEenhanced (Pusch et al., 11 normal-hearing participants rating OLSA sentences processed by an adaptive dynamic range compression algorithm in SSN and cafeteria noise), and LEsynthetic (Huber et al., 23 normal-hearing participants evaluating 240 Google TTS stimuli under 5 realistic noises and 6 spatial configurations). Metrics include Pearson correlation coefficient (r), Root Mean Square Error (RMSE) in dB for SRT and ESCU (Effort Scaling Categorical Unit) for LE. Comparisons are made between PHOBI and HASA-Net+ (with and without offset correction).

## Results

Across spatial SI prediction (SIspatial), both models achieved strong Pearson correlations, with PHOBI reaching r = 0.97 (ANE), 0.91 (Office), and 0.94 (Cafeteria), outperforming HASA-Net+ (corrected r = 0.94, 0.88, 0.91). PHOBI achieved lower RMSEs across all rooms (e.g., 1.0 dB vs HASA-Net+'s 1.8 dB in anechoic). For enhanced speech listening effort (LEenhanced), HASA-Net+ achieved r = 0.98 (RMSE 1.9 ESCU) and PHOBI achieved r = 0.94 (RMSE 1.2 ESCU), successfully capturing the LE reduction from speech enhancement algorithms except in high-noise cafeteria conditions where background speech glimpses caused model confusion. For synthetic speech (LEsynthetic), global correlations were r = 0.94 for HASA-Net+ and r = 0.96 for PHOBI, though intra-cluster correlations within specific noise types dropped (ranging from 0.43 to 0.75 for HASA-Net+ and 0.62 to 0.91 for PHOBI) due to narrow subjective rating spreads.

| System / Condition | SI Anechoic (r / RMSE) | SI Office (r / RMSE) | SI Cafeteria (r / RMSE) | LE Enhanced (r / RMSE) | LE Synthetic (r) |
|---|---|---|---|---|---|
| PHOBI | 0.97 / 1.0 dB | 0.91 / 2.3 dB | 0.94 / 1.6 dB | 0.94 / 1.2 ESCU | 0.96 |
| HASA-Net+ (Corrected) | 0.94 / 1.8 dB | 0.88 / 4.5 dB | 0.91 / 2.7 dB | 0.98 / 1.9 ESCU | 0.94 |

## Limitations

Both models exhibit reduced correlation coefficients when evaluated within narrow acoustic clusters compared to global datasets, reflecting sensitivity to limited subjective score variance. PHOBI struggles with non-stationary background noise containing speech glimpses (such as cafeteria noise), misinterpreting interfering speech as target speech and displaying ceiling effects. The evaluation is restricted to normal-hearing listener datasets and relies on a simple better-ear listening approximation rather than sophisticated binaural central integration mechanisms.

## Why read this

Speech and ML researchers building objective speech quality or intelligibility metrics will find this a rigorous benchmark of how foundation-model features (WavLM) compare against classical ASR posteriors (PHOBI) when extrapolating to unseen listening effort and spatial conditions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Evaluation and automatic tuning of hearing-aid speech enhancement algorithms, quality control for text-to-speech synthesis systems, and non-intrusive monitoring of spatial audio communication channels.

## Institutions / 機構

Carl von Ossietzky Universitat Oldenburg, Cluster of Excellence Hearing4all, Fraunhofer Institute for Digital Media Technology

**Funding / 經費:** Deutsche Forschungsgemeinschaft

## Related

- (link related pages by id as the wiki grows)
