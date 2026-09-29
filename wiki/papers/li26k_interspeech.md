---
id: li26k_interspeech
category: translation
labels: [low-resource, multilingual, self-supervised]
institutions: ["Tianjin University", "Nanyang Technological University", "Huiyan Technology Company", "Tibet University", "Chinese Academy of Sciences"]
code: https://github.com/Sslnon/POTSA
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-695
pdf: https://www.isca-archive.org/interspeech_2026/li26k_interspeech.pdf
---

# POTSA: A Cross-Lingual Speech Alignment Framework for Speech-to-Text Translation

*Xuanchen Li, Chenrui Cui, Tianrui Wang, Meng Ge, Zikang Huang, Yizhou Peng, Jin Li, Yuheng Lu, Yu Jiang, Nyima Tashi, Longbiao Wang, Jianwu Dang*

[PDF](https://www.isca-archive.org/interspeech_2026/li26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-695)

**Category:** `translation` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — POTSA is a cross-lingual alignment framework for SpeechLLMs that combines coarse bias compensation with token-level optimal transport on parallel speech pairs, achieving state-of-the-art speech-to-text translation using only 10 hours of parallel speech per language.

## Key contributions

- Proposes a lightweight Bias Compensation module that subtracts language-specific mean offsets from encoder outputs to establish a coarsely aligned shared representation space.
- Applies entropy-regularized Optimal Transport (Sinkhorn distance) for token-level fine-grained cross-lingual alignment over parallel speech pairs without requiring strict point-to-point index matching.
- Introduces an online reward-guided layer scheduling strategy using Upper Confidence Bound (UCB) and temperature-controlled sampling to restrict OT constraints to lower/beneficial Q-Former layers.
- Demonstrates robust data efficiency, improving zero-shot translation performance by +2.93 BLEU and standard multilingual translation by +1.29 BLEU using only 10 hours of parallel data per language.

## Problem

State-of-the-art Speech Large Language Models (SpeechLLMs) suffer from severe translation performance bias, exhibiting high accuracy on high-resource languages while lagging significantly behind on low-resource ones. Prior work predominantly relies on text-driven, unidirectional speech-to-text alignment, which compresses fine-grained acoustic details and treats each source language independently in language-specific clusters. This isolation prevents effective cross-lingual knowledge transfer and reuse of machine translation decoders, making explicit cross-lingual speech representation alignment essential.

## Method

The architecture integrates within the SLAM-LLM framework using a frozen speech encoder (Whisper-v3) and a frozen language model (Qwen-2.5-7B), training only the Q-Former projection layer (8 Transformer blocks, 80 query tokens). The pipeline begins with a Bias Compensation module that models each encoder output as the sum of a language-neutral component and a language-specific bias vector computed via sentence-level temporal pooling and subtracted during both training and inference.

Following coarse alignment, the model applies token-level Optimal Transport (OT) using cross-lingual parallel speech pairs. For selected intermediate Q-Former layers, the Sinkhorn distance (entropy-regularized OT with squared Euclidean ground cost and transport smoothness parameter epsilon) is minimized to enforce semantic consistency between token sequences. This is jointly optimized with the standard translation cross-entropy loss using a weighting coefficient of 10.

To prevent alignment objectives from conflicting with translation supervision in deeper layers, an online reward-guided layer scheduling strategy based on Upper Confidence Bound (UCB) and temperature-controlled softmax sampling dynamically selects which lower Q-Former layers receive OT constraints based on reward moving averages.

## Experimental setup

Pretrained on 364 hours of CoVoST2 data (ASR en->en followed by S2TT en->zh) and fine-tuned on FLEURS (~10 hours per language across 5 source languages: en, ja, es, ko, ru translating to zh). Evaluated against baselines including Qwen2-Audio, Qwen2.5-Omni, MinMo, and an end-to-end WhisperV3+Qwen2.5 baseline using BLEU scores, Recall@1, and 1-JSD on NVIDIA RTX 4090 GPUs.

## Results

The proposed POTSA framework achieves an average BLEU score of 31.84 across the five training languages (+1.29 BLEU improvement over the baseline) and 20.84 on zero-shot languages (+2.93 BLEU improvement). Ablation studies confirm that combining both bias compensation and OT alignment is vital, as removing OT drops performance to 30.73 and removing bias compensation drops it to 31.11. Comparing alignment losses, OT outperforms MSE (30.52) and Cosine Similarity (30.74). Crucially, applying OT to all layers or deeper layers degrades performance due to objectives competing with the cross-entropy loss, validating the selective lower-layer scheduling strategy.

| Systems / Conditions | en->zh | ja->zh | es->zh | ko->zh | ru->zh | Avg (5 Lang) | Avg (Zero-Shot) |
|---|---|---|---|---|---|---|---|
| Qwen2-Audio [29] | 37.45 | 20.02 | 28.69 | 25.69 | 29.01 | 28.17 | 16.67 |
| Qwen2.5-Omni [8] | 38.35 | 23.76 | 27.81 | 27.05 | 29.69 | 29.33 | 16.91 |
| WhisperV3+Qwen2.5 (Baseline) | 40.09 | 24.32 | 30.14 | 27.07 | 31.13 | 30.55 | 17.91 |
| POTSA (Our Model) | 40.87 | 25.97 | 31.10 | 28.97 | 32.30 | 31.84 | 20.84 |
| w/o Bias Comp. | 40.44 | 24.83 | 30.91 | 28.06 | 31.31 | 31.11 | 19.34 |
| w/o OT Align. | 40.22 | 25.22 | 30.89 | 25.91 | 31.40 | 30.73 | 18.51 |

## Limitations

The framework relies on the availability of parallel speech pairs across source languages, which, while limited to 10 hours per language here, may still be scarce for extremely low-resource dialects. The evaluation is focused on translation into a single target language (Chinese), leaving many-to-many translation dynamics partially explored. Furthermore, freezing the speech encoder and LLM restricts adaptation to the parameters of the lightweight Q-Former.

## Why read this

Speech and ML researchers tackling multilingual speech-to-text translation and modality alignment should read this to learn how to combine coarse bias subtraction with entropy-regularized optimal transport for robust cross-lingual representation learning.

## Code

- https://github.com/Sslnon/POTSA

## Applications

Real-world multilingual speech-to-text translation systems and cross-lingual spoken language understanding applications targeting low-resource languages.

## Institutions / 機構

Tianjin University, Nanyang Technological University, Huiyan Technology Company, Tibet University, Chinese Academy of Sciences

## Related

- [Automated Gradient-Driven Parameter Sharing for Low-Resource Multilingual Speech-to-Text Translation](sun26d_interspeech.md) — same problem · relatedness 2.4/3
- [ARTIST: Universal Articulatory Space Modeling for Multilingual Indic-to-English Speech-to-Speech Translation](yadav26_interspeech.md) — same problem · relatedness 2.1/3
- [Does Translation-Enhanced Speech Encoder Pre-training Affect Speech LLMs?](mizumoto26_interspeech.md) — same problem · relatedness 2.1/3
- [PART: Progressive Alignment Representation Training for Multilingual Speech-To-Text with LLMs](zhang26aa_interspeech.md) — same problem · relatedness 2.1/3
- [Towards Enabling Multilingual Multitask SpeechLLMs in Data-Scarce Settings](fong26b_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
