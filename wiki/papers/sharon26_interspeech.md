---
id: sharon26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1705
pdf: https://www.isca-archive.org/interspeech_2026/sharon26_interspeech.pdf
---

# Less can be More: What Aspects of Speech Drive End-of-Turn Detection

*Rini Sharon, Manickavela A, Kadri Hacioglu, Andreas Stolcke*

[PDF](https://www.isca-archive.org/interspeech_2026/sharon26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sharon26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1705)

**TL;DR** — A systematic ablation of acoustic, prosodic, and text modalities in a streaming end-of-turn (EOT) detector reveals that adding text features actually increases false alarms, while the acoustic-prosodic combination (A+P) achieves the best overall balance of accuracy and latency.

## Key contributions

- Designs a trimodal streaming EOT detector (APT) with zero-masking modality dropout, enabling controlled ablation across all 7 non-empty modality subsets under identical training conditions.
- Exhaustively evaluates all 7 subsets of {A, P, T} from scratch to determine when additional modalities genuinely improve performance beyond the best single-stream model.
- Provides a feature-space analysis quantifying per-modality class separability using silhouette scores on frozen pretrained encoders.
- Demonstrates that text streams cause an increase in premature detections due to mid-turn syntactic completions in conversational data.

## Problem

In conversational AI, determining when a user has finished speaking requires balancing the trade-off between interrupting the user (reacting too early) and creating unnatural delays (waiting too long). Traditional silence detection and VAD thresholds treat all pauses equally and fail to distinguish hesitations from turn completions. While recent work incorporates semantic text features alongside acoustic and prosodic signals, the relative contribution of each modality remains unclear, and how they interact in streaming settings is poorly understood.

## Method

The APT architecture fuses three streams into a 272-dimensional vector per frame at a unified 25 Hz frame rate (40 ms per frame): an acoustic stream using a frozen 70M-parameter Zipformer2 encoder operating on 80D log-mel filterbanks, a prosodic stream using 5 handcrafted features (including pitch, pitch derivative, voiced/speech flags, and a log-scaled silence duration counter) downsampled to 25 Hz and projected to 16D, and a text stream using a frozen MiniLM sentence encoder that recomputes embeddings only on new word emissions from a greedy RNN-T decoder combined with sinusoidal positional encodings.

Each stream passes through an independent projection layer followed by depthwise separable temporal convolution over a 7-frame causal window (280 ms context). The joint 272D representation is processed by a shared fusion module consisting of two linear layers (projecting to 128D and then 1D) with GELU activations and dropout, outputting a per-frame EOT probability via a sigmoid function. To perform controlled ablations without altering model capacity or parameter count, disabled modalities are replaced with fixed zero-valued tensors via PyTorch register_buffer, preventing gradient flow through inactive streams while maintaining input dimensionality.

During inference, a duration-aware thresholding rule declares a positive EOT only when the sigmoid output exceeds threshold tau for 8 consecutive frames (320 ms), with the detection time pegged to the final frame of this sustained crossing. The text stream acts as a learned silence cue because static embeddings on blank frames combined with advancing positional encodings explicitly track elapsed time since the last decoded word.

## Experimental setup

Evaluated on a proprietary multi-domain English telephony corpus of real human-to-human calls (banking, insurance, retail, telecommunications) recorded at 8 kHz stereo, comprising 10K training utterances (33 hours), 2K validation utterances, and 5K test utterances split at the recording level. Compared against 7 distinct modality configurations derived from {A, P, T}. Trained using BCEWithLogitsLoss with positive class weight w^+ = 5.6 and AdamW (learning rate 1e-4, weight decay 1e-5, gradient clipping 5.0, dropout 0.2) for up to 30 epochs with early stopping on validation F1. Evaluated using utterance-level F1, false alarm percentage (FA%), miss percentage (Miss%), mean premature triggers per utterance (FA/utt), and median detection latency.

## Results

The acoustic-only (A) configuration achieves an F1 of 0.927, a miss rate of 4.4%, and a median latency of 440 ms at threshold tau = 0.86. Adding prosodic features (A+P) yields the best overall performance with an F1 of 0.930, a false alarm rate of 7.8% (down from 9.2%), a miss rate of 5.2%, and a median latency of 400 ms (McNemar p < 0.001). Conversely, the text-only (T) model performs poorly with an F1 of 0.292 and an FA/utt of 5.416, and incorporating text into multimodal configurations (such as A+T, P+T, and APT) consistently increases false alarms and FA/utt due to mid-turn syntactic completions.

In feature space analysis, prosodic raw features show high class separability with a silhouette score of 0.301, driven largely by silence duration. The acoustic projection provides the largest silhouette gain (+0.158 over raw input), whereas text representations exhibit high overlap with a silhouette score of 0.108 due to filament structures formed on blank decoder frames.

| System/Config | F1 | FA% | Miss% | FA/utt | Med Lat (ms) |
|---|---|---|---|---|---|
| A | 0.927 | 9.2 | 4.4 | 0.196 | 440 |
| P | 0.828 | 25.6 | 3.7 | 0.327 | 960 |
| T | 0.292 | 74.8 | 8.1 | 5.416 | 640 |
| A+T | 0.875 | 14.6 | 7.6 | 0.275 | 460 |
| A+P | 0.930 | 7.8 | 5.2 | 0.144 | 400 |
| APT | 0.909 | 10.7 | 6.0 | 0.206 | 360 |

## Limitations

The evaluation is restricted to in-domain two-speaker English telephony data, and findings may not fully generalize to low-resource languages, noisy acoustic environments, or domain-specific conversational styles where semantic signals are more critical. The continuous text fusion strategy amplifies false alarms at mid-turn syntactic completions, and the 40 ms latency advantage of the trimodal system is partially offset by 30-60 ms of inference overhead from the ASR/BERT components.

## Why read this

Speech and conversational AI researchers should read this paper to understand why continuous semantic text fusion can degrade end-of-turn detection performance, and why lightweight acoustic-prosodic modeling is often sufficient for real-time voice agents.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time conversational AI agents, voice assistants, and telephony customer service bots requiring robust, low-latency turn-taking.

## Related

- (link related pages by id as the wiki grows)
