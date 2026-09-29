---
id: wang26m_interspeech
category: enhancement-separation
institutions: ["Kyoto University"]
code: https://huggingface.co/datasets/real-recordings/LibriReplay-DOA
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-787
pdf: https://www.isca-archive.org/interspeech_2026/wang26m_interspeech.pdf
---

# Position-Aware Target Speaker Extraction for Long-Form Multi-Party Conversations: A Diarization-Free Framework for ASR

*Yichi Wang, Junzhe Chen, Wangjin Zhou, Tatsuya Kawahara*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-787)

**Category:** `enhancement-separation`

**TL;DR** — PATSE is a multi-channel, position-aware target speaker extraction front-end that uses direction-of-arrival (DOA) spatial priors to directly generate speaker-attributed audio streams for multi-party conversations without needing explicit diarization, achieving a WER of 14.0% on LibriReplay-DOA.

## Key contributions

- Proposes PATSE, a multi-channel target speaker extraction front-end combining a DOA-guided spatial encoder and FiLM conditioning to eliminate explicit speaker diarization and cross-chunk permutation issues.
- Introduces LibriReplay-DOA, a real-room playback dataset consisting of 114 sessions (~7 hours) with ground-truth DOA annotations across various angular configurations and overlap ratios.
- Demonstrates consistent downstream ASR improvements over continuous speech separation (CSS) and diarization-guided source separation (GSS) pipelines across both synthetic and real-world datasets.

## Problem

Long-form multi-party conversations suffer from heavily imbalanced speaker activity, frequent interruptions, and high overlap percentages, making it difficult to answer 'who spoke when and what'. Standard continuous speech separation (CSS) methods mitigate sparse supervision via sliding windows but struggle with cross-window identity consistency and residual crosstalk, usually demanding a cascading diarization step. Conversely, cascaded diarization-before-separation pipelines falter because estimating speaker boundaries in heavy overlap remains notoriously unreliable. Existing speaker-embedding-based target speaker extraction (TSE) also relies on enrollment audio which is often absent in unconstrained meetings, motivating the use of stable spatial cues like direction of arrival.

## Method

PATSE adopts a TIGER-Large encoder-separator-decoder architecture adapted for multi-channel inputs via a Multi-Channel Feature Fusion (MCFF) module, which applies a transform-average-concatenate (TAC) strategy to fuse multi-channel STFT features into a unified single-stream representation. The spatial encoder computes Interaural Phase Differences (IPDs) from a 4-channel circular microphone array (radius 0.032m), compares them against theoretical phase differences (TPDs) derived from target speaker DOAs to construct Phase Similarity Features (PSFs), and refines them via band-specific stacked self-attention. Feature-wise linear modulation (FiLM) then injects these spatial features into the separation backbone. The system is trained using an activity-aware loss function combining residual log-energy loss for silent regions and SNR loss for non-silent regions with a scaling factor alpha set to 0.005, bypassing chunk-level permutation stitching by directly utilizing permutation-free target outputs followed by SileroVAD.

## Experimental setup

Evaluated on LibriReplay-DOA (4-channel circular array, 114 playback sessions/~7 hours, 4 target-interferer angles, 4 overlap ratios) and the real-world TEIDAN triadic dialogue corpus (English subset, ~2.5 hours, 31.98% average overlap). Compared against DSB+Gate, FastMNMF, Sortformer+GSS, and CSS baselines using FasNet-TAC and TIGER backbones. Metrics include Word Error Rate (WER) using Whisper Large-v3 and Diarization Error Rate (DER). Models were trained on 50 hours of simulated conversational data with gpuRIR simulated rooms (RT60 0.2-0.8s) and DNS noise.

## Results

On the LibriReplay-DOA dataset with pre-training and fine-tuning (PT+FT), PATSE achieves an overall WER of 14.0%, substantially outperforming CSS TIGER (32.8%), FastMNMF (21.1%), Sortformer+GSS (38.4%), and DSB+Gate (31.5%). On the real-world TEIDAN dataset, PATSE reaches a WER of 20.50% and a DER of 13.83%, beating CSS TIGER (37.43% WER) and Sortformer+GSS (45.03% WER, 36.15% DER). Ablations show that initializing from pretrained TIGER weights and fine-tuning consistently yields lower WERs compared to training from scratch (e.g., 14.0% vs 18.9% overall on LibriReplay-DOA).

| Method | LibriReplay-DOA WER (%) | TEIDAN WER (%) | TEIDAN DER (%) |
|---|---|---|---|
| DSB + Gate | 31.5 | 41.33 | 35.72 |
| FastMNMF | 21.1 | 26.82 | 28.42 |
| Sortformer + GSS | 38.4 | 45.03 | 36.15 |
| CSS (TIGER) | 32.8 | 37.43 | — |
| PATSE (Ours) | 14.0 | 20.50 | 13.83 |

## Limitations

The framework assumes known or estimated target speaker directions of arrival (DOAs), meaning performance is tied to the accuracy of the underlying DOA estimator. It was evaluated primarily on 3-speaker circular array setups (radius 0.032m) and may experience spatial degradation in larger acoustic environments with severe reverberation or moving speakers.

## Why read this

Speech and ML researchers working on multi-speaker meeting transcription will find this valuable for learning how spatial priors can replace complex speaker diarization pipelines and avoid cross-window stitching errors.

## Code

- https://huggingface.co/datasets/real-recordings/LibriReplay-DOA

## Applications

Automated meeting transcription, multi-party conversational speech recognition, smart-speaker voice assistants.

## Institutions / 機構

Kyoto University

**Funding / 經費:** JST BOOST, JST Moonshot R&D

## Related

- (link related pages by id as the wiki grows)
