---
id: cai26d_interspeech
category: audio-understanding
labels: [dataset-or-benchmark-release, robustness-noise]
institutions: ["Xi'an Jiaotong-Liverpool University", "Zhongdian Zhiheng Information Technology Service Co., Ltd", "China Telecom Jiangsu Branch", "Nanjing University of Posts and Telecommunications"]
code: https://github.com/bohanhu118/Interspeech2026_ESAS
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2350
pdf: https://www.isca-archive.org/interspeech_2026/cai26d_interspeech.pdf
---

# Towards Event-Robust Acoustic Scene Classification

*Yiqiang Cai, Bohan Hu, Yu Yang, Pengwei Lu, Shengchen Li, Xi Shao*

[PDF](https://www.isca-archive.org/interspeech_2026/cai26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cai26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2350)

**Category:** `audio-understanding` · **Labels:** `dataset-or-benchmark-release`, `robustness-noise`

**TL;DR** — The paper introduces the Event-Shifted Acoustic Scene (ESAS) dataset to evaluate Acoustic Scene Classification (ASC) robustness against unknown foreground sounds, revealing a severe classification accuracy drop (up to 22%) when models face out-of-distribution event shifts.

## Key contributions

- Proposed the ESAS dataset (211 hours, 13 scene classes, 96 event classes) using LLM-guided semantic grouping to simulate real-world event shifts.
- Established a three-tier evaluation protocol decoupling background purity, known-event acoustic mixing, and unknown-event distribution shifts.
- Conducted a comprehensive benchmark of six SOTA ASC systems, demonstrating a systematic accuracy collapse under heavy polyphony and unknown events.
- Identified that large-scale pre-trained Transformers (BEATs, PaSST) exhibit significantly better resilience to adverse SNR and high event density than lightweight CNNs.

## Problem

Standard Acoustic Scene Classification datasets rely on clean, consistent audio recordings that fail to capture real-world acoustic variability, where foreground sound events constantly shift due to time, season, and geography while the underlying scene remains identical. This phenomenon, termed event shift, exposes a critical flaw in existing models that over-rely on specific event signatures rather than background ambience. Prior work has targeted channel, city, or temporal shifts, but no dedicated benchmark existed to quantify vulnerability to unexpected or unknown foreground sound events. Addressing this gap is vital to building practical, robust acoustic environment recognition systems.

## Method

The ESAS dataset is constructed by mixing background scene recordings from CochlScene (13 classes, 44.1 kHz, 10-second clips) with foreground sound events from FSD50K (200 event categories). The pipeline first applies the pre-trained BEATs model to scrub source background clips of pre-existing foreground events. Simultaneously, FSD50K clips undergo filtering to discard low-SNR samples, ambiguous labels, and continuous ambient noise, splitting candidate events into known (train/val) and unknown (test-only) pools. GPT-4 is used as a constrained semantic filter to guide reasonable scene-event groupings, generating structured metadata. Final 10-second mono clips are synthesized by randomly sampling 1 to 10 event classes, applying time-stretching ([0.8, 1.15]) and pitch-shifting ([-3, 3]), and blending them onto backgrounds at an SNR ranging from -15dB to +15dB.

For evaluation, six SOTA baseline architectures are benchmarked: lightweight CNNs (TF-SepNet, BC-ResNet, GRU-CNN, CP-Mobile) and large-scale pre-trained Transformers (BEATs, PaSST). These systems map spectrogram or audio representations to scene categories using standard classification cross-entropy objectives. The design choices isolate acoustic complexity from semantic novelty, allowing researchers to measure precisely how feature extractors handle dense polyphony versus completely out-of-distribution soundscapes.

## Experimental setup

Evaluated on the ESAS benchmark comprising 76,081 total audio clips (211 hours across 60,855 train, 7,572 validation, and 7,654 test samples). Evaluated systems include four lightweight CNNs (TF-SepNet, BC-ResNet, GRU-CNN, CP-Mobile) and two pre-trained Transformers (BEATs, PaSST). The primary metric is overall classification accuracy across background-only, known-event, and unknown-event test conditions, alongside stress-tests varying event density (0-10 events) and scene-to-event SNR (-15dB to +15dB).

## Results

On clean background-only scenes, all baselines achieve solid accuracies between 78.28% (BC-ResNet) and 84.27% (PaSST). However, introducing known foreground events drops performance significantly (e.g., TF-SepNet falls by 14.7%), while unknown events trigger a severe accuracy collapse—dropping up to 22 percentage points for lightweight CNNs compared to their clean baselines. Pre-trained Transformers (BEATs and PaSST) exhibit stronger resilience, holding upper-bound overall accuracies around 79.8% and maintaining ~67% accuracy even under extreme negative SNR or maximum clutter of 10 mixed events, whereas lightweight CNNs plummet below 50% under heavy clutter.

| System | Background | Known | Unknown | Overall |
|---|---|---|---|---|
| TF-SepNet | 79.73% | 65.03% | 57.67% | 67.64% |
| BC-ResNet | 78.28% | 66.35% | 59.18% | 68.06% |
| GRU-CNN | 79.75% | 71.85% | 65.54% | 72.47% |
| CP-Mobile | 79.53% | 73.38% | 68.10% | 73.74% |
| BEATs* | 82.84% | 80.11% | 75.39% | 79.48% |
| PaSST* | 84.27% | 79.93% | 75.19% | 79.85% |

## Limitations

The dataset synthesis relies heavily on audio mixing assumptions, where foreground events are artificially superimposed on backgrounds using automated SNR ranges and time-stretching, which may not capture complex real-world acoustic interactions like reverberation or spatial occlusion. Furthermore, the evaluation is limited to the 13 scene categories inherited from CochlScene and English-centric or general Freesound event pools, leaving open how models perform on specialized regional soundscapes or rare non-stationary acoustic environments.

## Why read this

Speech and ML researchers focusing on acoustic scene classification or environmental audio will find this paper essential for understanding how state-of-the-art models fail when confronted with out-of-distribution foreground events. It provides a rigorous benchmark and diagnostic protocol to test whether your audio representations truly model background scenes or simply memorize co-occurring sound events.

## Code

- https://github.com/bohanhu118/Interspeech2026_ESAS

## Applications

Robust environmental monitoring, smart-city surveillance systems, context-aware mobile hearing aids, and autonomous vehicle acoustic scene perception.

## Institutions / 機構

Xi'an Jiaotong-Liverpool University, Zhongdian Zhiheng Information Technology Service Co., Ltd, China Telecom Jiangsu Branch, Nanjing University of Posts and Telecommunications

**Funding / 經費:** Jiangsu Provincial Major Science and Technology Project

## Related

- (link related pages by id as the wiki grows)
