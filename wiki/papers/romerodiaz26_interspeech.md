---
id: romerodiaz26_interspeech
category: translation
labels: [robustness-noise]
institutions: ["Barcelona Supercomputing Center", "Universitat Politecnica de Catalunya", "DFKI"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-800
pdf: https://www.isca-archive.org/interspeech_2026/romerodiaz26_interspeech.pdf
---

# Listening or Reading? Evaluating Speech Awareness in Chain-of-Thought Speech-to-Text Translation

*Jacobo Romero-Díaz, Gerard I. Gállego, Oriol Pareras, Federico Costa, Javier Hernando, Cristina España-Bonet*

[PDF](https://www.isca-archive.org/interspeech_2026/romerodiaz26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/romerodiaz26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-800)

**Category:** `translation` · **Labels:** `robustness-noise`

**TL;DR** — This paper investigates whether Chain-of-Thought (CoT) Speech-to-Text Translation models actually use speech inputs or merely mimic text-only cascade models, revealing they overwhelmingly rely on transcripts and ignore acoustic cues. By introducing a training intervention that injects noisy transcripts, the authors significantly enhance acoustic reliance, error robustness, and prosody awareness without harming general translation quality.

## Key contributions

- Evaluates internal model representations via Value Zeroing attribution analysis, proving that standard CoT S2TT models attribute near-zero importance to speech tokens during translation.
- Develops a controlled transcript corruption benchmark using Gemini-2.0-Flash to evaluate system robustness against error propagation at varying noise ratios (up to 30%).
- Evaluates prosody awareness across contrasting prosodic emphasis pairs using a modified CONTRAPROST benchmark with tie-aware scoring.
- Proposes a novel training strategy (NOISY) that replaces transcripts with noisy variants in 25% of training samples to force acoustic reliance and error-recovery capabilities.

## Problem

Speech-to-Text Translation (S2TT) systems have largely shifted from traditional cascade approaches (ASR followed by T2TT, which suffer from error propagation and prosody loss) to Speech Large Language Models utilizing Chain-of-Thought (CoT) prompting. CoT is presumed to overcome cascade limitations by providing concurrent access to speech tokens and transcriptions during generation. However, this foundational assumption lacks systematic validation. This work investigates whether CoT models genuinely exploit acoustic information or simply act as over-parameterized cascade variants.

## Method

The study builds upon SALAMANDRA-TA-7B, a 7-billion parameter decoder-only multilingual translation LLM extended to accept speech inputs. Spoken utterances are encoded using a frozen mHuBERT SSL model (25 Hz temporal resolution) and quantized into discrete speech units (DSUs) via k-means clustering into 500 centroids, whose embeddings expand the base LLM vocabulary. Models are trained on a mixture of ASR, T2TT (restricted to 50k sentence pairs/language), and S2TT data.

The paper tests three configurations: a standard BASE model trained exclusively on CoT S2TT data; a DUAL model trained on a mixture of 25% CoT and 75% Direct S2TT formats; and a NOISY model where 25% of training samples feature corrupted transcripts (generated via Gemini-2.0-Flash) with transcript loss excluded. Inference strategies are evaluated under COT (retaining speech tokens in context during translation) and CASCADE (self-cascade conditioned solely on the generated transcript).

Attribution is quantified using Value Zeroing via the inseq library to aggregate token-level contributions across input regions (speech DSUs, transcript, previous translations) across model layers. Robustness and prosody are assessed using xCOMET-XL metrics on FLEURS and CONTRAPROST benchmarks.

## Experimental setup

Training data totals over 10k hours of ASR (Common Voice 21.0, VoxPopuli, MLS subset) and ~500 hours of S2TT (CoVoST 2, Europarl-ST) translating English into six European languages (CA, DE, ES, FR, IT, PT). Models are optimized using AdamW for 16.7k steps with a peak learning rate of 1e-5, cosine schedule, warmup for 10% of steps, effective batch size of 256, and maximum token length of 2048 on NVIDIA H100 GPUs.

## Results

Standard BASE-COT models allocate virtually zero attention to speech tokens (layer-wise contribution of 0.0228), performing identically to cascade systems under transcript corruption and failing to leverage acoustic cues. Introducing the NOISY training strategy successfully increases speech attribution by 2.24x (to 0.051) and dramatically flattens performance degradation under transcript corruption up to 30% noise. On the CONTRAPROST benchmark, NOISY-COT achieves the highest global contrastive scores (averaging 17.65 in DE and ES), outperforming its cascade counterpart and baseline variants while simultaneously maintaining or improving general translation performance on FLEURS (e.g., reaching an average XCOMET of 87.84).

| System / Condition | DE (CONTRAPROST) | ES (CONTRAPROST) | AVG (CONTRAPROST) | AVG (FLEURS XCOMET) |
|---|---|---|---|---|
| BASE-CASCADE | 16.82 | 13.84 | 15.33 | 87.03 |
| BASE-COT | 17.76 | 15.47 | 16.62 | 86.72 |
| DUAL-CASCADE | 17.28 | 13.47 | 15.37 | 89.01 |
| DUAL-COT | 18.36 | 14.99 | 16.67 | 89.02 |
| NOISY-CASCADE | 17.27 | 13.56 | 15.42 | 87.47 |
| NOISY-COT | 18.64 | 16.66 | 17.65 | 87.84 |

## Limitations

The study is scoped exclusively to English as a source language translating into six European languages, leaving cross-lingual generalizability across morphologically distant language families unverified. The evaluation is restricted to a single 7B model scale (SALAMANDRA-TA), leaving open whether larger SLLMs inherently develop stronger speech awareness without explicit noise interventions. Furthermore, the synthetic corruption strategy relies on LLM-generated text replacements rather than natural acoustic-phonetic degradation.

## Why read this

Speech LLM researchers and engineers should read this paper to unmask the illusion of multimodality in Chain-of-Thought speech translation models and adopt concrete training recipes (like transcript noise injection) that genuinely force models to utilize acoustic representations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust speech-to-text translation systems deployed in noisy acoustic environments, real-time cross-lingual transcription services requiring prosodic preservation, and multimodal speech-language model architectural design.

## Institutions / 機構

Barcelona Supercomputing Center, Universitat Politecnica de Catalunya, DFKI

**Funding / 經費:** Ministerio para la Transformacion Digital y de la Funcion Publica, Plan de Recuperacion, Transformacion y Resiliencia, European Union, MICIU/AEI, Red.es

## Related

- [Investigating Faithfulness in Large Audio Language Models](mousavi26_interspeech.md) — shared technique · relatedness 2.2/3
- [All That Glitters Is Not Audio: Rethinking Text Priors and Audio Reliance in Audio-Language Evaluation](foo26_interspeech.md) — same problem · relatedness 2.1/3
- [MATA: A Training-Free Approach to Mitigate Cross-Modal Attention Imbalance in Large Audio Language Models](wang26t_interspeech.md) — same problem · relatedness 2.0/3
- [Cross-Modal Robustness Transfer (CMRT): Training Robust Speech Translation Models Using Adversarial Text](issam26_interspeech.md) — same problem · relatedness 2.0/3
- [Prosody-Aware Speech Representations for Emotion Recognition under Pragmatic Ambiguity](park26l_interspeech.md) — shared technique · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
