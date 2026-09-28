---
id: sharma26b_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2712
pdf: https://www.isca-archive.org/interspeech_2026/sharma26b_interspeech.pdf
---

# VoxENES 2026: Benchmarking Generalization of Speech Spoofing Detectors Against LLM-Era TTS and Voice Conversion

*Aastha Sharma, Guangjing Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/sharma26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sharma26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2712)

**TL;DR** — VoxENES 2026 is a new bilingual benchmark evaluating speech spoofing detectors against LLM-era TTS, voice conversion, and realistic post-processing, revealing that eight popular pretrained detectors suffer massive performance degradation with the best model achieving only 28.98% EER.

## Key contributions

- Introduces VoxENES 2026, a bilingual (English and Spanish) dataset containing 53,628 audio samples spanning 10 modern speech synthesis methods and 10 post-processing conditions.
- Benchmarks eight pretrained off-the-shelf deepfake detectors without fine-tuning, quantifying a severe temporal generalization gap under real-world distribution shifts.
- Provides granular cross-detector analysis showing that zero-shot diffusion-based voice conversion (Seed-VC) poses the most formidable challenge with no detector achieving below 41% EER.
- Demonstrates that standard audio augmentations (like additive noise or codec compression) non-uniformly and unpredictably impact detector performance, causing inverted predictions or severe drops in accuracy.

## Problem

Legacy speech spoofing benchmarks like ASVspoof 2019/2021 or WaveFake rely predominantly on pre-2024 speech generation architectures and fail to capture the subtle artifact patterns of modern large language model (LLM)-driven TTS and voice conversion pipelines. Consequently, deepfake detectors trained on these stale datasets experience a severe data drifting issue when deployed in the wild. This temporal mismatch leads to overestimating detector robustness, with models frequently depending on brittle, dataset-specific artifacts that vanish or change under realistic post-processing operations like compression and noise.

## Method

The VoxENES 2026 benchmark comprises 3,028 real speech samples sourced from LibriSpeech (1,500 English samples, 40 speakers) and VoxPopuli (1,528 Spanish samples, 96 speakers), alongside 50,600 synthetic samples (4,600 originals and 46,000 post-processed variants). All audio files are standardized to 16 kHz mono WAV format and uniformly truncated or zero-padded to a fixed 4-second length to eliminate padding-induced discriminative shortcuts. Synthetic data covers 7 modern TTS models (VoxCPM 1.5, Qwen3-TTS, GLM-TTS, FlashLabs Chroma, VibeVoice, CosyVoice 3, Chatterbox ML) and 3 VC models (Seed-VC, OpenVoice v2, RVC v2), representing autoregressive language models, diffusion models, flow-matching, and DiT architectures.

To emulate deployment-time distribution shifts, each original synthetic sample undergoes one of 10 standardized post-processing operations: lossy codecs (MP3 at 64 kbps, AAC at 128 kbps), white Gaussian noise (10 dB and 20 dB SNR), multi-speaker babble noise (15 dB SNR), bandwidth adjustments (downsampled to 8 kHz and restored to 16 kHz, plus a 16 kHz control), playback speed scaling (0.9x and 1.1x), and peak volume normalization to -3 dBFS. Eight pretrained deepfake detection baselines—spanning graph neural networks, raw-waveform CNNs, self-supervised representation models, spectrogram transformers, and speaker-embedding anomaly detection (ECAPA-TDNN using cosine distance from a real-speech centroid)—are evaluated in an inference-only zero-shot setting.

## Experimental setup

Evaluated on the VoxENES 2026 dataset containing 53,628 samples across English and Spanish. Compares eight baseline models: AASIST2, RawNet2, Wav2Vec2-AASIST, Wav2Vec2-DF, Wav2Vec2-Large, AST-ASVspoof5, Wav2Vec2-ASVspoof5, and ECAPA-TDNN. Primary metrics are Equal Error Rate (EER %) and accuracy. All models are evaluated using published pretrained weights without fine-tuning.

## Results

The best-performing model, AST-ASVspoof5, achieves an overall EER of 28.98% (75.94% accuracy), which remains inadequate for reliable deployment. Five of the eight evaluated detectors perform at or below random chance (EER >= 47%), with AASIST2 reaching 57.86% EER due to inverted prediction behavior caused by domain mismatch. Seed-VC is identified as the most difficult generation method, where no detector achieves an EER below 41% due to its naturalness and preservation of bonafide spectral properties.

Post-processing induces counterintuitive shifts: adding white noise lowers AST-ASVspoof5's EER from 26.7% down to 17.4% by altering artifact cues, whereas MP3 compression severely degrades it from 26.7% to 48.4% EER by suppressing fine-grained high-frequency spectral structures.

| System / Detector | Overall EER (%) | Overall Acc (%) | TTS EER (%) | VC EER (%) |
|---|---|---|---|---|
| AASIST2 | 57.86 | 42.13 | 61.2 | 49.9 |
| RawNet2 | 47.03 | 52.97 | 53.6 | 49.8 |
| Wav2Vec2-AASIST | 39.16 | 60.85 | 43.7 | 38.4 |
| Wav2Vec2-DF | 55.51 | 44.49 | 59.3 | 49.2 |
| AST-ASVspoof5 | 28.98 | 75.94 | 40.0 | 20.9 |
| ECAPA-TDNN | 43.22 | 56.78 | 28.5 | 52.5 |

## Limitations

The benchmark is currently restricted to English and Spanish languages and a fixed set of 10 modern speech generation systems and 10 post-processing transformations. The evaluation is strictly zero-shot, meaning performance could change if detectors were fine-tuned on subsets of VoxENES 2026. Furthermore, audio samples are truncated or padded to 4 seconds, which leaves longer-form conversational dynamics or temporal artifact consistency unexamined.

## Why read this

Researchers and engineers building production speech authentication or deepfake detection systems should read this paper to understand why legacy ASVspoof models fail completely against modern LLM-era generative speech and how realistic post-processing distorts detection boundaries.

## Code

- https://www.kaggle.com/datasets/interspeech2712/voxenes-2026

## Applications

Audio deepfake detection, voice biometric security, and robust speech countermeasure deployment against LLM-driven audio spoofing.

## Related

- (link related pages by id as the wiki grows)
