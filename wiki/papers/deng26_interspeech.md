---
id: deng26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-620
pdf: https://www.isca-archive.org/interspeech_2026/deng26_interspeech.pdf
---

# Decoding while Adapting: Zero-Shot Online Speaker Adaptation via Audio-Textual Prompts for Elderly Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/deng26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/deng26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-620)

**TL;DR** — This paper proposes an online audio-textual prompt-based speaker adaptation method for elderly speech recognition that achieves zero-shot real-time adaptation and outperforms speaker-independent baselines with significant error reductions.

## Problem

Elderly speech recognition suffers from speaker heterogeneity, data sparsity, speech production and language deficiencies, and a lack of cross-utterance contextual modeling. Existing adaptation methods rely solely on acoustic features or require offline batch processing with high latency, which hinders real-time communication. Furthermore, ignoring textual history limits the joint modeling of acoustic variations and linguistic degradation.

## Method

The framework builds upon the Whisper speech foundation model and integrates LoRA alongside a Q-Former module to generate compact online speaker prompts from history speech and text. Four fusion strategies are evaluated—Early Fusion, Late Fusion, Cross-Modality Fusion (CMF), and Dual Cross-Modality Fusion (Dual CMF)—to combine preceding utterance features across modalities. Training is supervised using a multi-task objective combining ASR cross-entropy loss, speaker classification auxiliary loss, and mean squared error loss to align online prompts with offline speaker-adaptive training (SAT) targets. During inference, greedy-decoded history text is fused with history speech on-the-fly to enable low-latency decoding while adapting.

## Results

Evaluated on the English DementiaBank Pitt and Cantonese JCCOCC MoCA elderly speech datasets, the proposed audio-textual prompt method achieves statistically significant WER and CER reductions of 0.61% and 1.22% absolute (2.99% and 4.48% relative) over the speaker-independent baseline. It also obtains real-time factor (RTF) speed-up ratios of up to 9.83 times compared to offline batch-mode adaptation. Ablations demonstrate that incorporating both history speech and text via dual cross-modality fusion consistently outperforms audio-only prompt variants.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building automatic speech recognition systems for elderly users, health monitoring, and cognitive impairment assessment interviews.

## Related

- (link related pages by id as the wiki grows)
