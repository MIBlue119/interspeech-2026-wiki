---
id: li26s_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1096
pdf: https://www.isca-archive.org/interspeech_2026/li26s_interspeech.pdf
---

# Training-Free Intelligibility-Guided Observation Addition for Noisy ASR

[PDF](https://www.isca-archive.org/interspeech_2026/li26s_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26s_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1096)

**TL;DR** — This paper proposes a training-free observation addition method that fuses noisy and speech-enhanced audio using ASR confidence scores as intelligibility proxies, improving word error rate across diverse datasets.

## Problem

Automatic speech recognition (ASR) degrades in noisy environments, and while speech enhancement (SE) helps, it introduces artifacts that can harm downstream recognition. Existing observation addition methods rely on trained neural predictors or signal-level metrics that require ground-truth transcriptions and increase system complexity. This work provides a training-free, inference-only fusion strategy that bridges the gap between signal enhancement and recognition performance without modifying underlying SE or ASR models.

## Method

The method introduces confidence-guided observation addition (Conf-OA), which interpolates noisy speech and SE-enhanced speech along the time dimension using a weighting coefficient derived from ASR confidence scores. Instead of training separate neural predictors or using signal quality metrics like DNSMOS, utterance-level confidence is computed via exponential normalization of decoding statistics (such as average log-probabilities for Whisper, Tsallis entropy of posterior distributions for Parakeet, and token-aggregated frame confidences for Wav2Vec2-CTC). The framework is evaluated at both utterance and frame levels, alongside a hard-switching alternative (Conf-Switch). Three ASR models (Whisper-large, Parakeet-tdt-0.6b-v2, and Wav2Vec2-large) and two SE models (causal Demucs and GR-KAN MP-SENet) are tested.

## Results

Evaluated on VoiceBank-DEMAND and CHiME-4 (both simulated and real partitions, 16 kHz audio), the proposed Conf-OA consistently outperforms baseline strategies like SNR-OA and DNSMOS-OA, approaching the oracle WER-OA upper bound. For example, using GR-KAN MP-SENet and Parakeet on CHiME-4 Real, Conf-OA achieves a WER of 6.07% compared to 6.22% for noisy speech and 42.24% for enhanced speech alone. Ablations show that utterance-level OA outperforms frame-level OA due to temporal continuity, and Conf-OA excels particularly in miscalibrated cases where hard switching fails.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers deploying robust automatic speech recognition systems in noisy real-world acoustic environments as a post-processing enhancement layer.

## Limitations

Conf-OA can slightly underperform when the relative performance gap between noisy and enhanced speech is extremely wide, making the weaker signal insufficient to help the stronger one.

## Related

- (link related pages by id as the wiki grows)
