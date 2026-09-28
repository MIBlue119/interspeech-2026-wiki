---
id: zhang26n_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1023
pdf: https://www.isca-archive.org/interspeech_2026/zhang26n_interspeech.pdf
---

# SE-AGCNet: An End-to-End Framework for Joint Speech Enhancement and Loudness Control in Meeting Scenarios

*Jinming Zhang, Wei Rao, Xionghu Zhong, Eng Siong Chng*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1023)

**TL;DR** — SE-AGCNet is an end-to-end framework for jointly optimizing speech enhancement and automatic gain control in meeting scenarios, achieving target loudness alongside consistent improvements in speech quality and ASR accuracy.

## Key contributions

- Proposes SE-AGCNet, a modular, end-to-end framework that jointly optimizes speech enhancement and automatic gain control to avoid the pitfalls of cascaded pipelines.
- Develops SE-AGC-DataGen, a reproducible simulation pipeline using LibriTTS and DNS Challenge noise to generate paired training data with extreme volume variations.
- Introduces standardized loudness evaluation metrics—integrated loudness (LUFS), short-term loudness (St LUFS), and Loudness Range (LRA)—based on ITU-R BS.1770 and EBU R128.
- Demonstrates consistent gains across simulated (LibriAGC) and real-world meeting datasets (MMCSG, AliMeeting-far), lowering ASR error rates.

## Problem

Conventional audio front-ends implement speech enhancement (SE) and automatic gain control (AGC) as cascaded modules, which leads to compounding errors. Applying AGC first amplifies background noise and hurts the signal-to-noise ratio, whereas applying it after SE causes over-suppression of low-volume or far-field speech because traditional SE models mistake quiet speech for noise. Furthermore, prior unified attempts either treated AGC as an opaque post-processor or relied on proprietary in-house tools that hinder reproducibility.

## Method

SE-AGCNet uses MP-SENet as its time-frequency domain speech enhancement backbone, taking noisy magnitude and phase spectra to output enhanced spectra. During SE training, an asymmetric reweighting penalty multiplies the loss contribution by alpha = 10.0 whenever predicted magnitude falls below target magnitude, discouraging over-suppression. The enhanced magnitude spectrum is then RMS-normalized and passed to an AGC module comprising two 2D convolutional layers with 3x3 kernels (16 channels), a 2-layer bidirectional LSTM with a hidden size of 256 per direction, linear projection layers, and transposed convolutions with ReLU and batch normalization for spectral reconstruction. The AGC module's target is clean, volume-balanced audio, and its loss applies a 10x multiplier penalizing positive energy in silent target regions to prevent amplifying residual noise.

The final training objective combines the MP-SENet multi-loss configuration with the AGC loss scaled by lambda_AGC = 0.9. Training relies on curriculum learning where the SE backbone is pre-trained for 5 epochs using SE targets before end-to-end joint optimization. At inference, long audio recordings are processed via 2-second windows with a 50% overlap.

## Experimental setup

Experiments use the LibriAGC simulated dataset (54 hours training, 8 hours test) built from LibriTTS and DNS Challenge noise, plus two real-world datasets: MMCSG (CHiME-8 challenge, 9.4 hours) and AliMeeting-far (10.8 hours). Baselines include the original MP-SENet, MP-SENet retrained on LibriAGC for SE only, MP-SENet for AGC only, and conventional post-processing via the pyagc toolkit. Evaluation metrics encompass PESQ, SIGMOS, DNSMOS, LUFS, St LUFS, LRA, and ASR performance via Whisper-large-v3-turbo and Nvidia Conformer-CTC large models.

## Results

On the LibriAGC test set, SE-AGCNet achieves a PESQ of 3.00, an OVRL SIGMOS of 3.87, and an ASR word error rate of 6.88% with Whisper, compared to an Input WER of 10.67% and MP-SENet (SE) + pyagc WER of 7.09%. For loudness control, SE-AGCNet precisely hits the target metrics with an integrated LUFS of -23.66, St LUFS of -23.93, and LRA of 3.86 LU, staying within the optimal 3-6 LU range. On real-world MMCSG data, it corrects the raw noisy loudness of -40.24 LUFS up to -22.68 LUFS while reducing Whisper WER from 15.12% to 13.86% and Conformer WER from 51.36% to 30.36%.

| System | LUFS | St LUFS | LRA (LU) | WER (Whisper) | WER (Conformer) |
|---|---|---|---|---|---|
| Input / Noisy | -24.12 | -28.95 | 14.87 | 10.67 | 21.61 |
| MP-SENet (SE) | -23.76 | -30.52 | 18.61 | 7.61 | 11.20 |
| MP-SENet (SE) + pyagc | -20.88 | -21.10 | 3.49 | 7.09 | 9.35 |
| MP-SENet (AGC) | -24.74 | -26.19 | 8.32 | 7.69 | 10.61 |
| SE-AGCNet (Ours) | -23.66 | -23.93 | 3.86 | 6.88 | 9.12 |

## Limitations

The simulated training data relies heavily on LibriTTS and a specific subset of DNS Challenge noise, which may not fully span all complex real-world acoustic phenomena. The architecture is currently evaluated primarily on meeting room scenarios (two-person conversations and far-field mics) and requires further scaling for diverse multi-talker overlap environments. Furthermore, computational overhead introduced by the joint BiLSTM and multi-stage convolutions requires exploration for strict on-device real-time constraints.

## Why read this

Speech and ML engineers dealing with far-field meeting audio or variable-volume recordings will learn how to jointly model denoising and loudness normalization rather than relying on brittle cascaded pipelines.

## Code

- https://jinming00.github.io/SE-AGCNet/

## Applications

Meeting transcription front-ends, conference systems, hearing assistive devices, and robust ASR pipelines operating under variable speaker-to-microphone distances.

## Related

- (link related pages by id as the wiki grows)
