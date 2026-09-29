---
id: he26c_interspeech
category: asr
labels: [multilingual]
institutions: ["Shanghai Jiao Tong University", "iFLYTEK", "Wuhan University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1113
pdf: https://www.isca-archive.org/interspeech_2026/he26c_interspeech.pdf
---

# LLM-HB: Language-Aware LLM-Guided Hotword Biasing for Code-Switching ASR

*Yuxuan He, Genshun Wan, Pengcheng Li, Gongping Huang, Jian-Qing Gao, Yanmin Qian*

[PDF](https://www.isca-archive.org/interspeech_2026/he26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/he26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1113)

**Category:** `asr` · **Labels:** `multilingual`

**TL;DR** — LLM-HB integrates a Mixture-of-Experts (MoE) adaptor, an auxiliary language head, and LLM-based prompting for hotword biasing in code-switching ASR, achieving a 20.30% relative reduction in mixed error rate (MER).

## Key contributions

- Proposes the first framework to integrate LLM-guided contextual hotword biasing into code-switching automatic speech recognition.
- Introduces an MoE adaptor after the speech encoder combined with an auxiliary language prediction head for language-specialized representation learning.
- Releases an extracted hotword list derived from the ASRU2019 code-switching challenge test set to facilitate future contextual biasing research.
- Demonstrates that a dense top-2 MoE configuration outperforms sparse or larger expert arrays in bilingual Mandarin-English scenarios.

## Problem

Code-switching speech features rapid inter- and intra-sentence language transitions that degrade automatic speech recognition performance due to cross-language interference and confusion. While prior strategies decouple language modeling using bi-encoders or language-aware layers, they neglect contextual biasing for rare words and named entities. Conversely, existing LLM-based hotword biasing techniques are designed strictly for monolingual setups and fail to handle multilingual code-switching dynamics.

## Method

Acoustic features are extracted using a fine-tuned Whisper-medium encoder producing 1024-dimensional outputs, which are projected to 2560 dimensions via a dense MoE adaptor containing 2 experts and top-2 gating. The aggregated speech embeddings, alongside tokenized hotword lists and ground-truth text embeddings encoded by a frozen Qwen3-4B text encoder, are concatenated into a LoRA-adapted Qwen3-4B LLM backbone. During training, an auxiliary language prediction head maps the LLM hidden states to a 3-class distribution (Mandarin, English, other) via cross-entropy loss to guide representation learning and stabilize expert routing. The overall loss combines standard ASR cross-entropy, a hotword biasing loss weighted at $\lambda_1 = 0.6$, and the auxiliary language loss weighted at $\lambda_2 = 0.3$. The auxiliary head and text-encoding branches are removed during inference.

## Experimental setup

Evaluated on the ASRU2019-CS code-switching dataset (200 hours), with larger-scale multi-dataset experiments incorporating AISHELL-2 (1000 hours, Mandarin) and LibriSpeech (960 hours, English) totaling ~2,200 hours. Evaluated using Mixed Error Rate (MER), Character Error Rate (CER), Word Error Rate (WER), and bias-oriented variants (B-MER, B-CER, B-WER) against a Whisper-medium + Qwen3-4B baseline under a 15-distractor hotword per utterance setting. Trained using the AdamW optimizer with a triangular schedule over 94,080 steps across 8 MLU590 GPUs.

## Results

Under the 2,200-hour multi-dataset training setting, the full LLM-HB framework reduces the mixed error rate (MER) from 7.34% (baseline) to 5.85%, representing a 20.30% relative improvement. Hotword-specific metrics drop drastically, with bias-MER (B-MER) falling from 22.11% to 8.99%, B-CER from 19.26% to 3.01%, and B-WER from 22.90% to 10.93%. Under the resource-constrained 200-hour code-switching-only training setting, LLM-HB achieves 7.36% MER (compared to 7.34%-9.59% for variants), showing robustness in low-resource environments. Ablations confirm a dense 2-expert top-2 configuration optimizes performance (7.19% MER) compared to 4-expert variants (7.33% to 7.47% MER).

| System / Condition | MER (%) | CER (%) | WER (%) | B-MER (%) | B-CER (%) | B-WER (%) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Base Model (CS-only) | 9.59 | 7.03 | 30.44 | 26.91 | 25.45 | 27.27 |
| LLM-HB (CS-only, 200h) | 7.36 | 6.02 | 18.29 | 14.14 | 8.11 | 16.07 |
| Base Model (Multi-dataset) | 7.34 | 5.04 | 26.05 | 22.11 | 19.26 | 22.90 |
| LLM-HB (Multi-dataset, ~2200h) | 5.85 | 4.94 | 13.21 | 8.99 | 3.01 | 10.93 |

## Limitations

The evaluation is restricted to a bilingual Mandarin-English code-switching dataset, leaving multi-language code-switching scenarios untested. The current framework assumes a fixed hotword list size of 15 distractors per utterance and does not explicitly address near-homophone disambiguation or scaling to massively large open-vocabulary hotword lists.

## Why read this

Researchers building state-of-the-art multilingual and code-switching speech recognition systems will find this a blueprint for marrying MoE acoustic adaptors with LLM-based contextual biasing and auxiliary language supervision.

## Code

- https://anonymous.4open.science/r/IS26-ASRU2019-Hotword-List/

## Applications

Multilingual customer service transcription, bilingual meeting assistants, and code-switched voice search engines requiring precise named-entity recognition.

## Institutions / 機構

Shanghai Jiao Tong University, iFLYTEK, Wuhan University

**Funding / 經費:** China NSFC, SJTU Med-X Translational Research Grant

## Related

- (link related pages by id as the wiki grows)
