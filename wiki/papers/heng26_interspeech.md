---
id: heng26_interspeech
category: asr
labels: [low-resource, multilingual, generative-model]
institutions: ["Nanyang Technological University", "Agency for Science, Technology and Research", "Johns Hopkins University", "Google"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-642
pdf: https://www.isca-archive.org/interspeech_2026/heng26_interspeech.pdf
---

# Improving Code-Switching ASR with Code-Mixing Guided Synthetic Speech

*Yeo Yue Heng, Haoyang Li, Yizhou Peng, Shreyas Gopal, Hexin Liu, Leibny Paola Garcia-Perera, Sailor Hardik, Jeremy H. M. Wong, Eng Siong Chng*

[PDF](https://www.isca-archive.org/interspeech_2026/heng26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/heng26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-642)

**Category:** `asr` · **Labels:** `low-resource`, `multilingual`, `generative-model`

**TL;DR** — This paper introduces a code-mixing guided preference-learning framework (CMIspeech and multi-critic DPO) for text-to-speech synthesis to improve data augmentation for code-switching ASR, reducing the Mixed Error Rate (MER) on Whisper Large from 12.1%/17.8% to 8.9%/14.2% on SEAME DevMAN and DevSGE.

## Key contributions

- Extends the text-based Code-Mixing Index (CMI) to the speech domain (CMIspeech) using frame-level pseudo language labels derived from decoder cross-attention of a Whisper model trained with Language Alignment Loss (LAL).
- Proposes a multi-critic Direct Preference Optimization (DPO) framework for TTS that jointly optimizes for downstream ASR intelligibility (MER), perceptual naturalness (UTMOS), and code-switching fidelity (ΔCMI).
- Establishes a threshold-based filtering strategy in DPO preference pairing to discard unstable candidates (MER > 20%, UTMOS < 2.5, or ΔCMI diff > 20%).
- Demonstrates consistent ASR performance improvements when augmenting with optimized synthetic data across both large pretrained models (Whisper Large v3) and traditional architectures (CTC-based Conformer).

## Problem

Recognizing conversational code-switching (CS) speech remains difficult due to frequent language alterations, cross-lingual phonetic interference, and informal speaking styles, which are exacerbated by a scarcity of large-scale transcribed CS corpora like SEAME. While standard TTS data augmentation helps, existing systems treat all synthetic outputs as equally informative and optimize solely for acoustic reconstruction or perceptual quality, ignoring whether the generated language-mixing patterns match natural conversational code-switching structure. As a result, standard synthetic data fails to properly capture cross-lingual boundaries, leading to high cross-language confusion in downstream ASR.

## Method

The framework utilizes CosyVoice2, a multilingual LLM-based autoregressive TTS model, trained in three stages: basic task fine-tuning on SEAME, multi-critic DPO alignment, and ASR training. In stage two, for each transcript, the TTS model generates N candidates via stochastic sampling. Each candidate is evaluated using three automated critics: an ASR-based Mixed Error Rate (MER) for intelligibility, a pretrained UTMOS predictor for perceptual quality, and a novel acoustic-level CMI discrepancy score (ΔCMI) measuring code-switching preservation.

To compute ΔCMI, frame-level pseudo language labels are extracted from the average cross-attention of the last decoder layer of a fine-tuned Whisper model trained with Language Alignment Loss (LAL). These labels define CMIspeech as the proportion of frames belonging to non-dominant languages. The individual critic scores are normalized to [0, 1], combined via weighted summation with hyperparameters λ, γ, and ν, and used to form maximally contrasted preference pairs (pairing the highest and lowest overall ranking scores) for DPO optimization. The DPO formulation optimizes policy πθ against a frozen reference model πref using a sigmoid preference margin controlled by temperature β.

The optimized TTS model generates 100 hours of synthetic CS speech, which is combined with 100 hours of real SEAME training data to fine-tune downstream ASR models (Whisper-large v3 and ESPNet's CTC-based Conformer) using the Adam optimizer with a 1e-5 learning rate on A40 GPUs.

## Experimental setup

Evaluated on the SEAME Mandarin-English conversational code-switching corpus (approx. 192 hours from over 150 speakers). Baselines include real-data only (100h) and standard CosyVoice2 data augmentation without DPO or with partial DPO critics (MER and UTMOS). Metrics include Mixed Error Rate (MER, %) on DevMAN and DevSGE test sets, UTMOS, and ΔCMI. CosyVoice2 fine-tuned with AdamW (lr 2e-4, linear warmup, batch size 4, ~50k steps). Whisper-large v3 fine-tuned using Adam (lr 1e-5, batch size 1 per A40 GPU until convergence).

## Results

Incorporating the acoustic-level ΔCMI critic into DPO yields the largest reduction in code-switch difference (reducing ΔCMI from 28.1 to 16.1) while achieving the lowest MER of 10.3% without degrading perceptual quality (UTMOS 3.8). When used for ASR data augmentation (100h real + 100h synthetic), the full DPO (UTMOS, MER, ΔCMI) configuration drops the Mixed Error Rate on Whisper ASR from the 100h real baseline of 12.1% (DevMAN) and 17.8% (DevSGE) down to 8.9% and 14.2%, respectively. On the CTC-based Conformer baseline, MER drops from 16.8%/23.6% to 15.4%/21.9%. Ablations show that using DPO with only MER and UTMOS leaves cross-language phonetic substitutions and unstable boundaries, whereas adding ΔCMI correctly restores language boundaries and pronunciation of mixed segments.

| Train Configuration | DevMAN (MER %) | DevSGE (MER %) |
|---|---|---|
| Whisper ASR - Real (100h) | 12.1 | 17.8 |
| Whisper ASR + CosyVoice | 10.1 | 16.0 |
| Whisper ASR + DPO (UTMOS, MER) | 9.6 | 15.1 |
| Whisper ASR + DPO (UTMOS, MER, ΔCMI) | 8.9 | 14.2 |
| Conformer - Real (100h) | 16.8 | 23.6 |
| Conformer + DPO (UTMOS, MER, ΔCMI) | 15.4 | 21.9 |

## Limitations

Evaluated exclusively on a single Mandarin-English bilingual corpus (SEAME), leaving multilingual generalizability to other language pairs unproven. The reliance on an external ASR model (Whisper) to derive frame-level pseudo labels via cross-attention means the quality of CMIspeech depends directly on the alignment accuracy of the auxiliary model. Compute requirements involve multi-stage fine-tuning and candidate sampling, which introduces non-trivial generation overhead compared to standard supervised TTS training.

## Why read this

Speech and ML researchers working on data scarcity, code-switching speech generation, or reinforcement learning alignment (DPO) for audio will find a concrete recipe for steering generative models using linguistic domain metrics rather than generic perceptual scores.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving code-switching automatic speech recognition systems, bilingual conversational voice assistants, and low-resource multilingual speech data augmentation pipelines.

## Institutions / 機構

Nanyang Technological University, Agency for Science, Technology and Research, Johns Hopkins University, Google

## Related

- [Adding Robust Code-Switching Capabilities to High Performance Multilingual ASR](ugan26_interspeech.md) — same problem · relatedness 2.5/3
- [Direct Preference Optimization for English-Mandarin Code-Switching Speech Recognition in Audio LLMs](nguyen26_interspeech.md) — same problem · relatedness 2.4/3
- [Reinforcement Learning for Data-Efficient Code-Switched ASR](ye26c_interspeech.md) — same problem · relatedness 2.2/3
- [TASU2: Controllable CTC Simulation for Alignment and Low-Resource Adaptation of Speech LLMs](peng26b_interspeech.md) — same problem · relatedness 2.2/3
- [Contrastive Training with LLM-generated Near-Misses for Robust Code-Switching Speech Recognition](nguyen26i_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
