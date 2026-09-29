---
id: lu26c_interspeech
category: paralinguistics-emotion
institutions: ["Beijing University of Posts and Telecommunications", "Hello Group Inc"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1925
pdf: https://www.isca-archive.org/interspeech_2026/lu26c_interspeech.pdf
---

# Breaking Neutral Bias: Zero-Human-Annotation Fine-Grained Emotion Enrichment via Semantic Drift and Discriminative Re-ranking

*Qihang Lu, Wenbing Yang, Bingsong Bai, Zihan Sun, Yueran Hou, Peilei Jia, Ya Li, Jun Gao, Yingming Gao*

[PDF](https://www.isca-archive.org/interspeech_2026/lu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1925)

**Category:** `paralinguistics-emotion`

**TL;DR** — The paper introduces a zero-human-annotation pipeline called Semantic Drift and Discriminative Re-ranking to fix the "neutral bias" in Large Audio Language Models (LALMs), achieving a 66.15% win rate in LLM-as-a-judge evaluations over unrefined baselines.

## Key contributions

- Identifies and formalizes "neutral bias" and excessive rejection phenomena in ungrounded text augmentation for audio-language models.
- Proposes a zero-human-annotation, data-centric hypothesize-and-verify paradigm using semantic drift and discriminative re-ranking.
- Constructs a sensitive discriminative judge model via Qwen2.5-Omni fine-tuning with multi-dimensional hard and soft negative contrastive sampling.
- Demonstrates downstream SFT improvements in lexical diversity, emotional expressiveness, and distribution recovery.

## Problem

Large Audio Language Models suffer from severe neutral bias, consistently defaulting to safe, generic descriptions (e.g., "speaking in a calm tone") and failing to capture subtle paralinguistic nuances and micro-tones. Existing text augmentation methods operate purely in text space without acoustic grounding, resulting in stylistic biases and hallucinations, while multimodal annotations suffer from modality bias where visual or ASR content overwhelms audio signal processing. Furthermore, evaluation methods frequently encounter text bias and lack direct physical acoustic verification, leaving a critical gap in high-quality, fine-grained emotional audio datasets.

## Method

The framework operates in three main stages: judge model construction, multi-dimensional semantic drift, and strategic re-ranking. First, a collaborative annotation step uses Gemini 2.5 Pro and Qwen3-Omni on raw audio, utilizing BGE-M3 to split the corpus at a 0.8 similarity threshold into high-consistency positive training examples and low-consistency samples for generation. DeepSeek-V3 then generates soft negatives (completely reversed emotional polarity) and hard negatives (subtle emotional mismatches) to build a robust contrastive triplet training set for the judge model, which is built on Qwen2.5-Omni. 

For low-consistency audio clips, DeepSeek-V3 performs multi-dimensional semantic drift to explore diverse emotional hypotheses (e.g., altering arousal or emotional polarity) using Gemini 2.5 Pro's baseline descriptions. In the final filtering phase, the fine-grained judge model ingests the continuous raw audio waveform alongside candidate descriptions to verify physical acoustic grounding. Candidates are filtered using an accuracy-first rule, and surviving items undergo strategic priority re-ranking: Drift over Refine over Origin. This ensures the final SFT dataset maximizes emotional expressiveness while discarding hallucinatory descriptions.

Downstream supervised fine-tuning utilizes 12,000 refined samples to update LALM parameters. The key design choice of using multi-type negative sampling and scaling epochs resolves the excessive rejection problem, driving true positive rates from ~24% up to 94.43% while maintaining high true negative rates.

## Experimental setup

Experiments are conducted on a total corpus of 29,530 unique audio clips, split into 16,470 high-consistency clips (expanded to 49,410 contrastive pairs for judge training) and 13,060 low-consistency clips (yielding 12,000 filtered samples for downstream SFT). Downstream models are evaluated via Gemini 2.5 Pro blind preference testing (LLM-as-a-judge), BGE-M3 semantic embedding similarity, and lexical diversity metrics (Unique Bigrams and Shannon Entropy H2) on a 12,000-sample test set compared against unrefined baseline texts.

## Results

In discriminative probing, the final full-scale judge model (N=49,410, 3 epochs) achieves a 94.43% True Positive Rate, 99.89% Soft TNR, and 93.88% Hard TNR, overcoming the severe collapse seen in single-epoch ablations. In downstream SFT evaluation, the proposed method achieves a 66.15% win rate against the baseline (29.23% for baseline, 4.62% ties) under Gemini 2.5 Pro evaluation. Lexical diversity improves with Unique Bigrams increasing from 2,897 to 3,213 and Shannon Entropy (H2) rising from 9.37 to 9.50. The BGE-M3 semantic alignment score slightly decreases from 83.61% to 83.12%, which the authors attribute to the baseline's tendency to generate safe, generic text that matches simplistic coarse annotations rather than capturing genuine acoustic reality.

| System / Condition | Gemini Win Rate (%) | Unique Bigrams | Entropy (H2) | BGE-M3 Score (%) |
|---|---|---|---|---|
| Baseline | 29.23 | 2897 | 9.37 | 83.61 |
| Ours (Proposed) | 66.15 | 3213 | 9.50 | 83.12 |

## Limitations

The approach relies heavily on the quality and diversity of initial proprietary LLMs (Gemini 2.5 Pro, Qwen3-Omni, DeepSeek-V3) for semantic drift generation, potentially inheriting unaddressed biases from those models. The evaluation relies heavily on LLM-as-a-judge preference testing and text embedding metrics rather than large-scale human listening tests for fine-grained emotional nuances. Furthermore, the pipeline assumes the input audio contains recognizable emotional variance, and extreme acoustic anomalies or heavily degraded recordings may trigger wholesale sample rejection.

## Why read this

Researchers and engineers building conversational Large Audio Language Models should read this to understand how to eliminate neutral bias and construct fine-grained emotional training data without manual human annotation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Supervised fine-tuning of Large Audio Language Models (LALMs) for empathetic spoken dialogue systems, conversational AI, and expressive speech understanding.

## Institutions / 機構

Beijing University of Posts and Telecommunications, Hello Group Inc

**Funding / 經費:** National Key R&D Program of China, National Natural Science Foundation of China, National Language Commission, National Social Science Fund of China

## Related

- (link related pages by id as the wiki grows)
