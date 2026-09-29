---
id: han26d_interspeech
category: tts
labels: [generative-model]
institutions: ["Chinese University of Hong Kong", "Tencent"]
code: https://dongru1.github.io/demo/im-efss/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2107
pdf: https://www.isca-archive.org/interspeech_2026/han26d_interspeech.pdf
---

# Imitation Learning for Elder-Facing Speech Synthesis

*Dongrui Han, Weidong Chen, Jiawen Kang, Mingyu Cui, Helen Meng, Xixin Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/han26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/han26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2107)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — This paper proposes an imitation learning framework with a two-stage on-policy reward learning (OPRL) strategy for Group Relative Policy Optimization (GRPO) to synthesize elder-facing speech from expert demonstrations without reward hacking. The final model achieves a top subjective MOS of 3.78 from older adult listeners, outperforming baseline SFT and vanilla GRPO.

## Key contributions

- A novel imitation learning framework for aligning text-to-speech (TTS) models using expert demonstrations provided by experienced healthcare professionals.
- A two-stage on-policy reward learning (OPRL) strategy to mitigate reward hacking in RL-based TTS training by iteratively updating the reward model with rollouts.
- An elder-facing Cantonese TTS system validated via subjective listening tests with older adults, demonstrating improvements in both intelligibility and prosody.

## Problem

Standard TTS systems are designed for younger, general adults and ignore the specific speech comprehension needs—such as higher hearing thresholds and cognitive decline—of older adults. Human-in-the-loop preference optimization methods are costly and cause rapid fatigue in older adults, preventing scaling. Meanwhile, applying standard reinforcement learning with fixed reward models to TTS often leads to severe reward hacking, where models maximize proxy rewards by inflating pause durations and lowering intelligibility.

## Method

The architecture uses a pretrained Cantonese CosyVoice 2-Yue backbone initialized with supervised fine-tuning (SFT) on 1.5 hours of expert demonstrations. The reward system is multi-faceted, combining an expert reward model (a frozen StyleTTS 2 prosodic style encoder paired with a 6-layer ResNet reward head trained via Bradley–Terry pairwise ranking loss) and a pronunciation reward (based on Jyutping-based syllable error rate (SER) using SenseVoice-small, combined via an F-score-like harmonic mean).

To prevent reward hacking, the method introduces On-Policy Reward Learning (OPRL) across two stages. Stage 1 iteratively feeds selected policy rollouts back into the reward model's training set over 5 loops (filtering by SER < 0.15 and 10th-90th percentile expert rewards). Stage 2 broadens text coverage using 5,000 sentences from the ZoengJyutGaai dataset, binning rollouts by SER and assigning monotonically increasing rewards across percentiles to update the reward model further.

The policy is optimized using Group Relative Policy Optimization (GRPO) with a PPO clip epsilon of 0.2, a KL penalty coefficient beta of 0.1 against a frozen reference model, and generating group size G=4 rollouts per prompt using top-k sampling (k=25, tau=1.2).

## Experimental setup

Evaluated on an internal expert demonstration dataset of 125 utterances (1.5 hours total, split into 89 train, 18 dev, 18 test) recorded by healthcare professionals in two styles (elder-facing vs. neutral news), plus 5,000 sentences from the ZoengJyutGaai dataset for Stage 2. Compared against Ground Truth, CosyVoice 2-Yue (base), SFT, and GRPO w/o OPRL. Evaluated using syllable error rate (SER), character error rate (CER), pitch accuracy (PA), pitch mean absolute error (PE), energy mean absolute error (EE), MCD, F0 correlation, F0 variance ratio (F0 VR), silence duration (Dursil), total duration (Dur), speaker similarity (SIM), and subjective Mean Opinion Score (MOS) rated by 8 older adults (aged 66-83).

## Results

Vanilla GRPO w/o OPRL suffers severe reward hacking, producing a total duration of 27.62s (vs. 19.27s ground truth) and silence duration of 11.51s, alongside degraded SER (11.58%) and lower MOS (2.70). In contrast, GRPO w/ OPRL Stage 2 achieves the best intelligibility and prosodic metrics with an SER of 7.54%, CER of 3.86%, MCD of 4.80, and an F0 VR of 1.06. Subjectively, GRPO w/ OPRL Stage 2 attains a state-of-the-art MOS of 3.78, significantly outperforming the base CosyVoice 2-Yue (2.53) and SFT (3.55) models (p < 0.01).

| Model | SER (%) | CER (%) | MCD | SIM | MOS |
|---|---|---|---|---|---|
| Ground Truth | 13.79 | 9.08 | 0.00 | 1.00 | 3.45 |
| CosyVoice 2-Yue (base) | 14.89 | 7.52 | 7.37 | 0.65 | 2.53 |
| + SFT | 9.93 | 4.91 | 4.87 | 0.77 | 3.55 |
| + GRPO w/o OPRL | 11.58 | 6.99 | 5.10 | 0.76 | 2.70 |
| + GRPO w/ OPRL Stage 1 | 8.27 | 4.38 | 4.77 | 0.77 | 3.54 |
| + GRPO w/ OPRL Stage 2 | 7.54 | 3.86 | 4.80 | 0.77 | 3.78 |

## Limitations

The study relies on a very small, private expert demonstration dataset of only 1.5 hours, restricting the diversity of the initial expert style. The evaluation is limited to the Cantonese language and a small cohort of 8 older adult evaluators. Furthermore, Stage 2 assumes text-only datasets can be effectively scored via automated metric binning and ranking without direct human-in-the-loop verification.

## Why read this

Speech and ML researchers tackling RL alignment in low-resource speech generation or working on accessible, age-friendly speech technology should read this paper to see how an iterative on-policy reward learning strategy successfully resolves reward hacking.

## Code

- https://dongru1.github.io/demo/im-efss/

## Applications

Elder-facing voice assistants, healthcare communication systems, automated announcement systems for senior care facilities, and inclusive speech synthesis interfaces.

## Institutions / 機構

Chinese University of Hong Kong, Tencent

**Funding / 經費:** National Natural Science Foundation of China, Centre for Perceptual and Interactive Intelligence, Innovation and Technology Commission of the Hong Kong Special Administrative Region Government

## Related

- (link related pages by id as the wiki grows)
