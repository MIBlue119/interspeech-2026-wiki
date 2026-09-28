---
id: garnaik26_interspeech
category: accent-adaptive-tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2197
pdf: https://www.isca-archive.org/interspeech_2026/garnaik26_interspeech.pdf
---

# When Machines Speak Like Local Peers: Improving Conversational Experiences with Accent-Adaptive Voice Agents

*Shubhangi S. R. Garnaik, JiHyun Jeong, Jihoon Ryoo*

[PDF](https://www.isca-archive.org/interspeech_2026/garnaik26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/garnaik26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2197)

**TL;DR** — LocalMATE is an end-to-end accent-adaptive airport conversational agent that matches user accents via confidence-gated speech synthesis and talking-face video. Correct accent adaptation significantly improves user trust and confidence (p < 0.05) while reducing repair attempts.

## Key contributions

- LocalMATE, an end-to-end accent-adaptive conversational agent featuring confidence-gated fallback and multimodal talking-face output.
- A robust three-class accent classifier (Indian, Spanish, Korean-accented English) using fine-tuned WavLM-Base-Plus with statistics pooling, evaluated with speaker-disjoint splits and out-of-domain transfer.
- Pilot and main user studies quantifying perceptual preferences and downstream social outcomes (trust, confidence, and interaction friction) for accent-adaptive audiovisual responses.

## Problem

Public voice agents often underperform for accented English, causing usability issues and reducing user trust and self-perception. Prior work demonstrates that automatic speech recognition (ASR) and synthetic voice errors disproportionately affect demographic speech varieties, with system failures sometimes perceived as microaggressive. Although accent-aligned synthetic speech can foster inclusion, it remains unclear how incorrect accent adaptation impacts trust, and how end-to-end conversational systems should handle low-confidence accent estimates.

## Method

LocalMATE's architecture consists of six sequential stages: microphone audio capture, ASR transcription via Whisper (small), accent estimation and caching, GPT-based embedding retrieval over a curated FAQ set, VEVO reference-conditioned accent-adaptive TTS, and SadTalker photorealistic talking-face rendering.

The accent estimator fine-tunes a WavLM-Base-Plus encoder (freezing the convolutional extractor) using a softmax-normalized weighted sum over 13 hidden states. Frame-level outputs are aggregated via statistics pooling (mean and standard deviation) into a 1536-d representation, passed through a 2-layer MLP (1536 -> 256 -> 3) with ReLU and dropout (p=0.5). Training uses AdamW (learning rates 3e-5 for the head/weights, 5e-6 for unfrozen encoder layers; weight decay 0.02) with gradual unfreezing and on-the-fly augmentations (gain perturbation, time shifting, Gaussian noise, bandpass equalization).

A session-level cache stores the estimated accent label for 10 minutes to stabilize multi-turn dialogue. A confidence-gated fallback mechanism checks the accent estimator's confidence against a threshold (tau = 0.34); if confidence falls below this value, the system defaults to a neutral US-accented voice while preserving the retrieved FAQ answer text.

## Experimental setup

The accent classifier is trained on L2-ARCTIC restricted to Indian, Korean, and Spanish accents, utilizing a speaker-disjoint split of 6 speakers for training (6,786 utterances), 3 for dev (3,270 utterances), and 3 for test (3,394 utterances), with zero speaker overlap. Out-of-domain evaluation uses 52 Korean-accented utterances from the Speech Accent Archive. The pilot user study evaluated 111 valid online participants across 3 accent blocks. The main user study involved 25 participants (20 eligible after accent calibration, age 18-54) interacting across four conditions (Baseline, Correct Adaptation, Incorrect Adaptation, Uncertain+Fallback) over 8 queries. Metrics include macro-F1, accuracy, and 7-point Likert scales measuring confidence, trust, and interaction friction (repair attempts). Hardware: single NVIDIA TITAN RTX GPU (16 GB VRAM).

## Results

On the held-out L2-ARCTIC test split, WavLM-Base-Plus with statistics pooling achieved a macro-F1 of 0.835 and 83.0% accuracy, outperforming standard XLSR fine-tuning (Test F1: 0.271). On out-of-domain evaluation (Speech Accent Archive), the statistics pooling model reached 92.3% accuracy, substantially outperforming attentive statistics pooling (63.5%). In the main user study, correct accent adaptation (B) significantly increased user confidence (ph = 0.026, r = 0.703) and trust (ph = 0.032, r = 0.677) while reducing interaction friction (ph = 0.031, r = 0.650) compared to the US default baseline (A). Conversely, incorrect adaptation (C) degraded confidence (ph = 0.002, r = 0.841) and trust (ph = 0.001, r = 0.828) relative to correct adaptation. The confidence-gated fallback (D) successfully mitigated these harms, restoring confidence (ph < 0.001, r = 0.886) and trust (ph = 0.001, r = 0.820) compared to the mismatched condition.

| System Condition | Confidence (med) | Trust (med) | Friction / Repeat (med) |
|---|---|---|---|
| A: Baseline (US Default) | 5.5 | 6.0 | 3.5 |
| B: Correct Adaptation | 6.0 | 6.5 | 2.0 |
| C: Incorrect Adaptation | 4.0 | 4.0 | 4.0 |
| D: Uncertain + Fallback | 7.0 | 7.0 | 3.0 |

## Limitations

The main user study is restricted to Korean-accented English speakers interacting for a brief session (two queries per condition), limiting generalizability to other accents, multi-turn contexts, and longitudinal use. The fixed condition order may introduce order effects, and external accent strength was not quantified. Furthermore, evaluations were conducted in a controlled environment that does not capture real-world acoustic noise or device variability.

## Why read this

Researchers and engineers building conversational agents or voice assistants will learn how to implement confidence-gated accent adaptation to safely personalize synthetic voices without risking user alienation from misclassifications.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Public-facing conversational kiosks, airport information desks, and multilingual customer service touchpoints.

## Related

- (link related pages by id as the wiki grows)
