---
id: sultana26_interspeech
category: resources-evaluation
labels: [efficient-on-device, self-supervised, robustness-noise]
institutions: ["Ohio State University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1607
pdf: https://www.isca-archive.org/interspeech_2026/sultana26_interspeech.pdf
---

# A Fine-Grained Acoustically-Aware Pre-training Encoder for Speech Quality Assessment

*Subrina Sultana, Donald S. Williamson*

[PDF](https://www.isca-archive.org/interspeech_2026/sultana26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sultana26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1607)

**Category:** `resources-evaluation` · **Labels:** `efficient-on-device`, `self-supervised`, `robustness-noise`

**TL;DR** — The paper introduces FASQA, a parameter-efficient, fine-grained acoustically-aware self-supervised speech encoder designed for speech quality assessment (MOS prediction) that explicitly incorporates noise and reverberation characteristics. Despite having only 15M parameters, the large-dataset variant achieves performance competitive with massive 86M-parameter models like Dasheng.

## Key contributions

- Proposes FASQA, an audio-adapted encoder combining Local Spectral-Temporal Encoding (LSpTE) and a Frame-wise Spectral Relationship Aggregator (FSpRA) for fine-grained spectral-temporal feature extraction.
- Extends prior pre-training objectives by adding two novel auxiliary MLP classification workers targeting Direct-to-Reverberation Ratio (DRR) and frequency bandwidth (narrowband vs. wideband distortions).
- Implements a joint multi-task self-supervised and supervised framework using 12 concurrent workers (4 regression, 3 binary classification, 5 acoustic classification workers).
- Demonstrates that an acoustic-aware 15M-parameter encoder outperforms or matches much larger standard speech SSL baselines (Wav2vec 2.0, HuBERT) on multiple speech quality benchmarks.

## Problem

Standard speech self-supervised learning (SSL) models such as Wav2vec 2.0, HuBERT, and WavLM are heavily optimized for long-term temporal, phonetic, and speaker representations while intentionally making their embeddings invariant to background acoustics. Consequently, they struggle with perceptual quality tasks like Mean Opinion Score (MOS) prediction because background noise, room reverberation, and fine-grained spectral artifacts heavily dictate human perception. Furthermore, these massive models are computationally expensive and parameter-heavy, making them impractical for resource-constrained edge devices.

## Method

The FASQA architecture processes 16 kHz audio waveforms converted into 64-bin mel-spectrograms (25 ms frame size) fed through an initial stack of convolutional layers with ReLU activations expanding channels up to 512 dimensions. The core encoder consists of LayerNorm, an LSpTE module containing three blocks (channel reduction, a local 2x1 2D convolution, channel restoration, plus a Dynamic Positional Encoder utilizing 3x3 depthwise 2D convolutions), another LayerNorm, an FSpRA module utilizing learnable frame-wise queries with multi-head attention along the spectral dimension, and a final projection reducing dimensions from 512 to 256.

The framework is jointly optimized via 12 workers: 4 regression heads (waveform, log power spectrum (LPS), mel-frequency cepstral coefficients (MFCC), and prosody), 3 binary classification heads (local info max, global info max, sequence predicting coding), and 5 acoustic classification heads. The acoustic heads comprise noise type (AudioSet categories), SNR level (-5 to +15 dB plus clean), spectral energy region (low/mid/high energy concentration), DRR category (< -6.25 dB, -6.25 to -0.15 dB, -0.15 to 15 dB, plus anechoic), and frequency bandwidth distortion (narrowband via 4 kHz lowpass vs wideband). Loss weights are set to 0.1 for LPS/prosody, 0.6 for SNR/noise type, 0.05 for MFCC, and 1.0 for all other workers.

Following pre-training, the 15M-parameter encoder is frozen, and a downstream MOS prediction head (hidden layer of 64 units, LayerNorm, ReLU, 0.2 dropout) is trained using MSE loss with the Adam optimizer (lr=0.00012, weight decay=0.001) for MOS values rescaled to 1-5.

## Experimental setup

Pre-training uses the LibriSpeech dataset augmented with 11,175 noise samples (FSDKaggle2018, Hu Corpus, NoiseX-92) across SNR levels from -5 to 15 dB, and 2,694 Room Impulse Responses (RIRs) generated from 10 room configurations with T60 reverberation times of 0.3s, 0.6s, and 0.9s (totaling up to 78 hours for the large variant). Downstream MOS evaluation is performed on NISQA TRAIN/VAL/SIM, NISQA TESTFOR, IUB (COSINE corpus), and TMHINTQI datasets. Baselines include Dasheng (Base, 86M), Wav2vec 2.0 (Base, 95M), HuBERT (Base, 95M), PASE, and PASE variants with noise/acoustic workers. Performance is evaluated using Mean Squared Error (MSE), Linear Correlation Coefficient (LCC), and Spearman's Rank Correlation Coefficient (SRCC).

## Results

On the NISQA dataset, the FASQA (Large) model achieves an MSE of 0.281, LCC of 0.859, and SRCC of 0.845, performing competitively with the much larger Dasheng (86M) model (MSE 0.250, LCC 0.851, SRCC 0.836) and significantly outperforming Wav2vec 2.0 Base (MSE 0.373, LCC 0.754) and HuBERT Base (MSE 0.307, LCC 0.791). The smaller 15M FASQA model trained on a constrained 7-hour subset achieves an NISQA MSE of 0.402 and LCC of 0.798, beating standard PASE and baseline SSL models. Ablation studies removing the DRR and narrowband/wideband workers from FASQA (Small) consistently degrade performance on the TMHINT dataset, increasing MSE from 0.448 to 0.489 and dropping LCC from 0.748 to 0.719, validating the efficacy of the newly introduced acoustic workers.

| System / Condition | NISQA MSE ↓ | NISQA LCC ↑ | TMHINT MSE ↓ | TMHINT LCC ↑ |
|---|---|---|---|---|
| Dasheng (Base, 86M) | 0.250 | 0.851 | 0.420 | 0.764 |
| Wav2vec 2.0 (Base, 95M) | 0.373 | 0.754 | 0.746 | 0.619 |
| HuBERT (Base, 95M) | 0.307 | 0.791 | 0.767 | 0.737 |
| PASE w/ Noise workers [16] | 0.475 | 0.746 | 0.494 | 0.722 |
| FASQA w/ Acoustic (Small, 15M) | 0.402 | 0.798 | 0.448 | 0.748 |
| FASQA w/ Acoustic (Large, 15M) | 0.281 | 0.859 | 0.410 | 0.769 |

## Limitations

The current evaluation is restricted to in-domain test configurations, leaving out-of-distribution (ODS) and out-of-domain (ODM) generalization scenarios largely unexplored. The synthetic simulation pipeline relies on a finite set of 10 room configurations and specific noise datasets, which may limit generalization to complex real-world acoustic profiles not captured during RIR generation.

## Why read this

Speech and ML engineers building on-device or resource-constrained speech quality assessment systems should read this to learn how to design parameter-efficient SSL encoders that capture fine-grained acoustic and perceptual distortion cues using auxiliary environmental workers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated speech quality assessment, real-time voice communication monitoring, and telecom network testing on resource-constrained devices.

## Institutions / 機構

Ohio State University

**Funding / 經費:** National Science Foundation, Ohio Supercomputer Center

## Related

- (link related pages by id as the wiki grows)
