---
id: rachumallu26_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2009
pdf: https://www.isca-archive.org/interspeech_2026/rachumallu26_interspeech.pdf
---

# QuadVAD: Fine-Grained Speech Detection with a Compact Architecture

[PDF](https://www.isca-archive.org/interspeech_2026/rachumallu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rachumallu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2009)

**TL;DR** — QuadVAD is a compact, 25 KB neural voice activity detection system operating at a fine-grained 4 ms resolution that achieves superior boundary precision and an RTF of 0.0014 on an Intel Core i7 CPU.

## Problem

Standard voice activity detection systems typically operate at coarse frame resolutions between 16 ms and 40 ms, introducing quantization jitter that truncates critical initial phonetic transients and degrades downstream speech processing. While traditional lightweight models optimize memory, they often lack temporal context modeling or robustness in low SNR environments. This trade-off hinders full-duplex conversational AI systems and always-on edge devices requiring ultra-low latency for barge-in and end-of-turn detection.

## Method

The architecture features a three-stage pipeline comprising learned spectral decomposition using 1D convolutions to extract 17-channel real and imaginary magnitude components from 7 ms input frames, a four-layer hierarchical local encoder using 3-kernel convolutions and ReLUs, and an LSTM cell with a hidden size of 16 for temporal smoothing followed by a sigmoid classification layer. The system is trained on 200 hours of augmented LibriSpeech data using Montreal Forced Aligner labels and fine-tuned on 50 hours derived from the TIMIT corpus. Optimization uses a multi-objective loss function combining binary cross-entropy and a smoothed loss regularizer with coefficients lambda=0.25 and tau=5 to suppress spurious prediction spikes.

## Results

Evaluated on TIMIT, Earnings21, and VoxConverse test sets, QuadVAD outperforms baseline models like Silero VAD and TenVAD on the AUC-ROC metric, scoring 0.97 on TIMIT, 0.94 on Earnings21, and 0.93 on VoxConverse. In noise robustness tests across -60 to -15 dBFS gain ranges and various ambient noise types, the model maintains high accuracy while consuming only 25 MFLOPs and occupying 25 KB of memory. TIMIT fine-tuning consistently yields a 2-3% performance boost across evaluation metrics.

## Code

- https://github.com/Ramakrishna-Chaitanya/QuadVAD-Interspeech2026

## Applications

Edge-device conversational AI systems, always-on smart speakers, wake-word detection front-ends, and full-duplex dialogue pipelines requiring precise barge-in and end-of-turn detection.

## Related

- (link related pages by id as the wiki grows)
