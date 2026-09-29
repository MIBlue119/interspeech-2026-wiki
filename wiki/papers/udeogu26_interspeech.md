---
id: udeogu26_interspeech
category: phonetics-linguistics
institutions: ["University of Maryland"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2464
pdf: https://www.isca-archive.org/interspeech_2026/udeogu26_interspeech.pdf
---

# From Continuous Speech to Subglottal Resonances: Automatic Signal Generation, Estimation, and Tracking Framework

*Chigozie Uzochukwu Udeogu, Carol Espy-Wilson*

[PDF](https://www.isca-archive.org/interspeech_2026/udeogu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/udeogu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2464)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper presents a supervised multi-scale spectral learning framework that generates subglottal accelerometer waveforms directly from speech signals, coupled with an adaptive LPC algorithm to automatically estimate and track subglottal resonances (SGRs) from continuous speech. The proposed pipeline achieves low estimation RMSEs (~30 Hz, ~50 Hz, and ~80 Hz for Sgr1, Sgr2, and Sgr3) and enables speaker height estimation on TIMIT with an RMSE under 7 cm using only 35 training speakers.

## Key contributions

- A supervised multi-scale spectral learning model (PrimeK-Net variant) utilizing group prime-kernel CNNs to produce concise accelerometer waveforms from microphone speech inputs.
- A novel algorithm for automatically estimating and tracking the first three subglottal resonances (Sgr1, Sgr2, Sgr3) simultaneously from continuous voiced speech sounds.
- A robust tracking scheme employing adaptive linear predictive coding (LPC) order tuning and dynamic pre-emphasis to handle spectral discontinuities and high-pitched voices.
- Cross-dataset evaluation demonstrating that automatically derived SGRs from speech alone can perform speaker height estimation on the TIMIT dataset with MAE ranging from 5.1 to 5.5 cm.

## Problem

Subglottal resonances (SGRs) are vital anatomical properties for speaker normalization, speaker height estimation, and health monitoring, but acquiring them traditionally requires invasive transducers or specialized cricoid accelerometers. Existing non-invasive setups require costly and specialized hardware, while methods for estimating SGRs from accelerometer data have historically relied on manual or semi-automatic, per-resonance measurements. These barriers have severely limited the integration of SGRs into broader speech processing workflows, necessitating an automated pipeline that can extract subglottal features directly from standard speech recordings.

## Method

The framework operates in two sequential stages: speech-to-accelerometer waveform generation followed by automatic SGR estimation and tracking. For generation, a U-Net-like encoder-decoder CNN architecture is adapted from PrimeK-Net using Group Prime-Kernel (GPK) convolutional blocks. Input channels are divided into groups processed with prime-sized kernels—specifically (7, 13, 19, 29)—to capture multi-scale temporal-frequency dependencies without periodic overlap artifacts and feature redundancy. The network takes magnitude spectrograms of speech as input and reconstructs the target accelerometer spectrogram, which is inverted back to a waveform.

In the second stage, continuous speech accelerometer signals are resampled to 8 kHz and processed via the Silero voice activity detector (VAD) and pYIN pitch tracking to isolate voiced regions. A joint energy-duration criterion selects the most informative, acoustically stable voiced segment. Reference SGRs are extracted using a 12th-order LPC model with a 30 ms Hamming window at 5 ms intervals (50% overlap). For continuous tracking, an adaptive correction loop is introduced: if the deviation between frame-level SGR estimates and reference values exceeds predefined thresholds (50 Hz for Sgr1/Sgr2, 100 Hz for Sgr3), the LPC order (varied between 11 and 16) and pre-emphasis factor (varied between 0.96 and 0.98) are dynamically tuned until errors fall within acceptable bounds.

The models are trained from scratch using the seen data split of the WashU-UCLA corpus, optimized via AdamW with a batch size of 2 for up to 1000k steps. Audio streams are downsampled to 16 kHz for waveform generation.

## Experimental setup

Evaluated on the WashU-UCLA corpus (50 speakers, 17,500 simultaneous mic/accelerometer waveforms sampled at 48 kHz, divided into 45 seen and 5 unseen speakers) and the TIMIT dataset (630 speakers, 6,300 sentences sampled at 16 kHz) for downstream speaker height regression. Baselines include ground-truth accelerometer measurements, semi-automatic manual estimations from Lulich et al., and SGR-based height regression from Arsikere et al. Metrics include PESQ, Log Spectral Distance (LSD), Root Mean Squared Error (RMSE), Mean Absolute Error (MAE), and coefficient of variation (COV).

## Results

On the seen data group, the group prime-kernel CNN configuration of (7, 13, 19, 29) achieved a PESQ score of 3.55 and an LSD score of 0.75, compared to 3.51 PESQ and 0.78 LSD for the (3, 11, 23, 31) kernel layout. When tested on the unseen speaker group, the model maintained a PESQ of 3.53 and an LSD of 0.77.

For automatic SGR estimation across unseen speakers, the average RMSE between ground-truth and model-generated waveforms was 24.37 Hz, outperforming comparisons against prior manual methods (which yielded an RMSE of 40.8 Hz). Within-speaker coefficient of variation (COV) stayed low between 2.1% and 4.4%. Continuous SGR tracking yielded average RMSEs of 23 Hz, 45 Hz, and 76 Hz for Sgr1, Sgr2, and Sgr3 respectively on ground-truth signals, and 25 Hz, 49 Hz, and 83 Hz on model-generated signals, with female speakers exhibiting slightly higher tracking errors due to high-pitched voice challenges. In downstream speaker height estimation on TIMIT-test using a linear regression model trained on only 35 speakers, the framework achieved MAEs of 5.1–5.5 cm and RMSEs of 6.2–6.9 cm across Sgr1–Sgr3, closely matching the performance of Arsikere et al. (5.3–5.6 cm MAE).

| System / Condition | Sgr1 RMSE (Hz) | Sgr2 RMSE (Hz) | Sgr3 RMSE (Hz) | Height MAE (cm) |
|---|---|---|---|---|
| Ground Truth (GT) | 23 | 45 | 76 | - |
| Model-Generated (MG) | 25 | 49 | 83 | - |
| Ours (TIMIT Sgr1/2/3) | - | - | - | 5.1 - 5.5 |
| Arsikere et al. [7] | - | - | - | 5.3 - 5.6 |

## Limitations

The framework's evaluation is bounded by clean read-speech datasets (WashU-UCLA and TIMIT) and may degrade under heavy acoustic noise or conversational speech conditions. Female speakers show consistently higher tracking and estimation errors due to the limitations of LPC-based resonance extraction on high-pitched voices with closely spaced harmonics. Furthermore, the generative waveform model requires parallel microphone and accelerometer data for initial supervised training, restricting deployment to domains where paired calibration data can be acquired.

## Why read this

Speech and ML researchers seeking to integrate physiological speech production features into neural architectures will find a complete, reproducible blueprint for generating subglottal accelerometer signals from standard speech. It demonstrates that subglottal resonances can be reliably tracked from continuous speech without invasive hardware, enabling low-data downstream tasks like speaker height estimation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automatic speaker normalization, speaker height estimation, low-resource speech recognition, and lung health monitoring.

## Institutions / 機構

University of Maryland

## Related

- (link related pages by id as the wiki grows)
