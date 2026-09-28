---
id: benslimane26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3301
pdf: https://www.isca-archive.org/interspeech_2026/benslimane26_interspeech.pdf
---

# RT-Tango: Real-Time Distributed Binaural Speech Enhancement for Low-Power Hearing Aid Devices

*Zahra Benslimane, Pierre Chouteau, Martyna Poreba, Fabrice Auzanneau, Michal Szczepanski, Fabian Chersi, Romain Serizel*

[PDF](https://www.isca-archive.org/interspeech_2026/benslimane26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/benslimane26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3301)

**TL;DR** — RT-Tango is a real-time distributed binaural speech enhancement framework tailored for hearing aids, combining perceptually motivated feature compression, grouped recurrent mask estimation, and temporal sparsification to achieve competitive quality at an ultra-low latency of 8 ms and a computational cost of 35.14 MMACs/s.

## Key contributions

- Introduces perceptually motivated ERB-scaled filterbank feature compression to reduce input dimensionality for dual-stage distributed mask estimation.
- Implements grouped recurrent neural networks (GRNN) to decrease recurrent computational complexity from O(H^2) to O(H^2/G) while retaining cross-band spectral modeling.
- Applies temporal sparsification via fixed-rate frame skipping (FRS) to eliminate redundant neural updates during streaming inference.
- Utilizes an asymmetric STFT configuration with a long analysis window and short synthesis window to decouple frequency resolution from algorithmic latency.
- Proposes a fully online streaming variant (RT-Tango-OS) employing recursive exponential moving averages for spatial covariance matrix estimation.

## Problem

Real-time binaural speech enhancement for resource-constrained devices like hearing aids faces strict tripartite constraints: ultra-low latency, limited on-device power/compute, and minimal inter-device wireless bandwidth. Centralized architectures require continuous high-bandwidth transmissions that drain batteries, while existing ultra-efficient single-microphone models discard crucial spatial cues. Fully distributed, fusion-center-free frameworks like Tango balance bandwidth requirements but lack optimization for ultra-low latency streaming, heavy quantization sensitivity, and embedded computational budgets.

## Method

RT-Tango preserves a two-stage distributed architecture where each ear-node independently estimates initial speech and noise masks via a Single-Node DNN (SN-DNN) and calculates an intermediate Speech Distortion Weighted Multichannel Wiener Filter (SDW-MWF). The compressed ear-specific signals are shared with the contralateral node, where a Multi-Node DNN (MN-DNN) refines the masks before a final SDW-MWF generates the enhanced binaural output. To achieve hardware efficiency, both DNNs use ERB-scaled front-ends to shrink spectral resolution at high frequencies and map back via inverse ERB. The recurrent layers are structured as Grouped Recurrent Neural Networks (GRNN) partitioned into G groups (G=8 for SN-DNN, G=2 for MN-DNN) to lower hidden state complexity. Temporal redundancy is exploited via Fixed-Rate Skipping (FRS), updating the SN-DNN every 4 frames (1/4 rate) and MN-DNN every 2 frames (1/2 rate). For streaming operation (RT-Tango-OS), an asymmetric Hann synthesis window of 8 ms decouples frequency resolution from reconstruction latency, and Spatial Covariance Matrices (SCMs) are updated online using a recursive exponential moving average with a forgetting factor of alpha = 0.995.

All models are trained using the Adam optimizer (lr = 10^-3) to minimize mean squared error against ideal ratio masks. The complete pipeline executes within tight embedded bounds, bringing total computational cost down to roughly 35 MMACs/s.

## Experimental setup

Models were trained on simulated binaural datasets combining clean LibriSpeech audio with speech-shaped and real-world environmental noise across a four-microphone hearing aid setup. Evaluation utilized 1,200 mixtures from the BinauRec dataset acquired via a portable hearing laboratory with behind-the-ear aids on a dummy head at input SNRs of -5, 0, and 5 dB. Baselines include the original Tango, a causal RNN variant (Tango-RNN), and a distributed adaptation of GTCRN. Evaluation metrics include scale-invariant objective metrics (SI-SDR, SI-SIR, SI-SAR in dB), PESQ, STOI, and computational cost measured in MMACs/s per node.

## Results

RT-Tango achieves a total computational cost of 33.41 MMACs/s (running at a 4 ms hop rate / ~250 frames/s), which is nearly six times more efficient than GTCRN at 197.5 MMACs/s while maintaining superior interaural balance and left/right PESQ scores. Its strictly causal streaming variant, RT-Tango-OS, operates with an 8 ms algorithmic latency at 35.14 MMACs/s, yielding SI-SDR scores of 20.5 dB (Left) and 24.7 dB (Right) and stable PESQ scores of 0.80/0.82 across nodes. Ablations show that 8 groups in the SN-DNN drop total DNN frame cost from 1.06 to 0.59 MMACs without quality loss, whereas grouping the MN-DNN beyond 2 groups degrades SI-SDR/SI-SAR by roughly 0.8-1 dB. Fixed-rate skipping preserves performance within 0.2 dB of the unskipped baseline while significantly outperforming learned gating strategies (like SkipRNN or TinyLSTM) which suffer degradation up to 1.2 dB on the left channel.

| System | Hop Size | Total MMACs/s | SI-SDR (L) | SI-SDR (R) | PESQ (L) | PESQ (R) |
|---|---|---|---|---|---|---|
| Unprocessed | - | - | 0.0 | -4.0 | 0.68 | 0.56 |
| Tango | 16 ms | 605.98 | 20.8 | 24.1 | 0.83 | 0.84 |
| GTCRN | 4 ms | 197.50 | 16.6 | 13.8 | 0.79 | 0.71 |
| Tango-RNN | 16 ms | 67.20 | 21.6 | 25.0 | 0.84 | 0.85 |
| RT-Tango (Ours) | 4 ms | 33.41 | 20.8 | 24.6 | 0.84 | 0.84 |
| RT-Tango-OS (Ours) | 4 ms | 35.14 | 20.5 | 24.7 | 0.80 | 0.82 |

## Limitations

The framework is evaluated primarily on simulated environments with a fixed target position in front and noise sources positioned at specific angles (45 and 90 degrees), leaving acoustic generality in complex multi-speaker cocktail party scenes underexplored. The online streaming configuration (RT-Tango-OS) incurs a minor performance degradation due to recursive SCM adaptation convergence lag compared to full-utterance batch SCM estimation. Furthermore, the approach assumes a synchronized multi-microphone streaming setup with adequate inter-device link reliability for minimal feature exchange.

## Why read this

Speech and ML engineers building ultra-low-latency, distributed on-device audio systems should read this paper to learn how to combine ERB feature compression, grouped recurrent network topologies, and fixed-rate temporal sparsification to achieve hearing-aid-grade streaming within a 35 MMACs/s budget.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time binaural hearing aids, hearables, and low-power distributed ear-worn communication devices operating under strict energy and latency constraints.

## Related

- (link related pages by id as the wiki grows)
