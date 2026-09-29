---
id: rachumallu26_interspeech
category: asr
labels: [efficient-on-device, streaming-real-time]
institutions: ["Meeami Technologies"]
code: https://github.com/Ramakrishna-Chaitanya/QuadVAD-Interspeech2026
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2009
pdf: https://www.isca-archive.org/interspeech_2026/rachumallu26_interspeech.pdf
---

# QuadVAD: Fine-Grained Speech Detection with a Compact Architecture

*Ramakrishna Chaitanya Rachumallu, Nivedita Chennupati, Ankit Gupta, Balaji Padmanaban, ParvathiPriyanka Bolla, Harish Rajamani, Naveen Ambati*

[PDF](https://www.isca-archive.org/interspeech_2026/rachumallu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rachumallu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2009)

**Category:** `asr` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — QuadVAD is an ultra-lightweight, 25 KB voice activity detection model operating at a fine-grained 4 ms temporal resolution that achieves competitive or superior AUC-ROC while avoiding truncation of initial speech transients.

## Key contributions

- Proposes a 3-stage neural VAD architecture combining learned spectral decomposition, hierarchical local encoding, and an LSTM cell, totaling only ~6k parameters (25 KB).
- Establishes a high-precision data curation and alignment pipeline using the Montreal Forced Aligner (MFA) and TIMIT fine-tuning to achieve a non-overlapping 4 ms frame resolution.
- Implements a multi-objective optimization loss combining binary cross-entropy with a smoothed loss regularizer to suppress transient prediction spikes at high temporal resolution.
- Demonstrates superior onset and offset boundary precision on wake-word and conversational datasets, reducing the truncation of initial phonetic syllables.

## Problem

Traditional signal processing VADs (e.g., WebRTC) fail in noisy, low-SNR environments, while existing deep learning neural VADs (such as Silero VAD, TenVAD, and ResectNet) operate at coarser frame resolutions of 16 ms to 40 ms. This coarse time grid introduces quantization jitter, causing speech onset and offset errors that truncate critical initial phonetic transients and degrade downstream tasks like ASR and wake-word detection. Achieving high temporal precision typically incurs massive computational overhead and memory footprints, making them unsuitable for resource-constrained, always-on edge devices.

## Method

QuadVAD's architecture consists of three sequential stages. Stage 1 performs spectral decomposition using a 1D convolutional block (kernel size 64, stride 16, 34 output channels) on a 7 ms input segment (4 ms current frame plus 3 ms preceding context). The 34 channels are split evenly into real and imaginary components to compute magnitude-equivalent features of shape (B, T=4, C=17). Stage 2 (Hierarchical Local Encoding) uses four sequential convolutional layers with kernel size 3 and ReLU activations (channel dimensions 16, 8, 8, 16; strides 1, 2, 2, 1) to compress local spectral cues down to (B, T=1, C=16). Stage 3 applies an LSTM cell with hidden size 16 for temporal context modeling and smoothing, followed by a final convolutional layer and sigmoid activation to output frame-wise speech probabilities at 4 ms resolution.

The training recipe utilizes a multi-objective loss function combining Binary Cross-Entropy (BCE) and a smoothed loss (with weights $\lambda=0.25$ and $\tau=5$) to penalize boundary jitter and suppress short-duration spurious spikes. A 0.3 dropout layer precedes the Stage 3 classification convolution. The model is trained for 100 epochs using the Adam optimizer with a batch size of 256, starting from an initial learning rate of $10^{-3}$ managed by a ReduceLROnPlateau scheduler. The training data combines 200 hours of synthesized LibriSpeech data (aligned via Montreal Forced Aligner with stochastic silence insertions) and is subsequently fine-tuned on a 50-hour augmented TIMIT-derived dataset.

At inference, the model ingests non-overlapping 4 ms frames with preceding context, running entirely on-device with an RTF of 0.0014 on an Intel i7 CPU. The design decisions—such as learnable spectral filters instead of fixed STFT and hierarchical compression—were chosen to extract complex phase-magnitude representations and localize high-resolution transients while maintaining a footprint under 25 KB.

## Experimental setup

Evaluated on the TIMIT test set (0.54 hours), Earnings21 (40 hours), VoxConverse Test (43 hours), and a 9-hour noise-augmented TIMIT test set mixed with ESC-50, MUSAN, LibriVAD, and QUT Kitchen noise across -5 to 20 dB SNR. Baselines include Silero VAD (v6), TenVAD, and ResectNet 0.5x. Metrics include AUC-ROC, Precision, Recall, and F1-score with thresholds determined via Youden's J statistic. Implemented with PyTorch, trained on 15-second segments, utilizing early stopping based on validation AUC-ROC.

## Results

QuadVAD achieves an AUC-ROC of 0.97 on TIMIT test, 0.94 on Earnings21, and 0.93 on VoxConverse, matching or outperforming Silero VAD and TenVAD while requiring only 25 KB and 25 MFLOPs. In extreme low-gain environments (-60 to -40 dBFS), QuadVAD outperforms all baselines, reaching an AUC-ROC of 0.99, Precision of 0.958, Recall of 0.968, and F1-score of 0.96. In higher gain conditions (-40 to -15 dBFS), its performance is comparable to Silero VAD (AUC-ROC 0.983). Across noise types (pet sounds, door knocks, keyboard typing, and office ambiance), it closely tracks or beats TenVAD and Silero VAD. Ablations confirm that the TIMIT fine-tuning step yields an additional 2-3% performance boost across all metrics.

| Model | Size (KB) | FLOPs (M) | Latency (ms) | TIMIT (AUC-ROC) | Earnings21 (AUC-ROC) |
|---|---|---|---|---|---|
| Silero VAD | 1180 | - | 32 | 0.924 | 0.88 |
| TenVAD | 300 | 16 | 16 | 0.952 | 0.90 |
| ResectNet 0.5x | 18 | 6.4 | 40 | - | - |
| QuadVAD | 25 | 25 | 4 | 0.970 | 0.94 |

## Limitations

While the model exhibits cross-lingual robustness trends, evaluation is predominantly bounded to English corpora (TIMIT, LibriSpeech, Earnings21, VoxConverse). The synthetic noise augmentation pipeline relies on specific acoustic databases (ESC-50, MUSAN, DNS Challenge RIRs) which may not fully span all extreme real-world acoustic anomalies. Evaluation of temporal alignment relies heavily on forced-alignment tool precision, which itself has intrinsic boundary errors up to tens of milliseconds.

## Why read this

Speech and ML engineers building always-on, low-latency edge conversational systems should read this paper to learn how to design an ultra-compact (25 KB) neural VAD that achieves 4 ms temporal resolution without truncating initial phonetic transients.

## Code

- https://github.com/Ramakrishna-Chaitanya/QuadVAD-Interspeech2026

## Applications

Always-on edge devices, smart speakers, real-time conversational AI, wake-word detection, and full-duplex barge-in/end-of-turn speech controllers.

## Institutions / 機構

Meeami Technologies

## Related

- (link related pages by id as the wiki grows)
