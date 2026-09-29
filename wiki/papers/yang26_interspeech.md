---
id: yang26_interspeech
category: asr
labels: [robustness-noise]
institutions: ["Ohio State University", "Meta"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-127
pdf: https://www.isca-archive.org/interspeech_2026/yang26_interspeech.pdf
---

# Multi-Channel Differential ASR for Robust Wearer Speech Recognition on Smart Glasses

*Yufeng Yang, Yiteng Huang, Yong Xu, Li Wan, Suwon Shon, Yang Liu, Yifeng Fan, Zhaojun Yang, Olivier Siohan, Yue Liu, Ming Sun, Florian Metze*

[PDF](https://www.isca-archive.org/interspeech_2026/yang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-127)

**Category:** `asr` · **Labels:** `robustness-noise`

**TL;DR** — The paper introduces multi-channel differential automatic speech recognition (ASR) for smart glasses to robustly transcribe wearer speech in the presence of bystander side-talk, achieving up to an 18.0% relative reduction in word error rate over beamforming-only baselines.

## Key contributions

- Proposes multi-channel differential ASR, which merges complementary feature streams from multiple audio frontends (beamformer, microphone selection, and side-talk detection) without speaker identification overhead.
- Integrates a lightweight (~2M parameter) streaming temporal convolutional network (TCN) for sample-level side-talk detection (STD) operating under strict low-latency constraints.
- Collects a comprehensive real-world evaluation dataset using a Head and Torso Simulator (HATS) and Ray-Ban Meta smart glasses across 72 diverse bystander angles, heights, and distances.
- Demonstrates that combining microphone selection (ch-0) and side-talk embeddings (embed) with a wearer-steered MVDR beamformer (ch-x) achieves superior noise robustness and pristine clean-speech performance.

## Problem

Wearer speech recognition (WSR) on open-field smart glasses is highly vulnerable to bystander side-talk, which corrupts transcriptions and propagates downstream natural language processing errors. Traditional close-talk architectures or high-latency speech enhancement, diarization, and target speaker extraction models are impractical due to strict latency bounds and raise privacy concerns by modeling speaker identity. Existing smart glasses ASR relies solely on directional beamformers (such as NLCMV or MVDR), which fail to adequately suppress side-talk when spatial overlap occurs or when interferers are close to the wearer's angle.

## Method

The architecture comprises three frozen frontend modules whose outputs are fused into an Emformer-RNN-T ASR backbone: an internal MVDR beamformer steered toward the wearer's mouth yielding a single-channel feature stream (ch-x), a physical microphone selection module choosing the nose microphone closest to the mouth for highest SNR (ch-0), and a lightweight temporal convolutional network (TCN) computing sample-level side-talk detection logits mapped into a 5-dimensional embedding (embed).

For feature extraction, log-Mel spectrograms of ch-x and ch-0 are halved in dimension via two streaming 2D convolutional layers (kernel [2, 5], stride [1, 2], GLU activation) with batch normalization. The STD embeddings are processed by two Conv2D layers (kernel sizes [20, 1] and [16, 1]) to match the acoustic frame rate. The combined multi-channel features, microphone selection features, and STD embeddings are concatenated and fed into an ASR network containing 20 Emformer layers (input dim 320, 4 heads, feedforward dim 2048, 10 past frame context, segment size 2, GELU activation) and an RNN-T predictor with two 256-node LSTM layers.

The training setup uses ~500k clean and ~500k noisy simulated LibriSpeech utterances per set, trained on 32 NVIDIA H100 GPUs with batch size 3600, Adam optimizer, and a tri-stage learning rate schedule peaking at 0.0005. All frontends are frozen during training, adding fewer than 1M trainable parameters to the ~70M total model parameters, preserving a low systemic latency of 120 ms.

## Experimental setup

Evaluated on simulated LibriSpeech mixtures (clean validation of 6,747 utterances; test-clean and test-other with 3,558 and 3,502 utterances) and a custom real recorded HATS dataset featuring 188,640 utterances covering 72 bystander loudspeaker positions (8 angles, 3 heights, 3 distances) and two overlap ratios (0% and 50%). Baselines include clean-trained and noisy-trained single-channel beamformer (ch-x) systems. Metrics reported are word error rate (%WER).

## Results

On simulated noisy test data, the noisy-trained ch-x baseline achieves an 82.8% relative WER reduction over clean-trained ch-x, while adding side-talk embeddings (ch-x + embed) further improves results by 5.1% relative. On the real recorded HATS dataset, the proposed fully integrated differential system (ch-x + ch-0 + embed) achieves an average 14.4% relative WER reduction over the strong noisy-trained ch-x baseline, peaking at up to an 18.0% relative reduction.

Ablation studies on real data show that combining microphone selection and embeddings (ch-x + ch-0 + embed, 6.30% average WER on noisy data) outperforms using only channel selection (ch-x + ch-0, 6.49%) or only embeddings (ch-x + embed, 6.93%), proving that ch-0 and embed supply orthogonal contrastive cues. Notably, on clean real data, the noisy-trained differential system matches or beats the clean-trained ch-x baseline (6.29% vs 6.30% WER). Spatially, angular analysis reveals specific vulnerability zones at 270°, 315°, and 0° (wearer-bystander) and 225° (bystander-wearer) under 50% overlap conditions.

| System | Wearer-only (Clean) | Wearer + Side-talk (Avg 0%/50% Overlap) |
|---|---|---|
| Clean-trained ch-x | 6.30% | 27.31% |
| Noisy-trained ch-x | 7.20% | 7.36% |
| Noisy-trained ch-x + embed | 6.82% | 6.93% |
| Noisy-trained ch-x + ch-0 | 6.51% | 6.49% |
| Noisy-trained ch-x + ch-0 + embed | 6.29% | 6.30% |

## Limitations

The current side-talk detection module is evaluated primarily under single-bystander conditions and may degrade with multiple simultaneous interferers or unconditioned environmental noise. The evaluation is limited to simulated and playback-based HATS recordings rather than end-to-end on-device deployment constraints. Certain spatial angles (e.g., 270° and 315°) continue to challenge all systems under high overlap ratios, highlighting a residual gap in beamforming directionality.

## Why read this

Researchers and engineers building conversational speech interfaces for smart glasses or wearables will find a practical, low-latency blueprint for fusing spatial beamforming, microphone selection, and side-talk detection without inflating model size.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust on-device automatic speech recognition for smart glasses, augmented reality headsets, and continuous voice-controlled wearable assistants.

## Institutions / 機構

Ohio State University, Meta

## Related

- [Improving Streaming Speaker Diarization for LLM Based Multi-talker Speech Understanding](lin26f_interspeech.md) — same problem · relatedness 2.0/3
- [Enroll-on-Wakeup: A First Comparative Study of Target Speech Extraction for Seamless Interaction in Real Noisy Human-Machine Dialogue Scenarios](yang26b_interspeech.md) — same problem · relatedness 2.0/3
- [Head-Worn Dipole Microphone Array-based Speech Enhancement System for Single-Sided Deafness](takaki26_interspeech.md) — same problem · relatedness 1.9/3
- [Sweep-RSE: Streaming Region-of-Interest Speech Extraction in Multi-Talker Scenarios via Explicit Spatial Sweeping](yu26d_interspeech.md) — complementary · relatedness 1.9/3
- [AV-SNINet: A multi-channel audio-visual speech-noise interaction network for Target Speaker Extraction with cross-beam attention](tu26c_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
