---
id: you26b_interspeech
category: speaker
labels: [self-supervised]
institutions: ["Cisco Systems"]
code: https://github.com/frankyoujian/BiRetNetDiarization
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1032
pdf: https://www.isca-archive.org/interspeech_2026/you26b_interspeech.pdf
---

# Bidirectional Retention Network-based Segmentation Model for Speaker Diarization

*Jian You, Xiangfeng Li, Tengfei Zhou, Erwan Zerhouni*

[PDF](https://www.isca-archive.org/interspeech_2026/you26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/you26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1032)

**Category:** `speaker` · **Labels:** `self-supervised`

**TL;DR** — This paper proposes a speaker diarization segmentation model that replaces standard back ends with a bidirectional Retention Network (BiRetNet) stacked on top of a WavLM front end within an EEND-VC framework, achieving state-of-the-art Diarization Error Rates (DER) on AISHELL-4 and VoxConverse.

## Key contributions

- Integrates a bidirectional Retention Network (BiRetNet) as the back end for end-to-end neural diarization with vector clustering (EEND-VC).
- Employs a chunkwise recurrent retention mechanism with a 2-second window (100 frames) to achieve linear time complexity and stable memory scaling over long audio durations.
- Combines a frozen/fine-tuned WavLM front end with a learnable layer-wise weighted sum representation for robust acoustic feature extraction.
- Demonstrates superior performance over BiLSTM, Transformer Attention, and Mamba back end architectures across multiple benchmark corpora.

## Problem

Traditional cascaded speaker diarization pipelines struggle to accurately model overlapped speech, whereas fully end-to-end neural diarization (EEND) models scale poorly in memory and struggle with unknown or large speaker counts in long-form recordings. While EEND-VC bridges these gaps by combining local window segmentation with global vector clustering, its typical back-end architectures—ranging from RNNs and attention-based Transformers to State-Space Models like Mamba—either suffer from quadratic attention bottlenecks, high memory consumption at long contexts, or sub-optimal long-range temporal modeling. Addressing these limitations is crucial for scalable, overlap-aware diarization in real-world multi-speaker environments.

## Method

The proposed segmentation model adopts the Pyannote-based EEND-VC framework, substituting the traditional BiLSTM back end with a BiRetNet architecture. The front end uses a publicly available pre-trained WavLM Base+ model (94.3M parameters) whose 12-layer outputs are combined using a learnable weighted sum at each time frame, then linearly projected from 768 to 256 dimensions and layer-normalized. The resulting frame-level features are fed into a 4-block BiRetNet back end featuring 4 retention heads per block, a position-wise feed-forward network with a hidden size of 1024, Pre-LayerNorm, and residual connections.

The BiRetNet back end leverages the chunkwise recurrent representation of Retention Networks. An audio sequence of length $L$ is partitioned into chunks of length $B$ (set to 100 frames, corresponding to 2 seconds of 50-fps WavLM output). Intra-chunk computations are executed in parallel on GPUs, while cross-chunk dependencies are propagated via fixed-size recurrent state updates ($S_n = \gamma S_{n-1} + K_n^\top V_n$). The decay factor $\gamma$ is set to 1 to prevent temporal information decay across the stream. The architecture processes features through dual parallel retention blocks (one operating on time-reversed sequences) whose outputs are summed with the input via residual skip connections. The model is trained using powerset multi-class cross-entropy loss (covering non-speech, individual speakers, and concurrent pairs where $N=4$ max speakers and $K=2$ concurrent speakers per frame).

Training follows a two-stage recipe: Stage 1 freezes the WavLM front end and trains the back end for 100 epochs with batch size 128 using AdamW (initial learning rate 1e-3). Stage 2 optionally unfreezes WavLM for joint fine-tuning for up to 60 epochs with batch size 64 and an initial learning rate of 1e-5. Dataset-specific domain adaptation is subsequently applied with a patience of 10 epochs. Inference uses VBx clustering on ResNet34-LM speaker embeddings extracted from non-overlapping regions, with hyperparameter optimization performed via Optuna.

## Experimental setup

Models are trained on a compound 952-hour dataset comprising AMI-SDM, AISHELL-4, AliMeeting far-field, NOTSOFAR-1, MSDWild Few, VoxConverse v0.3, RAMC, LibriConvo, CallHome, and a simulated LibriSpeech-based synthetic mixture augmented with MUSAN noise and room impulse responses. DIHARD III is held out entirely for out-of-domain and domain-adaptation evaluation. Baselines include LSTM, Attention (Transformer encoder), and Mamba-based back ends under identical WavLM feature extraction. Evaluation metrics report Diarization Error Rate (DER) without collars, alongside macro-averaged DER across datasets and computational efficiency measures (Real-Time Factor and peak CPU memory usage).

## Results

Under the WavLM-frozen setting without domain adaptation, the BiRetNet system (S4) achieves an in-domain macro-average DER of 15.8%, outperforming LSTM (17.3%), Attention (17.9%), and Mamba (16.2%). When fully domain-adapted and jointly fine-tuned (S7), the model reaches a 15.0% macro average and establishes new state-of-the-art results of 9.9% DER on AISHELL-4 and 8.5% DER on VoxConverse. Ablations on back end depth show that 4 blocks optimize performance, while 5 blocks degrade results due to optimization overhead; chunk size evaluations confirm 100 frames (2s) is optimal, matching the empirical observation that 92% of turn intervals in AliMeeting occur within 2 seconds. Efficiency tests on 1-hour CPU runs demonstrate that BiRetNet maintains a stable RTF (~1.5) and lower memory footprint (611–680 MB across 10s to 60s windows) compared to Attention, which balloons to 2334 MB at 60 seconds.

| System | AIS-4 | AliM | AMI | MSD | NSF | VoxC | In-domain Macro Avg. |
|---|---|---|---|---|---|---|---|
| S1: LSTM | 11.9 | 18.4 | 18.9 | 20.7 | 24.2 | 9.9 | 17.3 |
| S2: Attention | 11.9 | 18.7 | 20.4 | 21.0 | 25.7 | 9.9 | 17.9 |
| S3: Mamba | 11.4 | 17.1 | 17.8 | 18.9 | 22.3 | 9.5 | 16.2 |
| S4: BiRetNet (Frozen) | 11.0 | 16.1 | 17.4 | 18.4 | 21.9 | 9.9 | 15.8 |
| S7: BiRetNet + Adapted + Fine-tuned | 9.9 | 15.2 | 16.7 | 18.7 | 21.5 | 8.5 | 15.0 |

## Limitations

The model experiences higher error rates on dense multi-speaker settings such as NOTSOFAR-1 (DER ~22%), driven by speaker confusion in scenarios with up to 7 speakers ($N=7$). Evaluation is restricted to monaural audio channels (first channel used from multichannel arrays) and standard conversational benchmarks, leaving extreme acoustic reverberation and unconstrained multi-channel spatial processing unaddressed. Furthermore, joint fine-tuning requires reduced batch sizes due to GPU memory constraints.

## Why read this

Speech and machine learning researchers working on streaming or long-form speaker diarization should read this paper to see how bidirectional Retention Networks provide a linear-complexity, memory-efficient alternative to Transformers and Mamba without sacrificing overlap-aware segmentation accuracy.

## Code

- https://github.com/frankyoujian/BiRetNetDiarization

## Applications

Real-time and batch multi-speaker diarization for meeting transcription, judicial proceedings, customer service calls, and multi-party conversational analytics.

## Institutions / 機構

Cisco Systems

## Related

- [SphereVBx: Spherical Variational Bayes Clustering for Simplified EEND-VC Diarization](palka26_interspeech.md) — same problem · relatedness 2.8/3
- [Two-Level Uncertainty Suppression for Robust Meeting Diarization](asaka26_interspeech.md) — same problem · relatedness 2.8/3
- [SDR-LLM: Speech-LLM Based End-to-End Speaker Diarization and Recognition with Sentence-Level Temporal Modeling](yu26g_interspeech.md) — same problem · relatedness 2.8/3
- [Multi-Speaker Embeddings With Weakly Supervised Speaker Activity Detection For Granular Speaker Diarization](thienpondt26_interspeech.md) — same problem · relatedness 2.8/3
- [Spatially-Augmented Sequence-to-Sequence Neural Diarization for Meetings](li26la_interspeech.md) — same problem · relatedness 2.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
