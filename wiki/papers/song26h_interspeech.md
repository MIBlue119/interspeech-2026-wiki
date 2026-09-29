---
id: song26h_interspeech
category: paralinguistics-emotion
labels: [efficient-on-device, self-supervised, streaming-real-time]
institutions: ["Singapore Institute of Technology", "Duke Kunshan University", "NVIDIA"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/song26h_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/song26h_interspeech.pdf
---

# MER-Live: An Interactive Browser Demo of Prosody-Driven Multimodal Emotion Recognition

*Haoyu Song, Xiaoxiao Miao, Pai Chet Ng, Timothy Liu, Aik Beng Ng, Ian McLoughlin*

[PDF](https://www.isca-archive.org/interspeech_2026/song26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/song26h_interspeech.html)

**Category:** `paralinguistics-emotion` · **Labels:** `efficient-on-device`, `self-supervised`, `streaming-real-time`

**TL;DR** — MER-Live is an interactive browser-based multimodal emotion recognition demo powered by a lightweight 6.77M-parameter masked auto-encoder speech emotion recognition (SER) backbone that achieves sub-millisecond inference latencies. It processes prosody over a 3-second sliding window and combines voice, video, and text using confidence-driven late fusion.

## Key contributions

- Developed a 6.77M-parameter lightweight masked auto-encoder SER model (MSMC) trained on 17.7k unlabeled IEMOCAP segments and fine-tuned on speaker-independent folds.
- Engineered a real-time TensorRT 10.5 FP16 inference pipeline achieving 0.24 ms batch latency on an NVIDIA H200 (a 14x speedup over PyTorch FP32).
- Implemented a transparent, confidence-driven late-fusion mechanism that dynamically weights voice, vision, and text based on entropy/neutral probabilities with exponential smoothing and hysteresis.
- Built an interactive Chrome browser demo supporting live speech-to-emotion analysis, 10-fold speaker-holdout checkpoint hot-swapping (~150 ms cache load), and side-by-side comparison against a 95M wav2vec 2.0 SER baseline.

## Problem

Most published speech emotion recognition systems are evaluated offline using oracle utterance boundaries and average segment-level logits, failing to meet the real-time sliding-window and low-latency demands of live deployment. Furthermore, multimodal deployments struggle with properly fusing modalities operating at different rates and scales without letting lexical transcriptions (ASR) overpower non-lexical prosodic cues. It is critical to build browser-compatible interactive setups where users can verify that the audio branch relies strictly on prosody rather than keywords.

## Method

The acoustic model uses a Masked Auto-Encoder (MSMC) taking a 128 x 300 log-mel spectrogram representing the most recent three seconds of audio as input. It is pretrained via self-supervision on 17.7k unlabeled IEMOCAP segments, turning the encoder into a dedicated prosodic feature extractor, followed by fine-tuning with a four-class linear head for happiness, sadness, anger, and neutrality. The text branch operates purely as an auxiliary tie-breaker utilizing transcripts from a native speech recognition API to emit a soft probability vector, ensuring the model's core behavior is driven by non-lexical prosody rather than keyword triggers.

The deployment architecture exports the MSMC encoder and classifier to ONNX (opset 17) and compiles them offline into TensorRT 10.5 FP16 engines (~15 MB on disk, requiring ~80s build time per fold), while feature extraction (mel-spectrograms) stays in PyTorch. Modality weights for late fusion are computed as w_m = 2 max(0, (1 - p_m^neu) - 0.15) and are subsequently renormalised, summed, weighted, and smoothed via an exponential moving average (alpha = 0.20) with a 0.10 hysteresis on the dominant class label. A confidence-weighted fallback mechanism handles scenarios where modalities are uncertain or silent.

## Experimental setup

Evaluated using the 10-fold IEMOCAP dataset (speaker-independent split), alongside synthetic vision and text probability streams to test fusion dynamics. Compared against an open Hugging Face wav2vec 2.0 SER baseline (95M parameters). Metrics include weighted accuracy (WA), unweighted accuracy (UA), top-1 accuracy percentage, and end-to-end inference latency measured in milliseconds on an NVIDIA H200 GPU.

## Results

The deployed audio-only MSMC checkpoint achieves 74.03% weighted accuracy (WA) and 66.39% unweighted accuracy (UA) on the 10-fold IEMOCAP benchmark, with multimodal performance scaling beyond 83%. TensorRT 10.5 FP16 reduces inference latency to 0.24 ms per batch of five (14x speed-up over PyTorch FP32's 3.36 ms), with a maximum absolute logit error of approximately 0.001 due to numerical drift. Synthetic vision and text ablation experiments demonstrate that adding audio improves a vision-plus-text baseline by 6% to 9%, elevating overall top-1 accuracy from 70-85% depending on modality confidence levels.

| Backend | Latency | Speed-up |
|---|---|---|
| PyTorch FP32 (eager) | 3.36 ms | 1.0x |
| TensorRT 10.5 FP16 | 0.24 ms | 14.0x |

## Limitations

The real-time streaming mode has an accuracy ceiling near 60% due to the constrained 3-second receptive field, requiring the 5-second recording mode to reach full offline performance levels. The text ASR branch requires Chrome or Edge browsers to function natively, and WebSocket media capture (getUserMedia) mandates running on localhost or behind a TLS terminator.

## Why read this

Speech and ML engineers looking to deploy real-time, low-latency prosody-driven SER models in web browsers will find this paper valuable for its practical recipe combining lightweight masked auto-encoders, TensorRT optimization, and confidence-driven late fusion.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time interactive browser applications, live call-center sentiment monitoring, conversational AI analytics, and educational emotion-awareness tools.

## Institutions / 機構

Singapore Institute of Technology, Duke Kunshan University, NVIDIA

## Related

- (link related pages by id as the wiki grows)
