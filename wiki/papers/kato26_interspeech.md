---
id: kato26_interspeech
category: tts
labels: [efficient-on-device, streaming-real-time, generative-model, robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/kato26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/kato26_interspeech.pdf
---

# Coco-VC: Degradation-Robust Streaming Voice Conversion System on the Listener Side

*Ryo Kato, Ryutaro Matsunaga, Toshio Imamura, Akinori Maeda, Shuhei Takahara, Shinnosuke Takamichi*

[PDF](https://www.isca-archive.org/interspeech_2026/kato26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kato26_interspeech.html)

**Category:** `tts` · **Labels:** `efficient-on-device`, `streaming-real-time`, `generative-model`, `robustness-noise`

**TL;DR** — Coco-VC is a real-time, listener-side streaming voice conversion system designed to transform degraded telephony speech into clear target-speaker audio. It leverages multi-teacher distillation and telephony data augmentation to achieve a 25% relative reduction in Word Error Rate (WER) compared to existing streaming baselines.

## Key contributions

- Proposes a listener-side streaming voice conversion architecture that corrects unintelligible speaker timbres and poor acoustic environments in real time.
- Introduces a multi-teacher distillation framework fusing ContentVec (for prosody) and Whisper (for robust linguistic features) to eliminate individual teacher biases.
- Employs an asymmetric training strategy combining clean teacher targets with heavily corrupted 8 kHz telephony inputs to achieve joint speech enhancement and robust feature extraction.
- Demonstrates consumer-grade laptop execution with 40 ms algorithmic latency (80 ms end-to-end on Apple M2) supporting real-time target speaker switching via an intuitive GUI.

## Problem

Traditional voice conversion systems operate on the speaker's side, where speakers optimize their setup and remain unaware of how poorly their voice actually reaches listeners over telephone channels due to adverse acoustics, codec artifacts, or poor intrinsic timbres. Existing streaming VC models fail to maintain intelligibility under heavy telephony degradations like band-limitation, noise, and reverberation. Listener-side VC solves this by letting the receiver adapt incoming speech to a clear target profile, but requires ultra-low latency and robustness against severe real-world distortions.

## Method

The core architecture relies on a lightweight student content encoder built with Causal ConvNeXt blocks using zero look-ahead padding to process 20 ms frames. Combined with overlap-add processing, the base algorithmic latency is 40 ms. The student model is trained via dual-teacher distillation, extracting target features simultaneously from frozen ContentVec and Whisper encoder models operating on clean 16 kHz speech.

During training, the student encoder receives heavily corrupted 8 kHz speech processed through a telephony degradation pipeline simulating codecs, signal distortions, reverberation, and noise, while the frozen teachers process clean speech. This asymmetric setup forces the student to predict clean, fused feature representations despite input degradation, acting simultaneously as a speech enhancer and robust content extractor. Converted features are then synthesized into waveforms using a lightweight Vocos-based decoder trained on large-scale in-domain data.

The system runs locally on standard laptops (such as an Apple M2 CPU or Windows iGPU) and allows users to seamlessly switch predefined target speaker profiles mid-stream via an intuitive GUI.

## Experimental setup

Evaluations used public datasets (FLEURS-8k for simulated noisy telephony, and VCTK for clean speech) as well as a large-scale private dataset of 61,840 hours simulating customer complaint calls in realistic telephony environments (compared against an ablation trained on 960 hours of public data). Baselines included StreamVC using an identical decoder for fair comparison. Metrics include Word Error Rate (WER) for intelligibility and UT-MOS for subjective speech quality.

## Results

On simulated noisy telephony using FLEURS-8k, Coco-VC achieves a WER of 0.338, significantly outperforming StreamVC's 0.451 (representing a 25% relative error reduction), while maintaining a competitive UT-MOS of 3.214 versus 3.271. On clean VCTK speech, Coco-VC achieves a superior UT-MOS of 4.041 compared to the baseline's 3.701.

In the private dataset ablation simulating severe customer complaint calls, training on 61,840 hours of in-domain private data drastically improved performance over a 960-hour public data variant, slashing WER from 0.363 to 0.125 and raising UT-MOS from 3.08 to 3.35. A minor weakness is observed in UT-MOS under severe simulated noise on FLEURS-8k, where the baseline marginally edges out Coco-VC (3.271 vs 3.214) despite Coco-VC's massive win in intelligibility (WER).

| Method / Condition | WER ↓ | UT-MOS ↑ |
|---|---|---|
| StreamVC (FLEURS-8k) | 0.451 | 3.271 |
| Coco-VC (FLEURS-8k) | 0.338 | 3.214 |
| StreamVC (VCTK) | 0.083 | 3.701 |
| Coco-VC (VCTK) | 0.097 | 4.041 |
| Coco-VC (960h Public Data) | 0.363 | 3.08 |
| Coco-VC (61,840h Private Data) | 0.125 | 3.35 |

## Limitations

The system relies heavily on large-scale in-domain private data (over 61,000 hours) to reach optimal robustness, meaning public-data-only models struggle significantly under severe telephone degradation. Evaluation is currently constrained to simulated complaint calls and standard public benchmarks like FLEURS and VCTK, leaving open-world telephony variations fully unverified. Additionally, execution latency varies between OS audio stacks (80 ms on macOS vs 160 ms on Windows iGPU).

## Why read this

Speech engineers and researchers building real-time, resource-constrained audio translation or enhancement systems will benefit from seeing how dual-teacher distillation (ContentVec + Whisper) and asymmetric telephony augmentation can be combined inside a Causal ConvNeXt architecture for low-latency client-side deployment.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time listener-side telephone call enhancement, inclusive communication assistance for hearing-impaired or degraded-audio scenarios, and on-device voice conversion.

## Institutions / 機構

SoftBank, University of Tokyo, Keio University

## Related

- (link related pages by id as the wiki grows)
