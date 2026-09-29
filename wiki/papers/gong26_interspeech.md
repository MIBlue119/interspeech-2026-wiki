---
id: gong26_interspeech
category: enhancement-separation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-182
pdf: https://www.isca-archive.org/interspeech_2026/gong26_interspeech.pdf
---

# NCPSZ: A Nonlinear Control Network for Miniature Loudspeakers in Personal Sound Zone Applications

*Chen Gong, Lei Zhou, Chen Huang, Hongqing Liu, Liming Shi, Lu Gan*

[PDF](https://www.isca-archive.org/interspeech_2026/gong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-182)

**Category:** `enhancement-separation`

**TL;DR** — NCPSZ is a nonlinear control network designed for personal sound zones that suppresses acoustic sound leakage from miniature smartphone loudspeakers, achieving a 3.78 dB acoustic contrast improvement over linear baselines.

## Key contributions

- A nonlinear dual-network control framework tailored specifically for miniature loudspeaker scenarios.
- An anchor-speaker strategy that uses the primary earpiece to maintain bright zone target pressure while auxiliary speakers cancel dark zone leakage.
- A lightweight causal implementation (CtrlNet with 0.18M parameters) suitable for real-time on-device edge processing.
- Offline high-fidelity offline modeling (ModelNet) that captures loudspeaker nonlinearities to act as a differentiable proxy for control optimization.

## Problem

Personal sound zone (PSZ) systems traditionally rely on linear control methods like acoustic contrast control (ACC), pressure matching (PM), and variable span trade-off (VAST). However, when consumer devices such as smartphones drive miniature loudspeakers at high volumes for privacy protection, severe nonlinear distortion—such as harmonic and inter-modulation distortion—degrades audio quality and creates a performance ceiling. Because linear filters cannot reproduce necessary nonlinear harmonic components, leakage suppression fails, necessitating explicit nonlinear modeling and phase-aware control.

## Method

The NCPSZ framework operates in the time-frequency domain using an STFT with a 2048 window and 1024 hop size, featuring an asymmetric dual-network architecture. ModelNet serves as an offline high-fidelity modeling network with a 4-layer Encoder-Decoder, 128 channels, and a GRU bottleneck with 80 hidden units (32.71M parameters), trained by minimizing a time-frequency reconstruction loss with frequency supervision parameter lambda_f = 0.4. ModelNet acts as a differentiable proxy of the nonlinear loudspeaker behavior. Once ModelNet's weights are frozen, a lightweight, causal CtrlNet is trained to generate pre-compensated driving signals.

CtrlNet uses a 2-layer Encoder-Decoder with 16 channels, down/upsampling factor of 2, and a GRU bottleneck with 8 instances of hidden units (0.18M parameters). Causality is enforced via one-sided past-only padding along the temporal axis. Both networks feed decoder features into a 3D complex mask head that generates complex-valued masks applied multiplicatively to capture phase-aware spatial corrections. CtrlNet is trained via a joint time-frequency objective balancing bright zone (BZ) reproduction fidelity and dark zone (DZ) leakage suppression using hyperparameters alpha = 0.8, beta = 0.2, and time-frequency trade-off gamma = 0.4. The primary earpiece speaker physically maintains the BZ target via an anchor-speaker strategy, reducing optimization constraints while assisting speakers actively cancel DZ leakage.

## Experimental setup

The system was evaluated in a semi-anechoic chamber using an RME UCX sound interface, an 8-channel power amplifier, four 1115 miniature loudspeakers, and seven B&K measurement microphones (2 in-ear BZ microphones, 6 surrounding DZ microphones). The dataset comprises over 1,300 speech-to-speech recordings created using LibriSpeech data augmented via equalization filters, reproduced at high voltage levels yielding a 3.2% total harmonic distortion (THD). Baselines include the linear VAST method (subspace dimension V=4, regularization mu=10^3) and a parameter-matched causal CNN. Models were trained using the Adam optimizer with a learning rate of 1e-3, evaluated primarily via acoustic contrast (AC) over the 200–2000 Hz band.

## Results

NCPSZ consistently outperforms all evaluated systems across the speech band. Averaged over 200–2000 Hz, NCPSZ provides an acoustic contrast (AC) improvement of 3.78 dB over the linear VAST baseline and 1.80 dB over the parameter-matched causal CNN baseline. ModelNet achieves an average modeling mean squared error of 1.6e-9 on the test set, verifying precise nonlinear system identification.

In ablations and comparative analysis, the significant margin over the linear VAST baseline demonstrates that explicit nonlinear compensation overcomes the linear performance ceiling. Furthermore, the performance gain over the causal CNN confirms that incorporating temporal dynamics via a recurrent GRU bottleneck is essential for tracking state-dependent miniature loudspeaker distortions.

| System | Acoustic Contrast (dB, 200–2000 Hz) |
|---|---|
| Unprocessed Playback | Baseline |
| Linear VAST (V=4, mu=1e3) | Baseline + 0.0 dB |
| Causal CNN Baseline | +1.98 dB over VAST |
| Proposed NCPSZ | +3.78 dB over VAST |

## Limitations

The framework's validation is restricted to a fixed smartphone geometry with four miniature loudspeakers and seven microphones inside a semi-anechoic chamber, leaving real-world reverberation and dynamic user head movements untested. The evaluation focuses exclusively on speech-to-speech tasks between 200 Hz and 2000 Hz, omitting broader audio categories like music and higher frequency bands. Data scale is limited to 1,300 augmented LibriSpeech recordings under a single high-voltage drive condition.

## Why read this

Read this paper if you build on-device spatial audio or privacy protection systems for consumer hardware and need to bypass the physical nonlinear distortion limits of miniature speakers. It provides a blueprint for pairing a heavy offline simulation network with a lightweight causal control network for edge deployment.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smartphone privacy screen technologies, personal sound zones, hands-free telephony sound leakage prevention, and directional acoustic devices.

## Institutions / 機構

Chongqing University of Posts and Telecommunications, Brunel University

## Related

- (link related pages by id as the wiki grows)
