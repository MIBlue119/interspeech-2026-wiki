---
id: li26s_interspeech
category: asr
labels: [robustness-noise]
institutions: ["Nanyang Technological University", "Nara Institute of Science and Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1096
pdf: https://www.isca-archive.org/interspeech_2026/li26s_interspeech.pdf
---

# Training-Free Intelligibility-Guided Observation Addition for Noisy ASR

*Haoyang Li, Changsong Liu, Wei Rao, Hao Shi, Sakriani Sakti, Eng Siong Chng*

[PDF](https://www.isca-archive.org/interspeech_2026/li26s_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26s_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1096)

**Category:** `asr` · **Labels:** `robustness-noise`

**TL;DR** — This paper proposes a training-free observation addition (OA) framework that blends noisy speech and speech enhancement (SE) outputs using fusion weights derived directly from backend ASR confidence scores, consistently outperforming existing quality- or classifier-based OA baselines across diverse test conditions.

## Key contributions

- Formulates an intelligibility-guided observation addition (OA) method using backend ASR confidence scores as a proxy for WER, eliminating the need to train external neural classifiers.
- Derives utterance-level confidence scores using geometric means of exponential log-probabilities (for Whisper) and Tsallis entropy of posterior distributions (for Parakeet and Wav2Vec2-CTC).
- Compares utterance-level blending against a hard switching alternative and a fine-grained frame-level OA strategy, demonstrating that utterance-level continuous interpolation is superior.
- Extensively evaluates across two SE architectures (Demucs and MP-SENet), three ASR models (Whisper-large, Parakeet-TDT, Wav2Vec2), and datasets including VoiceBank-DEMAND and CHiME-4.

## Problem

Automatic speech recognition (ASR) degrades in noisy environments, and while speech enhancement (SE) front-ends suppress noise, they frequently introduce acoustic artifacts that harm downstream ASR accuracy. Joint SE-ASR training is computationally expensive, impractical when models are black-box or unintegrated, and risks degrading human perceptual quality. Prior observation addition (OA) methods rely on signal-level quality predictors like DNSMOS (which ignore SE artifacts) or require training separate neural classifiers on ground-truth transcriptions, leading to generalization failure and high system complexity.

## Method

The proposed method interpolates noisy speech $y$ and enhanced speech $\hat{x}$ along the time dimension using an utterance-level weighting coefficient $S'$ derived from ASR confidence scores. In an ideal setup, $S'$ is computed from normalized inverse word error rates (WERs) of $y$ and $\hat{x}$. In practice, ground-truth transcriptions are unavailable, so the framework computes $S'$ using ASR confidence scores: $S' = \text{conf}(\hat{x}) / (\text{conf}(y) + \text{conf}(\hat{x}) + \epsilon)$, where $\epsilon = 1 \times 10^{-8}$ ensures numerical stability.

For Whisper, utterance confidence is calculated via the token-weighted average of exponentiated average log-probabilities across segments. For Parakeet and Wav2Vec2-CTC, token confidences are extracted using Tsallis entropy ($q=0.33$) followed by exponential normalization, and aggregated geometrically over all tokens. A small numerical constant prevents division by zero. The resulting fused speech $\bar{x} = S' \odot \hat{x} + (1 - S') \odot y$ is then passed to the ASR backend for final decoding.

Alternative strategies explored include a hard switching method (Conf-Switch) that selects only the signal with higher confidence, and a frame-level OA approach using frame-wise confidence vectors derived from Wav2Vec2-CTC posterior entropy. Frame-level OA is ultimately outperformed by utterance-level fusion because fine-grained frame interpolation disrupts temporal continuity.

## Experimental setup

Evaluated on VoiceBank-DEMAND (in-domain test set) and CHiME-4 (out-of-domain evaluation using 1,320 simulated and 1,320 real noisy utterances sampled at 16 kHz). SE front-ends include causal Demucs (1D CNN/LSTM, trained for 500 epochs with batch size 16, LR $3\times 10^{-4}$) and GR-KAN MP-SENet (TF-domain, trained for 200 epochs with batch size 4, AdamW optimizer, LR $5\times 10^{-4}$). ASR models are Whisper-large, Parakeet-TDT (0.6B), and Wav2Vec2-large (fine-tuned on LibriSpeech 960h). Performance is measured via Word Error Rate (WER) and compared against Noisy, Enhanced, SNR-OA, DNSMOS-OA, and Classifier-OA baselines.

## Results

On VoiceBank-DEMAND with MP-SENet enhanced speech, Conf-OA achieves a WER of 2.24, 1.35, and 7.61 for Whisper, Parakeet, and Wav2Vec2 respectively, outperforming DNSMOS-OA (2.36, 1.60, 7.88) and Classifier-3class (2.37, 1.57, 8.28). On CHiME-4 Real data using Demucs, Conf-OA scores 6.60 (Whisper), 6.10 (Parakeet), and 35.84 (Wav2Vec2), improving significantly over the enhanced-only baseline (29.65, 27.58, 58.99). Ablations show that utterance-level Conf-OA outperforms frame-level OA (e.g., 16.73 vs 16.87 simulated, 24.03 vs 25.30 real on CHiME-4 with MP-SENet and Wav2Vec2) because frame-wise interpolation disrupts temporal continuity. It does not win when the relative performance gap between noisy and enhanced speech is extremely wide, occasionally causing the weaker signal to slightly drag down the stronger one.

| Method | Voicebank+Demand (Parakeet) | CHiME-4 Simu (Parakeet) | CHiME-4 Real (Parakeet) |
|---|---|---|---|
| Noisy ($y$) | 2.18 | 5.24 | 6.22 |
| Enhanced ($\hat{x}$, MP-SENet) | 1.52 | 7.91 | 14.72 |
| DNSMOS-OA [21] | 1.60 | 5.00 | 9.75 |
| Classifier-OA 3-class [23] | 1.57 | 4.88 | 5.37 |
| Conf-Switch (Eq. 6) | 1.26 | 5.32 | 6.07 |
| Conf-OA (Eq. 3) | 1.35 | 4.78 | 5.55 |

## Limitations

The method relies entirely on the backend ASR's capability to generate reliable confidence metrics; if an ASR model is severely miscalibrated, confidence-guided weighting degrades. It requires access to ASR confidence scores, limiting its application to black-box APIs that do not output log-probabilities or posterior distributions. Additionally, utterance-level blending cannot correct localized intra-utterance distortion mismatches where enhancement quality varies wildly across frames.

## Why read this

Speech and ML engineers dealing with production ASR pipelines facing unpredictable background noise should read this paper to learn how to fix speech enhancement artifact degradation without retraining or modifying front-end/back-end models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust automatic speech recognition systems deployed in noisy environments (e.g., in-car voice assistants, distant-microphone smart home devices, and meeting transcription tools) utilizing off-the-shelf speech enhancement front-ends.

## Institutions / 機構

Nanyang Technological University, Nara Institute of Science and Technology

## Related

- (link related pages by id as the wiki grows)
