---
id: song26f_interspeech
category: translation
labels: [multilingual, dataset-or-benchmark-release, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2321
pdf: https://www.isca-archive.org/interspeech_2026/song26f_interspeech.pdf
---

# Evaluating and Preserving Lexical Stress in English-to-Chinese Speech-to-Speech Translation

*Yuchen Song, Xi Chen, Mingze Li, Satoshi Nakamura*

[PDF](https://www.isca-archive.org/interspeech_2026/song26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/song26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2321)

**Category:** `translation` · **Labels:** `multilingual`, `dataset-or-benchmark-release`, `generative-model`

**TL;DR** — This paper investigates English-to-Chinese speech-to-speech translation (S2ST) with a focus on preserving lexical stress, introducing a stress-annotated Mandarin dataset, a novel detector (Syl-BiLSTM), an objective metric (CETS), and a fine-tuned stress-aware TTS model that drastically improves emphasis transfer accuracy.

## Key contributions

- Constructed a high-quality stress-annotated Mandarin speech dataset comprising 1,883 samples (2.74 hours) across 418 unique sentences from two speakers under weak, medium, and strong stress prompts.
- Proposed Syl-BiLSTM, a Mandarin stress detector leveraging syllable-level temporal mean pooling, multi-layer XLS-R feature fusion, and bidirectional context modeling, achieving a 0.91 F1-score.
- Introduced the Cross-lingual Emphasis Transfer Score (CETS) objective metric at word-level (CETS-W) and sentence-level (CETS-S) granularities, showing a strong correlation (r=0.52) with human subjective judgments.
- Developed a stress-aware S2ST architecture by fine-tuning CosyVoice3 via LoRA on stress-tagged text, achieving 58.30% sentence-level stress transfer compared to 16.60%–22.30% for baseline models.

## Problem

Modern S2ST systems achieve high semantic fidelity and speech naturalness but largely fail to transfer lexical stress and prosodic emphasis across languages. This issue is severely exacerbated in tonal languages like Mandarin Chinese due to complex interactions between lexical tone, contextual prosody, and stress, which render English-centric stress detectors and general-purpose TTS models ineffective. Consequently, current models produce translations that are semantically correct but pragmatically misleading because they lack reliable tools for evaluating and generating cross-lingual stress transfer.

## Method

The framework consists of a Mandarin stress detection model (Syl-BiLSTM), a cross-lingual evaluation pipeline (CETS), and a cascaded S2ST system combining an emphasis-aware S2T backbone with a stress-controllable TTS module. For stress detection, frame-level hidden states from all 25 layers of a pre-trained XLS-R model are segmented into character-specific tensors using forced-alignment timestamps, then temporally mean-pooled to a [25, 1024] syllable-level representation per character. A learnable softmax-normalized layer fusion combines the 25 layers into an [M, 1024] sequence, which is passed through a Bidirectional LSTM (BiLSTM) and a linear head for binary character stress classification.

The cross-lingual evaluation pipeline (CETS) uses EmphaClass on source English audio, Whisper Large and fa-zh for Mandarin transcription and forced alignment, Syl-BiLSTM for target Chinese stress detection, and SimAlign to map source words to target characters. Success requires aligned source and target stress classifications.

The S2ST architecture adopts the StressTransfer S2TT backbone using Whisper-Large-v3 as the speech encoder and Qwen2.5-3B as the LLM (fine-tuned via LoRA for simultaneous translation and explicit stress tagging). The synthesis module employs CosyVoice3, fine-tained on the new Chinese stress dataset by freezing tokenizers and applying LoRA to the attention and projection layers (q_proj, k_proj, v_proj, o_proj) of transformer blocks using cross-entropy loss conditioned on stress tags (<code>).

## Experimental setup

Evaluated using 35 randomly sampled unique sentences from the EmphST-Bench subset (~170 emphasized samples per run, averaged over 5 random splits). Baselines include Qwen2.5-Omni, GPT-4o-audio-preview, Gemini 2.5 Pro + CosyVoice3 Base, and StressTransfer + Base. Metrics include ASR-BLEU (using Whisper Large), UTMOS for speech naturalness, and CETS-W/CETS-S for stress preservation.

## Results

The proposed S2ST system achieves a sentence-level stress transfer score (CETS-S) of 58.30% ± 6.90% and word-level (CETS-W) of 60.80% ± 7.70%, vastly outperforming baseline systems such as Gemini + Base (16.60% CETS-S), GPT-4o-audio (19.40% CETS-S), and StressTransfer + Base (22.30% CETS-S). In subjective evaluations, the proposed method secured a 78.33% success rate, closely matching CETS trends. While billion-parameter end-to-end LLMs like Gemini and Qwen achieve marginally higher BLEU scores (e.g., Gemini + Base at 54.26 vs. Proposed at 47.35) due to general text translation capacity, the proposed model dominates in prosodic fidelity and attains the highest UTMOS score (3.68), confirming that TTS adaptation preserves audio naturalness while adding stress controllability.

| System | BLEU (↑) | UTMOS (↑) | CETS-W (%) (↑) | CETS-S (%) (↑) |
|---|---|---|---|---|
| Qwen2.5-Omni | 51.35 ± 3.08 | 3.53 ± 0.03 | 25.70 ± 6.00 | 21.10 ± 6.70 |
| GPT-4o-audio | 50.63 ± 1.72 | 3.46 ± 0.04 | 25.20 ± 6.60 | 19.40 ± 7.10 |
| Gemini + Base | 54.26 ± 2.91 | 3.60 ± 0.03 | 15.70 ± 4.60 | 16.60 ± 3.80 |
| StressTransfer + Base | 46.34 ± 1.92 | 3.54 ± 0.05 | 24.60 ± 5.80 | 22.30 ± 5.50 |
| Proposed | 47.35 ± 1.52 | 3.68 ± 0.02 | 60.80 ± 7.70 | 58.30 ± 6.90 |

## Limitations

The collected dataset is relatively small (2.74 hours across 2 speakers), which may limit speaker diversity and stylistic generalization despite preventing overfitting via LoRA. The framework is currently constrained to English-to-Chinese translation, and evaluation relies heavily on automated transcriptions (Whisper) and forced aligners which could introduce cascading pipeline errors.

## Why read this

Researchers and engineers building expressive speech-to-speech translation systems or working on prosody and lexical stress transfer in tonal languages will find concrete recipes for data collection, architectural adaptation of TTS via LoRA, and automated evaluation metrics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cross-lingual speech translation, voice dubbing, interactive multilingual voice assistants, and expressive cross-lingual communication tools requiring precise speaker intent and emphasis preservation.

## Institutions / 機構

Chinese University of Hong Kong, Shenzhen, Shenzhen Loop Area Institute

**Funding / 經費:** National Natural Science Foundation of China, Program for Guangdong Introducing Innovative and Entrepreneurial Teams

## Related

- (link related pages by id as the wiki grows)
