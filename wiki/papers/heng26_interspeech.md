---
id: heng26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-642
pdf: https://www.isca-archive.org/interspeech_2026/heng26_interspeech.pdf
---

# Improving Code-Switching ASR with Code-Mixing Guided Synthetic Speech

[PDF](https://www.isca-archive.org/interspeech_2026/heng26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/heng26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-642)

**TL;DR** — This paper proposes a preference-learning framework using Direct Preference Optimization (DPO) guided by a novel acoustic code-mixing index to generate synthetic code-switched speech, reducing ASR Mixed Error Rate on Whisper Large from 12.1%/17.8% to 8.9%/14.2%.

## Problem

Conversational code-switching (CS) automatic speech recognition suffers from a scarcity of large, high-quality transcribed training data. While text-to-speech (TTS) synthetic data augmentation helps, existing methods optimize only for general reconstruction fidelity rather than language-boundary consistency, leading to inaccurate code-mixing patterns that confuse downstream ASR systems.

## Method

The authors introduce CMIspeech, an acoustic frame-level metric derived from Whisper decoder cross-attention pseudo-labeling to quantify language mixing within audio waveforms without forced alignment. They implement a three-stage pipeline: first, fine-tuning the CosyVoice2 multilingual auto-regressive TTS model on code-switched speech; second, aligning the TTS model using multi-critic Direct Preference Optimization (DPO) based on UTMOS naturalness, ASR Mixed Error Rate (MER), and the discrepancy between synthetic and ground-truth CMIspeech; and third, fine-tuning Whisper-large v3 on real data augmented with the optimized synthetic speech. Training uses AdamW for TTS and Adam for ASR, filtering out preference pairs with poor MER, UTMOS, or CMI alignment.

## Results

Experiments on the SEAME Mandarin-English conversational corpus show that fine-tuning Whisper-large v3 with the proposed DPO-aligned synthetic data reduces the Mixed Error Rate (MER) on the DevMAN and DevSGE sets from 12.1% and 17.8% (baseline fine-tuned CosyVoice2) down to 8.9% and 14.2%, respectively. Ablations demonstrate that progressively adding UTMOS and CMIspeech critic scores to DPO improves both objective metrics (lower MER and delta CMI) and subjective naturalness. Qualitative examples illustrate that the proposed method corrects language switching errors compared to vanilla TTS baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers building automatic speech recognition systems for bilingual or code-switched conversational domains where training data is scarce.

## Limitations

The framework relies on an auxiliary ASR model and language alignment loss to extract pseudo-frame labels, meaning its effectiveness is bounded by the quality of the language identification mechanism.

## Related

- (link related pages by id as the wiki grows)
