---
id: deng26_interspeech
category: asr
labels: [efficient-on-device, self-supervised, streaming-real-time]
institutions: ["Chinese University of Hong Kong", "Institute of Software, Chinese Academy of Sciences", "National Research Council Canada"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-620
pdf: https://www.isca-archive.org/interspeech_2026/deng26_interspeech.pdf
---

# Decoding while Adapting: Zero-Shot Online Speaker Adaptation via Audio-Textual Prompts for Elderly Speech Recognition

*Chengxi Deng, Xurong Xie, Shujie Hu, Mengzhe Geng, Tianzi Wang, Youjun Chen, Huimeng Wang, Haoning Xu, Jiajun Deng, Xunying Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/deng26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/deng26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-620)

**Category:** `asr` · **Labels:** `efficient-on-device`, `self-supervised`, `streaming-real-time`

**TL;DR** — This paper proposes a zero-shot, real-time online speaker adaptation method for elderly speech recognition that fuses cross-utterance speech and text history via a Q-Former and dual cross-modal attention. It achieves statistically significant WER/CER reductions over speaker-independent baselines while delivering up to a 9.83x speed-up compared to batch-mode adaptation.

## Key contributions

- First zero-shot online speaker adaptation framework using cross-utterance audio-textual prompts for elderly speech recognition, eliminating offline batch latency.
- Dual cross-modality fusion (Dual CMF) via Q-Former to jointly capture acoustic-level variability and neurocognitive language deficiencies from elderly speakers.
- Dynamic 'decoding while adapting' inference mechanism that uses greedy-search decoded history text combined with history speech to build compact speaker representations.
- Achieves consistent speaker representations superior to traditional i-vectors, x-vectors, and ECAPA-TDNN as verified by T-SNE covariance determinant analysis.

## Problem

Automatic speech recognition (ASR) foundation models trained on standard datasets struggle with elderly speech due to speaker heterogeneity, data sparsity, and age-related neuromotor (articulation/speed issues) and neurocognitive (word choice/syntax) decline. Traditional speaker adaptation techniques rely on speaker-independent pseudo-labeling and offline batch test-time adaptation, introducing unacceptable latency for real-time communication. Furthermore, prior cross-utterance approaches ignore textual context, missing topic consistency and linguistic deficiencies critical for understanding elderly speakers and screening for neurocognitive disorders.

## Method

The model builds upon Whisper-medium, applying LoRA adapters (rank r=8) to the query, key, value, and attention output projections. The system processes current and preceding audio alongside history text (ground-truth transcripts during training, greedy-search decoded text during inference). History speech embeddings are concatenated along the temporal dimension (after the CNN block for Cantonese JCCOCC MoCA, or after the encoder for English DementiaBank Pitt), while history text tokens are processed via the Whisper tokenizer. Four fusion strategies are evaluated, with Dual Cross-Modality Fusion (Dual CMF) selected as optimal: it employs an 8-layer Q-Former structure containing alternating self-attention (for inter-query modeling) and dual cross-attention layers (treating speech and text alternately as queries and key-values) to compress variable-length history into compact speaker prompts.

Training is guided by a multi-task objective function defined as L_All = L_ASR + alpha * L_Spk + beta * L_MSE, where L_ASR is standard cross-entropy, L_Spk uses an auxiliary 4-layer feed-forward network with dropout and ReLU for speaker classification (688 classes for DementiaBank Pitt, 369 for JCCOCC MoCA), and L_MSE forces alignment between online prompts and offline Speaker Adaptive Training (SAT) reference prompts. Hyperparameters alpha and beta are empirically set to 2.0 and 0.2, respectively. The optimal online configuration uses a prompt length of 8 and a history window of 3 preceding utterance pairs.

## Experimental setup

