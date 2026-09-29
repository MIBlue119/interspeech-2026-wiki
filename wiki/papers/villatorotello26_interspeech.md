---
id: villatorotello26_interspeech
category: asr
institutions: ["Idiap Research Institute", "EPFL", "University of Zurich", "Uniphore", "Brno University of Technology"]
code: https://github.com/idiap/llm-asr-context-projector
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3326
pdf: https://www.isca-archive.org/interspeech_2026/villatorotello26_interspeech.pdf
---

# Context Projector: Complementary Keyword and Dialogue Context Embeddings for LLM-based ASR

*Esaú Villatoro-Tello, Sergio Burdisso, Shashi Kumar, Hasindri Watawana, Srikanth Madikeri, Manjunath K E, Jeena Prakash, Thibault Bañeras-Roux, Kadri Hacioglu, Petr Motlicek, Andreas Stolcke*

[PDF](https://www.isca-archive.org/interspeech_2026/villatorotello26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/villatorotello26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3326)

**Category:** `asr`

**TL;DR** — The paper introduces a hybrid context projector and keyword extraction module for LLM-based ASR that conditions on dialogue history while keeping the backbone frozen, achieving an average relative reduction of up to 2.5% in WER and 7.2% in BWER across contact-center domains.

## Key contributions

- A parameter-efficient context projection module (cp) that maps sentence-level dialogue embeddings into compact contextual tokens for frozen SpeechLLM backbones.
- A hybrid context-injection pipeline combining projected dialogue history with automatically extracted keyword cues from prior turns.
- A comprehensive evaluation across 246 hours of multi-domain contact-center conversations demonstrating significant improvements in the WER-BWER tradeoff.

## Problem

Contact-center dialogue systems require precise entity recognition for downstream tasks, but standard Word Error Rate (WER) fails to capture business-critical entity performance. While appending raw dialogue history or keywords to LLM-based ASR models (such as SLAM-ASR) leverages conversational context, naive prompt injection causes prompt clutter, out-of-memory errors, and severe WER degradation. Prior methods struggle to utilize long-range history without destabilizing decoding or distracting the model from acoustic evidence.

## Method

The architecture builds on SLAM-ASR using WavLM-Large as the speech encoder and Llama 3.2 3B Instruct as the LLM, connected via a speech projector (sp) operating on downsampled 50 Hz features with a downsampling factor of k = 5. To incorporate dialogue history, the authors introduce a drop-in context projector (cp) sharing the MLP architecture of the speech projector (a single hidden layer of dimension 2048 with ReLU), mapping sentence-level embeddings into compact contextual tokens. Raw dialogue utterances are first transformed using Dialog2Flow (dialog2flow-joint-bert-base), which leverages a soft contrastive pretraining objective on 3.4M utterances to map turns into action-aware latent spaces. Simultaneously, Gemma 3 (27B) extracts salient single- and multi-word keywords from prior turns due to its high zero-shot entity recall (90.6%). The LLM prompt jointly conditions on the {keywords}, {context} tokens, and projected speech embeddings {speech}. During training, both the speech encoder and LLM are completely frozen; models are optimized for 7 total epochs (5 for speech projector, 2 for context projector) using AdamW with a learning rate of 10^-4, batch size 10, cross-entropy loss, and bfloat16 precision on a single NVIDIA H100 GPU.

## Experimental setup

Evaluated on the Defined.ai contact-center dataset comprising 107,941 utterances (246.4 total hours) and 38,514 entities across five domains: Banking (54.5h), Healthcare (11.5h), Insurance (65.2h), Retail (27.8h), and Telecommunications (50.9h). Baselines include the base SLAM-ASR model without context and variants using raw keywords (+kw) or raw dialogue history prompts. Evaluation metrics include Word Error Rate (WER), Bias-Word Error Rate (BWER), and entity-level F1-score.

## Results

The hybrid keyword and context projection approach (+kw+cp) achieves average relative improvements of 2.5% in WER, 7.2% in BWER, and a 3.7% increase in F1-score across domains compared to the base model. In contrast, using raw keywords alone (+kw) improves BWER (e.g., 25.1% relative on Retail) but degrades overall WER (e.g., -6.8% on Retail), while the proposed hybrid setup stabilizes decoding and preserves general transcription quality. The context projector alone (+cp) achieves strong WER gains (up to 7.4% relative on Retail) but yields smaller or negative gains on BWER in certain low-resource settings like Healthcare.

| System / Condition | Context Size | WER (%) | BWER (%) | F1-Score |
|---|---|---|---|---|
| Base (Banking) | - | 10.2 | 20.5 | 0.83 |
| + kw + cp (Banking) | 10 turns | 9.9 | 18.8 | 0.84 |
| Base (Retail) | - | 14.8 | 44.6 | 0.68 |
| + kw + cp (Retail) | 10 turns | 13.9 | 40.0 | 0.73 |
| Base (Average) | - | - | - | - |
| + kw + cp (Average) | ~10 turns | -2.5% (rel) | 7.2% (rel) | 3.7% (rel) |

## Limitations

The study is restricted to contact-center dialogue domains and scripted interactions, potentially limiting generalization to spontaneous or highly unscripted conversational audio. The approach relies on an external, large language model (Gemma 3 27B) for keyword extraction, introducing notable inference-time compute overhead before ASR decoding. Furthermore, performance depends heavily on selecting an optimal context window size (typically 10 turns), beyond which gains saturate or introduce variance.

## Why read this

Speech and ML engineers building spoken dialogue systems will learn how to inject multi-turn dialogue history and entity keywords into frozen LLM-based ASR architectures without suffering from raw-prompt degradation.

## Code

- https://github.com/idiap/llm-asr-context-projector

## Applications

Real-time contact-center agent assist, spoken dialogue state tracking, and entity-aware speech transcription for customer support automation.

## Institutions / 機構

Idiap Research Institute, EPFL, University of Zurich, Uniphore, Brno University of Technology

**Funding / 經費:** Idiap Research Institute, Uniphore, EU Horizon 2020

## Related

- (link related pages by id as the wiki grows)
