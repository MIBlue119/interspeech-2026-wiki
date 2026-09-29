---
id: parikh26_interspeech
category: applications-other
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2335
pdf: https://www.isca-archive.org/interspeech_2026/parikh26_interspeech.pdf
---

# A Finetuned SpeechLLM for Joint Multi-Granular L2 Assessment and Natural-Language Rationales

*Aditya Kamlesh Parikh, Cristian Tejedor-Garcia, Catia Cucchiarini, Helmer Strik*

[PDF](https://www.isca-archive.org/interspeech_2026/parikh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/parikh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2335)

**Category:** `applications-other`

**TL;DR** — This paper proposes a rubric-guided end-to-end SpeechLLM that jointly predicts multi-granular L2 speech proficiency labels and generates natural-language rationales, using a hybrid supervised fine-tuning and bounded preference optimization objective. It achieves strong sentence-level correlations (e.g., PCC 0.73 on fluency) on the SpeechOcean762 dataset while maintaining competitive fine-grained assessment.

## Key contributions

- A unified end-to-end SpeechLLM framework that simultaneously predicts multi-aspect sentence scores (accuracy, fluency, prosody), word-level accuracy, phoneme-level accuracy, and free-text explanatory rationales in a single forward pass.
- Application of Bounded Direct Preference Optimization (BDPO) to mitigate severe class imbalance and near-miss ordinal errors in L2 speech assessment without triggering aggressive degradation.
- Comprehensive rationale evaluation examining both internal self-consistency (plausibility) and external alignment with human annotations (faithfulness), demonstrating high sentence-level reliability but degraded token-level faithfulness.

## Problem

Automated Computer-Assisted Language Learning (CALL) systems traditionally output opaque numeric scores or lack actionable pedagogical feedback. While recent instruction-tuned SpeechLLMs can generate free-text rationales alongside scores, they frequently suffer from zero-shot 'niceness bias' and are rarely optimized for joint multi-granular L2 assessment. Furthermore, prior work lacks systematic analysis regarding whether generated rationales are genuinely faithful to underlying acoustic evidence or merely superficial artifacts, hampered severely by extreme label skew toward higher-rated categories.

## Method

The architecture builds on the Qwen2-Audio-7B-Instruct backbone, freezing base weights under 4-bit quantization while applying Low-Rank Adaptation (LoRA) to query, value, output, and projection modules with rank r = 64, alpha = 128, and dropout 0.05. This yields approximately 115M trainable parameters (~1.6% of the 7B model). Training uses a hybrid objective combining standard supervised fine-tuning (SFT) via teacher forcing on the assessment response text (with lambda = 1.0) and Bounded Direct Preference Optimization (BDPO). BDPO replaces standard DPO's rejected likelihood with a smoothly bounded alternative using a mixing parameter delta = 0.5 and temperature beta = 0.1, preventing aggressive down-weighting of near-miss ordinal alternatives.

The training dataset is SpeechOcean762 (SO762), containing 2500 training utterances of Mandarin L1 English speech. Because the data is highly skewed (~80% Good/Excellent), synthetic rejected preference pairs are constructed by perturbing ground-truth labels (~88% downgrades, ~12% upgrades, distributed uniformly across dimensions) to penalize incorrect ordinal judgments. A single rubric-driven system prompt combines the speech input, transcript, target phoneme sequence, and rubric definitions, parsing responses into deterministic format fields followed by a free-text rationale. The model is trained on a single NVIDIA RTX A6000 (48GB) GPU using AdamW with a constant learning rate of 5e-6, effective batch size of 16 via gradient accumulation, and evaluated at epoch 11.

## Experimental setup

Evaluated on the held-out test split of SpeechOcean762 (SO762) containing 2500 read-speech utterances. Compared against baselines including GOPT, Azure Pronunciation Assessment, SimPO-based LLM setups, and single-granularity variants of the proposed model. Metrics include Pearson Correlation Coefficient (PCC), Root Mean Squared Error (RMSE), and multi-class Matthews Correlation Coefficient (MCC), alongside sentiment consistency and mention-based rationale agreement.

## Results

The multi-granular model (BDPO-M) achieves sentence-level PCC of 0.66 for Accuracy, 0.73 for Fluency, and 0.71 for Prosody, alongside Word Accuracy PCC of 0.52 (MCC 0.39) and Phoneme Accuracy PCC of 0.42 (RMSE 0.36). Compared to single-granularity models, multi-granular joint training improves sentence accuracy across all metrics (e.g., accuracy PCC rises from 0.62 to 0.66) while remaining competitive with SimPO and Azure PA on sequence tasks. However, traditional GOP-based models like GOPT still outperform E2E SpeechLLMs on phoneme-level scoring (PCC 0.61 vs 0.42).

Rationale evaluation reveals high internal self-consistency at the sentence level (e.g., >88% sentiment alignment with predicted polarities), but external faithfulness degrades sharply at finer granularities, with word-level mention agreement at 0.50 PCC and phoneme-level agreement dropping to 0.20 PCC against model predictions.

| System / Condition | Sentence Acc (PCC) | Sentence Fluency (PCC) | Sentence Prosody (PCC) | Word Acc (PCC) | Phoneme Acc (PCC) |
|---|---|---|---|---|---|
| GOPT [17] | 0.71 | 0.75 | 0.76 | 0.53 | 0.61 |
| Azure PA [21] | 0.70 | 0.72 | 0.84 | 0.62 | - |
| SimPO [33] | 0.68 | 0.73 | 0.73 | 0.51 | 0.38 |
| BDPO-S (Single) | 0.62 | 0.72 | 0.71 | 0.57 | 0.40 |
| BDPO-M (Multi) | 0.66 | 0.73 | 0.71 | 0.52 | 0.42 |

## Limitations

The evaluation is restricted to English read-speech produced by Mandarin L1 speakers from the SpeechOcean762 corpus, leaving open-domain conversational speech and other L1 transfer profiles untested. Token-level faithfulness evaluation relies on automated mention extraction via Qwen2.5-7B-Instruct, yielding approximate rather than exhaustive metrics. Furthermore, token-level diagnostic rationales frequently rely on orthographic heuristics rather than robust acoustic error localization.

## Why read this

Speech and ML engineers building educational voice assistants will learn how to adapt frozen LLMs for multi-aspect structured grading using bounded preference optimization, gaining realistic insights into the reliability limits of E2E rationale generation.

## Code

- https://github.com/Aditya3107/speechllm-l2-assessment

## Applications

Automated language learning (CALL) software, computer-assisted pronunciation training systems, and interpretable automated spoken proficiency testing platforms.

## Institutions / 機構

Radboud University

**Funding / 經費:** Dutch Research Council, NGF AiNed Fellowship Grants

## Related

- (link related pages by id as the wiki grows)
