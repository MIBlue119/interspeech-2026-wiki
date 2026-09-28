---
id: kim26h_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-929
pdf: https://www.isca-archive.org/interspeech_2026/kim26h_interspeech.pdf
---

# Attention-Guided Reliability Scaling for Contrastive Decoding in Robust Audio-Visual Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/kim26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-929)

**TL;DR** — The paper introduces attention-guided reliability scaling for contrastive decoding in audio-visual speech recognition (AVSR), achieving consistent Word Error Rate reductions across clean and noisy conditions without extra training.

## Problem

Large language model-based AVSR systems remain vulnerable to corrupted acoustic inputs because they tend to over-relie on audio under poor signal-to-noise ratio (SNR) conditions. Applying standard contrastive decoding (CD) with a fixed contrastive weight presents a severe trade-off, as aggressive intervention improves severe noise robustness but distorts reliable predictions during clean or mild conditions.

## Method

The approach uses a training-free inference-time mechanism that contrasts an audio-visual Expert condition against an audio-only Amateur condition within the same underlying AVSR model. To overcome static weight limitations, the contrastive weight is dynamically modulated at the token level using a multiplicative soft-gating mechanism driven by three signals: relative audio energy, audio attention entropy, and Jensen-Shannon predictive divergence. Evaluated on models ranging from 0.5B to 8B parameters (Qwen-AVSR, Omni-AVSR, Llama-AVSR), the base contrastive weight is set to 0.3 with gating hyperparameters tuned on validation data.

## Results

Evaluated on the LRS3 and LRS2 datasets corrupted with MUSAN noise across SNR levels from clean to -15 dB, the proposed method consistently improves Word Error Rate over standard AVSR baselines. On Llama-AVSR (8B), it achieves average improvements of roughly 5.4% to 9.9% across various noise configurations while preserving or enhancing clean speech accuracy. Ablation studies confirm that combining energy, entropy, and Jensen-Shannon divergence cues provides complementary stabilization across diverse acoustic environments.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building robust on-device or server-based audio-visual speech recognition systems can use this training-free decoding strategy to improve noise resilience without architectural modifications.

## Limitations

Adds a modest per-utterance decoding latency overhead of about 8.6% (136.4 ms) during greedy decoding.

## Related

- (link related pages by id as the wiki grows)
