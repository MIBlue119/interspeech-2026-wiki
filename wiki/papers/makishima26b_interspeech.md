---
id: makishima26b_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1592
pdf: https://www.isca-archive.org/interspeech_2026/makishima26b_interspeech.pdf
---

# Unified Audio-Visual Modeling to Recognize Which Face Spoke When and What in Scenarios with On- and Off-Screen Participants

*Naoki Makishima, Suzuka Yamada, Taiga Yamane, Mana Ihori, Tanaka Tomohiro, Satoshi Suzuki, Shota Orihashi, Ryo Masumura*

[PDF](https://www.isca-archive.org/interspeech_2026/makishima26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/makishima26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1592)

**TL;DR** — This paper proposes an audio-visual speaker-attributed speech recognition (AVSASR) method that handles both on-screen and hidden/off-screen participants by introducing a dedicated [None] video token. The method achieves lower Visual Word Error Rates (VWER) and Visual Time Error Rates (VTER) in scenes with off-screen speakers compared to pipeline baselines and conventional forced-matching models.

## Key contributions

- Introduces a specialized [None] video token within an autoregressive multi-talker AVSASR framework to represent speakers absent from the video feed, avoiding forced and erroneous visual associations.
- Expands simulated multi-talker LRS3 training and evaluation datasets to incorporate arbitrary mixtures of on-screen and off-screen participants across two- and three-speaker conversations.
- Formulates a joint audio-visual sequence modeling strategy supporting flexible combinations where each active speaker can be matched to any visible video track or designated as absent.

## Problem

Real-world conversations often feature participants who are occluded, outside the camera frame, or missing due to privacy policies, making traditional audio-visual speech recognition (AVSR) and active speaker detection (ASD) impractical since they assume every speaker is always visible. Conventional AVSASR systems serialize transcripts with video tokens under the strict assumption that all speakers are present in the video tracks, forcing erroneous associations when hidden speakers talk. Prior systems either cannot process missing video tracks or rely on decoupled multi-stage pipelines (like AVSR combined with lip-moving detection), which suffer from error propagation and fail to jointly optimize alignment.

## Method

The model uses a speech encoder, a video encoder, and an autoregressive Transformer decoder to jointly predict multi-talker text tokens, start/end timestamps, and video attribution tokens in first-in, first-out order. The speech encoder processes 80-dimensional log-mel filterbank features through 1x1 convolutions, max pooling, depthwise convolutions, two 256-dim LSTM layers, and 8 Transformer encoder blocks (4 heads, 256-dim hidden, 1024-dim FFN). The video encoder uses MobileNetV3-Small operating on 96x96 grayscale mouth ROIs sampled at 5 fps with added Gaussian noise (std=0.05). 

Outputs from the speech and video encoders are concatenated along the time axis with segment indicator vectors and positional encodings, feeding into a 2-layer Transformer encoder and a 2-layer Transformer decoder. The target sequence serializes text tokens, timestamps, speaker-change tokens ([sep]), sentence ends ([eos]), and video source tokens. The video token set includes visible track indices {1, ..., I} plus the newly introduced [None] token, optimized via standard cross-entropy loss over all valid audio-visual combinations.

## Experimental setup

Experiments use modified LRS3 dataset splits (pre-train, train-val, test) with non-overlapping speakers and longer audio clips. Two-speaker and three-speaker mixtures were simulated by mixing utterances at an average signal-to-interference ratio of ~0 dB. Models were compared against conventional multi-talker ASR, conventional multi-talker AVSASR (no [None] token), and a combined multi-talker AVSR + Lip Moving Detection (LMD) pipeline. Models were optimized using RAdam, pretraining first without off-screen speakers and then fine-tuning with off-screen data.

## Results

In the 2-speaker setting with off-screen speakers included, the proposed method achieves a VWER of 30.4% and VTER of 3.5%, outperforming the AVSR + LMD baseline (VWER: 34.8%, VTER: 6.4%) and conventional AVSASR (VWER: 71.9%, VTER: 76.3%). When all speakers are on-screen, the proposed method maintains competitive performance (e.g., 2-speaker VWER of 27.9% vs. conventional AVSASR's 28.8%), proving it does not sacrifice on-screen accuracy to gain off-screen capability. Ablations demonstrate that fine-tuning from models pre-trained without off-screen data is crucial for stabilizing training under complex audio-visual combinations.

| System | 1-Spk Off-Screen VWER | 2-Spk Off-Screen VWER | 3-Spk Off-Screen VWER | 2-Spk On-Screen VWER |
|---|---|---|---|---|
| Multi-talker AVSASR | 100.0% | 71.9% | 88.4% | 28.8% |
| Multi-talker AVSR + LMD | 1.1% | 34.8% | 44.9% | 28.9% |
| Proposed Method | 1.2% | 30.4% | 42.6% | 27.9% |

## Limitations

Evaluations rely on fully simulated multi-talker mixtures derived from single-talker LRS3 data rather than natural multi-party meeting recordings. Video is downsampled to 5 fps to manage memory, which discards rapid visual cues. Speaker association accuracy degrades in complex multi-speaker off-screen scenarios because relying purely on lip movement onset fails when multiple hidden participants converse simultaneously.

## Why read this

Speech and ML researchers working on multi-talker audio-visual pipelines should read this to understand how to gracefully handle unconstrained real-world environments where video coverage is partial or absent via a unified token-based approach.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated meeting transcription, customer service analytics, and multi-party video conferencing systems operating in environments with occluded or off-camera participants.

## Related

- (link related pages by id as the wiki grows)
