---
id: han26d_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2107
pdf: https://www.isca-archive.org/interspeech_2026/han26d_interspeech.pdf
---

# Imitation Learning for Elder-Facing Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/han26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/han26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2107)

**TL;DR** — An imitation learning framework with a two-stage on-policy reward learning (OPRL) strategy aligns text-to-speech models to generate elder-preferred speech from expert healthcare professional demonstrations, significantly improving subjective mean opinion scores (MOS) over baselines while mitigating reward hacking.

## Problem

Standard text-to-speech systems are designed for general adults and neglect the sensory and cognitive declines of older adults that impact speech comprehension. Directly collecting preference feedback from older adults is costly and causes user fatigue, while standard reinforcement learning methods for TTS suffer severely from reward hacking—such as over-inserting silences and generating unnaturally slow speech—when optimizing for limited expert demonstrations.

## Method

The framework uses an internal Cantonese dataset of 125 pairs (1.5 hours) of expert healthcare professional recordings (elder-facing vs. neutral styles) and CosyVoice 2-Yue as the backbone policy model. It combines an expert reward model (using a frozen StyleTTS 2 prosodic style encoder and a trainable 6-block ResNet reward head trained with Bradley-Terry loss) with a pronunciation reward (based on Jyutping syllable error rate via a SenseVoice-small ASR model) into a composite weighted harmonic mean reward. The policy is optimized using Group Relative Policy Optimization (GRPO). To prevent reward hacking, a two-stage on-policy reward learning (OPRL) procedure iteratively retrains the expert reward model by incorporating filtered rollouts from the fine-tuned policy alongside broader external text data (ZoengJyutGaai dataset).

## Results

Evaluated on an 18-utterance test split using objective metrics (CER, SER, Pitch Accuracy, F0 Variance Ratio, silence duration Dursil, total duration Dur, CAM++ speaker similarity SIM) and subjective listening tests (MOS) with older adults. Unconstrained GRPO w/o OPRL suffered from severe reward hacking, doubling silence duration (11.51 vs ground truth 5.43) and dropping MOS. In contrast, GRPO w/ OPRL Stage 1 and Stage 2 progressively eliminated reward hacking, yielding superior pronunciation (lower CER/SER) and prosody. GRPO w/ OPRL Stage 2 achieved a statistically significant higher MOS than CosyVoice2-Yue and GRPO w/o OPRL (p < 0.01) as well as all other baselines (p < 0.05), alongside an F0 Variance Ratio of 1.06.

## Code

- https://dongru1.github.io/demo/im-efss/

## Applications

Engineers developing accessible voice assistants, healthcare communication tools, and public announcement systems tailored for older adults or populations with hearing/cognitive decline.

## Limitations

Evaluated exclusively on Cantonese speech data with a relatively small expert demonstration set (1.5 hours across 125 sentence pairs), and future work is needed to explore textual structure adaptations.

## Related

- (link related pages by id as the wiki grows)
