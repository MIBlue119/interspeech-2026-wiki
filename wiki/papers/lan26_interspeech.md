---
id: lan26_interspeech
category: paralinguistics-emotion
labels: [dataset-or-benchmark-release]
institutions: ["Shanghai Jiao Tong University", "VUI Labs"]
code: https://github.com/originallover/SA-UAED
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2486
pdf: https://www.isca-archive.org/interspeech_2026/lan26_interspeech.pdf
---

# SA-UAED: Joint Frame-Level Detection of Audio Events, Speaker Activities, and Speaker-Attributed Paralinguistic Events

*Zekun Lan, Wangyou Zhang, Yanmin Qian*

[PDF](https://www.isca-archive.org/interspeech_2026/lan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2486)

**Category:** `paralinguistics-emotion` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — SA-UAED introduces a speaker-attributed unified audio event detection framework that jointly models sound events, speaker activities, and paralinguistic events like laughter and coughing using task-specific representation subspaces. Trained on a new 500-hour simulated dataset (LibriPara), it significantly improves frame-level paralinguistic detection (SB-F1 for laughter rising from 0.371 to 0.476) without hurting diarization accuracy.

## Key contributions

- Proposed an automated audio simulation pipeline combining a stochastic script generator, ChatterBox-Turbo for speaker-specific paralinguistics, and DESED background events to create perfectly aligned multi-label training data.
- Introduced LibriPara, a 500-hour simulated multi-talker dataset featuring 16 kHz audio with frame-level event annotations and a controlled 15% speech overlap ratio.
- Developed SA-UAED, a unified frame-level detection framework utilizing task-specific fully-connected projection layers to decouple generic speaker embeddings into specialized paralinguistic sub-spaces.
- Demonstrated robust zero-shot generalization of speaker-attributed paralinguistic detection on real-world mixtures derived from the EARS corpus.

## Problem

Existing sound event detection (SED) and speaker diarization (SD) systems cannot reliably attribute paralinguistic events (such as laughter and coughing) to individual speakers. Prior unified models like T-UAED rely on generic speech-derived speaker embeddings (e.g., ECAPA-TDNN) that fail to capture the short-duration, high-variability spectral and temporal characteristics of non-verbal vocalizations. Furthermore, developing such models is severely bottlenecked by a complete scarcity of real-world multi-label audio data featuring fine-grained speaker-attributed paralinguistic annotations.

## Method

The SA-UAED architecture builds upon the encoder-decoder structure of T-UAED. The auditory encoder uses pre-trained self-supervised learning models—specifically BEATs and WavLM—to extract audio representations, while a 6-layer Transformer decoder with 8 attention heads uses learnable queries and speaker embeddings to autoregressively predict frame-level activities. To solve the acoustic mismatch of using generic speaker embeddings for non-verbal sounds, SA-UAED introduces dedicated, task-specific fully-connected projection layers (mapping 192 to 192 dimensions) that map generic ECAPA-TDNN speaker embeddings into distinct paralinguistic sub-spaces for cough and laughter in parallel.

The system is trained end-to-end using binary cross-entropy loss. The 500-hour LibriPara training set and a 5-hour test set are generated via a 4-phase simulation pipeline: (1) an audio script generator defining temporal event recipes; (2) ChatterBox-Turbo zero-shot TTS taking LibriSpeech prompts to generate pure laugh/cough clips, filtered via PANNs and energy-based VAD; (3) mixing these with LibriSpeech utterances and 9 DESED background event classes at 3-8 dB SNR for paralinguistics and 5-15 dB SNR for DESED; and (4) deterministically aggregating timestamps for 50 Hz (20 ms) frame-level ground-truth labels.

During inference, the model processes 32-second 16 kHz audio segments, taking pre-extracted reference speaker embeddings (from 5-second clean segments) and evaluating frame-by-frame activities for SED, speaker activity, and speaker-attributed paralinguistic events simultaneously.

## Experimental setup

Evaluated on the 500-hour LibriPara simulated training set, a held-out 5-hour simulated test set, and a zero-shot test set derived from the EARS corpus containing 107 speakers. Compared against the T-UAED baseline and a variant with a Shared Adapter. Metrics include Intersection-Based F1 (IB-F1) and Segment-Based F1 (SB-F1) at 50 Hz temporal resolution, plus Diarization Error Rate (DER) tracking Miss, False Alarm, and Speaker Confusion. Implemented in PyTorch using the Adam optimizer with an initial learning rate of 10^-4 (decayed by 5% per epoch), feature dimension D = 192, and 6-layer Transformer encoder/decoders.

## Results

On the LibriPara simulated test set, SA-UAED increases the SB-F1 for laughter from 0.371 (baseline) to 0.476, and for coughing from 0.282 to 0.473, while maintaining a stable DER of ~8.07. On the real-world EARS zero-shot test set, SB-F1 for laughter jumps from 0.259 to 0.409 and cough from 0.375 to 0.470. Ablations show that using a Shared Adapter performs worse than the baseline (dropping laughter SB-F1 to 0.357), proving that forcing distinct paralinguistic events into a shared subspace hurts performance. A minor negative transfer trade-off is observed where generic SED SB-F1 drops slightly from 0.984 to 0.979 due to shared acoustic frontend feature interference.

| Model | IB-F1 (cough) | IB-F1 (laugh) | SB-F1 (cough) | SB-F1 (laugh) | DER (MS/FA/SC) |
|---|---|---|---|---|---|
| T-UAED Baseline | 0.144 | 0.214 | 0.282 | 0.371 | 8.09 (2.54/1.68/3.88) |
| + Shared Adapter | 0.102 | 0.153 | 0.281 | 0.357 | 8.06 (2.63/1.58/3.84) |
| SA-UAED | 0.248 | 0.230 | 0.473 | 0.476 | 8.07 (2.44/1.78/3.86) |

## Limitations

The framework currently relies on simulated data (LibriPara) and synthesized paralinguistic tokens from TTS engines, which may not capture the full chaotic acoustic diversity of spontaneous human vocalizations. It exhibits negative transfer where optimizing a shared auditory encoder for continuous speech, background noise, and transient paralinguistics slightly degrades generic SED performance. Additionally, the approach requires clean enrollment speech segments to extract reference speaker embeddings for the paralinguistic sub-spaces.

## Why read this

Speech and ML researchers working on multi-talker audio understanding or conversational AI systems will find this essential for learning how to decouple representations for transient non-verbal vocalizations without breaking speaker diarization.

## Code

- https://github.com/originallover/SA-UAED

## Applications

Intelligent multi-party meeting transcription, emotion-aware spoken dialogue systems, and remote clinical health monitoring environments.

## Institutions / 機構

Shanghai Jiao Tong University, VUI Labs

**Funding / 經費:** China NSFC, SJTU Med-X (Medicine & Engineering) Translational Research Grant

## Related

- [MultiLinguahah : A New Unsupervised Multilingual Acoustic Laughter Segmentation Method](callejas26_interspeech.md) — same problem · relatedness 2.0/3
- [Mind the Gap: Impact of Synthetic Conversational Data on Multi-Talker ASR and Speaker Diarization](polok26_interspeech.md) — complementary · relatedness 2.0/3
- [Multi-Speaker Embeddings With Weakly Supervised Speaker Activity Detection For Granular Speaker Diarization](thienpondt26_interspeech.md) — same problem · relatedness 2.0/3
- [Robust Multi-Tier Infant-Centered Audio Understanding with Whisper via Structured Speaker Conditioning](fan26b_interspeech.md) — same problem · relatedness 1.9/3
- [ParA-LLM: A Unified Approach to Paralinguistic and Acoustic Speech Understanding](anand26_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