Evaluated on the English DementiaBank Pitt corpus (33 hours, 688 training speakers, 119 dev speakers, 95 eval speakers; expanded to 58.9 training hours via silence stripping and augmentation) and the Cantonese JCCOCC MoCA corpus (cognitive impairment assessment interviews with 369 training speakers and evaluation groups of 49 speakers). Compared against speaker-independent Whisper baselines, RAB [18], encoder-only/encoder-decoder prompt adaptations [15], i-vectors, x-vectors, ECAPA-TDNN, and Conformer-Transducers. Metrics include Word Error Rate (WER) and Character Error Rate (CER) evaluated with statistical significance via MAPSSWE (alpha=0.05), alongside Real-Time Factor (RTF).

## Results

On the DementiaBank Pitt dataset, the online audio-textual prompt model achieves a statistically significant absolute WER reduction of 0.61% (2.99% relative) over the speaker-independent baseline, lowering evaluation WER to 19.82%. On the Cantonese JCCOCC MoCA dataset, it achieves a 1.22% absolute CER reduction (4.48% relative), reaching 26.01% CER. Ablations show that Dual CMF outperforms Early Fusion (20.12%), Late Fusion (20.13%), and standard Cross-Modality Fusion (20.06%). Crucially, the online method matches the accuracy of offline batch-mode encoder-decoder prompt adaptation while yielding a 9.83x speed-up in inference RTF.

| System | Model / Adaptation Type | DementiaBank Pitt Eval WER (%) | JCCOCC MoCA Eval CER (%) | RTF |
|---|---|---|---|---|
| Sys. 1 | Whisper-medium (SI Baseline) | 20.43 | 27.23 | 0.24 |
| Sys. 3 | Enc Only Prompts (Batch) [15] | 19.60 | 25.90 | 4.03 |
| Sys. 4 | Enc & Dec Prompts (Batch) [15] | 19.33 | 25.69 | 4.13 |
| Sys. 7 | ECAPA-TDNN Adaptation | 20.88 | 31.83 | 0.27 |
| Sys. 8 | Audio-Only Prompts (Online) | 20.23 | 26.76 | 0.40 |
| Sys. 9 | Audio-Textual Prompts (Online) | 19.82 | 26.01 | 0.42 |

## Limitations

The approach relies on autoregressive decoding history, meaning early utterance errors in a session could propagate through the textual history prompt and impact subsequent speaker adaptation accuracy. Evaluation is restricted to English and Cantonese dementia-screening corpora, leaving open how well the dual cross-modal prompts transfer to other tonal languages, severe dysarthria, or broader multi-speaker conversational environments. Compute overhead requires maintaining history caches and running Q-Former cross-attention layers during streaming inference.

## Why read this

Speech and ML researchers building real-time, low-latency streaming ASR adapters for vulnerable or specialized populations should read this to learn how to effectively combine history audio and decoded text via Q-Former dual cross-attention.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time speech recognition for elderly users, assistive communication devices, and automated clinical transcription for neurodegenerative disorder screening.

## Institutions / 機構

Chinese University of Hong Kong, Institute of Software, Chinese Academy of Sciences, National Research Council Canada

**Funding / 經費:** Hong Kong RGC GRF, Basic Research Project of Institute of Software, Chinese Academy of Sciences, Youth Innovation Promotion Association CAS

## Related

- [WildElder: A Chinese Elderly Speech Dataset from the Wild with Fine-Grained Manual Annotations](wang26_interspeech.md) — same problem · relatedness 2.0/3
- [Confidence Score Guided Incremental and Speaker Adaptive Pseudo-Labeling for Semi-Supervised Elderly Speech Recognition](deng26c_interspeech.md) — same problem · relatedness 2.0/3
- [Imitation Learning for Elder-Facing Speech Synthesis](han26d_interspeech.md) — same problem · relatedness 2.0/3
- [TaigiSpeech: A Low-Resource Real-World Speech Intent Dataset with Scalable Data Mining In-the-Wild](chang26d_interspeech.md) — complementary · relatedness 2.0/3
- [Bridging the Age Gap: Towards Detecting Neural Audio Codec Synthesized Elderly Speech Deepfake](phukan26_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
